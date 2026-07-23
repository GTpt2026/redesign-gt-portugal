import styles from './CategoriesIntro.module.css'

export default function CategoriesIntro() {
  return (
    <section className={`section ${styles.section}`}>
      <div className="container">
        <div className={styles.header}>
          <h2 className={styles.heading} data-reveal>A Proud 40-Year History</h2>
          <p className={styles.sub} data-reveal>
            For the last 40 years, GT Portugal has been producing outstanding garments
            and shoes for the world's leading brands. We couple unrivalled
            creativity with a rigorous ability to deliver.
          </p>
        </div>
      </div>
    </section>
  )
}
