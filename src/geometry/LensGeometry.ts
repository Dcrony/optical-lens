import * as THREE from "three";

export function createLensGeometry({
  width,
  height,
  centerThickness,
  frontCurve,
  backCurve,
  toricStrength,
  axis,
}: {
  width: number;
  height: number;
  centerThickness: number;
  frontCurve: number;
  backCurve: number;
  toricStrength: number;
  axis: number;
}) {
  const shape = new THREE.Shape();
  const w = width;
  const h = height;
  const r = 0.35;

  // Cat-eye silhouette
  shape.moveTo(0, h / 2);
  shape.bezierCurveTo(w * 0.25, h / 2, w / 2, h / 2 - r, w / 2, h * 0.15);
  shape.bezierCurveTo(w / 2, -h / 2 + r, w * 0.25, -h / 2, 0, -h / 2);
  shape.bezierCurveTo(-w * 0.25, -h / 2, -w / 2, -h / 2 + r, -w / 2, h * 0.15);
  shape.bezierCurveTo(-w / 2, h / 2 - r, -w * 0.25, h / 2, 0, h / 2);

  const geo = new THREE.ExtrudeGeometry(shape, {
    depth: centerThickness * 0.1,
    bevelEnabled: false,
    curveSegments: 96,
  });

  const pos = geo.attributes.position;
  const rad = (axis * Math.PI) / 180;

  for (let i = 0; i < pos.count; i++) {
    const x = pos.getX(i);
    const y = pos.getY(i);
    const z = pos.getZ(i);

    const nx = x / (w / 2);
    const ny = y / (h / 2);
    const rNorm = Math.min(1, Math.sqrt(nx * nx + ny * ny));

    const toric =
      Math.cos(rad) * nx * toricStrength +
      Math.sin(rad) * ny * toricStrength;

    const front = (1 - rNorm) * frontCurve;
    const back = rNorm * backCurve;

    pos.setZ(i, z + front - back + toric);
  }

  geo.computeVertexNormals();
  geo.center();
  return geo;
}
