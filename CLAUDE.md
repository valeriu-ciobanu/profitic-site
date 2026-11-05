# Profitic static site: rules for Claude

Plain HTML/CSS/JS site. All pages live in the root folder as `<page>.html`. No build step, no framework.

## CSS rules (always follow)

1. **The homepage (`index.html`, design v97) is the basis of the site.** Every page follows its look. Before
   writing any CSS, check `assets/css/style.css` and `style-guide.html`, and reuse:
   - Tokens: `--ink`, `--muted`, `--line`, `--violet`/`--blue68`, `--violet-soft`, `--surface`, `--paper68`,
     `--rule68`, `--radius`, `--mono68` (IBM Plex Mono). Font: Poppins.
   - Layout: `.container`, `.section` (+ `.section-soft` / `.section-paper` / `.section-dark`), `.two-col`
   - Section heads: `.section-topline` › `.eyebrow` + `.section-number`; `.section-intro` with `h2.section-title`
   - Labels: `.eyebrow`, `.mini-label`, `.kicker`, `.status-dot`
   - Buttons: `.button.cta-trial` (Start Free Trial, a plain link to `idea-collection-free-trial-form.html` — no popup), `.button.cta-expert`,
     `.button`, `.button-small`, `.text-link`; group with `.hero-actions` / `.closing-actions`
   - Components: `.page-hero` (+ `svg.hero68-lines`), `.capability-grid.three-col`, `.prose` (+ `.lead`),
     `.check-list`, `.stat`, `.card-grid.four-col` › `.card`, `.big-quote`, `.media-frame`, `.steps-list`,
     `.faq37`, `.start-section`, `.closing-section`, `.split-panel`, `a.video[data-youtube]`,
     `data-video-modal="ID"` (video popup)
   - Header and footer come from one template (`site97.py` in the build scripts); copy them unchanged.
2. **Don't duplicate or override what already exists.** Don't redefine fonts, colors, buttons, containers,
   headings or section spacing per page. If a page needs a different value, use an existing variant or token.
3. **`style.css` uses cascade layers:** `tokens` → `base` → `components` → `utilities` (later layers win).
   Put each new rule in the matching layer: reusable UI in `components`, single-purpose helpers in `utilities`. Page `<style>` blocks are unlayered and
   always override `style.css`.
   **Shared CSS goes in `assets/css/style.css`.** If a new style could be used by more than one page, add it
   there as a general component (not named after one page), then use it from the page.
4. **Page-specific CSS goes in that page's own file.** Put it in a `<style>` block in the `<head>` of
   `<page>.html`, after the `style.css` link. Scope every rule under a page wrapper class on `<main>`
   (for example `<main id="main" class="rm">` and `.rm .some-thing { … }`) so it can't affect the header,
   footer or other pages. Don't create separate per-page `.css` files.
5. **Write as little page-specific CSS as possible.** Only add it for things `style.css` can't do. If the
   same page-specific rule shows up on a second page, move it into `style.css` (rule 3).

6. **Minimum font size is 13px** for every element, including product mockups, labels and SVG text.
   Never set a smaller `font-size` (px, rem or a clamp/calc that can go below it); wrap fluid sizes as
   `max(13px, …)`. Eyebrows are 14px.

7. **Keep `style-guide.html` current.** When you add or change a shared component in `style.css`, add or
   update its example on the style guide page (noindex, linked in the nav for review).

## JS rules

- Shared behavior (header menu, video popup, inline YouTube, footer year) lives in
  `assets/js/main.js`. Reuse it; don't reimplement it per page.
- Page-specific JS goes in a `<script>` block at the end of that page's `<body>`, after the `main.js`
  include, wrapped in an IIFE `(function () { … })();` so it creates no globals.

## Cache busting

- Every local CSS/JS reference carries a version: `assets/css/style.css?v=<hash>`.
- After changing any `.css` or `.js` file, run `node cache-bust.mjs` from the site folder. It updates the
  `?v=` hash in every `.html` file (only when the file's content changed).
- New pages: link CSS/JS normally, then run the script to add the version.

## Paths and links

- Use relative paths only: `assets/...`, `index.html`, `profitic-methodology.html`. Never start a path with `/`.
- Link between pages with the `.html` file name.
- Full `https://` URLs only for external sites, and for canonical / `og:` tags.

## SEO and GEO

- Analytics: the Google tag (GA4 `G-1CHJ2WJDCV`) and HubSpot tracking are in the shared `<head>` of every page.

- Every page head comes from the shared template: unique `<title>` and meta description, canonical URL,
  Open Graph and Twitter tags, and a JSON-LD `@graph` (Organization + WebSite on every page, plus WebPage /
  BreadcrumbList, and page types such as SoftwareApplication, FAQPage, Article, ContactPage).
- Public pages are `index, follow` and listed in `sitemap.xml`. Form, campaign and internal pages
  (free-trial form, feedback form, design session, resourcing feedback, style guide, 404) are `noindex` and
  left out of the sitemap.
- `robots.txt` allows search engines and AI crawlers (GPTBot, ClaudeBot, PerplexityBot, Google-Extended…).
- `llms.txt` is a plain-language summary of Profitic and its key pages for AI assistants; update it when
  public pages or key facts change.
- Write headings and copy as clear, self-contained statements (who Profitic is for, what it does, numbers with
  sources); FAQ answers should stand on their own.

## New pages

- Start from an existing page's `<head>`, header and footer. Update `<title>`, description, canonical and
  `og:` tags.
- Add the page to `sitemap.xml`.
- Check it at desktop (1440px) and phone (390px) widths: no sideways scrolling, no console errors.
