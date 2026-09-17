'use client'

/**
 * ImpactRow — full-width "commitment spec sheet" block, structured like
 * a services/pricing page: counter eyebrow, title, intro, then labelled
 * sub-sections separated by hairline dividers (a bulleted "Practices"
 * list and a key/value "Impact" strip). Brand fonts, colours and tokens
 * stay exactly as defined in globals.css — only the layout pattern is
 * borrowed from the reference structure.
 *
 * Props:
 *   index    — number   1-based position, shown as "S.01"
 *   total    — number   total row count, shown as "/ 06"
 *   title    — string
 *   body     — string
 *   practices— string[] short bullet points
 *   impact   — Array<{ label: string, value: string }>  2 key facts;
 *              a numeric first value (e.g. '50%') counts up on scroll.
 *   icon     — ReactNode  optional illustration (see CommitmentIcons) —
 *              its [data-draw] paths (split, stroke-only) draw via
 *              GSAP's DrawSVGPlugin, then fade out as its separate
 *              [data-fill] paths (the original, unsplit shapes) fade
 *              in with the solid brand-accent fill.
 *   bg       — 'default' | 'subtle'
 */
import { useRef } from 'react'
import { useGSAP } from '@gsap/react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { DrawSVGPlugin } from 'gsap/DrawSVGPlugin'
import styles from './ImpactRow.module.css'

gsap.registerPlugin(ScrollTrigger, DrawSVGPlugin, useGSAP)

function parseValue(value) {
  const match = /^(\D*)(\d+)(\D*)$/.exec(value)
  if (!match) return null
  const [, prefix, digits, suffix] = match
  return { prefix, end: parseInt(digits, 10), suffix }
}

export default function ImpactRow({ index, total, title, body, practices = [], impact = [], icon, bg = 'default' }) {
  const rowRef = useRef(null)

  useGSAP(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return

    const trigger = { trigger: rowRef.current, start: 'top 85%', once: true }

    const targets = rowRef.current.querySelectorAll('[data-impact-value]')
    targets.forEach((el) => {
      const parsed = parseValue(el.dataset.rawValue)
      if (!parsed) return
      const proxy = { val: 0 }
      gsap.to(proxy, {
        val: parsed.end,
        duration: 1.4,
        ease: 'power2.out',
        scrollTrigger: trigger,
        onUpdate() {
          el.textContent = `${parsed.prefix}${Math.round(proxy.val)}${parsed.suffix}`
        },
        onComplete() {
          el.textContent = `${parsed.prefix}${parsed.end}${parsed.suffix}`
        },
      })
    })

    const strokes = rowRef.current.querySelectorAll('[data-draw]')
    const fills = rowRef.current.querySelectorAll('[data-fill]')
    if (strokes.length) {
      gsap.set(strokes, { drawSVG: 0 })
      gsap.set(fills, { fillOpacity: 0 })

      // Same wall-clock duration for every sub-path would make a tiny
      // checkmark crawl as slowly as the icon's main outline. Scale each
      // path's draw time to its real geometric length (DrawSVGPlugin's
      // own length reader) instead, so every part of the icon appears
      // to draw at the same steady speed — like a single hand actually
      // tracing the shape.
      const lengths = Array.from(strokes).map((p) => DrawSVGPlugin.getLength(p))
      const maxLength = Math.max(...lengths, 1)
      const SLOWEST_DURATION = 1.8

      const tl = gsap.timeline({ scrollTrigger: trigger })
      strokes.forEach((p, i) => {
        const duration = Math.max(0.4, (lengths[i] / maxLength) * SLOWEST_DURATION)
        tl.to(p, { drawSVG: '100%', duration, ease: 'power1.inOut' }, 0)
      })
      // Cross-fade: the solid fill (the original, unsplit paths) fades
      // in while the split stroke layer fades out on top of it.
      tl.to(fills, { fillOpacity: 1, duration: 0.9, ease: 'power1.inOut', stagger: 0.06 }, '-=0.7')
      tl.to(strokes, { opacity: 0, duration: 0.9, ease: 'power1.inOut', stagger: 0.06 }, '<')
    }
  }, { scope: rowRef })

  return (
    <section className={`section ${bg === 'subtle' ? 'section--subtle' : ''} ${styles.section}`}>
      <div className="container">
        <div className={styles.row} ref={rowRef}>

          <div className={styles.block}>

            <span className={styles.counter}>S.{String(index).padStart(2, '0')} / {String(total).padStart(2, '0')}</span>
            <h3 className={styles.title}>{title}</h3>
            <p className={styles.body}>{body}</p>

            {practices.length > 0 && (
              <div className={styles.sub}>
                <span className={styles.subLabel}>Practices</span>
                <ul className={styles.list}>
                  {practices.map((p) => (
                    <li key={p} className={styles.listItem}>
                      <span className={styles.dash} aria-hidden="true">—</span>
                      {p}
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {impact.length > 0 && (
              <div className={styles.sub}>
                <span className={styles.subLabel}>Impact</span>
                <div className={styles.factRow}>
                  {impact.map((f) => {
                    const parsed = parseValue(f.value)
                    return (
                      <div className={styles.fact} key={f.label}>
                        <span className={styles.factLabel}>{f.label}</span>
                        <span
                          className={styles.factValue}
                          data-impact-value={parsed ? true : undefined}
                          data-raw-value={f.value}
                        >
                          {parsed ? `${parsed.prefix}0${parsed.suffix}` : f.value}
                        </span>
                      </div>
                    )
                  })}
                </div>
              </div>
            )}

          </div>

          {icon && <div className={styles.illustration} aria-hidden="true">{icon}</div>}

        </div>
      </div>
    </section>
  )
}
