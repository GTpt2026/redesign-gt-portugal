/**
 * FeatureColumns — labelled highlight grid (2-4 items).
 * Used on category detail pages, e.g. Method / Material / Sustainability.
 */
import styles from './FeatureColumns.module.css'

export default function FeatureColumns({ eyebrow, title, items = [] }) {
  return (
    <section className="section section--subtle">
      <div className="container">
        {(eyebrow || title) && (
          <div className={styles.header}>
            {eyebrow && <p className={styles.eyebrow}>{eyebrow}</p>}
            {title && <h2 className={styles.title}>{title}</h2>}
          </div>
        )}
        <div className={styles.grid}>
          {items.map(item => (
            <div key={item.label} className={styles.item}>
              <span className={styles.label}>{item.label}</span>
              <p className={styles.text}>{item.text}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
