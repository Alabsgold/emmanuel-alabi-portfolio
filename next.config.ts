import type { NextConfig } from "next";
import createMDX from "@next/mdx";

const nextConfig: NextConfig = {
  // Let .mdx files act as imports (blog posts live in src/content/blog).
  pageExtensions: ["js", "jsx", "md", "mdx", "ts", "tsx"],
  // The home page is a static page built with the taste-skill kit (public/index.html):
  // its scripts edit the DOM, so it stays outside React. Blog and projects stay in Next.
  async rewrites() {
    return { beforeFiles: [{ source: "/", destination: "/index.html" }], afterFiles: [], fallback: [] };
  },
};

const withMDX = createMDX({});

export default withMDX(nextConfig);
