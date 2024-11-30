import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../../context";

// Define las props del componente
interface RoleProtectedRouteProps {
  allowedRoles: string[]; // Lista de roles permitidos
}

const RoleProtectedRoute: React.FC<RoleProtectedRouteProps> = ({
  allowedRoles,
}) => {
  const { user } = useAuth();
  //@ts-ignore
  if (!user || !allowedRoles.includes(user.role)) {
    // Redirige si el usuario no tiene el rol adecuado
    return <Navigate to="/" replace />;
  }

  return <Outlet />;
};

export default RoleProtectedRoute;
