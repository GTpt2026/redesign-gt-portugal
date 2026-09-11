'use client'

/**
 * ProductShowcase — catalogue "product page" style intro for a textile
 * category: a large image carousel on a neutral backdrop beside a short
 * description and a plain spec list. Replaces the old PageIntro +
 * ImageGallery + FeatureColumns stack on /textiles/[slug].
 */
import { useState, useCallback } from 'react'
import styles from './ProductShowcase.module.css'

export default function ProductShowcase({ eyebrow, title, description, images = [], specs = [] }) {
  const [index, setIndex] = useState(0)

  const prev = useCallback(() => setIndex(i => (i - 1 + images.length) % images.length), [images.length])
  const next = useCallback(() => setIndex(i => (i + 1) % images.length), [images.length])

  return (
    <section className="section">
      <div className="container">
        <div className={styles.layout}>

          <div className={styles.gallery}>
            <div className={styles.frame}>
              <img
                src={images[index]}
                alt={`${title} ${index + 1}`}
                className={styles.image}
              />
              {images.length > 1 && (
                <>
                  <button type="button" className={`${styles.arrow} ${styles.arrowPrev}`} onClick={prev} aria-label="Previous photo">‹</button>
                  <button type="button" className={`${styles.arrow} ${styles.arrowNext}`} onClick={next} aria-label="Next photo">›</button>
                  <span className={styles.counter}>{index + 1} / {images.length}</span>
                </>
              )}
            </div>
          </div>

          <div className={styles.info}>
            {eyebrow && <p className={styles.eyebrow}>{eyebrow}</p>}
            <h1 className={styles.title}>{title}</h1>
            {description && <p className={styles.description}>{description}</p>}

            {specs.length > 0 && (
              <ul className={styles.specs}>
                {specs.map(spec => (
                  <li key={spec.label} className={styles.spec}>
                    <span className={styles.specLabel}>{spec.label}</span>
                    <span className={styles.specText}>{spec.text}</span>
                  </li>
                ))}
              </ul>
            )}
          </div>

        </div>
      </div>
    </section>
  )
}
