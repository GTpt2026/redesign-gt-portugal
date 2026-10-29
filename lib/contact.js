/** Validation for the contact form (pure, so it can be tested without a server). */

const EMAIL = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/

// strip control characters; keep line breaks only where they make sense
const oneLine = (v) => String(v ?? '').replace(/[\u0000-\u001f\u007f]+/g, ' ').replace(/\s+/g, ' ').trim()
const multiLine = (v) => String(v ?? '').replace(/\r\n?/g, '\n').replace(/[\u0000-\u0009\u000b-\u001f\u007f]/g, '').trim()

export const LIMITS = { name: 120, email: 254, company: 160, message: 5000 }

/** @returns {{ ok: boolean, value?: object, errors?: Record<string,string> }} */
export function validateContact(input = {}) {
  const value = {
    name: oneLine(input.name),
    email: oneLine(input.email).toLowerCase(),
    company: oneLine(input.company),
    message: multiLine(input.message),
  }
  const errors = {}
  if (!value.name) errors.name = 'required'
  else if (value.name.length > LIMITS.name) errors.name = 'too_long'
  if (!value.email) errors.email = 'required'
  else if (value.email.length > LIMITS.email || !EMAIL.test(value.email)) errors.email = 'invalid'
  if (!value.company) errors.company = 'required'
  else if (value.company.length > LIMITS.company) errors.company = 'too_long'
  if (!value.message) errors.message = 'required'
  else if (value.message.length > LIMITS.message) errors.message = 'too_long'
  return Object.keys(errors).length ? { ok: false, errors } : { ok: true, value }
}

/** Bots tend to fill the hidden field or submit within a blink of the page loading. */
export function looksLikeBot({ website, elapsedMs }) {
  if (website) return true
  return typeof elapsedMs === 'number' && elapsedMs < 1500
}
