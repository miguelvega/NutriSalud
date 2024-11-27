import { useEffect, useState } from "react";
import "./NutricionistaList.css";
import { NutricionistaCard } from "../NutricionistaCard/NutricionistaCard";
import { Control, Controller, FieldError } from "react-hook-form";
import { FormValues } from "../../models";
import NutriAvatar from "./../../../../assets/Nutri-Avatar.jpg";

interface Props {
  name: keyof FormValues;
  control: Control<FormValues>;
  error?: FieldError;
}

export const NutricionistaList = ({ control, name, error }: Props) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [nutricionistas, setNutricionistas] = useState([]);
  const [loading, setLoading] = useState(true);
  const [errorFetch, setErrorFetch] = useState(null);

  useEffect(() => {
    fetch("http://localhost:8000/usuario/nutricionistas?role=nutricionista")
      .then((response) => {
        if (!response.ok) {
          throw new Error("Error al obtener los datos");
        }
        return response.json();
      })
      .then((data) => {
        setNutricionistas(data); // Aquí guardamos los datos en el estado
        setLoading(false); // Cambiamos el estado de carga
      })
      .catch((error) => {
        setErrorFetch(error.message); // En caso de error, lo guardamos en el estado
        setLoading(false);
      });
  }, []); // Se ejecuta una vez al montar el componente

  if (loading) return <p>Cargando...</p>;
  if (errorFetch) return <p>Error: {errorFetch}</p>;

  const handleNext = () => {
    if (currentIndex < nutricionistas.length - 1) {
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
                {nutricionistas.map((n) => (
                  <div
                    //@ts-ignore
                    key={n._id}
                    className={`carousel-item ${
                      //@ts-ignore
                      field.value === n.name ? "selected" : ""
                    }`}
                    //@ts-ignore
                    onClick={() => field.onChange(n._id)}
                  >
                    <NutricionistaCard
                      //@ts-ignore
                      name={n.name}
                      //@ts-ignore
                      lastName={n.lastName}
                      //@ts-ignore
                      experience={n.experiencia}
                      //@ts-ignore
                      email={n.email}
                      //@ts-ignore
                      avatar={n.avatar | NutriAvatar}
                    />
                  </div>
                ))}
              </div>
            </div>
            {/* Botón de siguiente */}
            <button
              className="carousel-button next"
              onClick={handleNext}
              disabled={currentIndex === nutricionistas.length - 1}
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
