export type EyeRx = {
  sph: number;
  cyl: number;
  axis: number;
  add: number;
};

export type Prescription = {
  right: EyeRx;
  left: EyeRx;
  pdFar: number; // mm
  pdNear: number;
  index: number;
};

export type FrameData = {
  A: number;
  B: number;
  DBL: number;
  BC: number;
};

export type LensProfile = {
  centerThickness: number;
  frontCurve: number;
  backCurve: number;
  toricStrength: number;
};

export function computeLensProfile(
  rx: EyeRx,
  frame: FrameData
): LensProfile {
  const power = rx.sph + rx.cyl * 0.5;

  const centerThickness =
    power > 0 ? 2.2 + power * 0.4 : 1.2 + Math.abs(power) * 0.15;

  return {
    centerThickness: Math.max(1, centerThickness),
    frontCurve: 0.12 + Math.max(0, power) * 0.04,
    backCurve: 0.08 + Math.abs(power) * 0.03,
    toricStrength: Math.abs(rx.cyl) * 0.06,
  };
}
