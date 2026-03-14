/**
 * takvimMotoru.ts — Çakışma-Korumalı Takvim ve Randevu Motoru
 * ══════════════════════════════════════════════════════════════════════
 * Firestore Transaction zırhıyla double-booking'i engelleyen,
 * kapasite-duyarlı slot hesaplayan otonom takvim.
 */

import { adminDb } from '@/lib/firebaseAdmin'
import { FieldValue, Timestamp } from 'firebase-admin/firestore'
import type { Randevu, TakvimSlot, GunlukTakvim } from './RandevuTypes'
import { saateDakika, dakikadanSaat, bitisSaatiHesapla, saatlerCakisiyorMu } from './RandevuTypes'
import type { Hizmet, CalismaTakvimi, GunAdi } from './HizmetTypes'
import { kaporaHesapla } from './HizmetTypes'

// ═══ SLOT ARALIGI (her 15dk bir slot) ═══════════════════════════════════

const SLOT_ARALIK_DK = 15
const KILIT_SURESI_DK = 15 // Kapora bekleme süresi

// ═══ MUSAIT SLOTLARI HESAPLA ════════════════════════════════════════════

/**
 * Belirli bir gün için müsait zaman slotlarını hesapla.
 * Çalışma saatleri, mevcut randevular ve kapasiteyi dikkate alır.
 */
export async function musaitSlotlariGetir(
    esnafId: string,
    tarih: string,       // "2026-03-15"
    hizmetId: string
): Promise<GunlukTakvim> {
    // 1. Hizmeti çek
    const hizmetDoc = await adminDb
        .collection('esnaflar').doc(esnafId)
        .collection('hizmetler').doc(hizmetId)
        .get()

    if (!hizmetDoc.exists) throw new Error('Hizmet bulunamadı')
    const hizmet = hizmetDoc.data() as Hizmet

    // 2. Çalışma saatlerini çek
    const takvimDoc = await adminDb
        .collection('esnaflar').doc(esnafId)
        .collection('ayarlar').doc('calisma_takvimi')
        .get()

    const takvim = takvimDoc.exists ? takvimDoc.data() as CalismaTakvimi : null

    // 3. Günün adını bul
    const gunAdi = tarihtenGunAdi(tarih)
    const gunSaatleri = takvim?.saatler?.find((s: { gun: string }) => s.gun === gunAdi)

    // Tatil günü veya özel tatil kontrolü
    const ozelTatil = takvim?.ozel_tatil_gunleri?.includes(tarih)
    if (!gunSaatleri?.acik || ozelTatil) {
        return { tarih, gun_adi: gunAdiLabel(gunAdi), acik: false, slotlar: [] }
    }

    // 4. O günkü aktif randevuları çek
    const randevuSnap = await adminDb
        .collection('esnaflar').doc(esnafId)
        .collection('randevular')
        .where('tarih', '==', tarih)
        .where('durum', 'in', ['kapora_bekleniyor', 'onaylandi'])
        .get()

    const mevcutRandevular: Randevu[] = randevuSnap.docs.map((d: FirebaseFirestore.QueryDocumentSnapshot) => d.data() as Randevu)

    // 5. Slotları üret
    const slotlar: TakvimSlot[] = []
    const basla = saateDakika(gunSaatleri.baslangic)
    const bitir = saateDakika(gunSaatleri.bitis)
    const molaBas = gunSaatleri.mola_baslangic ? saateDakika(gunSaatleri.mola_baslangic) : -1
    const molaBit = gunSaatleri.mola_bitis ? saateDakika(gunSaatleri.mola_bitis) : -1

    for (let dk = basla; dk + hizmet.sure_dakika <= bitir; dk += SLOT_ARALIK_DK) {
        const slotBas = dakikadanSaat(dk)
        const slotBit = bitisSaatiHesapla(slotBas, hizmet.sure_dakika)

        // Mola saati çakışma kontrolü
        if (molaBas >= 0 && saatlerCakisiyorMu(slotBas, slotBit, dakikadanSaat(molaBas), dakikadanSaat(molaBit))) {
            continue
        }

        // Bu slotta kaç aktif randevu var?
        const cakisanlar = mevcutRandevular.filter((r: Randevu) =>
            saatlerCakisiyorMu(
                slotBas, slotBit,
                r.baslangic_saat, r.bitis_saat
            )
        )

        const kilitliler = cakisanlar.filter((r: Randevu) => r.durum === 'kapora_bekleniyor')
        const kapasite = hizmet.es_zamanli_kapasite

        slotlar.push({
            saat: slotBas,
            musait: cakisanlar.length < kapasite,
            mevcut_randevu: cakisanlar.length,
            kapasite,
            kilitli: kilitliler.length > 0 && cakisanlar.length >= kapasite,
        })
    }

    return {
        tarih,
        gun_adi: gunAdiLabel(gunAdi),
        acik: true,
        slotlar,
    }
}

// ═══ TRANSACTION ZIRHLI RANDEVU OLUŞTURMA ═══════════════════════════════

export interface RandevuOlusturmaParams {
    esnafId: string
    tarih: string          // "2026-03-15"
    saat: string           // "14:00"
    hizmetId: string
    musteri_ad: string
    musteri_telefon: string
    musteri_email?: string
    musteri_notu?: string
    kaynak: 'whatsapp' | 'website' | 'telefon' | 'yuruyus'
    personel_id?: string
    personel_adi?: string
}

export interface RandevuOlusturmaSonuc {
    basarili: boolean
    randevuId?: string
    kapora_tutar_TL?: number
    kilit_bitis?: Date
    hata?: string
}

/**
 * Firestore Transaction ile atomik randevu oluşturma.
 * Kapasite aşılmışsa ABORT eder — double-booking İMKANSIZ.
 */
export async function randevuOlustur(
    params: RandevuOlusturmaParams
): Promise<RandevuOlusturmaSonuc> {
    const {
        esnafId, tarih, saat, hizmetId,
        musteri_ad, musteri_telefon, musteri_email,
        musteri_notu, kaynak, personel_id, personel_adi,
    } = params

    // Hizmeti çek (transaction dışı — değişmez)
    const hizmetDoc = await adminDb
        .collection('esnaflar').doc(esnafId)
        .collection('hizmetler').doc(hizmetId)
        .get()

    if (!hizmetDoc.exists) {
        return { basarili: false, hata: 'Hizmet bulunamadı' }
    }
    const hizmet = hizmetDoc.data() as Hizmet
    const bitisSaat = bitisSaatiHesapla(saat, hizmet.sure_dakika)
    const kaporaTutar = kaporaHesapla(hizmet)

    // === TRANSACTION BAŞLA ===
    try {
        const sonuc = await adminDb.runTransaction(async (tx: FirebaseFirestore.Transaction) => {
            // 1. O tarih + saatteki aktif randevuları sayın
            const randevuRef = adminDb
                .collection('esnaflar').doc(esnafId)
                .collection('randevular')

            const mevcutSnap = await tx.get(
                randevuRef
                    .where('tarih', '==', tarih)
                    .where('durum', 'in', ['kapora_bekleniyor', 'onaylandi'])
            )

            // 2. Çakışma kontrolü
            let cakisanSayi = 0
            mevcutSnap.docs.forEach((doc) => {
                const r = doc.data() as Randevu
                if (saatlerCakisiyorMu(saat, bitisSaat, r.baslangic_saat, r.bitis_saat)) {
                    cakisanSayi++
                }
            })

            // 3. KAPASİTE KONTROLÜ — AŞILDIYSA ABORT!
            if (cakisanSayi >= hizmet.es_zamanli_kapasite) {
                throw new Error(`KAPASITE_DOLU: ${tarih} ${saat} slotu dolu (${cakisanSayi}/${hizmet.es_zamanli_kapasite})`)
            }

            // 4. Randevuyu yaz
            const yeniRandevuRef = randevuRef.doc()
            const kilitBitis = Timestamp.fromDate(
                new Date(Date.now() + KILIT_SURESI_DK * 60 * 1000)
            )

            const randevuData: Record<string, unknown> = {
                randevuId: yeniRandevuRef.id,
                esnafId,
                musteri_ad,
                musteri_telefon,
                musteri_email: musteri_email || null,
                kaynak,
                hizmet_id: hizmetId,
                hizmet_adi: hizmet.ad,
                hizmet_suresi_dk: hizmet.sure_dakika,
                personel_id: personel_id || null,
                personel_adi: personel_adi || null,
                tarih,
                baslangic_saat: saat,
                bitis_saat: bitisSaat,
                durum: 'kapora_bekleniyor',
                kapora: {
                    tutar_TL: kaporaTutar,
                    durum: 'bekleniyor',
                    iyzico_link: null,
                    iyzico_token: null,
                    odeme_tarihi: null,
                },
                toplam_fiyat_TL: hizmet.fiyat_TL,
                kalan_bakiye_TL: hizmet.fiyat_TL - kaporaTutar,
                kilit_bitis: kilitBitis,
                kilit_aktif: true,
                olusturma_tarihi: FieldValue.serverTimestamp(),
                son_guncelleme: FieldValue.serverTimestamp(),
                musteri_notu: musteri_notu || null,
                esnaf_notu: null,
                hatirlatici_gonderildi: false,
                upsell_teklif_gonderildi: false,
            }

            tx.set(yeniRandevuRef, randevuData)

            return {
                randevuId: yeniRandevuRef.id,
                kilitBitis: kilitBitis.toDate(),
            }
        })

        console.log(`[takvim] ✅ Randevu kilitlendi: ${sonuc.randevuId} → ${tarih} ${saat} (TTL: ${KILIT_SURESI_DK}dk)`)

        return {
            basarili: true,
            randevuId: sonuc.randevuId,
            kapora_tutar_TL: kaporaTutar,
            kilit_bitis: sonuc.kilitBitis,
        }

    } catch (err: unknown) {
        const msg = err instanceof Error ? err.message : 'Bilinmeyen hata'

        if (msg.startsWith('KAPASITE_DOLU')) {
            console.warn(`[takvim] ⚠️ Kapasite dolu — ${tarih} ${saat}`)
            return { basarili: false, hata: 'Bu saat dolu. Lütfen başka bir saat seçin.' }
        }

        console.error('[takvim] ❌ Transaction hatası:', msg)
        return { basarili: false, hata: msg }
    }
}

// ═══ RANDEVU ONAYLA (Kapora alındığında) ════════════════════════════════

export async function randevuOnayla(
    esnafId: string,
    randevuId: string,
    iyzicoToken: string
): Promise<boolean> {
    const ref = adminDb
        .collection('esnaflar').doc(esnafId)
        .collection('randevular').doc(randevuId)

    await ref.update({
        durum: 'onaylandi',
        kilit_aktif: false,
        'kapora.durum': 'odendi',
        'kapora.odeme_tarihi': FieldValue.serverTimestamp(),
        'kapora.iyzico_token': iyzicoToken,
        onay_tarihi: FieldValue.serverTimestamp(),
        son_guncelleme: FieldValue.serverTimestamp(),
    })

    console.log(`[takvim] 🎉 Randevu onaylandı: ${randevuId}`)
    return true
}

// ═══ NO-SHOW İŞLEMİ (Kaporayı Yak) ═════════════════════════════════════

export async function noShowIsle(
    esnafId: string,
    randevuId: string
): Promise<{ cayma_geliri_TL: number }> {
    const ref = adminDb
        .collection('esnaflar').doc(esnafId)
        .collection('randevular').doc(randevuId)

    const doc = await ref.get()
    if (!doc.exists) throw new Error('Randevu bulunamadı')

    const randevu = doc.data() as Randevu
    const caymaBedeli = randevu.kapora.tutar_TL

    await ref.update({
        durum: 'no_show',
        'kapora.durum': 'yanik',
        son_guncelleme: FieldValue.serverTimestamp(),
    })

    // Cayma bedeli gelirini muhasebeye yaz
    await adminDb
        .collection('esnaflar').doc(esnafId)
        .collection('muhasebe')
        .add({
            tip: 'cayma_bedeli_geliri',
            randevuId,
            tutar_TL: caymaBedeli,
            musteri_ad: randevu.musteri_ad,
            aciklama: `No-Show cayma bedeli — ${randevu.hizmet_adi} (${randevu.tarih} ${randevu.baslangic_saat})`,
            tarih: FieldValue.serverTimestamp(),
        })

    console.log(`[takvim] 🔥 No-Show: ${randevuId} → Cayma bedeli: ${caymaBedeli} TL`)

    return { cayma_geliri_TL: caymaBedeli }
}

// ═══ KALAN BAKİYE TAHSİLATI ════════════════════════════════════════════

export async function kalanBakiyeTahsilEt(
    esnafId: string,
    randevuId: string
): Promise<number> {
    const ref = adminDb
        .collection('esnaflar').doc(esnafId)
        .collection('randevular').doc(randevuId)

    const doc = await ref.get()
    if (!doc.exists) throw new Error('Randevu bulunamadı')

    const randevu = doc.data() as Randevu
    const kalan = randevu.kalan_bakiye_TL

    await ref.update({
        kalan_bakiye_TL: 0,
        durum: 'tamamlandi',
        son_guncelleme: FieldValue.serverTimestamp(),
    })

    console.log(`[takvim] 💰 Bakiye tahsil: ${randevuId} → ${kalan} TL`)
    return kalan
}

// ═══ YARDIMCI ═══════════════════════════════════════════════════════════

function tarihtenGunAdi(tarih: string): GunAdi {
    const gunler: GunAdi[] = ['pazar', 'pazartesi', 'sali', 'carsamba', 'persembe', 'cuma', 'cumartesi']
    const d = new Date(tarih + 'T12:00:00')
    return gunler[d.getDay()]
}

function gunAdiLabel(gun: GunAdi): string {
    const labels: Record<GunAdi, string> = {
        pazartesi: 'Pazartesi', sali: 'Salı', carsamba: 'Çarşamba',
        persembe: 'Perşembe', cuma: 'Cuma', cumartesi: 'Cumartesi', pazar: 'Pazar',
    }
    return labels[gun]
}
