import ImpactPageView from '@/components/sections/ImpactPageView'
import { getImpactPage, seoMetadata } from '@/lib/content'

export const revalidate = 60

export async function generateMetadata() {
  const page = await getImpactPage('compliance')
  return seoMetadata(page.seo, page.seoDefaults)
}

export default async function CompliancePage() {
  const page = await getImpactPage('compliance')
  return (
    <ImpactPageView
      page={page}
      breadcrumbs={[{ label: 'About GT Portugal', href: '/about' }, { label: page.breadcrumb }]}
      excludeCard="compliance"
    />
  )
}
