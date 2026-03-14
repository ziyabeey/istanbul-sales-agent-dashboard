/**
 * RandevuTypes.ts — Randevu Yaşam Döngüsü Tip Sistemi
 * ══════════════════════════════════════════════════════════════════════
 * Randevu durum makinesi, kapora takibi, no-show yönetimi.
 */

import { z } from 'zod'

// ═══ RANDEVU DURUM MAKİNESİ ═════════════════════════════════════════════

export const RANDEVU_DURUMLARI = [
    'kapora_bekleniyor',  // Saat kilitli, 15dk TTL
    'onaylandi',          // Kapora alındı, randevu kesin
    'tamamlandi',         // Hizmet verildi
    'iptal_musteri',      // Müşteri iptal etti (kapora politikasına tabi)
    'iptal_esnaf',        // Esnaf iptal (tam iade)
    'no_show',            // Müşteri gelmedi → kapora yanık
    'suresi_doldu',       // 15dk ödeme olmadı → otomatik silme
] as const

export type RandevuDurum = (typeof RANDEVU_DURUMLARI)[number]

/** Geçerli durum geçişleri */
export const RANDEVU_GECISLERI: Record<RandevuDurum, RandevuDurum[]> = {
    kapora_bekleniyor: ['onaylandi', 'suresi_doldu', 'iptal_musteri', 'iptal_esnaf'],
    onaylandi: ['tamamlandi', 'iptal_musteri', 'iptal_esnaf', 'no_show'],
    tamamlandi: [],
    iptal_musteri: [],
    iptal_esnaf: [],
    no_show: [],
    suresi_doldu: [],
}

/** Durum UI renkleri */
export const RANDEVU_RENKLERI: Record<RandevuDurum, { bg: string; text: string; label: string; border: string }> = {
    kapora_bekleniyor: { bg: 'bg-amber-500/20', text: 'text-amber-400', label: 'Ödeme Bekleniyor', border: 'border-amber-500/50' },
    onaylandi: { bg: 'bg-emerald-500/20', text: 'text-emerald-400', label: 'Onaylandı', border: 'border-emerald-500/50' },
    tamamlandi: { bg: 'bg-blue-500/20', text: 'text-blue-400', label: 'Tamamlandı', border: 'border-blue-500/50' },
    iptal_musteri: { bg: 'bg-neutral-500/20', text: 'text-neutral-400', label: 'İptal (Müşteri)', border: 'border-neutral-500/50' },
    iptal_esnaf: { bg: 'bg-neutral-500/20', text: 'text-neutral-400', label: 'İptal (Esnaf)', border: 'border-neutral-500/50' },
    no_show: { bg: 'bg-rose-500/20', text: 'text-rose-400', label: 'Gelmedi (No-Show)', border: 'border-rose-500/50' },
    suresi_doldu: { bg: 'bg-neutral-700/20', text: 'text-neutral-500', label: 'Süresi Doldu', border: 'border-neutral-700/50' },
}

// ═══ KAPORA DURUMU ══════════════════════════════════════════════════════

export const KAPORA_DURUMLARI = [
    'bekleniyor', 'odendi', 'iade_edildi', 'yanik', // yanik = no-show cayma bedeli
] as const
export type KaporaDurum = (typeof KAPORA_DURUMLARI)[number]

// ═══ ANA RANDEVU ZOD ŞEMASİ ════════════════════════════════════════════

export const randevuSema = z.object({
    randevuId: z.string(),
    esnafId: z.string(),

    // Müşteri
    musteri_ad: z.string().min(2),
    musteri_telefon: z.string().min(10),
    musteri_email: z.string().email().optional(),
    kaynak: z.enum(['whatsapp', 'website', 'telefon', 'yuruyus']).default('website'),

    // Hizmet
    hizmet_id: z.string(),
    hizmet_adi: z.string(),
    hizmet_suresi_dk: z.number().int().positive(),
    personel_id: z.string().optional(),    // Atanan personel (kuaför, usta)
    personel_adi: z.string().optional(),

    // Zaman
    tarih: z.string().regex(/^\d{4}-\d{2}-\d{2}$/),    // "2026-03-15"
    baslangic_saat: z.string().regex(/^\d{2}:\d{2}$/),  // "14:00"
    bitis_saat: z.string().regex(/^\d{2}:\d{2}$/),      // "14:45"

    // Durum
    durum: z.enum(RANDEVU_DURUMLARI).default('kapora_bekleniyor'),

    // Kapora
    kapora: z.object({
        tutar_TL: z.number().nonnegative(),
        durum: z.enum(KAPORA_DURUMLARI).default('bekleniyor'),
        iyzico_link: z.string().url().optional(),
        iyzico_token: z.string().optional(),
        odeme_tarihi: z.any().optional(),      // Timestamp
        iade_tarihi: z.any().optional(),
    }),

    // Fiyat
    toplam_fiyat_TL: z.number().positive(),
    kalan_bakiye_TL: z.number().nonnegative(), // toplam - kapora

    // Kilit TTL
    kilit_bitis: z.any(),       // Timestamp — 15dk sonra (kapora_bekleniyor için)
    kilit_aktif: z.boolean().default(true),

    // Zaman Damgaları
    olusturma_tarihi: z.any(),
    son_guncelleme: z.any(),
    onay_tarihi: z.any().optional(),

    // Notlar
    musteri_notu: z.string().optional(),
    esnaf_notu: z.string().optional(),

    // Hatırlatıcı
    hatirlatici_gonderildi: z.boolean().default(false),
    upsell_teklif_gonderildi: z.boolean().default(false),
})

export type Randevu = z.infer<typeof randevuSema>

// ═══ TAKVİM SLOT TİPİ ══════════════════════════════════════════════════

export interface TakvimSlot {
    saat: string            // "14:00"
    musait: boolean
    mevcut_randevu: number  // Bu slottaki aktif randevu sayısı
    kapasite: number        // Maksimum paralel randevu
    kilitli: boolean        // Kapora bekliyor (suspend)
}

export interface GunlukTakvim {
    tarih: string           // "2026-03-15"
    gun_adi: string         // "Cuma"
    acik: boolean
    slotlar: TakvimSlot[]
}

// ═══ YARDIMCI FONKSİYONLAR ═════════════════════════════════════════════

/** Durum geçişi geçerli mi */
export function randevuGecisGecerliMi(mevcut: RandevuDurum, yeni: RandevuDurum): boolean {
    return RANDEVU_GECISLERI[mevcut]?.includes(yeni) ?? false
}

/** Saat dizesini dakikaya çevir ("14:30" → 870) */
export function saateDakika(saat: string): number {
    const [h, m] = saat.split(':').map(Number)
    return h * 60 + m
}

/** Dakikayı saat dizesine çevir (870 → "14:30") */
export function dakikadanSaat(dakika: number): string {
    const h = Math.floor(dakika / 60)
    const m = dakika % 60
    return `${h.toString().padStart(2, '0')}:${m.toString().padStart(2, '0')}`
}

/** Bitiş saatini hesapla ("14:00" + 45dk → "14:45") */
export function bitisSaatiHesapla(baslangic: string, sureDk: number): string {
    return dakikadanSaat(saateDakika(baslangic) + sureDk)
}

/** İki saat aralığı çakışıyor mu? */
export function saatlerCakisiyorMu(
    bas1: string, bit1: string,
    bas2: string, bit2: string
): boolean {
    const s1 = saateDakika(bas1), e1 = saateDakika(bit1)
    const s2 = saateDakika(bas2), e2 = saateDakika(bit2)
    return s1 < e2 && s2 < e1
}
