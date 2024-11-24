import { BrowserRouter, Route, Routes } from "react-router-dom";

import { Navbar } from "./components";
import { Navbarnutri } from "./components/Navbarnutri/Navbarnutri";
import InicioMedico from "./pages/InicioMedico/InicioMedico";
import { Home, Login, SignUp } from "./pages";
import ProtectedRoute from "./components/ProtectedRoute/ProtectedRoute";
import { AuthProvider, useAuth } from "./context";

function App() {
  const Layout = () => {
    const { userRole } = useAuth();
    return (
      <>
        {/* Mostrar Navbar según el rol */}
        {userRole === "nutricionista" ? <Navbarnutri /> : <Navbar />}
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
            </Route>
          </Route>
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
}

export default App;
