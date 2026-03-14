/**
 * b2bTipler.ts — B2B Tedarik Ağı Zod Şemaları
 */

import { z } from 'zod'

// ═══ REÇETE (BOM) ════════════════════════════════════════════════════════

export const receteMalzemeSema = z.object({
    stokId: z.string().min(1),
    malzemeAdi: z.string().min(1).max(200),
    miktar: z.number().positive(),   // Örn: 150 (gram)
    birim: z.string().max(20),       // 'gr', 'ml', 'adet', 'kg'
})

export type ReceteMalzeme = z.infer<typeof receteMalzemeSema>

export const receteSema = z.object({
    menuItemId: z.string().min(1),
    menuItemAdi: z.string().min(1).max(200),
    malzemeler: z.array(receteMalzemeSema).min(1).max(50),
})

export type Recete = z.infer<typeof receteSema>

// ═══ B2B KATALOG ═════════════════════════════════════════════════════════

export const b2bKatalogSema = z.object({
    urunAdi: z.string().min(1).max(200),
    kategori: z.string().max(100),
    birimFiyatKurus: z.number().int().nonnegative(),
    birim: z.string().max(20),       // 'kg', 'adet', 'litre'
    minSiparisMiktari: z.number().positive().default(1),
    stokDurumu: z.enum(['var', 'sinirli', 'yok']).default('var'),
    aktif: z.boolean().default(true),
})

export type B2BKatalog = z.infer<typeof b2bKatalogSema>

// ═══ B2B SİPARİŞ ═════════════════════════════════════════════════════════

export const b2bSiparisDurumlari = [
    'bekliyor', 'onaylandi', 'hazirlaniyor', 'yola_cikti', 'teslim_edildi', 'iptal',
] as const

export type B2BSiparisDurum = (typeof b2bSiparisDurumlari)[number]

export const b2bSiparisSema = z.object({
    aliciEsnafId: z.string().min(10).max(50),
    saticiEsnafId: z.string().min(10).max(50),
    kalemler: z.array(z.object({
        b2bKatalogId: z.string(),
        urunAdi: z.string().min(1).max(200),
        miktar: z.number().positive(),
        birim: z.string().max(20),
        birimFiyatKurus: z.number().int().nonnegative(),
        toplamKurus: z.number().int().nonnegative(),
    })).min(1),
    toplamKurus: z.number().int().nonnegative(),
    durum: z.enum(b2bSiparisDurumlari).default('bekliyor'),
    notlar: z.string().max(500).optional(),
})

export type B2BSiparis = z.infer<typeof b2bSiparisSema>

// ═══ TEDARİK ALARMI (Cloud Tasks) ═══════════════════════════════════════

export const tedarikAlarmSema = z.object({
    esnafId: z.string().min(10).max(50),
    stokId: z.string().min(1),
    malzemeAdi: z.string().min(1).max(200),
    mevcutMiktar: z.number(),
    kritikEsik: z.number(),
    birim: z.string().max(20),
    tetikZamani: z.string(), // ISO date
})

export type TedarikAlarm = z.infer<typeof tedarikAlarmSema>

// ═══ CARİ HAREKET ════════════════════════════════════════════════════════

export const cariHareketSema = z.object({
    esnafId: z.string().min(10).max(50),  // Hesap sahibi
    karsiEsnafId: z.string().min(10).max(50),
    tip: z.enum(['borc', 'alacak']),
    tutarKurus: z.number().int().positive(),
    aciklama: z.string().max(500),
    referansSiparisId: z.string().optional(),
    tarih: z.any(), // Timestamp
})

export type CariHareket = z.infer<typeof cariHareketSema>

// ═══ TEDARİKÇİ SONUÇ ════════════════════════════════════════════════════

export const tedarikciSonucSema = z.object({
    esnafId: z.string(),
    isletmeAdi: z.string(),
    mesafeKm: z.number().nonnegative(),
    birimFiyatKurus: z.number().int().nonnegative(),
    birim: z.string(),
    puan: z.number().min(0).max(5),
    skor: z.number(), // Composite score (düşük = iyi)
    stokDurumu: z.enum(['var', 'sinirli', 'yok']),
})

export type TedarikciSonuc = z.infer<typeof tedarikciSonucSema>

// ═══ SİPARİŞ ONAY ═══════════════════════════════════════════════════════

export const b2bSiparisOnaySema = z.object({
    aliciEsnafId: z.string().min(10).max(50),
    saticiEsnafId: z.string().min(10).max(50),
    kalemler: z.array(z.object({
        b2bKatalogId: z.string(),
        urunAdi: z.string(),
        miktar: z.number().positive(),
        birim: z.string(),
        birimFiyatKurus: z.number().int().nonnegative(),
    })).min(1),
    toplamKurus: z.number().int().positive(),
})

export type B2BSiparisOnay = z.infer<typeof b2bSiparisOnaySema>
