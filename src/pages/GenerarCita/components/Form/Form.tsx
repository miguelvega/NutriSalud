import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { appointmentSchema, FormValues } from "../../models";
import { zodResolver } from "@hookform/resolvers/zod";
import { NutricionistaList } from "../NutricionistaList/NutricionistaList";
import { ReporteSection } from "../ReporteSection/ReporteSection";
import { ConsultaSection } from "../ConsultaSection/ConsultaSection";
import { MdArrowOutward } from "react-icons/md";
import { useState } from "react";
import { LoadingComponent } from "../LoadingComponent/LoadingComponent";
import "./Form.css";
import { useAuth } from "../../../../context";

export const Form = () => {
  // user de useAuth
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const { user } = useAuth();
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<FormValues>({
    resolver: zodResolver(appointmentSchema),
    defaultValues: {
      appointment_type: undefined,
      date: "",
      nutritionist_id: "",
      report: undefined,
      time: "",
    },
  });

  const onSubmit = async (data: FormValues) => {
    const new_data = {
      ...data,
      patient_id: user.id,
    };
    const { report, ...data_without_report } = new_data;
    console.log(data_without_report);

    setLoading(true);
    // comunicarse con backend para generar la cita falta esa lógica
    try {
      const response = await fetch("http://localhost:8000/cita", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data_without_report), // Convierte el objeto a JSON
      });

      console.log(response);

      if (!response.ok) {
        throw new Error(
          "Error en la solicitud, algunos horarios seguro ya han sido asignados"
        );
      }

      const responseData = await response.json();
      console.log(responseData); // Maneja la respuesta del servidor
      navigate("/citas"); // Redirige a la vista de resultado
      const messageToast = responseData.message;
      console.log("mensaje de exito: ", messageToast);
    } catch (error) {
      console.error("Error al enviar los datos:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <form className="section-form" onSubmit={handleSubmit(onSubmit)}>
      <div className="section-left">
        <NutricionistaList
          control={control}
          name="nutritionist_id"
          error={errors.nutritionist_id}
        />

        <ReporteSection name="report" control={control} error={errors.report} />
      </div>

      <div className="section-right">
        <ConsultaSection control={control} errors={errors} />
      </div>

      <button className="boton-generar-cita" type="submit">
        Generar Cita
        <MdArrowOutward size={24} />
      </button>
      {loading && <LoadingComponent />}
    </form>
  );
};
