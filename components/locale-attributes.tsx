"use client";

import { useEffect } from "react";
import { localeMeta, type Locale } from "@/lib/i18n";

export function LocaleAttributes({ locale }: { locale: Locale }) {
  useEffect(() => {
    document.documentElement.lang = localeMeta[locale].html;
    document.documentElement.dir = localeMeta[locale].dir;
  }, [locale]);

  return null;
}
