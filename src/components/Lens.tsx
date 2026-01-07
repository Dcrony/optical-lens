import * as THREE from "three";
import { useMemo } from "react";
import { createLensGeometry } from "../geometry/LensGeometry";
import { computeLensProfile } from "../optics/opticalEngine";
import type { EyeRx, FrameData } from "../optics/opticalEngine";

export default function Lens({
  rx,
  frame,
  width,
  height,
  offsetX,
  ior,
}: {
  rx: EyeRx;
  frame: FrameData;
  width: number;
  height: number;
  offsetX: number;
  ior: number;
}) {
  const profile = computeLensProfile(rx, frame);

  const geometry = useMemo(
    () =>
      createLensGeometry({
        width,
        height,
        centerThickness: profile.centerThickness,
        frontCurve: profile.frontCurve,
        backCurve: profile.backCurve,
        toricStrength: profile.toricStrength,
        axis: rx.axis,
      }),
    [rx, width, height]
  );

  return (
    <mesh geometry={geometry} position={[offsetX, 0, 0]} >
      <meshPhysicalMaterial
        color="#ffffff"
        transmission={0.85}
        roughness={0.03}
        ior={ior}
        thickness={profile.centerThickness * 0.1}
        transparent
        opacity={1}
        clearcoat={1}
        side={THREE.DoubleSide}
      />
    </mesh>
  );
}
