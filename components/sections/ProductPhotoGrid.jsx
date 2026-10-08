'use client'

/**
 * ProductPhotoGrid — catalogue-style grid of product photos on white.
 * Each photo is trimmed to the product itself, so the grid stays tight.
 * Clicking a product opens a gallery: the piece large and centred, with
 * previous/next, a thumbnail strip, keyboard (arrows, Escape) and swipe.
 */
import { useCallback, useEffect, useRef, useState } from 'react'
import styles from './ProductPhotoGrid.module.css'

export default function ProductPhotoGrid({ images = [], alt = '', columns = 4 }) {
  const [openIndex, setOpenIndex] = useState(null)
  const triggerRef = useRef(null)
  const closeRef = useRef(null)
  const dialogRef = useRef(null)
  const stripRef = useRef(null)
  const touchX = useRef(null)

  const isOpen = openIndex !== null
  const count = images.length

  const close = useCallback(() => {
    setOpenIndex(null)
    triggerRef.current?.focus()
  }, [])
  const prev = useCallback(() => setOpenIndex((i) => (i - 1 + count) % count), [count])
  const next = useCallback(() => setOpenIndex((i) => (i + 1) % count), [count])

  useEffect(() => {
    if (!isOpen) return

    const previousOverflow = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    closeRef.current?.focus()

    function onKey(e) {
      if (e.key === 'Escape') close()
      else if (e.key === 'ArrowLeft') prev()
      else if (e.key === 'ArrowRight') next()
      else if (e.key === 'Tab' && dialogRef.current) {
        const focusable = dialogRef.current.querySelectorAll('button')
        if (!focusable.length) return
        const first = focusable[0]
        const last = focusable[focusable.length - 1]
        if (e.shiftKey && document.activeElement === first) { e.preventDefault(); last.focus() }
        else if (!e.shiftKey && document.activeElement === last) { e.preventDefault(); first.focus() }
      }
    }
    window.addEventListener('keydown', onKey)
    return () => {
      window.removeEventListener('keydown', onKey)
      document.body.style.overflow = previousOverflow
    }
  }, [isOpen, close, prev, next])

  // Keep the active thumbnail in view when browsing
  useEffect(() => {
    if (!isOpen || !stripRef.current) return
    const active = stripRef.current.querySelector('[aria-current="true"]')
    active?.scrollIntoView({ block: 'nearest', inline: 'center' })
  }, [openIndex, isOpen])

  if (!count) return null

  function onTouchStart(e) { touchX.current = e.touches[0].clientX }
  function onTouchEnd(e) {
    if (touchX.current === null) return
    const dx = e.changedTouches[0].clientX - touchX.current
    touchX.current = null
    if (Math.abs(dx) > 50) (dx < 0 ? next : prev)()
  }

  return (
    <section className={styles.section}>
      <div className="container">
        <div className={styles.grid} style={{ '--cols': columns }}>
          {images.map((src, i) => (
            <button
              key={src}
              type="button"
              className={styles.cell}
              onClick={(e) => { triggerRef.current = e.currentTarget; setOpenIndex(i) }}
              aria-label={`View ${alt} piece ${i + 1} of ${count}`}
            >
              <img src={src} alt={`${alt} ${i + 1}`} className={styles.image} loading="lazy" />
            </button>
          ))}
        </div>
      </div>

      {isOpen && (
        <div
          ref={dialogRef}
          className={styles.lightbox}
          role="dialog"
          aria-modal="true"
          aria-label={`${alt} gallery`}
          onClick={close}
        >
          <div className={styles.topBar}>
            <span className={styles.counter} aria-live="polite">
              {String(openIndex + 1).padStart(2, '0')} / {String(count).padStart(2, '0')}
            </span>
            <button
              ref={closeRef}
              type="button"
              className={styles.close}
              onClick={(e) => { e.stopPropagation(); close() }}
              aria-label="Close gallery"
            >
              <svg viewBox="0 0 24 24" width="22" height="22" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" aria-hidden="true">
                <path d="M5 5l14 14M19 5L5 19" />
              </svg>
            </button>
          </div>

          <div className={styles.stage} onTouchStart={onTouchStart} onTouchEnd={onTouchEnd}>
            {count > 1 && (
              <button
                type="button"
                className={`${styles.nav} ${styles.navPrev}`}
                onClick={(e) => { e.stopPropagation(); prev() }}
                aria-label="Previous piece"
              >
                <svg viewBox="0 0 24 24" width="22" height="22" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M15 5l-7 7 7 7" /></svg>
              </button>
            )}

            <img
              key={openIndex}
              src={images[openIndex]}
              alt={`${alt} ${openIndex + 1}`}
              className={styles.bigImage}
              onClick={(e) => e.stopPropagation()}
            />

            {count > 1 && (
              <button
                type="button"
                className={`${styles.nav} ${styles.navNext}`}
                onClick={(e) => { e.stopPropagation(); next() }}
                aria-label="Next piece"
              >
                <svg viewBox="0 0 24 24" width="22" height="22" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M9 5l7 7-7 7" /></svg>
              </button>
            )}
          </div>

          {count > 1 && (
            <div className={styles.strip} ref={stripRef} onClick={(e) => e.stopPropagation()}>
              {images.map((src, i) => (
                <button
                  key={src}
                  type="button"
                  className={`${styles.thumb} ${i === openIndex ? styles.thumbActive : ''}`}
                  onClick={() => setOpenIndex(i)}
                  aria-label={`Show piece ${i + 1}`}
                  aria-current={i === openIndex ? 'true' : undefined}
                >
                  <img src={src} alt="" className={styles.thumbImage} />
                </button>
              ))}
            </div>
          )}
        </div>
      )}
    </section>
  )
}
