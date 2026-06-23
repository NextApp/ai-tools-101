---
title: "How to Make AI Comics with Midjourney (V7 Guide, 2026)"
description: "Make AI comics in Midjourney V7: lock one character with Omni-Reference, generate expressions and poses, compose full pages, and know when to skip Midjourney."
pubDate: 2026-06-23
updatedDate: 2026-06-23
tags: ["Midjourney", "AI Comics", "AI Manga", "Character Design", "Tutorial"]
---

# How to Make AI Comics with Midjourney: From One Character to a Full Page

You already know how to get a gorgeous single image out of Midjourney. That was never the hard part. The hard part is the second panel — where the same character is supposed to walk into frame and instead a *different person* shows up wearing a slightly different coat, with a new nose and the wrong jawline. By panel six you are not making a comic anymore; you are casting six different actors to play one role.

This guide is about fixing exactly that. We are going to take a single character all the way from first sketch to a finished, multi-panel page where they actually look like the same person the whole way through. No theory dumps, no feature tour — one character, one workflow, one page at the end.

<!-- SCREENSHOT: A finished 4-panel comic page of the same cyberpunk detective in different poses, demonstrating consistency across panels -->

---

## Restate the goal

By the time you finish this, you will be able to design one character in Midjourney, lock their appearance so it survives across generations, spin that locked character into new expressions and poses on demand, and arrange those panels into a single comic page that reads as one continuous scene. The deliverable is a character-consistent page — not a folder of pretty but unrelated images.

We will use one running example so nothing stays abstract: **Kano**, a tired cyberpunk detective in a long oxblood coat, a scar over his left eyebrow, and a square jaw. Everything below is something you do to Kano and can then do to any character you invent.

---

## Lock your character — `--cref` / omni-reference in V7

Here is the thing that trips up almost everyone migrating from older guides: the old `--cref` character-reference workflow you read about in 2024 was a **V6** feature. In V7, Midjourney replaced it with a different and stronger system called **Omni-Reference**, and a lot of tutorials still floating around have not caught up. If you paste a `--cref` link into a V7 job and it ignores you, this is why. <!-- FACT-CHECK: confirm that --cref was the V6 character-reference parameter and that V7 uses Omni-Reference (--oref) instead; verify --cref is not supported in V7 jobs as of 2026 -->

The V7 move has two steps.

**Step 1 — Create the canonical reference of Kano.** Generate Kano on a plain background, front-facing, neutral expression, full body, even lighting. This is not your hero shot; it is your *spec sheet*. You want every defining feature visible and nothing dramatic hiding the face. Prompt him plainly: `cyberpunk detective, oxblood trench coat, short dark hair, scar over left eyebrow, square jaw, neutral expression, plain grey studio background, full body`. Regenerate until one image genuinely *is* the character. Upscale it. This single image is now your source of truth — save its URL.

**Step 2 — Reference him into every future panel with Omni-Reference.** In V7 you attach that canonical image with `--oref <image-url>` and control how strongly Midjourney clings to it with `--ow` (omni-weight). A higher `--ow` forces tighter facial and outfit fidelity; a lower one lets the scene, lighting, and pose breathe. The default omni-weight is 100, and the usable range runs to a much higher ceiling for when a character keeps drifting. <!-- FACT-CHECK: verify V7 Omni-Reference syntax is --oref <url> with weight flag --ow, default value 100, and the documented maximum (commonly cited as up to 1000); cross-check against docs.midjourney.com -->

So your panel prompt becomes the *scene*, and Kano rides along as the reference:

`Kano crouched on a rain-slicked neon rooftop at night, looking down at the city, cinematic wide shot --oref <kano-url> --ow 150`

That is the entire trick. You stop re-describing the character in words — words can never re-summon the *same* face — and instead hand Midjourney the face directly. You can read more about how V7 stacks up on raw image quality in our [Midjourney review for 2026](/blog/midjourney-review-2026), but for comics, Omni-Reference is the one feature that matters more than all the rest combined.

One honest caveat that you will hit immediately: Omni-Reference and the full V7 toolset are **paid only** — there is no free tier that unlocks it. You will need an active subscription, which starts in the low double digits per month, before any of this works. You can subscribe directly at [Midjourney](https://www.midjourney.com); plan on the entry tier being enough to learn on. <!-- FACT-CHECK: confirm Midjourney has no free tier and that entry plans start around $10/month in 2026; verify Omni-Reference requires a paid plan; confirm/replace midjourney.com as the correct affiliate link target -->

---

## From one character to expressions & poses

A comic is not one pose. Kano has to be furious in one panel, exhausted in the next, mid-sprint in the third — and still be unmistakably Kano in all of them. With your canonical reference locked, this is now a matter of changing the *scene words* while keeping the *reference image* fixed.

Keep `--oref <kano-url>` constant. Change everything else:

| You want | What you change in the prompt |
|----------|-------------------------------|
| A new expression | Add the emotion as an action, not an adjective: "Kano gritting his teeth, eyes narrowed" |
| A new pose | Describe the body: "Kano sprinting through an alley, coat flaring behind him" |
| A new angle | Name the camera: "low-angle shot looking up at Kano" |
| Tighter likeness | Raise `--ow` |
| More dramatic scene freedom | Lower `--ow` |

The practical rhythm: when the *face* drifts but the pose is good, nudge `--ow` up and regenerate. When the *pose* is wrong but the face is perfect, keep `--ow` and rewrite the action line. You are turning two separate dials — likeness and staging — instead of fighting one tangled prompt.

This is the moment the work stops feeling like gambling. You drop the same detective into panel after panel and his scar, his jaw, the worn collar of that oxblood coat all hold their shape while everything *around* him changes — the shot that used to mean regenerating fifty times and settling for "close enough" now lands in two or three tries. The afternoon you used to lose to inconsistency, you get back.

<!-- SCREENSHOT: A contact sheet of the same detective in six expressions/poses, all generated with the same --oref reference -->

---

## Composing panels into a full page

Generating consistent panels is half the job. A comic *page* is panels arranged in a deliberate reading order, and Midjourney does not lay out pages — it makes images. So you composite.

Here is the workflow that actually finishes a page:

1. **Plan the beats before generating.** Sketch a rough grid — even boxes on paper — and write one line per panel: what Kano is doing and the shot size. A page that alternates shot sizes (wide → close-up → wide) reads with rhythm; a page of six medium shots reads flat.
2. **Generate each panel at the right aspect ratio.** Use `--ar` to match the panel's shape: a tall establishing panel might be `--ar 2:3`, a wide action strip `--ar 16:9`. Generating at the final shape beats cropping a square down and losing half the composition.
3. **Composite in a layout tool, not in Midjourney.** Drop your panels into Canva, Figma, or any layout editor, arrange them on the grid, add gutters (the white space between panels), and *then* place speech bubbles and lettering on top. Midjourney is your camera; the layout tool is your editing table.
4. **Letter last, and letter outside Midjourney.** Never ask Midjourney to write the dialogue inside the image — it cannot reliably spell, and we will get to why in the next section. Add bubbles and text in the layout step where you control the font and the words.

Done in this order, a four-panel page of Kano comes together in an evening: consistent character from Omni-Reference, deliberate shot variety from your beat plan, clean lettering from the layout tool. That is a real page you can post, not a tech demo.

---

## When Midjourney is the WRONG tool for your comic

This is the section most tutorials skip because it does not sell a subscription. But picking the wrong tool wastes more of your time than any prompt mistake, so here are the moments to walk away from Midjourney on purpose.

**1. When your comic lives or dies on precise lettering and dialogue layout.** If you are making a dialogue-heavy webtoon where bubbles, sound effects, and panel-accurate text are the whole experience, Midjourney is the wrong engine for that part. It cannot place reliable, editable text inside an image, and fighting it is pure wasted credits. Use it only to generate the art, then do every word in a dedicated comic/lettering app like [Clip Studio Paint](https://www.clipstudio.net) — built for panels, gutters, and balloons — or just lay text in Figma. Don't try to make Midjourney letter your page; it can't, and pretending otherwise will sink an afternoon.

**2. When you need airtight commercial-rights certainty.** If this comic is going on merchandise, into a funded Kickstarter, or anywhere a rights dispute would be expensive, the ownership and licensing terms around AI-generated images are still genuinely unsettled, and "the model learned my style" is not the same as "I own this and can defend it." In that situation, don't lean on Midjourney as your final art pipeline — commission a human artist or use art you have clear, written rights to. The legal exposure is not worth the time saved. <!-- FACT-CHECK: keep this framed as general caution, not legal advice; verify Midjourney's current commercial-use terms before publishing and avoid overstating the legal risk -->

**3. When your budget is genuinely zero.** Everything in this guide requires a paid plan — Omni-Reference does not exist on a free tier. If you cannot subscribe right now, do not burn a week trying to force consistency with free workarounds; you will get drift and frustration. Use a free generator to learn composition first (we compare the free and paid options in our [AI image generators comparison](/blog/ai-image-generators-comparison)), and come back to Midjourney when you can fund the workflow that actually holds a character together.

---

## 3 reusable principles for AI character consistency

Strip away Kano and the specific flags, and three principles remain that will carry over to any character, in any AI tool that supports references — today's or next year's.

**1. A locked character is an image, not a sentence.** Words drift; pixels don't. The instant you decide "this is the canonical look," your job shifts from *describing* the character to *referencing* a saved image of them. Any consistency feature you ever touch — `--oref` today, whatever replaces it tomorrow — is just a mechanism for pointing back at that one source-of-truth image.

**2. Separate the two dials: likeness and scene.** Every consistency problem is really one of two problems — the face changed, or the scene is wrong. Keep them on different controls. Hold the reference fixed and tune a weight for likeness; rewrite only the action and camera words for the scene. When you stop adjusting both at once, you stop guessing.

**3. The model is a camera, not a studio.** Midjourney shoots shots. It does not lay out pages, letter dialogue, or guarantee rights. Decide up front which jobs belong to the model (generating consistent art) and which belong to other tools (layout, lettering, legal), and your whole pipeline gets calmer. The creators who ship comics are the ones who stopped asking one tool to do all four.

Lock the character, separate your dials, respect the camera's limits — and the page that used to fall apart by panel two holds together all the way to the end.

---

*Affiliate disclosure: We may earn a commission if you subscribe to Midjourney through our affiliate link, at no additional cost to you.*
