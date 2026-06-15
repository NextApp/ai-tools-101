// @ts-check
import { defineConfig } from 'astro/config';
import tailwindcss from '@tailwindcss/vite';
import sitemap from '@astrojs/sitemap';

const siteURL = 'https://www.ai-tools-101.com';

// https://astro.build/config
export default defineConfig({
  site: siteURL,
  output: 'static',
  redirects: {
    '/blog': '/',
  },
  integrations: [
    sitemap({
      filter: (page) => !page.includes('/404'),
      changefreq: 'weekly',
      priority: 0.7,
      serialize(item) {
        if (item.url === siteURL || item.url === `${siteURL}/`) {
          return { ...item, priority: 1.0, changefreq: 'daily' };
        }
        if (/\/blog\/[^/]+\/$/.test(item.url)) {
          return { ...item, priority: 0.8 };
        }
        if (/\/about\/?$|\/privacy-policy\/?$|\/contact\/?$/.test(item.url)) {
          return { ...item, priority: 0.5 };
        }
        if (item.url.includes('/tags')) {
          return { ...item, priority: 0.3 };
        }
        return item;
      },
    }),
  ],
  vite: {
    plugins: [tailwindcss()],
  },
  markdown: {
    shikiConfig: {
      theme: 'github-dark',
    },
  },
});
