import { adminDb } from '@/lib/firebaseAdmin'
import { Timestamp } from 'firebase-admin/firestore'
import { ogrenmeAniKaydet } from '@/lib/kolektifZeka'

export interface ABTest {
    id: string
    esnafId: string
    tip: 'icerik_format' | 'kampanya_mesaj' | 'reklam_kreatif'
    variantA: string
    variantB: string
    baslayanTarih: Timestamp
    bitis?: Timestamp
    sonuc?: {
        kazanan: 'A' | 'B' | 'belirsiz'
        aDonusumOrani: number
        bDonusumOrani: number
        guvenSeviyesi: number
    }
}

export async function abTestBaslat(params: {
    esnafId: string
    tip: ABTest['tip']
    variantA: string
    variantB: string
}): Promise<string> {
    const id = `ab_${Date.now()}_${Math.random().toString(36).slice(2, 6)}`

    await adminDb.collection('abTestler').doc(id).set({
        id,
        ...params,
        baslayanTarih: Timestamp.now(),
        sonuc: null,
    })

    return id
}

export async function abTestSonuclandir(testId: string): Promise<void> {
    const testDoc = await adminDb.collection('abTestler').doc(testId).get()
    const test = testDoc.data() as ABTest | undefined
    if (!test || test.sonuc) return

    // İlgili test üzerinden gönderilen varyantları toplayıp dönüşümlerine bak
    const aLoglari = await adminDb.collection('kampanyaLoglari')
        .where('abTestId', '==', testId)
        .where('variant', '==', 'A')
        .get()

    const bLoglari = await adminDb.collection('kampanyaLoglari')
        .where('abTestId', '==', testId)
        .where('variant', '==', 'B')
        .get()

    const aDonusum = aLoglari.docs.filter((d: any) => Boolean(d.data().randevuyaDonustu)).length / Math.max(1, aLoglari.size)
    const bDonusum = bLoglari.docs.filter((d: any) => Boolean(d.data().randevuyaDonustu)).length / Math.max(1, bLoglari.size)

    const kazanan = aDonusum > bDonusum + 0.1 ? 'A'
        : bDonusum > aDonusum + 0.1 ? 'B'
            : 'belirsiz'

    const sonuc: ABTest['sonuc'] = {
        kazanan,
        aDonusumOrani: aDonusum,
        bDonusumOrani: bDonusum,
        guvenSeviyesi: Math.min(1, (aLoglari.size + bLoglari.size) / 50),
    }

    await testDoc.ref.update({ sonuc, bitis: Timestamp.now() })

    // Kazanan belli olduysa Kolektif Zekaya öğret
    if (kazanan !== 'belirsiz') {
        const esnafDoc = await adminDb.collection('esnaflar').doc(test.esnafId).get()
        const esnaf = esnafDoc.data()
        if (esnaf) {
            await ogrenmeAniKaydet(esnaf, {
                tip: test.tip === 'icerik_format' ? 'icerik_performans' : 'kampanya_performans',
                sektor: esnaf.sektor,
                ilce: esnaf.ilce,
                sehir: esnaf.sehir,
                paket: esnaf.paket,
                baglam: `A/B Test Çıktısı, ${test.tip}`,
                eylem: `Kazanan Varyant: ${kazanan === 'A' ? test.variantA : test.variantB}`,
                sonuc: `%${Math.round((kazanan === 'A' ? aDonusum : bDonusum) * 100)} dönüşüm sağladı`,
                metrikler: {
                    donusumOrani: kazanan === 'A' ? aDonusum : bDonusum,
                },
                icerik: `${esnaf.sektor} sektörü için A/B test kazananı: "${kazanan === 'A' ? test.variantA.substring(0, 70) : test.variantB.substring(0, 70)}" formatı oldu.`,
                zaman: new Date().toISOString(),
                ay: new Date().toISOString().slice(0, 7),
            })
        }
    }
}
