#!/usr/bin/env python3
"""Generate Pinterest pin images from article frontmatter using headless browser.

Usage:
  python3 scripts/gen-pins.py                          # generate all pins
  python3 scripts/gen-pins.py --limit 5                 # generate first 5
  python3 scripts/gen-pins.py --slug chatgpt-review      # generate one article
"""

import os, sys, re, json, argparse, time, subprocess

POSTS_DIR = "src/content/posts"
PINS_DIR = "public/pins"
TEMPLATE = "scripts/pin-template.html"


def get_articles(posts_dir, slug_filter=None):
    articles = []
    for fname in sorted(os.listdir(posts_dir), reverse=True):
        if not fname.endswith('.md'):
            continue
        filepath = os.path.join(posts_dir, fname)
        with open(filepath) as f:
            content = f.read()
        front = content.split('---', 2)[1]
        title = re.search(r'title:\s*"?(.+?)"?\s*\n', front)
        desc = re.search(r'description:\s*"?(.+?)"?\s*\n', front)
        tags = re.search(r'tags:\s*\[(.*?)\]', front, re.DOTALL)

        slug = fname.replace('.md', '')
        if slug_filter and slug != slug_filter:
            continue

        articles.append({
            'file': fname, 'slug': slug,
            'title': title.group(1).strip() if title else '',
            'description': desc.group(1).strip() if desc else '',
            'tags': [t.strip().strip("'\"") for t in tags.group(1).split(',')] if tags else [],
        })
    return articles


def get_category(tags):
    cats = ['AI Chat', 'AI Writing', 'AI Image', 'AI Coding', 'AI Video', 'AI Voice', 'AI Research', 'AI Productivity']
    for c in cats:
        if c in tags: return c.upper()
    return 'AI TOOLS'


def generate_pin(article, template_path, output_path):
    with open(template_path) as f:
        html = f.read()

    # Replace placeholders
    title = article['title']
    if len(title) > 70:
        title = title[:67] + '...'
    desc = article['description']
    if len(desc) > 120:
        desc = desc[:117] + '...'
    badge = get_category(article['tags'])

    html = html.replace('>Article Title<', f'>{title}<')
    html = html.replace('>Article description goes here<', f'>{desc}<')
    html = html.replace('>AI TOOLS<', f'>{badge}<')

    tmp_html = output_path.replace('.png', '.html')
    with open(tmp_html, 'w') as f:
        f.write(html)

    print(f"  Generated: {output_path}")
    return True


def main():
    parser = argparse.ArgumentParser()
    parser.add_argument('--limit', type=int, default=0)
    parser.add_argument('--slug', type=str, default='')
    args = parser.parse_args()

    # Ensure we're in the right directory
    if not os.path.exists(POSTS_DIR):
        if os.path.exists(f"../{POSTS_DIR}"):
            os.chdir('..')
        else:
            print("Error: Run from the ai-tools-101 project root")
            sys.exit(1)

    articles = get_articles(POSTS_DIR, args.slug)
    if args.limit > 0:
        articles = articles[:args.limit]

    os.makedirs(PINS_DIR, exist_ok=True)

    print(f"Generating {len(articles)} pins...")
    for article in articles:
        output_path = os.path.join(PINS_DIR, f"{article['slug']}.html")
        generate_pin(article, TEMPLATE, output_path)

    print(f"\nDone! Generated {len(articles)} pin HTML files in {PINS_DIR}")
    print("Next: Open each HTML in a browser and screenshot at 1000x1500.")
    print("Or use Puppeteer: npx puppeteer screenshots scripts/screenshot-pins.js")


if __name__ == '__main__':
    main()
