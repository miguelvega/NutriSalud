import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import ConfirmDialog from "./ConfirmDialog";
import "./Citaspendientes.css";

type Cita = {
  id: string;
  fecha: string;
  paciente: string;
  enlace: string;
  estado: "Listo" | "Espera";
};

const Citaspendientes: React.FC = () => {
  const [citas, setCitas] = useState<Cita[]>([
    { id: "1242135DA", fecha: "11 - 10 - 2024 / 15 : 00", paciente: "Elizabeth Chavez", enlace: "https://meet.link/1", estado: "Espera" },
    { id: "1235315DA", fecha: "11 - 10 - 2024 / 15 : 30", paciente: "Mendoza Carlos", enlace: "https://meet.link/2", estado: "Espera" },
    { id: "8032415DA", fecha: "11 - 10 - 2024 / 16 : 00", paciente: "Miguel Vega", enlace: "https://meet.link/3", estado: "Espera" },
  ]);

  const [showConfirm, setShowConfirm] = useState<string | null>(null);

  // Actualiza el estado de las citas automáticamente
  useEffect(() => {
    const interval = setInterval(() => {
      const ahora = new Date();

      const citasActualizadas = citas.map((cita) => {
        const [fecha, hora] = cita.fecha.split(" / ");
        const [dia, mes, anio] = fecha.split(" - ").map(Number);
        const [horaCita, minutoCita] = hora.split(" : ").map(Number);

        const fechaCita = new Date(anio, mes - 1, dia, horaCita, minutoCita);

        const diferenciaMinutos = (ahora.getTime() - fechaCita.getTime()) / (1000 * 60);

        // Cambiar estado a "Listo" si está dentro del intervalo de 0 a 30 minutos
        if (diferenciaMinutos >= 0 && diferenciaMinutos <= 30) {
          return { ...cita, estado: "Listo" };
        }

        // Eliminar citas con más de 30 minutos
        if (diferenciaMinutos > 30) {
          return null;
        }

        return cita;
      }).filter((cita) => cita !== null) as Cita[];

      setCitas(citasActualizadas);
    }, 1000 * 60); // Revisión cada minuto

    return () => clearInterval(interval); // Limpiar intervalo al desmontar el componente
  }, [citas]);

  const handleDeleteClick = (id: string) => {
    setShowConfirm(id);
  };

  const confirmDelete = () => {
    if (showConfirm) {
      setCitas(citas.filter((cita) => cita.id !== showConfirm));
    }
    setShowConfirm(null);
  };

  const cancelDelete = () => {
    setShowConfirm(null);
  };

  return (
    <div className="citaspendientes-container">
      <h2>Tus Citas</h2>
      <table className="citas-table">
        <thead>
          <tr>
            <th>ID</th>
            <th>Fecha de Creación y Hora</th>
            <th>Paciente</th>
            <th>Enlace Meet</th>
            <th>Estado</th>
            <th>Acción</th>
          </tr>
        </thead>
        <tbody>
          {citas.map((cita) => (
            <tr key={cita.id}>
              <td>{cita.id}</td>
              <td>{cita.fecha}</td>
              <td>
                <Link
                  to={`/citas/${cita.id}`}
                  className="cita-paciente-link"
                  title={`Ver detalles de ${cita.paciente}`}
                >
                  {cita.paciente}
                </Link>
              </td>
              <td>
                <a href={cita.enlace} target="_blank" rel="noopener noreferrer">
                  {cita.enlace}
                </a>
              </td>
              <td>
                <span className={`estado ${cita.estado.toLowerCase()}`}>
                  {cita.estado}
                </span>
              </td>
              <td>
                <button
                  className="delete-button"
                  onClick={() => handleDeleteClick(cita.id)}
                >
                  🗑
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <ConfirmDialog
        message="¿Quieres cancelar la cita?"
        onConfirm={confirmDelete}
        onCancel={cancelDelete}
        show={Boolean(showConfirm)}
      />

      <div className="back-button-container">
        <Link to="/inicio-medico">
          <button className="back-button">Volver</button>
        </Link>
      </div>
    </div>
  );
};

export default Citaspendientes;
