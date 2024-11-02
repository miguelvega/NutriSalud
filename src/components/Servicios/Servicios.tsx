import { BoxInfo } from "./components";
import "./Servicios.css";

export const Servicios = () => {
  return (
    <section className="servicios">
      <BoxInfo
        title="Dietas Personalizadas"
        information="NutriSalud tiene la capacidad de darte dietas personalizadas en base a tus preferencias"
      />
      <BoxInfo
        title="Interacción con los nutricionistas"
        information="NutriSalud permite al paciente interactuar constantemente con los nutricionistas"
      />
      <BoxInfo
        title="Chatbot para resolver problemas"
        information="NutriSalud cuenta con un chatbot para guiar y ayudar a los pacientes en la aplicación"
      />
    </section>
  );
};
