/**
 * degerlemMotoru.ts — Karşılaştırmalı Piyasa Analizi ve Değerleme
 * ══════════════════════════════════════════════════════════════════════
 * Aynı mahallede benzer mülkleri karşılaştır, kat/yaş/cephe/site
 * puanlaması yap, AI fiyat önerisi üret.
 */

import { adminDb } from '@/lib/firebaseAdmin'
import { FieldValue } from 'firebase-admin/firestore'
import type { Mulk, DegerlemeRaporu } from './EmlakTypes'

// ═══ FAKTÖR AĞIRLIKLARI ═════════════════════════════════════════════════

interface DegerlemeFaktor {
    faktor: string
    etki_yuzde: number
    aciklama: string
}

/** Kat avantajı hesapla */
function katEtkisi(kat: number, toplamKat: number): DegerlemeFaktor {
    const oran = kat / toplamKat

    if (kat === 0 || kat === -1) {
        return { faktor: 'Kat (Zemin/Bodrum)', etki_yuzde: -10, aciklama: 'Zemin veya bodrum kat, fiyat dezavantajı' }
    }
    if (kat === toplamKat) {
        return { faktor: 'Kat (Çatı)', etki_yuzde: -5, aciklama: 'Son kat (çatı), ısınma/su sorunu riski' }
    }
    if (oran >= 0.3 && oran <= 0.7) {
        return { faktor: 'Kat (Orta)', etki_yuzde: 5, aciklama: 'Orta katlar daha çok tercih edilir' }
    }
    return { faktor: 'Kat', etki_yuzde: 0, aciklama: 'Standart kat' }
}

/** Bina yaşı etkisi */
function binaYasiEtkisi(yas: number): DegerlemeFaktor {
    if (yas <= 5) return { faktor: 'Bina Yaşı (0-5)', etki_yuzde: 10, aciklama: 'Yeni bina, yüksek talep' }
    if (yas <= 15) return { faktor: 'Bina Yaşı (5-15)', etki_yuzde: 0, aciklama: 'Standart yaş aralığı' }
    if (yas <= 30) return { faktor: 'Bina Yaşı (15-30)', etki_yuzde: -10, aciklama: 'Eskimeye bağlı değer kaybı' }
    return { faktor: 'Bina Yaşı (30+)', etki_yuzde: -20, aciklama: 'Kentsel dönüşüm riski, ciddi değer kaybı' }
}

/** Cephe yönü etkisi */
function cepheEtkisi(cepheler: string[]): DegerlemeFaktor {
    const guneyli = cepheler.includes('guney')
    const batili = cepheler.includes('bati')
    const ciftCephe = cepheler.length >= 2

    if (ciftCephe && guneyli) {
        return { faktor: 'Cephe (Çift, Güney)', etki_yuzde: 8, aciklama: 'Çift cephe + güneş, çok tercih edilen' }
    }
    if (guneyli || batili) {
        return { faktor: 'Cephe (Güney/Batı)', etki_yuzde: 5, aciklama: 'Güneş alan cephe avantajı' }
    }
    if (cepheler.includes('kuzey') && cepheler.length === 1) {
        return { faktor: 'Cephe (Kuzey)', etki_yuzde: -3, aciklama: 'Tek cephe kuzey, daha az güneş' }
    }
    return { faktor: 'Cephe', etki_yuzde: 0, aciklama: 'Standart cephe' }
}

/** Site içi avantajı */
function siteEtkisi(siteIci: boolean): DegerlemeFaktor {
    if (siteIci) return { faktor: 'Site İçi', etki_yuzde: 8, aciklama: 'Site içi güvenlik ve sosyal alan avantajı' }
    return { faktor: 'Site Dışı', etki_yuzde: 0, aciklama: 'Bağımsız yapı' }
}

/** Asansör etkisi */
function asansorEtkisi(asansor: boolean, kat: number): DegerlemeFaktor {
    if (asansor) return { faktor: 'Asansör', etki_yuzde: 3, aciklama: 'Asansörlü bina' }
    if (kat >= 3) return { faktor: 'Asansör Yok', etki_yuzde: -5, aciklama: '3+ kat, asansör yok, erişim dezavantajı' }
    return { faktor: 'Asansör Yok', etki_yuzde: 0, aciklama: 'Düşük kat, asansör gereksiz' }
}

/** Otopark etkisi */
function otoparkEtkisi(otopark: boolean): DegerlemeFaktor {
    if (otopark) return { faktor: 'Otopark', etki_yuzde: 5, aciklama: 'Kapalı/açık otopark avantajı' }
    return { faktor: 'Otopark Yok', etki_yuzde: -2, aciklama: 'Park sorunu, özellikle merkezi lokasyonlarda' }
}

// ═══ ANA DEĞERLEME FONKSİYONU ═══════════════════════════════════════════

/**
 * Karşılaştırmalı piyasa analizi yaparak değerleme raporu üret.
 */
export async function degerlemHesapla(
    esnafId: string,
    mulkId: string
): Promise<DegerlemeRaporu | null> {
    // Mülkü çek
    const mulkDoc = await adminDb
        .collection('esnaflar')
        .doc(esnafId)
        .collection('mulkler')
        .doc(mulkId)
        .get()

    if (!mulkDoc.exists) return null
    const mulk = { mulkId, ...mulkDoc.data() } as Mulk

    // Aynı mahallede benzer mülkleri çek (karşılaştırma grubu)
    const karsilastirmaSnap = await adminDb
        .collection('esnaflar')
        .doc(esnafId)
        .collection('mulkler')
        .where('il', '==', mulk.il)
        .where('ilce', '==', mulk.ilce)
        .where('mulkTipi', '==', mulk.mulkTipi)
        .where('ilanTipi', '==', mulk.ilanTipi)
        .get()

    // Benzer metrekare aralığındakileri filtrele (±%30)
    const benzerler: Mulk[] = karsilastirmaSnap.docs
        .filter((d: FirebaseFirestore.QueryDocumentSnapshot) => d.id !== mulkId)
        .map((d: FirebaseFirestore.QueryDocumentSnapshot) => d.data() as Mulk)
        .filter((m: Mulk) => {
            const m2Fark = Math.abs(m.metrekare - mulk.metrekare) / mulk.metrekare
            return m2Fark <= 0.30
        })

    // Bölgesel ortalama m² fiyatını hesapla
    let bolgelOrtM2 = 0
    if (benzerler.length > 0) {
        const toplamM2Fiyat = benzerler.reduce((sum: number, m: Mulk) => sum + (m.fiyatTL / m.metrekare), 0)
        bolgelOrtM2 = Math.round(toplamM2Fiyat / benzerler.length)
    } else {
        // Karşılaştırma yoksa mülkün kendi m² fiyatını baz al
        bolgelOrtM2 = Math.round(mulk.fiyatTL / mulk.metrekare)
    }

    // Faktörleri hesapla
    const faktorler: DegerlemeFaktor[] = [
        katEtkisi(mulk.bulundugu_kat, mulk.toplam_kat),
        binaYasiEtkisi(mulk.bina_yasi),
        cepheEtkisi(mulk.cephe || []),
        siteEtkisi(mulk.site_icerisinde),
        asansorEtkisi(mulk.asansor ?? false, mulk.bulundugu_kat),
        otoparkEtkisi(mulk.otopark ?? false),
    ]

    // Toplam avantaj puanı
    const toplamEtki = faktorler.reduce((sum, f) => sum + f.etki_yuzde, 0)

    // Baz fiyat (bölgesel ort × m²)
    const bazFiyat = bolgelOrtM2 * mulk.metrekare

    // Düzeltilmiş fiyat
    const duzeltilmisFiyat = Math.round(bazFiyat * (1 + toplamEtki / 100))

    // Min / Max aralık (±%8)
    const minFiyat = Math.round(duzeltilmisFiyat * 0.92)
    const maxFiyat = Math.round(duzeltilmisFiyat * 1.08)

    const rapor: DegerlemeRaporu = {
        mulkId,
        bolgel_ort_fiyat_m2: bolgelOrtM2,
        karsilastirma_sayisi: benzerler.length,
        avantaj_puani: toplamEtki,
        min_fiyat_onerisi_TL: minFiyat,
        onerilen_fiyat_TL: duzeltilmisFiyat,
        max_fiyat_onerisi_TL: maxFiyat,
        faktorler,
        hesaplama_tarihi: FieldValue.serverTimestamp(),
    }

    // Firestore'a kaydet
    await adminDb
        .collection('esnaflar')
        .doc(esnafId)
        .collection('mulkler')
        .doc(mulkId)
        .collection('degerleme_raporu')
        .doc('son_rapor')
        .set(rapor)

    console.log(`[degerleme] 📊 Mülk ${mulkId}: ${benzerler.length} karşılaştırma, öneri: ${fiyatFormatlaBasit(duzeltilmisFiyat)}`)

    return rapor
}

function fiyatFormatlaBasit(tutar: number): string {
    return new Intl.NumberFormat('tr-TR', { style: 'currency', currency: 'TRY', maximumFractionDigits: 0 }).format(tutar)
}
