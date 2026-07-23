'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import ButtonAnimated from '@/components/ui/ButtonAnimated'
import styles from './Header.module.css'

const navLinks = [
  { href: '/',               label: 'Home'             },
  { href: '/textiles',       label: 'Textiles'         },
  { href: '/footwear',       label: 'Footwear'         },
  { href: '/sustainability', label: 'Sustainability'   },
  { href: '/about',          label: 'About GT Portugal'},
]

const IconClose = () => (
  <svg width="28" height="28" viewBox="0 0 24 24" fill="none"
    stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" aria-hidden="true">
    <line x1="18" y1="6"  x2="6"  y2="18" />
    <line x1="6"  y1="6"  x2="18" y2="18" />
  </svg>
)

const IconSun = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none"
    stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <circle cx="12" cy="12" r="4" />
    <line x1="12" y1="2"  x2="12" y2="4"  />
    <line x1="12" y1="20" x2="12" y2="22" />
    <line x1="4.22" y1="4.22"  x2="5.64" y2="5.64"  />
    <line x1="18.36" y1="18.36" x2="19.78" y2="19.78" />
    <line x1="2"  y1="12" x2="4"  y2="12" />
    <line x1="20" y1="12" x2="22" y2="12" />
    <line x1="4.22" y1="19.78" x2="5.64" y2="18.36" />
    <line x1="18.36" y1="5.64" x2="19.78" y2="4.22" />
  </svg>
)

const IconMoon = () => (
  <svg width="15" height="15" viewBox="0 0 24 24" fill="none"
    stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <path d="M21 12.79A9 9 0 1 1 11.21 3a7 7 0 0 0 9.79 9.79z" />
  </svg>
)

export default function Header() {
  const [menuOpen, setMenuOpen]  = useState(false)
  const [scrolled, setScrolled]  = useState(false)
  const [isDark,   setIsDark]    = useState(false)
  const pathname = usePathname()

  // Transparent only on the homepage before the user scrolls
  const isTransparent = pathname === '/' && !scrolled

  // Scroll listener
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  // Close on route change
  useEffect(() => { setMenuOpen(false) }, [pathname])

  // Lock body scroll when overlay is open
  useEffect(() => {
    document.body.style.overflow = menuOpen ? 'hidden' : ''
    return () => { document.body.style.overflow = '' }
  }, [menuOpen])

  // Initialise theme from localStorage (light by default)
  useEffect(() => {
    const saved = localStorage.getItem('gt-theme')
    const dark  = saved === 'dark'
    setIsDark(dark)
    document.documentElement.dataset.theme = dark ? 'dark' : 'light'
  }, [])

  const toggleTheme = () => {
    const next = !isDark
    setIsDark(next)
    document.documentElement.dataset.theme = next ? 'dark' : 'light'
    localStorage.setItem('gt-theme', next ? 'dark' : 'light')
  }

  return (
    <>
      {/* ── Sticky header bar ─────────────────────────── */}
      <header className={[
        styles.header,
        isTransparent ? styles.transparent : styles.solid,
      ].join(' ')}>
        <div className={`container ${styles.inner}`}>

          <Link href="/" className={styles.logo} aria-label="GT Portugal — Home">
            <img src="/images/logo.svg" alt="GT Portugal" className={styles.logoImg} />
          </Link>

          {/* Desktop nav */}
          <nav className={styles.nav} aria-label="Main navigation">
            {navLinks.map(({ href, label }) => (
              <Link
                key={href}
                href={href}
                className={`${styles.link} ${pathname === href ? styles.active : ''}`}
              >
                {label}
              </Link>
            ))}
          </nav>

          {/* Right-side actions */}
          <div className={styles.actions}>
            {/* Contact us CTA — desktop only */}
            <ButtonAnimated href="/contact" className={styles.ctaBtn}>
              Contact us
            </ButtonAnimated>

            {/* Theme toggle */}
            <button
              className={styles.themeToggle}
              onClick={toggleTheme}
              aria-label={isDark ? 'Switch to light mode' : 'Switch to dark mode'}
              title={isDark ? 'Light mode' : 'Dark mode'}
            >
              <span className={`${styles.toggleTrack} ${isDark ? styles.toggleDark : ''}`}>
                <span className={styles.toggleThumb}>
                  {isDark ? <IconMoon /> : <IconSun />}
                </span>
              </span>
            </button>
          </div>

          {/* Burger (hidden on desktop) */}
          <button
            className={styles.burger}
            aria-expanded={menuOpen}
            aria-label="Open navigation"
            onClick={() => setMenuOpen(true)}
          >
            <span /><span /><span />
          </button>

        </div>
      </header>

      {/* ── Full-screen mobile overlay ─────────────────── */}
      <div
        className={`${styles.overlay} ${menuOpen ? styles.overlayOpen : ''}`}
        role="dialog"
        aria-modal="true"
        aria-label="Navigation menu"
      >
        {/* Close button */}
        <button
          className={styles.overlayClose}
          aria-label="Close navigation"
          onClick={() => setMenuOpen(false)}
        >
          <IconClose />
        </button>

        {/* Links */}
        <nav className={styles.overlayNav} aria-label="Mobile navigation">
          {navLinks.map(({ href, label }) => (
            <Link
              key={href}
              href={href}
              className={`${styles.overlayLink} ${pathname === href ? styles.overlayActive : ''}`}
              onClick={() => setMenuOpen(false)}
            >
              {label}
            </Link>
          ))}
        </nav>

        {/* Bottom row: theme toggle + Contact us */}
        <div className={styles.overlayBottom}>
          <button
            className={styles.themeToggle}
            onClick={toggleTheme}
            aria-label={isDark ? 'Switch to light mode' : 'Switch to dark mode'}
          >
            <span className={`${styles.toggleTrack} ${isDark ? styles.toggleDark : ''}`}>
              <span className={styles.toggleThumb}>
                {isDark ? <IconMoon /> : <IconSun />}
              </span>
            </span>
          </button>

          <Link
            href="/contact"
            className={styles.overlayCtaBtn}
            onClick={() => setMenuOpen(false)}
          >
            Contact us
          </Link>
        </div>
      </div>
    </>
  )
}
