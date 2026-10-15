'use client'

/**
 * ShareBar — share the article on LinkedIn or copy its link.
 * Uses the address the reader is on, so it works on any domain
 * (preview, staging, production). The plain link is a no-JS fallback.
 */
import { useState } from 'react'
import styles from './ShareBar.module.css'

const IconLinkedIn = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
    <path d="M20.45 20.45h-3.56v-5.57c0-1.33-.03-3.04-1.85-3.04-1.86 0-2.14 1.45-2.14 2.94v5.67H9.35V9h3.41v1.56h.05c.48-.9 1.64-1.85 3.37-1.85 3.6 0 4.27 2.37 4.27 5.46v6.28zM5.34 7.43a2.06 2.06 0 1 1 0-4.12 2.06 2.06 0 0 1 0 4.12zM7.12 20.45H3.56V9h3.56v11.45zM22.22 0H1.77C.79 0 0 .77 0 1.73v20.54C0 23.23.79 24 1.77 24h20.45c.98 0 1.78-.77 1.78-1.73V1.73C24 .77 23.2 0 22.22 0z" />
  </svg>
)

const IconLink = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <path d="M10 13a5 5 0 0 0 7.07 0l3-3a5 5 0 0 0-7.07-7.07l-1.5 1.5" />
    <path d="M14 11a5 5 0 0 0-7.07 0l-3 3a5 5 0 0 0 7.07 7.07l1.5-1.5" />
  </svg>
)

export default function ShareBar({ url, title }) {
  const [copied, setCopied] = useState(false)

  const linkedInHref = `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(url)}`

  function shareLinkedIn(e) {
    e.preventDefault()
    const target = `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(window.location.href)}`
    window.open(target, 'gt-linkedin-share', 'noopener,noreferrer,width=620,height=640')
  }

  async function copyLink() {
    try {
      await navigator.clipboard.writeText(window.location.href)
      setCopied(true)
      setTimeout(() => setCopied(false), 2200)
    } catch {
      window.prompt('Copy this link', window.location.href)
    }
  }

  return (
    <div className={styles.bar}>
      <span className={styles.label}>Share</span>
      <a
        href={linkedInHref}
        onClick={shareLinkedIn}
        target="_blank"
        rel="noopener noreferrer"
        className={styles.btn}
        aria-label={`Share “${title}” on LinkedIn`}
      >
        <IconLinkedIn />
        LinkedIn
      </a>
      <button type="button" className={styles.btn} onClick={copyLink}>
        <IconLink />
        {copied ? 'Link copied' : 'Copy link'}
      </button>
      <span className={styles.status} role="status" aria-live="polite">
        {copied ? 'Link copied to clipboard' : ''}
      </span>
    </div>
  )
}
