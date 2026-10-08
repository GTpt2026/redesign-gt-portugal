'use client'

/**
 * CapabilitiesSection — one dark band that says "we adapt to you" in two
 * beats: three short pillars (small runs, fast sampling, built to your
 * brief), then the IDEA → PRODUCT stepper showing the stages we cover.
 * The stepper is horizontal on wide screens and vertical on narrow ones;
 * its dashed connectors draw in along the flow on scroll.
 */
import { useRef } from 'react'
import { useGSAP } from '@gsap/react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import styles from './CapabilitiesSection.module.css'

gsap.registerPlugin(ScrollTrigger, useGSAP)

const IconSmallRuns = () => (
  <svg viewBox="0 0 32 32" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round" aria-hidden="true">
    <rect x="11" y="4" width="10" height="10" />
    <rect x="4" y="18" width="10" height="10" />
    <rect x="18" y="18" width="10" height="10" />
  </svg>
)

const IconFast = () => (
  <svg viewBox="0 0 32 32" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <circle cx="16" cy="18" r="10" />
    <path d="M16 18V12" />
    <path d="M12 3h8" />
    <path d="M16 3v5" />
    <path d="M24.5 8.5l2 -2" />
  </svg>
)

const IconSpec = () => (
  <svg viewBox="0 0 32 32" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" aria-hidden="true">
    <path d="M4 8h24" />
    <path d="M4 16h24" />
    <path d="M4 24h24" />
    <circle cx="11" cy="8" r="3" fill="var(--color-bg-dark)" />
    <circle cx="21" cy="16" r="3" fill="var(--color-bg-dark)" />
    <circle cx="14" cy="24" r="3" fill="var(--color-bg-dark)" />
  </svg>
)

const pillars = [
  {
    icon: <IconSmallRuns />,
    title: 'Small Runs, Full Attention',
    text: 'We scale to your order, not the other way around.',
  },
  {
    icon: <IconFast />,
    title: 'Fast From Sample to Shelf',
    text: 'Sampling in days, not weeks.',
  },
  {
    icon: <IconSpec />,
    title: 'Shaped Around Your Spec',
    text: 'Patterns, materials and processes adjusted to your brief.',
  },
]

const steps = [
  'Sourcing',
  'Pattern Making',
  'Sampling',
  'Production',
  'Quality Control',
  'Logistics',
]

export default function CapabilitiesSection() {
  const sectionRef = useRef(null)

  useGSAP(() => {
    const root = sectionRef.current
    const mm = gsap.matchMedia()

    mm.add(
      {
        wide: '(min-width: 900px)',
        narrow: '(max-width: 899px)',
        reduce: '(prefers-reduced-motion: reduce)',
      },
      (ctx) => {
        const { wide, reduce } = ctx.conditions
        if (reduce) return

        // Connectors wipe in along the flow: left to right when horizontal,
        // top to bottom when the stepper is vertical.
        const hidden  = wide ? 'inset(0 100% 0 0)' : 'inset(0 0 100% 0)'
        const visible = 'inset(0 0 0 0)'

        const head  = root.querySelectorAll('[data-cap-head]')
        const beats = root.querySelectorAll('[data-cap-beat]')
        const cols  = root.querySelectorAll('[data-cap-col]')
        const cells = gsap.utils.toArray('[data-cap-cell]', root)

        gsap.set([...head, ...cols], { opacity: 0, y: 24 })
        gsap.set(beats, { opacity: 0, y: 18 })
        gsap.set(root.querySelectorAll('[data-cap-seg]'), { clipPath: hidden })
        gsap.set(root.querySelectorAll('[data-cap-node]'), { scale: 0, opacity: 0 })
        gsap.set(root.querySelectorAll('[data-cap-ping]'), { scale: 1, opacity: 0 })
        gsap.set(root.querySelectorAll('[data-cap-label]'), { opacity: 0, y: 10 })

        // 1. Headline, then the three beats of the promise, then the pillars
        gsap.timeline({
          scrollTrigger: { trigger: root, start: 'top 75%', once: true },
        })
          .to(head, { opacity: 1, y: 0, duration: 0.7, ease: 'power2.out', stagger: 0.1 })
          .to(beats, { opacity: 1, y: 0, duration: 0.5, ease: 'power2.out', stagger: 0.22 }, '-=0.5')
          .to(cols, { opacity: 1, y: 0, duration: 0.7, ease: 'power2.out', stagger: 0.14 }, '-=0.2')

        // 2. The timeline builds itself from IDEA to PRODUCT. The stages are
        // laid out on a paused timeline at a constant pace, then one slow
        // eased sweep drives all of it, so the whole line starts gently,
        // moves steadily and settles gently instead of stepping stage by stage.
        const tl = gsap.timeline({ paused: true })

        const STEP = 0.62
        cells.forEach((cell, i) => {
          const at    = i * STEP
          const segL  = cell.querySelector('[data-cap-seg="l"]')
          const segR  = cell.querySelector('[data-cap-seg="r"]')
          const node  = cell.querySelector('[data-cap-node]')
          const ping  = cell.querySelector('[data-cap-ping]')
          const label = cell.querySelector('[data-cap-label]')

          if (segL) tl.to(segL, { clipPath: visible, duration: 0.26, ease: 'none' }, at)
          if (node) {
            tl.to(node, { scale: 1, opacity: 1, duration: 0.5, ease: 'back.out(1.6)' }, at + 0.2)
            tl.fromTo(ping, { scale: 1, opacity: 0.8 }, { scale: 2.6, opacity: 0, duration: 1, ease: 'power2.out' }, at + 0.28)
          }
          tl.to(label, { opacity: 1, y: 0, duration: 0.6, ease: 'power2.out' }, at + (node ? 0.3 : segL ? 0.1 : 0))
          if (segR) tl.to(segR, { clipPath: visible, duration: 0.22, ease: 'none' }, at + 0.4)
        })

        gsap.to(tl, {
          progress: 1,
          duration: 6,
          ease: 'sine.inOut',
          scrollTrigger: { trigger: root.querySelector('[data-cap-track]'), start: 'top 88%', once: true },
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
          <h2 className={styles.title} data-cap-head>
            On Your Terms
            <span className={styles.beats}>
              <span className={styles.beat} data-cap-beat>Any quantity.</span>
              <span className={styles.beat} data-cap-beat>Any spec.</span>
              <span className={styles.beat} data-cap-beat>Any pace.</span>
            </span>
          </h2>
          <p className={styles.intro} data-cap-head>
            From idea to finished product, your production can speed up, slow down or change direction without losing a step.
          </p>
        </div>

        <div className={styles.cols}>
          {pillars.map((p) => (
            <div key={p.title} className={styles.col} data-cap-col>
              <span className={styles.icon}>{p.icon}</span>
              <h3 className={styles.colTitle}>{p.title}</h3>
              <p className={styles.colText}>{p.text}</p>
            </div>
          ))}
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
                <span className={styles.node} data-cap-node>
                  <span className={styles.ping} data-cap-ping />
                </span>
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
