/**
 * siteVersiyonlari.ts — Firestore "Zaman Makinesi"
 * ─────────────────────────────────────────────────────────────────────────────
 * Subcollection: esnaflar/{esnafId}/site_versiyonlari
 * FIFO: Max 15 snapshot. 16. eklendiğinde en eski otomatik silinir.
 * ─────────────────────────────────────────────────────────────────────────────
 */
import { adminDb, Timestamp } from '@/lib/firebaseAdmin'

const MAX_VERSIYON = 15
const SUBCOL = 'site_versiyonlari'

// ── Interface ──────────────────────────────────────────────────────────────

export interface SiteVersiyon {
    id: string
    versiyon_adi: string
    yayin_tarihi: any // Firestore Timestamp
    site_json: Record<string, any>
    aktif_moduller: string[]
    tema_id: string
    boyut_kb: number // yaklaşık JSON boyutu
}

// ── Yeni versiyon kaydet (FIFO) ────────────────────────────────────────────

export async function versiyonKaydet(
    esnafId: string,
    siteJson: Record<string, any>,
    versiyonAdi: string,
    aktifModuller: string[] = [],
    temaId: string = 'varsayilan'
): Promise<string> {
    const col = adminDb.collection('esnaflar').doc(esnafId).collection(SUBCOL)

    // JSON boyutunu hesapla (KB)
    const jsonStr = JSON.stringify(siteJson)
    const boyutKb = Math.round(Buffer.byteLength(jsonStr, 'utf8') / 1024)

    // 1. Yeni doküman ekle
    const ref = await col.add({
        versiyon_adi: versiyonAdi,
        yayin_tarihi: Timestamp.now(),
        site_json: siteJson,
        aktif_moduller: aktifModuller,
        tema_id: temaId,
        boyut_kb: boyutKb,
    })

    // 2. FIFO: Eğer 15'ten fazla varsa en eskileri sil
    const snap = await col.orderBy('yayin_tarihi', 'asc').get()
    if (snap.size > MAX_VERSIYON) {
        const silinecekSayisi = snap.size - MAX_VERSIYON
        const batch = adminDb.batch()
        snap.docs.slice(0, silinecekSayisi).forEach((doc: any) => {
            batch.delete(doc.ref)
        })
        await batch.commit()
        console.log(`[ZAMAN MAKİNESİ] ${silinecekSayisi} eski versiyon silindi (FIFO)`)
    }

    console.log(`[ZAMAN MAKİNESİ] Versiyon kaydedildi: "${versiyonAdi}" (${boyutKb} KB)`)
    return ref.id
}

// ── Son 15 versiyonu getir ─────────────────────────────────────────────────

export async function versiyonlariGetir(esnafId: string): Promise<SiteVersiyon[]> {
    const snap = await adminDb
        .collection('esnaflar')
        .doc(esnafId)
        .collection(SUBCOL)
        .orderBy('yayin_tarihi', 'desc')
        .limit(MAX_VERSIYON)
        .get()

    return snap.docs.map((doc: any) => ({
        id: doc.id,
        ...doc.data(),
    })) as SiteVersiyon[]
}

// ── Belirli bir versiyona geri dön (Rollback) ──────────────────────────────

export async function versiyonGeriYukle(
    esnafId: string,
    versiyonId: string
): Promise<SiteVersiyon> {
    const doc = await adminDb
        .collection('esnaflar')
        .doc(esnafId)
        .collection(SUBCOL)
        .doc(versiyonId)
        .get()

    if (!doc.exists) {
        throw new Error(`Versiyon bulunamadı: ${versiyonId}`)
    }

    const versiyon = { id: doc.id, ...doc.data() } as SiteVersiyon

    // Esnaf dokümanına rollback bilgisini yaz
    await adminDb.collection('esnaflar').doc(esnafId).update({
        'site_rollback': {
            versiyon_id: versiyonId,
            versiyon_adi: versiyon.versiyon_adi,
            zaman: Timestamp.now(),
        },
        aktifWebModulleri: versiyon.aktif_moduller || [],
        paletId: versiyon.tema_id || null,
    })

    console.log(`[ZAMAN MAKİNESİ] Rollback yapıldı → "${versiyon.versiyon_adi}"`)
    return versiyon
}

// ── Tekil versiyon sil ─────────────────────────────────────────────────────

export async function versiyonSil(
    esnafId: string,
    versiyonId: string
): Promise<void> {
    await adminDb
        .collection('esnaflar')
        .doc(esnafId)
        .collection(SUBCOL)
        .doc(versiyonId)
        .delete()

    console.log(`[ZAMAN MAKİNESİ] Versiyon silindi: ${versiyonId}`)
}
