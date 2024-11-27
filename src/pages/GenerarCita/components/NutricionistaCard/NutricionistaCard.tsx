import { PiMedal } from "react-icons/pi";
import "./NutricionistaCard.css";

interface NutricionistaCardProps {
  name: string;
  lastName: string;
  email: string;
  experience: string;
  avatar?: string; // Imagen de avatar opcional
}

export const NutricionistaCard = ({
  name,
  lastName,
  email,
  experience,
  avatar,
}: NutricionistaCardProps) => (
  <div
    className="tarjeta-nutricionista"
    role="button"
    tabIndex={0}
    aria-label={`Nutricionista ${name} ${lastName}`}
  >
    <div
      className="avatar-nutricionista"
      style={{
        backgroundImage: avatar ? `url(${avatar})` : undefined,
      }}
    />
    <p className="nombre-nutricionista">
      <strong>
        {name} {lastName}
      </strong>
    </p>
    <div className="informacion-nutricionista">
      <p className="email">{email}</p>
      <p className="experiencia">
        {experience} años
        <PiMedal size={20} />
      </p>
    </div>
  </div>
);
