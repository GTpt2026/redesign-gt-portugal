'use client'

/**
 * ContactSection
 * Simplified form: Name, Email, Company, Message — single column, half-width on desktop.
 */
import { useState } from 'react'
import ButtonAnimated from '@/components/ui/ButtonAnimated'
import styles from './ContactSection.module.css'

/* ─── Icons ─────────────────────────────────────────────────── */
const IconLocation = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
    <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z"/>
  </svg>
)

const IconPhone = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
    <path d="M6.62 10.79c1.44 2.83 3.76 5.14 6.59 6.59l2.2-2.2c.27-.27.67-.36 1.02-.24 1.12.37 2.33.57 3.57.57.55 0 1 .45 1 1V20c0 .55-.45 1-1 1-9.39 0-17-7.61-17-17 0-.55.45-1 1-1h3.5c.55 0 1 .45 1 1 0 1.25.2 2.45.57 3.57.11.35.03.74-.25 1.02l-2.2 2.2z"/>
  </svg>
)

const IconArrowRight = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none"
    stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <line x1="5" y1="12" x2="19" y2="12" />
    <polyline points="12 5 19 12 12 19" />
  </svg>
)

/* ─── Component ─────────────────────────────────────────────── */
export default function ContactSection({ title = 'Get In Touch Now' }) {
  const [form, setForm] = useState({ name: '', email: '', company: '', message: '' })
  const [submitted, setSubmitted] = useState(false)

  function handleChange(e) {
    setForm(prev => ({ ...prev, [e.target.name]: e.target.value }))
  }

  function handleSubmit(e) {
    e.preventDefault()
    setSubmitted(true)
    setForm({ name: '', email: '', company: '', message: '' })
  }

  return (
    <section className={`section ${styles.section}`}>
      <div className="container">
        <div className={styles.card} data-reveal>

          {/* ── Card header ─────────────────────────────────── */}
          <div className={styles.cardHeader}>
            <h2 className={styles.title}>{title}</h2>
          </div>

          {/* ── Form ────────────────────────────────────────── */}
          {submitted ? (
            <p className={styles.success}>
              Thank you — we&apos;ll be in touch soon.
            </p>
          ) : (
            <div className={styles.formWrapper}>
              <form className={styles.form} onSubmit={handleSubmit} noValidate>
                <input
                  name="name" value={form.name} onChange={handleChange}
                  placeholder="Your Name" className={styles.input} required
                />
                <input
                  name="email" value={form.email} onChange={handleChange}
                  placeholder="Email Address" type="email"
                  className={styles.input} required
                />
                <input
                  name="company" value={form.company} onChange={handleChange}
                  placeholder="Your Company Name" className={styles.input}
                />
                <textarea
                  name="message" value={form.message} onChange={handleChange}
                  placeholder="Write your message here"
                  className={`${styles.input} ${styles.message}`} required
                />
                <ButtonAnimated
                  type="submit"
                  className={styles.submitBtn}
                  iconRight={<IconArrowRight />}
                >
                  Contact us
                </ButtonAnimated>
              </form>
            </div>
          )}

        </div>
      </div>
    </section>
  )
}
