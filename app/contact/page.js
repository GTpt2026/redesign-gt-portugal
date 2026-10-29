import PageHero from '@/components/sections/PageHero'
import Breadcrumbs from '@/components/ui/Breadcrumbs'
import ContactSection from '@/components/sections/ContactSection'

import { getContactPage, getSiteSettings, seoMetadata } from '@/lib/content'

export const revalidate = 60

export async function generateMetadata() {
  const [{ phone }, page] = await Promise.all([getSiteSettings(), getContactPage()])
  return seoMetadata(page.seo, {
    title: 'Contact',
    description: `Get in touch with GT Portugal, Porto. Call us at ${phone} or send us a message.`,
  })
}

export default async function ContactPage() {
  const page = await getContactPage()
  return (
    <>
      <PageHero headline={page.heroHeadline} eyebrow={page.heroEyebrow} />
      <Breadcrumbs items={[{ label: 'Contact' }]} />
      <ContactSection title={page.formTitle} />
    </>
  )
}
