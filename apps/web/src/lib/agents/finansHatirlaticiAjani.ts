import Anthropic from '@anthropic-ai/sdk'
import { adminDb } from '@/lib/firebaseAdmin'
import { waMesajGonder } from '@/lib/twilioClient'
import logger from '@/utils/logger'

const claude = new Anthropic({ apiKey: process.env.ANTHROPIC_API_KEY! })

export async function finansHatirlaticiCalistir(toptanciId: string) {
    console.log(`[B2B FINANS AI] ${toptanciId} Toptancısı için Cari Taraması Başlıyor...`)
    try {
        const toptanciDoc = await adminDb.collection('esnaflar').doc(toptanciId).get()
        if (!toptanciDoc.exists) return
        const toptanci = toptanciDoc.data()!

        // Vadesi bugün veya geçmiş olan ödenmemiş carileri bul (Mock sorgu: Gerçekte Timestamp ile filtrelenir)
        const carilerSnap = await adminDb.collection('b2bCariHesaplar')
            .where('toptanciId', '==', toptanciId)
            .where('durum', 'in', ['odenmedi', 'gecikmede'])
            .get()

        const simdi = new Date()

        for (const doc of carilerSnap.docs) {
            const cari = doc.data()
            const vadeTarihi: Date = cari.vadeTarihi.toDate()

            // Vadesine 3 günden az kalan veya gecikenler
            const farkGun = (vadeTarihi.getTime() - simdi.getTime()) / (1000 * 3600 * 24)

            if (farkGun <= 3) {
                const esnafDoc = await adminDb.collection('esnaflar').doc(cari.esnafId).get()
                const esnaf = esnafDoc.data()
                if (!esnaf?.telefon) continue

                // Tahsilat dilini (Şirketten Şirkete - Esnaftan Esnafa) LLM ile kurgula
                const systemPrompt = `Sen ${toptanci.isletmeAdi || 'Toptancı A.Ş.'} firmasının Finans ve Muhasebe departmanısın.
Amacın esnaf müşteriniz olan ${esnaf.isletmeAdi} firmasından gecikmiş veya vadesi yaklaşan B2B bakiyesini saygılı, esnaf jargonuna uygun ancak ciddiyetle talep etmek.
Söz konusu bakiye: ${cari.tutar} ₺
Açıklama: ${cari.aciklama}
Vade Durumu: ${farkGun < 0 ? Math.abs(Math.floor(farkGun)) + ' gün GECİKMİŞ' : Math.floor(farkGun) + ' gün sonra VADESİ DOLACAK'}

Çıktı olarak sadece esnafa WhatsApp'tan atılacak mesajı ver. Kesinlikle "Saygıdeğer Müşterimiz" gibi fazlaca kurumsal soğuk laflar kullanma, ama bakkal ağzı da yapma.`

                const yanit = await claude.messages.create({
                    model: 'claude-3-5-sonnet-20241022',
                    max_tokens: 300,
                    system: systemPrompt,
                    messages: [{ role: 'user', content: 'Cari hatırlatma mesajını oluştur.' }]
                })

                const mesaj = yanit.content[0].type === 'text' ? yanit.content[0].text : ''

                if (mesaj) {
                    await waMesajGonder(esnaf.telefon, mesaj, toptanciId, 'finans_hatirlatici')

                    // Gecikmeye düştüyse durumunu gecikmede yap
                    if (farkGun < 0 && cari.durum !== 'gecikmede') {
                        await doc.ref.update({ durum: 'gecikmede' })
                    }

                    await logger.logYaz(toptanciId, 'info', 'B2B Finans Hatırlatma', `${esnaf.isletmeAdi} firmasına ${cari.tutar}₺'lik geciken/yaklaşan bakiye için AI muhasabat SMS'i atıldı.`)
                }
            }
        }

    } catch (e: any) {
        console.error('[FINANS AI HATASI]', e)
        await logger.logYaz(toptanciId, 'error', 'Finans AI', e.message)
    }
}
