/**
 * HeroGlitch — duotone photo hero with a giant blend-mode headline and
 * subtle RGB-split "glitch" accents, cipharvin.ro-style. Pure CSS,
 * no new dependencies. The glitch layer reads the same text via
 * `attr(data-text)` on ::before/::after, so there's no duplicated DOM.
 */
import styles from './HeroGlitch.module.css'

export default function HeroGlitch({ eyebrow, headline, image }) {
  return (
    <section className={styles.section} data-theme="dark">
      <img src={image} alt="" aria-hidden="true" className={styles.bgImage} />
      <div className={styles.overlay} aria-hidden="true" />

      <div className="container">
        <div className={styles.inner}>
          {eyebrow && <p className={styles.eyebrow}>{eyebrow}</p>}

          <div className={styles.headlineWrap}>
            <h1 className={styles.headline}>{headline}</h1>
            <span className={styles.glitch} data-text={headline} aria-hidden="true" />
          </div>
        </div>
      </div>
    </section>
  )
}
