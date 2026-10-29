/**
 * Site content layer (everything except Insights, which has its own).
 *
 * Marketing edits content in Sanity. Each getter reads the published
 * documents and fills any empty field from the content that used to live in
 * the code, so a half-filled document never leaves a hole in the page, and
 * the site keeps working if Sanity is unreachable.
 *
 * Singletons (fixed ids): siteSettings, homePage, textilesPage.
 * Collection: textileCategory (one document per category page).
 */
import { cache } from 'react'
import { categories as defaultCategories } from '@/app/textiles/categories-data'
import { homeDefaults } from '@/content/defaults/home.mjs'
import { siteDefaults } from '@/content/defaults/site.mjs'
import { textilesPageDefaults } from '@/content/defaults/textilesPage.mjs'
import { imageUrl, sanityConfigured, sanityFetch } from './sanityClient'

/* ── helpers ─────────────────────────────────────────────────── */

const has = (v) => v !== undefined && v !== null && v !== '' && !(Array.isArray(v) && v.length === 0)
const pick = (v, fallback) => (has(v) ? v : fallback)
const images = (list, opts) => (list || []).map((f) => imageUrl(f, opts)).filter(Boolean)

/** Never let a CMS hiccup break a page: log it and fall back to the defaults. */
async function safeFetch(query, params, tags) {
  if (!sanityConfigured) return null
  try {
    return await sanityFetch(query, params, tags)
  } catch (err) {
    console.error('[content] Sanity fetch failed, using defaults:', err?.message || err)
    return null
  }
}

/** A malformed document must not break the page either: fall back to the defaults. */
function safeBuild(label, build, fallback) {
  try {
    return build()
  } catch (err) {
    console.error(`[content] could not read ${label} from Sanity, using defaults:`, err?.message || err)
    return fallback()
  }
}

/* ── SEO ─────────────────────────────────────────────────────── */

/**
 * Next.js metadata from an editable seo object ({ title, description,
 * shareImage }), falling back to the page's built-in values. The share image
 * is always JPEG (LinkedIn does not reliably render WebP).
 */
export function seoMetadata(seo, fallback = {}, { absolute = false } = {}) {
  const title = pick(seo?.title, fallback.title)
  const description = pick(seo?.description, fallback.description)
  const out = {}
  if (title) out.title = absolute ? { absolute: title } : title
  if (description) out.description = description
  const share = imageUrl(seo?.shareImage, { w: 1200, h: 630, fit: 'crop', fm: 'jpg' })
  if (share) {
    out.openGraph = { title, description, images: [{ url: share, width: 1200, height: 630 }] }
    out.twitter = { card: 'summary_large_image', title, description, images: [share] }
  }
  return out
}

/* ── site settings (footer, contact) ─────────────────────────── */

export function buildSiteSettings(doc) {
  const merged = {
    email: pick(doc?.email, siteDefaults.email),
    phone: pick(doc?.phone, siteDefaults.phone),
    address: pick(doc?.address, siteDefaults.address),
    mapsUrl: pick(doc?.mapsUrl, siteDefaults.mapsUrl),
    linkedinUrl: pick(doc?.linkedinUrl, siteDefaults.linkedinUrl),
  }
  // tel: link built from the phone shown, e.g. "(+351) 22 902 4701" -> tel:+351229024701
  const digits = merged.phone.replace(/[^\d+]/g, '')
  return { ...merged, phoneHref: `tel:${digits.startsWith('+') ? digits : `+${digits}`}` }
}

export const getSiteSettings = cache(async () => {
  const doc = await safeFetch(`*[_id == "siteSettings"][0]`, {}, ['site'])
  return safeBuild('siteSettings', () => buildSiteSettings(doc), () => buildSiteSettings(null))
})

/* ── home ────────────────────────────────────────────────────── */

export function buildHome(doc) {
  const clients = has(doc?.clients)
    ? doc.clients
        .map((c) => ({ name: c.name, src: imageUrl(c.logo), wide: Boolean(c.wide) }))
        .filter((c) => c.name && c.src)
    : []

  const testimonials = has(doc?.testimonials)
    ? doc.testimonials
        .map((t) => ({ quote: t.quote, name: t.name, role: t.role, logo: imageUrl(t.logo) }))
        .filter((t) => t.quote && t.name)
    : []

  return {
    stats: has(doc?.stats)
      ? doc.stats.map((s) => ({ prefix: s.prefix ?? '', end: Number(s.end) || 0, suffix: s.suffix ?? '', label: s.label }))
      : homeDefaults.stats,
    clientsTitle: pick(doc?.clientsTitle, homeDefaults.clientsTitle),
    clients: clients.length
      ? clients
      : homeDefaults.clients.map((c) => ({ name: c.name, src: `/images/clients/${c.slug}.svg`, wide: Boolean(c.wide) })),
    testimonialsTitle: pick(doc?.testimonialsTitle, homeDefaults.testimonialsTitle),
    testimonials: testimonials.length
      ? testimonials
      : homeDefaults.testimonials.map((t) => ({ quote: t.quote, name: t.name, role: t.role, logo: t.logoSrc })),
    seo: doc?.seo || null,
  }
}

export const getHomeContent = cache(async () => {
  const doc = await safeFetch(
    `*[_id == "homePage"][0]{ stats, clientsTitle, clients[]{ name, wide, logo }, testimonialsTitle, testimonials[]{ quote, name, role, logo }, seo }`,
    {},
    ['home']
  )
  return safeBuild('homePage', () => buildHome(doc), () => buildHome(null))
})

/* ── textiles landing page ───────────────────────────────────── */

export function buildTextilesPage(doc) {
  const d = textilesPageDefaults
  return {
    heroEyebrow: pick(doc?.heroEyebrow, d.heroEyebrow),
    heroHeadline: pick(doc?.heroHeadline, d.heroHeadline),
    introEyebrow: pick(doc?.introEyebrow, d.introEyebrow),
    introTitle: pick(doc?.introTitle, d.introTitle),
    introDescription: pick(doc?.introDescription, d.introDescription),
    stats: has(doc?.stats) ? doc.stats.map((s) => ({ value: s.value, label: s.label })) : d.stats,
    seo: doc?.seo || null,
    seoDefaults: d.seo,
  }
}

export const getTextilesPage = cache(async () => {
  const doc = await safeFetch(`*[_id == "textilesPage"][0]`, {}, ['textiles'])
  return safeBuild('textilesPage', () => buildTextilesPage(doc), () => buildTextilesPage(null))
})

/* ── textile categories ──────────────────────────────────────── */

const withDetail = (c) => ({ ...c, detailImage: c.detailImage || `/images/textiles/details/${c.slug}-v2.webp` })

export function normalizeCategory(doc, fallback = {}) {
  const slug = doc.slug.current
  const stat = doc.statBanner
  return withDetail({
    slug,
    title: pick(doc.title, fallback.title),
    tagline: pick(doc.tagline, fallback.tagline),
    cardDescription: pick(doc.cardDescription, fallback.cardDescription),
    description: pick(doc.description, fallback.description),
    image: imageUrl(doc.heroImage, { w: 1920 }) ?? fallback.image,
    cardImage: imageUrl(doc.cardImage, { w: 900 }) ?? fallback.cardImage,
    detailImage: imageUrl(doc.detailImage, { w: 800 }) ?? fallback.detailImage,
    gallery: pick(images(doc.gallery, { w: 1600 }), fallback.gallery),
    productGrid: pick(images(doc.productGrid, { w: 1400 }), fallback.productGrid),
    productGridColumns: pick(doc.productGridColumns, fallback.productGridColumns),
    features: has(doc.features) ? doc.features.map((f) => ({ label: f.label, text: f.text })) : fallback.features,
    statBanner: has(stat?.title) || has(stat?.stat)
      ? {
          image: imageUrl(stat.image, { w: 1800 }) ?? fallback.statBanner?.image,
          title: stat.title,
          stat: stat.stat,
          description: stat.description,
        }
      : fallback.statBanner,
    crossLinks: has(doc.crossLinks)
      ? doc.crossLinks.map((l) => ({ tag: l.tag, title: l.title, description: l.description, href: l.href }))
      : fallback.crossLinks,
    seo: doc.seo || null,
  })
}

export function buildCategories(docs) {
  if (!docs?.length) return defaultCategories.map(withDetail)
  const fallbacks = new Map(defaultCategories.map((c) => [c.slug, c]))
  return docs.map((d) => normalizeCategory(d, fallbacks.get(d.slug.current)))
}

export const getCategories = cache(async () => {
  const docs = await safeFetch(`*[_type == "textileCategory" && defined(slug.current)] | order(order asc, title asc)`, {}, ['textiles'])
  return safeBuild('textileCategory', () => buildCategories(docs), () => buildCategories(null))
})

export async function getCategory(slug) {
  return (await getCategories()).find((c) => c.slug === slug)
}

export async function getRelatedCategories(slug, count = 4) {
  const all = await getCategories()
  const start = all.findIndex((c) => c.slug === slug)
  return [...all.slice(start + 1), ...all.slice(0, start)].slice(0, count)
}
