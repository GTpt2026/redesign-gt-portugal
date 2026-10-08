import HeroSection         from '@/components/sections/HeroSection'
import CategoriesIntro     from '@/components/sections/CategoriesIntro'
import CategoriesSection   from '@/components/sections/CategoriesSection'
import ClientsSection      from '@/components/sections/ClientsSection'
import HomeStatsSection    from '@/components/sections/HomeStatsSection'
import OnYourTerms         from '@/components/sections/OnYourTerms'
import CapabilitiesStepper from '@/components/sections/CapabilitiesStepper'
import ArticlesSection     from '@/components/sections/ArticlesSection'
import TestimonialsSection from '@/components/sections/TestimonialsSection'
import ContactSection      from '@/components/sections/ContactSection'
import HomeAnimations      from '@/components/animations/HomeAnimations'
const testimonials = [
  {
    quote: "GT Portugal is an amazing factory. Their commitment to partnership is truly impressive. They're always willing to take on new techniques and even the most complicated styles.",
    name: 'Melanie Milton',
    role: 'Product Manager',
    logo: '/images/testimonials/dkny.svg',
  },
  {
    quote: "Textile, apparel and shoe development & sourcing are always more complex in today's fashion industry scenario, so I can definitely recommend this organization for long term business relationship.",
    name: 'Guelfo Aldrovandy',
    role: 'Sourcing Manager',
    logo: '/images/testimonials/giorgio-armani.svg',
  },
  {
    quote: "GT Portugal is unique in their understanding of the US market, high quality products and competitive prices. I recommend them highly.",
    name: 'Mark Engebretson',
    role: 'EVP Operations',
    logo: '/images/testimonials/vince.svg',
  },
]

export default function HomePage() {
  return (
    <>
      {/* ── 1. Hero — slow GSAP marquee, red blend ──────────── */}
      <HeroSection
        eyebrow="Welcome to GT Portugal"
        eyebrowHref="/about"
        headline="Responsible . Development . Production"
        video="/videos/hero.mp4"
        videoMobile="/videos/hero-mobile.mp4"
        poster="/images/heroes/hero-text-clip.jpg"
        marqueeHeadline
      />

      {/* ── 2. On Your Terms — small runs, fast sampling, built to your brief ── */}
      <OnYourTerms />

      {/* ── 3. Capabilities — idea to finished product ── */}
      <CapabilitiesStepper />

      {/* ── 4a. Categories intro — heading + description ──── */}
      <CategoriesIntro />

      {/* ── 4b. Categories tabs — Clothing / Shoes ── */}
      <CategoriesSection />

      {/* ── 5. Clients logo grid ─────────────────────────── */}
      <ClientsSection />

      {/* ── 6. Stats ─────────────────────────────────────── */}
      <HomeStatsSection />

      {/* ── 7. Testimonials ──────────────────────────────── */}
      <TestimonialsSection title="What our clients say" testimonials={testimonials} />

      {/* ── 8. Articles ──────────────────────────────────── */}
      <ArticlesSection title="What Drives Us" />

      {/* ── 9. Contact ───────────────────────────────────── */}
      <ContactSection title="Get In Touch Now" />

      {/* ── GSAP animations (client-only, returns null) ── */}
      <HomeAnimations />

    </>
  )
}
