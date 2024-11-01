import { GoArrowRight, GoChevronLeft, GoChevronRight } from "react-icons/go";

import "./BannerPrincipal.css";

export const BannerPrincipal = () => {
  return (
    <section className="banner">
      <button className="arrow-button arrow-left">
        <GoChevronLeft size={15} />
      </button>
      <h1 className="title">
        Nutri<span>Salud</span>
      </h1>
      <p className="descripcion">Personaliza tu dieta y tus cuidados</p>
      <button className="banner-button">
        <p>Comienza</p>
        <GoArrowRight size={20} />
      </button>
      <button className="arrow-button arrow-right">
        <GoChevronRight size={15} />
      </button>
    </section>
  );
};
