import Button from '@/components/ui/Button'
import styles from './InsightsCta.module.css'

export const LINKEDIN_URL = 'https://linkedin.com/company/gt-portugal'

export default function InsightsCta() {
  return (
    <section data-theme="dark" className={styles.band}>
      <div className={`container ${styles.inner}`}>
        <div>
          <p className={styles.eyebrow}>LinkedIn</p>
          <h2 className={styles.title}>Follow GT Portugal on LinkedIn</h2>
          <p className={styles.text}>
            New articles on fabrics, production and sustainability, shared as soon as we publish them.
          </p>
        </div>
        <div className={styles.actions}>
          <Button href={LINKEDIN_URL} target="_blank" rel="noopener noreferrer" size="lg">
            Follow on LinkedIn
          </Button>
          <Button href="/contact" variant="secondary" size="lg">
            Talk to our team
          </Button>
        </div>
      </div>
    </section>
  )
}
