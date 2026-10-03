import {
  Sun,
  Cloud,
  CloudRain,
  CloudSnow,
  CloudLightning,
  CloudFog,
  CloudDrizzle,
} from "lucide-react";

// WMO weather codes -> human label + icon
const CODE_TABLE = {
  0: ["Clear sky", Sun],
  1: ["Mostly clear", Sun],
  2: ["Partly cloudy", Cloud],
  3: ["Overcast", Cloud],
  45: ["Fog", CloudFog],
  48: ["Rime fog", CloudFog],
  51: ["Light drizzle", CloudDrizzle],
  53: ["Drizzle", CloudDrizzle],
  55: ["Dense drizzle", CloudDrizzle],
  61: ["Light rain", CloudRain],
  63: ["Rain", CloudRain],
  65: ["Heavy rain", CloudRain],
  71: ["Light snow", CloudSnow],
  73: ["Snow", CloudSnow],
  75: ["Heavy snow", CloudSnow],
  80: ["Rain showers", CloudRain],
  81: ["Rain showers", CloudRain],
  82: ["Violent showers", CloudRain],
  95: ["Thunderstorm", CloudLightning],
  96: ["Thunderstorm, hail", CloudLightning],
  99: ["Thunderstorm, hail", CloudLightning],
};

const SKY_HUES = {
  clear: 32,
  cloudy: 210,
  fog: 50,
  drizzle: 202,
  rain: 206,
  snow: 198,
  thunderstorm: 255,
};

// Storms always feel dark/dramatic regardless of daylight; everything else
// follows isDay. Hue shifts the whole page toward the mood of the condition,
// while staying light (paper-like) by day and properly dark by night.
export function skyTheme(category, isDay) {
  const isDark = !isDay || category === "thunderstorm";
  const hue = SKY_HUES[category] ?? SKY_HUES.cloudy;
  const sat = category === "fog" ? 15 : category === "cloudy" ? 20 : 35;

  if (isDark) {
    return {
      ink: `hsl(${hue} ${sat}% 14%)`,
      panel: `hsl(${hue} ${Math.max(sat - 5, 10)}% 19%)`,
      rule: `hsl(${hue} ${Math.max(sat - 10, 10)}% 30%)`,
      text: "#EDEAE0",
      muted: `hsl(${hue} 15% 68%)`,
      amber: "#E0995C",
      teal: "#5FB39E",
      coral: "#E1735A",
      isDark: true,
    };
  }

  return {
    ink: `hsl(${hue} ${sat}% 94%)`,
    panel: `hsl(${hue} ${sat}% 89%)`,
    rule: `hsl(${hue} ${Math.max(sat - 5, 15)}% 78%)`,
    text: "#26313E",
    muted: `hsl(${hue} 18% 45%)`,
    amber: "#B4552E",
    teal: "#4F8F7D",
    coral: "#8C3B2E",
    isDark: false,
  };
}

export function weatherCategory(code) {
  if ([0, 1].includes(code)) return "clear";
  if ([2, 3].includes(code)) return "cloudy";
  if ([45, 48].includes(code)) return "fog";
  if ([51, 53, 55].includes(code)) return "drizzle";
  if ([61, 63, 65, 80, 81, 82].includes(code)) return "rain";
  if ([71, 73, 75].includes(code)) return "snow";
  if ([95, 96, 99].includes(code)) return "thunderstorm";
  return "cloudy";
}

export function weatherInfo(code) {
  return CODE_TABLE[code] || ["Unknown", Cloud];
}

// API always returns Celsius — convert client-side so toggling units never re-fetches
export function formatTemp(celsius, unit) {
  const value = unit === "F" ? celsius * 9/5 + 32 : celsius;
  return `${Math.round(value)}°`;
}

export function formatDay(iso) {
  return new Date(iso + "T00:00").toLocaleDateString(undefined, { weekday: "short" });
}

export function formatHour(iso) {
  return new Date(iso).toLocaleTimeString(undefined, { hour: "numeric" });
}

export async function geocodeCity(query) {
  const res = await fetch(
    `https://geocoding-api.open-meteo.com/v1/search?name=${encodeURIComponent(
      query
    )}&count=6&language=en&format=json`
  );
  if (!res.ok) throw new Error("Geocoding request failed");
  const data = await res.json();
  return data.results || [];
}

export async function fetchForecast(latitude, longitude) {
  const url =
    `https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}` +
    `&current=temperature_2m,relative_humidity_2m,apparent_temperature,weather_code,wind_speed_10m,surface_pressure,is_day` +
    `&hourly=temperature_2m,weather_code` +
    `&daily=weather_code,temperature_2m_max,temperature_2m_min,sunrise,sunset,uv_index_max` +
    `&timezone=auto&forecast_days=7`;
  const res = await fetch(url);
  if (!res.ok) throw new Error("Forecast request failed");
  return res.json();
}

export async function fetchAirQuality(latitude, longitude) {
  const url =
    `https://air-quality-api.open-meteo.com/v1/air-quality?latitude=${latitude}&longitude=${longitude}` +
    `&current=us_aqi,pm2_5&timezone=auto`;
  const res = await fetch(url);
  if (!res.ok) throw new Error("Air quality request failed");
  return res.json();
}

export function formatClock(iso) {
  return new Date(iso).toLocaleTimeString(undefined, { hour: "numeric", minute: "2-digit" });
}

// US AQI scale -> label + accent color
export function aqiInfo(aqi) {
  if (aqi == null) return ["—", "var(--muted)"];
  if (aqi <= 50) return ["Good", "var(--teal)"];
  if (aqi <= 100) return ["Moderate", "var(--amber)"];
  if (aqi <= 150) return ["Unhealthy (sensitive)", "var(--amber)"];
  if (aqi <= 200) return ["Unhealthy", "var(--coral)"];
  if (aqi <= 300) return ["Very unhealthy", "var(--coral)"];
  return ["Hazardous", "var(--coral)"];
}

export function uvInfo(uv) {
  if (uv == null) return ["—", "var(--muted)"];
  if (uv < 3) return ["Low", "var(--teal)"];
  if (uv < 6) return ["Moderate", "var(--amber)"];
  if (uv < 8) return ["High", "var(--amber)"];
  if (uv < 11) return ["Very high", "var(--coral)"];
  return ["Extreme", "var(--coral)"];
}
