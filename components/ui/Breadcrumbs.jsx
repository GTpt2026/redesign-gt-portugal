import Link from 'next/link'
import styles from './Breadcrumbs.module.css'

export default function Breadcrumbs({ items = [] }) {
  return (
    <nav aria-label="Breadcrumb" className={styles.nav}>
      <div className="container">
        <ol className={styles.list}>
          <li className={styles.item}>
            <Link href="/" className={styles.link} aria-label="Home">
              <svg
                width="14"
                height="14"
                viewBox="0 0 24 24"
                fill="currentColor"
                aria-hidden="true"
              >
                <path d="M10 20v-6h4v6h5v-8h3L12 3 2 12h3v8z" />
              </svg>
            </Link>
          </li>
          {items.map((item, i) => (
            <li key={item.label} className={styles.item}>
              <span className={styles.sep} aria-hidden="true">/</span>
              {item.href && i < items.length - 1
                ? <Link href={item.href} className={styles.link}>{item.label}</Link>
                : <span className={styles.current} aria-current="page">{item.label}</span>
              }
            </li>
          ))}
        </ol>
      </div>
    </nav>
  )
}
