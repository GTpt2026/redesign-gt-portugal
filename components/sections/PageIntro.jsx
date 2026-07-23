import styles from './PageIntro.module.css'

const bgMap = {
  default: '',
  subtle:  'section--subtle',
  muted:   'section--muted',
}

export default function PageIntro({ eyebrow, title, description, columns, bg = 'default' }) {
  const sectionBg = bgMap[bg] || ''
  return (
    <section className={`section ${sectionBg} ${styles.section}`}>
      <div className="container">
        <div className={styles.header}>
          {eyebrow && <p className={styles.eyebrow}>{eyebrow}</p>}
          <h2 className={styles.title}>{title}</h2>
          {description && <p className={styles.description}>{description}</p>}
        </div>
        {columns && columns.length > 0 && (
          <div className={styles.columns}>
            {columns.map((col, i) => (
              <p key={i} className={styles.col}>{col}</p>
            ))}
          </div>
        )}
      </div>
    </section>
  )
}
