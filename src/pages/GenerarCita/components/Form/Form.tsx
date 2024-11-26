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

export const Form = () => {
  // user de useAuth
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<FormValues>({
    resolver: zodResolver(appointmentSchema),
    defaultValues: {
      appointmentType: undefined,
      date: "",
      nutritionist: "",
      report: undefined,
      time: "",
    },
  });

  const onSubmit = (data: FormValues) => {
    console.log(data);
    setLoading(true);
    // comunicarse con backend para generar la cita falta esa lógica
    setTimeout(() => {
      setLoading(false);
      navigate("/citas"); // Redirige a la vista de resultado
    }, 2000);
  };

  return (
    <form className="section-form" onSubmit={handleSubmit(onSubmit)}>
      <div className="section-left">
        <NutricionistaList
          control={control}
          name="nutritionist"
          error={errors.nutritionist}
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
