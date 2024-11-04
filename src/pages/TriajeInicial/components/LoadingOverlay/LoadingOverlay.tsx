import React from "react";
import "./LoadingOverlay.css";

export const LoadingOverlay: React.FC = () => (
  <div className="loading-overlay">
    <div className="loading-message">
      <div className="loading-spinner"></div>
      Generando Reporte
    </div>
  </div>
);
