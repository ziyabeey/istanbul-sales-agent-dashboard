export interface OgrenmeAni {
    id: string
    tip: OgrenmeAniTipi
    sektor: string
    ilce: string
    sehir: string
    paket: string

    // Anonimleştirilmiş bağlam
    baglam: string   // "Kuaför, Kadıköy, Cumartesi sabahı, 'yer kaldı' mesajı"
    eylem: string   // "WA kampanya mesajı gönderildi"
    sonuc: string   // "3 randevuya dönüştü, %60 dönüşüm"

    // Sayısal metrikler
    metrikler: {
        donusumOrani?: number
        cevapSuresi?: number   // dakika
        gelirEtkisi?: number   // TL
        memnuniyetSkor?: number
    }

    // Embedding için metin (tüm alanların birleşimi)
    icerik: string
    embedding?: number[]   // Pinecone'a yazılınca dolar

    zaman: string
    ay: string     // "2026-03" — aylık trend için
}

export type OgrenmeAniTipi =
    | 'icerik_performans'      // İçerik türü → etkileşim/randevu
    | 'kampanya_performans'    // Kampanya mesajı → dönüşüm
    | 'reklam_performans'      // Reklam kreatifi → CPL
    | 'musteri_itiraz'         // İtiraz → nasıl aşıldı
    | 'randevu_kaybetme'       // Müşteri randevu almadı → sebep
    | 'paket_yukseltme'        // Hangi argüman paket yükseltmeye neden oldu
    | 'churn_oncesi'           // Churn öncesi davranış örüntüsü
    | 'site_performans'        // Site modülü → müşteri aksiyonu
    | 'fiyat_stratejisi'       // Fiyat değişimi → talep etkisi
