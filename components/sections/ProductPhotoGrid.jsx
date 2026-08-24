/**
 * ProductPhotoGrid — dense catalogue-style grid of product photos on a
 * plain white background (configurable column count, default 4), no captions.
 */
import styles from './ProductPhotoGrid.module.css'

export default function ProductPhotoGrid({ images = [], alt = '', columns = 4 }) {
  if (!images.length) return null

  return (
    <section className={styles.section}>
      <div className="container">
        <div className={styles.grid} style={{ '--cols': columns }}>
          {images.map((src, i) => (
            <div key={src} className={styles.cell}>
              <img src={src} alt={`${alt} ${i + 1}`} className={styles.image} loading="lazy" />
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
