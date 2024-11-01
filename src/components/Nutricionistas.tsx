import "../styles/Nutricionistas.css";

// Importamos las imágenes de los nutricionistas
import nutricionista1 from "../assets/Nutricionista1.jpeg";
import nutricionista2 from "../assets/Nutricionista2.jpeg";
import nutricionista3 from "../assets/Nutricionista3.jpeg";
import nutricionista4 from "../assets/Nutricionista4.jpeg";

const Nutricionistas = () => {
  // Array de imágenes de nutricionistas
  const nutricionistas = [
    nutricionista1,
    nutricionista2,
    nutricionista3,
    nutricionista4,
  ];

  return (
    <section className="nutricionistas-section">
      <h2>Nuestros Nutricionistas</h2>
      <div className="nutricionistas-container">
        {nutricionistas.map((imagen, index) => (
          <div key={index} className="nutricionista-card">
            <img src={imagen} alt={`Nutricionista ${index + 1}`} />
          </div>
        ))}
        {/* Botón "Ver más" fuera de la lista de nutricionistas */}
        <button className="ver-mas-btn">Ver más</button>
      </div>
    </section>
  );
};

export default Nutricionistas;
