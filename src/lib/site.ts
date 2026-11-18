// Single source of truth for identity, links and SEO defaults.
// Set NEXT_PUBLIC_SITE_URL in Vercel once you attach a custom domain
// (e.g. https://emmanuel.alabsgold.site) and every canonical URL,
// sitemap entry and RSS link follows automatically.

export const site = {
  // Note: emmanuel-alabi.vercel.app belongs to someone else; this project is emmanuel-alabi-portfolio.
  url: (process.env.NEXT_PUBLIC_SITE_URL ?? "https://emmanuel-alabi-portfolio.vercel.app").replace(/\/$/, ""),
  name: "Emmanuel Alabi",
  shortName: "Alabsgold",
  title: "Founder & Lead Systems Engineer at ALABSGOLD",
  tagline:
    "I build secure, fast backends and platforms for businesses that sell across borders, and I'm studying Computer Science at JABU while doing it.",
  description:
    "Emmanuel Alabi (Alabsgold) is a backend-focused software engineer from Nigeria and founder of ALABSGOLD, a web engineering studio building payment systems, export storefronts and secure platforms with Python, Django, FastAPI, Next.js and TypeScript.",
  location: "Nigeria (WAT / GMT+1)",
  company: { name: "ALABSGOLD", url: "https://alabsgold.vercel.app" },
  email: { work: "femi.alabi@alabsgold.site", personal: "emmaalabi31@gmail.com" },
  whatsapp: "https://wa.me/2347039960964",
  github: "https://github.com/Alabsgold",
  // Drop a PDF at public/cv.pdf and flip this to true to show the CV link.
  hasCv: false,
  keywords: [
    "Emmanuel Alabi",
    "Alabsgold",
    "ALABSGOLD",
    "backend engineer Nigeria",
    "Django developer",
    "FastAPI developer",
    "Next.js developer",
    "software engineer Nigeria",
    "JABU computer science",
  ],
} as const;

export const absoluteUrl = (path = "/") => `${site.url}${path.startsWith("/") ? path : `/${path}`}`;
