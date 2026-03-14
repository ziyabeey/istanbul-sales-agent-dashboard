/**
 * alertLogger.ts — Dead Letter Queue + Telegram Alarm
 * ─────────────────────────────────────────────────────────────────────────────
 * Kritik işlemler 3 denemeden sonra başarısız olduğunda:
 *  1. Firestore `dead_letter_queue` koleksiyonuna kaydet
 *  2. Admin Telegram grubuna alarm at
 * ─────────────────────────────────────────────────────────────────────────────
 */

import { adminDb, Timestamp } from '@/lib/firebaseAdmin'

const DLQ_COL = 'dead_letter_queue'

export type DLQOncelik = 'kritik' | 'yuksek' | 'normal'

export interface DLQKayit {
    islem: string           // İşlem adı (site_uretimi, whatsapp_yanit, vb.)
    kaynak: string          // Hangi dosya/fonksiyondan geldi
    payload: Record<string, any>  // Orijinal veri (yeniden deneme için)
    hata: string            // Hata mesajı
    hataSinifi: string      // Error.name veya HTTP status
    denemeSayisi: number    // Kaç kez denendi
    oncelik: DLQOncelik
    zaman: any
    cozuldu: boolean        // Admin tarafından çözüldüyse true
    cozumNotu?: string
}

/**
 * Başarısız işlemi Dead Letter Queue'ya kaydet + Telegram alarm at.
 */
export async function deadLetterKaydet(kayit: Omit<DLQKayit, 'zaman' | 'cozuldu'>): Promise<string> {
    // 1. Firestore'a kaydet
    const ref = await adminDb.collection(DLQ_COL).add({
        ...kayit,
        zaman: Timestamp.now(),
        cozuldu: false,
    })

    console.error(`[DLQ] ❌ İşlem başarısız → DLQ'ya eklendi: ${kayit.islem} | ${ref.id}`)

    // 2. Telegram alarm
    await telegramAlarm(
        `🚨 *DLQ ALARM*\n` +
        `📛 İşlem: \`${kayit.islem}\`\n` +
        `💥 Hata: \`${kayit.hata.slice(0, 200)}\`\n` +
        `🔄 Deneme: ${kayit.denemeSayisi}\n` +
        `⚡ Öncelik: ${kayit.oncelik}\n` +
        `📌 Kaynak: \`${kayit.kaynak}\`\n` +
        `🆔 DLQ ID: \`${ref.id}\``,
        kayit.oncelik
    )

    return ref.id
}

/**
 * Telegram Bot API ile admin grubuna mesaj gönderir.
 * Env: TELEGRAM_BOT_TOKEN, TELEGRAM_CHAT_ID
 */
export async function telegramAlarm(
    mesaj: string,
    oncelik: DLQOncelik = 'normal'
): Promise<boolean> {
    const token = process.env.TELEGRAM_BOT_TOKEN
    const chatId = process.env.TELEGRAM_CHAT_ID

    if (!token || !chatId) {
        console.warn('[TELEGRAM] Bot token veya chat ID eksik, alarm gönderilemedi')
        return false
    }

    // Kritik alarmları sessiz moda alma — normal saatlerde bile bildirim çalsın
    const disableNotification = oncelik === 'normal'

    try {
        const res = await fetch(
            `https://api.telegram.org/bot${token}/sendMessage`,
            {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    chat_id: chatId,
                    text: mesaj,
                    parse_mode: 'Markdown',
                    disable_notification: disableNotification,
                }),
            }
        )

        if (!res.ok) {
            console.error('[TELEGRAM] Alarm gönderilemedi:', await res.text())
            return false
        }

        return true
    } catch (err) {
        console.error('[TELEGRAM] Alarm hatası:', err)
        return false
    }
}

/**
 * DLQ'daki çözülmemiş işlemleri listele (admin dashboard için).
 */
export async function dlqListele(limit = 20): Promise<(DLQKayit & { id: string })[]> {
    const snap = await adminDb
        .collection(DLQ_COL)
        .where('cozuldu', '==', false)
        .orderBy('zaman', 'desc')
        .limit(limit)
        .get()

    return snap.docs.map((doc: any) => ({
        id: doc.id,
        ...doc.data(),
    })) as (DLQKayit & { id: string })[]
}

/**
 * DLQ kaydını çözülmüş olarak işaretle.
 */
export async function dlqCoz(dlqId: string, cozumNotu: string): Promise<void> {
    await adminDb.collection(DLQ_COL).doc(dlqId).update({
        cozuldu: true,
        cozumNotu,
        cozumZamani: Timestamp.now(),
    })
}
