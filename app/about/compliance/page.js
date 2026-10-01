import PageHero from '@/components/sections/PageHero'
import Breadcrumbs from '@/components/ui/Breadcrumbs'
import PageIntro from '@/components/sections/PageIntro'
import StatsSection from '@/components/sections/StatsSection'
import ImpactRow from '@/components/sections/ImpactRow'
import ArticlesSection from '@/components/sections/ArticlesSection'
import ContactSection from '@/components/sections/ContactSection'

export const metadata = {
  title: 'Compliance',
  description: "GT Portugal's compliance practices: no child labour, zero tolerance for discrimination, workplace health & safety, and fair wages for every worker in our supply chain.",
}

const headlineStats = [
  { value: '14',   label: 'Months Of Salary' },
  { value: '665+', label: 'Euro Minimum Wage' },
  { value: '40',   label: 'Hour Working Week' },
]

const topics = [
  {
    title: 'Strictly No Child Labour',
    body: 'Portugal defines the minimum age of admission to work at 16. GT Portugal and our suppliers do not employ young workers under that age, or in conditions which compromise their health, safety or moral integrity.',
    practices: [
      'All international standards for fair labor conditions',
      'Suppliers audited regularly against exploitation',
      'Sustainable solutions to prevent child labor',
    ],
    impact: [
      { label: 'Minimum Age', value: '16' },
      { label: 'Audits', value: 'Regular' },
    ],
  },
  {
    title: 'Free From Discrimination, Harassment and Violence',
    body: "GT Portugal's and its suppliers' employees are entitled to work in an environment free from discrimination, harassment and violence, in which all individuals are treated with respect and dignity.",
    practices: [
      'No differential treatment based on personal characteristics',
      'Terms of employment based on ability to do the job',
      'Bullying, harassment or abuse are not tolerated',
    ],
    impact: [
      { label: 'Policy', value: 'Zero Tolerance' },
      { label: 'Standard', value: 'Equal Treatment' },
    ],
  },
  {
    title: 'Prioritising Health & Safety',
    body: 'The health and safety of those who work with GT Portugal, whether employees, suppliers or subcontractors, is a key value and a priority, guided by Portuguese legislation and national entities such as DGS, DGERT and ACT.',
    practices: [
      "Office designed with an outdoors garden for employees",
      'Encouraged outdoor and sporting activities',
      'Annual health check-ups and general medicine services',
    ],
    impact: [
      { label: 'Guided By', value: 'DGS, DGERT, ACT' },
      { label: 'Check-ups', value: 'Annual' },
    ],
  },
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

      <StatsSection stats={headlineStats} />

      {topics.map((t, i) => (
        <ImpactRow
          key={t.title}
          index={i + 1}
          total={topics.length}
          title={t.title}
          body={t.body}
          practices={t.practices}
          impact={t.impact}
          bg={i % 2 === 0 ? 'default' : 'subtle'}
        />
      ))}

      <ArticlesSection title="See also related articles" excludeIds={['compliance']} />
      <ContactSection title="Get In Touch Now" />
    </>
  )
}
