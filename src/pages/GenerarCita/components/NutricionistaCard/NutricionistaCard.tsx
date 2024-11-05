import { PiMedal } from "react-icons/pi";
import "./NutricionistaCard.css";

interface NutricionistaCardProps {
  nombre: string;
}

export const NutricionistaCard = ({ nombre }: NutricionistaCardProps) => (
  <div className="tarjeta-nutricionista">
    <div className="avatar-nutricionista" />
    <p className="nombre-nutricionista">
      <strong>{nombre}</strong>
    </p>
    <div className="informacion-nutricionista">
      <p className="experiencia">
        Experiencia años
        <PiMedal size={24} />
      </p>
    </div>
  </div>
);
