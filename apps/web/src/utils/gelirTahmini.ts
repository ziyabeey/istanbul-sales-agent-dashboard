import { adminDb, Timestamp } from '@/lib/firebaseAdmin'

export interface GelirTahmini {
    buHafta: { min: number; max: number; tahmini: number }
    buAy: { min: number; max: number; tahmini: number }
    trend: 'yukseliyor' | 'dusuyor' | 'stabil'
    faktörler: string[]
}

export async function gelirTahminEt(esnafId: string): Promise<GelirTahmini> {
    // Son 3 aydaki randevu verisini çek
    const ucAyOnce = new Date(Date.now() - 90 * 24 * 60 * 60 * 1000)
    const randevular = await adminDb
        .collection('randevular')
        .where('esnafId', '==', esnafId)
        .where('tarih', '>=', Timestamp.fromDate(ucAyOnce))
        .where('durum', '==', 'tamamlandi')
        .orderBy('tarih', 'asc')
        .get()

    const esnafDoc = await adminDb.collection('esnaflar').doc(esnafId).get()
    const esnaf = esnafDoc.data()!
    const sektor = esnaf.sektor || 'default'

    // Ortalama randevu değeri (sektöre göre tahmin)
    const ORTALAMA_RANDEVU_DEGERI: Record<string, number> = {
        kuafor: 250,
        berber: 100,
        guzellik_merkezi: 400,
        masaj_spa: 500,
        restoran: 150,  // kişi başı
        elektrikci: 800,
        tesisatci: 700,
        boyaci: 2500,
        oto_servis: 500,
        diyetisyen: 400,
        default: 300,
    }

    const birimDeger = ORTALAMA_RANDEVU_DEGERI[sektor] ?? ORTALAMA_RANDEVU_DEGERI.default

    // Haftalık ortalama randevu
    const toplamRandevu = randevular.size
    const haftaSayisi = 13  // 3 ay ≈ 13 hafta
    const haftaOrtalama = Math.max(0, toplamRandevu / haftaSayisi)

    // Trend hesapla (son 4 hafta vs önceki 4 hafta)
    const dortHaftaOnce = new Date(Date.now() - 28 * 24 * 60 * 60 * 1000)
    const sekizHaftaOnce = new Date(Date.now() - 56 * 24 * 60 * 60 * 1000)

    const sonDortHafta = randevular.docs.filter(
        (d: any) => {
            const t = d.data().tarih?.toDate ? d.data().tarih.toDate() : new Date(0)
            return t >= dortHaftaOnce
        }
    ).length

    const oncekiDortHafta = randevular.docs.filter((d: any) => {
        const t = d.data().tarih?.toDate ? d.data().tarih.toDate() : new Date(0)
        return t >= sekizHaftaOnce && t < dortHaftaOnce
    }).length

    const trend: GelirTahmini['trend'] =
        sonDortHafta > oncekiDortHafta * 1.1 ? 'yukseliyor'
            : sonDortHafta < oncekiDortHafta * 0.9 ? 'dusuyor'
                : 'stabil'

    // Faktörler
    const faktorler: string[] = []

    // Bekleyen randevular bu hafta
    const buHaftaSonu = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000)
    const bekleyenQuery = await adminDb
        .collection('randevular')
        .where('esnafId', '==', esnafId)
        .where('tarih', '>=', Timestamp.now())
        .where('tarih', '<=', Timestamp.fromDate(buHaftaSonu))
        .where('durum', '==', 'bekliyor')
        .get()

    const buHaftaOnaylı = bekleyenQuery.size
    const buHaftaTahmini = Math.round(((haftaOrtalama + buHaftaOnaylı) / 2) * birimDeger)

    if (trend === 'yukseliyor')
        faktorler.push(`Son 4 haftada randevu sayınız %${Math.round((sonDortHafta - oncekiDortHafta) / Math.max(1, oncekiDortHafta) * 100)} arttı`)
    if (buHaftaOnaylı > 0)
        faktorler.push(`Bu hafta zaten ${buHaftaOnaylı} randevu onaylandı`)

    return {
        buHafta: {
            min: Math.round(buHaftaTahmini * 0.7),
            max: Math.round(buHaftaTahmini * 1.3),
            tahmini: buHaftaTahmini,
        },
        buAy: {
            min: Math.round(buHaftaTahmini * 4 * 0.8),
            max: Math.round(buHaftaTahmini * 4 * 1.2),
            tahmini: Math.round(buHaftaTahmini * 4),
        },
        trend,
        faktörler: faktorler,
    }
}
