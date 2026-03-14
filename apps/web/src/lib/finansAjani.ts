import { adminDb, Timestamp } from '@/lib/firebaseAdmin'
import { waMesajGonder, esnafHitap } from '@/lib/twilioClient'

/**
 * İşletmenin "Nakit Akışı (Cashflow)" durumunu otonom kontrol eden CFO Zekası.
 * Sabit aylık giderleri, beklenen ciroyu hesaba katar. Eğer ay sonu açık 
 * (deficit) öngörürse, esnafa (Kullanıcıya) "Flaş Kampanya" acil durum teklifi sunar.
 */
export async function nakitAkisiKontrolMekanizmasi() {
    try {
        const esnaflarRef = await adminDb.collection('esnaflar')
            .where('botAktif', '==', true)
            .get()

        const simdi = new Date()
        const ayinBasi = new Date(simdi.getFullYear(), simdi.getMonth(), 1)
        const ayinSonu = new Date(simdi.getFullYear(), simdi.getMonth() + 1, 0, 23, 59, 59)

        for (const esnafDoc of esnaflarRef.docs) {
            const esnafId = esnafDoc.id
            const esnaf = esnafDoc.data()

            if (!esnaf.telefon) continue

            // 1. Simüle Edilmiş Sabit Giderler (Açık Bankacılık entegrasyonu gelene kadar)
            // Kaba bir hesapla: Kira, personel, faturalar toplamı. (Default: 30.000 TL)
            const tahminiGider = esnaf.istatistik?.tahminiGider || 30000

            // 2. Beklenen/Gerçekleşen Ciro (Randevulardan hesapla)
            // Firebase randevuları (Gelecekteki randevular da dahil ay sonuna kadar)
            const randevular = await adminDb.collection('randevular')
                .where('esnafId', '==', esnafId)
                .where('randevuZamani', '>=', Timestamp.fromDate(ayinBasi))
                .where('randevuZamani', '<=', Timestamp.fromDate(ayinSonu))
                .get()

            const ortalamaSepet = esnaf.istatistik?.ortalamaSepet || 1000
            const beklenenCiro = randevular.size * ortalamaSepet

            // 3. Nakit Açığı / Deficit Kararı
            // Ciro, giderleri karşılamıyorsa ve ayın 15'ini geçtiysek alarm ver.
            if (beklenenCiro < tahminiGider && simdi.getDate() >= 15) {
                const acik = tahminiGider - beklenenCiro
                const acikGuzelStr = new Intl.NumberFormat('tr-TR', { style: 'currency', currency: 'TRY', maximumFractionDigits: 0 }).format(acik)

                // Önceden kampanya önerilmiş mi kontrol et (Haftada 1 kereden fazla spam yapmasın)
                const sonOneri = esnaf.istatistik?.sonFinansOnerisiZamani?.toDate()
                const beklemeSuresiGectiMi = !sonOneri || (simdi.getTime() - sonOneri.getTime() > 7 * 24 * 60 * 60 * 1000)

                if (beklemeSuresiGectiMi) {
                    const mesaj = `📉 *Nakit Akışı Uyarısı (Kepenk CFO)*\n\nMerhaba ${esnafHitap(esnaf)},\n` +
                        `İşletmenizin bu ayki sabit giderlerini (${tahminiGider.toLocaleString('tr-TR')} TL) analiz ettim. Şu anki randevu takviminize göre yaklaşan ödemelerde yaklaşık *${acikGuzelStr}* açık öngörüyorum.\n\n` +
                        `🔥 Bu açığı kapatmak için, son 90 gündür gelmeyen "Soğumuş Müşterilere" hemen bugün *%30 İndirimli Nakit Özel Flaş Kampanyası* başlatayım mı?\n\n` +
                        `Onaylıyorsanız 'KAMPANYA BAŞLAT', istemiyorsanız 'HAYIR' yazabilirsiniz.`

                    const basarili = await waMesajGonder(esnaf.telefon, mesaj, esnafId, 'cfo_agent')

                    if (basarili) {
                        // Bir sonraki uyarıyı 7 gün ertelemek için zaman damgası koy
                        await esnafDoc.ref.update({
                            'istatistik.sonFinansOnerisiZamani': new Date()
                        })
                    }
                }
            }
        }
    } catch (error) {
        console.error('Nakit Akışı (CFO) Kontrolü Hatası:', error)
    }
}
