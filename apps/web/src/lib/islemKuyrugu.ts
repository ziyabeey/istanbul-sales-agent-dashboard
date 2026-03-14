/**
 * İşlem Kuyruğu — Asenkron Webhook İşleme (Faz 44)
 * 
 * Webhook'lar (WhatsApp, Instagram DM, vb.) gelen mesajı kuyruğa ekler
 * ve anında 200 OK döner — LLM yanıtı worker tarafından işlenir.
 * 
 * Kuyruk: Firestore `islem_kuyrugu` koleksiyonu
 */

import { adminDb, FieldValue } from '@/lib/firebaseAdmin'

export type IslemTipi = 'whatsapp' | 'instagram_dm' | 'email' | 'site_formu'
export type IslemDurumu = 'bekliyor' | 'isleniyor' | 'tamamlandi' | 'hata'

export interface KuyrukIslemi {
    tip: IslemTipi
    durum: IslemDurumu
    esnafId: string | null
    payload: {
        telefon?: string
        mesaj: string
        mediaUrl?: string | null
        mimeType?: string | null
        sessionId?: string
        context?: string
    }
    olusturma: Date
    islemBaslangic?: Date
    islemBitis?: Date
    sonuc?: string
    hata?: string
    denemeSayisi: number
}

/**
 * Kuyruğa yeni işlem ekle — anında döner (non-blocking)
 */
export async function kuyruğaEkle(islem: Omit<KuyrukIslemi, 'olusturma' | 'durum' | 'denemeSayisi'>): Promise<string> {
    const ref = await adminDb.collection('islem_kuyrugu').add({
        ...islem,
        durum: 'bekliyor',
        olusturma: new Date(),
        denemeSayisi: 0,
    })
    return ref.id
}

/**
 * Kuyruktaki bekleyen işlemleri getir (FIFO)
 */
export async function kuyruktanAl(limit = 5): Promise<{ id: string; data: KuyrukIslemi }[]> {
    const snap = await adminDb
        .collection('islem_kuyrugu')
        .where('durum', '==', 'bekliyor')
        .orderBy('olusturma', 'asc')
        .limit(limit)
        .get()

    return snap.docs.map((doc: any) => ({
        id: doc.id,
        data: doc.data() as KuyrukIslemi,
    }))
}

/**
 * İşlemi "işleniyor" olarak işaretle (race condition koruması)
 */
export async function islemBaslat(islemId: string): Promise<boolean> {
    const ref = adminDb.collection('islem_kuyrugu').doc(islemId)

    try {
        await adminDb.runTransaction(async (tx: any) => {
            const doc = await tx.get(ref)
            if (!doc.exists || doc.data()?.durum !== 'bekliyor') {
                throw new Error('İşlem artık beklemede değil')
            }
            tx.update(ref, {
                durum: 'isleniyor',
                islemBaslangic: new Date(),
                denemeSayisi: FieldValue.increment(1),
            })
        })
        return true
    } catch {
        return false
    }
}

/**
 * İşlemi tamamla
 */
export async function islemTamamla(islemId: string, sonuc: string): Promise<void> {
    await adminDb.collection('islem_kuyrugu').doc(islemId).update({
        durum: 'tamamlandi',
        sonuc,
        islemBitis: new Date(),
    })
}

/**
 * İşlem hata ile sonuçlandı
 */
export async function islemHata(islemId: string, hata: string): Promise<void> {
    await adminDb.collection('islem_kuyrugu').doc(islemId).update({
        durum: 'hata',
        hata,
        islemBitis: new Date(),
    })
}
