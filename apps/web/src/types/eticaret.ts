import { Timestamp } from 'firebase-admin/firestore'

// ─── Ürün ──────────────────────────────────────────────────────────────
export type UrunDurum = 'aktif' | 'taslak' | 'arsivlendi'
export type UrunTip = 'basit' | 'varyantli' | 'dijital'
export type KDVOrani = 0 | 1 | 8 | 18 | 20

export interface UrunVaryant {
  id: string
  ad: string            // "Kırmızı - M"
  fiyat: number         // kuruş cinsinden (integer)
  stokMiktar: number
  sku?: string
  barkod?: string
  gorsel?: string
  aktif: boolean
}

export interface UrunOzellik {
  ad: string        // "Renk", "Beden"
  degerler: string[] // ["Kırmızı", "Mavi", "Yeşil"]
}

export interface UrunSEO {
  baslik?: string
  aciklama?: string
  anahtarKelimeler?: string[]
}

export interface UrunStok {
  takipli: boolean
  miktar: number
  kritikEsik: number
  onSiparisIzinli: boolean
}

export interface UrunKargo {
  agirlik: number           // gram
  boyutlar?: { en: number; yukseklik: number; derinlik: number } // cm
  ucretsizKargo: boolean
  kargoSinifi?: string
}

export interface Urun {
  id: string
  shopId: string
  ad: string
  slug: string
  aciklama: string
  kisaAciklama?: string
  sku?: string
  barkod?: string
  durum: UrunDurum
  tip: UrunTip
  fiyat: number                 // kuruş cinsinden (12990 = 129.90₺)
  karsilastirmaFiyat?: number   // üzeri çizili fiyat
  maliyetFiyat?: number         // maliyet (kâr hesabı)
  kdvOrani: KDVOrani
  kdvDahil: boolean
  stok: UrunStok
  kargo: UrunKargo
  gorseller: string[]           // Firebase Storage URL[]
  kategoriler: string[]         // kategori ID[]
  etiketler: string[]
  seo: UrunSEO
  ozellikler: UrunOzellik[]
  varyantlar: UrunVaryant[]
  // Reklam entegrasyonu alanları (Sprint 4):
  googleUrunKategori?: string
  metaUrunKategori?: string
  gtin?: string
  marka?: string
  olusturma: Timestamp
  guncelleme: Timestamp
}

/** Firestore'a yazılacak form verisi (id ve timestamp hariç) */
export type UrunForm = Omit<Urun, 'id' | 'olusturma' | 'guncelleme' | 'shopId'>

// ─── Kategori ──────────────────────────────────────────────────────────
export interface Kategori {
  id: string
  shopId: string
  ad: string
  slug: string
  aciklama?: string
  ikon?: string
  gorsel?: string
  sira: number
  aktif: boolean
  ustKategoriId?: string
  olusturma: Timestamp
}

export type KategoriForm = Omit<Kategori, 'id' | 'olusturma' | 'shopId'>

// ─── Sepet ─────────────────────────────────────────────────────────────
export interface SepetItem {
  urunId: string
  varyantId?: string
  ad: string
  gorsel?: string
  fiyat: number          // birim fiyat (kuruş)
  adet: number
}

export interface Sepet {
  items: SepetItem[]
  toplamTutar: number    // kuruş
  kdvToplam: number      // kuruş
  kargoUcreti: number    // kuruş
  genelToplam: number    // kuruş
}

// ─── Sipariş ───────────────────────────────────────────────────────────
export type SiparisDurum =
  | 'beklemede'
  | 'odeme_onaylandi'
  | 'hazirlaniyor'
  | 'kargoda'
  | 'teslim_edildi'
  | 'iptal'
  | 'iade'

export interface SiparisAdres {
  adSoyad: string
  telefon: string
  adres: string
  ilce: string
  sehir: string
  postaKodu?: string
}

export interface SiparisItem {
  urunId: string
  varyantId?: string
  ad: string
  gorsel?: string
  birimFiyat: number
  adet: number
  toplamFiyat: number
  kdvOrani: KDVOrani
}

export interface Siparis {
  id: string
  shopId: string
  siparisNo: string         // "SIP-20260311-0001"
  musteriAdi: string
  musteriEmail?: string
  musteriTelefon: string
  items: SiparisItem[]
  araToplam: number
  kdvToplam: number
  kargoUcreti: number
  indirimTutar: number
  genelToplam: number
  durum: SiparisDurum
  teslimatAdresi: SiparisAdres
  faturaAdresi?: SiparisAdres
  odemeTipi: 'whatsapp' | 'iyzico' | 'havale'
  odemeId?: string           // İyzico paymentId (Sprint 2)
  kargoNo?: string
  kargoFirma?: string
  notlar?: string
  kuponKodu?: string
  olusturma: Timestamp
  guncelleme: Timestamp
}

export type SiparisForm = Omit<Siparis, 'id' | 'olusturma' | 'guncelleme' | 'shopId' | 'siparisNo'>

// ─── Filtre ────────────────────────────────────────────────────────────
export interface UrunFiltre {
  kategori?: string
  fiyatMin?: number
  fiyatMax?: number
  durum?: UrunDurum
  arama?: string
  sayfa?: number
  sayfaBoyut?: number
  siralama?: 'fiyat_artan' | 'fiyat_azalan' | 'yeni' | 'populer'
}

export interface SiparisFiltre {
  durum?: SiparisDurum
  sayfa?: number
  sayfaBoyut?: number
}
