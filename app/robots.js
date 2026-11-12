/**
 * robots.txt — matches the current state of the site: not indexable yet
 * (see `robots` in app/layout.js). At launch, switch to `allow: '/'` together
 * with removing the noindex there.
 */
export default function robots() {
  return {
    rules: { userAgent: '*', disallow: '/' },
    sitemap: 'https://gtportugal.com/sitemap.xml',
  }
}
