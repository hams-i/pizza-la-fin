"use client";

import { useEffect } from "react";
import { localeStorageKey, persistLocalePreference } from "@/lib/client-locale";
import { defaultLocale, isLocale, type Locale } from "@/lib/i18n";
import { LoadingExperience } from "@/components/loading-experience";

export function LocaleRedirect({ suffix = "" }: { suffix?: string }) {
  useEffect(() => {
    const saved = window.localStorage.getItem(localeStorageKey);
    const browserLocale = window.navigator.language.toLowerCase().split("-")[0];
    const locale: Locale = isLocale(saved ?? undefined)
      ? (saved as Locale)
      : isLocale(browserLocale)
        ? browserLocale
        : defaultLocale;
    persistLocalePreference(locale);
    window.location.replace(`/${locale}${suffix}`);
  }, [suffix]);

  return <LoadingExperience locale={defaultLocale} />;
}
