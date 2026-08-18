import type { Locale } from "./i18n";

export const localeStorageKey = "la-savelia-locale";

export function persistLocalePreference(locale: Locale) {
  window.localStorage.setItem(localeStorageKey, locale);
  document.cookie = `${localeStorageKey}=${locale}; Path=/; Max-Age=31536000; SameSite=Lax`;
}
