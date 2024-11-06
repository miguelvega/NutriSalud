import { useEffect, useState } from "react";
import "./Home.css";
import { BannerPrincipal } from "./components/BannerPrincipal/BannerPrincipal";
import { Nutricionistas } from "./components/Nutricionistas/Nutricionistas";
import { Servicios } from "./components/Servicios/Servicios";

export const Home = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("https://swapi.dev/api/people/1/");
        if (!response.ok) {
          throw new Error("Error en la red");
        }
        const result = await response.json();
        console.log(result);
        setData(result);
        console.log(data);
      } catch (error: any) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

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
