import { useEffect } from "react";
import { Link } from "react-router-dom";
import "./InicioMedico.css";
import gestionCitas from "../../assets/gestion_citas.png";
import citasPaciente from "../../assets/citas_paciente.png";
import fondoPalta from "../../assets/fondo_palta.png";
import imagenChatbot from "../../assets/imagenchatbot.png";

const InicioMedico = () => {
  // useEffect(() => {
  //   // Add a class to the body when the component mounts
  //   document.body.classList.add('no-scroll');

  //   // Remove the class from the body when the component unmounts
  //   return () => {
  //     document.body.classList.remove('no-scroll');
  //   };
  // }, []);

  return (
    <div className="inicio-medico-container">
      <div className="card-section">
        <Link to="/gestion-citas" className="card">
          <p className="card-title">Gestión De Citas</p>
          <img
            src={gestionCitas}
            alt="Gestión de Citas"
            className="card-image"
          />
        </Link>
        <Link to="/citas-pendientes" className="card">
          <p className="card-title">Citas Pendientes</p>
          <img
            src={citasPaciente}
            alt="Citas Pendientes"
            className="card-image"
          />
        </Link>
      </div>
      <div className="decoration-section">
        <img src={fondoPalta} alt="Decoración Palta" className="fondo-palta" />
      </div>
      <Link to="/chatbot" className="chatbot-button-container">
        <img src={imagenChatbot} alt="Chatbot" className="chatbot-icon" />
      </Link>
    </div>
  );
};

export default InicioMedico;
