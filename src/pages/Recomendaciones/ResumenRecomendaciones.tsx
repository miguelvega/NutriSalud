import "./ResumenRecomendaciones.css";

export const ResumenRecomendaciones = () => {
  // Obtener la fecha actual
  const fechaActual = new Date();
  const formatoFecha = `${fechaActual.getDate()} - ${
    fechaActual.getMonth() + 1
  } - ${fechaActual.getFullYear()}`;

  return (
    <div className="resumen-container">
      <div className="felicitaciones">
        <img
          src="https://cdn-icons-png.flaticon.com/512/2922/2922688.png"
          alt="Trofeo"
          className="felicitaciones-icono"
        />
        <h2 className="felicitaciones-titulo">🎉 ¡Felicitaciones! 🎉</h2>
        <p className="felicitaciones-texto">
          🏆 Has cumplido con tus objetivos de esta semana. 💪 ¡Sigue así y
          lograrás mejorar tu salud cada día más! 🍎🌟
        </p>
        <p className="felicitaciones-motivacion">
          ¡Recuerda que cada paso cuenta hacia una vida más saludable! 🥗🚶‍♂️
        </p>
      </div>
      <div className="resumen-detalle">
        <h3 className="resumen-subtitulo">
          📝 Detalles de tus recomendaciones
        </h3>
        <p>
          <strong>👩‍⚕️ Nutricionista:</strong> Elizabeth Chavez
        </p>
        <p>
          <strong>📅 Fecha de Creación:</strong> 12 - 10 - 2024
        </p>
        <p>
          <strong>📅 Última Modificación:</strong> {formatoFecha}
        </p>
        <p>✨ ¡Sigue trabajando en tus metas para ver más progresos! ✨</p>
      </div>
    </div>
  );
};
