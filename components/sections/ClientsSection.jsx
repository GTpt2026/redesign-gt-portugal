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
const brands = [
  { name: 'Supreme',               slug: 'supreme'               },
  { name: 'Balenciaga',            slug: 'balenciaga'            },
  { name: 'Miu Miu',               slug: 'miu-miu'               },
  { name: 'Reformation',           slug: 'reformation'           },
  { name: 'Revolve',               slug: 'revolve'               },
  { name: 'Faherty',               slug: 'faherty'               },
  { name: 'Moschino',              slug: 'moschino'              },
  { name: 'Frankies Bikinis',      slug: 'frankies-bikinis'      },
  { name: 'Citizens of Humanity',  slug: 'citizens-of-humanity'  },
  { name: 'Kith',                  slug: 'kith'                  },
  { name: 'Roller Rabbit',         slug: 'roller-rabbit'         },
  { name: 'Agolde',                slug: 'agolde'                },
  { name: 'Lake',                  slug: 'lake'                  },
  { name: 'Jenni Kayne',           slug: 'jenni-kayne'           },
  { name: 'Dôen',                  slug: 'doen'                  },
  { name: 'Brochu Walker',         slug: 'brochu-walker'         },
  { name: 'Anine Bing',            slug: 'anine-bing'            },
  { name: 'Saint + Sofia',         slug: 'saint-sofia'           },
  { name: 'Boden',                 slug: 'boden'                 },
  { name: 'James Perse',           slug: 'james-perse'           },
  { name: 'Ossou',                 slug: 'ossou'                 },
  { name: 'Alexander Wang',        slug: 'alexanderwang'         },
  { name: 'Rose & Born',           slug: 'rose-born'             },
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
                className={styles.logoImg}
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
