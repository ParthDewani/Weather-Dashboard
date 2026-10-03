# Station Log — Weather Dashboard

A live weather dashboard built with React and Vite. Search any city, save it to your "station log," and read current conditions, an hourly strip, and a 7-day outlook — all pulled from a free, key-free public API.

**[Live demo →](#)** *(add your deployed URL here once you've shipped it)*

## Why this project

Most weather-app tutorials reach for the same card-grid layout — and, increasingly, the same dark-navy-and-amber dashboard palette. This one is styled like a weather station instrument panel on paper instead: a warm cream background, deep navy ink for text, and a rust/teal accent pair, evoking an old printed almanac or aviation chart rather than a generic SaaS dark mode. A sidebar log of saved stations, a large hero reading, and a 7-day outlook rendered as temperature range bars round out the "instrument panel" feel.

## Features

- 🔍 **Search any city** — debounced, live geocoding as you type
- ⭐ **Favorites ("station log")** — saved to `localStorage`, persists across visits
- 🌡️ **Current conditions** — temperature, feels-like, humidity, wind, pressure
- 🕐 **24-hour forecast strip**
- 📅 **7-day outlook** with visual temperature range bars
- 🌅 **Almanac rail** — sunrise/sunset, UV index, and live air quality (US AQI + PM2.5)
- 🌦️ **Weather-reactive theme** — the entire page (not just an overlay) shifts hue and lightness to match current conditions and day/night: warm cream for clear days, pale cool tones for fog/snow, and a properly dark sky for night and storms, so the rain/snow/stars/lightning effects always have the contrast to read clearly
- 🕰️ **Live local time** — shows the selected city's actual local clock, so the weather effects (night stars, etc.) make sense even if it's a different time where you are
- 🌡️ **°C / °F toggle** — preference persists across visits
- 💀 **Loading skeletons** — layout holds its shape while data loads, no jump-in
- 📱 **Responsive** — sidebar collapses to a horizontal scroll on mobile, almanac rail hides below tablet width
- ♿ **Accessible** — visible keyboard focus states, respects reduced-motion preference

## Tech stack

- [React 18](https://react.dev/)
- [Vite](https://vitejs.dev/) — build tool and dev server
- [lucide-react](https://lucide.dev/) — icon set
- [Open-Meteo](https://open-meteo.com/) — free weather + geocoding API, no key required

## Getting started

```bash
# install dependencies
npm install

# run the dev server
npm run dev

# build for production
npm run build
```

The dev server runs at `http://localhost:5173` by default.

## Project structure

```
src/
  components/
    SearchBar.jsx          city search with debounced geocoding
    StationLog.jsx          sidebar list of saved favorites
    CurrentConditions.jsx   hero: temperature, condition, readouts
    HourlyStrip.jsx         next-24-hours scroll strip
    DailyStrip.jsx          7-day outlook with range bars
    RightRail.jsx            almanac: sunrise/sunset, UV, air quality
    UnitToggle.jsx           °C / °F pill toggle
    WeatherEffect.jsx        animated rain/snow/fog/sun/stars layer, driven by current conditions
    DashboardSkeleton.jsx    loading placeholder for the main column
    RailSkeleton.jsx         loading placeholder for the almanac rail
    SkeletonBlock.jsx        shared pulsing placeholder block
  lib/
    weather.js               API calls, WMO weather-code mapping, sky theme generator
    useFavorites.js          favorites state, synced to localStorage
    useLocalClock.js         live clock in the selected city's timezone
  App.jsx                     top-level layout and data flow
  index.css                    design tokens and global styles
```

## Deploying

This is a static Vite build, so it deploys cleanly to any static host:

**Vercel**
```bash
npm i -g vercel
vercel
```

**Netlify**
```bash
npm run build
# drag the resulting dist/ folder into Netlify's dashboard,
# or connect the repo and set build command `npm run build`, publish dir `dist`
```

**GitHub Pages**
Add a `base` path to `vite.config.js` matching your repo name, then build and push `dist/` to a `gh-pages` branch (or use the `gh-pages` npm package).

## Ideas for extending this

- Add a weather alerts banner using Open-Meteo's severe weather flags
- Animate the transition when switching between cities
- Add a background that subtly shifts with current conditions (clear, rain, night)

## License

MIT — use this however you like.
