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

/* ─── Brand data ────────────────────────────────────────────── */
/* `wide: true` marks logos whose real wordmark is a thin, wide
   script/serif (width:height > ~6:1 in the source SVG) — Frankies
   Bikinis, Citizens of Humanity, etc. Fit into the same box as a
   chunky block logo like Supreme, they'd render as a near-invisible
   sliver, so they get a wider box to reach a comparable height. */
const brands = [
  { name: 'Supreme',               slug: 'supreme'               },
  { name: 'Balenciaga',            slug: 'balenciaga',            wide: true },
  { name: 'Miu Miu',               slug: 'miu-miu',                wide: true },
  { name: 'Reformation',           slug: 'reformation'           },
  { name: 'Revolve',               slug: 'revolve',                wide: true },
  { name: 'Faherty',               slug: 'faherty',                wide: true },
  { name: 'Moschino',              slug: 'moschino'              },
  { name: 'Frankies Bikinis',      slug: 'frankies-bikinis',       wide: true },
  { name: 'Citizens of Humanity',  slug: 'citizens-of-humanity',   wide: true },
  { name: 'Kith',                  slug: 'kith'                  },
  { name: 'Roller Rabbit',         slug: 'roller-rabbit',          wide: true },
  { name: 'Agolde',                slug: 'agolde'                },
  { name: 'Lake',                  slug: 'lake'                  },
  { name: 'Jenni Kayne',           slug: 'jenni-kayne',            wide: true },
  { name: 'Dôen',                  slug: 'doen'                   },
  { name: 'Brochu Walker',         slug: 'brochu-walker',          wide: true },
  { name: 'Anine Bing',            slug: 'anine-bing',             wide: true },
  { name: 'Saint + Sofia',         slug: 'saint-sofia',            wide: true },
  { name: 'Boden',                 slug: 'boden'                  },
  { name: 'James Perse',           slug: 'james-perse'           },
  { name: 'Ossou',                 slug: 'ossou'                 },
  { name: 'Alexander Wang',        slug: 'alexanderwang',          wide: true },
  { name: 'Rose & Born',           slug: 'rose-born',              wide: true },
]

/* ─── Component ─────────────────────────────────────────────── */
export default function ClientsSection({ title = 'Trusted by world-leading brands', dark = false }) {
  return (
    <section className={`section ${dark ? 'section--dark' : ''} ${styles.section}`}>
      <div className="container">

        {/* Eyebrow label */}
        <p className={styles.eyebrow} data-reveal>{title}</p>

        {/* Logo grid */}
        <div className={styles.grid} data-stagger data-logos>
          {brands.map((brand) => (
            <div key={brand.slug} className={styles.cell} data-stagger-item>
              <img
                src={`/images/clients/${brand.slug}.svg`}
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
