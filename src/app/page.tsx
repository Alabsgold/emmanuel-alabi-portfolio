import Link from "next/link";
import { site } from "@/lib/site";
import { education, experience, featuredProjects } from "@/lib/data";
import { posts, formatDate } from "@/lib/posts";
import { SectionNav } from "@/components/section-nav";
import { SiteFooter, Tag } from "@/components/page-shell";

const contactLinks = [
  { label: "GitHub", href: site.github },
  { label: "ALABSGOLD", href: site.company.url },
  { label: "Work email", href: `mailto:${site.email.work}` },
  { label: "WhatsApp", href: site.whatsapp },
];

function SectionTitle({ children }: { children: React.ReactNode }) {
  // Mobile gets a sticky label because the side nav is hidden there.
  return (
    <h2 className="sticky top-0 z-10 -mx-6 mb-6 bg-bg/80 px-6 py-4 font-mono text-xs font-semibold uppercase tracking-[0.2em] text-accent backdrop-blur md:-mx-12 md:px-12 lg:sr-only">
      {children}
    </h2>
  );
}

export default function Home() {
  return (
    <div className="mx-auto min-h-screen max-w-6xl px-6 md:px-12 lg:px-20">
      <div className="lg:flex lg:justify-between lg:gap-12">
        {/* ---------- Left: identity (sticky on desktop) ---------- */}
        <header className="pt-16 lg:sticky lg:top-0 lg:flex lg:max-h-screen lg:w-[44%] lg:flex-col lg:justify-between lg:py-24">
          <div>
            <p className="font-mono text-xs uppercase tracking-[0.25em] text-accent">Alabsgold</p>
            <h1 className="mt-3 text-4xl font-bold tracking-tight sm:text-5xl">
              <Link href="/">{site.name}</Link>
            </h1>
            <p className="mt-4 text-lg font-medium">
              Founder &amp; Lead Systems Engineer at{" "}
              <a href={site.company.url} className="text-accent hover:underline">
                ALABSGOLD
              </a>
            </p>
            <p className="mt-4 max-w-sm leading-relaxed text-muted">{site.tagline}</p>

            <div className="mt-8 flex flex-wrap gap-3">
              <a
                href={`mailto:${site.email.work}`}
                className="rounded-md bg-accent px-4 py-2.5 text-sm font-semibold text-bg transition hover:opacity-90"
              >
                Start a project
              </a>
              <Link
                href="/projects"
                className="rounded-md border border-line px-4 py-2.5 text-sm font-semibold transition hover:border-accent hover:text-accent"
              >
                See all work
              </Link>
              {site.hasCv && (
                <a
                  href="/cv.pdf"
                  className="rounded-md border border-line px-4 py-2.5 text-sm font-semibold transition hover:border-accent hover:text-accent"
                >
                  Download CV
                </a>
              )}
            </div>

            <SectionNav />
          </div>

          <ul className="mt-10 flex flex-wrap gap-x-5 gap-y-2 font-mono text-xs text-muted lg:mt-0" aria-label="Elsewhere">
            {contactLinks.map((l) => (
              <li key={l.label}>
                <a href={l.href} className="hover:text-accent" target={l.href.startsWith("http") ? "_blank" : undefined} rel="noopener noreferrer">
                  {l.label} ↗
                </a>
              </li>
            ))}
          </ul>
        </header>

        {/* ---------- Right: scrolling content ---------- */}
        <main id="content" className="pt-20 lg:w-[56%] lg:py-24">
          <section id="about" aria-label="About" className="mb-24 scroll-mt-16 lg:scroll-mt-24">
            <SectionTitle>About</SectionTitle>
            <div className="space-y-4 leading-relaxed text-muted">
              <p>
                I&apos;m a backend-focused engineer from Nigeria. I like the parts of software most people never see:
                payment verification, access control, data models, and the deploy that has to work at 2 a.m.
              </p>
              <p>
                In 2026 I founded{" "}
                <a href={site.company.url} className="font-medium text-text hover:text-accent">
                  ALABSGOLD
                </a>
                , a studio that builds fast, trustworthy platforms for exporters and diaspora businesses. Our clients
                sell to buyers on other continents, where a slow site or a broken order flow quietly costs them the
                deal. We hand-build the catalogues, admin panels and payment systems that close that gap.
              </p>
              <p>
                I&apos;m also studying for a <span className="text-text">{education.degree}</span> at{" "}
                <span className="text-text">{education.school}</span> ({education.status}). I spent my SIWES at{" "}
                <span className="text-text">Alluvium</span> building Atlassian Forge apps, and I lead teams at national
                hackathons, including a <span className="text-text">1st-place finish at NiRA-XT</span>.
              </p>
              <p>
                Outside code I lead my church&apos;s teenagers&apos; media department, which is where I first learned
                to ship things people depend on every week.
              </p>
            </div>
          </section>

          <section id="experience" aria-label="Experience" className="mb-24 scroll-mt-16 lg:scroll-mt-24">
            <SectionTitle>Experience</SectionTitle>
            <ol className="space-y-12">
              {experience.map((e) => (
                <li key={e.role} className="grid gap-2 sm:grid-cols-[8rem_1fr] sm:gap-6">
                  <p className="pt-1 font-mono text-xs uppercase tracking-wider text-muted">{e.period}</p>
                  <div>
                    <h3 className="font-semibold leading-snug">
                      {e.role} ·{" "}
                      {e.url ? (
                        <a href={e.url} className="text-accent hover:underline">
                          {e.org}
                        </a>
                      ) : (
                        <span className="text-accent">{e.org}</span>
                      )}
                    </h3>
                    <p className="mt-2 text-sm leading-relaxed text-muted">{e.summary}</p>
                    <ul className="mt-3 flex flex-wrap gap-2" aria-label="Skills">
                      {e.tags.map((t) => (
                        <Tag key={t}>{t}</Tag>
                      ))}
                    </ul>
                  </div>
                </li>
              ))}
            </ol>
          </section>

          <section id="work" aria-label="Selected work" className="mb-24 scroll-mt-16 lg:scroll-mt-24">
            <SectionTitle>Work</SectionTitle>
            <ul className="space-y-4">
              {featuredProjects.map((p) => {
                const href = p.caseStudy ? `/projects/${p.slug}` : (p.live ?? p.repo ?? "/projects");
                const internal = href.startsWith("/");
                return (
                  <li key={p.slug}>
                    <a
                      href={href}
                      target={internal ? undefined : "_blank"}
                      rel={internal ? undefined : "noopener noreferrer"}
                      className="group -mx-5 block rounded-xl border border-transparent p-5 transition hover:border-line hover:bg-surface/70"
                    >
                      <div className="flex flex-wrap items-baseline gap-x-3 gap-y-1">
                        <h3 className="font-semibold group-hover:text-accent">
                          {p.name} <span aria-hidden>{internal ? "→" : "↗"}</span>
                        </h3>
                        <span className="font-mono text-[11px] uppercase tracking-wider text-muted">
                          {p.kind} · {p.year}
                        </span>
                      </div>
                      {p.award && <p className="mt-1 text-xs font-medium text-accent">🏆 {p.award}</p>}
                      <p className="mt-2 text-sm leading-relaxed text-muted">{p.oneLiner}</p>
                      <ul className="mt-3 flex flex-wrap gap-2" aria-label="Stack">
                        {p.stack.slice(0, 5).map((s) => (
                          <Tag key={s}>{s}</Tag>
                        ))}
                      </ul>
                    </a>
                  </li>
                );
              })}
            </ul>
            <Link href="/projects" className="mt-8 inline-flex items-center gap-2 font-semibold hover:text-accent">
              View the full project archive <span aria-hidden>→</span>
            </Link>
          </section>

          <section id="writing" aria-label="Writing" className="mb-24 scroll-mt-16 lg:scroll-mt-24">
            <SectionTitle>Writing</SectionTitle>
            <ul className="space-y-6">
              {posts.slice(0, 3).map((post) => (
                <li key={post.slug}>
                  <Link href={`/blog/${post.slug}`} className="group block">
                    <time dateTime={post.date} className="font-mono text-xs text-muted">
                      {formatDate(post.date)}
                    </time>
                    <h3 className="mt-1 font-semibold group-hover:text-accent">{post.title}</h3>
                    <p className="mt-1 text-sm text-muted">{post.summary}</p>
                  </Link>
                </li>
              ))}
            </ul>
            <Link href="/blog" className="mt-8 inline-flex items-center gap-2 font-semibold hover:text-accent">
              All posts <span aria-hidden>→</span>
            </Link>
          </section>

          <section id="contact" aria-label="Contact" className="scroll-mt-16 lg:scroll-mt-24">
            <SectionTitle>Contact</SectionTitle>
            <div className="rounded-2xl border border-line bg-surface/70 p-8">
              <h3 className="text-2xl font-bold tracking-tight">Have a platform to build or a role to fill?</h3>
              <p className="mt-3 text-muted">
                Clients: I&apos;ll scope your project and reply within 24 hours, Monday to Saturday. Recruiters: I&apos;m
                open to internships and backend roles alongside my degree.
              </p>
              <dl className="mt-6 grid gap-4 text-sm sm:grid-cols-2">
                <div>
                  <dt className="font-mono text-xs uppercase tracking-wider text-muted">Work</dt>
                  <dd>
                    <a href={`mailto:${site.email.work}`} className="font-medium hover:text-accent">
                      {site.email.work}
                    </a>
                  </dd>
                </div>
                <div>
                  <dt className="font-mono text-xs uppercase tracking-wider text-muted">Personal</dt>
                  <dd>
                    <a href={`mailto:${site.email.personal}`} className="font-medium hover:text-accent">
                      {site.email.personal}
                    </a>
                  </dd>
                </div>
                <div>
                  <dt className="font-mono text-xs uppercase tracking-wider text-muted">WhatsApp</dt>
                  <dd>
                    <a href={site.whatsapp} className="font-medium hover:text-accent">
                      +234 703 996 0964
                    </a>
                  </dd>
                </div>
                <div>
                  <dt className="font-mono text-xs uppercase tracking-wider text-muted">Based in</dt>
                  <dd className="font-medium">{site.location}</dd>
                </div>
              </dl>
            </div>
          </section>

          <SiteFooter />
        </main>
      </div>
    </div>
  );
}
