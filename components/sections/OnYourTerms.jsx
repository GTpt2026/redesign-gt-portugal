'use client'

/**
 * OnYourTerms — three short pillars that show, without using the word
 * "flexibility", that GT Portugal adapts to the client: small runs,
 * fast sampling, and production shaped around the client's own spec.
 */
import { useRef } from 'react'
import { useGSAP } from '@gsap/react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import ButtonAnimated from '@/components/ui/ButtonAnimated'
import styles from './OnYourTerms.module.css'

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
    text: 'From capsule collections to full-scale production, we scale to your order, not the other way around.',
  },
  {
    icon: <IconFast />,
    title: 'Fast From Sample to Shelf',
    text: 'Sampling in days, not weeks, built to keep up with your drop schedule.',
  },
  {
    icon: <IconSpec />,
    title: 'Shaped Around Your Spec',
    text: 'Every brand works differently. We adjust patterns, materials and processes to match your brief exactly, not a fixed catalogue.',
  },
]

export default function OnYourTerms() {
  const sectionRef = useRef(null)

  useGSAP(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return

    const head = sectionRef.current.querySelectorAll('[data-oyt-head]')
    const cols = sectionRef.current.querySelectorAll('[data-oyt-col]')
    const cta  = sectionRef.current.querySelectorAll('[data-oyt-cta]')

    gsap.set([...head, ...cols, ...cta], { opacity: 0, y: 24 })

    const tl = gsap.timeline({
      scrollTrigger: { trigger: sectionRef.current, start: 'top 75%', once: true },
    })
    tl.to(head, { opacity: 1, y: 0, duration: 0.7, ease: 'power2.out', stagger: 0.1 })
      .to(cols, { opacity: 1, y: 0, duration: 0.7, ease: 'power2.out', stagger: 0.14 }, '-=0.3')
      .to(cta,  { opacity: 1, y: 0, duration: 0.6, ease: 'power2.out' }, '-=0.3')
  }, { scope: sectionRef })

  return (
    <section className={styles.section} data-theme="dark" ref={sectionRef}>
      <div className="container">

        <div className={styles.head}>
          <p className={styles.eyebrow} data-oyt-head>Why Work With Us</p>
          <h2 className={styles.title} data-oyt-head>On Your Terms</h2>
          <p className={styles.intro} data-oyt-head>
            Every brand works to a different brief. We build our production around yours.
          </p>
        </div>

        <div className={styles.cols}>
          {pillars.map((p) => (
            <div key={p.title} className={styles.col} data-oyt-col>
              <span className={styles.icon}>{p.icon}</span>
              <h3 className={styles.colTitle}>{p.title}</h3>
              <p className={styles.colText}>{p.text}</p>
            </div>
          ))}
        </div>

        <div className={styles.ctaRow} data-oyt-cta>
          <ButtonAnimated href="/about/our-process" className={styles.cta}>
            See how we work with brands
          </ButtonAnimated>
        </div>

      </div>
    </section>
  )
}
