# Project Specs — GT Portugal

> This file is updated before every new feature or task. No code is written until it is approved.

---

## What the app is

A new production website for GT Portugal — a Portuguese manufacturer of garments, footwear, and homeware for world-leading brands. The site replaces the current [gtportugal.com](https://gtportugal.com), which is built on Plone (a Python CMS).

## Who uses it

- **Visitors:** Procurement managers, sourcing directors, and brand executives at international fashion and lifestyle companies looking for a manufacturing partner.
- **Editors:** GT Portugal's internal team, who need to update content (news, product categories, testimonials) without touching code — via Sanity CMS.

---

## Tech stack

| Layer | Tool | Status |
|---|---|---|
| Framework | Next.js 16 (App Router) | ✅ In place |
| UI | React 19 | ✅ In place |
| Styles | CSS Modules + CSS custom properties | ✅ In place |
| CMS | Sanity | 🔜 Planned |
| Animations | GSAP + ScrollTrigger | 🔜 Planned |
| Hosting | Vercel | 🔜 Planned |

---

## Pages & routes

| Route | Page | Status |
|---|---|---|
| `/` | Home | ✅ Built |
| `/textiles` | Textiles | ✅ Built |
| `/footwear` | Footwear | ✅ Built |
| `/homeware` | Homeware | ⚠️ Placeholder — real content needed |
| `/sustainability` | Sustainability | ✅ Built |
| `/about` | About GT Portugal | ✅ Built |

---

## Data & content

Currently all content is hardcoded in the page files. Once Sanity is integrated:
- Testimonials → Sanity document type
- Product categories (Textiles, Footwear, Homeware) → Sanity document type
- Stats/metrics → Sanity singleton
- Page hero copy → Sanity per-page fields

---

## What "done" looks like for the full project

- [ ] All pages built and visually matching the reference site
- [ ] Content editable via Sanity CMS (no code changes needed to update text)
- [ ] GSAP scroll animations on key sections (hero, stats, cards)
- [ ] SEO: metadata, Open Graph images, sitemap, robots.txt
- [ ] Deployed and live on Vercel with a custom domain
- [ ] Homeware page completed with real content

---

## Current task

_Update this section before starting any new task._

**Task:** Homepage — Clients logo grid section.
**Status:** Complete. 24 brands, 6×4 desktop grid, full responsive, grid-line border system.
**Next:** Refine Stats, Testimonials, Contact sections on homepage, then move to other pages.
