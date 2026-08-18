import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { BlogFaq } from "@/components/blog-faq";
import { EditorialShell } from "@/components/editorial-shell";
import { blogPosts } from "@/lib/blogs";
import { alternateLanguages, isLocale, localeMeta, locales, ui } from "@/lib/i18n";

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3001";

export function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;
  if (!isLocale(locale)) return {};
  const c = ui[locale];
  const canonical = new URL(`/${locale}/blogs`, siteUrl).toString();
  const socialImage = new URL("/og.png", siteUrl).toString();
  return {
    title: { absolute: `${c.blogTitle} | Pizza La Fin` },
    description: c.blogLead,
    alternates: { canonical, languages: alternateLanguages("/blogs") },
    openGraph: {
      title: c.blogTitle,
      description: c.blogLead,
      url: canonical,
      type: "website",
      locale: localeMeta[locale].og,
      siteName: "Pizza La Fin",
      images: [{ url: socialImage, width: 1734, height: 907, alt: c.blogTitle }],
    },
    twitter: {
      card: "summary_large_image",
      title: c.blogTitle,
      description: c.blogLead,
      images: [socialImage],
    },
  };
}

export default async function BlogsPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();
  const c = ui[locale];
  const pageUrl = new URL(`/${locale}/blogs`, siteUrl).toString();
  const schema = {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    name: c.blogTitle,
    description: c.blogLead,
    url: pageUrl,
    inLanguage: locale,
    isPartOf: { "@type": "WebSite", name: "Pizza La Fin", url: siteUrl },
    mainEntity: {
      "@type": "ItemList",
      itemListElement: blogPosts.map((post, index) => ({
        "@type": "ListItem",
        position: index + 1,
        url: new URL(`/${locale}/blogs/${post.slug}`, siteUrl).toString(),
        name: post.title[locale],
      })),
    },
  };
  const titleWords = c.blogTitle.trim().split(/\s+/);
  const titleAccent = titleWords.pop();

  return (
    <EditorialShell locale={locale}>
      <main className="blog-index-page" id="main-content">
        <section className="blog-index-hero" data-header-theme="dark">
          <img className="blog-hero-image" src={blogPosts[0].image} alt="" fetchPriority="high" />
          <div className="blog-hero-shade" aria-hidden="true" />
          <div className="blog-index-hero-grid">
            <div className="blog-index-hero-copy" data-reveal>
              <p className="blog-eyebrow">{c.blogEyebrow}</p>
              <h1><span>{titleWords.join(" ")}</span><em>{titleAccent}</em></h1>
              <p className="blog-index-lead">{c.blogLead}</p>
            </div>
          </div>
        </section>

        <section className="blog-index-list" aria-label={c.blogTitle} data-header-theme="light">
          <div className="blog-index-grid" data-reveal-group>
            {blogPosts.map((post, index) => (
              <article className="blog-list-card" key={post.slug}>
                <a href={`/${locale}/blogs/${post.slug}`}>
                  <div className="blog-card-media">
                    <img src={post.image} alt={post.title[locale]} loading={index === 0 ? "eager" : "lazy"} />
                    <span>{String(index + 1).padStart(2, "0")}</span>
                  </div>
                  <div className="blog-card-meta">
                    <span>Pizza La Fin</span><i aria-hidden="true" />
                    <span>{post.readingMinutes} {c.readingTime}</span><i aria-hidden="true" />
                    <time dateTime={post.date}>{post.date}</time>
                  </div>
                  <h2>{post.title[locale]}</h2>
                  <p>{post.excerpt[locale]}</p>
                </a>
              </article>
            ))}
          </div>
        </section>

        <BlogFaq locale={locale} />
      </main>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />
    </EditorialShell>
  );
}
