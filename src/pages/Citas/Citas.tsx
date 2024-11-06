import "./Citas.css";
import { RowCita } from "./RowCita/RowCita";

export const Citas = () => {
  const data = [
    {
      id: 12312,
      fecha: "08-10-2024",
      hora: "15:00",
      id_nutricionista: "1232",
      meet: "https://meetdasdsadafasfsadscklsamckasmcsaklxmk",
      estado: "listo",
    },
  ];

  const nutricionista = {
    id_nutricionista: "1232",
    nombre: "Elizabeth Chavez",
  };

  return (
    <div className="citas-container">
      <h1 className="citas-title">Tus Citas</h1>

      <div className="citas-seccion">
        <h2 className="citas-subtitle">Listado de Citas</h2>

        <table className="citas-table">
          <thead>
            <tr>
              <th className="table-header">ID</th>
              <th className="table-header">Fecha y Hora de la Cita</th>
              <th className="table-header">Nutricionista Seleccionado</th>
              <th className="table-header">Enlace Meet</th>
              <th className="table-header">Estado</th>
              <th>
                <span className="sr-only">Acciones</span>
              </th>
            </tr>
          </thead>
          <tbody>
            {data.map((cita) => (
              <RowCita
                id={cita.id}
                fecha={cita.fecha}
                hora={cita.hora}
                nombre_nutricionista={nutricionista.nombre}
                enlace_meet={cita.meet}
                estado={cita.estado}
              />
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};
