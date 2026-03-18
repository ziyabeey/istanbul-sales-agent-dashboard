import { sablonTemelHtml } from './temel'
import { sablonStandartHtml } from './standart'
import { sablonBuyumeHtml } from './buyume'
import { sablonPremiumHtml } from './premium'

// Sektörel Şablonlar (Faz 1)
import { sablonGuzellikBuyumeHtml } from './sektor-guzellik-buyume'
import { sablonInsaatPremiumHtml } from './sektor-insaat-premium'
import { sablonRestoranStandartHtml } from './sektor-restoran-standart'
import { sablonHizmetTemelHtml } from './sektor-hizmet-temel'

// Sektörel Şablonlar (Faz 2)
import { sablonKurumsalBuyumeHtml } from './sektor-kurumsal-buyume'
import { sablonEgitimStandartHtml } from './sektor-egitim-standart'
import { sablonSporPremiumHtml } from './sektor-spor-premium'
import { sablonVitrinBuyumeHtml } from './sektor-vitrin-buyume'

// Sektörel Şablonlar (Faz 3 / Demolar)
import { sablonSaglikPremiumHtml } from './sektor-saglik-premium'
import { sablonEticaretStandartHtml } from './sektor-eticaret-standart'
import { sablonOtomotivBuyumeHtml } from './sektor-otomotiv-buyume'
import { sablonAjansPremiumHtml } from './sektor-ajans-premium'

// Sektörel Şablonlar (Faz 4 / Yeni Demolar)
import { sablonOtelPremiumHtml } from './sektor-otel-premium'
import { sablonHukukBuyumeHtml } from './sektor-hukuk-buyume'
import { sablonMarketStandartHtml } from './sektor-market-standart'

export interface Sablon {
    id: string
    ad: string
    aciklama: string
    minPaket: 'TEMEL' | 'STANDART' | 'BUYUME' | 'PREMIUM' | 'PREMIUMPLUS'
    htmlKodu: string
    icon?: string
    etiketler?: string[]
    moduller?: string[]  // Aktif modül ID'leri
    kategori?: 'jenerik' | 'sektor'
}

/** @deprecated Use UNIFIED_SABLONLAR from ./unified-catalog for the full 200-theme catalog */
export const LEGACY_SABLONLAR: Sablon[] = [
    // --- Jenerik Şablonlar ---
    {
        id: 'sablon-temel',
        ad: 'Kardelen',
        aciklama: 'Minimal beyaz, tek kolona odaklı — mobilde pırıl pırıl parlayan hız şablonu.',
        minPaket: 'TEMEL',
        htmlKodu: sablonTemelHtml,
        icon: '🌱',
        etiketler: ['Genel', 'Minimal', 'Hızlı'],
        kategori: 'jenerik',
        moduller: ['whatsapp-teklif', 'whatsapp-canli', 'google-yorumlar', 'harita-yol-tarifi', 'calisma-saatleri', 'duyuru-bandi', 'kampanya-afisi', 'kvkk-gizlilik', 'cerez-bildirimi', 'sosyal-medya', 'bize-ulasin-sticky']
    },
    {
        id: 'sablon-standart',
        ad: 'Mermer',
        aciklama: 'Taş doku hissi, serif fontlar ve güven öğeleriyle prestijli kurumsal duruş.',
        minPaket: 'STANDART',
        htmlKodu: sablonStandartHtml,
        icon: '🏛️',
        etiketler: ['Kurumsal', 'Güven', 'Prestij'],
        kategori: 'jenerik',
        moduller: ['hakkimizda-hikaye', 'rakamlarla-biz', 'teklif-formu', 'google-yorumlar', 'musteri-referanslari', 'harita-yol-tarifi', 'calisma-saatleri', 'kampanya-afisi', 'duyuru-bandi', 'eposta-bulteni', 'kvkk-gizlilik', 'cerez-bildirimi', 'sosyal-medya', 'whatsapp-canli', 'bize-ulasin-sticky']
    },
    {
        id: 'sablon-buyume',
        ad: 'Atlas',
        aciklama: 'Geniş grid, harita metaforu — 13 bölüm, SEO odaklı keşif şablonu.',
        minPaket: 'BUYUME',
        htmlKodu: sablonBuyumeHtml,
        icon: '🗺️',
        etiketler: ['Kapsamlı', 'SEO', 'Büyüme'],
        kategori: 'jenerik',
        moduller: ['hakkimizda-hikaye', 'rakamlarla-biz', 'video-tanitim', 'sertifika-belgeler', 'randevu', 'teklif-formu', 'google-yorumlar', 'musteri-referanslari', 'blog-makaleler', 'kampanya-afisi', 'harita-yol-tarifi', 'calisma-saatleri', 'duyuru-bandi', 'eposta-bulteni', 'yol-haritasi', 'kvkk-gizlilik', 'cerez-bildirimi', 'sosyal-medya', 'whatsapp-canli', 'bize-ulasin-sticky']
    },
    {
        id: 'sablon-premium',
        ad: 'Obsidyen',
        aciklama: 'Siyah cam yüzey, neon vurgular — 16 bölüm, tam donanımlı ultra-premium şablon.',
        minPaket: 'PREMIUM',
        htmlKodu: sablonPremiumHtml,
        icon: '💎',
        etiketler: ['Lüks', 'Dinamik', 'Ultra'],
        kategori: 'jenerik',
        moduller: ['hakkimizda-hikaye', 'rakamlarla-biz', 'video-tanitim', 'sertifika-belgeler', 'randevu', 'teklif-formu', 'google-yorumlar', 'musteri-referanslari', 'blog-makaleler', 'kariyer-ilanlari', 'kampanya-afisi', 'harita-yol-tarifi', 'calisma-saatleri', 'urun-listesi', 'online-odeme', 'indirim-kuponu', 'anket-form', 'duyuru-bandi', 'eposta-bulteni', 'yol-haritasi', 'kvkk-gizlilik', 'cerez-bildirimi', 'sosyal-medya', 'whatsapp-canli', 'bize-ulasin-sticky']
    },
    
    // --- Sektörel Şablonlar (Faz 1) ---
    {
        id: 'sektor-guzellik-buyume',
        ad: 'İpek',
        aciklama: 'Pastel pembe/lila, yumuşak kenarlar — kuaför, estetik ve SPA dünyası için zarif tasarım.',
        minPaket: 'BUYUME',
        htmlKodu: sablonGuzellikBuyumeHtml,
        icon: '✨',
        etiketler: ['Güzellik', 'Klinik', 'Pastel'],
        kategori: 'sektor',
        moduller: ['randevu', 'hakkimizda-hikaye', 'rakamlarla-biz', 'video-tanitim', 'sertifika-belgeler', 'google-yorumlar', 'musteri-referanslari', 'blog-makaleler', 'online-odeme', 'anket-form', 'calisma-saatleri', 'duyuru-bandi', 'eposta-bulteni', 'yol-haritasi', 'kvkk-gizlilik', 'cerez-bildirimi', 'sosyal-medya', 'whatsapp-canli', 'bize-ulasin-sticky']
    },
    {
        id: 'sektor-insaat-premium',
        ad: 'Çelik',
        aciklama: 'Metal doku, sarı uyarı vurguları — inşaat ve mimarlık firmaları için endüstriyel güç.',
        minPaket: 'PREMIUM',
        htmlKodu: sablonInsaatPremiumHtml,
        icon: '🏗️',
        etiketler: ['İnşaat', 'Mimarlık', 'Endüstriyel'],
        kategori: 'sektor',
        moduller: ['santiye-gunlugu', 'rakamlarla-biz', 'video-tanitim', 'sertifika-belgeler', 'urun-listesi', 'musteri-referanslari', 'teklif-formu', 'google-yorumlar', 'anket-form', 'blog-makaleler', 'yol-haritasi', 'calisma-saatleri', 'duyuru-bandi', 'eposta-bulteni', 'kvkk-gizlilik', 'cerez-bildirimi', 'sosyal-medya', 'whatsapp-canli', 'bize-ulasin-sticky']
    },
    {
        id: 'sektor-restoran-standart',
        ad: 'Tandır',
        aciklama: 'Sıcak turuncu tonlar, duman efekti — restoran ve kafeler için iştah açıcı vitrin.',
        minPaket: 'STANDART',
        htmlKodu: sablonRestoranStandartHtml,
        icon: '🍽️',
        etiketler: ['Restoran', 'Kafe', 'Lezzet'],
        kategori: 'sektor',
        moduller: ['randevu', 'hakkimizda-hikaye', 'rakamlarla-biz', 'google-yorumlar', 'musteri-referanslari', 'harita-yol-tarifi', 'calisma-saatleri', 'kampanya-afisi', 'duyuru-bandi', 'eposta-bulteni', 'kvkk-gizlilik', 'cerez-bildirimi', 'sosyal-medya', 'whatsapp-canli', 'bize-ulasin-sticky']
    },
    {
        id: 'sektor-hizmet-temel',
        ad: 'Flaş',
        aciklama: 'Kırmızı vurgulu, büyük CTA butonları — acil hizmet sağlayıcılar için ultra-hızlı şablon.',
        minPaket: 'TEMEL',
        htmlKodu: sablonHizmetTemelHtml,
        icon: '⚡',
        etiketler: ['Acil', 'Hızlı', 'Dönüşüm'],
        kategori: 'sektor',
        moduller: ['whatsapp-teklif', 'calisma-saatleri', 'kampanya-afisi', 'duyuru-bandi', 'kvkk-gizlilik', 'cerez-bildirimi', 'sosyal-medya', 'whatsapp-canli', 'bize-ulasin-sticky']
    },
    
    // --- Sektörel Şablonlar (Faz 2) ---
    {
        id: 'sektor-kurumsal-buyume',
        ad: 'Granit',
        aciklama: 'Gri tonlar, mavi vurgular — SaaS tarzı profesyonel bilişim ve finans arayüzü.',
        minPaket: 'BUYUME',
        htmlKodu: sablonKurumsalBuyumeHtml,
        icon: '🏢',
        etiketler: ['Kurumsal', 'Finans', 'SaaS'],
        kategori: 'sektor',
        moduller: ['hakkimizda-hikaye', 'rakamlarla-biz', 'randevu', 'sertifika-belgeler', 'teklif-formu', 'google-yorumlar', 'musteri-referanslari', 'blog-makaleler', 'kariyer-ilanlari', 'yol-haritasi', 'calisma-saatleri', 'duyuru-bandi', 'eposta-bulteni', 'kvkk-gizlilik', 'cerez-bildirimi', 'sosyal-medya', 'whatsapp-canli', 'bize-ulasin-sticky']
    },
    {
        id: 'sektor-egitim-standart',
        ad: 'Kalem',
        aciklama: 'Sarı/lacivert, defter çizgi dokusu — kurslar ve akademiler için öğrenmeye davet.',
        minPaket: 'STANDART',
        htmlKodu: sablonEgitimStandartHtml,
        icon: '🎓',
        etiketler: ['Eğitim', 'Kurs', 'Akademi'],
        kategori: 'sektor',
        moduller: ['hakkimizda-hikaye', 'rakamlarla-biz', 'video-tanitim', 'sertifika-belgeler', 'teklif-formu', 'google-yorumlar', 'musteri-referanslari', 'blog-makaleler', 'kampanya-afisi', 'calisma-saatleri', 'duyuru-bandi', 'kvkk-gizlilik', 'cerez-bildirimi', 'sosyal-medya', 'whatsapp-canli', 'bize-ulasin-sticky']
    },
    {
        id: 'sektor-spor-premium',
        ad: 'Titan',
        aciklama: 'Neon yeşil/koyu karbon — spor salonları için enerji barları ve kaslı otorite tasarımı.',
        minPaket: 'PREMIUM',
        htmlKodu: sablonSporPremiumHtml,
        icon: '🏋️',
        etiketler: ['Spor', 'Neon', 'Enerji'],
        kategori: 'sektor',
        moduller: ['randevu', 'hakkimizda-hikaye', 'rakamlarla-biz', 'video-tanitim', 'sertifika-belgeler', 'teklif-formu', 'google-yorumlar', 'musteri-referanslari', 'blog-makaleler', 'yol-haritasi', 'calisma-saatleri', 'duyuru-bandi', 'kvkk-gizlilik', 'cerez-bildirimi', 'sosyal-medya', 'whatsapp-canli', 'bize-ulasin-sticky']
    },
    {
        id: 'sektor-vitrin-buyume',
        ad: 'Tül',
        aciklama: 'Siyah/beyaz editorial moda — serif fontlar, minimalist şıklıkla koleksiyon vitrini.',
        minPaket: 'BUYUME',
        htmlKodu: sablonVitrinBuyumeHtml,
        icon: '🛍️',
        etiketler: ['Moda', 'Butik', 'Editorial'],
        kategori: 'sektor',
        moduller: ['hakkimizda-hikaye', 'rakamlarla-biz', 'urun-listesi', 'indirim-kuponu', 'google-yorumlar', 'kampanya-afisi', 'harita-yol-tarifi', 'duyuru-bandi', 'eposta-bulteni', 'kvkk-gizlilik', 'cerez-bildirimi', 'sosyal-medya', 'whatsapp-canli']
    },
    
    // --- Sektörel Şablonlar (Faz 3 / Yeni Demolar) ---
    {
        id: 'sektor-saglik-premium',
        ad: 'Papatya',
        aciklama: 'Beyaz/mint yeşil, steril ferahlık — klinik ve sağlık kuruluşları için güven veren şifa tasarımı.',
        minPaket: 'PREMIUM',
        htmlKodu: sablonSaglikPremiumHtml,
        icon: '🏥',
        etiketler: ['Sağlık', 'Klinik', 'Steril'],
        kategori: 'sektor',
        moduller: ['randevu', 'online-danisma', 'ekip-uyeleri', 'sss-genis', 'acil-buton', 'canli-destek']
    },
    {
        id: 'sektor-eticaret-standart',
        ad: 'Sepet',
        aciklama: 'Ürün karusel, fiyat etiketleri — butik mağazalar için alışveriş odaklı dijital katalog.',
        minPaket: 'STANDART',
        htmlKodu: sablonEticaretStandartHtml,
        icon: '🛒',
        etiketler: ['E-Ticaret', 'Katalog', 'Alışveriş'],
        kategori: 'sektor',
        moduller: ['katalog', 'siparis-linki', 'sss-genis']
    },
    {
        id: 'sektor-otomotiv-buyume',
        ad: 'Pist',
        aciklama: 'Karbon fiber doku, kırmızı hız çizgileri — galeri ve rent a car için metalik showroom.',
        minPaket: 'BUYUME',
        htmlKodu: sablonOtomotivBuyumeHtml,
        icon: '🏎️',
        etiketler: ['Otomotiv', 'Karbon', 'Hız'],
        kategori: 'sektor',
        moduller: ['galeri', 'katalog', 'online-rezervasyon', 'arac-sorgulama']
    },
    {
        id: 'sektor-ajans-premium',
        ad: 'Prizma',
        aciklama: 'Neon gradient mesh, asimetrik layout — kreatif ajans ve yazılım firmaları için göz alıcı vitrin.',
        minPaket: 'PREMIUM',
        htmlKodu: sablonAjansPremiumHtml,
        icon: '💡',
        etiketler: ['Ajans', 'Neon', 'Asimetrik'],
        kategori: 'sektor',
        moduller: ['proje-portfoy', 'uyelik-paketleri', 'teklif-formu']
    },

    // --- Sektörel Şablonlar (Faz 4 / Yeni Demolar) ---
    {
        id: 'sektor-otel-premium',
        ad: 'Safir',
        aciklama: 'Altın/lacivert, otel lobby hissi — konaklama tesisleri için lüks oda kartları ve rezervasyon.',
        minPaket: 'PREMIUM',
        htmlKodu: sablonOtelPremiumHtml,
        icon: '🏨',
        etiketler: ['Otel', 'Altın', 'Lüks'],
        kategori: 'sektor',
        moduller: ['rakamlarla-biz', 'google-yorumlar', 'harita-yol-tarifi', 'duyuru-bandi', 'kvkk-gizlilik', 'cerez-bildirimi', 'whatsapp-canli']
    },
    {
        id: 'sektor-hukuk-buyume',
        ad: 'Terazi',
        aciklama: 'Koyu bordo/altın, kitap rafı dokusu — avukatlık büroları için ciddi ve güvenilir profesyonel tema.',
        minPaket: 'BUYUME',
        htmlKodu: sablonHukukBuyumeHtml,
        icon: '⚖️',
        etiketler: ['Hukuk', 'Bordo', 'Profesyonel'],
        kategori: 'sektor',
        moduller: ['online-danisma', 'blog-makaleler', 'sertifika-belgeler', 'teklif-formu', 'duyuru-bandi', 'kvkk-gizlilik', 'cerez-bildirimi', 'whatsapp-canli']
    },
    {
        id: 'sektor-market-standart',
        ad: 'Hasat',
        aciklama: 'Yeşil/turuncu, taze ürün hissi — bakkal ve mini marketler için aydınlık e-ticaret vitrini.',
        minPaket: 'STANDART',
        htmlKodu: sablonMarketStandartHtml,
        icon: '🛒',
        etiketler: ['Market', 'Taze', 'Yeşil'],
        kategori: 'sektor',
        moduller: ['eticaret-vitrin', 'kampanya-afisi', 'gunun-ozel', 'calisma-saatleri', 'duyuru-bandi', 'kvkk-gizlilik', 'cerez-bildirimi', 'whatsapp-canli']
    },

    // --- Yeni Nesil Mimari (Asansör Pilot) ---
    {
        id: 'asansor-engelli',
        ad: 'Erişim',
        aciklama: 'Saf HTML/Tailwind mimarisi. Engelli ve merdiven asansörlerine özel, ultra-hızlı temel sürüm.',
        minPaket: 'TEMEL',
        htmlKodu: '<div/>',
        icon: '🦽',
        etiketler: ['Asansör', 'Erişim', 'HTML'],
        kategori: 'sektor',
        moduller: []
    },
    {
        id: 'asansor-bina',
        ad: 'Vizyon',
        aciklama: 'Vanilla JS tab' + 'ları ve slider bileşenleri içeren, kurumsal asansör montaj firması şablonu.',
        minPaket: 'STANDART',
        htmlKodu: '<div/>',
        icon: '🏢',
        etiketler: ['Asansör', 'Bina', 'JS'],
        kategori: 'sektor',
        moduller: []
    },
    {
        id: 'asansor-yuk',
        ad: 'Ağır Yük',
        aciklama: 'Asimetrik CSS gridleri ve scroll animasyonlarıyla tasarlanmış endüstriyel yük platformu demosu.',
        minPaket: 'BUYUME',
        htmlKodu: '<div/>',
        icon: '🏗️',
        etiketler: ['Asansör', 'Endüstri', 'CSS'],
        kategori: 'sektor',
        moduller: []
    },
    {
        id: 'asansor-lux',
        ad: 'Elevate Lux',
        aciklama: 'Glassmorphism UI ve Framer Motion ile tasarlanmış Next.js lüks rezidans asansörü deneyimi.',
        minPaket: 'PREMIUM',
        htmlKodu: '<div/>',
        icon: '✨',
        etiketler: ['Asansör', 'Lüks', 'Motion'],
        kategori: 'sektor',
        moduller: []
    },
    {
        id: 'asansor-panoramik',
        ad: 'Orion 3D',
        aciklama: 'Awwwards seviyesi! Özelleştirilmiş manyetik imleç ve WebGL/Canvas destekli sonsuz kuyuda parallax yolculuğu.',
        minPaket: 'PREMIUMPLUS',
        htmlKodu: '<div/>',
        icon: '🌌',
        etiketler: ['Asansör', 'Canvas', 'WebGL'],
        kategori: 'sektor',
        moduller: []
    }
]

// Re-export unified catalog as the new primary SABLONLAR
export { UNIFIED_SABLONLAR as SABLONLAR } from './unified-catalog'
