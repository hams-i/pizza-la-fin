"use client";

import { ArrowUpRight } from "lucide-react";
import { usePathname } from "next/navigation";
import { useEffect, useState, type CSSProperties } from "react";
import { EditorialShell } from "@/components/editorial-shell";
import { localeStorageKey } from "@/lib/client-locale";
import { defaultLocale, isLocale, ui, type Locale } from "@/lib/i18n";

export default function NotFound() {
  const pathname = usePathname() ?? "/";
  const segment = pathname.split("/").filter(Boolean)[0];
  const [locale, setLocale] = useState<Locale>(isLocale(segment) ? segment : defaultLocale);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    if (isLocale(segment)) {
      setLocale(segment);
      return;
    }
    const timer = window.setTimeout(() => {
      const saved = window.localStorage.getItem(localeStorageKey);
      const browserLocale = window.navigator.language.toLowerCase().split("-")[0];
      if (isLocale(saved ?? undefined)) setLocale(saved as Locale);
      else if (isLocale(browserLocale)) setLocale(browserLocale);
    }, 0);
    return () => window.clearTimeout(timer);
  }, [segment]);

  useEffect(() => {
    document.documentElement.lang = locale;
    document.documentElement.dir = locale === "ar" ? "rtl" : "ltr";
  }, [locale]);

  useEffect(() => {
    if (!document.documentElement.classList.contains("is-loading")) {
      const frame = window.requestAnimationFrame(() => setReady(true));
      return () => window.cancelAnimationFrame(frame);
    }
    const onReady = () => setReady(true);
    window.addEventListener("la-savelia:ready", onReady, { once: true });
    return () => window.removeEventListener("la-savelia:ready", onReady);
  }, []);

  const c = ui[locale];
  const links = [
    [c.home, `/${locale}`],
    [c.nav.menu, `/${locale}#pizzas`],
    [c.nav.story, `/${locale}#story`],
    [c.nav.blogs, `/${locale}/blogs`],
    [c.nav.contact, `/${locale}#contact`],
  ];

  return (
    <EditorialShell locale={locale} activeNav={null}>
      <main id="main-content">
        <section className="hero not-found-hero" data-header-theme="light">
          <div className={`not-found-center${ready ? " is-ready" : ""}`}>
            <p className="not-found-code not-found-animate" style={{ "--nf-delay": "60ms" } as CSSProperties}>{c.notFoundLabel}</p>
            <h1 className="not-found-animate" style={{ "--nf-delay": "140ms" } as CSSProperties}>{c.notFoundTitle}</h1>
            <p className="not-found-text not-found-animate" style={{ "--nf-delay": "220ms" } as CSSProperties}>{c.notFoundText}</p>
            <nav className="not-found-actions" aria-label={c.notFoundLinks}>
              {links.map(([label, href], index) => (
                <a
                  key={href}
                  href={href}
                  className="not-found-animate"
                  style={{ "--nf-delay": `${300 + index * 55}ms` } as CSSProperties}
                >
                  {label}
                  <ArrowUpRight aria-hidden="true" />
                </a>
              ))}
            </nav>
          </div>
        </section>
      </main>
    </EditorialShell>
  );
}
