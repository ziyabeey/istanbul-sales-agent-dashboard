import { Pinecone } from '@pinecone-database/pinecone'
import { GoogleGenerativeAI } from '@google/generative-ai'
import { adminDb } from './firebaseAdmin'
import { FieldValue } from 'firebase-admin/firestore'
import type { OgrenmeAni, OgrenmeAniTipi } from '@/types/kolektifZeka'
import { anonimizeBaglam } from '@/utils/anonimize'

// Pinecone ve Gemini başlat
const pinecone = new Pinecone({ apiKey: process.env.PINECONE_API_KEY || 'dummy' })
const INDEX = pinecone.index(process.env.PINECONE_INDEX || 'kepenk-kolektif-zeka')
const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY!)

// ── Embedding üret (Google text-embedding-004) ──────────────────────────
async function embedUret(metin: string): Promise<number[]> {
    if (!metin) return []
    try {
        const model = genAI.getGenerativeModel({ model: 'text-embedding-004' })
        const result = await model.embedContent(metin)
        return result.embedding.values
    } catch (e) {
        console.error('Embedding Hatası:', e)
        return []
    }
}

// ── Öğrenme anını kaydet (KVKK Anonimleştirilmiş olarak) ──────────────────
export async function ogrenmeAniKaydet(
    esnaf: any,
    ani: Omit<OgrenmeAni, 'id' | 'embedding'>
): Promise<void> {
    if (process.env.PINECONE_API_KEY === 'your_pinecone_api_key_here') return

    const id = `${ani.tip}_${Date.now()}_${Math.random().toString(36).slice(2, 7)}`

    // Anonimize işlemi
    const temizBaglam = anonimizeBaglam(ani.baglam, esnaf)
    const temizEylem = anonimizeBaglam(ani.eylem, esnaf)
    const temizSonuc = anonimizeBaglam(ani.sonuc, esnaf)
    const temizIcerik = anonimizeBaglam(ani.icerik, esnaf)

    const embedding = await embedUret(temizIcerik)
    if (!embedding.length) return

    // Pinecone'a yaz (Vector DB)
    await INDEX.upsert({
        records: [
            {
                id,
                values: embedding,
                metadata: {
                    tip: ani.tip,
                    sektor: ani.sektor,
                    ilce: ani.ilce,
                    sehir: ani.sehir,
                    paket: ani.paket,
                    eylem: temizEylem,
                    sonuc: temizSonuc,
                    icerik: temizIcerik.substring(0, 1000),
                    zaman: ani.zaman,
                    ay: ani.ay,
                },
            }
        ]
    })

    // Firestore'a da yaz (İleride Analitik Panelde göstermek için)
    await adminDb.collection('ogrenmeAnlari').doc(id).set({
        id,
        tip: ani.tip,
        sektor: ani.sektor,
        ilce: ani.ilce,
        sehir: ani.sehir,
        paket: ani.paket,
        baglam: temizBaglam,
        eylem: temizEylem,
        sonuc: temizSonuc,
        metrikler: ani.metrikler || {},
        icerik: temizIcerik,
        zaman: FieldValue.serverTimestamp(),
        ay: ani.ay
    })
}

// ── Benzer Durumları (Kolektif Bilinci) Sorgula ──────────────────────────
export async function benzerDurumlariSorgula(params: {
    soru: string    // Örn: "Kadıköy kuaförü için Cumartesi mesajı"
    sektor?: string
    ilce?: string
    tip?: OgrenmeAniTipi
    topK?: number
}): Promise<{
    anlayis: string
    kanit: { eylem: string; sonuc: string; metrik?: number }[]
    guvenskor: number   // 0-1 (Kaç farklı veriye dayanıyor)
}> {
    const { soru, sektor, ilce, tip, topK = 10 } = params

    if (process.env.PINECONE_API_KEY === 'your_pinecone_api_key_here') {
        return { anlayis: '', kanit: [], guvenskor: 0 }
    }

    const embedding = await embedUret(soru)
    if (!embedding.length) return { anlayis: '', kanit: [], guvenskor: 0 }

    // Pinecone Metadata Filtreleri
    const filter: Record<string, any> = {}
    if (sektor) filter.sektor = sektor
    if (ilce) filter.ilce = ilce
    if (tip) filter.tip = tip

    const sonuclar = await INDEX.query({
        vector: embedding,
        topK,
        filter: Object.keys(filter).length > 0 ? filter : undefined,
        includeMetadata: true,
    })

    if (!sonuclar.matches?.length) {
        return {
            anlayis: 'Henüz yeterli platform verisi yok. Genel strateji uygulanıyor.',
            kanit: [],
            guvenskor: 0,
        }
    }

    // Gerçekleşen sonuçları (kanıtlari) filtrele, enjekte edilebilecek kadar iyiyse al
    const kanitlar = sonuclar.matches
        .filter(m => (m.score ?? 0) > 0.70)
        .map(m => ({
            eylem: String(m.metadata?.eylem ?? ''),
            sonuc: String(m.metadata?.sonuc ?? ''),
            metrik: m.metadata?.donusumOrani as number | undefined,
        }))

    if (kanitlar.length === 0) {
        return {
            anlayis: 'Benzer örnek bulundu ama güven skoru düşük.',
            kanit: [],
            guvenskor: 0.1,
        }
    }

    // LLM ile bu kanıtlardan tek paragraf akıllı bir "Platform Anlayışı" çıkart (RAG Summarization)
    const ozetYanit = await fetch('https://api.anthropic.com/v1/messages', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'x-api-key': process.env.ANTHROPIC_API_KEY!,
            'anthropic-version': '2023-06-01',
        },
        body: JSON.stringify({
            model: 'claude-3-5-haiku-20241022',
            max_tokens: 300,
            messages: [{
                role: 'user',
                content: `
Platform verisinden ${kanitlar.length} benzer örnek (geçmiş satıcı tecrübesi) bulundu.
Ajanın Sorduğu Soru: "${soru}"

Geçmiş Satıcı Örnekleri:
${kanitlar.map((k, i) => `${i + 1}. Eylem: ${k.eylem} | Sonuç: ${k.sonuc}${k.metrik !== undefined ? ` | Dönüşüm: %${(k.metrik * 100).toFixed(0)}` : ''}`).join('\n')}

Bu örnekleri inceleyerek 2-3 cümlelik çok pratik, direkt sahada kullanılabilecek bir çıkarım veya strateji anafikri yaz.
Cümleye "Platform verisi gösteriyor ki..." diye başla. 
Sadece strateji metnini ver, "merhaba", "işte anafikir" gibi ekstra laf salatası yapma.
`,
            }],
        }),
    }).then(r => r.json())

    const anlayis = ozetYanit.content?.[0]?.text ?? ''

    return {
        anlayis,
        kanit: kanitlar.slice(0, 5),
        guvenskor: Math.min(1, kanitlar.length / 10),
    }
}

// ── Kurumsal Hızlandırıcı İçin Sektörel Yönelim Raporu ─────────────────────────
export async function sektorStratejiOzeti(
    sektor: string,
    ilce: string
): Promise<{
    enIyiIcerikFormati: string
    enIyiKampanyaZamani: string
    enIyiReklamTipi: string
    ortalamaCPL: number
    dikkatEt: string[]
}> {
    const [icerik, kampanya, reklam] = await Promise.all([
        benzerDurumlariSorgula({
            soru: `${sektor} ${ilce} en iyi içerik formatı`,
            sektor,
            ilce,
            tip: 'icerik_performans',
            topK: 15,
        }),
        benzerDurumlariSorgula({
            soru: `${sektor} ${ilce} whatsapp kampanya mesajı dönüşüm`,
            sektor,
            ilce,
            tip: 'kampanya_performans',
            topK: 15,
        }),
        benzerDurumlariSorgula({
            soru: `${sektor} ${ilce} reklam performans CPL`,
            sektor,
            ilce,
            tip: 'reklam_performans',
            topK: 10,
        }),
    ])

    const cplDegerleri = reklam.kanit
        .map(k => k.metrik)
        .filter((m): m is number => m !== undefined)

    const ortalamaCPL = cplDegerleri.length > 0
        ? Math.round(cplDegerleri.reduce((a, b) => a + b, 0) / cplDegerleri.length)
        : 0

    return {
        enIyiIcerikFormati: icerik.anlayis || 'Henüz bu bölgede net bir içerik verisi oluşmadı.',
        enIyiKampanyaZamani: kampanya.anlayis || 'Henüz net bir kampanya verisi oluşmadı.',
        enIyiReklamTipi: reklam.anlayis || 'Reklam verisi toplanıyor.',
        ortalamaCPL,
        dikkatEt: [],
    }
}
