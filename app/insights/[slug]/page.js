import { notFound } from 'next/navigation'
import Breadcrumbs from '@/components/ui/Breadcrumbs'
import ContactSection from '@/components/sections/ContactSection'
import ArticleHero from '@/components/insights/ArticleHero'
import ArticleBody from '@/components/insights/ArticleBody'
import ShareBar from '@/components/insights/ShareBar'
import InsightCard from '@/components/insights/InsightCard'
import InsightsCta from '@/components/insights/InsightsCta'
import { getAllInsights, getInsight, getOgImage, getRelatedInsights, toCard } from '@/lib/insights'
import styles from './article.module.css'

const SITE = 'https://gtportugal.com'

// New or edited articles in Sanity appear within a minute, no redeploy
export const revalidate = 60

export async function generateStaticParams() {
  return (await getAllInsights()).map((a) => ({ slug: a.slug }))
}

export async function generateMetadata({ params }) {
  const { slug } = await params
  const article = await getInsight(slug)
  if (!article) return {}

  const image = getOgImage(article)
  return {
    title: article.title,
    description: article.excerpt,
    alternates: { canonical: `/insights/${slug}` },
    openGraph: {
      type: 'article',
      title: article.title,
      description: article.excerpt,
      url: `/insights/${slug}`,
      publishedTime: article.date,
      section: article.category,
      images: [image],
    },
    twitter: { card: 'summary_large_image', title: article.title, description: article.excerpt, images: [image.url] },
  }
}

export default async function InsightPage({ params }) {
  const { slug } = await params
  const article = await getInsight(slug)
  if (!article) notFound()

  const related = (await getRelatedInsights(article, 3)).map(toCard)
  const url = `${SITE}/insights/${slug}`
  const og = getOgImage(article).url

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: article.title,
    description: article.excerpt,
    image: [og.startsWith('http') ? og : `${SITE}${og}`],
    datePublished: article.date,
    dateModified: article.date,
    articleSection: article.category,
    mainEntityOfPage: url,
    author: { '@type': 'Organization', name: 'GT Portugal' },
    publisher: { '@type': 'Organization', name: 'GT Portugal', url: SITE },
  }

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd).replace(/</g, '\\u003c') }}
      />
      <article>
        <ArticleHero article={article} />
        <Breadcrumbs items={[{ label: 'Insights', href: '/insights' }, { label: article.title }]} />

        <div className={styles.share}>
          <ShareBar url={url} title={article.title} />
        </div>

        <ArticleBody blocks={article.body} />

        <div className={styles.share}>
          <ShareBar url={url} title={article.title} />
        </div>
      </article>

      <section className={`section section--subtle ${styles.related}`}>
        <div className="container">
          <h2 className={styles.relatedTitle}>Keep reading</h2>
          <div className={styles.relatedGrid}>
            {related.map((a) => (
              <InsightCard key={a.slug} article={a} />
            ))}
          </div>
        </div>
      </section>

      <InsightsCta />
      <ContactSection title="Get In Touch Now" />
    </>
  )
}
