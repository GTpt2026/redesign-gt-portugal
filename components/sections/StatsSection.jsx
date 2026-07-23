/**
 * StatsSection
 * Props:
 *   stats — Array<{ value: string, label: string, description?: string }>
 *   dark  — boolean
 */
import Stat from '@/components/ui/Stat'
import styles from './StatsSection.module.css'

export default function StatsSection({ stats, dark = false }) {
  return (
    <section className={`section ${dark ? 'section--dark' : 'section--muted'}`}>
      <div className="container">
        <div className={styles.grid}>
          {stats.map(s => (
            <Stat key={s.value} value={s.value} label={s.label} description={s.description} align="center" />
          ))}
        </div>
      </div>
    </section>
  )
}
