/**
 * Reads Insights from Sanity and reshapes them into the same article model
 * the local JSON files use, so no component knows where content came from.
 * Only active when NEXT_PUBLIC_SANITY_PROJECT_ID is set.
 */
import { plain, sanityToModel } from './portableText.mjs'
import { dataset, projectId, sanityConfigured, sanityFetch } from './sanityClient'

export { sanityConfigured }

/** Widths (px) each image role is served at. Sanity's CDN resizes and picks WebP/AVIF itself. */
const WIDTH = { cover: 1600, banner: 1600, body: 1200, step: 800, card: 720 }

/** image-<hash>-<w>x<h>-<ext>  ->  { src, width, height } */
function imageFrom(field, role) {
  const ref = field?.asset?._ref
  const m = ref && /^image-([A-Za-z0-9]+)-(\d+)x(\d+)-(\w+)$/.exec(ref)
  if (!m) return null
  const [, hash, w, h, ext] = m
  const width = Math.min(Number(w), WIDTH[role] ?? WIDTH.body)
  const height = Math.round((Number(h) * width) / Number(w))
  return {
    src: `https://cdn.sanity.io/images/${projectId}/${dataset}/${hash}-${w}x${h}.${ext}?w=${width}&q=80&auto=format`,
    width,
    height,
  }
}

function excerptFrom(body) {
  const first = body.find((b) => (b.type === 'lead' && b.text) || b.type === 'paragraph')
  const text = plain(first?.text || '')
  if (text.length <= 190) return text
  const cut = text.slice(0, 190)
  const stop = Math.max(cut.lastIndexOf('. '), cut.lastIndexOf('; '))
  return stop > 100 ? cut.slice(0, stop + 1) : `${cut.slice(0, cut.lastIndexOf(' '))}…`
}

function wordCount(body) {
  return body.reduce((n, b) => {
    const t = b.text || (b.items || []).map((i) => (typeof i === 'string' ? i : i.text)).join(' ') || ''
    return n + plain(t).split(/\s+/).filter(Boolean).length
  }, 0)
}

export function toArticle(doc) {
  const body = sanityToModel(doc.body, { image: (f, role) => imageFrom(f, role) })
  const cover = imageFrom(doc.cover, 'cover')
  return {
    slug: doc.slug,
    title: doc.title,
    subtitle: doc.subtitle || '',
    excerpt: doc.excerpt || excerptFrom(body),
    date: (doc.publishedAt || '').slice(0, 10),
    category: doc.category || 'Technology & Trends',
    topic: doc.topic || null,
    readMinutes: Math.max(2, Math.round(wordCount(body) / 210)),
    cover,
    thumb: imageFrom(doc.cover, 'card'),
    body,
  }
}

const QUERY = `*[_type == "insight" && defined(slug.current) && defined(cover.asset)]
  | order(publishedAt desc, title asc) {
    "slug": slug.current, title, subtitle, excerpt, publishedAt, category, topic, cover, body
  }`

export async function fetchSanityInsights() {
  const docs = await sanityFetch(QUERY, {}, ['insights'])
  return docs.map(toArticle)
}
