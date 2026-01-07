export default function FramePanel({ frame, setFrame }: any) {
  return (
    <div className="panel frame-panel">
      <h3>Frame</h3>

      <div className="frame-input-group">
        {(["A", "B", "DBL", "BC"] as const).map((k) => (
          <label key={k}>
            <span>{k}</span>
            <input
              type="number"
              value={frame[k]}
              onChange={(e) =>
                setFrame({ ...frame, [k]: +e.target.value })
              }
            />
          </label>
        ))}
      </div>

      <div className="shape">Shape: Cat Eye</div>
    </div>
  );
}