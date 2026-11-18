// Blog index. To publish a post:
//   1. add src/content/blog/<slug>.mdx
//   2. add an entry below with the same slug
// The blog page, sitemap and RSS feed all read from this list.

export type Post = {
  slug: string;
  title: string;
  summary: string;
  date: string; // ISO yyyy-mm-dd
  tags: string[];
};

const allPosts: Post[] = [
  {
    slug: "why-payments-should-verify-themselves",
    title: "Why payments should verify themselves",
    summary:
      "What building DPT Pay taught me about replacing 'send a screenshot as proof' with server-side verification.",
    date: "2026-11-15",
    tags: ["Payments", "Django", "Paystack"],
  },
  {
    slug: "hello-world",
    title: "Hello, world: why I'm writing in public",
    summary: "Who I am, what ALABSGOLD builds, and what this blog will cover.",
    date: "2026-11-10",
    tags: ["Personal", "ALABSGOLD"],
  },
];

export const posts = [...allPosts].sort((a, b) => b.date.localeCompare(a.date));
export const getPost = (slug: string) => posts.find((p) => p.slug === slug);

export const formatDate = (iso: string) =>
  new Date(`${iso}T00:00:00Z`).toLocaleDateString("en-GB", {
    day: "numeric",
    month: "short",
    year: "numeric",
    timeZone: "UTC",
  });
