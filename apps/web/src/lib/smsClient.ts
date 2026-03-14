import twilio from 'twilio'

const accountSid = process.env.TWILIO_ACCOUNT_SID!
const authToken = process.env.TWILIO_AUTH_TOKEN!
// Twilio SMS numaran (MOCK: normalde WhatsApp numaranın yanında tahsis edilen bir SMS Messaging Service SID ya da raw numaradır)
const twilioSmsFrom = process.env.TWILIO_SMS_FROM || '+1234567890'

const client = twilio(accountSid, authToken)

export async function smsGonder(to: string, body: string, esnafId: string): Promise<boolean> {
    try {
        const formattedTo = to.startsWith('+') ? to : `+${to}`

        const message = await client.messages.create({
            body: `\n${body}\n\n- kepenk.ai`,
            from: twilioSmsFrom,
            to: formattedTo
        })

        console.log(`[SMS GONDERILDI] Esnaf: ${esnafId} -> To: ${formattedTo} | SID: ${message.sid}`)

        // İsteğe bağlı: Firestore'a SMS logu at
        const { adminDb, Timestamp } = await import('./firebaseAdmin')
        await adminDb.collection('smsLogs').add({
            esnafId,
            to: formattedTo,
            body,
            sid: message.sid,
            zaman: Timestamp.now()
        })

        return true
    } catch (error) {
        console.error(`[SMS HATA] Esnaf: ${esnafId} -> To: ${to}`, error)
        return false
    }
}
