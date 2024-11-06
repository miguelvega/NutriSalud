import React from "react";
import "./ErrorModal.css";

interface ErrorModalProps {
  message: string;
  onClose: () => void;
}

const ErrorModal: React.FC<ErrorModalProps> = ({ message, onClose }) => {
  return (
    <div className="error-modal-overlay">
      <div className="error-modal">
        <p>{message}</p>
        <button onClick={onClose} className="error-modal-button">Aceptar</button>
      </div>
    </div>
  );
};

export default ErrorModal;
