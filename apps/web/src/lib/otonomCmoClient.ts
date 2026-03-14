/**
 * otonomCmoClient.ts — Meta Graph API + Google Ads API Köprüsü
 * ─────────────────────────────────────────────────────────────────────────────
 * AI'ın hazırladığı kampanya JSON'ını alır, Zod ile strict validasyon yapar
 * ve Meta/Google Ads API'lerine fırlatır.
 * 
 * 🛡️ HARD LIMIT: Günlük bütçe asla 700 TL'yi, aylık bütçe 20.000 TL'yi aşamaz.
 *    Sistemsel hata olsa bile esnafın kartından ₺100.000 çekilmesi İMKANSIZ.
 * ─────────────────────────────────────────────────────────────────────────────
 */

import { z } from 'zod'
import { adminDb, Timestamp } from '@/lib/firebaseAdmin'

// ═══════════════════════════════════════════════════════════════════════════════
//  ZOD HARD-LIMIT ŞEMALARI (Bütçe Zırhı)
// ═══════════════════════════════════════════════════════════════════════════════

const GUNLUK_HARD_LIMIT_TL = 700     // Hiçbir durumda aşılamaz
const AYLIK_HARD_LIMIT_TL = 20_000   // Hiçbir durumda aşılamaz

const MetaReklamSchema = z.object({
    headline: z.string().min(5).max(150),
    description: z.string().min(10).max(500),
    cta: z.string().min(3).max(50),
})

const GoogleReklamSchema = z.object({
    headline1: z.string().min(3).max(30),
    headline2: z.string().min(3).max(30),
    description: z.string().min(10).max(90),
})

const HedefKitleSchema = z.object({
    konum: z.string().min(2),
    yaricap_km: z.number().min(1).max(50),
    yas_min: z.number().min(18).max(65),
    yas_max: z.number().min(18).max(80),
    cinsiyet: z.enum(['hepsi', 'erkek', 'kadin']),
    ilgi_alanlari: z.array(z.string()).min(1).max(20),
})

const KampanyaSchema = z.object({
    esnafId: z.string().min(5),
    aylikButce: z.number()
        .min(500, 'Minimum bütçe ₺500')
        .max(AYLIK_HARD_LIMIT_TL, `Aylık bütçe ₺${AYLIK_HARD_LIMIT_TL.toLocaleString('tr-TR')} limitini aşıyor`),
    gunlukButce: z.number()
        .min(15)
        .max(GUNLUK_HARD_LIMIT_TL, `Günlük bütçe ₺${GUNLUK_HARD_LIMIT_TL} limitini aşıyor`),
    metaReklamlar: z.array(MetaReklamSchema).min(1).max(5),
    googleReklamlar: z.array(GoogleReklamSchema).min(1).max(5),
    hedefKitle: HedefKitleSchema,
})

export type KampanyaVerisi = z.infer<typeof KampanyaSchema>

// ═══════════════════════════════════════════════════════════════════════════════
//  ÇİFTE VALİDASYON (Double-Check Guard)
// ═══════════════════════════════════════════════════════════════════════════════

function cifteButceKontrol(kampanya: KampanyaVerisi): { gecerli: boolean; hata?: string } {
    // 1. İlk kontrol: Zod zaten yapmıştı
    // 2. İkinci kontrol: Manuel hard limit
    if (kampanya.gunlukButce > GUNLUK_HARD_LIMIT_TL) {
        return { gecerli: false, hata: `HARD LIMIT: Günlük bütçe ${kampanya.gunlukButce} > ${GUNLUK_HARD_LIMIT_TL} TL` }
    }
    if (kampanya.aylikButce > AYLIK_HARD_LIMIT_TL) {
        return { gecerli: false, hata: `HARD LIMIT: Aylık bütçe ${kampanya.aylikButce} > ${AYLIK_HARD_LIMIT_TL} TL` }
    }
    // 3. Tutarlılık kontrolü: Günlük × 30 ≈ Aylık (±%20 tolerans)
    const tahminiAylik = kampanya.gunlukButce * 30
    if (tahminiAylik > kampanya.aylikButce * 1.2) {
        return { gecerli: false, hata: `TUTARSIZLIK: Günlük(${kampanya.gunlukButce}) × 30 = ${tahminiAylik} > Aylık limit(${kampanya.aylikButce})` }
    }
    return { gecerli: true }
}

// ═══════════════════════════════════════════════════════════════════════════════
//  META GRAPH API FONKSİYONU
// ═══════════════════════════════════════════════════════════════════════════════

export async function metaKampanyaOlustur(kampanya: KampanyaVerisi): Promise<{
    basarili: boolean
    kampanyaId?: string
    hata?: string
}> {
    // Zod + Çifte validasyon
    const zodSonuc = KampanyaSchema.safeParse(kampanya)
    if (!zodSonuc.success) {
        return { basarili: false, hata: `Validasyon hatası: ${zodSonuc.error.issues.map(i => i.message).join(', ')}` }
    }
    const butceKontrol = cifteButceKontrol(kampanya)
    if (!butceKontrol.gecerli) {
        console.error('[CMO_CLIENT] 🛡️ BÜTÇE ZIRHI AKTİF:', butceKontrol.hata)
        return { basarili: false, hata: butceKontrol.hata }
    }

    const accessToken = process.env.META_ADS_ACCESS_TOKEN
    const adAccountId = process.env.META_AD_ACCOUNT_ID

    // API mevcut değilse taslak olarak kaydet
    if (!accessToken || !adAccountId) {
        console.log('[CMO_CLIENT] Meta API credentials yok — taslak olarak kaydedildi')
        const taslakId = await taslakKaydet(kampanya, 'meta')
        return { basarili: true, kampanyaId: `draft_meta_${taslakId}` }
    }

    try {
        // Meta Graph API — Campaign oluştur
        const campaignRes = await fetch(
            `https://graph.facebook.com/v20.0/${adAccountId}/campaigns`,
            {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    access_token: accessToken,
                    name: `kepenk_${kampanya.esnafId}_${Date.now()}`,
                    objective: 'OUTCOME_LEADS',
                    status: 'PAUSED', // Önce PAUSED, onay sonrası ACTIVE
                    special_ad_categories: [],
                    daily_budget: Math.round(kampanya.gunlukButce * 100 * 0.6), // Centler, %60 Meta'ya
                }),
            }
        )

        const campaignData = await campaignRes.json()
        if (campaignData.error) {
            return { basarili: false, hata: `Meta API: ${campaignData.error.message}` }
        }

        return { basarili: true, kampanyaId: campaignData.id }
    } catch (err: any) {
        return { basarili: false, hata: `Meta bağlantı hatası: ${err.message}` }
    }
}

// ═══════════════════════════════════════════════════════════════════════════════
//  GOOGLE ADS API FONKSİYONU
// ═══════════════════════════════════════════════════════════════════════════════

export async function googleKampanyaOlustur(kampanya: KampanyaVerisi): Promise<{
    basarili: boolean
    kampanyaId?: string
    hata?: string
}> {
    // Zod + Çifte validasyon
    const zodSonuc = KampanyaSchema.safeParse(kampanya)
    if (!zodSonuc.success) {
        return { basarili: false, hata: `Validasyon hatası: ${zodSonuc.error.issues.map(i => i.message).join(', ')}` }
    }
    const butceKontrol = cifteButceKontrol(kampanya)
    if (!butceKontrol.gecerli) {
        console.error('[CMO_CLIENT] 🛡️ BÜTÇE ZIRHI AKTİF:', butceKontrol.hata)
        return { basarili: false, hata: butceKontrol.hata }
    }

    const developerToken = process.env.GOOGLE_ADS_DEVELOPER_TOKEN
    const customerId = process.env.GOOGLE_ADS_CUSTOMER_ID
    const refreshToken = process.env.GOOGLE_ADS_REFRESH_TOKEN

    // API mevcut değilse taslak olarak kaydet
    if (!developerToken || !customerId || !refreshToken) {
        console.log('[CMO_CLIENT] Google Ads credentials yok — taslak olarak kaydedildi')
        const taslakId = await taslakKaydet(kampanya, 'google')
        return { basarili: true, kampanyaId: `draft_google_${taslakId}` }
    }

    try {
        // Google Ads API — Campaign oluştur
        // Not: Production'da googleapis client library kullanılmalı
        const googleRes = await fetch(
            `https://googleads.googleapis.com/v17/customers/${customerId}/campaigns:mutate`,
            {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${refreshToken}`,
                    'developer-token': developerToken,
                },
                body: JSON.stringify({
                    operations: [{
                        create: {
                            name: `kepenk_${kampanya.esnafId}_${Date.now()}`,
                            advertisingChannelType: 'SEARCH',
                            status: 'PAUSED',
                            campaignBudget: `customers/${customerId}/campaignBudgets/new`,
                            manualCpc: {},
                        },
                    }],
                }),
            }
        )

        const googleData = await googleRes.json()
        if (googleData.error) {
            return { basarili: false, hata: `Google Ads API: ${googleData.error.message}` }
        }

        return { basarili: true, kampanyaId: googleData.results?.[0]?.resourceName || 'created' }
    } catch (err: any) {
        return { basarili: false, hata: `Google bağlantı hatası: ${err.message}` }
    }
}

// ═══════════════════════════════════════════════════════════════════════════════
//  TASLAK KAYDET (API credentials yoksa)
// ═══════════════════════════════════════════════════════════════════════════════

async function taslakKaydet(kampanya: KampanyaVerisi, platform: 'meta' | 'google'): Promise<string> {
    const ref = await adminDb.collection('reklam_taslaklari').add({
        esnafId: kampanya.esnafId,
        platform,
        aylikButce: kampanya.aylikButce,
        gunlukButce: kampanya.gunlukButce,
        metaReklamlar: kampanya.metaReklamlar,
        googleReklamlar: kampanya.googleReklamlar,
        hedefKitle: kampanya.hedefKitle,
        durum: 'taslak',
        olusturma: Timestamp.now(),
    })
    return ref.id
}

// ═══════════════════════════════════════════════════════════════════════════════
//  BİRLEŞİK KAMPANYA BAŞLATICI
// ═══════════════════════════════════════════════════════════════════════════════

export async function kampanyaBaslat(kampanya: KampanyaVerisi): Promise<{
    meta: { basarili: boolean; kampanyaId?: string; hata?: string }
    google: { basarili: boolean; kampanyaId?: string; hata?: string }
}> {
    const [meta, google] = await Promise.all([
        metaKampanyaOlustur(kampanya),
        googleKampanyaOlustur(kampanya),
    ])
    return { meta, google }
}
