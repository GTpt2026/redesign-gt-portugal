/**
 * sitemap.xml — public pages, the textile categories and the Insights articles.
 * The site is still noindex (see app/layout.js and app/robots.js); this is ready for launch.
 * Not listed on purpose: /typography and /homeware (internal pages).
 */
import { getCategories } from '@/lib/content'
import { getAllInsights } from '@/lib/insights'

const BASE = 'https://gtportugal.com'
export const revalidate = 3600

const STATIC = [
  '/', '/textiles', '/about', '/about/compliance', '/about/industry-certifications', '/about/our-process',
  '/sustainability', '/insights', '/contact', '/privacy-policy', '/terms-of-service',
]

export default async function sitemap() {
  const [categories, insights] = await Promise.all([
    getCategories().catch(() => []),
    getAllInsights().catch(() => []),
  ])
  return [
    ...STATIC.map((p) => ({ url: `${BASE}${p}` })),
    ...categories.map((c) => ({ url: `${BASE}/textiles/${c.slug}` })),
    ...insights.map((a) => ({ url: `${BASE}/insights/${a.slug}`, lastModified: a.date })),
  ]
}
