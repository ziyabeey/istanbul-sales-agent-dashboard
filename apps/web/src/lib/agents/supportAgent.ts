import { adminDb, Timestamp } from '@/lib/firebaseAdmin'
import { waMesajGonder } from '@/lib/twilioClient'
import Anthropic from '@anthropic-ai/sdk'
import { sesProfiliPrompt } from '@/utils/sesProfilegitici'
import { RouterParams } from './routerAgent'

const claude = new Anthropic({ apiKey: process.env.ANTHROPIC_API_KEY! })

export async function islemYap(params: RouterParams): Promise<void> {
    const { esnafId, musteriNumara, mesaj } = params

    const esnafDoc = await adminDb.collection('esnaflar').doc(esnafId).get()
    const esnaf = esnafDoc.data()!

    // Destek ajanı doğrudan müşteriyi yumuşatmaya, şikayetini dinlemeye ve patrona bildirmeye programlıdır.
    const sistemPrompt = `
Sen ${esnaf.isletmeAdi || esnaf.ad}'in DESTEK VE MÜŞTERİ HİZMETLERİ uzmanısın.
Sen bir satışçı değilsin. Karşıdaki müşteri iptal yapmak istiyor, şikayetçi veya bir faturası hakkında sorun yaşıyor.

${sesProfiliPrompt(esnaf.sesProfili)}

GÖREVIN:
1. Müşteriyi dinle, çok kibar ve empati kurarak yanıt ver.
2. Kavga etme. Hatalıysak özür dile. "Patronuma/Ustama anında iletiyorum" güvenini ver.
3. Randevu iptaliyse iptal edileceğini söyle.

Hiçbir JSON veya formatlama kullanma. Sadece şahsi WhatsApp mesajı gibi yanıtla.
`

    const yanit = await claude.messages.create({
        model: 'claude-3-5-sonnet-20241022',
        max_tokens: 400,
        system: sistemPrompt,
        messages: [
            { role: 'user', content: mesaj },
        ],
    })

    const temizYanit = yanit.content[0].type === 'text' ? yanit.content[0].text : ''

    if (temizYanit) {
        await waMesajGonder(musteriNumara, temizYanit, esnafId, 'support')
    }

    // Mesaj Logla
    await adminDb.collection('musteriKonusmalar').add({
        esnafId,
        musteriNumara,
        mesaj: temizYanit,
        kimden: 'bot',
        ajan: 'support',
        zaman: Timestamp.now()
    })

    // Esnafa (Patron) Kritik Uyarı Düş
    await adminDb.collection('esnafBildirimleri').add({
        esnafId,
        tip: 'kritik_musteri_sikayeti',
        baslik: 'Kızgın Müşteri Mesajı',
        detay: `${musteriNumara} numaralı müşterinizden destek/şikayet talebi geldi: "${mesaj}"`,
        zaman: Timestamp.now(),
        okundu: false
    })
}
