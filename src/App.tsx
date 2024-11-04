import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";

import { Navbar } from "./components";
import { Home, Login } from "./pages";
import { TriajeInicial } from "./pages/TriajeInicial/TriajeInicial";
import { ResultadoTriaje } from "./pages/ResultadoTriaje/ResultadoTriaje"; // Nueva importación

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
          {/* Nueva ruta */}
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
