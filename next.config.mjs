/** @type {import('next').NextConfig} */

// Static media is replaced by renaming files (hero-v2.mp4, denim-v2.webp, ...),
// so a week of browser/CDN cache (plus a month of stale-while-revalidate) is
// safe and removes repeat downloads. Production only: in development a swapped
// image should show up on the next reload.
const mediaCache = [{ key: 'Cache-Control', value: 'public, max-age=604800, stale-while-revalidate=2592000' }]

const nextConfig = {
  // Images edited in Sanity are served from its CDN (already resized and converted to WebP/AVIF)
  images: {
    remotePatterns: [{ protocol: 'https', hostname: 'cdn.sanity.io', pathname: '/images/**' }],
  },
  async headers() {
    if (process.env.NODE_ENV !== 'production') return []
    return [
      { source: '/images/:path*', headers: mediaCache },
      { source: '/videos/:path*', headers: mediaCache },
    ]
  },
}

export default nextConfig
