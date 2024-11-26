import "./SignUp.css";
import imageSignUp from "/background-login.png";
import Form from "./components/Form/Form";
import { Navigate } from "react-router-dom";
import { useAuth } from "../../context";

export const SignUp = () => {
  const { isLoggedIn } = useAuth();

  if (isLoggedIn) {
    return <Navigate to="/" replace />;
  }

  return (
    <div className="container-signup">
      <Form />

      <div className="img-signup">
        <img src={imageSignUp} alt="Imagen SignUp" />
      </div>
    </div>
  );
};
