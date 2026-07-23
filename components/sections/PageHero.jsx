import styles from './PageHero.module.css'

export default function PageHero({ headline = [], eyebrow, image, alt = '' }) {
  return (
    <section data-theme="dark" className={styles.hero}>
      {image && (
        <img
          src={image}
          alt={alt}
          aria-hidden="true"
          className={styles.bgImage}
        />
      )}
      <div className={styles.overlay} aria-hidden="true" />
      <div className={styles.body}>
        <div className="container">
          {eyebrow && <span className={styles.eyebrow}>{eyebrow}</span>}
          <h1 className={styles.headline}>
            {headline.map((line, i) =>
              i < headline.length - 1
                ? <span key={i} className={styles.line}>{line}</span>
                : <span key={i} className={styles.accentLine}>{line}</span>
            )}
          </h1>
        </div>
      </div>
    </section>
  )
}
