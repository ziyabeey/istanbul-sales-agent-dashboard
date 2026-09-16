import type { ResolvedCredential } from '../../../../packages/security/src/credentials'
import { assertResolvedCredentialFields } from '../../../../packages/security/src/credentials'
import { adminDb } from './firebaseAdmin'

interface InstagramCredentialValues {
    accessToken: string
    accountId: string
}

function fromResolvedCredential(credential: ResolvedCredential): InstagramCredentialValues {
    const checked = assertResolvedCredentialFields(credential, ['accessToken', 'accountId'])
    return {
        accessToken: checked.values.accessToken,
        accountId: checked.values.accountId,
    }
}

/** Compatibility source only. Full tenant IntegrationConnection migration is W3. */
async function legacyCredentialForTenant(esnafId: string): Promise<InstagramCredentialValues | null> {
    const esnafDoc = await adminDb.collection('esnaflar').doc(esnafId).get()
    const esnaf = esnafDoc.data()
    if (!esnaf?.instagramAccessToken || !esnaf?.instagramAccountId) return null
    return {
        accessToken: esnaf.instagramAccessToken,
        accountId: esnaf.instagramAccountId,
    }
}

async function credentialValues(
    esnafId: string,
    credential?: ResolvedCredential
): Promise<InstagramCredentialValues | null> {
    return credential ? fromResolvedCredential(credential) : legacyCredentialForTenant(esnafId)
}

/**
 * Meta Graph API üzerinden Instagram DM gönderir.
 * New callers may pass a resolved credential handle. Legacy tenant-root token
 * loading remains only as a compatibility source until W3 cutover.
 */
export async function instagramDmGonder(
    instagramUserId: string,
    mesaj: string,
    esnafId: string,
    credential?: ResolvedCredential
): Promise<boolean> {
    try {
        const resolved = await credentialValues(esnafId, credential)
        if (!resolved) {
            console.error(`[MetaGraph] Esnaf (${esnafId}) için geçerli Instagram credential bulunamadı.`)
            return false
        }

        const body = {
            recipient: { id: instagramUserId },
            message: { text: mesaj },
        }

        const response = await fetch(`https://graph.facebook.com/v19.0/${resolved.accountId}/messages`, {
            method: 'POST',
            headers: {
                Authorization: `Bearer ${resolved.accessToken}`,
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(body),
        })

        const result = await response.json()
        if (!response.ok) {
            console.error('[MetaGraph API Hata]', response.status)
            throw new Error(result.error?.message || 'Instagram DM gönderilemedi.')
        }

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
    } catch (error: unknown) {
        const message = error instanceof Error ? error.message : 'Bilinmeyen Meta Graph hatası'
        await adminDb.collection('agent_logs').add({
            ajan: 'instagram_dm_bot',
            esnafId,
            tip: 'ig_hata',
            input: { instagramUserId },
            output: null,
            basari: false,
            hata: message,
            zaman: new Date(),
            kanal: 'instagram',
        })
        console.error('[IG DM HATA]', message)
        return false
    }
}
