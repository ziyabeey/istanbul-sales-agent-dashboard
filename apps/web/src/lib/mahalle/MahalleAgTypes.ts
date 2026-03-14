/**
 * MahalleAgTypes.ts — B2C Mahalle Ağı & Çapraz Pazarlama Ekosistemi
 *
 * kepenk.ai kullanan yakın işletmelerin birbirine müşteri
 * yönlendirmesini, ortak kampanya oluşturmasını ve mahalle
 * puan sistemi ile network effect yaratmasını sağlar.
 */

import { z } from 'zod'

// ── Mahalle Ağı ──────────────────────────────────────────────────

export const MahalleAg = z.object({
  id: z.string(),
  ad: z.string(),                          // "Kadıköy Moda Caddesi Ağı"
  bolge: z.object({
    il: z.string(),
    ilce: z.string(),
    mahalle: z.string(),
  }),
  uyeIsletmeler: z.array(z.string()),       // shopId[]
  olusturanShopId: z.string(),
  aktif: z.boolean().default(true),
  olusturmaTarihi: z.any(),
  puanKurali: z.object({
    kazanimOrani: z.number().default(5),     // her 100₺ alışverişte 5 puan
    minHarcamaTL: z.number().default(50),    // minimum harcama (TL)
    maxGunlukPuan: z.number().default(50),   // günlük üst limit
  }),
})
export type MahalleAg = z.infer<typeof MahalleAg>

// ── Çapraz Kampanya ──────────────────────────────────────────────

export const KampanyaTuru = z.enum([
  'puan_kazan',        // A'da harca → puan kazan → B'de harca
  'indirim_paylas',    // A'da alışveriş → B'de %10 indirim
  'ortak_paket',       // A saç kesimi + B kahve = kombo fiyat
])

export const CaprazKampanya = z.object({
  id: z.string(),
  agId: z.string(),
  kaynakShopId: z.string(),                 // kampanyayı oluşturan
  hedefShopIds: z.array(z.string()),        // geçerli olan yerler
  kampanyaTuru: KampanyaTuru,
  ad: z.string(),                           // "Saç kesiminde yan kafede %10!"
  aciklama: z.string(),
  indirimOrani: z.number().optional(),      // %5, %10
  puanMiktari: z.number().optional(),
  baslangic: z.any(),
  bitis: z.any(),
  kosul: z.string().optional(),             // "min 100₺ alışveriş"
  durum: z.enum(['taslak', 'aktif', 'bitti', 'iptal']),
  kullanimSayisi: z.number().default(0),
  olusturmaTarihi: z.any(),
})
export type CaprazKampanya = z.infer<typeof CaprazKampanya>

// ── Müşteri Mahalle Cüzdanı ──────────────────────────────────────

export const CuzdanIslem = z.object({
  tarih: z.any(),
  shopId: z.string(),
  shopAd: z.string(),
  tip: z.enum(['kazanim', 'harcama']),
  miktar: z.number(),
  aciklama: z.string(),
  kampanyaId: z.string().optional(),
})

export const MusteriMahalleCuzdani = z.object({
  musteriTelefon: z.string(),
  agId: z.string(),
  bakiye: z.number().default(0),            // puan
  toplamKazanim: z.number().default(0),
  toplamHarcama: z.number().default(0),
  islemGecmisi: z.array(CuzdanIslem).default([]),
  olusturmaTarihi: z.any(),
})
export type MusteriMahalleCuzdani = z.infer<typeof MusteriMahalleCuzdani>

// ── Davet Sistemi ────────────────────────────────────────────────

export const AgDavet = z.object({
  id: z.string(),
  agId: z.string(),
  davetEdenShopId: z.string(),
  davetEdilenShopId: z.string(),
  durum: z.enum(['beklemede', 'kabul', 'red']),
  gonderimTarihi: z.any(),
  yanitTarihi: z.any().optional(),
})
export type AgDavet = z.infer<typeof AgDavet>
