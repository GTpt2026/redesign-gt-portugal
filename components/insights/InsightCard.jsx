import Link from 'next/link'
import { formatDate } from '@/lib/formatDate'
import styles from './InsightCard.module.css'

export default function InsightCard({ article, featured = false }) {
  const { slug, title, excerpt, date, category, topic, readMinutes, thumb } = article

  return (
    <Link
      href={`/insights/${slug}`}
      className={`${styles.card} ${featured ? styles.featured : ''}`}
    >
      <div className={styles.media}>
        <img
          src={thumb.src}
          width={thumb.width}
          height={thumb.height}
          alt=""
          className={styles.image}
          loading={featured ? 'eager' : 'lazy'}
          decoding="async"
        />
      </div>

      <div className={styles.body}>
        <p className={styles.meta}>
          <span className={styles.category}>{topic ? `${category} · ${topic}` : category}</span>
        </p>
        <h3 className={styles.title}>{title}</h3>
        {excerpt && <p className={styles.excerpt}>{excerpt}</p>}
        <p className={styles.foot}>
          <span>{formatDate(date)}</span>
          <span aria-hidden="true">·</span>
          <span>{readMinutes} min read</span>
          <span className={styles.cta}>
            Read article
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor"
              strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
              <line x1="5" y1="12" x2="19" y2="12" />
              <polyline points="12 5 19 12 12 19" />
            </svg>
          </span>
        </p>
      </div>
    </Link>
  )
}
