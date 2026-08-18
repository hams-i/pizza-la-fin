"use client";

import { useEffect } from "react";

export function ScrollReveal({ routeKey }: { routeKey: string }) {
  useEffect(() => {
    const targets = document.querySelectorAll<HTMLElement>("[data-reveal], [data-reveal-group]");
    let observer: IntersectionObserver | null = null;
    const start = () => {
      observer = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;
          window.requestAnimationFrame(() => entry.target.classList.add("is-revealed"));
          observer?.unobserve(entry.target);
        });
      }, { threshold: 0.12, rootMargin: "0px 0px -12% 0px" });
      targets.forEach((target) => observer?.observe(target));
    };

    if (document.documentElement.classList.contains("is-loading")) {
      window.addEventListener("la-savelia:ready", start, { once: true });
    } else {
      start();
    }
    return () => {
      window.removeEventListener("la-savelia:ready", start);
      observer?.disconnect();
    };
  }, [routeKey]);

  return null;
}
