/**
 * POST /api/restoran/siparis-olustur
 *
 * QR sipariş formundan gelen siparişi aktif_adisyonlar'a yazar.
 * Auth YOK — müşteri tarafından çağrılır (deliberate).
 * Rate limit + Zod validation ile korunur.
 */

import { NextResponse } from 'next/server'
import { adminDb, Timestamp } from '@/lib/firebaseAdmin'
import { rateLimitCheck } from '@/lib/rateLimiter'
import { qrSiparisSema } from '@/lib/restoran/tipler'
import { kdvHesapla } from '@/lib/restoran/utils'
import { zodGuard } from '@/lib/zodSemalar'

export async function POST(request: Request) {
    // Rate limit — müşteri endpoint
    const ip = request.headers.get('x-forwarded-for')?.split(',')[0]?.trim() || 'unknown'
    const rl = rateLimitCheck(`qr-siparis:${ip}`, 'webhook')
    if (!rl.allowed) {
        return NextResponse.json({ error: 'Çok fazla istek. Lütfen biraz bekleyin.' }, { status: 429 })
    }

    try {
        const body = await request.json()
        const parsed = zodGuard(qrSiparisSema, body)
        if (!parsed.ok) {
            return NextResponse.json(
                { error: parsed.hata, detaylar: parsed.detaylar },
                { status: 400 }
            )
        }

        const { esnafId, masaNo, kalemler, notlar } = parsed.data

        // Adisyon kalemlerini oluştur
        const adisyonKalemler = kalemler.map(k => ({
            menuItemId: k.menuItemId,
            ad: k.ad,
            adet: k.adet,
            birimFiyatKurus: k.birimFiyatKurus,
            toplamKurus: k.birimFiyatKurus * k.adet,
            kdvTipi: k.kdvTipi,
            notlar: k.notlar || null,
        }))

        const toplamKurus = adisyonKalemler.reduce((t, k) => t + k.toplamKurus, 0)
        const { kdvDetay, toplamKdvKurus } = kdvHesapla(adisyonKalemler as any)

        // Firestore'a yaz
        const ref = await adminDb
            .collection('esnaflar')
            .doc(esnafId)
            .collection('aktif_adisyonlar')
            .add({
                masaNo,
                kaynak: 'masa' as const,
                durum: 'yeni' as const,
                kalemler: adisyonKalemler,
                toplamKurus,
                kdvToplamKurus: toplamKdvKurus,
                kdvDetay,
                notlar: notlar || null,
                olusturma: Timestamp.now(),
            })

        return NextResponse.json({ ok: true, adisyonId: ref.id })
    } catch (error: unknown) {
        const message = error instanceof Error ? error.message : 'Bilinmeyen hata'
        // console.error('[QR SİPARİŞ HATA]', message)
        return NextResponse.json({ error: message }, { status: 500 })
    }
}
