import React from "react";
import Triaje from "../../../../assets/Triaje.jpg";
import "./TriajeImage.css";

export const TriajeImage: React.FC = () => (
  <div className="triaje-image">
    <img src={Triaje} alt="Triaje" />
  </div>
);
