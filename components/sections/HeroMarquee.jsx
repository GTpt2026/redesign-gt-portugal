'use client'

/**
 * HeroMarquee — slow, edge-to-edge, right-to-left GSAP ticker.
 * Every separator — both between the words of the phrase itself and
 * between each repeat — is the same real CSS circle (not a "."
 * character or a Unicode bullet), so every dot is pixel-identical in
 * size and vertical position, regardless of font rendering.
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

  // Split "Responsible . Development . Production" into its words so
  // every " . " becomes the same <Dot /> used between repeats below —
  // one consistent circle instead of a mix of "." glyphs and circles.
  const words = text.split(' . ')
  const repeats = [0, 1, 2, 3]

  return (
    <div className={styles.band} data-hero-line>
      <div className={styles.track} ref={trackRef}>
        {[0, 1].map(copy => (
          <span key={copy} className={styles.item} aria-hidden="true">
            {repeats.map(i => (
              <span key={i} className={styles.segment}>
                {words.map((word, wi) => (
                  <span key={wi} className={styles.word}>
                    <span className={styles.dot} />
                    {word}
                  </span>
                ))}
              </span>
            ))}
          </span>
        ))}
      </div>
    </div>
  )
}
