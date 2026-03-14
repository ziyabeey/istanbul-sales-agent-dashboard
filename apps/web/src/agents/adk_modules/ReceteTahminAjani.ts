/**
 * ReceteTahminAjani.ts — Bilinmeyen Yemekleri AI ile Gramajlayan Ajan
 *
 * Master kütüphanede yoksa → Gemini API → Zod validation → Firestore'a taslak kayıt
 */

import { adminDb, Timestamp } from '@/lib/firebaseAdmin'
import {
    recipeBOMSchema,
    bomKalemSema,
    masterReceteBul,
    type RecipeBOM,
    type BOMKalem,
} from '@/data/sektorel_knowhow/master_receteler'
import { z } from 'zod'

// ─── Gemini Response Schema (Halüsinasyon koruması) ────────────────────

const aiReceteYanitiSema = z.object({
    urunAdi: z.string(),
    malzemeler: z.array(z.object({
        malzemeAdi: z.string().min(1),
        miktar: z.number().positive(),
        birim: z.enum(['gr', 'ml', 'adet', 'kg', 'lt', 'porsiyon']),
        tip: z.enum(['hammadde', 'yari_mamul', 'ambalaj', 'sarf']),
        fire_orani: z.number().min(0).max(100),
    })).min(1),
})

// ─── Ana Fonksiyon ─────────────────────────────────────────────────────

export async function receteTahminEt(
    esnafId: string,
    urunAdi: string,
    kategori?: string
): Promise<{ kaynak: 'master' | 'ai' | 'hata'; recete: RecipeBOM | null }> {

    // 1. Önce master kütüphanede ara
    const master = masterReceteBul(urunAdi)
    if (master) {
        return { kaynak: 'master', recete: master }
    }

    // 2. Gemini ile tahmin et
    const GEMINI_KEY = process.env.GEMINI_API_KEY
    if (!GEMINI_KEY) {
        return { kaynak: 'hata', recete: null }
    }

    try {
        const prompt = `Sen endüstriyel bir gıda mühendisisin. Türkiye'deki bir restoran operasyonu için "1 porsiyon ${urunAdi}" ürününün BOM (Bill of Materials / Reçete) çıkartılması gerekiyor.

Lütfen endüstri standartlarında şu bilgileri ver:
1. Tüm malzemeler (hammadde, yarı mamül, ambalaj dahil)
2. Her malzemenin gramaj/miktarı
3. Fire oranı (pişme, doğrama, buharlaşma kayıpları %)
4. Ambalaj kalemleri (bardak, kutu, poşet, peçete vb.)

JSON formatında döndür:
{
  "urunAdi": "${urunAdi}",
  "malzemeler": [
    {"malzemeAdi": "...", "miktar": 150, "birim": "gr", "tip": "hammadde", "fire_orani": 20},
    {"malzemeAdi": "...", "miktar": 1, "birim": "adet", "tip": "ambalaj", "fire_orani": 0}
  ]
}

Birim seçenekleri: gr, ml, adet, kg, lt, porsiyon
Tip seçenekleri: hammadde, yari_mamul, ambalaj, sarf
SADECE JSON döndür, başka metin yok.`

        const res = await fetch(
            `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${GEMINI_KEY}`,
            {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    contents: [{ parts: [{ text: prompt }] }],
                    generationConfig: {
                        temperature: 0.3,
                        maxOutputTokens: 1024,
                        responseMimeType: 'application/json',
                    },
                }),
            }
        )

        if (!res.ok) {
            console.error('[RECETE TAHMIN] Gemini yanıt vermedi:', res.status)
            return { kaynak: 'hata', recete: null }
        }

        const result = await res.json()
        const text = result.candidates?.[0]?.content?.parts?.[0]?.text
        if (!text) return { kaynak: 'hata', recete: null }

        // 3. Zod ile halüsinasyon koruması
        const parsed = aiReceteYanitiSema.safeParse(JSON.parse(text))
        if (!parsed.success) {
            console.error('[RECETE TAHMIN] Zod validation başarısız:', parsed.error.issues)
            return { kaynak: 'hata', recete: null }
        }

        // 4. RecipeBOM formatına çevir
        const receteId = `ai_${urunAdi.toLowerCase().replace(/[^a-z0-9]/g, '_').slice(0, 50)}_${Date.now()}`

        const recete: RecipeBOM = {
            id: receteId,
            urunAdi: parsed.data.urunAdi || urunAdi,
            kategori: kategori || 'diger',
            sektor: 'ai_tahmin',
            porsiyon: 1,
            malzemeler: parsed.data.malzemeler as BOMKalem[],
        }

        // 5. Firestore'a "taslak" olarak kaydet
        await adminDb
            .collection('esnaflar')
            .doc(esnafId)
            .collection('receteler')
            .doc(receteId)
            .set({
                ...recete,
                durum: 'taslak',           // Esnaf onayı gerekli
                kaynak: 'ai_tahmin',
                onaylandiMi: false,
                olusturma: Timestamp.now(),
            })

        return { kaynak: 'ai', recete }
    } catch (err: unknown) {
        console.error('[RECETE TAHMIN HATA]', err instanceof Error ? err.message : err)
        return { kaynak: 'hata', recete: null }
    }
}

// ─── Toplu Tahmin (Menu Yüklemede) ─────────────────────────────────────

export async function topluReceteTahmin(
    esnafId: string,
    urunler: Array<{ ad: string; kategori?: string }>
): Promise<{ basarili: number; master: number; ai: number; hata: number }> {
    let basarili = 0, masterSay = 0, aiSay = 0, hataSay = 0

    for (const urun of urunler) {
        const sonuc = await receteTahminEt(esnafId, urun.ad, urun.kategori)

        if (sonuc.kaynak === 'master') { basarili++; masterSay++ }
        else if (sonuc.kaynak === 'ai') { basarili++; aiSay++ }
        else { hataSay++ }

        // Rate limit koruması — 500ms arası
        await new Promise(resolve => setTimeout(resolve, 500))
    }

    return { basarili, master: masterSay, ai: aiSay, hata: hataSay }
}

// ─── A2A RPC ───────────────────────────────────────────────────────────

export async function handleRpc(
    method: string,
    params: Record<string, unknown>
): Promise<Record<string, unknown>> {
    switch (method) {
        case 'recete_tahmin': {
            const sonuc = await receteTahminEt(
                params.esnafId as string,
                params.urunAdi as string,
                params.kategori as string | undefined
            )
            return { ...sonuc }
        }
        case 'toplu_tahmin': {
            const sonuc = await topluReceteTahmin(
                params.esnafId as string,
                params.urunler as Array<{ ad: string; kategori?: string }>
            )
            return { ...sonuc }
        }
        default:
            return { error: `Bilinmeyen metod: ${method}` }
    }
}
