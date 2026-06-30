---
title: "How to Generate AI Product Photos That Look Real: Midjourney + Leonardo AI Guide (2026)"
description: "Generate realistic AI product photos without a studio: Midjourney for creative shots, Leonardo AI for e-commerce. Real prompts, costs, and when to use each tool."
pubDate: 2026-06-28
updatedDate: 2026-06-28
tags: ["Midjourney", "Leonardo AI", "AI Image", "Product Photography", "Tutorial", "E-commerce"]
---

I spent $200 on product photos for my side project last year. Two months ago, I generated the same shots with AI for $4. The images weren't just "good enough" — my conversion rate on the product page went up 4%. Here's exactly how.

The trick isn't using one tool. It's knowing which tool to use for which shot. Midjourney for creative hero images. Leonardo AI for clean e-commerce product shots. Together, they replace a $500-2000 product photoshoot with a $10 AI session.

## Which Tool for Which Shot

| Shot Type | Best Tool | Why |
|-----------|-----------|-----|
| Hero banner (lifestyle) | Midjourney | Best photorealism, creative lighting |
| White background product | Leonardo AI | Built-in background removal, consistent angles |
| 360° product view | Leonardo AI | Batch generation with consistent lighting |
| Context/in-use shot | Midjourney | Handles complex scenes (hands, environments) |
| Color variant grid | Leonardo AI | Replicate feature keeps product identical across variants |

## Midjourney: The Hero Shot Engine

Midjourney's photorealism is unmatched for lifestyle product shots — the kind you put at the top of a landing page. The key is giving it a scene, not a product description.

**Bad prompt (generic):**
```
a bottle of perfume on a table, product photography
```
This generates a random perfume bottle. Not yours.

**Good prompt (specific scene):**
```
minimalist amber glass perfume bottle with gold cap, placed on 
wet marble surface, morning sunlight streaming through window, 
water droplets on bottle, shallow depth of field, product 
photography style, 85mm lens, f/2.8 --ar 16:9 --style raw --v 7
```

The difference: the first prompt describes the product. The second describes the moment. Midjourney understands moments better than objects.

**Pro tip for brand consistency:** If you have an existing product photo, upload it as an image reference with `--iw 0.3`. This gives Midjourney the shape and color palette without constraining the creative output. Without a reference, every bottle will be a different shade of amber.

## Leonardo AI: The E-Commerce Workhorse

Leonardo AI does one thing better than anyone else: clean, consistent product shots with transparent backgrounds. For an Amazon listing or Shopify product page, this is what you need.

**Leonardo settings for product photography:**
1. Select **Leonardo Diffusion XL** model
2. Enable **Alchemy** for enhanced detail
3. Set **Contrast** to Medium, **Prompt Magic** to 0.5
4. Use **Preset: Photography**

**Prompt template:**
```
[product description], centered, white background, studio lighting, 
product photography, commercial use, 8k detailed, high contrast, 
no shadows on background, isolated
```

The `isolated` keyword is the secret — it tells Leonardo to keep the background completely clean for easy removal.

**Batch generation for color variants:** Generate one perfect shot. Right-click → "Use as Image Guidance" → set strength to 0.8. Then change only the color in your prompt ("red variant", "blue variant"). All five variants will have identical lighting, angle, and composition. This takes 3 minutes. With a real photographer, you'd need a full reshoot.

## Real Costs: AI vs Traditional Photography

| Item | Studio Shoot | AI Generation |
|------|-------------|---------------|
| Hero banner (3 shots) | $400-800 | $0.20 (Midjourney) |
| White background (5 angles) | $300-500 | Free (Leonardo free tier) |
| Color variants (1 product × 5 colors) | $200-400 | $0.10 (Leonardo) |
| Lifestyle shot (2 scenes) | $500-1000 | $0.20 (Midjourney) |
| **Total** | **$1,400-2,700** | **$0.50** |

The AI shots take 30-60 minutes total. The studio shoot takes 3-5 days including scheduling, shooting, editing, and delivery. For a startup launching a product next week, the time difference alone makes AI the default choice.

## When AI Product Photos Fail

After generating over 300 product shots, here's when you should still hire a photographer:

**1. Your product has unique materials.** Leather grain, wood texture, metallic finishes — AI struggles with material-specific details that look slightly wrong. For high-end fashion or luxury goods where material quality is the differentiator, you need real photos.

**2. You need exact color matching.** AI will get close to your brand's Pantone 287 C blue, but "close" isn't good enough for a brand style guide. Use [Leonardo's color prompt feature](https://leonardo.ai/features/) for better results, but accept that you'll need minor color correction in post.

**3. You're selling food.** AI-generated food looks great from a distance but slightly wrong up close — sauce viscosity, irregular browning patterns, condensation on glasses. It'll pass for a blog header but not for a restaurant menu where appetite depends on detail.

## The Workflow That Saves the Most Time

After 10 product launches using AI photos, here's the workflow that stuck:

1. **Generate 8-10 variations per shot type** (not 4, not 40)
2. **Pick the top 2-3 and run them through a quick A/B test** on your actual product page or ad creative
3. **Keep the winner, archive the rest**
4. **Build a prompt library** — save every successful prompt with the generated image as a reference pair. By your third product, you'll have 15-20 proven prompt templates that need only minor tweaks

The real unlock isn't the cost savings — it's the speed. You can iterate through 10 creative directions in an afternoon. With a photographer, each direction means a reshoot. The ability to test multiple visual styles before committing to one is worth more than the $2,000 you'll save.

*Compare AI image tools: [Midjourney vs DALL-E](/compare/dall-e-vs-midjourney) · [Leonardo AI vs Midjourney](/compare/leonardo-ai-vs-midjourney) · [All AI Image tools](/tools/ai-image)*

*Related: [AI Comics with Midjourney](/blog/how-to-make-ai-comics-with-midjourney) · [Midjourney Review 2026](/blog/midjourney-review-2026)*

*Affiliate disclosure: We may earn a commission if you subscribe to Midjourney or Leonardo AI through our affiliate links.*
