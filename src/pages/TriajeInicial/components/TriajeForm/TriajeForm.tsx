import React, { useState } from "react";
import { TriajeFormSchema, TriajeFormData } from "../../models"; // Importa el esquema
import "./TriajeForm.css";

interface TriajeFormProps {
  onSubmit: (data: TriajeFormData) => void;
}

export const TriajeForm: React.FC<TriajeFormProps> = ({ onSubmit }) => {
  const [errors, setErrors] = useState<Record<string, string>>({});

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);

    // Crear el objeto de datos sin el archivo
    const data: TriajeFormData = {
      historialMedico: formData.get("historialMedico") as File,
      sintomas: formData.get("sintomas") as string,
      habitosAlimenticios: formData.get("habitosAlimenticios") as string,
      alimentosFavoritos: formData.get("alimentosFavoritos") as string,
      alimentosNoTolerados: formData.get("alimentosNoTolerados") as string,
      objetivos: formData
        .getAll("objetivo")
        .map((value) => value.toString()) as ("perder_peso" | "ganar_masa")[],
      objetivoOtro: formData.get("objetivoOtro") as string,
    };

    // Validación con Zod
    const validation = TriajeFormSchema.safeParse(data);

    if (!validation.success) {
      const newErrors: Record<string, string> = {};
      validation.error.errors.forEach((error) => {
        const key = error.path[0] as string;
        newErrors[key] = error.message;
      });
      setErrors(newErrors);
      return;
    }

    // Si la validación pasa, enviar los datos (incluido el archivo)
    setErrors({});
    const submitData = new FormData();
    submitData.append("historialMedico", validation.data.historialMedico); // Asegúrate de enviar el archivo
    submitData.append("sintomas", validation.data.sintomas);
    submitData.append(
      "habitosAlimenticios",
      validation.data.habitosAlimenticios
    );
    //@ts-ignore
    submitData.append("alimentosFavoritos", validation.data.alimentosFavoritos);
    //@ts-ignore
    submitData.append(
      "alimentosNoTolerados",
      validation.data.alimentosNoTolerados
    );
    //@ts-ignore
    validation.data.objetivos.forEach((objetivo) =>
      submitData.append("objetivo", objetivo)
    );
    //@ts-ignore
    submitData.append("objetivoOtro", validation.data.objetivoOtro | "");

    // Inspeccionar el contenido de FormData
    for (let [key, value] of submitData.entries()) {
      console.log(`${key}:`, value);
    }
    onSubmit(validation.data); // Este es el console.log o lo que desees hacer con los datos validados
    e.currentTarget.reset(); // Limpiar el formulario
  };

  return (
    <form className="triaje-form" onSubmit={handleSubmit}>
      <label className="form-label">
        Historial Médico
        <input type="file" name="historialMedico" className="input-file" />
        {errors.historialMedico && (
          <span className="error-message">{errors.historialMedico}</span>
        )}
      </label>

      <label className="form-label">Síntomas</label>
      <textarea
        name="sintomas"
        className="input-textarea"
        rows={4}
        placeholder="Describe tus síntomas aquí..."
      />
      {errors.sintomas && (
        <span className="error-message">{errors.sintomas}</span>
      )}

      <label className="form-label">Hábitos Alimenticios</label>
      <textarea
        name="habitosAlimenticios"
        className="input-textarea"
        rows={4}
        placeholder="Describe tus hábitos alimenticios aquí..."
      />
      {errors.habitosAlimenticios && (
        <span className="error-message">{errors.habitosAlimenticios}</span>
      )}

      <label className="form-label">Me encanta comer :</label>
      <textarea
        name="alimentosFavoritos"
        className="input-textarea"
        rows={2}
        placeholder="Ingresa alimentos favoritos aquí..."
      />
      {errors.alimentosFavoritos && (
        <span className="error-message">{errors.alimentosFavoritos}</span>
      )}

      <label className="form-label">No tolero comer :</label>
      <textarea
        name="alimentosNoTolerados"
        className="input-textarea"
        rows={2}
        placeholder="Ingresa alimentos que no toleras aquí..."
      />
      {errors.alimentosNoTolerados && (
        <span className="error-message">{errors.alimentosNoTolerados}</span>
      )}

      <div className="objetivos-especificos">
        <label>Objetivos Específicos</label>
        <div className="checkbox-group">
          <div
            style={{
              display: "flex",
              alignItems: "center",
              minWidth: "500px",
              maxWidth: "500px",
            }}
          >
            <label>Perder peso</label>
            <input type="checkbox" name="objetivo" value="perder_peso" />
          </div>
          <div style={{ display: "flex", alignItems: "center" }}>
            <label>Ganar masa muscular</label>
            <input type="checkbox" name="objetivo" value="ganar_masa" />
          </div>
        </div>

        <label className="form-label">Otro:</label>
        <textarea
          name="objetivoOtro"
          className="input-textarea"
          rows={2}
          placeholder="Especifica otros objetivos..."
        />
        {errors.objetivoOtro && (
          <span className="error-message">{errors.objetivoOtro}</span>
        )}
      </div>

      <button type="submit" className="submit-button">
        Generar Reporte
      </button>
    </form>
  );
};
