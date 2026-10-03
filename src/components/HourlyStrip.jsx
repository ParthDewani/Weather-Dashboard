import React from "react";
import { weatherInfo, formatHour, formatTemp } from "../lib/weather.js";

export default function HourlyStrip({ hourly, unit }) {
  const startHour = new Date().getHours();
  const slice = hourly.time.slice(startHour, startHour + 24);

  return (
    <>
      <div className="fraunces" style={{ fontSize: 13, color: "var(--muted)", marginBottom: 14 }}>
        Next 24 hours
      </div>
      <div style={{ display: "flex", overflowX: "auto", paddingBottom: 20, marginBottom: 36 }}>
        {slice.map((t, i) => {
          const idx = startHour + i;
          const [, Icon] = weatherInfo(hourly.weather_code[idx]);
          return (
            <div
              key={i}
              style={{
                minWidth: 56,
                textAlign: "center",
                padding: "0 10px",
                borderRight: "1px solid var(--rule)",
              }}
            >
              <div style={{ fontSize: 11, color: "var(--muted)", marginBottom: 10 }}>
                {formatHour(t)}
              </div>
              <Icon size={16} color="var(--teal)" style={{ margin: "0 auto 10px" }} />
              <div style={{ fontSize: 13 }}>{formatTemp(hourly.temperature_2m[idx], unit)}</div>
            </div>
          );
        })}
      </div>
    </>
  );
}
