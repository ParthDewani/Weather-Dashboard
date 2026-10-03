import React, { useMemo } from "react";
import { weatherCategory } from "../lib/weather.js";

function rand(min, max) {
  return Math.random() * (max - min) + min;
}

export default function WeatherEffect({ code, isDay }) {
  const category = weatherCategory(code);

  const showStorm = category === "thunderstorm";
  const showRain = category === "rain" || category === "drizzle" || showStorm;
  const showSnow = category === "snow";
  const showFog = category === "fog";
  const showSun = category === "clear" && isDay;
  const showNight = category === "clear" && !isDay;

  const raindrops = useMemo(
    () =>
      showRain
        ? Array.from({ length: showStorm ? 55 : 38 }).map(() => ({
            left: rand(0, 100),
            delay: rand(0, 2),
            duration: rand(0.5, 1.1),
            height: rand(30, 56),
          }))
        : [],
    [showRain, showStorm]
  );

  const snowflakes = useMemo(
    () =>
      showSnow
        ? Array.from({ length: 34 }).map(() => ({
            left: rand(0, 100),
            delay: rand(0, 9),
            duration: rand(7, 13),
            size: rand(3, 7),
          }))
        : [],
    [showSnow]
  );

  const stars = useMemo(
    () =>
      showNight
        ? Array.from({ length: 46 }).map(() => ({
            left: rand(0, 100),
            top: rand(0, 55),
            delay: rand(0, 4),
            duration: rand(2, 5),
          }))
        : [],
    [showNight]
  );

  if (!showRain && !showSnow && !showFog && !showSun && !showNight) return null;

  return (
    <div className="weather-fx" aria-hidden="true">
      {showSun && <div className="sun-glow" />}

      {showNight &&
        stars.map((s, i) => (
          <div
            key={i}
            className="star"
            style={{
              left: `${s.left}%`,
              top: `${s.top}%`,
              animationDelay: `${s.delay}s`,
              animationDuration: `${s.duration}s`,
            }}
          />
        ))}

      {showFog &&
        [0, 1, 2].map((i) => (
          <div
            key={i}
            className="fog-band"
            style={{ top: `${20 + i * 25}%`, animationDuration: `${18 + i * 4}s`, animationDelay: `${i * 2}s` }}
          />
        ))}

      {showRain &&
        raindrops.map((d, i) => (
          <div
            key={i}
            className="raindrop"
            style={{
              left: `${d.left}%`,
              height: d.height,
              animationDelay: `${d.delay}s`,
              animationDuration: `${d.duration}s`,
            }}
          />
        ))}

      {showSnow &&
        snowflakes.map((f, i) => (
          <div
            key={i}
            className="snowflake"
            style={{
              left: `${f.left}%`,
              width: f.size,
              height: f.size,
              animationDelay: `${f.delay}s`,
              animationDuration: `${f.duration}s`,
            }}
          />
        ))}

      {showStorm && (
        <>
          <div className="flash" style={{ animationDelay: "0s" }} />
          <div className="flash" style={{ animationDelay: "3.5s" }} />
        </>
      )}
    </div>
  );
}
