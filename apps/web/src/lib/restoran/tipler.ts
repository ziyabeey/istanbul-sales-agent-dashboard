/**
 * tipler.ts — Restoran İşletim Sistemi Zod Şemaları
 *
 * Tüm veri yapılarının tek kaynağı (Single Source of Truth).
 * Firestore, API ve frontend aynı tipleri kullanır.
 */

import { z } from 'zod'

// ═══ MENÜ ════════════════════════════════════════════════════════════════════

export const KDV_ORANLARI = {
    gida: 1,       // %1 — temel gıda
    icecek: 10,    // %10 — meşrubat, çay, kahve
    alkol: 20,     // %20 — alkollü içecek
} as const

export type KdvTipi = keyof typeof KDV_ORANLARI

export const menuKategorileri = [
    'baslangiclar', 'ana_yemekler', 'izgara', 'kebap',
    'pizza', 'makarna', 'salata', 'corba',
    'tatli', 'icecekler', 'sicak_icecekler', 'alkol',
    'kahvalti', 'sandvic', 'yan_urunler', 'diger',
] as const

export type MenuKategori = (typeof menuKategorileri)[number]

export const menuItemSema = z.object({
    ad: z.string().min(2).max(200),
    aciklama: z.string().max(500).optional(),
    fiyatKurus: z.number().int().nonnegative(),
    kategori: z.enum(menuKategorileri),
    gorselUrl: z.string().url().optional().nullable(),
    kdvTipi: z.enum(['gida', 'icecek', 'alkol']).default('gida'),
    aktif: z.boolean().default(true),
    spikeFlags: z.object({
        vegan: z.boolean().default(false),
        glutensiz: z.boolean().default(false),
        acili: z.boolean().default(false),
    }).optional(),
})

export type MenuItem = z.infer<typeof menuItemSema>

export const menuBatchSema = z.object({
    esnafId: z.string().min(10).max(50),
    items: z.array(menuItemSema).min(1).max(500),
})

// ═══ MASA ════════════════════════════════════════════════════════════════════

export const masaSema = z.object({
    no: z.number().int().min(1).max(999),
    qrLink: z.string().url(),
    aktif: z.boolean().default(true),
    bolge: z.string().max(50).optional(), // 'İç Salon', 'Bahçe', 'Teras'
})

export type Masa = z.infer<typeof masaSema>

export const masaOlusturSema = z.object({
    esnafId: z.string().min(10).max(50),
    masaSayisi: z.number().int().min(1).max(200),
    domain: z.string().min(3).max(100),
    bolgeler: z.array(z.string().max(50)).optional(),
})

export type MasaOlusturInput = z.infer<typeof masaOlusturSema>

// ═══ ADİSYON (Sipariş Kartı) ════════════════════════════════════════════════

export const adisyonKaynakTipleri = [
    'masa', 'yemeksepeti', 'trendyol', 'getir', 'paket', 'telefon',
] as const

export type AdisyonKaynak = (typeof adisyonKaynakTipleri)[number]

// Eski durumlar (backward compat) + Alman Usulü yeni durumlar
export const adisyonDurumlari = [
    'yeni', 'hazirlaniyor', 'teslim_edildi', 'odendi', 'iptal',
    // ── Alman Usulü (Ödeme Önce) Durum Makinesi ──
    'odendi_mutfak_bekliyor',   // Müşteri ödedi → Mutfağa düştü
    'mutfakta_hazirlaniyor',    // Aşçı hazırlamaya başladı
    'barda_garson_bekliyor',    // Mutfak bitti → Tezgaha çıktı → Garson al
    'masaya_teslim_edildi',     // Garson masaya bıraktı → Arşiv
] as const

export type AdisyonDurum = (typeof adisyonDurumlari)[number]

// Alman Usulü State Machine geçiş sırası
export const ALMAN_USULU_GECISLER: Record<string, AdisyonDurum | null> = {
    odendi_mutfak_bekliyor: 'mutfakta_hazirlaniyor',
    mutfakta_hazirlaniyor: 'barda_garson_bekliyor',
    barda_garson_bekliyor: 'masaya_teslim_edildi',
    masaya_teslim_edildi: null, // Terminal durum
}

export const adisyonKalemSema = z.object({
    menuItemId: z.string(),
    ad: z.string().min(1).max(200),
    adet: z.number().int().min(1).max(99),
    birimFiyatKurus: z.number().int().nonnegative(),
    toplamKurus: z.number().int().nonnegative(),
    kdvTipi: z.enum(['gida', 'icecek', 'alkol']).default('gida'),
    notlar: z.string().max(200).optional(),
})

export type AdisyonKalem = z.infer<typeof adisyonKalemSema>

export const adisyonSema = z.object({
    esnafId: z.string().min(10).max(50),
    masaNo: z.number().int().min(0).max(999).optional(), // 0 = paket
    kaynak: z.enum(adisyonKaynakTipleri),
    durum: z.enum(adisyonDurumlari).default('yeni'),
    kalemler: z.array(adisyonKalemSema).min(1).max(100),
    toplamKurus: z.number().int().nonnegative(),
    kdvToplamKurus: z.number().int().nonnegative(),
    notlar: z.string().max(500).optional(),
    musteriAd: z.string().max(100).optional(),
    musteriTel: z.string().max(20).optional(),
    disPlatform: z.object({
        platformSiparisId: z.string(),
        platform: z.string(),
    }).optional(),

    // ── Alman Usulü Zaman Damgaları (serverTimestamp) ──
    siparis_ani: z.any().optional(),            // Ödeme başarılı → mutfağa düştü
    mutfak_baslama_ani: z.any().optional(),     // Aşçı "Hazırlanıyor" yaptı
    mutfak_bitis_ani: z.any().optional(),       // Aşçı "Hazır" dedi
    garson_teslim_ani: z.any().optional(),      // Garson "Teslim Ettim" dedi

    // ── Personel Atama ──
    atanan_asci_id: z.string().max(50).optional(),
    atanan_garson_id: z.string().max(50).optional(),

    // ── Ödeme Bilgisi ──
    iyzico_payment_id: z.string().optional(),
    odeme_tipi: z.enum(['iyzico', 'nakit', 'kart', 'diger']).optional(),

    olusturma: z.any(), // Firestore Timestamp
    guncelleme: z.any().optional(),
})

export type Adisyon = z.infer<typeof adisyonSema>

// ═══ WEBHOOK NORMALIZE (Adapter Pattern) ═════════════════════════════════════

export const kepenkOrderSema = z.object({
    platformSiparisId: z.string().min(1),
    platform: z.enum(['yemeksepeti', 'trendyol', 'getir']),
    esnafId: z.string().min(10).max(50),
    musteriAd: z.string().max(100).optional(),
    musteriTel: z.string().max(20).optional(),
    adres: z.string().max(500).optional(),
    kalemler: z.array(z.object({
        ad: z.string().min(1).max(200),
        adet: z.number().int().min(1),
        birimFiyatKurus: z.number().int().nonnegative(),
        notlar: z.string().max(200).optional(),
    })).min(1),
    toplamKurus: z.number().int().nonnegative(),
    odemeTipi: z.enum(['online', 'kapida_nakit', 'kapida_kart']).optional(),
    notlar: z.string().max(500).optional(),
})

export type KepenkOrder = z.infer<typeof kepenkOrderSema>

// ═══ PARAŞÜT E-FATURA ═══════════════════════════════════════════════════════

export const parasutFaturaSema = z.object({
    adisyonId: z.string(),
    esnafId: z.string(),
    toplamKurus: z.number().int(),
    kdvDetay: z.array(z.object({
        oran: z.number(), // 1, 10, 20
        matrahKurus: z.number().int(),
        kdvKurus: z.number().int(),
    })),
    kalemler: z.array(z.object({
        ad: z.string(),
        adet: z.number().int(),
        birimFiyatKurus: z.number().int(),
        kdvOrani: z.number(),
    })),
    tarih: z.string(), // ISO date
})

export type ParasutFatura = z.infer<typeof parasutFaturaSema>

// ═══ QR Sipariş Formu (Müşteri tarafı) ══════════════════════════════════════

export const qrSiparisSema = z.object({
    esnafId: z.string().min(10).max(50),
    masaNo: z.number().int().min(1).max(999),
    kalemler: z.array(z.object({
        menuItemId: z.string(),
        ad: z.string().min(1).max(200),
        adet: z.number().int().min(1).max(20),
        birimFiyatKurus: z.number().int().nonnegative(),
        kdvTipi: z.enum(['gida', 'icecek', 'alkol']).default('gida'),
        notlar: z.string().max(200).optional(),
    })).min(1).max(50),
    notlar: z.string().max(500).optional(),
})

export type QrSiparisInput = z.infer<typeof qrSiparisSema>

// ═══ PERSONEL KPI TİPLERİ ═══════════════════════════════════════════════════

export const personelKpiSema = z.object({
    personelId: z.string().min(1).max(50),
    personelAdi: z.string().min(1).max(100),
    rol: z.enum(['asci', 'garson']),
    tarih: z.string(), // YYYY-MM-DD
    toplamSiparis: z.number().int().nonnegative(),
    ortSureSaniye: z.number().nonnegative(),
    slaBasariOrani: z.number().min(0).max(100), // yüzde
    toplamPuan: z.number().int(),
    enHizliSaniye: z.number().nonnegative(),
    enYavasSaniye: z.number().nonnegative(),
})

export type PersonelKpi = z.infer<typeof personelKpiSema>

// SLA Hedefleri (saniye)
export const SLA_HEDEFLERI = {
    mutfak_sure_saniye: 12 * 60,    // 12 dakika
    garson_sure_saniye: 3 * 60,     // 3 dakika
    puan_baslangic: 10,             // SLA tutarsa +10
    sapma_cezasi_dk: -2,            // Her 1dk sapma -2
} as const

