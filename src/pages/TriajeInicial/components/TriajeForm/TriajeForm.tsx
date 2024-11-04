import React from "react";
import "./TriajeForm.css";

interface TriajeFormProps {
  onSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
}

export const TriajeForm: React.FC<TriajeFormProps> = ({ onSubmit }) => {
  return (
    <form className="triaje-form" onSubmit={onSubmit}>
      <label className="form-label">
        Historial Médico
        <input type="file" className="input-file" />
      </label>

      <label className="form-label">Síntomas</label>
      <textarea
        className="input-textarea"
        rows={4}
        placeholder="Describe tus síntomas aquí..."
      />

      <label className="form-label">Hábitos Alimenticios</label>
      <textarea
        className="input-textarea"
        rows={4}
        placeholder="Describe tus hábitos alimenticios aquí..."
      />

      <label className="form-label">Me encanta comer :</label>
      <textarea
        className="input-textarea"
        rows={2}
        placeholder="Ingresa alimentos favoritos aquí..."
      />

      <label className="form-label">No tolero comer :</label>
      <textarea
        className="input-textarea"
        rows={2}
        placeholder="Ingresa alimentos que no toleras aquí..."
      />

      <div className="objetivos-especificos">
        <label>Objetivos Específicos</label>
        <div className="checkbox-group">
          <label>
            <input type="checkbox" name="objetivo" value="perder_peso" /> Perder
            peso
          </label>
          <label>
            <input type="checkbox" name="objetivo" value="ganar_masa" /> Ganar
            masa muscular
          </label>
          <label className="form-label">Otro:</label>
          <textarea
            className="input-textarea"
            rows={2}
            placeholder="Especifica otros objetivos..."
          />
        </div>
      </div>

      <button type="submit" className="submit-button">
        Generar Reporte
      </button>
    </form>
  );
};
