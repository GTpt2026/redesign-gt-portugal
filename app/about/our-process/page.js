import PageHero from '@/components/sections/PageHero'
import Breadcrumbs from '@/components/ui/Breadcrumbs'
import PageIntro from '@/components/sections/PageIntro'
import StatsSection from '@/components/sections/StatsSection'
import ImpactRow from '@/components/sections/ImpactRow'
import ArticlesSection from '@/components/sections/ArticlesSection'
import ContactSection from '@/components/sections/ContactSection'

export const metadata = {
  title: 'Our Process',
  description: "From your idea to quality assurance to delivery with reliable global couriers — GT Portugal's proactive approach to exceeding client expectations.",
}

const steps = [
  {
    title: 'You Send Us Your Idea',
    body: "Whether it is a mood board or a TP, our industry knowledge combined with our creativity and commitment to quality give us a unique ability to turn it into beautifully crafted products. We begin by understanding your brand's identity and uniqueness in order to propose materials, shapes, and details that help materialise your designer's concepts.",
    practices: [
      'Brainstorming, conceptualisation and prototyping',
      'A highly specialised, experienced technical team',
      'Custom-made materials within your price range',
    ],
  },
  {
    title: 'Quality Assurance Before Production Begins',
    body: 'We work closely with suppliers and customers to identify and mitigate any potential risks that may negatively influence the excellence of the final product. For GT Portugal, prevention is key: we set quality standards and practices in factory sourcing, lab testing, preproduction and on-site quality control inspections.',
    practices: [
      'Well-defined control methods at every manufacturing stage',
      'An experienced quality control team examining every product',
      'Relationships with clients spanning more than 30 years',
    ],
  },
  {
    title: 'Delivery With Reliable Global Couriers',
    body: "As soon as our clients' orders are ready, our network of reliable global couriers works around the clock to get our products exactly where they need to be — from warehousing and transportation to customs brokerage and freight forwarding. We analyse each client's needs and design flexible, cost-effective solutions.",
    practices: [
      'Freight boat or air shipping, chosen to fit the timeline',
      'Flexible solutions that help reduce costs',
      'A constant concern for the ecological footprint of delivery',
    ],
  },
]

const headlineStats = [
  { value: '20+', label: 'Years, Longest Client Relationships' },
  { value: '3',   label: 'Steps From Idea To Delivery' },
]

export default function OurProcessPage() {
  return (
    <>
      <PageHero
        headline={['A Proactive', 'Approach']}
        eyebrow="Our Process"
        image="/images/articles/process.jpg"
        alt="GT Portugal production process"
      />
      <Breadcrumbs items={[{ label: 'About GT Portugal', href: '/about' }, { label: 'Our Process' }]} />

      <PageIntro
        eyebrow="Exceeding Expectations"
        title="The Tightly Knit Relationships"
        description="With our clients, some for more than 20 years, is the cornerstone of our success. We are proudly recognised for making products that exceed the demanding expectations of our clients. Our proactive approach, availability, constant communication and passion for the industry are all put at the service of creating products that positively impact the lives of consumers on a global scale."
        bg="default"
        animate
      />

      <StatsSection stats={headlineStats} />

      {steps.map((s, i) => (
        <ImpactRow
          key={s.title}
          index={i + 1}
          total={steps.length}
          title={s.title}
          body={s.body}
          practices={s.practices}
          bg={i % 2 === 0 ? 'default' : 'subtle'}
        />
      ))}

      <ArticlesSection title="See also related articles" excludeIds={['process']} />
      <ContactSection title="Get In Touch Now" />
    </>
  )
}
