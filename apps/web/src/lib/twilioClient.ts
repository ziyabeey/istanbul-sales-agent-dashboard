import twilio from 'twilio'
import { adminDb } from './firebaseAdmin'
import { telegramGonder } from './telegram'

let _client: twilio.Twilio | null = null

function getClient(): twilio.Twilio {
    if (!_client) {
        if (!process.env.TWILIO_ACCOUNT_SID || !process.env.TWILIO_AUTH_TOKEN) {
            throw new Error('Twilio env eksik: TWILIO_ACCOUNT_SID veya TWILIO_AUTH_TOKEN')
        }
        _client = twilio(process.env.TWILIO_ACCOUNT_SID, process.env.TWILIO_AUTH_TOKEN)
    }
    return _client
}

export async function waMesajGonder(
    telefon: string,
    mesaj: string,
    esnafId?: string,
    ajan = 'system'
): Promise<boolean> {
    const to = telefon.startsWith('whatsapp:') ? telefon : `whatsapp:${telefon}`
    const from = process.env.TWILIO_WHATSAPP_FROM!

    try {
        const client = getClient()
        const result = await client.messages.create({ from, to, body: mesaj })

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
    } catch (error: any) {
        // SMS YOK — sadece log ve alert
        await adminDb.collection('agent_logs').add({
            ajan,
            esnafId: esnafId || null,
            tip: 'wa_hata',
            input: { telefon },
            output: null,
            basari: false,
            hata: error.message,
            zaman: new Date(),
            kanal: 'whatsapp',
        })

        // Operatöre Telegram — WA ulaşılamadı
        await telegramGonder(
            `📵 <b>WA Ulaşılamadı</b>\n` +
            `Esnaf: ${esnafId || telefon}\n` +
            `Hata: ${error.message}\n` +
            `→ Instagram DM dene`
        )

        return false
    }
}

export function esnafHitap(esnaf: any): string {
    if (esnaf?.ad) return `${esnaf.ad} Usta`
    if (esnaf?.isletmeAdiTam) return esnaf.isletmeAdiTam
    if (esnaf?.isletmeAdi) return esnaf.isletmeAdi
    return 'Usta'
}

export { twilio }
