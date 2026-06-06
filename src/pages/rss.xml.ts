import rss from '@astrojs/rss';
import { getCollection } from 'astro:content';
import type { APIContext } from 'astro';

export async function GET(context: APIContext) {
  const posts = await getCollection('posts', ({ data }) => !data.draft);
  return rss({
    title: 'AI Tool Guide',
    description: 'Step-by-step tutorials and guides for the best AI tools. Learn ChatGPT, Midjourney, Copilot, and more.',
    site: context.site!,
    items: posts.map((post) => ({
      title: post.data.title,
      description: post.data.description,
      pubDate: post.data.pubDate,
      link: `/blog/${post.id.replace('.md', '')}`,
    })),
    customData: `<language>en-us</language>`,
  });
}
