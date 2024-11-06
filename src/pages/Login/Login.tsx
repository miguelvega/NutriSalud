import { useState } from "react";
import { Input } from "../../components";
import imageLogin from "/background-login.png";
import "./Login.css";

export const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);
  };

  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value);
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log("Email:", email);
    console.log("Contraseña:", password);
  };

  return (
    <div className="container-login">
      <form onSubmit={handleSubmit}>
        <h2 className="title-login">Iniciar Sesión</h2>
        <Input
          label="Correo Electrónico"
          type="email"
          value={email}
          onChange={handleEmailChange}
        />
        <Input
          label="Contraseña"
          type="password"
          value={password}
          onChange={handlePasswordChange}
        />

        <button type="submit" className="btn-submit">
          Ingresar
        </button>
      </form>

      <div className="img-login">
        <img src={imageLogin} alt="Imagen Login" />
      </div>
    </div>
  );
};
