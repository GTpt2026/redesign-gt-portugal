import { notFound } from 'next/navigation'
import PageHero from '@/components/sections/PageHero'
import Breadcrumbs from '@/components/ui/Breadcrumbs'
import PageIntro from '@/components/sections/PageIntro'
import FeatureColumns from '@/components/sections/FeatureColumns'
import RelatedCategories from '@/components/sections/RelatedCategories'
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
    title: `${category.title} — Textiles`,
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
      <FeatureColumns items={category.features} />
      <RelatedCategories title="Other Textiles" items={related} />
      <ContactSection title="Get In Touch Now" />
    </>
  )
}
