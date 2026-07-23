import styles from './page.module.css'

export const metadata = {
  title: 'Typography',
  description: 'GT Portugal design system — typography primitives'
}

const headings = [
  { tag: 'h1', label: 'H1',  size: '56px', usage: 'Page hero headlines' },
  { tag: 'h2', label: 'H2',  size: '40px', usage: 'Section titles' },
  { tag: 'h3', label: 'H3',  size: '32px', usage: 'Card titles, sub-sections' },
  { tag: 'h4', label: 'H4',  size: '24px', usage: 'Minor headings' },
  { tag: 'h5', label: 'H5',  size: '20px', usage: 'Labels, grouped headings' },
  { tag: 'h6', label: 'H6',  size: '18px', usage: 'Captions as headings' }
]

const bodyStyles = [
  { label: 'Body Large',   size: '18px', weight: '400', token: '--font-size-md',   sample: 'For four decades, GT Portugal has manufactured outstanding garments and shoes for world-leading brands.' },
  { label: 'Body',         size: '16px', weight: '400', token: '--font-size-base', sample: 'For four decades, GT Portugal has manufactured outstanding garments and shoes for world-leading brands.' },
  { label: 'Body Small',   size: '14px', weight: '400', token: '--font-size-sm',   sample: 'For four decades, GT Portugal has manufactured outstanding garments and shoes for world-leading brands.' },
  { label: 'Body Bold',    size: '16px', weight: '600', token: '--font-size-base', sample: 'For four decades, GT Portugal has manufactured outstanding garments and shoes for world-leading brands.' },
  { label: 'Caption',      size: '12px', weight: '400', token: '--font-size-xs',   sample: 'Supporting text, metadata, timestamps, legal copy.' },
  { label: 'Label',        size: '12px', weight: '600', token: '--font-size-xs',   sample: 'CATEGORY LABEL · UPPERCASE TAG · STATUS BADGE', uppercase: true },
  { label: 'Nav Link',     size: '14px', weight: '500', token: '--font-size-sm',   sample: 'Textiles  ·  Footwear  ·  Sustainability  ·  About GT Portugal' },
  { label: 'Button',       size: '16px', weight: '500', token: '--font-size-base', sample: 'Get in touch  ·  See our textiles  ·  Send message' }
]

export default function TypographyPage() {
  return (
    <div className={styles.page}>
      <div className="container">

        {/* Header */}
        <div className={styles.header}>
          <p className={styles.eyebrow}>Design System</p>
          <h1 className={styles.title}>Typography</h1>
          <p className={styles.subtitle}>
            <strong>PT Serif Bold</strong> for all headings &nbsp;·&nbsp; <strong>Open Sans</strong> for body, UI, and labels
          </p>
        </div>

        {/* Headings */}
        <section className={styles.section}>
          <h2 className={styles.sectionTitle}>Headings — PT Serif Bold</h2>
          <div className={styles.table}>
            <div className={styles.tableHeader}>
              <span>Style</span>
              <span>Size</span>
              <span>Usage</span>
            </div>
            {headings.map(({ tag: Tag, label, size, usage }) => (
              <div key={label} className={styles.row}>
                <div className={styles.sample}>
                  <Tag className={styles[label.toLowerCase()]}>{label} — Responsible Development + Production</Tag>
                </div>
                <div className={styles.meta}>
                  <span className={styles.metaLabel}>{label}</span>
                  <span className={styles.metaSize}>{size} · Bold · PT Serif</span>
                  <span className={styles.metaUsage}>{usage}</span>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Body */}
        <section className={styles.section}>
          <h2 className={styles.sectionTitle}>Body & UI — Open Sans</h2>
          <div className={styles.table}>
            <div className={styles.tableHeader}>
              <span>Style</span>
              <span>Size · Weight</span>
              <span>Token</span>
            </div>
            {bodyStyles.map(({ label, size, weight, token, sample, uppercase }) => (
              <div key={label} className={styles.row}>
                <div className={styles.sample}>
                  <p style={{
                    fontSize: size,
                    fontWeight: weight,
                    textTransform: uppercase ? 'uppercase' : 'none',
                    letterSpacing: uppercase ? '0.08em' : 'normal',
                    fontFamily: 'var(--font-family-base)',
                    lineHeight: '1.6'
                  }}>
                    {sample}
                  </p>
                </div>
                <div className={styles.meta}>
                  <span className={styles.metaLabel}>{label}</span>
                  <span className={styles.metaSize}>{size} · {weight === '600' ? 'Semibold' : weight === '500' ? 'Medium' : 'Regular'}</span>
                  <span className={styles.metaUsage}>{token}</span>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Colour on type */}
        <section className={styles.section}>
          <h2 className={styles.sectionTitle}>Type colours</h2>
          <div className={styles.colourGrid}>
            {[
              { label: 'Primary',   token: '--color-text-primary',   style: { color: 'var(--color-text-primary)' } },
              { label: 'Secondary', token: '--color-text-secondary',  style: { color: 'var(--color-text-secondary)' } },
              { label: 'Muted',     token: '--color-text-muted',      style: { color: 'var(--color-text-muted)' } },
              { label: 'Accent',    token: '--color-brand-accent',     style: { color: 'var(--color-brand-accent)' } },
              { label: 'Inverse',   token: '--color-text-inverse',     style: { color: 'var(--color-text-inverse)', backgroundColor: 'var(--color-bg-dark)', padding: '4px 12px', borderRadius: '4px' } }
            ].map(({ label, token, style }) => (
              <div key={label} className={styles.colourRow}>
                <p style={{ ...style, fontSize: 'var(--font-size-lg)', fontWeight: 600 }}>
                  The quick brown fox — GT Portugal
                </p>
                <div className={styles.colourMeta}>
                  <span>{label}</span>
                  <code>{token}</code>
                </div>
              </div>
            ))}
          </div>
        </section>

      </div>
    </div>
  )
}
