import { NextResponse } from 'next/server'
import { adminDb } from '@/lib/firebaseAdmin'
import { telegramGonder } from '@/lib/telegram'
import { paketSenaryosuCalistir } from '@/utils/paketSenaryosu'

export const dynamic = 'force-dynamic'

// İyzico SDK tiplemesi (payment/create ile paylaşılır)
interface IyzipayRetrieveResult {
    status: string
    paymentStatus: string
    paymentId?: string
    conversationId?: string
    errorMessage?: string
    errorCode?: string
}

type IyzipayCallback = (err: Error | null, result: IyzipayRetrieveResult) => void

// Normal require — eval() kaldırıldı
function getIyzipay() {
    const Iyzipay = require('iyzipay')
    return new Iyzipay({
        apiKey: process.env.IYZICO_API_KEY || '',
        secretKey: process.env.IYZICO_SECRET_KEY || '',
        uri: process.env.IYZICO_BASE_URL || 'https://sandbox-api.iyzipay.com',
    }) as {
        checkoutForm: {
            retrieve: (params: { token: string; locale: string }, cb: IyzipayCallback) => void
        }
    }
}

// conversationId'den esnafId çıkart — strict validation
function parseEsnafIdFromConversation(conversationId: string): string | null {
    // Format: kepenk-{esnafId}-{timestamp}
    if (!conversationId.startsWith('kepenk-')) return null
    const parts = conversationId.split('-')
    // En az 3 parça olmalı: 'kepenk', esnafId, timestamp
    if (parts.length < 3) return null
    // esnafId: ortadaki parçalar (timestamp hariç)
    const esnafId = parts.slice(1, -1).join('-')
    if (!esnafId || esnafId.length < 10) return null
    return esnafId
}


export async function POST(request: Request) {
    let token = ''
    try {
        const form = await request.formData()
        token = (form.get('token') as string) || ''

        if (!token) {
            return NextResponse.redirect(
                `${process.env.NEXT_PUBLIC_APP_URL}/odeme/basarisiz`
            )
        }

        return new Promise<NextResponse>((resolve) => {
            getIyzipay().checkoutForm.retrieve(
                { token, locale: 'TR' },
                async (err: Error | null, result: IyzipayRetrieveResult) => {
                    if (err || result?.paymentStatus !== 'SUCCESS') {
                        console.error('[İYZİCO CALLBACK HATA]', err || result)
                        resolve(
                            NextResponse.redirect(
                                `${process.env.NEXT_PUBLIC_APP_URL}/odeme/basarisiz`
                            )
                        )
                        return
                    }

                    try {
                        const convId = result.conversationId || ''
                        const esnafId = parseEsnafIdFromConversation(convId)

                        if (!esnafId) {
                            throw new Error(`conversationId geçersiz format: ${convId}`)
                        }

                        const esnafDoc = await adminDb.collection('esnaflar').doc(esnafId).get()
                        if (!esnafDoc.exists) throw new Error(`Esnaf bulunamadı: ${esnafId}`)
                        const esnaf = esnafDoc.data()!

                        const esnafPaket = esnaf.paket || 'TEMEL'

                        // Paket senaryosunu AWAIT ile çağır — hata olursa Firestore'a kaydet
                        try {
                            await paketSenaryosuCalistir(esnafId, esnafPaket, result.paymentId || '')
                        } catch (senaryoErr: unknown) {
                            const hata = senaryoErr instanceof Error ? senaryoErr.message : String(senaryoErr)
                            console.error('[PAKET SENARYO HATA]', hata)

                            // Kritik: Ödeme alındı ama senaryo çalışmadı → Firestore'a kaydet
                            await adminDb.collection('basarisizSenaryolar').add({
                                esnafId,
                                paket: esnafPaket,
                                paymentId: result.paymentId || '',
                                hata,
                                tarih: new Date().toISOString(),
                                durum: 'bekliyor', // Manuel müdahale bekliyor
                            })

                            // Operatöre Telegram bildirimi
                            await telegramGonder(
                                `🚨 <b>KRİTİK: Ödeme alındı ama paket aktifleşmedi!</b>\n` +
                                `Esnaf: ${esnafId}\n` +
                                `Paket: ${esnafPaket}\n` +
                                `PaymentId: ${result.paymentId}\n` +
                                `Hata: ${hata}\n` +
                                `<b>Manuel müdahale gerekli!</b>`
                            ).catch(() => { /* Telegram da başarısız → en azından Firestore'da kayıt var */ })
                        }

                        resolve(
                            NextResponse.redirect(
                                `${process.env.NEXT_PUBLIC_APP_URL}/odeme/basarili`
                            )
                        )
                    } catch (innerErr: unknown) {
                        const message = innerErr instanceof Error ? innerErr.message : 'Bilinmeyen hata'
                        console.error('[CALLBACK INNER HATA]', message)
                        resolve(
                            NextResponse.redirect(
                                `${process.env.NEXT_PUBLIC_APP_URL}/odeme/basarisiz`
                            )
                        )
                    }
                }
            )
        })
    } catch (error: unknown) {
        const message = error instanceof Error ? error.message : 'Bilinmeyen hata'
        console.error('[PAYMENT CALLBACK HATA]', message)
        return NextResponse.redirect(
            `${process.env.NEXT_PUBLIC_APP_URL}/odeme/basarisiz`
        )
    }
}
