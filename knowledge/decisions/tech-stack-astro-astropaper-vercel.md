---
project: ai-tools-101
issue: LET-19
tags: [tech-stack, astro, astropaper, tailwind, vercel, repo]
date: 2026-07-12
author: Multica Helper
---

# Tech Stack: Astro + AstroPaper Theme, Tailwind v4, Vercel

## Background

LET-19 built the first site UI. The requirement was a free, professional,
fast-loading, mobile-responsive English content site.

## Content

- **Framework**: Astro (static site generation) — free, SEO-friendly, fast.
- **Theme**: **AstroPaper v6** (popular free community blog theme, Astro 6 +
  Tailwind CSS v4). Provides home list, post detail with TOC, tag archives,
  About, Archives, Pagefind search, RSS, sitemap, 404, light/dark mode.
- **Deploy**: **Vercel** (free). Framework auto-detected, no config; push to
  GitHub `main` → auto-deploy. `vercel.xml`/`vercel.json` present in repo.
- **Content model**: articles live in `src/content/posts/*.md` with frontmatter
  (`title`, `pubDate`, `updatedDate`, `tags`, `description`, optional
  `heroImage`). Tool/prompt data live in `src/data/*.json`.
- **The single source-of-truth repo is `git@github.com:NextApp/ai-tools-101.git`.**

## Conclusion

- **There is exactly ONE project/repo: `NextApp/ai-tools-101`.** Do NOT scaffold
  a new site or a parallel repo. During LET-19 an agent created a *duplicate*
  fresh project (`ai-tools-tutorials`); the owner flagged it and the work had to
  be merged back into `ai-tools-101` and the duplicate deleted. Always
  `multica repo checkout git@github.com:NextApp/ai-tools-101.git` and work
  inside it.
- Verify changes with `npm run build` (expect 0 errors) before reporting done.
- To add/refresh an article: edit the `.md` under `src/content/posts/`, keep
  `description` ≤ 155-160 chars, build, commit, push to `main`.
