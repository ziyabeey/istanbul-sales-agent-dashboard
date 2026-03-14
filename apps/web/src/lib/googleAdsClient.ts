import { adminDb, Timestamp } from '@/lib/firebaseAdmin'
import Anthropic from '@anthropic-ai/sdk'

const claude = new Anthropic({ apiKey: process.env.ANTHROPIC_API_KEY })

const GOOGLE_ADS_DEVELOPER_TOKEN = process.env.GOOGLE_ADS_DEVELOPER_TOKEN!
const GOOGLE_ADS_CLIENT_ID = process.env.GOOGLE_ADS_CLIENT_ID!
const GOOGLE_ADS_CLIENT_SECRET = process.env.GOOGLE_ADS_CLIENT_SECRET!
const GOOGLE_ADS_REFRESH_TOKEN = process.env.GOOGLE_ADS_REFRESH_TOKEN!
const GOOGLE_ADS_MCC_ID = process.env.GOOGLE_ADS_MCC_ID! // kepenk.ai ana hesabı

interface GoogleAdsResponse {
    kampanyaId: string
    reklamId: string
}

export async function googleKampanyaOlustur(params: {
    esnafId: string
    butce: number    // Günlük TL bütçe
    gun: number      // Kaç gün sürecek
}): Promise<GoogleAdsResponse> {
    const esnafDoc = await adminDb.collection('esnaflar').doc(params.esnafId).get()
    const esnaf = { id: esnafDoc.id, ...esnafDoc.data() } as any

    // Not: Gerçek Google Ads API entegrasyonunda gRPC veya REST kullanılır.
    // Burada REST tabanlı bir skeleton bırakıldı. (OAuth2 Token alınıp Headers'a konur)

    // 1. Hedef kitle / Keyword'leri üret
    const keywords = await googleKeywordUret(esnaf)

    // 2. Local Campaign veya Search Campaign oluştur (MOCK IMPLEMENTATION FOR MVP)
    const kampanyaId = `g_camp_${esnaf.id}_${Date.now()}`
    const reklamId = `g_ad_${esnaf.id}_${Date.now()}`

    // 3. Reklam Metinlerini (RSA - Responsive Search Ads) üret
    const rsaMetinler = await googleResponsiveAdMetinleriUret(esnaf)

    // Firestore'a Active Google Ad olarak kaydet
    await adminDb.collection('reklamlar').add({
        esnafId: params.esnafId,
        platform: 'google',
        kampanyaId,
        reklamId,
        butce: params.butce,
        gun: params.gun,
        baslangic: Timestamp.now(),
        bitis: Timestamp.fromDate(new Date(Date.now() + params.gun * 24 * 60 * 60 * 1000)),
        durum: 'aktif',
        keywords,
        rsaMetinler,
        performans: {
            gosterim: 0, erisim: 0, tiklama: 0, harcama: 0, mesajBaslat: 0
        }
    })

    return { kampanyaId, reklamId }
}

// ── Google Ads Keyword Üretimi ───────────────────────────────────────────
async function googleKeywordUret(esnaf: any): Promise<string[]> {
    const yanit = await claude.messages.create({
        model: 'claude-3-5-haiku-20241022',
        max_tokens: 200,
        messages: [{
            role: 'user',
            content: `
${esnaf.sektor} sektörü için, ${esnaf.ilce}/${esnaf.sehir} lokasyonunda arama yapan kişilerin kullanabileceği en acil, en çok dönüşüm getiren 10 Google Search "Long-tail Keyword" üret.
Sadece virgülle ayrılmış anahtar kelimeleri ver.
Örnek: "kadikoy acil tesisatci, acil su kacagi bulma" vb.
`,
        }],
    })

    const metin = yanit.content[0].type === 'text' ? yanit.content[0].text : ''
    return metin.split(',').map(k => k.trim()).filter(Boolean)
}

// ── Google Responsive Search Ad (RSA) Metinleri Üretimi ────────────────
async function googleResponsiveAdMetinleriUret(esnaf: any): Promise<{ basliklar: string[]; aciklamalar: string[] }> {
    const yanit = await claude.messages.create({
        model: 'claude-3-5-haiku-20241022',
        max_tokens: 300,
        messages: [{
            role: 'user',
            content: `
    ${esnaf.isletmeAdi} (${esnaf.sektor}) için Google Ads (Arama Ağı) metinleri hazırla. ${esnaf.ilce} bölgesinde hizmet veriyor.
    Format JSON olmalı.
    {
      "basliklar": ["max 30 karakterlik 5 farklı çarpıcı başlık"],
      "aciklamalar": ["max 90 karakterlik 2 açıklama (Arama Ağı formatına uygun)"]
    }
    `,
        }],
    })

    try {
        return JSON.parse(
            yanit.content[0].type === 'text' ? yanit.content[0].text : '{"basliklar":[],"aciklamalar":[]}'
        )
    } catch (e) {
        return { basliklar: [], aciklamalar: [] }
    }
}

// ── Negatif Kelime & Bidding Zekası (Faz 28) ──────────────────────────
export async function addNegativeKeyword(esnafId: string, kampanyaId: string, keyword: string) {
    const q = await adminDb.collection('reklamlar')
        .where('esnafId', '==', esnafId)
        .where('kampanyaId', '==', kampanyaId)
        .get()

    if (!q.empty) {
        const doc = q.docs[0]
        const currentNegatives = doc.data().negativeKeywords || []
        if (!currentNegatives.includes(keyword)) {
            await doc.ref.update({
                negativeKeywords: [...currentNegatives, keyword]
            })
            // Google Ads API (Mutate) tetikleyicisi buraya gelecek.
        }
    }
}

export async function adjustBidsByDay(esnafId: string, kampanyaId: string, gunStr: string, multiplier: number) {
    const q = await adminDb.collection('reklamlar')
        .where('esnafId', '==', esnafId)
        .where('kampanyaId', '==', kampanyaId)
        .get()

    if (!q.empty) {
        const doc = q.docs[0]
        const multipliers = doc.data().bidMultipliers || {}
        multipliers[gunStr] = multiplier
        await doc.ref.update({ bidMultipliers: multipliers })
        // Google Ads API (Bidding) tetikleyicisi buraya gelecek.
    }
}
