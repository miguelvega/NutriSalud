import React, { useState } from "react";
import "./TriajeInicial.css";
import { TriajeForm } from "./components/TriajeForm/TriajeForm";
import { LoadingOverlay } from "./components/LoadingOverlay/LoadingOverlay";
import { TriajeImage } from "./components/TriajeImage/TriajeImage";

export const TriajeInicial = () => {
  const [loading, setLoading] = useState(false);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      alert("Reporte generado exitosamente.");
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
