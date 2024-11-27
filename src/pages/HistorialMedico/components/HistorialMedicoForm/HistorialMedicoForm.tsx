import { useForm, Controller, SubmitHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { HistorialMedicoSchema, HistorialMedicoFormData } from "./../../models"; // Ajusta la ruta del archivo
import "./HistorialMedicoForm.css"; // Asegúrate de tener los estilos en este archivo

export const HistorialMedicoForm = () => {
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<HistorialMedicoFormData>({
    resolver: zodResolver(HistorialMedicoSchema),
  });

  const onSubmit: SubmitHandler<HistorialMedicoFormData> = (data) => {
    console.log(data); // Aquí puedes manejar los datos del formulario
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="form-container">
      <h2>Actualizar Historial Médico</h2>

      {/* Nombre Completo */}
      <div className="form-group">
        <label htmlFor="nombreCompleto">Nombre Completo</label>
        <Controller
          name="nombreCompleto"
          control={control}
          render={({ field }) => <input {...field} id="nombreCompleto" />}
        />
        {errors.nombreCompleto && (
          <p className="error">{errors.nombreCompleto.message}</p>
        )}
      </div>

      {/* Sexo */}
      <div className="form-group">
        <label>Sexo</label>
        <Controller
          name="sexo"
          control={control}
          render={({ field }) => (
            <div>
              <input type="radio" {...field} value="Femenino" id="femenino" />{" "}
              Femenino
              <input
                type="radio"
                {...field}
                value="Masculino"
                id="masculino"
              />{" "}
              Masculino
            </div>
          )}
        />
        {errors.sexo && <p className="error">{errors.sexo.message}</p>}
      </div>

      {/* Teléfono */}
      <div className="form-group">
        <label htmlFor="telefono">Teléfono</label>
        <Controller
          name="telefono"
          control={control}
          render={({ field }) => <input {...field} id="telefono" />}
        />
        {errors.telefono && <p className="error">{errors.telefono.message}</p>}
      </div>

      {/* Fecha de Nacimiento */}
      <div className="form-group">
        <label htmlFor="fechaNacimiento">Fecha de Nacimiento</label>
        <Controller
          name="fechaNacimiento"
          control={control}
          render={({ field }) => (
            <input type="date" {...field} id="fechaNacimiento" />
          )}
        />
        {errors.fechaNacimiento && (
          <p className="error">{errors.fechaNacimiento.message}</p>
        )}
      </div>

      {/* Ocupación */}
      <div className="form-group">
        <label htmlFor="ocupacion">Ocupación</label>
        <Controller
          name="ocupacion"
          control={control}
          render={({ field }) => <input {...field} id="ocupacion" />}
        />
        {errors.ocupacion && (
          <p className="error">{errors.ocupacion.message}</p>
        )}
      </div>

      {/* Proveedor de Seguro */}
      <div className="form-group">
        <label htmlFor="proveedorSeguro">Proveedor de Seguro</label>
        <Controller
          name="proveedorSeguro"
          control={control}
          render={({ field }) => <input {...field} id="proveedorSeguro" />}
        />
        {errors.proveedorSeguro && (
          <p className="error">{errors.proveedorSeguro.message}</p>
        )}
      </div>

      {/* Fecha de Expiración */}
      <div className="form-group">
        <label htmlFor="fechaExpiracion">Fecha de Expiración</label>
        <Controller
          name="fechaExpiracion"
          control={control}
          render={({ field }) => (
            <input type="date" {...field} id="fechaExpiracion" />
          )}
        />
        {errors.fechaExpiracion && (
          <p className="error">{errors.fechaExpiracion.message}</p>
        )}
      </div>

      {/* Peso y Altura */}
      <div className="form-group">
        <label htmlFor="peso">Peso (Kg)</label>
        <Controller
          name="peso"
          control={control}
          render={({ field }) => <input type="number" {...field} id="peso" />}
        />
        {errors.peso && <p className="error">{errors.peso.message}</p>}
      </div>
      <div className="form-group">
        <label htmlFor="altura">Altura (m)</label>
        <Controller
          name="altura"
          control={control}
          render={({ field }) => <input type="number" {...field} id="altura" />}
        />
        {errors.altura && <p className="error">{errors.altura.message}</p>}
      </div>

      {/* Alergias */}
      <div className="form-group">
        <label htmlFor="alergias">Alergias</label>
        <Controller
          name="alergias"
          control={control}
          render={({ field }) => <textarea {...field} id="alergias" />}
        />
      </div>

      {/* Enfermedades Crónicas */}
      <div className="form-group">
        <label htmlFor="enfermedadesCronicas">Enfermedades Crónicas</label>
        <Controller
          name="enfermedadesCronicas"
          control={control}
          render={({ field }) => (
            <textarea {...field} id="enfermedadesCronicas" />
          )}
        />
      </div>

      {/* Botones de acción */}
      <div className="form-buttons">
        <button type="button" className="btn btn-secondary">
          Descargar PDF
        </button>
        <button type="submit" className="btn btn-primary">
          Actualizar
        </button>
      </div>
    </form>
  );
};
