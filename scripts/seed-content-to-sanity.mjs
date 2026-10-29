/**
 * Fills Sanity with the content the site shows today (site settings, home
 * page, textiles page and the 8 textile categories, with their images), so
 * the marketing team opens the Studio and finds everything already there.
 *
 * Safe to run more than once: documents are only CREATED if they do not
 * exist, so edits made in the Studio are never overwritten. Use --force to
 * deliberately reset a document to the original content.
 *
 *   Dry run (no network): node scripts/seed-content-to-sanity.mjs --dry
 *   Real run:             bash scripts/seed-content.sh   (asks for the token)
 */
import fs from 'node:fs'
import path from 'node:path'
import { fileURLToPath } from 'node:url'
import { createClient } from '@sanity/client'
import { homeDefaults } from '../content/defaults/home.mjs'
import { siteDefaults } from '../content/defaults/site.mjs'
import { textilesPageDefaults } from '../content/defaults/textilesPage.mjs'
const { categories } = await import('../app/textiles/categories-data.js')

const root = path.join(path.dirname(fileURLToPath(import.meta.url)), '..')
const publicDir = path.join(root, 'public')

const dry = process.argv.includes('--dry')
const force = process.argv.includes('--force')
const projectId = process.env.SANITY_PROJECT_ID || process.env.NEXT_PUBLIC_SANITY_PROJECT_ID
const dataset = process.env.SANITY_DATASET || process.env.NEXT_PUBLIC_SANITY_DATASET || 'production'
const token = process.env.SANITY_WRITE_TOKEN

if (!dry && (!projectId || !token)) {
  console.error('Missing SANITY_PROJECT_ID and/or SANITY_WRITE_TOKEN. Use scripts/seed-content.sh, or --dry to test.')
  process.exit(1)
}
const client = dry ? null : createClient({ projectId, dataset, token, apiVersion: '2025-01-01', useCdn: false })

/* ── image upload (deduplicated; Sanity also de-duplicates identical files) ── */
const refs = new Map()
const wanted = new Set()
const want = (src) => src && wanted.add(src)
const detailOf = (c) => `/images/textiles/details/${c.slug}-v2.webp`

want(null)
homeDefaults.clients.forEach((c) => want(`/images/clients/${c.slug}.svg`))
homeDefaults.testimonials.forEach((t) => want(t.logoSrc))
for (const c of categories) {
  ;[c.cardImage, detailOf(c), c.image, c.statBanner?.image, ...(c.gallery || []), ...(c.productGrid || [])].forEach(want)
}

const missing = [...wanted].filter((s) => !fs.existsSync(path.join(publicDir, s)))
if (missing.length) {
  console.error('Image files not found:\n' + missing.join('\n'))
  process.exit(1)
}
console.log(`${categories.length} categories, ${wanted.size} images${dry ? ' (dry run)' : ` → ${projectId}/${dataset}`}`)

async function upload(src) {
  if (dry) return refs.set(src, `image-dry${refs.size}-1x1-webp`)
  const asset = await client.assets.upload('image', fs.createReadStream(path.join(publicDir, src)), { filename: path.basename(src) })
  refs.set(src, asset._id)
}
const queue = [...wanted]
let done = 0
await Promise.all(
  Array.from({ length: 4 }, async () => {
    while (queue.length) {
      await upload(queue.shift())
      if (++done % 25 === 0 || done === wanted.size) console.log(`  images ${done}/${wanted.size}`)
    }
  })
)

const img = (src) => (src ? { _type: 'image', asset: { _type: 'reference', _ref: refs.get(src) } } : undefined)
const keyed = (arr, i0 = 0) => arr.map((v, i) => ({ _key: `k${i0 + i}`, ...v }))
const imgList = (list = []) => list.map((src, i) => ({ _key: `i${i}`, ...img(src) }))
const strip = (o) => JSON.parse(JSON.stringify(o)) // drop undefined

/* ── documents ── */
const docs = []

docs.push({ _id: 'siteSettings', _type: 'siteSettings', ...siteDefaults })

docs.push({
  _id: 'homePage',
  _type: 'homePage',
  stats: keyed(homeDefaults.stats.map((s) => ({ _type: 'stat', ...s }))),
  clientsTitle: homeDefaults.clientsTitle,
  clients: keyed(homeDefaults.clients.map((c) => ({ _type: 'client', name: c.name, wide: Boolean(c.wide), logo: img(`/images/clients/${c.slug}.svg`) }))),
  testimonialsTitle: homeDefaults.testimonialsTitle,
  testimonials: keyed(homeDefaults.testimonials.map((t) => ({ _type: 'testimonial', quote: t.quote, name: t.name, role: t.role, logo: img(t.logoSrc) }))),
})

docs.push({
  _id: 'textilesPage',
  _type: 'textilesPage',
  heroEyebrow: textilesPageDefaults.heroEyebrow,
  heroHeadline: textilesPageDefaults.heroHeadline,
  introEyebrow: textilesPageDefaults.introEyebrow,
  introTitle: textilesPageDefaults.introTitle,
  introDescription: textilesPageDefaults.introDescription,
  stats: keyed(textilesPageDefaults.stats.map((s) => ({ _type: 'stat', ...s }))),
  seo: { _type: 'seo', ...textilesPageDefaults.seo },
})

categories.forEach((c, i) => {
  docs.push({
    _id: `textileCategory-${c.slug}`,
    _type: 'textileCategory',
    title: c.title,
    slug: { _type: 'slug', current: c.slug },
    order: i + 1,
    tagline: c.tagline,
    cardDescription: c.cardDescription,
    description: c.description,
    cardImage: img(c.cardImage),
    detailImage: img(detailOf(c)),
    heroImage: img(c.image),
    gallery: imgList(c.gallery),
    productGrid: imgList(c.productGrid),
    productGridColumns: c.productGridColumns,
    features: keyed((c.features || []).map((f) => ({ _type: 'feature', ...f }))),
    statBanner: c.statBanner && { image: img(c.statBanner.image), title: c.statBanner.title, stat: c.statBanner.stat, description: c.statBanner.description },
    crossLinks: keyed((c.crossLinks || []).map((l) => ({ _type: 'crossLink', ...l }))),
  })
})

const dumpIdx = process.argv.indexOf('--dump')
if (dumpIdx > -1) fs.writeFileSync(process.argv[dumpIdx + 1], JSON.stringify(docs.map(strip), null, 1))

let created = 0
for (const raw of docs) {
  const doc = strip(raw)
  if (!dry) await (force ? client.createOrReplace(doc) : client.createIfNotExists(doc))
  console.log(`  ${dry ? 'would save' : force ? 'saved (forced)' : 'ensured'} ${doc._id}`)
  created++
}
console.log(`Done. ${created} documents.${dry ? '' : force ? '' : ' Existing documents were left untouched.'}`)
