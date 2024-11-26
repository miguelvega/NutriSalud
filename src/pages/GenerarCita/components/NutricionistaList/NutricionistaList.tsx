import { useState } from "react";
import "./NutricionistaList.css";
import { NutricionistaCard } from "../NutricionistaCard/NutricionistaCard";
import { Control, Controller, FieldError } from "react-hook-form";
import { FormValues } from "../../models";

const nutritionists = [
  { id: "1", nombre: "Luis Perez Ruiz", experience: "5", avatar: "" },
  { id: "2", nombre: "Maria Ramos C.", experience: "8", avatar: "" },
  { id: "3", nombre: "Nicole Gonzales", experience: "3", avatar: "" },
  { id: "4", nombre: "Gonzalo Ramirez", experience: "10", avatar: "" },
];

interface Props {
  name: keyof FormValues;
  control: Control<FormValues>;
  error?: FieldError;
}

export const NutricionistaList = ({ control, name, error }: Props) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const handleNext = () => {
    if (currentIndex < nutritionists.length - 1) {
      setCurrentIndex(currentIndex + 1);
    }
  };

  const handlePrev = () => {
    if (currentIndex > 0) {
      setCurrentIndex(currentIndex - 1);
    }
  };

  return (
    <div className="carousel-container">
      <Controller
        name={name}
        control={control}
        render={({ field }) => (
          <>
            {/* Botón de anterior */}
            <button
              className="carousel-button prev"
              onClick={handlePrev}
              disabled={currentIndex === 0}
            >
              {"<"}
            </button>
            {/* Carrusel */}
            <div className="carousel">
              <div
                className="carousel-track"
                style={{
                  transform: `translateX(-${currentIndex * 250}px)`, // 250px = ancho de cada tarjeta
                }}
              >
                {nutritionists.map((n) => (
                  <div
                    key={n.id}
                    className={`carousel-item ${
                      field.value === n.nombre ? "selected" : ""
                    }`}
                    onClick={() => field.onChange(n.nombre)}
                  >
                    <NutricionistaCard
                      nombre={n.nombre}
                      experience={n.experience}
                      avatar={n.avatar}
                      key={n.nombre}
                    />
                  </div>
                ))}
              </div>
            </div>
            {/* Botón de siguiente */}
            <button
              className="carousel-button next"
              onClick={handleNext}
              disabled={currentIndex === nutritionists.length - 1}
            >
              {">"}
            </button>

            {/* Mensaje de error */}
            {error && <p className="error">{error.message}</p>}
          </>
        )}
      />
    </div>
  );
};
