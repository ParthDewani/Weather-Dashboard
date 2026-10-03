import React from "react";

export default function UnitToggle({ unit, onChange }) {
  return (
    <div
      style={{
        display: "inline-flex",
        border: "1px solid var(--rule)",
        borderRadius: 20,
        overflow: "hidden",
        fontSize: 12.5,
        flexShrink: 0,
      }}
      role="group"
      aria-label="Temperature unit"
    >
      {["C", "F"].map((u) => (
        <button
          key={u}
          onClick={() => onChange(u)}
          aria-pressed={unit === u}
          style={{
            border: "none",
            cursor: "pointer",
            padding: "6px 12px",
            background: unit === u ? "var(--amber)" : "transparent",
            color: unit === u ? "var(--ink)" : "var(--muted)",
            fontWeight: unit === u ? 600 : 400,
            fontFamily: "inherit",
          }}
        >
          °{u}
        </button>
      ))}
    </div>
  );
}
