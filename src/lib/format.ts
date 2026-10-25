const monthYear = new Intl.DateTimeFormat('en-US', { month: 'short', year: 'numeric', timeZone: 'UTC' });

export function formatMonth(date: Date): string {
  return monthYear.format(date);
}

function escapeHtml(text: string): string {
  return text.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
}

// Turns "a *word* here" into "a <em>word</em> here" for accent-colored headlines.
export function accentHtml(text: string): string {
  return escapeHtml(text).replace(/\*(.+?)\*/g, '<em>$1</em>');
}

// Labels for link keys used in the YAML files.
const linkLabels: Record<string, string> = {
  paper: 'Paper',
  preprint: 'Preprint',
  pdf: 'PDF',
  code: 'Code',
  slides: 'Slides',
  poster: 'Poster',
  bibtex: 'BibTeX',
  demo: 'Demo',
  writeup: 'Write-up',
  video: 'Video',
};

export function linkLabel(key: string): string {
  return linkLabels[key] ?? key.charAt(0).toUpperCase() + key.slice(1);
}
