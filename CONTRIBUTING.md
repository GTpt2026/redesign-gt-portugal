# Contributing to GT Portugal

---

## Branches

| Branch | Purpose |
|---|---|
| `main` | Production — what's live on Vercel |
| `dev` | Active development — work happens here |
| `feature/short-description` | New features (e.g. `feature/sanity-integration`) |
| `fix/short-description` | Bug fixes (e.g. `fix/mobile-nav`) |

**Never commit directly to `main`.** Always work on a branch and merge via pull request.

---

## Commit messages

Keep them short and use a prefix:

```
feat: add GSAP scroll animation to hero section
fix: correct mobile nav overflow on small screens
style: update accent colour token
content: update textiles page copy
chore: upgrade Next.js to 16.3
```

| Prefix | When to use |
|---|---|
| `feat` | New feature or page |
| `fix` | Bug fix |
| `style` | Visual/CSS change only |
| `content` | Copy or data change, no logic change |
| `chore` | Dependency updates, config changes |
| `docs` | Documentation only |

---

## Adding a new page

1. Create a folder under `app/` matching the route — e.g. `app/contact/`
2. Add a `page.js` file inside it
3. Export a `metadata` object for SEO at the top of the file
4. Add the route to the nav links in `components/layout/Header.jsx` and `components/layout/Footer.jsx`
5. Document the route in `project_specs.md` and `README.md`

---

## Adding a new component

1. Decide where it belongs:
   - `components/ui/` — small reusable piece (button, badge, tag)
   - `components/sections/` — full page section (hero, testimonials)
   - `components/layout/` — site-wide structure (header, footer)
2. Create `ComponentName.jsx` and `ComponentName.module.css` in the same folder
3. Use CSS custom properties from `app/globals.css` — never hardcode colours, sizes, or spacing
4. Document props at the top of the file in a JSDoc comment block
5. Add the component to `DESIGN_SYSTEM.md`

---

## Styles

- All design tokens live in `app/globals.css` — update there first
- Use CSS Modules for component-level styles (`.module.css`)
- Use global utility classes (`.container`, `.section`, `.grid-3`) for layout
- Never use inline styles except for one-off token values (e.g. `style={{ marginTop: 'var(--space-8)' }}`)

---

## Environment variables

- Never commit `.env` to Git
- When adding a new variable, add a placeholder to `.env.example` with a description
- Prefix all public variables with `NEXT_PUBLIC_` if they need to be accessible in the browser

---

## Before opening a pull request

- [ ] `npm run dev` starts without errors
- [ ] `npm run build` completes without errors
- [ ] New components are documented in `DESIGN_SYSTEM.md`
- [ ] `project_specs.md` current task section is updated
- [ ] No hardcoded colours, sizes, or copy that should come from tokens or CMS
