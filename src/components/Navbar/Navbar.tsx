import "./Navbar.css";

export const Navbar = () => {
  return (
    <nav className="navbar">
      <div className="navbar-logo">
        <h1 className="title">
          Nutri<span>Salud</span>
        </h1>
      </div>
      <div className="navbar-links">
        <a href="#">Comienza</a>
        <a href="#">Nuestro Personal</a>
        <a href="#">Citas</a>
        <a href="#">Recomendaciones</a>
        <a href="#">Preguntas Frecuentes</a>
      </div>
      <div className="auth-buttons">
        <button className="login">Iniciar Sesión</button>
        <button className="signup">Crea una cuenta</button>
      </div>
    </nav>
  );
};
