import { readFileSync } from 'node:fs';
import { parse } from 'yaml';

// The Personal page shows in the menu and sitemap only once it has something on it:
// text, hobby tags, or at least one photo.
function pageHasContent() {
  const text = readFileSync('src/content/pages/personal.md', 'utf8');
  const match = text.match(/^---\n([\s\S]*?)\n---\n?([\s\S]*)$/);
  const front = match ? (parse(match[1]) ?? {}) : {};
  const body = match ? match[2] : text;
  return body.trim().length > 0 || (front.interests ?? []).some(Boolean);
}

function photoCount() {
  return (parse(readFileSync('src/content/photos.yaml', 'utf8')) ?? []).length;
}

export const hasPersonal = pageHasContent() || photoCount() > 0;
