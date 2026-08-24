/**
 * CrossLinkSection — small set of cards pointing to other parts of the
 * site (About, Sustainability, Footwear...). Copy is passed in per page
 * so it can be framed differently on every category.
 */
import Card from '@/components/ui/Card'
import styles from './CrossLinkSection.module.css'

export default function CrossLinkSection({ items = [] }) {
  if (!items.length) return null

  return (
    <section className="section section--subtle">
      <div className="container">
        <div className={styles.grid} data-stagger>
          {items.map(item => (
            <div key={item.href} data-stagger-item>
              <Card
                href={item.href}
                tag={item.tag}
                title={item.title}
                description={item.description}
                variant="elevated"
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
