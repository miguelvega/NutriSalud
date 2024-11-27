import "./InfoPersonalProgresos.css";

export const InfoPersonalProgresos = ({
  progresoEjercicios,
  progresoDieta,
}: {
  progresoEjercicios: number;
  progresoDieta: number;
}) => {
  const progresoEjerciciosStyle = {
    background: `conic-gradient(#007bff ${progresoEjercicios}%, #d0e8ff ${progresoEjercicios}% 100%)`,
  };

  const progresoDietaStyle = {
    background: `conic-gradient(#f39c12 ${progresoDieta}%, #fbe4bc ${progresoDieta}% 100%)`,
  };

  return (
    <div className="info-progresos-container">
      <div className="info-personal">
        <div className="avatar"></div>
        <div className="datos">
          <p>
            <strong>Nombre :</strong> Luis Perez
          </p>
          <p>
            <strong>Edad :</strong> 26
          </p>
          <p>
            <strong>Sexo :</strong> Masculino
          </p>
          <p>
            <strong>Ocupación :</strong> Abogado
          </p>
        </div>
      </div>
      <div className="progresos">
        <div className="progreso-item">
          <div
            className="progreso-icono progreso-ejercicios"
            style={progresoEjerciciosStyle}
          ></div>
          <div className="progreso-texto">
            <strong style={{ color: "#007bff" }}>
              Progreso de los Ejercicios
            </strong>
            <p>{progresoEjercicios.toFixed(0)}% completado</p>
          </div>
        </div>
        <div className="progreso-item">
          <div
            className="progreso-icono progreso-dieta"
            style={progresoDietaStyle}
          ></div>
          <div className="progreso-texto">
            <strong style={{ color: "#f39c12" }}>Progreso de la Dieta</strong>
            <p>{progresoDieta.toFixed(0)}% completado</p>
          </div>
        </div>
      </div>
    </div>
  );
};
