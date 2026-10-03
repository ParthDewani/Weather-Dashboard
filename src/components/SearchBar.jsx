import React, { useState, useRef, useEffect } from "react";
import { Search, MapPin, Star, Loader2 } from "lucide-react";
import { geocodeCity } from "../lib/weather.js";

export default function SearchBar({ onSelect, isFavorite, onToggleFavorite }) {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState([]);
  const [searching, setSearching] = useState(false);
  const [open, setOpen] = useState(false);
  const debounceRef = useRef(null);
  const boxRef = useRef(null);

  const onChange = (val) => {
    setQuery(val);
    if (debounceRef.current) clearTimeout(debounceRef.current);
    if (val.trim().length < 2) {
      setResults([]);
      setOpen(false);
      setSearching(false);
      return;
    }
    setOpen(true);
    setSearching(true);
    debounceRef.current = setTimeout(async () => {
      try {
        const r = await geocodeCity(val);
        setResults(r);
      } catch {
        setResults([]);
      } finally {
        setSearching(false);
      }
    }, 200);
  };

  const onKeyDown = (e) => {
    if (e.key === "Enter" && results.length > 0) {
      select(results[0]);
    } else if (e.key === "Escape") {
      setOpen(false);
    }
  };

  const select = (place) => {
    onSelect(place);
    setQuery("");
    setResults([]);
    setOpen(false);
  };

  useEffect(() => {
    const onClick = (e) => {
      if (boxRef.current && !boxRef.current.contains(e.target)) setOpen(false);
    };
    document.addEventListener("mousedown", onClick);
    return () => document.removeEventListener("mousedown", onClick);
  }, []);

  return (
    <div ref={boxRef} style={{ position: "relative", marginBottom: 40 }}>
      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: 10,
          borderBottom: "1px solid var(--rule)",
          paddingBottom: 10,
        }}
      >
        <Search size={16} color="var(--muted)" />
        <input
          value={query}
          onChange={(e) => onChange(e.target.value)}
          onKeyDown={onKeyDown}
          onFocus={() => query.trim().length >= 2 && setOpen(true)}
          placeholder="Search any city…"
          aria-label="Search for a city"
          style={{
            background: "transparent",
            border: "none",
            outline: "none",
            color: "var(--text)",
            fontSize: 15,
            width: "100%",
          }}
        />
        {searching && <Loader2 size={14} className="spin" color="var(--muted)" />}
      </div>

      {open && (searching || results.length > 0) && (
        <div
          style={{
            position: "absolute",
            top: "100%",
            left: 0,
            right: 0,
            background: "var(--panel)",
            border: "1px solid var(--rule)",
            borderRadius: 6,
            marginTop: 6,
            zIndex: 10,
            overflow: "hidden",
          }}
        >
          {results.length === 0 && searching && (
            <div style={{ padding: "12px 14px", fontSize: 12.5, color: "var(--muted)", display: "flex", alignItems: "center", gap: 8 }}>
              <Loader2 size={13} className="spin" /> Searching…
            </div>
          )}
          {results.map((r, i) => (
            <div
              key={i}
              className="result-row"
              onClick={() => select(r)}
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                padding: "10px 14px",
                cursor: "pointer",
              }}
            >
              <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                <MapPin size={13} color="var(--muted)" />
                <span style={{ fontSize: 13.5 }}>{r.name}</span>
                <span style={{ fontSize: 11.5, color: "var(--muted)" }}>
                  {r.admin1 ? r.admin1 + ", " : ""}
                  {r.country}
                </span>
              </div>
              <Star
                size={14}
                color={isFavorite(r) ? "var(--amber)" : "var(--muted)"}
                fill={isFavorite(r) ? "var(--amber)" : "none"}
                onClick={(e) => {
                  e.stopPropagation();
                  onToggleFavorite(r);
                }}
              />
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
