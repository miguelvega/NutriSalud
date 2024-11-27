import React, { useState } from "react";
import { useNavigate } from "react-router-dom"; // Para redireccionar
import "./Recomendaciones.css";
import { InfoPersonalProgresos } from "./InfoPersonalProgresos";
import { Ejercicios } from "./Ejercicios";
import { Dieta } from "./Dieta";

export const Recomendaciones = () => {
  const [progresoEjercicios, setProgresoEjercicios] = useState(0);
  const [progresoDieta, setProgresoDieta] = useState(0);

  const [guardadosEjercicios, setGuardadosEjercicios] = useState<boolean[]>(
    new Array(4).fill(false)
  );
  const [guardadosDieta, setGuardadosDieta] = useState<boolean[]>(
    new Array(4).fill(false)
  );

  const [completadosEjercicios, setCompletadosEjercicios] = useState<boolean[]>(
    new Array(4).fill(false)
  );
  const [completadosDieta, setCompletadosDieta] = useState<boolean[]>(
    new Array(4).fill(false)
  );

  const [cargando, setCargando] = useState(false);
  const navigate = useNavigate();

  // Generar JSON de datos dinámicamente
  const generateData = () => {
    const data = {
      paciente: {
        id: "12345",
        nombre: "Luis Perez",
        edad: 26,
        sexo: "Masculino",
        ocupacion: "Abogado",
        progreso: {
          ejercicios: progresoEjercicios,
          dieta: progresoDieta,
        },
      },
      recomendaciones: {
        ejercicios: guardadosEjercicios.map((guardado, index) => ({
          semana: `Semana ${index + 1}`,
          descripcion: `Descripción del ejercicio ${index + 1}`, // Cambia por tus datos reales
          completado: guardado,
        })),
        dietas: guardadosDieta.map((guardado, index) => ({
          semana: `Semana ${index + 1}`,
          descripcion: `Descripción de la dieta ${index + 1}`, // Cambia por tus datos reales
          completado: guardado,
        })),
      },
      fechaUltimaModificacion: new Date().toISOString().split("T")[0], // Formato YYYY-MM-DD
    };

    console.log("Datos enviados al backend:", JSON.stringify(data, null, 2));
    return data;
  };

  const handleGuardar = () => {
    setCargando(true); // Mostrar mensaje de carga
    setTimeout(() => {
      setCargando(false); // Ocultar mensaje de carga

      // Actualizar los guardados basados en los seleccionados actualmente
      setGuardadosEjercicios((prev) => {
        const nuevos = [...prev];
        for (let i = 0; i < nuevos.length; i++) {
          if (completadosEjercicios[i]) nuevos[i] = true;
        }
        return nuevos;
      });

      setGuardadosDieta((prev) => {
        const nuevos = [...prev];
        for (let i = 0; i < nuevos.length; i++) {
          if (completadosDieta[i]) nuevos[i] = true;
        }
        return nuevos;
      });

      // Imprimir datos en consola
      generateData();
    }, 2000); // Simula un retraso de 2 segundos
  };

  const handleTerminado = () => {
    // Generar los datos y redirigir al resumen
    const data = generateData();
    navigate("/resumen", { state: data }); // Pasar datos al backend o a la vista de resumen
  };

  return (
    <div className="recomendaciones-container">
      <h1 className="titulo">Nueva Recomendación para ti</h1>
      <div className="contenido">
        <div>
          <InfoPersonalProgresos
            progresoEjercicios={progresoEjercicios}
            progresoDieta={progresoDieta}
          />
          <Ejercicios
            onProgresoChange={setProgresoEjercicios}
            guardados={guardadosEjercicios}
            completados={completadosEjercicios}
            setCompletados={setCompletadosEjercicios}
          />
          <div className="botones">
            <button className="guardar" onClick={handleGuardar}>
              Guardar
            </button>
            <button
              className="terminado"
              onClick={handleTerminado}
              disabled={progresoEjercicios < 100 || progresoDieta < 100}
            >
              Terminado
            </button>
          </div>
        </div>
        <Dieta
          onProgresoDietaChange={setProgresoDieta}
          guardados={guardadosDieta}
          completados={completadosDieta}
          setCompletados={setCompletadosDieta}
        />
      </div>
      {cargando && (
        <div className="overlay">
          <div className="modal">
            <p>Guardando cambios...</p>
          </div>
        </div>
      )}
    </div>
  );
};
