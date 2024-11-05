import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";

import { Navbar } from "./components";
import {
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
          {/* Nueva ruta */}
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
