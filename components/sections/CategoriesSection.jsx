/**
 * CategoriesSection — clothing showcase panel.
 * Sits directly below CategoriesIntro on the homepage.
 *
 * Layout:
 *   [Sketch illustration]  [Description + CTA]
 */
'use client'
import { useRef, useEffect } from 'react'
import ButtonAnimated from '@/components/ui/ButtonAnimated'
import styles from './CategoriesSection.module.css'

/* One video that already contains the clip played forward and then in
   reverse, so a plain `loop` runs forever with no jump-cut and no second
   element to swap. The file (~3.4 MB) is only requested once the section
   is about to scroll into view; until then the poster stands in. Only
   prefers-reduced-motion keeps it as a still. */
function ClothingIllustration() {
  const videoRef = useRef(null)

  useEffect(() => {
    const video = videoRef.current
    if (!video) return
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return

    const start = () => {
      if (!video.getAttribute('src')) video.src = '/videos/coat-loop.mp4'
      video.play().catch(() => {})
    }

    if (!('IntersectionObserver' in window)) { start(); return }
    const io = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) { start(); io.disconnect() } },
      { rootMargin: '700px 0px' }
    )
    io.observe(video)
    return () => io.disconnect()
  }, [])

  return (
    <div className={`${styles.videoWrap} ${styles.videoWrapNoMask}`}>
      <video
        ref={videoRef}
        className={styles.tabVideo}
        poster="/images/heroes/coat-loop-poster.jpg"
        muted loop playsInline preload="none"
        aria-hidden="true"
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
  title:       'Quality You Can Trace',
  description: 'Made in our own supply chain in Northern Portugal, certified (GOTS, BCI, OEKO-TEX) and checked at every stage, from fabric to shipping.',
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
