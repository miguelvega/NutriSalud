import { useState } from "react";
import "./Navbar.css";
import { MdKeyboardArrowDown, MdMenu, MdClose } from "react-icons/md";
import { Link } from "react-router-dom";

export const Navbar = () => {
  const [isSubEnlacesVisible, setIsSubEnlacesVisible] = useState(false);
  const [isMobileMenuVisible, setIsMobileMenuVisible] = useState(false);

  const handleClickComienza = () => {
    setIsSubEnlacesVisible(!isSubEnlacesVisible);
  };

  const handleMobileMenuToggle = () => {
    setIsMobileMenuVisible(!isMobileMenuVisible);
  };

  return (
    <nav className="navbar">
      <div className="navbar-logo">
        <Link className="enlace-main" to="/">
          <h1 className="title">
            Nutri<span>Salud</span>
          </h1>
        </Link>
        <button className="mobile-menu-icon" onClick={handleMobileMenuToggle}>
          {isMobileMenuVisible ? <MdClose /> : <MdMenu />}
        </button>
      </div>
      <div className={`navbar-links ${isMobileMenuVisible ? "visible" : ""}`}>
        <button className="button-comienza" onClick={handleClickComienza}>
          Comienza
          <MdKeyboardArrowDown />
        </button>
        <div className={`subEnlaces ${isSubEnlacesVisible ? "visible" : ""}`}>
          <Link className="enlace borde" to="/triaje-inicial">
            Triaje Inicial
          </Link>
          <Link className="enlace borde" to="/generar-cita">
            Generar Cita
          </Link>
          <Link className="enlace" to="/historial-medico">
            Historial Médico
          </Link>
        </div>
        <Link className="enlace" to="/nuestro-personal">
          Nuestro Personal
        </Link>
        <Link className="enlace" to="/citas">
          Citas
        </Link>
        <Link className="enlace" to="/recomendaciones">
          Recomendaciones
        </Link>
        <Link className="enlace" to="/preguntas-frecuentes">
          Preguntas Frecuentes
        </Link>
      </div>
      <div className="auth-buttons">
        <Link className="login" to="/login">
          Iniciar Sesión
        </Link>
        <Link className="signup" to="/signup">
          Crea una cuenta
        </Link>
      </div>
    </nav>
  );
};
