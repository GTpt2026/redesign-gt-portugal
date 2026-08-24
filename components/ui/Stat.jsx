/**
 * Stat
 * Props:
 *   value       — string  e.g. '17M€'
 *   label       — string  e.g. 'in exports'
 *   description — string  optional supporting text
 *   align       — 'left' | 'center'
 *   valueProps  — object  extra props (e.g. data-* attrs) spread onto the value span
 */
import styles from './Stat.module.css'

export default function Stat({ value, label, description, align = 'left', valueProps = {} }) {
  return (
    <div className={`${styles.stat} ${align === 'center' ? styles.center : ''}`}>
      <span className={styles.value} {...valueProps}>{value}</span>
      <span className={styles.label}>{label}</span>
      {description && <p className={styles.description}>{description}</p>}
    </div>
  )
}
