import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import "./DetalleCita.css";

type Cita = {
  id: string;
  fecha: string;
  paciente: string;
  enlace: string;
  estado: "Listo" | "Espera";
};

const DetalleCita: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [citas, setCitas] = useState<Cita[]>([
    {
      id: "1242135DA",
      fecha: "11 - 10 - 2024 / 15 : 00",
      paciente: "Elizabeth Chavez",
      enlace: "https://meet.link/1",
      estado: "Espera",
    },
    {
      id: "1235315DA",
      fecha: "11 - 10 - 2024 / 15 : 30",
      paciente: "Mendoza Carlos",
      enlace: "https://meet.link/2",
      estado: "Espera",
    },
    {
      id: "8032415DA",
      fecha: "11 - 10 - 2024 / 16 : 00",
      paciente: "Miguel Vega",
      enlace: "https://meet.link/3",
      estado: "Espera",
    },
  ]);

  const cita = citas.find((c) => c.id === id);

  useEffect(() => {
    const interval = setInterval(() => {
      const ahora = new Date();

      const citasActualizadas = citas.map((cita) => {
        const [fecha, hora] = cita.fecha.split(" / ");
        const [dia, mes, anio] = fecha.split(" - ").map(Number);
        const [horaCita, minutoCita] = hora.split(" : ").map(Number);

        const fechaCita = new Date(anio, mes - 1, dia, horaCita, minutoCita);

        const diferenciaMinutos =
          (ahora.getTime() - fechaCita.getTime()) / (1000 * 60);

        // Cambiar estado a "Listo" si está dentro del intervalo de 0 a 30 minutos
        if (diferenciaMinutos >= 0 && diferenciaMinutos <= 30) {
          return { ...cita, estado: "Listo" as "Listo" }; // Especificar explícitamente el tipo
        }

        return cita;
      });

      setCitas(citasActualizadas);
    }, 1000 * 60); // Revisión cada minuto

    return () => clearInterval(interval); // Limpiar intervalo al desmontar el componente
  }, [citas]);

  if (!cita) {
    return <p>Cita no encontrada</p>;
  }

  return (
    <div className="detalle-cita-container">
      <h2>Tus Citas</h2>
      <div className="detalle-cita-card">
        <table className="detalle-cita-table">
          <tbody>
            <tr>
              <td>
                <strong>ID:</strong>
              </td>
              <td>{cita.id}</td>
            </tr>
            <tr>
              <td>
                <strong>Fecha:</strong>
              </td>
              <td>{cita.fecha}</td>
            </tr>
            <tr>
              <td>
                <strong>Paciente:</strong>
              </td>
              <td>{cita.paciente}</td>
            </tr>
            <tr>
              <td>
                <strong>Enlace:</strong>
              </td>
              <td>
                <a href={cita.enlace} target="_blank" rel="noopener noreferrer">
                  {cita.enlace}
                </a>
              </td>
            </tr>
            <tr>
              <td>
                <strong>Estado:</strong>
              </td>
              <td>
                <span className={`estado ${cita.estado.toLowerCase()}`}>
                  {cita.estado}
                </span>
              </td>
            </tr>
          </tbody>
        </table>
        <div className="detalle-cita-actions-grid">
          <div className="action-item">
            <span>
              <strong>Historial médico:</strong>
            </span>
            <button className="archivo-button">
              <img
                src="/src/assets/leer_historial.png"
                alt="Historial Médico"
              />
            </button>
          </div>
          <div className="action-item">
            <span>
              <strong>Triaje:</strong>
            </span>
            <button className="archivo-button">
              <img src="/src/assets/leer_triaje.png" alt="Triaje" />
            </button>
          </div>
          <div className="action-item">
            <span>
              <strong>Realizar prescripción:</strong>
            </span>
            <Link to={`/prescripcion/${id}`}>
              <button className="prescripcion-button">
                <img
                  src="/src/assets/realizar_prescripcion.png"
                  alt="Prescripción"
                />
              </button>
            </Link>
          </div>
        </div>
      </div>
      <div className="detalle-cita-footer">
        <Link to="/citas-pendientes">
          <button className="footer-button">Volver</button>
        </Link>
      </div>
    </div>
  );
};

export default DetalleCita;
