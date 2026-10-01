import PageHero from '@/components/sections/PageHero'
import Breadcrumbs from '@/components/ui/Breadcrumbs'
import PageIntro from '@/components/sections/PageIntro'
import StatsSection from '@/components/sections/StatsSection'
import ImpactRow from '@/components/sections/ImpactRow'
import ArticlesSection from '@/components/sections/ArticlesSection'
import ContactSection from '@/components/sections/ContactSection'

export const metadata = {
  title: 'Industry Certifications',
  description: 'GOTS, BCI, OEKO-TEX, SA8000 and ISO 9001 — the certifications that guarantee our supply chain meets social, health, safety and environmental standards.',
}

const headlineStats = [
  { value: '5',    label: 'Certifications' },
  { value: '100+', label: 'OEKO-TEX Control Parameters' },
  { value: '170+', label: 'ISO 9001 Countries' },
]

const certifications = [
  {
    title: 'GOTS — Global Organic Textile Standard',
    body: "Recognised as one of the world's leading processing standards for organic fiber textiles, GOTS defines social and environmental guidelines applied throughout the entire organic textiles supply chain. GT Portugal, working together with its partners, can have your products certified by this standard.",
    practices: [
      'Welfare standards for animal husbandry',
      'Prohibits genetically modified organisms',
      'Prohibits toxic, persistent pesticides or synthetic fertilizers',
      'Certifies all ecological and labor conditions',
    ],
  },
  {
    title: 'BCI — Better Cotton Initiative',
    body: 'The largest cotton sustainability program in the world, created to attest the sustainability of a product by making global cotton production better for the people who take part in it, the environment, and the future of our planet.',
    practices: [
      'Three pillars: environmental, social, economic',
      'Crop protection practices and water stewardship',
      'Soil health, biodiversity and fiber quality',
      'Decent work and effective management systems',
    ],
  },
  {
    title: 'Standard 100 by OEKO-TEX®',
    body: "One of the world's most recognised labels for testing harmful substances in textiles. It ensures every component of a product was tested for any potentially toxic element, covering chemicals known to be harmful to health.",
    practices: [
      'Around 100 control parameters tested',
      'Stricter limits the more intensive the skin contact',
      'A synonym of customer confidence and product safety',
    ],
  },
  {
    title: 'SA8000 — Engaged Workforces',
    body: 'The most prominent social certification standard in the world, helping organisations build an engaged workforce and a sustainable workplace, based on the International Labor Organization conventions.',
    practices: [
      'No child labor, forced or compulsory labor',
      'Health and safety, freedom of association',
      'No discrimination or unfair disciplinary practices',
      'Fair working hours and remuneration',
    ],
  },
  {
    title: 'ISO 9001 — Quality Management',
    body: 'ISO 9001 establishes the criteria for a quality management system used by over one million companies in over 170 countries, demonstrating the ability to consistently provide products that meet customer and regulatory requirements.',
    practices: [
      'A strong customer focus',
      'Motivation and implication of top management',
      'Continual improvement, from energy efficiency to packaging',
    ],
  },
]

export default function IndustryCertificationsPage() {
  return (
    <>
      <PageHero
        headline={['A Greener', 'And Better World']}
        eyebrow="Industry Certifications"
        image="/images/articles/certifications.jpg"
        alt="GT Portugal industry certifications"
      />
      <Breadcrumbs items={[{ label: 'About GT Portugal', href: '/about' }, { label: 'Industry Certifications' }]} />

      <PageIntro
        eyebrow="Sustainability Is Key"
        title="A Better Future For All"
        description="With a growing concern for an ecological path, the final customer dictates that buying clothes, shoes, or homeware made with little to no respect for the environment or the human condition is less and less of an option. These multiple initiatives and programs of certification attest our ecological concerns and guarantee that our final product went through a supply chain where social, health, safety, and environmental conditions have been considered and verified."
        bg="default"
        animate
      />

      <StatsSection stats={headlineStats} />

      {certifications.map((c, i) => (
        <ImpactRow
          key={c.title}
          index={i + 1}
          total={certifications.length}
          title={c.title}
          body={c.body}
          practices={c.practices}
          bg={i % 2 === 0 ? 'default' : 'subtle'}
        />
      ))}

      <ArticlesSection title="See also related articles" excludeIds={['certifications']} />
      <ContactSection title="Get In Touch Now" />
    </>
  )
}
