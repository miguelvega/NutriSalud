import "./Nutricionistas.css";

// Importamos las imágenes de los nutricionistas
import NutriAvatar from "./../../../../assets/Nutri-Avatar.jpg";
import { NutricionistaCard } from "./components/NutricionistaCard/NutricionistaCard";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";

export const Nutricionistas = () => {
  const navigate = useNavigate();
  // Array de imágenes de nutricionistas
  const [nutricionistas, setNutricionistas] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

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
        setError(error.message); // En caso de error, lo guardamos en el estado
        setLoading(false);
      });
  }, []); // Se ejecuta una vez al montar el componente

  if (loading) return <p>Cargando...</p>;
  if (error) return <p>Error: {error}</p>;
  const handleClick = () => {
    navigate("/nuestro-personal");
  };

  return (
    <section className="nutricionistas-section">
      <h2 className="nutricionistas-title">Nuestros Nutricionistas</h2>
      <div className="nutricionistas-container">
        {nutricionistas?.map((nutricionista, index) => {
          return (
            <NutricionistaCard
              key={index} // Usar el email como key si es único
              //@ts-ignore
              name={nutricionista.name}
              //@ts-ignore

              lastName={nutricionista.lastName}
              //@ts-ignore

              experience={nutricionista.experiencia}
              //@ts-ignore

              email={nutricionista.email}
              //@ts-ignore
              imgPath={nutricionista.imagen || NutriAvatar} // Si no tiene imagen, usar NutriAvatar
            />
          );
        })}
        <button className="ver-mas-btn" onClick={handleClick}>
          Ver más
        </button>
      </div>
    </section>
  );
};
