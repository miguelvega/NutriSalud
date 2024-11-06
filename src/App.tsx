import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";

import { Navbar } from "./components";
import {
  Citas,
  GenerarCita,
  Home,
  Login,
  ResultadoTriaje,
  TriajeInicial,
} from "./pages";
function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/triaje-inicial" element={<TriajeInicial />} />
          <Route path="/resultado-triaje" element={<ResultadoTriaje />} />{" "}
          <Route path="/generar-cita" element={<GenerarCita />} />
          <Route path="/citas" element={<Citas />} />
          {/* Nueva ruta */}
        </Routes>
        {/* <Chatbot /> */}
      </BrowserRouter>
    </div>
  );
}

export default App;
