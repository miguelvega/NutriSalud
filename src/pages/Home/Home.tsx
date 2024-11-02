import "./Home.css";
import { BannerPrincipal, Nutricionistas, Servicios } from "../../components";

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
