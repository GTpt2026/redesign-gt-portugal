'use client'

/**
 * InsightsExplorer — category chips + the article grid. The newest
 * article in the current view leads as a wide card; the rest follow in
 * a grid, revealed nine at a time.
 */
import { useMemo, useState } from 'react'
import InsightCard from './InsightCard'
import styles from './InsightsExplorer.module.css'

const PAGE = 9

export default function InsightsExplorer({ articles }) {
  const [category, setCategory] = useState('All')
  const [shown, setShown] = useState(PAGE)

  const categories = useMemo(() => {
    const counts = new Map()
    for (const a of articles) counts.set(a.category, (counts.get(a.category) ?? 0) + 1)
    return [['All', articles.length], ...counts]
  }, [articles])

  const filtered = category === 'All' ? articles : articles.filter((a) => a.category === category)
  const [lead, ...rest] = filtered
  const visible = rest.slice(0, shown)

  function pick(name) {
    setCategory(name)
    setShown(PAGE)
  }

  return (
    <section className={`section ${styles.section}`}>
      <div className="container">
        <div className={styles.filters} role="group" aria-label="Filter articles by category">
          {categories.map(([name, count]) => (
            <button
              key={name}
              type="button"
              className={`${styles.chip} ${category === name ? styles.chipActive : ''}`}
              aria-pressed={category === name}
              onClick={() => pick(name)}
            >
              {name}
              <span className={styles.count}>{count}</span>
            </button>
          ))}
        </div>

        {lead && <InsightCard article={lead} featured />}

        <div className={styles.grid}>
          {visible.map((a) => (
            <InsightCard key={a.slug} article={a} />
          ))}
        </div>

        {rest.length > shown && (
          <div className={styles.more}>
            <button type="button" className={styles.moreBtn} onClick={() => setShown((n) => n + PAGE)}>
              Show more articles
            </button>
            <p className={styles.moreHint} aria-live="polite">
              Showing {visible.length + 1} of {filtered.length}
            </p>
          </div>
        )}
      </div>
    </section>
  )
}
