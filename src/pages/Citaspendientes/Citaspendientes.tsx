import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import ConfirmDialog from './ConfirmDialog';
import './Citaspendientes.css';

type Cita = {
  id: string;
  fecha: string;
  paciente: string;
  enlace: string;
  estado: 'Listo' | 'Espera';
};

const Citaspendientes: React.FC = () => {
  const [citas, setCitas] = useState<Cita[]>([
    { id: '1242135DA', fecha: '11 - 10 - 2024 / 15 : 00', paciente: 'Elizabeth Chavez', enlace: 'https://meet.link/1', estado: 'Listo' },
    { id: '1235315DA', fecha: '11 - 10 - 2024 / 15 : 30', paciente: 'Mendoza Carlos', enlace: 'https://meet.link/2', estado: 'Espera' },
    { id: '8032415DA', fecha: '11 - 10 - 2024 / 16 : 00', paciente: 'Miguel Vega', enlace: 'https://meet.link/3', estado: 'Espera' },
  ]);

  const [showConfirm, setShowConfirm] = useState<string | null>(null);

  const handleDeleteClick = (id: string) => {
    setShowConfirm(id);
  };

  const confirmDelete = () => {
    if (showConfirm) {
      setCitas(citas.filter(cita => cita.id !== showConfirm));
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
            <tr
              key={cita.id}
              className={showConfirm === cita.id ? 'highlighted-row' : ''}
            >
              <td>{cita.id}</td>
              <td>{cita.fecha}</td>
              <td>{cita.paciente}</td>
              <td><a href={cita.enlace} target="_blank" rel="noopener noreferrer">{cita.enlace}</a></td>
              <td>
                <span className={`estado ${cita.estado.toLowerCase()}`}>{cita.estado}</span>
              </td>
              <td>
                <button className="delete-button" onClick={() => handleDeleteClick(cita.id)}>
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

      <Link to="/inicio-medico">
        <button className="back-button">Volver</button>
      </Link>
    </div>
  );
};

export default Citaspendientes;
