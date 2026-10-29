import ImpactPageView from '@/components/sections/ImpactPageView'
import { getImpactPage, seoMetadata } from '@/lib/content'

export const revalidate = 60

export async function generateMetadata() {
  const page = await getImpactPage('certifications')
  return seoMetadata(page.seo, page.seoDefaults)
}

export default async function IndustryCertificationsPage() {
  const page = await getImpactPage('certifications')
  return (
    <ImpactPageView
      page={page}
      breadcrumbs={[{ label: 'About GT Portugal', href: '/about' }, { label: page.breadcrumb }]}
      excludeCard="certifications"
    />
  )
}
