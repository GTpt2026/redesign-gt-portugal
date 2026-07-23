import Link from 'next/link'
import styles from './Footer.module.css'

/* ─── Navigation columns ────────────────────────────────────── */
const textileLinks = [
  { href: '/textiles',           label: 'Swimwear'    },
  { href: '/textiles',           label: 'Jersey'      },
  { href: '/textiles',           label: 'Soft Woven'  },
  { href: '/textiles',           label: 'Outerwear'   },
  { href: '/textiles',           label: 'Activewear'  },
  { href: '/textiles',           label: 'Knitwear'    },
]

const footwearLinks = [
  { href: '/footwear',           label: 'Classic'     },
  { href: '/footwear',           label: 'Sneakers'    },
  { href: '/footwear',           label: 'Casual'      },
  { href: '/footwear',           label: 'Boots'       },
]

const aboutLinks = [
  { href: '/sustainability',     label: 'Industry Certifications' },
  { href: '/sustainability',     label: 'Compliance'              },
  { href: '/about',              label: 'Our Process'             },
  { href: '/privacy-policy',     label: 'Privacy Policy'          },
  { href: '/terms-of-service',   label: 'Terms of Service'        },
]

/* ─── Social / contact icons ────────────────────────────────── */
const socialLinks = [
  {
    href:  'https://maps.google.com/?q=GT+Portugal',
    label: 'Location',
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
        <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z"/>
      </svg>
    ),
  },
  {
    href:  'mailto:gtportugal@gtportugal.com',
    label: 'Email',
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
        <path d="M20 4H4c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4-8 5-8-5V6l8 5 8-5v2z"/>
      </svg>
    ),
  },
  {
    href:  'https://linkedin.com/company/gt-portugal',
    label: 'LinkedIn',
    target: '_blank',
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
        <path d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14m-.5 15.5v-5.3a3.26 3.26 0 0 0-3.26-3.26c-.85 0-1.84.52-2.32 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 0 1 1.4 1.4v4.93h2.79M6.88 8.56a1.68 1.68 0 0 0 1.68-1.68c0-.93-.75-1.69-1.68-1.69a1.69 1.69 0 0 0-1.69 1.69c0 .93.76 1.68 1.69 1.68m1.39 9.94v-8.37H5.5v8.37h2.77z"/>
      </svg>
    ),
  },
  {
    href:  'tel:+351229024701',
    label: 'Phone',
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
        <path d="M6.62 10.79c1.44 2.83 3.76 5.14 6.59 6.59l2.2-2.2c.27-.27.67-.36 1.02-.24 1.12.37 2.33.57 3.57.57.55 0 1 .45 1 1V20c0 .55-.45 1-1 1-9.39 0-17-7.61-17-17 0-.55.45-1 1-1h3.5c.55 0 1 .45 1 1 0 1.25.2 2.45.57 3.57.11.35.03.74-.25 1.02l-2.2 2.2z"/>
      </svg>
    ),
  },
]

/* ─── Component ─────────────────────────────────────────────── */
export default function Footer() {
  const year = new Date().getFullYear()

  return (
    <footer className={styles.footer} data-footer>
      <div className="container">

        {/* ── Top: brand + social icons ── */}
        <div className={styles.top}>
          <Link href="/" className={styles.logo} aria-label="GT Portugal — Home" data-footer-logo>
            <img src="/images/logo.svg" alt="GT Portugal" className={styles.logoImg} />
          </Link>
          <div className={styles.social}>
            {socialLinks.map((s) => (
              <a
                key={s.label}
                href={s.href}
                className={styles.socialBtn}
                aria-label={s.label}
                target={s.target}
                rel={s.target === '_blank' ? 'noopener noreferrer' : undefined}
                data-footer-social-btn
              >
                {s.icon}
              </a>
            ))}
          </div>
        </div>

        {/* ── Middle: 3-column nav ── */}
        <div className={styles.nav}>

          <div className={styles.col} data-footer-col>
            <span className={styles.colHead}>Textiles</span>
            {textileLinks.map((l) => (
              <Link key={l.label} href={l.href} className={styles.link}>{l.label}</Link>
            ))}
          </div>

          <div className={styles.col} data-footer-col>
            <span className={styles.colHead}>Footwear</span>
            {footwearLinks.map((l) => (
              <Link key={l.label} href={l.href} className={styles.link}>{l.label}</Link>
            ))}
          </div>

          <div className={styles.col} data-footer-col>
            <span className={styles.colHead}>About GT Portugal</span>
            {aboutLinks.map((l) => (
              <Link key={l.label} href={l.href} className={styles.link}>{l.label}</Link>
            ))}
          </div>

        </div>

        {/* ── Funding bar — single combined Norte 2030 + Portugal 2030 + EU ── */}
        <div className={styles.funding} data-footer-funding>
          {/* Light mode: colour version */}
          <img
            src="/images/funding/funding-light.png"
            alt="Norte 2030 — Programa Regional do Norte · Portugal 2030 · Cofinanciado pela União Europeia"
            className={`${styles.fundingBar} ${styles.fundingBarLight}`}
          />
          {/* Dark mode: white on transparent version */}
          <img
            src="/images/funding/funding-dark.png"
            alt="Norte 2030 — Programa Regional do Norte · Portugal 2030 · Cofinanciado pela União Europeia"
            className={`${styles.fundingBar} ${styles.fundingBarDark}`}
          />
        </div>

      </div>

      {/* ── Bottom bar ── */}
      <div className={styles.bottom}>
        <div className={`container ${styles.bottomInner}`}>
          <span className={styles.copy}>©{year} GT Portugal. All Rights Reserved.</span>
          <div className={styles.legal}>
            <Link href="/privacy-policy"   className={styles.legalLink}>Privacy Policy</Link>
            <Link href="/terms-of-service" className={styles.legalLink}>Terms of Service</Link>
            <Link href="/login"            className={styles.legalLink}>Log in</Link>
          </div>
        </div>
      </div>

    </footer>
  )
}
