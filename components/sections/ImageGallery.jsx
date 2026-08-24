'use client'

/**
 * ImageGallery — product photo grid with a full-screen lightbox.
 * Click any thumbnail to open it full-screen; click again, press
 * Escape, or use the arrows to navigate/close.
 */
import { useState, useCallback, useEffect } from 'react'
import styles from './ImageGallery.module.css'

export default function ImageGallery({ images = [], alt = '' }) {
  const [openIndex, setOpenIndex] = useState(null)

  const close = useCallback(() => setOpenIndex(null), [])
  const prev  = useCallback(
    () => setOpenIndex(i => (i - 1 + images.length) % images.length),
    [images.length]
  )
  const next  = useCallback(
    () => setOpenIndex(i => (i + 1) % images.length),
    [images.length]
  )

  useEffect(() => {
    if (openIndex === null) return
    function onKey(e) {
      if (e.key === 'Escape')     close()
      if (e.key === 'ArrowLeft')  prev()
      if (e.key === 'ArrowRight') next()
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [openIndex, close, prev, next])

  if (!images.length) return null

  return (
    <section className="section">
      <div className="container">
        <p className={styles.hint}>Click images for a full-screen gallery</p>
        <div className={styles.grid} data-stagger>
          {images.map((src, i) => (
            <button
              key={src}
              type="button"
              className={styles.thumb}
              onClick={() => setOpenIndex(i)}
              aria-label={`View ${alt} photo ${i + 1} full screen`}
              data-stagger-item
            >
              <img src={src} alt={`${alt} ${i + 1}`} className={styles.thumbImage} />
            </button>
          ))}
        </div>
      </div>

      {openIndex !== null && (
        <div className={styles.lightbox} role="dialog" aria-modal="true" onClick={close}>
          <button type="button" className={styles.close} onClick={close} aria-label="Close gallery">×</button>

          {images.length > 1 && (
            <button
              type="button"
              className={`${styles.nav} ${styles.navPrev}`}
              onClick={(e) => { e.stopPropagation(); prev() }}
              aria-label="Previous photo"
            >‹</button>
          )}

          <img
            src={images[openIndex]}
            alt={`${alt} ${openIndex + 1}`}
            className={styles.lightboxImage}
            onClick={(e) => e.stopPropagation()}
          />

          {images.length > 1 && (
            <button
              type="button"
              className={`${styles.nav} ${styles.navNext}`}
              onClick={(e) => { e.stopPropagation(); next() }}
              aria-label="Next photo"
            >›</button>
          )}
        </div>
      )}
    </section>
  )
}
