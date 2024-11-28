import imageLogin from "/background-login.png";
import "./Login.css";
import Form from "./components/Form/Form";
import { useAuth } from "../../context";
import { Navigate } from "react-router-dom";

export const Login = () => {
  const { isLoggedIn, user } = useAuth();

  if (isLoggedIn) {
    if (user.role == "paciente") {
      return <Navigate to="/" replace />;
    } else if (user.role == "nutricionista") {
      return <Navigate to="/inicio-medico" replace />;
    }
  }

  return (
    <div>
      <h1 className="main-title-login">
        Bienvenido a <span>Nutri</span>Salud
      </h1>
      <div className="container-login">
        <Form />

        <div className="img-login">
          <img src={imageLogin} alt="Imagen Login" />
        </div>
      </div>
    </div>
  );
};
