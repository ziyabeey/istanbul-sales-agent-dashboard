import type { ResolvedCredential } from '../../../../packages/security/src/credentials'
import { assertResolvedCredentialFields } from '../../../../packages/security/src/credentials'
import { adminDb } from './firebaseAdmin'

/**
 * Google My Business Profile API Servis Katmanı
 * Yorum Çekme (Read Reviews) & Yorum Yanıtlama (Reply to Reviews)
 */

export interface GoogleReview {
    reviewId: string
    reviewer: { displayName: string }
    starRating: string
    comment?: string
    createTime: string
    updateTime: string
    reviewReply?: {
        comment: string
        updateTime: string
    }
}

interface GoogleBusinessCredentialValues {
    accessToken: string
    accountId: string
    locationId: string
}

function fromResolvedCredential(credential: ResolvedCredential): GoogleBusinessCredentialValues {
    const checked = assertResolvedCredentialFields(
        credential,
        ['accessToken', 'accountId', 'locationId']
    )
    return {
        accessToken: checked.values.accessToken,
        accountId: checked.values.accountId,
        locationId: checked.values.locationId,
    }
}

/**
 * Compatibility source only. Full tenant IntegrationConnection migration is W3.
 * New callers should resolve a CredentialRef outside this provider adapter and
 * pass the resulting credential handle.
 */
async function legacyCredentialForTenant(esnafId: string): Promise<GoogleBusinessCredentialValues | null> {
    const esnafDoc = await adminDb.collection('esnaflar').doc(esnafId).get()
    const esnaf = esnafDoc.data()
    if (!esnaf?.googleAccessToken || !esnaf?.googleAccountId || !esnaf?.googleLocationId) {
        return null
    }
    return {
        accessToken: esnaf.googleAccessToken,
        accountId: esnaf.googleAccountId,
        locationId: esnaf.googleLocationId,
    }
}

async function credentialValues(
    esnafId: string,
    credential?: ResolvedCredential
): Promise<GoogleBusinessCredentialValues | null> {
    return credential ? fromResolvedCredential(credential) : legacyCredentialForTenant(esnafId)
}

export async function okunmamisYorumlariGetir(
    esnafId: string,
    credential?: ResolvedCredential
): Promise<GoogleReview[]> {
    try {
        const resolved = await credentialValues(esnafId, credential)
        if (!resolved) return []

        const url = `https://mybusiness.googleapis.com/v4/accounts/${resolved.accountId}/${resolved.locationId}/reviews`
        const response = await fetch(url, {
            headers: { Authorization: `Bearer ${resolved.accessToken}` },
        })

        if (!response.ok) {
            console.error('[GoogleBusiness] Yorumlar çekilemedi', response.status)
            return []
        }

        const data = await response.json()
        const tumYorumlar: GoogleReview[] = data.reviews || []
        return tumYorumlar.filter((review) => !review.reviewReply)
    } catch (error: unknown) {
        console.error(
            '[GoogleBusiness API Hata - Getir]',
            error instanceof Error ? error.message : 'Bilinmeyen hata'
        )
        return []
    }
}

export async function yorumaCevapYaz(
    esnafId: string,
    reviewId: string,
    yanitMetni: string,
    credential?: ResolvedCredential
): Promise<boolean> {
    try {
        const resolved = await credentialValues(esnafId, credential)
        if (!resolved) return false

        const url = `https://mybusiness.googleapis.com/v4/${reviewId}/reply`
        const response = await fetch(url, {
            method: 'PUT',
            headers: {
                Authorization: `Bearer ${resolved.accessToken}`,
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ comment: yanitMetni }),
        })

        if (!response.ok) {
            console.error('[GoogleBusiness] Yanıt yazılamadı', response.status)
            throw new Error('Google Maps Yorum Yanıtlama Başarısız')
        }

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
    } catch (error: unknown) {
        console.error(
            '[GoogleBusiness API Hata - Yanıtla]',
            error instanceof Error ? error.message : 'Bilinmeyen hata'
        )
        return false
    }
}
