/**
 * ArticleBody — renders an article's content blocks.
 * Block types: lead, heading, paragraph, list, quote, image, banner,
 * video, steps. Prose sits in a reading column; banner, video and
 * steps run wider.
 */
import InlineText from './InlineText'
import styles from './ArticleBody.module.css'

function Img({ block, className, eager }) {
  return (
    <img
      src={block.src}
      width={block.width}
      height={block.height}
      alt={block.alt || ''}
      className={className}
      loading={eager ? 'eager' : 'lazy'}
      decoding="async"
    />
  )
}

function Block({ block }) {
  switch (block.type) {
    case 'lead':
      return (
        <div className={`${styles.col} ${styles.lead}`}>
          {block.heading && block.text && <h2 className={styles.h2}>{block.heading}</h2>}
          {block.text
            ? <p className={styles.leadText}><InlineText>{block.text}</InlineText></p>
            : block.heading && <p className={styles.statement}>{block.heading}</p>}
        </div>
      )

    case 'heading': {
      const Tag = `h${block.level}`
      return (
        <div className={styles.col}>
          <Tag className={styles[Tag]}>{block.text}</Tag>
        </div>
      )
    }

    case 'paragraph':
      return (
        <div className={styles.col}>
          <p className={styles.p}><InlineText>{block.text}</InlineText></p>
        </div>
      )

    case 'list': {
      const Tag = block.ordered ? 'ol' : 'ul'
      return (
        <div className={styles.col}>
          <Tag className={styles.list}>
            {block.items.map((item, i) => (
              <li key={i}><InlineText>{item}</InlineText></li>
            ))}
          </Tag>
        </div>
      )
    }

    case 'quote':
      return (
        <div className={styles.col}>
          <blockquote className={styles.quote}><InlineText>{block.text}</InlineText></blockquote>
        </div>
      )

    case 'image':
      return (
        <div className={styles.col}>
          <figure className={styles.figure}>
            <Img block={block} className={styles.img} />
          </figure>
        </div>
      )

    case 'banner':
      return (
        <div className={styles.wide}>
          <figure className={`${styles.banner} ${block.caption ? styles.bannerCaption : ''}`}>
            <Img block={block} className={styles.bannerImg} />
            {block.caption && (
              <figcaption className={styles.bannerText}>
                <span>{block.caption}</span>
              </figcaption>
            )}
          </figure>
        </div>
      )

    case 'video':
      return (
        <div className={styles.wide}>
          <a
            className={styles.video}
            href={block.href}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={`${block.title} (opens on YouTube)`}
          >
            {block.src && <Img block={block} className={styles.bannerImg} />}
            <span className={styles.play} aria-hidden="true">
              <svg width="28" height="28" viewBox="0 0 24 24" fill="currentColor"><path d="M8 5v14l11-7z" /></svg>
            </span>
            <span className={styles.videoLabel}>{block.title} · Watch on YouTube</span>
          </a>
        </div>
      )

    case 'steps':
      return (
        <div className={styles.wide}>
          <ol className={styles.steps}>
            {block.items.map((step, i) => (
              <li key={i} className={styles.step}>
                {step.image && <Img block={step.image} className={styles.stepImg} />}
                <div className={styles.stepBody}>
                  <span className={styles.stepNo}>Step {String(i + 1).padStart(2, '0')}</span>
                  <h3 className={styles.h3}>{step.heading}</h3>
                  <p className={styles.p}><InlineText>{step.text}</InlineText></p>
                </div>
              </li>
            ))}
          </ol>
        </div>
      )

    default:
      return null
  }
}

export default function ArticleBody({ blocks }) {
  return (
    <div className={styles.body}>
      {blocks.map((block, i) => (
        <Block key={i} block={block} />
      ))}
    </div>
  )
}
