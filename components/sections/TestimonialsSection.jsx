/**
 * TestimonialsSection
 * Props:
 *   testimonials — Array<{ quote, name, role }>
 *   title        — string
 *   dark         — boolean
 */
import Testimonial from '@/components/ui/Testimonial'
import styles from './TestimonialsSection.module.css'

export default function TestimonialsSection({ testimonials, title, dark = false }) {
  return (
    <section className={`section ${dark ? 'section--dark' : 'section--subtle'}`}>
      <div className="container">
        {title && <h2 className={styles.title} data-reveal>{title}</h2>}
        <div className={styles.grid} data-stagger>
          {testimonials.map(t => (
            <Testimonial
              key={t.name}
              quote={t.quote}
              name={t.name}
              role={t.role}
              logo={t.logo}
              variant={dark ? 'dark' : 'default'}
            />
          ))}
        </div>
      </div>
    </section>
  )
}
