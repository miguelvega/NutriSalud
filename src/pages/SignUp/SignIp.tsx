import { useState } from "react";
import { Input } from "../../components";
import "./SignUp.css";
import imageSignUp from "/background-login.png";

export const SignUp = () => {
  const [nombres, setNombres] = useState("");
  const [apellidos, setApellidos] = useState("");
  const [email, setEmail] = useState("");
  const [telefono, setTelefono] = useState("");
  // const [dni, setDni] = useState("");
  const [rol, setRol] = useState("Paciente");
  const [password, setPassword] = useState("");

  const handleNombresChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setNombres(e.target.value);
  };

  const handleApellidosChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setApellidos(e.target.value);
  };

  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);
  };

  const handleTelefonoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTelefono(e.target.value);
  };

  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value);
  };

  const handleRolChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setRol(e.target.value);
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log("Nombres: ", nombres);
    console.log("Apellidos: ", apellidos);
    console.log("Telefono: ", telefono);
    console.log("Email:", email);
    console.log("Contraseña:", password);
    console.log("rol: ", rol);
  };
  return (
    <div className="container-signup">
      <form onSubmit={handleSubmit}>
        <h2 className="title-signup">Registro</h2>

        <Input
          label="Nombres"
          type="text"
          value={nombres}
          onChange={handleNombresChange}
        />

        <Input
          label="Apellidos"
          type="text"
          value={apellidos}
          onChange={handleApellidosChange}
        />

        <Input
          label="Correo Electrónico"
          type="email"
          value={email}
          onChange={handleEmailChange}
        />

        <Input
          label="Teléfono"
          type="tel"
          value={telefono}
          onChange={handleTelefonoChange}
        />

        <Input
          label="Contraseña"
          type="password"
          value={password}
          onChange={handlePasswordChange}
        />

        <label htmlFor="rol" className="label-rol">
          Rol
        </label>
        <select
          id="rol"
          value={rol}
          onChange={handleRolChange}
          className="select-rol"
        >
          <option value="Paciente">Paciente</option>
          <option value="Nutricionista">Nutricionista</option>
        </select>

        <button type="submit" className="btn-submit">
          Crear Cuenta
        </button>
      </form>

      <div className="img-signup">
        <img src={imageSignUp} alt="Imagen SignUp" />
      </div>
    </div>
  );
};
