import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { ArrowUpRight } from "lucide-react";
import { BlogFaq } from "@/components/blog-faq";
import { EditorialShell } from "@/components/editorial-shell";
import { blogPosts } from "@/lib/blogs";
import { blogExtensions } from "@/lib/blog-extensions";
import { alternateLanguages, isLocale, localeMeta, locales, ui, type Locale } from "@/lib/i18n";

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3001";

const authorCopy: Record<Locale, { role: string; bio: string }> = {
  tr: { role: "Mutfak günlüğü · Napoli işçiliği", bio: "Günlük üretim notları, malzeme araştırmaları ve fırın başındaki gerçek gözlemlerden beslenen Pizza La Fin editoryası." },
  en: { role: "Kitchen journal · Neapolitan craft", bio: "Pizza La Fin’s editorial voice, shaped by daily production notes, ingredient research and observations beside the oven." },
  de: { role: "Küchenjournal · Neapolitanisches Handwerk", bio: "Die redaktionelle Stimme von Pizza La Fin, getragen von Produktionsnotizen, Zutatenrecherche und Beobachtungen am Ofen." },
  fr: { role: "Journal de cuisine · Geste napolitain", bio: "La voix éditoriale de Pizza La Fin, nourrie par les notes de production, la recherche des produits et l’observation au four." },
  ar: { role: "يوميات المطبخ · حرفة نابولي", bio: "الصوت التحريري لـ Pizza La Fin، مستند إلى سجلات الإنتاج اليومية وبحث المكونات والملاحظات الحقيقية عند الفرن." },
  ru: { role: "Кухонный журнал · Неаполитанское ремесло", bio: "Редакционный голос Pizza La Fin, основанный на ежедневных записях, исследовании продуктов и наблюдениях у печи." },
};

export function generateStaticParams() {
  return locales.flatMap((locale) => blogPosts.map((post) => ({ locale, slug: post.slug })));
}

export async function generateMetadata({ params }: { params: Promise<{ locale: string; slug: string }> }): Promise<Metadata> {
  const { locale, slug } = await params;
  const post = blogPosts.find((item) => item.slug === slug);
  if (!isLocale(locale) || !post) return {};
  const canonical = new URL(`/${locale}/blogs/${post.slug}`, siteUrl).toString();
  return {
    title: { absolute: `${post.title[locale]} | Pizza La Fin` },
    description: post.excerpt[locale],
    keywords: post.keywords,
    authors: [{ name: "Pizza La Fin Editorial" }],
    alternates: { canonical, languages: alternateLanguages(`/blogs/${post.slug}`) },
    openGraph: {
      title: post.title[locale], description: post.excerpt[locale], url: canonical, type: "article", locale: localeMeta[locale].og,
      siteName: "Pizza La Fin", publishedTime: post.date,
      images: [{ url: new URL(post.image, siteUrl).toString(), width: 1536, height: 1024, alt: post.title[locale] }],
    },
    twitter: { card: "summary_large_image", title: post.title[locale], description: post.excerpt[locale], images: [new URL(post.image, siteUrl).toString()] },
  };
}

export default async function BlogArticlePage({ params }: { params: Promise<{ locale: string; slug: string }> }) {
  const { locale, slug } = await params;
  if (!isLocale(locale)) notFound();
  const postIndex = blogPosts.findIndex((item) => item.slug === slug);
  if (postIndex < 0) notFound();
  const post = blogPosts[postIndex];
  const nextPost = blogPosts[(postIndex + 1) % blogPosts.length];
  const c = ui[locale];
  const author = authorCopy[locale];
  const articleSections = [...post.sections, ...(blogExtensions[post.slug] ?? [])];
  const canonical = new URL(`/${locale}/blogs/${post.slug}`, siteUrl).toString();
  const schema = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: post.title[locale],
    description: post.excerpt[locale],
    image: new URL(post.image, siteUrl).toString(),
    datePublished: post.date,
    dateModified: post.date,
    inLanguage: locale,
    mainEntityOfPage: canonical,
    author: { "@type": "Organization", name: "Pizza La Fin Editorial" },
    publisher: { "@type": "Organization", name: "Pizza La Fin", url: siteUrl, logo: { "@type": "ImageObject", url: new URL("/media/pizza-la-fin-logo.png", siteUrl).toString() } },
  };

  return (
    <EditorialShell locale={locale}>
      <main className="blog-article-page" id="main-content">
        <header className="blog-article-hero" data-header-theme="dark">
          <img className="blog-hero-image" src={post.image} alt="" fetchPriority="high" />
          <div className="blog-hero-shade" aria-hidden="true" />
          <div className="blog-article-hero-grid">
            <div className="blog-article-hero-copy" data-reveal>
              <a className="blog-back-link" href={`/${locale}/blogs`}>← {c.allArticles}</a>
              <p>Pizza La Fin Editorial · Yeldeğirmeni · Kadıköy · {post.date}</p>
              <h1>{post.title[locale]}</h1>
            </div>
          </div>
        </header>

        <article className="blog-article-body" data-header-theme="light">
          <aside className="blog-author-wide" data-reveal>
            <p className="blog-author-label">{c.author}</p>
            <div className="blog-author-wide-grid">
              <div className="blog-author-identity">
                <h2>Pizza La Fin Editorial</h2>
                <p>{author.role}</p>
              </div>
              <p className="blog-author-bio">{author.bio}</p>
            </div>
          </aside>
          <div className="blog-prose">
            <p className="blog-article-deck" data-reveal>{post.excerpt[locale]}</p>
            {articleSections.map((section, index) => (
              <section className="blog-prose-section" key={section.heading[locale]} data-reveal>
                <h2>{section.heading[locale]}</h2>
                <p>{section.body[locale]}</p>
                {index === 2 ? (
                  <figure className="blog-prose-figure">
                    <img src={post.detailImage} alt={post.title[locale]} loading="lazy" />
                    <figcaption>Pizza La Fin Editorial · Yeldeğirmeni · Kadıköy</figcaption>
                  </figure>
                ) : null}
              </section>
            ))}
            <div className="blog-keywords" data-reveal>
              <span>{post.keywords.join(" · ")}</span>
            </div>
          </div>
        </article>

        <section className="blog-next-section" data-reveal data-header-theme="dark">
          <p>{c.nextArticle}</p>
          <a className="blog-next-card" href={`/${locale}/blogs/${nextPost.slug}`}>
            <h2>{nextPost.title[locale]}</h2>
            <ArrowUpRight aria-hidden="true" />
          </a>
        </section>

        <BlogFaq locale={locale} />
      </main>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />
    </EditorialShell>
  );
}
