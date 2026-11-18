import Link from "next/link";
import { PageShell } from "@/components/page-shell";

export default function NotFound() {
  return (
    <PageShell>
      <p className="font-mono text-xs uppercase tracking-[0.2em] text-accent">404</p>
      <h1 className="mt-3 text-4xl font-bold tracking-tight">This route doesn&apos;t resolve.</h1>
      <p className="mt-4 text-muted">The page moved or never existed. Here&apos;s where to go instead:</p>
      <ul className="mt-6 space-y-2 font-semibold">
        <li>
          <Link href="/" className="hover:text-accent">→ Home</Link>
        </li>
        <li>
          <Link href="/projects" className="hover:text-accent">→ Projects</Link>
        </li>
        <li>
          <Link href="/blog" className="hover:text-accent">→ Blog</Link>
        </li>
      </ul>
    </PageShell>
  );
}
