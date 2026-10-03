import { useState, useEffect } from "react";

/**
 * Returns the current time formatted for the given IANA timezone (e.g. "Australia/Sydney"),
 * ticking forward once a minute so it stays live without re-rendering unnecessarily.
 */
export function useLocalClock(timezone) {
  const [now, setNow] = useState(() => new Date());

  useEffect(() => {
    if (!timezone) return;
    // align the first tick to the next minute boundary, then tick every 60s
    const msToNextMinute = 60000 - (Date.now() % 60000);
    const timeout = setTimeout(() => {
      setNow(new Date());
    }, msToNextMinute);
    const interval = setInterval(() => setNow(new Date()), 60000);
    return () => {
      clearTimeout(timeout);
      clearInterval(interval);
    };
  }, [timezone]);

  if (!timezone) return null;
  try {
    return now.toLocaleTimeString(undefined, { timeZone: timezone, hour: "numeric", minute: "2-digit" });
  } catch {
    return null;
  }
}
