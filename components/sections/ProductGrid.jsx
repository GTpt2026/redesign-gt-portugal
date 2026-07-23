import styles from './ProductGrid.module.css'

export default function ProductGrid({ items = [] }) {
  return (
    <section className={styles.section}>
      <div className={styles.grid}>
        {items.map((item, i) => {
          const isReversed = Math.floor(i / 2) % 2 === 1

          const imageEl = (
            <div key={`img-${item.id}`} className={styles.imageCell}>
              <div className={styles.imageWrapper}>
                <img
                  src={item.image || '/images/placeholder.jpg'}
                  alt={item.title}
                  className={styles.image}
                />
              </div>
            </div>
          )

          const textEl = (
            <div key={`txt-${item.id}`} className={styles.textCell}>
              <div className={styles.textInner}>
                <h3 className={styles.itemTitle}>{item.title}</h3>
                <p className={styles.itemDesc}>{item.description}</p>
              </div>
            </div>
          )

          return isReversed ? [textEl, imageEl] : [imageEl, textEl]
        })}
      </div>
    </section>
  )
}
