'use client'

/**
 * HomeStatsSection
 * Centred 3-stat row with GSAP count-up animation on scroll.
 * Background is slightly darker than --color-bg-section.
 */
import { useRef } from 'react'
import { useGSAP } from '@gsap/react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import styles from './HomeStatsSection.module.css'

gsap.registerPlugin(ScrollTrigger, useGSAP)

const stats = [
  { prefix: '+', end: 40,  suffix: '',  label: 'Years of experience'      },
  { prefix: '+', end: 100, suffix: 'k', label: 'Pieces produced monthly'  },
  { prefix: '+', end: 20,  suffix: '',  label: 'Global brands'            },
]

export default function HomeStatsSection() {
  const sectionRef = useRef(null)

  useGSAP(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return

    const items = sectionRef.current.querySelectorAll('[data-stat-value]')

    items.forEach((el) => {
      const end    = parseFloat(el.dataset.statEnd)
      const prefix = el.dataset.statPrefix || ''
      const suffix = el.dataset.statSuffix || ''
      const proxy  = { val: 0 }

      gsap.to(proxy, {
        val: end,
        duration: 2,
        ease: 'power2.out',
        scrollTrigger: {
          trigger: el,
          start: 'top 85%',
          once: true,
        },
        onUpdate() {
          const display = Math.round(proxy.val)
          el.textContent = `${prefix}${display}${suffix}`
        },
        onComplete() {
          el.textContent = `${prefix}${end}${suffix}`
        },
      })
    })
  }, { scope: sectionRef })

  return (
    <section className={styles.section} ref={sectionRef}>
      <div className="container">
        <div className={styles.grid}>
          {stats.map((s) => (
            <div key={s.label} className={styles.stat}>
              <span
                className={styles.value}
                data-stat-value
                data-stat-end={s.end}
                data-stat-prefix={s.prefix}
                data-stat-suffix={s.suffix}
              >
                {s.prefix}0{s.suffix}
              </span>
              <span className={styles.label}>{s.label}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
