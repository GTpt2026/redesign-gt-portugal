'use client'

/**
 * DarkBanner — full-bleed dark photo statement banner. Its content
 * (eyebrow, title lines, subtitle/body, CTA) fades and settles upward
 * in sequence as the section scrolls into view.
 */
import { useRef } from 'react'
import { useGSAP } from '@gsap/react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import ButtonAnimated from '@/components/ui/ButtonAnimated'
import styles from './DarkBanner.module.css'

gsap.registerPlugin(ScrollTrigger, useGSAP)

export default function DarkBanner({
  eyebrow,
  title,
  subtitle,
  body,
  bodyColumns,
  cta,
  image,
  align = 'left',
}) {
  const sectionRef = useRef(null)

  useGSAP(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return

    const items = sectionRef.current.querySelectorAll(`.${styles.animItem}`)
    gsap.set(items, { opacity: 0, y: 22 })
    gsap.to(items, {
      opacity: 1,
      y: 0,
      duration: 0.8,
      ease: 'power2.out',
      stagger: 0.12,
      scrollTrigger: { trigger: sectionRef.current, start: 'top 75%', once: true },
    })
  }, { scope: sectionRef })

  return (
    <section className={styles.section} data-theme="dark" ref={sectionRef}>
      {image && (
        <img src={image} alt="" aria-hidden="true" className={styles.bgImage} />
      )}
      <div className={styles.overlay} aria-hidden="true" />
      <div className="container">
        <div className={`${styles.inner} ${align === 'center' ? styles.centered : ''}`}>
          {eyebrow && <p className={`${styles.eyebrow} ${styles.animItem}`}>{eyebrow}</p>}
          {Array.isArray(title) ? (
            <h2 className={styles.title}>
              {title.map((line, i) => (
                <span
                  key={i}
                  className={`${i === title.length - 1 ? styles.titleAccent : styles.titleLine} ${styles.animItem}`}
                >
                  {line}
                </span>
              ))}
            </h2>
          ) : (
            <h2 className={`${styles.title} ${styles.animItem}`}>{title}</h2>
          )}
          {subtitle && <p className={`${styles.subtitle} ${styles.animItem}`}>{subtitle}</p>}
          {body && <p className={`${styles.bodyText} ${styles.animItem}`}>{body}</p>}
          {bodyColumns && bodyColumns.length > 0 && (
            <div className={`${styles.bodyColumns} ${styles.animItem}`}>
              {bodyColumns.map((col, i) => (
                <p key={i} className={styles.bodyCol}>{col}</p>
              ))}
            </div>
          )}
          {cta && (
            <ButtonAnimated href={cta.href} className={`${styles.cta} ${styles.animItem}`}>
              {cta.label}
            </ButtonAnimated>
          )}
        </div>
      </div>
    </section>
  )
}
