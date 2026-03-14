/**
 * musteriEslestirme.ts — Müşteri-Mülk Eşleştirme Motoru
 * ══════════════════════════════════════════════════════════════════════
 * Müşteri talep kriterlerini portföydeki ilanlarla eşleştirir.
 * 0-100 uyum puanı ile sıralı liste döndürür.
 */

import { adminDb } from '@/lib/firebaseAdmin'
import { FieldValue } from 'firebase-admin/firestore'
import type { Mulk, EmlakMusteri, MusteriTalep } from './EmlakTypes'
import { odaSayisiniTopla } from './EmlakTypes'

// ═══ EŞLEŞTİRME SONUCU ═════════════════════════════════════════════════

export interface EslesmeSonuc {
    mulkId: string
    baslik: string
    fiyatTL: number
    il: string
    ilce: string
    mahalle: string
    oda_sayisi: string
    metrekare: number
    ana_foto_url?: string
    uyum_puani: number       // 0-100
    uyum_detaylari: UyumDetay[]
}

interface UyumDetay {
    kriter: string
    puan: number
    maxPuan: number
    aciklama: string
}

// ═══ PUAN AĞIRLIKLARI ═══════════════════════════════════════════════════

const AGIRLIKLAR = {
    konum: 30,           // İl + İlçe eşleşmesi
    fiyat: 25,           // Fiyat aralığı uyumu
    fiziki: 25,          // Oda + Metrekare
    opsiyonel: 20,       // Asansör, otopark, site, eşyalı, kredi
} as const

// ═══ ANA EŞLEŞTİRME FONKSİYONU ═════════════════════════════════════════

/**
 * Müşterinin talep kriterlerine göre portföyden eşleşen mülkleri bul.
 * Uyum puanına göre sıralı ilk 10 sonuç döndürür.
 */
export async function musteriIcinEslestir(
    esnafId: string,
    musteriId: string
): Promise<EslesmeSonuc[]> {
    // Müşteriyi çek
    const musteriDoc = await adminDb
        .collection('esnaflar')
        .doc(esnafId)
        .collection('emlak_musteriler')
        .doc(musteriId)
        .get()

    if (!musteriDoc.exists) {
        console.error('[eslestirme] Müşteri bulunamadı:', musteriId)
        return []
    }

    const musteri = musteriDoc.data() as EmlakMusteri
    if (!musteri.talep) {
        console.warn('[eslestirme] Müşteri talep kriterleri yok:', musteriId)
        return []
    }

    // Aktif ilanları çek
    const mulklerSnap = await adminDb
        .collection('esnaflar')
        .doc(esnafId)
        .collection('mulkler')
        .where('durum', 'in', ['ilan_aktif', 'gosterimde'])
        .where('ilanTipi', '==', musteri.talep.ilan_tipi)
        .get()

    if (mulklerSnap.empty) return []

    // Her mülk için uyum puanı hesapla
    const sonuclar: EslesmeSonuc[] = []

    for (const doc of mulklerSnap.docs) {
        const mulk = { mulkId: doc.id, ...doc.data() } as Mulk

        const { toplamPuan, detaylar } = uyumPuaniHesapla(mulk, musteri.talep)

        if (toplamPuan > 0) {
            const anaFoto = mulk.fotograflar?.find(f => f.ana_foto) || mulk.fotograflar?.[0]
            sonuclar.push({
                mulkId: mulk.mulkId,
                baslik: mulk.baslik,
                fiyatTL: mulk.fiyatTL,
                il: mulk.il,
                ilce: mulk.ilce,
                mahalle: mulk.mahalle,
                oda_sayisi: mulk.oda_sayisi,
                metrekare: mulk.metrekare,
                ana_foto_url: anaFoto?.url,
                uyum_puani: toplamPuan,
                uyum_detaylari: detaylar,
            })
        }
    }

    // Puanla sırala ve ilk 10
    sonuclar.sort((a, b) => b.uyum_puani - a.uyum_puani)
    const ilk10 = sonuclar.slice(0, 10)

    // Eşleşme sonuçlarını Firestore'a kaydet
    if (ilk10.length > 0) {
        const eslesmRef = adminDb
            .collection('esnaflar')
            .doc(esnafId)
            .collection('emlak_musteriler')
            .doc(musteriId)
            .collection('eslesme_sonuclari')
            .doc('son_eslesme')

        await eslesmRef.set({
            sonuclar: ilk10.map(s => ({
                mulkId: s.mulkId,
                baslik: s.baslik,
                uyum_puani: s.uyum_puani,
            })),
            toplam_bulunan: sonuclar.length,
            hesaplama_tarihi: FieldValue.serverTimestamp(),
        })
    }

    console.log(`[eslestirme] Müşteri ${musteriId} → ${sonuclar.length} mülk bulundu, en yüksek puan: ${ilk10[0]?.uyum_puani || 0}`)

    return ilk10
}

// ═══ PUAN HESAPLAMA ═════════════════════════════════════════════════════

function uyumPuaniHesapla(
    mulk: Mulk,
    talep: MusteriTalep
): { toplamPuan: number; detaylar: UyumDetay[] } {
    const detaylar: UyumDetay[] = []

    // 1. KONUM (30 puan)
    let konumPuan = 0
    if (mulk.il.toLowerCase() === talep.il.toLowerCase()) {
        konumPuan += 10 // İl eşleşmesi
        if (talep.ilceler.some(ilce => mulk.ilce.toLowerCase() === ilce.toLowerCase())) {
            konumPuan += 20 // İlçe eşleşmesi
        } else {
            konumPuan += 5 // Aynı il ama farklı ilçe
        }
    }
    detaylar.push({
        kriter: 'Konum',
        puan: konumPuan,
        maxPuan: AGIRLIKLAR.konum,
        aciklama: konumPuan >= 25 ? 'İl ve ilçe uyuyor' : konumPuan >= 10 ? 'İl uyuyor, farklı ilçe' : 'Konum uyuşmuyor',
    })

    // 2. FİYAT (25 puan)
    let fiyatPuan = 0
    const fiyat = mulk.fiyatTL
    const minFiyat = talep.min_fiyat || 0
    const maxFiyat = talep.max_fiyat || Infinity
    const tolerans = maxFiyat * 0.10 // %10 tolerans marjı

    if (fiyat >= minFiyat && fiyat <= maxFiyat) {
        fiyatPuan = 25 // Tam uyum
    } else if (fiyat <= maxFiyat + tolerans && fiyat >= minFiyat) {
        fiyatPuan = 15 // %10 tolerans içinde
    } else if (fiyat <= maxFiyat * 1.20) {
        fiyatPuan = 5 // %20 üstünde ama gösterilmeye değer
    }
    detaylar.push({
        kriter: 'Fiyat',
        puan: fiyatPuan,
        maxPuan: AGIRLIKLAR.fiyat,
        aciklama: fiyatPuan === 25 ? 'Bütçe aralığında' : fiyatPuan >= 15 ? 'Yakın fiyat' : 'Bütçeyi aşıyor',
    })

    // 3. FİZİKİ ÖZELLİKLER (25 puan)
    let fizikiPuan = 0

    // Oda sayısı (15 puan)
    if (talep.min_oda) {
        const minOda = odaSayisiniTopla(talep.min_oda)
        const maxOda = talep.max_oda ? odaSayisiniTopla(talep.max_oda) : minOda + 2
        const mulkOda = odaSayisiniTopla(mulk.oda_sayisi)

        if (mulkOda >= minOda && mulkOda <= maxOda) {
            fizikiPuan += 15
        } else if (Math.abs(mulkOda - minOda) <= 1) {
            fizikiPuan += 8 // 1 oda fark toleransı
        }
    } else {
        fizikiPuan += 10 // Oda tercihi belirtilmemiş → kısmi puan
    }

    // Metrekare (10 puan)
    const minM2 = talep.min_metrekare || 0
    const maxM2 = talep.max_metrekare || Infinity
    if (mulk.metrekare >= minM2 && mulk.metrekare <= maxM2) {
        fizikiPuan += 10
    } else if (mulk.metrekare >= minM2 * 0.85 && mulk.metrekare <= maxM2 * 1.15) {
        fizikiPuan += 5 // ±%15 tolerans
    }

    // Mülk tipi kontrolü
    if (talep.mulk_tipleri.includes(mulk.mulkTipi)) {
        // Zaten doğru tip, puan eklenmesine gerek yok ama filtre görevini görür
    } else {
        fizikiPuan = Math.max(0, fizikiPuan - 10) // Yanlış tip cezası
    }

    detaylar.push({
        kriter: 'Fiziki Özellikler',
        puan: fizikiPuan,
        maxPuan: AGIRLIKLAR.fiziki,
        aciklama: `${mulk.oda_sayisi} oda, ${mulk.metrekare}m²`,
    })

    // 4. OPSİYONEL KRİTERLER (20 puan)
    let opsiyonelPuan = 0
    let opsiyonelSayisi = 0

    if (talep.asansor !== undefined) {
        opsiyonelSayisi++
        if (mulk.asansor === talep.asansor) opsiyonelPuan += 4
    }
    if (talep.otopark !== undefined) {
        opsiyonelSayisi++
        if (mulk.otopark === talep.otopark) opsiyonelPuan += 4
    }
    if (talep.site_ici !== undefined) {
        opsiyonelSayisi++
        if (mulk.site_icerisinde === talep.site_ici) opsiyonelPuan += 4
    }
    if (talep.esyali !== undefined) {
        opsiyonelSayisi++
        if (mulk.esyali === talep.esyali) opsiyonelPuan += 4
    }
    if (talep.kredi_uygun !== undefined) {
        opsiyonelSayisi++
        if (mulk.kredi_uygunlugu === talep.kredi_uygun) opsiyonelPuan += 4
    }

    // Opsiyonel kriter belirtilmediyse bonus ver
    if (opsiyonelSayisi === 0) {
        opsiyonelPuan = 15
    }

    const normalizeOpsiyonel = Math.min(opsiyonelPuan, AGIRLIKLAR.opsiyonel)
    detaylar.push({
        kriter: 'Opsiyonel',
        puan: normalizeOpsiyonel,
        maxPuan: AGIRLIKLAR.opsiyonel,
        aciklama: `${opsiyonelSayisi} opsiyonel kriter değerlendirildi`,
    })

    const toplamPuan = konumPuan + fiyatPuan + fizikiPuan + normalizeOpsiyonel

    return { toplamPuan: Math.min(100, toplamPuan), detaylar }
}

// ═══ OTOMATİK EŞLEŞTİRME (Yeni ilan eklendiğinde) ═════════════════════

/**
 * Yeni bir ilan aktifleştiğinde, tüm aktif müşterileri tara ve
 * eşleşen müşterilere bildirim gönder.
 */
export async function yeniIlanIcinMusterileriTara(
    esnafId: string,
    mulkId: string
): Promise<string[]> {
    const mulkDoc = await adminDb
        .collection('esnaflar')
        .doc(esnafId)
        .collection('mulkler')
        .doc(mulkId)
        .get()

    if (!mulkDoc.exists) return []
    const mulk = { mulkId, ...mulkDoc.data() } as Mulk

    // Aktif müşterileri çek
    const musteriSnap = await adminDb
        .collection('esnaflar')
        .doc(esnafId)
        .collection('emlak_musteriler')
        .where('durum', 'in', ['aktif', 'gezi_planlandi'])
        .get()

    const eslesmisler: string[] = []

    for (const mDoc of musteriSnap.docs) {
        const musteri = mDoc.data() as EmlakMusteri
        if (!musteri.talep) continue

        const { toplamPuan } = uyumPuaniHesapla(mulk, musteri.talep)

        if (toplamPuan >= 50) {
            eslesmisler.push(mDoc.id)
            console.log(`[eslestirme] 🔔 Müşteri ${mDoc.id} (puan: ${toplamPuan}) → Mülk ${mulkId}`)
        }
    }

    return eslesmisler
}
