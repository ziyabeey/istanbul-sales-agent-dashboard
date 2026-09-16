import twilio from 'twilio'
import { adminDb } from './firebaseAdmin'
import { telegramGonder } from './telegram'
import {
    EnvCredentialResolver,
    PLATFORM_CREDENTIAL_REFS,
    resolveRequiredCredential,
} from './credentials/credentialResolver'

let _client: twilio.Twilio | null = null
const credentialResolver = new EnvCredentialResolver()

async function getClient(): Promise<{ client: twilio.Twilio; fromNumber: string }> {
    const credential = await resolveRequiredCredential(
        credentialResolver,
        PLATFORM_CREDENTIAL_REFS.twilio,
        ['accountSid', 'authToken', 'fromNumber']
    )

    if (!_client) {
        _client = twilio(credential.values.accountSid, credential.values.authToken)
    }

    return {
        client: _client,
        fromNumber: credential.values.fromNumber,
    }
}

export async function waMesajGonder(
    telefon: string,
    mesaj: string,
    esnafId?: string,
    ajan = 'system'
): Promise<boolean> {
    const to = telefon.startsWith('whatsapp:') ? telefon : `whatsapp:${telefon}`

    try {
        const { client, fromNumber } = await getClient()
        const result = await client.messages.create({ from: fromNumber, to, body: mesaj })

        await adminDb.collection('agent_logs').add({
            ajan,
            esnafId: esnafId || null,
            tip: 'wa_gonderildi',
            input: { telefon, mesajUzunluk: mesaj.length },
            output: { messageSid: result.sid, status: result.status },
            basari: true,
            hata: null,
            zaman: new Date(),
            kanal: 'whatsapp',
        })

        return true
    } catch (error: unknown) {
        const message = error instanceof Error ? error.message : 'Bilinmeyen Twilio hatası'
        await adminDb.collection('agent_logs').add({
            ajan,
            esnafId: esnafId || null,
            tip: 'wa_hata',
            input: { telefon },
            output: null,
            basari: false,
            hata: message,
            zaman: new Date(),
            kanal: 'whatsapp',
        })

        await telegramGonder(
            `📵 <b>WA Ulaşılamadı</b>\n` +
            `Esnaf: ${esnafId || telefon}\n` +
            `Hata: ${message}\n` +
            `→ Instagram DM dene`
        )

        return false
    }
}

export function esnafHitap(esnaf: unknown): string {
    if (esnaf && typeof esnaf === 'object') {
        const candidate = esnaf as Record<string, unknown>
        if (typeof candidate.ad === 'string' && candidate.ad) return `${candidate.ad} Usta`
        if (typeof candidate.isletmeAdiTam === 'string' && candidate.isletmeAdiTam) return candidate.isletmeAdiTam
        if (typeof candidate.isletmeAdi === 'string' && candidate.isletmeAdi) return candidate.isletmeAdi
    }
    return 'Usta'
}

export { twilio }
