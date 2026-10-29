/**
 * What the institutional pages show today. Starting point for the Sanity
 * content (scripts/seed-content-to-sanity.mjs) and the fallback whenever a
 * field is empty in Sanity or Sanity cannot be reached.
 *
 * Section arrays are shared by the pages built from "impact rows"
 * (Sustainability, Compliance, Certifications, Our Process).
 */

/* ── About ────────────────────────────────────────────────────── */
export const aboutDefaults = {
  heroEyebrow: 'About GT Portugal',
  heroHeadline: ['Responsible', 'Development &', 'Outstanding Production'],
  heroImage: '/images/heroes/about.webp',
  mission: {
    eyebrow: 'Our Mission',
    title: 'Our Mission',
    body: "Our mission is to develop and produce outstanding garments, shoes and products; in compliance with our client's standards and expectations. By consistently investing in process optimisation, technology and training, and managing ourselves efficiently, we are able to deliver upon our clients' expectations, fully leveraging the competence of our team.",
  },
  values: [
    {
      label: 'Fairness',
      description: 'We believe in the importance of treating everyone fairly and are committed to creating an environment where everyone can thrive. We foster honest, transparent relationships with all our partners, clients and employees.',
    },
    {
      label: 'Transparency',
      description: 'We are open and transparent about our business practices, our supply chain and our environmental impact. We believe that transparency is the foundation of trust.',
    },
    {
      label: 'Trustworthiness',
      description: 'We are proud of our trustworthy reputation built over 40+ years. Our clients know they can rely on us to deliver on our promises, consistently and with integrity.',
    },
  ],
  valuesImage: '/images/about/values-bg.webp',
  years: {
    eyebrow: '40+ Years',
    title: 'For More Than 40 Years',
    description: 'GT Portugal has been at the forefront of responsible development and production development and production of textiles and shoes. Our combined experience is the foundation for responsible social and environmental practices and delivering top quality products.',
  },
  stats: [
    { value: '0',   label: 'Child Labour' },
    { value: '5',   label: 'Certifications' },
    { value: '20+', label: 'Years of Global Export' },
  ],
  banner: {
    eyebrow: 'Our Commitment',
    title: ['We Strive To Be', 'Better Every Day'],
    subtitle: 'Our work is conducted within a framework of continuous improvement and sustainable development, as we establish a dynamic that allows us to take care of our clients as well as look for new business opportunities and find sustainable ways to live.',
    ctaLabel: 'Learn More',
    ctaHref: '/sustainability',
    image: '/images/about/strive-bg.webp',
  },
  people: {
    eyebrow: 'Our People',
    title: 'Enhancing Motivation',
    body: [
      'Attracting, developing, and retaining talent through impact in our work, we put our people first.',
      'Together we build something that really matters and that has a long-lasting impact on the world of fashion.',
      "GT Portugal has 1 office and production facilities. Based in Matosinhos, the city of fashion, it's the heart of the fashion industry in Portugal. The most significant Portuguese fashion-related organisations are based there, offering a growing and vibrant ecosystem of companies across the entire value chain.",
    ],
  },
  seo: {
    title: 'About',
    description: 'For four decades, GT Portugal has manufactured outstanding garments and shoes for world-leading brands.',
  },
}

/* ── Pages made of numbered sections ──────────────────────────── */
export const impactPageDefaults = {
  sustainability: {
    heroEyebrow: 'Sustainability',
    heroHeadline: ['Eco-Friendly', 'Solutions &', 'Inspiring Change'],
    heroImage: '/images/heroes/sustainability.webp',
    heroAlt: 'GT Portugal renewable energy installation',
    breadcrumb: 'Sustainability',
    intro: {
      eyebrow: 'Our Commitment',
      title: 'Environmental Transparency',
      description: "We foster a culture of ecological awareness and transparency that inspires our industry and our communities, from the practical measures that reduce our production's environmental footprint to the certification of our items with some of the most well-known environmental control markers (GOTS, BCI, OEKO-TEX, etc.).",
    },
    stats: [
      { value: '50%',  label: 'Water Saved' },
      { value: '100%', label: 'Local Supply Chain' },
      { value: '3',    label: 'Certifications' },
    ],
    sections: [
      {
        slug: 'water-stewardship',
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
        slug: 'renewable-sources',
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
        slug: 'waste-management',
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
        slug: 'energy-efficiency',
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
        slug: 'local-production',
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
        slug: 'electric-vehicle-fleet',
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
    ],
    banner: {
      eyebrow: 'Ecological Certifications',
      title: 'Our Promise',
      subtitle: 'GT Portugal creates high-quality products that last. We test and certify our products with some of the most recognised ecological controlling labels.',
      ctaLabel: 'Learn More',
      ctaHref: '/about',
      image: '/images/articles/certifications.webp',
    },
    seo: {
      title: 'Sustainability',
      description: "GT Portugal's commitment to ecological awareness: GOTS, BCI, and OEKO-TEX certified, with renewable energy, waste management, and local production.",
    },
  },
  compliance: {
    heroEyebrow: 'Compliance',
    heroHeadline: ['Ethical', 'Behaviour'],
    heroImage: '/images/articles/compliance.webp',
    heroAlt: 'GT Portugal compliance and working conditions',
    breadcrumb: 'Compliance',
    intro: {
      eyebrow: 'Building Long-Term Relationships',
      title: 'Traceability, Working Conditions and Quality',
      description: 'Compliance is the best way to support our focus on traceability of production, working conditions and quality. We want to safeguard our success with integrity and mutual esteem. At GT Portugal we are committed to working with our partners to raise awareness and sustainable solutions across our entire supply chain.',
    },
    stats: [
      { value: '14',   label: 'Months Of Salary' },
      { value: '665+', label: 'Euro Minimum Wage' },
      { value: '40',   label: 'Hour Working Week' },
    ],
    sections: [
      {
        title: 'Strictly No Child Labour',
        body: 'Portugal defines the minimum age of admission to work at 16. GT Portugal and our suppliers do not employ young workers under that age, or in conditions which compromise their health, safety or moral integrity.',
        practices: [
          'All international standards for fair labor conditions',
          'Suppliers audited regularly against exploitation',
          'Sustainable solutions to prevent child labor',
        ],
        impact: [
          { label: 'Minimum Age', value: '16' },
          { label: 'Audits', value: 'Regular' },
        ],
      },
      {
        title: 'Free From Discrimination, Harassment and Violence',
        body: "GT Portugal's and its suppliers' employees are entitled to work in an environment free from discrimination, harassment and violence, in which all individuals are treated with respect and dignity.",
        practices: [
          'No differential treatment based on personal characteristics',
          'Terms of employment based on ability to do the job',
          'Bullying, harassment or abuse are not tolerated',
        ],
        impact: [
          { label: 'Policy', value: 'Zero Tolerance' },
          { label: 'Standard', value: 'Equal Treatment' },
        ],
      },
      {
        title: 'Prioritising Health & Safety',
        body: 'The health and safety of those who work with GT Portugal, whether employees, suppliers or subcontractors, is a key value and a priority, guided by Portuguese legislation and national entities such as DGS, DGERT and ACT.',
        practices: [
          "Office designed with an outdoors garden for employees",
          'Encouraged outdoor and sporting activities',
          'Annual health check-ups and general medicine services',
        ],
        impact: [
          { label: 'Guided By', value: 'DGS, DGERT, ACT' },
          { label: 'Check-ups', value: 'Annual' },
        ],
      },
    ],
    seo: {
      title: 'Compliance',
      description: "GT Portugal's compliance practices: no child labour, zero tolerance for discrimination, workplace health & safety, and fair wages for every worker in our supply chain.",
    },
  },
  certifications: {
    heroEyebrow: 'Industry Certifications',
    heroHeadline: ['A Greener', 'And Better World'],
    heroImage: '/images/articles/certifications.webp',
    heroAlt: 'GT Portugal industry certifications',
    breadcrumb: 'Industry Certifications',
    intro: {
      eyebrow: 'Sustainability Is Key',
      title: 'A Better Future For All',
      description: 'With a growing concern for an ecological path, the final customer dictates that buying clothes, shoes, or homeware made with little to no respect for the environment or the human condition is less and less of an option. These multiple initiatives and programs of certification attest our ecological concerns and guarantee that our final product went through a supply chain where social, health, safety, and environmental conditions have been considered and verified.',
    },
    stats: [
      { value: '5',    label: 'Certifications' },
      { value: '100+', label: 'OEKO-TEX Control Parameters' },
      { value: '170+', label: 'ISO 9001 Countries' },
    ],
    sections: [
      {
        title: 'GOTS — Global Organic Textile Standard',
        body: "Recognised as one of the world's leading processing standards for organic fiber textiles, GOTS defines social and environmental guidelines applied throughout the entire organic textiles supply chain. GT Portugal, working together with its partners, can have your products certified by this standard.",
        practices: [
          'Welfare standards for animal husbandry',
          'Prohibits genetically modified organisms',
          'Prohibits toxic, persistent pesticides or synthetic fertilizers',
          'Certifies all ecological and labor conditions',
        ],
      },
      {
        title: 'BCI — Better Cotton Initiative',
        body: 'The largest cotton sustainability program in the world, created to attest the sustainability of a product by making global cotton production better for the people who take part in it, the environment, and the future of our planet.',
        practices: [
          'Three pillars: environmental, social, economic',
          'Crop protection practices and water stewardship',
          'Soil health, biodiversity and fiber quality',
          'Decent work and effective management systems',
        ],
      },
      {
        title: 'Standard 100 by OEKO-TEX®',
        body: "One of the world's most recognised labels for testing harmful substances in textiles. It ensures every component of a product was tested for any potentially toxic element, covering chemicals known to be harmful to health.",
        practices: [
          'Around 100 control parameters tested',
          'Stricter limits the more intensive the skin contact',
          'A synonym of customer confidence and product safety',
        ],
      },
      {
        title: 'SA8000 — Engaged Workforces',
        body: 'The most prominent social certification standard in the world, helping organisations build an engaged workforce and a sustainable workplace, based on the International Labor Organization conventions.',
        practices: [
          'No child labor, forced or compulsory labor',
          'Health and safety, freedom of association',
          'No discrimination or unfair disciplinary practices',
          'Fair working hours and remuneration',
        ],
      },
      {
        title: 'ISO 9001 — Quality Management',
        body: 'ISO 9001 establishes the criteria for a quality management system used by over one million companies in over 170 countries, demonstrating the ability to consistently provide products that meet customer and regulatory requirements.',
        practices: [
          'A strong customer focus',
          'Motivation and implication of top management',
          'Continual improvement, from energy efficiency to packaging',
        ],
      },
    ],
    seo: {
      title: 'Industry Certifications',
      description: 'GOTS, BCI, OEKO-TEX, SA8000 and ISO 9001: the certifications that guarantee our supply chain meets social, health, safety and environmental standards.',
    },
  },
  process: {
    heroEyebrow: 'Our Process',
    heroHeadline: ['A Proactive', 'Approach'],
    heroImage: '/images/articles/process.webp',
    heroAlt: 'GT Portugal production process',
    breadcrumb: 'Our Process',
    intro: {
      eyebrow: 'Exceeding Expectations',
      title: 'The Tightly Knit Relationships',
      description: 'With our clients, some for more than 20 years, is the cornerstone of our success. We are proudly recognised for making products that exceed the demanding expectations of our clients. Our proactive approach, availability, constant communication and passion for the industry are all put at the service of creating products that positively impact the lives of consumers on a global scale.',
    },
    stats: [
      { value: '20+', label: 'Years, Longest Client Relationships' },
      { value: '3',   label: 'Steps From Idea To Delivery' },
    ],
    sections: [
      {
        title: 'You Send Us Your Idea',
        body: "Whether it is a mood board or a TP, our industry knowledge combined with our creativity and commitment to quality give us a unique ability to turn it into beautifully crafted products. We begin by understanding your brand's identity and uniqueness in order to propose materials, shapes, and details that help materialise your designer's concepts.",
        practices: [
          'Brainstorming, conceptualisation and prototyping',
          'A highly specialised, experienced technical team',
          'Custom-made materials within your price range',
        ],
      },
      {
        title: 'Quality Assurance Before Production Begins',
        body: 'We work closely with suppliers and customers to identify and mitigate any potential risks that may negatively influence the excellence of the final product. For GT Portugal, prevention is key: we set quality standards and practices in factory sourcing, lab testing, preproduction and on-site quality control inspections.',
        practices: [
          'Well-defined control methods at every manufacturing stage',
          'An experienced quality control team examining every product',
          'Relationships with clients spanning more than 30 years',
        ],
      },
      {
        title: 'Delivery With Reliable Global Couriers',
        body: "As soon as our clients' orders are ready, our network of reliable global couriers works around the clock to get our products exactly where they need to be — from warehousing and transportation to customs brokerage and freight forwarding. We analyse each client's needs and design flexible, cost-effective solutions.",
        practices: [
          'Freight boat or air shipping, chosen to fit the timeline',
          'Flexible solutions that help reduce costs',
          'A constant concern for the ecological footprint of delivery',
        ],
      },
    ],
    seo: {
      title: 'Our Process',
      description: "From your idea to quality assurance to delivery with reliable global couriers: GT Portugal's proactive approach to exceeding client expectations.",
    },
  },
}

/* ── "What We Do" cards (home, About, Compliance...) ───────────── */
export const featureCardsDefaults = [
    {
      id:          'certifications',
      image:       '/images/articles/certifications.webp',
      hoverImage:  '/images/articles/certifications-hover.webp',
      title:       'Industry Certifications',
      description: 'As an active actor within the fashion industry, GT Portugal is aware of the future-oriented steps that it has to take in order to contribute to a greener and better world.',
      href:        '/about/industry-certifications',
    },
    {
      id:          'compliance',
      image:       '/images/articles/compliance.webp',
      hoverImage:  '/images/articles/compliance-hover.webp',
      title:       'Compliance',
      description: 'Compliance is the best way to support our focus on traceability of production, working conditions and quality. We want to safeguard our success with integrity and mutual esteem.',
      href:        '/about/compliance',
    },
    {
      id:          'process',
      image:       '/images/articles/process.webp',
      hoverImage:  '/images/articles/process-hover.webp',
      title:       'Our Process',
      description: 'We are proudly recognised for making products that exceed the demanding expectations of our clients. Our process is key to that success.',
      href:        '/about/our-process',
    },
    {
      id:          'about',
      image:       '/images/articles/about.jpg',
      hoverImage:  '/images/articles/about-hover.webp',
      title:       'About GT Portugal',
      description: 'For more than 30 years, GT Portugal has been at the forefront of responsible development and production of textiles and shoes.',
      href:        '/about',
    },
  ].map(({ id, image, hoverImage, title, description, href }) => ({ id, image, hoverImage, title, description, href }))

/* ── Home: texts edited in the home page document ──────────────── */
export const homeTextDefaults = {
  intro: {
    eyebrow: 'A Proud 40-Year History',
    text: "For 40 years, GT Portugal has designed and produced outstanding garments and footwear for women, men and children, trusted by the world's leading fashion brands to combine unrivalled creativity with the precision to deliver at scale.",
  },
  clothing: {
    title: 'Made to Be Loved',
    description: 'In the north of Portugal, patient hands shape beautiful fabrics. It is in the small details, a seam, a stitch, a buckle, that each piece becomes unmistakable.',
    ctaLabel: 'See our textiles',
    ctaHref: '/textiles',
  },
  hero: {
    eyebrow: 'Welcome to GT Portugal',
    eyebrowHref: '/about',
    headlineWords: ['Responsible', 'Development', 'Production'],
  },
  capabilities: {
    eyebrow: 'Capabilities',
    title: 'On Your Terms',
    beats: ['Any quantity.', 'Any spec.', 'Any pace.'],
    intro: 'From idea to finished product, your production can speed up, slow down or change direction without losing a step.',
    pillars: [
      { title: 'Small Runs, Full Attention', text: 'We scale to your order, not the other way around.' },
      { title: 'Fast From Sample to Shelf', text: 'Sampling in days, not weeks.' },
      { title: 'Shaped Around Your Spec', text: 'Patterns, materials and processes adjusted to your brief.' },
    ],
    startLabel: 'Idea',
    steps: ['Sourcing', 'Pattern Making', 'Sampling', 'Production', 'Quality Control', 'Logistics'],
    endLabel: 'Product',
  },
}

/* ── Contact page ────────────────────────────────────────────── */
export const contactPageDefaults = {
  heroEyebrow: 'Contact',
  heroHeadline: ['Get In Touch', 'With GT Portugal'],
  formTitle: 'Send Us a Message',
}
