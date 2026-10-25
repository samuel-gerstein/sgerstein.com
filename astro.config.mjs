// @ts-check
import { existsSync } from 'node:fs';
import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';

// https://astro.build/config
export default defineConfig({
  site: 'https://sgerstein.com',
  integrations: [
    sitemap({
      // Leave the CV page out of search results until public/cv.pdf exists.
      filter: (page) => !page.endsWith('/cv/') || existsSync('public/cv.pdf'),
    }),
  ],
});
