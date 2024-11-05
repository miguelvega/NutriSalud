import { NutricionistaCard } from "../NutricionistaCard/NutricionistaCard";
import "./NutricionistaList.css";
export const NutricionistaList = () => (
  <div className="seccion-nutricionistas">
    <div className="label-desc">
      <h2>Seleccione un nutricionista:</h2>
      <p>Nutricionistas disponibles</p>
    </div>

    <div className="contenedor-nutricionistas">
      {[
        "Luis Perez Ruiz",
        "Maria Ramos C.",
        "Nicole Gonzales",
        "Gonzalo Ramirez",
      ].map((nombre, index) => (
        <NutricionistaCard key={index} nombre={nombre} />
      ))}
    </div>
  </div>
);
