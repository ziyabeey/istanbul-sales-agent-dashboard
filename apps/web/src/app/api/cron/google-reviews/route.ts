import { NextResponse } from 'next/server'
import { adminDb } from '@/lib/firebaseAdmin'
import { okunmamisYorumlariGetir, yorumaCevapYaz } from '@/lib/googleBusinessClient'
import { runAgent } from '@/agents/agentRunner'
import { waMesajGonder } from '@/lib/twilioClient'

// Google My Business Yorum (Review) Otonomasyonu - Cron Router
// Her saat/gün çalışarak esnafların yanıtlanmamış yeni yorumlarına AI ile cevap yazar.
export async function GET(request: Request) {
    try {
        const { searchParams } = new URL(request.url)
        const guvenlikAnahtari = searchParams.get('secret')

        // Cron yetkilendirmesi (Güvenlik)
        if (guvenlikAnahtari !== process.env.CRON_SECRET) {
            return new NextResponse('Yetkisiz Erişim (Invalid Secret)', { status: 401 })
        }

        // console.log('[CRON GOOGLE REVIEWS] Yorum Tarama Başlatılıyor...')

        // Google Entegrasyonu aktif olan tüm esnafları çek
        const esnaflarRef = await adminDb.collection('esnaflar')
            .where('botAktif', '==', true)
            .get()

        let islenenYorumSayisi = 0

        for (const esnafDoc of esnaflarRef.docs) {
            const esnaf = esnafDoc.data()
            const esnafId = esnafDoc.id

            // Kimlik bağı var mı?
            if (!esnaf.googleAccessToken || !esnaf.googleLocationId) continue

            // 1. Okunmamış / Yanıtlanmamış Yorumları Getir
            const okunmamisYorumlar = await okunmamisYorumlariGetir(esnafId)

            for (const yorum of okunmamisYorumlar) {
                const yildizMapper: any = { ONE: 1, TWO: 2, THREE: 3, FOUR: 4, FIVE: 5 }
                const yildizSkoru = yildizMapper[yorum.starRating] || 5

                // Müşterinin yazdığı yorum metni. Boş yıldız atmış da olabilir
                const musteriMesaji = yorum.comment || "(Sadece yıldız bırakılmış, metin yok)"
                const musteriIsmi = yorum.reviewer?.displayName || 'Değerli müşterimiz'

                // 2. Sentiment Guardian (ADK Ajanı) ile SEO Uyumlu Yanıt Üret
                const promptMetin = `[GOOGLE HARİTALAR YORUMU]
Skor: ${yildizSkoru} Yıldız
Yorum Yapan: ${musteriIsmi}
Yorum Metni: "${musteriMesaji}"

Bu bir Google Haritalar (My Business) yorumudur. Müşteriye uygun profesyonel yanıtı yazın. SADECE YANIT METNİNİ VERİN.`

                const aiYaniti = await runAgent(
                    'sentiment_guardian',
                    { mesaj: promptMetin, action: 'google_review', sektor: esnaf.sektor, ilce: esnaf.ilce },
                    { esnafId }
                )

                // 3. Üretilen yanıtı Public (Google My Business) olarak yayımla
                if (aiYaniti && typeof aiYaniti === 'string') {
                    const basariliPost = await yorumaCevapYaz(esnafId, yorum.reviewId, aiYaniti.trim())

                    if (basariliPost) {
                        islenenYorumSayisi++
                    }

                    // 4. Kriz Durumu (3 Yıldız ve Altı) İse Esnafa WhatsApp'tan Çıtlat
                    // Müşteri kaçırdığını patron bilsin
                    if (yildizSkoru <= 3 && esnaf.telefon) {
                        const alertMesaj = `⚠️ *Kepenk.ai Kriz Kalkanı Devrede*\n\n` +
                            `Google'da işletmenize ${yildizSkoru} yıldızlı bir yorum geldi: "${musteriMesaji.substring(0, 50)}..."\n\n` +
                            `İmajınızı korumak adına Müşteriye Otonom Yanıtım:\n_${aiYaniti}_\n\n(Otomatik olarak yayınlandı, isterseniz panelden düzenleyebilirsiniz.)`

                        await waMesajGonder(esnaf.telefon, alertMesaj, esnafId, 'sentiment_guardian')
                    }
                }
            }
        }

        // console.log(`[CRON GOOGLE REVIEWS] Bitti. ${islenenYorumSayisi} yeni yoruma otomatik yanıt yazıldı.`)
        return NextResponse.json({
            status: 'ok',
            mesaj: `Google Yorum Taraması Tamamlandı. ${islenenYorumSayisi} yanıt verildi.`,
            zaman: new Date().toISOString()
        })

    } catch (error: any) {
        // console.error('[CRON GOOGLE REVIEWS HATA]', error)
        return NextResponse.json({ error: error.message }, { status: 500 })
    }
}
