import { Inter } from 'next/font/google'
import Header from '@/components/layout/Header'
import Footer from '@/components/layout/Footer'
import FooterAnimations from '@/components/animations/FooterAnimations'
import { getCategories, getSiteSettings, getSustainabilityLinks } from '@/lib/content'
import './globals.css'

const inter = Inter({
  weight: ['300', '400', '500', '600', '700'],
  subsets: ['latin'],
  variable: '--font-inter'
})

export const metadata = {
  metadataBase: new URL('https://gtportugal.com'),
  title: {
    default: 'GT Portugal: Responsible Development + Production',
    template: '%s | GT Portugal'
  },
  description: 'For four decades, GT Portugal has manufactured outstanding garments for world-leading brands, combining creativity with reliable delivery capabilities.',
  keywords: ['garments', 'textiles', 'manufacturing', 'Portugal', 'sustainable fashion'],
  robots: {
    index: false,
    follow: false,
  },
  openGraph: {
    type: 'website',
    locale: 'en_GB',
    siteName: 'GT Portugal',
  },
  twitter: {
    card: 'summary_large_image',
  }
}

export default async function RootLayout({ children }) {
  const [settings, categories, sustainabilityLinks] = await Promise.all([getSiteSettings(), getCategories(), getSustainabilityLinks()])
  // The footer is a client component: send it only what it needs, not whole categories
  const footerCategories = categories.map(({ slug, title }) => ({ slug, title }))

  return (
    <html lang="en" className={inter.variable}>
      <head>
        {/* Typekit font kit — used for --font-family-mono (Antarctican Mono) */}
        <link rel="preconnect" href="https://use.typekit.net" crossOrigin="anonymous" />
        <link rel="preconnect" href="https://p.typekit.net" />
        {/* Loaded without blocking the first paint: it is only needed for the small mono labels.
            The script adds the stylesheet as soon as the head is parsed; <noscript> keeps it working without JS. */}
        <link rel="preload" href="https://use.typekit.net/pab0gun.css" as="style" />
        <script
          dangerouslySetInnerHTML={{
            __html: "(function(){var l=document.createElement('link');l.rel='stylesheet';l.href='https://use.typekit.net/pab0gun.css';document.head.appendChild(l)})()",
          }}
        />
        <noscript>
          <link rel="stylesheet" href="https://use.typekit.net/pab0gun.css" />
        </noscript>
      </head>
      <body>
        <Header links={settings.menuLinks} contactLabel={settings.contactButtonLabel} />
        <main style={{ paddingTop: 'var(--header-height)' }}>{children}</main>
        <Footer settings={settings} categories={footerCategories} sustainabilityLinks={sustainabilityLinks} />
        <FooterAnimations />
      </body>
    </html>
  )
}
