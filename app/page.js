import ButtonAnimated      from '@/components/ui/ButtonAnimated'
import HeroSection         from '@/components/sections/HeroSection'
import CategoriesIntro     from '@/components/sections/CategoriesIntro'
import CategoriesSection   from '@/components/sections/CategoriesSection'
import ClientsSection      from '@/components/sections/ClientsSection'
import HomeStatsSection    from '@/components/sections/HomeStatsSection'
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
      {/* ── 1. Hero ──────────────────────────────────────── */}
      <HeroSection
        eyebrow="Welcome to GT Portugal"
        headline={['Responsible', 'Development', '+ Production']}
        subheadline="For over 40 years, GT Portugal has been producing outstanding garments and shoes for the world's leading brands."
        video="/videos/hero.mp4"
        actions={
          <>
            <ButtonAnimated href="/contact" className="btn btn--primary">Start a project</ButtonAnimated>
            <ButtonAnimated href="/about"   className="btn btn--outline">See work</ButtonAnimated>
          </>
        }
      />

      {/* ── 2a. Categories intro — heading + description ──── */}
      <CategoriesIntro />

      {/* ── 2b. Categories tabs — Clothing / Shoes ── */}
      <CategoriesSection />

      {/* ── 3. Clients logo grid ─────────────────────────── */}
      <ClientsSection />

      {/* ── 4. Stats ─────────────────────────────────────── */}
      <HomeStatsSection />

      {/* ── 5. Testimonials ──────────────────────────────── */}
      <TestimonialsSection title="What our clients say" testimonials={testimonials} />

      {/* ── 5. Articles ──────────────────────────────────── */}
      <ArticlesSection title="What Drives Us" />

      {/* ── 6. Contact ───────────────────────────────────── */}
      <ContactSection title="Get In Touch Now" />

      {/* ── GSAP animations (client-only, returns null) ── */}
      <HomeAnimations />

    </>
  )
}
