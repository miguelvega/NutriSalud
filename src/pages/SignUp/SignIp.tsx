import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Input } from "../../components";
import "./SignUp.css";
import imageSignUp from "/background-login.png";

type SignUpProps = {
  onRoleChange: (role: string) => void;
};

export const SignUp: React.FC<SignUpProps> = ({ onRoleChange }) => {
  const [nombres, setNombres] = useState("");
  const [apellidos, setApellidos] = useState("");
  const [email, setEmail] = useState("");
  const [telefono, setTelefono] = useState("");
  const [rol, setRol] = useState("Paciente");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    console.log("Nombres: ", nombres);
    console.log("Apellidos: ", apellidos);
    console.log("Telefono: ", telefono);
    console.log("Email:", email);
    console.log("Contraseña:", password);
    console.log("Rol: ", rol);

    // Notify App to switch navbar if the role is Nutricionista
    onRoleChange(rol);

    if (rol === "Nutricionista") {
      navigate("/inicio-medico"); // Redirect to inicio-medico page for Nutricionista role
    } else {
      navigate("/"); // Redirect to home or other default page for Paciente role
    }
  };

  return (
    <div className="container-signup">
      <form onSubmit={handleSubmit}>
        <h2 className="title-signup">Registro</h2>

        <Input label="Nombres" type="text" value={nombres} onChange={(e) => setNombres(e.target.value)} />
        <Input label="Apellidos" type="text" value={apellidos} onChange={(e) => setApellidos(e.target.value)} />
        <Input label="Correo Electrónico" type="email" value={email} onChange={(e) => setEmail(e.target.value)} />
        <Input label="Teléfono" type="tel" value={telefono} onChange={(e) => setTelefono(e.target.value)} />
        <Input label="Contraseña" type="password" value={password} onChange={(e) => setPassword(e.target.value)} />

        <label htmlFor="rol" className="label-rol">Rol</label>
        <select id="rol" value={rol} onChange={(e) => setRol(e.target.value)} className="select-rol">
          <option value="Paciente">Paciente</option>
          <option value="Nutricionista">Nutricionista</option>
        </select>

        <button type="submit" className="btn-submit">Crear Cuenta</button>
      </form>

      <div className="img-signup">
        <img src={imageSignUp} alt="Imagen SignUp" />
      </div>
    </div>
  );
};
