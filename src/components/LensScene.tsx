import { Canvas } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";
import { useState } from "react";
import LensPair from "./LensPair";
import PrescriptionPanel from "./PrescriptionPanel";
import FramePanel from "./FramePanel";

export default function LensScene() {
  const [rx, setRx] = useState({
    right: { sph: -1.25, cyl: -0.5, axis: 90, add: 1.5 },
    left: { sph: -1.0, cyl: -0.75, axis: 80, add: 1.5 },
    pdFar: 64,
    pdNear: 60,
    index: 1.67,
  });

  const [frame, setFrame] = useState({
    A: 52,
    B: 40,
    DBL: 18,
    BC: 4,
  });

  return (
    <>
      <div style={{height: "60vh"}}>
        <Canvas camera={{ position: [0, 0, 9], fov: 35 }} >
        <color attach="background" args={["#f8fafc"]} />
        <ambientLight intensity={0.6} />
        <directionalLight position={[5, 5, 5]} intensity={1} />
        <LensPair rx={rx} frame={frame} />
        <OrbitControls />
      </Canvas>
      </div>

      <div className="panell">
        <PrescriptionPanel rx={rx} setRx={setRx} />
      <FramePanel frame={frame} setFrame={setFrame} />
      </div>
    </>
  );
}
