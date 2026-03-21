import { useEffect, useState } from "react";

const BASE = import.meta.env.VITE_API_URL;

export function usePageViews() {
  const [count, setCount] = useState(null);

  useEffect(() => {
    // Fire-and-forget POST — increments the counter and gets back the new value.
    // Uses sessionStorage so refreshing the same tab doesn't double-count,
    // but a new browser session (new visitor) always increments.
    const alreadyCounted = sessionStorage.getItem("pv_counted");

    if (alreadyCounted) {
      // Already counted this session — just fetch the current value silently
      fetch(`${BASE}/api/views`)
        .then((r) => r.json())
        .then((d) => setCount(d.count))
        .catch(() => {});
      return;
    }

    fetch(`${BASE}/api/views`, { method: "POST" })
      .then((r) => r.json())
      .then((d) => {
        setCount(d.count);
        sessionStorage.setItem("pv_counted", "1");
      })
      .catch(() => {});
  }, []);

  return count;
}