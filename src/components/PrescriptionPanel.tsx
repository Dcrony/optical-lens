export default function PrescriptionPanel({ rx, setRx }: any) {
  const renderEye = (eye: "right" | "left") => (
    <tr>
      <td>{eye === "right" ? "R" : "L"}</td>
      {(["sph", "cyl", "axis", "add"] as const).map((k) => (
        <td key={k}>
          <input
            type="number"
            value={rx[eye][k]}
            step={k === "axis" ? 1 : 0.25}
            onChange={(e) =>
              setRx({
                ...rx,
                [eye]: { ...rx[eye], [k]: +e.target.value },
              })
            }
          />
        </td>
      ))}
    </tr>
  );

  return (
    <div className="panel">
      <h3>Prescription</h3>
      <table>
        <thead>
          <tr>
            <th></th>
            <th>SPH</th>
            <th>CYL</th>
            <th>AXIS</th>
            <th>ADD</th>
          </tr>
        </thead>
        <tbody>
          {renderEye("right")}
          {renderEye("left")}
        </tbody>
      </table>

      <label>
        PD Far
        <input
          type="number"
          value={rx.pdFar}
          onChange={(e) => setRx({ ...rx, pdFar: +e.target.value })}
        />
      </label>

      <label>
        Index
        <select
          value={rx.index}
          onChange={(e) => setRx({ ...rx, index: +e.target.value })}
        >
          <option value={1.5}>1.50</option>
          <option value={1.6}>1.60</option>
          <option value={1.67}>1.67</option>
          <option value={1.74}>1.74</option>
        </select>
      </label>
    </div>
  );
}
