import { adminDb, Timestamp } from '@/lib/firebaseAdmin'
import Anthropic from '@anthropic-ai/sdk'

const claude = new Anthropic({ apiKey: process.env.ANTHROPIC_API_KEY })

export interface SesProfilDetay {
    kisilikTonu: string   // samimi, profesyonel, esprili
    cumpeCikisi: string   // Kısa mı uzun mu cümleler?
    emojKullanimi: 'hic' | 'az' | 'orta' | 'cok'
    hitapSekli: string   // abi, beyefendi, arkadaşım...
    karakteristikKelimeler: string[]
    karakteristikIfadeler: string[]
    ornekMesajlar: string[]
}

export async function sesProfiliCikar(
    esnafId: string,
    ornekMesajlar: string[]  // Esnafın yazdığı 5-10 gerçek mesaj
): Promise<SesProfilDetay> {

    const yanit = await claude.messages.create({
        model: 'claude-3-5-sonnet-20241022',
        max_tokens: 800,
        system: 'Bir yazarlık analisti olarak verilen mesajlardan kişinin yazı stilini analiz et.',
        messages: [{
            role: 'user',
            content: `
Bu kişinin yazdığı gerçek WhatsApp veya Sosyal Medya mesajları:

${ornekMesajlar.map((m, i) => `${i + 1}. "${m}"`).join('\n')}

Bu kişinin yazı stilini analiz et ve şu JSON formatında döndür:
{
  "kisilikTonu": "samimi/profesyonel/esprili/resmi",
  "cumpeCikisi": "kısa ve öz/orta uzunluk/ayrıntılı",
  "emojKullanimi": "hic/az/orta/cok",
  "hitapSekli": "kullandığı hitap şekli",
  "karakteristikKelimeler": ["bu kişiye özgü 5 kelime"],
  "karakteristikIfadeler": ["sık kullandığı 3 ifade"],
  "stilOzeti": "tek cümlede bu kişinin yazı stili"
}
`,
        }],
    })

    // Parse safety
    const profil = JSON.parse(
        yanit.content[0].type === 'text' ? yanit.content[0].text : '{}'
    )

    // Firestore'a kaydet
    await adminDb.collection('esnaflar').doc(esnafId).update({
        sesProfili: {
            ...profil,
            ornekMesajlar,
            olusturma: Timestamp.now(),
        },
    })

    return { ...profil, ornekMesajlar }
}

export function sesProfiliPrompt(sesProfili: any): string {
    if (!sesProfili || !sesProfili.kisilikTonu) return ''
    return `
---
[ÖNEMLİ] KİŞİSEL SES PROFİLİ ETKİNLEŞTİRİLDİ:
Sen robot değilsin, doğrudan Esnaf'ın şahsi yazı stilini taklit etmek zorundasın.

Aşağıdaki profile harfiyen uy:
- Ton: ${sesProfili.kisilikTonu}
- Cümle yapısı: ${sesProfili.cumpeCikisi}
- Emoji kullanımı seviyesi: ${sesProfili.emojKullanimi}
- Müşteriye hitap şekli: ${sesProfili.hitapSekli}
- Kullandığın karakteristik (orijinal) kelimeler: ${sesProfili.karakteristikKelimeler?.join(', ') ?? 'yok'}
- Sık kullanılan ifadeler: ${sesProfili.karakteristikIfadeler?.join(', ') ?? 'yok'}

Örnek mesajların (BU YAPIDA YAZ!):
${Array.isArray(sesProfili.ornekMesajlar) ? sesProfili.ornekMesajlar.slice(0, 3).map((m: string, i: number) => `${i + 1}. "${m}"`).join('\n') : ''}

KURAL 1: Hiçbir zaman yapay veya robot gibi yazma.
KURAL 2: Bu esnafın yazdıklarını okuyan biri "bunu o yazmış" demeli. Standart asistan tonunu komple terket.
---
`
}
