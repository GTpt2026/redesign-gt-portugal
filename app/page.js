import HeroSection         from '@/components/sections/HeroSection'
import CategoriesIntro     from '@/components/sections/CategoriesIntro'
import CategoriesSection   from '@/components/sections/CategoriesSection'
import ClientsSection      from '@/components/sections/ClientsSection'
import HomeStatsSection    from '@/components/sections/HomeStatsSection'
import CapabilitiesSection from '@/components/sections/CapabilitiesSection'
import ArticlesSection     from '@/components/sections/ArticlesSection'
import TestimonialsSection from '@/components/sections/TestimonialsSection'
import ContactSection      from '@/components/sections/ContactSection'
import HomeAnimations      from '@/components/animations/HomeAnimations'
import { getHomeContent, seoMetadata } from '@/lib/content'

// Edits made in Sanity show up within a minute, no redeploy
export const revalidate = 60

export async function generateMetadata() {
  const { seo } = await getHomeContent()
  return seoMetadata(seo, {}, { absolute: true })
}

export default async function HomePage() {
  const home = await getHomeContent()

  return (
    <>
      {/* ── 1. Hero — slow GSAP marquee, red blend ──────────── */}
      <HeroSection
        eyebrow="Welcome to GT Portugal"
        eyebrowHref="/about"
        headline="Responsible . Development . Production"
        video="/videos/hero-v2.mp4"
        videoMobile="/videos/hero-mobile.mp4"
        poster="/images/heroes/hero-poster.webp"
        marqueeHeadline
      />

      {/* ── 2a. Categories intro — heading + description ──── */}
      <CategoriesIntro eyebrow={home.intro.eyebrow} text={home.intro.text} />

      {/* ── 2b. Categories tabs — Clothing / Shoes ── */}
      <CategoriesSection content={home.clothing} />

      {/* ── 3. Capabilities — On Your Terms: pillars + idea-to-product stepper ── */}
      <CapabilitiesSection />

      {/* ── 4. Clients logo grid ─────────────────────────── */}
      <ClientsSection title={home.clientsTitle} brands={home.clients} />

      {/* ── 5. Stats ─────────────────────────────────────── */}
      <HomeStatsSection stats={home.stats} />

      {/* ── 6. Testimonials ──────────────────────────────── */}
      <TestimonialsSection title={home.testimonialsTitle} testimonials={home.testimonials} />

      {/* ── 7. Articles ──────────────────────────────────── */}
      <ArticlesSection title="What Drives Us" />

      {/* ── 8. Contact ───────────────────────────────────── */}
      <ContactSection title="Get In Touch Now" />

      {/* ── GSAP animations (client-only, returns null) ── */}
      <HomeAnimations />

    </>
  )
}
