import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { caseStudies, getProject } from "@/lib/data";
import { site, absoluteUrl } from "@/lib/site";
import { PageShell, Tag } from "@/components/page-shell";
import { JsonLd } from "@/components/json-ld";

type Props = { params: Promise<{ slug: string }> };

// Only projects with a written case study get a page; anything else 404s.
export function generateStaticParams() {
  return caseStudies.map((p) => ({ slug: p.slug }));
}
export const dynamicParams = false;

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const p = getProject(slug);
  if (!p) return {};
  return {
    title: `${p.name}: case study`,
    description: p.oneLiner,
    alternates: { canonical: `/projects/${p.slug}` },
    openGraph: { title: `${p.name}: case study`, description: p.oneLiner, url: absoluteUrl(`/projects/${p.slug}`) },
  };
}

export default async function CaseStudyPage({ params }: Props) {
  const { slug } = await params;
  const p = getProject(slug);
  if (!p?.caseStudy) notFound();
  const cs = p.caseStudy;

  return (
    <PageShell back={{ href: "/projects", label: "All projects" }}>
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "CreativeWork",
          name: p.name,
          description: p.oneLiner,
          url: absoluteUrl(`/projects/${p.slug}`),
          creator: { "@type": "Person", name: site.name, url: site.url },
          dateCreated: p.year,
          keywords: p.stack.join(", "),
        }}
      />
      <p className="font-mono text-xs uppercase tracking-[0.2em] text-accent">
        {p.kind} · {p.year}
      </p>
      <h1 className="mt-3 text-4xl font-bold tracking-tight">{p.name}</h1>
      {p.award && <p className="mt-2 font-medium text-accent">🏆 {p.award}</p>}
      <p className="mt-4 text-lg leading-relaxed text-muted">{p.oneLiner}</p>

      <div className="mt-6 flex flex-wrap gap-3 text-sm">
        {p.live && (
          <a href={p.live} target="_blank" rel="noopener noreferrer" className="rounded-md bg-accent px-4 py-2 font-semibold text-bg hover:opacity-90">
            Visit live site ↗
          </a>
        )}
        {p.repo && (
          <a href={p.repo} target="_blank" rel="noopener noreferrer" className="rounded-md border border-line px-4 py-2 font-semibold hover:border-accent hover:text-accent">
            View code ↗
          </a>
        )}
      </div>

      <ul className="mt-6 flex flex-wrap gap-2" aria-label="Stack">
        {p.stack.map((s) => (
          <Tag key={s}>{s}</Tag>
        ))}
      </ul>

      <div className="mt-14 space-y-12">
        <section>
          <h2 className="font-mono text-xs uppercase tracking-[0.2em] text-accent">The problem</h2>
          <p className="mt-3 leading-relaxed text-muted">{cs.problem}</p>
        </section>
        <section>
          <h2 className="font-mono text-xs uppercase tracking-[0.2em] text-accent">What I built</h2>
          <ul className="mt-3 space-y-3">
            {cs.built.map((b) => (
              <li key={b} className="flex gap-3 leading-relaxed text-muted">
                <span aria-hidden className="mt-2.5 h-1.5 w-1.5 shrink-0 rounded-full bg-accent" />
                {b}
              </li>
            ))}
          </ul>
        </section>
        <section className="rounded-2xl border border-line bg-surface/70 p-6">
          <h2 className="font-mono text-xs uppercase tracking-[0.2em] text-accent">Outcome</h2>
          <p className="mt-3 leading-relaxed">{cs.outcome}</p>
        </section>
      </div>

      <div className="mt-16 rounded-2xl border border-accent/40 p-6">
        <p className="font-semibold">Need something like this for your business?</p>
        <p className="mt-1 text-sm text-muted">
          ALABSGOLD builds it end to end.{" "}
          <a href={`mailto:${site.email.work}`} className="text-accent hover:underline">
            {site.email.work}
          </a>
        </p>
      </div>
    </PageShell>
  );
}
