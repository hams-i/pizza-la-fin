"use client";

import Lenis from "lenis";
import { useEffect } from "react";
import "lenis/dist/lenis.css";

declare global {
  interface Window {
    __laSaveliaLenis?: Lenis;
  }
}

function prefersReducedMotion() {
  return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
}

export function SmoothScroll() {
  useEffect(() => {
    if (prefersReducedMotion()) return;

    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
      wheelMultiplier: 1,
      touchMultiplier: 1.6,
    });

    window.__laSaveliaLenis = lenis;
    document.documentElement.classList.add("lenis", "lenis-smooth");

    let frame = 0;
    const raf = (time: number) => {
      lenis.raf(time);
      frame = requestAnimationFrame(raf);
    };
    frame = requestAnimationFrame(raf);

    const onAnchorClick = (event: MouseEvent) => {
      const target = event.target;
      if (!(target instanceof Element)) return;
      const link = target.closest("a[href*='#']");
      if (!(link instanceof HTMLAnchorElement)) return;
      if (link.target === "_blank" || link.hasAttribute("download")) return;

      const url = new URL(link.href, window.location.href);
      if (url.pathname !== window.location.pathname) return;
      if (!url.hash || url.hash === "#") return;

      const destination = document.querySelector(url.hash);
      if (!(destination instanceof HTMLElement)) return;

      event.preventDefault();
      lenis.scrollTo(destination, { duration: 1.4, offset: -12 });
      window.history.pushState(null, "", `${url.pathname}${url.search}${url.hash}`);
    };

    const syncLock = () => {
      const locked = document.body.style.overflow === "hidden";
      if (locked) lenis.stop();
      else lenis.start();
    };

    const lockObserver = new MutationObserver(syncLock);
    lockObserver.observe(document.body, { attributes: true, attributeFilter: ["style"] });
    syncLock();

    window.addEventListener("click", onAnchorClick);

    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener("click", onAnchorClick);
      lockObserver.disconnect();
      document.documentElement.classList.remove("lenis", "lenis-smooth");
      if (window.__laSaveliaLenis === lenis) delete window.__laSaveliaLenis;
      lenis.destroy();
    };
  }, []);

  return null;
}

export function scrollPageTo(target: number | string | HTMLElement, options?: { duration?: number; offset?: number }) {
  const lenis = typeof window !== "undefined" ? window.__laSaveliaLenis : undefined;
  if (lenis) {
    lenis.scrollTo(target, {
      duration: options?.duration ?? 1.4,
      offset: options?.offset ?? 0,
    });
    return;
  }

  if (typeof target === "number") {
    window.scrollTo({ top: target, behavior: "smooth" });
    return;
  }

  const element = typeof target === "string" ? document.querySelector(target) : target;
  if (element instanceof HTMLElement) {
    element.scrollIntoView({ behavior: "smooth", block: "start" });
  }
}
