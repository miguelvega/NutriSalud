import { useEffect, useState } from "react";
import "./Citas.css";
import { RowCita } from "./RowCita/RowCita";
import { useAuth } from "../../context";

export const Citas = () => {
  // LLAMADA AL ENDPOINT DE /cita/usuario params: patient_id
  const [citas, setCitas] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const { user } = useAuth();

  useEffect(() => {
    const fetchCitas = async () => {
      setLoading(true);
      setError(null);
      try {
        const response = await fetch(
          `http://localhost:8000/cita/usuario?patient_id=${user.id}`,
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
            },
          }
        );

        if (!response.ok) {
          throw new Error(
            "Error en la solicitud, algunos horarios seguro ya han sido asignados"
          );
        }

        const responseData = await response.json();
        setCitas(responseData); // Actualiza el estado con los datos obtenidos
        console.log(responseData);
      } catch (error: any) {
        setError(error.message);
        console.error("Error al obtener las citas:", error);
      } finally {
        setLoading(false);
      }
    };

    if (user?.id) {
      fetchCitas();
    }
  }, [user]);

  return (
    <div className="citas-container">
      <h1 className="citas-title">Tus Citas</h1>

      <div className="citas-seccion">
        <h2 className="citas-subtitle">Listado de Citas</h2>

        {citas.length > 0 ? (
          <table className="citas-table">
            <thead>
              <tr>
                <th className="table-header">ID</th>
                <th className="table-header">Fecha y Hora de la Cita</th>
                <th className="table-header">Nutricionista Seleccionado</th>
                <th className="table-header">Enlace Meet</th>
                <th className="table-header">Tipo</th>
                <th>
                  <span className="sr-only">Acciones</span>
                </th>
              </tr>
            </thead>
            <tbody>
              {citas.map((cita, index) => (
                <RowCita
                  key={index}
                  // @ts-ignore
                  id={cita._id}
                  //@ts-ignore
                  fecha={cita.date}
                  //@ts-ignore
                  hora={cita.time}
                  nombre_nutricionista={"nutricionista.nombre"}
                  enlace_meet={"cita.meet"}
                  // @ts-ignore
                  tipo={cita.appointment_type}
                />
              ))}
            </tbody>
          </table>
        ) : (
          <div>
            <p>Aún no tiene creada ninguna cita</p>
          </div>
        )}
      </div>
    </div>
  );
};
