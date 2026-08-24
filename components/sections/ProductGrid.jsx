import Link from 'next/link'
import styles from './ProductGrid.module.css'

export default function ProductGrid({ items = [] }) {
  return (
    <section className={styles.section}>
      <div className={styles.grid}>
        {items.map((item, i) => {
          const isReversed = Math.floor(i / 2) % 2 === 1
          const Wrapper = item.href ? Link : 'div'
          const wrapperProps = item.href ? { href: item.href } : {}

          const imageEl = (
            <Wrapper key={`img-${item.id}`} {...wrapperProps} className={styles.imageCell}>
              <div className={styles.imageWrapper}>
                <img
                  src={item.image || '/images/placeholder.jpg'}
                  alt={item.title}
                  className={styles.image}
                />
              </div>
            </Wrapper>
          )

          const textEl = (
            <Wrapper key={`txt-${item.id}`} {...wrapperProps} className={styles.textCell}>
              <div className={styles.textInner}>
                <h3 className={styles.itemTitle}>{item.title}</h3>
                <p className={styles.itemDesc}>{item.description}</p>
              </div>
              <span
                className={`${styles.arrow} ${isReversed ? styles.arrowRight : styles.arrowLeft}`}
                aria-hidden="true"
              />
            </Wrapper>
          )

          return isReversed ? [textEl, imageEl] : [imageEl, textEl]
        })}
      </div>
    </section>
  )
}
