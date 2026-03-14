import { GoogleGenerativeAI, Part } from '@google/generative-ai'

// Resmi doğrudan Base64'e okumak veya buffer'dan çevirmek için yardımcı fonksiyon
export async function urlToBase64(url: string): Promise<string | null> {
    try {
        const response = await fetch(url)
        if (!response.ok) return null
        const arrayBuffer = await response.arrayBuffer()
        const buffer = Buffer.from(arrayBuffer)
        return buffer.toString('base64')
    } catch (e) {
        console.error('URL Okuma Hatası:', e)
        return null
    }
}

/**
 * Gemini'a gönderilecek (MimeType + Base64) Part yapılandırıcısı.
 */
export function resimToGenerativePart(base64Data: string, mimeType: string): Part {
    return {
        inlineData: {
            data: base64Data,
            mimeType
        },
    }
}
