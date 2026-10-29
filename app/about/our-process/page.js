import ImpactPageView from '@/components/sections/ImpactPageView'
import { getImpactPage, seoMetadata } from '@/lib/content'

export const revalidate = 60

export async function generateMetadata() {
  const page = await getImpactPage('process')
  return seoMetadata(page.seo, page.seoDefaults)
}

export default async function OurProcessPage() {
  const page = await getImpactPage('process')
  return (
    <ImpactPageView
      page={page}
      breadcrumbs={[{ label: 'About GT Portugal', href: '/about' }, { label: page.breadcrumb }]}
      excludeCard="process"
    />
  )
}
