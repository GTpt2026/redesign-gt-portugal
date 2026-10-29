/**
 * Receives the website contact form.
 *
 * Stores each message in the PRIVATE Sanity dataset "inbox" (where the team
 * reads it in the Studio, "Mensagens de contacto") and, if configured, also
 * emails a notification. Needs server-side secrets, set in Vercel:
 *
 *   SANITY_API_WRITE_TOKEN   Sanity token with Editor rights (never NEXT_PUBLIC_)
 *   SANITY_INBOX_DATASET     optional, default "inbox"
 *   RESEND_API_KEY           optional, to email a notification (resend.com)
 *   CONTACT_NOTIFY_EMAIL     who receives the notification
 *   CONTACT_FROM_EMAIL       optional sender, default "GT Portugal <onboarding@resend.dev>"
 *
 * Without any of them the form tells the visitor to email instead: it never
 * pretends a message was sent.
 */
import { createClient } from '@sanity/client'
import { looksLikeBot, validateContact } from '@/lib/contact'
import { getSiteSettings } from '@/lib/content'
import { projectId } from '@/lib/sanityClient'

export const runtime = 'nodejs'
export const dynamic = 'force-dynamic'

// Best-effort limit per server instance: 5 messages / 10 minutes / IP
const hits = new Map()
function limited(ip) {
  const now = Date.now()
  const recent = (hits.get(ip) || []).filter((t) => now - t < 10 * 60 * 1000)
  recent.push(now)
  hits.set(ip, recent)
  if (hits.size > 500) hits.clear()
  return recent.length > 5
}

const json = (body, status = 200) => Response.json(body, { status })

async function storeInSanity(msg) {
  const token = process.env.SANITY_API_WRITE_TOKEN
  if (!token || !projectId) return null
  const client = createClient({
    projectId,
    dataset: process.env.SANITY_INBOX_DATASET || 'inbox',
    apiVersion: '2025-01-01',
    token,
    useCdn: false,
  })
  await client.create({ _type: 'contactMessage', handled: false, ...msg })
  return true
}

async function notifyByEmail(msg) {
  const key = process.env.RESEND_API_KEY
  const to = process.env.CONTACT_NOTIFY_EMAIL
  if (!key || !to) return null
  const res = await fetch('https://api.resend.com/emails', {
    method: 'POST',
    headers: { Authorization: `Bearer ${key}`, 'Content-Type': 'application/json' },
    body: JSON.stringify({
      from: process.env.CONTACT_FROM_EMAIL || 'GT Portugal <onboarding@resend.dev>',
      to: [to],
      reply_to: msg.email,
      subject: `Novo contacto do site: ${msg.name}${msg.company ? ` (${msg.company})` : ''}`,
      text: `Nome: ${msg.name}\nEmpresa: ${msg.company}\nEmail: ${msg.email}\nPágina: ${msg.pageUrl || '-'}\n\n${msg.message}\n`,
    }),
  })
  if (!res.ok) throw new Error(`Resend responded ${res.status}`)
  return true
}

export async function POST(request) {
  const settings = await getSiteSettings()
  const fallback = { email: settings.email }

  let body
  try {
    const raw = await request.text()
    if (raw.length > 20_000) return json({ error: 'too_large', ...fallback }, 413)
    body = JSON.parse(raw)
  } catch {
    return json({ error: 'bad_request', ...fallback }, 400)
  }

  const check = validateContact(body)
  if (!check.ok) return json({ error: 'invalid', fields: check.errors, ...fallback }, 400)

  // Bots get a normal-looking answer, and nothing is stored or sent
  if (looksLikeBot(body)) return json({ ok: true })

  const ip = (request.headers.get('x-forwarded-for') || 'unknown').split(',')[0].trim()
  if (limited(ip)) return json({ error: 'rate_limited', ...fallback }, 429)

  const referer = request.headers.get('referer') || ''
  let pageUrl = ''
  try { pageUrl = new URL(referer).pathname.slice(0, 200) } catch {}
  const msg = { ...check.value, receivedAt: new Date().toISOString(), pageUrl }

  // Development only: lets the form be tested without any secrets
  if (process.env.NODE_ENV !== 'production' && process.env.CONTACT_DRY_RUN === '1') return json({ ok: true, dryRun: true })

  const configured = Boolean(process.env.SANITY_API_WRITE_TOKEN) || Boolean(process.env.RESEND_API_KEY && process.env.CONTACT_NOTIFY_EMAIL)
  if (!configured) {
    console.error('[contact] not configured: set SANITY_API_WRITE_TOKEN and/or RESEND_API_KEY + CONTACT_NOTIFY_EMAIL')
    return json({ error: 'not_configured', ...fallback }, 503)
  }

  const results = await Promise.allSettled([storeInSanity(msg), notifyByEmail(msg)])
  results.forEach((r) => r.status === 'rejected' && console.error('[contact]', r.reason?.message || r.reason))
  const delivered = results.some((r) => r.status === 'fulfilled' && r.value === true)
  return delivered ? json({ ok: true }) : json({ error: 'send_failed', ...fallback }, 502)
}
