import { useState } from "react";
import {
  ConsultaSection,
  GenerarCitaButton,
  LoadingComponent,
  NutricionistaList,
  ReporteSection,
} from "./components";
import "./GenerarCita.css";
import { useNavigate } from "react-router-dom";

export const GenerarCita = () => {
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    // comunicarse con backend para generar la cita falta esa lógica
    setTimeout(() => {
      setLoading(false);
      navigate("/citas"); // Redirige a la vista de resultado
    }, 2000);
  };

  return (
    <div className="contenedor-cita">
      <h1 className="titulo-cita">Programación de Citas</h1>

      <div className="section-form">
        <div className="section-left">
          <NutricionistaList />
          <ReporteSection />
        </div>

        <div className="section-right">
          <ConsultaSection />
        </div>

        <GenerarCitaButton onSubmit={handleSubmit} />
        {loading && <LoadingComponent />}
      </div>
    </div>
  );
};
