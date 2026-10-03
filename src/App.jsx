import React, { useState, useEffect } from "react";
import SearchBar from "./components/SearchBar.jsx";
import StationLog from "./components/StationLog.jsx";
import CurrentConditions from "./components/CurrentConditions.jsx";
import HourlyStrip from "./components/HourlyStrip.jsx";
import DailyStrip from "./components/DailyStrip.jsx";
import RightRail from "./components/RightRail.jsx";
import WeatherEffect from "./components/WeatherEffect.jsx";
import UnitToggle from "./components/UnitToggle.jsx";
import DashboardSkeleton from "./components/DashboardSkeleton.jsx";
import RailSkeleton from "./components/RailSkeleton.jsx";
import { fetchForecast, fetchAirQuality, skyTheme, weatherCategory } from "./lib/weather.js";
import { useFavorites } from "./lib/useFavorites.js";

function useUnit() {
  const [unit, setUnit] = useState(() => {
    try {
      return localStorage.getItem("weather-dashboard:unit") || "C";
    } catch {
      return "C";
    }
  });
  useEffect(() => {
    try {
      localStorage.setItem("weather-dashboard:unit", unit);
    } catch {
      // ignore
    }
  }, [unit]);
  return [unit, setUnit];
}

export default function App() {
  const { favorites, isFavorite, toggleFavorite, removeFavorite } = useFavorites();
  const [place, setPlace] = useState(favorites[0] ?? null);
  const [weather, setWeather] = useState(null);
  const [airQuality, setAirQuality] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [unit, setUnit] = useUnit();

  useEffect(() => {
    if (!place) {
      setLoading(false);
      return;
    }
    let cancelled = false;
    setLoading(true);
    setError(null);

    Promise.all([
      fetchForecast(place.latitude, place.longitude),
      fetchAirQuality(place.latitude, place.longitude).catch(() => null),
    ])
      .then(([forecast, air]) => {
        if (!cancelled) {
          setWeather(forecast);
          setAirQuality(air);
        }
      })
      .catch(() => {
        if (!cancelled) setError("Could not reach the forecast station. Try again in a moment.");
      })
      .finally(() => {
        if (!cancelled) setLoading(false);
      });

    return () => {
      cancelled = true;
    };
  }, [place]);

  const theme = weather
    ? skyTheme(weatherCategory(weather.current.weather_code), weather.current.is_day === 1)
    : skyTheme("clear", true);

  const bgImage = theme.isDark
    ? `radial-gradient(ellipse 1000px 520px at 50% -8%, ${theme.amber}26, transparent 60%), radial-gradient(ellipse 700px 500px at 100% 40%, ${theme.teal}1F, transparent 55%), repeating-radial-gradient(circle at 50% 0%, rgba(255,255,255,0.035) 0, rgba(255,255,255,0.035) 1px, transparent 1px, transparent 64px)`
    : `radial-gradient(ellipse 1000px 520px at 50% -8%, ${theme.amber}14, transparent 60%), radial-gradient(ellipse 700px 500px at 100% 40%, ${theme.teal}14, transparent 55%), repeating-radial-gradient(circle at 50% 0%, rgba(38,49,62,0.025) 0, rgba(38,49,62,0.025) 1px, transparent 1px, transparent 64px)`;

  return (
    <div
      style={{
        "--ink": theme.ink,
        "--panel": theme.panel,
        "--rule": theme.rule,
        "--text": theme.text,
        "--muted": theme.muted,
        "--amber": theme.amber,
        "--teal": theme.teal,
        "--coral": theme.coral,
        minHeight: "100vh",
        color: "var(--text)",
        backgroundColor: "var(--ink)",
        backgroundImage: bgImage,
        transition: "background-color 0.6s ease, color 0.6s ease",
      }}
    >
      {!loading && !error && weather && (
        <WeatherEffect code={weather.current.weather_code} isDay={weather.current.is_day === 1} />
      )}

      <div
        className="app-shell"
        style={{ display: "flex", minHeight: "100vh", maxWidth: 1440, margin: "0 auto", position: "relative", zIndex: 1 }}
      >
        <StationLog
          favorites={favorites}
          activePlace={place}
          onSelect={setPlace}
          onRemove={removeFavorite}
        />

        <main style={{ flex: 1, padding: "28px 32px 60px", minWidth: 0, maxWidth: 760, margin: "0 auto" }}>
          <div style={{ display: "flex", alignItems: "flex-start", gap: 16 }}>
            <div style={{ flex: 1 }}>
              <SearchBar
                onSelect={setPlace}
                isFavorite={isFavorite}
                onToggleFavorite={toggleFavorite}
              />
            </div>
            <UnitToggle unit={unit} onChange={setUnit} />
          </div>

          {error && <div style={{ color: "var(--coral)", fontSize: 14 }}>{error}</div>}

          {!place && !error && (
            <div style={{ color: "var(--muted)", fontSize: 14 }}>
              Search for a city above to read its conditions.
            </div>
          )}

          {loading && !error && place && <DashboardSkeleton />}

          {!loading && !error && weather && place && (
            <>
              <CurrentConditions
                place={place}
                current={weather.current}
                isFavorite={isFavorite(place)}
                onToggleFavorite={() => toggleFavorite(place)}
                unit={unit}
                timezone={weather.timezone}
              />
              <HourlyStrip hourly={weather.hourly} unit={unit} />
              <DailyStrip daily={weather.daily} unit={unit} />
            </>
          )}
        </main>

        {loading && !error && place && <RailSkeleton />}
        {!loading && !error && weather && (
          <RightRail daily={weather.daily} airQuality={airQuality} />
        )}
      </div>
    </div>
  );
}
