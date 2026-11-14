# sgerstein.com

Built with [Astro](https://astro.build), deployed to GitHub Pages. Writing lives on Substack and is pulled in automatically.

## Editing with a visual editor (Pages CMS)

Go to https://app.pagescms.org, sign in with GitHub, and open the `sgerstein.com` repo.
Every section of the site shows up as a form (Pages, Publications, Research experience, and so on).
Saving commits to `main`, and the site redeploys in about a minute.

- Uploads (posters, `cv.pdf`, a new headshot) go under **Media**.
- The editor's settings live in `.pages.yml`.
- Saving a list in the editor rewrites that YAML file without comments; that's expected.

## Where to edit things

| What | File |
| --- | --- |
| Name, email, links, Substack URL, photo | `src/site.config.ts` |
| Home headline, bio, interest tags | `src/content/pages/home.md` |
| Research statement | `src/content/pages/research.md` |
| Intros for other pages | `src/content/pages/*.md` |
| Publications | `src/content/publications.yaml` |
| Research experience | `src/content/research.yaml` |
| Projects | `src/content/projects.yaml` |
| Teaching & service | `src/content/teaching.yaml` |
| News items on the home page | `src/content/news.yaml` |
| Op-eds and press coverage | `src/content/media.yaml` |
| Honors & awards | `src/content/honors.yaml` |
| Education | `src/content/education.yaml` |
| Posters | `public/posters/` (link them from `research.yaml`) |
| CV PDF | `public/cv.pdf` |
| Headshot | `public/headshot.jpg` (then set `photo` in `src/site.config.ts`) |
| Personal page text and hobby tags | `src/content/pages/personal.md` |
| Personal photos | files in `src/assets/photos/`, listed in `src/content/photos.yaml` |

Search for `TODO` (or see the field descriptions in Pages CMS) to find what still needs your input.

The `.md` files are Markdown: `*italic*`, `**bold**`, `[link text](https://...)`, blank line between paragraphs.
The `.yaml` files are lists; copy an existing entry and change the values. Each entry needs a unique `id`.
If you mistype a field or break the YAML formatting (most often an unquoted value containing `: `), the build stops, names the file, and the live site stays as it was.

## Previewing locally

```bash
npm install
npm run dev
```

Then open http://localhost:4321. Changes appear as you save.

## Publishing

Push to the `main` branch on GitHub. The workflow in `.github/workflows/deploy.yml` builds and deploys the site. It also rebuilds every day at 12:00 UTC to pick up new Substack posts, and you can run it by hand from the repo's **Actions** tab.

## Blog posts

Write on Substack as usual. Set `substack` in `src/site.config.ts` to your Substack URL; the site reads its RSS feed at build time and lists posts on the home and Writing pages, linking to Substack.
