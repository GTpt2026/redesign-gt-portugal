'use client'

/**
 * ButtonAnimated — tight per-char clip stagger.
 *
 * Each character has its own overflow:hidden clip (~1.15em tall).
 * Inside each clip, two chars are stacked:
 *   [data-l="1"] — default, at flow position 0 (visible inside clip)
 *   [data-l="2"] — hover,   at flow position 1.15em (below clip = invisible)
 *
 * Hover in:  both slide UP by -100% → L1 exits above clip, L2 enters clip.
 * Hover out: both slide DOWN by 0%  → L1 returns to 0, L2 returns below clip.
 * Travel = 1.15em only. No button-level overflow needed.
 */
import { useRef } from 'react'
import Link from 'next/link'
import gsap from 'gsap'
import styles from './ButtonAnimated.module.css'

export default function ButtonAnimated({
  children,
  href,
  className = '',
  type = 'button',
  onClick,
  iconRight,
}) {
  const elRef = useRef(null)
  const text  = typeof children === 'string' ? children.trim() : ''

  function onEnter() {
    if (!elRef.current) return
    const l1 = [...elRef.current.querySelectorAll('[data-l="1"]')]
    const l2 = [...elRef.current.querySelectorAll('[data-l="2"]')]
    gsap.killTweensOf([...l1, ...l2])
    // L1 exits first, L2 only starts after L1 is mostly gone
    gsap.to(l1, { y: '-100%', duration: 0.30, ease: 'power3.in',  stagger: 0.024 })
    gsap.to(l2, { y: '-100%', duration: 0.40, ease: 'power3.out', stagger: 0.026, delay: 0.22 })
  }

  function onLeave() {
    if (!elRef.current) return
    const l1 = [...elRef.current.querySelectorAll('[data-l="1"]')]
    const l2 = [...elRef.current.querySelectorAll('[data-l="2"]')]
    gsap.killTweensOf([...l1, ...l2])
    // L2 exits first, L1 only returns after L2 is mostly gone
    gsap.to(l2, { y: '0%', duration: 0.28, ease: 'power3.in',  stagger: 0.022 })
    gsap.to(l1, { y: '0%', duration: 0.38, ease: 'power3.out', stagger: 0.024, delay: 0.20 })
  }

  const inner = (
    <>
      <span className={styles.charRow}>
        {text.split('').map((ch, i) => (
          <span key={i} className={styles.charClip}>
            {/* Default char — sits at top of clip (visible) */}
            <span data-l="1" className={styles.char}>
              {ch === ' ' ? ' ' : ch}
            </span>
            {/* Hover char — sits below clip (invisible until hover) */}
            <span data-l="2" className={styles.char} aria-hidden="true">
              {ch === ' ' ? ' ' : ch}
            </span>
          </span>
        ))}
      </span>
      {iconRight && <span className={styles.icon}>{iconRight}</span>}
    </>
  )

  const shared = {
    ref: elRef,
    className: `${className} ${styles.base}`.trim(),
    onMouseEnter: onEnter,
    onMouseLeave: onLeave,
  }

  if (href) return <Link {...shared} href={href}>{inner}</Link>
  return <button {...shared} type={type} onClick={onClick}>{inner}</button>
}
