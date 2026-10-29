import PageHero from '@/components/sections/PageHero'
import Breadcrumbs from '@/components/ui/Breadcrumbs'
import ContactSection from '@/components/sections/ContactSection'

import { getSiteSettings } from '@/lib/content'

export const revalidate = 60

export async function generateMetadata() {
  const { phone } = await getSiteSettings()
  return {
    title: 'Contact',
    description: `Get in touch with GT Portugal, Porto. Call us at ${phone} or send us a message.`,
  }
}

export default function ContactPage() {
  return (
    <>
      <PageHero
        headline={['Get In Touch', 'With GT Portugal']}
        eyebrow="Contact"
      />
      <Breadcrumbs items={[{ label: 'Contact' }]} />
      <ContactSection title="Send Us a Message" />
    </>
  )
}
