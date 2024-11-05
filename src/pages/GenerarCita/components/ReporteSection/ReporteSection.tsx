import { useRef } from "react";
import { AiOutlineEye, AiOutlineReload } from "react-icons/ai";
import "./ReporteSection.css";

export const ReporteSection = () => {
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleReloadClick = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      console.log("Archivo seleccionado:", file.name);
    }
  };

  return (
    <div className="seccion-reporte">
      <div className="label-desc">
        <h2>Reporte a enviar al médico</h2>
        <p>Reportes generados por el triaje</p>
      </div>

      <input
        type="file"
        accept=".pdf,.doc,.docx"
        className="input-archivo"
        ref={fileInputRef}
        onChange={handleFileChange}
      />
      <div className="reporte-generado">
        <span>Reporte Generado - 08/10/2024 - Paciente - Rosa Chavez</span>
        <div className="buttons-reporte">
          <button className="boton-icono boton-ver">
            <AiOutlineEye />
          </button>
          <button
            className="boton-icono boton-reload"
            onClick={handleReloadClick}
          >
            <AiOutlineReload />
          </button>
        </div>
      </div>
    </div>
  );
};
