/**
 * ArticlesSection — 4-column editorial cards.
 * Each card has a base image (always colour) and a hover image revealed
 * via a GSAP rounded-mask clip-path animation (see ArticleCard.jsx).
 */
import ArticleCard from './ArticleCard'
import styles from './ArticlesSection.module.css'

const articles = [
  {
    id:          'certifications',
    image:       '/images/articles/certifications.jpg',
    hoverImage:  '/images/articles/certifications-hover.jpg',
    title:       'Industry Certifications',
    description: 'As an active actor within the fashion industry, GT Portugal is aware of the future-oriented steps that it has to take in order to contribute to a greener and better world.',
    href:        '/sustainability',
  },
  {
    id:          'compliance',
    image:       '/images/articles/compliance.jpg',
    hoverImage:  '/images/articles/compliance-hover.jpg',
    title:       'Compliance',
    description: 'Compliance is the best way to support our focus on traceability of production, working conditions and quality. We want to safeguard our success with integrity and mutual esteem.',
    href:        '/sustainability',
  },
  {
    id:          'process',
    image:       '/images/articles/process.jpg',
    hoverImage:  '/images/articles/process-hover.jpg',
    title:       'Our Process',
    description: 'We are proudly recognised for making products that exceed the demanding expectations of our clients. Our process is key to that success.',
    href:        '/about',
  },
  {
    id:          'about',
    image:       '/images/articles/about.jpg',
    hoverImage:  '/images/articles/about-hover.jpg',
    title:       'About GT Portugal',
    description: 'For more than 30 years, GT Portugal has been at the forefront of responsible development and production of textiles and shoes.',
    href:        '/about',
  },
]

export default function ArticlesSection({ title }) {
  return (
    <section className={`section ${styles.section}`}>
      <div className="container">

        {title && <h2 className={styles.sectionTitle} data-reveal>{title}</h2>}

        <div className={styles.grid} data-stagger>
          {articles.map((article, i) => (
            <ArticleCard key={article.id} article={article} index={i} />
          ))}
        </div>

      </div>
    </section>
  )
}
