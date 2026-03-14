import { adminDb } from '@/lib/firebaseAdmin'
import { Timestamp } from 'firebase-admin/firestore'
import { ogrenmeAniKaydet } from '@/lib/kolektifZeka'

/**
 * Gönderilen bir içeriğin 48 saatlik röntgenini çekerek (randevu geldi mi?) kolektif zekaya yazar.
 * API/CRON tarafından günlük tetiklenir.
 */
export async function icerikPerformansKaydet(icerikId: string): Promise<void> {
    const icerikDoc = await adminDb.collection('icerikler').doc(icerikId).get()
    const icerik = icerikDoc.data()
    if (!icerik || icerik.ogrenmeGonderildi) return

    const esnafDoc = await adminDb.collection('esnaflar').doc(icerik.esnafId).get()
    const esnaf = esnafDoc.data()
    if (!esnaf) return

    const kirkSekizSaatSonra = new Date(icerik.olusturma.toDate().getTime() + 48 * 60 * 60 * 1000)

    // Bu içerik oluşturulduktan sonraki 48 saat içinde gelen randevuları bul
    const sonraRandevu = await adminDb.collection('randevular')
        .where('esnafId', '==', icerik.esnafId)
        .where('olusturma', '>=', icerik.olusturma)
        .where('olusturma', '<=', Timestamp.fromDate(kirkSekizSaatSonra))
        .get()

    // O günün adını bul (Örn. Pazartesi)
    const gunAdi = new Date(icerik.olusturma.toDate()).toLocaleDateString('tr-TR', { weekday: 'long' })

    await ogrenmeAniKaydet(esnaf, {
        tip: 'icerik_performans',
        sektor: esnaf.sektor,
        ilce: esnaf.ilce,
        sehir: esnaf.sehir,
        paket: esnaf.paket,
        baglam: `${esnaf.sektor}, ${esnaf.ilce}, ${icerik.platform}, ${icerik.format}, ${gunAdi}`,
        eylem: `${icerik.platform} için ${icerik.format} formatında içerik: "${(icerik.metül || icerik.metin || '').substring(0, 80)}"`,
        sonuc: sonraRandevu.size > 0
            ? `${sonraRandevu.size} randevu geldi (48s içinde)`
            : 'Randevuya dönüşmedi',
        metrikler: {
            donusumOrani: sonraRandevu.size > 0 ? 1 : 0,
            gelirEtkisi: sonraRandevu.size * (esnaf.istatistik?.ortalamaHizmetUcreti ?? 300),
        },
        icerik: `${esnaf.sektor} ${esnaf.ilce} bölgesinde ${gunAdi} günü çıkılan ${icerik.format} içeriği → ${sonraRandevu.size > 0 ? 'Dönüşüm Aldı' : 'Başarısız'}`,
        zaman: new Date().toISOString(),
        ay: new Date().toISOString().slice(0, 7),
    })

    // Cift atılmaması için flag koy
    await icerikDoc.ref.update({ ogrenmeGonderildi: true })
}
