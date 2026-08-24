/**
 * RelatedCategories — small cross-link grid shown at the bottom of a
 * category detail page (e.g. other Textiles categories).
 */
import Card from '@/components/ui/Card'
import styles from './RelatedCategories.module.css'

export default function RelatedCategories({ title, items = [] }) {
  if (!items.length) return null

  return (
    <section className="section">
      <div className="container">
        {title && <h2 className={styles.title} data-reveal>{title}</h2>}
        <div className={styles.grid} data-stagger>
          {items.map(item => (
            <div key={item.slug} data-stagger-item>
              <Card
                href={`/textiles/${item.slug}`}
                title={item.title}
                description={item.cardDescription}
                image={item.cardImage || item.image}
                variant="bordered"
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
