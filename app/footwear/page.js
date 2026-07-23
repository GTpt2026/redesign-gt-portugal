import PageHero from '@/components/sections/PageHero'
import Breadcrumbs from '@/components/ui/Breadcrumbs'
import PageIntro from '@/components/sections/PageIntro'
import ProductGrid from '@/components/sections/ProductGrid'

export const metadata = {
  title: 'Footwear — GT Portugal',
  description: 'GT Portugal produces functional, timeless footwear — sneakers, boots, classic and casual — for world-leading brands.',
}

const categories = [
  { id: 'sneakers', image: '/images/footwear/sneakers.jpg', title: 'Sneakers', description: 'From innovation and know-how to technology, design and suppliers, we are working with world-leading brands making comfortable, fashionable and good quality sneakers.', href: '/footwear' },
  { id: 'classic',  image: '/images/footwear/classic.jpg',  title: 'Classic',  description: 'We produce the most exquisite classic shoes using the best materials and components while maintaining reasonable production costs.', href: '/footwear' },
  { id: 'boots',    image: '/images/footwear/boots.jpg',    title: 'Boots',    description: 'GT Portugal is your destination for premium boots production. We blend tradition with innovation to craft boots that embody the rich heritage of Portuguese craftsmanship.', href: '/footwear' },
  { id: 'casual',   image: '/images/footwear/casual.jpg',   title: 'Casual',   description: 'In the realm of casual footwear, Portuguese craftsmanship takes centre stage, weaving together comfort, style, and tradition into each pair of shoes.', href: '/footwear' },
]

export default function FootwearPage() {
  return (
    <>
      <PageHero
        headline={['Footwear', 'Design &', 'Quality']}
        eyebrow="Our Footwear"
        image="/images/heroes/footwear.jpg"
        alt="GT Portugal footwear factory"
      />
      <Breadcrumbs items={[{ label: 'Footwear' }]} />
      <PageIntro
        eyebrow="Production"
        title="Functional Footwear"
        description="At GT Portugal we are focused on producing functional footwear with a great design and quality that is timeless and made to fit in your different daily lifestyles."
        bg="default"
      />
      <ProductGrid items={categories} />
    </>
  )
}
