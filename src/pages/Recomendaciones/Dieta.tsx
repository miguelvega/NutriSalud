import React from "react";
import "./Dieta.css";

export const Dieta = ({
  onProgresoDietaChange,
  guardados,
  completados,
  setCompletados,
}: {
  onProgresoDietaChange: (progreso: number) => void;
  guardados: boolean[];
  completados: boolean[];
  setCompletados: React.Dispatch<React.SetStateAction<boolean[]>>;
}) => {
  const alimentosRecomendados = [
    {
      nombre:
        "Pollo a la plancha (100g), ensalada mixta (lechuga, tomate, zanahoria, pepino) con jugo de limón y una porción de arroz integral (50g). 2 litros de agua diarios.",
      semana: "Primera semana",
    },
    {
      nombre:
        "Pescado al vapor (100g), puré de camote (70g), brócoli al vapor (50g), y un vaso de agua con limón sin azúcar. Complementar con una fruta (manzana verde).",
      semana: "Segunda semana",
    },
    {
      nombre:
        "Filete de pavo al horno (120g), quinua cocida (50g), espinacas salteadas (40g) con ajo, y un vaso de agua tibia con jengibre. 1 litro adicional de agua diaria.",
      semana: "Tercera semana",
    },
    {
      nombre:
        "Pechuga de pollo desmenuzada (100g), lentejas cocidas (60g), ensalada de palta, tomate y cebolla (50g), con agua de hierbas (manzanilla o menta). Una fruta (pera pequeña) como postre.",
      semana: "Cuarta semana",
    },
  ];

  const handleCheckboxChange = (index: number) => {
    const nuevosCompletados = [...completados];
    nuevosCompletados[index] = !nuevosCompletados[index];
    setCompletados(nuevosCompletados);

    const progreso =
      (nuevosCompletados.filter((v) => v).length /
        alimentosRecomendados.length) *
      100;
    onProgresoDietaChange(progreso);
  };

  return (
    <div className="dieta-container">
      <h3 className="dieta-titulo">Plan de Dieta</h3>
      <ul className="dieta-lista">
        {alimentosRecomendados.map((alimento, index) => (
          <li key={index} className="dieta-item">
            <div className="dieta-item-header">
              <input
                type="checkbox"
                checked={completados[index]}
                onChange={() => handleCheckboxChange(index)}
                disabled={guardados[index]} // Solo deshabilita los guardados
                className="dieta-checkbox"
              />
              <span className="dieta-semana">{alimento.semana}</span>
            </div>
            <p className="dieta-detalle">{alimento.nombre}</p>
          </li>
        ))}
      </ul>
    </div>
  );
};
