import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { LocaleAttributes } from "@/components/locale-attributes";
import { alternateLanguages, isLocale, localeMeta, locales, siteDescriptions } from "@/lib/i18n";

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3001";

export function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;
  if (!isLocale(locale)) return {};
  const canonical = new URL(`/${locale}`, siteUrl).toString();
  const socialImage = new URL("/media/pizza-la-fin-logo.png", siteUrl).toString();

  return {
    title: { absolute: "Pizza La Fin | Neapolitan Pizza" },
    description: siteDescriptions[locale],
    alternates: { canonical, languages: alternateLanguages() },
    openGraph: {
      title: "Pizza La Fin",
      description: siteDescriptions[locale],
      url: canonical,
      type: "website",
      locale: localeMeta[locale].og,
      siteName: "Pizza La Fin",
      images: [{ url: socialImage, width: 543, height: 117, alt: "Pizza La Fin" }],
    },
    twitter: {
      card: "summary_large_image",
      title: "Pizza La Fin",
      description: siteDescriptions[locale],
      images: [socialImage],
    },
  };
}

export default async function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();

  return (
    <>
      <LocaleAttributes locale={locale} />
      {children}
    </>
  );
}
