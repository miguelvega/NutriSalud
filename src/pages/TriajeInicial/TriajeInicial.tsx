import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./TriajeInicial.css";
import { TriajeForm } from "./components/TriajeForm/TriajeForm";
import { LoadingOverlay } from "./components/LoadingOverlay/LoadingOverlay";
import { TriajeImage } from "./components/TriajeImage/TriajeImage";

export const TriajeInicial = () => {
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = (data: any) => {
    setLoading(true);
    // comunicarse con backend para generar la cita falta esa lógica
    setTimeout(() => {
      console.log(data);
      setLoading(false);
      navigate("/resultado-triaje"); // Redirige a la vista de resultado
    }, 2000);
  };

  return (
    <div className="triaje-container">
      <h1 className="triaje-title">TRIAJE INICIAL</h1>
      <div className="triaje-content">
        <TriajeForm onSubmit={handleSubmit} />
        <TriajeImage />
      </div>
      {loading && <LoadingOverlay />}
    </div>
  );
};
