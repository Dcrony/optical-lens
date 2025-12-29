import LensScene from "./components/LensScene";
import "./App.css";

export default function App() {
  return (
    <div className="app">
      <div className="sidebar">
        <h2>Optical Lens Configurator</h2>
        <p>Adjust lens parameters using the control panel.</p>
      </div>

      <div className="canvas-wrapper">
        <LensScene />
      </div>
    </div>
  );
}
