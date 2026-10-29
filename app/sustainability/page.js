import ImpactPageView from '@/components/sections/ImpactPageView'
import { WaterIcon, SolarIcon, WasteIcon, EnergyIcon, LocalIcon, EVIcon } from '@/components/ui/CommitmentIcons'
import { getImpactPage, seoMetadata } from '@/lib/content'

export const revalidate = 60

export async function generateMetadata() {
  const page = await getImpactPage('sustainability')
  return seoMetadata(page.seo, page.seoDefaults)
}

// Each commitment keeps its animated illustration; the text is edited in Sanity
const icons = {
  'water-stewardship': <WaterIcon />,
  'renewable-sources': <SolarIcon />,
  'waste-management': <WasteIcon />,
  'energy-efficiency': <EnergyIcon />,
  'local-production': <LocalIcon />,
  'electric-vehicle-fleet': <EVIcon />,
}

export default async function SustainabilityPage() {
  const page = await getImpactPage('sustainability')
  return <ImpactPageView page={page} breadcrumbs={[{ label: page.breadcrumb }]} icons={icons} />
}
