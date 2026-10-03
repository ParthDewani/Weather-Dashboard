# 🌦️ Station Log — A Weather Dashboard With a Sky That Actually Reacts

> A live weather dashboard that doesn't just display data — it changes mood with it. Search any city, and the page's color palette, ambient effects, and even the local clock shift to match real current conditions.

**[→ Live demo](https://weather-dashboard-blue-sigma.vercel.app/)**

![screenshot](./screenshot.png)

---

## Table of contents

- [The idea](#the-idea)
- [Features](#features)
- [How it works](#how-it-works)
- [Tech stack](#tech-stack)
- [Project structure](#project-structure)
- [Design decisions](#design-decisions)
- [Known limitations & what's next](#known-limitations--whats-next)
- [Credits](#credits)

---

## The idea

Most weather-app tutorials converge on the same pattern: a card grid, a blue gradient, maybe a dark mode toggle. This project started as that, then grew into something more specific — a dashboard styled like a printed weather almanac or an old aviation chart, where the *page itself* is the data visualization, not just a container for it.

Concretely: search Reykjavik at 2am and the whole screen shifts to a deep indigo night sky with real stars twinkling over it. Search Mumbai mid-storm and it goes dark and dramatic, with rain streaking down and the occasional lightning flash. Search a clear afternoon in Phoenix and it stays bright, warm, and paper-toned. None of this is decorative on top — the color system, the animated effects, and the actual forecast data all come from the same source of truth.

## Features

**Core forecasting**
- 🔍 Search any city worldwide, with debounced live geocoding as you type
- 🌡️ Current conditions: temperature, feels-like, humidity, wind, pressure
- 🕐 24-hour forecast strip
- 📅 7-day outlook, rendered as temperature range bars rather than a card grid
- 🌅 Sunrise/sunset, UV index, and live air quality (US AQI + PM2.5)
- 🕰️ The selected city's actual live local clock (so a "night" theme at 2pm your time still makes sense)

**The reactive layer**
- 🌦️ The entire page's color palette — not an overlay, the actual background, text, and accent colors — shifts hue and lightness based on current condition and time of day
- ☔ Animated weather effects layered on top: falling rain, drifting snow, rolling fog, a pulsing sun glow, a twinkling starfield, or lightning flashes during storms — all driven by the same forecast data, not a separate decorative system

**The usual niceties, done properly**
- ⭐ Favorites ("station log"), persisted to `localStorage`
- 🌡️ °C/°F toggle, preference persisted
- 💀 Loading skeletons shaped like the real layout, so nothing jumps when data lands
- 📱 Responsive — sidebar collapses to horizontal scroll on mobile, the almanac rail hides below tablet width
- ♿ Visible keyboard focus states, respects `prefers-reduced-motion`

## How it works

The architecture leans on one idea: **everything downstream reads from CSS custom properties, and only one place writes them.**

1. `App.jsx` fetches the forecast + air quality for the selected city from Open-Meteo.
2. `weather.js`'s `skyTheme(category, isDay)` takes the current WMO weather code and day/night flag and computes a full color theme — background, panel, text, muted, and three accent colors — using HSL math keyed to a per-category hue (warm gold for clear, cool blue for rain, violet-slate for storms, etc).
3. That theme is applied as inline CSS custom properties (`--ink`, `--text`, `--amber`, …) on the app's root element.
4. Every component — the hero, the daily outlook bars, the almanac rail, and critically the `WeatherEffect` animation layer — reads colors via `var(--teal)`, `var(--amber)`, etc. None of them know what the weather actually is; they just inherit whatever the root decided.

The practical result: adding a new "mood" to the app (say, a hail effect) only means extending the theme map and the effect layer — nothing else needs to change, because the color system was never hardcoded in the first place.

The `WeatherEffect` layer itself is a `position: fixed`, `pointer-events: none` layer sitting behind the real UI (z-index managed so content always wins), rendering randomized-but-memoized particles (raindrops, snowflakes, stars) sized and timed per condition.

## Tech stack

| Layer | Choice | Why |
|---|---|---|
| UI | React 18 | Component model fits the "many small reactive pieces" shape of this app |
| Build | Vite | Fast dev server, simple static output |
| Icons | [lucide-react](https://lucide.dev/) | Consistent, lightweight icon set |
| Weather + geocoding data | [Open-Meteo](https://open-meteo.com/) | Free, no API key, generous enough for a portfolio project |
| Hosting | [Vercel](https://vercel.com/) | Zero-config static deploys, auto-redeploy on push |

## Project structure

```
weather-dashboard/
├── index.html
├── package.json
├── vite.config.js
├── .gitignore
├── README.md
├── screenshot.png
└── src/
    ├── main.jsx                 # React entry point
    ├── App.jsx                  # Top-level layout, data fetching, theme computation
    ├── index.css                # Design tokens, weather-effect keyframes, responsive rules
    │
    ├── components/
    │   ├── SearchBar.jsx          # Debounced city search with live geocoding dropdown
    │   ├── StationLog.jsx         # Sidebar list of saved/favorited cities
    │   ├── CurrentConditions.jsx  # Hero: temperature, condition, readouts, live local clock
    │   ├── HourlyStrip.jsx        # Scrollable next-24-hours strip
    │   ├── DailyStrip.jsx         # 7-day outlook as temperature range bars
    │   ├── RightRail.jsx          # Almanac: sunrise/sunset, UV index, air quality
    │   ├── UnitToggle.jsx         # °C / °F pill toggle
    │   ├── WeatherEffect.jsx      # The animated rain/snow/fog/sun/stars/lightning layer
    │   ├── DashboardSkeleton.jsx  # Loading placeholder matching the main column's shape
    │   ├── RailSkeleton.jsx       # Loading placeholder for the almanac rail
    │   └── SkeletonBlock.jsx      # Shared pulsing placeholder primitive
    │
    └── lib/
        ├── weather.js            # API calls, WMO weather-code mapping, skyTheme() generator
        ├── useFavorites.js       # Favorites state, synced to localStorage
        └── useLocalClock.js      # Live clock ticking in the selected city's IANA timezone
```

## Design decisions

- **Why a "sky theme" instead of a dark-mode toggle?** A binary light/dark toggle is a solved problem that doesn't say much about a project. Tying the *entire* palette to real, continuously-varying data (weather code × day/night) is a more interesting system to design and a better demonstration of thinking in design tokens rather than hardcoded colors.
- **Why Open-Meteo over a commercial weather API?** No API key to manage or leak, generous enough rate limits for a demo, and it bundles geocoding + air quality + weather in one ecosystem — fewer moving parts for a portfolio project people will actually want to run.
- **Why range bars instead of a 7-day card grid?** Cards are the default; a horizontal range bar communicates "low to high across the week" more honestly at a glance, and it's a small, specific design choice that's easy to talk about in an interview.

## Known limitations & what's next

- Air quality and UV data are model estimates from Open-Meteo, not official regulatory sensor readings — fine for a demo, worth flagging if extended into anything real.
- Favorites are per-browser (`localStorage`), not synced across devices — a natural next step would be optional account-based sync.
- Ideas for extending further: a severe-weather alert banner, animated transitions between cities, a map view of all saved stations at once.

## Credits

- Weather, geocoding, and air quality data from [Open-Meteo](https://open-meteo.com/)
- Icons from [Lucide](https://lucide.dev/)
