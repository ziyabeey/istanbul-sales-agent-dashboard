'use client'

import { useState } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import MakaleSidebar from '@/components/destek/MakaleSidebar'
import AramaCubugu from '@/components/destek/AramaCubugu'

function Breadcrumb() {
  const pathname = usePathname()
  const parcalar = pathname.split('/').filter(Boolean)

  // Map slugs to display names
  const isimHaritasi: Record<string, string> = {
    destek: 'Destek',
    baslangic: 'Başlangıç',
    editor: 'Editör',
    moduller: 'Modüller',
    paketler: 'Paketler',
    sektorler: 'Sektörler',
    whatsapp: 'WhatsApp',
    'google-yorumlar': 'Google Yorumlar',
    'odeme-fatura': 'Ödeme & Fatura',
    'seo-rehberi': 'SEO Rehberi',
    sss: 'SSS',
    iletisim: 'İletişim',
    'ilk-kurulum': 'İlk Kurulum',
    'paket-secimi': 'Paket Seçimi',
    'isletme-bilgileri': 'İşletme Bilgileri',
    'whatsapp-baglantisi': 'WhatsApp Bağlantısı',
    'kullanim-kilavuzu': 'Kullanım Kılavuzu',
    'blok-ekleme-silme': 'Blok Ekleme & Silme',
    'tema-ve-renkler': 'Tema ve Renkler',
    'gorsel-yukleme': 'Görsel Yükleme',
    'seo-ayarlari': 'SEO Ayarları',
    'domain-baglama': 'Domain Bağlama',
    yayinlama: 'Yayınlama',
    kurulum: 'Kurulum',
    'otomatik-yanitlar': 'Otomatik Yanıtlar',
    'odeme-yontemleri': 'Ödeme Yöntemleri',
    'fatura-indirme': 'Fatura İndirme',
    'paket-degistirme': 'Paket Değiştirme',
    'temel-seo': 'Temel SEO',
    'google-my-business': 'Google My Business',
    'sorun-giderme': 'Sorun Giderme',
    'odeme-sorunlari': 'Ödeme Sorunları',
    'giris-sorunlari': 'Giriş Sorunları',
    'site-sorunlari': 'Site Sorunları',
    'whatsapp-sorunlari': 'WhatsApp Sorunları',
    'domain-sorunlari': 'Domain Sorunları',
    'editor-sorunlari': 'Editör Sorunları',
    talep: 'Destek Talebi',
    takip: 'Talep Takip',
    olusturuldu: 'Talep Oluşturuldu',
  }

  return (
    <nav className="flex items-center gap-1.5 text-sm text-muted-foreground mb-6 flex-wrap">
      {parcalar.map((parca, i) => {
        const href = '/' + parcalar.slice(0, i + 1).join('/')
        const isLast = i === parcalar.length - 1
        const label = isimHaritasi[parca] || parca.replace(/-/g, ' ').replace(/\b\w/g, c => c.toUpperCase())

        return (
          <span key={href} className="flex items-center gap-1.5">
            {i > 0 && (
              <svg className="w-3.5 h-3.5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
              </svg>
            )}
            {isLast ? (
              <span className="text-foreground font-medium">{label}</span>
            ) : (
              <Link href={href} className="hover:text-foreground transition-colors">{label}</Link>
            )}
          </span>
        )
      })}
    </nav>
  )
}

export default function DestekShell({ children }: { children: React.ReactNode }) {
  const [sidebarAcik, setSidebarAcik] = useState(false)

  return (
    <div className="min-h-screen bg-background">
      {/* Top Bar */}
      <header className="sticky top-0 z-40 bg-white/80 backdrop-blur-xl border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            {/* Mobile hamburger */}
            <button
              onClick={() => setSidebarAcik(!sidebarAcik)}
              className="lg:hidden p-2 -ml-2 text-foreground hover:bg-gray-100 rounded-lg"
              aria-label="Menü"
            >
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                {sidebarAcik ? (
                  <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                ) : (
                  <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
                )}
              </svg>
            </button>
            <Link href="/destek" className="flex items-center gap-2 font-syne font-bold text-foreground">
              <span className="text-primary">KPNK</span>
              <span className="text-muted-foreground font-normal">Destek</span>
            </Link>
          </div>

          <div className="hidden sm:block flex-1 max-w-xl mx-4">
            <AramaCubugu />
          </div>

          <Link
            href="/"
            className="text-sm text-muted-foreground hover:text-foreground transition-colors whitespace-nowrap"
          >
            Ana Site →
          </Link>
        </div>

        {/* Mobile search */}
        <div className="sm:hidden px-4 pb-3">
          <AramaCubugu />
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex gap-8">
          {/* Sidebar — desktop */}
          <aside className="hidden lg:block w-64 flex-shrink-0">
            <div className="sticky top-24">
              <MakaleSidebar />
            </div>
          </aside>

          {/* Sidebar — mobile overlay */}
          {sidebarAcik && (
            <>
              <div
                className="fixed inset-0 bg-black/30 z-40 lg:hidden"
                onClick={() => setSidebarAcik(false)}
              />
              <aside className="fixed left-0 top-16 bottom-0 w-72 bg-white z-50 overflow-y-auto p-4 border-r border-gray-200 lg:hidden">
                <MakaleSidebar />
              </aside>
            </>
          )}

          {/* Main content */}
          <main className="flex-1 min-w-0">
            <Breadcrumb />
            {children}
          </main>
        </div>
      </div>

      {/* Footer */}
      <footer className="border-t border-gray-200 mt-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 text-center">
          <p className="text-sm text-muted-foreground">
            Aradığınızı bulamadınız mı?{' '}
            <Link href="/destek/iletisim" className="text-primary hover:underline">Bize ulaşın</Link>
            {' '}veya WhatsApp ile yazın.
          </p>
          <p className="text-xs text-gray-400 mt-2">© 2025 KPNK — Tüm hakları saklıdır.</p>
        </div>
      </footer>
    </div>
  )
}
