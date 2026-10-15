/**
 * Converters between the site's article model (content/insights/*.json,
 * the shape every component renders) and Sanity's stored shape
 * (Portable Text blocks + a few custom objects).
 *
 *   modelToSanity(body, { image })  used by scripts/import-insights-to-sanity.mjs
 *   sanityToModel(body, { image })  used by lib/sanityInsights.js
 *
 * Both take an `image` callback so this file stays free of any network or
 * filesystem code, and can be round-trip tested offline.
 *
 * Inline text uses the tiny markup the components understand:
 * **bold**, _italic_, [label](url).
 */

const LINK = /\[([^\]]+)\]\(([^)\s]+)\)/
const BOLD = /\*\*(.+?)\*\*/
const ITALIC = /(?<![\w])_(.+?)_(?![\w])/

/** md string -> [{ text, strong, em, href }] */
export function parseInline(str, marks = {}) {
  for (const [re, mark] of [
    [LINK, (m) => ({ ...marks, href: m[2] })],
    [BOLD, () => ({ ...marks, strong: true })],
    [ITALIC, () => ({ ...marks, em: true })],
  ]) {
    const m = re.exec(str)
    if (!m) continue
    return [
      ...(m.index ? parseInline(str.slice(0, m.index), marks) : []),
      ...parseInline(m[1], mark(m)),
      ...parseInline(str.slice(m.index + m[0].length), marks),
    ]
  }
  return str ? [{ text: str, ...marks }] : []
}

export function plain(md) {
  return parseInline(md).map((s) => s.text).join('')
}

/** [{ text, strong, em, href }] -> md string */
function segmentsToMd(segments) {
  return segments
    .map(({ text, strong, em, href }) => {
      const lead = text.slice(0, text.length - text.trimStart().length)
      const trail = text.slice(text.trimEnd().length)
      let core = text.trim()
      if (!core) return text
      if (strong) core = `**${core}**`
      if (em) core = `_${core}_`
      if (href) core = `[${core}](${href})`
      return lead + core + trail
    })
    .join('')
}

/* ── model -> Sanity ─────────────────────────────────────────────── */

export function modelToSanity(body, { image }) {
  let n = 0
  const key = () => `k${(n++).toString(36)}`

  function textBlock(md, style = 'normal', list) {
    const markDefs = []
    const children = parseInline(md).map((seg) => {
      const marks = []
      if (seg.strong) marks.push('strong')
      if (seg.em) marks.push('em')
      if (seg.href) {
        const k = key()
        markDefs.push({ _key: k, _type: 'link', href: seg.href })
        marks.push(k)
      }
      return { _key: key(), _type: 'span', text: seg.text, marks }
    })
    return {
      _key: key(),
      _type: 'block',
      style,
      markDefs,
      children: children.length ? children : [{ _key: key(), _type: 'span', text: '', marks: [] }],
      ...(list ? { listItem: list, level: 1 } : {}),
    }
  }

  const out = []
  for (const b of body) {
    switch (b.type) {
      case 'heading':
        out.push(textBlock(b.text, `h${b.level}`))
        break
      case 'paragraph':
        out.push(textBlock(b.text))
        break
      case 'quote':
        out.push(textBlock(b.text, 'blockquote'))
        break
      case 'list':
        for (const item of b.items) out.push(textBlock(item, 'normal', b.ordered ? 'number' : 'bullet'))
        break
      case 'lead':
        out.push({ _key: key(), _type: 'lead', heading: b.heading || undefined, text: plain(b.text || '') || undefined })
        break
      case 'image':
        out.push({ _key: key(), _type: 'bodyImage', image: image(b), alt: b.alt || undefined })
        break
      case 'banner':
        out.push({ _key: key(), _type: 'banner', image: image(b), caption: b.caption || undefined })
        break
      case 'video':
        out.push({
          _key: key(),
          _type: 'video',
          url: b.href,
          title: b.title || undefined,
          ...(b.src ? { poster: image(b) } : {}),
        })
        break
      case 'steps':
        out.push({
          _key: key(),
          _type: 'steps',
          items: b.items.map((s) => ({
            _key: key(),
            _type: 'step',
            heading: s.heading,
            text: plain(s.text || ''),
            ...(s.image ? { image: image(s.image) } : {}),
          })),
        })
        break
    }
  }
  return out
}

/* ── Sanity -> model ─────────────────────────────────────────────── */

function blockToMd(block) {
  const defs = new Map((block.markDefs || []).map((d) => [d._key, d]))
  const segments = (block.children || [])
    .filter((c) => c._type === 'span')
    .map((c) => {
      const marks = c.marks || []
      const link = marks.map((m) => defs.get(m)).find((d) => d?._type === 'link')
      return { text: c.text || '', strong: marks.includes('strong'), em: marks.includes('em'), href: link?.href }
    })
  return segmentsToMd(segments).trim()
}

export function sanityToModel(body = [], { image }) {
  const out = []
  for (const b of body) {
    if (!b) continue
    switch (b._type) {
      case 'block': {
        const md = blockToMd(b)
        if (!plain(md).trim()) break
        if (b.listItem) {
          const ordered = b.listItem === 'number'
          const last = out[out.length - 1]
          if (last?.type === 'list' && last.ordered === ordered) last.items.push(md)
          else out.push({ type: 'list', ordered, items: [md] })
        } else if (/^h[2-6]$/.test(b.style)) {
          out.push({ type: 'heading', level: Math.min(4, Number(b.style[1])), text: plain(md) })
        } else if (b.style === 'blockquote') {
          out.push({ type: 'quote', text: md })
        } else {
          // One paragraph per block; soft line breaks stay inside the text
          out.push({ type: 'paragraph', text: md })
        }
        break
      }
      case 'lead':
        if (b.heading || b.text) out.push({ type: 'lead', heading: b.heading || '', text: b.text || '' })
        break
      case 'bodyImage': {
        const img = image(b.image, 'body')
        if (img) out.push({ type: 'image', alt: b.alt || '', ...img })
        break
      }
      case 'banner': {
        const img = image(b.image, 'banner')
        if (img) out.push({ type: 'banner', caption: b.caption || '', alt: '', ...img })
        break
      }
      case 'video': {
        const img = image(b.poster, 'banner')
        if (b.url) out.push({ type: 'video', href: b.url, title: b.title || 'Watch the video', alt: '', ...(img || {}) })
        break
      }
      case 'steps':
        out.push({
          type: 'steps',
          items: (b.items || []).map((s) => {
            const img = image(s.image, 'step')
            return { heading: s.heading || '', text: s.text || '', ...(img ? { image: { alt: '', ...img } } : {}) }
          }),
        })
        break
    }
  }
  return out
}
