import { GoogleGenerativeAI } from '@google/generative-ai'

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY!)

export async function sesliMesajiYaziyaCevir(
    mediaUrl: string,
    authToken: string
): Promise<string> {
    // Twilio'dan ses dosyasını indir
    const response = await fetch(mediaUrl, {
        headers: {
            Authorization: `Basic ${Buffer.from(
                `${process.env.TWILIO_ACCOUNT_SID}:${authToken}`
            ).toString('base64')}`,
        },
    })

    const audioBuffer = Buffer.from(await response.arrayBuffer())
    const base64Audio = audioBuffer.toString('base64')

    // Gemini Flash ile transkript al
    const model = genAI.getGenerativeModel({ model: 'gemini-3.0-flash' })

    const result = await model.generateContent([
        {
            inlineData: {
                mimeType: 'audio/ogg',  // Twilio OGG gönderir
                data: base64Audio,
            },
        },
        {
            text: 'Bu sesli mesajı Türkçe olarak kelimesi kelimesine yaz. Sadece metni yaz, başka hiçbir şey ekleme.',
        },
    ])

    return result.response.text().trim()
}
