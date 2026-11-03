# HeroKoding — Minimal Retro Terminal Portfolio

Static portfolio redesign for https://herokoding.web.id/

## Design direction

Retro terminal, simple and minimalist:
- One typeface only: JetBrains Mono (4-5 words equivalent weight) — no serif display or mixed families, so it stays readable
- CRT paper (light) and phosphor CRT (dark) themes, auto-switched via `prefers-color-scheme`
- Muted phosphor green accent (`#5fe08f` dark / `#1b7a52` light) + amber status
- Faint scanline overlay, terminal-style hero with typing loop
- No framework or build step
- Compact layout (max-width 860px), tuned for smartphones first-ish layout

## SEO

- Canonical URLs on the custom domain (`herokoding.web.id`, see `CNAME`)
- Per-page `<title>` / `<meta name="description">`, Open Graph, Twitter card
- JSON-LD `Person` schema on the homepage
- `robots.txt` + `sitemap.xml`
- Semantic HTML (sections with `aria-labelledby`, single h1, heading hierarchy)
- All case study pages linked with descriptive anchor text
- Lighthouse: 100 / 100 / 100 (accessibility / best practices / SEO)

## Run

Just open `index.html` in a browser.

For local development, any static server works, for example:

```
python3 -m http.server 8080
```

Then open http://localhost:8080

## Customize

Edit:
- `index.html` — content, projects, experience, contact
- `assets/css/style.css` — visual design (CSS custom properties at the top)
- `assets/js/main.js` — menu toggle, hero typing loop, case-study sliders

## Project case studies

Standalone pages under `projects/`, each with overview, challenge/solution/result, screenshots, tech stack and key features:

- `projects/e-kinerja.html`
- `projects/fms.html`
- `projects/qr-food.html`
- `projects/visitor-management.html`
