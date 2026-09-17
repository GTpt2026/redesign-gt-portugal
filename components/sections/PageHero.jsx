'use client'

/**
 * PageHero — dark full-bleed hero used by secondary pages (Textiles,
 * Sustainability, About...). The headline settles in character by
 * character: each letter starts pulled tight against its neighbour
 * (a compressed, off-kerning position) and springs out to its resting
 * spot on mount, same mechanic as the reference site's hover-triggered
 * kerning snap, just played once on load instead of on interaction.
 */
import { useRef } from 'react'
import { useGSAP } from '@gsap/react'
import gsap from 'gsap'
import styles from './PageHero.module.css'

gsap.registerPlugin(useGSAP)

/* Deterministic per-character offset (no Math.random — must match
   between server and client render to avoid a hydration mismatch). */
function charOffset(i) {
  return -10 - ((i * 7) % 18)
}

function splitChars(text, lineIndex) {
  return text.split('').map((ch, i) =>
    ch === ' '
      ? ' '
      : (
        <span className={styles.char} key={`${lineIndex}-${i}`}>
          <span className={styles.charInner} data-hero-char>{ch}</span>
        </span>
      )
  )
}

export default function PageHero({ headline = [], eyebrow, image, alt = '' }) {
  const heroRef = useRef(null)

  useGSAP(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return

    const chars = heroRef.current.querySelectorAll('[data-hero-char]')
    gsap.set(chars, { x: (i) => charOffset(i) })
    gsap.to(chars, {
      x: 0,
      duration: 0.9,
      ease: 'power3.out',
      stagger: 0.018,
      delay: 0.2,
    })

    gsap.from(heroRef.current.querySelectorAll(`.${styles.eyebrow}`), {
      opacity: 0,
      y: 8,
      duration: 0.6,
      ease: 'power2.out',
    })
  }, { scope: heroRef })

  return (
    <section data-theme="dark" className={styles.hero} ref={heroRef}>
      {image && (
        <img
          src={image}
          alt={alt}
          aria-hidden="true"
          className={styles.bgImage}
        />
      )}
      <div className={styles.overlay} aria-hidden="true" />
      <div className={styles.body}>
        <div className="container">
          {eyebrow && <span className={styles.eyebrow}>{eyebrow}</span>}
          <h1 className={styles.headline}>
            {headline.map((line, i) =>
              i < headline.length - 1
                ? <span key={i} className={styles.line}>{splitChars(line, i)}</span>
                : <span key={i} className={styles.accentLine}>{splitChars(line, i)}</span>
            )}
          </h1>
        </div>
      </div>
    </section>
  )
}
