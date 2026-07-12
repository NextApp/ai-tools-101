---
project: ai-tools-101
issue: LET-59
tags: [content-freshness, seo, audit, maintenance, pubdate]
date: 2026-07-12
author: Multica Helper
---

# Monthly Content Freshness Audit

## Background

Old `pubDate`s decay Google's freshness signal and cost ranking/traffic. LET-59
ran a monthly site-wide freshness audit that produced a prioritized fix list and
spawned repair sub-issues (LET-63…68).

## Content

**Staleness thresholds by article type** (based on `pubDate` age):

| Type | Threshold |
|------|-----------|
| Comparison / 横评 (vs) | ~3 months (~90 days) |
| Review / 测评 | ~4 months (~120 days) |
| Tutorial / How-to | ~6 months (~180 days) |
| Roundup / Trend / 盘点 | ~2 months (~60 days) |

**Audit procedure:**
1. List every `src/content/posts/*.md` with its `pubDate` and Fact-checked date.
2. Classify each by type and compute days-since-pubDate vs its threshold.
3. Check staleness signals: pubDate over threshold, Fact-checked > 3 months,
   dead/discontinued tools, price changes, 404 links.
4. Prioritize by **traffic potential × staleness × monetization value**
   (P0 = expired high-traffic; P1 = content defects; P2 = approaching expiry;
   P3 = fresh).
5. Create fix sub-issues for P0 and assign to 全栈开发 / 内容创作.

## Conclusion

- **Google reads `pubDate`, not `updatedDate`.** An article can have a recent
  Fact-checked date and still lose ranking because its `pubDate` is old. The fix
  for a stale-but-accurate article is to **refresh `pubDate`** (republish),
  optionally alongside a real content update.
- A refreshed `pubDate` without a genuine content update is a stopgap — flag
  articles whose underlying facts (pricing, features) actually changed for a
  follow-up substantive rewrite.
- Run this audit monthly; the highest-traffic legacy posts (prompt engineering,
  best free tools, build-an-AI-agent, ChatGPT use cases, image-generator
  comparison) need the most frequent maintenance.
