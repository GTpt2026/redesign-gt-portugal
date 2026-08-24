export const categories = [
  {
    slug: 'activewear',
    image: '/images/textiles/activewear.jpg',
    title: 'Activewear',
    tagline: 'Flexible & Comfortable',
    cardDescription: 'High fashion seamless lightweight clothing with extreme durability and elasticity, designed to properly fit the body.',
    description: 'Seamless garment technology lets us produce lightweight, extremely durable and elastic activewear in one continuous process — no cutting or sewing seams, just comfort and freedom of movement.',
    features: [
      { label: 'Method', text: 'One of the most technologically advanced production methods in fashion, made on specialised circular looms and Santoni machines.' },
      { label: 'Material', text: 'Soft, breathable seamless knits — typically under 10% spandex — built to stretch and recover without losing shape.' },
      { label: 'Sustainability', text: 'A more cost-effective, environmentally friendly process that uses less material, less time and produces less waste.' },
    ],
  },
  {
    slug: 'knitwear',
    image: '/images/textiles/knitwear.jpg',
    title: 'Knitwear',
    tagline: 'Timeless & Comfortable',
    cardDescription: 'From cosy sweaters to lightweight cardigans, GT Portugal is capable of creating a warm and comfortable knitwear collection.',
    description: 'From knitted roll-necks to lightweight cardigans, we prioritise warmth and comfort in every timeless piece — using jacquards, jerseys, felpa and rib in cotton, linen, silk, modal and cashmere.',
    features: [
      { label: 'Materials', text: 'Jacquards, jerseys, fleece, interlock and rib in cotton, linen, polyamide, polyester, modal, silk or cashmere.' },
      { label: 'MOQs', text: '300 pieces per style and colour, keeping quality and pricing consistent for our clients.' },
      { label: 'Production', text: '6 to 8 weeks to bring an idea to a finished, quality-checked piece.' },
    ],
  },
  {
    slug: 'swimwear',
    image: '/images/textiles/swimwear.jpg',
    title: 'Swimwear',
    tagline: 'Nontoxic, Organic & UV Protected',
    cardDescription: 'A wide selection of eco-conscious swimwear, using the most trendy and innovative types of recycled fabrics for well-known international brands.',
    description: 'Nontoxic, organic and UV-protected — we produce swimwear using the most trend-forward recycled fabrics, balancing fit, durability and stretch for leading international brands.',
    features: [
      { label: 'Materials', text: 'Polyester, spandex and nylon blends, plus recycled fibres like ECONYL®, TENCEL and REPREVE.' },
      { label: 'Sustainability', text: 'Certified via the OEKO-Tex Standard 100 and registered with the Seaqual Initiative.' },
      { label: 'Lead Time', text: '4 weeks for sampling, up to 8 weeks for production — longer during peak summer season.' },
    ],
  },
  {
    slug: 'outerwear',
    image: '/images/textiles/outerwear.jpg',
    title: 'Outerwear',
    tagline: 'Protective by Design',
    cardDescription: 'From raincoats, trench coats, jackets, basic leather coats, or bombers, we specialise in the art of outerwear making.',
    description: 'Raincoats, trench coats, jackets and bombers designed to handle the elements without compromising on style — made with long-lasting, easy-care fabrics that are recyclable, renewable and biodegradable.',
    features: [
      { label: 'Weather Protection', text: 'Engineered against wind, rain, snow and UV, with moisture-wicking and antibacterial properties.' },
      { label: 'Materials', text: 'Certified recyclable and biodegradable fabrics, including merino wool and Tencel Lyocell.' },
      { label: 'Range', text: 'Rain coats, bombers, parkas, trench coats, wool jackets and technical garments.' },
    ],
  },
  {
    slug: 'soft-woven',
    image: '/images/textiles/softwoven.jpg',
    title: 'Soft Woven',
    tagline: 'Stronger & Flexible',
    cardDescription: 'Tops, shirt, dresses and trousers made with woven fabrics. We have a large stock of woven fabrics, allowing you to bring your ideas to life faster.',
    description: 'Tops, shirts, dresses and trousers made from woven fabric — flexible, strong and shape-retaining. We specialise in flannels, poplin and gabardine.',
    features: [
      { label: 'Weave', text: 'Twill, satin and plain weave, each suited to a different look and application.' },
      { label: 'Specialisation', text: 'Yarn-dyed plaid flannels and alaska-quality overshirts; stock-service poplin.' },
      { label: 'Capacity', text: 'Up to 100K units in production capacity.' },
    ],
  },
  {
    slug: 'jersey',
    image: '/images/textiles/jersey.jpg',
    title: 'Jersey',
    tagline: 'Cut, Sew & Sustainable',
    cardDescription: 'From jackets to dresses, from minimalistic looks to strong streetwear products full of embroideries, prints and washings, from high-definition jacquards to digital printed sweats.',
    description: 'Cut-and-sew knits produced across Portugal\'s most competitive textile cluster — from jackets to dresses, minimalist looks to streetwear full of embroidery, prints and washes.',
    features: [
      { label: 'Network', text: 'A coordinated cluster of knitters, dyers, makers, embroiderers and printers, built on flexibility and expertise.' },
      { label: 'Sustainability', text: 'Produced in a country where over 50% of electricity comes from renewable sources.' },
      { label: 'Lead Time', text: '300-piece MOQs, with 6 to 9 weeks from concept to production.' },
    ],
  },
  {
    slug: 'denim',
    image: '/images/textiles/denim.jpg',
    title: 'Denim',
    tagline: 'A Timeless Fabric',
    cardDescription: 'From jackets to dresses, from minimalistic looks to strong streetwear products full of embroideries, prints and washings, from high-definition jacquards to digital printed sweats.',
    description: 'On the market since 1985 — a durable cotton twill fabric with a diagonal weave, produced using sustainable materials and finishes shaped by decades of technological innovation.',
    features: [
      { label: 'Process', text: 'From cotton selection and indigo dyeing to twill weaving, sanforizing and finishing treatments like stone-washing and distressing.' },
      { label: 'Sustainability', text: 'Produced in a country where over 50% of electricity comes from renewable sources.' },
      { label: 'Lead Time', text: '300-piece MOQs, with 6 to 9 weeks from concept to production.' },
    ],
  },
]

export function getCategory(slug) {
  return categories.find(c => c.slug === slug)
}

export function getRelatedCategories(slug, count = 3) {
  const startIndex = categories.findIndex(c => c.slug === slug)
  const rotated = [...categories.slice(startIndex + 1), ...categories.slice(0, startIndex)]
  return rotated.slice(0, count)
}
