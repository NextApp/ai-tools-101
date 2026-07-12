---
project: ai-tools-101
issue: LET-73
tags: [content-pipeline, workflow, seo, editorial, roles]
date: 2026-07-12
author: Multica Helper
---

# The v2 Content Pipeline (Staged Editorial Workflow)

## Background

High-value articles (deep comparisons / reviews like Claude Code vs Cursor
LET-73, GLM-5.2 review LET-76) go through a multi-stage editorial pipeline
rather than a single write-and-publish step. Each stage is a distinct agent
role, and stages are gated.

## Content

Observed stage flow ("v2 pipeline", Stage 0 → Stage 10):

- **Stage 0 — Intake**: collect GSC data + competitor SERP radar + confirm the
  tool is in the site's inventory.
- **Stage 1 — Topic review** (选题审核员): 6-dimension review → assign P0-P3
  priority. Dimensions include category fit, SERP competition (top-5),
  existing-coverage gap, search demand, monetization, and time-sensitivity. A
  timely topic (e.g. a model launched today) is P0 with a 2-3 day publish window
  before competitors saturate.
- **Stage 2 — Draft** (内容创作): optimize the writing prompt first (hook that
  challenges the reader's assumption, target-reader persona, differentiated
  narrative, strict H2 structure, banned-phrase list like "我们/笔者/综上所述"),
  then generate the draft into `src/content/posts/<slug>.md`.
- **Stage 3 — Fact check** (事实核查员): verify model versions, pricing,
  feature claims, external links, pubDate. See
  `lessons/fact-check-ai-generated-reviews.md`.
- **Stage 4 — Editor** (内容主编): apply fixes, final polish.
- Later stages continue through publication/QA.

Quality gates enforced on every article:
- Main keyword in title / H1 / first paragraph / ≥1 H2
- `description` 150-160 chars
- ≥2 internal links (to tool pages or existing posts) + ≥2 authoritative
  external links; affiliate links disclosed
- `npm run build` passes (0 errors)

## Conclusion

- For comparison/review articles, follow the staged pipeline and hand off
  explicitly between roles; don't skip fact-check.
- The differentiator that has worked is a **narrative angle** ("which wins for
  *your* workflow", "is the hype real?"), not a feature table — plus real
  scenario testing and honest failure cases.
- Time-sensitive launch topics must ship within 2-3 days or the search dividend
  is gone.
