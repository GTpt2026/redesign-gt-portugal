#!/usr/bin/env node
/**
 * GT Portugal — Production Asset Downloader
 * ─────────────────────────────────────────
 * Crawls key pages on gtportugal.com, collects all image URLs,
 * downloads them into _downloads/{page}/ folders, and prints a
 * manifest so you can see exactly what was grabbed.
 *
 * Usage:
 *   node scripts/download-assets.js
 *
 * No npm packages required — uses only Node.js built-ins.
 * Node.js 16+ recommended.
 *
 * After running, check _downloads/ and move files to their
 * correct public/images/ paths using the manifest printed below.
 */

'use strict'

const https   = require('https')
const http    = require('http')
const fs      = require('fs')
const path    = require('path')
const { URL } = require('url')

/* ── Config ─────────────────────────────────────────────────── */

const BASE_URL  = 'https://www.gtportugal.com'
const OUT_ROOT  = path.resolve(__dirname, '..', '_downloads')

// Pages to crawl → which subfolder to save their images in
// About page lives at /about-gt-portugal on the production site
const PAGES = [
  { path: '/',                    folder: 'home'           },
  { path: '/textiles',            folder: 'textiles'       },
  { path: '/footwear',            folder: 'footwear'       },
  { path: '/sustainability',      folder: 'sustainability' },
  { path: '/about-gt-portugal',   folder: 'about'          },
]

// Suggested mapping: if a downloaded filename contains one of these
// keywords, the manifest will suggest the final public/ destination.
const SUGGESTIONS = [
  // Heroes
  { match: /textile|garment|fabric/i,      dest: 'public/images/heroes/textiles.jpg'       },
  { match: /footwear|shoe|boot|sneaker/i,  dest: 'public/images/heroes/footwear.jpg'       },
  { match: /sustain|solar|green|eco/i,     dest: 'public/images/heroes/sustainability.jpg' },
  { match: /about|building|facade|office/i,dest: 'public/images/heroes/about.jpg'          },
  // Textiles product grid
  { match: /activewear|active/i,           dest: 'public/images/textiles/activewear.jpg'   },
  { match: /knitwear|knit/i,               dest: 'public/images/textiles/knitwear.jpg'     },
  { match: /swimwear|swim/i,               dest: 'public/images/textiles/swimwear.jpg'     },
  { match: /outerwear|outer|jacket|coat/i, dest: 'public/images/textiles/outerwear.jpg'    },
  { match: /woven|soft.?woven/i,           dest: 'public/images/textiles/softwoven.jpg'    },
  { match: /jersey/i,                      dest: 'public/images/textiles/jersey.jpg'       },
  { match: /denim|jean/i,                  dest: 'public/images/textiles/denim.jpg'        },
  // Footwear product grid
  { match: /classic|oxford|brogue/i,       dest: 'public/images/footwear/classic.jpg'      },
  { match: /sneaker|trainer|sport.shoe/i,  dest: 'public/images/footwear/sneakers.jpg'     },
  { match: /boots?(?!strap)/i,             dest: 'public/images/footwear/boots.jpg'        },
  { match: /casual|loafer|slip/i,          dest: 'public/images/footwear/casual.jpg'       },
  // Sustainability banners
  { match: /gots|certif|organic/i,         dest: 'public/images/sustainability/certifications-bg.jpg' },
  // About banners
  { match: /value|people|team|beach/i,     dest: 'public/images/about/values-bg.jpg'       },
  { match: /strive|factory|worker|machine/i,dest: 'public/images/about/strive-bg.jpg'      },
  // Funding logos
  { match: /norte.?2030/i,                 dest: 'public/images/funding/norte2030.svg'     },
  { match: /portugal.?2030/i,              dest: 'public/images/funding/portugal2030.svg'  },
  { match: /europa|european|union|eu/i,    dest: 'public/images/funding/eu.svg'            },
]

/* ── HTTP helpers ────────────────────────────────────────────── */

function httpGet(url, redirects = 0) {
  return new Promise((resolve, reject) => {
    if (redirects > 6) return reject(new Error('Too many redirects: ' + url))
    const parsed = new URL(url)
    const lib    = parsed.protocol === 'https:' ? https : http
    const req    = lib.get(url, {
      headers: {
        'User-Agent': 'Mozilla/5.0 (compatible; GTPortugalBot/1.0; asset crawler)',
        'Accept':     'text/html,application/xhtml+xml,*/*',
      }
    }, res => {
      // Follow redirects
      if (res.statusCode >= 300 && res.statusCode < 400 && res.headers.location) {
        const next = new URL(res.headers.location, url).href
        res.resume()
        return resolve(httpGet(next, redirects + 1))
      }
      const chunks = []
      res.on('data', c => chunks.push(c))
      res.on('end',  () => resolve({ status: res.statusCode, body: Buffer.concat(chunks).toString('utf8'), finalUrl: url }))
      res.on('error', reject)
    })
    req.on('error', reject)
    req.setTimeout(15000, () => { req.destroy(); reject(new Error('Timeout: ' + url)) })
  })
}

function downloadFile(url, dest, redirects = 0) {
  return new Promise((resolve, reject) => {
    if (redirects > 6) return reject(new Error('Too many redirects: ' + url))
    const parsed = new URL(url)
    const lib    = parsed.protocol === 'https:' ? https : http
    // Ensure directory exists
    fs.mkdirSync(path.dirname(dest), { recursive: true })
    const tmp  = dest + '.tmp'
    const file = fs.createWriteStream(tmp)
    const req  = lib.get(url, {
      headers: { 'User-Agent': 'Mozilla/5.0 (compatible; GTPortugalBot/1.0; asset crawler)' }
    }, res => {
      if (res.statusCode >= 300 && res.statusCode < 400 && res.headers.location) {
        file.close()
        try { fs.unlinkSync(tmp) } catch (_) {}
        const next = new URL(res.headers.location, url).href
        res.resume()
        return resolve(downloadFile(next, dest, redirects + 1))
      }
      if (res.statusCode !== 200) {
        file.close()
        try { fs.unlinkSync(tmp) } catch (_) {}
        return reject(new Error(`HTTP ${res.statusCode}: ${url}`))
      }
      res.pipe(file)
      file.on('finish', () => {
        file.close()
        fs.renameSync(tmp, dest)
        resolve(dest)
      })
    })
    file.on('error', err => { try { fs.unlinkSync(tmp) } catch (_) {}; reject(err) })
    req.on('error',  err => { file.close(); try { fs.unlinkSync(tmp) } catch (_) {}; reject(err) })
    req.setTimeout(30000, () => { req.destroy(); reject(new Error('Download timeout: ' + url)) })
  })
}

/* ── Image URL extraction ────────────────────────────────────── */

// Decode common HTML entities that appear in attribute values
function decodeEntities(str) {
  return str
    .replace(/&quot;/g, '"')
    .replace(/&#39;/g,  "'")
    .replace(/&amp;/g,  '&')
    .replace(/&lt;/g,   '<')
    .replace(/&gt;/g,   '>')
}

function extractImageUrls(html, pageUrl) {
  const base = new URL(pageUrl)
  const urls = new Set()

  const resolve = rawSrc => {
    if (!rawSrc) return null
    rawSrc = decodeEntities(rawSrc.trim())
    if (rawSrc.startsWith('data:')) return null          // skip base64
    try {
      const u = new URL(rawSrc, base)
      // Only grab images from the same domain
      if (u.hostname !== base.hostname && !u.hostname.endsWith('.' + base.hostname)) {
        // Allow common CDN patterns containing the brand name
        if (!u.href.includes('gtportugal')) return null
      }
      return u.href
    } catch { return null }
  }

  // <img src="...">  <img data-src="...">  <img data-lazy-src="...">
  const imgRe = /<img[^>]+>/gi
  let m
  while ((m = imgRe.exec(html)) !== null) {
    const tag  = m[0]
    const attrs = ['src', 'data-src', 'data-lazy-src', 'data-original']
    attrs.forEach(attr => {
      const re  = new RegExp(`${attr}=["']([^"']+)["']`, 'i')
      const hit = tag.match(re)
      if (hit) { const u = resolve(hit[1]); if (u) urls.add(u) }
    })
    // srcset="url1 1x, url2 2x" → grab the first (largest) URL
    const srcset = tag.match(/srcset=["']([^"']+)["']/i)
    if (srcset) {
      const first = srcset[1].trim().split(/[\s,]+/)[0]
      const u = resolve(first)
      if (u) urls.add(u)
    }
  }

  // CSS background-image: url('...')
  const bgRe = /background(?:-image)?:\s*url\(["']?([^"')]+)["']?\)/gi
  while ((m = bgRe.exec(html)) !== null) {
    const u = resolve(m[1])
    if (u) urls.add(u)
  }

  // <source srcset="...">
  const sourceRe = /<source[^>]+srcset=["']([^"']+)["']/gi
  while ((m = sourceRe.exec(html)) !== null) {
    const first = m[1].trim().split(/[\s,]+/)[0]
    const u = resolve(first)
    if (u) urls.add(u)
  }

  return [...urls].filter(u => isImageUrl(u))
}

function isImageUrl(url) {
  // Accept common image extensions; reject obvious non-images
  const lower = url.toLowerCase().split('?')[0]
  // Also accept Plone @@images URLs that end in /image.png but have a real image path
  if (lower.includes('/@@images/')) return true
  return /\.(jpe?g|png|webp|gif|svg|avif)(\?|$)/.test(lower)
}

// Plone CMS appends /@@images/image.png (or /@@images/image-NNNxNNN.jpeg)
// to every image URL for scaling. Strip that to get the real original URL
// and a meaningful filename.
function normalisePloneUrl(url) {
  // e.g. https://gtportugal.com/images/knitwear-thumbnail.jpg/@@images/image.png
  //  →   https://gtportugal.com/images/knitwear-thumbnail.jpg
  const ploneRe = /^(https?:\/\/.+?)\/@@images\/.+$/
  const m = url.match(ploneRe)
  return m ? m[1] : url
}

function urlToFilename(url) {
  const canonical = normalisePloneUrl(url)
  const u    = new URL(canonical)
  const base = path.basename(u.pathname)
  // Remove WP-style sizing suffixes like image-800x600.jpg
  return base.replace(/-\d+x\d+(\.[a-z]+)$/, '$1')
}

function suggestDest(filename) {
  for (const s of SUGGESTIONS) {
    if (s.match.test(filename)) return s.dest
  }
  return null
}

/* ── About page URL discovery ────────────────────────────────── */

async function findAboutUrl() {
  // Try common paths in order
  const candidates = [
    '/about', '/about-gt-portugal', '/about-us', '/sobre',
    '/sobre-nos', '/en/about', '/quem-somos'
  ]
  for (const p of candidates) {
    try {
      const res = await httpGet(BASE_URL + p)
      if (res.status === 200) {
        console.log(`  ℹ About page found at: ${p}`)
        return p
      }
    } catch { /* try next */ }
  }
  // Last resort: look for About link in homepage HTML
  try {
    const home = await httpGet(BASE_URL + '/')
    const m = home.body.match(/href=["']([^"']*about[^"']*)["']/i)
    if (m) {
      const u = new URL(m[1], BASE_URL)
      if (u.hostname === new URL(BASE_URL).hostname) {
        console.log(`  ℹ About page found via nav: ${u.pathname}`)
        return u.pathname
      }
    }
  } catch { /* give up */ }
  return null
}

/* ── Main ────────────────────────────────────────────────────── */

async function crawlPage(page) {
  const url    = BASE_URL + page.path
  const folder = path.join(OUT_ROOT, page.folder)
  fs.mkdirSync(folder, { recursive: true })

  process.stdout.write(`\n📄 Crawling ${url} … `)
  let res
  try {
    res = await httpGet(url)
  } catch (err) {
    console.log(`FAILED (${err.message})`)
    return []
  }

  if (res.status !== 200) {
    console.log(`HTTP ${res.status} — skipping`)
    return []
  }

  const imageUrls = extractImageUrls(res.body, url)
  console.log(`found ${imageUrls.length} images`)

  // Build deduplicated list: { downloadUrl (original, may be @@images), name (clean) }
  const seen = new Set()
  const queue = []
  for (const imgUrl of imageUrls) {
    const cleanName = urlToFilename(imgUrl)   // strips @@images, uses real filename
    if (seen.has(cleanName)) continue
    seen.add(cleanName)
    queue.push({ downloadUrl: imgUrl, cleanName })
  }

  const downloaded = []
  for (const { downloadUrl, cleanName } of queue) {
    // Handle filename collisions by appending a counter
    let dest = path.join(folder, cleanName)
    if (fs.existsSync(dest)) {
      const ext   = path.extname(cleanName)
      const base2 = path.basename(cleanName, ext)
      let count = 2
      while (fs.existsSync(path.join(folder, `${base2}-${count}${ext}`))) count++
      dest = path.join(folder, `${base2}-${count}${ext}`)
    }

    // Skip if already downloaded in a previous run (re-run safe)
    if (fs.existsSync(dest)) {
      downloaded.push({ url: downloadUrl, dest, skipped: true })
      process.stdout.write('↩ ')
      continue
    }

    try {
      await downloadFile(downloadUrl, dest)  // use original URL (@@images works, direct may 500)
      process.stdout.write('✓ ')
      downloaded.push({ url: downloadUrl, dest, skipped: false })
    } catch (err) {
      process.stdout.write('  ✗ ')
      // Non-fatal — just log it
      downloaded.push({ url: downloadUrl, dest, error: err.message })
    }
  }

  return downloaded
}

async function main() {
  console.log('━'.repeat(60))
  console.log('  GT Portugal — Asset Downloader')
  console.log('  Target: ' + BASE_URL)
  console.log('  Output: ' + OUT_ROOT)
  console.log('━'.repeat(60))

  // Auto-discover about page URL
  process.stdout.write('\n🔍 Finding About page URL… ')
  const aboutPath = await findAboutUrl()
  const pages = PAGES.map(p =>
    p.folder === 'about' ? { ...p, path: aboutPath || p.path } : p
  )
  if (!aboutPath) console.log('not found — will try /about as fallback')

  const manifest = []

  for (const page of pages) {
    const results = await crawlPage(page)
    for (const r of results) {
      const filename    = path.basename(r.dest)
      const suggestion  = suggestDest(filename)
      manifest.push({ page: page.folder, file: r.dest, url: r.url, suggestion, error: r.error })
    }
  }

  // ── Print manifest ─────────────────────────────────────────

  console.log('\n\n' + '━'.repeat(60))
  console.log('  MANIFEST — ' + manifest.length + ' images processed')
  console.log('━'.repeat(60))

  const byPage = {}
  manifest.forEach(m => {
    if (!byPage[m.page]) byPage[m.page] = []
    byPage[m.page].push(m)
  })

  for (const [page, items] of Object.entries(byPage)) {
    console.log(`\n  📁 ${page}/`)
    for (const item of items) {
      if (item.error) {
        console.log(`     ✗ ${path.basename(item.file)} — ${item.error}`)
      } else {
        const arrow = item.suggestion ? `  →  ${item.suggestion}` : ''
        console.log(`     ✓ ${path.basename(item.file)}${arrow}`)
      }
    }
  }

  // ── Write manifest JSON ────────────────────────────────────

  const manifestPath = path.join(OUT_ROOT, 'manifest.json')
  fs.writeFileSync(manifestPath, JSON.stringify(manifest, null, 2))
  console.log('\n\n📋 Full manifest saved to: ' + manifestPath)

  // ── Copy helper ────────────────────────────────────────────

  const suggested = manifest.filter(m => m.suggestion && !m.error)
  if (suggested.length > 0) {
    console.log('\n' + '━'.repeat(60))
    console.log('  AUTO-PLACE — run this to copy files to their final paths:')
    console.log('━'.repeat(60))
    console.log('\n  node scripts/place-assets.js\n')

    // Write the place-assets script
    const placeScript = `#!/usr/bin/env node
// Auto-generated by download-assets.js
// Run this to copy downloaded images to their final public/ paths.
'use strict'
const fs   = require('fs')
const path = require('path')
const ROOT = path.resolve(__dirname, '..')

const moves = ${JSON.stringify(suggested.map(m => ({ from: m.file, to: path.join('ROOT', m.suggestion) })), null, 2).replace(/"ROOT"/g, 'ROOT')}

moves.forEach(({ from, to }) => {
  const dest = path.join(ROOT, ...to.replace(ROOT + '/', '').split('/'))
  fs.mkdirSync(path.dirname(dest), { recursive: true })
  fs.copyFileSync(from, dest)
  console.log('✓ Copied: ' + path.relative(ROOT, dest))
})

console.log('\\nDone! ' + moves.length + ' files placed into public/images/')
`
    fs.writeFileSync(path.join(__dirname, 'place-assets.js'), placeScript)
    console.log('  (place-assets.js was written to scripts/)')
  }

  console.log('\n✅ Download complete. Files are in: _downloads/\n')
}

main().catch(err => {
  console.error('\n❌ Fatal error:', err.message)
  process.exit(1)
})
