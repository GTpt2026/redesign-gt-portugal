/**
 * ARCHIVED — 2026-05-15
 * Homeware page removed from live site pending full content.
 * Restore by moving back to app/homeware/page.js and adding
 * the Homeware nav link in components/layout/Header.jsx.
 */

import HeroSection from '@/components/sections/HeroSection'
import ContactSection from '@/components/sections/ContactSection'
import Button from '@/components/ui/Button'

export const metadata = {
  title: 'Homeware',
  description: 'Quality-driven homeware production solutions with various durable compositions for world-leading lifestyle brands.'
}

export default function HomewarePage() {
  return (
    <>
      <HeroSection
        eyebrow="Homeware"
        headline="Quality-Driven Homeware Solutions"
        subheadline="Durable compositions and quality-driven production for world-leading lifestyle and homeware brands."
        actions={<Button href="mailto:gtportugal@gtportugal.com" variant="primary" size="lg">Get in touch</Button>}
      />
      <section className="section section--subtle">
        <div className="container">
          <p className="page-section__sub">
            Detailed homeware category content coming soon. Contact us to learn more about our homeware production capabilities.
          </p>
        </div>
      </section>
      <ContactSection title="Start a homeware project" />
    </>
  )
}
