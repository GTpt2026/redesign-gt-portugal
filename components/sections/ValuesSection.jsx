import Button from '@/components/ui/Button'
import styles from './ValuesSection.module.css'

export default function ValuesSection({ values = [], image }) {
  return (
    <section className={styles.section} data-theme="dark">
      {image && (
        <img src={image} alt="" aria-hidden="true" className={styles.bgImage} />
      )}
      <div className={styles.overlay} aria-hidden="true" />
      <div className="container">
        <div className={styles.values}>
          {values.map((v) => (
            <div key={v.label} className={styles.value}>
              <div className={styles.accentBar} aria-hidden="true" />
              <div className={styles.valueContent}>
                <h3 className={styles.label}>{v.label}</h3>
                <p className={styles.desc}>{v.description}</p>
                {v.cta && (
                  <Button href={v.cta.href} variant="ghost" size="sm">
                    {v.cta.label}
                  </Button>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
