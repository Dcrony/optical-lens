type LensConfig = {
  curvature: number;
  thickness: number;
  ior: number;
};

export default function LensControls({
  config,
  onChange,
}: {
  config: LensConfig;
  onChange: (c: LensConfig) => void;
}) {
  return (
    <div
      style={{
        position: "absolute",
        top: 24,
        left: 24,
        width: 300,
        background: "rgba(20, 22, 28, 0.95)",
        borderRadius: 12,
        padding: 16,
        color: "#e5e7eb",
        fontFamily: "Inter, system-ui, sans-serif",
        boxShadow: "0 20px 40px rgba(0,0,0,0.5)",
        backdropFilter: "blur(12px)",
        border: "1px solid rgba(255,255,255,0.08)",
        zIndex: 1000,
      }}
    >
      {/* Header */}
      <div
        style={{
          fontSize: 14,
          fontWeight: 600,
          marginBottom: 14,
          color: "#f9fafb",
        }}
      >
        Lens Controls
      </div>

      {/* Curvature */}
      <ControlRow
        label="Curvature"
        value={config.curvature.toFixed(2)}
      >
        <input
          type="range"
          min={0.05}
          max={0.25}
          step={0.01}
          value={config.curvature}
          onChange={(e) =>
            onChange({ ...config, curvature: +e.target.value })
          }
          style={{
            height: "3px",
        }}
        />
      </ControlRow>

      {/* Thickness */}
      <ControlRow
        label="Thickness"
        value={`${config.thickness.toFixed(2)} mm`}
      >
        <input
          type="range"
          min={0.04}
          max={0.15}
          step={0.01}
          value={config.thickness}
          onChange={(e) =>
            onChange({ ...config, thickness: +e.target.value })
          }
          style={{
            height: "3px",
        }}
        />
      </ControlRow>

      {/* IOR */}
      <div style={{ marginTop: 10 }}>
        <div
          style={{
            fontSize: 12,
            color: "#9ca3af",
            marginBottom: 6,
          }}
        >
          IOR
        </div>
        <select
          value={config.ior}
          onChange={(e) =>
            onChange({ ...config, ior: +e.target.value })
          }
          style={{
            width: "100%",
            background: "#1f2937",
            color: "#f9fafb",
            borderRadius: 10,
            padding: "6px 10px",
            border: "1px solid rgba(255,255,255,0.08)",
            outline: "none",
            fontSize: 12,
          }}
        >
          <option value={1.5}>Standard (1.50)</option>
          <option value={1.6}>Mid Index (1.60)</option>
          <option value={1.67}>High Index (1.67)</option>
          <option value={1.74}>Ultra Thin (1.74)</option>
        </select>
      </div>
    </div>
  );
}

/* ---------- Small reusable row ---------- */

function ControlRow({
  label,
  value,
  children,
}: {
  label: string;
  value: string;
  children: React.ReactNode;
}) {
  return (
    <div style={{ marginBottom: 14 }}>
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          marginBottom: 6,
        }}
      >
        <span style={{ fontSize: 12, color: "#9ca3af" }}>
          {label}
        </span>

        <span
          style={{
            background: "#111827",
            padding: "2px 8px",
            borderRadius: 6,
            fontSize: 12,
            color: "#e5e7eb",
            border: "1px solid rgba(255,255,255,0.06)",
            minWidth: 52,
            textAlign: "right",
          }}
        >
          {value}
        </span>
      </div>

      <div
        style={{
          display: "flex",
          alignItems: "center",
        }}
      >
        {children}
      </div>

      <style>
        {`
          input[type="range"] {
            width: 100%;
            accent-color: #3b82f6;
          }
        `}
      </style>
    </div>
  );
}
