/**
 * What the home page shows today. Used as the starting point for the Sanity
 * content (scripts/seed-content-to-sanity.mjs) and as the fallback whenever
 * a field is empty in Sanity or Sanity cannot be reached.
 */
export const homeDefaults = {
  stats: [
    { prefix: '+', end: 40,  suffix: '',  label: 'Years of experience' },
    { prefix: '+', end: 100, suffix: 'k', label: 'Pieces produced monthly' },
    { prefix: '+', end: 20,  suffix: '',  label: 'Global brands' },
  ],
  clientsTitle: 'Trusted by world-leading brands',
  // `wide` marks thin, wide wordmarks that need a wider box to look as big as chunky logos
  clients: [
    { name: 'Supreme',              slug: 'supreme' },
    { name: 'Balenciaga',           slug: 'balenciaga',          wide: true },
    { name: 'Miu Miu',              slug: 'miu-miu',             wide: true },
    { name: 'Reformation',          slug: 'reformation' },
    { name: 'Revolve',              slug: 'revolve',             wide: true },
    { name: 'Faherty',              slug: 'faherty',             wide: true },
    { name: 'Moschino',             slug: 'moschino' },
    { name: 'Frankies Bikinis',     slug: 'frankies-bikinis',    wide: true },
    { name: 'Citizens of Humanity', slug: 'citizens-of-humanity', wide: true },
    { name: 'Kith',                 slug: 'kith' },
    { name: 'Roller Rabbit',        slug: 'roller-rabbit',       wide: true },
    { name: 'Agolde',               slug: 'agolde' },
    { name: 'Lake',                 slug: 'lake' },
    { name: 'Jenni Kayne',          slug: 'jenni-kayne',         wide: true },
    { name: 'Dôen',                 slug: 'doen' },
    { name: 'Brochu Walker',        slug: 'brochu-walker',       wide: true },
    { name: 'Anine Bing',           slug: 'anine-bing',          wide: true },
    { name: 'Saint + Sofia',        slug: 'saint-sofia',         wide: true },
    { name: 'Boden',                slug: 'boden' },
    { name: 'James Perse',          slug: 'james-perse' },
    { name: 'Ossou',                slug: 'ossou' },
    { name: 'Alexander Wang',       slug: 'alexanderwang',       wide: true },
    { name: 'Rose & Born',          slug: 'rose-born',           wide: true },
  ],
  testimonialsTitle: 'What our clients say',
  testimonials: [
    {
      quote: "GT Portugal is an amazing factory. Their commitment to partnership is truly impressive. They're always willing to take on new techniques and even the most complicated styles.",
      name: 'Melanie Milton',
      role: 'Product Manager',
      logoSrc: '/images/testimonials/dkny.svg',
    },
    {
      quote: "Textile, apparel and shoe development & sourcing are always more complex in today's fashion industry scenario, so I can definitely recommend this organization for long term business relationship.",
      name: 'Guelfo Aldrovandy',
      role: 'Sourcing Manager',
      logoSrc: '/images/testimonials/giorgio-armani.svg',
    },
    {
      quote: 'GT Portugal is unique in their understanding of the US market, high quality products and competitive prices. I recommend them highly.',
      name: 'Mark Engebretson',
      role: 'EVP Operations',
      logoSrc: '/images/testimonials/vince.svg',
    },
  ],
}
