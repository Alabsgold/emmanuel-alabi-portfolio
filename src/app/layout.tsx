import type { Metadata, Viewport } from "next";
import { Source_Serif_4, Libre_Franklin } from "next/font/google";
import { site, absoluteUrl } from "@/lib/site";
import { education, experience } from "@/lib/data";
import { JsonLd } from "@/components/json-ld";
import "./globals.css";

// The same pairing the taste-skill dealt for the home page (Source Serif 4 / Libre Franklin).
const display = Source_Serif_4({ variable: "--font-display", subsets: ["latin"] });
const text = Libre_Franklin({ variable: "--font-text", subsets: ["latin"] });

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: {
    default: `${site.name} | ${site.title}`,
    template: `%s | ${site.name}`,
  },
  description: site.description,
  keywords: [...site.keywords],
  authors: [{ name: site.name, url: site.url }],
  creator: site.name,
  alternates: {
    canonical: "/",
    types: { "application/rss+xml": absoluteUrl("/rss.xml") },
  },
  openGraph: {
    type: "website",
    locale: "en_NG",
    url: site.url,
    siteName: site.name,
    title: `${site.name} | ${site.title}`,
    description: site.description,
  },
  twitter: {
    card: "summary_large_image",
    title: `${site.name} | ${site.title}`,
    description: site.description,
  },
  robots: { index: true, follow: true },
};

export const viewport: Viewport = {
  themeColor: "#07090d",
};

// schema.org Person: helps search engines connect the name, studio and school.
const personJsonLd = {
  "@context": "https://schema.org",
  "@type": "Person",
  name: site.name,
  alternateName: site.shortName,
  url: site.url,
  jobTitle: experience[0].role,
  worksFor: { "@type": "Organization", name: site.company.name, url: site.company.url },
  alumniOf: { "@type": "CollegeOrUniversity", name: education.school },
  email: `mailto:${site.email.work}`,
  address: { "@type": "PostalAddress", addressCountry: "NG" },
  sameAs: [site.github, site.company.url],
  knowsAbout: ["Backend engineering", "Django", "FastAPI", "Next.js", "PostgreSQL", "DNS security", "Payments"],
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className={`${display.variable} ${text.variable} antialiased`}>
      <body className="min-h-screen">
        <a
          href="#content"
          className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-50 focus:rounded-md focus:bg-accent focus:px-4 focus:py-2 focus:text-bg"
        >
          Skip to content
        </a>
        <JsonLd data={personJsonLd} />
        {children}
      </body>
    </html>
  );
}
