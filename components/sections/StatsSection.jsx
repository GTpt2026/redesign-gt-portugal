'use client'

/**
 * StatsSection
 * Centred stat row with GSAP count-up animation on scroll (same
 * technique as HomeStatsSection). Numeric prefix/suffix (e.g. '+', 'M€')
 * are parsed out of `value` automatically so the count-up only animates
 * the digits.
 *
 * Props:
 *   stats — Array<{ value: string, label: string, description?: string }>
 *   dark  — boolean
 */
import { useRef } from 'react'
import { useGSAP } from '@gsap/react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import Stat from '@/components/ui/Stat'
import styles from './StatsSection.module.css'

gsap.registerPlugin(ScrollTrigger, useGSAP)

function parseValue(value) {
  const match = /^(\D*)(\d+)(\D*)$/.exec(value)
  if (!match) return null
  const [, prefix, digits, suffix] = match
  return { prefix, end: parseInt(digits, 10), suffix }
}

export default function StatsSection({ stats, dark = false }) {
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
          el.textContent = `${prefix}${Math.round(proxy.val)}${suffix}`
        },
        onComplete() {
          el.textContent = `${prefix}${end}${suffix}`
        },
      })
    })
  }, { scope: sectionRef })

  return (
    <section className={`section ${dark ? 'section--dark' : 'section--muted'}`} ref={sectionRef}>
      <div className="container">
        <div className={styles.grid}>
          {stats.map(s => {
            const parsed = parseValue(s.value)
            const valueProps = parsed ? {
              'data-stat-value':  true,
              'data-stat-end':    parsed.end,
              'data-stat-prefix': parsed.prefix,
              'data-stat-suffix': parsed.suffix,
            } : {}
            const displayValue = parsed ? `${parsed.prefix}0${parsed.suffix}` : s.value

            return (
              <Stat
                key={s.label}
                value={displayValue}
                label={s.label}
                description={s.description}
                align="center"
                valueProps={valueProps}
              />
            )
          })}
        </div>
      </div>
    </section>
  )
}
