import imageLogin from "/background-login.png";
import "./Login.css";
import Form from "./components/Form/Form";

export const Login = () => {
  return (
    <div className="container-login">
      <Form />

      <div className="img-login">
        <img src={imageLogin} alt="Imagen Login" />
      </div>
    </div>
  );
};
