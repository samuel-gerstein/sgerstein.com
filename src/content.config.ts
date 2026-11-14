// Defines the shape of everything in src/content/. If you mistype a field name
// in one of those files, the build stops and tells you which file and field.
import { readFileSync } from 'node:fs';
import { defineCollection } from 'astro:content';
import { file, glob } from 'astro/loaders';
import { z } from 'astro/zod';
import { parse } from 'yaml';

// Loads a YAML list and remembers each entry's position, so pages can show
// entries in the same order you wrote them. Entries without an id get one from
// their position, so entries added in the Pages CMS editor don't need one.
const yamlList = (path: string) => {
  // Astro only logs YAML syntax errors and builds the page without that section,
  // so check the file here, where an error stops the build and the live site stays as it was.
  try {
    parse(readFileSync(path, 'utf8'));
  } catch (err) {
    throw new Error(`${path} has a formatting error. Values containing ": " need quotes.\n${err}`);
  }
  return file(path, {
    parser: (text) =>
      (parse(text) ?? []).map((entry: Record<string, unknown>, order: number) => ({
        ...entry,
        id: entry.id ? String(entry.id) : `item-${order + 1}`,
        order,
      })),
  });
};

// Form editors may save an empty field as null or "", so optional fields accept both.
const optText = z
  .string()
  .nullish()
  .transform((v) => v || undefined);
const looseText = z.preprocess((v) => (v == null ? '' : String(v)), z.string());
const textList = z
  .array(z.string().nullish())
  .nullish()
  .transform((v) => (v ?? []).filter((item): item is string => !!item));
const flag = z
  .boolean()
  .nullish()
  .transform((v) => v ?? false);
const links = z
  .record(z.string(), z.string().nullish())
  .nullish()
  .transform((v) => Object.fromEntries(Object.entries(v ?? {}).filter(([, url]) => url)) as Record<string, string>);

// Long-form prose for each page (bio, research statement, intros).
const pages = defineCollection({
  loader: glob({ pattern: '*.md', base: './src/content/pages' }),
  schema: z.object({
    title: optText,
    headline: optText,
    interests: textList,
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
    status: optText,
    award: optText,
    featured: flag,
    links,
  }),
});

const research = defineCollection({
  loader: yamlList('src/content/research.yaml'),
  schema: z.object({
    order: z.number(),
    title: z.string(),
    org: z.string(),
    dates: looseText,
    summary: z.string(),
    details: textList,
    award: optText,
    featured: flag,
    links,
  }),
});

const projects = defineCollection({
  loader: yamlList('src/content/projects.yaml'),
  schema: z.object({
    order: z.number(),
    title: z.string(),
    context: optText,
    summary: z.string(),
    tags: textList,
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
    dates: looseText,
    summary: optText,
  }),
});

const news = defineCollection({
  loader: yamlList('src/content/news.yaml'),
  schema: z.object({
    date: z.coerce.date(),
    text: z.string(),
    link: optText,
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
    summary: optText,
  }),
});

const honors = defineCollection({
  loader: yamlList('src/content/honors.yaml'),
  schema: z.object({
    order: z.number(),
    title: z.string(),
    org: optText,
    note: optText,
    year: looseText,
  }),
});

const education = defineCollection({
  loader: yamlList('src/content/education.yaml'),
  schema: z.object({
    order: z.number(),
    school: z.string(),
    degree: z.string(),
    dates: looseText,
    details: textList,
  }),
});

const photos = defineCollection({
  loader: yamlList('src/content/photos.yaml'),
  schema: z.object({
    order: z.number(),
    image: z.string(),
    caption: optText,
    album: optText,
    alt: optText,
  }),
});

export const collections = { pages, publications, research, projects, teaching, news, media, honors, education, photos };
