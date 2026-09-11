'use client'

import { useEffect, useRef, useState } from 'react'
import styles from './PageIntro.module.css'

const bgMap = {
  default: '',
  subtle:  'section--subtle',
  muted:   'section--muted',
}

export default function PageIntro({ eyebrow, title, description, columns, bg = 'default', animate = false }) {
  const sectionBg = bgMap[bg] || ''
  const headerRef = useRef(null)
  const [visible, setVisible] = useState(!animate)

  useEffect(() => {
    if (!animate) return
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      setVisible(true)
      return
    }

    const el = headerRef.current
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true)
          observer.unobserve(el)
        }
      },
      { threshold: 0.3 }
    )
    observer.observe(el)
    return () => observer.disconnect()
  }, [animate])

  return (
    <section className={`section ${sectionBg} ${styles.section}`}>
      <div className="container">
        <div
          ref={headerRef}
          className={`${styles.header} ${animate ? styles.reveal : ''} ${visible ? styles.revealVisible : ''}`}
        >
          {eyebrow && <p className={styles.eyebrow}>{eyebrow}</p>}
          <h2 className={styles.title}>{title}</h2>
          {description && <p className={styles.description}>{description}</p>}
        </div>
        {columns && columns.length > 0 && (
          <div className={styles.columns}>
            {columns.map((col, i) => (
              <p key={i} className={styles.col}>{col}</p>
            ))}
          </div>
        )}
      </div>
    </section>
  )
}
