import { NextResponse } from 'next/server'
import { adminDb } from '@/lib/firebaseAdmin'
import { musteriMesajiKuyrugaAl } from '@/lib/musteriAjani'
import { sesliMesajiYaziyaCevir } from '@/lib/sesTranscript'

export async function POST(req: Request) {
    const formData = await req.formData()

    const from = formData.get('From')?.toString() ?? ''     // "whatsapp:+905551234567"
    const to = formData.get('To')?.toString() ?? ''         // "whatsapp:+90XXXXXXXXXX"
    const body = formData.get('Body')?.toString() ?? ''
    const msgId = formData.get('MessageSid')?.toString() ?? ''
    const mediaUrl = formData.get('MediaUrl0')?.toString() ?? null
    const mediaType = formData.get('MediaContentType0')?.toString() ?? null

    // Twilio numarasından esnafı bul
    const twilioNumara = to.replace('whatsapp:', '')

    const esnafQuery = await adminDb
        .collection('esnaflar')
        .where('twilioNumarasi', '==', twilioNumara)
        .limit(1)
        .get()

    if (esnafQuery.empty) {
        return new NextResponse(
            `< Response > <Message>Merhaba! kepenk.ai destek icin destek @kepenk.ai</Message></Response > `,
            { headers: { 'Content-Type': 'text/xml' } }
        )
    }

    const esnafId = esnafQuery.docs[0].id
    const musteriNumara = from.replace('whatsapp:', '')

    // Aynı mesaj tekrar gelmesin (idempotency)
    if (msgId) {
        const tekrar = await adminDb
            .collection('musteriKonusmalar')
            .where('twilioMsgId', '==', msgId)
            .limit(1)
            .get()
        if (!tekrar.empty) {
            return new NextResponse('<Response/>', { headers: { 'Content-Type': 'text/xml' } })
        }
    }

    // Arka planda işle (Twilio 15sn timeout, biz hemen 200 dönelim)
    const oturumId = `${esnafId} -${musteriNumara} -${new Date().toDateString()} `

    let mesajMetni = body

    // Sesli mesaj geldi mi?
    if (mediaUrl && mediaType?.startsWith('audio/')) {
        try {
            const transkript = await sesliMesajiYaziyaCevir(
                mediaUrl,
                process.env.TWILIO_AUTH_TOKEN!
            )
            mesajMetni = `[Sesli mesaj]: ${transkript} `
            // console.log('[SES TRANSKRİPT]', transkript)
        } catch (e) {
            mesajMetni = '[Sesli mesaj gönderdiniz — anlayamadım, yazarak tekrar yazar mısınız?]'
            // console.error('[SES CEVIREMEDIM]', e)
        }
    }

    // Resim geldi mi?
    if (mediaUrl && mediaType?.startsWith('image/')) {
        mesajMetni = body
            ? `${body} [Bir fotoğraf da gönderdi]`
            : '[Fotoğraf gönderdi]'
    }

    if (!mesajMetni) {
        return new NextResponse('<Response/>', { headers: { 'Content-Type': 'text/xml' } })
    }

    musteriMesajiKuyrugaAl({ esnafId, musteriNumara, mesaj: mesajMetni, oturumId })
        .catch(() => {})

    return new NextResponse('<Response/>', {
        headers: { 'Content-Type': 'text/xml' }
    })
}
