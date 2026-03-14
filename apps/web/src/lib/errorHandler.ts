import { adminDb } from './firebaseAdmin'
import { telegramGonder } from './telegram'

// Bu ajanların hatası Telegram'a bildirilir
const KRITIK_AJANLAR = ['the_closer', 'iyzico', 'iyzico_callback', 'twilio_wa']

export async function withErrorHandling<T>(
    fn: () => Promise<T>,
    context: { ajan?: string; esnafId?: string; islem?: string }
): Promise<T | null> {
    try {
        return await fn()
    } catch (error: any) {
        const hata = {
            mesaj: error.message || String(error),
            stack: error.stack,
            context,
            zaman: new Date(),
        }

        // Hataları Firestore'a yaz
        try {
            await adminDb.collection('hatalar').add(hata)
        } catch {
            // Firestore da çökmüşse konsola yaz
            console.error('[HATA KAYIT BAŞARISIZ]', hata)
        }

        // Kritik ajanlarda Telegram alarm
        if (context.ajan && KRITIK_AJANLAR.includes(context.ajan)) {
            await telegramGonder(
                `🔴 <b>KRİTİK HATA</b>\n` +
                `Ajan: ${context.ajan}\n` +
                `İşlem: ${context.islem || '-'}\n` +
                `Esnaf: ${context.esnafId || '-'}\n` +
                `Hata: <code>${error.message}</code>`
            ).catch(() => { })
        }

        console.error('[HATA]', context, error.message)
        return null
    }
}
