/**
 * ClientsSection — "Trusted by world-leading brands" logo grid.
 *
 * Desktop: 6 columns   Tablet: 4 columns   Mobile: 3 → 2 columns
 *
 * Props:
 *   title — string  override eyebrow label
 *   dark  — boolean  dark section variant
 */
import styles from './ClientsSection.module.css'
import { homeDefaults } from '@/content/defaults/home.mjs'

/* Each brand: { name, src, wide }. `wide` marks thin, wide wordmarks (Frankies
   Bikinis, Citizens of Humanity...) that need a wider box to render as large
   as a chunky block logo like Supreme. Edited in Sanity (Home page > Clients). */
const defaultBrands = homeDefaults.clients.map((c) => ({ name: c.name, src: `/images/clients/${c.slug}.svg`, wide: c.wide }))


/* ─── Component ─────────────────────────────────────────────── */
export default function ClientsSection({ title = 'Trusted by world-leading brands', brands = defaultBrands, dark = false }) {
  return (
    <section className={`section ${dark ? 'section--dark' : ''} ${styles.section}`}>
      <div className="container">

        {/* Eyebrow label */}
        <p className={styles.eyebrow} data-reveal>{title}</p>

        {/* Logo grid */}
        <div className={styles.grid} data-stagger data-logos>
          {brands.map((brand) => (
            <div key={brand.name} className={styles.cell} data-stagger-item>
              <img
                src={brand.src}
                alt={brand.name}
                className={`${styles.logoImg} ${brand.wide ? styles.logoImgWide : ''}`}
                loading="lazy"
                draggable="false"
              />
            </div>
          ))}
        </div>

      </div>
    </section>
  )
}
