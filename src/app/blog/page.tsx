import type { Metadata } from "next";
import Link from "next/link";
import { posts, formatDate } from "@/lib/posts";
import { PageShell } from "@/components/page-shell";

export const metadata: Metadata = {
  title: "Blog",
  description:
    "Notes on backend engineering, payments, security and running a software studio as a student, by Emmanuel Alabi.",
  alternates: { canonical: "/blog" },
};

export default function BlogPage() {
  return (
    <PageShell>
      <h1 className="text-4xl font-bold tracking-tight">Writing</h1>
      <p className="mt-3 text-muted">
        Backend engineering, security, and lessons from building ALABSGOLD.{" "}
        <a href="/rss.xml" className="text-accent hover:underline">
          Subscribe via RSS
        </a>
        .
      </p>
      <ul className="mt-12 divide-y divide-line">
        {posts.map((post) => (
          <li key={post.slug} className="py-6">
            <Link href={`/blog/${post.slug}`} className="group block">
              <time dateTime={post.date} className="font-mono text-xs text-muted">
                {formatDate(post.date)}
              </time>
              <h2 className="mt-1 text-xl font-semibold group-hover:text-accent">{post.title}</h2>
              <p className="mt-2 text-muted">{post.summary}</p>
              <p className="mt-2 font-mono text-[11px] uppercase tracking-wider text-accent">{post.tags.join(" · ")}</p>
            </Link>
          </li>
        ))}
      </ul>
    </PageShell>
  );
}
