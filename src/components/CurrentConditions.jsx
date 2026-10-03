import React from "react";
import { Star, Droplets, Wind, Gauge, Clock } from "lucide-react";
import { weatherInfo, formatTemp } from "../lib/weather.js";
import { useLocalClock } from "../lib/useLocalClock.js";

export default function CurrentConditions({ place, current, isFavorite, onToggleFavorite, unit, timezone }) {
  const [condLabel, CondIcon] = weatherInfo(current.weather_code);
  const localTime = useLocalClock(timezone);

  const readouts = [
    [Droplets, "Humidity", `${current.relative_humidity_2m}%`],
    [Wind, "Wind", `${Math.round(current.wind_speed_10m)} km/h`],
    [Gauge, "Pressure", `${Math.round(current.surface_pressure)} hPa`],
  ];

  return (
    <>
      <div
        style={{
          display: "flex",
          alignItems: "flex-end",
          justifyContent: "space-between",
          flexWrap: "wrap",
          gap: 20,
          marginBottom: 30,
        }}
      >
        <div>
          <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 6 }}>
            <div className="fraunces" style={{ fontSize: 20 }}>
              {place.name}
            </div>
            <Star
              size={15}
              color={isFavorite ? "var(--amber)" : "var(--muted)"}
              fill={isFavorite ? "var(--amber)" : "none"}
              style={{ cursor: "pointer" }}
              onClick={onToggleFavorite}
            />
          </div>
          <div style={{ fontSize: 12.5, color: "var(--muted)" }}>
            {place.admin1 ? place.admin1 + ", " : ""}
            {place.country}
          </div>
        </div>
        <div style={{ textAlign: "right" }}>
          {localTime && (
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: 5,
                justifyContent: "flex-end",
                fontSize: 12.5,
                color: "var(--muted)",
                marginBottom: 8,
              }}
            >
              <Clock size={12} />
              {localTime} local
            </div>
          )}
          <CondIcon size={34} color="var(--amber)" style={{ marginLeft: "auto" }} />
        </div>
      </div>

      <div style={{ display: "flex", alignItems: "center", gap: 24, marginBottom: 28, flexWrap: "wrap" }}>
        <div className="fraunces" style={{ fontSize: 96, lineHeight: 1, fontWeight: 500 }}>
          {formatTemp(current.temperature_2m, unit)}
        </div>
        <div>
          <div style={{ fontSize: 16, marginBottom: 4 }}>{condLabel}</div>
          <div style={{ fontSize: 12.5, color: "var(--muted)" }}>
            Feels like {formatTemp(current.apparent_temperature, unit)}
          </div>
        </div>
      </div>

      <div
        style={{
          display: "flex",
          borderTop: "1px solid var(--rule)",
          borderBottom: "1px solid var(--rule)",
          padding: "14px 0",
          marginBottom: 40,
          flexWrap: "wrap",
        }}
      >
        {readouts.map(([Icon, label, val], i) => (
          <div
            key={i}
            style={{
              display: "flex",
              alignItems: "center",
              gap: 8,
              paddingRight: 32,
              marginRight: 32,
              borderRight: i < readouts.length - 1 ? "1px solid var(--rule)" : "none",
            }}
          >
            <Icon size={15} color="var(--teal)" />
            <div>
              <div style={{ fontSize: 11, color: "var(--muted)" }}>{label}</div>
              <div style={{ fontSize: 14 }}>{val}</div>
            </div>
          </div>
        ))}
      </div>
    </>
  );
}
