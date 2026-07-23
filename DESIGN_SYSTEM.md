# GT Portugal — Design System

All tokens live in `src/assets/styles/tokens.css`. Update there first — everything else inherits via CSS custom properties.

---

## Tokens

### Colors

| Token | Value | Usage |
|---|---|---|
| `--color-brand-primary` | `#1a1a1a` | Primary buttons, headlines |
| `--color-brand-accent` | `#BF0000` | Stats, tags, badges, focus rings |
| `--color-text-primary` | `--neutral-900` | Body text, headings |
| `--color-text-secondary` | `--neutral-600` | Supporting text, subtitles |
| `--color-text-muted` | `--neutral-400` | Labels, timestamps, metadata |
| `--color-text-inverse` | `--neutral-0` | Text on dark backgrounds |
| `--color-bg-default` | `#ffffff` | Default page background |
| `--color-bg-subtle` | `#f8f8f6` | Alternate section background |
| `--color-bg-section` | `#f0efeb` | Muted section background |
| `--color-bg-dark` | `#1a1a1a` | Dark sections and footer |
| `--color-border` | `#e2e0d8` | Dividers, card borders, inputs |

> **Note:** The accent color `#c8a96e` is a best-guess warm gold. Verify against the live site and update this token — all components will update automatically.

### Typography

Base font: **Inter** (loaded via Google Fonts)

| Token | Value |
|---|---|
| `--font-size-xs` | 12px |
| `--font-size-sm` | 14px |
| `--font-size-base` | 16px |
| `--font-size-md` | 18px |
| `--font-size-lg` | 20px |
| `--font-size-xl` | 24px |
| `--font-size-2xl` | 32px |
| `--font-size-3xl` | 40px |
| `--font-size-4xl` | 56px |

### Spacing

8px base grid. All spacing tokens are multiples of 4px (`--space-1` = 4px, `--space-2` = 8px, etc.).

### Border radius

| Token | Value | Usage |
|---|---|---|
| `--radius-sm` | 2px | Subtle rounding |
| `--radius-md` | 4px | Buttons, inputs |
| `--radius-lg` | 8px | Cards |
| `--radius-xl` | 16px | Large cards, media |
| `--radius-full` | 9999px | Pills, badges |

---

## Components

### `BaseButton`

**File:** `src/components/ui/BaseButton.vue`

**Props:**

| Prop | Type | Default | Options |
|---|---|---|---|
| `variant` | String | `'primary'` | `'primary'` `'secondary'` `'ghost'` `'text'` |
| `size` | String | `'md'` | `'sm'` `'md'` `'lg'` |
| `tag` | String | `'button'` | `'button'` `'a'` `'RouterLink'` |
| `href` | String | — | Used when `tag='a'` |
| `to` | String / Object | — | Used when `tag='RouterLink'` |
| `disabled` | Boolean | `false` | — |

**Usage:**
```jsx
<Button variant="primary" size="lg">Submit</Button>
<Button href="/textiles" variant="secondary">See textiles</Button>
<Button href="mailto:..." variant="ghost">Email us</Button>
<Button href="/about" variant="text" size="sm">Read more →</Button>
```

**`text` variant** — no background, no border, no padding. Text color is `--color-text-secondary`, hover darkens to `--color-text-primary`. Use for inline "Read more", "Learn more", or "See all" links inside cards and editorial content. All size props share the same `font-size-sm` and zero padding override.

---

### `BaseCard`

**File:** `src/components/ui/BaseCard.vue`

**Props:**

| Prop | Type | Default | Options |
|---|---|---|---|
| `title` | String | required | — |
| `description` | String | — | — |
| `tag` | String | — | Category label (e.g. `'Activewear'`) |
| `variant` | String | `'default'` | `'default'` `'bordered'` `'elevated'` |
| `linkTo` | String / Object | — | Makes card a RouterLink |

**Slots:** `default` (replaces description), `media` (above content)

---

### `BaseStat`

**File:** `src/components/ui/BaseStat.vue`

**Props:**

| Prop | Type | Default | Options |
|---|---|---|---|
| `value` | String | required | e.g. `'17M€'`, `'40'` |
| `label` | String | required | e.g. `'Years of experience'` |
| `description` | String | — | Optional supporting text |
| `align` | String | `'left'` | `'left'` `'center'` |

---

### `BaseTestimonial`

**File:** `src/components/ui/BaseTestimonial.vue`

**Props:**

| Prop | Type | Default | Options |
|---|---|---|---|
| `quote` | String | required | — |
| `name` | String | required | — |
| `role` | String | required | e.g. `'Product Manager at DKNY'` |
| `variant` | String | `'default'` | `'default'` `'dark'` |

---

### `HeroSection`

**File:** `components/sections/HeroSection.jsx`

**Props:**

| Prop | Type | Default | Notes |
|---|---|---|---|
| `headline` | String | required | — |
| `subheadline` | String | — | — |
| `eyebrow` | String | — | Red uppercase label above headline |
| `dark` | Boolean | `false` | Dark background without video |
| `video` | String | `null` | Path to `.mp4`, e.g. `"/videos/hero.mp4"`. Enables full-bleed video background + overlay. |
| `actions` | ReactNode | — | CTA buttons |

**Video behaviour:**
- When `video` is set: renders `<video autoPlay muted loop>` as absolute background
- A `linear-gradient` overlay (~55–72% opacity) is applied for readability
- `data-theme="dark"` is added to the section so all tokens (buttons, text) automatically use dark-mode values
- Headline switches to per-line white highlight boxes via `box-decoration-break: clone`
- Subheadline switches to white text with drop shadow
- Fallback: `#111111` solid background if video fails to load

**Video file location:** `public/videos/hero.mp4` — see `public/videos/README.md` for specs.

---

### `PageHero`

**File:** `components/sections/PageHero.jsx`

Inner-page hero — smaller than `HeroSection`, always dark, static image background. Used on all inner pages (textiles, footwear, sustainability, about).

**Props:**

| Prop | Type | Default | Notes |
|---|---|---|---|
| `headline` | `string[]` | required | Array of text lines. Lines 0…n-2 render white; **last line renders in `--color-brand-accent` (red)**. |
| `eyebrow` | String | — | Small uppercase label above headline |
| `image` | String | — | Path to bg image (e.g. `"/images/heroes/textiles.jpg"`). Falls back to `#1a1a1a` solid dark. |
| `alt` | String | `""` | Alt text for bg image |

**Dark mode:** Always dark (`data-theme="dark"` on section). No light variant.

**Height:** `400px` desktop → `280px` tablet → `220px` mobile → `480px` large desktop.

**Usage:**
```jsx
<PageHero
  headline={['Outstanding', 'Garments', 'Crafted in Portugal']}
  eyebrow="Our Textiles"
  image="/images/heroes/textiles.jpg"
  alt="GT Portugal textile factory floor"
/>
```

---

### `Breadcrumbs`

**File:** `components/ui/Breadcrumbs.jsx`

Navigation breadcrumb bar. Renders below the page hero on all inner pages. Home is always prepended automatically (with house icon SVG).

**Props:**

| Prop | Type | Default | Notes |
|---|---|---|---|
| `items` | `Array<{ label, href? }>` | `[]` | Do NOT include Home — it's added automatically. Last item = current page (no href). Supports 1–3+ levels. |

**Usage:**
```jsx
{/* Level 1 — section page */}
<Breadcrumbs items={[{ label: 'Textiles' }]} />

{/* Level 2 — sub-page */}
<Breadcrumbs items={[
  { label: 'Textiles', href: '/textiles' },
  { label: 'Activewear' }
]} />

{/* Level 3 — deep page */}
<Breadcrumbs items={[
  { label: 'About', href: '/about' },
  { label: 'Sustainability', href: '/sustainability' },
  { label: 'GOTS Certification' }
]} />
```

---

### `PageIntro`

**File:** `components/sections/PageIntro.jsx`

Centered intro section — eyebrow, large heading, description, and optional 3-column text body. Used at the top of inner pages after Breadcrumbs.

**Props:**

| Prop | Type | Default | Notes |
|---|---|---|---|
| `eyebrow` | String | — | Small red uppercase label |
| `title` | String | required | `font-size-2xl`, bold, centered |
| `description` | String | — | Single centered paragraph under heading |
| `columns` | `string[]` | — | Array of paragraph strings rendered in a 3-col grid (2-col tablet, 1-col mobile) |
| `bg` | String | `'default'` | `'default'` `'subtle'` `'muted'` |

**Usage:**
```jsx
<PageIntro
  eyebrow="Expertise"
  title="Outstanding Garments"
  description="From jackets to dresses…"
  columns={['Column 1 text…', 'Column 2 text…', 'Column 3 text…']}
  bg="default"
/>
```

---

### `ProductGrid`

**File:** `components/sections/ProductGrid.jsx`

Checkerboard product category grid. 4-column desktop layout — each product occupies one image tile and one dark text tile side by side. Orientation alternates per row-pair (even rows: image-left; odd rows: text-left), creating a visual checkerboard.

**Props:**

| Prop | Type | Default | Notes |
|---|---|---|---|
| `items` | `Array<{ id, title, description, image?, href? }>` | required | Image path falls back to `/images/placeholder.jpg`. `href` reserved for future linking. |

**Responsive:** 4-col desktop → 2-col tablet (one product per row) → 1-col mobile (image above text stacked).

**Usage:**
```jsx
<ProductGrid items={[
  { id: 'activewear', image: '/images/textiles/activewear.jpg', title: 'Activewear', description: '…' },
  { id: 'knitwear',   image: '/images/textiles/knitwear.jpg',   title: 'Knitwear',   description: '…' },
]} />
```

**Image drop-in:** Place images at `public/images/textiles/{id}.jpg` or `public/images/footwear/{id}.jpg`.

---

### `EditorialSection`

**File:** `components/sections/EditorialSection.jsx`

Content section with centered or left-aligned heading + body paragraphs. Used for sustainability pillars (Renewable Sources, Waste Management…) and about-page editorial content.

**Props:**

| Prop | Type | Default | Notes |
|---|---|---|---|
| `eyebrow` | String | — | Red uppercase label |
| `title` | String | required | Section heading |
| `body` | `string \| string[]` | required | Single string or array of paragraphs |
| `bg` | String | `'default'` | `'default'` `'subtle'` `'muted'` `'dark'` |
| `align` | String | `'center'` | `'center'` `'left'` |

**Dark mode:** When `bg="dark"`, `data-theme="dark"` is applied to the section automatically.

---

### `DarkBanner`

**File:** `components/sections/DarkBanner.jsx`

Always-dark section with optional background image, heading, subtitle, body text, and CTA. Used for "Ecological Certifications / Our Promise" (sustainability) and "We Strive To Be Better Every Day" (about).

**Props:**

| Prop | Type | Default | Notes |
|---|---|---|---|
| `eyebrow` | String | — | Small accent label |
| `title` | String | required | Large white heading (`font-size-3xl`) |
| `subtitle` | String | — | Supporting sentence below heading |
| `body` | String | — | Single paragraph |
| `bodyColumns` | `string[]` | — | Renders body as a 3-col grid (2-col tablet, 1-col mobile) |
| `cta` | `{ label, href }` | — | Primary button |
| `image` | String | — | Background image (rendered at 40% opacity behind dark overlay) |
| `align` | String | `'left'` | `'left'` `'center'` |

**Usage:**
```jsx
<DarkBanner
  eyebrow="Ecological Certifications"
  title="Our Promise"
  subtitle="GT Portugal holds a standard…"
  cta={{ label: 'Learn More', href: '/about' }}
  image="/images/sustainability/certifications-bg.jpg"
/>
```

---

### `ValuesSection`

**File:** `components/sections/ValuesSection.jsx`

Stacked values list with large typography and red accent bars. Always dark. Used on the About page.

**Props:**

| Prop | Type | Default | Notes |
|---|---|---|---|
| `values` | `Array<{ label, description, cta? }>` | required | Each value has a label (large), description, and optional `{ label, href }` CTA button |
| `image` | String | — | Background image (dark overlay applied) |

**Usage:**
```jsx
<ValuesSection
  values={[
    { label: 'Fairness', description: '…' },
    { label: 'Transparency', description: '…' },
    { label: 'Trustworthiness', description: '…', cta: { label: 'Our Sustainability', href: '/sustainability' } },
  ]}
  image="/images/about/values-bg.jpg"
/>
```

---

### `StatsSection`

**File:** `src/components/sections/StatsSection.vue`

**Props:**

| Prop | Type | Default |
|---|---|---|
| `stats` | `Array<{ value, label, description? }>` | required |
| `dark` | Boolean | `false` |

---

### `TestimonialsSection`

**File:** `src/components/sections/TestimonialsSection.vue`

**Props:**

| Prop | Type | Default |
|---|---|---|
| `testimonials` | `Array<{ quote, name, role }>` | required |
| `title` | String | — |
| `dark` | Boolean | `false` |

---

### `ContactSection`

**File:** `src/components/sections/ContactSection.vue`

**Props:**

| Prop | Type | Default |
|---|---|---|
| `title` | String | `'Get in touch'` |
| `dark` | Boolean | `false` |

---

## Dark mode

Theming is handled via the `[data-theme="dark"]` attribute on the `<html>` element. All semantic tokens are overridden inside that selector in `app/globals.css`.

**How to activate dark mode (JS):**
```js
document.documentElement.setAttribute('data-theme', 'dark')  // dark
document.documentElement.removeAttribute('data-theme')        // light
```

**Dark mode token values:**

| Token | Light | Dark |
|---|---|---|
| `--color-bg-default` | `#ffffff` | `#1c1c1c` |
| `--color-bg-subtle` | `#f8f8f6` | `#242424` |
| `--color-bg-section` | `#f0efeb` | `#2c2c2c` |
| `--color-bg-dark` | `#1a1a1a` | `#111111` |
| `--color-text-primary` | `#1a1a1a` | `#f0eeeb` |
| `--color-text-secondary` | `#5c5a50` | `#a8a49c` |
| `--color-text-muted` | `#9e9b8e` | `#6b6760` |
| `--color-border` | `#e2e0d8` | `#333333` |
| `--color-brand-primary` | `#1a1a1a` | `#f0eeeb` |
| `--color-bg-footer` | `#f0efeb` | `#111111` |
| `--color-bg-tile` | `#3c3a36` | `#2a2826` |

**Rule:** Never hardcode `var(--color-neutral-0)` or `var(--color-neutral-900)` in component styles — always use semantic tokens so components respond to theme changes automatically.

---

## Responsive Breakpoints

All breakpoints are defined as `max-width` (mobile-first with downward overrides) and `min-width` (large-screen upward scaling) in `app/globals.css`.

| Breakpoint | Query | Target |
|---|---|---|
| Small mobile | `max-width: 480px` | iPhone SE, small Android phones |
| Mobile | `max-width: 640px` | Most phones in portrait |
| Tablet portrait | `max-width: 768px` | iPads portrait, large phones |
| Tablet landscape / small laptop | `max-width: 1024px` | iPads landscape, 13" MacBooks |
| Large desktop | `min-width: 1440px` | 24" monitors, large laptops |
| Very large desktop | `min-width: 1920px` | External monitors (1920×1080+) |

**Container max-width by screen size:**
- Default: `1200px`
- ≥ 1440px: `1320px`
- ≥ 1920px: `1440px`

**Key responsive behaviours:**
- Header nav collapses to burger menu at ≤ 1024px
- Stats grid: 4-col → 2-col (≤ 1024px)
- Testimonials: 3-col → 2-col (≤ 1024px) → 1-col (≤ 640px)
- Footer: 3-col → logo + 2-col (≤ 1024px) → 1-col (≤ 640px)
- Hero CTAs stack full-width at ≤ 480px
- `.section` padding reduces at 768px and 480px

---

## Rules

1. **Tokens first** — never hardcode a color, size, or spacing value in a component. Always use a CSS custom property from `tokens.css`.
2. **One concern per component** — UI primitives (`ui/`) handle appearance only. Section components (`sections/`) handle layout and composition. Pages handle data and routing.
3. **Props for behaviour, slots for structure** — use props to change how a component looks or behaves. Use slots when the consumer needs to inject markup.
4. **Dark variant pattern** — components that appear on dark backgrounds accept a `variant="dark"` or `:dark="true"` prop. They switch to inverse token values internally.
5. **Mobile-first** — base styles target mobile, media queries expand for larger screens.
6. **No inline styles** — the only exception is one-off layout adjustments on page-level containers using existing tokens (e.g. `style="margin-top: var(--space-10)"`).
