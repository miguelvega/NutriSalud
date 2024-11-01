import "./App.css";

import {
  BannerPrincipal,
  Navbar,
  Nutricionistas,
  Servicios,
} from "./components";

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
