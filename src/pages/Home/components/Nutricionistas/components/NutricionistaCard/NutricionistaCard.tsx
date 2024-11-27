import "./NutricionistaCard.css";

import { RiNurseLine } from "react-icons/ri";
import { LuAward } from "react-icons/lu";

interface Props {
  name: string;
  lastName: string;
  email: string;
  experience: string;
  imgPath?: string;
}

export const NutricionistaCard = ({
  name,
  lastName,
  experience,
  imgPath,
}: Props) => {
  return (
    <div className="nutricionista-card">
      <img
        src={imgPath}
        alt={`${name}, nutricionista con ${experience} años de experience`}
      />

      <div className="info-nutricionista">
        <div className="name-nutricionista">
          <RiNurseLine />
          <p>
            {name} {lastName}
          </p>
        </div>

        <div className="experience-nutricionista">
          <LuAward />
          <p>{experience} años</p>
        </div>
      </div>
    </div>
  );
};
