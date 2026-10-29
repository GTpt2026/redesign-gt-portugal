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

import { homeTextDefaults } from '@/content/defaults/pages.mjs'

export default function CategoriesIntro({ eyebrow = homeTextDefaults.intro.eyebrow, text = homeTextDefaults.intro.text }) {
  const sectionRef = useRef(null)
  const words = text.split(' ')

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
        <p className={styles.eyebrow}>{eyebrow}</p>
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
