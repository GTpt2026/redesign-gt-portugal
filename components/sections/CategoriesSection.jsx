/**
 * CategoriesSection — tabbed product categories panel.
 * Sits directly below CategoriesIntro on the homepage.
 *
 * Layout:
 *   [Vertical tabs]  |  [Sketch illustration]  [Description + CTA]
 *
 * Tabs: Clothing / Shoes
 * Active tab: red underline indicator
 *
 * Illustrations use stroke="currentColor" so they render correctly in
 * both light mode (dark strokes on light bg) and dark mode (light strokes).
 */
'use client'
import { useState, useRef, useEffect } from 'react'
import Link from 'next/link'
import ButtonAnimated from '@/components/ui/ButtonAnimated'
import styles from './CategoriesSection.module.css'

/* ─── Shared ping-pong video illustration ───────────────────── */

function VideoIllustration({ fwdSrc, revSrc, wrapClass = '' }) {
  const fwdRef = useRef(null)
  const revRef = useRef(null)
  const [active, setActive] = useState('fwd')

  useEffect(() => {
    const fwd = fwdRef.current
    const rev = revRef.current
    if (!fwd || !rev) return

    function onFwdEnd() {
      setActive('rev')
      rev.currentTime = 0
      rev.play().catch(() => {})
    }

    function onRevEnd() {
      setActive('fwd')
      fwd.currentTime = 0
      fwd.play().catch(() => {})
    }

    fwd.addEventListener('ended', onFwdEnd)
    rev.addEventListener('ended', onRevEnd)
    fwd.play().catch(() => {})

    return () => {
      fwd.removeEventListener('ended', onFwdEnd)
      rev.removeEventListener('ended', onRevEnd)
    }
  }, [])

  return (
    <div className={`${styles.videoWrap} ${wrapClass}`}>
      <video
        ref={fwdRef}
        src={fwdSrc}
        muted playsInline preload="auto"
        className={`${styles.tabVideo} ${active === 'fwd' ? styles.tabVideoVisible : styles.tabVideoHidden}`}
      />
      <video
        ref={revRef}
        src={revSrc}
        muted playsInline preload="auto"
        className={`${styles.tabVideo} ${active === 'rev' ? styles.tabVideoVisible : styles.tabVideoHidden}`}
      />
    </div>
  )
}

function ClothingIllustration() {
  return (
    <div className={`${styles.videoWrap} ${styles.videoWrapNoMask}`}>
      <video
        src="/videos/Shirt%20animation%202.mp4"
        muted playsInline loop autoPlay preload="auto"
        className={`${styles.tabVideo} ${styles.tabVideoVisible}`}
      />
    </div>
  )
}

function ShoesIllustration() {
  return (
    <VideoIllustration
      fwdSrc="/videos/Shoe%20animation%202.mp4"
      revSrc="/videos/Shoe%20animation%202%20reversed.mp4"
      wrapClass={styles.videoWrapNoMask}
    />
  )
}

/* ─── Shared arrow icon ─────────────────────────────────────── */
const ArrowRight = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none"
    stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <line x1="5" y1="12" x2="19" y2="12" />
    <polyline points="12 5 19 12 12 19" />
  </svg>
)

/* ─── Tab data ──────────────────────────────────────────────── */

const tabs = [
  {
    id:          'clothing',
    label:       'Clothing',
    title:       'Crafted for the World\'s Best Brands',
    description: 'From premium fabrics to responsible sourcing, we produce 100k+ pieces per month to the highest quality standards.',
    cta:         'See our textiles',
    href:        '/textiles',
    Illustration: ClothingIllustration,
  },
  {
    id:          'shoes',
    label:       'Shoes',
    title:       'Where Function Meets Sole',
    description: 'Our footwear production unit is focused on functional footwear with great design and timeless quality.',
    cta:         'See our shoes',
    href:        '/footwear',
    Illustration: ShoesIllustration,
  },
]

/* ─── Component ─────────────────────────────────────────────── */

export default function CategoriesSection() {
  const [activeId, setActiveId] = useState('clothing')
  const current = tabs.find(t => t.id === activeId)
  const { Illustration } = current
  const isVideoTab = true

  return (
    <section className={`section ${styles.section}`}>
      <div className="container">

        {/* Main layout: vertical tabs + panel */}
        <div className={styles.layout}>

          {/* ── Vertical tabs ─────────────────────────── */}
          <nav className={styles.tabs} aria-label="Product categories">
            {tabs.map(tab => (
              <button
                key={tab.id}
                className={`${styles.tab} ${activeId === tab.id ? styles.tabActive : ''}`}
                onClick={() => setActiveId(tab.id)}
                aria-selected={activeId === tab.id}
              >
                {tab.label}
              </button>
            ))}
          </nav>

          {/* ── Content panel ─────────────────────────── */}
          <div className={`${styles.panel} ${isVideoTab ? styles.panelVideo : ''}`} key={activeId}>

            <div className={styles.illustration}>
              <Illustration />
            </div>

            <div className={styles.info}>
              <h3 className={styles.infoTitle}>{current.title}</h3>
              <p className={styles.description}>{current.description}</p>
              <ButtonAnimated
                href={current.href}
                className={styles.cta}
                iconRight={<ArrowRight />}
              >
                {current.cta}
              </ButtonAnimated>
            </div>

          </div>
        </div>

      </div>
    </section>
  )
}
