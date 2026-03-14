/**
 * esnafAgi.ts — B2B Eşleştirme (Matchmaking) Algoritması
 *
 * Tedarik alarmı tetiklendiğinde:
 * 1. Sektörü uygun (Kasap/Toptancı) olan esnafları bul
 * 2. B2B satışa açık olanları filtrele
 * 3. Geo mesafe (Haversine) + Fiyat + Puan → composite skor
 * 4. En iyi 3 tedarikçiyi döndür
 */

import { adminDb } from '@/lib/firebaseAdmin'
import { tedarikciSonucSema, type TedarikciSonuc } from '@/lib/restoran/b2bTipler'

// ─── Haversine Mesafe Hesaplama ────────────────────────────────────────

function haversineKm(lat1: number, lon1: number, lat2: number, lon2: number): number {
    const R = 6371 // Dünya yarıçapı (km)
    const dLat = ((lat2 - lat1) * Math.PI) / 180
    const dLon = ((lon2 - lon1) * Math.PI) / 180
    const a =
        Math.sin(dLat / 2) ** 2 +
        Math.cos((lat1 * Math.PI) / 180) * Math.cos((lat2 * Math.PI) / 180) *
        Math.sin(dLon / 2) ** 2
    return R * 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a))
}

// ─── Composite Skor ────────────────────────────────────────────────────

function compositeScore(mesafeKm: number, fiyatKurus: number, puan: number): number {
    // Düşük skor = daha iyi
    const mesafeNorm = mesafeKm / 50
    const fiyatNorm = fiyatKurus / 100000
    const puanNorm = 1 - (puan / 5)
    return mesafeNorm * 0.3 + fiyatNorm * 0.5 + puanNorm * 0.2
}

// ─── B2B Sektörleri ────────────────────────────────────────────────────

const TEDARIK_SEKTORLERI = [
    'kasap', 'toptanci', 'bakliyat', 'manav', 'su_dagitim',
    'temizlik', 'ambalaj', 'sut_urunleri', 'firinci',
]

// ─── Ana Eşleştirme Fonksiyonu ─────────────────────────────────────────

export interface TedarikciAramaOpt {
    esnafId: string
    malzemeAdi: string
    maxMesafeKm?: number
    maxSonuc?: number
}

export async function tedarikciAra(opts: TedarikciAramaOpt): Promise<TedarikciSonuc[]> {
    const { esnafId, malzemeAdi, maxMesafeKm = 30, maxSonuc = 3 } = opts

    // 1. Alıcı esnafın konumunu al
    const aliciDoc = await adminDb.collection('esnaflar').doc(esnafId).get()
    if (!aliciDoc.exists) return []

    const aliciData = aliciDoc.data()!
    const aliciLat = aliciData.konum?.lat || aliciData.lat || 41.0082
    const aliciLon = aliciData.konum?.lng || aliciData.lng || 28.9784

    // 2. B2B satışa açık esnafları çek
    const esnaflarSnap = await adminDb
        .collection('esnaflar')
        .where('b2bAktif', '==', true)
        .limit(200)
        .get()

    if (esnaflarSnap.empty) return []

    // 3. Her tedarikçiyi skorla
    const adaylar: TedarikciSonuc[] = []

    for (const doc of esnaflarSnap.docs) {
        if (doc.id === esnafId) continue

        const data = doc.data()
        const sektor = (data.sektor || '').toLowerCase()
        if (!TEDARIK_SEKTORLERI.some(s => sektor.includes(s))) continue

        const saticiLat = data.konum?.lat || data.lat || 0
        const saticiLon = data.konum?.lng || data.lng || 0
        if (!saticiLat || !saticiLon) continue

        const mesafe = haversineKm(aliciLat, aliciLon, saticiLat, saticiLon)
        if (mesafe > maxMesafeKm) continue

        // B2B kataloğunda malzeme ara
        const katalogSnap = await adminDb
            .collection('esnaflar')
            .doc(doc.id)
            .collection('b2b_katalog')
            .where('aktif', '==', true)
            .limit(100)
            .get()

        const malzemeLower = malzemeAdi.toLowerCase()
        const eslesen = katalogSnap.docs.find((k: FirebaseFirestore.QueryDocumentSnapshot) => {
            const urunAdi = (k.data().urunAdi || '').toLowerCase()
            return urunAdi.includes(malzemeLower) || malzemeLower.includes(urunAdi)
        })

        if (!eslesen) continue

        const katalogData = eslesen.data()
        const stokDurumu = katalogData.stokDurumu || 'var'
        if (stokDurumu === 'yok') continue

        const birimFiyatKurus = katalogData.birimFiyatKurus || 0
        const puan = data.b2bPuan || data.puan || 3
        const skor = compositeScore(mesafe, birimFiyatKurus, puan)

        const sonuc: TedarikciSonuc = {
            esnafId: doc.id,
            isletmeAdi: data.ad || data.isletmeAdi || 'İsimsiz',
            mesafeKm: Math.round(mesafe * 10) / 10,
            birimFiyatKurus,
            birim: katalogData.birim || 'kg',
            puan: Math.round(puan * 10) / 10,
            skor: Math.round(skor * 1000) / 1000,
            stokDurumu: stokDurumu as 'var' | 'sinirli' | 'yok',
        }

        const validated = tedarikciSonucSema.safeParse(sonuc)
        if (validated.success) adaylar.push(validated.data)
    }

    adaylar.sort((a, b) => a.skor - b.skor)
    return adaylar.slice(0, maxSonuc)
}
