import { Form } from "./components";
import "./GenerarCita.css";

export const GenerarCita = () => {
  return (
    <div className="contenedor-cita">
      <h1 className="titulo-cita">Programación de Citas</h1>

      <Form />
    </div>

    // {
    //   "nutritionist_id": "67469892da0594c498d51564",
    //   "nutritionist": "Luis Perez Ruiz",
    //   "patient_id": "6746cf6bece781de20772a24",
    //   "appointmentType": "Seguimiento",
    //   "date": "2024-11-18",
    //   "time": "01:54",
    //   "report": {}
    // }
  );
};
