import type { Metadata, Viewport } from 'next'
import { Inter, Plus_Jakarta_Sans } from 'next/font/google'
import OfflineToast from '@/components/ui/OfflineToast'
import CookieBanner from '@/components/layout/CookieBanner'
import { EsnafProvider } from '@/context/EsnafContext'
import { ThemeProvider } from '@/components/ThemeProvider'
import { Toaster } from '@/components/ui/sonner'
import Analytics from '@/components/Analytics'
import './globals.css'

export const metadata: Metadata = {
  title: 'kepenk.ai — Türk Esnafı İçin Yapay Zeka',
  description: 'Elektrikçiden kuaföre, restoranından avukata — her esnaf için AI ile üretilmiş web sitesi, otomatik sosyal medya içeriği ve müşteri yönetimi.',
  keywords: 'esnaf dijital varlık, türk küçük işletme, yapay zeka web sitesi, esnaf instagram, kepenk ai',
  authors: [{ name: 'yzt.digital' }],
  metadataBase: new URL('https://kepenk.ai'),
  openGraph: {
    title: 'kepenk.ai — Esnafın Dijital Ortağı',
    description: 'AI ile dakikalar içinde web sitesi, her sabah içerik, 7/24 müşteri otomasyonu.',
    url: 'https://kepenk.ai',
    siteName: 'kepenk.ai',
    locale: 'tr_TR',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'kepenk.ai — Türk Esnafı İçin Yapay Zeka',
    description: 'AI ile dakikalar içinde web sitesi, her sabah içerik, 7/24 müşteri otomasyonu.',
  },
  robots: { index: true, follow: true },
  manifest: '/manifest.json',
  appleWebApp: {
    capable: true,
    statusBarStyle: 'black-translucent',
    title: 'kepenk.ai',
  },
}

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
  themeColor: '#0E0D0B',
  viewportFit: 'cover',
}

const inter = Inter({
  variable: '--font-inter',
  subsets: ['latin'],
  display: 'swap',
})

const plusJakartaSans = Plus_Jakarta_Sans({
  variable: '--font-display',
  subsets: ['latin'],
  weight: ['400', '500', '600', '700', '800'],
  display: 'swap',
})

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="tr" className="scroll-smooth">
      <body className={`${inter.variable} ${plusJakartaSans.variable} font-sans antialiased`}>
        {/* SEO: JSON-LD Structured Data */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "SoftwareApplication",
              "name": "kepenk.ai",
              "applicationCategory": "BusinessApplication",
              "operatingSystem": "Web",
              "offers": {
                "@type": "AggregateOffer",
                "priceCurrency": "TRY",
                "lowPrice": "399",
                "highPrice": "4990",
                "offerCount": "3"
              },
              "description": "Kepengini aç, gerisini biz hallederiz. Yapay zeka ile esnaf dijital dönüşümü.",
              "publisher": {
                "@type": "Organization",
                "name": "yzt.digital"
              }
            })
          }}
        />
        <ThemeProvider attribute="class" defaultTheme="dark" enableSystem={false} disableTransitionOnChange>
          <EsnafProvider>
            <OfflineToast />
            <CookieBanner />
            <Toaster />
            {children}
          </EsnafProvider>
        </ThemeProvider>
        <Analytics />
      </body>
    </html>
  )
}
