import { useState, useEffect } from "react";

const STORAGE_KEY = "weather-dashboard:favorites";

const DEFAULT_FAVORITES = [
  { name: "Pune", country: "India", latitude: 18.5204, longitude: 73.8567 },
];

function loadFavorites() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    return raw ? JSON.parse(raw) : DEFAULT_FAVORITES;
  } catch {
    return DEFAULT_FAVORITES;
  }
}

export function useFavorites() {
  const [favorites, setFavorites] = useState(loadFavorites);

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(favorites));
    } catch {
      // storage unavailable (private browsing, etc.) — fail silently
    }
  }, [favorites]);

  const isFavorite = (p) =>
    favorites.some((f) => f.name === p.name && f.latitude === p.latitude);

  const toggleFavorite = (p) => {
    setFavorites((prev) =>
      isFavorite(p)
        ? prev.filter((f) => !(f.name === p.name && f.latitude === p.latitude))
        : [...prev, p]
    );
  };

  const removeFavorite = (p) => {
    setFavorites((prev) =>
      prev.filter((f) => !(f.name === p.name && f.latitude === p.latitude))
    );
  };

  return { favorites, isFavorite, toggleFavorite, removeFavorite };
}
