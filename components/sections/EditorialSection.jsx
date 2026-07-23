import styles from './EditorialSection.module.css'

const bgMap = {
  default: '',
  subtle:  'section--subtle',
  muted:   'section--muted',
  dark:    'section--dark',
}

export default function EditorialSection({
  eyebrow,
  title,
  body,
  bg = 'default',
  align = 'center',
}) {
  const sectionBg = bgMap[bg] || ''
  const isDark = bg === 'dark'
  const paragraphs = Array.isArray(body) ? body : [body]

  return (
    <section
      className={`section ${sectionBg} ${styles.section}`}
      {...(isDark ? { 'data-theme': 'dark' } : {})}
    >
      <div className="container">
        <div className={`${styles.inner} ${align === 'left' ? styles.left : styles.centered}`}>
          {eyebrow && <p className={styles.eyebrow}>{eyebrow}</p>}
          <h2 className={styles.title}>{title}</h2>
          <div className={styles.body}>
            {paragraphs.map((p, i) => (
              <p key={i} className={styles.para}>{p}</p>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
