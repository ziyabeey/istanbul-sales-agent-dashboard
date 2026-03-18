import { NextRequest, NextResponse } from 'next/server'

export async function POST(req: NextRequest) {
    try {
        const { esnafId, sectionId, prompt } = await req.json()

        if (!esnafId || !sectionId || !prompt) {
            return NextResponse.json({ error: 'esnafId, sectionId ve prompt gerekli' }, { status: 400 })
        }

        // Esnaf verisini çek
        const { adminDb } = await import('@/lib/firebaseAdmin')
        const doc = await adminDb.collection('esnaflar').doc(esnafId).get()
        if (!doc.exists) {
            return NextResponse.json({ error: 'Esnaf bulunamadı' }, { status: 404 })
        }

        const esnaf = doc.data()!

        // Gemini ile section HTML üret
        const { GoogleGenerativeAI } = await import('@google/generative-ai')
        const genAI = new GoogleGenerativeAI(process.env.GOOGLE_API_KEY || '')
        const model = genAI.getGenerativeModel({ model: 'gemini-2.0-flash' })

        const systemPrompt = `Sen bir web tasarımcısın. Esnaf web sitesinin "${sectionId}" bölümü için HTML + inline CSS üreteceksin.
İşletme: ${esnaf.isletmeAdi || esnaf.ad}
Sektör: ${esnaf.sektor || 'genel'}
Şehir: ${esnaf.sehir || 'İstanbul'}

KURALLAR:
- Sade, modern, mobil uyumlu HTML üret
- Inline CSS kullan (style attribute)
- Türkçe, gerçekçi içerik yaz (Lorem ipsum YASAK)
- Renk paleti: mevcut site ile uyumlu
- Sadece bölüm HTML'ini döndür, tam sayfa değil
- Erişilebilir (WCAG AA kontrast)`

        const result = await model.generateContent([systemPrompt, `İstek: ${prompt}`])
        const html = result.response.text()

        // Esnaf dokümanına kaydet
        await adminDb.collection('esnaflar').doc(esnafId).update({
            [`siteSection_${sectionId}`]: html,
            [`siteSection_${sectionId}_updatedAt`]: new Date().toISOString(),
        })

        return NextResponse.json({
            basarili: true,
            sectionId,
            htmlUzunluk: html.length,
        })
    } catch (e: any) {
        // console.error('[AI-EDIT] Hata:', e.message)
        return NextResponse.json({ error: e.message }, { status: 500 })
    }
}
