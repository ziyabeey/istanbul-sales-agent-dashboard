import { NextResponse } from 'next/server'
import { adminDb } from '@/lib/firebaseAdmin'
import { apiGuard } from '@/lib/apiGuard'
import { zodGuard, paketOdemeSema } from '@/lib/zodSemalar'
import { PAKET_FIYATLARI, type PaketTipi } from '@/types'

// İyzico SDK tiplemesi
interface IyzipayResult {
    status: string
    errorMessage?: string
    checkoutFormContent?: string
    token?: string
    paymentPageUrl?: string
}

type IyzipayCallback = (err: Error | null, result: IyzipayResult) => void

// Legacy iyzipay JS SDK — paket abonelik ödemeleri için
function getIyzipay() {
    const Iyzipay = require('iyzipay')
    return new Iyzipay({
        apiKey: process.env.IYZICO_API_KEY || '',
        secretKey: process.env.IYZICO_SECRET_KEY || '',
        uri: process.env.IYZICO_BASE_URL || 'https://sandbox-api.iyzipay.com',
    }) as { checkoutFormInitialize: { create: (body: Record<string, unknown>, cb: IyzipayCallback) => void } }
}


export async function POST(request: Request) {
    // ── Auth Guard ──
    const guard = await apiGuard(request, { requireAdminToken: true })
    if (!guard.ok) return guard.response

    try {
        const body = await request.json()

        // ── Zod Validation ──
        const parsed = zodGuard(paketOdemeSema, body)
        if (!parsed.ok) {
            return NextResponse.json(
                { error: parsed.hata, detaylar: parsed.detaylar },
                { status: 400 }
            )
        }

        const { esnafId, paket, taksitSayisi } = parsed.data

        const fiyat = PAKET_FIYATLARI[paket as PaketTipi]
        if (!fiyat) {
            return NextResponse.json({ error: 'Geçersiz paket' }, { status: 400 })
        }

        const esnafDoc = await adminDb.collection('esnaflar').doc(esnafId).get()
        if (!esnafDoc.exists) {
            return NextResponse.json({ error: 'Esnaf bulunamadı' }, { status: 404 })
        }
        const esnaf = esnafDoc.data()!

        // IP adresini request'ten al (hardcoded değil!)
        const ip = request.headers.get('x-forwarded-for')?.split(',')[0]?.trim()
            || request.headers.get('x-real-ip')
            || '127.0.0.1'

        const odenenFiyat =
            taksitSayisi > 1
                ? (fiyat * 1.12).toFixed(2)
                : String(fiyat)

        const requestBody = {
            locale: 'TR',
            conversationId: `kepenk-${esnafId}-${Date.now()}`,
            price: String(fiyat),
            paidPrice: odenenFiyat,
            currency: 'TRY',
            basketId: `paket-${paket}-${esnafId}`,
            paymentGroup: 'SUBSCRIPTION',
            callbackUrl: `${process.env.NEXT_PUBLIC_APP_URL}/api/payment/callback`,
            buyer: {
                id: esnafId,
                name: esnaf.ad || 'Ad',
                surname: esnaf.unvan || 'Soyad',
                gsmNumber: esnaf.telefon || '+905000000000',
                email: esnaf.email || `${esnaf.subdomain || esnafId}@kepenk.ai`,
                identityNumber: esnaf.tcKimlik || '00000000000',  // Esnaf profildünden gelir
                registrationAddress: esnaf.adres || 'İstanbul',
                ip,  // Gerçek IP — İyzico fraud koruması için kritik
                city: esnaf.sehir || 'İstanbul',
                country: 'Turkey',
            },
            shippingAddress: {
                contactName: `${esnaf.ad} ${esnaf.unvan || ''}`.trim(),
                city: esnaf.sehir || 'İstanbul',
                country: 'Turkey',
                address: esnaf.adres || 'İstanbul',
            },
            billingAddress: {
                contactName: `${esnaf.ad} ${esnaf.unvan || ''}`.trim(),
                city: esnaf.sehir || 'İstanbul',
                country: 'Turkey',
                address: esnaf.adres || 'İstanbul',
            },
            basketItems: [
                {
                    id: paket,
                    name: `kepenk.ai ${paket} Paketi (Yıllık)`,
                    category1: 'SaaS',
                    itemType: 'VIRTUAL',
                    price: String(fiyat),
                },
            ],
        }

        return new Promise<NextResponse>((resolve) => {
            getIyzipay().checkoutFormInitialize.create(
                requestBody,
                (err: Error | null, result: IyzipayResult) => {
                    if (err || result?.status !== 'success') {
                        resolve(
                            NextResponse.json(
                                { error: err?.message || result?.errorMessage || 'Ödeme başlatılamadı' },
                                { status: 500 }
                            )
                        )
                        return
                    }
                    resolve(
                        NextResponse.json({
                            checkoutFormContent: result.checkoutFormContent,
                            token: result.token,
                            paymentPageUrl: result.paymentPageUrl,
                        })
                    )
                }
            )
        })
    } catch (error: unknown) {
        const message = error instanceof Error ? error.message : 'Bilinmeyen hata'
        console.error('[PAYMENT CREATE HATA]', message)
        return NextResponse.json({ error: message }, { status: 500 })
    }
}
