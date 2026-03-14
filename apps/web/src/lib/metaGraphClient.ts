import { adminDb } from './firebaseAdmin'

/**
 * Meta Graph API üzerinden Instagram Direkt Mesaj (DM) gönderme kütüphanesi.
 * Her esnafın kendi IG_ACCESS_TOKEN'i Firestore üzerinde tutulacak.
 */
export async function instagramDmGonder(
    instagramUserId: string,
    mesaj: string,
    esnafId: string
): Promise<boolean> {
    try {
        // Esnafın Meta kimlik doğrulama bilgilerini (Token) getir
        const esnafDoc = await adminDb.collection('esnaflar').doc(esnafId).get()
        const esnaf = esnafDoc.data()

        if (!esnaf || !esnaf.instagramAccessToken || !esnaf.instagramAccountId) {
            console.error(`[MetaGraph] Esnaf (${esnafId}) için geçerli Instagram Token bulunamadı.`)
            return false
        }

        const IG_ACCESS_TOKEN = esnaf.instagramAccessToken
        const IG_ACCOUNT_ID = esnaf.instagramAccountId

        const body = {
            recipient: {
                id: instagramUserId
            },
            message: {
                text: mesaj
            }
        }

        // Meta Graph API - Mesaj Gönderme Endpoiti
        const response = await fetch(`https://graph.facebook.com/v19.0/${IG_ACCOUNT_ID}/messages`, {
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${IG_ACCESS_TOKEN}`,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(body)
        })

        const result = await response.json()

        if (!response.ok) {
            console.error('[MetaGraph API Hata]', result)
            throw new Error(result.error?.message || 'Instagram DM gönderilemedi.')
        }

        // WhatsApp ve Cron haricinde OmniChannel tabanlı loglama
        await adminDb.collection('agent_logs').add({
            ajan: 'instagram_dm_bot',
            esnafId,
            tip: 'ig_gonderildi',
            input: { instagramUserId, mesajUzunluk: mesaj.length },
            output: { messageId: result.message_id },
            basari: true,
            hata: null,
            zaman: new Date(),
            kanal: 'instagram',
        })

        return true
    } catch (error: any) {
        // DM Başarısız Logu
        await adminDb.collection('agent_logs').add({
            ajan: 'instagram_dm_bot',
            esnafId: esnafId,
            tip: 'ig_hata',
            input: { instagramUserId },
            output: null,
            basari: false,
            hata: error.message,
            zaman: new Date(),
            kanal: 'instagram',
        })
        console.error('[IG DM HATA]', error)
        return false
    }
}
