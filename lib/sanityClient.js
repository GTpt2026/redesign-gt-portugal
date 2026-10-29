/**
 * One shared Sanity client for everything the site reads (Insights,
 * site settings, home, textiles). Reads are published content only and go
 * through the public CDN. Never put a write token in this file or in any
 * NEXT_PUBLIC_ variable.
 */
import { createClient } from '@sanity/client'

export const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID
export const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET || 'production'
export const sanityConfigured = Boolean(projectId)

export const sanityClient = sanityConfigured
  ? createClient({ projectId, dataset, apiVersion: '2025-01-01', useCdn: true, perspective: 'published' })
  : null

/** Cached for a minute and tagged, so edits appear without a redeploy. */
export function sanityFetch(query, params = {}, tags = ['content']) {
  return sanityClient.fetch(query, params, { next: { revalidate: 60, tags } })
}

/**
 * Sanity image field -> CDN URL (served as WebP/AVIF at the width asked for).
 * SVGs are returned untouched. Returns null when the field has no image.
 */
export function imageUrl(field, { w = 1600, q = 80, h, fit, fm } = {}) {
  const ref = field?.asset?._ref
  const m = ref && /^image-([A-Za-z0-9]+)-(\d+)x(\d+)-(\w+)$/.exec(ref)
  if (!m) return null
  const [, hash, width, height, ext] = m
  const base = `https://cdn.sanity.io/images/${projectId}/${dataset}/${hash}-${width}x${height}.${ext}`
  if (ext === 'svg') return base
  const params = [`w=${Math.min(w, Number(width))}`, `q=${q}`, fm ? `fm=${fm}` : 'auto=format']
  if (h) params.push(`h=${h}`)
  if (fit) params.push(`fit=${fit}`)
  return `${base}?${params.join('&')}`
}
