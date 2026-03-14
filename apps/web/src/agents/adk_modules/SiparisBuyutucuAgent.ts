/**
 * SiparisBuyutucuAgent — AI-powered Upsell (Cross-Sell)
 *
 * Sepet kalemlerini analiz edip esnafın menüsünden en iyi eşleşen
 * ama sepette olmayan ürünü önerir. %15 indirim flag ile.
 */

import { adminDb } from '@/lib/firebaseAdmin'

interface SepetKalemBasit {
    ad: string
    kategori?: string
}

interface UpsellOneri {
    menuItemId: string
    ad: string
    aciklama?: string
    fiyatKurus: number
    indirimliFiyatKurus: number
    kategori: string
    neden: string // "Hamburgerinizin yanına harika gider!"
}

export async function upsellOnerisiGetir(
    esnafId: string,
    sepetKalemleri: SepetKalemBasit[]
): Promise<UpsellOneri | null> {
    if (!adminDb || sepetKalemleri.length === 0) return null

    try {
        // 1. Esnafın katalogunu çek
        const katalogSnap = await adminDb
            .collection('esnaflar')
            .doc(esnafId)
            .collection('katalog')
            .where('aktif', '==', true)
            .limit(200)
            .get()

        if (katalogSnap.empty) return null

        interface KatalogDoc {
            id: string
            ad: string
            aciklama?: string
            fiyatKurus: number
            kategori: string
            kdvTipi?: string
        }

        const katalog: KatalogDoc[] = katalogSnap.docs.map((d: FirebaseFirestore.QueryDocumentSnapshot) => ({
            id: d.id,
            ...(d.data() as Omit<KatalogDoc, 'id'>),
        }))

        // 2. Sepette olmayanları filtrele
        const sepetAdlari = new Set(sepetKalemleri.map(k => k.ad.toLowerCase()))
        const adaylar = katalog.filter(k => !sepetAdlari.has(k.ad.toLowerCase()))

        if (adaylar.length === 0) return null

        // 3. Gemini'ye sor — hızlı, akıllı öneri
        const GEMINI_KEY = process.env.GEMINI_API_KEY
        if (!GEMINI_KEY) {
            // Gemini yoksa rule-based fallback
            return ruleBasedOneri(sepetKalemleri, adaylar)
        }

        const prompt = `Bir restoran müşterisi şunları sepete ekledi: ${sepetKalemleri.map(k => k.ad).join(', ')}.

Restoranın menüsünde ayrıca şu ürünler var (SEPETTEKİLER HARİÇ):
${adaylar.slice(0, 30).map(a => `- ${a.ad} (${a.kategori}, ${(a.fiyatKurus / 100).toFixed(0)}₺)`).join('\n')}

Bu siparişle EN İYİ eşleşen TEK bir ürün öner. Müşteriyi ikna edecek kısa ve çekici bir sebep yaz.

JSON formatında döndür (SADECE JSON, başka metin yok):
{"menuItemId": "...", "ad": "...", "neden": "Hamburgerinizin yanına harika bir seçim!"}`

        const res = await fetch(
            `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${GEMINI_KEY}`,
            {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    contents: [{ parts: [{ text: prompt }] }],
                    generationConfig: {
                        temperature: 0.7,
                        maxOutputTokens: 256,
                        responseMimeType: 'application/json',
                    },
                }),
            }
        )

        if (!res.ok) return ruleBasedOneri(sepetKalemleri, adaylar)

        const result = await res.json()
        const text = result.candidates?.[0]?.content?.parts?.[0]?.text
        if (!text) return ruleBasedOneri(sepetKalemleri, adaylar)

        const aiOneri = JSON.parse(text) as { menuItemId?: string; ad?: string; neden?: string }

        // AI'ın önerdiği ürünü bul
        const bulunan = adaylar.find(a =>
            a.id === aiOneri.menuItemId || a.ad.toLowerCase() === aiOneri.ad?.toLowerCase()
        )

        if (!bulunan) return ruleBasedOneri(sepetKalemleri, adaylar)

        return {
            menuItemId: bulunan.id,
            ad: bulunan.ad,
            aciklama: bulunan.aciklama,
            fiyatKurus: bulunan.fiyatKurus,
            indirimliFiyatKurus: Math.round(bulunan.fiyatKurus * 0.85), // %15 indirim
            kategori: bulunan.kategori,
            neden: aiOneri.neden || 'Siparişinizle harika gider!',
        }
    } catch (err: unknown) {
        console.error('[UPSELL AGENT]', err instanceof Error ? err.message : err)
        return null
    }
}

// Rule-based fallback — Gemini yokken veya hata durumunda
function ruleBasedOneri(
    sepet: SepetKalemBasit[],
    adaylar: Array<{ id: string; ad: string; aciklama?: string; fiyatKurus: number; kategori: string }>
): UpsellOneri | null {
    const sepetKategorileri = new Set(sepet.map(k => k.kategori).filter(Boolean))

    // Kurallar: Ana yemek varsa → tatlı öner, içecek yoksa → içecek öner
    const tatlılar = adaylar.filter(a => a.kategori === 'tatli')
    const icecekler = adaylar.filter(a => ['icecekler', 'sicak_icecekler'].includes(a.kategori))

    let secilen = null as typeof adaylar[0] | null
    let neden = ''

    if (sepetKategorileri.has('ana_yemekler') || sepetKategorileri.has('kebap') || sepetKategorileri.has('izgara')) {
        if (tatlılar.length > 0) {
            secilen = tatlılar[Math.floor(Math.random() * tatlılar.length)]
            neden = 'Ana yemeğinizin ardından tatlı keyfi! 🍰'
        } else if (icecekler.length > 0) {
            secilen = icecekler[Math.floor(Math.random() * icecekler.length)]
            neden = 'Yemeğinizin yanına ferahlatıcı bir içecek! 🥤'
        }
    }

    if (!secilen && icecekler.length > 0 && !sepetKategorileri.has('icecekler')) {
        secilen = icecekler[Math.floor(Math.random() * icecekler.length)]
        neden = 'Siparişinize bir içecek eklemeyi unutmayın! 🥤'
    }

    if (!secilen && adaylar.length > 0) {
        secilen = adaylar[Math.floor(Math.random() * Math.min(5, adaylar.length))]
        neden = 'Müdavim favorisi! En çok tercih edilen ürünlerimizden ✨'
    }

    if (!secilen) return null

    return {
        menuItemId: secilen.id,
        ad: secilen.ad,
        aciklama: secilen.aciklama,
        fiyatKurus: secilen.fiyatKurus,
        indirimliFiyatKurus: Math.round(secilen.fiyatKurus * 0.85),
        kategori: secilen.kategori,
        neden,
    }
}

// A2A RPC
export async function handleRpc(method: string, params: Record<string, unknown>): Promise<Record<string, unknown>> {
    if (method === 'upsell_onerisi') {
        const oneri = await upsellOnerisiGetir(
            params.esnafId as string,
            params.sepetKalemleri as SepetKalemBasit[]
        )
        return { oneri }
    }
    return { error: 'Bilinmeyen metod' }
}
