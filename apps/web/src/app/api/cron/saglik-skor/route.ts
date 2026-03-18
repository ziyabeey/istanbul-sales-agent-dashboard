import { NextResponse } from 'next/server'
import { adminDb, Timestamp } from '@/lib/firebaseAdmin'
import { telegramGonder } from '@/lib/telegram'
import { apiGuard } from '@/lib/apiGuard'
import { esnafSaglikSkoru } from '@/utils/esnafSaglik'

/**
 * Haftalık Sağlık Skoru Cron
 * Schedule: 0 8 * * 0 (Pazar 11:00 TR)
 * Her aktif esnaf için dijital sağlık skoru hesaplar ve Firestore'a yazar.
 */

async function skorHesaplaVeKaydet(esnafId: string): Promise<number> {
    const skor = await esnafSaglikSkoru(esnafId)

    await adminDb.collection('esnaflar').doc(esnafId).update({
        saglikSkoru: skor.toplam,
        saglikGuncelleme: Timestamp.now(),
        saglikBilesenler: skor.bilesenler,
        saglikOnerileri: skor.oneriler,
    })

    return skor.toplam
}

export async function GET(request: Request) {
    const guard = await apiGuard(request, { requireCronSecret: true })
    if (!guard.ok) return guard.response

    const baslama = Date.now()

    try {
        const aktifEsnaflar = await adminDb
            .collection('esnaflar')
            .where('durum', '==', 'aktif')
            .get()

        const sonuclar = await Promise.allSettled(
            aktifEsnaflar.docs.map((d: any) => skorHesaplaVeKaydet(d.id))
        )

        const basarili = sonuclar.filter(s => s.status === 'fulfilled').length
        const hatali = sonuclar.filter(s => s.status === 'rejected').length
        const skorlar = sonuclar
            .filter((s): s is PromiseFulfilledResult<number> => s.status === 'fulfilled')
            .map(s => s.value)
        const ortalama = skorlar.length > 0
            ? Math.round(skorlar.reduce((a, b) => a + b, 0) / skorlar.length)
            : 0

        const sure = ((Date.now() - baslama) / 1000).toFixed(1)

        await telegramGonder(
            `<b>Saglik Skor Cron</b>\n` +
            `Basarili: ${basarili} | Hatali: ${hatali}\n` +
            `Ort. skor: ${ortalama}/100\n` +
            `Sure: ${sure}s`
        )

        return NextResponse.json({ basarili, hatali, ortalama, sure })
    } catch (error: any) {
        // console.error('[SAGLIK SKOR CRON]', error)
        return NextResponse.json({ error: error.message }, { status: 500 })
    }
}
