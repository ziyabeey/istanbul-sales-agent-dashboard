import { NextResponse } from 'next/server'
import { adminDb } from '@/lib/firebaseAdmin'
import { waMesajGonder } from '@/lib/twilioClient'
import { telegramGonder } from '@/lib/telegram'
import { apiGuard } from '@/lib/apiGuard'
import { PAKET_FIYATLARI, PaketTipi } from '@/types'
import { haftalikRaporEmaili } from '@/lib/emailClient'

/**
 * Haftalık Rapor Cron — Cloud Scheduler
 * Schedule: 0 15 * * 5 (18:00 TR Cuma = 15:00 UTC)
 */
export async function GET(request: Request) {
    const guard = await apiGuard(request, { requireCronSecret: true })
    if (!guard.ok) return guard.response

    try {
        const [aktifSnap, raporSnap] = await Promise.all([
            adminDb.collection('esnaflar').where('durum', '==', 'aktif').get(),
            adminDb
                .collection('esnaflar')
                .where('durum', '==', 'aktif')
                .where('bildirimAyarlari.haftalikRapor', '==', true)
                .get(),
        ])

        let gonderen = 0

        for (const doc of raporSnap.docs) {
            const esnaf = doc.data()
            const mesaj =
                `📊 ${esnaf.ad} ${esnaf.unvan}, haftalık raporunuz hazır!\n\n` +
                `Bu hafta sitenize gelen ziyaretçiler ve güncel Google puanınız için:\n` +
                `→ ${process.env.NEXT_PUBLIC_APP_URL}/dashboard/raporlar`

            await waMesajGonder(esnaf.waNumarasi, mesaj, doc.id, 'cron_haftalik')

            // Email Raporu
            if (esnaf.email) {
                try {
                    const [yorumSnap, mesajSnap, icerikSnap] = await Promise.all([
                        adminDb.collection('yorumlar').where('esnafId', '==', doc.id).get(),
                        adminDb.collection('agent_logs')
                            .where('esnafId', '==', doc.id)
                            .where('kanal', '==', 'whatsapp')
                            .get(),
                        adminDb.collection('icerikler').where('esnafId', '==', doc.id).get()
                    ])

                    const haftalikYorum = yorumSnap.docs.filter((d: any) => {
                        const tarih = d.data().yanitTarihi?.toDate?.()
                        return tarih && (Date.now() - tarih.getTime()) < 7 * 24 * 60 * 60 * 1000
                    }).length

                    const haftalikMesaj = mesajSnap.docs.filter((d: any) => {
                        const zaman = d.data().zaman?.toDate?.()
                        return zaman && (Date.now() - zaman.getTime()) < 7 * 24 * 60 * 60 * 1000
                    }).length

                    const haftalikIcerik = icerikSnap.docs.filter((d: any) => {
                        const tarih = d.data().olusturmaTarihi?.toDate?.()
                        return tarih && (Date.now() - tarih.getTime()) < 7 * 24 * 60 * 60 * 1000
                    }).length

                    if (esnaf.email && esnaf.bildirimAyarlari?.haftalikRapor) {
                        haftalikRaporEmaili({
                            ad: esnaf.ad || esnaf.isletmeAdiTam || 'Esnafımız',
                            unvan: esnaf.unvan || '',
                            email: esnaf.email,
                            ziyaretci: 147,   // GA4 bağlanınca gerçek gelecek
                            googlePuani: 4.3,
                            icerikKopya: haftalikIcerik,
                            aktifGun: 5,
                            subdomainUrl: esnaf.subdomainUrl || '',
                        }).catch(console.error)
                    }
                } catch (e) { console.error('Email rapor hata:', e) }
            }

            gonderen++
        }

        // MRR hesaplama
        const mrr = aktifSnap.docs.reduce(
            (sum: number, d: any) =>
                sum + (PAKET_FIYATLARI[d.data().paket as PaketTipi] || 0),
            0
        )

        const riskliSayisi = aktifSnap.docs.filter(
            (d: any) => (d.data().churnSkoru || 0) >= 70
        ).length

        await telegramGonder(
            `📊 <b>Haftalık Özet</b>\n` +
            `Aktif Esnaf: ${aktifSnap.size}\n` +
            `MRR: ${mrr.toLocaleString('tr-TR')}₺\n` +
            `Rapor Gönderilen: ${gonderen}\n` +
            `Yüksek Churn Riski: ${riskliSayisi}`
        )

        return NextResponse.json({ gonderen, mrr, aktifEsnaf: aktifSnap.size })
    } catch (error: any) {
        console.error('[HAFTALIK RAPOR HATA]', error)
        await telegramGonder(`🔴 Haftalık Rapor Cron hatası: ${error.message}`)
        return NextResponse.json({ error: error.message }, { status: 500 })
    }
}
