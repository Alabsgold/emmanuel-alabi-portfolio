import type { MetadataRoute } from "next";
import { absoluteUrl } from "@/lib/site";
import { caseStudies } from "@/lib/data";
import { posts } from "@/lib/posts";

// Served at /sitemap.xml. New posts and case studies appear automatically.
export default function sitemap(): MetadataRoute.Sitemap {
  const latestPost = posts[0]?.date ? new Date(posts[0].date) : new Date();

  return [
    { url: absoluteUrl("/"), lastModified: latestPost, changeFrequency: "monthly", priority: 1 },
    { url: absoluteUrl("/projects"), lastModified: latestPost, changeFrequency: "monthly", priority: 0.8 },
    { url: absoluteUrl("/blog"), lastModified: latestPost, changeFrequency: "weekly", priority: 0.8 },
    ...caseStudies.map((p) => ({
      url: absoluteUrl(`/projects/${p.slug}`),
      changeFrequency: "yearly" as const,
      priority: 0.7,
    })),
    ...posts.map((p) => ({
      url: absoluteUrl(`/blog/${p.slug}`),
      lastModified: new Date(p.date),
      changeFrequency: "yearly" as const,
      priority: 0.6,
    })),
  ];
}
