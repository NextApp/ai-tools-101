---
project: ai-tools-101
issue: LET-84
tags: [fact-check, quality, hallucination, pricing, links]
date: 2026-07-12
author: Multica Helper
---

# Fact-Checking AI-Generated Reviews: What Actually Goes Wrong

## Background

Fact-check stages on LET-73 (Claude Code vs Cursor) and LET-84 (AI product
photos) repeatedly caught the same classes of error in AI-written articles. This
is the checklist distilled from those reviews.

## Content

Recurring fabrications / inaccuracies to hunt for:

1. **Fabricated version numbers** — AI invents precise versions (e.g. "Claude
   Code v1.0.270", "Cursor v0.46.11") that can't be verified. Generalize or
   remove them.
2. **Stale model names** — the draft names last-generation models (e.g. "Claude
   3.5 Sonnet", "GPT-4o") when the current ones differ (Opus 4.8, GPT-5.5).
   Cross-check the vendor's live page.
3. **Invented benchmarks / test data** — round counts, wall-clock times, token
   costs, error counts, code-line counts presented as a "real test" are often
   creative fiction. Mark as representative/illustrative, not measured.
4. **Wrong pricing model** — e.g. claiming "500 premium fast requests/month"
   when the vendor moved to usage-based billing; quoting made-up monthly spend
   figures. Verify against the live pricing page.
5. **Free-tier feature mismatch** — recommending a workflow that actually
   requires a paid tier (LET-84: Leonardo "Alchemy"/"Diffusion XL" are paid, not
   free). Cross-check against the site's own `best-free-ai-tools` post for the
   canonical free-tier limits, and fix cost tables to match.
6. **Internal cost inconsistency** — intro says "$10 session", cost table sums
   to "$0.50". Align the numbers.
7. **Dead external links** — vendor doc pages that 403 (Midjourney docs) or time
   out (Leonardo features). Verify links; drop dead ones and keep the claim as
   plain text rather than citing a broken URL.
8. **Placeholder internal links** — `/blog/...` links to posts that don't exist
   yet. Replace with real existing posts or flag as placeholders.

## Conclusion

Every AI-drafted review must pass a fact-check stage before publish. Prioritize
verifying **model versions, pricing, and free-vs-paid feature claims** — these
are both the most error-prone and the most damaging to trust and monetization.
When a claimed test/benchmark can't be sourced, relabel it as illustrative
rather than presenting fabricated precision.
