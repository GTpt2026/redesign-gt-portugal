/** @type {import('next').NextConfig} */

// Static media is replaced by renaming files, so a week of browser/CDN cache
// (plus a month of stale-while-revalidate) is safe and removes repeat downloads.
const mediaCache = [{ key: 'Cache-Control', value: 'public, max-age=604800, stale-while-revalidate=2592000' }]

const nextConfig = {
  async headers() {
    return [
      { source: '/images/:path*', headers: mediaCache },
      { source: '/videos/:path*', headers: mediaCache },
    ]
  },
}

export default nextConfig
