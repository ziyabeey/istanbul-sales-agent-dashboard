import { adminDb, Timestamp } from '@/lib/firebaseAdmin'
import { waMesajGonder } from '@/lib/twilioClient'

/**
 * Esnafın veresiye/vadeye bıraktığı ödemeleri otonom tahsil eden 
 * "Kötü Polis / Kurumsal Muhasebe" Ajanı.
 * 
 * Vadesi geçmiş borçları bulur ve nazik ama kurumsal bir dille
 * borçlu müşteriye "Kepenk.ai Muhasebe" adı altında WhatsApp'tan mesaj atar.
 */
export async function veresiyeTahsilatMotoru() {
    try {
        const simdi = new Date()

        // 1. Ödenmemiş ve vadesi GEÇMİŞ tüm veresiyeleri getir
        const veresiyelerRef = await adminDb.collection('veresiyeler')
            .where('durum', '==', 'odenmedi')
            .where('vadeTarihi', '<', Timestamp.fromDate(simdi))
            .get()

        for (const doc of veresiyelerRef.docs) {
            const borc = doc.data()
            const borcId = doc.id
            const esnafId = borc.esnafId
            const musteriTel = borc.musteriTelefon

            if (!esnafId || !musteriTel) continue

            // Esnaf detaylarını al (Dükkan adı vs. için)
            const esnafDoc = await adminDb.collection('esnaflar').doc(esnafId).get()
            const esnaf = esnafDoc.data()
            if (!esnaf || !esnaf.botAktif) continue

            const isletmeAdi = esnaf.isletmeAdi || esnaf.ad || esnaf.unvan || 'İşletme'
            const borcMiktari = borc.tutar || 0
            const borcStr = new Intl.NumberFormat('tr-TR', { style: 'currency', currency: 'TRY', maximumFractionDigits: 0 }).format(borcMiktari)

            // Veli Usta'nın yüzü düşmesin diye, Topu "Muhasebe Sistemine" Atan format
            const mesaj = `🏢 *${isletmeAdi} - Finans Koordinatörlüğü*\n\n` +
                `Sayın müşterimiz,\nSistem kayıtlarımıza göre vade tarihi geçmiş *${borcStr}* tutarında açık bir cari bakiyeniz bulunmaktadır.\n\n` +
                `Muhasebe kayıtlarının zamanında kapanabilmesi adına ödemenizi gerçekleştirmeniz veya bir ödeme tarihi belirlemek için asistanımızla (bana yanıt vererek) iletişime geçmeniz rica olunur.\n\n` +
                `_Not: Bu mesaj otomatik finans sistemi tarafından gönderilmiştir._`

            const sonHatirlatma = borc.sonHatirlatma?.toDate()
            // 3 Günde 1 kereden fazla darlamasın
            const beklemeGecti = !sonHatirlatma || (simdi.getTime() - sonHatirlatma.getTime() > 3 * 24 * 60 * 60 * 1000)

            if (beklemeGecti) {
                const basari = await waMesajGonder(musteriTel, mesaj, esnafId, 'tahsilat_ajani')

                if (basari) {
                    await doc.ref.update({
                        sonHatirlatma: Timestamp.fromDate(simdi),
                        hatirlatmaSayisi: (borc.hatirlatmaSayisi || 0) + 1
                    })
                }
            }
        }
    } catch (error) {
        console.error('Otonom Tahsilat Motoru Hatası:', error)
    }
}
