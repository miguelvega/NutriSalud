import "./Nutricionistas.css";

// Importamos las imágenes de los nutricionistas
import nutricionista1 from "../../../../assets/Nutricionista1.jpeg";
import nutricionista2 from "../../../../assets/Nutricionista2.jpeg";
import nutricionista3 from "../../../../assets/Nutricionista3.jpeg";
import nutricionista4 from "../../../../assets/Nutricionista4.jpeg";
import { NutricionistaCard } from "./components/NutricionistaCard/NutricionistaCard";
import { useNavigate } from "react-router-dom";

export const Nutricionistas = () => {
  const navigate = useNavigate();
  // Array de imágenes de nutricionistas
  const nutricionistas = [
    nutricionista1,
    nutricionista2,
    nutricionista3,
    nutricionista4,
    nutricionista1,
  ];

  const handleClick = () => {
    navigate("/nuestro-personal");
  };

  return (
    <section className="nutricionistas-section">
      <h2 className="nutricionistas-title">Nuestros Nutricionistas</h2>
      <div className="nutricionistas-container">
        {nutricionistas.map((imagen, index) => (
          <NutricionistaCard
            name="nutricionista"
            experience="2"
            imgPath={imagen}
            key={index}
          />
        ))}
        <button className="ver-mas-btn" onClick={handleClick}>
          Ver más
        </button>
      </div>
    </section>
  );
};
