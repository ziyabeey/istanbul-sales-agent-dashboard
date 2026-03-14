import { adminDb, Timestamp } from '@/lib/firebaseAdmin'
import Anthropic from '@anthropic-ai/sdk'
import { sesProfiliPrompt } from '@/utils/sesProfilegitici'

const claude = new Anthropic({ apiKey: process.env.ANTHROPIC_API_KEY })

interface ReviewResponse {
    durum: 'basarili' | 'hata'
    yanit?: string
}

export async function googleYorumYanitla(esnafId: string, yorumiId: string, yorumMetni: string, yildiz: number): Promise<ReviewResponse> {
    const esnafDoc = await adminDb.collection('esnaflar').doc(esnafId).get()
    const esnaf = esnafDoc.data()!

    // Yapay Zeka ile yanıtlama
    const yanit = await claude.messages.create({
        model: 'claude-3-5-sonnet-20241022',
        max_tokens: 250,
        system: `
Sen ${esnaf.isletmeAdi} işletmesinin Google Haritalar yöneticisisin.
Gelen müşteri yorumuna anında yanıt vermelisin.

${sesProfiliPrompt(esnaf.sesProfili)}

Yönerge:
- 4 veya 5 yıldızlı güzel bir yorumsa içtenlikle teşekkür et ve tekrar beklediğini söyle.
- 1, 2 veya 3 yıldızlı kötü bir yorumsa asla kavga etme! "Çok üzgünüz, telafi etmek isteriz, lütfen bize 0${esnaf.telefon} numarasından ulaşın" tarzı kriz yönetici bir yapıda yaklaş.
- JSON filan kullanma, sadece direkt gönderilecek metni ver.
    `,
        messages: [{
            role: 'user',
            content: `Yıldız: ${yildiz}/5\nMüşteri Yorumu: "${yorumMetni}"`
        }]
    })

    const uretilenYanit = yanit.content[0].type === 'text' ? yanit.content[0].text : ''

    // MOCK: Normalde burada Google Business Profile API'ye POST atılır
    // fetch('https://mybusiness.googleapis.com/v4/accounts/.../locations/.../reviews/{reviewId}/reply', ...)

    // Firestore'da yorumun yanıtlandığını kaydet
    await adminDb.collection('gmbYorumlari').doc(yorumiId).set({
        esnafId,
        yorumMetni,
        yildiz,
        uretilenYanit,
        yanitTarihi: Timestamp.now(),
        durum: 'yanitlandi'
    }, { merge: true })

    return { durum: 'basarili', yanit: uretilenYanit }
}
