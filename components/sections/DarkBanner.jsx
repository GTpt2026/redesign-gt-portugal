import Button from '@/components/ui/Button'
import styles from './DarkBanner.module.css'

export default function DarkBanner({
  eyebrow,
  title,
  subtitle,
  body,
  bodyColumns,
  cta,
  image,
  align = 'left',
}) {
  return (
    <section className={styles.section} data-theme="dark">
      {image && (
        <img src={image} alt="" aria-hidden="true" className={styles.bgImage} />
      )}
      <div className={styles.overlay} aria-hidden="true" />
      <div className="container">
        <div className={`${styles.inner} ${align === 'center' ? styles.centered : ''}`}>
          {eyebrow && <p className={styles.eyebrow}>{eyebrow}</p>}
          <h2 className={styles.title}>{title}</h2>
          {subtitle && <p className={styles.subtitle}>{subtitle}</p>}
          {body && <p className={styles.bodyText}>{body}</p>}
          {bodyColumns && bodyColumns.length > 0 && (
            <div className={styles.bodyColumns}>
              {bodyColumns.map((col, i) => (
                <p key={i} className={styles.bodyCol}>{col}</p>
              ))}
            </div>
          )}
          {cta && (
            <Button href={cta.href} variant="primary" size="md">
              {cta.label}
            </Button>
          )}
        </div>
      </div>
    </section>
  )
}
