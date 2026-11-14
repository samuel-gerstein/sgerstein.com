import type { ImageMetadata } from 'astro';

// Every photo in src/assets/photos/, keyed by lowercase file name. Astro resizes
// these at build time and strips their metadata (including GPS location) from
// the published copies.
const files = import.meta.glob<{ default: ImageMetadata }>(
  '/src/assets/photos/*.{jpg,jpeg,png,webp,avif,JPG,JPEG,PNG,WEBP,AVIF}',
  { eager: true },
);
const byName = new Map(
  Object.entries(files).map(([path, mod]) => [path.split('/').pop()!.toLowerCase(), mod.default]),
);

// photos.yaml may store a bare file name or a full path; match on the file name.
export function photoFile(path: string): ImageMetadata {
  const name = path.split('/').pop()!.toLowerCase();
  const image = byName.get(name);
  if (!image) {
    throw new Error(
      `photos.yaml lists "${path}", but src/assets/photos/ has no JPG, PNG, WebP or AVIF file by that name. Convert HEIC photos to JPG before uploading.`,
    );
  }
  return image;
}
