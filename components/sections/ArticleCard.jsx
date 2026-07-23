'use client'

/**
 * ArticleCard — article card with GSAP rounded-mask hover reveal.
 * On hover: a second image animates in via clip-path inset (rounded rectangle
 * expanding from the centre).  Both images are shown in full colour.
 */
import { useRef } from 'react'
import Image from 'next/image'
import ButtonAnimated from '@/components/ui/ButtonAnimated'
import gsap from 'gsap'
import styles from './ArticlesSection.module.css'

export default function ArticleCard({ article, index }) {
  const hoverImgRef = useRef(null)

  function onEnter() {
    gsap.to(hoverImgRef.current, {
      clipPath: 'inset(0% 0% 0% 0% round 0px 0px 8px 8px)',
      duration: 0.85,
      ease: 'expo.inOut',
    })
  }

  function onLeave() {
    gsap.to(hoverImgRef.current, {
      clipPath: 'inset(0% 0% 100% 0% round 0px 0px 999px 999px)',
      duration: 0.7,
      ease: 'expo.inOut',
    })
  }

  return (
    <article
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

        {/* Hover image — revealed by GSAP clip-path mask */}
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

      </div>

      {/* Body */}
      <div className={styles.body}>
        <h3 className={styles.title}>{article.title}</h3>
        <p className={styles.description}>{article.description}</p>
        <ButtonAnimated href={article.href} className={styles.readMore}>
          Read more
        </ButtonAnimated>
      </div>
    </article>
  )
}
