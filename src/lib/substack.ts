// Fetches your Substack's RSS feed when the site is built. New posts show up
// on the next build, which GitHub Actions runs daily (see .github/workflows/deploy.yml).
import { XMLParser } from 'fast-xml-parser';
import { site } from '../site.config';

export interface Post {
  title: string;
  url: string;
  date: Date;
  description: string;
}

let cached: Promise<Post[]> | undefined;

export function getPosts(): Promise<Post[]> {
  cached ??= fetchPosts();
  return cached;
}

async function fetchPosts(): Promise<Post[]> {
  if (!site.substack) return [];
  const feedUrl = new URL('/feed', site.substack);
  try {
    const res = await fetch(feedUrl);
    if (!res.ok) throw new Error(`HTTP ${res.status}`);
    const xml = await res.text();
    const parsed = new XMLParser({ ignoreAttributes: true }).parse(xml);
    const items = [parsed?.rss?.channel?.item ?? []].flat();
    return items
      .map((item: Record<string, unknown>) => ({
        title: text(item.title),
        url: text(item.link),
        date: new Date(text(item.pubDate)),
        description: stripHtml(text(item.description)),
      }))
      .filter((p) => p.title && p.url)
      .sort((a, b) => b.date.getTime() - a.date.getTime());
  } catch (err) {
    // Don't fail the whole build if Substack is down; just show no posts this time.
    console.warn(`[substack] Could not load ${feedUrl}: ${err}`);
    return [];
  }
}

function text(value: unknown): string {
  return value == null ? '' : String(value).trim();
}

function stripHtml(html: string): string {
  return html.replace(/<[^>]*>/g, '').replace(/\s+/g, ' ').trim();
}
