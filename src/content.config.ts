// Defines the shape of everything in src/content/. If you mistype a field name
// in one of those files, the build stops and tells you which file and field.
import { readFileSync } from 'node:fs';
import { defineCollection } from 'astro:content';
import { file, glob } from 'astro/loaders';
import { z } from 'astro/zod';
import { parse } from 'yaml';

// Loads a YAML list and remembers each entry's position, so pages can show
// entries in the same order you wrote them.
const yamlList = (path: string) => {
  // Astro only logs YAML syntax errors and builds the page without that section,
  // so check the file here, where an error stops the build and the live site stays as it was.
  try {
    parse(readFileSync(path, 'utf8'));
  } catch (err) {
    throw new Error(`${path} has a formatting error. Values containing ": " need quotes.\n${err}`);
  }
  return file(path, {
    parser: (text) => (parse(text) ?? []).map((entry: Record<string, unknown>, order: number) => ({ ...entry, order })),
  });
};

const links = z.record(z.string(), z.string()).optional();

// Long-form prose for each page (bio, research statement, intros).
const pages = defineCollection({
  loader: glob({ pattern: '*.md', base: './src/content/pages' }),
  schema: z.object({
    title: z.string().optional(),
    headline: z.string().optional(),
    interests: z.array(z.string()).optional(),
  }),
});

const publications = defineCollection({
  loader: yamlList('src/content/publications.yaml'),
  schema: z.object({
    order: z.number(),
    title: z.string(),
    authors: z.array(z.string()),
    venue: z.string(),
    year: z.number(),
    status: z.string().optional(),
    award: z.string().optional(),
    featured: z.boolean().default(false),
    links,
  }),
});

const research = defineCollection({
  loader: yamlList('src/content/research.yaml'),
  schema: z.object({
    order: z.number(),
    title: z.string(),
    org: z.string(),
    dates: z.coerce.string(),
    summary: z.string(),
    details: z.array(z.string()).optional(),
    award: z.string().optional(),
    featured: z.boolean().default(false),
    links,
  }),
});

const projects = defineCollection({
  loader: yamlList('src/content/projects.yaml'),
  schema: z.object({
    order: z.number(),
    title: z.string(),
    context: z.string().optional(),
    summary: z.string(),
    tags: z.array(z.string()).default([]),
    links,
  }),
});

const teaching = defineCollection({
  loader: yamlList('src/content/teaching.yaml'),
  schema: z.object({
    order: z.number(),
    kind: z.enum(['teaching', 'service']),
    role: z.string(),
    org: z.string(),
    dates: z.coerce.string(),
    summary: z.string().optional(),
  }),
});

const news = defineCollection({
  loader: yamlList('src/content/news.yaml'),
  schema: z.object({
    date: z.coerce.date(),
    text: z.string(),
    link: z.string().optional(),
  }),
});

const media = defineCollection({
  loader: yamlList('src/content/media.yaml'),
  schema: z.object({
    kind: z.enum(['writing', 'press']),
    title: z.string(),
    outlet: z.string(),
    date: z.coerce.date(),
    url: z.string(),
    summary: z.string().optional(),
  }),
});

const honors = defineCollection({
  loader: yamlList('src/content/honors.yaml'),
  schema: z.object({
    order: z.number(),
    title: z.string(),
    org: z.string().optional(),
    note: z.string().optional(),
    year: z.coerce.string(),
  }),
});

export const collections = { pages, publications, research, projects, teaching, news, media, honors };
