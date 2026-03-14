import { adminDb, Timestamp } from '@/lib/firebaseAdmin'
import { waMesajGonder, esnafHitap } from '@/lib/twilioClient'

/** Dünkü AI konuşmalarının özetini WA ile esnafa gönder */
export async function sabahOzetiGonder(esnafId: string): Promise<void> {
    const dun = new Date()
    dun.setDate(dun.getDate() - 1)
    dun.setHours(0, 0, 0, 0)

    const konusmalar = await adminDb
        .collection('musteriKonusmalar')
        .where('esnafId', '==', esnafId)
        .where('zaman', '>=', Timestamp.fromDate(dun))
        .where('kimden', '==', 'musteri')
        .get()

    const randevular = await adminDb
        .collection('randevular')
        .where('esnafId', '==', esnafId)
        .where('kaynak', '==', 'whatsapp_ai')
        .where('olusturma', '>=', Timestamp.fromDate(dun))
        .get()

    if (konusmalar.empty && randevular.empty) return

    const benzersizMusteriler = new Set(
        konusmalar.docs.map((d: any) => d.data().musteriNumara)
    ).size

    const esnaf = (await adminDb.collection('esnaflar').doc(esnafId).get()).data()!

    let mesaj =
        `*Gunaydin ${esnafHitap(esnaf)}!*\n\n` +
        `Dun gece AI sizin yerinize calisti:\n\n` +
        `${benzersizMusteriler} musteri mesaj atti\n` +
        `${randevular.size} yeni randevu alindi\n`

    if (randevular.docs.length > 0) {
        mesaj += `\n*Bugunku randevular:*\n` +
            randevular.docs
                .map((d: any) => `- ${d.data().musteriAd} — ${d.data().saat} (${d.data().hizmet})`)
                .join('\n') + '\n'
    }

    mesaj += `\nDetaylar: ${process.env.NEXT_PUBLIC_APP_URL}/dashboard/konusmalar`

    await waMesajGonder(esnaf.waNumarasi, mesaj, esnafId, 'sabah_konusma_ozeti')
}
