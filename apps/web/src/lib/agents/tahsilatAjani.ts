import Anthropic from '@anthropic-ai/sdk'
import { adminDb, Timestamp } from '@/lib/firebaseAdmin'
import logger from '@/utils/logger'
import { waMesajGonder } from '@/lib/twilioClient'
import { sesProfiliPrompt } from '@/utils/sesProfilegitici'

const claude = new Anthropic({ apiKey: process.env.ANTHROPIC_API_KEY! })

export async function tahsilatYap(esnafId: string, cariHesapDocs: any[]) {
    try {
        const esnafDoc = await adminDb.collection('esnaflar').doc(esnafId).get()
        const esnaf = esnafDoc.data()!

        for (const doc of cariHesapDocs) {
            const cariData = doc.data()
            const { musteriAd, musteriTelefon, tutar, aciklama } = cariData

            const musteriId = `${esnafId}_${Buffer.from(musteriTelefon).toString('base64').slice(0, 12)}`
            const musteriProfil = await adminDb.collection('musteriProfiller').doc(musteriId).get()
            const profilData = musteriProfil.data()

            const musteriDurumu = profilData?.segment || 'Normal' // VIP, Sadık, Uyku vs.

            const sistemPrompt = `
Sen ${esnaf.isletmeAdi || esnaf.ad} adlı işletmenin TAHSİLAT yetkilisisin.
Görevin, aşağıdaki detayları verilen açık hesap/veresiye borcunu müşteriye WhatsApp'tan nazikçe hatırlatmak.
Müşteri Adı: ${musteriAd}
Müşteri Segmenti: ${musteriDurumu} (Eğer VIP veya Sadık ise çok daha nazik ve esnek yaklaş)
Borç Tutarı: ${tutar} TL
Hizmet/Ürün Açıklaması: ${aciklama}

${sesProfiliPrompt(esnaf.sesProfili)}

Sadece WhatsApp üzerinden gönderilecek, samimi, kısa, ve dükkandan bir hatırlatma gibi duran 1 veya en fazla 2 paragraflık bir mesaj metni oluştur. Asla robot gibi konuşma, esnafın kendi ağzından bir arkadaşına yazar gibi yaz.
`

            const yanit = await claude.messages.create({
                model: 'claude-3-5-sonnet-20241022',
                max_tokens: 300,
                system: sistemPrompt,
                messages: [
                    { role: 'user', content: 'Lütfen bu müşteri için açık hesap tahsilat mesajını hazırlar mısın?' }
                ]
            })

            const mesaj = yanit.content[0].type === 'text' ? yanit.content[0].text : ''

            if (mesaj) {
                // Twilio üzerinden gönder
                await waMesajGonder(musteriTelefon, mesaj, esnafId, 'tahsilat')

                // Mesaj Logla
                await adminDb.collection('musteriKonusmalar').add({
                    esnafId,
                    musteriNumara: musteriTelefon,
                    mesaj: mesaj,
                    kimden: 'bot',
                    ajan: 'tahsilat',
                    zaman: Timestamp.now()
                })

                // Hatırlatıldı olarak işaretle
                await adminDb.collection('cariHesaplar').doc(doc.id).update({
                    sonHatirlatma: Timestamp.now(),
                    hatirlatmaSayisi: (cariData.hatirlatmaSayisi || 0) + 1
                })

                await logger.logYaz(esnafId, 'info', 'Tahsilat Robotu', `${musteriAd || musteriTelefon} adlı müşteriye ${tutar}TL'lik borç hatırlatması atıldı.`)
            }
        }
    } catch (e) {
        console.error(`[TAHSILAT HATASI - ESNAF:${esnafId}]`, e)
        await logger.logYaz(esnafId, 'error', 'Tahsilat Hatası', `Tahsilat robotu çalıştırılırken bir sorun oluştu. Detay: ${e}`)
    }
}
