import React from "react";
import "./AdvertenciaPrescripcion.css";

interface AdvertenciaPrescripcionProps {
  message: string;
  onConfirm: () => void;
  onModify: () => void;
}

const AdvertenciaPrescripcion: React.FC<AdvertenciaPrescripcionProps> = ({
  message,
  onConfirm,
  onModify,
}) => {
  return (
    <div className="confirm-dialog-overlay">
      <div className="confirm-dialog">
        <p>{message}</p>
        <div className="dialog-buttons">
          <button onClick={onConfirm} className="confirm-button">
            Guardar
          </button>
          <button onClick={onModify} className="modify-button">
            Modificar
          </button>
        </div>
      </div>
    </div>
  );
};

export default AdvertenciaPrescripcion;
