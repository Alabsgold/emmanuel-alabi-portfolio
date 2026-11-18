import { posts } from "@/lib/posts";
import { absoluteUrl, site } from "@/lib/site";

// RSS 2.0 feed at /rss.xml, built at compile time.
export const dynamic = "force-static";

const escape = (s: string) =>
  s.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;");

export function GET() {
  const items = posts
    .map(
      (p) => `    <item>
      <title>${escape(p.title)}</title>
      <link>${absoluteUrl(`/blog/${p.slug}`)}</link>
      <guid isPermaLink="true">${absoluteUrl(`/blog/${p.slug}`)}</guid>
      <pubDate>${new Date(`${p.date}T00:00:00Z`).toUTCString()}</pubDate>
      <description>${escape(p.summary)}</description>
${p.tags.map((t) => `      <category>${escape(t)}</category>`).join("\n")}
    </item>`,
    )
    .join("\n");

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">
  <channel>
    <title>${escape(`${site.name}: Writing`)}</title>
    <link>${absoluteUrl("/blog")}</link>
    <description>${escape("Backend engineering, security and building ALABSGOLD.")}</description>
    <language>en</language>
    <atom:link href="${absoluteUrl("/rss.xml")}" rel="self" type="application/rss+xml" />
${items}
  </channel>
</rss>`;

  return new Response(xml, {
    headers: { "Content-Type": "application/rss+xml; charset=utf-8" },
  });
}
