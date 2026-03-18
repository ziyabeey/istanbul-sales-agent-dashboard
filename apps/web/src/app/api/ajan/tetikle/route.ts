import { NextResponse } from 'next/server'
import { adminDb, Timestamp } from '@/lib/firebaseAdmin'

/**
 * POST /api/ajan/tetikle
 * Body: { ajan: 'the_creator', esnafId: string, action: 'ilk_icerik_uret' }
 *
 * The Creator ajanı: 7 gün × 2 platform = 14 içerik üretir.
 * Gemini AI ile içerik üretimi yapar ve Firestore'a kaydeder.
 */
export async function POST(request: Request) {
    try {
        const { ajan, esnafId, action } = await request.json()

        if (!adminDb) {
            return NextResponse.json({ error: 'Veritabanı bağlantısı yok' }, { status: 500 })
        }

        if (ajan === 'the_creator' && action === 'ilk_icerik_uret') {
            const esnafDoc = await adminDb.collection('esnaflar').doc(esnafId).get()
            if (!esnafDoc.exists) {
                return NextResponse.json({ error: 'Esnaf bulunamadı' }, { status: 404 })
            }
            const esnaf = esnafDoc.data()!

            const GUNLER = ['Pazartesi', 'Salı', 'Çarşamba', 'Perşembe', 'Cuma', 'Cumartesi', 'Pazar']
            const PLATFORMLAR = ['instagram', 'facebook']

            let uretilen = 0
            const isletmeAdi = esnaf.isletmeAdiTam || esnaf.ad
            const sektor = esnaf.sektor
            const ilce = esnaf.ilce || esnaf.sehir || 'İstanbul'

            for (const platform of PLATFORMLAR) {
                for (const gun of GUNLER) {
                    try {
                        // Gemini ile içerik üret
                        const prompt = buildPrompt(platform, gun, sektor, isletmeAdi, ilce)
                        const icerik = await generateWithGemini(prompt)

                        // Firestore'a yaz
                        await adminDb.collection('icerikler').add({
                            esnafId,
                            platform,
                            gun,
                            hafta: getHaftaKodu(),
                            metin: icerik.metin || '',
                            hashtagler: icerik.hashtagler || [],
                            durum: 'hazir',
                            olusturmaTarihi: Timestamp.now(),
                        })

                        uretilen++
                        // Rate limit — saniyede 3 istek
                        await new Promise(r => setTimeout(r, 350))
                    } catch (e) {
                        // console.error(`[İÇERİK HATA] ${platform} ${gun}:`, e)
                    }
                }
            }

            return NextResponse.json({ ok: true, mesaj: `${uretilen} içerik üretildi` })
        }

        return NextResponse.json({ error: 'Bilinmeyen ajan/aksiyon' }, { status: 400 })
    } catch (error: any) {
        // console.error('[AJAN TETİKLE HATA]', error)
        return NextResponse.json({ error: error.message }, { status: 500 })
    }
}

function buildPrompt(platform: string, gun: string, sektor: string, isletmeAdi: string, ilce: string): string {
    const maxKarakter = platform === 'instagram' ? 150 : 300
    const hashtagSayi = platform === 'instagram' ? 5 : 3

    return `Sen kepenk.ai'nin içerik üretim ajansısın.
Türk esnafı için sosyal medya içeriği yazıyorsun.

Bilgiler:
- Platform: ${platform}
- Gün: ${gun}
- Sektör: ${sektor}
- İşletme: ${isletmeAdi}
- İlçe: ${ilce}

KURALLAR:
- Metin doğal Türkçe, samimi, robot gibi değil
- Max ${maxKarakter} karakter metin + ${hashtagSayi} hashtag
- Sektöre özgü terimler kullan
- Fiyat, garanti, "en iyi" gibi söz VERME
- Emoji: max 2 adet
- Her gün farklı açıdan (${gun}: ${getGunTemasi(gun)})
- Lokasyon (${ilce}) mutlaka geçsin

Sadece JSON cevap ver, başka hiçbir şey yazma:
{"metin": "...", "hashtagler": ["#tag1", "#tag2"]}`
}

function getGunTemasi(gun: string): string {
    const temalar: Record<string, string> = {
        'Pazartesi': 'tanıtım/motivasyon',
        'Salı': 'ipucu/bilgi',
        'Çarşamba': 'müşteri hikayesi',
        'Perşembe': 'sahne arkası',
        'Cuma': 'haftasonu hazırlığı',
        'Cumartesi': 'kampanya/fırsat',
        'Pazar': 'ilham/teşekkür',
    }
    return temalar[gun] || 'genel'
}

async function generateWithGemini(prompt: string): Promise<{ metin: string; hashtagler: string[] }> {
    const apiKey = process.env.GEMINI_API_KEY || process.env.API_KEY
    if (!apiKey) {
        // Fallback içerik
        return {
            metin: 'İçerik yakında burada olacak! kepenk.ai ile dijital dünyanıza adım atın.',
            hashtagler: ['#kepenkai', '#dijitalesnaf', '#istanbul'],
        }
    }

    try {
        const res = await fetch(
            `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${apiKey}`,
            {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    contents: [{ parts: [{ text: prompt }] }],
                    generationConfig: {
                        temperature: 0.9,
                        maxOutputTokens: 300,
                        responseMimeType: 'application/json',
                    },
                }),
            }
        )

        if (!res.ok) {
            // console.error('[GEMINI HATA]', res.status, await res.text())
            return { metin: 'İçerik hazırlanıyor...', hashtagler: ['#kepenkai'] }
        }

        const data = await res.json()
        const text = data.candidates?.[0]?.content?.parts?.[0]?.text || ''
        const parsed = JSON.parse(text)
        return {
            metin: parsed.metin || '',
            hashtagler: parsed.hashtagler || [],
        }
    } catch (e) {
        // console.error('[GEMINI PARSE HATA]', e)
        return { metin: 'İçerik hazırlanıyor...', hashtagler: ['#kepenkai'] }
    }
}

function getHaftaKodu(): string {
    const now = new Date()
    const start = new Date(now.getFullYear(), 0, 1)
    const week = Math.ceil(
        ((now.getTime() - start.getTime()) / 86400000 + start.getDay() + 1) / 7
    )
    return `${now.getFullYear()}-W${String(week).padStart(2, '0')}`
}
