import { adminDb, Timestamp } from '@/lib/firebaseAdmin'
import Anthropic from '@anthropic-ai/sdk'

const claude = new Anthropic({ apiKey: process.env.ANTHROPIC_API_KEY })

export interface EsnafHafiza {
    esnafId: string
    sonGuncelleme: any    // Timestamp

    // Müşteri örüntüleri
    musteriKaliplari: {
        enKalabalikGunler: string[]   // ["Cumartesi", "Cuma"]
        enKalabalikSaatler: string[]   // ["10:00-12:00"]
        enCokTalepEdilenHizmet: string
        ortalamaRandevuAraligi: number   // gün
    }

    // Müşteri sesi (yorumlar vs)
    musteriGeribildirimleri: {
        sikSikOverulenler: string[]  // "hızlı", "temiz"
        sikSikElestirilenler: string[] // "geç kalıyor"
    }
}

// ── Hafızayı güncelle (haftalık çalışır) ─────────────────────────────────
export async function esnafHafizaGuncelle(esnafId: string): Promise<void> {
    // Tüm verilerden öğrenme çıkar
    const [randevular, yorumlar] = await Promise.all([
        adminDb.collection('randevular').where('esnafId', '==', esnafId).get(),
        adminDb.collection('yorumlar').where('esnafId', '==', esnafId).get(),
    ])

    // Randevu kalıpları
    const gunSayilari: Record<string, number> = {}
    const saatSayilari: Record<string, number> = {}

    for (const doc of randevular.docs) {
        const tarih = doc.data().tarih?.toDate?.()
        if (!tarih) continue
        const gun = ['Paz', 'Pzt', 'Sal', 'Çar', 'Per', 'Cum', 'Cmt'][tarih.getDay()]
        const saat = `${tarih.getHours()}:00`
        gunSayilari[gun] = (gunSayilari[gun] ?? 0) + 1
        saatSayilari[saat] = (saatSayilari[saat] ?? 0) + 1
    }

    const enKalabalikGunler = Object.entries(gunSayilari)
        .sort((a, b) => b[1] - a[1])
        .slice(0, 2).map(([g]) => g)

    const enKalabalikSaatler = Object.entries(saatSayilari)
        .sort((a, b) => b[1] - a[1])
        .slice(0, 2).map(([s]) => s)

    // Yorum analizi — Claude ile
    let yorumAnaliz = {}
    if (yorumlar.size > 0) {
        const yorumMetinleri = yorumlar.docs
            .map((d: any) => d.data().yorum)
            .filter(Boolean)
            .slice(0, 20)
            .join('\n---\n')

        try {
            const analizYanit = await claude.messages.create({
                model: 'claude-3-5-haiku-20241022',
                max_tokens: 300,
                messages: [{
                    role: 'user',
                    content: `
    Bu işletme yorumlarından öne çıkan kalıpları bul. Sadece JSON formatında okuyabileyim:
    ${yorumMetinleri}
    
    Beklenen format:
    {
        "sikSikOverulenler": ["max 3 övülen özellik"],
        "sikSikElestirilenler": ["max 2 eleştirilen özellik"]
    }`,
                }],
            })

            yorumAnaliz = JSON.parse(
                analizYanit.content[0].type === 'text' ? analizYanit.content[0].text : '{}'
            )
        } catch (e) { console.error('[ESNAF_HAFIZA] Yorum parse hatasi:', e) }
    }

    await adminDb.collection('esnafHafizalari').doc(esnafId).set({
        esnafId,
        sonGuncelleme: Timestamp.now(),
        musteriKaliplari: { enKalabalikGunler, enKalabalikSaatler },
        musteriGeribildirimleri: yorumAnaliz,
    }, { merge: true })
}

export async function hafizaPrompt(esnafId: string): Promise<string> {
    const hafizaDoc = await adminDb.collection('esnafHafizalari').doc(esnafId).get()
    const hafiza = hafizaDoc.data() as EsnafHafiza

    if (!hafiza) return ''

    return `
---
[ÖNEMLİ] UZUN DÖNEM HAFIZA (GEÇMİŞ VERİLERDEN ÇIKARIMLAR)
Yoğun günler: ${hafiza.musteriKaliplari?.enKalabalikGunler?.join(', ') ?? 'bilinmiyor'}
Yoğun saatler: ${hafiza.musteriKaliplari?.enKalabalikSaatler?.join(', ') ?? 'bilinmiyor'}

Müşteriler genellikle şunları övüyor: ${hafiza.musteriGeribildirimleri?.sikSikOverulenler?.join(', ') ?? 'veri yok'}
${hafiza.musteriGeribildirimleri?.sikSikElestirilenler?.length
            ? `Dikkat: ${hafiza.musteriGeribildirimleri.sikSikElestirilenler.join(', ')} konusunda şikayetler var. Bu konularda müşteriye karşı ekstra pozitif/telafi edici yaklaş.`
            : ''}

Bu bilgileri kullanarak (gerekmedikçe direkt belirtme) daha isabetli/iç görülü kararlar ver.
---
`
}
