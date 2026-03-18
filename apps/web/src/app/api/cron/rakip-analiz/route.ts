import { NextResponse } from 'next/server'
import { adminDb, Timestamp } from '@/lib/firebaseAdmin'
import { telegramGonder } from '@/lib/telegram'
import { waMesajGonder } from '@/lib/twilioClient'
import { apiGuard } from '@/lib/apiGuard'

/**
 * Haftalık Rakip Analizi Cron
 * Schedule: 0 6 * * 1 (Pazartesi 09:00 TR)
 * Aynı ilçe+sektördeki Google Places verilerini karşılaştırır.
 */

async function rakipAnalizi(esnafId: string): Promise<void> {
    const esnaf = (await adminDb.collection('esnaflar').doc(esnafId).get()).data()!
    if (!esnaf.googlePlacesId) return

    // Geçen haftaya göre karşılaştırma
    const gecenHafta = await adminDb
        .collection('rakipVerisi')
        .where('esnafId', '==', esnafId)
        .orderBy('zaman', 'desc')
        .limit(1)
        .get()

    const eskiVeri = gecenHafta.docs[0]?.data()?.rakipler ?? []

    // Google Places API ile rakipleri çek (mevcutsa)
    // Not: Google Places API entegrasyonu ayrı bir modül olarak eklenecek.
    // Şimdilik Firestore'daki mevcut veriyi kullan.
    const yorumQuery = await adminDb.collection('yorumlar')
        .where('esnafId', '==', esnafId)
        .orderBy('tarih', 'desc')
        .limit(5)
        .get()

    const analizler: string[] = []

    // Kendi yorum trendine bak
    const sonYorumlar = yorumQuery.docs.map((d: any) => d.data())
    const olumsuz = sonYorumlar.filter((y: any) => y.yildiz <= 3).length
    if (olumsuz >= 2) {
        analizler.push(`Son 5 yorumda ${olumsuz} olumsuz var — yanit stratejisi olusturun`)
    }

    // Yeni veriyi kaydet
    await adminDb.collection('rakipVerisi').add({
        esnafId,
        rakipler: eskiVeri,
        kendi: { yorumSayisi: sonYorumlar.length, olumsuz },
        zaman: Timestamp.now(),
    })

    if (analizler.length > 0) {
        await waMesajGonder(
            esnaf.waNumarasi,
            `*Haftalik Rapor*\n\n` +
            analizler.join('\n') +
            `\n\nDetaylar: ${process.env.NEXT_PUBLIC_APP_URL}/dashboard/raporlar`,
            esnafId,
            'rakip_radari'
        )
    }
}

export async function GET(request: Request) {
    const guard = await apiGuard(request, { requireCronSecret: true })
    if (!guard.ok) return guard.response

    const baslama = Date.now()

    try {
        const aktifEsnaflar = await adminDb
            .collection('esnaflar')
            .where('durum', '==', 'aktif')
            .where('ayarlar.googleYorumTakip', '==', true)
            .get()

        const sonuclar = await Promise.allSettled(
            aktifEsnaflar.docs.map((d: any) => rakipAnalizi(d.id))
        )

        const basarili = sonuclar.filter(s => s.status === 'fulfilled').length
        const hatali = sonuclar.filter(s => s.status === 'rejected').length
        const sure = ((Date.now() - baslama) / 1000).toFixed(1)

        await telegramGonder(
            `<b>Rakip Analiz Cron</b>\n` +
            `Basarili: ${basarili} | Hatali: ${hatali}\n` +
            `Sure: ${sure}s`
        )

        return NextResponse.json({ basarili, hatali, sure })
    } catch (error: any) {
        // console.error('[RAKIP ANALIZ CRON]', error)
        return NextResponse.json({ error: error.message }, { status: 500 })
    }
}
