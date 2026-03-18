import { NextRequest, NextResponse } from 'next/server'

export const runtime = 'nodejs'

/**
 * POST /api/media/ai-alt
 * Generates Turkish alt text for an image using Gemini vision.
 * Body: { imageUrl: string } (base64 data URL or https URL)
 */
export async function POST(req: NextRequest) {
    try {
        const { imageUrl } = await req.json()

        if (!imageUrl) {
            return NextResponse.json({ error: 'imageUrl gerekli' }, { status: 400 })
        }

        const apiKey = process.env.GOOGLE_API_KEY
        if (!apiKey) {
            return NextResponse.json({ error: 'AI servisi yapılandırılmamış' }, { status: 503 })
        }

        const { GoogleGenerativeAI } = await import('@google/generative-ai')
        const genAI = new GoogleGenerativeAI(apiKey)
        const model = genAI.getGenerativeModel({ model: 'gemini-2.0-flash' })

        // Build image part
        let imagePart: { inlineData: { data: string; mimeType: string } }

        if (imageUrl.startsWith('data:')) {
            // base64 data URL
            const match = imageUrl.match(/^data:(image\/\w+);base64,(.+)$/)
            if (!match) {
                return NextResponse.json({ error: 'Geçersiz base64 formatı' }, { status: 400 })
            }
            imagePart = { inlineData: { data: match[2], mimeType: match[1] } }
        } else {
            // Fetch external URL and convert
            const res = await fetch(imageUrl)
            if (!res.ok) {
                return NextResponse.json({ error: 'Görsel indirilemedi' }, { status: 400 })
            }
            const buffer = Buffer.from(await res.arrayBuffer())
            const mimeType = res.headers.get('content-type') || 'image/jpeg'
            imagePart = { inlineData: { data: buffer.toString('base64'), mimeType } }
        }

        const result = await model.generateContent([
            'Bu görseli Türkçe olarak 10-15 kelimeyle açıkla. Web sitesi alt text olarak kullanılacak. Sadece açıklamayı yaz, başka bir şey ekleme.',
            imagePart,
        ])

        const alt = result.response.text().trim()

        return NextResponse.json({ alt })
    } catch (error) {
        console.error('[API/media/ai-alt] Error:', error)
        return NextResponse.json({ error: 'Alt metin üretilemedi' }, { status: 500 })
    }
}
