import React from "react";
import SkeletonBlock from "./SkeletonBlock.jsx";

export default function DashboardSkeleton() {
  return (
    <div aria-busy="true" aria-label="Loading conditions">
      {/* hero */}
      <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 30 }}>
        <div>
          <SkeletonBlock width={140} height={20} style={{ marginBottom: 8 }} />
          <SkeletonBlock width={100} height={13} />
        </div>
        <SkeletonBlock width={34} height={34} radius={17} />
      </div>

      <div style={{ display: "flex", alignItems: "center", gap: 24, marginBottom: 28 }}>
        <SkeletonBlock width={160} height={96} radius={8} />
        <div>
          <SkeletonBlock width={110} height={16} style={{ marginBottom: 8 }} />
          <SkeletonBlock width={90} height={13} />
        </div>
      </div>

      {/* readout strip */}
      <div
        style={{
          display: "flex",
          borderTop: "1px solid var(--rule)",
          borderBottom: "1px solid var(--rule)",
          padding: "14px 0",
          marginBottom: 40,
          gap: 32,
        }}
      >
        {[0, 1, 2].map((i) => (
          <div key={i} style={{ display: "flex", alignItems: "center", gap: 8 }}>
            <SkeletonBlock width={15} height={15} radius={4} />
            <div>
              <SkeletonBlock width={50} height={10} style={{ marginBottom: 6 }} />
              <SkeletonBlock width={40} height={13} />
            </div>
          </div>
        ))}
      </div>

      {/* hourly */}
      <SkeletonBlock width={90} height={13} style={{ marginBottom: 14 }} />
      <div style={{ display: "flex", gap: 20, marginBottom: 36 }}>
        {Array.from({ length: 8 }).map((_, i) => (
          <div key={i} style={{ textAlign: "center" }}>
            <SkeletonBlock width={30} height={10} style={{ marginBottom: 10 }} />
            <SkeletonBlock width={16} height={16} radius={8} style={{ margin: "0 auto 10px" }} />
            <SkeletonBlock width={24} height={12} />
          </div>
        ))}
      </div>

      {/* daily */}
      <SkeletonBlock width={90} height={13} style={{ marginBottom: 14 }} />
      {Array.from({ length: 5 }).map((_, i) => (
        <div
          key={i}
          style={{
            display: "grid",
            gridTemplateColumns: "44px 24px 1fr 200px 70px",
            alignItems: "center",
            gap: 16,
            padding: "10px 0",
            borderBottom: "1px solid var(--rule)",
          }}
        >
          <SkeletonBlock width={32} height={12} />
          <SkeletonBlock width={15} height={15} radius={4} />
          <SkeletonBlock width={80} height={12} />
          <SkeletonBlock width="100%" height={4} radius={2} />
          <SkeletonBlock width={50} height={12} style={{ marginLeft: "auto" }} />
        </div>
      ))}
    </div>
  );
}
