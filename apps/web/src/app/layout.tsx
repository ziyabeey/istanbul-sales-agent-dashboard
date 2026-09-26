import type { Metadata, Viewport } from 'next'
import OfflineToast from '@/components/ui/OfflineToast'
import CookieBanner from '@/components/layout/CookieBanner'
import { EsnafProvider } from '@/context/EsnafContext'
import { ThemeProvider } from '@/components/ThemeProvider'
import { Toaster } from '@/components/ui/sonner'
import Analytics from '@/components/Analytics'
import './fonts.css'
import './globals.css'

export const metadata: Metadata = {
  title: 'Kepenk.ai — Bırak iş sana gelsin',
  description: 'Kepenk işletmendeki olayları izler ve yapılması gereken işi doğru anda önüne getirir. İlk production ürünümüz Randevu.',
  keywords: 'kepenk ai, online randevu, randevu yönetimi, müşteri yönetimi, işletme otomasyonu, küçük işletme yazılımı',
  authors: [{ name: 'yzt.digital' }],
  metadataBase: new URL('https://kepenk.ai'),
  openGraph: {
    title: 'Kepenk.ai — Bırak iş sana gelsin',
    description: 'İşletmendeki olaylardan doğru aksiyona. İlk production ürünümüz Randevu.',
    url: 'https://kepenk.ai',
    siteName: 'Kepenk.ai',
    locale: 'tr_TR',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Kepenk.ai — Bırak iş sana gelsin',
    description: 'İşletmendeki olaylardan doğru aksiyona. İlk production ürünümüz Randevu.',
  },
  robots: { index: true, follow: true },
  manifest: '/manifest.json',
  appleWebApp: {
    capable: true,
    statusBarStyle: 'default',
    title: 'Kepenk.ai',
  },
}

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
  themeColor: '#FFFFFF',
  viewportFit: 'cover',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="tr" className="scroll-smooth">
      <body className="font-sans antialiased">
        {/* SEO: JSON-LD Structured Data */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "SoftwareApplication",
              "name": "Kepenk.ai",
              "applicationCategory": "BusinessApplication",
              "operatingSystem": "Web",
              "offers": {
                "@type": "AggregateOffer",
                "priceCurrency": "TRY",
                "lowPrice": "399",
                "highPrice": "4990",
                "offerCount": "3"
              },
              "description": "Türk esnafı için yapay zeka ile dijital dönüşüm.",
              "publisher": {
                "@type": "Organization",
                "name": "yzt.digital"
              }
            })
          }}
        />
        <ThemeProvider attribute="class" defaultTheme="light" enableSystem={false} disableTransitionOnChange>
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
