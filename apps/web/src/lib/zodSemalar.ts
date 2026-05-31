/**
 * zodSemalar.ts — API Route Zod Şemaları
 * ─────────────────────────────────────────────────────────────────────────────
 * Kritik API endpoint'leri için strict input validation.
 * Gelen payload şemaya uymazsa → 400 Bad Request + hata detayı
 * ─────────────────────────────────────────────────────────────────────────────
 */

import { z } from 'zod'

// ═══ YARDIMCI ═══════════════════════════════════════════════════════════════

// Türk telefon numarası: +905xxxxxxxxx veya 05xxxxxxxxx
const turkTelefon = z.string().regex(
    /^(\+?90|0)?5\d{9}$/,
    'Geçersiz Türk telefon numarası'
)

// Güvenli metin — XSS koruması
const guvenliMetin = z.string()
    .max(5000, 'Metin çok uzun (max 5000 karakter)')
    .refine(val => !/<script|javascript:|on\w+=/i.test(val), {
        message: 'Güvenlik ihlali: script enjeksiyonu tespit edildi',
    })

// Paket tipi
const paketTipi = z.enum(['TEMEL', 'STANDART', 'BUYUME', 'PREMIUM', 'PREMIUMPLUS'])

// ═══ ONBOARDING ═════════════════════════════════════════════════════════════

export const onboardingSema = z.object({
    isletmeAdi: z.string().min(2, 'İşletme adı en az 2 karakter').max(100),
    sektor: z.string().min(2).max(50),
    telefon: turkTelefon,
    ad: z.string().min(2, 'Ad en az 2 karakter').max(50),
    soyad: z.string().min(2).max(50).optional(),
    ilce: z.string().min(2).max(50),
    sehir: z.string().min(2).max(50).default('İstanbul'),
    email: z.string().email('Geçersiz e-posta').optional(),
    paket: paketTipi.default('TEMEL'),
    hizmetler: z.array(z.string().max(100)).max(20).optional(),
})

export type OnboardingInput = z.infer<typeof onboardingSema>

// ═══ SITE GÜNCELLEME ════════════════════════════════════════════════════════

export const siteGuncelleSema = z.object({
    esnafId: z.string().min(10, 'Geçersiz esnafId').max(50),
    bloklar: z.array(z.object({
        id: z.string().min(1).max(30),
        gorunur: z.boolean(),
    })).max(30).optional(),
    temaId: z.string().max(50).optional(),
    paletId: z.string().max(50).optional(),
    prompt: guvenliMetin.optional(),
    siteData: z.record(z.string(), z.any()).optional(),
})

export type SiteGuncelleInput = z.infer<typeof siteGuncelleSema>

// ═══ AI REWRITE ═════════════════════════════════════════════════════════════

export const aiRewriteSema = z.object({
    metin: guvenliMetin.min(5, 'Metin en az 5 karakter'),
    stil: z.enum(['ikna_edici', 'kurumsal', 'kisa', 'samimi', 'esprili']),
})

export type AiRewriteInput = z.infer<typeof aiRewriteSema>

// ═══ WEBHOOK PAYLOADS ═══════════════════════════════════════════════════════

export const webhookTwilioSema = z.object({
    Body: z.string().max(4096).optional().default(''),
    From: z.string().min(5, 'Geçersiz telefon'),
    NumMedia: z.string().optional().default('0'),
    MediaUrl0: z.string().url().optional(),
    MediaContentType0: z.string().optional(),
    MessageSid: z.string().min(10).optional(),
})

export const webhookIyzicoSema = z.object({
    token: z.string().min(10),
    status: z.enum(['success', 'failure']),
    paymentId: z.string().min(5),
    conversationId: z.string().optional(),
    price: z.number().positive().optional(),
})

// ═══ AJAN İSTEĞİ ═══════════════════════════════════════════════════════════

export const ajanIstekSema = z.object({
    esnafId: z.string().min(10).max(50).optional(),
    mesaj: guvenliMetin.min(1),
    meta: z.record(z.string(), z.any()).optional(),
})

// ═══ SİPARİŞ OLUŞTURMA ═════════════════════════════════════════════════════

const siparisItemSema = z.object({
    urunId: z.string().min(1, 'urunId zorunlu').max(50),
    ad: z.string().min(1).max(200),
    adet: z.number().int().positive('Adet 0\'dan büyük olmalı'),
    birimFiyat: z.number().nonnegative(),
    toplamFiyat: z.number().nonnegative(),
    kdvOrani: z.union([z.literal(0), z.literal(1), z.literal(8), z.literal(18), z.literal(20)]),
    varyantId: z.string().max(50).optional(),
    gorsel: z.string().max(500).optional(),
})

export const siparisOlusturSema = z.object({
    shopId: z.string().min(10, 'Geçersiz shopId').max(50),
    musteriAdi: z.string().min(2, 'Müşteri adı en az 2 karakter').max(100),
    musteriEmail: z.string().email('Geçersiz e-posta').optional(),
    musteriTelefon: turkTelefon,
    items: z.array(siparisItemSema).min(1, 'En az 1 ürün gerekli').max(50),
    araToplam: z.number().nonnegative(),
    kdvToplam: z.number().nonnegative(),
    kargoUcreti: z.number().nonnegative().default(0),
    indirimTutar: z.number().nonnegative().default(0),
    genelToplam: z.number().positive('Toplam 0\'dan büyük olmalı'),
    teslimatAdresi: z.object({
        adSoyad: z.string().min(2).max(100),
        telefon: z.string().min(5).max(20),
        adres: z.string().min(5).max(500),
        ilce: z.string().min(2).max(50),
        sehir: z.string().min(2).max(50),
        postaKodu: z.string().max(10).optional(),
    }),
    faturaAdresi: z.object({
        adSoyad: z.string().min(2).max(100),
        telefon: z.string().min(5).max(20),
        adres: z.string().min(5).max(500),
        ilce: z.string().min(2).max(50),
        sehir: z.string().min(2).max(50),
        postaKodu: z.string().max(10).optional(),
    }).optional(),
    odemeTipi: z.enum(['whatsapp', 'iyzico', 'havale']).default('whatsapp'),
    notlar: guvenliMetin.max(1000).optional(),
    kuponKodu: z.string().max(30).optional(),
})

export type SiparisOlusturInput = z.infer<typeof siparisOlusturSema>

// ═══ ESNAF GÜNCELLEME ═══════════════════════════════════════════════════════

export const esnafGuncelleSema = z.object({
    ad: z.string().min(2).max(50).optional(),
    telefon: turkTelefon.optional(),
    adres: z.string().max(300).optional(),
    bildirimAyarlari: z.object({
        sabahMesaji: z.boolean(),
        olumsuzYorum: z.boolean(),
        haftalikRapor: z.boolean(),
    }).optional(),
    instagramUsername: z.string().max(30).regex(/^[a-zA-Z0-9._]*$/, 'Geçersiz Instagram kullanıcı adı').optional().nullable(),
    instagramUrl: z.string().url().max(200).optional().nullable(),
    facebookUrl: z.string().url().max(200).optional().nullable(),
    paletId: z.string().max(50).optional(),
    secilenPalet: z.record(z.string(), z.unknown()).optional(),
}).refine(data => Object.keys(data).length > 0, {
    message: 'En az bir alan güncellenmelidir',
})

export type EsnafGuncelleInput = z.infer<typeof esnafGuncelleSema>

// ═══ RANDEVU OLUŞTURMA ══════════════════════════════════════════════════════

export const randevuOlusturSema = z.object({
    esnafId: z.string().min(10, 'Geçersiz esnafId').max(50),
    musteriAd: z.string().min(2, 'İsim en az 2 karakter').max(100),
    musteriTel: turkTelefon,
    musteriEmail: z.string().email('Geçersiz e-posta').max(100).optional(),
    hizmet: guvenliMetin.min(2, 'Hizmet adı en az 2 karakter').max(200),
    tarih: z.string().regex(/^\d{4}-\d{2}-\d{2}$/, 'Tarih formatı: YYYY-MM-DD'),
    saat: z.string().regex(/^\d{2}:\d{2}$/, 'Saat formatı: HH:MM'),
    notlar: guvenliMetin.max(500).optional(),
})

export type RandevuOlusturInput = z.infer<typeof randevuOlusturSema>

// ═══ PAKET ÖDEME (İYZİCO ABONELİK) ════════════════════════════════════════

export const paketOdemeSema = z.object({
    esnafId: z.string().min(10, 'Geçersiz esnafId').max(50),
    paket: z.enum(['TEMEL', 'STANDART', 'BUYUME', 'PREMIUM', 'PREMIUMPLUS']),
    taksitSayisi: z.number().int().min(1).max(12).default(1),
})

export type PaketOdemeInput = z.infer<typeof paketOdemeSema>

// ═══ CHECKOUT BAŞLAT (E-TİCARET ÖDEME) ═════════════════════════════════════

const checkoutMusteriSema = z.object({
    id: z.string().min(1).max(50),
    ad: z.string().min(2).max(100),
    soyad: z.string().min(2).max(100),
    email: z.string().email('Geçersiz e-posta').max(100),
    telefon: z.string().min(10).max(20),
    tcKimlik: z.string().length(11, 'TC kimlik 11 hane olmalı').optional(),
})

const checkoutSepetItemSema = z.object({
    id: z.string().min(1).max(50),
    ad: z.string().min(1).max(200),
    kategori: z.string().max(100),
    tip: z.enum(['PHYSICAL', 'VIRTUAL']).default('PHYSICAL'),
    fiyatKurus: z.number().int().nonnegative(),
})

const checkoutAdresSema = z.object({
    adSoyad: z.string().min(2).max(100),
    sehir: z.string().min(2).max(50),
    ulke: z.string().max(50).default('Turkey'),
    adres: z.string().min(5).max(500),
    postaKodu: z.string().max(10).optional(),
})

export const checkoutBaslatSema = z.object({
    shopId: z.string().min(10, 'Geçersiz shopId').max(50),
    siparisId: z.string().min(1, 'Geçersiz siparisId').max(50),
    sepetItems: z.array(checkoutSepetItemSema).min(1, 'Sepet boş olamaz').max(50),
    musteriInfo: checkoutMusteriSema,
    teslimatAdresi: checkoutAdresSema,
    faturaAdresi: checkoutAdresSema.optional(),
    toplamFiyatKurus: z.number().int().positive('Toplam 0\'dan büyük olmalı'),
    kargoUcretiKurus: z.number().int().nonnegative().default(0),
    taksitSecenekleri: z.array(z.number().int().min(1).max(12)).optional(),
})

export type CheckoutBaslatInput = z.infer<typeof checkoutBaslatSema>

// ═══ GİDER EKLEME ══════════════════════════════════════════════════════════

export const giderEkleSema = z.object({
    esnafId: z.string().min(10, 'Geçersiz esnafId').max(50),
    kategori: z.enum(['kira', 'maas', 'malzeme', 'fatura', 'reklam', 'vergi', 'diger'], {
        message: 'Geçersiz kategori',
    }),
    tutar: z.number().positive('Tutar 0\'dan büyük olmalı').max(10_000_000, 'Tutar çok yüksek'),
    aciklama: guvenliMetin.max(500).optional(),
    tarih: z.string().regex(/^\d{4}-\d{2}-\d{2}$/, 'Tarih formatı: YYYY-MM-DD').optional(),
})

export type GiderEkleInput = z.infer<typeof giderEkleSema>

// ═══ GENERIC GUARD ══════════════════════════════════════════════════════════

/**
 * Zod şemasıyla body doğrulama.
 * Başarısızsa { ok: false, hata, detaylar } döner.
 */
export function zodGuard<T>(
    sema: z.ZodType<T>,
    body: unknown
): { ok: true; data: T } | { ok: false; hata: string; detaylar: z.ZodIssue[] } {
    const result = sema.safeParse(body)

    if (result.success) {
        return { ok: true, data: result.data }
    }

    return {
        ok: false,
        hata: 'Geçersiz istek verisi',
        detaylar: result.error.issues,
    }
}

/**
 * Next.js API route'larında kullanım kolaylığı için helper.
 * Hata durumunda NextResponse.json ile 400 döner.
 */
export function zodParseOrThrow<T>(sema: z.ZodType<T>, body: unknown): T {
    const result = sema.safeParse(body)
    if (result.success) return result.data

    const mesaj = result.error.issues
        .map(i => `${i.path.join('.')}: ${i.message}`)
        .join('; ')

    const err = new Error(`ZOD_VALIDATION: ${mesaj}`) as Error & { statusCode: number; issues: z.ZodIssue[] }
    err.name = 'ZodValidationError'
    err.statusCode = 400
    err.issues = result.error.issues
    throw err
}

