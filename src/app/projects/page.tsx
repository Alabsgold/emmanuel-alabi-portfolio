import type { Metadata } from "next";
import Link from "next/link";
import { projects } from "@/lib/data";
import { PageShell } from "@/components/page-shell";

export const metadata: Metadata = {
  title: "Projects",
  description:
    "Client platforms, hackathon builds and lab experiments by Emmanuel Alabi: payments, DNS security, export storefronts, attendance systems and more.",
  alternates: { canonical: "/projects" },
};

export default function ProjectsPage() {
  return (
    <PageShell>
      <h1 className="text-4xl font-bold tracking-tight">Project archive</h1>
      <p className="mt-3 text-muted">
        Everything worth showing, newest first. Client code is private; live links are public.
      </p>

      <div className="mt-12 overflow-x-auto">
        <table className="w-full border-collapse text-left text-sm">
          <thead className="font-mono text-[11px] uppercase tracking-wider text-muted">
            <tr className="border-b border-line">
              <th className="py-3 pr-4 font-medium">Year</th>
              <th className="py-3 pr-4 font-medium">Project</th>
              <th className="hidden py-3 pr-4 font-medium sm:table-cell">Type</th>
              <th className="hidden py-3 pr-4 font-medium md:table-cell">Built with</th>
              <th className="py-3 font-medium">Links</th>
            </tr>
          </thead>
          <tbody>
            {[...projects]
              .sort((a, b) => b.year.localeCompare(a.year))
              .map((p) => (
                <tr key={p.slug} className="border-b border-line/60 align-top">
                  <td className="py-4 pr-4 font-mono text-xs text-muted">{p.year}</td>
                  <td className="py-4 pr-4">
                    <span className="font-semibold">{p.name}</span>
                    {p.award && <span className="block text-xs text-accent">🏆 {p.award}</span>}
                    <span className="mt-1 block max-w-md text-xs leading-relaxed text-muted">{p.oneLiner}</span>
                  </td>
                  <td className="hidden py-4 pr-4 text-muted sm:table-cell">{p.kind}</td>
                  <td className="hidden py-4 pr-4 text-xs text-muted md:table-cell">{p.stack.join(" · ")}</td>
                  <td className="space-y-1 py-4 text-xs">
                    {p.caseStudy && (
                      <Link href={`/projects/${p.slug}`} className="block font-semibold text-accent hover:underline">
                        Case study
                      </Link>
                    )}
                    {p.live && (
                      <a href={p.live} target="_blank" rel="noopener noreferrer" className="block hover:text-accent">
                        Live ↗
                      </a>
                    )}
                    {p.repo && (
                      <a href={p.repo} target="_blank" rel="noopener noreferrer" className="block hover:text-accent">
                        Code ↗
                      </a>
                    )}
                  </td>
                </tr>
              ))}
          </tbody>
        </table>
      </div>
    </PageShell>
  );
}
