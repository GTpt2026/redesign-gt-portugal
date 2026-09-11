import { notFound } from 'next/navigation'
import PageHero from '@/components/sections/PageHero'
import Breadcrumbs from '@/components/ui/Breadcrumbs'
import ProductShowcase from '@/components/sections/ProductShowcase'
import ProductPhotoGrid from '@/components/sections/ProductPhotoGrid'
import StatBanner from '@/components/sections/StatBanner'
import RelatedCategories from '@/components/sections/RelatedCategories'
import CrossLinkSection from '@/components/sections/CrossLinkSection'
import ContactSection from '@/components/sections/ContactSection'
import { categories, getCategory, getRelatedCategories } from '../categories-data'

export function generateStaticParams() {
  return categories.map(c => ({ slug: c.slug }))
}

export async function generateMetadata({ params }) {
  const { slug } = await params
  const category = getCategory(slug)
  if (!category) return {}

  return {
    title: `${category.title} | Textiles`,
    description: category.cardDescription,
  }
}

export default async function TextileCategoryPage({ params }) {
  const { slug } = await params
  const category = getCategory(slug)
  if (!category) notFound()

  const related = getRelatedCategories(category.slug)

  return (
    <>
      <PageHero
        headline={[category.title, category.tagline]}
        eyebrow="Our Textiles"
        image={category.image}
        alt={`GT Portugal ${category.title} production`}
      />
      <Breadcrumbs items={[{ label: 'Textiles', href: '/textiles' }, { label: category.title }]} />
      <ProductShowcase
        eyebrow="Expertise"
        title={category.title}
        description={category.description}
        images={category.gallery}
        specs={category.features}
      />
      <ProductPhotoGrid images={category.productGrid} alt={category.title} columns={category.productGridColumns} />
      {category.statBanner && (
        <StatBanner
          title={category.statBanner.title}
          stat={category.statBanner.stat}
          description={category.statBanner.description}
          image={category.statBanner.image}
        />
      )}
      <RelatedCategories title="Other Textiles" items={related} />
      <CrossLinkSection items={category.crossLinks} />
      <ContactSection title="Get In Touch Now" />
    </>
  )
}
