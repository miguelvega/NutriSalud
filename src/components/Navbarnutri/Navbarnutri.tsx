import { Link } from "react-router-dom";
import "./Navbarnutri.css";

export const Navbarnutri = () => {
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

      <div className="navbarnutri-section"></div> {/* Sección vacía para espacio */}

      <div className="navbarnutri-section role-button">
        {/* Sección del botón de rol */}
        <span className="role">MÉDICO</span>
      </div>
    </nav>
  );
};
