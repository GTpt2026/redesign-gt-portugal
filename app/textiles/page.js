import PageHero from '@/components/sections/PageHero'
import Breadcrumbs from '@/components/ui/Breadcrumbs'
import PageIntro from '@/components/sections/PageIntro'
import StatsSection from '@/components/sections/StatsSection'
import ProductGrid from '@/components/sections/ProductGrid'
import { categories } from './categories-data'

export const metadata = {
  title: 'Textiles — GT Portugal',
  description: 'GT Portugal garment production: swimwear, jersey, soft woven, outerwear, activewear, knitwear and denim — 1M pieces produced in 2025.',
}

const stats = [
  { value: '17M€', label: 'In exports (2025)' },
  { value: '1M',   label: 'Pieces produced (2025)' },
  { value: '40',   label: 'Years of experience' },
]

const items = categories.map(c => ({
  id: c.slug,
  image: c.cardImage || c.image,
  title: c.title,
  description: c.cardDescription,
  href: `/textiles/${c.slug}`,
}))

export default function TextilesPage() {
  return (
    <>
      <PageHero
        headline={['Outstanding', 'Garments', 'Crafted in Portugal']}
        eyebrow="Our Textiles"
        image="/images/heroes/textiles.jpg"
        alt="GT Portugal textile factory floor"
      />
      <Breadcrumbs items={[{ label: 'Textiles' }]} />
      <PageIntro
        eyebrow="Expertise"
        title="Outstanding Garments"
        description="From jackets to dresses, from minimalistic looks to strong streetwear products full of embroideries, prints and washings, from high-definition jacquards to digital printed sweats, we are very comfortable to respond to our clients' requests."
        bg="default"
      />
      <StatsSection stats={stats} />
      <ProductGrid items={items} />
    </>
  )
}
