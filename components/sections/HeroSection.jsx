/**
 * HeroSection
 * Props:
 *   headline    — string | string[]
 *                 Pass a string array when using `video` to control
 *                 exact line breaks: ['Responsible', 'Development', '+ Production']
 *                 Each item renders as its own white-background block.
 *   subheadline — string
 *   eyebrow     — string   small red label above headline
 *   dark        — boolean  dark section without video
 *   video       — string   path to .mp4, e.g. "/videos/hero.mp4"
 *                          Place file in /public/videos/hero.mp4
 *   actions     — ReactNode  CTA buttons
 */
import styles from './HeroSection.module.css'

export default function HeroSection({
  headline,
  subheadline,
  eyebrow,
  dark = false,
  video = null,
  actions,
}) {
  const hasVideo      = !!video
  const isDark        = dark || hasVideo
  const headlineLines = hasVideo && Array.isArray(headline) ? headline : null

  return (
    <section
      className={[
        styles.hero,
        isDark   ? styles.dark     : '',
        hasVideo ? styles.hasVideo : '',
      ].join(' ')}
      data-theme={hasVideo ? 'dark' : undefined}
    >
      {/* ── Video background ───────────────────────────────── */}
      {hasVideo && (
        <>
          <video
            className={styles.video}
            autoPlay
            muted
            loop
            playsInline
            aria-hidden="true"
          >
            <source src={video} type="video/mp4" />
          </video>
          <div className={styles.overlay} aria-hidden="true" />
        </>
      )}

      {/* ── Content (above video) ──────────────────────────── */}
      <div className={styles.body}>
        <div className={`container ${styles.inner}`}>
          <div className={styles.content}>

            {eyebrow && (
              <span className={styles.eyebrow} data-hero-eyebrow>{eyebrow}</span>
            )}

            {/* Array headline → one white block per line */}
            {headlineLines ? (
              <h1 className={styles.headline}>
                {headlineLines.map((line, i) => (
                  <span key={i} className={styles.headlineLine} data-hero-line>
                    {line}
                  </span>
                ))}
              </h1>
            ) : (
              <h1
                className={[
                  styles.headline,
                  hasVideo ? styles.headlineHighlight : '',
                ].join(' ')}
              >
                {headline}
              </h1>
            )}

            {subheadline && (
              <p className={[styles.sub, hasVideo ? styles.subDark : ''].join(' ')} data-hero-sub>
                {subheadline}
              </p>
            )}

            {actions && (
              <div className={styles.actions} data-hero-actions>{actions}</div>
            )}

          </div>
        </div>
      </div>
    </section>
  )
}
