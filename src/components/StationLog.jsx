import React from "react";
import { X } from "lucide-react";

export default function StationLog({ favorites, activePlace, onSelect, onRemove }) {
  return (
    <aside
      className="sidebar"
      style={{
        width: 250,
        flexShrink: 0,
        borderRight: "1px solid var(--rule)",
        padding: "28px 20px",
      }}
    >
      <div
        className="fraunces"
        style={{ fontSize: 13, letterSpacing: "0.04em", color: "var(--muted)", marginBottom: 22 }}
      >
        Station log
      </div>

      <div>
        {favorites.map((f, i) => {
          const active = activePlace?.name === f.name && activePlace?.latitude === f.latitude;
          return (
            <div
              key={i}
              className="fav-row"
              onClick={() => onSelect(f)}
              role="button"
              tabIndex={0}
              onKeyDown={(e) => e.key === "Enter" && onSelect(f)}
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                padding: "10px 8px",
                borderRadius: 4,
                cursor: "pointer",
                borderLeft: active ? "2px solid var(--amber)" : "2px solid transparent",
                background: active ? "rgba(180,85,46,0.08)" : "transparent",
              }}
            >
              <div>
                <div style={{ fontSize: 14, fontWeight: 500 }}>{f.name}</div>
                <div style={{ fontSize: 11, color: "var(--muted)" }}>
                  {f.admin1 ? f.admin1 + ", " : ""}
                  {f.country}
                </div>
              </div>
              <X
                size={13}
                color="var(--muted)"
                style={{ opacity: 0.6 }}
                onClick={(e) => {
                  e.stopPropagation();
                  onRemove(f);
                }}
              />
            </div>
          );
        })}

        {favorites.length === 0 && (
          <div style={{ fontSize: 12.5, color: "var(--muted)", lineHeight: 1.6 }}>
            No stations saved yet. Search a city and star it to log it here.
          </div>
        )}
      </div>
    </aside>
  );
}
