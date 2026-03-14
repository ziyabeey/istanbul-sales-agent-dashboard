import { adminDb } from '@/lib/firebaseAdmin'
import { Timestamp } from 'firebase-admin/firestore'
import { ogrenmeAniKaydet } from '@/lib/kolektifZeka'

/**
 * Kampanya AI tarafından gönderilen bir "Outbound (Saha Satış/Re-engagment)" mesajın 
 * yollanmasından sonraki 24 saat içinde o müşterinin (tel no ile eşlenen) geri
 * dönüp randevu/satış oluşturup oluşturmadığını ölçer ve Kolektife Zerk Eder.
 */
export async function kampanyaPerformansKaydet(
    logId: string,
    esnafId: string,
    tip: string
): Promise<void> {
    const logDoc = await adminDb.collection('kampanyaLoglari').doc(logId).get()
    const log = logDoc.data()
    if (!log || log.ogrenmeGonderildi) return

    const esnafDoc = await adminDb.collection('esnaflar').doc(esnafId).get()
    const esnaf = esnafDoc.data()
    if (!esnaf) return

    const yirmiDortSaatSonra = new Date(log.zaman.toDate().getTime() + 24 * 60 * 60 * 1000)

    // Bu kampanya kurbanı numara, kampanya mesajından sonraki 24s içinde geldi mi?
    const randevular = await adminDb.collection('randevular')
        .where('esnafId', '==', esnafId)
        .where('musteriTelefon', '==', log.hedefNumara)
        .where('olusturma', '>=', log.zaman)
        .where('olusturma', '<=', Timestamp.fromDate(yirmiDortSaatSonra))
        .get()

    const donustuMu = !randevular.empty

    await ogrenmeAniKaydet(esnaf, {
        tip: 'kampanya_performans',
        sektor: esnaf.sektor,
        ilce: esnaf.ilce,
        sehir: esnaf.sehir,
        paket: esnaf.paket,
        baglam: `${esnaf.sektor}, ${esnaf.ilce}, kampanya tipi: ${tip}`,
        eylem: `"${(log.mesaj || '').substring(0, 100)}" mesajı gönderildi`,
        sonuc: donustuMu ? 'Randevuya dönüştü (24s içinde)' : 'Yanıt alınamadı / Dönüşmedi',
        metrikler: { donusumOrani: donustuMu ? 1 : 0 },
        icerik: `${esnaf.sektor} sektörü için atılan "${tip}" tipi WhatsApp mesajı → ${donustuMu ? 'Dönüşüm (BAŞARILI)' : 'Sallanmadı'}`,
        zaman: new Date().toISOString(),
        ay: new Date().toISOString().slice(0, 7),
    })

    // Tekrarlı çalışmayı önle
    await logDoc.ref.update({ ogrenmeGonderildi: true })
}
