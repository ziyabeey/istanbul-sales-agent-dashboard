/**
 * POST /api/restoran/menu-sihirbazi
 *
 * Esnaf kağıt menü fotoğrafını yükler → Vision AI OCR → GPT structured JSON
 * → Zod validate → Firestore batch write
 */

import { NextResponse } from 'next/server'
import { adminDb, Timestamp } from '@/lib/firebaseAdmin'
import { apiGuard } from '@/lib/apiGuard'
import { rateLimitCheck } from '@/lib/rateLimiter'
import { menuItemSema, type MenuItem } from '@/lib/restoran/tipler'
import { z } from 'zod'

const istekSema = z.object({
    esnafId: z.string().min(10).max(50),
    gorselBase64: z.string().min(100).max(10_000_000), // max ~7.5MB base64
    dil: z.enum(['tr', 'en']).default('tr'),
})

// ── Vision AI + LLM ile Menü Parse ─────────────────────────────────────

async function menuGorseliniParseEt(base64: string): Promise<MenuItem[]> {
    const GEMINI_KEY = process.env.GEMINI_API_KEY
    if (!GEMINI_KEY) throw new Error('GEMINI_API_KEY tanımlı değil')

    // Base64'ten mimetype çıkar
    const mimeMatch = base64.match(/^data:(image\/\w+);base64,/)
    const mimeType = mimeMatch ? mimeMatch[1] : 'image/jpeg'
    const cleanBase64 = base64.replace(/^data:image\/\w+;base64,/, '')

    const response = await fetch(
        `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${GEMINI_KEY}`,
        {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                contents: [{
                    parts: [
                        {
                            inlineData: {
                                mimeType,
                                data: cleanBase64,
                            },
                        },
                        {
                            text: `Bu bir Türk restoran/kafe menüsünün fotoğrafı. Lütfen menüdeki TÜM yemek ve içecekleri oku ve aşağıdaki JSON formatında döndür.

KURALLAR:
1. Fiyatları KURUŞ cinsinden yaz (Örn: 150₺ = 15000)
2. Her kalemi doğru kategoriye koy: baslangiclar, ana_yemekler, izgara, kebap, pizza, makarna, salata, corba, tatli, icecekler, sicak_icecekler, alkol, kahvalti, sandvic, yan_urunler, diger
3. KDV tipini belirle: gida (çoğu yemek), icecek (meşrubat/kahve/çay), alkol (bira/şarap/rakı)
4. Eğer fotoğrafta fiyat yoksa, Türkiye restoran ortalamasına göre makul tahmin yap
5. Eğer "V" veya yaprak simgesi varsa vegan: true yap

JSON formatı (SADECE JSON array döndür, başka metin yazma):
[
  {
    "ad": "Mercimek Çorbası",
    "aciklama": "Ev yapımı mercimek çorbası, limon ile servis",
    "fiyatKurus": 8500,
    "kategori": "corba",
    "kdvTipi": "gida",
    "aktif": true,
    "spikeFlags": { "vegan": true, "glutensiz": false, "acili": false }
  }
]`,
                        },
                    ],
                }],
                generationConfig: {
                    temperature: 0.1,
                    maxOutputTokens: 8192,
                    responseMimeType: 'application/json',
                },
            }),
        }
    )

    if (!response.ok) {
        const errText = await response.text()
        throw new Error(`Gemini API hatası: ${response.status} - ${errText.slice(0, 200)}`)
    }

    const result = await response.json()
    const text = result.candidates?.[0]?.content?.parts?.[0]?.text

    if (!text) throw new Error('Gemini boş yanıt döndü')

    // JSON parse
    let parsed: unknown
    try {
        parsed = JSON.parse(text)
    } catch {
        // Bazen markdown code fence içinde gelir
        const jsonMatch = text.match(/```json?\s*\n?([\s\S]*?)\n?```/)
        if (jsonMatch) {
            parsed = JSON.parse(jsonMatch[1])
        } else {
            throw new Error('Gemini yanıtı JSON değil')
        }
    }

    if (!Array.isArray(parsed)) {
        throw new Error('Gemini yanıtı array değil')
    }

    // Her kalemi Zod ile validate et — bozuk olanları atla
    const validItems: MenuItem[] = []
    for (const item of parsed) {
        const result = menuItemSema.safeParse(item)
        if (result.success) {
            validItems.push(result.data)
        }
    }

    return validItems
}

// ── API Handler ────────────────────────────────────────────────────────

export async function POST(request: Request) {
    // Auth
    const guard = await apiGuard(request, { requireAdminToken: true })
    if (!guard.ok) return guard.response

    // Rate limit (heavy operation)
    const ip = request.headers.get('x-forwarded-for')?.split(',')[0]?.trim() || 'unknown'
    const rl = rateLimitCheck(`menu-sihirbazi:${ip}`, 'webhook')
    if (!rl.allowed) {
        return NextResponse.json({ error: 'Too Many Requests' }, { status: 429 })
    }

    try {
        const body = await request.json()
        const parsed = istekSema.safeParse(body)
        if (!parsed.success) {
            return NextResponse.json(
                { error: 'Geçersiz istek', detaylar: parsed.error.issues },
                { status: 400 }
            )
        }

        const { esnafId, gorselBase64 } = parsed.data

        // 1. Vision AI ile parse et
        const menuItems = await menuGorseliniParseEt(gorselBase64)

        if (menuItems.length === 0) {
            return NextResponse.json(
                { error: 'Menüden hiçbir kalem okunamadı. Lütfen daha net bir fotoğraf yükleyin.' },
                { status: 422 }
            )
        }

        // 2. Firestore batch write (max 500 per batch)
        const katalogRef = adminDb.collection('esnaflar').doc(esnafId).collection('katalog')
        const BATCH_SIZE = 450 // Firestore limit 500, margin bırakıyoruz

        let yazilan = 0
        for (let i = 0; i < menuItems.length; i += BATCH_SIZE) {
            const chunk = menuItems.slice(i, i + BATCH_SIZE)
            const batch = adminDb.batch()

            for (const item of chunk) {
                const ref = katalogRef.doc()
                batch.set(ref, {
                    ...item,
                    olusturma: Timestamp.now(),
                    kaynak: 'vision_ai',
                })
            }

            await batch.commit()
            yazilan += chunk.length
        }

        return NextResponse.json({
            ok: true,
            okunanKalemSayisi: menuItems.length,
            yazilanKalemSayisi: yazilan,
            kategoriler: [...new Set(menuItems.map(i => i.kategori))],
            onizleme: menuItems.slice(0, 5), // İlk 5 kalemi önizleme olarak dön
        })
    } catch (error: unknown) {
        const message = error instanceof Error ? error.message : 'Bilinmeyen hata'
        console.error('[MENU SİHİRBAZI HATA]', message)
        return NextResponse.json({ error: message }, { status: 500 })
    }
}
