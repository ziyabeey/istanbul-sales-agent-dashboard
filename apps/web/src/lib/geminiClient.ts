import {
    GoogleGenerativeAI,
    HarmCategory,
    HarmBlockThreshold,
} from '@google/generative-ai'

if (!process.env.GEMINI_API_KEY) {
    // Let it pass but console error to avoid breaking builds locally
    console.warn('GEMINI_API_KEY eksik, üretim ortamında hata verecektir.')
}

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY || 'mock_key')

// ── Model tipleri ──────────────────────────────────────────────────────────
export type GeminiModel =
    | 'gemini-3.1-pro-preview'        // Site üretimi, karmaşık içerik
    | 'gemini-3-flash-preview'        // Lead analizi, hızlı görevler (ucuz)
    | 'gemini-3.1-flash-lite-preview' // Yüksek hacimli, çok ucuz
    | 'gemini-2.5-pro'                // Geriye dönük uyumluluk
    | 'gemini-2.5-flash'              // Geriye dönük uyumluluk

// ── Düşünme seviyesi ──────────────────────────────────────────────────────
type ThinkingLevel = 'low' | 'medium' | 'high'

export async function geminiCalistir(
    model: GeminiModel,
    sistemPrompt: string,
    userMesaj: string,
    options?: {
        thinkingLevel?: ThinkingLevel
        maxOutputTokens?: number
        responseSchema?: any
    }
): Promise<string> {
    const { thinkingLevel = 'medium', maxOutputTokens = 8192 } = options ?? {}

    // Gemini 3.x modellerinde thinking budget sadece model 'gemini-3' ile başlıyorsa var
    const isGemini3 = model.startsWith('gemini-3')

    // Low: 1024, Medium: 4096, High: 8192
    const thinkingBudget = thinkingLevel === 'low' ? 1024 : thinkingLevel === 'medium' ? 4096 : 8192

    const generationConfig: any = {
        maxOutputTokens,
        ...(isGemini3 ? {
            thinkingConfig: { thinkingBudget }
        } : {}),
    }

    if (options?.responseSchema) {
        generationConfig.responseMimeType = 'application/json'
        generationConfig.responseSchema = options.responseSchema
    }

    const modelInstance = genAI.getGenerativeModel({
        model,
        systemInstruction: sistemPrompt,
        generationConfig,
        safetySettings: [
            {
                category: HarmCategory.HARM_CATEGORY_HARASSMENT,
                threshold: HarmBlockThreshold.BLOCK_NONE,
            },
            {
                category: HarmCategory.HARM_CATEGORY_HATE_SPEECH,
                threshold: HarmBlockThreshold.BLOCK_NONE,
            },
        ],
    })

    const result = await modelInstance.generateContent([
        { text: userMesaj }
    ])

    return result.response.text()
}
