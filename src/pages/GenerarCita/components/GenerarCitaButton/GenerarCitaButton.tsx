import { MdArrowOutward } from "react-icons/md";
import "./GenerarCitaButton.css";
import { MouseEvent } from "react";

interface Props {
  onSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
}

export const GenerarCitaButton = ({ onSubmit }: Props) => (
  <button
    className="boton-generar-cita"
    onClick={(e: MouseEvent<HTMLButtonElement>) => {
      e.preventDefault();
      onSubmit(e as unknown as React.FormEvent<HTMLFormElement>);
    }}
  >
    Generar Cita
    <MdArrowOutward size={24} />
  </button>
);
