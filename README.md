# Emmanuel Alabi: Portfolio & Blog

**Live:** https://emmanuel-alabi-portfolio.vercel.app

Personal site of **Emmanuel Alabi (Alabsgold)**, founder & lead systems engineer at [ALABSGOLD](https://alabsgold.vercel.app).

Built with **Next.js 16 (App Router)**, **TypeScript**, **Tailwind CSS v4** and **MDX**. Every page is pre-rendered as static HTML.

## What's inside

| Route | What it is |
| :--- | :--- |
| `/` | Split layout: sticky identity panel + About, Experience, Work, Writing, Contact |
| `/projects` | Full project archive table |
| `/projects/[slug]` | Case studies (problem → what I built → outcome) |
| `/blog`, `/blog/[slug]` | MDX blog |
| `/sitemap.xml`, `/robots.txt`, `/rss.xml` | Generated from the content files |
| `/opengraph-image` | Generated social-share card |

SEO: per-page metadata and canonical URLs, Open Graph/Twitter cards, and schema.org JSON-LD (`Person`, `BlogPosting`, `CreativeWork`).

## Editing content

- **Profile, links, emails:** `src/lib/site.ts`
- **Experience & projects:** `src/lib/data.ts` (add a `caseStudy` to give a project its own page)
- **New blog post:** add `src/content/blog/<slug>.mdx`, then add an entry in `src/lib/posts.ts`
- **CV:** put `public/cv.pdf` in place and set `hasCv: true` in `src/lib/site.ts`

## Run locally

```bash
npm install
npm run dev   # http://localhost:3000
npm run build # production build
```

## Deploy (free)

Import the repo on [Vercel](https://vercel.com/new). No configuration is needed.
When you attach a domain (e.g. `emmanuel.alabsgold.site`), set `NEXT_PUBLIC_SITE_URL` to it in Vercel so canonical URLs, the sitemap and RSS follow.
