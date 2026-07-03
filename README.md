# Aditya Parashar — Portfolio

A static, cinematic dark-theme portfolio. No backend, no database, no build step —
just HTML/CSS/JS you can deploy to GitHub Pages, Netlify, Cloudflare Pages, or
Vercel by uploading the folder as-is.

## Structure

```
index.html          Page shell — nav, hero, section containers, command palette
404.html             Branded not-found page (used by Netlify/Vercel configs below)
css/style.css        Design tokens (colors, type, motion) + custom effects
                      (glass, radar signature, custom cursor, timeline)
js/data.js            ALL editable content lives here. Edit this file only.
js/main.js            Renders data.js into the DOM + animation/interaction logic
assets/               Résumé PDF, image folders, favicon/app icon set
site.webmanifest      PWA manifest (installable, theming, icons)
robots.txt            Crawler rules
sitemap.xml           Sitemap stub
netlify.toml          Netlify headers, caching, custom 404
vercel.json           Vercel headers + caching
```

## Editing content

Everything you see on the site — hero copy, project descriptions, timeline
entries, skills, awards, socials — is defined in `js/data.js`. Change the
values there; you never need to touch `index.html`.

## Design system

- **Palette:** void black (`#050505`) base, electric blue (`#4f7cff`) primary
  accent, with emerald/purple/gold as secondary category accents.
- **Type:** Space Grotesk (display), Inter (body), JetBrains Mono (data/labels).
- **Signature element:** a radar sweep — pulled directly from *Project Iron
  Sky* (the Arduino radar-guided launcher) — used as the scroll-progress
  indicator (bottom-right) and as the hero backdrop.

## What's live right now

- Home, About, Education, Experience, Projects, Skills, Awards,
  Certifications, Contact — populated with your actual résumé content.
- Real social links (GitHub, LinkedIn, LeetCode, Google Developer profile),
  pulled from the hyperlinks in your uploaded résumé PDF.
- Résumé download — the PDF you uploaded is bundled at
  `assets/Aditya_Parashar_Resume.pdf` and wired to every "Resume" button.
- Live GitHub stats widgets (contribution stats + top languages) using your
  real GitHub username, with a graceful fallback message if the image
  service is unreachable.
- Live LeetCode stats (solved count, easy/medium/hard breakdown, global
  ranking, acceptance rate) fetched client-side from a public LeetCode
  stats API (`leetcode-stats.tashif.codes`), with a fallback that links
  straight to your profile if the API is ever down.
- Command palette (`⌘K` / `Ctrl+K`), custom cursor, magnetic buttons, GSAP
  scroll reveals, animated counters, and `prefers-reduced-motion` support.

## What's intentionally left out (for now)

Your résumé doesn't currently include content for these, so rather than
invent placeholder credentials, I left them out of v1:

- **Research / Publications / Patents / Book Chapters / Conferences** —
  add a `research` array to `data.js` and a matching section in
  `index.html` once you have real papers or a patent filing to show.
- **Startup section** — same approach, once there's a real venture to show.
- **Photography / Videography / Gallery** — the spec calls for a masonry
  gallery with lightbox; I'd rather wire that up once you send real photos
  than ship stock placeholders on a personal portfolio.
- **Blog** — needs real posts (Markdown or otherwise) to be worth shipping;
  happy to scaffold a `/blog` folder with a simple static Markdown-to-HTML
  reader once you have 2–3 posts drafted.
- **Google Scholar, ORCID, YouTube, Medium, Instagram embeds** — GitHub and
  LeetCode are both wired now. The rest need either a public API key or
  service-specific embed code, and most also need real content behind
  them (published papers, videos, posts) to be worth shipping.
- **PWA / offline support** — straightforward to add (manifest + service
  worker) once the content set is more final, so caching doesn't go stale.

## Before you deploy

Two placeholders need your real domain once you know it (search engines
only — the site works fine without this):

- `robots.txt` — the `Sitemap:` line
- `sitemap.xml` — the `<loc>` value
- `index.html` — the `"url"` field in the JSON-LD block near the top of `<head>`

Everything else — favicons, app icons, manifest, Open Graph tags, security
headers, caching rules, and a branded 404 page — is already wired for
Netlify, Vercel, Cloudflare Pages, and GitHub Pages with zero config.

## Next steps

Tell me which of the above to tackle next, or hand me new content (photos,
a paper, a startup deck) and I'll wire it straight into `data.js` and the
matching section.
