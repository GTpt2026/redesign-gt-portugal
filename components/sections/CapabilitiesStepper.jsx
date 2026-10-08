'use client'

/**
 * CapabilitiesStepper — IDEA → six stages → PRODUCT. Horizontal on wide
 * screens, vertical on narrow ones. The dashed connectors draw in along
 * the flow, each node and label appearing as the line reaches it.
 */
import { useRef } from 'react'
import { useGSAP } from '@gsap/react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import styles from './CapabilitiesStepper.module.css'

gsap.registerPlugin(ScrollTrigger, useGSAP)

const steps = [
  'Sourcing',
  'Pattern Making',
  'Sampling',
  'Production',
  'Quality Control',
  'Logistics',
]

export default function CapabilitiesStepper() {
  const sectionRef = useRef(null)

  useGSAP(() => {
    const root = sectionRef.current
    const mm = gsap.matchMedia()

    mm.add(
      {
        wide: '(min-width: 900px)',
        reduce: '(prefers-reduced-motion: reduce)',
      },
      (ctx) => {
        const { wide, reduce } = ctx.conditions
        if (reduce) return

        const grow = wide ? { scaleX: 0, transformOrigin: '0% 50%' } : { scaleY: 0, transformOrigin: '50% 0%' }
        const full = wide ? { scaleX: 1 } : { scaleY: 1 }

        const head  = root.querySelectorAll('[data-cap-head]')
        const cells = gsap.utils.toArray('[data-cap-cell]', root)

        gsap.set(head, { opacity: 0, y: 24 })
        gsap.set(root.querySelectorAll('[data-cap-seg]'), grow)
        gsap.set(root.querySelectorAll('[data-cap-node]'), { scale: 0, opacity: 0 })
        gsap.set(root.querySelectorAll('[data-cap-label]'), { opacity: 0, y: 10 })

        gsap.to(head, {
          opacity: 1, y: 0, duration: 0.7, ease: 'power2.out', stagger: 0.1,
          scrollTrigger: { trigger: root, start: 'top 75%', once: true },
        })

        const tl = gsap.timeline({
          scrollTrigger: { trigger: root.querySelector('[data-cap-track]'), start: 'top 85%', once: true },
        })

        cells.forEach((cell) => {
          const segL  = cell.querySelector('[data-cap-seg="l"]')
          const segR  = cell.querySelector('[data-cap-seg="r"]')
          const node  = cell.querySelector('[data-cap-node]')
          const label = cell.querySelector('[data-cap-label]')

          if (segL) tl.to(segL, { ...full, duration: 0.22, ease: 'none' })
          if (node) tl.to(node, { scale: 1, opacity: 1, duration: 0.3, ease: 'back.out(2.2)' }, '>-0.05')
          tl.to(label, { opacity: 1, y: 0, duration: 0.4, ease: 'power2.out' }, node ? '<0.05' : '>-0.1')
          if (segR) tl.to(segR, { ...full, duration: 0.22, ease: 'none' }, '>-0.15')
        })
      }
    )

    return () => mm.revert()
  }, { scope: sectionRef })

  return (
    <section className={styles.section} data-theme="dark" ref={sectionRef}>
      <div className="container">

        <div className={styles.head}>
          <p className={styles.eyebrow} data-cap-head>Capabilities</p>
          <h2 className={styles.title} data-cap-head>From Idea to Finished Product</h2>
          <p className={styles.intro} data-cap-head>
            We control every stage in-house, so your production can speed up, slow down or change direction without losing a step.
          </p>
        </div>

        <ol className={styles.track} data-cap-track>
          <li className={`${styles.cell} ${styles.start}`} data-cap-cell>
            <span className={styles.rail} aria-hidden="true">
              <span className={`${styles.seg} ${styles.segR}`} data-cap-seg="r" />
            </span>
            <span className={styles.endLabel} data-cap-label>Idea</span>
          </li>

          {steps.map((label) => (
            <li key={label} className={styles.cell} data-cap-cell>
              <span className={styles.rail} aria-hidden="true">
                <span className={`${styles.seg} ${styles.segL}`} data-cap-seg="l" />
                <span className={styles.node} data-cap-node />
                <span className={`${styles.seg} ${styles.segR}`} data-cap-seg="r" />
              </span>
              <span className={styles.label} data-cap-label>{label}</span>
            </li>
          ))}

          <li className={`${styles.cell} ${styles.end}`} data-cap-cell>
            <span className={styles.rail} aria-hidden="true">
              <span className={`${styles.seg} ${styles.segL}`} data-cap-seg="l" />
            </span>
            <span className={styles.endLabel} data-cap-label>Product</span>
          </li>
        </ol>

      </div>
    </section>
  )
}
