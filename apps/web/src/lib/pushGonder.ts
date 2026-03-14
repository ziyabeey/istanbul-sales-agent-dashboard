/**
 * pushGonder.ts — Firebase Cloud Messaging Push Notification Helper
 * 
 * Esnafın kaydedilmiş FCM token'larına push bildirimi gönderir.
 * Geçersiz token'ları otomatik temizler.
 */

import { adminDb } from './firebaseAdmin'

interface PushPayload {
    baslik: string
    mesaj: string
    url?: string
    ikon?: string
}

/**
 * Belirli bir esnafa push notification gönder.
 * Token'lar Firestore esnaflar/{id}.fcm_tokens dizisinde saklanır.
 */
export async function pushGonder(esnafId: string, payload: PushPayload): Promise<{ gonderilen: number; temizlenen: number }> {
    try {
        const doc = await adminDb.collection('esnaflar').doc(esnafId).get()
        if (!doc.exists) return { gonderilen: 0, temizlenen: 0 }

        const fcmTokenlar: { token: string }[] = doc.data()?.fcm_tokens || []
        if (fcmTokenlar.length === 0) return { gonderilen: 0, temizlenen: 0 }

        const gecersizTokenlar: string[] = []
        let basarili = 0

        // Her token'a notification gönder
        for (const { token } of fcmTokenlar) {
            try {
                // Web Push API ile gönder (service worker üzerinden)
                // Firebase Admin SDK messaging yerine, fetch ile FCM v1 API kullanılır
                const fcmRes = await fetch(
                    `https://fcm.googleapis.com/v1/projects/${process.env.FIREBASE_PROJECT_ID}/messages:send`,
                    {
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/json',
                            'Authorization': `Bearer ${await getAccessToken()}`,
                        },
                        body: JSON.stringify({
                            message: {
                                token,
                                notification: {
                                    title: payload.baslik,
                                    body: payload.mesaj,
                                },
                                webpush: {
                                    fcm_options: {
                                        link: payload.url || 'https://kepenk.ai/dashboard',
                                    },
                                    notification: {
                                        icon: payload.ikon || '/icon-192x192.png',
                                        badge: '/icon-72x72.png',
                                    },
                                },
                            },
                        }),
                    }
                )

                if (fcmRes.ok) {
                    basarili++
                } else {
                    const err = await fcmRes.json().catch(() => ({}))
                    // Token geçersiz veya süresi dolmuşsa temizle
                    if (fcmRes.status === 404 || err?.error?.details?.[0]?.errorCode === 'UNREGISTERED') {
                        gecersizTokenlar.push(token)
                    }
                }
            } catch {
                // Token bazlı hata — diğer token'larla devam
            }
        }

        // Geçersiz token'ları temizle
        if (gecersizTokenlar.length > 0) {
            const guncelTokenlar = fcmTokenlar.filter(t => !gecersizTokenlar.includes(t.token))
            await adminDb.collection('esnaflar').doc(esnafId).update({
                fcm_tokens: guncelTokenlar,
            })
        }

        return { gonderilen: basarili, temizlenen: gecersizTokenlar.length }
    } catch (error) {
        console.error('[PUSH GÖNDER]', error)
        return { gonderilen: 0, temizlenen: 0 }
    }
}

/**
 * Toplu push — birden fazla esnafa aynı mesajı gönder.
 */
export async function topluPushGonder(esnafIdler: string[], payload: PushPayload): Promise<number> {
    let toplam = 0
    for (const esnafId of esnafIdler) {
        const { gonderilen } = await pushGonder(esnafId, payload)
        toplam += gonderilen
    }
    return toplam
}

// Google OAuth2 Access Token (Service Account ile)
async function getAccessToken(): Promise<string> {
    // Firebase Admin SDK zaten service account kullanıyor.
    // google-auth-library veya jose ile JWT → access_token exchange
    const { GoogleAuth } = await import('google-auth-library')
    const auth = new GoogleAuth({
        scopes: ['https://www.googleapis.com/auth/firebase.messaging'],
    })
    const client = await auth.getClient()
    const token = await client.getAccessToken()
    return token.token || ''
}
