/**
 * ilanSendikasyonu.ts — Çoklu Platform İlan Yayınlama Motoru
 * ══════════════════════════════════════════════════════════════════════
 * Tek noktadan yönet, Sahibinden + Hepsiemlak + Emlakjet'e paralel yayınla.
 * Güncelleme ve kaldırma da otomatik.
 */

import { adminDb } from '@/lib/firebaseAdmin'
import { FieldValue } from 'firebase-admin/firestore'
import type { Mulk, PlatformAdi, SyncDurum } from './EmlakTypes'

// ═══ PLATFORM KONFİGÜRASYONU ═══════════════════════════════════════════

interface PlatformKonfig {
    ad: PlatformAdi
    label: string
    apiBaseUrl: string
    aktif: boolean
}

const PLATFORMLAR: PlatformKonfig[] = [
    {
        ad: 'sahibinden',
        label: 'Sahibinden.com',
        apiBaseUrl: 'https://api.sahibinden.com/v1', // Placeholder
        aktif: true,
    },
    {
        ad: 'hepsiemlak',
        label: 'Hepsiemlak.com',
        apiBaseUrl: 'https://api.hepsiemlak.com/v2', // Placeholder
        aktif: true,
    },
    {
        ad: 'emlakjet',
        label: 'Emlakjet.com',
        apiBaseUrl: 'https://api.emlakjet.com/v1', // Placeholder
        aktif: true,
    },
]

// ═══ PLATFORM FORMATLAMA ════════════════════════════════════════════════

interface PlatformIlanData {
    baslik: string
    aciklama: string
    fiyat: number
    para_birimi: string
    kategori_id: string
    konum: {
        il: string
        ilce: string
        mahalle: string
        koordinat?: { lat: number; lng: number }
    }
    ozellikler: Record<string, string | number | boolean>
    fotograflar: string[]
}

/** Mülk verisini her platform için uygun formata dönüştür */
function mulkuPlatformFormatinaDonustur(mulk: Mulk, platform: PlatformAdi): PlatformIlanData {
    const temelData: PlatformIlanData = {
        baslik: mulk.baslik,
        aciklama: mulk.aciklama,
        fiyat: mulk.fiyatTL,
        para_birimi: 'TRY',
        kategori_id: kategoriEslestir(mulk.mulkTipi, mulk.ilanTipi, platform),
        konum: {
            il: mulk.il,
            ilce: mulk.ilce,
            mahalle: mulk.mahalle,
            koordinat: mulk.koordinat || undefined,
        },
        ozellikler: {
            metrekare: mulk.metrekare,
            oda_sayisi: mulk.oda_sayisi,
            bulundugu_kat: mulk.bulundugu_kat,
            toplam_kat: mulk.toplam_kat,
            bina_yasi: mulk.bina_yasi,
            banyo_sayisi: mulk.banyo_sayisi,
            balkon: mulk.balkon,
            esyali: mulk.esyali,
            site_icerisinde: mulk.site_icerisinde,
            asansor: mulk.asansor ?? false,
            otopark: mulk.otopark ?? false,
            isitma: mulk.isitma_tipi,
            tapu_durumu: mulk.tapu_durumu,
            kullanim_durumu: mulk.kullanim_durumu,
            kredi_uygun: mulk.kredi_uygunlugu,
        },
        fotograflar: mulk.fotograflar
            .sort((a, b) => a.sira - b.sira)
            .map(f => f.url),
    }

    // Platform-özel dönüşümler
    if (platform === 'sahibinden') {
        if (mulk.brut_metrekare) {
            temelData.ozellikler['brut_metrekare'] = mulk.brut_metrekare
        }
        if (mulk.aidatTL) {
            temelData.ozellikler['aidat'] = mulk.aidatTL
        }
    }

    return temelData
}

/** Mülk tipi + ilan tipi → Platform kategori ID eşlemesi */
function kategoriEslestir(
    mulkTipi: string,
    ilanTipi: string,
    platform: PlatformAdi
): string {
    // Gerçek entegrasyonda platform-özel mapping tablolarından çekilir
    const key = `${ilanTipi}_${mulkTipi}`

    const sahibindenMap: Record<string, string> = {
        satilik_daire: '16232',
        kiralik_daire: '16231',
        satilik_villa: '16234',
        kiralik_villa: '16233',
        satilik_arsa: '16236',
        satilik_isyeri: '16238',
        kiralik_isyeri: '16237',
        satilik_ofis: '16240',
        kiralik_ofis: '16239',
    }

    const hepsiemlakMap: Record<string, string> = {
        satilik_daire: 'daire-satilik',
        kiralik_daire: 'daire-kiralik',
        satilik_villa: 'villa-satilik',
        kiralik_villa: 'villa-kiralik',
        satilik_arsa: 'arsa-satilik',
    }

    const emlakjetMap: Record<string, string> = {
        satilik_daire: 'konut-satilik-daire',
        kiralik_daire: 'konut-kiralik-daire',
        satilik_villa: 'konut-satilik-villa',
    }

    const map = platform === 'sahibinden'
        ? sahibindenMap
        : platform === 'hepsiemlak'
            ? hepsiemlakMap
            : emlakjetMap

    return map[key] || 'genel'
}

// ═══ ANA SENDİKASYON FONKSİYONLARI ═════════════════════════════════════

export interface SendikasyonSonuc {
    platform: PlatformAdi
    basarili: boolean
    platformIlanId?: string
    platformUrl?: string
    hata?: string
}

/**
 * Mülkü tüm aktif platformlara paralel yayınla.
 * Her platform için dönüşüm yapıp API çağrısı atar.
 */
export async function tumPlatformlaraYayinla(
    esnafId: string,
    mulkId: string
): Promise<SendikasyonSonuc[]> {
    // Mülk verisini çek
    const mulkDoc = await adminDb
        .collection('esnaflar')
        .doc(esnafId)
        .collection('mulkler')
        .doc(mulkId)
        .get()

    if (!mulkDoc.exists) {
        return [{ platform: 'sahibinden', basarili: false, hata: 'Mülk bulunamadı' }]
    }

    const mulk = { mulkId, ...mulkDoc.data() } as Mulk

    // Paralel yayınlama
    const sonuclar = await Promise.allSettled(
        PLATFORMLAR.filter(p => p.aktif).map(async (platform) => {
            return await platformaYayinla(esnafId, mulkId, mulk, platform.ad)
        })
    )

    return sonuclar.map((r, i) => {
        if (r.status === 'fulfilled') return r.value
        return {
            platform: PLATFORMLAR[i].ad,
            basarili: false,
            hata: r.reason?.message || 'Bilinmeyen hata',
        }
    })
}

/** Tek bir platforma yayınla ve sync durumunu güncelle */
async function platformaYayinla(
    esnafId: string,
    mulkId: string,
    mulk: Mulk,
    platform: PlatformAdi
): Promise<SendikasyonSonuc> {
    try {
        const formatliData = mulkuPlatformFormatinaDonustur(mulk, platform)

        // API çağrısı (placeholder — gerçek entegrasyonda HTTP request)
        const apiSonuc = await platformApiCagrisi(platform, 'yayinla', formatliData)

        // Firestore sync kaydı güncelle
        const syncRef = adminDb
            .collection('esnaflar')
            .doc(esnafId)
            .collection('mulkler')
            .doc(mulkId)
            .collection('platform_sync')
            .doc(platform)

        await syncRef.set({
            platform,
            durum: 'yayinda' as SyncDurum,
            platform_ilan_id: apiSonuc.ilanId,
            platform_url: apiSonuc.url,
            son_sync_tarihi: FieldValue.serverTimestamp(),
            yayinlama_tarihi: FieldValue.serverTimestamp(),
            hata_mesaji: null,
        })

        // Mülk belgesine platform ID yaz
        const platformIdField = `${platform}_ilan_id`
        await adminDb
            .collection('esnaflar')
            .doc(esnafId)
            .collection('mulkler')
            .doc(mulkId)
            .update({
                [platformIdField]: apiSonuc.ilanId,
                son_yayinlama_tarihi: FieldValue.serverTimestamp(),
                son_guncelleme: FieldValue.serverTimestamp(),
            })

        console.log(`[sendikasyon] ✅ ${platform} → İlan ${apiSonuc.ilanId} yayınlandı`)

        return {
            platform,
            basarili: true,
            platformIlanId: apiSonuc.ilanId,
            platformUrl: apiSonuc.url,
        }

    } catch (err: unknown) {
        const hataMesaji = err instanceof Error ? err.message : 'Bilinmeyen hata'

        // Hata durumunu kaydet
        const syncRef = adminDb
            .collection('esnaflar')
            .doc(esnafId)
            .collection('mulkler')
            .doc(mulkId)
            .collection('platform_sync')
            .doc(platform)

        await syncRef.set({
            platform,
            durum: 'hata' as SyncDurum,
            son_sync_tarihi: FieldValue.serverTimestamp(),
            hata_mesaji: hataMesaji,
        }, { merge: true })

        console.error(`[sendikasyon] ❌ ${platform} hatası:`, hataMesaji)

        return { platform, basarili: false, hata: hataMesaji }
    }
}

/**
 * Mülk güncellendiğinde tüm platformlarda senkronize et.
 */
export async function platformlariGuncelle(
    esnafId: string,
    mulkId: string
): Promise<SendikasyonSonuc[]> {
    const mulkDoc = await adminDb
        .collection('esnaflar')
        .doc(esnafId)
        .collection('mulkler')
        .doc(mulkId)
        .get()

    if (!mulkDoc.exists) return []

    const mulk = { mulkId, ...mulkDoc.data() } as Mulk

    // Sadece aktif yayında olan platformları güncelle
    const syncSnap = await adminDb
        .collection('esnaflar')
        .doc(esnafId)
        .collection('mulkler')
        .doc(mulkId)
        .collection('platform_sync')
        .where('durum', '==', 'yayinda')
        .get()

    const sonuclar = await Promise.allSettled(
        syncSnap.docs.map(async (doc: FirebaseFirestore.QueryDocumentSnapshot) => {
            const platform = doc.id as PlatformAdi
            const formatliData = mulkuPlatformFormatinaDonustur(mulk, platform)
            const platformIlanId = doc.data().platform_ilan_id

            const apiSonuc = await platformApiCagrisi(platform, 'guncelle', formatliData, platformIlanId)

            await doc.ref.update({
                son_sync_tarihi: FieldValue.serverTimestamp(),
                durum: 'yayinda' as SyncDurum,
                hata_mesaji: null,
            })

            return { platform, basarili: true, platformIlanId: apiSonuc.ilanId } as SendikasyonSonuc
        })
    )

    return sonuclar.map((r, i) => {
        if (r.status === 'fulfilled') return r.value
        return {
            platform: syncSnap.docs[i].id as PlatformAdi,
            basarili: false,
            hata: r.reason?.message,
        }
    })
}

/**
 * Satıldığında / arşivlendiğinde tüm platformlardan kaldır.
 */
export async function tumPlatformlardenKaldir(
    esnafId: string,
    mulkId: string
): Promise<void> {
    const syncSnap = await adminDb
        .collection('esnaflar')
        .doc(esnafId)
        .collection('mulkler')
        .doc(mulkId)
        .collection('platform_sync')
        .where('durum', '==', 'yayinda')
        .get()

    await Promise.allSettled(
        syncSnap.docs.map(async (doc: FirebaseFirestore.QueryDocumentSnapshot) => {
            const platform = doc.id as PlatformAdi
            const platformIlanId = doc.data().platform_ilan_id

            try {
                await platformApiCagrisi(platform, 'kaldir', undefined, platformIlanId)
                await doc.ref.update({
                    durum: 'kaldirildi' as SyncDurum,
                    son_sync_tarihi: FieldValue.serverTimestamp(),
                })
                console.log(`[sendikasyon] 🗑️ ${platform} → İlan ${platformIlanId} kaldırıldı`)
            } catch (err) {
                console.error(`[sendikasyon] ❌ ${platform} kaldırma hatası:`, err)
            }
        })
    )
}

// ═══ PLATFORM API ÇAĞRİSİ (PLACEHOLDER) ════════════════════════════════

interface PlatformApiSonuc {
    ilanId: string
    url: string
}

/**
 * Platform API çağrısı — Gerçek entegrasyonda HTTP isteği yapılacak.
 * Şimdilik simüle ediyoruz.
 */
async function platformApiCagrisi(
    platform: PlatformAdi,
    islem: 'yayinla' | 'guncelle' | 'kaldir',
    _data?: PlatformIlanData,
    _mevcutIlanId?: string
): Promise<PlatformApiSonuc> {
    // Simülasyon — gerçek entegrasyonda fetch/axios kullanılacak
    const simulasyonId = `${platform}_${Date.now()}_${Math.random().toString(36).slice(2, 8)}`

    const urlMap: Record<PlatformAdi, string> = {
        sahibinden: `https://www.sahibinden.com/ilan/${simulasyonId}`,
        hepsiemlak: `https://www.hepsiemlak.com/ilan/${simulasyonId}`,
        emlakjet: `https://www.emlakjet.com/ilan/${simulasyonId}`,
    }

    console.log(`[sendikasyon] 📡 ${platform} → ${islem} (simülasyon)`)

    return {
        ilanId: _mevcutIlanId || simulasyonId,
        url: urlMap[platform],
    }
}
