import Lens from "./Lens";
import type { Prescription, FrameData } from "../optics/opticalEngine";

export default function LensPair({
  rx,
  frame,
}: {
  rx: Prescription;
  frame: FrameData;
}) {
  const halfPD = rx.pdFar / 20; // mm → scene units

  return (
    < >
      <Lens
        rx={rx.right}
        frame={frame}
        width={frame.A / 10}
        height={frame.B / 10}
        offsetX={-halfPD}
        ior={rx.index}
      />
      <Lens
        rx={rx.left}
        frame={frame}
        width={frame.A / 10}
        height={frame.B / 10}
        offsetX={halfPD}
        ior={rx.index}
      />
    </>
  );
}
