import PageHero from '@/components/sections/PageHero'
import Breadcrumbs from '@/components/ui/Breadcrumbs'
import PageIntro from '@/components/sections/PageIntro'
import ContactSection from '@/components/sections/ContactSection'
import InsightsExplorer from '@/components/insights/InsightsExplorer'
import InsightsCta from '@/components/insights/InsightsCta'
import { getAllInsights, toCard } from '@/lib/insights'

// New or edited articles in Sanity appear within a minute, no redeploy
export const revalidate = 60

export const metadata = {
  title: 'Insights',
  description:
    'Articles from GT Portugal on fabrics, production, technology and sustainability in textile manufacturing.',
  alternates: { canonical: '/insights' },
}

export default async function InsightsPage() {
  const articles = (await getAllInsights()).map(toCard)

  return (
    <>
      <PageHero
        headline={['Fabrics, Process', '& Innovation']}
        eyebrow="Insights"
        image="/images/heroes/textiles.jpg"
        alt=""
      />
      <Breadcrumbs items={[{ label: 'Insights' }]} />
      <PageIntro
        eyebrow="From the factory floor"
        title="Insights"
        description="Articles on the fabrics we work with, how they are made, and the technology and sustainability shaping textile production."
        bg="default"
        animate
      />
      <InsightsExplorer articles={articles} />
      <InsightsCta />
      <ContactSection title="Get In Touch Now" />
    </>
  )
}
