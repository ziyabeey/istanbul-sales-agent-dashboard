import { adminDb, Timestamp, FieldValue } from '@/lib/firebaseAdmin'

export interface MusteriProfil {
    id: string   // telefon numarası hash'i
    esnafId: string
    telefon: string
    ad?: string   // İlk konuşmada öğrenildi
    ilkTemas: any      // Timestamp
    sonTemas: any      // Timestamp
    sonRandevu?: any      // Timestamp
    toplamRandevu: number
    tercihliHizmetler: string[]  // Sıklıkla talep ettiği hizmetler
    harcamaTahmini: number   // Toplam tahmini ciro
    memnuniyetSkor: number   // 1-5, yorumlardan çıkar
    etiketler: string[] // 'sadik', 'yeni', 'kayip', 'vip'
    ozelGunler: {        // Doğum günü, yıl dönümü vb.
        tarih: string
        tur: string
        not?: string
    }[]
    konusmaSayisi: number
    sonrakiTahminiZiyaret?: any  // AI tahmini
}

// ── Profil güncelle veya oluştur ─────────────────────────────────────────
export async function musteriProfilGuncelle(
    esnafId: string,
    telefon: string,
    yeniVeri: Partial<MusteriProfil>
): Promise<void> {
    const id = `${esnafId}_${Buffer.from(telefon).toString('base64').slice(0, 12)}`

    const ref = adminDb.collection('musteriProfiller').doc(id)
    const mevcut = await ref.get()

    if (!mevcut.exists) {
        await ref.set({
            id,
            esnafId,
            telefon,
            ilkTemas: Timestamp.now(),
            sonTemas: Timestamp.now(),
            toplamRandevu: 0,
            tercihliHizmetler: [],
            harcamaTahmini: 0,
            memnuniyetSkor: 3,
            etiketler: ['yeni'],
            ozelGunler: [],
            konusmaSayisi: 1,
            ...yeniVeri,
        })
    } else {
        await ref.update({
            sonTemas: Timestamp.now(),
            konusmaSayisi: FieldValue.increment(1),
            ...yeniVeri,
        })
    }
}

// ── Etiket güncelle ──────────────────────────────────────────────────────
export async function musteriEtiketGuncelle(
    esnafId: string,
    telefon: string
): Promise<string[]> {
    const id = `${esnafId}_${Buffer.from(telefon).toString('base64').slice(0, 12)}`
    const profilData = (await adminDb.collection('musteriProfiller').doc(id).get()).data() as MusteriProfil

    if (!profilData) return ['yeni']

    const etiketler: string[] = []
    const gunFarki = (t: any) => t
        ? Math.floor((Date.now() - t.toDate().getTime()) / (1000 * 60 * 60 * 24))
        : 999

    // VIP: 5+ randevu
    if (profilData.toplamRandevu >= 5) etiketler.push('vip')

    // Sadık: 30 günde bir veya daha sık
    if (profilData.toplamRandevu >= 2) {
        const aralik = gunFarki(profilData.ilkTemas) / profilData.toplamRandevu
        if (aralik <= 30) etiketler.push('sadik')
    }

    // Kayıp: 60+ gündür görünmüyor
    if (gunFarki(profilData.sonRandevu) > 60) etiketler.push('kayip')

    // Uyku: 30-60 gün
    else if (gunFarki(profilData.sonRandevu) > 30) etiketler.push('uyku')

    // Yeni: ilk 2 randevu
    if (profilData.toplamRandevu <= 2) etiketler.push('yeni')

    if (etiketler.length === 0) etiketler.push('standart')

    await adminDb.collection('musteriProfiller').doc(id).update({ etiketler })
    return etiketler
}

// ── Sonraki tahmini ziyaret hesapla ────────────────────────────────────
export async function ziyaretTahminEt(
    esnafId: string,
    telefon: string
): Promise<Date | null> {
    const id = `${esnafId}_${Buffer.from(telefon).toString('base64').slice(0, 12)}`
    const profil = (await adminDb.collection('musteriProfiller').doc(id).get()).data() as MusteriProfil
    if (!profil || profil.toplamRandevu < 2) return null

    // Ortalama ziyaret aralığını hesapla
    const gunFarki = profil.ilkTemas?.toDate
        ? Math.floor((Date.now() - profil.ilkTemas.toDate().getTime()) / (1000 * 60 * 60 * 24))
        : 0

    const ortalamaAralik = Math.floor(gunFarki / profil.toplamRandevu)

    // Son randevudan ortalama aralik kadar gün ekle
    const sonRandevu = profil.sonRandevu?.toDate?.() ?? new Date()
    const tahminiZiyaret = new Date(sonRandevu.getTime() + ortalamaAralik * 24 * 60 * 60 * 1000)

    await adminDb.collection('musteriProfiller').doc(id).update({
        sonrakiTahminiZiyaret: Timestamp.fromDate(tahminiZiyaret),
    })

    return tahminiZiyaret
}
