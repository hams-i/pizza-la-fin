import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";
import { defaultLocale, isLocale } from "@/lib/i18n";

export function proxy(request: NextRequest) {
  const savedLocale = request.cookies.get("la-savelia-locale")?.value;
  const preferredLanguage = request.headers.get("accept-language")?.split(",")[0]?.trim().split("-")[0]?.toLowerCase();
  const locale = isLocale(savedLocale)
    ? savedLocale
    : isLocale(preferredLanguage)
      ? preferredLanguage
      : defaultLocale;
  return NextResponse.redirect(new URL(`/${locale}`, request.url));
}

export const config = { matcher: "/" };
