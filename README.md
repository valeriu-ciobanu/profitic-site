# Profitic website

Static HTML/CSS/JS site for profitic.com. No build step: every page is a plain `.html` file in this folder.

- Design basis: the homepage (`index.html`); shared styles in `assets/css/style.css`, shared script in `assets/js/main.js`.
- Rules for editing (CSS layers, page-specific code, paths, cache busting, SEO/GEO): see `CLAUDE.md`.
- After changing any CSS or JS, run `node cache-bust.mjs` to update the `?v=` versions in the pages.
- Internal style guide: `style-guide.html` (noindex).

## Deploy
Any static host works (Vercel, Netlify, Cloudflare Pages, S3). Publish this folder as-is with no build command.

## Local preview
`npx serve .` (or `python -m http.server`) from this folder.
