# Profitic website

Static HTML/CSS/JS site for profitic.com. No build step: every page is a plain `.html` file in this folder.

- Design basis: the homepage (`index.html`); shared styles in `assets/css/style.css`, shared script in `assets/js/main.js`.
- Rules for editing (CSS layers, page-specific code, paths, SEO/GEO): see `CLAUDE.md`.
- Internal style guide: `style-guide.html` (noindex).

## Deploy
GitHub Pages: publish the `main` branch, root folder, with no build command. Pages link with clean URLs
(`/see-a-demo` is served from `see-a-demo.html`).

## Local preview
`npx serve .` from this folder (it serves clean URLs too).
