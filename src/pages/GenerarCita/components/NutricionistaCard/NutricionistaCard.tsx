import { PiMedal } from "react-icons/pi";
import "./NutricionistaCard.css";

interface NutricionistaCardProps {
  nombre: string;
  experience: string;
  avatar?: string; // Imagen de avatar opcional
}

export const NutricionistaCard = ({
  nombre,
  experience,
  avatar,
}: NutricionistaCardProps) => (
  <div
    className="tarjeta-nutricionista"
    role="button"
    tabIndex={0}
    aria-label={`Nutricionista ${nombre}`}
  >
    <div
      className="avatar-nutricionista"
      style={{
        backgroundImage: avatar ? `url(${avatar})` : undefined,
      }}
    />
    <p className="nombre-nutricionista">
      <strong>{nombre}</strong>
    </p>
    <div className="informacion-nutricionista">
      <p className="experiencia">
        {experience} años
        <PiMedal size={20} />
      </p>
    </div>
  </div>
);
