import React from "react";
import "./Ejercicios.css";

export const Ejercicios = ({
  onProgresoChange,
  guardados,
  completados,
  setCompletados,
}: {
  onProgresoChange: (progreso: number) => void;
  guardados: boolean[];
  completados: boolean[];
  setCompletados: React.Dispatch<React.SetStateAction<boolean[]>>;
}) => {
  const ejercicios = [
    {
      texto:
        "Caminar 30 minutos al día a paso moderado y realizar 10 minutos de estiramientos básicos (piernas, espalda, hombros) después de caminar",
      semana: "Primera semana",
    },
    {
      texto:
        "Correr 20 minutos al día, añadir 10 flexiones de brazos, 15 sentadillas y finalizar con 10 minutos de estiramientos",
      semana: "Segunda semana",
    },
    {
      texto:
        "Correr 30 minutos al día, realizar 20 minutos de ejercicios de fuerza (flexiones, sentadillas, planchas) y finalizar con 15 minutos de yoga o estiramientos profundos",
      semana: "Tercera semana",
    },
    {
      texto:
        "Correr 40 minutos al día, realizar 30 minutos de circuitos de fuerza (incluye burpees, lunges, planchas dinámicas)",
      semana: "Cuarta semana",
    },
  ];

  const handleCheckboxChange = (index: number) => {
    const nuevosCompletados = [...completados];
    nuevosCompletados[index] = !nuevosCompletados[index];
    setCompletados(nuevosCompletados);

    const progreso =
      (nuevosCompletados.filter((v) => v).length / ejercicios.length) * 100;
    onProgresoChange(progreso);
  };

  return (
    <div className="ejercicios-container">
      <h3 className="ejercicios-titulo">Plan de Ejercicios</h3>
      <ul className="ejercicios-lista">
        {ejercicios.map((ejercicio, index) => (
          <li key={index} className="ejercicio-item">
            <div className="ejercicio-header">
              <input
                type="checkbox"
                checked={completados[index]}
                onChange={() => handleCheckboxChange(index)}
                disabled={guardados[index]} // Solo deshabilita los guardados
                className="ejercicio-checkbox"
              />
              <span className="ejercicio-semana">{ejercicio.semana}</span>
            </div>
            <p className="ejercicio-detalle">{ejercicio.texto}</p>
          </li>
        ))}
      </ul>
    </div>
  );
};
