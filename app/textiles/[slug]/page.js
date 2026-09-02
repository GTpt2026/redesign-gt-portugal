import { notFound } from 'next/navigation'
import PageHero from '@/components/sections/PageHero'
import Breadcrumbs from '@/components/ui/Breadcrumbs'
import PageIntro from '@/components/sections/PageIntro'
import ImageGallery from '@/components/sections/ImageGallery'
import ProductPhotoGrid from '@/components/sections/ProductPhotoGrid'
import FeatureColumns from '@/components/sections/FeatureColumns'
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
      <PageIntro
        eyebrow="Expertise"
        title={category.title}
        description={category.description}
        bg="default"
      />
      <ProductPhotoGrid images={category.productGrid} alt={category.title} columns={category.productGridColumns} />
      <ImageGallery images={category.gallery} alt={category.title} />
      <FeatureColumns items={category.features} />
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
