/** Tema Mağazası tip tanımları */

export interface TemaKartiItem {
  id: string                     // "berber-modern-minimal"
  ad: string                     // "Berber Modern Minimal"
  aciklama: string               // Kısa açıklama
  sektorId: string               // SEKTORLER[].id → "berber"
  sektorAd: string               // "Berber"
  sektorEmoji: string            // "✂️"
  sektorKategori: string         // "Güzellik & Bakım"
  temaStilId: string             // TEMALAR[].id → "modern-minimal"
  temaStilAd: string             // "Modern Minimal"
  minPaket: 'TEMEL' | 'STANDART' | 'BUYUME' | 'PREMIUM' | 'PREMIUMPLUS'
  etiketler: string[]            // Arama etiketleri
  thumbnailGradient: string      // CSS gradient
  thumbnailRenkler: string[]     // 3 renk kodu
  gercekSablonId?: string        // SABLONLAR'a link (iframe preview)
  ozellikler: string[]           // Özellik etiketleri
  siteTipi: 'vitrin' | 'hizmet' | 'eticaret' | 'kurumsal'
  yeni?: boolean
  populer?: boolean
}

export interface TemalarFiltreleri {
  arama: string
  sektor: string                 // "" = tümü
  paket: string                  // "" = tümü
  stil: string                   // "" = tümü
  siteTipi: string               // "" = tümü
  ozellik: string                // "" = tümü
}

export interface FiltreSecenegi {
  label: string
  value: string
  emoji?: string
  count?: number
}
