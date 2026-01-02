type ThicknessInput = {
  power: number;      // diopters (- for myopia, + for hyperopia)
  diameter: number;   // mm
  ior: number;        // refractive index
};

type ThicknessResult = {
  center: number; // mm
  edge: number;   // mm
};

export function calculateLensThickness({
  power,
  diameter,
  ior,
}: ThicknessInput): ThicknessResult {
  const minCenterThickness = 1.5; // mm (industry safe minimum)
  const baseEdgeThickness = 2.0;  // mm

  const radius = diameter / 2;

  // Very simplified lens maker logic
  const curvatureFactor = Math.abs(power) / ior;

  let center = minCenterThickness;
  let edge = baseEdgeThickness;

  if (power < 0) {
    // Myopia → thin center, thick edges
    edge += curvatureFactor * radius * 0.04;
  } else {
    // Hyperopia → thick center
    center += curvatureFactor * radius * 0.04;
  }

  return {
    center: Number(center.toFixed(2)),
    edge: Number(edge.toFixed(2)),
  };
}
