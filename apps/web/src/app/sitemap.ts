import { MetadataRoute } from 'next'
import { SEKTORLER } from '@/data/sektorler'
import { MODULLER } from '@/data/moduller'
import { PAKETLER } from '@/data/paketler'

const BASE = 'https://kepenk.ai'

const ISTANBUL_ILCELERI = [
  'kadikoy', 'besiktas', 'sisli', 'beyoglu', 'atasehir',
  'umraniye', 'maltepe', 'pendik', 'bahcesehir', 'esenyurt', 'beylikduzu',
]

export default function sitemap(): MetadataRoute.Sitemap {
  // 1. Statik sayfalar
  const statikSayfalar: MetadataRoute.Sitemap = [
    { url: BASE,                       lastModified: new Date(), changeFrequency: 'weekly',  priority: 1 },
    { url: `${BASE}/onboarding`,       lastModified: new Date(), changeFrequency: 'monthly', priority: 0.8 },
    { url: `${BASE}/giris`,            lastModified: new Date(), changeFrequency: 'monthly', priority: 0.6 },
    { url: `${BASE}/fiyatlar`,         lastModified: new Date(), changeFrequency: 'monthly', priority: 0.9 },
    { url: `${BASE}/ozellikler`,       lastModified: new Date(), changeFrequency: 'monthly', priority: 0.7 },
    { url: `${BASE}/hakkimizda`,       lastModified: new Date(), changeFrequency: 'monthly', priority: 0.5 },
    { url: `${BASE}/iletisim`,         lastModified: new Date(), changeFrequency: 'monthly', priority: 0.5 },
    { url: `${BASE}/yardim`,           lastModified: new Date(), changeFrequency: 'monthly', priority: 0.5 },
    { url: `${BASE}/gizlilik`,         lastModified: new Date(), changeFrequency: 'yearly',  priority: 0.2 },
    { url: `${BASE}/kvkk`,             lastModified: new Date(), changeFrequency: 'yearly',  priority: 0.2 },
    { url: `${BASE}/satis-sozlesmesi`, lastModified: new Date(), changeFrequency: 'yearly',  priority: 0.2 },
    { url: `${BASE}/iade-kosullari`,   lastModified: new Date(), changeFrequency: 'yearly',  priority: 0.2 },
    { url: `${BASE}/nasil-calisir`,    lastModified: new Date(), changeFrequency: 'monthly', priority: 0.8 },
    { url: `${BASE}/kurumsal`,         lastModified: new Date(), changeFrequency: 'monthly', priority: 0.7 },
    { url: `${BASE}/tedarik`,          lastModified: new Date(), changeFrequency: 'weekly',  priority: 0.7 },
    { url: `${BASE}/ozellikler/santiye-gunlugu`, lastModified: new Date(), changeFrequency: 'monthly', priority: 0.6 },
    { url: `${BASE}/kariyer`,                    lastModified: new Date(), changeFrequency: 'monthly', priority: 0.6 },
  ]

  // 2. Sektör landing sayfaları (tüm sektörler)
  const sektorSayfalar: MetadataRoute.Sitemap = SEKTORLER.map(s => ({
    url:             `${BASE}/${s.id}`,
    lastModified:    new Date(),
    changeFrequency: 'monthly' as const,
    priority:        0.7,
  }))

  // 3. İstanbul ilçe × sektör SEO sayfaları
  const ilceSayfalar: MetadataRoute.Sitemap = ISTANBUL_ILCELERI.flatMap(ilce =>
    SEKTORLER.slice(0, 8).map(s => ({
      url:             `${BASE}/istanbul/${ilce}/${s.id}`,
      lastModified:    new Date(),
      changeFrequency: 'monthly' as const,
      priority:        0.6,
    }))
  )

  // 4. Destek sayfaları (destek.kepenk.ai canonical)
  const DESTEK_BASE = 'https://destek.kepenk.ai'

  const destekHubSayfalar: MetadataRoute.Sitemap = [
    '/destek',
    '/destek/baslangic',
    '/destek/editor',
    '/destek/whatsapp',
    '/destek/google-yorumlar',
    '/destek/odeme-fatura',
    '/destek/seo-rehberi',
    '/destek/sss',
    '/destek/iletisim',
    '/destek/moduller',
    '/destek/sektorler',
    '/destek/paketler',
  ].map(path => ({
    url:             `${DESTEK_BASE}${path}`,
    lastModified:    new Date(),
    changeFrequency: 'monthly' as const,
    priority:        0.8,
  }))

  const destekMakaleSayfalar: MetadataRoute.Sitemap = [
    '/destek/baslangic/ilk-kurulum',
    '/destek/baslangic/paket-secimi',
    '/destek/baslangic/isletme-bilgileri',
    '/destek/baslangic/whatsapp-baglantisi',
    '/destek/editor/kullanim-kilavuzu',
    '/destek/editor/blok-ekleme-silme',
    '/destek/editor/tema-ve-renkler',
    '/destek/editor/gorsel-yukleme',
    '/destek/editor/seo-ayarlari',
    '/destek/editor/domain-baglama',
    '/destek/editor/yayinlama',
    '/destek/whatsapp/kurulum',
    '/destek/whatsapp/otomatik-yanitlar',
    '/destek/whatsapp/sss',
    '/destek/google-yorumlar/kurulum',
    '/destek/google-yorumlar/otomatik-yanitlar',
    '/destek/odeme-fatura/odeme-yontemleri',
    '/destek/odeme-fatura/fatura-indirme',
    '/destek/odeme-fatura/paket-degistirme',
    '/destek/seo-rehberi/temel-seo',
    '/destek/seo-rehberi/google-my-business',
  ].map(path => ({
    url:             `${DESTEK_BASE}${path}`,
    lastModified:    new Date(),
    changeFrequency: 'monthly' as const,
    priority:        0.7,
  }))

  // Dinamik destek sayfaları
  const destekModulSayfalar: MetadataRoute.Sitemap = MODULLER.map(m => ({
    url:             `${DESTEK_BASE}/destek/moduller/${m.id}`,
    lastModified:    new Date(),
    changeFrequency: 'monthly' as const,
    priority:        0.7,
  }))

  const destekSektorSayfalar: MetadataRoute.Sitemap = SEKTORLER.map(s => ({
    url:             `${DESTEK_BASE}/destek/sektorler/${s.id}`,
    lastModified:    new Date(),
    changeFrequency: 'monthly' as const,
    priority:        0.7,
  }))

  const destekPaketSayfalar: MetadataRoute.Sitemap = PAKETLER.map(p => ({
    url:             `${DESTEK_BASE}/destek/paketler/${p.id}`,
    lastModified:    new Date(),
    changeFrequency: 'monthly' as const,
    priority:        0.7,
  }))

  // Sorun giderme + Talep sayfaları
  const destekSorunGidermeSayfalar: MetadataRoute.Sitemap = [
    '/destek/sorun-giderme',
    '/destek/sorun-giderme/odeme-sorunlari',
    '/destek/sorun-giderme/giris-sorunlari',
    '/destek/sorun-giderme/site-sorunlari',
    '/destek/sorun-giderme/whatsapp-sorunlari',
    '/destek/sorun-giderme/domain-sorunlari',
    '/destek/sorun-giderme/editor-sorunlari',
    '/destek/talep',
    '/destek/talep/takip',
  ].map(path => ({
    url:             `${DESTEK_BASE}${path}`,
    lastModified:    new Date(),
    changeFrequency: 'monthly' as const,
    priority:        0.7,
  }))

  return [
    ...statikSayfalar,
    ...sektorSayfalar,
    ...ilceSayfalar,
    ...destekHubSayfalar,
    ...destekMakaleSayfalar,
    ...destekModulSayfalar,
    ...destekSektorSayfalar,
    ...destekPaketSayfalar,
    ...destekSorunGidermeSayfalar,
  ]
}
