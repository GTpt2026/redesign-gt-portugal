/**
 * CategoriesSection — clothing showcase panel.
 * Sits directly below CategoriesIntro on the homepage.
 *
 * Layout:
 *   [Sketch illustration]  [Description + CTA]
 */
'use client'
import { useState, useRef, useEffect } from 'react'
import ButtonAnimated from '@/components/ui/ButtonAnimated'
import styles from './CategoriesSection.module.css'

/* Ping-pong forward/reverse pair — avoids the jump-cut a plain `loop`
   video has when the last frame doesn't match the first. */
function ClothingIllustration() {
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
    <div className={`${styles.videoWrap} ${styles.videoWrapNoMask}`}>
      <video
        ref={fwdRef}
        src="/videos/Shirt%20animation%202.mp4"
        muted playsInline preload="auto"
        className={`${styles.tabVideo} ${active === 'fwd' ? styles.tabVideoVisible : styles.tabVideoHidden}`}
      />
      <video
        ref={revRef}
        src="/videos/Shirt%20animation%202%20reversed.mp4"
        muted playsInline preload="auto"
        className={`${styles.tabVideo} ${active === 'rev' ? styles.tabVideoVisible : styles.tabVideoHidden}`}
      />
    </div>
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

/* ─── Content ───────────────────────────────────────────────── */

const content = {
  title:       'Crafted for the World\'s Best Brands',
  description: 'From premium fabrics to responsible sourcing, we produce 100k+ pieces per month to the highest quality standards.',
  cta:         'See our textiles',
  href:        '/textiles',
}

/* ─── Component ─────────────────────────────────────────────── */

export default function CategoriesSection() {
  return (
    <section className={`section ${styles.section}`}>
      <div className="container">

        <div className={styles.layout}>

          {/* ── Content panel ─────────────────────────── */}
          <div className={`${styles.panel} ${styles.panelVideo}`}>

            <div className={styles.illustration}>
              <ClothingIllustration />
            </div>

            <div className={styles.info}>
              <h3 className={styles.infoTitle}>{content.title}</h3>
              <p className={styles.description}>{content.description}</p>
              <ButtonAnimated
                href={content.href}
                className={styles.cta}
                iconRight={<ArrowRight />}
              >
                {content.cta}
              </ButtonAnimated>
            </div>

          </div>
        </div>

      </div>
    </section>
  )
}
