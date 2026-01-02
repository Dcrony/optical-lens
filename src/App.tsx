import { Leva } from "leva";
import OpticalDesignStudio from "./components/LensScene";

export default function App() {
  return (
    <div style={{
      width: '100vw',
      height: '100vh',
      position: 'relative',
      overflow: 'hidden'
    }}>
      <OpticalDesignStudio />
      <Leva 
        titleBar={{ 
          title: "Optical Lens Design Studio",
          filter: false 
        }}
        theme={{
          colors: {
            elevation1: 'rgba(30, 30, 40, 0.9)',
            elevation2: 'rgba(40, 40, 55, 1)',
            elevation3: 'rgba(50, 50, 70, 1)',
            accent1: '#667eea',
            accent2: '#764ba2',
            accent3: '#4a90e2',
          }
        }}
        collapsed={false}
        oneLineLabels={true}
      />
      
      {/* Title */}
      <div style={{
        position: 'absolute',
        top: '20px',
        left: '50%',
        transform: 'translateX(-50%)',
        background: 'rgba(255, 255, 255, 0.9)',
        padding: '15px 30px',
        borderRadius: '15px',
        backdropFilter: 'blur(10px)',
        boxShadow: '0 10px 30px rgba(0,0,0,0.1)',
        zIndex: 1000,
        fontFamily: "'Inter', sans-serif",
        border: '1px solid rgba(0,0,0,0.1)'
      }}>
        <h1 style={{ 
          margin: 0, 
          fontSize: '24px', 
          fontWeight: 600,
          background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
          WebkitBackgroundClip: 'text',
          WebkitTextFillColor: 'transparent'
        }}>
          Optical Lens Design Studio
        </h1>
        <p style={{ 
          margin: '5px 0 0 0', 
          fontSize: '14px', 
          color: '#666',
          textAlign: 'center'
        }}>
          Professional Lens Thickness Calculator • Real-time 3D Visualization
        </p>
      </div>
    </div>
  );
}