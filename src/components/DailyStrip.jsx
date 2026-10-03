import React from "react";
import { weatherInfo, formatDay, formatTemp } from "../lib/weather.js";

export default function DailyStrip({ daily, unit }) {
  const weekMin = Math.min(...daily.temperature_2m_min);
  const weekMax = Math.max(...daily.temperature_2m_max);
  const span = Math.max(weekMax - weekMin, 1);

  return (
    <>
      <div className="fraunces" style={{ fontSize: 13, color: "var(--muted)", marginBottom: 14 }}>
        7-day outlook
      </div>
      <div>
        {daily.time.map((d, i) => {
          const [label, Icon] = weatherInfo(daily.weather_code[i]);
          const lo = daily.temperature_2m_min[i];
          const hi = daily.temperature_2m_max[i];
          const leftPct = ((lo - weekMin) / span) * 100;
          const widthPct = ((hi - lo) / span) * 100;

          return (
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
              <div style={{ fontSize: 13 }}>{i === 0 ? "Today" : formatDay(d)}</div>
              <Icon size={15} color="var(--teal)" />
              <div style={{ fontSize: 12.5, color: "var(--muted)" }}>{label}</div>
              <div style={{ position: "relative", height: 4, background: "var(--rule)", borderRadius: 2 }}>
                <div
                  style={{
                    position: "absolute",
                    left: `${leftPct}%`,
                    width: `${widthPct}%`,
                    height: 4,
                    background: "linear-gradient(90deg, var(--teal), var(--amber))",
                    borderRadius: 2,
                  }}
                />
              </div>
              <div style={{ fontSize: 13, textAlign: "right" }}>
                <span style={{ color: "var(--muted)" }}>{formatTemp(lo, unit)}</span> / {formatTemp(hi, unit)}
              </div>
            </div>
          );
        })}
      </div>
    </>
  );
}
