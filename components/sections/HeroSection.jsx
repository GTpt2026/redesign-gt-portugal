/**
 * HeroSection
 * Props:
 *   headline    — string | string[]
 *                 Pass a string array when using `video` to control
 *                 exact line breaks: ['Responsible', 'Development', '+ Production']
 *                 Each item renders as its own white-background block.
 *                 A single string on a video hero spans the full
 *                 container width, Acne-Studios-wordmark style.
 *   subheadline — string
 *   eyebrow     — string   small red label above headline
 *   eyebrowHref — string   optional link; hovering the eyebrow reveals
 *                          a "Discover more" hint, like Acne Studios' hero
 *   dark        — boolean  dark section without video
 *   video       — string   path to .mp4, e.g. "/videos/hero.mp4"
 *                          Place file in /public/videos/hero.mp4
 *   actions     — ReactNode  CTA buttons
 */
import Link from 'next/link'
import HeroMarquee from './HeroMarquee'
import styles from './HeroSection.module.css'

export default function HeroSection({
  headline,
  subheadline,
  eyebrow,
  eyebrowHref,
  dark = false,
  video = null,
  actions,
  marqueeHeadline = false,
}) {
  const hasVideo      = !!video
  const isDark        = dark || hasVideo
  const headlineLines = hasVideo && Array.isArray(headline) ? headline : null
  const isMarquee      = hasVideo && !headlineLines && marqueeHeadline
  const fullWidthHeadline = hasVideo && !headlineLines && !marqueeHeadline

  const eyebrowEl = eyebrow && (
    eyebrowHref ? (
      <Link href={eyebrowHref} className={styles.eyebrow} data-hero-eyebrow>
        <span>{eyebrow}</span>
        <span className={styles.eyebrowMore}>Discover more</span>
      </Link>
    ) : (
      <span className={styles.eyebrow} data-hero-eyebrow>{eyebrow}</span>
    )
  )

  const subActionsEl = (subheadline || actions) && (
    <>
      {subheadline && (
        <p className={[styles.sub, hasVideo ? styles.subDark : ''].join(' ')} data-hero-sub>
          {subheadline}
        </p>
      )}
      {actions && (
        <div className={styles.actions} data-hero-actions>{actions}</div>
      )}
    </>
  )

  const headlineEl = headlineLines ? (
    <h1 className={styles.headline}>
      {headlineLines.map((line, i) => (
        <span key={i} className={styles.headlineLine} data-hero-line>
          {line}
        </span>
      ))}
    </h1>
  ) : fullWidthHeadline ? (
    <h1 className={styles.headline} data-hero-line>
      {headline}
    </h1>
  ) : (
    <h1 className={styles.headline} data-hero-line>
      {headline}
    </h1>
  )

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
          {isMarquee ? (
            <div className={styles.fullWidthStack}>
              {eyebrowEl && <div className={styles.content}>{eyebrowEl}</div>}
              <h1 className={styles.srOnly}>{headline}</h1>
              {subActionsEl && <div className={styles.content}>{subActionsEl}</div>}
            </div>
          ) : fullWidthHeadline ? (
            <div className={styles.fullWidthStack}>
              {eyebrowEl && <div className={styles.content}>{eyebrowEl}</div>}
              <div className={styles.headlineBreakout}>{headlineEl}</div>
              {subActionsEl && <div className={styles.content}>{subActionsEl}</div>}
            </div>
          ) : (
            <div className={styles.content}>
              {eyebrowEl}
              {headlineEl}
              {subActionsEl}
            </div>
          )}
        </div>
      </div>

      {isMarquee && <HeroMarquee text={headline} />}
    </section>
  )
}
