/**
 * urunImportExport.ts — CSV/Excel Toplu Ürün Import & Export Pipeline
 * 
 * Rakip Analizi:
 * - WooCommerce: hatalı veri sessizce geçiyor
 * - Shopify: sınırlı format desteği
 * - Antigravity: satır satır validasyon raporu + TR encoding + çoklu platform mapper
 * 
 * Desteklenen Import Formatları:
 * - CSV (UTF-8 + Windows-1254)
 * - Excel (.xlsx / .xls)
 * - Trendyol / Hepsiburada export formatları
 * - WooCommerce export CSV
 */

import { adminDb, Timestamp } from '@/lib/firebaseAdmin'
import type { Urun } from '@/types/eticaret'

// ─── Import Tipleri ───────────────────────────────────────────────────

export type ImportRowStatus = 'success' | 'warning' | 'error'

export interface ImportRowResult {
  row: number
  status: ImportRowStatus
  field?: string
  message: string
}

export interface ImportValidationReport {
  total: number
  success: number
  warnings: number
  errors: number
  rows: ImportRowResult[]
  preview: Partial<Urun>[]
}

export interface ImportColumnMapping {
  ad: string
  sku: string
  fiyat: string
  stok: string
  kdvOrani: string
  aciklama?: string
  kisaAciklama?: string
  kategori?: string
  marka?: string
  gorsel?: string
  barkod?: string
  agirlik?: string
  karsilastirmaFiyat?: string
  durum?: string
  // Varyant
  parentSku?: string
  varyantAd?: string
  renk?: string
  beden?: string
}

// ─── Önceden Tanımlı Kolon Eşleştirmeleri ──────────────────────────────

export const COLUMN_PRESETS: Record<string, ImportColumnMapping> = {
  standard: {
    ad: 'ad', sku: 'sku', fiyat: 'fiyat', stok: 'stok', kdvOrani: 'kdv_orani',
    aciklama: 'aciklama', kisaAciklama: 'kisa_aciklama', kategori: 'kategori',
    marka: 'marka', gorsel: 'gorsel_url', barkod: 'barkod', agirlik: 'agirlik',
    karsilastirmaFiyat: 'karsilastirma_fiyat', durum: 'durum',
  },
  woocommerce: {
    ad: 'Name', sku: 'SKU', fiyat: 'Regular price', stok: 'Stock',
    kdvOrani: 'Tax class', aciklama: 'Description', kisaAciklama: 'Short description',
    kategori: 'Categories', marka: 'Brands', gorsel: 'Images', barkod: 'GTIN',
    karsilastirmaFiyat: 'Sale price', durum: 'Published',
    parentSku: 'Parent', varyantAd: 'Attribute 1 value(s)',
  },
  trendyol: {
    ad: 'Ürün Adı', sku: 'Stok Kodu', fiyat: 'Piyasa Satış Fiyatı', stok: 'Stok Adedi',
    kdvOrani: 'KDV Oranı', aciklama: 'Ürün Açıklaması', kategori: 'Kategori',
    marka: 'Marka', gorsel: 'Görsel 1', barkod: 'Barkod',
    renk: 'Renk', beden: 'Beden',
  },
  hepsiburada: {
    ad: 'MerchantSku_ProductName', sku: 'MerchantSku', fiyat: 'Price', stok: 'AvailableStock',
    kdvOrani: 'VatRate', aciklama: 'Description', kategori: 'CategoryName',
    marka: 'Brand', gorsel: 'Image1', barkod: 'Barcode',
  },
}

// ─── CSV Parse ─────────────────────────────────────────────────────────

export function csvParse(text: string, delimiter: string = ','): Record<string, string>[] {
  const lines = text.split(/\r?\n/).filter(l => l.trim())
  if (lines.length < 2) return []

  const headers = parseCsvLine(lines[0], delimiter)
  const rows: Record<string, string>[] = []

  for (let i = 1; i < lines.length; i++) {
    const values = parseCsvLine(lines[i], delimiter)
    const row: Record<string, string> = {}
    headers.forEach((h, idx) => { row[h.trim()] = (values[idx] || '').trim() })
    rows.push(row)
  }

  return rows
}

function parseCsvLine(line: string, delimiter: string): string[] {
  const result: string[] = []
  let current = ''
  let inQuotes = false

  for (let i = 0; i < line.length; i++) {
    const char = line[i]
    if (char === '"') {
      if (inQuotes && line[i + 1] === '"') { current += '"'; i++ }
      else inQuotes = !inQuotes
    } else if (char === delimiter && !inQuotes) {
      result.push(current)
      current = ''
    } else {
      current += char
    }
  }
  result.push(current)
  return result
}

// ─── Validasyon Engine ─────────────────────────────────────────────────

const GECERLI_KDV_ORANLARI = [0, 1, 8, 10, 18, 20]

export function validateRow(
  row: Record<string, string>,
  rowIndex: number,
  mapping: ImportColumnMapping,
  mevcutSkular: Set<string>
): ImportRowResult[] {
  const results: ImportRowResult[] = []

  const val = (field: keyof ImportColumnMapping): string => {
    const col = mapping[field]
    return col ? (row[col] || '').trim() : ''
  }

  // ZORUNLU: Ürün adı
  const ad = val('ad')
  if (!ad) {
    results.push({ row: rowIndex, status: 'error', field: 'ad', message: 'Ürün adı boş bırakılamaz' })
  } else if (ad.length > 255) {
    results.push({ row: rowIndex, status: 'error', field: 'ad', message: `Ürün adı çok uzun (${ad.length}/255)` })
  }

  // ZORUNLU: SKU
  const sku = val('sku')
  if (!sku) {
    results.push({ row: rowIndex, status: 'error', field: 'sku', message: 'SKU boş bırakılamaz' })
  } else if (mevcutSkular.has(sku)) {
    results.push({ row: rowIndex, status: 'error', field: 'sku', message: `SKU zaten mevcut: ${sku}` })
  }

  // ZORUNLU: Fiyat
  const fiyatStr = val('fiyat')
  const fiyat = Number(fiyatStr?.replace(/[.,]/g, m => m === ',' ? '.' : m).replace(/[^\d.]/g, '') || '')
  if (!fiyatStr || isNaN(fiyat)) {
    results.push({ row: rowIndex, status: 'error', field: 'fiyat', message: 'Fiyat boş veya geçersiz' })
  } else if (fiyat <= 0) {
    results.push({ row: rowIndex, status: 'error', field: 'fiyat', message: 'Fiyat pozitif olmalı' })
  } else if (fiyat > 999999) {
    results.push({ row: rowIndex, status: 'error', field: 'fiyat', message: 'Fiyat çok yüksek (max 999.999)' })
  }

  // ZORUNLU: Stok
  const stokStr = val('stok')
  const stok = Number(stokStr)
  if (stokStr && (isNaN(stok) || stok < 0)) {
    results.push({ row: rowIndex, status: 'error', field: 'stok', message: 'Stok negatif olamaz' })
  }

  // ZORUNLU: KDV oranı
  const kdvStr = val('kdvOrani')
  if (kdvStr) {
    const kdv = Number(kdvStr)
    if (!GECERLI_KDV_ORANLARI.includes(kdv)) {
      results.push({ row: rowIndex, status: 'error', field: 'kdvOrani', message: `KDV oranı geçersiz: ${kdvStr} (0/1/8/10/18/20 olmalı)` })
    }
  }

  // UYARI: Görsel URL
  const gorsel = val('gorsel')
  if (gorsel && !gorsel.startsWith('http')) {
    results.push({ row: rowIndex, status: 'warning', field: 'gorsel', message: 'Görsel URL geçersiz, ürün görselsiz eklenecek' })
  }

  // UYARI: Barkod format
  const barkod = val('barkod')
  if (barkod && !/^\d{8,14}$/.test(barkod)) {
    results.push({ row: rowIndex, status: 'warning', field: 'barkod', message: `Barkod formatı hatalı: ${barkod}` })
  }

  // UYARI: Açıklama uzunluğu
  const aciklama = val('aciklama')
  if (aciklama && aciklama.length > 5000) {
    results.push({ row: rowIndex, status: 'warning', field: 'aciklama', message: `Açıklama 5000 karakteri aşıyor (${aciklama.length}), kırpılacak` })
  }

  return results
}

// ─── Import Pipeline ───────────────────────────────────────────────────

export async function importPipeline(
  shopId: string,
  rows: Record<string, string>[],
  mapping: ImportColumnMapping,
  presetName?: string
): Promise<ImportValidationReport> {
  // Mevcut SKU'ları al
  const mevcutSkular = new Set<string>()
  if (adminDb) {
    const snap = await adminDb.collection('esnaflar').doc(shopId).collection('urunler').get()
    snap.docs.forEach((d: any) => { const sku = d.data().sku; if (sku) mevcutSkular.add(sku) })
  }

  const report: ImportValidationReport = {
    total: rows.length,
    success: 0,
    warnings: 0,
    errors: 0,
    rows: [],
    preview: [],
  }

  const yeniSkular = new Set<string>()

  for (let i = 0; i < rows.length; i++) {
    const row = rows[i]
    const val = (field: keyof ImportColumnMapping): string => {
      const col = mapping[field]
      return col ? (row[col] || '').trim() : ''
    }

    const allSkus = new Set([...mevcutSkular, ...yeniSkular])
    const satırHataları = validateRow(row, i + 2, mapping, allSkus) // +2: 1-indexed + header

    const errors = satırHataları.filter(r => r.status === 'error')
    const warnings = satırHataları.filter(r => r.status === 'warning')

    report.rows.push(...satırHataları)
    report.warnings += warnings.length
    report.errors += errors.length

    if (errors.length === 0) {
      report.success++
      const sku = val('sku')
      if (sku) yeniSkular.add(sku)

      // İlk 5 ürün önizleme
      if (report.preview.length < 5) {
        const fiyatStr = val('fiyat')
        const fiyat = Math.round(Number(fiyatStr?.replace(',', '.').replace(/[^\d.]/g, '') || '0') * 100)

        report.preview.push({
          ad: val('ad'),
          sku,
          fiyat,
          stok: { miktar: Number(val('stok')) || 0, takipli: true, kritikEsik: 5 },
          kdvOrani: Number(val('kdvOrani')) || 18,
          marka: val('marka') || undefined,
          aciklama: val('aciklama')?.slice(0, 200) || undefined,
        } as any)
      }
    }
  }

  return report
}

// ─── Import Commit (Onay Sonrası) ──────────────────────────────────────

export async function importCommit(
  shopId: string,
  rows: Record<string, string>[],
  mapping: ImportColumnMapping
): Promise<{ eklenen: number; atlanan: number }> {
  if (!adminDb) return { eklenen: 0, atlanan: 0 }

  let eklenen = 0
  let atlanan = 0
  const batch = adminDb.batch()
  const koleksiyonRef = adminDb.collection('esnaflar').doc(shopId).collection('urunler')

  for (const row of rows) {
    const val = (field: keyof ImportColumnMapping): string => {
      const col = mapping[field]
      return col ? (row[col] || '').trim() : ''
    }

    const ad = val('ad')
    const sku = val('sku')
    if (!ad || !sku) { atlanan++; continue }

    const fiyatStr = val('fiyat')
    const fiyatTL = Number(fiyatStr?.replace(',', '.').replace(/[^\d.]/g, '') || '0')
    const fiyatKurus = Math.round(fiyatTL * 100)

    const slug = ad.toLowerCase()
      .replace(/[ğ]/g, 'g').replace(/[ü]/g, 'u').replace(/[ş]/g, 's')
      .replace(/[ı]/g, 'i').replace(/[ö]/g, 'o').replace(/[ç]/g, 'c')
      .replace(/\s+/g, '-').replace(/[^a-z0-9-]/g, '')

    const gorselUrl = val('gorsel')
    const urun: Record<string, any> = {
      ad,
      slug: `${slug}-${sku.toLowerCase()}`,
      sku,
      fiyat: fiyatKurus,
      karsilastirmaFiyat: val('karsilastirmaFiyat') ? Math.round(Number(val('karsilastirmaFiyat').replace(',', '.')) * 100) : null,
      kdvOrani: Number(val('kdvOrani')) || 18,
      stok: {
        miktar: Number(val('stok')) || 0,
        takipli: true,
        kritikEsik: 5,
      },
      aciklama: val('aciklama')?.slice(0, 5000) || '',
      kisaAciklama: val('kisaAciklama')?.slice(0, 500) || '',
      marka: val('marka') || null,
      kategoriler: val('kategori') ? val('kategori').split(/[,>|]/).map(s => s.trim()) : [],
      gorseller: gorselUrl && gorselUrl.startsWith('http') ? [gorselUrl] : [],
      gtin: val('barkod') || null,
      kargo: {
        agirlik: val('agirlik') ? Number(val('agirlik')) : 500,
      },
      durum: 'aktif',
      olusturma: Timestamp.now(),
      guncelleme: Timestamp.now(),
    }

    const ref = koleksiyonRef.doc()
    batch.set(ref, urun)
    eklenen++

    // Firestore batch limit = 500
    if (eklenen % 450 === 0) {
      await batch.commit()
    }
  }

  if (eklenen % 450 !== 0) {
    await batch.commit()
  }

  return { eklenen, atlanan }
}

// ─── Export Pipeline ───────────────────────────────────────────────────

export type ExportTarget = 'standard' | 'woocommerce' | 'trendyol' | 'hepsiburada' | 'google_feed' | 'meta_feed'
export type ExportFormat = 'csv' | 'json'

const EXPORT_HEADERS: Record<ExportTarget, string[]> = {
  standard: ['SKU', 'Ürün Adı', 'Fiyat (TL)', 'İndirimli Fiyat (TL)', 'Stok', 'KDV %', 'Kategori', 'Marka', 'Açıklama', 'Görsel URL', 'Barkod', 'Durum'],
  woocommerce: ['SKU', 'Name', 'Regular price', 'Sale price', 'Stock', 'Tax class', 'Categories', 'Brands', 'Description', 'Images', 'GTIN', 'Published'],
  trendyol: ['Stok Kodu', 'Ürün Adı', 'Piyasa Satış Fiyatı', 'İndirimli Fiyat', 'Stok Adedi', 'KDV Oranı', 'Kategori', 'Marka', 'Ürün Açıklaması', 'Görsel 1', 'Barkod', 'Durum'],
  hepsiburada: ['MerchantSku', 'MerchantSku_ProductName', 'Price', 'DiscountedPrice', 'AvailableStock', 'VatRate', 'CategoryName', 'Brand', 'Description', 'Image1', 'Barcode', 'Status'],
  google_feed: ['id', 'title', 'price', 'sale_price', 'availability', 'tax', 'product_type', 'brand', 'description', 'image_link', 'gtin', 'condition'],
  meta_feed: ['id', 'title', 'price', 'sale_price', 'availability', 'tax', 'product_type', 'brand', 'description', 'image_link', 'gtin', 'condition'],
}

export function exportUrunlerCSV(urunler: Urun[], target: ExportTarget = 'standard'): string {
  const headers = EXPORT_HEADERS[target]

  const rows = urunler.map(u => {
    const fiyat = (u.fiyat / 100).toFixed(2)
    const karsFiyat = u.karsilastirmaFiyat ? (u.karsilastirmaFiyat / 100).toFixed(2) : ''
    const kategori = u.kategoriler?.join(' > ') || ''
    const gorsel = u.gorseller?.[0] || ''
    const stokDurum = u.stok.miktar > 0

    switch (target) {
      case 'google_feed':
      case 'meta_feed':
        return [u.id || u.sku, u.ad, `${fiyat} TRY`, karsFiyat ? `${karsFiyat} TRY` : '',
          stokDurum ? 'in stock' : 'out of stock', `TR::${u.kdvOrani}:y`, kategori,
          u.marka || '', u.kisaAciklama || u.aciklama || '', gorsel, u.gtin || '', 'new']
      case 'woocommerce':
        return [u.sku, u.ad, fiyat, karsFiyat, String(u.stok.miktar), String(u.kdvOrani),
          kategori, u.marka || '', u.aciklama || '', gorsel, u.gtin || '', u.durum === 'aktif' ? '1' : '0']
      default:
        return [u.sku, u.ad, fiyat, karsFiyat, String(u.stok.miktar), String(u.kdvOrani),
          kategori, u.marka || '', u.aciklama || '', gorsel, u.gtin || '', u.durum]
    }
  })

  const escapeCSV = (val: string) => {
    if (val.includes(',') || val.includes('"') || val.includes('\n')) {
      return `"${val.replace(/"/g, '""')}"`
    }
    return val
  }

  return [
    headers.join(','),
    ...rows.map(r => r.map(v => escapeCSV(String(v))).join(','))
  ].join('\n')
}

// ─── Toplu Stok Güncelleme ─────────────────────────────────────────────

export type StokAksiyon = 'set' | 'add' | 'subtract'

export interface StokGuncellemeSatir {
  sku: string
  quantity: number
  action: StokAksiyon
}

export async function topluStokGuncelle(
  shopId: string,
  satirlar: StokGuncellemeSatir[]
): Promise<{ basarili: number; basarisiz: number; hatalar: string[]; degisiklikler: { sku: string; onceki: number; yeni: number }[] }> {
  if (!adminDb) return { basarili: 0, basarisiz: 0, hatalar: ['DB yok'], degisiklikler: [] }

  let basarili = 0
  let basarisiz = 0
  const hatalar: string[] = []
  const degisiklikler: { sku: string; onceki: number; yeni: number }[] = []

  for (const satir of satirlar) {
    try {
      const snap = await adminDb
        .collection('esnaflar').doc(shopId)
        .collection('urunler')
        .where('sku', '==', satir.sku)
        .limit(1)
        .get()

      if (snap.empty) {
        basarisiz++
        hatalar.push(`SKU bulunamadı: ${satir.sku}`)
        continue
      }

      const doc = snap.docs[0]
      const onceki = doc.data().stok?.miktar || 0
      let yeni: number

      switch (satir.action) {
        case 'set': yeni = satir.quantity; break
        case 'add': yeni = onceki + satir.quantity; break
        case 'subtract': yeni = Math.max(0, onceki - satir.quantity); break
      }

      await doc.ref.update({
        'stok.miktar': yeni,
        guncelleme: Timestamp.now(),
      })

      degisiklikler.push({ sku: satir.sku, onceki, yeni })
      basarili++
    } catch (err: any) {
      basarisiz++
      hatalar.push(`${satir.sku}: ${err.message}`)
    }
  }

  // Güncelleme logu
  if (adminDb) {
    await adminDb.collection('esnaflar').doc(shopId)
      .collection('stokHareketleri')
      .add({
        tip: 'toplu_guncelleme',
        degisiklikler,
        basarili,
        basarisiz,
        tarih: Timestamp.now(),
      })
  }

  return { basarili, basarisiz, hatalar, degisiklikler }
}

// ─── İmport Şablon Üretici ────────────────────────────────────────────

export function importSablonCSV(preset: string = 'standard'): string {
  const mapping = COLUMN_PRESETS[preset] || COLUMN_PRESETS.standard

  const headers = Object.values(mapping).filter(Boolean)
  const ornekSatir1 = preset === 'trendyol'
    ? ['Organik Zeytinyağı 1L', 'ZYT-001', '349.90', '100', '18', 'Natürel sızma zeytinyağı', 'Gıda', 'Zeytin Bahçesi', 'https://cdn.example.com/zyt.jpg', '8690000000001', 'Yeşil', '']
    : ['Organik Zeytinyağı 1L', 'ZYT-001', '349.90', '100', '18', 'Natürel sızma zeytinyağı', 'Doğal sızma zeytinyağı', 'Gıda', 'Zeytin Bahçesi', 'https://cdn.example.com/zyt.jpg', '8690000000001', '', 'aktif']
  const ornekSatir2 = preset === 'trendyol'
    ? ['El Yapımı Sabun Seti', 'SAB-002', '149.90', '250', '18', 'Doğal sabun seti', 'Kişisel Bakım', 'Sabun Atölyesi', 'https://cdn.example.com/sab.jpg', '8690000000002', '', '']
    : ['El Yapımı Sabun Seti', 'SAB-002', '149.90', '250', '18', 'Doğal sabun seti 3lü', 'Lavanta kokulu sabun seti', 'Kişisel Bakım', 'Sabun Atölyesi', 'https://cdn.example.com/sab.jpg', '8690000000002', '', 'aktif']

  return [headers.join(','), ornekSatir1.join(','), ornekSatir2.join(',')].join('\n')
}
