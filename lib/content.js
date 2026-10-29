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
import { aboutDefaults, contactPageDefaults, featureCardsDefaults, homeTextDefaults, impactPageDefaults } from '@/content/defaults/pages.mjs'
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

/* ── site settings (menu, footer, contact) ───────────────────── */

const links = (list, fallback) =>
  has(list) ? list.filter((l) => l?.label && l?.href).map((l) => ({ label: l.label, href: l.href })) : fallback


export function buildSiteSettings(doc) {
  const merged = {
    email: pick(doc?.email, siteDefaults.email),
    phone: pick(doc?.phone, siteDefaults.phone),
    address: pick(doc?.address, siteDefaults.address),
    mapsUrl: pick(doc?.mapsUrl, siteDefaults.mapsUrl),
    linkedinUrl: pick(doc?.linkedinUrl, siteDefaults.linkedinUrl),
    menuLinks: links(doc?.menuLinks, siteDefaults.menuLinks),
    contactButtonLabel: pick(doc?.contactButtonLabel, siteDefaults.contactButtonLabel),
    companyLinks: links(doc?.companyLinks, siteDefaults.companyLinks),
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

function buildCapabilities(c) {
  const d = homeTextDefaults.capabilities
  const steps = has(c?.steps) && c.steps.length === d.steps.length ? c.steps : d.steps // the drawn timeline has a fixed number of stops
  const beats = has(c?.beats) ? c.beats : d.beats
  return {
    eyebrow: pick(c?.eyebrow, d.eyebrow),
    title: pick(c?.title, d.title),
    beats,
    intro: pick(c?.intro, d.intro),
    pillars: d.pillars.map((p, i) => ({
      title: pick(c?.pillars?.[i]?.title, p.title),
      text: pick(c?.pillars?.[i]?.text, p.text),
    })),
    startLabel: pick(c?.startLabel, d.startLabel),
    steps,
    endLabel: pick(c?.endLabel, d.endLabel),
  }
}

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
    hero: {
      eyebrow: pick(doc?.hero?.eyebrow, homeTextDefaults.hero.eyebrow),
      eyebrowHref: pick(doc?.hero?.eyebrowHref, homeTextDefaults.hero.eyebrowHref),
      headline: pick(doc?.hero?.headlineWords, homeTextDefaults.hero.headlineWords).join(' . '),
    },
    capabilities: buildCapabilities(doc?.capabilities),
    intro: {
      eyebrow: pick(doc?.intro?.eyebrow, homeTextDefaults.intro.eyebrow),
      text: pick(doc?.intro?.text, homeTextDefaults.intro.text),
    },
    clothing: {
      title: pick(doc?.clothing?.title, homeTextDefaults.clothing.title),
      description: pick(doc?.clothing?.description, homeTextDefaults.clothing.description),
      ctaLabel: pick(doc?.clothing?.ctaLabel, homeTextDefaults.clothing.ctaLabel),
      ctaHref: pick(doc?.clothing?.ctaHref, homeTextDefaults.clothing.ctaHref),
    },
    testimonialsTitle: pick(doc?.testimonialsTitle, homeDefaults.testimonialsTitle),
    testimonials: testimonials.length
      ? testimonials
      : homeDefaults.testimonials.map((t) => ({ quote: t.quote, name: t.name, role: t.role, logo: t.logoSrc })),
    seo: doc?.seo || null,
  }
}

export const getHomeContent = cache(async () => {
  const doc = await safeFetch(
    `*[_id == "homePage"][0]{ hero, capabilities, intro, clothing, stats, clientsTitle, clients[]{ name, wide, logo }, testimonialsTitle, testimonials[]{ quote, name, role, logo }, seo }`,
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
    heroImage: imageUrl(doc?.heroImage, { w: 1920 }) ?? d.heroImage,
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

/* ── pages made of numbered sections (Sustainability, Compliance...) ───────── */

const lines = (doc, d) => pick(doc, d)

export function buildImpactPage(doc, key) {
  const d = impactPageDefaults[key]
  const b = doc?.banner
  return {
    heroEyebrow: pick(doc?.heroEyebrow, d.heroEyebrow),
    heroHeadline: lines(doc?.heroHeadline, d.heroHeadline),
    heroImage: imageUrl(doc?.heroImage, { w: 1920 }) ?? d.heroImage,
    heroAlt: d.heroAlt,
    breadcrumb: d.breadcrumb,
    intro: {
      eyebrow: pick(doc?.intro?.eyebrow, d.intro.eyebrow),
      title: pick(doc?.intro?.title, d.intro.title),
      description: pick(doc?.intro?.description, d.intro.description),
    },
    stats: has(doc?.stats) ? doc.stats.map((s) => ({ value: s.value, label: s.label })) : d.stats,
    sections: has(doc?.sections)
      ? doc.sections.map((s) => ({
          slug: s.anchor || undefined,
          title: s.title,
          body: s.body,
          practices: s.practices || [],
          impact: has(s.impact) ? s.impact.map((i) => ({ label: i.label, value: i.value })) : undefined,
        }))
      : d.sections,
    banner: d.banner
      ? {
          eyebrow: pick(b?.eyebrow, d.banner.eyebrow),
          title: pick(b?.title, d.banner.title),
          subtitle: pick(b?.subtitle, d.banner.subtitle),
          ctaLabel: pick(b?.ctaLabel, d.banner.ctaLabel),
          ctaHref: pick(b?.ctaHref, d.banner.ctaHref),
          image: imageUrl(b?.image, { w: 1920 }) ?? d.banner.image,
        }
      : null,
    seo: doc?.seo || null,
    seoDefaults: d.seo,
  }
}

export const getImpactPage = cache(async (key) => {
  const doc = await safeFetch(`*[_id == $id][0]`, { id: `page-${key}` }, ['pages'])
  return safeBuild(`page-${key}`, () => buildImpactPage(doc, key), () => buildImpactPage(null, key))
})

/* ── About ───────────────────────────────────────────────────── */

export function buildAbout(doc) {
  const d = aboutDefaults
  const b = doc?.banner
  return {
    heroEyebrow: pick(doc?.heroEyebrow, d.heroEyebrow),
    heroHeadline: pick(doc?.heroHeadline, d.heroHeadline),
    heroImage: imageUrl(doc?.heroImage, { w: 1920 }) ?? d.heroImage,
    mission: {
      eyebrow: pick(doc?.mission?.eyebrow, d.mission.eyebrow),
      title: pick(doc?.mission?.title, d.mission.title),
      body: pick(doc?.mission?.body, d.mission.body),
    },
    values: has(doc?.values) ? doc.values.map((v) => ({ label: v.label, description: v.description })) : d.values,
    valuesImage: imageUrl(doc?.valuesImage, { w: 1920 }) ?? d.valuesImage,
    years: {
      eyebrow: pick(doc?.years?.eyebrow, d.years.eyebrow),
      title: pick(doc?.years?.title, d.years.title),
      description: pick(doc?.years?.description, d.years.description),
    },
    stats: has(doc?.stats) ? doc.stats.map((s) => ({ value: s.value, label: s.label })) : d.stats,
    banner: {
      eyebrow: pick(b?.eyebrow, d.banner.eyebrow),
      title: pick(b?.title, d.banner.title),
      subtitle: pick(b?.subtitle, d.banner.subtitle),
      ctaLabel: pick(b?.ctaLabel, d.banner.ctaLabel),
      ctaHref: pick(b?.ctaHref, d.banner.ctaHref),
      image: imageUrl(b?.image, { w: 1920 }) ?? d.banner.image,
    },
    people: {
      eyebrow: pick(doc?.people?.eyebrow, d.people.eyebrow),
      title: pick(doc?.people?.title, d.people.title),
      body: pick(doc?.people?.body, d.people.body),
    },
    seo: doc?.seo || null,
    seoDefaults: d.seo,
  }
}

export const getAboutPage = cache(async () => {
  const doc = await safeFetch(`*[_id == "aboutPage"][0]`, {}, ['pages'])
  return safeBuild('aboutPage', () => buildAbout(doc), () => buildAbout(null))
})

/* ── "What We Do" cards ──────────────────────────────────────── */

export function buildFeatureCards(doc) {
  if (!has(doc?.cards)) return featureCardsDefaults
  const fallbacks = new Map(featureCardsDefaults.map((c) => [c.id, c]))
  return doc.cards
    .map((c) => {
      const f = fallbacks.get(c.key) || {}
      return {
        id: c.key,
        title: pick(c.title, f.title),
        description: pick(c.description, f.description),
        href: pick(c.href, f.href),
        image: imageUrl(c.image, { w: 900 }) ?? f.image,
        hoverImage: imageUrl(c.hoverImage, { w: 900 }) ?? f.hoverImage,
      }
    })
    .filter((c) => c.id && c.title && c.image)
}

export const getFeatureCards = cache(async () => {
  const doc = await safeFetch(`*[_id == "featureCards"][0]`, {}, ['pages'])
  const cards = safeBuild('featureCards', () => buildFeatureCards(doc), () => featureCardsDefaults)
  return cards.length ? cards : featureCardsDefaults
})

/* ── contact page ────────────────────────────────────────────── */

export function buildContactPage(doc) {
  const d = contactPageDefaults
  return {
    heroEyebrow: pick(doc?.heroEyebrow, d.heroEyebrow),
    heroHeadline: pick(doc?.heroHeadline, d.heroHeadline),
    formTitle: pick(doc?.formTitle, d.formTitle),
    seo: doc?.seo || null,
  }
}

export const getContactPage = cache(async () => {
  const doc = await safeFetch(`*[_id == "contactPage"][0]`, {}, ['pages'])
  return safeBuild('contactPage', () => buildContactPage(doc), () => buildContactPage(null))
})

/** Footer "Sustainability" column: one link per numbered section of that page. */
export async function getSustainabilityLinks() {
  const page = await getImpactPage('sustainability')
  return page.sections.filter((s) => s.slug).map((s) => ({ href: `/sustainability#${s.slug}`, label: s.title }))
}
