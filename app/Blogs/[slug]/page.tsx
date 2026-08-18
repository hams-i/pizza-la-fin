import { LocaleRedirect } from "@/components/locale-redirect";
import { blogPosts } from "@/lib/blogs";

export function generateStaticParams() {
  return blogPosts.map((post) => ({ slug: post.slug }));
}

export default async function BlogRedirectPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  return <LocaleRedirect suffix={`/blogs/${slug}`} />;
}
