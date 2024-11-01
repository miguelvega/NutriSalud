import "../styles/BannerPrincipal.css";

const BannerPrincipal = () => {
  return (
    <section className="banner">
      <button className="arrow-button arrow-left">{"<"}</button>
      <h1>
        Nutri<span>Salud</span>
      </h1>
      <p>Personaliza tu dieta y tus cuidados</p>
      <button className="banner-button">Comienza →</button>
      <button className="arrow-button arrow-right">{">"}</button>
    </section>
  );
};

export default BannerPrincipal;
