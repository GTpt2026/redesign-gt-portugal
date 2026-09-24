import PageHero from '@/components/sections/PageHero'
import Breadcrumbs from '@/components/ui/Breadcrumbs'
import ContactSection from '@/components/sections/ContactSection'

export const metadata = {
  title: 'Contact',
  description: 'Get in touch with GT Portugal, Porto. Call us at (+351) 22 902 4701 or send us a message.',
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
