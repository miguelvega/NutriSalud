import "./ConsultaSection.css";

export const ConsultaSection = () => (
  <div className="section-consulta">
    <div className="tipo-consulta">
      <h2>Tipo de Consulta:</h2>
      <label>
        <input type="radio" name="tipo_consulta" value="seguimiento" />{" "}
        Seguimiento
      </label>
      <label>
        <input type="radio" name="tipo_consulta" value="primera_visita" />{" "}
        Primera visita
      </label>
    </div>

    <div className="input-fecha">
      <h2>Fecha:</h2>
      <input type="date" />
    </div>

    <div className="input-hora">
      <h2>Hora:</h2>
      <input type="time" />
    </div>
  </div>
);
