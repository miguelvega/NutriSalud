import { useState } from "react";
import "./Navbar.css";
import { MdKeyboardArrowDown } from "react-icons/md";

export const Navbar = () => {
  const [isSubEnlacesVisible, setIsSubEnlacesVisible] = useState(false);

  const handleClickComienza = () => {
    setIsSubEnlacesVisible(!isSubEnlacesVisible);
  };

  return (
    <nav className="navbar">
      <div className="navbar-logo">
        <h1 className="title">
          Nutri<span>Salud</span>
        </h1>
      </div>
      <div className="navbar-links">
        <button className="button-comienza" onClick={handleClickComienza}>
          Comienza
          <MdKeyboardArrowDown />
        </button>

        <div className={`subEnlaces ${isSubEnlacesVisible ? "visible" : ""}`}>
          <a className="enlace borde" href="#">
            Triaje Inicial
          </a>
          <a className="enlace borde" href="#">
            Generar Cita{" "}
          </a>
          <a className="enlace" href="#">
            Historial Médico
          </a>
        </div>

        <a className="enlace" href="#">
          Nuestro Personal
        </a>
        <a className="enlace" href="#">
          Citas
        </a>
        <a className="enlace" href="#">
          Recomendaciones
        </a>
        <a className="enlace" href="#">
          Preguntas Frecuentes
        </a>
      </div>
      <div className="auth-buttons">
        <button className="login">Iniciar Sesión</button>
        <button className="signup">Crea una cuenta</button>
      </div>
    </nav>
  );
};
