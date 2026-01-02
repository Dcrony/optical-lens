import { Canvas } from "@react-three/fiber"
import { Environment, OrbitControls } from "@react-three/drei"
import Lens from "./Lens"

export default function LensScene() {
  return (
    <Canvas camera={{ position: [0, 0, 6], fov: 45 }}>
      {/* Background */}
      <color attach="background" args={["#f6f6f6"]} />

      {/* Environment FIRST */}
      {/* <Environment preset="studio" environmentIntensity={0.6} /> */}

      {/* Lights */}
      <ambientLight intensity={0.4} />
      <directionalLight position={[6, 4, 6]} intensity={1.4} />
      <directionalLight position={[-6, -4, -6]} intensity={0.3} />

      {/* Lens */}
      <Lens />

      {/* Controls */}
      <OrbitControls
        enableRotate
        enableZoom
        enablePan={false}
        minDistance={4}
        maxDistance={10}
      />
    </Canvas>
  )
}
