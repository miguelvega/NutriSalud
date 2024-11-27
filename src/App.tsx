import { BrowserRouter, Route, Routes, useNavigate } from "react-router-dom";
import { useState } from "react";
import "./App.css";

import { Navbar } from "./components";
import { Navbarnutri } from "./components/Navbarnutri/Navbarnutri";
import InicioMedico from "./pages/InicioMedico/InicioMedico";
import Chatbot from "./pages/Chatbot/Chatbot";
import Gestioncitas from "./pages/Gestioncitas/Gestioncitas";
import Citaspendientes from "./pages/Citaspendientes/Citaspendientes";
import DetalleCita from "./pages/DetalleCita/DetalleCita";
import Prescripcion from "./pages/Prescripcion/Prescripcion";

import {
  Citas,
  GenerarCita,
  Home,
  Login,
  ResultadoTriaje,
  SignUp,
  TriajeInicial,
} from "./pages";

function App() {
  const [isNutricionista, setIsNutricionista] = useState(false);

  // Function to update navbar based on user role
  const handleRoleChange = (role: string) => {
    setIsNutricionista(role === "Nutricionista");
  };

  return (
    <div className="App">
      <BrowserRouter>
        {/* Conditionally render Navbar or Navbarnutri */}
        {isNutricionista ? <Navbarnutri /> : <Navbar />}
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/triaje-inicial" element={<TriajeInicial />} />
          <Route path="/resultado-triaje" element={<ResultadoTriaje />} />
          <Route path="/generar-cita" element={<GenerarCita />} />
          <Route path="/citas" element={<Citas />} />
          <Route path="/signup" element={<SignUp onRoleChange={handleRoleChange} />} />
          {/* medico routes */}
          <Route path="/inicio-medico" element={<InicioMedico />} />
          <Route path="/chatbot" element={<Chatbot />} />
          <Route path="/gestion-citas" element={<Gestioncitas />} />
          <Route path="/citas-pendientes" element={<Citaspendientes />} />
          <Route path="/citas/:id" element={<DetalleCita />} />     
          <Route path="/prescripcion/:id" element={<Prescripcion/>} />   
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
