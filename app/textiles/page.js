import PageHero from '@/components/sections/PageHero'
import Breadcrumbs from '@/components/ui/Breadcrumbs'
import PageIntro from '@/components/sections/PageIntro'
import StatsSection from '@/components/sections/StatsSection'
import ProductGrid from '@/components/sections/ProductGrid'

export const metadata = {
  title: 'Textiles — GT Portugal',
  description: 'GT Portugal garment production: swimwear, jersey, soft woven, outerwear, activewear, knitwear and denim — 1M pieces produced in 2025.',
}

const stats = [
  { value: '17M€', label: 'In exports (2025)' },
  { value: '1M',   label: 'Pieces produced (2025)' },
  { value: '40',   label: 'Years of experience' },
]

const categories = [
  { id: 'activewear', image: '/images/textiles/activewear.jpg',  title: 'Activewear',  description: 'High fashion seamless lightweight clothing with extreme durability and elasticity, designed to properly fit the body.', href: '/textiles' },
  { id: 'knitwear',   image: '/images/textiles/knitwear.jpg',    title: 'Knitwear',    description: 'From cosy sweaters to lightweight cardigans, GT Portugal is capable of creating a warm and comfortable knitwear collection.', href: '/textiles' },
  { id: 'swimwear',   image: '/images/textiles/swimwear.jpg',    title: 'Swimwear',    description: 'A wide selection of eco-conscious swimwear, using the most trendy and innovative types of recycled fabrics for well-known international brands.', href: '/textiles' },
  { id: 'outerwear',  image: '/images/textiles/outerwear.jpg',   title: 'Outerwear',   description: 'From raincoats, trench coats, jackets, basic leather coats, or bombers, we specialise in the art of outerwear making.', href: '/textiles' },
  { id: 'softwoven',  image: '/images/textiles/softwoven.jpg',   title: 'Soft Woven',  description: 'Tops, shirt, dresses and trousers made with woven fabrics. We have a large stock of woven fabrics, allowing you to bring your ideas to life faster.', href: '/textiles' },
  { id: 'jersey',     image: '/images/textiles/jersey.jpg',      title: 'Jersey',      description: 'From jackets to dresses, from minimalistic looks to strong streetwear products full of embroideries, prints and washings, from high-definition jacquards to digital printed sweats.', href: '/textiles' },
  { id: 'denim',      image: '/images/textiles/denim.jpg',       title: 'Denim',       description: 'From jackets to dresses, from minimalistic looks to strong streetwear products full of embroideries, prints and washings, from high-definition jacquards to digital printed sweats.', href: '/textiles' },
]

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
      <ProductGrid items={categories} />
    </>
  )
}
