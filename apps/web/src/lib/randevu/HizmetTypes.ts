/**
 * HizmetTypes.ts — Hizmet Kataloğu Tip Sistemi
 * ══════════════════════════════════════════════════════════════════════
 * Esnafın sunduğu hizmetler: süre, fiyat, kapora oranı, kapasite.
 */

import { z } from 'zod'

// ═══ HİZMET KATEGORİLERİ ═══════════════════════════════════════════════

export const HIZMET_KATEGORILERI = [
    'sac', 'cilt', 'tirnak', 'epilasyon', 'masaj', 'makyaj',
    'tesisat', 'elektrik', 'boya', 'temizlik', 'tadilat',
    'diger',
] as const
export type HizmetKategori = (typeof HIZMET_KATEGORILERI)[number]

// ═══ HİZMET ZOD ŞEMASİ ═════════════════════════════════════════════════

export const hizmetSema = z.object({
    hizmetId: z.string(),
    esnafId: z.string(),

    ad: z.string().min(2),                       // "Saç Kesimi"
    kategori: z.enum(HIZMET_KATEGORILERI),
    aciklama: z.string().optional(),

    // Süre & Fiyat
    sure_dakika: z.number().int().min(5).max(480), // 5dk - 8 saat
    fiyat_TL: z.number().positive(),
    indirimli_fiyat_TL: z.number().positive().optional(),

    // Kapora
    kapora_zorunlu: z.boolean().default(true),
    kapora_oran_yuzde: z.number().min(0).max(100).default(25), // %25 varsayılan
    kapora_min_TL: z.number().nonnegative().default(50),       // En az 50 TL

    // Kapasite
    es_zamanli_kapasite: z.number().int().min(1).default(1), // Kaç müşteri paralel (koltuk/masa)

    // Durum
    aktif: z.boolean().default(true),
    sira: z.number().int().nonnegative().default(0),

    // Upsell
    upsell_hizmet_id: z.string().optional(),     // Çapraz satış: "Keratin Bakım" öner
    upsell_mesaj: z.string().optional(),          // "Gelmişken %15 indirimle ekleyelim mi?"

    olusturma_tarihi: z.any(),
})

export type Hizmet = z.infer<typeof hizmetSema>

// ═══ ÇALIŞMA SAATLERİ ŞEMASİ ═══════════════════════════════════════════

export const GUN_ADLARI = [
    'pazartesi', 'sali', 'carsamba', 'persembe', 'cuma', 'cumartesi', 'pazar',
] as const
export type GunAdi = (typeof GUN_ADLARI)[number]

export const calismaSaatiSema = z.object({
    gun: z.enum(GUN_ADLARI),
    acik: z.boolean().default(true),
    baslangic: z.string().regex(/^\d{2}:\d{2}$/), // "09:00"
    bitis: z.string().regex(/^\d{2}:\d{2}$/),     // "19:00"
    mola_baslangic: z.string().regex(/^\d{2}:\d{2}$/).optional(), // "12:00"
    mola_bitis: z.string().regex(/^\d{2}:\d{2}$/).optional(),     // "13:00"
})

export type CalismaSaati = z.infer<typeof calismaSaatiSema>

export const calismaTablosuSema = z.object({
    esnafId: z.string(),
    saatler: z.array(calismaSaatiSema),
    ozel_tatil_gunleri: z.array(z.string()).default([]), // "2026-04-23" formatında
})

export type CalismaTakvimi = z.infer<typeof calismaTablosuSema>

// ═══ KAPORA HESAPLAMA ═══════════════════════════════════════════════════

/** Hizmet fiyatına göre kapora tutarını hesapla */
export function kaporaHesapla(hizmet: Hizmet): number {
    if (!hizmet.kapora_zorunlu) return 0
    const yuzdelikTutar = Math.round(hizmet.fiyat_TL * hizmet.kapora_oran_yuzde / 100)
    return Math.max(yuzdelikTutar, hizmet.kapora_min_TL)
}

/** Dakikayı "1 saat 30 dk" formatına çevir */
export function sureFormatla(dakika: number): string {
    if (dakika < 60) return `${dakika} dk`
    const saat = Math.floor(dakika / 60)
    const kalan = dakika % 60
    if (kalan === 0) return `${saat} saat`
    return `${saat} saat ${kalan} dk`
}
