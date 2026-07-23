# GT Portugal — Site Prototype

A Next.js 14 replica of [gtportugal.com](https://gtportugal.com), used as a base for building a new design system and eventual production site.

## Stack

| Tool | Version | Purpose |
|---|---|---|
| Next.js 16 | ^16.2 | Framework, SSR/SSG, routing, SEO |
| React 19 | ^19.2 | UI |
| Sanity | — | CMS (to be integrated) |
| GSAP | — | Animations (to be integrated) |
| Vercel | — | Hosting |

## Getting started

```bash
npm install
npm run dev
```

App runs at `http://localhost:3000`.

## Project structure

```
app/                     # Next.js App Router — one folder per route
  layout.js              # Root layout: metadata, fonts, Header, Footer
  globals.css            # All design tokens + reset + layout utilities
  page.js                # Home (/)
  textiles/page.js       # /textiles
  footwear/page.js       # /footwear
  homeware/page.js       # /homeware
  sustainability/page.js # /sustainability
  about/page.js          # /about
components/
  layout/                # Header, Footer
  ui/                    # Button, Card, Stat, Testimonial
  sections/              # HeroSection, StatsSection, TestimonialsSection, ContactSection
```

## Routes & SEO

Every page exports a `metadata` object for Next.js to inject `<title>` and `<meta description>` automatically. Template: `%s — GT Portugal`.

| Path | Title |
|---|---|
| `/` | GT Portugal — Responsible Development + Production |
| `/textiles` | Textiles — GT Portugal |
| `/footwear` | Footwear — GT Portugal |
| `/homeware` | Homeware — GT Portugal |
| `/sustainability` | Sustainability — GT Portugal |
| `/about` | About — GT Portugal |

## Design system

See [DESIGN_SYSTEM.md](./DESIGN_SYSTEM.md) for full token and component documentation.

## Next steps

- [ ] Integrate Sanity CMS for editable content
- [ ] Add GSAP + ScrollTrigger animations
- [ ] Deploy to Vercel
- [ ] Add Open Graph images per page
- [ ] Homeware page — add real content once available
