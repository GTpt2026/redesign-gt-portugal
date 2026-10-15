/**
 * One-off import of the migrated Insights articles (content/insights/*.json
 * + public/images/insights/*.webp) into Sanity.
 *
 * Safe to run more than once: documents use fixed ids (insight-<slug>) and
 * Sanity de-duplicates identical image files, so a re-run updates instead
 * of duplicating.
 *
 *   Dry run (no network, checks everything locally):
 *     node scripts/import-insights-to-sanity.mjs --dry
 *
 *   Real import (token needs "Editor" rights, create it at sanity.io/manage
 *   → your project → API → Tokens, and never commit it):
 *     SANITY_PROJECT_ID=xxxx SANITY_WRITE_TOKEN=sk... \
 *       node scripts/import-insights-to-sanity.mjs
 *
 *   Optional: SANITY_DATASET (default production), --limit=3 to try a few first.
 */
import fs from 'node:fs'
import path from 'node:path'
import { fileURLToPath } from 'node:url'
import { createClient } from '@sanity/client'
import { modelToSanity } from '../lib/portableText.mjs'

const root = path.join(path.dirname(fileURLToPath(import.meta.url)), '..')
const contentDir = path.join(root, 'content', 'insights')
const publicDir = path.join(root, 'public')

const dry = process.argv.includes('--dry')
const limitArg = process.argv.find((a) => a.startsWith('--limit='))
const limit = limitArg ? Number(limitArg.split('=')[1]) : Infinity

const projectId = process.env.SANITY_PROJECT_ID || process.env.NEXT_PUBLIC_SANITY_PROJECT_ID
const dataset = process.env.SANITY_DATASET || process.env.NEXT_PUBLIC_SANITY_DATASET || 'production'
const token = process.env.SANITY_WRITE_TOKEN

if (!dry && (!projectId || !token)) {
  console.error('Missing SANITY_PROJECT_ID and/or SANITY_WRITE_TOKEN. Run with --dry to test without them.')
  process.exit(1)
}

const client = dry ? null : createClient({ projectId, dataset, token, apiVersion: '2025-01-01', useCdn: false })

const articles = fs
  .readdirSync(contentDir)
  .filter((f) => f.endsWith('.json'))
  .map((f) => JSON.parse(fs.readFileSync(path.join(contentDir, f), 'utf8')))
  .slice(0, limit)

// Every image file the selected articles use
const srcs = new Set()
const collect = (img) => img?.src && srcs.add(img.src)
for (const a of articles) {
  collect(a.cover)
  for (const b of a.body) {
    collect(b)
    ;(b.items || []).forEach((s) => collect(s.image))
  }
}

const missing = [...srcs].filter((s) => !fs.existsSync(path.join(publicDir, s)))
if (missing.length) {
  console.error('Image files not found:\n' + missing.join('\n'))
  process.exit(1)
}

console.log(`${articles.length} articles, ${srcs.size} images${dry ? ' (dry run)' : ` → ${projectId}/${dataset}`}`)

const assetRef = new Map()
async function upload(src) {
  if (dry) return assetRef.set(src, `image-dry${assetRef.size}-1x1-webp`)
  const asset = await client.assets.upload('image', fs.createReadStream(path.join(publicDir, src)), {
    filename: path.basename(src),
  })
  assetRef.set(src, asset._id)
}

const queue = [...srcs]
let done = 0
await Promise.all(
  Array.from({ length: 4 }, async () => {
    while (queue.length) {
      await upload(queue.shift())
      if (++done % 25 === 0 || done === srcs.size) console.log(`  images ${done}/${srcs.size}`)
    }
  })
)

const imageField = (img) => ({ _type: 'image', asset: { _type: 'reference', _ref: assetRef.get(img.src) } })

let n = 0
for (const a of articles) {
  const doc = {
    _id: `insight-${a.slug}`,
    _type: 'insight',
    title: a.title,
    slug: { _type: 'slug', current: a.slug },
    subtitle: a.subtitle || undefined,
    excerpt: a.excerpt || undefined,
    publishedAt: `${a.date}T09:00:00.000Z`,
    category: a.category,
    topic: a.topic || undefined,
    cover: imageField(a.cover),
    body: modelToSanity(a.body, { image: imageField }),
  }
  if (!dry) await client.createOrReplace(doc)
  console.log(`  ${dry ? 'would create' : 'saved'} ${++n}/${articles.length}  ${a.slug}`)
}
console.log('Done.')
