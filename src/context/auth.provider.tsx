import {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode,
} from "react";

interface AuthContextType {
  isLoggedIn: boolean | undefined; // Cambiado a undefined inicialmente
  login: (userData: { role: string; id: string; name: string }) => void;
  logout: () => void;
  user: { role: string | null; id: string | null; name: string | null };
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<{
    role: string | null;
    id: string | null;
    name: string | null;
  }>({
    role: null,
    id: null,
    name: null,
  });

  const [isLoggedIn, setIsLoggedIn] = useState<boolean | undefined>(undefined);

  // Sincronizar con localStorage al montar
  useEffect(() => {
    const storedIsLoggedIn = localStorage.getItem("isLoggedIn") === "true";
    const storedUserRole = localStorage.getItem("userRole");
    const storedUserId = localStorage.getItem("userId");
    const storedName = localStorage.getItem("name");

    setIsLoggedIn(storedIsLoggedIn);
    setUser({
      role: storedUserRole,
      id: storedUserId,
      name: storedName,
    });
  }, []);

  const login = (userData: { role: string; id: string; name: string }) => {
    setIsLoggedIn(true);
    setUser(userData); // Guardamos tanto el role como el id
    localStorage.setItem("isLoggedIn", "true");
    localStorage.setItem("userRole", userData.role);
    localStorage.setItem("userId", userData.id); // Guardamos el id en localStorage
    localStorage.setItem("name", userData.name);
  };

  const logout = () => {
    setIsLoggedIn(false);
    setUser({ role: null, id: null, name: null });
    localStorage.removeItem("isLoggedIn");
    localStorage.removeItem("userRole");
    localStorage.removeItem("userId");
    localStorage.removeItem("name");
  };

  return (
    <AuthContext.Provider value={{ isLoggedIn, login, logout, user }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
