import { adminDb, Timestamp } from '@/lib/firebaseAdmin'

export async function bosKapasiteTespitEt(esnafId: string): Promise<{
    bosGunler: string[]
    dolulukOrani: number
    onerim: string
}> {
    const buHaftaSonu = new Date()
    buHaftaSonu.setDate(buHaftaSonu.getDate() + 7)
    buHaftaSonu.setHours(23, 59, 59)

    const randevular = await adminDb
        .collection('randevular')
        .where('esnafId', '==', esnafId)
        .where('tarih', '>=', Timestamp.now())
        .where('tarih', '<=', Timestamp.fromDate(buHaftaSonu))
        .get()

    const gunler = ['Pzt', 'Sal', 'Çar', 'Per', 'Cum', 'Cmt']
    const randevuGunleri = randevular.docs.map((d: any) => {
        const tarih = d.data().tarih?.toDate ? d.data().tarih.toDate() : new Date()
        return tarih.getDay()  // 0=Pz, 1=Pzt...
    })

    const bosGunler: string[] = []
    for (let i = 0; i < 6; i++) {
        const gunRandevu = randevuGunleri.filter((g: any) => g === (i === 0 ? 1 : i + 1)).length
        if (gunRandevu < 2) bosGunler.push(gunler[i])
    }

    const dolulukOrani = Math.round((randevular.size / (6 * 4)) * 100)  // Örnek: 6 gün × 4 slot

    const onerim = bosGunler.length > 0
        ? `${bosGunler.join(', ')} günlerinde yer var. Kampanya göndererek doldurmak ister misiniz?`
        : 'Bu hafta doluluk oranınız yüksek, tebrikler!'

    return { bosGunler, dolulukOrani, onerim }
}
