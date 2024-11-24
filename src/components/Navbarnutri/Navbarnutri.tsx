import { Link } from "react-router-dom";
import "./Navbarnutri.css";
import { GoChevronDown } from "react-icons/go";
import { useState } from "react";
import { useAuth } from "../../context";

export const Navbarnutri = () => {
  const { isLoggedIn, logout } = useAuth(); // se podria usar para limitar algo mas y en el provider tambien obtener el nombre de los usuarios seria bueno
  const [isProfileOptionsVisible, setIsProfileOptionsVisible] = useState(false);

  const handleProfileOptionsToggle = () => {
    setIsProfileOptionsVisible(!isProfileOptionsVisible);
  };

  return (
    <nav className="navbarnutri">
      <div className="navbarnutri-section">
        {/* Sección del logo */}
        <Link className="enlace-main" to="/inicio-medico">
          <h1 className="title">
            Nutri<span>Salud</span>
          </h1>
        </Link>
      </div>
      <div className="navbarnutri-section navbarnutri-links">
        {/* Sección de enlaces centrados */}
        <Link className="enlace" to="/citas-pendientes">
          Mis citas
        </Link>
        <Link className="enlace" to="/ayuda">
          Ayuda
        </Link>
      </div>
      <div className="navbarnutri-section role-button">
        {/* Sección del botón de rol */}
        <span className="role">NUTRICIONISTA</span>
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
  );
};
