import "./SignUp.css";
import imageSignUp from "/background-login.png";
import Form from "./components/Form/Form";

export const SignUp = () => {
  return (
    <div className="container-signup">
      <Form />

      <div className="img-signup">
        <img src={imageSignUp} alt="Imagen SignUp" />
      </div>
    </div>
  );
};
