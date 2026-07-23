/**
 * Button
 * Props:
 *   variant  — 'primary' | 'secondary' | 'ghost'  (default: 'primary')
 *   size     — 'sm' | 'md' | 'lg'                  (default: 'md')
 *   href     — string  renders an <a> tag
 *   children — ReactNode
 *   ...rest  — passed to the underlying element
 */
import Link from 'next/link'
import styles from './Button.module.css'

export default function Button({ variant = 'primary', size = 'md', href, children, ...rest }) {
  const className = `${styles.btn} ${styles[variant]} ${styles[size]}`

  if (href?.startsWith('/')) {
    return <Link href={href} className={className} {...rest}>{children}</Link>
  }

  if (href) {
    return <a href={href} className={className} {...rest}>{children}</a>
  }

  return <button className={className} {...rest}>{children}</button>
}
