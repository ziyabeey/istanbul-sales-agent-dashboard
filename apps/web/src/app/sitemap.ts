import { MetadataRoute } from 'next'
import { SEKTORLER } from '@/data/sektorler'

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

  return [...statikSayfalar, ...sektorSayfalar, ...ilceSayfalar]
}
