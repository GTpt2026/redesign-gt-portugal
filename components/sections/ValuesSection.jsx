'use client'

/**
 * ValuesSection — Fairness / Transparency / Trustworthiness over a dark
 * photo. Each row's accent bar grows in and its text settles upward as
 * the section scrolls into view, staggered top to bottom.
 */
import { useRef } from 'react'
import { useGSAP } from '@gsap/react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import styles from './ValuesSection.module.css'

gsap.registerPlugin(ScrollTrigger, useGSAP)

export default function ValuesSection({ values = [], image }) {
  const sectionRef = useRef(null)

  useGSAP(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return

    const rows = sectionRef.current.querySelectorAll(`.${styles.value}`)
    rows.forEach((row) => {
      const bar = row.querySelector(`.${styles.accentBar}`)
      const content = row.querySelectorAll(`.${styles.label}, .${styles.desc}`)
      const trigger = { trigger: row, start: 'top 82%', once: true }

      gsap.set(bar, { scaleY: 0, transformOrigin: '50% 0%' })
      gsap.set(content, { opacity: 0, y: 18 })

      const tl = gsap.timeline({ scrollTrigger: trigger })
      tl.to(bar, { scaleY: 1, duration: 0.6, ease: 'power2.out' })
      tl.to(content, { opacity: 1, y: 0, duration: 0.7, ease: 'power2.out', stagger: 0.08 }, '-=0.3')
    })
  }, { scope: sectionRef })

  return (
    <section className={styles.section} data-theme="dark" ref={sectionRef}>
      {image && (
        <img src={image} alt="" aria-hidden="true" className={styles.bgImage} />
      )}
      <div className={styles.overlay} aria-hidden="true" />
      <div className="container">
        <div className={styles.values}>
          {values.map((v) => (
            <div key={v.label} className={styles.value}>
              <div className={styles.accentBar} aria-hidden="true" />
              <div className={styles.valueContent}>
                <h3 className={styles.label}>{v.label}</h3>
                <p className={styles.desc}>{v.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
