import Link from "next/link";
import { site } from "@/lib/site";

// Shared frame for inner pages (/projects, /blog, posts, case studies).
export function PageShell({
  back = { href: "/", label: site.name },
  children,
}: {
  back?: { href: string; label: string };
  children: React.ReactNode;
}) {
  return (
    <div className="mx-auto min-h-screen max-w-3xl px-6 py-14 md:px-10 md:py-20">
      <header className="mb-12 flex items-center justify-between gap-4">
        <Link
          href={back.href}
          className="group inline-flex items-center gap-2 font-mono text-xs uppercase tracking-[0.2em] text-accent"
        >
          <span aria-hidden className="transition-transform group-hover:-translate-x-1">
            ←
          </span>
          {back.label}
        </Link>
        <nav aria-label="Primary" className="flex gap-5 font-mono text-xs uppercase tracking-[0.2em] text-muted">
          <Link href="/projects" className="hover:text-text">
            Work
          </Link>
          <Link href="/blog" className="hover:text-text">
            Blog
          </Link>
        </nav>
      </header>
      <main id="content">{children}</main>
      <SiteFooter />
    </div>
  );
}

export function SiteFooter() {
  return (
    <footer className="mt-24 border-t border-line pt-8 text-sm text-muted">
      <p>
        Built by {site.name} with Next.js and Tailwind CSS. Part of{" "}
        <a href={site.company.url} className="text-text hover:text-accent">
          {site.company.name}
        </a>
        .
      </p>
      <p className="mt-2 font-mono text-xs">
        <a href="/rss.xml" className="hover:text-accent">
          RSS
        </a>{" "}
        ·{" "}
        <a href="/sitemap.xml" className="hover:text-accent">
          Sitemap
        </a>{" "}
        · © {new Date().getFullYear()} {site.name}
      </p>
    </footer>
  );
}

export function Tag({ children }: { children: React.ReactNode }) {
  return (
    <li className="rounded-full bg-accent-soft px-3 py-1 font-mono text-[11px] font-medium text-accent">
      {children}
    </li>
  );
}
