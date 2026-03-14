import { adminDb, Timestamp } from '@/lib/firebaseAdmin'
import { esnafSaglikSkoru } from './esnafSaglik'

/** Aynı ilçe + sektördeki aktif esnafları sağlık skoruna göre sırala */
export async function yakinEsnafBul(params: {
    arayanEsnafId: string
    aranilanSektor: string
    ilce: string
}): Promise<{ esnafId: string; ad: string; skor: number }[]> {
    const snapshot = await adminDb
        .collection('esnaflar')
        .where('sektor', '==', params.aranilanSektor)
        .where('ilce', '==', params.ilce)
        .where('durum', '==', 'aktif')
        .limit(10)
        .get()

    const skorlar = await Promise.all(
        snapshot.docs.map(async (d: any) => ({
            esnafId: d.id,
            ad: d.data().isletmeAdi || d.data().ad,
            skor: (await esnafSaglikSkoru(d.id).catch(() => ({ toplam: 50 }))).toplam,
        }))
    )

    return skorlar
        .filter(e => e.esnafId !== params.arayanEsnafId)
        .sort((a, b) => b.skor - a.skor)
        .slice(0, 3)
}

/** Referans kaydı oluştur, veren esnafa +1 puan */
export async function referansKaydet(params: {
    verenEsnafId: string
    alanEsnafId: string
    musteriNumara: string
}): Promise<void> {
    await adminDb.collection('referanslar').add({
        ...params,
        zaman: Timestamp.now(),
        durum: 'bekliyor',
    })

    const { FieldValue } = await import('@/lib/firebaseAdmin')
    await adminDb.collection('esnaflar').doc(params.verenEsnafId).update({
        referansPuani: FieldValue.increment(1),
    })
}
