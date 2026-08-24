/**
 * StatBanner — full-width photo banner with a light gradient overlay,
 * a headline, a bold accent-coloured stat/highlight line, and a short
 * description. Used to break up category pages with a concrete number
 * (lead time, capacity, MOQs...) and keep the page visually varied.
 */
import styles from './StatBanner.module.css'

export default function StatBanner({ title, stat, description, image }) {
  return (
    <section className={styles.section}>
      {image && <img src={image} alt="" aria-hidden="true" className={styles.bgImage} />}
      <div className={styles.overlay} aria-hidden="true" />
      <div className="container">
        <div className={styles.inner}>
          {title && <h2 className={styles.title}>{title}</h2>}
          {stat && <p className={styles.stat}>{stat}</p>}
          {description && <p className={styles.description}>{description}</p>}
        </div>
      </div>
    </section>
  )
}
