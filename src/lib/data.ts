// Portfolio content. Edit here; every page, the sitemap and JSON-LD read from it.

export type Experience = {
  period: string;
  role: string;
  org: string;
  url?: string;
  summary: string;
  tags: string[];
};

export const experience: Experience[] = [
  {
    period: "2026 — Present",
    role: "Founder & Lead Systems Engineer",
    org: "ALABSGOLD",
    url: "https://alabsgold.vercel.app",
    summary:
      "Run a boutique web engineering studio for exporters and diaspora businesses. Scope, architect and ship client platforms end to end: product catalogues with WhatsApp ordering, Studio admin panels on Postgres, payment flows and VPS hosting.",
    tags: ["Next.js", "Prisma", "PostgreSQL", "Django", "Nginx", "Client delivery"],
  },
  {
    period: "Jul — Sep 2026",
    role: "Software Engineering Intern (SIWES)",
    org: "Alluvium",
    summary:
      "Built Atlassian Forge apps for Confluence, including a knowledge-freshness agent that flags stale documentation so teams can trust what they read.",
    tags: ["Atlassian Forge", "JavaScript", "Confluence", "Enterprise"],
  },
  {
    period: "2025 — Present",
    role: "Technical Lead, Hackathon Teams",
    org: "X-Coders · EX-Coders · Visionary Coders",
    summary:
      "Led architecture and team workflow across national hackathons. 1st place at the NiRA-XT Hackathon with a DNS threat-protection system; shipped EX-AMS at the NACOS 2025/26 Hackathon and DPT Pay at the NACOS National Build Challenge.",
    tags: ["Team leadership", "System design", "Cybersecurity"],
  },
  {
    period: "Ongoing",
    role: "Head, Teenagers' Media Department",
    org: "Church",
    summary:
      "Lead the teens' media team: livestream and event media, plus the registration platforms, countdown sites and WhatsApp bots that run our programmes.",
    tags: ["Leadership", "Media", "Automation"],
  },
];

export const education = {
  degree: "B.Sc. Computer Science",
  school: "Joseph Ayo Babalola University (JABU)",
  status: "300 level",
};

export type Project = {
  slug: string;
  name: string;
  kind: "Client" | "Product" | "Hackathon" | "Internship" | "Lab";
  year: string;
  oneLiner: string;
  stack: string[];
  live?: string;
  repo?: string; // omitted for private client code
  featured?: boolean;
  award?: string;
  caseStudy?: { problem: string; built: string[]; outcome: string };
};

export const projects: Project[] = [
  {
    slug: "khadie-fresh",
    name: "Khadie Fresh UK",
    kind: "Client",
    year: "2026",
    oneLiner:
      "Wholesale catalogue and direct-ordering site for an African food importer serving the UK and EU since 2013.",
    stack: ["React", "TypeScript", "Tailwind CSS"],
    live: "https://khadie-fresh-uk-ten.vercel.app",
    featured: true,
    caseStudy: {
      problem:
        "Khadie Afro Foods sells hundreds of products to restaurants, shops and caterers, but orders arrived as unstructured messages with no product reference, pack size or quantity.",
      built: [
        "Searchable catalogue filtered by category (fresh, frozen, drinks, cupboard essentials, cooking oil).",
        "One-tap WhatsApp ordering per product, prefilled with the item name and requested pack quantity.",
        "A wholesale desk with quick-order links for trade buyers, plus a detail view with origin, pack sizing, shelf life and storage.",
        "A glass-style interface tuned for fast mobile browsing with fixed card dimensions, so the grid never shifts.",
      ],
      outcome:
        "Every enquiry now lands as a structured order request the team can quote immediately, from a site that looks as established as the business is.",
    },
  },
  {
    slug: "kadie-fresh",
    name: "Kadie Fresh Website v2",
    kind: "Client",
    year: "2026",
    oneLiner:
      "Marketing site and Studio admin panel for Kadie Fresh Nig Ltd: products, blog, testimonials, certifications and enquiries, all editable without a developer.",
    stack: ["Next.js 16", "Prisma", "PostgreSQL", "Tailwind CSS"],
    featured: true,
    caseStudy: {
      problem:
        "The first site was static: every price, product or certificate change needed a developer, and enquiries had nowhere to go.",
      built: [
        "Next.js App Router site backed by Postgres through Prisma, built from a full written design specification.",
        "A Studio admin panel with signed session cookies to manage products, blog posts, testimonials, certifications, gallery and site settings.",
        "Enquiry capture stored in the database instead of lost in an inbox.",
        "Seeded content and migrations so a fresh environment comes up complete in one command.",
      ],
      outcome:
        "The client edits their own catalogue and content, and the codebase is documented for hand-over.",
    },
  },
  {
    slug: "dpt-pay",
    name: "DPT Pay System",
    kind: "Hackathon",
    year: "2026",
    oneLiner:
      "Departmental dues platform where students pay through Paystack and payments verify themselves. No more screenshots as proof.",
    stack: ["Django", "Django REST Framework", "React", "Vite", "Paystack", "GitHub Actions"],
    live: "https://dpt-pay-system.vercel.app",
    repo: "https://github.com/Alabsgold/DPT-pay-system",
    featured: true,
    award: "NACOS National Build Challenge",
    caseStudy: {
      problem:
        "Departments collect dues, event fees and excursion money by asking students to send a screenshot. Treasurers reconcile by hand and nobody knows who hasn't paid.",
      built: [
        "Django + DRF API and a React app. Departments create contributions; students pay with Paystack and the payment is verified automatically.",
        "Admins import the class list first, so the system knows who owes before anyone pays.",
        "333 backend tests and CI on every push and pull request.",
      ],
      outcome:
        "Reconciliation goes from a spreadsheet chore to a live dashboard, and a payment can't be faked with an edited image.",
    },
  },
  {
    slug: "pu-ledger",
    name: "JABU Publicity Unit Ledger",
    kind: "Client",
    year: "2026",
    oneLiner: "Financial ledger for managing the JABU Publicity Unit's income and spending in one accountable place.",
    stack: ["TypeScript", "React"],
    live: "https://pu-ledger.vercel.app",
    featured: true,
  },
  {
    slug: "nira-xt-guardian",
    name: "NIRA-XT Guardian 2",
    kind: "Hackathon",
    year: "2025",
    oneLiner:
      "DNS-level threat protection and parental control. Gemini AI scores unknown domains in real time to catch zero-day phishing and malware.",
    stack: ["TypeScript", "Gemini AI", "DNS"],
    live: "https://nira-xt-guardian-2.vercel.app",
    repo: "https://github.com/Alabsgold/NIRA-XT_Guardian_2",
    featured: true,
    award: "1st place · NiRA-XT Hackathon",
  },
  {
    slug: "ex-ams",
    name: "EX-AMS",
    kind: "Hackathon",
    year: "2026",
    oneLiner:
      "Real-time university attendance with barcode and QR scanning, live attendance streaming and role-based access.",
    stack: ["FastAPI", "PostgreSQL", "Redis", "Server-Sent Events", "Docker", "Nginx"],
    repo: "https://github.com/Alabsgold/ex_digital_2",
    featured: true,
    award: "NACOS 2025/26 Hackathon",
  },
  {
    slug: "x-dns-guardian",
    name: "X-DNS Guardian+",
    kind: "Hackathon",
    year: "2025",
    oneLiner: "Real-time DNS metadata scanner and 0–100 risk scorer for the .ng namespace.",
    stack: ["TypeScript", "DNS", "RDAP/WHOIS"],
    repo: "https://github.com/Alabsgold/X-DNS-GUARDIAN",
  },
  {
    slug: "confluence-freshness-agent",
    name: "Confluence Knowledge Freshness Agent",
    kind: "Internship",
    year: "2026",
    oneLiner: "Atlassian Forge app that flags stale Confluence documentation.",
    stack: ["Atlassian Forge", "JavaScript"],
    repo: "https://github.com/Alabsgold/Confluence-Knowledge-Freshness-Agent",
  },
  {
    slug: "hand-tracker-x",
    name: "Hand Tracker X",
    kind: "Lab",
    year: "2026",
    oneLiner: "In-browser 3D hand tracking rendered as a neon hologram, with gesture recognition. Video never leaves the device.",
    stack: ["React", "MediaPipe", "Three.js"],
    live: "https://handtrackerx.vercel.app",
    repo: "https://github.com/Alabsgold/hand_tracker_x",
  },
  {
    slug: "lifeflow-ai",
    name: "LifeFlow AI",
    kind: "Product",
    year: "2026",
    oneLiner: "AI schedule optimiser that turns a chaotic obligation list into a balanced weekly rhythm. Installable on Android as a PWA.",
    stack: ["React", "TypeScript", "Firebase", "PWA"],
  },
  {
    slug: "freshvena",
    name: "Freshvena Glow",
    kind: "Client",
    year: "2025",
    oneLiner: "Storefront for a premium Nigerian food exporter selling to the USA, UK, Canada and Europe.",
    stack: ["React", "TypeScript", "shadcn/ui"],
    repo: "https://github.com/Alabsgold/freshvena_web",
  },
  {
    slug: "letlearn-py",
    name: "LetLearn_Py Academy",
    kind: "Product",
    year: "2026",
    oneLiner: "Python learning hub with lessons and live in-browser tests.",
    stack: ["TypeScript"],
    live: "https://let-learn-py-academy.vercel.app",
    repo: "https://github.com/Alabsgold/LetLearn_Py-Academy",
  },
];

export const featuredProjects = projects.filter((p) => p.featured);
export const caseStudies = projects.filter((p) => p.caseStudy);
export const getProject = (slug: string) => projects.find((p) => p.slug === slug);
