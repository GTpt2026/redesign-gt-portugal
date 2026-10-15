/**
 * Insights data layer. Every page reads articles through these helpers,
 * so the source can change (local JSON today, Sanity next) without
 * touching a single component.
 *
 * Article shape:
 *   { slug, title, subtitle, excerpt, date, category, topic, readMinutes,
 *     cover, thumb, body[] }
 * Image refs are { src, width, height }.
 */
import fs from 'node:fs'
import path from 'node:path'

const DIR = path.join(process.cwd(), 'content', 'insights')

let cache = null

function loadLocal() {
  if (cache && process.env.NODE_ENV === 'production') return cache
  cache = fs
    .readdirSync(DIR)
    .filter((f) => f.endsWith('.json'))
    .map((f) => JSON.parse(fs.readFileSync(path.join(DIR, f), 'utf8')))
    .sort((a, b) => b.date.localeCompare(a.date) || a.title.localeCompare(b.title))
  return cache
}

export async function getAllInsights() {
  return loadLocal()
}

export async function getInsight(slug) {
  return loadLocal().find((a) => a.slug === slug) ?? null
}

/** Same-category articles first (newest), topped up with the newest others. */
export async function getRelatedInsights(article, count = 3) {
  const others = loadLocal().filter((a) => a.slug !== article.slug)
  const same = others.filter((a) => a.category === article.category)
  const rest = others.filter((a) => a.category !== article.category)
  return [...same, ...rest].slice(0, count)
}

/** Card-sized subset sent to the client-side list (keeps the payload small). */
export function toCard(a) {
  const { slug, title, excerpt, date, category, topic, readMinutes, thumb } = a
  return { slug, title, excerpt, date, category, topic, readMinutes, thumb }
}
