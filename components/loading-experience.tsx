"use client";

import { useEffect, useState } from "react";
import { ui, type Locale } from "@/lib/i18n";

export function LoadingExperience({ locale, logoSrc = "/media/pizza-la-fin-logo.png", durationMs = 1000 }: { locale: Locale; logoSrc?: string; durationMs?: number }) {
  const [progress, setProgress] = useState(8);
  const c = ui[locale];

  useEffect(() => {
    const startedAt = performance.now();
    const timer = window.setInterval(() => {
      const elapsed = performance.now() - startedAt;
      setProgress(Math.min(100, Math.round(8 + Math.min(1, elapsed / durationMs) * 92)));
    }, 50);
    return () => window.clearInterval(timer);
  }, [durationMs]);

  return (
    <div className="loading-screen" role="status" aria-live="polite" aria-label={c.loading}>
      <div className="loading-topline">
        <img className="loading-logo" src={logoSrc} alt="Pizza La Fin" />
        <span>{c.locationTag}</span>
      </div>

      <div className="loading-copy">
        <p>{c.loading}</p>
        <h1>{c.loadingTitle}<span>.</span></h1>
        <div className="loading-progress" aria-hidden="true"><i style={{ width: `${progress}%` }} /></div>
        <div className="loading-meta"><span>{String(progress).padStart(2, "0")}%</span><span>{c.loadingMeta}</span></div>
      </div>

      <div className="loading-pizza-scene" aria-hidden="true">
        <div className="loading-pizza-hand" />
        <div className="loading-pizza">
          <i className="loading-sauce" />
          <i className="loading-cheese cheese-one" />
          <i className="loading-cheese cheese-two" />
          <i className="loading-cheese cheese-three" />
          <i className="loading-basil basil-one" />
          <i className="loading-basil basil-two" />
        </div>
        <span>{c.loading}</span>
      </div>
    </div>
  );
}
