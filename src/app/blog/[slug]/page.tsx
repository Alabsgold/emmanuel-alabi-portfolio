import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { posts, getPost, formatDate } from "@/lib/posts";
import { site, absoluteUrl } from "@/lib/site";
import { PageShell } from "@/components/page-shell";
import { JsonLd } from "@/components/json-ld";

type Props = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return posts.map((p) => ({ slug: p.slug }));
}
export const dynamicParams = false;

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const post = getPost(slug);
  if (!post) return {};
  return {
    title: post.title,
    description: post.summary,
    alternates: { canonical: `/blog/${post.slug}` },
    openGraph: {
      type: "article",
      title: post.title,
      description: post.summary,
      url: absoluteUrl(`/blog/${post.slug}`),
      publishedTime: post.date,
      authors: [site.name],
      tags: post.tags,
    },
  };
}

export default async function PostPage({ params }: Props) {
  const { slug } = await params;
  const post = getPost(slug);
  if (!post) notFound();
  // Dynamic MDX import per the Next.js MDX guide; generateStaticParams bounds the slugs.
  const { default: Content } = await import(`@/content/blog/${slug}.mdx`);

  return (
    <PageShell back={{ href: "/blog", label: "All posts" }}>
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "BlogPosting",
          headline: post.title,
          description: post.summary,
          datePublished: post.date,
          url: absoluteUrl(`/blog/${post.slug}`),
          author: { "@type": "Person", name: site.name, url: site.url },
          publisher: { "@type": "Organization", name: site.company.name, url: site.company.url },
          keywords: post.tags.join(", "),
        }}
      />
      <article>
        <header className="mb-10">
          <time dateTime={post.date} className="font-mono text-xs text-muted">
            {formatDate(post.date)}
          </time>
          <h1 className="mt-2 text-4xl font-bold leading-tight tracking-tight">{post.title}</h1>
          <p className="mt-4 text-lg text-muted">{post.summary}</p>
        </header>
        <div className="prose">
          <Content />
        </div>
      </article>
    </PageShell>
  );
}
