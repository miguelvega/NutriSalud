import React from 'react';
import './ConfirmDialog.css';

type ConfirmDialogProps = {
  message: string;
  onConfirm: () => void;
  onCancel: () => void;
  show: boolean;
};

const ConfirmDialog: React.FC<ConfirmDialogProps> = ({ message, onConfirm, onCancel, show }) => {
  if (!show) return null;

  return (
    <div className="confirm-dialog-overlay">
      <div className="confirm-dialog">
        <p>{message}</p>
        <div className="dialog-buttons">
          <button className="confirm-button" onClick={onConfirm}>Aceptar</button>
          <button className="cancel-button" onClick={onCancel}>Cancelar</button>
        </div>
      </div>
    </div>
  );
};

export default ConfirmDialog;
