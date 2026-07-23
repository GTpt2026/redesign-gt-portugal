import PageHero from '@/components/sections/PageHero'
import Breadcrumbs from '@/components/ui/Breadcrumbs'
import PageIntro from '@/components/sections/PageIntro'
import ClientsSection from '@/components/sections/ClientsSection'
import ArticlesSection from '@/components/sections/ArticlesSection'
import StatsSection from '@/components/sections/StatsSection'
import ValuesSection from '@/components/sections/ValuesSection'
import DarkBanner from '@/components/sections/DarkBanner'
import EditorialSection from '@/components/sections/EditorialSection'

export const metadata = {
  title: 'About GT Portugal',
  description: 'For four decades, GT Portugal has manufactured outstanding garments and shoes for world-leading brands.',
}

const stats = [
  { value: '0',   label: 'Child Labour', description: 'We are 100% committed to zero child labour across our entire supply chain.' },
  { value: '5',   label: 'Certifications', description: "Certified by the world's most recognised sustainability and quality bodies." },
  { value: '20+', label: 'Years of Global Export', description: 'Consistent international delivery capabilities across all our product categories.' },
]

const values = [
  {
    label: 'Fairness',
    description: 'We believe in the importance of treating everyone fairly and are committed to creating an environment where everyone can thrive. We foster honest, transparent relationships with all our partners, clients and employees.',
  },
  {
    label: 'Transparency',
    description: 'We are open and transparent about our business practices, our supply chain and our environmental impact. We believe that transparency is the foundation of trust.',
  },
  {
    label: 'Trustworthiness',
    description: 'We are proud of our trustworthy reputation built over 40+ years. Our clients know they can rely on us to deliver on our promises, consistently and with integrity.',
    cta: { label: 'Our Sustainability', href: '/sustainability' },
  },
]

export default function AboutPage() {
  return (
    <>
      <PageHero
        headline={['Responsible', 'Development &', 'Outstanding Production']}
        eyebrow="About GT Portugal"
        image="/images/heroes/about.jpg"
        alt="GT Portugal headquarters"
      />
      <Breadcrumbs items={[{ label: 'About GT Portugal' }]} />

      <PageIntro
        eyebrow="40+ Years"
        title="For More Than 40 Years"
        description="GT Portugal has been at the forefront of responsible development and production development and production of textiles and shoes. Our combined experience is the foundation for responsible social and environmental practices and delivering top quality products."
        bg="default"
      />

      <ClientsSection />

      <ArticlesSection title="What We Do" />

      <EditorialSection
        eyebrow="Our Mission"
        title="Our Mission"
        body="Our mission is to develop and produce outstanding garments, shoes and products; in compliance with our client's standards and expectations. By consistently investing in process optimisation, technology and training, and managing ourselves efficiently, we are able to deliver upon our clients' expectations, fully leveraging the competence of our team."
        bg="subtle"
        align="center"
      />

      <ValuesSection
        values={values}
        image="/images/about/values-bg.jpg"
      />

      <StatsSection stats={stats} />

      <DarkBanner
        eyebrow="Our Commitment"
        title="We Strive To Be Better Every Day"
        subtitle="GT Portugal is committed to being a company that cares. We care about our people, our planet and our products."
        bodyColumns={[
          "We put our employees first. We invest in their development, we ensure their safety and we make sure they are paid fairly. We believe that a happy team makes a great product. To ensure that, we have implemented a number of initiatives and policies that ensure our employees are treated with respect and dignity.",
          "We believe that a sustainable business is a successful business. We are committed to reducing our environmental impact across all our operations. We have invested in renewable energy, waste management and water conservation programmes.",
          "GT Portugal is associated with some of the world's most famous brands and companies, that sets extremely high compliance standards for social and environmental responsibility. Our team works meticulously to continuously improve our processes and ensure strict compliance with all applicable regulations and standards.",
        ]}
        image="/images/about/strive-bg.jpg"
        align="left"
      />

      <EditorialSection
        eyebrow="Our People"
        title="Enhancing Motivation"
        body={[
          "Attracting, developing, and retaining talent through impact in our work, we put our people first.",
          "Together we build something that really matters and that has a long-lasting impact on the world of fashion.",
          "GT Portugal has 1 office and production facilities. Based in Matosinhos — the city of fashion — it's the heart of the fashion industry in Portugal. The most significant Portuguese fashion-related organisations are based there, offering a growing and vibrant ecosystem of companies across the entire value chain.",
        ]}
        bg="subtle"
        align="left"
      />
    </>
  )
}
