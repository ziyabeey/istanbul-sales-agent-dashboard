export interface Paket {
    id: string
    name: string
    aylikFiyat: number
    yillikFiyatAylik: number
    teknoloji: string
    aiKredi: string
    ozellikler: string[]
    populer: boolean
    premium: boolean
    fiyatYillik?: number
}

// Merkezi Fiyatlandırma Verisi (Source of Truth)
// Sınırsız AI ibareleri silindi, işlem kredisi kotaları eklendi.
export const PAKETLER: Paket[] = [
    {
        id: 'temel',
        name: 'TEMEL',
        aylikFiyat: 399,
        yillikFiyatAylik: 339,
        fiyatYillik: 4068,
        teknoloji: 'Statik HTML Site',
        aiKredi: '100 İşlem / Ay',
        ozellikler: ['Standart İletişim Formu', 'WhatsApp Destek Butonu', 'kepenk.ai Subdomain'],
        populer: false,
        premium: false
    },
    {
        id: 'standart',
        name: 'STANDART',
        aylikFiyat: 799,
        yillikFiyatAylik: 679,
        fiyatYillik: 8148,
        teknoloji: 'Statik HTML Site',
        aiKredi: '250 İşlem / Ay',
        ozellikler: ['Müşteri CRM (Temel)', 'Sosyal Medya İçerik Önerileri', 'Temel SEO Optimizasyonu'],
        populer: false,
        premium: false
    },
    {
        id: 'buyume',
        name: 'BÜYÜME',
        aylikFiyat: 1499,
        yillikFiyatAylik: 1274,
        fiyatYillik: 15288,
        teknoloji: 'Next.js Dinamik Site',
        aiKredi: '750 İşlem / Ay',
        ozellikler: ['AI Randevu & Rezervasyon', 'WhatsApp Otomasyonu', 'Ön Ödeme (Kapora) Alma'],
        populer: true,
        premium: false
    },
    {
        id: 'premium',
        name: 'PREMIUM',
        aylikFiyat: 2999,
        yillikFiyatAylik: 2549,
        fiyatYillik: 30588,
        teknoloji: '3D & Parallax Animasyon',
        aiKredi: '2.000 İşlem / Ay',
        ozellikler: ['Hediye .com.tr Domain', 'Google/Meta Reklam Asistanı', 'Kriz & Yorum Yönetimi'],
        populer: false,
        premium: true
    },
    {
        id: 'premiumplus',
        name: 'PREMIUM PLUS',
        aylikFiyat: 4499,
        yillikFiyatAylik: 3824,
        fiyatYillik: 45888,
        teknoloji: 'Özel Tasarım 3D Matrix',
        aiKredi: '5.000 İşlem / Ay',
        ozellikler: ['Hediye .com veya .com.tr', 'Trendyol/Yemeksepeti Entegre', 'Kişisel AI Asistan (7/24)'],
        populer: false,
        premium: true
    }
];

// Geriye dönük uyumluluk (Eski yapılar bunu bekliyor olabilir)
export const PAKET_FIYATLARI_AYLIK: Record<string, number> = {
    TEMEL: 399,
    STANDART: 799,
    BUYUME: 1499,
    PREMIUM: 2999,
    PREMIUMPLUS: 4499,
}

// Geriye dönük uyumluluk
export const PAKET_KOTALARI: Record<string, number> = {
    TEMEL: 100,
    STANDART: 250,
    BUYUME: 750,
    PREMIUM: 2000,
    PREMIUMPLUS: 5000,
}
