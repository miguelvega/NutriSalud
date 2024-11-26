import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../../context";

const ProtectedRoute = () => {
  const { isLoggedIn } = useAuth();

  // Si el estado aún no se ha sincronizado, puedes usar un indicador de carga
  if (isLoggedIn === undefined) {
    return <div>Loading...</div>; // Puedes mostrar un spinner o algo similar
  }

  return isLoggedIn ? <Outlet /> : <Navigate to="/login" replace />;
};

export default ProtectedRoute;
