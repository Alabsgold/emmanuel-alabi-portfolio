import type { MDXComponents } from "mdx/types";
import Link from "next/link";

// Global element overrides for every blog post. Styling lives in the
// `.prose` rules in globals.css so posts stay plain Markdown.
const components: MDXComponents = {
  a: ({ href = "", children, ...props }) =>
    href.startsWith("/") ? (
      <Link href={href} {...props}>
        {children}
      </Link>
    ) : (
      <a href={href} target="_blank" rel="noopener noreferrer" {...props}>
        {children}
      </a>
    ),
};

export function useMDXComponents(): MDXComponents {
  return components;
}
