// src/App.tsx
import React from "react";
import Navbar from "./components/Navbar";
import BannerPrincipal from "./components/BannerPrincipal";
import Nutricionistas from "./components/Nutricionistas";
import Servicios from "./components/Servicios";
import "./App.css";

function App() {
  return (
    <div className="App">
      <Navbar />
      <BannerPrincipal />
      <div className="main-content">
        <Nutricionistas />
        <Servicios />
      </div>
    </div>
  );
}

export default App;
