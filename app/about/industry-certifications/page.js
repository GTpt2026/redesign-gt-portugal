import PageHero from '@/components/sections/PageHero'
import Breadcrumbs from '@/components/ui/Breadcrumbs'
import PageIntro from '@/components/sections/PageIntro'
import EditorialSection from '@/components/sections/EditorialSection'
import ArticlesSection from '@/components/sections/ArticlesSection'
import ContactSection from '@/components/sections/ContactSection'

export const metadata = {
  title: 'Industry Certifications',
  description: 'GOTS, BCI, OEKO-TEX, SA8000 and ISO 9001 — the certifications that guarantee our supply chain meets social, health, safety and environmental standards.',
}

const certifications = [
  {
    eyebrow: 'GOTS',
    title: 'Global Organic Textile Standard',
    body: [
      "The Global Organic Textile Standard (GOTS) is recognised as one of the world's leading processing standards for organic fiber textiles. If you're interested in having your products certified by this standard, GT Portugal, working together with its partners, can make that happen.",
      'The GOTS standard has emerged from an increase in the demand of organic fibers and the need for a consolidated processing criteria from the textile industry and retailers, defining important social and environmental guidelines that need to be applied throughout the entire organic textiles supply chain.',
      'It certifies welfare standards for animal husbandry and prohibits genetically modified organisms, assuring an organic production based on a system of farming that maintains and replenishes soil fertility. GOTS also prohibits the use of toxic, persistent pesticides or synthetic fertilizers, and certifies all ecological and labor conditions in apparel manufacturing using organically produced raw materials.',
    ],
  },
  {
    eyebrow: 'BCI',
    title: 'Better Cotton Initiative',
    body: [
      'The Better Cotton Initiative (BCI) is the largest cotton sustainability program in the world. It was created in order to attest the sustainability of a product, by establishing standards that aim to make the global cotton production better for the people who take part in it, the environment, and the future of our planet.',
      'The Better Cotton Standard System establishes its assessment within a framework based on three pillars of sustainability: environmental, social, and economic, covering crop protection practices, water stewardship, health of the soil, biodiversity, fiber quality, decent work and an effective management system.',
    ],
  },
  {
    eyebrow: 'Standard 100',
    title: 'By OEKO-TEX®',
    body: [
      "The STANDARD 100 by OEKO-TEX® is one of the world's most recognised labels when it comes to testing for harmful substances in textiles. It ensures that every component of a product was tested for any potentially toxic element, covering chemicals known to be harmful to health and parameters included as a precautionary measure to safeguard health.",
      'The tests include around 100 control parameters and take into account the intended use of the textiles: the more intensive the skin contact of a textile product, the stricter the limit values for each product class. A STANDARD 100 by OEKO-TEX label is a synonym of customer confidence and high product safety.',
    ],
  },
  {
    eyebrow: 'SA8000',
    title: 'Engaged Workforces, Sustainable Workplaces',
    body: [
      'SA8000 is the most prominent social certification standard in the world, helping organizations build an engaged workforce and a sustainable workplace. Based on the International Labor Organization conventions, it allows certified companies to be at the forefront of particularly sensitive management areas, such as quality, health and safety, and environment.',
      "It guarantees compliance with national legislation and all of the standard's requirements regarding child labor, forced or compulsory labor, health and safety, freedom of association and right to collective bargaining, discrimination, disciplinary practices, working hours, remuneration, and management system.",
    ],
  },
  {
    eyebrow: 'ISO 9001',
    title: 'Quality Management System',
    body: [
      'ISO 9001 establishes the criteria for a quality management system that can be used by any organisation, with over one million companies and organisations in over 170 countries certified to it. It specifies requirements for a quality management system when an organisation needs to demonstrate its ability to consistently provide products and services that meet customer and applicable statutory and regulatory requirements.',
      'With ISO 9001, companies strive to ensure that customers get consistent, high-quality products. GT Portugal and its partners promote the implementation of important efficiency improvements in every step of our supply chain, ranging from energy efficiency to recycling, from labeling to packaging.',
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
        description="With a growing concern for an ecological path, the final customer dictates that buying clothes, shoes, or homeware made with little to no respect for the environment or the human condition is less and less of an option. As an active actor within the fashion industry, GT Portugal is aware of the future-oriented steps that it has to take in order to contribute to a greener and better world. These multiple initiatives and programs of certification attest our ecological concerns and guarantee that our final product went through a supply chain where social, health, safety, and environmental conditions have been considered and verified."
        bg="default"
        animate
      />

      {certifications.map((c, i) => (
        <EditorialSection
          key={c.title}
          eyebrow={c.eyebrow}
          title={c.title}
          body={c.body}
          bg={i % 2 === 0 ? 'default' : 'subtle'}
          align="left"
        />
      ))}

      <ArticlesSection title="See also related articles" excludeIds={['certifications']} />
      <ContactSection title="Get In Touch Now" />
    </>
  )
}
