import PageHero from '@/components/sections/PageHero'
import Breadcrumbs from '@/components/ui/Breadcrumbs'
import PageIntro from '@/components/sections/PageIntro'
import EditorialSection from '@/components/sections/EditorialSection'
import StatsSection from '@/components/sections/StatsSection'
import ArticlesSection from '@/components/sections/ArticlesSection'
import ContactSection from '@/components/sections/ContactSection'

export const metadata = {
  title: 'Compliance',
  description: "GT Portugal's compliance practices: no child labour, zero tolerance for discrimination, workplace health & safety, and fair wages for every worker in our supply chain.",
}

const topics = [
  {
    eyebrow: 'Our Tradition',
    title: 'Strictly No Child Labour',
    body: [
      'Portugal defines the minimum age of admission to work at 16. GT Portugal and our suppliers do not employ young workers under that age, or in conditions which compromise their health, their safety or their moral integrity, and/or which harm their physical, psychological, moral, intellectual and cultural development.',
      'We work closely with our partners to ensure that all international standards for fair labor conditions and fundamental labor rights are met throughout our business endeavors. All our suppliers are audited regularly to warrant that there is no form of child labor nor exploitation of children in their practices.',
    ],
  },
  {
    eyebrow: 'Free From',
    title: 'Discrimination, Harassment and Violence',
    body: [
      "As a company with a strong tradition and well-established values, GT Portugal's and its suppliers' employees are entitled to work in an environment free from discrimination, harassment and violence, in which all individuals are treated with respect and dignity.",
      'We work closely with our partners to prevent any action, policy or differential treatment having an adverse impact on an individual on the basis of race, ancestry, place of origin, colour, ethnic origin, citizenship, creed, sex, pregnancy, sexual orientation, gender identity, gender expression, age, marital status, family status, disability or other unmeritorious consideration. Bullying, harassment or any other form of abuse are not tolerated.',
    ],
  },
  {
    eyebrow: 'Prioritising',
    title: 'Health & Safety',
    body: [
      'The health and safety of those who work with GT Portugal, whether employees, suppliers or subcontractors, is a key value and a priority for the success of GT Portugal as a company. Our occupational health & safety performance is guided by Portuguese legislation and national entities such as DGS, DGERT and ACT.',
      "GT Portugal's office was carefully designed to provide our employees with a healthy and clean working space, equipped with an outdoors garden where we often gather for freshly cooked meals. Every year, we work with a specialised Health and Safety at Work body that provides health check-ups and general medicine services to our employees.",
    ],
  },
]

const stats = [
  { value: '14', label: 'Months', description: 'In Portugal, salary is multiplied by 14 months (the 12 months in the year, the holiday pay and the Christmas bonus, each equivalent to another salary), with the addition of 22 business vacation days.' },
  { value: '665+', label: 'Euro', description: "As of 2021, the Portuguese minimum wage was set at 665 euros — however, the vast majority of our partners' employees working on the floor are paid well above that figure." },
  { value: '40', label: 'Hours', description: 'GT Portugal is determined to establish working hours that comply with national laws and benchmark industry standards. The working week is set at 40 hours, with a statutory working day of 8 hours.' },
]

export default function CompliancePage() {
  return (
    <>
      <PageHero
        headline={['Ethical', 'Behaviour']}
        eyebrow="Compliance"
        image="/images/articles/compliance.jpg"
        alt="GT Portugal compliance and working conditions"
      />
      <Breadcrumbs items={[{ label: 'About GT Portugal', href: '/about' }, { label: 'Compliance' }]} />

      <PageIntro
        eyebrow="Building Long-Term Relationships"
        title="Traceability, Working Conditions and Quality"
        description="Compliance is the best way to support our focus on traceability of production, working conditions and quality. We want to safeguard our success with integrity and mutual esteem. At GT Portugal we are committed to working with our partners to raise awareness and sustainable solutions across our entire supply chain."
        bg="default"
        animate
      />

      {topics.map((t, i) => (
        <EditorialSection
          key={t.title}
          eyebrow={t.eyebrow}
          title={t.title}
          body={t.body}
          bg={i % 2 === 0 ? 'default' : 'subtle'}
          align="left"
        />
      ))}

      <EditorialSection
        eyebrow="Wages, Benefits"
        title="And Terms Of Employment"
        body="At GT Portugal, we provide all workers with written and understandable information about their employment conditions, including wages, before they enter into employment and about details of their wages for the pay period concerned each time that they are paid."
        bg="default"
        align="center"
      />
      <StatsSection stats={stats} />

      <ArticlesSection title="See also related articles" excludeIds={['compliance']} />
      <ContactSection title="Get In Touch Now" />
    </>
  )
}
