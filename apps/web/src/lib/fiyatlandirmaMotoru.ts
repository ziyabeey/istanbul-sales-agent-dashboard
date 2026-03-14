import { adminDb } from '@/lib/firebaseAdmin'
import { Timestamp } from 'firebase-admin/firestore'

/**
 * Uber/Havayolu mantığındaki "Surge Pricing" (Dalgalı Fiyat) algoritması. 
 * Müşteriye fiyat verilmeden hemen önce o günün/haftanın TAKVİM DOLULUĞUNU
 * ölçer. Eğer yoğunsa zamlı, boşsa indirimli ("Boş Saat Fırsatı") fiyat çeker.
 */
export async function dinamikFiyatHesapla(
    esnafId: string,
    hedefTarih: Date | null = null
): Promise<{
    zamOrani: number
    isSurge: boolean
    isDiscount: boolean
    sistemTalimati: string
}> {
    try {
        if (!hedefTarih) hedefTarih = new Date()

        // Hedef tarihin başlangıcı ve bitişi (Örn: Bugün veya yarın tüm gün)
        const baslangic = new Date(hedefTarih.setHours(0, 0, 0, 0))
        const bitis = new Date(hedefTarih.setHours(23, 59, 59, 999))

        const randevularRef = await adminDb.collection('randevular')
            .where('esnafId', '==', esnafId)
            .where('randevuZamani', '>=', Timestamp.fromDate(baslangic))
            .where('randevuZamani', '<=', Timestamp.fromDate(bitis))
            .get()

        const gundekiRandevuSayisi = randevularRef.size

        // Esnafın günlük ortalama kapasitesini al (Varsayılan 10 randevu/gün)
        const esnafDoc = await adminDb.collection('esnaflar').doc(esnafId).get()
        const kapasite = esnafDoc.data()?.istatistik?.gunlukKapasite || 10

        const dolulukOrani = gundekiRandevuSayisi / kapasite

        let zamOrani = 0
        let isSurge = false
        let isDiscount = false
        let sistemTalimati = ''

        // Surge Algoritması
        if (dolulukOrani >= 0.8) {
            // %80 veya daha dolu. Çok yoğun! Fiyatı %20 ARTIR.
            zamOrani = 0.20
            isSurge = true
            sistemTalimati = `[DİNAMİK FİYATLANDIRMA (SURGE PRICING) AKTİF: Takvim şu an %${Math.round(dolulukOrani * 100)} dolu. Normal Fiyat Listenizdeki rakamlara %20 ZAM EKLEYEREK müşteriye teklif sunmalısın.]`
        } else if (dolulukOrani <= 0.2 && hedefTarih.getTime() - Date.now() < 24 * 60 * 60 * 1000) {
            // Bugüne/Yarına ait takvim %20'den az doluysa, sinek avlıyoruz. Fiyatı %15 DÜŞÜR (Flaş İndirim).
            zamOrani = -0.15
            isDiscount = true
            sistemTalimati = `[DİNAMİK FİYATLANDIRMA (BOŞ SAAT FIRSATI) AKTİF: Takvim şu an %${Math.round(dolulukOrani * 100)} dolu. Normal Fiyat Listenizdeki rakamlara %15 İNDİRİM UYGULAYARAK müşteriye teklif sunmalısın.]`
        } else {
            sistemTalimati = `[DİNAMİK FİYATLANDIRMA: Standart listeyi kullan]`
        }

        return {
            zamOrani,
            isSurge,
            isDiscount,
            sistemTalimati
        }

    } catch (e) {
        console.error('Dinamik Fiyat Hesaplama Hatası:', e)
        return {
            zamOrani: 0,
            isSurge: false,
            isDiscount: false,
            sistemTalimati: '[DİNAMİK FİYATLANDIRMA: Standart listeyi kullan (Hesaplama Hatası)]'
        }
    }
}
