import { getCollection } from 'astro:content';

// Collection entries in the order they appear in their YAML file.
export async function getOrdered<C extends 'publications' | 'research' | 'projects' | 'teaching' | 'honors' | 'education'>(name: C) {
  const entries = await getCollection(name);
  return entries.sort((a, b) => a.data.order - b.data.order);
}
