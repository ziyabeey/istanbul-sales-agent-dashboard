/**
 * idempotency.ts — Webhook Çifte İşlem Koruması
 * ─────────────────────────────────────────────────────────────────────────────
 * Firestore koleksiyonu: `processed_webhooks`
 * TTL: 72 saat (otomatik temizleme cron ile veya Firestore TTL policy ile)
 * 
 * Kullanım:
 *   if (await islemZatenIslendi(MessageSid, 'twilio')) return 200 OK
 *   ...işlemi yap...
 *   await islemKayitla(MessageSid, 'twilio', { durum: 'basarili' })
 * ─────────────────────────────────────────────────────────────────────────────
 */

import { adminDb, Timestamp } from '@/lib/firebaseAdmin'

const COL = 'processed_webhooks'
const TTL_SAAT = 72

export type WebhookKaynagi = 'twilio' | 'iyzico' | 'instagram' | 'stripe' | 'cloudflare' | 'genel'

interface IslenmisBilgi {
    webhookId: string
    kaynak: WebhookKaynagi
    islenmeTarihi: any
    sonuc: Record<string, any>
    ttlSonlanma: any // Firestore TTL policy ile otomatik silinir
}

/**
 * Webhook'un daha önce işlenip işlenmediğini kontrol eder.
 * Aynı ID tekrar gelirse `true` döner → işlemi DURDUR, 200 OK dön.
 */
export async function islemZatenIslendi(
    webhookId: string,
    kaynak: WebhookKaynagi = 'genel'
): Promise<boolean> {
    if (!webhookId) return false

    const docId = `${kaynak}_${webhookId}`

    try {
        const doc = await adminDb.collection(COL).doc(docId).get()
        if (doc.exists) {
            console.log(`[IDEMPOTENCY] ⛔ Çifte istek engellendi: ${docId}`)
            return true
        }
        return false
    } catch (err) {
        // Firestore hatası durumunda güvenli tarafta kal — işleme izin ver
        console.error('[IDEMPOTENCY] Kontrol hatası:', err)
        return false
    }
}

/**
 * İşlem başarılı sonuçlandıktan sonra webhookId'yi kaydet.
 * TTL: 72 saat sonra otomatik silinir (Firestore TTL Policy).
 */
export async function islemKayitla(
    webhookId: string,
    kaynak: WebhookKaynagi = 'genel',
    sonuc: Record<string, any> = {}
): Promise<void> {
    if (!webhookId) return

    const docId = `${kaynak}_${webhookId}`
    const now = new Date()
    const ttl = new Date(now.getTime() + TTL_SAAT * 60 * 60 * 1000)

    try {
        await adminDb.collection(COL).doc(docId).set({
            webhookId,
            kaynak,
            islenmeTarihi: Timestamp.fromDate(now),
            sonuc,
            ttlSonlanma: Timestamp.fromDate(ttl),
        } satisfies IslenmisBilgi)
    } catch (err) {
        // Kayıt hatası kritik değil — loglayıp devam et
        console.error('[IDEMPOTENCY] Kayıt hatası:', err)
    }
}

/**
 * Eski kayıtları temizle (cron ile kullanılır — TTL policy yoksa)
 */
export async function eskiKayitlariTemizle(): Promise<number> {
    const now = Timestamp.now()
    const snap = await adminDb
        .collection(COL)
        .where('ttlSonlanma', '<', now)
        .limit(500)
        .get()

    if (snap.empty) return 0

    const batch = adminDb.batch()
    snap.docs.forEach((doc: any) => batch.delete(doc.ref))
    await batch.commit()

    console.log(`[IDEMPOTENCY] ${snap.size} eski kayıt temizlendi`)
    return snap.size
}
