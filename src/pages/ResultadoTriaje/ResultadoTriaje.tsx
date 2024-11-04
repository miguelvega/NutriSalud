import "./ResultadoTriaje.css";
import { FaCheckCircle, FaFileDownload, FaCalendarAlt } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

export const ResultadoTriaje = () => {
  const navigate = useNavigate();

  // Función para redirigir al usuario a la vista de triaje inicial
  const handleNuevoTriaje = () => {
    navigate("/triaje-inicial");
  };

  // Función para redirigir al usuario a la vista de generar cita
  const handleGenerarCita = () => {
    navigate("/generar-cita");
  };

  return (
    <div className="resultado-triaje-container">
      <h1 className="resultado-triaje-title">TRIAJE INICIAL</h1>
      <p className="resultado-triaje-subtitle">
        Ya cuenta con un triaje inicial
      </p>

      <button className="main-button" onClick={handleGenerarCita}>
        Generar Cita <FaCalendarAlt />
      </button>

      <button className="secondary-button" onClick={handleNuevoTriaje}>
        Nuevo Triaje <FaCheckCircle />
      </button>

      <button className="secondary-button">
        Descargar PDF <FaFileDownload />
      </button>

      {/* Notificación de éxito */}
      <div className="notification-success">
        <FaCheckCircle />
        <span>TRIAJE COMPLETADO: Se ha generado el reporte 😊</span>
      </div>
    </div>
  );
};
