import Anthropic from '@anthropic-ai/sdk'
import { adminDb } from '@/lib/firebaseAdmin'
import logger from '@/utils/logger'
import { waMesajGonder } from '@/lib/twilioClient'

const claude = new Anthropic({ apiKey: process.env.ANTHROPIC_API_KEY! })

/**
 * Toptancı (Wholesaler) Kampanya başlattığında çalışan Dışa Dönük (Outbound) Saha Satış (Plasiyer) Ajanı.
 * Belirli esnaflara kişiselleştirilmiş kampanya metinleri oluşturur ve WhatsApp'tan atar.
 */
export async function kampanyaBaslatSahaSatis(toptanciId: string, kampanyaIcerigi: string) {
    try {
        const toptanciDoc = await adminDb.collection('esnaflar').doc(toptanciId).get()
        if (!toptanciDoc.exists) return
        const toptanci = toptanciDoc.data()!

        // Toptancının hedef kitlesi: Bağlantılı olduğu esnaflar veya bölgedeki tüm uygun esnaflar
        // Basitlik için tüm ilgili "esnaf" rollü kullanıcılara mesaj atılacak. (Gerçekte kategori filtreli olur)
        const hedefEsnaflar = await adminDb.collection('esnaflar')
            .where('rol', '==', 'esnaf') // TODO: sektor/ilce filtresi 
            .get()

        for (const esnaf of hedefEsnaflar.docs) {
            const eData = esnaf.data()
            if (!eData.telefon) continue

            // Esnafa özel satış metnini kurgula
            const systemPrompt = `
Sen ${toptanci.isletmeAdi || 'Toptancı A.Ş.'} firmasının baş saha satış (plasiyer) temsilcisisin.
Amacın: Verilen kampanya bilgisini, satmak istediğin esnafa (${eData.isletmeAdi}) WhatsApp üzerinden son derece sıcak, cana yakın bir toptancı/esnaf diliyle sunmak. 
Asla robot gibi konuşma ("Sayın Müşterimiz" vs. kullanma). Mesajı "Ahmet Usta nasılsın?" tadında başlat.
Kısa tut, sadede gel, satışı kovala. Soruyla bitir ("Sana 5 koli ayırayım mı?").

KAMPANYA DETAYI: ${kampanyaIcerigi}
`

            const yanit = await claude.messages.create({
                model: 'claude-3-5-sonnet-20241022',
                max_tokens: 250,
                system: systemPrompt,
                messages: [{ role: 'user', content: 'Lütfen bu kampanyayı bu esnafa iletecek satış mesajını oluştur.' }]
            })

            const mesaj = yanit.content[0].type === 'text' ? yanit.content[0].text : ''

            if (mesaj) {
                // Twilio (WhatsApp) Entegrasyonuna Mesaj At (Gerçekte hedefTelefon kullanılır, mock apiye yolluyoruz)
                await waMesajGonder(eData.telefon, mesaj, toptanciId, 'saha_satis')
            }
        }

        await logger.logYaz(toptanciId, 'info', 'Saha Kampanyası', `Outbound Satış Ajanı bölgedeki ${hedefEsnaflar.size} esnafa mesaj gönderdi: ${kampanyaIcerigi.substring(0, 30)}...`)

    } catch (e: any) {
        console.error('[SAHA SATIŞ HATASI]', e)
        await logger.logYaz(toptanciId, 'error', 'Saha Satış Hatası', e.message)
    }
}
