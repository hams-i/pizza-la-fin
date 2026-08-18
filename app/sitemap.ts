import type { MetadataRoute } from "next";
import { blogPosts } from "@/lib/blogs";
import { locales } from "@/lib/i18n";

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3001";

export const dynamic = "force-static";

export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date("2026-08-01T00:00:00.000Z");
  return locales.flatMap((locale) => [
    { url: `${siteUrl}/${locale}`, lastModified, changeFrequency: "weekly" as const, priority: 1 },
    { url: `${siteUrl}/${locale}/blogs`, lastModified, changeFrequency: "weekly" as const, priority: .8 },
    ...blogPosts.map((post) => ({
      url: `${siteUrl}/${locale}/blogs/${post.slug}`,
      lastModified: new Date(`${post.date}T00:00:00.000Z`),
      changeFrequency: "monthly" as const,
      priority: .7,
    })),
  ]);
}
