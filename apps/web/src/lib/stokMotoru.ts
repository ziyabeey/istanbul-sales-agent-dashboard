import { adminDb, Timestamp, FieldValue } from '@/lib/firebaseAdmin'
import { waMesajGonder } from '@/lib/twilioClient'
import logger from '@/utils/logger'

// ─── Tipler ────────────────────────────────────────────────────────────

interface StokBelgesi {
    urunAdi: string
    birim?: string
    miktar: number
    kritikEsik?: number
    hizmetBasinaKullanim?: number
    siparisVerildi?: boolean
    otomatikSiparisMiktari?: number
    esnafIsletmeAdi?: string
    bagliHizmetler?: string[]
}

interface ReceteMalzeme {
    stokId: string
    malzemeAdi: string
    miktar: number
    birim: string
    tip?: 'hammadde' | 'yari_mamul' | 'ambalaj' | 'sarf'
    fire_orani?: number
    alt_recete_id?: string  // yari_mamul → recursive lookup
}

// ═══ 1. ESKİ STOK DÜŞÜRME (Geriye Uyumlu) ═════════════════════════════

export async function stokDususIsle(esnafId: string, hizmetAdi: string) {
    const esnafDoc = await adminDb.collection('esnaflar').doc(esnafId).get()
    const toptanciTelefon = esnafDoc.data()?.toptanciTelefon || null

    const stoklarRef = adminDb
        .collection('stoklar')
        .where('esnafId', '==', esnafId)
        .where('bagliHizmetler', 'array-contains', hizmetAdi)
    const stoklarSnapshot = await stoklarRef.get()

    if (stoklarSnapshot.empty) return

    const batch = adminDb.batch()
    const kritikStoklar: Array<{ docId: string; stok: StokBelgesi }> = []

    for (const doc of stoklarSnapshot.docs) {
        const stok = doc.data() as StokBelgesi
        const kullanim = stok.hizmetBasinaKullanim || 1

        batch.update(doc.ref, {
            miktar: FieldValue.increment(-kullanim),
            sonGuncelleme: Timestamp.now(),
        })

        const tahminiYeniMiktar = (stok.miktar || 0) - kullanim
        if (tahminiYeniMiktar <= (stok.kritikEsik || 5) && !stok.siparisVerildi) {
            kritikStoklar.push({ docId: doc.id, stok })
        }
    }

    await batch.commit()

    if (kritikStoklar.length > 0) {
        const sonuclar = await Promise.allSettled(
            kritikStoklar.map(({ docId, stok }) =>
                siparisGecToptanciya(esnafId, docId, stok, toptanciTelefon)
            )
        )
        for (const sonuc of sonuclar) {
            if (sonuc.status === 'rejected') {
                console.error('[OTONOM SİPARİŞ HATASI]', sonuc.reason)
                await logger.logYaz(
                    esnafId, 'error', 'Otonom Sipariş Hatası',
                    `Toptancıya otomatik sipariş gönderilemedi: ${sonuc.reason}`
                ).catch(() => {})
            }
        }
    }
}

// ═══ 2. TOPTANCIYA WHATSAPP SİPARİŞ ═══════════════════════════════════

async function siparisGecToptanciya(
    esnafId: string, stokId: string, stok: StokBelgesi, toptanciTelefon: string | null
): Promise<void> {
    if (!toptanciTelefon) {
        await adminDb.collection('esnafBildirimleri').add({
            esnafId, baslik: 'Stok Tükendi',
            mesaj: `${stok.urunAdi} kritik eşiğin altına düştü. Toptancı numaranızı sisteme giriniz.`,
            tur: 'uyari', zaman: Timestamp.now(), okundu: false,
        })
        return
    }

    const siparisMiktari = stok.otomatikSiparisMiktari || 10
    const siparisMesaji =
        `Selamlar, kepenk.ai otonom tedarik sisteminden yazıyorum. ` +
        `Bizim dükkana (${stok.esnafIsletmeAdi || 'Dükkanımız'}) bu hafta ` +
        `${siparisMiktari} ${stok.birim || 'Adet'} "${stok.urunAdi}" gönderebilir misiniz? Stoklarımız azaldı.`

    await adminDb.collection('stoklar').doc(stokId).update({
        siparisVerildi: true, sonSiparisTarihi: Timestamp.now(),
    })

    await waMesajGonder(toptanciTelefon, siparisMesaji, esnafId, 'genel')

    await logger.logYaz(
        esnafId, 'info', 'Otonom Sipariş Verildi',
        `Stok azalan ${stok.urunAdi} için toptancıya WA sipariş mesajı iletildi.`
    )
}

// ═══ 3. RECURSIVE BOM V2 — YARI MAMÜL DESTEKLİ ════════════════════════

const MAX_RECURSIVE_DEPTH = 5

interface StokDusumSonuc {
    dusurulen: Array<{ malzemeAdi: string; stokId: string; miktar: number; birim: string }>
    kritikler: string[]
}

/**
 * Recursive BOM Stok Düşümü V2
 *
 * 1. Reçeteyi oku
 * 2. Her malzeme için:
 *    - tip === 'yari_mamul' → recursive çağrı (alt reçeteyi bul → içindekileri düş)
 *    - tip !== 'yari_mamul' → direkt stoktan düş
 * 3. Kritik eşik → islem_kuyrugu alarm
 */
export async function receteStokDusV2(
    esnafId: string,
    menuItemId: string,
    adet: number = 1,
    depth: number = 0
): Promise<StokDusumSonuc> {
    // Sonsuz döngü koruması
    if (depth > MAX_RECURSIVE_DEPTH) {
        console.warn(`[STOK V2] Max derinlik (${MAX_RECURSIVE_DEPTH}) aşıldı: ${menuItemId}`)
        return { dusurulen: [], kritikler: [] }
    }

    // 1. Reçeteyi oku
    const receteDoc = await adminDb
        .collection('esnaflar')
        .doc(esnafId)
        .collection('receteler')
        .doc(menuItemId)
        .get()

    if (!receteDoc.exists) {
        return { dusurulen: [], kritikler: [] }
    }

    const recete = receteDoc.data()!
    const malzemeler = (recete.malzemeler || []) as ReceteMalzeme[]

    if (malzemeler.length === 0) return { dusurulen: [], kritikler: [] }

    const sonuc: StokDusumSonuc = { dusurulen: [], kritikler: [] }
    const batch = adminDb.batch()

    for (const malzeme of malzemeler) {
        const fireliFactor = 1 + ((malzeme.fire_orani || 0) / 100)
        const efektifMiktar = malzeme.miktar * adet * fireliFactor

        // ── YARI MAMÜL → RECURSIVE ──
        if (malzeme.tip === 'yari_mamul' && malzeme.alt_recete_id) {
            const altSonuc = await receteStokDusV2(
                esnafId,
                malzeme.alt_recete_id,
                adet, // Yarı mamül miktarı ana reçetedeki adet ile çarpılır
                depth + 1
            )
            sonuc.dusurulen.push(...altSonuc.dusurulen)
            sonuc.kritikler.push(...altSonuc.kritikler)
            continue
        }

        // ── HAMMADDE / AMBALAJ → DİREKT STOK DÜŞÜM ──
        if (!malzeme.stokId) continue

        const stokRef = adminDb
            .collection('esnaflar')
            .doc(esnafId)
            .collection('stoklar')
            .doc(malzeme.stokId)

        const stokDoc = await stokRef.get()
        if (!stokDoc.exists) continue

        const stokData = stokDoc.data() as StokBelgesi

        batch.update(stokRef, {
            miktar: FieldValue.increment(-efektifMiktar),
            sonGuncelleme: Timestamp.now(),
        })

        sonuc.dusurulen.push({
            malzemeAdi: malzeme.malzemeAdi,
            stokId: malzeme.stokId,
            miktar: efektifMiktar,
            birim: malzeme.birim,
        })

        // Kritik eşik kontrolü
        const tahminiYeni = (stokData.miktar || 0) - efektifMiktar
        const esik = stokData.kritikEsik || 5

        if (tahminiYeni <= esik) {
            sonuc.kritikler.push(malzeme.malzemeAdi)
        }
    }

    // Batch commit (sadece root seviyede)
    if (depth === 0) {
        await batch.commit()

        // Kritik stoklar → Cloud Tasks alarm
        if (sonuc.kritikler.length > 0) {
            const alarmBatch = adminDb.batch()

            for (const malzeme of malzemeler) {
                if (!sonuc.kritikler.includes(malzeme.malzemeAdi)) continue
                if (!malzeme.stokId) continue

                const stokDoc = await adminDb
                    .collection('esnaflar')
                    .doc(esnafId)
                    .collection('stoklar')
                    .doc(malzeme.stokId)
                    .get()

                const stokData = stokDoc.data() as StokBelgesi | undefined

                const alarmRef = adminDb.collection('islem_kuyrugu').doc()
                alarmBatch.set(alarmRef, {
                    tip: 'tedarik_alarmi',
                    esnafId,
                    stokId: malzeme.stokId,
                    malzemeAdi: malzeme.malzemeAdi,
                    mevcutMiktar: stokData?.miktar || 0,
                    kritikEsik: stokData?.kritikEsik || 5,
                    birim: malzeme.birim,
                    durum: 'bekliyor',
                    olusturma: Timestamp.now(),
                    tetikZamani: new Date().toISOString(),
                })
            }

            await alarmBatch.commit()
        }
    }

    return sonuc
}

// ═══ 4. FOOD COST HESAPLAMA ════════════════════════════════════════════

export interface FoodCostSonuc {
    toplamMaliyetKurus: number
    maliyetOrani: number // % olarak (maliyet / satış fiyatı * 100)
    kalemler: Array<{
        malzemeAdi: string
        miktar: number
        birim: string
        birimFiyatKurus: number
        toplamKurus: number
        fire_orani: number
    }>
    durum: 'ideal' | 'uyari' | 'tehlike'
}

export async function foodCostHesapla(
    esnafId: string,
    menuItemId: string,
    satisFiyatKurus: number
): Promise<FoodCostSonuc> {
    const receteDoc = await adminDb
        .collection('esnaflar')
        .doc(esnafId)
        .collection('receteler')
        .doc(menuItemId)
        .get()

    if (!receteDoc.exists) {
        return { toplamMaliyetKurus: 0, maliyetOrani: 0, kalemler: [], durum: 'ideal' }
    }

    const malzemeler = (receteDoc.data()?.malzemeler || []) as ReceteMalzeme[]
    const kalemler: FoodCostSonuc['kalemler'] = []
    let toplamMaliyetKurus = 0

    for (const m of malzemeler) {
        // B2B fiyatını bul
        let birimFiyatKurus = 0

        if (m.stokId) {
            const stokDoc = await adminDb
                .collection('esnaflar')
                .doc(esnafId)
                .collection('stoklar')
                .doc(m.stokId)
                .get()

            birimFiyatKurus = stokDoc.data()?.birimFiyatKurus || 0
        }

        const fireliFactor = 1 + ((m.fire_orani || 0) / 100)
        const efektifMiktar = m.miktar * fireliFactor
        const kalemMaliyet = Math.round(birimFiyatKurus * efektifMiktar)

        kalemler.push({
            malzemeAdi: m.malzemeAdi,
            miktar: efektifMiktar,
            birim: m.birim,
            birimFiyatKurus,
            toplamKurus: kalemMaliyet,
            fire_orani: m.fire_orani || 0,
        })

        toplamMaliyetKurus += kalemMaliyet
    }

    const maliyetOrani = satisFiyatKurus > 0
        ? Math.round((toplamMaliyetKurus / satisFiyatKurus) * 10000) / 100
        : 0

    let durum: FoodCostSonuc['durum'] = 'ideal'
    if (maliyetOrani > 40) durum = 'tehlike'
    else if (maliyetOrani > 30) durum = 'uyari'

    return { toplamMaliyetKurus, maliyetOrani, kalemler, durum }
}
