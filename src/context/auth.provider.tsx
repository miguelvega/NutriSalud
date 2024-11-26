import {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode,
} from "react";

interface AuthContextType {
  isLoggedIn: boolean | undefined; // Cambiado a undefined inicialmente
  login: (userData: { role: string }) => void;
  logout: () => void;
  userRole: string | null;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [isLoggedIn, setIsLoggedIn] = useState<boolean | undefined>(undefined);
  const [userRole, setUserRole] = useState<string | null>(null);

  // Sincronizar con localStorage al montar
  useEffect(() => {
    const storedIsLoggedIn = localStorage.getItem("isLoggedIn") === "true";
    const storedUserRole = localStorage.getItem("userRole");

    setIsLoggedIn(storedIsLoggedIn);
    setUserRole(storedUserRole);
  }, []);

  const login = (userData: { role: string }) => {
    setIsLoggedIn(true);
    setUserRole(userData.role);
    localStorage.setItem("isLoggedIn", "true");
    localStorage.setItem("userRole", userData.role);
  };

  const logout = () => {
    setIsLoggedIn(false);
    setUserRole(null);
    localStorage.removeItem("isLoggedIn");
    localStorage.removeItem("userRole");
  };

  return (
    <AuthContext.Provider value={{ isLoggedIn, login, logout, userRole }}>
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
