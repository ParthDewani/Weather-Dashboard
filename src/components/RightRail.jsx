import React from "react";
import { Sunrise, Sunset, Sun, Wind as AirIcon } from "lucide-react";
import { formatClock, uvInfo, aqiInfo } from "../lib/weather.js";

export default function RightRail({ daily, airQuality }) {
  const sunrise = daily?.sunrise?.[0];
  const sunset = daily?.sunset?.[0];
  const uv = daily?.uv_index_max?.[0];
  const [uvLabel, uvColor] = uvInfo(uv);
  const uvPct = Math.min(((uv ?? 0) / 11) * 100, 100);

  const aqi = airQuality?.current?.us_aqi;
  const pm25 = airQuality?.current?.pm2_5;
  const [aqiLabel, aqiColor] = aqiInfo(aqi);
  const aqiPct = Math.min(((aqi ?? 0) / 300) * 100, 100);

  return (
    <aside
      className="rail"
      style={{
        width: 230,
        flexShrink: 0,
        borderLeft: "1px solid var(--rule)",
        padding: "28px 20px",
      }}
    >
      <div
        className="fraunces"
        style={{ fontSize: 13, letterSpacing: "0.04em", color: "var(--muted)", marginBottom: 22 }}
      >
        Almanac
      </div>

      {/* sunrise / sunset */}
      <div style={{ marginBottom: 28 }}>
        <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 12 }}>
          <Sunrise size={15} color="var(--amber)" />
          <div>
            <div style={{ fontSize: 11, color: "var(--muted)" }}>Sunrise</div>
            <div style={{ fontSize: 14 }}>{sunrise ? formatClock(sunrise) : "—"}</div>
          </div>
        </div>
        <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
          <Sunset size={15} color="var(--coral)" />
          <div>
            <div style={{ fontSize: 11, color: "var(--muted)" }}>Sunset</div>
            <div style={{ fontSize: 14 }}>{sunset ? formatClock(sunset) : "—"}</div>
          </div>
        </div>
      </div>

      {/* UV index */}
      <div style={{ marginBottom: 28, paddingTop: 20, borderTop: "1px solid var(--rule)" }}>
        <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 10 }}>
          <Sun size={15} color="var(--amber)" />
          <div style={{ fontSize: 11, color: "var(--muted)" }}>UV index</div>
        </div>
        <div style={{ display: "flex", alignItems: "baseline", gap: 8, marginBottom: 8 }}>
          <div className="fraunces" style={{ fontSize: 24 }}>{uv != null ? Math.round(uv) : "—"}</div>
          <div style={{ fontSize: 12.5, color: uvColor }}>{uvLabel}</div>
        </div>
        <div style={{ height: 4, background: "var(--rule)", borderRadius: 2 }}>
          <div
            style={{
              width: `${uvPct}%`,
              height: 4,
              borderRadius: 2,
              background: "linear-gradient(90deg, var(--teal), var(--amber), var(--coral))",
            }}
          />
        </div>
      </div>

      {/* air quality */}
      <div style={{ paddingTop: 20, borderTop: "1px solid var(--rule)" }}>
        <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 10 }}>
          <AirIcon size={15} color="var(--teal)" />
          <div style={{ fontSize: 11, color: "var(--muted)" }}>Air quality (US AQI)</div>
        </div>
        <div style={{ display: "flex", alignItems: "baseline", gap: 8, marginBottom: 8 }}>
          <div className="fraunces" style={{ fontSize: 24 }}>{aqi != null ? Math.round(aqi) : "—"}</div>
          <div style={{ fontSize: 12.5, color: aqiColor }}>{aqiLabel}</div>
        </div>
        <div style={{ height: 4, background: "var(--rule)", borderRadius: 2, marginBottom: 10 }}>
          <div
            style={{
              width: `${aqiPct}%`,
              height: 4,
              borderRadius: 2,
              background: "linear-gradient(90deg, var(--teal), var(--amber), var(--coral))",
            }}
          />
        </div>
        {pm25 != null && (
          <div style={{ fontSize: 11.5, color: "var(--muted)" }}>PM2.5: {pm25.toFixed(1)} µg/m³</div>
        )}
      </div>
    </aside>
  );
}
