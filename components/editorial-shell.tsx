"use client";

import { ArrowUp, ArrowUpRight, Menu, X } from "lucide-react";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { persistLocalePreference } from "@/lib/client-locale";
import { isLocale, languageNames, locales, ui, type Locale } from "@/lib/i18n";
import { ScrollReveal } from "@/components/scroll-reveal";
import { scrollPageTo } from "@/components/smooth-scroll";

const mapUrl = "https://www.google.com/maps/search/?api=1&query=Yeldegirmeni+Kadikoy";
const instagramUrl = "https://www.instagram.com/pizzalafin/";
const footerCopy: Record<Locale, { social: string; openDaily: string }> = {
  tr: { social: "İletişim", openDaily: "Salı–Cumartesi 14.30–22.30 · Pazar 14.00–22.00 · Pazartesi kapalı" },
  en: { social: "Contact", openDaily: "Tue–Sat 2:30–10:30 PM · Sun 2–10 PM · Closed Monday" },
  de: { social: "Kontakt", openDaily: "Di–Sa 14:30–22:30 · So 14:00–22:00 · Mo geschlossen" },
  fr: { social: "Contact", openDaily: "Mar–Sam 14 h 30–22 h 30 · Dim 14 h–22 h · Fermé lundi" },
  ar: { social: "التواصل", openDaily: "الثلاثاء–السبت 14:30–22:30 · الأحد 14:00–22:00 · مغلق الاثنين" },
  ru: { social: "Контакты", openDaily: "Вт–Сб 14:30–22:30 · Вс 14:00–22:00 · Пн закрыто" },
};

export function EditorialShell({
  locale,
  children,
  activeNav: activeNavProp,
}: {
  locale: Locale;
  children: React.ReactNode;
  activeNav?: string | null;
}) {
  const pathname = usePathname() ?? `/${locale}`;
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [headerDark, setHeaderDark] = useState(true);
  const c = ui[locale];
  const footer = footerCopy[locale];
  const home = `/${locale}`;
  const activeNav = activeNavProp !== undefined ? activeNavProp : pathname.includes("/blogs") ? "blogs" : null;
  const navItems = [
    { key: "experience", label: c.nav.experience, href: `${home}#experience` },
    { key: "menu", label: c.nav.menu, href: `${home}#pizzas` },
    { key: "story", label: c.nav.story, href: `${home}#story` },
    { key: "craft", label: c.nav.craft, href: `${home}#craft` },
    { key: "venue", label: c.nav.venue, href: `${home}#venue` },
    { key: "blogs", label: c.nav.blogs, href: `${home}/blogs` },
    { key: "contact", label: c.nav.contact, href: `${home}#contact` },
  ];

  useEffect(() => {
    let ticking = false;
    const updateHeader = () => {
      const themePoint = 38;
      let nextDark = false;
      document.querySelectorAll<HTMLElement>("[data-header-theme]").forEach((section) => {
        const rect = section.getBoundingClientRect();
        if (rect.top <= themePoint && rect.bottom > themePoint) nextDark = section.dataset.headerTheme === "dark";
      });
      setHeaderDark(nextDark);
      setScrolled(window.scrollY > 18);
      ticking = false;
    };
    const onScroll = () => {
      if (ticking) return;
      ticking = true;
      window.requestAnimationFrame(updateHeader);
    };
    updateHeader();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", updateHeader);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", updateHeader);
    };
  }, [pathname]);

  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [menuOpen]);

  useEffect(() => {
    const desktop = window.matchMedia("(min-width: 921px)");
    const closeMobileMenu = () => {
      if (desktop.matches) setMenuOpen(false);
    };
    closeMobileMenu();
    desktop.addEventListener("change", closeMobileMenu);
    return () => desktop.removeEventListener("change", closeMobileMenu);
  }, []);

  const setLanguage = (nextLocale: Locale) => {
    persistLocalePreference(nextLocale);
    const parts = pathname.split("/").filter(Boolean);
    const rest = isLocale(parts[0]) ? parts.slice(1) : parts;
    window.location.assign(`/${nextLocale}${rest.length ? `/${rest.join("/")}` : ""}`);
  };

  return (
    <>
      <ScrollReveal routeKey={pathname} />
      <header className={`site-header editorial-site-header ${headerDark ? "is-dark" : ""} ${scrolled ? "is-scrolled" : ""} ${menuOpen ? "menu-is-open" : ""}`}>
        <a className="brand-link" href={home} aria-label="Pizza La Fin">
          <img src="/media/pizza-la-fin-logo.png" alt="Pizza La Fin" />
        </a>
        <nav className="desktop-nav" aria-label={c.mainMenu}>
          {navItems.map((item) => (
            <a key={item.key} href={item.href} className={item.key === activeNav ? "is-active" : ""} aria-current={item.key === activeNav ? "page" : undefined}>
              {item.label}
            </a>
          ))}
        </nav>
        <div className="header-actions">
          <div className="language-switcher" aria-label={c.language}>
            <button type="button" className="language-current" aria-label={c.language}>
              <span className="language-current-label">{languageNames[locale]}</span>
              <span className="language-current-code"><strong>{locale.toUpperCase()}</strong><i aria-hidden="true" /></span>
            </button>
            <div className="language-popover">
              {locales.map((entry, index) => (
                <button key={entry} type="button" className={locale === entry ? "is-selected" : ""} onClick={() => setLanguage(entry)}>
                  <small>0{index + 1}</small><span>{languageNames[entry]}</span><strong>{entry.toUpperCase()}</strong>
                </button>
              ))}
            </div>
          </div>
        </div>
        <button className="menu-button" type="button" aria-label={menuOpen ? "Close" : "Menu"} aria-expanded={menuOpen} onClick={() => setMenuOpen((open) => !open)}>
          {menuOpen ? <X aria-hidden="true" /> : <Menu aria-hidden="true" />}
        </button>
      </header>

      <div className={`mobile-menu ${menuOpen ? "is-open" : ""}`} aria-hidden={!menuOpen} data-lenis-prevent>
        <nav aria-label={c.mainMenu}>
          {navItems.map((item, index) => (
            <a key={item.key} href={item.href} className={item.key === activeNav ? "is-active" : ""} aria-current={item.key === activeNav ? "page" : undefined} onClick={() => setMenuOpen(false)}>
              <span>0{index + 1}</span>{item.label}
            </a>
          ))}
        </nav>
        <div className="mobile-languages" aria-label={c.language}>
          {locales.map((entry) => <button key={entry} type="button" className={locale === entry ? "is-selected" : ""} onClick={() => setLanguage(entry)}>{entry.toUpperCase()}</button>)}
        </div>
        <div className="mobile-menu-foot">
          <p>{c.locationTag}</p>
          <a href={mapUrl} target="_blank" rel="noreferrer">{c.map} <ArrowUpRight aria-hidden="true" /></a>
        </div>
      </div>

      {children}

      <footer className="site-footer" data-header-theme="dark">
        <div className="footer-inner">
          <div className="footer-directory" data-reveal-group>
            <section className="footer-column">
              <h2>{c.footerSite}</h2>
              <nav aria-label={c.footerSite}>
                {navItems.map((item) => <a key={item.key} href={item.href}>{item.label}</a>)}
              </nav>
            </section>
            <section className="footer-column">
              <h2>{footer.social}</h2>
              <div>
                <a href={instagramUrl} target="_blank" rel="noreferrer">Instagram <span aria-hidden="true">↗</span></a>
                <a href="https://wa.me/905372180613" target="_blank" rel="noreferrer">WhatsApp <span aria-hidden="true">↗</span></a>
                <a href={mapUrl} target="_blank" rel="noreferrer">Google Maps <span aria-hidden="true">↗</span></a>
                <p>pmrt276@gmail.com</p>
              </div>
            </section>
            <section className="footer-column">
              <h2>{c.footerAddress}</h2>
              <div>
                <a href="mailto:pmrt276@gmail.com">pmrt276@gmail.com <span aria-hidden="true">↗</span></a>
                <p>Yeldeğirmeni<br />Kadıköy, İstanbul</p>
                <p>{footer.openDaily}</p>
              </div>
            </section>
          </div>
          <div className="footer-legal">
            <span>© 2026 Pizza La Fin</span>
            <span>{footer.openDaily}</span>
            <button type="button" onClick={() => scrollPageTo(0, { duration: 1.4 })}>{c.backTop} <ArrowUp aria-hidden="true" /></button>
          </div>
        </div>
        <div className="footer-wordmark" aria-hidden="true">Pizza La Fin<span>.</span></div>
      </footer>
    </>
  );
}
