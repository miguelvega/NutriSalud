import { Control, Controller, FieldError } from "react-hook-form";
import { FormValues } from "../../models";
import "./ConsultaSection.css";

interface Props {
  control: Control<FormValues>;
  errors: {
    appointmentType?: FieldError;
    date?: FieldError;
    time?: FieldError;
  };
}

export const ConsultaSection = ({ control, errors }: Props) => (
  <div className="section-consulta">
    <div className="tipo-consulta">
      <h2>Tipo de Consulta:</h2>
      <Controller
        name="appointmentType"
        control={control}
        render={({ field }) => (
          <>
            <label>
              <input
                type="radio"
                value="Seguimiento"
                checked={field.value === "Seguimiento"}
                onChange={field.onChange}
              />{" "}
              Seguimiento
            </label>
            <label>
              <input
                type="radio"
                value="Primera visita"
                checked={field.value === "Primera visita"}
                onChange={field.onChange}
              />{" "}
              Primera visita
            </label>
          </>
        )}
      />
      {errors.appointmentType && (
        <p className="error">{errors.appointmentType.message}</p>
      )}
    </div>

    <div className="input-fecha">
      <h2>Fecha:</h2>
      <Controller
        name="date"
        control={control}
        render={({ field }) => (
          <input
            type="date"
            {...field}
            className={errors.date ? "is-invalid" : ""}
          />
        )}
      />
      {errors.date && <p className="error">{errors.date.message}</p>}
    </div>

    <div className="input-hora">
      <h2>Hora:</h2>
      <Controller
        name="time"
        control={control}
        render={({ field }) => (
          <input
            type="time"
            {...field}
            className={errors.time ? "is-invalid" : ""}
          />
        )}
      />
      {errors.time && <p className="error">{errors.time.message}</p>}
    </div>
  </div>
);
