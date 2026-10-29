import { notFound } from 'next/navigation'
import PageHero from '@/components/sections/PageHero'
import Breadcrumbs from '@/components/ui/Breadcrumbs'
import ProductShowcase from '@/components/sections/ProductShowcase'
import ProductPhotoGrid from '@/components/sections/ProductPhotoGrid'
import StatBanner from '@/components/sections/StatBanner'
import RelatedCategories from '@/components/sections/RelatedCategories'
import CrossLinkSection from '@/components/sections/CrossLinkSection'
import ContactSection from '@/components/sections/ContactSection'
import { getCategories, getCategory, getRelatedCategories, seoMetadata } from '@/lib/content'

export const revalidate = 60

export async function generateStaticParams() {
  return (await getCategories()).map(c => ({ slug: c.slug }))
}

export async function generateMetadata({ params }) {
  const { slug } = await params
  const category = await getCategory(slug)
  if (!category) return {}

  return seoMetadata(category.seo, {
    title: `${category.title} | Textiles`,
    description: category.cardDescription,
  })
}

export default async function TextileCategoryPage({ params }) {
  const { slug } = await params
  const category = await getCategory(slug)
  if (!category) notFound()

  const related = await getRelatedCategories(category.slug)

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
