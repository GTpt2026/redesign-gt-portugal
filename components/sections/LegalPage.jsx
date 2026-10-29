/**
 * LegalPage — a plain, readable layout for the Privacy Policy and the Terms of Service.
 * Content comes from content/defaults/legal.mjs.
 */
import PageHero from './PageHero'
import Breadcrumbs from '@/components/ui/Breadcrumbs'
import styles from './LegalPage.module.css'

export default function LegalPage({ page }) {
  return (
    <>
      <PageHero headline={[page.title]} eyebrow="Legal" />
      <Breadcrumbs items={[{ label: page.title }]} />

      <section className={`section ${styles.section}`}>
        <div className="container">
          <article className={styles.prose}>
            {page.updated && <p className={styles.updated}>{page.updated}</p>}

            {page.sections.map((s, i) => (
              <div key={i} className={styles.block}>
                {s.heading && <h2 className={styles.heading}>{s.heading}</h2>}
                {s.paragraphs?.map((p, j) => <p key={j} className={styles.p}>{p}</p>)}
                {s.list && (
                  <ol className={styles.list} type="a">
                    {s.list.map((item, j) => <li key={j}>{item}</li>)}
                  </ol>
                )}
                {s.after?.map((p, j) => <p key={`a${j}`} className={styles.p}>{p}</p>)}
              </div>
            ))}
          </article>
        </div>
      </section>
    </>
  )
}
