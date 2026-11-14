// @ts-check
import { existsSync } from 'node:fs';
import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';
import { hasPersonal } from './src/lib/personal.ts';

// https://astro.build/config
export default defineConfig({
  site: 'https://sgerstein.com',
  integrations: [
    sitemap({
      // Leave the CV and Personal pages out of search results until they have content.
      filter: (page) =>
        (!page.endsWith('/cv/') || existsSync('public/cv.pdf')) && (!page.endsWith('/personal/') || hasPersonal),
    }),
  ],
});
