import PageHero from '@/components/sections/PageHero'
import Breadcrumbs from '@/components/ui/Breadcrumbs'
import PageIntro from '@/components/sections/PageIntro'
import EditorialSection from '@/components/sections/EditorialSection'
import DarkBanner from '@/components/sections/DarkBanner'
import ArticlesSection from '@/components/sections/ArticlesSection'
import ContactSection from '@/components/sections/ContactSection'

export const metadata = {
  title: 'Sustainability — GT Portugal',
  description: "GT Portugal's commitment to ecological awareness — GOTS, BCI, and OEKO-TEX certified, with renewable energy, waste management, and local production.",
}

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
        description="We foster a culture of ecological awareness and transparency that inspires our industry and our communities, from the way we adopt practical measures that impact our online production to the certification of our items with some of the most well-known environmental system markers (GOTS, BCI, OEKO-TEX, etc.)."
        columns={[
          "Being aware and mindful of our ecological impact is a core aspect of our community duty. It motivates us to think of better and brighter ways to create a more sustainable future. We produce our garments with environmental-recognised solutions as an imperative. By testing and certifying our products with some of the most recognised environmental labels, by opting for natural and organic fibres that represent a bet on future-facing sustainability, and by always moving quickly when it comes to purchasing cotton.",
          "For us, saving water, our planet's most precious resource, is an imperative. For that, we use a number of different techniques that make a difference. We dye with cold pad batch — a method that is estimated to save up to 50% of the water used when compared to conventional dyeing. We dye with Avitera dyes — reducing water energy consumption and carbon dioxide (CO2) emissions during the dyeing and washing-off process.",
          "We also dye with natural dyes — avoiding the use of chromium and water contamination, or using different water reduction dyeing systems — such as rainwater collection systems that filter the rainwater at the end of the process. Because we believe in fostering a lasting change in the fashion industry by causing action and leveraging, we buy eco, buy worn and done, we take clear online steps to use only globally known labels, and evaluate as much as possible throughout our products' cycle.",
        ]}
        bg="default"
      />

      <EditorialSection
        title="Renewable Sources"
        body="GT Portugal and its partners work in partners are equipped with photovoltaic panels in their production units, allowing us to generate our own electricity while lowering CO2 emissions. These are interlaced with translucent panels to promote natural light and let in buildings, allowing for improved zoning and energy savings in addition to more interior lights."
        bg="subtle"
      />
      <EditorialSection
        title="Waste Management"
        body="In our day to day activities, we strive to reduce natural resources consumption and waste creation by maintaining processes of efficiency, reuse, and recycling. Waste is collected and sent to be recycled or treated. A composter machine collects waste such as mash, paper and plastic. Waste textile is turned into mattress material and gives a new lease of life. In our efforts, we reuse or reuse all waste materials that can be recycled, and donate our textile scraps whenever possible."
        bg="default"
      />
      <EditorialSection
        title="Energy Efficiency"
        body="GT Portugal and its associates are also concerned about the energy waste that in mostly amounts to textile factories, With that in mind, our production units are equipped with modern energy systems, which are the base from the stock to the fixed base for quality. In our efforts, we use only LED lighting and Energy Star-rated appliances."
        bg="subtle"
      />
      <EditorialSection
        title="Local Production"
        body="We strive to positively impact our local community. Our entire supply chain is located in the Northern Region of Portugal, allowing us to establish closer sustainability dialogue with our offices in Matosinhos and giving a new lease of life to our activities. These activities are shared by our responsible manufacturing partners, utilising certified environmentally-friendly ingredients and materials."
        bg="default"
      />
      <EditorialSection
        title="Electric Vehicle Fleet"
        body="Giving our employees the opportunity to show responsibility and sustainability was also a challenge that we collectively took very seriously. Our happy medium is an agreement with our energy company team, each with its own charging stations available to all employees. This was another significant step in fostering our environmental impact."
        bg="subtle"
      />

      <DarkBanner
        eyebrow="Ecological Certifications"
        title="Our Promise"
        subtitle="GT Portugal holds a standard of business that we will not stop improving our products and will certify our items with the most recognised ecological certifying bodies in the world."
        cta={{ label: 'Learn More', href: '/about' }}
        image="/images/sustainability/certifications-bg.jpg"
        align="left"
      />

      <ArticlesSection title="See also related articles" />
      <ContactSection title="Get In Touch Now" />
    </>
  )
}
