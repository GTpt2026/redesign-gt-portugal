import PageHero from '@/components/sections/PageHero'
import Breadcrumbs from '@/components/ui/Breadcrumbs'
import PageIntro from '@/components/sections/PageIntro'
import StatsSection from '@/components/sections/StatsSection'
import ImpactRow from '@/components/sections/ImpactRow'
import { WaterIcon, SolarIcon, WasteIcon, EnergyIcon, LocalIcon, EVIcon } from '@/components/ui/CommitmentIcons'
import DarkBanner from '@/components/sections/DarkBanner'
import ArticlesSection from '@/components/sections/ArticlesSection'
import ContactSection from '@/components/sections/ContactSection'

export const metadata = {
  title: 'Sustainability',
  description: "GT Portugal's commitment to ecological awareness: GOTS, BCI, and OEKO-TEX certified, with renewable energy, waste management, and local production.",
}

const headlineStats = [
  { value: '50%',  label: 'Water Saved' },
  { value: '100%', label: 'Local Supply Chain' },
  { value: '3',    label: 'Certifications' },
]

const commitments = [
  {
    icon: <WaterIcon />,
    title: 'Water Stewardship',
    body: "Saving water, our planet's most precious resource, is an imperative. We dye with cold pad batch, a method estimated to save up to 50% of the water used compared to conventional dyeing, alongside Avitera dyes that reduce energy consumption and CO2 emissions during dyeing and washing-off.",
    practices: [
      'Cold pad batch dyeing process',
      'Avitera low-impact dyes',
      'Rainwater collectors that reuse clean water',
      'Natural inks, avoiding chemicals',
    ],
    impact: [
      { label: 'Water Saved', value: '50%' },
      { label: 'Method', value: 'Cold Pad Batch' },
    ],
  },
  {
    icon: <SolarIcon />,
    title: 'Renewable Sources',
    body: 'GT Portugal and its partners are equipped with photovoltaic panels across their production units, allowing us to generate our own electricity while lowering CO2 emissions. These are interlaced with translucent panels that let natural light into the buildings.',
    practices: [
      'Photovoltaic panels on production units',
      'Translucent roofing for natural light',
      'Reduced interior lighting load',
    ],
    impact: [
      { label: 'Power Source', value: 'Solar' },
      { label: 'Emissions', value: 'Lower CO2 Output' },
    ],
  },
  {
    icon: <WasteIcon />,
    title: 'Waste Management',
    body: 'We reduce resource consumption and waste creation by maximising process efficiency, reuse and recycling. A compactor machine collects waste such as mesh, paper and plastic, and mesh trash is turned into mattress material for a new lease of life.',
    practices: [
      'On-site compactor for mesh, paper and plastic',
      'Mesh trash turned into mattress filling',
      'Scrap donation whenever possible',
    ],
    impact: [
      { label: 'Waste Loop', value: 'Circular' },
      { label: 'Materials', value: 'Mesh, Paper & Plastic' },
    ],
  },
  {
    icon: <EnergyIcon />,
    title: 'Energy Efficiency',
    body: 'GT Portugal and its associates are also concerned about the energy waste that is mostly prevalent in textile factories. Our units are equipped with boilers with energy-recovery systems, using the steam from the irons to heat water for our laundries, alongside LED lighting and Energy Star-rated appliances.',
    practices: [
      'Energy-recovery boilers heat laundry water with iron steam',
      '100% LED lighting across facilities',
      'Energy Star-rated appliances',
    ],
    impact: [
      { label: 'LED Lighting', value: '100%' },
      { label: 'Standard', value: 'Energy Star' },
    ],
  },
  {
    icon: <LocalIcon />,
    title: 'Local Production',
    body: 'Our entire supply chain is located in the Northern Region of Portugal, keeping us close to our offices in Matosinhos and in direct dialogue with the manufacturing partners who share our commitment to certified, environmentally-friendly materials.',
    practices: [
      'Entire supply chain in Northern Portugal',
      'Direct dialogue with manufacturing partners',
      'Certified environmentally-friendly materials',
    ],
    impact: [
      { label: 'Supply Chain', value: '100%' },
      { label: 'Base', value: 'Matosinhos, PT' },
    ],
  },
  {
    icon: <EVIcon />,
    title: 'Electric Vehicle Fleet',
    body: 'Giving our employees the opportunity to move responsibly and sustainably was also a challenge we collectively took very seriously. Our supply chain is equipped with an electric car fleet, each with its own charging station on site, one of our most important investments in ecological sustainability.',
    practices: [
      'Electric car fleet across our supply chain',
      'On-site charging station per vehicle',
      'A key investment in ecological sustainability',
    ],
    impact: [
      { label: 'Fleet', value: 'Electric' },
      { label: 'Charging', value: 'On-Site, Per Vehicle' },
    ],
  },
]

export default function SustainabilityPage() {
  return (
    <>
      <PageHero
        headline={['Eco-Friendly', 'Solutions &', 'Inspiring Change']}
        eyebrow="Sustainability"
        image="/images/heroes/sustainability.jpg"
        alt="GT Portugal renewable energy installation"
      />
      <Breadcrumbs items={[{ label: 'Sustainability' }]} />
      <PageIntro
        eyebrow="Our Commitment"
        title="Environmental Transparency"
        description="We foster a culture of ecological awareness and transparency that inspires our industry and our communities, from the practical measures that reduce our production's environmental footprint to the certification of our items with some of the most well-known environmental control markers (GOTS, BCI, OEKO-TEX, etc.)."
        bg="default"
        animate
      />

      <StatsSection stats={headlineStats} />

      {commitments.map((c, i) => (
        <ImpactRow
          key={c.title}
          index={i + 1}
          total={commitments.length}
          title={c.title}
          body={c.body}
          practices={c.practices}
          impact={c.impact}
          icon={c.icon}
          bg={i % 2 === 0 ? 'default' : 'subtle'}
        />
      ))}

      <DarkBanner
        eyebrow="Ecological Certifications"
        title="Our Promise"
        subtitle="GT Portugal creates high-quality products that last. We test and certify our products with some of the most recognised ecological controlling labels."
        cta={{ label: 'Learn More', href: '/about' }}
        image="/images/sustainability/certifications-bg.jpg"
        align="left"
      />

      <ArticlesSection title="See also related articles" />
      <ContactSection title="Get In Touch Now" />
    </>
  )
}
