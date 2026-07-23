/**
 * Testimonial
 * Props:
 *   quote   — string
 *   name    — string
 *   role    — string
 *   logo    — string  path to brand logo SVG (optional)
 *   variant — 'default' | 'dark'
 */
import styles from './Testimonial.module.css'

export default function Testimonial({ quote, name, role, logo, variant = 'default' }) {
  return (
    <figure className={`${styles.testimonial} ${variant === 'dark' ? styles.dark : ''}`} data-stagger-item>
      <blockquote className={styles.quote}>
        <p>&ldquo;{quote}&rdquo;</p>
      </blockquote>
      <figcaption className={styles.author}>
        <span className={styles.name}>{name}</span>
        <span className={styles.role}>{role}</span>
        {logo && (
          <img
            src={logo}
            alt=""
            className={styles.logo}
            aria-hidden="true"
          />
        )}
      </figcaption>
    </figure>
  )
}
