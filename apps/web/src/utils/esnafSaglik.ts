import { adminDb, Timestamp } from '@/lib/firebaseAdmin'

export interface SaglikSkoru {
    toplam: number
    bilesenler: {
        site: number      // 25p — site canlı mı, son güncelleme?
        icerik: number    // 25p — düzenli içerik üretimi
        yanit: number     // 20p — müşteri yanıt durumu
        yorum: number     // 20p — Google yorum trendi
        katilim: number   // 10p — dashboard kullanım
    }
    oneriler: string[]
}

export async function esnafSaglikSkoru(esnafId: string): Promise<SaglikSkoru> {
    const esnaf = (await adminDb.collection('esnaflar').doc(esnafId).get()).data()!
    const birHafta = new Date(Date.now() - 7 * 24 * 60 * 60 * 1000)

    // Site puanı (25p)
    const siteAktif = esnaf.subdomainUrl ? 15 : 0
    const siteGuncel = esnaf.siteGuncelleme?.toDate?.() > birHafta ? 10 : 5
    const sitePuan = siteAktif + siteGuncel

    // İçerik puanı (25p)
    const icerikQuery = await adminDb.collection('icerikler')
        .where('esnafId', '==', esnafId)
        .where('olusturma', '>=', Timestamp.fromDate(birHafta))
        .get()
    const icerikPuan = Math.min(25, icerikQuery.size * 3)

    // Yanıt puanı (20p)
    const yanitsizQuery = await adminDb.collection('musteriKonusmalar')
        .where('esnafId', '==', esnafId)
        .where('kimden', '==', 'musteri')
        .where('yanitlandi', '==', false)
        .get()
    const yanitPuan = Math.max(0, 20 - yanitsizQuery.size * 5)

    // Yorum puanı (20p)
    const yorumQuery = await adminDb.collection('yorumlar')
        .where('esnafId', '==', esnafId)
        .orderBy('tarih', 'desc')
        .limit(10)
        .get()
    const ortalamaYorum = yorumQuery.docs.length > 0
        ? yorumQuery.docs.reduce((s: number, d: any) => s + d.data().yildiz, 0) / yorumQuery.docs.length
        : 3
    const yorumPuan = Math.round((ortalamaYorum / 5) * 20)

    // Katılım puanı (10p)
    const loginQuery = await adminDb.collection('loginLoglari')
        .where('esnafId', '==', esnafId)
        .where('zaman', '>=', Timestamp.fromDate(birHafta))
        .get()
    const katilimPuan = Math.min(10, loginQuery.size * 2)

    const toplam = sitePuan + icerikPuan + yanitPuan + yorumPuan + katilimPuan

    const oneriler: string[] = []
    if (sitePuan < 20) oneriler.push('Sitenizi guncelleyin — son 7 gunde guncellenmedi')
    if (icerikPuan < 15) oneriler.push('Bu hafta daha az icerik uretildi')
    if (yanitPuan < 15) oneriler.push('Yanitlanmamis musteri mesajlari var')
    if (yorumPuan < 12) oneriler.push('Google yorumlariniz dusuyor — yanit stratejisi gerekebilir')
    if (katilimPuan < 6) oneriler.push('Dashboard\'a daha sik bakin — firsatlari kacirabilirsiniz')

    return {
        toplam,
        bilesenler: { site: sitePuan, icerik: icerikPuan, yanit: yanitPuan, yorum: yorumPuan, katilim: katilimPuan },
        oneriler,
    }
}
