import PageHero from '@/components/sections/PageHero'
import Breadcrumbs from '@/components/ui/Breadcrumbs'
import PageIntro from '@/components/sections/PageIntro'
import StatsSection from '@/components/sections/StatsSection'
import ProductGrid from '@/components/sections/ProductGrid'
import { getCategories, getTextilesPage, seoMetadata } from '@/lib/content'

export const revalidate = 60

export async function generateMetadata() {
  const page = await getTextilesPage()
  return seoMetadata(page.seo, page.seoDefaults)
}

export default async function TextilesPage() {
  const [page, categories] = await Promise.all([getTextilesPage(), getCategories()])

  const items = categories.map(c => ({
    id: c.slug,
    image: c.cardImage || c.image,
    detail: c.detailImage,
    title: c.title,
    description: c.cardDescription,
    href: `/textiles/${c.slug}`,
  }))

  return (
    <>
      <PageHero
        headline={page.heroHeadline}
        eyebrow={page.heroEyebrow}
        image="/images/heroes/textiles.webp"
        alt="GT Portugal textile factory floor"
      />
      <Breadcrumbs items={[{ label: 'Textiles' }]} />
      <PageIntro
        eyebrow={page.introEyebrow}
        title={page.introTitle}
        description={page.introDescription}
        bg="default"
        animate
      />
      <StatsSection stats={page.stats} />
      <ProductGrid items={items} />
    </>
  )
}
