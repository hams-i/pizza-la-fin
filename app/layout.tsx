import type { Metadata, Viewport } from "next";
import { LoadingGate } from "@/components/loading-gate";
import { SmoothScroll } from "@/components/smooth-scroll";
import "./globals.css";

const basePath = process.env.NEXT_PUBLIC_BASE_PATH ?? "";
const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3001";
const metadataBase = new URL(siteUrl);
const socialImage = new URL(`${basePath}/og.png`, metadataBase).toString();

export const metadata: Metadata = {
  metadataBase,
  title: { default: "Pizza La Fin | Neapolitan Pizza", template: "%s | Pizza La Fin" },
  description: "Pizza La Fin serves Neapolitan pizza Tuesday through Sunday.",
  keywords: ["Pizza La Fin", "Neapolitan pizza", "Napolitan pizza", "artisan pizza"],
  applicationName: "Pizza La Fin",
  authors: [{ name: "Pizza La Fin", url: siteUrl }],
  creator: "Pizza La Fin",
  publisher: "Pizza La Fin",
  category: "restaurant",
  manifest: `${basePath}/manifest.webmanifest`,
  icons: {
    icon: [
      { url: `${basePath}/favicon.svg?v=4`, type: "image/svg+xml", sizes: "any" },
      { url: `${basePath}/favicon.png?v=4`, type: "image/png", sizes: "64x64" },
    ],
    shortcut: `${basePath}/favicon.png?v=4`,
    apple: `${basePath}/apple-touch-icon.png?v=4`,
  },
  alternates: {
    canonical: "/en",
    languages: { "x-default": "/en", tr: "/tr", en: "/en", de: "/de", fr: "/fr", ar: "/ar", ru: "/ru" },
  },
  openGraph: {
    title: "Pizza La Fin",
    description: "Neapolitan pizza. Open Tuesday through Sunday.",
    type: "website",
    locale: "en_US",
    url: "/en",
    siteName: "Pizza La Fin",
    images: [{ url: socialImage, width: 1734, height: 907, alt: "Pizza La Fin" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Pizza La Fin",
    description: "Neapolitan pizza. Open Tuesday through Sunday.",
    images: [socialImage],
  },
  robots: { index: true, follow: true, googleBot: { index: true, follow: true, "max-image-preview": "large", "max-snippet": -1, "max-video-preview": -1 } },
  other: { "format-detection": "telephone=no" },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
  viewportFit: "cover",
  themeColor: "#f3f0e8",
};

const restaurantSchema = {
  "@context": "https://schema.org",
  "@type": "Restaurant",
  "@id": `${siteUrl}/#restaurant`,
  name: "Pizza La Fin",
  slogan: "Neapolitan Pizza",
  url: siteUrl,
  image: socialImage,
  logo: new URL("/media/pizza-la-fin-logo.png", metadataBase).toString(),
  telephone: "+90 537 218 06 13",
  email: "pmrt276@gmail.com",
  servesCuisine: ["Neapolitan Pizza", "Italian"],
  priceRange: "₺₺",
  menu: `${siteUrl}/en#pizzas`,
  address: { "@type": "PostalAddress", streetAddress: "Yeldeğirmeni", addressLocality: "Kadıköy", addressRegion: "İstanbul", addressCountry: "TR" },
  geo: { "@type": "GeoCoordinates", latitude: 40.99371, longitude: 29.02958 },
  openingHoursSpecification: [
    { "@type": "OpeningHoursSpecification", dayOfWeek: ["Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"], opens: "14:30", closes: "22:30" },
    { "@type": "OpeningHoursSpecification", dayOfWeek: ["Sunday"], opens: "14:00", closes: "22:00" },
  ],
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className="is-loading">
      <body>
        <LoadingGate />
        <SmoothScroll />
        {children}
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(restaurantSchema) }} />
      </body>
    </html>
  );
}
