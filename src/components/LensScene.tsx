import { Canvas } from "@react-three/fiber"
import { Environment, OrbitControls } from "@react-three/drei"
import Lens from "./Lens"

import { useState } from "react";
import LensControls from "./LensController";

export default function LensScene() {
  const [lensConfig, setLensConfig] = useState({
    curvature: 0.12,
    thickness: 0.08,
    ior: 1.5,
  });

  return (
    <>
      <Canvas camera={{ position: [0, 0, 6], fov: 45 }}>
        <color attach="background" args={["#f6f6f6"]} />

        <ambientLight intensity={0.4} />
        <directionalLight position={[6, 4, 6]} intensity={1.4} />
        <directionalLight position={[-6, -4, -6]} intensity={0.3} />

        <Lens
  lensThickness={lensConfig.thickness}
  baseCurvature={lensConfig.curvature}
  edgeCurvature={lensConfig.curvature * 1.25}
  ior={lensConfig.ior}
/>


        <OrbitControls minDistance={4} maxDistance={10} />
      </Canvas>

      <LensControls
        config={lensConfig}
        onChange={setLensConfig}
      />
    </>
  );
}
