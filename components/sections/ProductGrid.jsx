'use client'

import { useRef } from 'react'
import Link from 'next/link'
import styles from './ProductGrid.module.css'
import { charsEnter, charsLeave } from '@/components/ui/animatedChars'

function Title({ text, href }) {
  const ref = useRef(null)

  if (!href) return <h3 className={styles.title}>{text}</h3>

  const words = text.split(' ')

  return (
    <h3 className={styles.title}>
      <Link
        href={href}
        ref={ref}
        className={styles.titleLink}
        onMouseEnter={() => charsEnter(ref.current)}
        onMouseLeave={() => charsLeave(ref.current)}
      >
        {words.flatMap((word, wi) => {
          const wordEl = (
            <span key={`w-${wi}`} className={styles.word}>
              {word.split('').map((ch, ci) => (
                <span key={ci} className={styles.charClip}>
                  <span data-l="1" className={styles.char}>{ch}</span>
                  <span data-l="2" className={styles.char} aria-hidden="true">{ch}</span>
                </span>
              ))}
            </span>
          )
          return wi < words.length - 1 ? [wordEl, ' '] : [wordEl]
        })}
      </Link>
    </h3>
  )
}

export default function ProductGrid({ items = [] }) {
  return (
    <section className={styles.section}>
      <div className="container">
        <div className={styles.grid}>
          {items.map((item) => (
            <div key={item.id} className={styles.card}>
              {item.href ? (
                <Link href={item.href} className={styles.imageLink}>
                  <div className={styles.imageWrap}>
                    <img src={item.image || '/images/placeholder.jpg'} alt={item.title} className={styles.image} />
                  </div>
                </Link>
              ) : (
                <div className={styles.imageWrap}>
                  <img src={item.image || '/images/placeholder.jpg'} alt={item.title} className={styles.image} />
                </div>
              )}
              <Title text={item.title} href={item.href} />
              <p className={styles.desc}>{item.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
