import { GoogleGenerativeAI, Part } from '@google/generative-ai'

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY!)

/**
 * Müşterinin gönderdiği hasar/istek fotoğrafını (Örn: Patlak boru, ezik tampon, saç modeli)
 * esnafın "Sektörü" ve "Fiyat Listesi" bağlamında inceler. Arıza teşhisi koyar ve
 * tahmini bir maliyet teklifi çıkarır.
 */
export async function gorselAnalizVeTeklif(params: {
    gorselBase64: string
    mimeType: string
    sektor: string
    musteriNotu?: string
    esnafHizmetVeFiyatlari?: string
}): Promise<{
    tespit: string
    teklifTutari?: number
    cozumMaddeleri: string[]
    aiYanitTaslagi: string
} | null> {
    try {
        const visionModel = genAI.getGenerativeModel({ model: 'gemini-1.5-flash' })

        const imagePart: Part = {
            inlineData: {
                data: params.gorselBase64,
                mimeType: params.mimeType,
            },
        }

        const prompt = `
Sen profesyonel bir '${params.sektor}' ustası ve fiyatlandırma uzmanısın.
Müşterin sana bir fotoğraf gönderdi. Sen bu fotoğraftaki sorunu (veyahut istenen hizmeti)
uzman gözüyle analiz edecek, teşhis koyacak ve esnaf adına ortalama bir ön-fiyat teklifi çıkaracaksın.

Müşteri Notu: "${params.musteriNotu || 'Sadece fotoğraf atıldı.'}"
Esnafın Ortalama Fiyat Listesi (veya Hizmet Standartları): "${params.esnafHizmetVeFiyatlari || 'Belirtilmedi'}"

LÜTFEN SADECE GEÇERLİ JSON FORMATINDA YANIT VER.
{
    "tespit": "Fotoğrafta ne görüyorsun? Hasar/İhtiyaç nedir? (Max 2 cümle, müşterinin anlayacağı basit dilde)",
    "teklifTutari": 1500, // Sayısal bir tahmini tutar (Opsiyonel, fiyat verilemeyecek durumsa null bırak),
    "cozumMaddeleri": ["Bölgenin zımparalanması", "Lokal boya işlemi", "Cila"], // Yapılacak iş kalemleri
    "aiYanitTaslagi": "Ahmet bey merhaba. Fotoğraftaki göçüğü inceledim. Sağ çamurlukta orta seviye bir hasar var. Göçük düzeltme ve lokal boya ile ilk günkü haline getiririz. Tahmini X TL civarı tutacaktır, dilerseniz yarın sabah aracı bırakın." // Telefonda söylenecek profesyonel ve ikna edici teklif cümlesi.
}
`
        const result = await visionModel.generateContent([prompt, imagePart])
        const text = result.response.text()

        // Klasik JSON temizleme (Eğer markdown kod bloku veya fazladan text varsa)
        const jsonMatch = text.match(/\{[\s\S]*\}/)
        if (!jsonMatch) return null

        const parsed = JSON.parse(jsonMatch[0])
        return {
            tespit: parsed.tespit,
            teklifTutari: parsed.teklifTutari,
            cozumMaddeleri: parsed.cozumMaddeleri || [],
            aiYanitTaslagi: parsed.aiYanitTaslagi || parsed.tespit,
        }
    } catch (error) {
        console.error('Vision AI Gorsel Analiz Hatasi:', error)
        return null
    }
}
