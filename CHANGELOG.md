# Changelog

All notable changes to this project are documented here.
Format follows [Keep a Changelog](https://keepachangelog.com/en/1.0.0/).

---

## [Unreleased]

### Planned
- Sanity CMS integration for editable content
- GSAP + ScrollTrigger animations
- Time-based theme switching logic (simple: fixed hours)
- Manual theme toggle UI component
- Vercel deployment
- Open Graph images per page
- Homeware page real content

---

## [0.9.1] — 2026-05-15

### Changed
- **Homeware page archived** — route `/homeware` now redirects to `/`. Original page preserved at `_archive/homeware/page.js`. Restore instructions in that file's header comment.
- **Header nav** — removed Homeware link (now: Textiles / Footwear / Sustainability / About GT Portugal)

---

## [0.9.0] — 2026-05-15

### Added
- **`PageHero`** — inner-page hero component (all 4 section pages)
  - Static image background with gradient overlay (dark bottom → lighter top)
  - `headline: string[]` — last array item renders in `--color-brand-accent` (red), rest white
  - `eyebrow` label above headline; `image` / `alt` for bg image; `#1a1a1a` fallback
  - Always applies `data-theme="dark"`; min-height 400px desktop → 220px mobile
- **`Breadcrumbs`** (`components/ui/`) — nav bar below every inner-page hero
  - Home icon auto-prepended; `items` prop supports 1–3+ levels
  - `aria-label="Breadcrumb"`, `aria-current="page"` on current item
- **`PageIntro`** — centered eyebrow + heading + description + optional 3-col text columns
  - `bg` prop: default / subtle / muted; used on textiles, footwear, sustainability, about
- **`ProductGrid`** — checkerboard product category grid for textiles & footwear
  - 4-column CSS grid; alternating image-left / text-left per row-pair
  - Dark tile bg uses new `--color-bg-tile` token
  - Responsive: 4-col → 2-col (≤1024px) → 1-col (≤640px)
- **`EditorialSection`** — content section: eyebrow + heading + body paragraphs
  - `bg` prop: default / subtle / muted / dark; `align`: center / left
  - Used for sustainability pillars and about text blocks
- **`DarkBanner`** — always-dark section with optional bg image, subtitle, and CTA
  - `bodyColumns: string[]` renders a 3-col text grid for richer layouts
  - Used for "Ecological Certifications / Our Promise" and "We Strive To Be Better Every Day"
- **`ValuesSection`** — stacked values with red accent bars, large type, always dark
  - Each value: label + description + optional CTA button
  - Used on About page for Fairness / Transparency / Trustworthiness
- **`--color-bg-tile`** token — warm dark grey for ProductGrid text tiles (`#3c3a36` light / `#2a2826` dark mode)

### Changed
- **`/textiles`** — full redesign: PageHero → Breadcrumbs → PageIntro → StatsSection (17M€/1M/40yr) → ProductGrid (7 categories)
- **`/footwear`** — full redesign: PageHero → Breadcrumbs → PageIntro → ProductGrid (4 categories)
- **`/sustainability`** — full redesign: PageHero → Breadcrumbs → PageIntro (3-col body) → 5 EditorialSections (alternating bg) → DarkBanner → ArticlesSection → ContactSection
- **`/about`** — full redesign: PageHero → Breadcrumbs → PageIntro → ClientsSection → ArticlesSection → EditorialSection (mission) → ValuesSection → StatsSection (0/5/20+) → DarkBanner (3-col body) → EditorialSection
- `DESIGN_SYSTEM.md` — documented all 7 new components with props tables and usage examples; added `--color-bg-tile` to dark mode token table

### Image assets needed (placeholders active, drop real photos to activate)
- `public/images/heroes/{textiles,footwear,sustainability,about}.jpg`
- `public/images/textiles/{activewear,knitwear,swimwear,outerwear,softwoven,jersey,denim}.jpg`
- `public/images/footwear/{sneakers,classic,boots,casual}.jpg`
- `public/images/sustainability/certifications-bg.jpg`
- `public/images/about/{values-bg,strive-bg}.jpg`

---

## [0.8.0] — 2026-05-14

### Changed
- `Footer` — complete redesign to match reference screenshot (light version)
  - **Top:** centered GT Portugal wordmark + row of 4 circular social icon buttons (Location, Email, LinkedIn, Phone)
  - **Nav:** 3-column grid (Textiles / Footwear / About GT Portugal) with uppercase semibold column headings and plain text sub-links; separated from top/funding by horizontal rules
  - **Funding:** centered flex row with Norte 2030, Portugal 2030 and EU co-financing logos (`/images/funding/*.svg`); logos at 48px height with slight opacity
  - **Bottom bar:** copyright left, Privacy Policy + Terms of Service + Log in right
  - Removed: contact form, address block, newsletter, dark background tokens — footer is now light (`--color-bg-footer`) only
  - Responsive: 3-col nav → 2-col (≤1024px) → 1-col (≤640px); funding logos wrap on mobile

---

## [0.7.0] — 2026-05-14

### Added
- `ArticlesSection` — 4-column editorial cards (Industry Certifications, Compliance, Our Process, About GT Portugal)
  - Grayscale image with 4:3 aspect ratio; hover desaturates less + subtle zoom
  - Placeholder bg (`--color-bg-section`) when image not yet loaded
  - Body padding matches `Testimonial` card (`var(--space-8)`)
  - "Read more →" text-only CTA per card
  - 4-col desktop → 2-col tablet → 1-col mobile
- `Button` — new `text` variant: no background, no border, zero padding; text-secondary → text-primary on hover. Documented in DESIGN_SYSTEM.md
- Homepage section order: Hero → Categories → Clients → **Articles** → Testimonials → Contact
- `public/images/articles/` — drop `{certifications,compliance,process,about}.jpg` to activate images

### Changed
- `DESIGN_SYSTEM.md` — `BaseButton` variant list updated with `text`, usage example added

---

## [0.6.0] — 2026-05-14

### Added
- `ClientsSection` — 24-brand logo grid (Supreme, Balenciaga, Miu Miu, Reformation, Revolve, Faherty, Moschino, Frankies Bikinis, Citizens of Humanity, Kith, Roller Rabbit, Agolde, Lake, Jenni Kayne, Dôen, Brochu Walker, Anine Bing, Saint + Sofia, Boden, James Perse, Ossou, alexanderwang, Rose & Born, DKNY)
- Grid: 6 col × 4 rows desktop → 4 col (≤1024px) → 3 col (≤768px) → 2 col (≤480px)
- Full grid-line borders via container top/left + cell bottom/right (no double borders)
- Typographic variants per brand style: uppercase bold/light, serif, italic, spaced, boxed (Supreme, Kith)
- Cell hover: subtle background tint + text darkens
- Easy swap to real SVG logo images — documented in component JSDoc
- Homepage section order: Hero → Categories → **Clients** → Stats → Testimonials → Contact

---

## [0.5.0] — 2026-05-14

### Added
- `CategoriesSection` — new homepage section replacing the old 3-card grid
  - Dark background, centered heading "A Proud 40-Year History" + subtitle
  - **Vertical tab list** on the left (Clothing / Shoes / Homeware)
  - Active tab: red underline indicator with CSS transition
  - Panel: sketch illustration (left) + description + red CTA button (right)
  - Inline SVG illustrations in stitched-outline style (placeholders for real assets)
  - Fully responsive: vertical tabs on desktop → horizontal tab strip on tablet/mobile
  - GSAP animation hooks noted in comments for later implementation
- `app/page.js` — second section is now `<CategoriesSection />`; old card grid removed

### Changed
- `app/page.js` — removed unused `Card` import and `categories` array (data lives in `CategoriesSection`)

---

## [0.4.0] — 2026-05-14

### Added
- `HeroSection` — `video` prop: accepts a path (e.g. `/videos/hero.mp4`) and renders a full-bleed autoplay video background
- `HeroSection` — dark gradient overlay (`linear-gradient`, ~55–72% opacity) for readability over video
- `HeroSection` — per-line white highlight boxes on headline using `box-decoration-break: clone`; each line of text gets its own white background block
- `HeroSection` — `subDark` style: white text with drop shadow when video is active
- `HeroSection` — `data-theme="dark"` applied to the section when video is present, so all inner tokens (buttons, text) automatically switch to dark-mode values
- `Button` — `[data-theme="dark"]` override: secondary button border becomes `rgba(255,255,255,0.30)` on dark/video sections so it stays visible
- `public/videos/` folder created with `README.md` explaining video specs and swap instructions
- Homepage (`/`) now passes `video="/videos/hero.mp4"` to HeroSection

### Changed
- `HeroSection` — new `video` prop added; `dark` prop still works independently
- Overlay gradient darkest at top-left (matching reference screenshot) and lighter toward bottom-right

---

## [0.3.0] — 2026-05-14

### Added
- Full responsive system across 5 breakpoints: 480px, 640px, 768px, 1024px, 1440px, 1920px
- Burger/mobile nav now activates at ≤ 1024px (tablet), not only 768px
- Mobile nav links have subtle dividers for clarity
- Hero section: dedicated padding per breakpoint; content `max-width` grows to 800–900px on large desktops
- Hero CTAs stack to full-width columns on very small screens (≤ 480px)
- Stats grid: fixed 4-col desktop → 2-col tablet/mobile (was `auto-fit`)
- Testimonials grid: 3-col → 2-col (tablet, ≤ 1024px) → 1-col (mobile, ≤ 640px)
- Footer: 3-col desktop → logo-full-width + 2-col nav/contact (tablet, ≤ 1024px) → 1-col (mobile, ≤ 640px)
- Contact section: reduces gap at 1024px; stacks at 768px with smaller section title
- Section utility class (`.section`) reduces padding at 768px and 480px
- `page-section__sub` responsive: smaller font and full-width at mobile

### Changed
- `globals.css` responsive token block expanded: 1024px and 480px mobile-down overrides, 1440px and 1920px large-desktop-up overrides
- Container max-width: 1320px at ≥ 1440px; 1440px at ≥ 1920px
- `--font-size-4xl` scales from 2rem (480px) → 2.25rem (768px) → 3rem (1024px) → 3.5rem (desktop) → 4rem (1440px) → 4.5rem (1920px)

---

## [0.2.0] — 2026-05-14

### Changed
- Accent colour replaced: `#c8a96e` (gold) → `#BF0000` (red) across all tokens and components
- Footer redesigned with theme-aware tokens — light warm-grey in light mode, deep dark in dark mode
- Primary button adapts in dark mode: becomes near-white with dark text for legibility

### Added
- Dark mode CSS foundation via `[data-theme="dark"]` attribute on `<html>`
- Full set of dark mode semantic token overrides in `app/globals.css`
- Footer-specific semantic tokens: `--color-bg-footer`, `--color-text-footer-logo`, `--color-text-footer-link`, `--color-text-footer-hover`, `--color-border-footer`
- Smooth `transition` on `body`, `header`, and `footer` for mode switching

### Fixed
- Header, cards, and contact form inputs were using primitive `--color-neutral-0` directly — all updated to semantic `--color-bg-default` so they respond to theme changes

---

## [0.1.0] — 2026-05-14

### Added
- Next.js 16 + React 19 project scaffolded
- App Router with 6 routes: `/`, `/textiles`, `/footwear`, `/homeware`, `/sustainability`, `/about`
- Design system: CSS custom properties for color, typography, spacing, radius, shadows
- CSS Modules for all components
- Layout components: `Header` (sticky, mobile menu), `Footer`
- UI components: `Button`, `Card`, `Stat`, `Testimonial`
- Section components: `HeroSection`, `StatsSection`, `TestimonialsSection`, `ContactSection`
- SEO metadata exported from every page (title, description)
- Real content from gtportugal.com across all pages
- `jsconfig.json` with `@/` path alias
- Documentation: `README.md`, `DESIGN_SYSTEM.md`, `project_specs.md`, `CONTRIBUTING.md`, `CLAUDE gt portugal.md`
