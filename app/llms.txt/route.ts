import { blogPosts } from "@/lib/blogs";

export const dynamic = "force-static";

export function GET() {
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3001";
  const articles = blogPosts.map((post) => `- ${post.title.en}: ${siteUrl}/en/blogs/${post.slug}`).join("\n");
  const body = `# Pizza La Fin\n\n> Neapolitan pizza in Yeldeğirmeni, open Tuesday through Sunday.\n\n## Primary pages\n- Home: ${siteUrl}/en\n- Menu: ${siteUrl}/en#pizzas\n- Our story: ${siteUrl}/en#story\n- Journal: ${siteUrl}/en/blogs\n\n## Editorial articles\n${articles}\n\n## Languages\nTurkish, English, German, French, Arabic and Russian are available under /tr, /en, /de, /fr, /ar and /ru. Article slugs remain in English across languages.\n`;
  return new Response(body, { headers: { "Content-Type": "text/plain; charset=utf-8" } });
}
