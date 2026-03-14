import { adminDb } from '@/lib/firebaseAdmin'

// Esnafın geçmiş verisine göre ideal reklam bütçesi önerir
export async function idealButceOner(esnafId: string): Promise<{
    onerilen: number
    sebep: string
    beklenenROI: string
}> {
    const esnafDoc = await adminDb.collection('esnaflar').doc(esnafId).get()
    const esnaf = esnafDoc.data()!

    // Geçmiş reklam performansları
    const gecmisReklamlar = await adminDb
        .collection('reklamlar')
        .where('esnafId', '==', esnafId)
        .where('durum', '==', 'tamamlandi')
        .get()

    // Platform ortalamaları (Türkiye 2026, sektöre göre)
    const SEKTOR_CPL: Record<string, number> = {
        kuafor: 45,   // ₺45 per lead
        berber: 25,
        guzellik_merkezi: 60,
        restoran: 30,
        elektrikci: 80,
        tesisatci: 90,
        oto_servis: 70,
        default: 50,
    }

    const cpl = SEKTOR_CPL[esnaf.sektor] ?? SEKTOR_CPL.default
    const ltv = esnaf.ortalamaLTV ?? cpl * 8  // LTV tahmini
    const gunluk = Math.round(cpl * 1.5)         // Günde 1.5 lead hedefi

    // Geçmiş varsa gerçek CPL kullan
    if (!gecmisReklamlar.empty) {
        const toplamHarcama = gecmisReklamlar.docs.reduce(
            (s: any, d: any) => s + (d.data().performans?.harcama ?? 0), 0
        )
        const toplamLead = gecmisReklamlar.docs.reduce(
            (s: any, d: any) => s + (d.data().performans?.mesajBaslat ?? 0), 0
        )
        if (toplamLead > 0) {
            const gercekCPL = toplamHarcama / toplamLead
            return {
                onerilen: Math.round(gercekCPL * 1.5),
                sebep: `Geçmiş verinize göre müşteri başına ₺${Math.round(gercekCPL)} harcıyorsunuz`,
                beklenenROI: `Günlük ₺${Math.round(gercekCPL * 1.5)} → tahmini ${1.5} yeni müşteri (LTV: ₺${Math.round((gercekCPL * 1.5) * 8)})`,
            }
        }
    }

    return {
        onerilen: gunluk,
        sebep: `${esnaf.sektor || 'Sizin'} sektörünüzde İstanbul ortalama müşteri maliyeti üzerinden hesaplandı.`,
        beklenenROI: `Aylık ₺${gunluk * 30} → tahmini ${Math.round(gunluk * 30 / cpl)} yeni müşteri`,
    }
}
