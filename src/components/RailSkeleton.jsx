import React from "react";
import SkeletonBlock from "./SkeletonBlock.jsx";

export default function RailSkeleton() {
  return (
    <aside
      className="rail"
      style={{ width: 230, flexShrink: 0, borderLeft: "1px solid var(--rule)", padding: "28px 20px" }}
      aria-busy="true"
      aria-label="Loading almanac"
    >
      <SkeletonBlock width={70} height={13} style={{ marginBottom: 22 }} />

      <div style={{ marginBottom: 28 }}>
        {[0, 1].map((i) => (
          <div key={i} style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: i === 0 ? 12 : 0 }}>
            <SkeletonBlock width={15} height={15} radius={4} />
            <div>
              <SkeletonBlock width={45} height={10} style={{ marginBottom: 6 }} />
              <SkeletonBlock width={55} height={13} />
            </div>
          </div>
        ))}
      </div>

      {[0, 1].map((i) => (
        <div key={i} style={{ marginBottom: i === 0 ? 28 : 0, paddingTop: 20, borderTop: "1px solid var(--rule)" }}>
          <SkeletonBlock width={90} height={10} style={{ marginBottom: 10 }} />
          <SkeletonBlock width={40} height={22} style={{ marginBottom: 8 }} />
          <SkeletonBlock width="100%" height={4} radius={2} />
        </div>
      ))}
    </aside>
  );
}
