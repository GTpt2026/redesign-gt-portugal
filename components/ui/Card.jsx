/**
 * Card
 * Props:
 *   title       — string (required)
 *   description — string
 *   tag         — string  category label
 *   variant     — 'default' | 'bordered' | 'elevated'
 *   href        — string  makes the card a link
 *   children    — replaces description when provided
 */
import Link from 'next/link'
import styles from './Card.module.css'

export default function Card({ title, description, tag, variant = 'default', href, children }) {
  const className = `${styles.card} ${styles[variant]} ${href ? styles.linked : ''}`
  const content = (
    <div className={styles.body}>
      {tag && <span className={styles.tag}>{tag}</span>}
      <h3 className={styles.title}>{title}</h3>
      {children || (description && <p className={styles.description}>{description}</p>)}
    </div>
  )

  if (href) return <Link href={href} className={className}>{content}</Link>
  return <div className={className}>{content}</div>
}
