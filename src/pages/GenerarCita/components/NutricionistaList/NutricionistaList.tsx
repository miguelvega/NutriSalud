import { NutricionistaCard } from "../NutricionistaCard/NutricionistaCard";
import "./NutricionistaList.css";

type Props = {
  setSelectedNutritionist: (id: string) => void;
};

const nutritionists = [
  { id: "1", name: "Luis Perez Ruiz", experience: "5 años" },
  { id: "2", name: "Maria Ramos C.", experience: "8 años" },
  { id: "3", name: "Nicole Gonzales", experience: "3 años" },
  { id: "4", name: "Gonzalo Ramirez", experience: "10 años" },
];


export const NutricionistaList = ({setSelectedNutritionist}: Props) => {
  const settings: Slider.Settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 1,
  };
  return (

  )
};
