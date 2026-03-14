import { adminDb, Timestamp } from '@/lib/firebaseAdmin'

export async function buyumeSkoruHesapla(esnafId: string): Promise<{
    skor: number
    siralama: number
    kategori: string
    rozetler: string[]
    buAyDegisim: number  // % değişim
}> {
    const birayOnce = new Date(Date.now() - 30 * 24 * 60 * 60 * 1000)
    const ikiayOnce = new Date(Date.now() - 60 * 24 * 60 * 60 * 1000)

    const [buAyRandevu, gecenAyRandevu, buAyMesaj, gecenAyMesaj] = await Promise.all([
        adminDb.collection('randevular').where('esnafId', '==', esnafId)
            .where('olusturma', '>=', Timestamp.fromDate(birayOnce)).get(),
        adminDb.collection('randevular').where('esnafId', '==', esnafId)
            .where('olusturma', '>=', Timestamp.fromDate(ikiayOnce))
            .where('olusturma', '<', Timestamp.fromDate(birayOnce)).get(),
        adminDb.collection('musteriProfiller').where('esnafId', '==', esnafId)
            .where('ilkTemas', '>=', Timestamp.fromDate(birayOnce)).get(),
        adminDb.collection('musteriProfiller').where('esnafId', '==', esnafId)
            .where('ilkTemas', '>=', Timestamp.fromDate(ikiayOnce))
            .where('ilkTemas', '<', Timestamp.fromDate(birayOnce)).get(),
    ])

    const randevuBuyume = gecenAyRandevu.size > 0
        ? ((buAyRandevu.size - gecenAyRandevu.size) / gecenAyRandevu.size) * 100
        : 0

    const yeniMusteri = buAyMesaj.size

    // Büyüme skoru hesapla (0-1000)
    const skor = Math.round(
        randevuBuyume * 3 +   // Randevu büyümesi çarpanı
        yeniMusteri * 10     // Yeni müşteri çarpanı
    )

    // Sınırla
    const finalSkor = Math.min(Math.max(skor, 0), 1000)

    // Rozetler
    const rozetler: string[] = []
    if (randevuBuyume > 20) rozetler.push('🚀 Hızla Büyüyor')
    if (yeniMusteri > 10) rozetler.push('⭐ Yeni Müşteri Manyeti')
    if (finalSkor > 500) rozetler.push('🏆 Bu Ay En İyilerden')

    // DB Kaydet
    await adminDb.collection('buyumeSkorlari').doc(esnafId).set({
        esnafId,
        skor: finalSkor,
        rozetler,
        randevuBuyume,
        yeniMusteri,
        zaman: Timestamp.now(),
    })

    return {
        skor: finalSkor,
        siralama: 0,  // Platform geneli sıralama (ayrı bir liderlik job'ı ile güncellenecek)
        kategori: finalSkor > 700 ? 'Rocket' : finalSkor > 400 ? 'Rising' : 'Steady',
        rozetler,
        buAyDegisim: randevuBuyume,
    }
}
