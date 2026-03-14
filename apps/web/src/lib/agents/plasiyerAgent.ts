import Anthropic from '@anthropic-ai/sdk'
import { adminDb, Timestamp } from '@/lib/firebaseAdmin'
import { RouterParams } from './routerAgent'
import { waMesajGonder } from '@/lib/twilioClient'
import logger from '@/utils/logger'

const claude = new Anthropic({ apiKey: process.env.ANTHROPIC_API_KEY! })

export async function islemYap(params: RouterParams): Promise<void> {
    const { esnafId: toptanciId, musteriNumara: esnafTelefon, mesaj } = params

    console.log(`[PLASIYER AGENT] B2B Sipariş Akışı Başladı. Toptancı: ${toptanciId}`)

    // 1. Toptancı (Satıcı) Bilgisi
    const toptanciDoc = await adminDb.collection('esnaflar').doc(toptanciId).get()
    const toptanci = toptanciDoc.data()

    // 2. Müşteri (Esnaf) Bilgisi (Kim sipariş veriyor?)
    const musteriQuery = await adminDb.collection('esnaflar').where('telefon', '==', esnafTelefon).limit(1).get()
    let aliciEsnaf = { id: 'Bilinmeyen', isletmeAdi: 'Bilinmeyen Esnaf' }

    if (!musteriQuery.empty) {
        const doc = musteriQuery.docs[0]
        aliciEsnaf = { id: doc.id, isletmeAdi: doc.data().isletmeAdi || doc.data().ad }
    }

    // 3. Sipariş Niyeti Çıkarma (Function Calling)
    const nlpAnaliz = await claude.messages.create({
        model: 'claude-3-haiku-20240307',
        max_tokens: 300,
        system: `
Sen bir B2B Toptancı Sipariş (Plasiyer) asistanısın. Müşteriniz olan esnaflar size WhatsApp'tan sipariş yazıyor.
Müşterinin mesajından sipariş edilen ürün adını ve miktarını çıkar.
Eğer ortada net bir sipariş yoksa, "YOK" dön.

ÇIKTI FORMATI (Aynen bu JSON yapısını ver, başka açıklama yazma):
{
    "siparisVarmi": true/false,
    "urunAdi": "Örn: 7.1 Boya, Şampuan",
    "miktar": 5,
    "birim": "koli/kutu/adet (metinden ne anlıyorsan)"
}
`,
        messages: [{ role: 'user', content: mesaj }]
    })

    const nlpCikti = nlpAnaliz.content[0].type === 'text' ? nlpAnaliz.content[0].text : '{}'

    let analizJson
    try {
        analizJson = JSON.parse(nlpCikti)
    } catch {
        analizJson = { siparisVarmi: false }
    }

    // 4. Aksiyon
    if (analizJson.siparisVarmi) {
        // Toptancı paneline siparişi düşür (Kanban Board)
        await adminDb.collection('b2bSiparisler').add({
            toptanciId,
            esnafId: aliciEsnaf.id,
            isletmeAdi: aliciEsnaf.isletmeAdi,
            urunAdi: analizJson.urunAdi,
            miktar: analizJson.miktar,
            birim: analizJson.birim || 'Adet',
            durum: 'bekliyor',
            tarih: Timestamp.now()
        })

        const yanitMesaji = `Siparişiniz alındı ${aliciEsnaf.isletmeAdi}! ${analizJson.miktar} ${analizJson.birim} ${analizJson.urunAdi} deponuza doğru yola çıkmak üzere hazırlanıyor 🚚 Bizi tercih ettiğiniz için teşekkürler.`
        await waMesajGonder(esnafTelefon, yanitMesaji, toptanciId, 'plasiyer_satis')

        await logger.logYaz(toptanciId, 'info', 'B2B Sipariş Alındı', `${aliciEsnaf.isletmeAdi} firmasından WhatsApp üzerinden otonom B2B sipariş düşürüldü.`)

    } else {
        // Sohbet muhabbet
        const sohbetYaniti = await claude.messages.create({
            model: 'claude-3-haiku-20240307',
            max_tokens: 150,
            system: `Toptancı asistanısın. Müşteriye samimi ve esnaf ağzıyla kısa bir yanıt ver. (Örn: "Eyvallah ustam", "Nasıl yardımcı olayım?" vs)`,
            messages: [{ role: 'user', content: mesaj }]
        })
        const sohbetMesaji = sohbetYaniti.content[0].type === 'text' ? sohbetYaniti.content[0].text : 'Nasıl yardımcı olabilirim?'
        await waMesajGonder(esnafTelefon, sohbetMesaji, toptanciId, 'plasiyer_sohbet')
    }
}
