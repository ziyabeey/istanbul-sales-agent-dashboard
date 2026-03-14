/**
 * iyzico-kapora/route.ts — Iyzico Ödeme Webhook Dinleyici
 * ══════════════════════════════════════════════════════════════════════
 * Kapora ödemesi geldiğinde randevuyu otomatik onayla.
 * Müşteriye "Randevunuz kesinleşti 🎉" WA mesajı at.
 */

import { NextResponse } from 'next/server'
import { randevuOnayla } from '@/lib/randevu/takvimMotoru'
import type { Randevu } from '@/lib/randevu/RandevuTypes'
import { adminDb } from '@/lib/firebaseAdmin'

export async function POST(req: Request) {
    try {
        const body = await req.json()

        // Iyzico callback format
        const { status, conversationId, token, paymentId } = body

        if (status !== 'success' && status !== 'SUCCESS') {
            console.warn(`[iyzico-webhook] ⚠️ Ödeme başarısız: ${conversationId}`)
            return NextResponse.json({ status: 'payment_failed' })
        }

        // conversationId format: "esnafId__randevuId"
        const parts = (conversationId as string)?.split('__')
        if (!parts || parts.length !== 2) {
            console.error('[iyzico-webhook] ❌ Geçersiz conversationId:', conversationId)
            return NextResponse.json({ error: 'Geçersiz conversationId' }, { status: 400 })
        }

        const [esnafId, randevuId] = parts

        // Randevuyu onayla
        await randevuOnayla(esnafId, randevuId, token || paymentId || 'webhook_confirmed')

        // Randevu bilgisini çek (WA mesajı için)
        const randevuDoc = await adminDb
            .collection('esnaflar').doc(esnafId)
            .collection('randevular').doc(randevuId)
            .get()

        const randevu = randevuDoc.data() as Randevu

        // Esnaf bilgisini çek (konum)
        const esnafDoc = await adminDb.collection('esnaflar').doc(esnafId).get()
        const esnaf = esnafDoc.data()
        const konumLink = esnaf?.google_maps_url || esnaf?.konum_link || ''

        // WhatsApp onay mesajı
        const onayMesaji = [
            `✅ Kaporanızı aldık, randevunuz kesinleşti! 🎉`,
            ``,
            `📋 *${randevu.hizmet_adi}*`,
            `📅 Tarih: *${randevu.tarih}*`,
            `⏰ Saat: *${randevu.baslangic_saat}*`,
            randevu.personel_adi ? `💇 Personel: *${randevu.personel_adi}*` : '',
            ``,
            `💰 Ödenen Kapora: *${randevu.kapora.tutar_TL} TL*`,
            `💰 Kalan Bakiye: *${randevu.kalan_bakiye_TL} TL* (yerinde ödenecek)`,
            konumLink ? `\n📍 Konum: ${konumLink}` : '',
            ``,
            `Görüşmek üzere! 🙋‍♀️`,
        ].filter(Boolean).join('\n')

        // WA mesajı gönderme (placeholder — gerçek entegrasyonda WA API kullanılacak)
        console.log(`[iyzico-webhook] 📱 WA onay mesajı: ${randevu.musteri_telefon}`)
        console.log(onayMesaji)

        // Agent log
        await adminDb.collection('agent_logs').add({
            esnafId,
            ajan: 'iyzico_kapora_webhook',
            output: { randevuId, tutar: randevu.kapora.tutar_TL },
            mesaj: `Kapora alındı: ${randevu.musteri_ad} — ${randevu.hizmet_adi} (${randevu.tarih} ${randevu.baslangic_saat})`,
            zaman: new Date(),
            durum: 'onaylandi',
        })

        return NextResponse.json({
            status: 'success',
            randevuId,
            onaylandi: true,
        })

    } catch (err: unknown) {
        const msg = err instanceof Error ? err.message : 'Bilinmeyen hata'
        console.error('[iyzico-webhook] ❌ Hata:', msg)
        return NextResponse.json({ error: msg }, { status: 500 })
    }
}
