"use client";

import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { localeStorageKey } from "@/lib/client-locale";
import { defaultLocale, isLocale, type Locale } from "@/lib/i18n";
import { LoadingExperience } from "@/components/loading-experience";

export default function Loading() {
  const pathname = usePathname() ?? "/";
  const segment = pathname.split("/").filter(Boolean)[0];
  const [locale, setLocale] = useState<Locale>(isLocale(segment) ? segment : defaultLocale);

  useEffect(() => {
    if (isLocale(segment)) return;
    const timer = window.setTimeout(() => {
      const saved = window.localStorage.getItem(localeStorageKey);
      const browserLocale = window.navigator.language.toLowerCase().split("-")[0];
      if (isLocale(saved ?? undefined)) setLocale(saved as Locale);
      else if (isLocale(browserLocale)) setLocale(browserLocale);
    }, 0);
    return () => window.clearTimeout(timer);
  }, [segment]);

  return <LoadingExperience locale={locale} />;
}
