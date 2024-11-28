import { BrowserRouter, Route, Routes, Outlet, Link } from "react-router-dom";

import { Navbar } from "./components";
import { Navbarnutri } from "./components/Navbarnutri/Navbarnutri";
import InicioMedico from "./pages/InicioMedico/InicioMedico";
import {
  Citas,
  GenerarCita,
  HistorialMedico,
  Home,
  Login,
  NuestroPersonal,
  PreguntasFrecuentes,
  Recomendaciones,
  ResultadoTriaje,
  SignUp,
  TriajeInicial,
} from "./pages";
import ProtectedRoute from "./components/ProtectedRoute/ProtectedRoute";
import { AuthProvider, useAuth } from "./context";
import Chatbot from "./pages/Chatbot/Chatbot";
import Gestioncitas from "./pages/Gestioncitas/Gestioncitas";
import Citaspendientes from "./pages/Citaspendientes/Citaspendientes";
import imagenChatbot from "./assets/imagenchatbot.png";
import { ResumenRecomendaciones } from "./pages/Recomendaciones/ResumenRecomendaciones";
import DetalleCita from "./pages/DetalleCita/DetalleCita";
import { Preescripcion } from "./pages/Preescripcion/Preescripcion";

function App() {
  const Layout = () => {
    const { user } = useAuth();
    return (
      <>
        {/* Mostrar Navbar según el rol */}
        {user.role === "nutricionista" ? (
          <>
            <Navbarnutri />
            <Link to="/chatbot" className="chatbot-button-container">
              <img src={imagenChatbot} alt="Chatbot" className="chatbot-icon" />
            </Link>
          </>
        ) : (
          <>
            <Navbar />
            <Link to="/chatbot" className="chatbot-button-container">
              <img src={imagenChatbot} alt="Chatbot" className="chatbot-icon" />
            </Link>
          </>
        )}
        {/* Renderizar rutas anidadas */}
        <Outlet />
      </>
    );
  };

  return (
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<SignUp />} />

          {/* Rutas protegidas */}
          <Route element={<ProtectedRoute />}>
            <Route element={<Layout />}>
              <Route path="/" element={<Home />} />
              <Route path="/inicio-medico" element={<InicioMedico />} />
              <Route path="/triaje-inicial" element={<TriajeInicial />} />
              <Route path="/resultado-triaje" element={<ResultadoTriaje />} />
              <Route path="/generar-cita" element={<GenerarCita />} />
              <Route path="/citas" element={<Citas />} />
              <Route path="/nuestro-personal" element={<NuestroPersonal />} />
              <Route path="/historial-medico" element={<HistorialMedico />} />
              <Route path="/recomendaciones" element={<Recomendaciones />} />
              <Route
                path="/preguntas-frecuentes"
                element={<PreguntasFrecuentes />}
              />
              <Route path="/chatbot" element={<Chatbot />} />
              <Route path="/gestion-citas" element={<Gestioncitas />} />
              <Route path="/citas-pendientes" element={<Citaspendientes />} />
              <Route
                path="/resumen"
                element={<ResumenRecomendaciones />}
              />{" "}
              <Route path="/citas/:id" element={<DetalleCita />} />
              <Route path="/preescripcion/:id" element={<Preescripcion />} />
            </Route>
          </Route>
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
}

export default App;