import Link from "next/link";
import { site } from "@/lib/site";
import { education, experience, featuredProjects } from "@/lib/data";
import { posts, formatDate } from "@/lib/posts";
import { SceneLoader } from "@/components/scene-loader";

const services = [
  { title: "Export storefronts", body: "Catalogues buyers abroad can order from in one tap, over WhatsApp.", stack: "Next.js · React" },
  { title: "Admin panels", body: "Clients edit products, prices and enquiries without calling a developer.", stack: "Prisma · PostgreSQL" },
  { title: "Payment flows", body: "Paystack payments the server confirms itself. No screenshots as proof.", stack: "Django · DRF" },
  { title: "Backends & hosting", body: "Tested APIs on an Ubuntu VPS behind Nginx, handed over with the repo.", stack: "FastAPI · Nginx" },
];

const nav = [
  { href: "#services", label: "Services" },
  { href: "#work", label: "Work" },
  { href: "#about", label: "About" },
  { href: "#writing", label: "Writing" },
];

export default function Home() {
  return (
    <>
      <SceneLoader />

      <header className="site-nav">
        <div className="shell flex h-16 items-center justify-between gap-6">
          <a href="#top" className="font-display text-lg tracking-tight">
            Emmanuel Alabi
          </a>
          <nav aria-label="Main" className="hidden gap-7 text-sm text-muted md:flex">
            {nav.map((n) => (
              <a key={n.href} href={n.href} className="nav-link">
                {n.label}
              </a>
            ))}
          </nav>
          <a href="#contact" className="btn btn-gold text-sm">
            Request a quote
          </a>
        </div>
      </header>

      <main id="content">
        {/* ---------- Hero ---------- */}
        <section id="top" className="screen flex items-center">
          <div className="shell w-full">
            <div className="max-w-xl">
              <p className="eyebrow">ALABSGOLD · Nigeria → worldwide</p>
              <h1 className="mt-5 font-display text-5xl leading-[1.04] tracking-tight sm:text-6xl lg:text-7xl">
                Backend systems that move <span className="text-accent">orders and money</span> across borders.
              </h1>
              <p className="mt-6 max-w-lg text-lg leading-relaxed text-muted">
                I&apos;m Emmanuel Alabi, a backend engineer and the founder of ALABSGOLD. I build the storefronts,
                admin panels and payment flows exporters use to sell abroad.
              </p>
              <div className="mt-9 flex flex-wrap gap-3">
                <a href="#contact" className="btn btn-gold">
                  Request a quote
                </a>
                <a href="#work" className="btn btn-ghost">
                  See the work
                </a>
              </div>
              <p className="mt-10 text-sm text-muted">🥇 1st place, NiRA-XT Hackathon · B.Sc. Computer Science, JABU</p>
            </div>
          </div>
          <a href="#services" className="scroll-cue" aria-label="Scroll to services">
            <span />
          </a>
        </section>

        {/* ---------- Services ---------- */}
        <section id="services" className="screen flex items-center">
          <div className="shell w-full lg:flex lg:justify-end">
            <div className="panel max-w-2xl">
              <p className="eyebrow">What the studio builds</p>
              <h2 className="mt-3 font-display text-4xl tracking-tight sm:text-5xl">Four systems, one hand-over.</h2>
              <p className="mt-4 text-muted">
                Every project ships with its code, its docs and the private repository. The nodes in the scene are the
                stack each one runs on.
              </p>
              <ul className="mt-8 grid gap-4 sm:grid-cols-2">
                {services.map((s) => (
                  <li key={s.title} className="card">
                    <h3 className="text-lg font-medium">{s.title}</h3>
                    <p className="mt-2 text-sm leading-relaxed text-muted">{s.body}</p>
                    <p className="mt-4 font-mono text-xs text-accent">{s.stack}</p>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </section>

        {/* ---------- Work ---------- */}
        <section id="work" className="screen flex items-center">
          <div className="shell w-full">
            <div className="panel">
              <div className="flex flex-wrap items-end justify-between gap-4">
                <div>
                  <p className="eyebrow">Selected work</p>
                  <h2 className="mt-3 font-display text-4xl tracking-tight sm:text-5xl">Client builds and hackathon wins</h2>
                </div>
                <Link href="/projects" className="link-arrow">
                  Full project archive →
                </Link>
              </div>
              <ul className="mt-8 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                {featuredProjects.map((p) => {
                  const href = p.caseStudy ? `/projects/${p.slug}` : (p.live ?? p.repo ?? "/projects");
                  const internal = href.startsWith("/");
                  return (
                    <li key={p.slug}>
                      <a
                        href={href}
                        target={internal ? undefined : "_blank"}
                        rel={internal ? undefined : "noopener noreferrer"}
                        className="card card-link block h-full"
                      >
                        <p className="font-mono text-xs uppercase tracking-wider text-muted">
                          {p.kind} · {p.year}
                        </p>
                        <h3 className="mt-2 text-lg font-medium">
                          {p.name} <span aria-hidden>{internal ? "→" : "↗"}</span>
                        </h3>
                        {p.award && <p className="mt-1 text-xs text-accent">🏆 {p.award}</p>}
                        <p className="mt-2 text-sm leading-relaxed text-muted">{p.oneLiner}</p>
                        <p className="mt-4 font-mono text-xs text-accent">{p.stack.slice(0, 3).join(" · ")}</p>
                      </a>
                    </li>
                  );
                })}
              </ul>
            </div>
          </div>
        </section>

        {/* ---------- About ---------- */}
        <section id="about" className="screen flex items-center">
          <div className="shell w-full">
            <div className="panel max-w-3xl">
              <p className="eyebrow">About</p>
              <h2 className="mt-3 font-display text-4xl tracking-tight sm:text-5xl">Studio founder, still in school.</h2>
              <p className="mt-4 text-muted">
                {education.degree}, {education.status}, at {education.school}.
              </p>
              <ol className="mt-8 divide-y divide-line">
                {experience.map((e) => (
                  <li key={e.role} className="grid gap-1 py-5 sm:grid-cols-[9rem_1fr] sm:gap-6">
                    <p className="font-mono text-xs uppercase tracking-wider text-muted">{e.period}</p>
                    <div>
                      <h3 className="font-medium">
                        {e.role} · <span className="text-accent">{e.org}</span>
                      </h3>
                      <p className="mt-1 text-sm leading-relaxed text-muted">{e.summary}</p>
                    </div>
                  </li>
                ))}
              </ol>
            </div>
          </div>
        </section>

        {/* ---------- Writing ---------- */}
        <section id="writing" className="py-28">
          <div className="shell w-full lg:flex lg:justify-end">
            <div className="panel max-w-2xl">
              <p className="eyebrow">Writing</p>
              <h2 className="mt-3 font-display text-4xl tracking-tight">Notes from the build</h2>
              <ul className="mt-6 divide-y divide-line">
                {posts.slice(0, 3).map((post) => (
                  <li key={post.slug}>
                    <Link href={`/blog/${post.slug}`} className="group block py-5">
                      <time dateTime={post.date} className="font-mono text-xs text-muted">
                        {formatDate(post.date)}
                      </time>
                      <h3 className="mt-1 font-medium group-hover:text-accent">{post.title}</h3>
                      <p className="mt-1 text-sm text-muted">{post.summary}</p>
                    </Link>
                  </li>
                ))}
              </ul>
              <Link href="/blog" className="link-arrow mt-4 inline-block">
                All posts →
              </Link>
            </div>
          </div>
        </section>

        {/* ---------- Contact ---------- */}
        <section id="contact" className="screen flex items-center">
          <div className="shell w-full text-center">
            <p className="eyebrow">Start a project</p>
            <h2 className="mx-auto mt-4 max-w-3xl font-display text-5xl leading-tight tracking-tight sm:text-6xl">
              Have a platform to build or a role to fill?
            </h2>
            <p className="mx-auto mt-5 max-w-xl text-muted">
              Clients get a scope and milestone prices within a day, Monday to Saturday. Recruiters: I&apos;m open to
              backend internships alongside my degree.
            </p>
            <div className="mt-9 flex flex-wrap justify-center gap-3">
              <a href={`mailto:${site.email.work}?subject=Project%20quote`} className="btn btn-gold">
                Email {site.email.work}
              </a>
              <a href={site.whatsapp} className="btn btn-ghost" target="_blank" rel="noopener noreferrer">
                Message on WhatsApp
              </a>
            </div>
            <p className="mt-6 text-sm text-muted">
              Personal: <a href={`mailto:${site.email.personal}`} className="underline-offset-4 hover:underline">{site.email.personal}</a> ·{" "}
              <a href={site.github} className="underline-offset-4 hover:underline">GitHub</a> ·{" "}
              <a href={site.company.url} className="underline-offset-4 hover:underline">ALABSGOLD studio</a>
            </p>
          </div>
        </section>
      </main>

      <footer className="shell flex flex-wrap items-center justify-between gap-4 border-t border-line py-8 text-sm text-muted">
        <p>© {new Date().getFullYear()} Emmanuel Alabi · ALABSGOLD</p>
        <p className="flex gap-5 font-mono text-xs">
          <Link href="/blog">Blog</Link>
          <Link href="/projects">Projects</Link>
          <a href="/rss.xml">RSS</a>
          <a href="/sitemap.xml">Sitemap</a>
        </p>
      </footer>
    </>
  );
}
