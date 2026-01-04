import * as THREE from "three";
import { useMemo } from "react";

type LensProps = {
  position?: [number, number, number];
  rotation?: [number, number, number];
  rimThickness?: number;

  lensThickness: number;
  baseCurvature: number;
  edgeCurvature: number;
  ior: number;
};

export default function Lens({
  position = [0, 0, 0],
  rotation = [0, 0, 0],
  rimThickness = 0.19,

  lensThickness,
  baseCurvature,
  edgeCurvature,
  ior,
}: LensProps) {
  const { lensGeometry, rimGeometry } = useMemo(() => {
    const width = 4.2;
    const height = 2.6;
    const radius = 0.45;

    /* ---------- Shape ---------- */
    const shape = new THREE.Shape();
    const w = width;
    const h = height;
    const r = radius;

    shape.moveTo(0, h / 2);
    shape.bezierCurveTo(w * 0.15, h / 2, w / 2 - r * 0.5, h / 2 - r * 0.3, w / 2, h / 2 - r);
    shape.bezierCurveTo(w / 2 + r * 0.3, h / 2 - r * 1.5, w / 2, -h / 2 + r * 1.5, w / 2, -h / 2 + r);
    shape.bezierCurveTo(w / 2 - r * 0.5, -h / 2, 0, -h / 2, 0, -h / 2);
    shape.bezierCurveTo(-w / 2 + r * 0.5, -h / 2, -w / 2, -h / 2 + r, -w / 2, -h / 2 + r);
    shape.bezierCurveTo(-w / 2, -h / 2 + r * 1.5, -w / 2 - r * 0.3, h / 2 - r * 1.5, -w / 2, h / 2 - r);
    shape.bezierCurveTo(-w / 2 + r * 0.5, h / 2 - r * 0.3, -w * 0.15, h / 2, 0, h / 2);

    /* ---------- Curvature Function ---------- */
    const applyCurvature = (
      positions: THREE.BufferAttribute,
      thickness: number,
      offsetZ = 0
    ) => {
      const centerZ = thickness / 2;

      for (let i = 0; i < positions.count; i++) {
        const x = positions.getX(i);
        const y = positions.getY(i);
        const z = positions.getZ(i);

        const nx = x / (w / 2);
        const ny = y / (h / 2);
        const dist = Math.min(1, Math.sqrt(nx * nx + ny * ny));

        const spherical = Math.sqrt(1 - dist * dist);
        const base = (1 - spherical) * baseCurvature;
        const edge = dist * dist * edgeCurvature;
        const total = base + edge;

        positions.setZ(
          i,
          z > centerZ
            ? z - total * 0.6 + offsetZ
            : z + total * 0.3 + offsetZ
        );
      }
    };

    /* ---------- Lens ---------- */
    const lensGeo = new THREE.ExtrudeGeometry(shape, {
      depth: lensThickness,
      bevelEnabled: false,
      curveSegments: 96,
    });

    applyCurvature(lensGeo.attributes.position, lensThickness);
    lensGeo.computeVertexNormals();
    lensGeo.center();

    /* ---------- Rim ---------- */
    const rimGeo = new THREE.ExtrudeGeometry(shape, {
      depth: rimThickness,
      bevelEnabled: false,
      curveSegments: 96,
    });

    const rimOffset = -(lensThickness / 2 + rimThickness / 2 + 0.01);
    applyCurvature(rimGeo.attributes.position, rimThickness, rimOffset);

    // Slight scale for clean outline
    const rimPos = rimGeo.attributes.position;
    for (let i = 0; i < rimPos.count; i++) {
      rimPos.setX(i, rimPos.getX(i) * 1.01);
      rimPos.setY(i, rimPos.getY(i) * 1.01);
    }

    rimGeo.computeVertexNormals();
    rimGeo.center();

    return { lensGeometry: lensGeo, rimGeometry: rimGeo };
  }, [lensThickness, baseCurvature, edgeCurvature, rimThickness]);

  return (
    <group position={position} rotation={rotation}>
      {/* Rim */}
      <mesh geometry={rimGeometry} position={[0, 0, -0.06]}>
        <meshStandardMaterial
          color="#050505"
          roughness={0.45}
          metalness={0.35}
        />
      </mesh>

      {/* Lens */}
      <mesh geometry={lensGeometry}>
        <meshPhysicalMaterial
          color="#ffffff"
          transmission={0.2}
          thickness={lensThickness}
          roughness={0.08}
          metalness={0.05}
          ior={ior}
          transparent
          opacity={0.9}
          clearcoat={1}
          envMapIntensity={1.6}
          side={THREE.DoubleSide}
        />
      </mesh>
    </group>
  );
}
