'use client'

/**
 * ArticleCard — the whole card is one link (not just the "Read more"
 * label), so touch devices get a full-size tap target. On pointer
 * devices, hovering anywhere on the card still triggers the GSAP
 * rounded-mask image reveal and the "Read more" char-swap, exactly as
 * before. Touch devices have no hover to signal "this is tappable", so
 * a small always-visible arrow badge sits in the image corner instead —
 * shown only via `(hover: none)`, never competing with the mouse effect.
 */
import { useRef } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import gsap from 'gsap'
import { charsEnter, charsLeave } from '@/components/ui/animatedChars'
import buttonStyles from '@/components/ui/ButtonAnimated.module.css'
import styles from './ArticlesSection.module.css'

const ArrowRight = ({ size = 14 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none"
    stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <line x1="5" y1="12" x2="19" y2="12" />
    <polyline points="12 5 19 12 12 19" />
  </svg>
)

export default function ArticleCard({ article, index }) {
  const hoverImgRef = useRef(null)
  const readMoreRef = useRef(null)
  const readMoreText = 'Read more'

  function onEnter() {
    if (hoverImgRef.current) {
      gsap.to(hoverImgRef.current, {
        clipPath: 'inset(0% 0% 0% 0% round 0px 0px 8px 8px)',
        duration: 0.85,
        ease: 'expo.inOut',
      })
    }
    charsEnter(readMoreRef.current)
  }

  function onLeave() {
    if (hoverImgRef.current) {
      gsap.to(hoverImgRef.current, {
        clipPath: 'inset(0% 0% 100% 0% round 0px 0px 999px 999px)',
        duration: 0.7,
        ease: 'expo.inOut',
      })
    }
    charsLeave(readMoreRef.current)
  }

  return (
    <Link
      href={article.href}
      className={styles.card}
      data-stagger-item
      onMouseEnter={onEnter}
      onMouseLeave={onLeave}
    >
      {/* Image wrapper — both images stacked */}
      <div className={styles.imageWrapper}>

        {/* Base image — always visible, full colour */}
        <Image
          src={article.image}
          alt={article.title}
          fill
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
          loading={index === 0 ? 'eager' : 'lazy'}
          className={styles.image}
        />

        {/* Hover image — revealed by GSAP clip-path mask (pointer devices) */}
        {article.hoverImage && (
          <div ref={hoverImgRef} className={styles.imageHover}>
            <Image
              src={article.hoverImage}
              alt=""
              fill
              sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
              loading="lazy"
              aria-hidden="true"
              className={styles.image}
            />
          </div>
        )}

        {/* Touch-only tap affordance — no hover exists to reveal intent */}
        <span className={styles.tapHint} aria-hidden="true">
          <ArrowRight />
        </span>

      </div>

      {/* Body */}
      <div className={styles.body}>
        <h3 className={styles.title}>{article.title}</h3>
        <p className={styles.description}>{article.description}</p>
        <span ref={readMoreRef} className={`${styles.readMore} ${buttonStyles.charRow}`}>
          {readMoreText.split('').map((ch, i) => (
            <span key={i} className={buttonStyles.charClip}>
              <span data-l="1" className={buttonStyles.char}>{ch === ' ' ? ' ' : ch}</span>
              <span data-l="2" className={buttonStyles.char} aria-hidden="true">{ch === ' ' ? ' ' : ch}</span>
            </span>
          ))}
        </span>
      </div>
    </Link>
  )
}
