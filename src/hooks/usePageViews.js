import { useEffect, useState } from "react";

const BASE = import.meta.env.VITE_API_URL;

export function usePageViews() {
  const [count, setCount] = useState(null);

  useEffect(() => {
    const alreadyCounted = localStorage.getItem("pv_counted");

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
        localStorage.setItem("pv_counted", "1");
      })
      .catch(() => {});
  }, []);

  return count;
}
