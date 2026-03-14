import { NextResponse } from 'next/server'
import { adminDb, silKoleksiyon } from '@/lib/firebaseAdmin'
import { waMesajGonder } from '@/lib/twilioClient'
import { telegramGonder } from '@/lib/telegram'
import { apiGuard } from '@/lib/apiGuard'
import { subdomainSil } from '@/lib/cloudflare'

/**
 * KVKK Veri Saklama ve İmha Cron — Cloud Scheduler
 * Schedule: 0 0 * * * (03:00 TR = 00:00 UTC)
 */
export async function GET(request: Request) {
    const guard = await apiGuard(request, { requireCronSecret: true })
    if (!guard.ok) return guard.response

    const simdiki = new Date()
    const uyarilan: string[] = []
    const arsivlenen: string[] = []
    const silinen: string[] = []

    try {
        const snap = await adminDb
            .collection('esnaflar')
            .where('durum', '==', 'pasif')
            .get()

        for (const doc of snap.docs) {
            const esnaf = doc.data()
            const iptalTarihi = esnaf.iptalTarihi?.toDate?.()
            if (!iptalTarihi) continue

            const gunFarki =
                (simdiki.getTime() - iptalTarihi.getTime()) / 86_400_000

            // 7. GÜN: Uyarı mesajı
            if (gunFarki >= 7 && !esnaf.uyariGonderildi) {
                await waMesajGonder(
                    esnaf.waNumarasi,
                    `${esnaf.ad} ${esnaf.unvan}, kepenk.ai aboneliğiniz sona erdi.\n` +
                    `Verileriniz 37 gün içinde silinecektir.\n` +
                    `Geri dönmek için: ${process.env.NEXT_PUBLIC_APP_URL}`
                )
                await doc.ref.update({ uyariGonderildi: true })
                uyarilan.push(doc.id)
            }

            // 14. GÜN: CF DNS deaktive
            if (gunFarki >= 14 && !esnaf.arsivlendi) {
                if (esnaf.subdomain) await subdomainSil(esnaf.subdomain)
                await doc.ref.update({ arsivlendi: true })
                arsivlenen.push(doc.id)
            }

            // 44. GÜN: Kalıcı silme
            if (gunFarki >= 44) {

                await doc.ref.update({
                    ad: 'ANONİM',
                    unvan: 'ANONİM',
                    telefon: 'SİLİNDİ',
                    waNumarasi: 'SİLİNDİ',
                    adres: 'SİLİNDİ',
                    durum: 'silindi',
                })

                await Promise.all([
                    silKoleksiyon('icerikler', 'esnafId', doc.id),
                    silKoleksiyon('yorumlar', 'esnafId', doc.id),
                    silKoleksiyon('ciro_anket', 'esnafId', doc.id),
                    silKoleksiyon('kota_kullanim', 'esnafId', doc.id),
                ])

                silinen.push(doc.id)
            }
        }

        await telegramGonder(
            `🗑️ <b>KVKK Purge</b>\n` +
            `Uyarılan: ${uyarilan.length}\n` +
            `Arşivlenen: ${arsivlenen.length}\n` +
            `Silinen: ${silinen.length}\n` +
            `Tarih: ${simdiki.toLocaleDateString('tr-TR')}`
        )

        return NextResponse.json({ uyarilan: uyarilan.length, arsivlenen: arsivlenen.length, silinen: silinen.length })
    } catch (error: any) {
        console.error('[KVKK CRON HATA]', error)
        await telegramGonder(`🔴 KVKK Cron hatası: ${error.message}`)
        return NextResponse.json({ error: error.message }, { status: 500 })
    }
}
