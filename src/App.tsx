import LensScene from "./components/LensScene";

export default function App() {
  return (
    <div
      style={{
        display: "grid",
        gridTemplateColumns: "1fr 3fr",
        height: "100vh",
      }}
    >
      <div
        style={{
          padding: "20px",
          background: "#0f172a",
          color: "#fff",
        }}
      >
        <h2>Optical Lens Configurator</h2>
        <p>Adjust lens parameters using the panel.</p>
      </div>

      <LensScene />
    </div>
  );
}
