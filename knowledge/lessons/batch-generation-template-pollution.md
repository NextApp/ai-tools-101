---
project: ai-tools-101
issue: LET-68
tags: [content-quality, batch-generation, template-pollution, gotcha]
date: 2026-07-12
author: Multica Helper
---

# Batch-Generated Articles Leak Each Other's Content (Template Pollution)

## Background

When the 4 category articles (Video / Voice / Research / Productivity, LET-43)
were generated in a batch, three of them (voice, video, research) ended up with
an "Implementation Advice and Workflow Integration" section that was **copied
verbatim from the Productivity article** — discussing Gamma/Notion/Beautiful.ai,
which have nothing to do with voice/video/research tools. The freshness audit
(LET-59) caught it as a P1 defect; LET-68 fixed it.

## Content

- **Symptom**: a section in article A talks about tools that belong to article
  B. The prose is fluent and passes a shallow read, so it's easy to miss.
- **Cause**: batch generation reused/leaked a section template across articles
  without re-grounding it in each article's own subject tools.
- **Fix**: replace the polluted section with the article's own tools' workflow
  (voice → ElevenLabs/Murf/PlayHT; video → Runway/Pika/Synthesia; research →
  Perplexity/Elicit/Consensus), keeping the same three-part structure
  (tool philosophy → hybrid approach → practical cadence).

## Conclusion

- After any **batch** article generation, spot-check that each article's example
  sections actually reference *its own* subject tools — cross-article content
  leakage is a real, repeated failure mode here.
- Related data-quality smell from LET-41: batch-generated `tools.json` had all
  50 tools with identical shape (5 features / 4 pros / 4 best_for) and ratings
  clustered 4.0-4.8 — templated uniformity reads as AI-generated. Introduce
  real variance when the data is meant to look hand-reviewed.
