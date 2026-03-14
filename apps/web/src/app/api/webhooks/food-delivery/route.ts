/**
 * POST /api/webhooks/food-delivery
 *
 * Yemeksepeti ve Trendyol webhook'larını dinler.
 * Adapter Pattern + Idempotency Guard.
 *
 * Akış:
 * 1. HMAC imza doğrula (platform secret ile)
 * 2. Idempotency: webhook_idempotency/{orderId} kontrol
 * 3. Adapter: Platform JSON → KepenkOrder normalize
 * 4. Zod validate → aktif_adisyonlar write
 * 5. 200 OK dön (HER DURUMDA — retransmit'i engelle)
 */

import { NextResponse } from 'next/server'
import { adminDb, Timestamp } from '@/lib/firebaseAdmin'
import { kepenkOrderSema, type KepenkOrder, type AdisyonKalem } from '@/lib/restoran/tipler'
import { kdvHesapla } from '@/lib/restoran/utils'
import crypto from 'crypto'

// ─── HMAC Doğrulama ────────────────────────────────────────────────────

function hmacDogrula(body: string, signature: string, secret: string): boolean {
    const computed = crypto.createHmac('sha256', secret).update(body).digest('hex')
    return crypto.timingSafeEqual(Buffer.from(computed), Buffer.from(signature || ''))
}

// ─── Adapter: Yemeksepeti → KepenkOrder ────────────────────────────────

interface YemeksepetiPayload {
    order_id: string
    restaurant_id: string
    customer_name?: string
    customer_phone?: string
    delivery_address?: string
    items: Array<{
        name: string
        quantity: number
        unit_price: number // TL cinsinden
        note?: string
    }>
    total_amount: number
    payment_method?: string
    note?: string
}

function normalizeYemeksepeti(body: YemeksepetiPayload, esnafId: string): KepenkOrder {
    return {
        platformSiparisId: body.order_id,
        platform: 'yemeksepeti',
        esnafId,
        musteriAd: body.customer_name,
        musteriTel: body.customer_phone,
        adres: body.delivery_address,
        kalemler: body.items.map(item => ({
            ad: item.name,
            adet: item.quantity,
            birimFiyatKurus: Math.round(item.unit_price * 100),
            notlar: item.note,
        })),
        toplamKurus: Math.round(body.total_amount * 100),
        odemeTipi: body.payment_method === 'ONLINE' ? 'online' : 'kapida_nakit',
        notlar: body.note,
    }
}

// ─── Adapter: Trendyol → KepenkOrder ───────────────────────────────────

interface TrendyolPayload {
    orderId: string
    merchantId: string
    customerFirstName?: string
    customerLastName?: string
    customerPhone?: string
    deliveryAddress?: { fullAddress?: string }
    lines: Array<{
        productName: string
        quantity: number
        price: number // TL cinsinden
        notes?: string
    }>
    totalPrice: number
    paymentType?: string
    customerNote?: string
}

function normalizeTrendyol(body: TrendyolPayload, esnafId: string): KepenkOrder {
    return {
        platformSiparisId: body.orderId,
        platform: 'trendyol',
        esnafId,
        musteriAd: [body.customerFirstName, body.customerLastName].filter(Boolean).join(' ') || undefined,
        musteriTel: body.customerPhone,
        adres: body.deliveryAddress?.fullAddress,
        kalemler: body.lines.map(line => ({
            ad: line.productName,
            adet: line.quantity,
            birimFiyatKurus: Math.round(line.price * 100),
            notlar: line.notes,
        })),
        toplamKurus: Math.round(body.totalPrice * 100),
        odemeTipi: body.paymentType === 'ONLINE' ? 'online' : 'kapida_nakit',
        notlar: body.customerNote,
    }
}

// ─── API Handler ───────────────────────────────────────────────────────

export async function POST(request: Request) {
    const rawBody = await request.text()
    let body: Record<string, unknown>

    try {
        body = JSON.parse(rawBody)
    } catch {
        return NextResponse.json({ ok: true }) // Bozuk JSON → 200 dön, retransmit engelle
    }

    // Platform tespiti
    const platform = request.headers.get('x-platform')
        || (body.orderId ? 'trendyol' : body.order_id ? 'yemeksepeti' : null)

    if (!platform) {
        return NextResponse.json({ ok: true, message: 'Bilinmeyen platform' })
    }

    // ── HMAC Doğrulama ──
    const signature = request.headers.get('x-signature') || request.headers.get('x-hmac-sha256') || ''
    const secret = platform === 'trendyol'
        ? (process.env.TRENDYOL_WEBHOOK_SECRET || '')
        : (process.env.YEMEKSEPETI_WEBHOOK_SECRET || '')

    if (secret && signature) {
        try {
            if (!hmacDogrula(rawBody, signature, secret)) {
                console.error(`[WEBHOOK] HMAC doğrulama başarısız: ${platform}`)
                return NextResponse.json({ ok: true }) // Still 200
            }
        } catch {
            // timingSafeEqual farklı uzunlukta buffer'larda hata verir
            console.error(`[WEBHOOK] HMAC karşılaştırma hatası: ${platform}`)
            return NextResponse.json({ ok: true })
        }
    }

    // ── Esnaf ID eşleme ──
    // Platform merchant ID → Firestore esnafId mapping
    const merchantId = (body.restaurant_id || body.merchantId || '') as string
    if (!merchantId) {
        return NextResponse.json({ ok: true, message: 'Merchant ID yok' })
    }

    // Esnaf'ı platform ID'sinden bul
    const esnafSnap = await adminDb
        .collection('esnaflar')
        .where(`platformEntegrasyonlari.${platform}`, '==', merchantId)
        .limit(1)
        .get()

    if (esnafSnap.empty) {
        console.warn(`[WEBHOOK] Esnaf bulunamadı: ${platform}/${merchantId}`)
        return NextResponse.json({ ok: true, message: 'Esnaf eşlenemedi' })
    }

    const esnafId = esnafSnap.docs[0].id

    // ── Normalize ──
    let normalizedOrder: KepenkOrder
    try {
        if (platform === 'trendyol') {
            normalizedOrder = normalizeTrendyol(body as unknown as TrendyolPayload, esnafId)
        } else {
            normalizedOrder = normalizeYemeksepeti(body as unknown as YemeksepetiPayload, esnafId)
        }
    } catch (e: unknown) {
        console.error(`[WEBHOOK] Normalize hatası:`, e instanceof Error ? e.message : e)
        return NextResponse.json({ ok: true })
    }

    // ── Zod Validate ──
    const parsed = kepenkOrderSema.safeParse(normalizedOrder)
    if (!parsed.success) {
        console.error(`[WEBHOOK] Zod validation hatası:`, parsed.error.issues)
        return NextResponse.json({ ok: true })
    }

    const order = parsed.data

    // ══ IDEMPOTENCY GUARD ══
    const idempotencyKey = `${order.platform}_${order.platformSiparisId}`
    const idempRef = adminDb.collection('webhook_idempotency').doc(idempotencyKey)
    const idempDoc = await idempRef.get()

    if (idempDoc.exists) {
        // Duplicate! → 200 OK dön, mutfağa DÜŞÜRMEMELİ
        console.log(`[WEBHOOK] DUPLICATE engellendi: ${idempotencyKey}`)
        return NextResponse.json({ ok: true, duplicate: true })
    }

    // Idempotency lock yaz — TTL ile (30 gün sonra otomatik silinir)
    await idempRef.set({
        platform: order.platform,
        platformSiparisId: order.platformSiparisId,
        esnafId,
        olusturma: Timestamp.now(),
        ttl: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000),
    })

    // ── Adisyon Oluştur ──
    const adisyonKalemler = order.kalemler.map(k => ({
        menuItemId: '',
        ad: k.ad,
        adet: k.adet,
        birimFiyatKurus: k.birimFiyatKurus,
        toplamKurus: k.birimFiyatKurus * k.adet,
        kdvTipi: 'gida' as const,
        notlar: k.notlar || undefined,
    }))

    const { kdvDetay, toplamKdvKurus } = kdvHesapla(adisyonKalemler as AdisyonKalem[])

    await adminDb
        .collection('esnaflar')
        .doc(esnafId)
        .collection('aktif_adisyonlar')
        .add({
            masaNo: 0,
            kaynak: order.platform,
            durum: 'yeni',
            kalemler: adisyonKalemler,
            toplamKurus: order.toplamKurus,
            kdvToplamKurus: toplamKdvKurus,
            kdvDetay,
            notlar: order.notlar || null,
            musteriAd: order.musteriAd || null,
            musteriTel: order.musteriTel || null,
            disPlatform: {
                platformSiparisId: order.platformSiparisId,
                platform: order.platform,
            },
            olusturma: Timestamp.now(),
        })

    return NextResponse.json({ ok: true })
}
