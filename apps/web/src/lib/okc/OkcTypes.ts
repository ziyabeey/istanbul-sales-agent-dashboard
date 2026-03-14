/**
 * OkcTypes.ts — ÖKC (Yeni Nesil Yazar Kasa) Donanım Köprüsü
 *
 * VUK uyumlu fiş kesimi için cloud → fiziksel kasa entegrasyonu.
 * Faz 1: ESC/POS termal yazıcı desteği
 * Faz 2: Kepenk Bridge (RPi) ile ÖKC entegrasyonu
 * Faz 3: SDK ortaklığı (Hugin/Ingenico API)
 */

import { z } from 'zod'

// ── KDV Oranları (Türkiye) ───────────────────────────────────────

export const KdvOrani = z.enum(['0', '1', '8', '10', '20'])
export type KdvOrani = z.infer<typeof KdvOrani>

// ── Fiş Kalemi ───────────────────────────────────────────────────

export const FisKalemi = z.object({
  ad: z.string(),
  miktar: z.number().positive(),
  birimFiyat: z.number().nonnegative(),    // kuruş
  kdvOrani: KdvOrani,
  indirim: z.number().nonnegative().default(0), // kuruş
  barkod: z.string().optional(),
})
export type FisKalemi = z.infer<typeof FisKalemi>

// ── Fiş Kesim Talebi ────────────────────────────────────────────

export const OdemeTuru = z.enum(['nakit', 'kart', 'havale', 'qr', 'coklu'])

export const FisKesimTalebi = z.object({
  id: z.string(),
  siparisId: z.string(),
  shopId: z.string(),
  kalemler: z.array(FisKalemi).min(1),
  odemeTuru: OdemeTuru,
  toplamTutar: z.number().positive(),      // kuruş (KDV dahil)
  araToplam: z.number().nonnegative(),     // kuruş (KDV hariç)
  kdvToplam: z.number().nonnegative(),     // kuruş
  musteriVKN: z.string().optional(),       // kurumsal fatura
  musteriTCKN: z.string().optional(),
  aciklama: z.string().optional(),
  olusturmaTarihi: z.any(),
  durum: z.enum(['beklemede', 'gonderildi', 'basildi', 'hata']),
  hataMesaji: z.string().optional(),
})
export type FisKesimTalebi = z.infer<typeof FisKesimTalebi>

// ── ÖKC Cihaz Kaydı ─────────────────────────────────────────────

export const OkcBaglantiTuru = z.enum(['usb', 'rs232', 'bluetooth', 'network', 'cloud_print'])

export const OkcCihaz = z.object({
  id: z.string(),
  shopId: z.string(),
  marka: z.enum(['beko', 'hugin', 'ingenico', 'profilo', 'termal_yazici', 'custom']),
  model: z.string(),
  seriNo: z.string(),
  baglantiTuru: OkcBaglantiTuru,
  durum: z.enum(['aktif', 'bakim', 'cevrimdisi']),
  sonFisTarihi: z.any().optional(),
  sonFisNo: z.number().optional(),
  gunlukFisSayisi: z.number().default(0),
  bridgeId: z.string().optional(),         // Kepenk Bridge cihaz ID
  ipAdresi: z.string().optional(),         // network bağlantı
  kayitTarihi: z.any(),
})
export type OkcCihaz = z.infer<typeof OkcCihaz>

// ── Bridge Durumu ────────────────────────────────────────────────

export const BridgeDurum = z.object({
  bridgeId: z.string(),
  shopId: z.string(),
  cihazSeriNo: z.string(),
  online: z.boolean(),
  sonSinyal: z.any(),
  firmware: z.string(),
  wifiKalitesi: z.number().optional(),     // %
  sonHata: z.string().optional(),
})
export type BridgeDurum = z.infer<typeof BridgeDurum>
