// Site-wide settings: your name, links, and where things live.
// Your actual writing (bio, research statement, lists) lives in src/content/.

export const site = {
  name: 'Sam Gerstein',
  // Shown under your name in search results and link previews.
  description:
    'Sam (Samuel) Gerstein: data engineer at Bloomberg and researcher working on AI governance, forecasting, and community-centered infrastructure.',
  url: 'https://sgerstein.com',

  // Email is split so scrapers can't read it straight from the HTML.
  email: { user: 'sam', domain: 'sgerstein.com' },

  // TODO: your Substack address, e.g. 'https://samuelgerstein.substack.com'.
  // Leave empty ('') and the Writing page shows a "coming soon" note instead.
  substack: '',

  // Put a square photo at public/headshot.jpg and set this to '/headshot.jpg'.
  // Leave empty to show your initials instead.
  photo: '/headshot.jpg',

  // Links shown on the home page and in the footer. Remove any you don't want.
  // TODO: add ORCID once you have it; empty ones are hidden.
  links: {
    scholar: 'https://scholar.google.com/citations?user=crI5YrYAAAAJ',
    orcid: '',
    github: 'https://github.com/samuel-gerstein',
    linkedin: 'https://www.linkedin.com/in/samuelgerstein',
  },

  nav: [
    { label: 'Research', href: '/research/' },
    { label: 'Projects', href: '/projects/' },
    { label: 'Writing', href: '/writing/' },
    { label: 'Teaching', href: '/teaching/' },
    { label: 'CV', href: '/cv/' },
    { label: 'Personal', href: '/personal/' },
  ],
};
