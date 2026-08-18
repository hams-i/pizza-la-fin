"use client";

import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import { LoadingExperience } from "@/components/loading-experience";
import { localeStorageKey } from "@/lib/client-locale";
import { defaultLocale, isLocale, type Locale } from "@/lib/i18n";

const minimumVisibleMs = 1550;
const exitDurationMs = 380;

export function LoadingGate() {
  const pathname = usePathname() ?? "/";
  const segment = pathname.split("/").filter(Boolean)[0];
  const [locale, setLocale] = useState<Locale>(isLocale(segment) ? segment : defaultLocale);
  const [phase, setPhase] = useState<"visible" | "leaving" | "hidden">("visible");

  useEffect(() => {
    if (isLocale(segment)) {
      setLocale(segment);
      return;
    }
    const saved = window.localStorage.getItem(localeStorageKey);
    const browserLocale = window.navigator.language.toLowerCase().split("-")[0];
    if (isLocale(saved ?? undefined)) setLocale(saved as Locale);
    else if (isLocale(browserLocale)) setLocale(browserLocale);
  }, [segment]);

  useEffect(() => {
    const root = document.documentElement;
    root.classList.add("is-loading");
    const leaveTimer = window.setTimeout(() => setPhase("leaving"), minimumVisibleMs);
    const hideTimer = window.setTimeout(() => {
      root.classList.remove("is-loading");
      window.dispatchEvent(new Event("la-savelia:ready"));
      setPhase("hidden");
    }, minimumVisibleMs + exitDurationMs);
    return () => {
      window.clearTimeout(leaveTimer);
      window.clearTimeout(hideTimer);
      root.classList.remove("is-loading");
    };
  }, []);

  if (phase === "hidden") return null;
  return (
    <div className={`loading-gate ${phase === "leaving" ? "is-leaving" : ""}`}>
      <LoadingExperience locale={locale} durationMs={1420} />
    </div>
  );
}
