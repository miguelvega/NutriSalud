import React, { useState } from "react";
import "./PreguntasFrecuentes.css";

export const PreguntasFrecuentes = () => {
  // Preguntas por categoría con respuestas
  const preguntasPorCategoria = {
    dietas: [
      {
        pregunta:
          "¿Qué tipo de dieta es más efectiva para reducir la obesidad de manera saludable y sostenible?",
        respuesta:
          "Una dieta rica en fibra, baja en grasas saturadas y basada en alimentos naturales es ideal. Consulte con un nutricionista para personalizar su plan.",
      },
      {
        pregunta:
          "¿Cuáles son las vitaminas esenciales para personas con obesidad y cómo ayudan en la pérdida de peso?",
        respuesta:
          "Vitaminas como la D y el complejo B son esenciales para el metabolismo y la regulación hormonal.",
      },
      {
        pregunta:
          "¿Qué ejercicios son recomendados para personas con obesidad que quieren mejorar su condición física sin riesgo de lesiones?",
        respuesta:
          "Ejercicios de bajo impacto como caminar, nadar o montar en bicicleta son ideales para evitar lesiones.",
      },
      {
        pregunta:
          "¿Cómo puede la suplementación vitamínica apoyar la pérdida de peso en personas con obesidad que siguen un programa de ejercicios?",
        respuesta:
          "La suplementación adecuada puede mejorar el rendimiento físico y favorecer la recuperación muscular.",
      },
    ],
    suplementos: [
      {
        pregunta:
          "¿Qué suplementos son útiles para personas con deficiencia de hierro?",
        respuesta:
          "El hierro en forma de sulfato ferroso es el más común. Consulte a su médico para la dosis adecuada.",
      },
      {
        pregunta: "¿Cuándo es recomendable tomar suplementos de vitamina D?",
        respuesta:
          "Es recomendable en casos de deficiencia comprobada o baja exposición al sol.",
      },
      {
        pregunta:
          "¿Los suplementos de proteínas son necesarios para todos los deportistas?",
        respuesta:
          "No son necesarios para todos. Una dieta balanceada suele cubrir los requerimientos proteicos.",
      },
      {
        pregunta:
          "¿Qué debo considerar antes de tomar suplementos para bajar de peso?",
        respuesta:
          "Consulte a un médico para evitar efectos secundarios y asegúrese de que sean seguros.",
      },
    ],
    enfermedades: [
      {
        pregunta:
          "¿Qué alimentos son recomendados para personas con enfermedad renal crónica?",
        respuesta:
          "Frutas bajas en potasio, verduras cocidas y proteínas de origen vegetal son ideales. Limite el sodio y fósforo.",
      },
      {
        pregunta: "¿Cuál es la mejor dieta para personas con diabetes?",
        respuesta:
          "Una dieta rica en fibra, baja en azúcares simples y con carbohidratos complejos es la más recomendada.",
      },
      {
        pregunta: "¿Qué alimentos debo evitar si tengo hipertensión?",
        respuesta:
          "Evite alimentos altos en sodio como embutidos, enlatados y snacks salados.",
      },
      {
        pregunta:
          "¿Cómo puedo prevenir complicaciones nutricionales en la enfermedad hepática?",
        respuesta:
          "Siga una dieta baja en grasas y rica en proteínas de alta calidad para proteger el hígado.",
      },
    ],
    deportiva: [
      {
        pregunta: "¿Qué debo comer antes de un entrenamiento intenso?",
        respuesta:
          "Carbohidratos complejos como avena o pan integral son ideales para obtener energía sostenida.",
      },
      {
        pregunta:
          "¿Qué alimentos ayudan a la recuperación muscular después del ejercicio?",
        respuesta:
          "Proteínas magras como pollo o pescado y carbohidratos como frutas son esenciales.",
      },
      {
        pregunta: "¿Cómo afecta la hidratación al rendimiento deportivo?",
        respuesta:
          "La hidratación adecuada previene fatiga y mejora el rendimiento físico.",
      },
      {
        pregunta: "¿Cuántas calorías debo consumir para ganar masa muscular?",
        respuesta:
          "Consuma un excedente calórico adecuado, con proteínas magras y carbohidratos complejos.",
      },
    ],
    peso: [
      {
        pregunta:
          "¿Cuáles son los mejores hábitos para mantener un peso saludable?",
        respuesta:
          "Comer con moderación, mantenerse activo y evitar alimentos procesados son claves.",
      },
      {
        pregunta: "¿Cómo afecta el estrés a la pérdida de peso?",
        respuesta:
          "El estrés puede aumentar los antojos y llevar a comer en exceso. Practique técnicas de relajación.",
      },
      {
        pregunta: "¿Qué alimentos puedo consumir para controlar los antojos?",
        respuesta:
          "Frutas, frutos secos y yogur natural son opciones saludables para controlar los antojos.",
      },
      {
        pregunta:
          "¿Es mejor seguir una dieta baja en carbohidratos o baja en grasas?",
        respuesta:
          "Depende de sus necesidades. Ambas pueden ser efectivas si se siguen de manera equilibrada.",
      },
    ],
  };

  // Combinar todas las preguntas para mostrar en "Todos"
  const todasLasPreguntas = Object.values(preguntasPorCategoria).flat();

  // Estados
  const [preguntas, setPreguntas] = useState(todasLasPreguntas); // Lista de preguntas actual
  const [preguntaExpandida, setPreguntaExpandida] = useState<number | null>(
    null
  ); // Controla qué pregunta está expandida
  const [cantidadAMostrar, setCantidadAMostrar] = useState("todos"); // Cantidad seleccionada

  const obtenerPreguntasAMostrar = () => {
    if (cantidadAMostrar === "todos") {
      return preguntas;
    }
    return preguntas.slice(0, parseInt(cantidadAMostrar));
  };

  const togglePregunta = (index: number) => {
    setPreguntaExpandida(preguntaExpandida === index ? null : index);
  };

  return (
    <div className="preguntas-frecuentes-container">
      <h1>Preguntas Frecuentes</h1>

      {/* Filtros */}
      <div className="filtros">
        <button className="btn filtrar">Filtrar</button>
        <button className="btn limpiar">Limpiar</button>
        <input
          type="text"
          placeholder="Filtrar por título"
          className="input-filtro"
        />
        <button className="btn buscar">
          <span role="img" aria-label="buscar">
            🔍
          </span>
        </button>
        <select
          className="select-cantidad"
          value={cantidadAMostrar}
          onChange={(e) => setCantidadAMostrar(e.target.value)}
        >
          <option value="5">5</option>
          <option value="10">10</option>
          <option value="25">25</option>
          <option value="50">50</option>
          <option value="todos">Todos</option>
        </select>
      </div>

      {/* Lista de Preguntas */}
      <div className="contenido-preguntas">
        <ul className="preguntas-lista">
          {obtenerPreguntasAMostrar().map((item, index) => (
            <li key={index} className="pregunta-item">
              <div className="pregunta-header">
                <span>{item.pregunta}</span>
                <button
                  className="btn-expandir"
                  onClick={() => togglePregunta(index)}
                >
                  {preguntaExpandida === index ? "-" : "+"}
                </button>
              </div>
              {preguntaExpandida === index && (
                <div className="respuesta">{item.respuesta}</div>
              )}
            </li>
          ))}
        </ul>

        {/* Categorías */}
        <div className="categorias">
          <h3>Categorías</h3>
          <ul>
            <li>
              <button
                className="categoria-boton"
                onClick={() => setPreguntas(preguntasPorCategoria.dietas)}
              >
                Preguntas frecuentes sobre dietas específicas
              </button>
            </li>
            <li>
              <button
                className="categoria-boton"
                onClick={() => setPreguntas(preguntasPorCategoria.suplementos)}
              >
                Preguntas frecuentes sobre suplementos y vitaminas
              </button>
            </li>
            <li>
              <button
                className="categoria-boton"
                onClick={() => setPreguntas(preguntasPorCategoria.enfermedades)}
              >
                Preguntas sobre alimentación para enfermedades específicas
              </button>
            </li>
            <li>
              <button
                className="categoria-boton"
                onClick={() => setPreguntas(preguntasPorCategoria.deportiva)}
              >
                Preguntas sobre nutrición deportiva
              </button>
            </li>
            <li>
              <button
                className="categoria-boton"
                onClick={() => setPreguntas(preguntasPorCategoria.peso)}
              >
                Consejos para pérdida y mantenimiento de peso
              </button>
            </li>
            <li>
              <button
                className="categoria-boton"
                onClick={() => setPreguntas(todasLasPreguntas)}
              >
                Mostrar todas las preguntas
              </button>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};
