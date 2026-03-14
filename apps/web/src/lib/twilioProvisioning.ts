import twilio from 'twilio'
import { adminDb } from './firebaseAdmin'

/** Esnafa dedicated Twilio WhatsApp numarası ata (BUYUME+ paketler) */
export async function esnafaWANumaraAta(esnafId: string): Promise<string> {
    const sid = process.env.TWILIO_ACCOUNT_SID
    const token = process.env.TWILIO_AUTH_TOKEN

    if (!sid || !token) {
        console.log(`[TWILIO MOCK] Numara atanacaktı: ${esnafId}`)
        return '+9055500000000'
    }

    const client = twilio(sid, token)

    // Mevcut numaralardan atanmamış olanı bul
    const mevcut = await client.incomingPhoneNumbers.list({ limit: 20 })
    const atanmamis = mevcut.find(n => !n.friendlyName.startsWith('kepenk-'))

    if (!atanmamis) {
        console.warn('[TWILIO] Boş numara yok, yeni satın alınmalı')
        return ''
    }

    const numara = atanmamis.phoneNumber

    // Webhook'u ayarla
    await client.incomingPhoneNumbers(atanmamis.sid).update({
        friendlyName: `kepenk-${esnafId}`,
        smsUrl: `${process.env.NEXT_PUBLIC_APP_URL}/api/wa/musteri-mesaji`,
        smsMethod: 'POST',
    })

    // Firestore'a kaydet
    await adminDb.collection('esnaflar').doc(esnafId).update({
        twilioNumarasi: numara,
        'ayarlar.aiMusteriServisi': true,
    })

    return numara
}
