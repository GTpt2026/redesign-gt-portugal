/**
 * ArticlesSection — 4-column editorial cards.
 * Each card has a base image (always colour) and a hover image revealed
 * via a GSAP rounded-mask clip-path animation (see ArticleCard.jsx).
 */
import ArticleCard from './ArticleCard'
import { getFeatureCards } from '@/lib/content'
import styles from './ArticlesSection.module.css'

export default async function ArticlesSection({ title, excludeIds = [] }) {
  const cards = await getFeatureCards()
  const visibleArticles = cards.filter((a) => !excludeIds.includes(a.id))

  return (
    <section className={`section ${styles.section}`}>
      <div className="container">

        {title && <h2 className={styles.sectionTitle} data-reveal>{title}</h2>}

        <div className={styles.grid} data-stagger>
          {visibleArticles.map((article, i) => (
            <ArticleCard key={article.id} article={article} index={i} />
          ))}
        </div>

      </div>
    </section>
  )
}
