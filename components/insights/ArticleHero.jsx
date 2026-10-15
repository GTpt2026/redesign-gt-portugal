import { formatDate } from '@/lib/formatDate'
import styles from './ArticleHero.module.css'

export default function ArticleHero({ article }) {
  const { title, subtitle, category, topic, date, readMinutes, cover } = article

  return (
    <header data-theme="dark" className={styles.hero}>
      <img
        src={cover.src}
        width={cover.width}
        height={cover.height}
        alt=""
        className={styles.bgImage}
        fetchPriority="high"
      />
      <div className={styles.overlay} aria-hidden="true" />
      <div className={styles.body}>
        <div className="container">
          <p className={styles.eyebrow}>{topic ? `${category} · ${topic}` : category}</p>
          <h1 className={styles.title}>{title}</h1>
          {subtitle && <p className={styles.subtitle}>{subtitle}</p>}
          <p className={styles.meta}>
            <time dateTime={date}>{formatDate(date)}</time>
            <span aria-hidden="true">·</span>
            <span>{readMinutes} min read</span>
          </p>
        </div>
      </div>
    </header>
  )
}
