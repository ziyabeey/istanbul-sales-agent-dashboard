import { adminDb } from './firebaseAdmin'

/**
 * Google My Business Profile API Servis Katmanı
 * Yorum Çekme (Read Reviews) & Yorum Yanıtlama (Reply to Reviews)
 */

export interface GoogleReview {
    reviewId: string
    reviewer: { displayName: string }
    starRating: string // "ONE", "TWO", "THREE", "FOUR", "FIVE"
    comment?: string
    createTime: string
    updateTime: string
    reviewReply?: {
        comment: string
        updateTime: string
    }
}

/**
 * Esnafın Google API Token bilgilerini alarak okunmamış/yanıtlanmamış Google yorumlarını getirir.
 */
export async function okunmamisYorumlariGetir(esnafId: string): Promise<GoogleReview[]> {
    try {
        const esnafDoc = await adminDb.collection('esnaflar').doc(esnafId).get()
        const esnaf = esnafDoc.data()

        if (!esnaf || !esnaf.googleAccessToken || !esnaf.googleLocationId) {
            return [] // Kimlik doğrulaması yoksa atla
        }

        const ACCESS_TOKEN = esnaf.googleAccessToken
        const LOCATION_ID = esnaf.googleLocationId // "locations/12345678" formatında bekliyoruz.

        const url = `https://mybusiness.googleapis.com/v4/accounts/${esnaf.googleAccountId}/${LOCATION_ID}/reviews`

        const response = await fetch(url, {
            headers: { 'Authorization': `Bearer ${ACCESS_TOKEN}` }
        })

        if (!response.ok) {
            console.error('[GoogleBusiness] Yorumlar çekilemedi', await response.json())
            return []
        }

        const data = await response.json()
        const tumYorumlar: GoogleReview[] = data.reviews || []

        // Yalnızca esnafın (veya botun) BİZZAT YANITLAMADIĞI (reviewReply'i olmayan) yorumları getir
        return tumYorumlar.filter(r => !r.reviewReply)
    } catch (e: any) {
        console.error('[GoogleBusiness API Hata - Getir]', e.message)
        return []
    }
}

/**
 * Belirli bir yoruma Google API üzerinden açık/public yanıt yazar.
 */
export async function yorumaCevapYaz(
    esnafId: string,
    reviewId: string, // Tam yol: "accounts/{accountId}/locations/{locationId}/reviews/{reviewId}"
    yanitMetni: string
): Promise<boolean> {
    try {
        const esnafDoc = await adminDb.collection('esnaflar').doc(esnafId).get()
        const esnaf = esnafDoc.data()

        if (!esnaf || !esnaf.googleAccessToken) return false

        const ACCESS_TOKEN = esnaf.googleAccessToken

        const url = `https://mybusiness.googleapis.com/v4/${reviewId}/reply`

        const response = await fetch(url, {
            method: 'PUT',
            headers: {
                'Authorization': `Bearer ${ACCESS_TOKEN}`,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ comment: yanitMetni })
        })

        if (!response.ok) {
            console.error('[GoogleBusiness] Yanıt yazılamadı', await response.json())
            throw new Error('Google Maps Yorum Yanıtlama Başarısız')
        }

        // Başarılı log
        await adminDb.collection('agent_logs').add({
            ajan: 'sentiment_guardian_google',
            esnafId,
            tip: 'google_yorum_yanitlandi',
            input: { reviewId },
            output: { yanitMetni },
            basari: true,
            hata: null,
            zaman: new Date(),
            kanal: 'google_maps',
        })

        return true

    } catch (e: any) {
        console.error('[GoogleBusiness API Hata - Yanıtla]', e.message)
        return false
    }
}
