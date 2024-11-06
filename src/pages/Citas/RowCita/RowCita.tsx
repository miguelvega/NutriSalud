import { useState } from "react";
import { FaTrash } from "react-icons/fa";
import "./RowCita.css";

interface Props {
  id: number;
  fecha: string;
  hora: string;
  nombre_nutricionista: string;
  enlace_meet: string;
  estado: string;
}

export const RowCita = ({
  id,
  fecha,
  hora,
  nombre_nutricionista,
  enlace_meet,
  estado,
}: Props) => {
  const [showModal, setShowModal] = useState(false);

  const handleDeleteClick = () => {
    setShowModal(true);
  };

  const handleConfirmDelete = () => {
    // Add your delete logic here
    setShowModal(false);
  };

  const handleCancelDelete = () => {
    setShowModal(false);
  };

  return (
    <>
      <tr className="cita-row">
        <td className="cita-id">{id}</td>
        <td className="cita-fecha-hora">
          {fecha} / {hora}
        </td>
        <td className="cita-nutricionista">{nombre_nutricionista}</td>
        <td className="cita-enlace-meet">{enlace_meet}</td>
        <td className="cita-estado">
          <span className="status-badge">{estado}</span>
        </td>
        <td className="cita-delete">
          <button
            className="delete-button"
            aria-label="Eliminar Cita"
            onClick={handleDeleteClick}
          >
            <FaTrash />
          </button>
        </td>
      </tr>

            {showModal && (
        <div className="modal-overlay">
          <div className="modal">
            <p>¿Quieres cancelar la cita?</p>
            <button className="accept-button" onClick={handleConfirmDelete}>
              Aceptar
            </button>
            <button className="cancel-button" onClick={handleCancelDelete}>
              Cancelar
            </button>
          </div>
        </div>
      )}
    </>
  );
};
