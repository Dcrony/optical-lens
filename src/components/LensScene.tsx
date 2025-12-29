import { Canvas } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";
import { useControls } from "leva";

type LensProps = {
  position: [number, number, number];
  curvature: number;
  thickness: number;
  ior: number;
};

function Lens({ position, curvature, thickness, ior }: LensProps) {
  return (
    <mesh position={position} scale={[1, 1, thickness]}>
      <sphereGeometry args={[curvature, 64, 64]} />
      <meshPhysicalMaterial
        transmission={1}
        roughness={0}
        thickness={thickness}
        ior={ior}
        transparent
        envMapIntensity={1.2}
      />
    </mesh>
  );
}

export default function LensScene() {
  const { curvature, thickness, ior } = useControls("Lens Controls", {
    curvature: { value: 1, min: 0.7, max: 1.5, step: 0.05 },
    thickness: { value: 0.4, min: 0.2, max: 0.8, step: 0.05 },
    ior: {
      value: 1.74,
      options: {
        Standard: 1.5,
        MidIndex: 1.6,
        HighIndex: 1.74,
      },
    },
  });

  return (  
    <Canvas camera={{ position: [0, 0, 5], fov: 45 }} style={{ width: "100%", height: "100%" }} >
      <ambientLight intensity={0.6} />
      <directionalLight position={[5, 5, 5]} intensity={1} />

      {/* Left lens */}
      <Lens
        position={[-1.4, 0, 0]}
        curvature={curvature}
        thickness={thickness}
        ior={ior}
      />

      {/* Right lens */}
      <Lens
        position={[1.4, 0, 0]}
        curvature={curvature}
        thickness={thickness}
        ior={ior}
      />

      <OrbitControls enablePan={false} />
    </Canvas>
  );
}
