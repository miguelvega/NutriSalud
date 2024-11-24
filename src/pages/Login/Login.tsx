import imageLogin from "/background-login.png";
import "./Login.css";
import Form from "./components/Form/Form";

export const Login = () => {
  return (
    <div>
      <h1 className="main-title-login">
        Bienvenido a <span>Nutri</span>Salud
      </h1>
      <div className="container-login">
        {/* modificar para lo que retorne del backend ver si inicia sesion como nutricionista o como paciente dependiendo del rol usando el contexto const { login } = useAuth(); */}
        {/* Ademas de agregar un boton para crear una cuenta y dirigirlo al SignUp y al crear la cuenta dirigirlo nuevamente */}
        {/* Crear un tipo messageToast opcional  */}
        <Form />

        <div className="img-login">
          <img src={imageLogin} alt="Imagen Login" />
        </div>
      </div>
    </div>
  );
};
