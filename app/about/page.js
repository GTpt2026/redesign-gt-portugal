import PageHero from '@/components/sections/PageHero'
import Breadcrumbs from '@/components/ui/Breadcrumbs'
import PageIntro from '@/components/sections/PageIntro'
import ClientsSection from '@/components/sections/ClientsSection'
import ArticlesSection from '@/components/sections/ArticlesSection'
import StatsSection from '@/components/sections/StatsSection'
import ValuesSection from '@/components/sections/ValuesSection'
import DarkBanner from '@/components/sections/DarkBanner'
import EditorialSection from '@/components/sections/EditorialSection'
import { getAboutPage, getHomeContent, seoMetadata } from '@/lib/content'

export const revalidate = 60

export async function generateMetadata() {
  const about = await getAboutPage()
  return seoMetadata(about.seo, about.seoDefaults)
}

export default async function AboutPage() {
  const [about, home] = await Promise.all([getAboutPage(), getHomeContent()])

  return (
    <>
      <PageHero
        headline={about.heroHeadline}
        eyebrow={about.heroEyebrow}
        image={about.heroImage}
        alt="GT Portugal headquarters"
      />
      <Breadcrumbs items={[{ label: 'About GT Portugal' }]} />

      <EditorialSection
        eyebrow={about.mission.eyebrow}
        title={about.mission.title}
        body={about.mission.body}
        bg="subtle"
        align="center"
      />

      <ValuesSection values={about.values} image={about.valuesImage} />

      <PageIntro
        eyebrow={about.years.eyebrow}
        title={about.years.title}
        description={about.years.description}
        bg="default"
      />

      <ClientsSection title={home.clientsTitle} brands={home.clients} />

      <ArticlesSection title="What We Do" excludeIds={['about']} />

      <StatsSection stats={about.stats} />

      <DarkBanner
        eyebrow={about.banner.eyebrow}
        title={about.banner.title}
        subtitle={about.banner.subtitle}
        cta={{ label: about.banner.ctaLabel, href: about.banner.ctaHref }}
        image={about.banner.image}
        align="left"
      />

      <EditorialSection
        eyebrow={about.people.eyebrow}
        title={about.people.title}
        body={about.people.body}
        bg="subtle"
        align="center"
      />
    </>
  )
}
