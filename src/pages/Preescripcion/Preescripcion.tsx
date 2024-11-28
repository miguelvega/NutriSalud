import React, { useState } from "react";
import { Link, useParams, useNavigate } from "react-router-dom";
import AdvertenciaPrescripcion from "./AdvertenciaPreescripcion";
import "./Preescripcion.css";

const citas = [
  { id: "1242135DA", nombre: "Elizabeth Chavez" },
  { id: "1235315DA", nombre: "Mendoza Carlos" },
  { id: "8032415DA", nombre: "Miguel Vega" },
];

export const Preescripcion: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [habilitarFecha, setHabilitarFecha] = useState(false);
  const [edad, setEdad] = useState<string>("");
  const [peso, setPeso] = useState<string>("");
  const [altura, setAltura] = useState<string>("");
  const [calorias, setCalorias] = useState<string>("");
  const [mostrarAdvertencia, setMostrarAdvertencia] = useState(false);

  const paciente =
    citas.find((cita) => cita.id === id)?.nombre || "Paciente no encontrado";

  const manejarCambioCita = (event: React.ChangeEvent<HTMLInputElement>) => {
    setHabilitarFecha(event.target.value === "si");
  };

  const validarEnteroPositivo = (
    valor: string,
    maxLength?: number
  ): boolean => {
    const regex = new RegExp(`^[1-9]\\d{0,${(maxLength || 0) - 1}}$`);
    return regex.test(valor);
  };

  const validarDecimalPeso = (valor: string): boolean => {
    return /^([1-9]\d{0,2})(\.\d{0,2})?$/.test(valor); // Parte entera: hasta 3 dígitos, Parte decimal: hasta 2 dígitos
  };

  const validarDecimalAltura = (valor: string): boolean => {
    return /^[1-9](\.\d{0,2})?$/.test(valor); // Parte entera: 1 dígito, Parte decimal: hasta 2 dígitos
  };

  const manejarCambioEdad = (event: React.ChangeEvent<HTMLInputElement>) => {
    const valor = event.target.value;
    if (valor === "" || validarEnteroPositivo(valor, 3)) {
      setEdad(valor);
    }
  };

  const manejarCambioPeso = (event: React.ChangeEvent<HTMLInputElement>) => {
    const valor = event.target.value;
    if (valor === "" || validarDecimalPeso(valor)) {
      setPeso(valor);
    }
  };

  const manejarCambioAltura = (event: React.ChangeEvent<HTMLInputElement>) => {
    const valor = event.target.value;
    if (valor === "" || validarDecimalAltura(valor)) {
      setAltura(valor);
    }
  };

  const manejarCambioCalorias = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const valor = event.target.value;
    if (valor === "" || validarEnteroPositivo(valor, 4)) {
      setCalorias(valor);
    }
  };

  const manejarGuardar = () => {
    setMostrarAdvertencia(true);
  };

  const confirmarGuardar = () => {
    setMostrarAdvertencia(false);
    alert("Datos guardados correctamente.");
    navigate("/citas-pendientes"); // Redirige a la página "Tus citas"
  };

  const modificarDatos = () => {
    setMostrarAdvertencia(false);
  };

  return (
    <div className="prescripcion-container">
      <h2 className="prescripcion-title">Prescripción</h2>

      {/* Información del paciente */}
      <div className="contenedor-principal">
        <div className="contenedor-info-paciente">
          <p>
            <strong>Paciente:</strong> {paciente}
          </p>
        </div>

        <div className="linea-datos-paciente">
          <p>
            <strong>Sexo:</strong>
            <label>
              <input type="radio" name="sexo" value="femenino" /> Femenino
            </label>
            <label>
              <input
                type="radio"
                name="sexo"
                value="masculino"
                defaultChecked
              />{" "}
              Masculino
            </label>
          </p>
          <p>
            <strong>Edad:</strong>
            <input
              type="text"
              value={edad}
              onChange={manejarCambioEdad}
              placeholder="Edad"
            />
          </p>
          <p>
            <strong>Peso (Kg):</strong>
            <input
              type="text"
              value={peso}
              onChange={manejarCambioPeso}
              placeholder="Peso"
            />
          </p>
          <p>
            <strong>Altura (m):</strong>
            <input
              type="text"
              value={altura}
              onChange={manejarCambioAltura}
              placeholder="Altura"
            />
          </p>
        </div>
      </div>

      {/* Plan de dieta y ejercicio */}
      <div className="contenedor-plan">
        <div className="plan-dieta">
          <h3>Plan de Dieta Personalizado:</h3>
          <p>
            Calorías diarias:
            <input
              type="text"
              value={calorias}
              onChange={manejarCambioCalorias}
              placeholder="Calorías"
            />
          </p>
          <p>
            Alimentos recomendados:{" "}
            <input type="text" placeholder="_________" />
          </p>
          <p>
            Alimentos a evitar: <input type="text" placeholder="_________" />
          </p>
          <p>Observaciones:</p>
          <textarea
            className="static-textarea-large"
            maxLength={300}
            placeholder="Máximo 300 caracteres"
          ></textarea>
        </div>

        <div className="plan-ejercicio">
          <h3>Plan de Ejercicio Personalizado:</h3>
          <p>
            Tipo:
            <label>
              <input type="radio" name="tipo-ejercicio" value="cardio" /> Cardio
            </label>
            <label>
              <input type="radio" name="tipo-ejercicio" value="fuerza" /> Fuerza
            </label>
            <label>
              <input type="radio" name="tipo-ejercicio" value="flexibilidad" />{" "}
              Flexibilidad
            </label>
            <label>
              <input
                type="radio"
                name="tipo-ejercicio"
                value="otro"
                defaultChecked
              />{" "}
              Otro
            </label>
          </p>
          <p>
            Duración de las sesiones:{" "}
            <input type="text" placeholder="_________" />
          </p>
          <p>
            Frecuencia Semanal: <input type="text" placeholder="_________" />
          </p>
          <p>
            Ejercicios Específicos:{" "}
            <input type="text" placeholder="_________" />
          </p>
          <p>Observaciones:</p>
          <textarea
            className="static-textarea-large"
            maxLength={300}
            placeholder="Máximo 300 caracteres"
          ></textarea>
        </div>
      </div>

      {/* Medicamentos y próxima cita */}
      <div className="contenedor-final">
        <div>
          <p>
            <strong>Medicamentos y detalles:</strong>
          </p>
          <textarea
            className="static-textarea-large"
            maxLength={300}
            placeholder="Máximo 300 caracteres"
          ></textarea>
        </div>
        <div>
          <p>
            <strong>Próxima cita:</strong>
          </p>
          <div className="proxima-cita">
            <label>
              <input
                type="radio"
                name="proxima-cita"
                value="no"
                defaultChecked
                onChange={manejarCambioCita}
              />{" "}
              No
            </label>
            <label>
              <input
                type="radio"
                name="proxima-cita"
                value="si"
                onChange={manejarCambioCita}
              />{" "}
              Sí{" "}
            </label>
            <input
              type="date"
              disabled={!habilitarFecha}
              min={new Date().toISOString().split("T")[0]}
            />
            <div className="botones-final">
              <Link to={`/citas/${id}`}>
                <button className="volver-button">Volver</button>
              </Link>
              <button onClick={manejarGuardar} className="guardar-button">
                Guardar
              </button>
            </div>
          </div>
        </div>
      </div>

      {mostrarAdvertencia && (
        <AdvertenciaPrescripcion
          message="¿Estás seguro de los datos? No vas a poder modificarlos posteriormente."
          onConfirm={confirmarGuardar}
          onModify={modificarDatos}
        />
      )}
    </div>
  );
};
