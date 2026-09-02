'use client'

/**
 * CategoriesIntro — pinned scroll-scrubbed text reveal.
 * The paragraph starts dim; each word darkens to the primary text
 * colour in sync with scroll position while the section stays pinned,
 * then releases.
 */
import { useRef } from 'react'
import { useGSAP } from '@gsap/react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import styles from './CategoriesIntro.module.css'

gsap.registerPlugin(ScrollTrigger, useGSAP)

const text = "For the last 40 years, GT Portugal has been producing outstanding garments and shoes for the world's leading brands, coupling unrivalled creativity with a rigorous ability to deliver."
const words = text.split(' ')

export default function CategoriesIntro() {
  const sectionRef = useRef(null)

  useGSAP(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return

    const wordEls = sectionRef.current.querySelectorAll('[data-word]')
    const revealColor = getComputedStyle(sectionRef.current)
      .getPropertyValue('--color-text-primary')
      .trim() || '#1a1a1a'

    gsap.to(wordEls, {
      color: revealColor,
      stagger: 1,
      ease: 'none',
      scrollTrigger: {
        trigger: sectionRef.current,
        start: 'top top',
        end: '+=90%',
        scrub: 1,
        pin: true,
      },
    })
  }, { scope: sectionRef })

  return (
    <section className={styles.section} ref={sectionRef}>
      <div className={`container ${styles.inner}`}>
        <p className={styles.eyebrow}>A Proud 40-Year History</p>
        <p className={styles.text}>
          {words.map((word, i) => (
            <span key={i} data-word className={styles.word}>
              {word}{' '}
            </span>
          ))}
        </p>
      </div>
    </section>
  )
}
