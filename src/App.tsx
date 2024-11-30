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
import RoleProtectedRoute from "./components/RoleProtectedRoute/RoleProtectedRoute";
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
          {/* Rutas públicas */}
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<SignUp />} />

          {/* Rutas protegidas */}
          <Route element={<ProtectedRoute />}>
            <Route element={<Layout />}>
              {/* Rutas comunes */}
              <Route path="/" element={<Home />} />
              <Route
                path="/preguntas-frecuentes"
                element={<PreguntasFrecuentes />}
              />
              <Route path="/chatbot" element={<Chatbot />} />

              {/* Rutas exclusivas para pacientes */}
              <Route
                element={<RoleProtectedRoute allowedRoles={["paciente"]} />}
              >
                <Route path="/triaje-inicial" element={<TriajeInicial />} />
                <Route path="/resultado-triaje" element={<ResultadoTriaje />} />
                <Route path="/generar-cita" element={<GenerarCita />} />
                <Route path="/citas" element={<Citas />} />
                <Route path="/historial-medico" element={<HistorialMedico />} />
                <Route path="/recomendaciones" element={<Recomendaciones />} />
                <Route path="/nuestro-personal" element={<NuestroPersonal />} />
              </Route>

              {/* Rutas exclusivas para nutricionistas */}
              <Route
                element={
                  <RoleProtectedRoute allowedRoles={["nutricionista"]} />
                }
              >
                <Route path="/gestion-citas" element={<Gestioncitas />} />
                <Route path="/citas-pendientes" element={<Citaspendientes />} />
                <Route path="/resumen" element={<ResumenRecomendaciones />} />
                <Route path="/citas/:id" element={<DetalleCita />} />
                <Route path="/preescripcion/:id" element={<Preescripcion />} />
                <Route path="/inicio-medico" element={<InicioMedico />} />
              </Route>
            </Route>
          </Route>
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
}

export default App;
