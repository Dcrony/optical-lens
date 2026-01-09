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
  frame: FrameData,
  index: number
): LensProfile {
  const semiDiameter =
    Math.sqrt(frame.A ** 2 + frame.B ** 2) / 4; // mm

  const n = index;

  const sph = rx.sph;
  const cyl = rx.cyl;

  // Convert diopters → radius (mm)
  const baseCurveD = frame.BC;
  const frontRadius =
    sph !== 0 ? 1000 / Math.abs(sph + baseCurveD) : Infinity;

  const backRadius =
    sph !== 0 ? 1000 / Math.abs(sph) : Infinity;

  // Sag equation
  const sag = (r: number, y: number) =>
    r === Infinity ? 0 : (y * y) / (2 * r);

  const edgeSagFront = sag(frontRadius, semiDiameter);
  const edgeSagBack = sag(backRadius, semiDiameter);

  const powerSag = Math.abs(edgeSagFront - edgeSagBack);

  // Cylinder contribution
  const cylSag = Math.abs(cyl) * semiDiameter * 0.03;

  let centerThickness: number;

  if (sph < 0) {
    // Minus lens: center fixed
    centerThickness = 1.0;
  } else {
    // Plus lens: edge fixed at 2mm
    centerThickness = 2.0 + powerSag + cylSag;
  }

  return {
    centerThickness,
    frontCurve: 1 / frontRadius,
    backCurve: 1 / backRadius,
    toricStrength: cylSag,
  };
}

