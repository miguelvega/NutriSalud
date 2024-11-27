import "./Home.css";
import { BannerPrincipal } from "./components/BannerPrincipal/BannerPrincipal";
import { Nutricionistas } from "./components/Nutricionistas/Nutricionistas";
import { Servicios } from "./components/Servicios/Servicios";

export const Home = () => {
  return (
    <>
      <BannerPrincipal />
      <div className="main-content">
        <Nutricionistas />
        <Servicios />
      </div>
    </>
  );
};
