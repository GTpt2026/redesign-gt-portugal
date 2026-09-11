'use client'

/**
 * HeroMarquee — slow, edge-to-edge, right-to-left GSAP ticker.
 * Solid brand-red text with mix-blend-mode so it reads differently
 * over the bright vs. dark parts of the video underneath, the same
 * "Certified" / "25 years" ticker treatment as cipharvin.ro. The dot
 * between repeats is a real circle (not a Unicode bullet), so it's
 * pixel-identical at every separation regardless of font rendering.
 */
import { useRef } from 'react'
import { useGSAP } from '@gsap/react'
import gsap from 'gsap'
import styles from './HeroMarquee.module.css'

gsap.registerPlugin(useGSAP)

export default function HeroMarquee({ text, speed = 125 }) {
  const trackRef = useRef(null)

  useGSAP(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return

    gsap.to(trackRef.current, {
      xPercent: -50,
      duration: speed,
      ease: 'none',
      repeat: -1,
    })
  }, [speed])

  const segments = [0, 1, 2, 3]

  return (
    <div className={styles.band} data-hero-line>
      <div className={styles.track} ref={trackRef}>
        {[0, 1].map(copy => (
          <span key={copy} className={styles.item} aria-hidden="true">
            {segments.map(i => (
              <span key={i} className={styles.segment}>
                {text}
                <span className={styles.dot} />
              </span>
            ))}
          </span>
        ))}
      </div>
    </div>
  )
}
