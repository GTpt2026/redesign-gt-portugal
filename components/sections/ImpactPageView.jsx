/**
 * ImpactPageView — the layout shared by Sustainability, Compliance,
 * Industry Certifications and Our Process: hero, breadcrumbs, intro, numbers,
 * a list of numbered sections, an optional banner, related articles, contact.
 * Content comes from Sanity (lib/content.js getImpactPage).
 */
import PageHero from './PageHero'
import Breadcrumbs from '@/components/ui/Breadcrumbs'
import PageIntro from './PageIntro'
import StatsSection from './StatsSection'
import ImpactRow from './ImpactRow'
import DarkBanner from './DarkBanner'
import ArticlesSection from './ArticlesSection'
import ContactSection from './ContactSection'

export default function ImpactPageView({ page, breadcrumbs, excludeCard, icons = {} }) {
  return (
    <>
      <PageHero
        headline={page.heroHeadline}
        eyebrow={page.heroEyebrow}
        image={page.heroImage}
        alt={page.heroAlt}
      />
      <Breadcrumbs items={breadcrumbs} />
      <PageIntro
        eyebrow={page.intro.eyebrow}
        title={page.intro.title}
        description={page.intro.description}
        bg="default"
        animate
      />
      <StatsSection stats={page.stats} />

      {page.sections.map((s, i) => (
        <ImpactRow
          key={s.title}
          id={s.slug}
          index={i + 1}
          total={page.sections.length}
          title={s.title}
          body={s.body}
          practices={s.practices}
          impact={s.impact}
          icon={s.slug ? icons[s.slug] : undefined}
          bg={i % 2 === 0 ? 'default' : 'subtle'}
        />
      ))}

      {page.banner && (
        <DarkBanner
          eyebrow={page.banner.eyebrow}
          title={page.banner.title}
          subtitle={page.banner.subtitle}
          cta={{ label: page.banner.ctaLabel, href: page.banner.ctaHref }}
          image={page.banner.image}
          align="left"
        />
      )}

      <ArticlesSection title="See also related articles" excludeIds={excludeCard ? [excludeCard] : []} />
      <ContactSection title="Get In Touch Now" />
    </>
  )
}
