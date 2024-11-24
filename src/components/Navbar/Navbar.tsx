import { useState } from "react";
import "./Navbar.css";
import { MdKeyboardArrowDown, MdMenu, MdClose } from "react-icons/md";
import { Link } from "react-router-dom";
import { GoChevronDown } from "react-icons/go";
import { useAuth } from "../../context";

export const Navbar = () => {
  const { isLoggedIn, logout } = useAuth(); // se podria usar para limitar algo mas y en el provider tambien obtener el nombre de los usuarios seria bueno
  const [isSubEnlacesVisible, setIsSubEnlacesVisible] = useState(false);
  const [isMobileMenuVisible, setIsMobileMenuVisible] = useState(false);
  const [isProfileOptionsVisible, setIsProfileOptionsVisible] = useState(false);
  const handleClickComienza = () => {
    setIsSubEnlacesVisible(!isSubEnlacesVisible);
  };

  const handleMobileMenuToggle = () => {
    setIsMobileMenuVisible(!isMobileMenuVisible);
  };

  const handleProfileOptionsToggle = () => {
    setIsProfileOptionsVisible(!isProfileOptionsVisible);
  };

  const handleClick = () => {
    if (isMobileMenuVisible) {
      setIsMobileMenuVisible(!isMobileMenuVisible);
    }
    if (isSubEnlacesVisible) {
      setIsSubEnlacesVisible(!isSubEnlacesVisible);
    }
  };

  return (
    <>
      <nav className="navbar">
        <div className="navbar-logo">
          <button className="mobile-menu-icon" onClick={handleMobileMenuToggle}>
            {isMobileMenuVisible ? <MdClose size={24} /> : <MdMenu size={24} />}
          </button>

          <Link className="enlace-main" to="/">
            <h1 className="title">
              Nutri<span>Salud</span>
            </h1>
          </Link>
        </div>

        <div className="navbar-links">
          <button className="button-comienza" onClick={handleClickComienza}>
            Comienza
            <MdKeyboardArrowDown />
          </button>
          <div className={`subEnlaces ${isSubEnlacesVisible ? "visible" : ""}`}>
            <Link
              className="enlace borde"
              to="/triaje-inicial"
              onClick={handleClickComienza}
            >
              Triaje Inicial
            </Link>
            <Link
              className="enlace borde"
              to="/generar-cita"
              onClick={handleClickComienza}
            >
              Generar Cita
            </Link>
            <Link
              className="enlace"
              to="/historial-medico"
              onClick={handleClickComienza}
            >
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
        <div className="profile-buttons">
          <p className="rol-name">Paciente</p>
          <GoChevronDown
            size={24}
            style={{ fontWeight: "bold" }}
            onClick={handleProfileOptionsToggle}
          />
        </div>
        <div
          className={`options-profile ${
            isProfileOptionsVisible ? "visible" : "hidden"
          }`}
        >
          <Link className="manageAccount" to="/manage-account">
            Manage Account
          </Link>
          <button className="logOut" onClick={logout}>
            Log Out
          </button>
        </div>
      </nav>

      <div
        className={`navbar-mobile-links ${
          isMobileMenuVisible ? "visible" : "hidden"
        }`}
      >
        <button className="button-comienza" onClick={handleClickComienza}>
          Comienza
          <MdKeyboardArrowDown />
        </button>
        <div
          className={`subEnlaces-mobile ${
            isSubEnlacesVisible ? "visible" : ""
          }`}
        >
          <Link className="enlace" to="/triaje-inicial" onClick={handleClick}>
            Triaje Inicial
          </Link>
          <Link className="enlace" to="/generar-cita" onClick={handleClick}>
            Generar Cita
          </Link>
          <Link className="enlace" to="/historial-medico" onClick={handleClick}>
            Historial Médico
          </Link>
        </div>
        <Link className="enlace" to="/nuestro-personal" onClick={handleClick}>
          Nuestro Personal
        </Link>
        <Link className="enlace" to="/citas" onClick={handleClick}>
          Citas
        </Link>
        <Link className="enlace" to="/recomendaciones" onClick={handleClick}>
          Recomendaciones
        </Link>
        <Link
          className="enlace"
          to="/preguntas-frecuentes"
          onClick={handleClick}
        >
          Preguntas Frecuentes
        </Link>
      </div>
    </>
  );
};
