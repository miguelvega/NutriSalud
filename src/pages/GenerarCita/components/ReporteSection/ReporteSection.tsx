import { AiOutlineEye, AiOutlineReload } from "react-icons/ai";
import "./ReporteSection.css";
import { FormValues } from "../../models";
import { Control, Controller, FieldError } from "react-hook-form";

interface Props {
  name: keyof FormValues;
  control: Control<FormValues>;
  error?: FieldError;
  onViewReport?: () => void;
}

export const ReporteSection = ({
  name,
  control,
  error,
  onViewReport,
}: Props) => {
  return (
    <div className="seccion-reporte">
      <div className="label-desc">
        <h2>Reporte a enviar al médico</h2>
        <p>Reportes generados por el triaje</p>
      </div>
      <Controller
        name={name}
        control={control}
        render={({ field }) => (
          <>
            <input
              type="file"
              accept=".pdf"
              className={`input-archivo ${error ? "is-invalid" : ""}`}
              onChange={(e) => {
                const file = e.target.files?.[0];
                field.onChange(file); // Actualiza el valor del controlador
                if (file) {
                  console.log("Archivo Seleccionado: ", file.name);
                }
              }}
              style={{ display: "none" }} // Oculta el input
              ref={field.ref}
              id={`input-${name}`}
            />
            {error && <p className="error">{error.message}</p>}

            <div className="reporte-generado">
              <label
                htmlFor={`input-${name}`}
                className="upload-label"
                style={{ cursor: "pointer" }}
              >
                {/* Mostrar el nombre del archivo si existe, si no, mostrar "Subir reporte" */}
                <span>
                  {field.value instanceof File && field.value.name
                    ? field.value.name
                    : "Subir reporte"}
                </span>
              </label>

              <div className="buttons-reporte">
                {onViewReport && (
                  <button
                    className="boton-icono boton-ver"
                    onClick={onViewReport}
                    type="button"
                    disabled={!field.value} // Desactivar si no hay archivo
                  >
                    <AiOutlineEye />
                  </button>
                )}
                <button
                  className="boton-icono boton-reload"
                  type="button"
                  onClick={() => {
                    const input = document.getElementById(
                      `input-${name}`
                    ) as HTMLInputElement;
                    if (input) input.click(); // Abrir el selector de archivos
                  }}
                >
                  <AiOutlineReload />
                </button>
              </div>
            </div>
          </>
        )}
      />
    </div>
  );
};
