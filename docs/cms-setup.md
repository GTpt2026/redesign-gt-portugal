# CMS Setup — Sanity

This guide covers how to connect Sanity to the GT Portugal site for editable content.

> **Status:** Not yet integrated. This document will be updated as the integration is built.

---

## What Sanity does

Sanity is the CMS (Content Management System) — it lets the GT Portugal team update text, images, and data on the site without touching any code. Changes in Sanity appear on the live site automatically.

---

## What content will live in Sanity

| Content | Type |
|---|---|
| Page hero copy (headline, subheadline) | Per-page fields |
| Testimonials | Document type |
| Product categories (Textiles, Footwear, Homeware) | Document type |
| Stats / metrics | Singleton |
| Sustainability pillars | Document type |

---

## Setup steps (when ready to integrate)

### 1. Create a Sanity project
1. Go to [sanity.io](https://sanity.io) and sign in
2. Click **Create new project**
3. Name it `gt-portugal`
4. Choose dataset name: `production`
5. Note your **Project ID** — you'll need it for `.env`

### 2. Install Sanity in the project
```bash
npm install next-sanity @sanity/image-url
```

### 3. Add environment variables
Copy your credentials to `.env` (see `.env.example`):
```
NEXT_PUBLIC_SANITY_PROJECT_ID=your_project_id
NEXT_PUBLIC_SANITY_DATASET=production
SANITY_API_TOKEN=your_token
```

### 4. Connect and define schemas
- Create `sanity/` folder in the project root
- Define document schemas for testimonials, categories, stats
- This step will be documented in full when the integration begins

---

## Sanity Studio

Sanity comes with a visual editor called Studio. Once set up, the GT Portugal team accesses it at a URL like `gtportugal.com/studio` to edit content directly.
