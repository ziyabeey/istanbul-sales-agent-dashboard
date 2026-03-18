/**
 * temaKatalogu.ts — Tema Mağazası veri kataloğu
 *
 * SEKTORLER × TEMALAR cross-product ile ~200 tema otomatik üretilir.
 * Her tema, en yakın gerçek HTML şablonuna referans verir (iframe preview).
 */

import type { TemaKartiItem, FiltreSecenegi } from '@/types/temaKatalogu'
import { SEKTORLER } from '@/data/sektorler'
import { TEMALAR } from '@/data/temalar'
import { RENK_PALETLERI } from '@/data/renkPaletleri'
import { SEKTOR_KATALOGU, type SektorProfili } from '@/data/sektorKatalogu'

// ═══════════════════════════════════════════════════════════════
// SABİTLER
// ═══════════════════════════════════════════════════════════════

export const SAYFA_BOYUTU = 24

const PAKET_SIRASI = ['TEMEL', 'STANDART', 'BUYUME', 'PREMIUM', 'PREMIUMPLUS'] as const

// Sektör → uyumlu tema stilleri haritası (sektör karakterine göre)
const SEKTOR_STIL_UYUMU: Record<string, string[]> = {
  // Ev Hizmetleri — sade, güven veren
  'Ev Hizmetleri': ['modern-minimal', 'bold-ekspresif', 'brutalist', 'organik-dogal', 'playful-renkli', 'glassmorphism'],
  // Güzellik & Bakım — estetik, şık
  'Güzellik & Bakım': ['modern-minimal', 'elegant-luxury', 'glassmorphism', 'organik-dogal', 'playful-renkli', 'editorial-magazin', 'japon-minimal'],
  // Yiyecek & İçecek — sıcak, iştah açıcı
  'Yiyecek & İçecek': ['retro-klasik', 'bold-ekspresif', 'organik-dogal', 'modern-minimal', 'playful-renkli', 'editorial-magazin', 'elegant-luxury'],
  // Sağlık — güvenilir, temiz
  'Sağlık': ['modern-minimal', 'glassmorphism', 'neumorphism', 'organik-dogal', 'elegant-luxury', 'japon-minimal'],
  // Profesyonel Hizmetler — ciddi, kurumsal
  'Profesyonel Hizmetler': ['modern-minimal', 'elegant-luxury', 'brutalist', 'glassmorphism', 'editorial-magazin', 'retro-klasik', 'neumorphism'],
  // Otomotiv — güçlü, enerjik
  'Otomotiv': ['bold-ekspresif', 'futuristik-neon', 'brutalist', 'modern-minimal', 'glassmorphism', 'elegant-luxury'],
  // Eğitim — samimi, modern
  'Eğitim': ['modern-minimal', 'playful-renkli', 'organik-dogal', 'glassmorphism', 'neumorphism', 'retro-klasik'],
  // Sağlık & Spor — enerjik, güçlü
  'Sağlık & Spor': ['bold-ekspresif', 'futuristik-neon', 'modern-minimal', 'glassmorphism', 'brutalist', 'playful-renkli'],
  // Sanat & Kreatif — yaratıcı, cesur
  'Sanat & Kreatif': ['editorial-magazin', 'japon-minimal', 'futuristik-neon', 'playful-renkli', 'brutalist', 'glassmorphism', 'elegant-luxury'],
  // Etkinlik — gösterişli, dikkat çekici
  'Etkinlik': ['bold-ekspresif', 'elegant-luxury', 'futuristik-neon', 'glassmorphism', 'playful-renkli', 'editorial-magazin'],
}

// Varsayılan — kategori bulunamazsa
const VARSAYILAN_STILLER = ['modern-minimal', 'bold-ekspresif', 'elegant-luxury', 'glassmorphism', 'organik-dogal', 'retro-klasik', 'playful-renkli']

// Sektör → site tipi haritası
const SITE_TIPI_MAP: Record<string, TemaKartiItem['siteTipi']> = {
  'Ev Hizmetleri': 'hizmet',
  'Güzellik & Bakım': 'hizmet',
  'Yiyecek & İçecek': 'vitrin',
  'Sağlık': 'kurumsal',
  'Profesyonel Hizmetler': 'kurumsal',
  'Otomotiv': 'hizmet',
  'Eğitim': 'kurumsal',
  'Sağlık & Spor': 'hizmet',
  'Sanat & Kreatif': 'vitrin',
  'Etkinlik': 'vitrin',
}

// Sektör → özellikler haritası
const SEKTOR_OZELLIK_MAP: Record<string, string[]> = {
  'Ev Hizmetleri': ['whatsapp', 'harita', 'teklif-formu'],
  'Güzellik & Bakım': ['randevu', 'galeri', 'fiyat-listesi'],
  'Yiyecek & İçecek': ['menu', 'online-siparis', 'galeri'],
  'Sağlık': ['randevu', 'ekip', 'blog'],
  'Profesyonel Hizmetler': ['teklif-formu', 'blog', 'ekip'],
  'Otomotiv': ['galeri', 'fiyat-listesi', 'whatsapp'],
  'Eğitim': ['randevu', 'blog', 'fiyat-listesi'],
  'Sağlık & Spor': ['randevu', 'galeri', 'fiyat-listesi'],
  'Sanat & Kreatif': ['portfolio', 'galeri', 'blog'],
  'Etkinlik': ['galeri', 'randevu', 'fiyat-listesi'],
}

// ═══════════════════════════════════════════════════════════════
// RENK PALETİ EŞLEŞTİRME
// ═══════════════════════════════════════════════════════════════

function paletGradientBul(sektorId: string): { gradient: string; renkler: string[] } {
  // Önce SEKTOR_KATALOGU'nda profil bul
  const profil = SEKTOR_KATALOGU.find(p => p.slug === sektorId)
  if (profil) {
    return {
      gradient: profil.renkler.gradient,
      renkler: [profil.renkler.bg, profil.renkler.primary, profil.renkler.text],
    }
  }

  // Yoksa SEKTORLER'den onerilenPaletler'i kullan
  const sektor = SEKTORLER.find(s => s.id === sektorId)
  if (sektor?.onerilenPaletler?.[0]) {
    const palet = RENK_PALETLERI.find(p => p.id === sektor.onerilenPaletler[0])
    if (palet) {
      return {
        gradient: palet.css.gradient || `linear-gradient(135deg, ${palet.css.arkaplan} 0%, ${palet.css.kart} 100%)`,
        renkler: palet.onizleme,
      }
    }
  }

  // Fallback
  return {
    gradient: 'linear-gradient(135deg, #0f172a 0%, #1e293b 100%)',
    renkler: ['#0f172a', '#C04B1E', '#f8fafc'],
  }
}

// ═══════════════════════════════════════════════════════════════
// SABLON EŞLEŞTİRME (iframe preview için)
// ═══════════════════════════════════════════════════════════════

function gercekSablonBul(sektorId: string): string | undefined {
  // sektorKatalogu'ndan iskeletTipi bul
  const profil = SEKTOR_KATALOGU.find(p => p.slug === sektorId)
  if (profil?.iskeletTipi) return profil.iskeletTipi

  // Keyword benzeri eşleştirme
  const MAP: Record<string, string> = {
    kuafor: 'sektor-guzellik-buyume',
    'guzellik-merkezi': 'sektor-guzellik-buyume',
    berber: 'sektor-spor-premium',
    'masaj-spa': 'sektor-guzellik-buyume',
    restoran: 'sektor-restoran-standart',
    kafe: 'sektor-restoran-standart',
    'yemek-siparis': 'sektor-restoran-standart',
    elektrikci: 'sektor-hizmet-temel',
    tesisatci: 'sektor-hizmet-temel',
    boyaci: 'sektor-hizmet-temel',
    camci: 'sektor-hizmet-temel',
    nakliyeci: 'sektor-hizmet-temel',
    temizlikci: 'sektor-hizmet-temel',
    eczane: 'sektor-saglik-premium',
    veteriner: 'sektor-saglik-premium',
    diyetisyen: 'sektor-saglik-premium',
    'dis-hekimi': 'sektor-saglik-premium',
    muhasebeci: 'sektor-kurumsal-buyume',
    avukat: 'sektor-hukuk-buyume',
    'mimar-tasarimci': 'sektor-insaat-premium',
    emlakci: 'sektor-kurumsal-buyume',
    'oto-servis': 'sektor-otomotiv-buyume',
    'oto-yikama': 'sektor-otomotiv-buyume',
    'egitim-kurs': 'sektor-egitim-standart',
    'fitness-spor': 'sektor-spor-premium',
    fotografci: 'sektor-vitrin-buyume',
    mobilyaci: 'sektor-vitrin-buyume',
    terzi: 'sektor-vitrin-buyume',
    organizasyon: 'sektor-kurumsal-buyume',
  }

  return MAP[sektorId]
}

// ═══════════════════════════════════════════════════════════════
// TEMA ÜRETİMİ
// ═══════════════════════════════════════════════════════════════

function temaUret(): TemaKartiItem[] {
  const sonuc: TemaKartiItem[] = []
  let idx = 0

  for (const sektor of SEKTORLER) {
    const uyumluStiller = SEKTOR_STIL_UYUMU[sektor.kategori] || VARSAYILAN_STILLER
    const { gradient, renkler } = paletGradientBul(sektor.id)
    const gercekSablonId = gercekSablonBul(sektor.id)
    const siteTipi = SITE_TIPI_MAP[sektor.kategori] || 'vitrin'
    const ozellikler = SEKTOR_OZELLIK_MAP[sektor.kategori] || ['whatsapp', 'galeri']

    for (const stilId of uyumluStiller) {
      const tema = TEMALAR.find(t => t.id === stilId)
      if (!tema) continue

      // Paket: tema ve sektörün önerisinin büyüğünü al
      const temaPaketIdx = PAKET_SIRASI.indexOf(tema.minPaket as typeof PAKET_SIRASI[number])
      const sektorPaketIdx = sektor.onerilenPaket
        ? PAKET_SIRASI.indexOf(sektor.onerilenPaket)
        : 0
      const minPaketIdx = Math.max(temaPaketIdx, sektorPaketIdx, 0)
      const minPaket = PAKET_SIRASI[Math.min(minPaketIdx, PAKET_SIRASI.length - 1)]

      const id = `${sektor.id}-${stilId}`
      const ad = `${sektor.ad} ${tema.ad}`

      // Yeni ve popüler bayrakları (deterministik — hash tabanlı)
      const hash = simpleHash(id)
      const yeni = hash % 10 === 0       // ~10%
      const populer = hash % 7 === 0     // ~14%

      sonuc.push({
        id,
        ad,
        aciklama: `${sektor.ad} sektörüne özel ${tema.ad.toLowerCase()} tarzı tasarım. ${tema.aciklama}`,
        sektorId: sektor.id,
        sektorAd: sektor.ad,
        sektorEmoji: sektor.emoji,
        sektorKategori: sektor.kategori,
        temaStilId: stilId,
        temaStilAd: tema.ad,
        minPaket,
        etiketler: [sektor.ad, sektor.emoji, tema.ad, sektor.kategori, ...sektor.hizmetler.slice(0, 3)],
        thumbnailGradient: gradient,
        thumbnailRenkler: renkler,
        gercekSablonId,
        ozellikler,
        siteTipi,
        yeni,
        populer,
      })

      idx++
    }
  }

  return sonuc
}

/** Basit deterministik hash (badge ataması için) */
function simpleHash(str: string): number {
  let hash = 0
  for (let i = 0; i < str.length; i++) {
    hash = ((hash << 5) - hash) + str.charCodeAt(i)
    hash |= 0
  }
  return Math.abs(hash)
}

// ═══════════════════════════════════════════════════════════════
// EXPORTS
// ═══════════════════════════════════════════════════════════════

/** Tüm temalar (~200) */
export const TEMA_KATALOGU: TemaKartiItem[] = temaUret()

/** Sektör filtre seçenekleri (sayı ile) */
export const SEKTOR_FILTRELERI: FiltreSecenegi[] = (() => {
  const sayiMap = new Map<string, number>()
  TEMA_KATALOGU.forEach(t => sayiMap.set(t.sektorId, (sayiMap.get(t.sektorId) || 0) + 1))

  return SEKTORLER.map(s => ({
    label: s.ad,
    value: s.id,
    emoji: s.emoji,
    count: sayiMap.get(s.id) || 0,
  })).filter(s => s.count > 0)
})()

/** Tasarım stili filtre seçenekleri */
export const STIL_FILTRELERI: FiltreSecenegi[] = TEMALAR.map(t => ({
  label: t.ad,
  value: t.id,
  emoji: t.emoji,
}))

/** Paket filtre seçenekleri */
export const PAKET_FILTRELERI: FiltreSecenegi[] = [
  { label: 'Temel', value: 'TEMEL' },
  { label: 'Standart', value: 'STANDART' },
  { label: 'Büyüme', value: 'BUYUME' },
  { label: 'Premium', value: 'PREMIUM' },
  { label: 'Premium+', value: 'PREMIUMPLUS' },
]

/** Site tipi filtre seçenekleri */
export const SITE_TIPI_FILTRELERI: FiltreSecenegi[] = [
  { label: 'Vitrin', value: 'vitrin' },
  { label: 'Hizmet', value: 'hizmet' },
  { label: 'E-Ticaret', value: 'eticaret' },
  { label: 'Kurumsal', value: 'kurumsal' },
]

/** Özellik filtre seçenekleri */
export const OZELLIK_FILTRELERI: FiltreSecenegi[] = [
  { label: 'Online Randevu', value: 'randevu' },
  { label: 'Galeri', value: 'galeri' },
  { label: 'Fiyat Listesi', value: 'fiyat-listesi' },
  { label: 'Online Sipariş', value: 'online-siparis' },
  { label: 'Menü', value: 'menu' },
  { label: 'Blog', value: 'blog' },
  { label: 'Portfolyo', value: 'portfolio' },
  { label: 'Ekip', value: 'ekip' },
  { label: 'WhatsApp', value: 'whatsapp' },
  { label: 'Teklif Formu', value: 'teklif-formu' },
  { label: 'Harita', value: 'harita' },
]

/** İlham verici seçilen temalar (carousel için) */
export const INSPIRATIONAL_TEMALAR: TemaKartiItem[] = TEMA_KATALOGU
  .filter(t => t.populer && t.gercekSablonId)
  .slice(0, 6)
