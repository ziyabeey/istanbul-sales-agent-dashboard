/**
 * ReklamAsistaniAgent — Otonom CMO Ajanı
 * ─────────────────────────────────────────────────────────────────────────────
 * Esnaf kampanya başlattığında:
 *   1. sektorKatalogu'ndaki sektör know-how'ını okur
 *   2. Gemini 3.1 Pro üzerinden 3 vurucu reklam metni üretir
 *   3. Hedef kitle (konum, yarıçap, demografi) JSON'ı üretir
 *   4. Sonucu otonomCmoClient'a iletir (Meta Graph + Google Ads)
 * ─────────────────────────────────────────────────────────────────────────────
 */

import { LlmAgent } from '@google/adk'
import { sektorProfiliBul } from '@/data/sektorKatalogu'
import { adminDb, Timestamp } from '@/lib/firebaseAdmin'

// ── Ajan Tanımı (ADK) ──────────────────────────────────────────────────────

export const reklamAsistaniAgent = new LlmAgent({
    name: 'reklam_asistani',
    model: 'gemini-2.5-pro',
    instruction: `
Sen kepenk.ai'nin Otonom Reklam CMO'susun. 

GÖREV: Esnafın sektörüne, konumuna ve bütçesine göre:
1. Meta (Instagram/Facebook) için 3 farklı vurucu reklam metni (headline + description + CTA)
2. Google Ads için 3 farklı reklam metni (headline 30 karakter, description 90 karakter)
3. Hedef kitle parametreleri (konum, yarıçap, yaş, ilgi alanları)

KURALLAR:
- Türkçe yaz, samimi ama profesyonel ton
- Emoji kullan (max 2 per metin)
- Fiyat veya indirim yüzdesi YAZMA (yasal sorumluluk)
- CTA her zaman aksiyon odaklı: "Hemen Randevu Al", "WhatsApp'tan Sor" vb.
- Yerel hissiyat ver: mahalle/semt adı kullan
- Google headline max 30 karakter, description max 90 karakter

ÇIKTI FORMATI (SADECE JSON):
{
  "meta_reklamlar": [
    { "headline": "...", "description": "...", "cta": "Hemen Randevu Al" }
  ],
  "google_reklamlar": [
    { "headline1": "...", "headline2": "...", "description": "..." }
  ],
  "hedef_kitle": {
    "konum": "İstanbul, Kadıköy",
    "yaricap_km": 5,
    "yas_min": 25,
    "yas_max": 55,
    "cinsiyet": "hepsi",
    "ilgi_alanlari": ["güzellik", "kişisel bakım"]
  }
}
`,
})

// ── Kampanya Üretim Fonksiyonu ──────────────────────────────────────────────

export interface KampanyaUretimSonucu {
    basarili: boolean
    metaReklamlar?: { headline: string; description: string; cta: string }[]
    googleReklamlar?: { headline1: string; headline2: string; description: string }[]
    hedefKitle?: {
        konum: string
        yaricap_km: number
        yas_min: number
        yas_max: number
        cinsiyet: string
        ilgi_alanlari: string[]
    }
    hata?: string
}

export async function kampanyaIcerigiUret(
    esnafId: string,
    aylikButce: number
): Promise<KampanyaUretimSonucu> {
    try {
        // 1. Esnaf bilgilerini al
        const esnafDoc = await adminDb.collection('esnaflar').doc(esnafId).get()
        if (!esnafDoc.exists) {
            return { basarili: false, hata: 'Esnaf bulunamadı' }
        }

        const esnaf = esnafDoc.data()!
        const sektorSlug = esnaf.sektor || esnaf.sektorSlug || ''
        const sektorProfili = sektorProfiliBul(sektorSlug)

        // 2. Sektörel know-how contextini hazırla
        const knowHow = sektorProfili?.ozelIcerik || ''
        const sektorAdi = sektorProfili?.sektorAdi || esnaf.sektor || 'Genel İşletme'
        const konum = esnaf.adres || esnaf.ilce || 'İstanbul'
        const isletmeAdi = esnaf.ad || esnaf.isletmeAdi || 'İşletme'

        // 3. Gemini'ye gönderilecek prompt
        const prompt = `
ESNAF BİLGİLERİ:
- İşletme: ${isletmeAdi}
- Sektör: ${sektorAdi}
- Konum: ${konum}
- Aylık Reklam Bütçesi: ₺${aylikButce.toLocaleString('tr-TR')}
- Günlük Limit: ₺${Math.round(aylikButce / 30)}

SEKTÖR KNOW-HOW:
${knowHow}

MEVCUT SLOGAN: ${esnaf.slogan || sektorProfili?.slogan || ''}

Lütfen yukarıdaki bilgilere göre 3'er adet Meta ve Google reklam metni + hedef kitle parametreleri üret.
`

        // 4. Gemini API çağrısı
        const geminiApiKey = process.env.GEMINI_API_KEY
        if (!geminiApiKey) {
            return { basarili: false, hata: 'GEMINI_API_KEY tanımlı değil' }
        }

        const response = await fetch(
            `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-pro:generateContent?key=${geminiApiKey}`,
            {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    contents: [{ parts: [{ text: prompt }] }],
                    generationConfig: {
                        temperature: 0.8,
                        responseMimeType: 'application/json',
                    },
                }),
            }
        )

        if (!response.ok) {
            return { basarili: false, hata: `Gemini API hatası: ${response.status}` }
        }

        const geminiData = await response.json()
        const rawText = geminiData.candidates?.[0]?.content?.parts?.[0]?.text || ''

        // 5. JSON parse
        let parsed: any
        try {
            const cleaned = rawText.replace(/```json\n?/g, '').replace(/```\n?/g, '').trim()
            parsed = JSON.parse(cleaned)
        } catch {
            return { basarili: false, hata: 'AI çıktısı parse edilemedi' }
        }

        // 6. Firestore'a kaydet
        await adminDb.collection('esnaflar').doc(esnafId)
            .collection('reklam_kampanyalari').add({
                metaReklamlar: parsed.meta_reklamlar || [],
                googleReklamlar: parsed.google_reklamlar || [],
                hedefKitle: parsed.hedef_kitle || {},
                aylikButce,
                gunlukButce: Math.round(aylikButce / 30),
                durum: 'taslak',
                olusturma: Timestamp.now(),
            })

        return {
            basarili: true,
            metaReklamlar: parsed.meta_reklamlar,
            googleReklamlar: parsed.google_reklamlar,
            hedefKitle: parsed.hedef_kitle,
        }
    } catch (err: any) {
        console.error('[REKLAM_AJANI] Hata:', err.message)
        return { basarili: false, hata: err.message }
    }
}
