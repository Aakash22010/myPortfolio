import { useEffect, useState } from "react";

const BASE = import.meta.env.VITE_API_URL || "http://localhost:5000";

export function usePageViews() {
  const [count, setCount] = useState(null);

  useEffect(() => {
    // sessionStorage clears when the tab closes — more accurate than localStorage
    // (localStorage persists forever, so clearing browser data re-counts the user)
    const alreadyCounted = sessionStorage.getItem("pv_counted");

    if (alreadyCounted) {
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