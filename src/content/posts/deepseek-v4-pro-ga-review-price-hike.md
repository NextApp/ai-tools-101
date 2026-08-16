---
title: "DeepSeek V4 Pro GA Review: Better Agent Skills, But the Price Just Went Up 4.5x"
description: "DeepSeek V4 Pro GA launches with agent upgrades and Codex integration. Peak pricing hits $3.96/1M output, up 4.5x. Full review and China 3-model comparison."
pubDate: 2026-08-16
updatedDate: 2026-08-16
tags: ["DeepSeek", "DeepSeek V4", "AI Model", "AI Pricing", "China AI", "Review"]
---

DeepSeek V4 Pro officially launched today. The good news: major agent upgrades, native Codex integration, and flexible reasoning effort that lets you dial the model from "quick answer" to "think hard." The bad news: the price just went up 4.5x — and the "DeepSeek is almost free" era is over.

For months, DeepSeek was the go-to answer when someone asked "what's the cheapest frontier-ish model?" At $0.87 per million output tokens, it undercut GPT-5.5 by 34x. Today's launch changes that math permanently.

## What's Actually New in the GA Release

The preview version of V4 Pro has been in developers' hands since April. The GA release brings three meaningful upgrades:

**Agent upgrades with "strong production gains."** DeepSeek claims significant improvements in agentic workflows — the multi-step, tool-using, self-correcting tasks that matter for real applications. Early testers report better tool call reliability and fewer mid-task failures.

**Flexible reasoning effort.** V4 Pro and V4 Flash now accept `low`, `high`, or `max` reasoning settings. Low is for simple tasks (faster, cheaper). High is the daily driver. Max is for complex problems that reward deeper thinking. This mirrors what OpenAI and Anthropic have done with GPT-5.6 and Claude — letting you trade compute for quality on a per-request basis.

**Native OpenAI Responses API + one-click Codex integration.** DeepSeek now works as a drop-in backend for Codex, Claude Code, and OpenCode. The integration friction that kept some developers on OpenAI's ecosystem is mostly gone.

These are real improvements. But they're overshadowed by what happened to the pricing.

## The Price Hike: $0.87 to $3.96

Here's the pricing change, effective today:

| Model | Preview Price (output/1M) | GA Peak Price | GA Off-Peak Price |
|-------|---------------------------|---------------|-------------------|
| V4 Flash | $0.28 | $1.32 | $0.66 |
| V4 Pro | $0.87 | $3.96 | $1.98 |

The GA release introduces peak/off-peak billing. Peak hours are 01:00-04:00 and 06:00-10:00 UTC (which, frustratingly, covers most of the US and European workday). Off-peak is 50% off peak.

But even off-peak pricing is higher than the preview price. V4 Pro's off-peak $1.98/1M output is 2.3x the preview's $0.87. Peak pricing is 4.5x the preview. For developers who built on DeepSeek during the preview period assuming the price would stay rock-bottom, this is a rude awakening.

The "DeepSeek is basically free" era is over. It's still cheap compared to GPT-5.6 Sol ($30/1M output) or Claude Fable 5 ($50/1M output) — but it's no longer in a pricing category of its own.

## Why the Price Went Up

Three factors explain the hike:

**Preview subsidies are ending.** The April preview priced DeepSeek as a loss leader to attract developers. The $0.87/1M output was never sustainable as a permanent price — it was acquisition spend. The GA price reflects DeepSeek's actual cost structure plus margin.

**Agent workloads are more expensive to serve.** The agent upgrades that DeepSeek is touting — multi-step reasoning, tool calls, self-correction — consume significantly more tokens per task. A model that "thinks harder" costs more to run. DeepSeek is pricing that reality in.

**Peak/off-peak is the new normal.** OpenAI has been doing flex/batch pricing. Anthropic has prompt caching. DeepSeek's peak/off-peak split is their version — encouraging developers to schedule workloads to off-peak hours. It's a reasonable system, but it means the "headline price" (peak) is what most Western developers will actually pay.

## Where DeepSeek V4 Pro Now Sits in the China 3-Model Race

July and August have delivered three major Chinese model launches. Here's where things stand:

| Model | Parameters | Context | Key Strength | Pricing (output/1M) |
|-------|-----------|---------|--------------|---------------------|
| Kimi K3 | 2.8T MoE | 1M | Frontier-tier benchmarks, trails only Sol and Fable 5 | ¥199/mo (~$28) |
| GLM-5.2 | — | 1M | Open weights, self-hostable, Code Arena #1 | Self-host or API |
| DeepSeek V4 Pro | 1.6T MoE | 1M | Best price-to-performance, agent upgrades | $1.98-3.96 |

DeepSeek's positioning has shifted. It's no longer "the cheapest capable model" — that title arguably now goes to Kimi K3's consumer pricing or GLM-5.2's self-hosted option. Instead, DeepSeek is now "the best value among production-grade agent models" — cheaper than the Western frontier, but no longer dramatically so.

For Chinese developers, the choice is now genuinely competitive. Kimi K3 offers the best benchmarks. GLM-5.2 offers self-hosting freedom. DeepSeek V4 Pro offers a balance of price, agent capability, and ecosystem compatibility. There's no single "obvious winner" anymore — which is exactly what a maturing market looks like.

## Should You Use DeepSeek V4 Pro?

**Use it if:**
- You need agent capabilities at a price well below GPT-5.6 Sol or Claude Fable 5
- Your workload can be scheduled to off-peak hours (the $1.98/1M rate is still very competitive)
- You're already on the DeepSeek API and the OpenAI/Anthropic compatibility matters to your stack
- You value the flexible reasoning effort controls

**Wait if:**
- You were counting on the preview pricing — recalculate your cost model first
- Your workload hits peak hours and you're price-sensitive (Kimi K3 or GLM-5.2 may now be cheaper)
- You need the absolute best agent performance (Sol and Fable 5 still lead)

**Skip if:**
- You're building something where the 4.5x price increase breaks your unit economics
- You need a model that will stay cheap — this hike is a signal that DeepSeek's subsidy era is over, and there may be more increases coming

*Related: [Kimi K3 vs Fable 5](/blog/kimi-k3-vs-claude-fable-5) · [How to Get Free AI Tokens](/blog/how-to-get-free-ai-tokens-2026) · [DeepSeek V4 Pricing Explained](/blog/deepseek-v4-pricing-explained)*

I ran my standard TypeScript Express API benchmark on the GA model to compare against the preview. The agent improvements are real: V4 Pro-0813 completed the full auth-plus-rate-limiting task in one pass with correct Redis usage (the preview version missed Redis). Reasoning effort "high" gave the best balance — "max" produced marginally better code for 3x the tokens. The price hike stings, but the quality step up is genuine. [DeepSeek's GA announcement](https://api-docs.deepseek.com/news/news260813) confirms the agent upgrades and Codex integration. The [pricing page](https://api-docs.deepseek.com/quick_start/pricing) documents the peak/off-peak structure.

*Affiliate disclosure: DeepSeek does not currently have a known affiliate program.*
