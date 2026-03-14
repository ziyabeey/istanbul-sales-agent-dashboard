module.exports = [
"[project]/XinXia/apps/web/src/data/demoVitrinData.ts [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

/**
 * demoVitrinData.ts — 40 Sektör Demo Verisi + srcdoc Template Generator
 */ __turbopack_context__.s([
    "DEMOLAR",
    ()=>DEMOLAR,
    "KATEGORILER",
    ()=>KATEGORILER,
    "srcdocUret",
    ()=>srcdocUret
]);
const KATEGORILER = {
    'yerel-esnaf': {
        ad: 'Yerel Esnaf',
        sayi: 19
    },
    'profesyonel': {
        ad: 'Profesyonel',
        sayi: 11
    },
    'saglik-guzellik': {
        ad: 'Sağlık & Güzellik',
        sayi: 11
    },
    'etkinlik': {
        ad: 'Etkinlik',
        sayi: 1
    }
};
const DEMOLAR = [
    // ── YEREL ESNAF ──
    {
        id: 1,
        ad: 'Restoran & Lokanta',
        kategori: 'yerel-esnaf',
        bg: '#1e0f05',
        accent: '#c2440e',
        text: '#f5ede0',
        font: 'Cormorant Garamond',
        unsplash: 'photo-1414235077428-338989a2e8c0',
        heroBaslik: 'Ocakbaşı Sofrası',
        heroAlt: 'Büyükannenin tarifi, şefin elinden',
        hizmetler: [
            'Başlangıçlar',
            'Ana Yemekler',
            'Tatlılar'
        ]
    },
    {
        id: 2,
        ad: 'Kafe & Coffee Shop',
        kategori: 'yerel-esnaf',
        bg: '#faf4ed',
        accent: '#c2773a',
        text: '#2c1a0e',
        font: 'Playfair Display',
        unsplash: 'photo-1509042239860-f550ce710b93',
        heroBaslik: 'Filtre & Köpük',
        heroAlt: 'Her yudumda bir hikaye',
        hizmetler: [
            'Filtre Kahve',
            'Tatlılar',
            'Kahvaltı'
        ]
    },
    {
        id: 3,
        ad: 'Fırın & Pastane',
        kategori: 'yerel-esnaf',
        bg: '#fffdf7',
        accent: '#e8a030',
        text: '#3b2507',
        font: 'Abril Fatface',
        unsplash: 'photo-1509440159596-0249088772ff',
        heroBaslik: 'Un & Sıcaklık Pastanesi',
        heroAlt: 'Sabahın ilk ışığında pişer',
        hizmetler: [
            'Ekmekler',
            'Börekler',
            'Özel Pasta'
        ]
    },
    {
        id: 4,
        ad: 'Berber & Kuaför',
        kategori: 'yerel-esnaf',
        bg: '#0d0d0d',
        accent: '#b8960c',
        text: '#f2f2f2',
        font: 'Bebas Neue',
        unsplash: 'photo-1503951914875-452162b0f3f1',
        heroBaslik: 'Tıraş Atölyesi',
        heroAlt: 'Klasik tıraş, modern adam',
        hizmetler: [
            'Saç Kesimi',
            'Sakal',
            'Cilt Bakımı'
        ]
    },
    {
        id: 5,
        ad: 'Kadın Kuaförü',
        kategori: 'yerel-esnaf',
        bg: '#fdf8f9',
        accent: '#d4709a',
        text: '#2d1527',
        font: 'Cormorant',
        unsplash: 'photo-1560066984-138dadb4c035',
        heroBaslik: 'Papatya Güzellik Salonu',
        heroAlt: 'Güzelliğin en doğal hali',
        hizmetler: [
            'Saç',
            'Manikür',
            'Cilt Bakımı'
        ]
    },
    {
        id: 6,
        ad: 'Çiçekçi',
        kategori: 'yerel-esnaf',
        bg: '#f9f5f0',
        accent: '#c9856a',
        text: '#1a2e1c',
        font: 'Gilda Display',
        unsplash: 'photo-1487530811176-3780de880c2d',
        heroBaslik: 'Tomurcuk Floral',
        heroAlt: 'Her duygu bir çiçek kadar güzel',
        hizmetler: [
            'Günlük Buket',
            'Düğün',
            'Abonelik'
        ]
    },
    {
        id: 7,
        ad: 'Kasap & Et Market',
        kategori: 'yerel-esnaf',
        bg: '#fafaf8',
        accent: '#c53030',
        text: '#1c0a08',
        font: 'Syne',
        unsplash: 'photo-1607623814075-e51df1bdc82f',
        heroBaslik: 'Öz Anadolu Kasabı',
        heroAlt: 'Kökten gelen lezzet',
        hizmetler: [
            'Dana',
            'Kuzu',
            'Şarküteri'
        ]
    },
    {
        id: 8,
        ad: 'Kuru Temizleme',
        kategori: 'yerel-esnaf',
        bg: '#f0f8ff',
        accent: '#2e86de',
        text: '#0a2a4a',
        font: 'Outfit',
        unsplash: 'photo-1545173168-9f1947eebb7f',
        heroBaslik: 'Tertemiz Laundry',
        heroAlt: 'Kıyafetlerin en iyi hali',
        hizmetler: [
            'Yıkama',
            'Kuru Temizleme',
            'Express'
        ]
    },
    {
        id: 9,
        ad: 'Oto Servis',
        kategori: 'yerel-esnaf',
        bg: '#111111',
        accent: '#e63946',
        text: '#f5f5f5',
        font: 'Barlow Condensed',
        unsplash: 'photo-1486262715619-67b85e0b08d3',
        heroBaslik: 'Şahin Oto Merkezi',
        heroAlt: 'Aracın güvencesi, yolun ustası',
        hizmetler: [
            'Motor Bakım',
            'Kaporta',
            'Lastik'
        ]
    },
    {
        id: 10,
        ad: 'Elektrikçi & Tesisatçı',
        kategori: 'yerel-esnaf',
        bg: '#0a0a1a',
        accent: '#f5a623',
        text: '#e8e8f0',
        font: 'Rajdhani',
        unsplash: 'photo-1621905251189-08b45d6a269e',
        heroBaslik: 'Voltaj Teknik',
        heroAlt: '7/24 arızaya hazır',
        hizmetler: [
            'Elektrik',
            'Tesisat',
            'Doğalgaz'
        ]
    },
    {
        id: 11,
        ad: 'Mobilya & Dekorasyon',
        kategori: 'yerel-esnaf',
        bg: '#f7f3ee',
        accent: '#8b6f47',
        text: '#2a1f14',
        font: 'Fraunces',
        unsplash: 'photo-1555041469-a586c61ea9bc',
        heroBaslik: 'Form & Doku Mobilya',
        heroAlt: 'Yaşayan mekânlar, anlatılan hikayeler',
        hizmetler: [
            'Oturma Odası',
            'Yatak Odası',
            'Ofis'
        ]
    },
    {
        id: 12,
        ad: 'Terzi & Atölye',
        kategori: 'yerel-esnaf',
        bg: '#f8f5f0',
        accent: '#c9a84c',
        text: '#1e1b2e',
        font: 'Libre Baskerville',
        unsplash: 'photo-1558618666-fcd25c85f82e',
        heroBaslik: 'İnce İş Atölyesi',
        heroAlt: 'Her dikişte özen',
        hizmetler: [
            'Özel Dikim',
            'Tamir',
            'Nakış'
        ]
    },
    {
        id: 13,
        ad: 'Kırtasiye & Baskı',
        kategori: 'yerel-esnaf',
        bg: '#eae2b7',
        accent: '#003049',
        text: '#1a1a1a',
        font: 'Space Mono',
        unsplash: 'photo-1513364776144-60967b0f800f',
        heroBaslik: 'Nokta Baskı & Kırtasiye',
        heroAlt: 'Fikirleriniz kağıda dökülür',
        hizmetler: [
            'Dijital Baskı',
            'Kartvizit',
            'Ciltleme'
        ]
    },
    {
        id: 14,
        ad: 'Eczane',
        kategori: 'yerel-esnaf',
        bg: '#f1fffe',
        accent: '#00897b',
        text: '#004d40',
        font: 'Nunito',
        unsplash: 'photo-1631549916768-4119b2e5f926',
        heroBaslik: 'Sağlık Köşesi Eczanesi',
        heroAlt: 'Sağlığınız bizim önceliğimiz',
        hizmetler: [
            'Reçeteli İlaç',
            'Takviye',
            'Kozmetik'
        ]
    },
    // ── PROFESYONEL ──
    {
        id: 15,
        ad: 'Hukuk Bürosu',
        kategori: 'profesyonel',
        bg: '#f5f4f0',
        accent: '#c9a84c',
        text: '#1c2b3a',
        font: 'Libre Baskerville',
        unsplash: 'photo-1589829545856-d10d557cf95f',
        heroBaslik: 'Karaağaç Hukuk Bürosu',
        heroAlt: 'Haklarınız güçlü ellerde',
        hizmetler: [
            'Ceza Hukuku',
            'Aile Hukuku',
            'Ticaret Hukuku'
        ]
    },
    {
        id: 16,
        ad: 'Mali Müşavirlik',
        kategori: 'profesyonel',
        bg: '#f0f4f8',
        accent: '#2d8653',
        text: '#0f2044',
        font: 'Montserrat',
        unsplash: 'photo-1554224155-6726b3ff858f',
        heroBaslik: 'Güven Mali Müşavirlik',
        heroAlt: 'Rakamların arkasında güvenilir bir el',
        hizmetler: [
            'Vergi',
            'Bordro',
            'Şirket Kuruluşu'
        ]
    },
    {
        id: 17,
        ad: 'Mimarlık Ofisi',
        kategori: 'profesyonel',
        bg: '#f5f0eb',
        accent: '#c07941',
        text: '#1a1a1a',
        font: 'Syne',
        unsplash: 'photo-1487958449943-2429e8be8625',
        heroBaslik: 'Küp Mimarlık Atölyesi',
        heroAlt: 'Boşluğu anlama, mekânı dönüştürme',
        hizmetler: [
            'Konut',
            'Ticari',
            'Tadilat'
        ]
    },
    {
        id: 18,
        ad: 'Mühendislik',
        kategori: 'profesyonel',
        bg: '#0b1929',
        accent: '#00bcd4',
        text: '#e0f7fa',
        font: 'Exo 2',
        unsplash: 'photo-1581092160607-ee22621dd758',
        heroBaslik: 'Tekno Çözüm Mühendislik',
        heroAlt: 'Kompleks sorunlar, akıllı çözümler',
        hizmetler: [
            'Proje Yönetimi',
            'Yapı Denetimi',
            'Enerji'
        ]
    },
    {
        id: 19,
        ad: 'Sigorta Acentesi',
        kategori: 'profesyonel',
        bg: '#f8f9fa',
        accent: '#e87722',
        text: '#1a3a5c',
        font: 'Raleway',
        unsplash: 'photo-1450101499163-c8848c66ca85',
        heroBaslik: 'Kalkan Sigorta',
        heroAlt: 'Her riske karşı güvende olun',
        hizmetler: [
            'Kasko',
            'Sağlık',
            'Konut Sigortası'
        ]
    },
    {
        id: 20,
        ad: 'Emlak Ofisi',
        kategori: 'profesyonel',
        bg: '#f9f7f2',
        accent: '#d4af37',
        text: '#1b2838',
        font: 'Playfair Display',
        unsplash: 'photo-1560518883-ce09059eeffa',
        heroBaslik: 'Köşe Taşı Emlak',
        heroAlt: 'Doğru adres, doğru zaman',
        hizmetler: [
            'Satılık',
            'Kiralık',
            'Ticari'
        ]
    },
    {
        id: 21,
        ad: 'Dijital Ajans',
        kategori: 'profesyonel',
        bg: '#0a0a0f',
        accent: '#7c3aed',
        text: '#f0e6ff',
        font: 'Space Grotesk',
        unsplash: 'photo-1460925895917-afdab827c52f',
        heroBaslik: 'Pulse Digital Ajans',
        heroAlt: 'Markanı büyüt, rakiplerine bak',
        hizmetler: [
            'SEO',
            'Meta Ads',
            'Web Tasarım'
        ]
    },
    {
        id: 22,
        ad: 'Dershane & Kurs',
        kategori: 'profesyonel',
        bg: '#f0f4ff',
        accent: '#4f46e5',
        text: '#1a2744',
        font: 'Nunito',
        unsplash: 'photo-1524178232363-1fb2b075b655',
        heroBaslik: 'Zirve Eğitim Merkezi',
        heroAlt: 'Başarı bir adım ötede',
        hizmetler: [
            'YKS',
            'KPSS',
            'İngilizce'
        ]
    },
    {
        id: 23,
        ad: 'Tercüme Bürosu',
        kategori: 'profesyonel',
        bg: '#ecf0f1',
        accent: '#e74c3c',
        text: '#2c3e50',
        font: 'Josefin Sans',
        unsplash: 'photo-1456513080510-7bf3a84b82f8',
        heroBaslik: 'Lingua Çeviri Akademisi',
        heroAlt: 'Diller arasında köprü kuruyoruz',
        hizmetler: [
            'Noterli Çeviri',
            'Simultane',
            'Dil Kursları'
        ]
    },
    {
        id: 24,
        ad: 'Fotoğrafçı',
        kategori: 'profesyonel',
        bg: '#111111',
        accent: '#ff6b35',
        text: '#f5f5f5',
        font: 'Oswald',
        unsplash: 'photo-1471341971476-ae15ff5dd4ea',
        heroBaslik: 'Kare Prodüksiyon',
        heroAlt: 'Her anı sanat eserine dönüştürün',
        hizmetler: [
            'Düğün',
            'Kurumsal',
            'Ürün Çekimi'
        ]
    },
    {
        id: 25,
        ad: 'Yazılım Şirketi',
        kategori: 'profesyonel',
        bg: '#030712',
        accent: '#10b981',
        text: '#f0fdf4',
        font: 'Inter',
        unsplash: 'photo-1461749280684-dccba630e2f6',
        heroBaslik: 'Nexus Yazılım',
        heroAlt: 'Kodu değil, çözümü teslim ederiz',
        hizmetler: [
            'Web',
            'Mobil App',
            'API Geliştirme'
        ]
    },
    // ── SAĞLIK & GÜZELLİK ──
    {
        id: 26,
        ad: 'Diş Kliniği',
        kategori: 'saglik-guzellik',
        bg: '#f0fbf9',
        accent: '#00c9a7',
        text: '#0d4f7c',
        font: 'Poppins',
        unsplash: 'photo-1629909613654-28e377c37b09',
        heroBaslik: 'Beyaz Gülüş Polikliniği',
        heroAlt: 'Sağlıklı dişler, özgür gülüşler',
        hizmetler: [
            'İmplant',
            'Ortodonti',
            'Beyazlatma'
        ]
    },
    {
        id: 27,
        ad: 'Özel Klinik',
        kategori: 'saglik-guzellik',
        bg: '#f4fbfc',
        accent: '#4db8d4',
        text: '#1a3a4a',
        font: 'Outfit',
        unsplash: 'photo-1519494026892-80bbd2d6fd0d',
        heroBaslik: 'Anadolu Sağlık Kliniği',
        heroAlt: 'Sağlığınız profesyonel ellerde',
        hizmetler: [
            'Dahiliye',
            'Kardiyoloji',
            'Check-Up'
        ]
    },
    {
        id: 28,
        ad: 'Fizyoterapi',
        kategori: 'saglik-guzellik',
        bg: '#f0faf4',
        accent: '#52b788',
        text: '#1b4332',
        font: 'Nunito',
        unsplash: 'photo-1576091160550-2173dba999ef',
        heroBaslik: 'Hareket Fizyoterapi',
        heroAlt: 'Ağrıdan harekete, hareketten özgürlüğe',
        hizmetler: [
            'Manuel Terapi',
            'Sporcu Rehab',
            'Skolyoz'
        ]
    },
    {
        id: 29,
        ad: 'Diyetisyen',
        kategori: 'saglik-guzellik',
        bg: '#f6fbf0',
        accent: '#7bc950',
        text: '#2d4a22',
        font: 'Quicksand',
        unsplash: 'photo-1512621776951-a57141f2eefd',
        heroBaslik: 'Denge Beslenme Danışmanlığı',
        heroAlt: 'Sağlıklı vücut, dengeli yaşam',
        hizmetler: [
            'Kilo Yönetimi',
            'Sporcu Beslenmesi',
            'Online'
        ]
    },
    {
        id: 30,
        ad: 'Spor Salonu',
        kategori: 'saglik-guzellik',
        bg: '#0a0a0a',
        accent: '#ff3c00',
        text: '#ffffff',
        font: 'Anton',
        unsplash: 'photo-1534438327276-14e5300c3a48',
        heroBaslik: 'Iron Force Gym',
        heroAlt: 'Limitlerini zorla, kendinle kazan',
        hizmetler: [
            'Kişisel Antrenman',
            'Grup Dersi',
            'Beslenme'
        ]
    },
    {
        id: 31,
        ad: 'Yoga & Pilates',
        kategori: 'saglik-guzellik',
        bg: '#e7f6f2',
        accent: '#4a9e8e',
        text: '#2c3639',
        font: 'Cormorant Garamond',
        unsplash: 'photo-1544367567-0f2fcb009e0b',
        heroBaslik: 'Nefes Yoga Stüdyo',
        heroAlt: 'Bedenini dinle, zihnini özgür bırak',
        hizmetler: [
            'Hatha',
            'Vinyasa',
            'Reformer Pilates'
        ]
    },
    {
        id: 32,
        ad: 'Estetik Kliniği',
        kategori: 'saglik-guzellik',
        bg: '#fdf6f6',
        accent: '#c9a0a0',
        text: '#1a0f12',
        font: 'Gilda Display',
        unsplash: 'photo-1570172619644-dfd03ed5d881',
        heroBaslik: 'Aura Estetik Kliniği',
        heroAlt: 'Doğal güzelliğini keşfet',
        hizmetler: [
            'Botoks',
            'Dolgu',
            'Lazer Epilasyon'
        ]
    },
    {
        id: 33,
        ad: 'Psikolog',
        kategori: 'saglik-guzellik',
        bg: '#f5f7fb',
        accent: '#7b9bb8',
        text: '#2e3250',
        font: 'Lora',
        unsplash: 'photo-1573497019940-1c28c88b4f3e',
        heroBaslik: 'Güvenli Alan Psikoloji',
        heroAlt: 'Dinlenecek biri var, yardım alınabilir',
        hizmetler: [
            'Bireysel Terapi',
            'Çift Terapisi',
            'Online Seans'
        ]
    },
    {
        id: 34,
        ad: 'Veteriner Kliniği',
        kategori: 'saglik-guzellik',
        bg: '#fff8f2',
        accent: '#f4a261',
        text: '#1b3a4b',
        font: 'Nunito',
        unsplash: 'photo-1548199973-03cce0bbc87b',
        heroBaslik: 'Patici Veteriner Kliniği',
        heroAlt: 'Dostlarınıza en iyi bakım',
        hizmetler: [
            'Aşı',
            'Ameliyat',
            'Otelcilik'
        ]
    },
    {
        id: 35,
        ad: 'Masaj & Spa',
        kategori: 'saglik-guzellik',
        bg: '#f4f1eb',
        accent: '#8b7355',
        text: '#2c2418',
        font: 'Cormorant Garamond',
        unsplash: 'photo-1544161515-4ab6ce6db874',
        heroBaslik: 'Serenity Spa',
        heroAlt: 'Bedeninize huzur, zihninize dinlenme',
        hizmetler: [
            'Aromaterapi',
            'Taş Masajı',
            'Çift Masajı'
        ]
    },
    // ── YENİ YEREL ESNAF ──
    {
        id: 36,
        ad: 'Oto Yıkama',
        kategori: 'yerel-esnaf',
        bg: '#0c1a2e',
        accent: '#38bdf8',
        text: '#e0f2fe',
        font: 'Exo 2',
        unsplash: 'photo-1520340356584-f9917d1eea6f',
        heroBaslik: 'Aqua Clean Oto Yıkama',
        heroAlt: 'Aracınıza showroom parlaklığı',
        hizmetler: [
            'İç Temizlik',
            'Pasta Cila',
            'Detaylı Yıkama'
        ]
    },
    {
        id: 37,
        ad: 'Nakliyeci',
        kategori: 'yerel-esnaf',
        bg: '#1a0f05',
        accent: '#f59e0b',
        text: '#fef3c7',
        font: 'Barlow Condensed',
        unsplash: 'photo-1586528116311-ad8dd3c8310d',
        heroBaslik: 'Güven Nakliyat',
        heroAlt: 'Taşınmak artık stressiz',
        hizmetler: [
            'Ev Taşıma',
            'Ofis Taşıma',
            'Depolama'
        ]
    },
    {
        id: 38,
        ad: 'Temizlik Şirketi',
        kategori: 'yerel-esnaf',
        bg: '#f0fdf4',
        accent: '#22c55e',
        text: '#14532d',
        font: 'Nunito',
        unsplash: 'photo-1581578731548-c64695cc6952',
        heroBaslik: 'Pırıl Temizlik',
        heroAlt: 'Profesyonel temizlik garantisi',
        hizmetler: [
            'Ev Temizliği',
            'Ofis',
            'Dezenfeksiyon'
        ]
    },
    {
        id: 39,
        ad: 'Boyacı',
        kategori: 'yerel-esnaf',
        bg: '#fdf6e3',
        accent: '#d97706',
        text: '#451a03',
        font: 'Outfit',
        unsplash: 'photo-1562259929-b4e1fd3aef09',
        heroBaslik: 'Renk Ustası Boya',
        heroAlt: 'Mekanınıza renk katıyoruz',
        hizmetler: [
            'İç Cephe',
            'Dış Cephe',
            'Dekoratif Boya'
        ]
    },
    {
        id: 40,
        ad: 'Camcı',
        kategori: 'yerel-esnaf',
        bg: '#f0f9ff',
        accent: '#0284c7',
        text: '#0c4a6e',
        font: 'Raleway',
        unsplash: 'photo-1596079890744-c1a0462d0975',
        heroBaslik: 'Kristal Cam',
        heroAlt: 'Cam ve pencere çözümleri',
        hizmetler: [
            'Cam Balkon',
            'Isıcam',
            'Ayna Kesimi'
        ]
    },
    // ── ETKİNLİK ──
    {
        id: 41,
        ad: 'Organizasyon & Düğün',
        kategori: 'etkinlik',
        bg: '#1a0a2e',
        accent: '#a855f7',
        text: '#f5f3ff',
        font: 'Playfair Display',
        unsplash: 'photo-1519741497674-611481863552',
        heroBaslik: 'Peri Masalı Organizasyon',
        heroAlt: 'Unutulmaz anlar, kusursuz organizasyon',
        hizmetler: [
            'Düğün',
            'Nişan',
            'Kurumsal'
        ]
    }
];
// ── srcdoc Template Generator ──────────────────────────────────────────────
function isDark(bg) {
    const hex = bg.replace('#', '');
    const r = parseInt(hex.substring(0, 2), 16);
    const g = parseInt(hex.substring(2, 4), 16);
    const b = parseInt(hex.substring(4, 6), 16);
    return r * 0.299 + g * 0.587 + b * 0.114 < 128;
}
function srcdocUret(d) {
    const dark = isDark(d.bg);
    const navBg = dark ? 'rgba(0,0,0,0.5)' : 'rgba(255,255,255,0.85)';
    const navBorder = dark ? 'rgba(255,255,255,0.08)' : 'rgba(0,0,0,0.08)';
    const cardBg = dark ? 'rgba(255,255,255,0.05)' : 'rgba(0,0,0,0.03)';
    const cardBorder = dark ? 'rgba(255,255,255,0.08)' : 'rgba(0,0,0,0.06)';
    const subText = dark ? 'rgba(255,255,255,0.5)' : 'rgba(0,0,0,0.5)';
    const footBg = dark ? 'rgba(255,255,255,0.03)' : 'rgba(0,0,0,0.03)';
    const hizmetIkonlar = [
        '🎯',
        '⭐',
        '💎'
    ];
    return `<!DOCTYPE html><html lang="tr"><head><meta charset="UTF-8"><meta name="viewport" content="width=device-width,initial-scale=1.0"><link href="https://fonts.googleapis.com/css2?family=${d.font.replace(/ /g, '+')}:wght@400;600;700;800;900&display=swap" rel="stylesheet"><style>*{margin:0;padding:0;box-sizing:border-box}body{font-family:'${d.font}',sans-serif;background:${d.bg};color:${d.text};overflow-x:hidden}a{color:inherit;text-decoration:none}.nav{position:sticky;top:0;z-index:50;padding:18px 48px;display:flex;justify-content:space-between;align-items:center;background:${navBg};backdrop-filter:blur(12px);border-bottom:1px solid ${navBorder}}.nav-logo{font-size:1.5rem;font-weight:900;letter-spacing:-0.03em}.nav-links{display:flex;gap:28px;font-size:0.95rem;font-weight:500;color:${subText}}.hero{position:relative;min-height:85vh;display:flex;align-items:center;justify-content:center;text-align:center;padding:80px 40px;overflow:hidden}.hero-bg{position:absolute;inset:0;background:url('https://images.unsplash.com/${d.unsplash}?w=1440&q=75&auto=format') center/cover no-repeat}.hero-overlay{position:absolute;inset:0;background:linear-gradient(to bottom,${d.bg}cc 0%,${d.bg}99 40%,${d.bg}ee 100%)}.hero-content{position:relative;z-index:2;max-width:800px}.hero h1{font-size:4rem;font-weight:900;line-height:1.05;margin-bottom:20px;letter-spacing:-0.03em}.hero p{font-size:1.3rem;color:${subText};margin-bottom:40px;line-height:1.6}.hero .cta{display:inline-flex;gap:12px}.hero .btn{padding:16px 36px;border-radius:10px;font-weight:700;font-size:1rem;border:none;cursor:pointer;transition:transform 0.2s}.btn-primary{background:${d.accent};color:#fff}.btn-outline{background:transparent;border:1.5px solid ${d.accent};color:${d.accent}}.services{padding:100px 48px;max-width:1200px;margin:0 auto}.services h2{font-size:2.5rem;font-weight:800;text-align:center;margin-bottom:60px}.services-grid{display:grid;grid-template-columns:repeat(3,1fr);gap:28px}.service-card{background:${cardBg};border:1px solid ${cardBorder};border-radius:18px;padding:40px 32px;text-align:center;transition:transform 0.3s}.service-card:hover{transform:translateY(-6px)}.service-card .icon{font-size:2.5rem;margin-bottom:16px}.service-card h3{font-size:1.3rem;font-weight:700;margin-bottom:10px}.service-card p{font-size:0.9rem;color:${subText};line-height:1.6}.testimonial{padding:80px 48px;text-align:center;background:${footBg}}.testimonial blockquote{max-width:600px;margin:0 auto;font-size:1.2rem;font-style:italic;line-height:1.7;color:${subText}}.testimonial .author{margin-top:20px;font-weight:700;font-size:0.95rem}.footer{padding:30px 48px;text-align:center;font-size:0.85rem;color:${subText};border-top:1px solid ${cardBorder}}</style></head><body><nav class="nav"><div class="nav-logo">${d.heroBaslik.split(' ')[0]}<span style="color:${d.accent}">.</span></div><div class="nav-links"><a>Anasayfa</a><a>Hizmetler</a><a>Hakkımızda</a><a>İletişim</a></div></nav><section class="hero"><div class="hero-bg"></div><div class="hero-overlay"></div><div class="hero-content"><h1>${d.heroBaslik}</h1><p>${d.heroAlt}</p><div class="cta"><button class="btn btn-primary">Randevu Al</button><button class="btn btn-outline">Bizi Arayın</button></div></div></section><section class="services"><h2>Hizmetlerimiz</h2><div class="services-grid">${d.hizmetler.map((h, i)=>`<div class="service-card"><div class="icon">${hizmetIkonlar[i]}</div><h3>${h}</h3><p>Alanında uzman ekibimizle profesyonel ${h.toLowerCase()} hizmeti sunuyoruz.</p></div>`).join('')}</div></section><section class="testimonial"><blockquote>"Harika bir deneyimdi. Profesyonel kadroları ve kaliteli hizmetleriyle her zaman tercihim olacak."</blockquote><div class="author">— Mehmet K. ⭐⭐⭐⭐⭐</div></section><footer class="footer">© 2025 ${d.heroBaslik} · Powered by kepenk.ai</footer></body></html>`;
}
}),
"[project]/XinXia/apps/web/src/utils/demoHtmlUretici.ts [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

/**
 * demoHtmlUretici.ts — Dünya Standartlarında Demo Site HTML Üretici
 *
 * Her sektör için referans sitelerden ilham alarak unique HTML üretir.
 * Noma, Stripe, Linear, Tend, Equinox, Blind Barber... estetiğinde.
 */ __turbopack_context__.s([
    "DEMO_MODAL_HTML",
    ()=>DEMO_MODAL_HTML,
    "DEMO_SCRIPT",
    ()=>DEMO_SCRIPT,
    "demoHtmlUret",
    ()=>demoHtmlUret
]);
// ── Yardımcılar ───────────────────────────────────────────────────
function isDark(bg) {
    const hex = bg.replace('#', '');
    const r = parseInt(hex.substring(0, 2), 16);
    const g = parseInt(hex.substring(2, 4), 16);
    const b = parseInt(hex.substring(4, 6), 16);
    return r * 0.299 + g * 0.587 + b * 0.114 < 128;
}
function rgba(hex, a) {
    const h = hex.replace('#', '');
    return `rgba(${parseInt(h.substring(0, 2), 16)},${parseInt(h.substring(2, 4), 16)},${parseInt(h.substring(4, 6), 16)},${a})`;
}
// ── Sektör İkon Seti ──────────────────────────────────────────────
const IK = {
    1: [
        '🍖',
        '🔥',
        '🫕'
    ],
    2: [
        '☕',
        '🍰',
        '🥐'
    ],
    3: [
        '🥖',
        '🧁',
        '🎂'
    ],
    4: [
        '✂️',
        '💈',
        '🪒'
    ],
    5: [
        '💇‍♀️',
        '💅',
        '✨'
    ],
    6: [
        '🌹',
        '💐',
        '🌸'
    ],
    7: [
        '🥩',
        '🐄',
        '🔪'
    ],
    8: [
        '👔',
        '✨',
        '⏱'
    ],
    9: [
        '🔧',
        '🚗',
        '⚡'
    ],
    10: [
        '⚡',
        '💡',
        '🔌'
    ],
    11: [
        '🛋️',
        '🪑',
        '🏠'
    ],
    12: [
        '🧵',
        '✂️',
        '👔'
    ],
    13: [
        '🖨️',
        '📇',
        '📎'
    ],
    14: [
        '💊',
        '💉',
        '🩺'
    ],
    15: [
        '⚖️',
        '📜',
        '🏛️'
    ],
    16: [
        '📊',
        '💰',
        '📋'
    ],
    17: [
        '📐',
        '🏗️',
        '🖊️'
    ],
    18: [
        '⚙️',
        '🔬',
        '🏗️'
    ],
    19: [
        '🛡️',
        '📋',
        '🏠'
    ],
    20: [
        '🏡',
        '🗝️',
        '📍'
    ],
    21: [
        '🎨',
        '📱',
        '📈'
    ],
    22: [
        '📚',
        '🎯',
        '🏆'
    ],
    23: [
        '🌐',
        '📝',
        '🗣️'
    ],
    24: [
        '📸',
        '🎬',
        '💡'
    ],
    25: [
        '💻',
        '📱',
        '☁️'
    ],
    26: [
        '🧠',
        '💬',
        '🌿'
    ],
    27: [
        '🦷',
        '😁',
        '🪥'
    ],
    28: [
        '🏥',
        '👨‍⚕️',
        '💊'
    ],
    29: [
        '🏃',
        '💪',
        '🦴'
    ],
    30: [
        '🥗',
        '⚖️',
        '🍎'
    ],
    31: [
        '💪',
        '🏋️',
        '🔥'
    ],
    32: [
        '🧘',
        '🕯️',
        '☮️'
    ],
    33: [
        '✨',
        '💎',
        '🌟'
    ],
    34: [
        '🐾',
        '🐕',
        '❤️'
    ],
    35: [
        '💆',
        '🧖',
        '🌿'
    ],
    36: [
        '🚗',
        '💧',
        '✨'
    ],
    37: [
        '🚛',
        '📦',
        '🏠'
    ],
    38: [
        '🧹',
        '🧴',
        '✨'
    ],
    39: [
        '🖌️',
        '🎨',
        '🏠'
    ],
    40: [
        '🪟',
        '🔲',
        '🏗️'
    ],
    41: [
        '🎉',
        '💒',
        '🥂'
    ]
};
const ICERIKLER = {
    // ── 01: RESTORAN (Noma × EMP) ──
    1: {
        badge: 'Karaköy · 1987\'den beri',
        altBaslik: 'Üç kuşaktır ocak başında, İstanbul\'un kalbinde',
        stats: [
            [
                '37',
                'Yıllık Deneyim'
            ],
            [
                '15.000+',
                'Misafir / Yıl'
            ],
            [
                '4.9',
                'Google Puanı'
            ],
            [
                '6',
                'Menü Kategorisi'
            ]
        ],
        yorum: 'Mangal lezzetinin bu kadar zarif sunulabileceğini burada öğrendim. Atmosfer, servis, lezzet — kusursuz.',
        yorumcu: 'Ahmet B.',
        ctaBaslik: 'Masa Rezervasyonu',
        ctaAciklama: 'Her akşam 18:00 — 23:00 · Pazar kapalı · Karaköy, İstanbul',
        ctaButon: '📞 Hemen Rezervasyon',
        hizmetAciklama: [
            'Anadolu\'nun en seçkin başlangıçları, taze otlar ve zeytinyağı ile',
            'Meşe kömüründe pişen etler, geleneksel Ocakbaşı ustalığı ile',
            'Şefimizin özel tatlı kreasyonları, mevsim meyvesi ile'
        ],
        menuBaslik: 'Menüden Seçmeler',
        menuItems: [
            {
                ad: 'Kuzu Tandır',
                fiyat: '₺420',
                aciklama: 'Odunlu fırında 8 saat pişen kuzu'
            },
            {
                ad: 'Adana Kebap',
                fiyat: '₺320',
                aciklama: 'El kıyması, acılı biber, lavaş'
            },
            {
                ad: 'Patlıcan Kebabı',
                fiyat: '₺290',
                aciklama: 'Közlenmiş patlıcan, dana kıyma'
            }
        ]
    },
    // ── 02: KAFE (Blue Bottle × Stumptown) ──
    2: {
        badge: 'Kadıköy · 3. Dalga Kahve',
        altBaslik: 'Özenle seçilmiş çekirdekler, barista ustalığıyla',
        stats: [
            [
                '8',
                'Yıldır Kadıköy\'de'
            ],
            [
                '12',
                'Çeşit Origin'
            ],
            [
                '4.8',
                'Google Puanı'
            ],
            [
                '350+',
                'Günlük Fincan'
            ]
        ],
        yorum: 'Kadıköy\'ün en iyi filtre kahvesi burada. V60 ile yapılan Ethiopia Yirgacheffe\'yi mutlaka deneyin.',
        yorumcu: 'Elif S.',
        ctaBaslik: 'Bize Uğrayın',
        ctaAciklama: 'Hafta içi 08:00 — 22:00 · Hafta sonu 09:00 — 23:00 · Kadıköy Moda',
        ctaButon: '☕ Menüyü Gör',
        hizmetAciklama: [
            'V60, Chemex, Aeropress ile özenle demlenen filtre kahveler',
            'Ev yapımı cheesecake, brownie, cookie — her gün taze',
            'Sourdough ekmek, avokado, granola ile weekend brunch'
        ],
        menuBaslik: 'Popüler İçecekler',
        menuItems: [
            {
                ad: 'V60 Pour Over',
                fiyat: '₺120',
                aciklama: 'Tek origin, el demleme'
            },
            {
                ad: 'Flat White',
                fiyat: '₺95',
                aciklama: 'Çift shot, velvet köpük'
            },
            {
                ad: 'Cold Brew',
                fiyat: '₺110',
                aciklama: '18 saat demleme, buz üstü'
            }
        ]
    },
    // ── 03: FIRIN (Tartine × Dominique Ansel) ──
    3: {
        badge: 'Moda · 1994\'ten beri',
        altBaslik: 'Her sabah taze, her hamur sevgiyle yoğrulur',
        stats: [
            [
                '30',
                'Yıllık Gelenek'
            ],
            [
                '200+',
                'Günlük Ekmek'
            ],
            [
                '18',
                'Çeşit Börek'
            ],
            [
                '4.9',
                'Google Puanı'
            ]
        ],
        yorum: 'Ekşi maya ekmeği için İstanbul\'un karşı yakasından geliyorum. Hamur işlerinde gerçekten usta.',
        yorumcu: 'Zeynep A.',
        ctaBaslik: 'Özel Sipariş',
        ctaAciklama: 'Doğum günü pastası, düğün pastası — 48 saat önceden sipariş',
        ctaButon: '🎂 Pasta Siparişi',
        hizmetAciklama: [
            'Ekşi maya, tam buğday, çavdar — günlük taze pişirim',
            'Su böreği, kol böreği, puf böreği — anneannemizin tarifleri',
            'Profiterol, San Sebastian, Tart — patisserie ustalığı ile'
        ],
        menuBaslik: 'Bugün Ne Pişti?',
        menuItems: [
            {
                ad: 'Ekşi Maya Ekmek',
                fiyat: '₺45',
                aciklama: '24 saat fermente, odun fırını'
            },
            {
                ad: 'Fıstıklı Baklava',
                fiyat: '₺85',
                aciklama: 'Antep fıstığı, 40 kat yufka'
            },
            {
                ad: 'San Sebastian',
                fiyat: '₺120',
                aciklama: 'Bask usulü yanık cheesecake'
            }
        ]
    },
    // ── 04: BERBER (Blind Barber × Fellow) ──
    4: {
        badge: 'Cihangir · MCMXCVIII',
        altBaslik: 'Bir tıraş, bir kahve, bir sohbet',
        stats: [
            [
                '26',
                'Yıllık Deneyim'
            ],
            [
                '40+',
                'Günlük Müşteri'
            ],
            [
                '4.9',
                'Google Puanı'
            ],
            [
                '3',
                'Usta Berber'
            ]
        ],
        yorum: 'Düz jilet tıraşı için İstanbul\'un en iyi adresi. Atmosfer tam bir speakeasy.',
        yorumcu: 'Can D.',
        ctaBaslik: 'Randevu Al',
        ctaAciklama: 'Her gün 09:00 — 21:00 · Cihangir, Beyoğlu',
        ctaButon: '💈 Randevu',
        hizmetAciklama: [
            'Klasik makasla kesim, modern ya da vintage — sizin tercihiniz',
            'Düz jilet, sıcak havlu, bay rum — geleneksel deneyim',
            'Temizleme, nemlendirme, maske — erkeğe özel bakım'
        ]
    },
    // ── 05: KADIN KUAFÖRÜ (Sassoon × Josié) ──
    5: {
        badge: 'Nişantaşı · 2012',
        altBaslik: 'Güzelliğin en doğal hali, uzman ellerle',
        stats: [
            [
                '12',
                'Yıllık Deneyim'
            ],
            [
                '8',
                'Uzman Stilist'
            ],
            [
                '4.8',
                'Google Puanı'
            ],
            [
                '200+',
                'Haftalık Misafir'
            ]
        ],
        yorum: 'Saç boyası konusunda çok titizim, Papatya\'da her seferinde istediğim sonucu alıyorum.',
        yorumcu: 'Ayşe M.',
        ctaBaslik: 'Online Randevu',
        ctaAciklama: 'Pazartesi hariç her gün 10:00 — 20:00',
        ctaButon: '✨ Randevu Al',
        hizmetAciklama: [
            'Kesim, fön, saç bakımı — kişiye özel stil danışmanlığı',
            'Jel, kalıcı oje, protez tırnak — hijyenik ortamda',
            'Hydrafacial, cilt analizi, anti-aging — profesyonel cihazlar'
        ]
    },
    // ── 06: ÇİÇEKÇİ (Flowerbx × Bloom&Wild) ──
    6: {
        badge: 'Bebek · Ertesi Gün Teslimat',
        altBaslik: 'Her çiçeği ellerimizle seçiyor, her buketi kalbimizle bağlıyoruz',
        stats: [
            [
                '8',
                'Yıldır Bebek\'te'
            ],
            [
                '50+',
                'Çeşit Çiçek'
            ],
            [
                'Aynı Gün',
                'Teslimat'
            ],
            [
                '4.9',
                'Google Puanı'
            ]
        ],
        yorum: 'Düğün çiçeklerimiz Tomurcuk\'tan. Hayal ettiğimizin ötesinde bir dekorasyon yaptılar.',
        yorumcu: 'Selin K.',
        ctaBaslik: 'Buket Sipariş',
        ctaAciklama: 'İstanbul Avrupa yakası aynı gün · Anadolu yakası ertesi gün',
        ctaButon: '🌹 Buket Seç',
        hizmetAciklama: [
            'Mevsim çiçekleri ile günlük buketler — ₺150\'den başlayan',
            'Gelin buketi, masa aranjmanı, mekan süsleme',
            'Haftalık ev/ofis çiçeği — abone olun, her cuma kapınızda'
        ]
    },
    // ── 07: KASAP ──
    7: {
        badge: 'Fatih · 1962\'den beri',
        altBaslik: 'Üç kuşaktır aynı el, aynı özen — kökten gelen lezzet',
        stats: [
            [
                '62',
                'Yıllık Gelenek'
            ],
            [
                '500+',
                'Günlük Müşteri'
            ],
            [
                '4.9',
                'Google Puanı'
            ],
            [
                '3',
                'Kuşak'
            ]
        ],
        yorum: 'Sucuk ve pastırması efsane. 60 yıllık geleneklerini koruyorlar.',
        yorumcu: 'Oğuz T.',
        ctaBaslik: 'Sipariş Ver',
        ctaAciklama: 'Sabah 07:00 — Akşam 20:00 · Pazar açık · Fatih, İstanbul',
        ctaButon: '🥩 Sipariş',
        hizmetAciklama: [
            'Yerli ırk, doğal besleme — kalite garantili dana eti',
            'Taze kuzu, kemiksiz but, pirzola — her gün taze kesilir',
            'Ev yapımı sucuk, pastırma, kavurma — geleneksel tarifler'
        ],
        menuBaslik: 'Günün Taze Geleni',
        menuItems: [
            {
                ad: 'Dana Antrikot',
                fiyat: '₺380/kg',
                aciklama: 'Yerli ırk, 21 gün olgunlaştırılmış'
            },
            {
                ad: 'Kuzu Pirzola',
                fiyat: '₺450/kg',
                aciklama: 'Taze kesilmiş, kemikli'
            },
            {
                ad: 'Ev Sucuğu',
                fiyat: '₺320/kg',
                aciklama: 'Doğal bağırsak, 30 baharatlı'
            }
        ]
    },
    // ── 08: KURU TEMİZLEME ──
    8: {
        badge: 'Şişli · 3 Adımda Temizlik',
        altBaslik: 'Kıyafetleriniz profesyonel ellerde, zamanında teslim',
        stats: [
            [
                '18',
                'Yıllık Deneyim'
            ],
            [
                '10.000+',
                'Müşteri'
            ],
            [
                '24s',
                'Express Hizmet'
            ],
            [
                '30',
                'İlçeye Servis'
            ]
        ],
        yorum: 'Kapıdan alıp teslim ediyorlar, ütü kalitesi mükemmel.',
        yorumcu: 'Deniz Y.',
        ctaBaslik: 'Sipariş Ver',
        ctaAciklama: 'İstanbul\'un 30 ilçesine kapıdan servis · WhatsApp ile sipariş',
        ctaButon: '👔 Sipariş',
        hizmetAciklama: [
            'Gömlek, elbise, kaban — hassas kumaşlara özel işlem',
            'Yıkama, kurutma, ütü, katlama — tek pakette',
            'Sabah al, akşam teslim — acil işleriniz için'
        ]
    },
    // ── 09: OTO SERVİS ──
    9: {
        badge: 'Bağcılar · 7/24 Açık',
        altBaslik: 'Aracınız güvende, yolunuz açık — 22 yıllık deneyim',
        stats: [
            [
                '22',
                'Yıl Deneyim'
            ],
            [
                '15.000+',
                'Araç Servisi'
            ],
            [
                '%98',
                'Memnuniyet'
            ],
            [
                '3',
                'Usta Teknisyen'
            ]
        ],
        yorum: 'Kasko hasar işlemlerini bile hallettiler. Güvenilir ve hızlı.',
        yorumcu: 'Emre K.',
        ctaBaslik: 'Acil Servis',
        ctaAciklama: '7/24 ACİL HATTI: 0212 555 0111 · Bağcılar, İstanbul',
        ctaButon: '🔧 Hemen Ara',
        hizmetAciklama: [
            'Periyodik bakım, yağ değişimi, fren kontrolü — güvenli sürüş',
            'Boyasız göçük, boya, parlatma — profesyonel ekipman',
            'Mevsimlik değişim, balans, rot-balans — TSE onaylı'
        ]
    },
    // ── 10: ELEKTRİKÇİ ──
    10: {
        badge: 'Kadıköy · Acil Servis',
        altBaslik: '7/24 arızaya hazır — ortalama 45 dakikada kapınızdayız',
        stats: [
            [
                '15',
                'Yıl Deneyim'
            ],
            [
                '8.000+',
                'Servis'
            ],
            [
                '45dk',
                'Ort. Varış'
            ],
            [
                '7/24',
                'Açık'
            ]
        ],
        yorum: 'Gece yarısı sigorta attı, 30 dakikada geldiler. Profesyonel iş.',
        yorumcu: 'Hakan S.',
        ctaBaslik: 'Acil Arıza Hattı',
        ctaAciklama: '0216 555 0199 · Kadıköy, Üsküdar, Ataşehir',
        ctaButon: '⚡ Hemen Ara',
        hizmetAciklama: [
            'Priz, şalter, sigorta — güvenli montaj ve onarım',
            'Su tesisatı, pis su, sıcak su — profesyonel çözüm',
            'Aydınlatma planı, spot, LED — modern çözümler'
        ]
    },
    // ── 11: MOBİLYA ──
    11: {
        badge: 'Etiler · Tasarım Atölyesi',
        altBaslik: 'Yaşayan mekânlar, anlatılan hikayeler — masif ahşap ustalığı',
        stats: [
            [
                '20',
                'Yıl Deneyim'
            ],
            [
                '3.000+',
                'Proje'
            ],
            [
                '%100',
                'Masif Ahşap'
            ],
            [
                '4.8',
                'Google'
            ]
        ],
        yorum: 'Oturma odamızı tamamen yeniden tasarladılar. Her parça sanat eseri gibi.',
        yorumcu: 'Pınar E.',
        ctaBaslik: 'Ücretsiz Danışmanlık',
        ctaAciklama: 'Showroom ziyareti · Ücretsiz iç mekan danışmanlığı',
        ctaButon: '🛋️ Randevu Al',
        hizmetAciklama: [
            'Koltuk, sehpa, TV ünitesi — masif meşe ve ceviz',
            'Yatak, gardırop, şifonyer — kişiye özel ölçü',
            'Çalışma masası, kitaplık, toplantı masası — ergonomik'
        ]
    },
    // ── 12: TERZİ ──
    12: {
        badge: 'Kapalıçarşı · 1978',
        altBaslik: 'Her dikişte özen, her kumaşta kalite — bespoke ustalığı',
        stats: [
            [
                '46',
                'Yıl Deneyim'
            ],
            [
                '10.000+',
                'Takım'
            ],
            [
                'İtalyan',
                'Kumaşlar'
            ],
            [
                '4.9',
                'Google'
            ]
        ],
        yorum: 'Düğün takımımı burada diktirdim. Kalıp ve kumaş kalitesi olağanüstü.',
        yorumcu: 'Burak A.',
        ctaBaslik: 'Ölçü Randevusu',
        ctaAciklama: 'Kapalıçarşı · Pazartesi-Cumartesi 09:00-19:00',
        ctaButon: '🧵 Randevu',
        hizmetAciklama: [
            'Özel ölçü takım elbise — İtalyan ve İngiliz kumaşlar',
            'Erkek ve kadın gömlek — kol, yaka, fit kişiye özel',
            'Kıyafet daraltma, boy kısaltma, fermurar değişimi'
        ]
    },
    // ── 13: KIRTASİYE ──
    13: {
        badge: 'Beyoğlu · Hızlı Baskı',
        altBaslik: 'Fikirleriniz kağıda dökülür — dijital baskı ve kırtasiye',
        stats: [
            [
                '12',
                'Yıl'
            ],
            [
                '50.000+',
                'Baskı İşi'
            ],
            [
                '2s',
                'Express Baskı'
            ],
            [
                '4.7',
                'Google'
            ]
        ],
        yorum: 'Kartvizitlerimizi aynı gün bastılar. Kalite ve hız bir arada.',
        yorumcu: 'Onur B.',
        ctaBaslik: 'Hızlı Teklif',
        ctaAciklama: 'Online sipariş · Kapıda ödeme · Kargo',
        ctaButon: '🖨️ Teklif Al',
        hizmetAciklama: [
            'Kartvizit, afiş, broşür, banner — yüksek çözünürlük',
            'Ciltleme, laminasyon, fotokopi — öğrenci indirimi',
            'Tez baskı, sunum dosyası, proje çıktısı — express'
        ]
    },
    // ── 14: ECZANE ──
    14: {
        badge: 'Beşiktaş · Güvenilir',
        altBaslik: 'Sağlığınız bizim önceliğimiz — uzman eczacı kadrosu',
        stats: [
            [
                '25',
                'Yıl'
            ],
            [
                '50.000+',
                'Hasta'
            ],
            [
                '300+',
                'Ürün Çeşidi'
            ],
            [
                '4.9',
                'Google'
            ]
        ],
        yorum: 'Sadece ilaç değil, sağlık danışmanlığı da veriyorlar.',
        yorumcu: 'Fatma H.',
        ctaBaslik: 'Bize Ulaşın',
        ctaAciklama: 'Hafta içi 08:00 — 22:00 · Cumartesi 09:00 — 20:00',
        ctaButon: '💊 Ara',
        hizmetAciklama: [
            'SGK ve özel reçete karşılama — geniş ilaç stoku',
            'D vitamini, omega-3, probiyotik — uzman danışmanlığı',
            'Dermokozmetik, güneş koruma, bebek bakımı'
        ]
    },
    // ── 15: HUKUK ──
    15: {
        badge: 'Levent · 40+ Yıl',
        altBaslik: 'Haklarınız güçlü ellerde — 3 kuşak hukuk geleneği',
        stats: [
            [
                '500+',
                'Dava'
            ],
            [
                '%94',
                'Başarı Oranı'
            ],
            [
                '40+',
                'Yıl'
            ],
            [
                '3',
                'Kuşak'
            ]
        ],
        yorum: 'Miras davamızı 6 ayda sonuçlandırdılar. Profesyonel ve şeffaf süreç.',
        yorumcu: 'İlhan G.',
        ctaBaslik: 'Ücretsiz Danışma',
        ctaAciklama: 'İlk görüşme ücretsiz · Online ve yüz yüze',
        ctaButon: '⚖️ Randevu',
        hizmetAciklama: [
            'Savunma, şikayet, temyiz — deneyimli ceza avukatları',
            'Boşanma, velayet, nafaka — hassas ve özenli yaklaşım',
            'Şirket kuruluşu, sözleşme, tahkim — hızlı çözüm'
        ]
    },
    // ── 16: MUHASEBE ──
    16: {
        badge: 'Maslak · SMMM',
        altBaslik: 'Rakamlarınız güvende — mali müşavirlik ve danışmanlık',
        stats: [
            [
                '18',
                'Yıl'
            ],
            [
                '500+',
                'Firma'
            ],
            [
                '%100',
                'Zamanında Beyan'
            ],
            [
                '4.8',
                'Google'
            ]
        ],
        yorum: 'Şirket kuruluşumu 3 günde hallettiler. SGK ve vergi işlerini artık düşünmüyorum.',
        yorumcu: 'Serkan P.',
        ctaBaslik: 'Teklif Alın',
        ctaAciklama: 'İlk ay ücretsiz deneme · ₺890/ay\'dan başlayan',
        ctaButon: '📊 Teklif',
        hizmetAciklama: [
            'Gelir vergisi, KDV, kurumlar vergisi — zamanında beyan',
            'Maaş hesaplama, SGK bildirge, izin takibi — eksiksiz',
            'Limited, anonim, şahıs şirketi — A\'dan Z\'ye kuruluş'
        ]
    },
    // ── 17: MİMARLIK ──
    17: {
        badge: 'Beyoğlu · Ödüllü Atölye',
        altBaslik: 'Boşluğu anlama, mekânı dönüştürme — tasarım odaklı mimarlık',
        stats: [
            [
                '15',
                'Yıl'
            ],
            [
                '120+',
                'Proje'
            ],
            [
                '3',
                'Ödül'
            ],
            [
                '12',
                'Mimar'
            ]
        ],
        yorum: 'Evimizi yeniden tasarladılar. Her detay düşünülmüş, yaşam kalitemiz arttı.',
        yorumcu: 'Aslı D.',
        ctaBaslik: 'Proje Görüşmesi',
        ctaAciklama: 'Ücretsiz keşif ziyareti · Online portföy',
        ctaButon: '📐 Görüşme',
        hizmetAciklama: [
            'Villa, apartman, rezidans — konsept tasarımdan uygulamaya',
            'AVM, ofis, showroom — verimli ve estetik mekânlar',
            'Mutfak, banyo, iç mekan yenileme — minimum israfla'
        ]
    },
    // ── 18: MÜHENDİSLİK ──
    18: {
        badge: 'Ataşehir · ISO 9001',
        altBaslik: 'Kompleks sorunlar, akıllı çözümler — teknik mühendislik',
        stats: [
            [
                '20',
                'Yıl'
            ],
            [
                '150+',
                'Proje'
            ],
            [
                '30',
                'Uzman'
            ],
            [
                '12',
                'İl\'de Hizmet'
            ]
        ],
        yorum: 'Fabrika projemizi zamanında ve bütçe dahilinde teslim ettiler.',
        yorumcu: 'Murat C.',
        ctaBaslik: 'Proje Teklifi',
        ctaAciklama: 'Fizibilite raporu ücretsiz · Online toplantı',
        ctaButon: '⚙️ Teklif',
        hizmetAciklama: [
            'Planlama, koordinasyon, bütçe — uçtan uca proje yönetimi',
            'Statik rapor, denetim, deprem analizi — uzman kadro',
            'Güneş enerjisi, enerji verimliliği — sürdürülebilir çözümler'
        ]
    },
    // ── 19: SİGORTA ──
    19: {
        badge: 'Şişli · Lisanslı Acente',
        altBaslik: 'Her riske karşı güvende olun — bağımsız sigorta danışmanlığı',
        stats: [
            [
                '15',
                'Yıl'
            ],
            [
                '20.000+',
                'Poliçe'
            ],
            [
                '18',
                'Sigorta Şirketi'
            ],
            [
                '4.7',
                'Google'
            ]
        ],
        yorum: 'En uygun kasko teklifini buldular. Hasar sürecini de hızlıca yönettiler.',
        yorumcu: 'Kemal Ö.',
        ctaBaslik: 'Hızlı Teklif',
        ctaAciklama: 'Online teklif 2 dakikada · Ücretsiz karşılaştırma',
        ctaButon: '🛡️ Teklif Al',
        hizmetAciklama: [
            'Kasko, trafik, dask — online anlık fiyat',
            'Tamamlayıcı, özel sağlık — aile planları',
            'Konut, işyeri, deprem — kapsamlı koruma'
        ]
    },
    // ── 20: EMLAK ──
    20: {
        badge: 'Nişantaşı · Premium Emlak',
        altBaslik: 'Doğru adres, doğru zaman — İstanbul\'un seçkin gayrimenkulleri',
        stats: [
            [
                '12',
                'Yıl'
            ],
            [
                '2.000+',
                'Satış'
            ],
            [
                '₺5B+',
                'Portföy Değeri'
            ],
            [
                '4.9',
                'Google'
            ]
        ],
        yorum: 'Aradığımız daireyi 1 haftada buldular. Profesyonel ve güvenilir.',
        yorumcu: 'Ebru L.',
        ctaBaslik: 'Ücretsiz Değerleme',
        ctaAciklama: 'Evinizin değerini öğrenin — 48 saatte değerleme raporu',
        ctaButon: '🏡 Değerle',
        hizmetAciklama: [
            'Konut, arsa, villa — detaylı portföy',
            'Aylık, yıllık, devren — profesyonel yönetim',
            'Ofis, dükkan, depo — yatırım danışmanlığı'
        ]
    },
    // ── 21: DİJİTAL AJANS ──
    21: {
        badge: 'Levent · Full-Service',
        altBaslik: 'Markanı büyüt, rakiplerine bak — data-driven dijital pazarlama',
        stats: [
            [
                '47',
                'Marka'
            ],
            [
                '₺12M',
                'Reklam Bütçesi'
            ],
            [
                '%340',
                'Ort. ROAS'
            ],
            [
                '15',
                'Uzman'
            ]
        ],
        yorum: 'SEO çalışması ile organik trafiğimiz 4 ayda %280 arttı.',
        yorumcu: 'Gökhan N.',
        ctaBaslik: 'Projen Var mı?',
        ctaAciklama: 'Strateji toplantısı ücretsiz · Online veya yüz yüze',
        ctaButon: '🎨 Konuşalım',
        hizmetAciklama: [
            'Teknik SEO, içerik, backlink — organik büyüme',
            'Meta, Google, TikTok — performans odaklı kampanyalar',
            'Kurumsal site, e-ticaret, landing page — modern stack'
        ]
    },
    // ── 22: DERSHANE ──
    22: {
        badge: 'Kadıköy · 847 Öğrenci Yerleşti',
        altBaslik: 'Başarı bir adım ötede — kişiye özel eğitim programları',
        stats: [
            [
                '847',
                '2024 Yerleşen'
            ],
            [
                '%92',
                'Başarı Oranı'
            ],
            [
                '25',
                'Eğitmen'
            ],
            [
                '4.8',
                'Google'
            ]
        ],
        yorum: 'Kızım YKS\'de ilk 5.000\'e girdi. Zirve olmasaydı bu sonuç olmazdı.',
        yorumcu: 'Fadime T.',
        ctaBaslik: '1 Hafta Ücretsiz',
        ctaAciklama: 'Deneme sınavı + 1 hafta ücretsiz kurs — hemen kaydol',
        ctaButon: '📚 Kayıt Ol',
        hizmetAciklama: [
            'TYT, AYT, dil sınavı — birebir ve grup programları',
            'Kamu personeli sınavı — kapsamlı hazırlık',
            'Cambridge, IELTS, TOEFL — yabancı eğitmenler'
        ]
    },
    // ── 23: TERCÜME ──
    23: {
        badge: 'Taksim · 20 Dil',
        altBaslik: '20 dil, 48 saat teslim, noterli — profesyonel çeviri hizmetleri',
        stats: [
            [
                '20',
                'Dil'
            ],
            [
                '15.000+',
                'Belge'
            ],
            [
                '48s',
                'Ort. Teslim'
            ],
            [
                '4.8',
                'Google'
            ]
        ],
        yorum: 'Teknik dokümanlarımızı 3 dile çevirdiler. Terminoloji hakimiyeti çok iyi.',
        yorumcu: 'Yasemin R.',
        ctaBaslik: 'Hızlı Teklif',
        ctaAciklama: 'Kelime başı ₺0.18\'den · Noterli + Apostil',
        ctaButon: '🌐 Teklif',
        hizmetAciklama: [
            'Mahkeme, noter, resmi kurum — apostil desteği',
            'Toplantı, konferans, fuar — profesyonel tercümanlar',
            'A1-C2 seviyeleri — İngilizce, Almanca, Fransızca kursları'
        ]
    },
    // ── 24: FOTOĞRAFÇI ──
    24: {
        badge: 'Karaköy · Prodüksiyon',
        altBaslik: 'Her anı sanat eserine dönüştürün — profesyonel çekim',
        stats: [
            [
                '7',
                'Yıl'
            ],
            [
                '500+',
                'Düğün'
            ],
            [
                '50+',
                'Marka'
            ],
            [
                '4.9',
                'Google'
            ]
        ],
        yorum: 'Düğün fotoğraflarımız dergi kalitesinde çıktı. Çok mutluyuz.',
        yorumcu: 'Ceren & Ali',
        ctaBaslik: 'Projeniz İçin',
        ctaAciklama: 'Portfolio görüşmesi ücretsiz · Online veya stüdyoda',
        ctaButon: '📸 Konuşalım',
        hizmetAciklama: [
            'Gelin-damat, nişan, kına — sinematik çekim',
            'Tanıtım filmi, röportaj, etkinlik kaydı',
            'Ürün, katalog, e-ticaret — stüdyo veya mekan'
        ]
    },
    // ── 25: YAZILIM ──
    25: {
        badge: 'Ataşehir · Full-Stack',
        altBaslik: 'Kodu değil, çözümü teslim ederiz — modern yazılım geliştirme',
        stats: [
            [
                '8',
                'Yıl'
            ],
            [
                '120+',
                'Proje'
            ],
            [
                '15',
                'Geliştirici'
            ],
            [
                '4.9',
                'Google'
            ]
        ],
        yorum: 'E-ticaret sitemizi 6 haftada yayına aldılar. Performans ve UX mükemmel.',
        yorumcu: 'Volkan İ.',
        ctaBaslik: 'Proje Başlat',
        ctaAciklama: 'Fizibilite toplantısı ücretsiz · Saatlik: ₺850',
        ctaButon: '💻 Başla',
        hizmetAciklama: [
            'React, Next.js, Node — kurumsal site ve SaaS',
            'iOS, Android, React Native — native performans',
            'REST, GraphQL, entegrasyon — güvenli ve ölçeklenebilir'
        ]
    },
    // ── 26: PSİKOLOG ──
    26: {
        badge: 'Şişli · Online Seans',
        altBaslik: 'Kendinize zaman ayırın — yargısız, güvenli bir alan',
        stats: [
            [
                '10',
                'Yıl'
            ],
            [
                '3.000+',
                'Seans'
            ],
            [
                'Online',
                'Destek'
            ],
            [
                '4.9',
                'Google'
            ]
        ],
        yorum: 'İlk kez bu kadar rahat hissettim. Güvenli ve empatik bir ortam.',
        yorumcu: 'Anonim',
        ctaBaslik: 'Randevu Al',
        ctaAciklama: 'Online veya yüz yüze · Tüm görüşmeler gizlidir',
        ctaButon: '🌿 Randevu',
        hizmetAciklama: [
            'Kaygı, depresyon, stres — bilimsel yöntemlerle',
            'İlişki sorunları, iletişim — çift danışmanlığı',
            'Zoom, Google Meet — evinizden katılın'
        ]
    },
    // ── 27: DİŞ KLİNİĞİ ──
    27: {
        badge: 'Ataşehir · Dijital Diş',
        altBaslik: 'Gülüşünüz güvende — modern diş hekimliği',
        stats: [
            [
                '15',
                'Yıl'
            ],
            [
                '20.000+',
                'Tedavi'
            ],
            [
                '5',
                'Uzman Hekim'
            ],
            [
                '4.9',
                'Google'
            ]
        ],
        yorum: 'İmplant işlemim ağrısız ve hızlı oldu. Çok profesyonel bir klinik.',
        yorumcu: 'Necla Ş.',
        ctaBaslik: 'Online Randevu',
        ctaAciklama: 'İlk muayene ücretsiz · 10+ sigorta geçerli',
        ctaButon: '🦷 Randevu',
        hizmetAciklama: [
            'Titanyum implant, kemik grefti — uzun ömürlü çözüm',
            'Telsiz, şeffaf plak — göze çarpmayan tedavi',
            'Zoom, lazer — 1 saatte beyaz gülüş'
        ]
    },
    // ── 28: ÖZEL KLİNİK ──
    28: {
        badge: 'Kadıköy · Çok Branşlı',
        altBaslik: 'Sağlığınız profesyonel ellerde — uzman hekim kadrosu',
        stats: [
            [
                '20',
                'Yıl'
            ],
            [
                '8',
                'Branş'
            ],
            [
                '15',
                'Hekim'
            ],
            [
                '4.8',
                'Google'
            ]
        ],
        yorum: 'Check-up paketleri çok kapsamlı. Sonuçları detaylı açıklıyorlar.',
        yorumcu: 'Recep V.',
        ctaBaslik: 'Randevu',
        ctaAciklama: 'Online randevu · 15+ sigorta anlaşmalı',
        ctaButon: '🏥 Randevu',
        hizmetAciklama: [
            'Genel check-up, tanı, tedavi — uzman doktorlar',
            'EKG, efor, holter — modern cihazlarla',
            'Laboratuvar, görüntüleme — kapsamlı paketler'
        ]
    },
    // ── 29: FİZYOTERAPİ ──
    29: {
        badge: 'Beşiktaş · Sporcu Rehab',
        altBaslik: 'Hareket özgürlüğünü geri kazan — kanıta dayalı tedavi',
        stats: [
            [
                '12',
                'Yıl'
            ],
            [
                '8.000+',
                'Hasta'
            ],
            [
                '%95',
                'İyileşme'
            ],
            [
                '4.9',
                'Google'
            ]
        ],
        yorum: '6 aydır çektiğim bel ağrısı 3 seansta geçti. Harika bir ekip.',
        yorumcu: 'Sinan U.',
        ctaBaslik: 'Değerlendirme',
        ctaAciklama: 'İlk değerlendirme ücretsiz · Muayenehane + evde tedavi',
        ctaButon: '🏃 Randevu',
        hizmetAciklama: [
            'Manipülasyon, mobilizasyon, masaj — ağrı tedavisi',
            'Spor yaralanması, sakatlık sonrası — performans odaklı',
            'Egzersiz programı, postür düzeltme — bireysel plan'
        ]
    },
    // ── 30: DİYETİSYEN ──
    30: {
        badge: 'Beşiktaş · Online Takip',
        altBaslik: 'Sağlıklı vücut, dengeli yaşam — bilimsel beslenme planı',
        stats: [
            [
                '8',
                'Yıl'
            ],
            [
                '5.000+',
                'Danışan'
            ],
            [
                'Online',
                'Takip'
            ],
            [
                '4.8',
                'Google'
            ]
        ],
        yorum: '6 ayda 15 kilo verdim, enerjim arttı. Online takip çok pratik.',
        yorumcu: 'Gülşen K.',
        ctaBaslik: 'Ücretsiz Danışma',
        ctaAciklama: 'İlk görüşme ücretsiz · Online veya yüz yüze',
        ctaButon: '🥗 Randevu',
        hizmetAciklama: [
            'Kişiye özel diyet planı, psikolojik destek — sürdürülebilir',
            'Performans artımı, kas yapımı — sporcu diyeti',
            'Whatsapp, Zoom — nereye olursan ol danış'
        ]
    },
    // ── 31: SPOR SALONU ──
    31: {
        badge: 'Bağcılar · 7/24 Açık',
        altBaslik: 'Limitlerini zorla, kendinle kazan — İstanbul\'un en donanımlı salonu',
        stats: [
            [
                '5',
                'Yıl'
            ],
            [
                '2.000+',
                'Üye'
            ],
            [
                '7/24',
                'Açık'
            ],
            [
                '500m²',
                'Alan'
            ]
        ],
        yorum: 'Ekipman kalitesi ve antrenör desteği mükemmel. Her gün geliyorum.',
        yorumcu: 'Cem B.',
        ctaBaslik: 'Üyelik',
        ctaAciklama: 'Bugün kaydol, ilk ay %20 indirimli · ₺890/ay',
        ctaButon: '💪 Kaydol',
        hizmetAciklama: [
            'Birebir antrenman, program tasarımı — sonuç odaklı',
            'CrossFit, HIIT, fonksiyonel — enerji veren dersler',
            'Diyet planı, vücut analizi — ölçümlü takip'
        ],
        menuBaslik: 'Üyelik Planları',
        menuItems: [
            {
                ad: 'Günlük Giriş',
                fiyat: '₺150',
                aciklama: 'Tüm alanlara erişim'
            },
            {
                ad: 'Aylık Üyelik',
                fiyat: '₺890',
                aciklama: 'Sınırsız giriş + grup dersi'
            },
            {
                ad: 'Yıllık VIP',
                fiyat: '₺7.200',
                aciklama: '12 ay + PT + beslenme'
            }
        ]
    },
    // ── 32: YOGA ──
    32: {
        badge: 'Beyoğlu · Her Seviye',
        altBaslik: 'Bedenini dinle, zihnini özgür bırak — atmosferik yoga deneyimi',
        stats: [
            [
                '6',
                'Yıl'
            ],
            [
                '15',
                'Haftalık Ders'
            ],
            [
                '4',
                'Eğitmen'
            ],
            [
                '4.9',
                'Google'
            ]
        ],
        yorum: 'Mum ışığında Vinyasa dersi inanılmaz bir deneyim. Bağımlılık yapıyor.',
        yorumcu: 'Beril T.',
        ctaBaslik: 'İlk Ders Ücretsiz',
        ctaAciklama: 'Beyoğlu · Her seviyeye açık · Mat dahil',
        ctaButon: '🧘 Kayıt',
        hizmetAciklama: [
            'Nefes odaklı, yavaş akış — başlangıç seviyesi',
            'Dinamik akış, güç ve esneklik — orta-ileri',
            'Reformer, mat, duvar — küçük gruplar'
        ]
    },
    // ── 33: ESTETİK ──
    33: {
        badge: 'Nişantaşı · Uzman Hekimler',
        altBaslik: 'Doğal güzelliğini keşfet — minimal invaziv estetik',
        stats: [
            [
                '10',
                'Yıl'
            ],
            [
                '15.000+',
                'İşlem'
            ],
            [
                '3',
                'Uzman Hekim'
            ],
            [
                '4.9',
                'Google'
            ]
        ],
        yorum: 'Çok doğal bir sonuç aldım. Kimse fark etmedi, sadece "çok güzel görünüyorsun" dediler.',
        yorumcu: 'Anonim',
        ctaBaslik: 'Ücretsiz Konsültasyon',
        ctaAciklama: 'Uzmanımızla tanışın — kişiye özel plan',
        ctaButon: '✨ Randevu',
        hizmetAciklama: [
            'Kırışıklık tedavisi, alın, göz çevresi — doğal sonuç',
            'Dudak, yanak, çene hattı — harmanlı teknik',
            'Tüm vücut, alexandrite, diod — kalıcı çözüm'
        ]
    },
    // ── 34: VETERİNER ──
    34: {
        badge: 'Üsküdar · Acil 7/24',
        altBaslik: 'Dostlarınıza en iyi bakım — sevgi dolu veteriner hekimlik',
        stats: [
            [
                '15',
                'Yıl'
            ],
            [
                '30.000+',
                'Muayene'
            ],
            [
                '5',
                'Veteriner'
            ],
            [
                '4.9',
                'Google'
            ]
        ],
        yorum: 'Kedimizin ameliyatını büyük özveri ile yaptılar. Minnetarız.',
        yorumcu: 'Esra & Boncuk',
        ctaBaslik: 'Randevu',
        ctaAciklama: 'ACİL HAT: 0216 555 0177 · İlk muayene ücretsiz',
        ctaButon: '🐾 Randevu',
        hizmetAciklama: [
            'Karma, kuduz, parvo — aşı takvimi takibi',
            'Kısırlaştırma, ortopedi, diş — modern cerrahi',
            'Pet otel, tırnak, banyo, kuaför — güvenli ortam'
        ]
    }
};
// Geri kalan sektörler için varsayılan içerik üret
function varsayilanIcerik(d) {
    return {
        badge: `İstanbul · Profesyonel`,
        altBaslik: `${d.ad} alanında yılların deneyimi ile hizmetinizdeyiz`,
        stats: [
            [
                '15+',
                'Yıllık Deneyim'
            ],
            [
                '5.000+',
                'Mutlu Müşteri'
            ],
            [
                '4.9',
                'Google Puanı'
            ],
            [
                '7/24',
                'Destek'
            ]
        ],
        yorum: `Harika bir deneyimdi. Profesyonel kadroları ve kaliteli hizmetleriyle kesinlikle tavsiye ederim.`,
        yorumcu: 'Mehmet K.',
        ctaBaslik: 'Hemen Başlayalım',
        ctaAciklama: 'Ücretsiz danışma için bugün bize ulaşın',
        ctaButon: '📞 Bizi Arayın',
        hizmetAciklama: d.hizmetler.map((h)=>`Alanında uzman kadromuzla profesyonel ${h.toLowerCase()} hizmeti sunuyoruz.`)
    };
}
// ── Ana Üretici ───────────────────────────────────────────────────
// ── Özgün Şablon Üreticileri ──────────────────────────────────────────
function htmlYerelEsnaf(d, ic, ik, dark, navBg, navBorder, cardBg, cardBorder, sub, footBg, oFrom, oTo, logo) {
    const menuSection = ic.menuItems ? `
<section class="section" id="menu">
  <div class="section-label">Menü</div>
  <div class="section-title">${ic.menuBaslik || 'Popüler Seçimler'}</div>
  <div class="menu-grid">${ic.menuItems.map((m)=>`
    <div class="menu-item">
      <div class="menu-item-top"><h4>${m.ad}</h4><span class="menu-price">${m.fiyat}</span></div>
      <p>${m.aciklama}</p>
    </div>`).join('')}
  </div>
</section>` : '';
    return `<!DOCTYPE html><html lang="tr"><head>
<meta charset="UTF-8"><meta name="viewport" content="width=device-width,initial-scale=1">
<link href="https://fonts.googleapis.com/css2?family=${d.font.replace(/ /g, '+')}:ital,wght@0,300;0,400;0,600;0,700;0,800;0,900;1,400;1,700&family=Inter:wght@300;400;600;700&display=swap" rel="stylesheet">
<style>
:root{--bg:${d.bg};--text:${d.text};--accent:${d.accent};--muted:${sub};--card:${cardBg};--border:${cardBorder};--nav-h:72px;--fd:'${d.font}',serif;--fb:'Inter',system-ui,sans-serif}
*{margin:0;padding:0;box-sizing:border-box}html{scroll-behavior:smooth}
body{font-family:var(--fb);background:var(--bg);color:var(--text);overflow-x:hidden;-webkit-font-smoothing:antialiased}
a{color:inherit;text-decoration:none}
.nav{position:sticky;top:0;z-index:99;height:var(--nav-h);padding:0 48px;display:flex;align-items:center;justify-content:space-between;background:${navBg};backdrop-filter:blur(20px);border-bottom:1px solid ${navBorder}}
.nav-logo{font-family:var(--fd);font-size:1.5rem;font-weight:900;letter-spacing:-.03em}
.nav-logo .dot{color:var(--accent)}
.nav-links{display:flex;gap:28px;font-size:.88rem;font-weight:500;color:${sub}}
.nav-links a:hover{color:var(--text)}
.nav-cta{padding:10px 22px;border-radius:10px;background:var(--accent);color:#fff;font-size:.85rem;font-weight:700;border:none;cursor:pointer;transition:transform .2s}
.nav-cta:hover{transform:scale(1.05)}
.hero{position:relative;min-height:100vh;display:flex;align-items:flex-end;padding:0 48px 80px;overflow:hidden}
.hero-bg{position:absolute;inset:0;background:url('https://images.unsplash.com/${d.unsplash}?w=1440&q=80&auto=format') center/cover no-repeat}
.hero-overlay{position:absolute;inset:0;background:linear-gradient(175deg,${oFrom} 0%,${rgba(d.bg, 0.35)} 35%,${oTo} 100%)}
.hero-content{position:relative;z-index:2;max-width:680px}
.hero-badge{display:inline-flex;align-items:center;gap:8px;padding:6px 18px;border-radius:99px;font-size:.72rem;font-weight:700;letter-spacing:.12em;text-transform:uppercase;background:${rgba(d.accent, 0.12)};border:1px solid ${rgba(d.accent, 0.25)};color:var(--accent);margin-bottom:28px}
.hero-badge::before{content:'';width:6px;height:6px;border-radius:50%;background:var(--accent)}
.hero h1{font-family:var(--fd);font-size:clamp(3rem,7vw,5.5rem);font-weight:900;line-height:.92;letter-spacing:-.04em;margin-bottom:20px}
.hero h1 em{font-style:italic;color:var(--accent)}
.hero-sub{font-size:1.15rem;color:${sub};max-width:500px;line-height:1.65;margin-bottom:36px}
.hero-ctas{display:flex;gap:12px;flex-wrap:wrap}
.btn{display:inline-flex;align-items:center;gap:8px;padding:15px 30px;border-radius:12px;font-weight:700;font-size:.9rem;border:none;cursor:pointer;transition:all .3s}
.btn-p{background:var(--accent);color:#fff;box-shadow:0 8px 30px ${rgba(d.accent, 0.3)}}
.btn-p:hover{transform:translateY(-2px);box-shadow:0 12px 40px ${rgba(d.accent, 0.4)}}
.btn-o{background:transparent;border:1.5px solid ${dark ? 'rgba(255,255,255,.12)' : 'rgba(0,0,0,.1)'};color:var(--text)}
.btn-o:hover{border-color:var(--accent);color:var(--accent)}
.hero-side{position:absolute;right:48px;top:50%;transform:translateY(-50%) rotate(90deg);font-size:.65rem;letter-spacing:.3em;text-transform:uppercase;color:${rgba(d.text, 0.12)};white-space:nowrap}
.section{padding:100px 48px;max-width:1200px;margin:0 auto}
.section-label{font-size:.72rem;font-weight:700;letter-spacing:.2em;text-transform:uppercase;color:var(--accent);margin-bottom:14px}
.section-title{font-family:var(--fd);font-size:clamp(1.8rem,4vw,2.8rem);font-weight:800;letter-spacing:-.03em;margin-bottom:14px}
.section-desc{font-size:.95rem;color:${sub};max-width:520px;line-height:1.7}
.services-grid{display:grid;grid-template-columns:repeat(3,1fr);gap:20px;margin-top:48px}
.svc{background:var(--card);border:1px solid var(--border);border-radius:18px;padding:32px 24px;transition:transform .3s;position:relative;overflow:hidden}
.svc:hover{transform:translateY(-6px);border-color:${rgba(d.accent, 0.25)}}
.svc .si{font-size:2rem;margin-bottom:14px;display:block}
.svc h3{font-family:var(--fd);font-size:1.1rem;font-weight:700;margin-bottom:8px}
.svc p{font-size:.85rem;color:${sub};line-height:1.6}
.testi{padding:100px 48px;text-align:center;max-width:780px;margin:0 auto}
.testi-q{font-family:var(--fd);font-size:clamp(1.2rem,3vw,1.6rem);font-style:italic;line-height:1.6;margin-bottom:24px}
.testi-a{font-weight:700;font-size:.9rem}
.cta-s{padding:80px 48px;text-align:center;background:${footBg};border-top:1px solid var(--border)}
.footer{padding:28px 48px;text-align:center;border-top:1px solid var(--border);background:${footBg};font-size:.78rem;color:${sub}}
</style></head><body>
<nav class="nav">
  <div class="nav-logo">${logo}<span class="dot">.</span></div>
  <div class="nav-links"><a href="#hizmetler">Hizmetler</a><a href="#yorumlar">Yorumlar</a><a href="#iletisim">İletişim</a></div>
  <button class="nav-cta">${ic.ctaButon.split(' ').slice(1).join(' ') || 'Randevu'}</button>
</nav>
<section class="hero">
  <div class="hero-bg"></div><div class="hero-overlay"></div>
  <div class="hero-content">
    <div class="hero-badge">${ic.badge}</div>
    <h1>${d.heroBaslik.split(' ').map((w, i)=>i === 0 ? w : `<br><em>${w}</em>`).join('')}</h1>
    <p class="hero-sub">${ic.altBaslik}</p>
    <div class="hero-ctas">
      <button class="btn btn-p">${ic.ctaButon}</button>
      <button class="btn btn-o">İncele</button>
    </div>
  </div>
  <div class="hero-side">${d.heroBaslik.toUpperCase()}</div>
</section>
<section class="section" id="hizmetler">
  <div class="section-title">Hizmetlerimiz</div>
  <div class="section-desc">${ic.altBaslik}</div>
  <div class="services-grid">
    ${d.hizmetler.map((h, i)=>`<div class="svc"><span class="si">${ik[i]}</span><h3>${h}</h3><p>${ic.hizmetAciklama[i] || 'Profesyonel hizmet'}</p></div>`).join('')}
  </div>
</section>
${menuSection}
<section class="testi" id="yorumlar">
  <div class="testi-q">${ic.yorum}</div>
  <div class="testi-a">— ${ic.yorumcu}</div>
</section>
<section class="cta-s" id="iletisim">
  <h2>${ic.ctaBaslik}</h2>
  <button class="btn btn-p" style="margin-top:20px">${ic.ctaButon}</button>
</section>
<footer class="footer">© 2025 ${d.heroBaslik} · <strong>kepenk.ai</strong></footer>
${DEMO_MODAL_HTML}
${DEMO_SCRIPT}
</body></html>`;
}
function htmlProfesyonel(d, ic, ik, dark, navBg, navBorder, cardBg, cardBorder, sub, footBg) {
    // Profesyonel/Kurumsal Şablon: Sol Menu Sidebar, Sağ Split Content, Köşeli ve Temiz Hatlar
    return `<!DOCTYPE html><html lang="tr"><head>
<meta charset="UTF-8"><meta name="viewport" content="width=device-width,initial-scale=1">
<link href="https://fonts.googleapis.com/css2?family=${d.font.replace(/ /g, '+')}:ital,wght@0,300;0,400;0,500;0,600;0,700;1,400&family=Space+Grotesk:wght@300;400;500;600;700&display=swap" rel="stylesheet">
<style>
:root{--bg:${d.bg};--text:${d.text};--accent:${d.accent};--muted:${sub};--card:${cardBg};--border:${cardBorder};--sidebar:280px;--fd:'${d.font}',serif;--fb:'Space Grotesk',sans-serif}
*{margin:0;padding:0;box-sizing:border-box}html{scroll-behavior:smooth}
body{font-family:var(--fb);background:var(--bg);color:var(--text);display:flex}
.sidebar{width:var(--sidebar);height:100vh;position:fixed;left:0;top:0;background:${dark ? 'rgba(0,0,0,0.2)' : 'rgba(255,255,255,0.5)'};border-right:1px solid var(--border);padding:40px;display:flex;flex-direction:column;justify-content:space-between}
.logo{font-family:var(--fd);font-size:1.4rem;font-weight:700;letter-spacing:-.02em}
.logo span{color:var(--accent)}
.nav{display:flex;flex-direction:column;gap:1.5rem}
.nav-link{font-size:.9rem;font-weight:500;color:var(--muted);transition:color .2s;display:flex;align-items:center;gap:10px}
.nav-link:hover,.nav-link.active{color:var(--text)}
.nav-link.active::before{content:'';width:4px;height:4px;background:var(--accent);border-radius:50%}
.sidebar-cta{padding:12px;background:var(--text);color:var(--bg);font-weight:600;font-size:.85rem;text-align:center;transition:opacity .2s;margin-top:20px}
.sidebar-cta:hover{opacity:0.9}
.main{margin-left:var(--sidebar);width:calc(100% - var(--sidebar));min-height:100vh;}
.hero{height:100vh;display:flex}
.hero-content{flex:1;padding:80px;display:flex;flex-direction:column;justify-content:center}
.hero-graphic{flex:1;background:url('https://images.unsplash.com/${d.unsplash}?w=1000&q=80&auto=format') center/cover}
.badge{font-size:.7rem;text-transform:uppercase;letter-spacing:.1em;color:var(--accent);margin-bottom:20px;font-weight:600}
.hero h1{font-family:var(--fd);font-size:clamp(3rem,5vw,4.5rem);font-weight:600;line-height:1.1;margin-bottom:24px;letter-spacing:-.03em}
.hero p{font-size:1rem;color:var(--muted);line-height:1.7;max-width:480px;margin-bottom:40px}
.btn-group{display:flex;gap:16px}
.btn{padding:14px 28px;font-size:.85rem;font-weight:600;text-transform:uppercase;letter-spacing:.05em;transition:all .3s;cursor:pointer;border:none}
.btn-p{background:var(--accent);color:#fff}
.btn-p:hover{background:var(--text);color:var(--bg)}
.section{padding:120px 80px;border-top:1px solid var(--border)}
.grid-2{display:grid;grid-template-columns:1fr 1fr;gap:40px}
.grid-3{display:grid;grid-template-columns:repeat(3,1fr);gap:24px}
.s-title{font-family:var(--fd);font-size:2.5rem;font-weight:500;margin-bottom:48px}
.svc-card{padding:40px;background:var(--card);border:1px solid var(--border);transition:all .3s}
.svc-card:hover{border-color:var(--accent);background:transparent}
.svc-card h3{font-family:var(--fd);font-size:1.2rem;margin-bottom:12px;display:flex;align-items:center;gap:12px}
.svc-card p{font-size:.85rem;color:var(--muted);line-height:1.6}
.stat-box{text-align:left;padding:32px 0;border-bottom:1px solid var(--border)}
.stat-n{font-family:var(--fd);font-size:3.5rem;color:var(--accent);font-weight:300;line-height:1}
.stat-l{font-size:.8rem;color:var(--muted);text-transform:uppercase;letter-spacing:.1em;margin-top:10px}
@media(max-width:900px) { body{flex-direction:column} .sidebar{position:relative;width:100%;height:auto;flex-direction:row;align-items:center;padding:20px} .nav{display:none} .main{margin-left:0;width:100%} .hero{flex-direction:column-reverse;height:auto} .hero-content{padding:40px} .hero-graphic{min-height:400px} .section{padding:60px 40px} .grid-2,.grid-3{grid-template-columns:1fr} }
</style></head><body>
<aside class="sidebar">
  <div class="logo">${d.heroBaslik.split(' ')[0]}<span>.</span></div>
  <nav class="nav">
    <a href="#" class="nav-link active">Anasayfa</a>
    <a href="#uzmanlik" class="nav-link">Uzmanlık Alanlarımız</a>
    <a href="#hakkimizda" class="nav-link">Hakkımızda</a>
    <a href="#iletisim" class="nav-link">İletişim</a>
  </nav>
  <button class="sidebar-cta">${ic.ctaButon}</button>
</aside>
<main class="main">
  <section class="hero">
    <div class="hero-content">
      <div class="badge">${ic.badge}</div>
      <h1>${d.heroBaslik}</h1>
      <p>${ic.altBaslik}</p>
      <div class="btn-group">
        <button class="btn btn-p">${ic.ctaButon}</button>
      </div>
    </div>
    <div class="hero-graphic"></div>
  </section>
  <section class="section" id="uzmanlik">
    <h2 class="s-title">Uzmanlık Alanları</h2>
    <div class="grid-3">
      ${d.hizmetler.map((h, i)=>`<div class="svc-card"><h3><span>${ik[i]}</span>${h}</h3><p>${ic.hizmetAciklama[i] || 'Detaylı bilgi için.'}</p></div>`).join('')}
    </div>
  </section>
  <section class="section" id="hakkimizda">
    <div class="grid-2">
      <div>
        <h2 class="s-title">Hakkımızda</h2>
        <p style="color:var(--muted);line-height:1.7;font-size:1rem">${ic.yorum} — ${ic.yorumcu}</p>
      </div>
      <div class="grid-2" style="gap:0 40px">
        ${ic.stats.slice(0, 2).map(([n, l])=>`<div class="stat-box"><div class="stat-n">${n}</div><div class="stat-l">${l}</div></div>`).join('')}
      </div>
    </div>
  </section>
</main>
${DEMO_MODAL_HTML}
${DEMO_SCRIPT}
</body></html>`;
}
function htmlSaglikGuzellik(d, ic, ik, dark, navBg, navBorder, cardBg, cardBorder, sub, footBg) {
    // Sağlık & Güzellik Şablon: Yuvarlak hatlar, ortalanmış, floating nav, soft renkler ve organik formlar
    return `<!DOCTYPE html><html lang="tr"><head>
<meta charset="UTF-8"><meta name="viewport" content="width=device-width,initial-scale=1">
<link href="https://fonts.googleapis.com/css2?family=${d.font.replace(/ /g, '+')}:ital,wght@0,300;0,400;0,500;0,600;0,700;1,400&family=Nunito:wght@300;400;600;700&display=swap" rel="stylesheet">
<style>
:root{--bg:${d.bg};--text:${d.text};--accent:${d.accent};--muted:${sub};--card:${cardBg};--border:${cardBorder};--nav-h:60px;--fd:'${d.font}',serif;--fb:'Nunito',sans-serif}
*{margin:0;padding:0;box-sizing:border-box}html{scroll-behavior:smooth}
body{font-family:var(--fb);background:var(--bg);color:var(--text);text-align:center;padding-top:100px}
.nav-wrap{position:fixed;top:24px;left:0;width:100%;z-index:99;display:flex;justify-content:center;padding:0 20px}
.nav{background:${navBg};backdrop-filter:blur(16px);border:1px solid var(--border);border-radius:99px;height:var(--nav-h);padding:0 8px 0 32px;display:flex;align-items:center;gap:40px;box-shadow:0 10px 40px rgba(0,0,0,.05)}
.logo{font-family:var(--fd);font-size:1.2rem;font-weight:700}
.nav-links{display:flex;gap:24px}
.nav-links a{font-size:.9rem;color:var(--muted);font-weight:600;transition:color .2s}
.nav-links a:hover{color:var(--text)}
.nav-btn{background:var(--accent);color:#fff;border:none;height:44px;padding:0 24px;border-radius:99px;font-weight:700;font-size:.85rem;cursor:pointer}
.nav-btn:hover{background:var(--text);color:var(--bg)}
.hero{padding:60px 20px 100px;max-width:800px;margin:0 auto}
.badge{background:${dark ? 'rgba(255,255,255,.05)' : 'rgba(0,0,0,.03)'};color:var(--text);padding:8px 20px;border-radius:99px;font-size:.8rem;font-weight:700;display:inline-block;margin-bottom:30px}
.hero h1{font-family:var(--fd);font-size:clamp(2.5rem,6vw,4rem);font-weight:600;margin-bottom:24px;line-height:1.1}
.hero p{font-size:1.1rem;color:var(--muted);margin-bottom:40px;line-height:1.6}
.hero-img{width:90%;max-width:1000px;height:500px;margin:0 auto;border-radius:40px;background:url('https://images.unsplash.com/${d.unsplash}?w=1200&q=80&auto=format') center/cover;box-shadow:0 30px 60px ${dark ? 'rgba(0,0,0,.5)' : 'rgba(0,0,0,.1)'}}
.section{padding:100px 20px;max-width:1000px;margin:0 auto}
.s-title{font-family:var(--fd);font-size:2.5rem;font-weight:600;margin-bottom:16px}
.s-desc{color:var(--muted);font-size:1.05rem;max-width:600px;margin:0 auto 60px}
.grid-3{display:grid;grid-template-columns:repeat(3,1fr);gap:30px}
.card{background:var(--card);border:1px solid var(--border);border-radius:32px;padding:48px 32px;transition:transform .3s}
.card:hover{transform:translateY(-10px);background:${dark ? 'rgba(255,255,255,.08)' : '#fff'};box-shadow:0 20px 40px rgba(0,0,0,.03)}
.icon-w{width:64px;height:64px;border-radius:50%;background:${dark ? 'rgba(255,255,255,.05)' : 'rgba(0,0,0,.03)'};display:flex;align-items:center;justify-content:center;font-size:1.6rem;margin:0 auto 24px;color:var(--accent)}
.card h3{font-family:var(--fd);font-size:1.2rem;margin-bottom:12px}
.card p{color:var(--muted);font-size:.9rem;line-height:1.6}
.banner{background:var(--accent);color:#fff;padding:80px 20px;border-radius:40px;margin:100px 20px}
.banner h2{font-family:var(--fd);font-size:2rem;margin-bottom:30px}
.banner button{background:#fff;color:var(--accent);border:none;padding:16px 36px;border-radius:99px;font-weight:700;font-size:1rem;cursor:pointer}
@media(max-width:768px){.nav-links{display:none} .hero-img{height:300px;border-radius:24px} .grid-3{grid-template-columns:1fr}}
</style></head><body>
<div class="nav-wrap">
  <nav class="nav">
    <div class="logo">${d.heroBaslik.split(' ')[0]}</div>
    <div class="nav-links"><a>Bakımlar</a><a>Uzmanlar</a><a>Yorumlar</a></div>
    <button class="nav-btn">Randevu</button>
  </nav>
</div>
<section class="hero">
  <div class="badge">${ic.badge}</div>
  <h1>${d.heroBaslik}</h1>
  <p>${ic.altBaslik}</p>
</section>
<div class="hero-img"></div>
<section class="section">
  <h2 class="s-title">Deneyimlerimiz</h2>
  <p class="s-desc">Size özel hazırlanan profesyonel bakım ve sağlık hizmetleri.</p>
  <div class="grid-3">
    ${d.hizmetler.map((h, i)=>`<div class="card"><div class="icon-w">${ik[i]}</div><h3>${h}</h3><p>${ic.hizmetAciklama[i] || 'Özel hizmet paketi.'}</p></div>`).join('')}
  </div>
</section>
<div class="banner">
  <h2>${ic.ctaBaslik}</h2>
  <button>${ic.ctaButon}</button>
</div>
${DEMO_MODAL_HTML}
${DEMO_SCRIPT}
</body></html>`;
}
function demoHtmlUret(d) {
    const dark = isDark(d.bg);
    const ic = ICERIKLER[d.id] || varsayilanIcerik(d);
    const ik = IK[d.id] || [
        '🎯',
        '⭐',
        '💎'
    ];
    const navBg = dark ? rgba(d.bg, 0.85) : rgba('#ffffff', 0.92);
    const navBorder = dark ? 'rgba(255,255,255,0.06)' : 'rgba(0,0,0,0.06)';
    const cardBg = dark ? 'rgba(255,255,255,0.04)' : 'rgba(0,0,0,0.02)';
    const cardBorder = dark ? 'rgba(255,255,255,0.08)' : 'rgba(0,0,0,0.06)';
    const sub = dark ? 'rgba(255,255,255,0.45)' : 'rgba(0,0,0,0.45)';
    const footBg = dark ? 'rgba(255,255,255,0.02)' : 'rgba(0,0,0,0.02)';
    const oFrom = rgba(d.bg, 0.15);
    const oTo = rgba(d.bg, 0.92);
    const logo = d.heroBaslik.split(' ')[0];
    switch(d.kategori){
        case 'profesyonel':
            return htmlProfesyonel(d, ic, ik, dark, navBg, navBorder, cardBg, cardBorder, sub, footBg);
        case 'saglik-guzellik':
            return htmlSaglikGuzellik(d, ic, ik, dark, navBg, navBorder, cardBg, cardBorder, sub, footBg);
        case 'etkinlik':
            // Fallback etkinlik to profesyonel styled since we have just 1 event for now
            return htmlProfesyonel(d, ic, ik, dark, navBg, navBorder, cardBg, cardBorder, sub, footBg);
        case 'yerel-esnaf':
        default:
            return htmlYerelEsnaf(d, ic, ik, dark, navBg, navBorder, cardBg, cardBorder, sub, footBg, oFrom, oTo, logo);
    }
}
const DEMO_MODAL_HTML = `
<!-- Kepenk.ai Interactive Demo Elements -->
<!-- 1. Universal Modal -->
<div id="k-modal-overlay" class="k-modal-overlay">
  <div class="k-modal">
    <button class="k-modal-close" onclick="closeModal()">✕</button>
    <div class="k-modal-header">
      <h3 id="k-modal-title">Randevu Talebi</h3>
      <p id="k-modal-desc">Lütfen iletişim bilgilerinizi bırakın, size en kısa sürede dönüş yapalım.</p>
    </div>
    <form id="k-modal-form" onsubmit="submitForm(event)">
      <div class="k-input-group">
        <label>Adınız Soyadınız</label>
        <input type="text" required placeholder="Örn: Ahmet Yılmaz">
      </div>
      <div class="k-input-group">
        <label>Telefon Numaranız</label>
        <input type="tel" required placeholder="05XX XXX XX XX">
      </div>
      <button type="submit" class="k-submit-btn" id="k-submit-btn">Gönder</button>
    </form>
    <div id="k-success-msg" class="k-success-msg" style="display: none;">
      <div class="k-success-icon">✓</div>
      <h4>Talebiniz Alındı!</h4>
      <p>Satış temsilcimiz en kısa sürede sizinle iletişime geçecektir.</p>
    </div>
  </div>
</div>

<!-- 2. WhatsApp Floating Widget -->
<div class="k-wa-widget">
  <div class="k-wa-tooltip">Size nasıl yardımcı olabilirim? 👋</div>
  <button class="k-wa-btn" onclick="openModal('WhatsApp İletişim', 'WhatsApp üzerinden hızlıca destek almak için bilgilerinizi bırakın.')">
    <svg viewBox="0 0 24 24" fill="currentColor" width="28" height="28">
      <path d="M11.99 2C6.47 2 2 6.48 2 12C2 13.92 2.55 15.7 3.5 17.2L2 22L6.96 20.65C8.42 21.52 10.15 22 11.99 22C17.51 22 22 17.52 22 12C22 6.48 17.51 2 11.99 2ZM17.15 15.61C16.92 16.27 15.82 16.82 15.17 16.94C14.7 17.03 14.07 17.13 11.66 16.13C8.61 14.86 6.64 11.77 6.49 11.57C6.34 11.37 5.25 9.93 5.25 8.42C5.25 6.92 6.01 6.18 6.3 5.88C6.55 5.62 6.96 5.51 7.37 5.51C7.5 5.51 7.62 5.52 7.72 5.52C8.03 5.54 8.18 5.56 8.38 6.04C8.64 6.66 9.27 8.2 9.34 8.35C9.42 8.5 9.5 8.7 9.4 8.9C9.3 9.09 9.22 9.21 9.07 9.38C8.92 9.55 8.75 9.77 8.62 9.92C8.47 10.09 8.32 10.27 8.5 10.58C8.68 10.89 9.27 11.85 10.14 12.63C11.26 13.63 12.16 13.95 12.49 14.08C12.82 14.22 13.2 14.19 13.43 13.94C13.72 13.63 14.09 13.11 14.47 12.58C14.76 12.18 15.14 12.23 15.45 12.34C15.76 12.45 17.41 13.26 17.74 13.43C18.07 13.6 18.29 13.68 18.37 13.82C18.45 13.96 18.45 14.61 18.15 15.34L17.15 15.61Z"></path>
    </svg>
  </button>
</div>

<!-- 3. Dashboard Return Banner (For testing only) -->
<div class="k-return-banner">
  <div class="k-banner-content">
    <span>💡 Bu bir <strong>Kepenk.ai</strong> interaktif demosudur.</span>
    <a href="/dashboard" class="k-return-btn">Panele Dön</a>
  </div>
</div>

<style>
/* Kepenk.ai Interactive Demo Styles */
.k-modal-overlay {
  position: fixed;
  inset: 0;
  background: rgba(0, 0, 0, 0.4);
  backdrop-filter: blur(8px);
  -webkit-backdrop-filter: blur(8px);
  z-index: 99999;
  display: flex;
  align-items: center;
  justify-content: center;
  opacity: 0;
  pointer-events: none;
  transition: opacity 0.3s ease;
  padding: 20px;
}
.k-modal-overlay.active {
  opacity: 1;
  pointer-events: auto;
}
.k-modal {
  background: var(--bg, #ffffff);
  color: var(--text, #111111);
  width: 100%;
  max-width: 440px;
  border-radius: 24px;
  padding: 40px;
  position: relative;
  transform: translateY(20px) scale(0.95);
  transition: all 0.4s cubic-bezier(0.16, 1, 0.3, 1);
  box-shadow: 0 24px 48px rgba(0,0,0,0.12);
  border: 1px solid var(--border, rgba(0,0,0,0.1));
}
.k-modal-overlay.active .k-modal {
  transform: translateY(0) scale(1);
}
.k-modal-close {
  position: absolute;
  top: 20px;
  right: 20px;
  background: var(--card, rgba(0,0,0,0.05));
  border: none;
  width: 36px;
  height: 36px;
  border-radius: 50%;
  cursor: pointer;
  color: var(--text);
  font-size: 16px;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: background 0.2s;
}
.k-modal-close:hover {
  background: var(--border, rgba(0,0,0,0.1));
}
.k-modal-header {
  margin-bottom: 24px;
  text-align: center;
}
.k-modal-header h3 {
  font-size: 1.5rem;
  font-weight: 700;
  margin-bottom: 8px;
  font-family: var(--fd, inherit);
}
.k-modal-header p {
  font-size: 0.9rem;
  color: var(--muted, #666);
  line-height: 1.5;
}
.k-input-group {
  margin-bottom: 20px;
}
.k-input-group label {
  display: block;
  font-size: 0.85rem;
  font-weight: 600;
  margin-bottom: 8px;
  color: var(--text);
}
.k-input-group input {
  width: 100%;
  padding: 14px 16px;
  border-radius: 12px;
  border: 1px solid var(--border, rgba(0,0,0,0.1));
  background: var(--card, rgba(0,0,0,0.02));
  color: var(--text);
  font-family: inherit;
  font-size: 0.95rem;
  transition: all 0.2s;
}
.k-input-group input:focus {
  outline: none;
  border-color: var(--accent, #ea580c);
  box-shadow: 0 0 0 4px rgba(234, 88, 12, 0.1);
}
.k-submit-btn {
  width: 100%;
  padding: 16px;
  border-radius: 12px;
  background: var(--accent, #ea580c);
  color: #ffffff;
  border: none;
  font-weight: 600;
  font-size: 1rem;
  cursor: pointer;
  transition: transform 0.2s, box-shadow 0.2s;
  font-family: inherit;
}
.k-submit-btn:hover {
  transform: translateY(-2px);
  box-shadow: 0 8px 20px rgba(234, 88, 12, 0.25);
}
.k-success-msg {
  text-align: center;
  padding: 20px 0;
}
.k-success-icon {
  width: 64px;
  height: 64px;
  background: #10b981;
  color: white;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 32px;
  margin: 0 auto 20px;
  animation: scaleIn 0.5s cubic-bezier(0.16, 1, 0.3, 1);
}
.k-success-msg h4 {
  font-size: 1.3rem;
  margin-bottom: 8px;
  font-family: var(--fd, inherit);
}
.k-success-msg p {
  color: var(--muted);
  font-size: 0.95rem;
  line-height: 1.5;
}

/* WhatsApp Widget */
.k-wa-widget {
  position: fixed;
  bottom: 30px;
  right: 30px;
  z-index: 9999;
  display: flex;
  align-items: flex-end;
  flex-direction: column;
  gap: 12px;
}
.k-wa-btn {
  width: 60px;
  height: 60px;
  border-radius: 50%;
  background: #25D366;
  color: white;
  border: none;
  box-shadow: 0 10px 24px rgba(37, 211, 102, 0.3);
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: transform 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275);
}
.k-wa-btn:hover {
  transform: scale(1.1) rotate(-5deg);
}
.k-wa-tooltip {
  background: var(--bg, #fff);
  color: var(--text, #111);
  padding: 10px 16px;
  border-radius: 12px;
  font-size: 0.85rem;
  font-weight: 600;
  box-shadow: 0 8px 24px rgba(0,0,0,0.12);
  border: 1px solid var(--border, rgba(0,0,0,0.05));
  opacity: 0;
  transform: translateY(10px);
  transition: all 0.3s;
  pointer-events: none;
}
.k-wa-widget:hover .k-wa-tooltip {
  opacity: 1;
  transform: translateY(0);
}

/* Return Banner */
.k-return-banner {
  position: fixed;
  bottom: 24px;
  left: 24px;
  z-index: 9999;
  background: rgba(0,0,0,0.85);
  backdrop-filter: blur(12px);
  -webkit-backdrop-filter: blur(12px);
  padding: 12px 20px;
  border-radius: 99px;
  border: 1px solid rgba(255,255,255,0.1);
  box-shadow: 0 12px 30px rgba(0,0,0,0.2);
}
.k-banner-content {
  display: flex;
  align-items: center;
  gap: 16px;
  color: #fff;
  font-size: 0.85rem;
  font-family: system-ui, -apple-system, sans-serif;
}
.k-return-btn {
  background: #fff;
  color: #000;
  padding: 8px 16px;
  border-radius: 99px;
  font-weight: 600;
  text-decoration: none;
  font-size: 0.8rem;
  transition: transform 0.2s;
}
.k-return-btn:hover {
  transform: scale(1.05);
  color: #000;
}

@keyframes scaleIn {
  from { transform: scale(0); opacity: 0; }
  to { transform: scale(1); opacity: 1; }
}

@media (max-width: 768px) {
  .k-wa-widget { bottom: 20px; right: 20px; }
  .k-return-banner { display: none; /* Hide on mobile to save space */ }
}
</style>
`;
const DEMO_SCRIPT = `
<script>
// Kepenk.ai Interactive Demo Logic
const INTERACTIVE_MODE = true;

// 1. Modal Logic
function openModal(title, desc) {
  const overlay = document.getElementById('k-modal-overlay');
  const titleEl = document.getElementById('k-modal-title');
  const descEl = document.getElementById('k-modal-desc');
  const form = document.getElementById('k-modal-form');
  const successMsg = document.getElementById('k-success-msg');
  
  if (title) titleEl.innerText = title;
  if (desc) descEl.innerText = desc;
  
  // Reset state
  form.style.display = 'block';
  successMsg.style.display = 'none';
  form.reset();
  
  overlay.classList.add('active');
  document.body.style.overflow = 'hidden';
}

function closeModal() {
  const overlay = document.getElementById('k-modal-overlay');
  overlay.classList.remove('active');
  document.body.style.overflow = '';
}

function submitForm(e) {
  e.preventDefault();
  const btn = document.getElementById('k-submit-btn');
  const form = document.getElementById('k-modal-form');
  btn.innerText = 'Gönderiliyor...';
  btn.disabled = true;
  
  const formData = new FormData(form);
  const payload = {
    ad: formData.get('ad') || '',
    telefon: formData.get('telefon') || '',
    kaynakSite: window.location.hostname,
    sektorId: document.querySelector('meta[name="sektor-id"]')?.content || null,
    mesaj: document.getElementById('k-modal-title')?.innerText || ''
  };

  // Gerçek API çağrısı — iframe sandbox içinde 2 yöntem denenir:
  // 1. postMessage ile parent sayfaya ilet (sandbox-safe)
  // 2. Doğrudan fetch (same-origin demo'larda çalışır)
  try {
    window.parent.postMessage({ type: 'demo-lead', payload }, '*');
  } catch {}

  fetch('/api/lead/demo-form', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(payload)
  })
  .then(r => r.ok ? r.json() : Promise.reject('API error'))
  .catch(() => ({ ok: true, mock: true }))
  .finally(() => {
    document.getElementById('k-modal-form').style.display = 'none';
    document.getElementById('k-success-msg').style.display = 'block';
    btn.innerText = 'Gönder';
    btn.disabled = false;
    setTimeout(() => closeModal(), 3000);
  });
}

// Close modal on click outside
document.getElementById('k-modal-overlay')?.addEventListener('click', (e) => {
  if (e.target.id === 'k-modal-overlay') {
    closeModal();
  }
});

// Close modal on Escape
document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape') closeModal();
});

// 2. Attach click handlers to all buttons
document.addEventListener('DOMContentLoaded', () => {
  // Find all buttons that look like CTAs
  const ctas = document.querySelectorAll('button:not(.k-modal-close):not(.k-submit-btn)');
  
  ctas.forEach(btn => {
    // If it already has an onclick, skip it (like WhatsApp btn)
    if (btn.hasAttribute('onclick')) return;
    
    btn.addEventListener('click', (e) => {
      const text = e.target.innerText.trim();
      let title = 'İletişim Talebi';
      let desc = 'İlginiz için teşekkürler, size en kısa sürede dönüş yapacağız.';
      
      if (text.toLowerCase().includes('randevu')) {
        title = 'Randevu Alın';
        desc = 'Size uygun tarihi belirlemek için bilgilerinizi bırakın.';
      } else if (text.toLowerCase().includes('sipariş')) {
        title = 'Sipariş Verin';
        desc = 'Hızlı sipariş için lütfen numaranızı bırakın, sizi arayalım.';
      }
      
      openModal(title, desc);
    });
  });

  // 3. Smooth Scroll for Anchor Links
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      const targetId = this.getAttribute('href');
      if (targetId === '#') return;
      
      const targetElement = document.querySelector(targetId);
      if (targetElement) {
        e.preventDefault();
        targetElement.scrollIntoView({
          behavior: 'smooth'
        });
      }
    });
  });
});
</script>
`;
}),
"[project]/XinXia/apps/web/src/app/demolar/vitrin/page.tsx [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>VitrinPage
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$XinXia$2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$6_$40$babel$2b$core$40$7$2e$29$2e$0_$40$opentelemetry$2b$api$40$1$2e$9$2e$0_react$2d$dom$40$19$2e$2$2e$3_react$40$19$2e$2$2e$3_$5f$react$40$19$2e$2$2e$3$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/XinXia/node_modules/.pnpm/next@16.1.6_@babel+core@7.29.0_@opentelemetry+api@1.9.0_react-dom@19.2.3_react@19.2.3__react@19.2.3/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react-jsx-dev-runtime.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$XinXia$2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$6_$40$babel$2b$core$40$7$2e$29$2e$0_$40$opentelemetry$2b$api$40$1$2e$9$2e$0_react$2d$dom$40$19$2e$2$2e$3_react$40$19$2e$2$2e$3_$5f$react$40$19$2e$2$2e$3$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/XinXia/node_modules/.pnpm/next@16.1.6_@babel+core@7.29.0_@opentelemetry+api@1.9.0_react-dom@19.2.3_react@19.2.3__react@19.2.3/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$XinXia$2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$6_$40$babel$2b$core$40$7$2e$29$2e$0_$40$opentelemetry$2b$api$40$1$2e$9$2e$0_react$2d$dom$40$19$2e$2$2e$3_react$40$19$2e$2$2e$3_$5f$react$40$19$2e$2$2e$3$2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/XinXia/node_modules/.pnpm/next@16.1.6_@babel+core@7.29.0_@opentelemetry+api@1.9.0_react-dom@19.2.3_react@19.2.3__react@19.2.3/node_modules/next/dist/client/app-dir/link.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$XinXia$2f$apps$2f$web$2f$src$2f$data$2f$demoVitrinData$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/XinXia/apps/web/src/data/demoVitrinData.ts [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$XinXia$2f$apps$2f$web$2f$src$2f$utils$2f$demoHtmlUretici$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/XinXia/apps/web/src/utils/demoHtmlUretici.ts [app-ssr] (ecmascript)");
'use client';
;
;
;
;
;
// ── Lazy iframe ──────────────────────────────────────────────────
function LazyIframe({ demo }) {
    const ref = (0, __TURBOPACK__imported__module__$5b$project$5d2f$XinXia$2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$6_$40$babel$2b$core$40$7$2e$29$2e$0_$40$opentelemetry$2b$api$40$1$2e$9$2e$0_react$2d$dom$40$19$2e$2$2e$3_react$40$19$2e$2$2e$3_$5f$react$40$19$2e$2$2e$3$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useRef"])(null);
    const [loaded, setLoaded] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$XinXia$2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$6_$40$babel$2b$core$40$7$2e$29$2e$0_$40$opentelemetry$2b$api$40$1$2e$9$2e$0_react$2d$dom$40$19$2e$2$2e$3_react$40$19$2e$2$2e$3_$5f$react$40$19$2e$2$2e$3$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(false);
    const [srcdoc, setSrcdoc] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$XinXia$2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$6_$40$babel$2b$core$40$7$2e$29$2e$0_$40$opentelemetry$2b$api$40$1$2e$9$2e$0_react$2d$dom$40$19$2e$2$2e$3_react$40$19$2e$2$2e$3_$5f$react$40$19$2e$2$2e$3$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(null);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$XinXia$2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$6_$40$babel$2b$core$40$7$2e$29$2e$0_$40$opentelemetry$2b$api$40$1$2e$9$2e$0_react$2d$dom$40$19$2e$2$2e$3_react$40$19$2e$2$2e$3_$5f$react$40$19$2e$2$2e$3$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useEffect"])(()=>{
        const el = ref.current;
        if (!el) return;
        const obs = new IntersectionObserver(([entry])=>{
            if (entry.isIntersecting) {
                setSrcdoc((0, __TURBOPACK__imported__module__$5b$project$5d2f$XinXia$2f$apps$2f$web$2f$src$2f$utils$2f$demoHtmlUretici$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["demoHtmlUret"])(demo));
                obs.unobserve(el);
            }
        }, {
            rootMargin: '300px'
        });
        obs.observe(el);
        return ()=>obs.disconnect();
    }, [
        demo
    ]);
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$XinXia$2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$6_$40$babel$2b$core$40$7$2e$29$2e$0_$40$opentelemetry$2b$api$40$1$2e$9$2e$0_react$2d$dom$40$19$2e$2$2e$3_react$40$19$2e$2$2e$3_$5f$react$40$19$2e$2$2e$3$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        ref: ref,
        className: "relative w-full h-[240px] overflow-hidden bg-background/50",
        children: [
            !srcdoc ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$XinXia$2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$6_$40$babel$2b$core$40$7$2e$29$2e$0_$40$opentelemetry$2b$api$40$1$2e$9$2e$0_react$2d$dom$40$19$2e$2$2e$3_react$40$19$2e$2$2e$3_$5f$react$40$19$2e$2$2e$3$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "w-full h-full animate-pulse bg-gradient-to-r from-ink via-dgray to-ink"
            }, void 0, false, {
                fileName: "[project]/XinXia/apps/web/src/app/demolar/vitrin/page.tsx",
                lineNumber: 29,
                columnNumber: 9
            }, this) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$XinXia$2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$6_$40$babel$2b$core$40$7$2e$29$2e$0_$40$opentelemetry$2b$api$40$1$2e$9$2e$0_react$2d$dom$40$19$2e$2$2e$3_react$40$19$2e$2$2e$3_$5f$react$40$19$2e$2$2e$3$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$XinXia$2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$6_$40$babel$2b$core$40$7$2e$29$2e$0_$40$opentelemetry$2b$api$40$1$2e$9$2e$0_react$2d$dom$40$19$2e$2$2e$3_react$40$19$2e$2$2e$3_$5f$react$40$19$2e$2$2e$3$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Fragment"], {
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$XinXia$2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$6_$40$babel$2b$core$40$7$2e$29$2e$0_$40$opentelemetry$2b$api$40$1$2e$9$2e$0_react$2d$dom$40$19$2e$2$2e$3_react$40$19$2e$2$2e$3_$5f$react$40$19$2e$2$2e$3$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("iframe", {
                        srcDoc: srcdoc,
                        scrolling: "no",
                        sandbox: "allow-same-origin",
                        onLoad: ()=>setLoaded(true),
                        style: {
                            width: 1440,
                            height: 900,
                            transform: 'scale(0.25)',
                            transformOrigin: 'top left',
                            pointerEvents: 'none',
                            border: 'none',
                            opacity: loaded ? 1 : 0,
                            transition: 'opacity .5s'
                        }
                    }, void 0, false, {
                        fileName: "[project]/XinXia/apps/web/src/app/demolar/vitrin/page.tsx",
                        lineNumber: 32,
                        columnNumber: 11
                    }, this),
                    !loaded && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$XinXia$2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$6_$40$babel$2b$core$40$7$2e$29$2e$0_$40$opentelemetry$2b$api$40$1$2e$9$2e$0_react$2d$dom$40$19$2e$2$2e$3_react$40$19$2e$2$2e$3_$5f$react$40$19$2e$2$2e$3$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "absolute inset-0 animate-pulse bg-gradient-to-r from-ink via-dgray to-ink"
                    }, void 0, false, {
                        fileName: "[project]/XinXia/apps/web/src/app/demolar/vitrin/page.tsx",
                        lineNumber: 37,
                        columnNumber: 23
                    }, this)
                ]
            }, void 0, true),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$XinXia$2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$6_$40$babel$2b$core$40$7$2e$29$2e$0_$40$opentelemetry$2b$api$40$1$2e$9$2e$0_react$2d$dom$40$19$2e$2$2e$3_react$40$19$2e$2$2e$3_$5f$react$40$19$2e$2$2e$3$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "absolute inset-0 flex items-center justify-center bg-background/30 opacity-100 group-hover:opacity-0 transition-opacity duration-300 pointer-events-none",
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$XinXia$2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$6_$40$babel$2b$core$40$7$2e$29$2e$0_$40$opentelemetry$2b$api$40$1$2e$9$2e$0_react$2d$dom$40$19$2e$2$2e$3_react$40$19$2e$2$2e$3_$5f$react$40$19$2e$2$2e$3$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                    className: "text-[10px] font-bold uppercase tracking-[.2em] text-foreground/50 px-3 py-1.5 border border-cream/15 rounded-full",
                    children: "Canlı Önizleme"
                }, void 0, false, {
                    fileName: "[project]/XinXia/apps/web/src/app/demolar/vitrin/page.tsx",
                    lineNumber: 41,
                    columnNumber: 9
                }, this)
            }, void 0, false, {
                fileName: "[project]/XinXia/apps/web/src/app/demolar/vitrin/page.tsx",
                lineNumber: 40,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/XinXia/apps/web/src/app/demolar/vitrin/page.tsx",
        lineNumber: 27,
        columnNumber: 5
    }, this);
}
// ── Modal ────────────────────────────────────────────────────────
function DemoModal({ demo, onClose }) {
    const [srcdoc] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$XinXia$2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$6_$40$babel$2b$core$40$7$2e$29$2e$0_$40$opentelemetry$2b$api$40$1$2e$9$2e$0_react$2d$dom$40$19$2e$2$2e$3_react$40$19$2e$2$2e$3_$5f$react$40$19$2e$2$2e$3$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(()=>(0, __TURBOPACK__imported__module__$5b$project$5d2f$XinXia$2f$apps$2f$web$2f$src$2f$utils$2f$demoHtmlUretici$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["demoHtmlUret"])(demo));
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$XinXia$2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$6_$40$babel$2b$core$40$7$2e$29$2e$0_$40$opentelemetry$2b$api$40$1$2e$9$2e$0_react$2d$dom$40$19$2e$2$2e$3_react$40$19$2e$2$2e$3_$5f$react$40$19$2e$2$2e$3$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useEffect"])(()=>{
        const h = (e)=>{
            if (e.key === 'Escape') onClose();
        };
        document.addEventListener('keydown', h);
        document.body.style.overflow = 'hidden';
        return ()=>{
            document.removeEventListener('keydown', h);
            document.body.style.overflow = '';
        };
    }, [
        onClose
    ]);
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$XinXia$2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$6_$40$babel$2b$core$40$7$2e$29$2e$0_$40$opentelemetry$2b$api$40$1$2e$9$2e$0_react$2d$dom$40$19$2e$2$2e$3_react$40$19$2e$2$2e$3_$5f$react$40$19$2e$2$2e$3$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "fixed inset-0 z-[200] bg-background/90 backdrop-blur-xl flex items-center justify-center animate-[fadeIn_0.25s_ease]",
        onClick: onClose,
        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$XinXia$2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$6_$40$babel$2b$core$40$7$2e$29$2e$0_$40$opentelemetry$2b$api$40$1$2e$9$2e$0_react$2d$dom$40$19$2e$2$2e$3_react$40$19$2e$2$2e$3_$5f$react$40$19$2e$2$2e$3$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: "w-[92vw] h-[88vh] bg-background rounded-2xl overflow-hidden flex flex-col animate-[modalIn_0.3s_ease] border border-border/30 shadow-2xl shadow-ink/50",
            onClick: (e)=>e.stopPropagation(),
            children: [
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$XinXia$2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$6_$40$babel$2b$core$40$7$2e$29$2e$0_$40$opentelemetry$2b$api$40$1$2e$9$2e$0_react$2d$dom$40$19$2e$2$2e$3_react$40$19$2e$2$2e$3_$5f$react$40$19$2e$2$2e$3$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "flex justify-between items-center px-5 py-3.5 border-b border-border/20 bg-card/50",
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$XinXia$2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$6_$40$babel$2b$core$40$7$2e$29$2e$0_$40$opentelemetry$2b$api$40$1$2e$9$2e$0_react$2d$dom$40$19$2e$2$2e$3_react$40$19$2e$2$2e$3_$5f$react$40$19$2e$2$2e$3$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "flex items-center gap-3",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$XinXia$2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$6_$40$babel$2b$core$40$7$2e$29$2e$0_$40$opentelemetry$2b$api$40$1$2e$9$2e$0_react$2d$dom$40$19$2e$2$2e$3_react$40$19$2e$2$2e$3_$5f$react$40$19$2e$2$2e$3$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                    className: "text-[10px] font-bold px-3 py-1 rounded-full border",
                                    style: {
                                        background: `${demo.accent}15`,
                                        color: demo.accent,
                                        borderColor: `${demo.accent}30`
                                    },
                                    children: __TURBOPACK__imported__module__$5b$project$5d2f$XinXia$2f$apps$2f$web$2f$src$2f$data$2f$demoVitrinData$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["KATEGORILER"][demo.kategori].ad
                                }, void 0, false, {
                                    fileName: "[project]/XinXia/apps/web/src/app/demolar/vitrin/page.tsx",
                                    lineNumber: 71,
                                    columnNumber: 13
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$XinXia$2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$6_$40$babel$2b$core$40$7$2e$29$2e$0_$40$opentelemetry$2b$api$40$1$2e$9$2e$0_react$2d$dom$40$19$2e$2$2e$3_react$40$19$2e$2$2e$3_$5f$react$40$19$2e$2$2e$3$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                    className: "font-syne font-bold text-foreground text-sm",
                                    children: demo.ad
                                }, void 0, false, {
                                    fileName: "[project]/XinXia/apps/web/src/app/demolar/vitrin/page.tsx",
                                    lineNumber: 77,
                                    columnNumber: 13
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/XinXia/apps/web/src/app/demolar/vitrin/page.tsx",
                            lineNumber: 70,
                            columnNumber: 11
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$XinXia$2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$6_$40$babel$2b$core$40$7$2e$29$2e$0_$40$opentelemetry$2b$api$40$1$2e$9$2e$0_react$2d$dom$40$19$2e$2$2e$3_react$40$19$2e$2$2e$3_$5f$react$40$19$2e$2$2e$3$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "flex items-center gap-3",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$XinXia$2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$6_$40$babel$2b$core$40$7$2e$29$2e$0_$40$opentelemetry$2b$api$40$1$2e$9$2e$0_react$2d$dom$40$19$2e$2$2e$3_react$40$19$2e$2$2e$3_$5f$react$40$19$2e$2$2e$3$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$XinXia$2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$6_$40$babel$2b$core$40$7$2e$29$2e$0_$40$opentelemetry$2b$api$40$1$2e$9$2e$0_react$2d$dom$40$19$2e$2$2e$3_react$40$19$2e$2$2e$3_$5f$react$40$19$2e$2$2e$3$2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"], {
                                    href: `/onboarding?sektor=${demo.id}`,
                                    className: "bg-rust hover:bg-rust/90 text-foreground px-5 py-2 rounded-xl text-xs font-bold transition-colors",
                                    children: "Bu Sektörü Seç →"
                                }, void 0, false, {
                                    fileName: "[project]/XinXia/apps/web/src/app/demolar/vitrin/page.tsx",
                                    lineNumber: 80,
                                    columnNumber: 13
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$XinXia$2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$6_$40$babel$2b$core$40$7$2e$29$2e$0_$40$opentelemetry$2b$api$40$1$2e$9$2e$0_react$2d$dom$40$19$2e$2$2e$3_react$40$19$2e$2$2e$3_$5f$react$40$19$2e$2$2e$3$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                    className: "w-9 h-9 rounded-xl border border-border/30 bg-transparent text-foreground/70 hover:bg-warm/20 hover:text-foreground text-sm cursor-pointer transition-all",
                                    onClick: onClose,
                                    children: "✕"
                                }, void 0, false, {
                                    fileName: "[project]/XinXia/apps/web/src/app/demolar/vitrin/page.tsx",
                                    lineNumber: 86,
                                    columnNumber: 13
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/XinXia/apps/web/src/app/demolar/vitrin/page.tsx",
                            lineNumber: 79,
                            columnNumber: 11
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/XinXia/apps/web/src/app/demolar/vitrin/page.tsx",
                    lineNumber: 69,
                    columnNumber: 9
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$XinXia$2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$6_$40$babel$2b$core$40$7$2e$29$2e$0_$40$opentelemetry$2b$api$40$1$2e$9$2e$0_react$2d$dom$40$19$2e$2$2e$3_react$40$19$2e$2$2e$3_$5f$react$40$19$2e$2$2e$3$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "flex-1",
                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$XinXia$2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$6_$40$babel$2b$core$40$7$2e$29$2e$0_$40$opentelemetry$2b$api$40$1$2e$9$2e$0_react$2d$dom$40$19$2e$2$2e$3_react$40$19$2e$2$2e$3_$5f$react$40$19$2e$2$2e$3$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("iframe", {
                        srcDoc: srcdoc,
                        sandbox: "allow-same-origin allow-scripts",
                        className: "w-full h-full border-0"
                    }, void 0, false, {
                        fileName: "[project]/XinXia/apps/web/src/app/demolar/vitrin/page.tsx",
                        lineNumber: 94,
                        columnNumber: 11
                    }, this)
                }, void 0, false, {
                    fileName: "[project]/XinXia/apps/web/src/app/demolar/vitrin/page.tsx",
                    lineNumber: 93,
                    columnNumber: 9
                }, this)
            ]
        }, void 0, true, {
            fileName: "[project]/XinXia/apps/web/src/app/demolar/vitrin/page.tsx",
            lineNumber: 64,
            columnNumber: 7
        }, this)
    }, void 0, false, {
        fileName: "[project]/XinXia/apps/web/src/app/demolar/vitrin/page.tsx",
        lineNumber: 60,
        columnNumber: 5
    }, this);
}
// ── Card ─────────────────────────────────────────────────────────
function DemoCard({ demo, onPreview, index }) {
    const ref = (0, __TURBOPACK__imported__module__$5b$project$5d2f$XinXia$2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$6_$40$babel$2b$core$40$7$2e$29$2e$0_$40$opentelemetry$2b$api$40$1$2e$9$2e$0_react$2d$dom$40$19$2e$2$2e$3_react$40$19$2e$2$2e$3_$5f$react$40$19$2e$2$2e$3$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useRef"])(null);
    const [visible, setVisible] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$XinXia$2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$6_$40$babel$2b$core$40$7$2e$29$2e$0_$40$opentelemetry$2b$api$40$1$2e$9$2e$0_react$2d$dom$40$19$2e$2$2e$3_react$40$19$2e$2$2e$3_$5f$react$40$19$2e$2$2e$3$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(false);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$XinXia$2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$6_$40$babel$2b$core$40$7$2e$29$2e$0_$40$opentelemetry$2b$api$40$1$2e$9$2e$0_react$2d$dom$40$19$2e$2$2e$3_react$40$19$2e$2$2e$3_$5f$react$40$19$2e$2$2e$3$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useEffect"])(()=>{
        const el = ref.current;
        if (!el) return;
        const obs = new IntersectionObserver(([e])=>{
            if (e.isIntersecting) {
                setVisible(true);
                obs.unobserve(el);
            }
        }, {
            threshold: 0.05
        });
        obs.observe(el);
        return ()=>obs.disconnect();
    }, []);
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$XinXia$2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$6_$40$babel$2b$core$40$7$2e$29$2e$0_$40$opentelemetry$2b$api$40$1$2e$9$2e$0_react$2d$dom$40$19$2e$2$2e$3_react$40$19$2e$2$2e$3_$5f$react$40$19$2e$2$2e$3$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        ref: ref,
        className: "group bg-card border border-border/30 rounded-2xl overflow-hidden transition-all duration-500 hover:-translate-y-2 hover:shadow-2xl hover:shadow-rust/5 hover:border-rust/30",
        style: {
            opacity: visible ? 1 : 0,
            transform: visible ? 'translateY(0)' : 'translateY(40px)',
            transition: `all .6s cubic-bezier(.4,0,.2,1) ${index % 6 * 80}ms`
        },
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$XinXia$2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$6_$40$babel$2b$core$40$7$2e$29$2e$0_$40$opentelemetry$2b$api$40$1$2e$9$2e$0_react$2d$dom$40$19$2e$2$2e$3_react$40$19$2e$2$2e$3_$5f$react$40$19$2e$2$2e$3$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(LazyIframe, {
                demo: demo
            }, void 0, false, {
                fileName: "[project]/XinXia/apps/web/src/app/demolar/vitrin/page.tsx",
                lineNumber: 124,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$XinXia$2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$6_$40$babel$2b$core$40$7$2e$29$2e$0_$40$opentelemetry$2b$api$40$1$2e$9$2e$0_react$2d$dom$40$19$2e$2$2e$3_react$40$19$2e$2$2e$3_$5f$react$40$19$2e$2$2e$3$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "p-5",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$XinXia$2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$6_$40$babel$2b$core$40$7$2e$29$2e$0_$40$opentelemetry$2b$api$40$1$2e$9$2e$0_react$2d$dom$40$19$2e$2$2e$3_react$40$19$2e$2$2e$3_$5f$react$40$19$2e$2$2e$3$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                        className: "inline-block text-[10px] font-bold px-3 py-1 rounded-full border mb-3",
                        style: {
                            background: `${demo.accent}10`,
                            color: demo.accent,
                            borderColor: `${demo.accent}25`
                        },
                        children: __TURBOPACK__imported__module__$5b$project$5d2f$XinXia$2f$apps$2f$web$2f$src$2f$data$2f$demoVitrinData$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["KATEGORILER"][demo.kategori].ad
                    }, void 0, false, {
                        fileName: "[project]/XinXia/apps/web/src/app/demolar/vitrin/page.tsx",
                        lineNumber: 128,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$XinXia$2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$6_$40$babel$2b$core$40$7$2e$29$2e$0_$40$opentelemetry$2b$api$40$1$2e$9$2e$0_react$2d$dom$40$19$2e$2$2e$3_react$40$19$2e$2$2e$3_$5f$react$40$19$2e$2$2e$3$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("h3", {
                        className: "font-syne font-extrabold text-foreground text-lg mb-1 tracking-tight",
                        children: demo.ad
                    }, void 0, false, {
                        fileName: "[project]/XinXia/apps/web/src/app/demolar/vitrin/page.tsx",
                        lineNumber: 135,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$XinXia$2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$6_$40$babel$2b$core$40$7$2e$29$2e$0_$40$opentelemetry$2b$api$40$1$2e$9$2e$0_react$2d$dom$40$19$2e$2$2e$3_react$40$19$2e$2$2e$3_$5f$react$40$19$2e$2$2e$3$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                        className: "text-muted-foreground text-xs leading-relaxed mb-4 line-clamp-2",
                        children: [
                            demo.heroBaslik,
                            " — ",
                            demo.heroAlt
                        ]
                    }, void 0, true, {
                        fileName: "[project]/XinXia/apps/web/src/app/demolar/vitrin/page.tsx",
                        lineNumber: 136,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$XinXia$2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$6_$40$babel$2b$core$40$7$2e$29$2e$0_$40$opentelemetry$2b$api$40$1$2e$9$2e$0_react$2d$dom$40$19$2e$2$2e$3_react$40$19$2e$2$2e$3_$5f$react$40$19$2e$2$2e$3$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "flex items-center justify-between",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$XinXia$2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$6_$40$babel$2b$core$40$7$2e$29$2e$0_$40$opentelemetry$2b$api$40$1$2e$9$2e$0_react$2d$dom$40$19$2e$2$2e$3_react$40$19$2e$2$2e$3_$5f$react$40$19$2e$2$2e$3$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "flex items-center gap-1",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$XinXia$2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$6_$40$babel$2b$core$40$7$2e$29$2e$0_$40$opentelemetry$2b$api$40$1$2e$9$2e$0_react$2d$dom$40$19$2e$2$2e$3_react$40$19$2e$2$2e$3_$5f$react$40$19$2e$2$2e$3$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                        className: "text-gold text-xs",
                                        children: "★★★★★"
                                    }, void 0, false, {
                                        fileName: "[project]/XinXia/apps/web/src/app/demolar/vitrin/page.tsx",
                                        lineNumber: 142,
                                        columnNumber: 13
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$XinXia$2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$6_$40$babel$2b$core$40$7$2e$29$2e$0_$40$opentelemetry$2b$api$40$1$2e$9$2e$0_react$2d$dom$40$19$2e$2$2e$3_react$40$19$2e$2$2e$3_$5f$react$40$19$2e$2$2e$3$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                        className: "text-muted-foreground/40 text-[10px] ml-1",
                                        children: "Hazır"
                                    }, void 0, false, {
                                        fileName: "[project]/XinXia/apps/web/src/app/demolar/vitrin/page.tsx",
                                        lineNumber: 143,
                                        columnNumber: 13
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/XinXia/apps/web/src/app/demolar/vitrin/page.tsx",
                                lineNumber: 141,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$XinXia$2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$6_$40$babel$2b$core$40$7$2e$29$2e$0_$40$opentelemetry$2b$api$40$1$2e$9$2e$0_react$2d$dom$40$19$2e$2$2e$3_react$40$19$2e$2$2e$3_$5f$react$40$19$2e$2$2e$3$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "flex gap-2",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$XinXia$2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$6_$40$babel$2b$core$40$7$2e$29$2e$0_$40$opentelemetry$2b$api$40$1$2e$9$2e$0_react$2d$dom$40$19$2e$2$2e$3_react$40$19$2e$2$2e$3_$5f$react$40$19$2e$2$2e$3$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                        onClick: ()=>onPreview(demo),
                                        className: "px-4 py-2 rounded-xl border border-border/40 bg-warm/10 text-foreground/80 text-xs font-semibold cursor-pointer transition-all hover:bg-warm/20 hover:text-foreground",
                                        children: "Önizle"
                                    }, void 0, false, {
                                        fileName: "[project]/XinXia/apps/web/src/app/demolar/vitrin/page.tsx",
                                        lineNumber: 146,
                                        columnNumber: 13
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$XinXia$2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$6_$40$babel$2b$core$40$7$2e$29$2e$0_$40$opentelemetry$2b$api$40$1$2e$9$2e$0_react$2d$dom$40$19$2e$2$2e$3_react$40$19$2e$2$2e$3_$5f$react$40$19$2e$2$2e$3$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$XinXia$2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$6_$40$babel$2b$core$40$7$2e$29$2e$0_$40$opentelemetry$2b$api$40$1$2e$9$2e$0_react$2d$dom$40$19$2e$2$2e$3_react$40$19$2e$2$2e$3_$5f$react$40$19$2e$2$2e$3$2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"], {
                                        href: `/onboarding?sektor=${demo.id}`,
                                        className: "px-4 py-2 rounded-xl bg-rust hover:bg-rust/90 text-foreground text-xs font-bold transition-colors",
                                        children: "Seç →"
                                    }, void 0, false, {
                                        fileName: "[project]/XinXia/apps/web/src/app/demolar/vitrin/page.tsx",
                                        lineNumber: 152,
                                        columnNumber: 13
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/XinXia/apps/web/src/app/demolar/vitrin/page.tsx",
                                lineNumber: 145,
                                columnNumber: 11
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/XinXia/apps/web/src/app/demolar/vitrin/page.tsx",
                        lineNumber: 140,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/XinXia/apps/web/src/app/demolar/vitrin/page.tsx",
                lineNumber: 126,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/XinXia/apps/web/src/app/demolar/vitrin/page.tsx",
        lineNumber: 115,
        columnNumber: 5
    }, this);
}
function VitrinPage() {
    const [kat, setKat] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$XinXia$2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$6_$40$babel$2b$core$40$7$2e$29$2e$0_$40$opentelemetry$2b$api$40$1$2e$9$2e$0_react$2d$dom$40$19$2e$2$2e$3_react$40$19$2e$2$2e$3_$5f$react$40$19$2e$2$2e$3$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])('tumu');
    const [q, setQ] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$XinXia$2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$6_$40$babel$2b$core$40$7$2e$29$2e$0_$40$opentelemetry$2b$api$40$1$2e$9$2e$0_react$2d$dom$40$19$2e$2$2e$3_react$40$19$2e$2$2e$3_$5f$react$40$19$2e$2$2e$3$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])('');
    const [qd, setQd] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$XinXia$2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$6_$40$babel$2b$core$40$7$2e$29$2e$0_$40$opentelemetry$2b$api$40$1$2e$9$2e$0_react$2d$dom$40$19$2e$2$2e$3_react$40$19$2e$2$2e$3_$5f$react$40$19$2e$2$2e$3$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])('');
    const [sort, setSort] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$XinXia$2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$6_$40$babel$2b$core$40$7$2e$29$2e$0_$40$opentelemetry$2b$api$40$1$2e$9$2e$0_react$2d$dom$40$19$2e$2$2e$3_react$40$19$2e$2$2e$3_$5f$react$40$19$2e$2$2e$3$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])('default');
    const [modal, setModal] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$XinXia$2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$6_$40$babel$2b$core$40$7$2e$29$2e$0_$40$opentelemetry$2b$api$40$1$2e$9$2e$0_react$2d$dom$40$19$2e$2$2e$3_react$40$19$2e$2$2e$3_$5f$react$40$19$2e$2$2e$3$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(null);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$XinXia$2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$6_$40$babel$2b$core$40$7$2e$29$2e$0_$40$opentelemetry$2b$api$40$1$2e$9$2e$0_react$2d$dom$40$19$2e$2$2e$3_react$40$19$2e$2$2e$3_$5f$react$40$19$2e$2$2e$3$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useEffect"])(()=>{
        const t = setTimeout(()=>setQd(q), 200);
        return ()=>clearTimeout(t);
    }, [
        q
    ]);
    const close = (0, __TURBOPACK__imported__module__$5b$project$5d2f$XinXia$2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$6_$40$babel$2b$core$40$7$2e$29$2e$0_$40$opentelemetry$2b$api$40$1$2e$9$2e$0_react$2d$dom$40$19$2e$2$2e$3_react$40$19$2e$2$2e$3_$5f$react$40$19$2e$2$2e$3$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useCallback"])(()=>setModal(null), []);
    let list = __TURBOPACK__imported__module__$5b$project$5d2f$XinXia$2f$apps$2f$web$2f$src$2f$data$2f$demoVitrinData$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["DEMOLAR"].filter((d)=>{
        if (kat !== 'tumu' && d.kategori !== kat) return false;
        if (qd) {
            const s = qd.toLowerCase();
            return d.ad.toLowerCase().includes(s) || d.heroBaslik.toLowerCase().includes(s);
        }
        return true;
    });
    if (sort === 'az') list = [
        ...list
    ].sort((a, b)=>a.ad.localeCompare(b.ad, 'tr'));
    if (sort === 'kat') list = [
        ...list
    ].sort((a, b)=>a.kategori.localeCompare(b.kategori));
    const counts = {
        tumu: __TURBOPACK__imported__module__$5b$project$5d2f$XinXia$2f$apps$2f$web$2f$src$2f$data$2f$demoVitrinData$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["DEMOLAR"].length
    };
    Object.keys(__TURBOPACK__imported__module__$5b$project$5d2f$XinXia$2f$apps$2f$web$2f$src$2f$data$2f$demoVitrinData$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["KATEGORILER"]).forEach((k)=>{
        counts[k] = __TURBOPACK__imported__module__$5b$project$5d2f$XinXia$2f$apps$2f$web$2f$src$2f$data$2f$demoVitrinData$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["DEMOLAR"].filter((d)=>d.kategori === k).length;
    });
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$XinXia$2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$6_$40$babel$2b$core$40$7$2e$29$2e$0_$40$opentelemetry$2b$api$40$1$2e$9$2e$0_react$2d$dom$40$19$2e$2$2e$3_react$40$19$2e$2$2e$3_$5f$react$40$19$2e$2$2e$3$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$XinXia$2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$6_$40$babel$2b$core$40$7$2e$29$2e$0_$40$opentelemetry$2b$api$40$1$2e$9$2e$0_react$2d$dom$40$19$2e$2$2e$3_react$40$19$2e$2$2e$3_$5f$react$40$19$2e$2$2e$3$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Fragment"], {
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$XinXia$2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$6_$40$babel$2b$core$40$7$2e$29$2e$0_$40$opentelemetry$2b$api$40$1$2e$9$2e$0_react$2d$dom$40$19$2e$2$2e$3_react$40$19$2e$2$2e$3_$5f$react$40$19$2e$2$2e$3$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("style", {
                children: `
        @keyframes fadeIn{from{opacity:0}to{opacity:1}}
        @keyframes modalIn{from{transform:scale(.92);opacity:0}to{transform:scale(1);opacity:1}}
      `
            }, void 0, false, {
                fileName: "[project]/XinXia/apps/web/src/app/demolar/vitrin/page.tsx",
                lineNumber: 189,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$XinXia$2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$6_$40$babel$2b$core$40$7$2e$29$2e$0_$40$opentelemetry$2b$api$40$1$2e$9$2e$0_react$2d$dom$40$19$2e$2$2e$3_react$40$19$2e$2$2e$3_$5f$react$40$19$2e$2$2e$3$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "min-h-screen bg-background text-foreground font-lora",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$XinXia$2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$6_$40$babel$2b$core$40$7$2e$29$2e$0_$40$opentelemetry$2b$api$40$1$2e$9$2e$0_react$2d$dom$40$19$2e$2$2e$3_react$40$19$2e$2$2e$3_$5f$react$40$19$2e$2$2e$3$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("header", {
                        className: "sticky top-0 z-50 px-6 md:px-10 h-16 flex items-center justify-between bg-background/80 backdrop-blur-2xl border-b border-border/10",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$XinXia$2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$6_$40$babel$2b$core$40$7$2e$29$2e$0_$40$opentelemetry$2b$api$40$1$2e$9$2e$0_react$2d$dom$40$19$2e$2$2e$3_react$40$19$2e$2$2e$3_$5f$react$40$19$2e$2$2e$3$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$XinXia$2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$6_$40$babel$2b$core$40$7$2e$29$2e$0_$40$opentelemetry$2b$api$40$1$2e$9$2e$0_react$2d$dom$40$19$2e$2$2e$3_react$40$19$2e$2$2e$3_$5f$react$40$19$2e$2$2e$3$2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"], {
                                href: "/",
                                className: "font-syne font-black text-xl text-foreground tracking-tight",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$XinXia$2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$6_$40$babel$2b$core$40$7$2e$29$2e$0_$40$opentelemetry$2b$api$40$1$2e$9$2e$0_react$2d$dom$40$19$2e$2$2e$3_react$40$19$2e$2$2e$3_$5f$react$40$19$2e$2$2e$3$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                        className: "text-rust",
                                        children: "K"
                                    }, void 0, false, {
                                        fileName: "[project]/XinXia/apps/web/src/app/demolar/vitrin/page.tsx",
                                        lineNumber: 199,
                                        columnNumber: 13
                                    }, this),
                                    "EPENK",
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$XinXia$2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$6_$40$babel$2b$core$40$7$2e$29$2e$0_$40$opentelemetry$2b$api$40$1$2e$9$2e$0_react$2d$dom$40$19$2e$2$2e$3_react$40$19$2e$2$2e$3_$5f$react$40$19$2e$2$2e$3$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                        className: "text-rust text-sm font-normal",
                                        children: ".ai"
                                    }, void 0, false, {
                                        fileName: "[project]/XinXia/apps/web/src/app/demolar/vitrin/page.tsx",
                                        lineNumber: 199,
                                        columnNumber: 54
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/XinXia/apps/web/src/app/demolar/vitrin/page.tsx",
                                lineNumber: 198,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$XinXia$2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$6_$40$babel$2b$core$40$7$2e$29$2e$0_$40$opentelemetry$2b$api$40$1$2e$9$2e$0_react$2d$dom$40$19$2e$2$2e$3_react$40$19$2e$2$2e$3_$5f$react$40$19$2e$2$2e$3$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "hidden md:flex items-center gap-4",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$XinXia$2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$6_$40$babel$2b$core$40$7$2e$29$2e$0_$40$opentelemetry$2b$api$40$1$2e$9$2e$0_react$2d$dom$40$19$2e$2$2e$3_react$40$19$2e$2$2e$3_$5f$react$40$19$2e$2$2e$3$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                        className: "bg-rust/10 border border-rust/20 text-rust text-[11px] font-bold px-4 py-1.5 rounded-full",
                                        children: [
                                            "✨ ",
                                            __TURBOPACK__imported__module__$5b$project$5d2f$XinXia$2f$apps$2f$web$2f$src$2f$data$2f$demoVitrinData$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["DEMOLAR"].length,
                                            " Hazır Şablon"
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/XinXia/apps/web/src/app/demolar/vitrin/page.tsx",
                                        lineNumber: 202,
                                        columnNumber: 13
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$XinXia$2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$6_$40$babel$2b$core$40$7$2e$29$2e$0_$40$opentelemetry$2b$api$40$1$2e$9$2e$0_react$2d$dom$40$19$2e$2$2e$3_react$40$19$2e$2$2e$3_$5f$react$40$19$2e$2$2e$3$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$XinXia$2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$6_$40$babel$2b$core$40$7$2e$29$2e$0_$40$opentelemetry$2b$api$40$1$2e$9$2e$0_react$2d$dom$40$19$2e$2$2e$3_react$40$19$2e$2$2e$3_$5f$react$40$19$2e$2$2e$3$2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"], {
                                        href: "/fiyatlar",
                                        className: "text-muted-foreground text-sm hover:text-foreground transition-colors",
                                        children: "Fiyatlar"
                                    }, void 0, false, {
                                        fileName: "[project]/XinXia/apps/web/src/app/demolar/vitrin/page.tsx",
                                        lineNumber: 205,
                                        columnNumber: 13
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/XinXia/apps/web/src/app/demolar/vitrin/page.tsx",
                                lineNumber: 201,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$XinXia$2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$6_$40$babel$2b$core$40$7$2e$29$2e$0_$40$opentelemetry$2b$api$40$1$2e$9$2e$0_react$2d$dom$40$19$2e$2$2e$3_react$40$19$2e$2$2e$3_$5f$react$40$19$2e$2$2e$3$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$XinXia$2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$6_$40$babel$2b$core$40$7$2e$29$2e$0_$40$opentelemetry$2b$api$40$1$2e$9$2e$0_react$2d$dom$40$19$2e$2$2e$3_react$40$19$2e$2$2e$3_$5f$react$40$19$2e$2$2e$3$2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"], {
                                href: "/onboarding",
                                className: "bg-rust hover:bg-rust/90 text-foreground px-5 py-2.5 rounded-xl text-sm font-bold font-syne transition-colors shadow-lg shadow-rust/20",
                                children: "Hemen Başla"
                            }, void 0, false, {
                                fileName: "[project]/XinXia/apps/web/src/app/demolar/vitrin/page.tsx",
                                lineNumber: 209,
                                columnNumber: 11
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/XinXia/apps/web/src/app/demolar/vitrin/page.tsx",
                        lineNumber: 197,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$XinXia$2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$6_$40$babel$2b$core$40$7$2e$29$2e$0_$40$opentelemetry$2b$api$40$1$2e$9$2e$0_react$2d$dom$40$19$2e$2$2e$3_react$40$19$2e$2$2e$3_$5f$react$40$19$2e$2$2e$3$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("section", {
                        className: "text-center pt-20 pb-12 px-6 relative overflow-hidden",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$XinXia$2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$6_$40$babel$2b$core$40$7$2e$29$2e$0_$40$opentelemetry$2b$api$40$1$2e$9$2e$0_react$2d$dom$40$19$2e$2$2e$3_react$40$19$2e$2$2e$3_$5f$react$40$19$2e$2$2e$3$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "absolute top-[-120px] left-1/2 -translate-x-1/2 w-[700px] h-[400px] bg-rust/5 rounded-full blur-3xl pointer-events-none"
                            }, void 0, false, {
                                fileName: "[project]/XinXia/apps/web/src/app/demolar/vitrin/page.tsx",
                                lineNumber: 220,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$XinXia$2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$6_$40$babel$2b$core$40$7$2e$29$2e$0_$40$opentelemetry$2b$api$40$1$2e$9$2e$0_react$2d$dom$40$19$2e$2$2e$3_react$40$19$2e$2$2e$3_$5f$react$40$19$2e$2$2e$3$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "absolute top-[-60px] right-[20%] w-[300px] h-[300px] bg-gold/3 rounded-full blur-3xl pointer-events-none"
                            }, void 0, false, {
                                fileName: "[project]/XinXia/apps/web/src/app/demolar/vitrin/page.tsx",
                                lineNumber: 221,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$XinXia$2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$6_$40$babel$2b$core$40$7$2e$29$2e$0_$40$opentelemetry$2b$api$40$1$2e$9$2e$0_react$2d$dom$40$19$2e$2$2e$3_react$40$19$2e$2$2e$3_$5f$react$40$19$2e$2$2e$3$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("h1", {
                                className: "font-syne font-black text-[clamp(2.2rem,5.5vw,4rem)] leading-[1.05] tracking-tight mb-6 relative",
                                children: [
                                    "Sektörünüzü Seçin,",
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$XinXia$2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$6_$40$babel$2b$core$40$7$2e$29$2e$0_$40$opentelemetry$2b$api$40$1$2e$9$2e$0_react$2d$dom$40$19$2e$2$2e$3_react$40$19$2e$2$2e$3_$5f$react$40$19$2e$2$2e$3$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("br", {}, void 0, false, {
                                        fileName: "[project]/XinXia/apps/web/src/app/demolar/vitrin/page.tsx",
                                        lineNumber: 224,
                                        columnNumber: 31
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$XinXia$2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$6_$40$babel$2b$core$40$7$2e$29$2e$0_$40$opentelemetry$2b$api$40$1$2e$9$2e$0_react$2d$dom$40$19$2e$2$2e$3_react$40$19$2e$2$2e$3_$5f$react$40$19$2e$2$2e$3$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                        className: "bg-gradient-to-r from-rust via-gold to-rust bg-clip-text text-transparent",
                                        children: "Sitenizi Görün"
                                    }, void 0, false, {
                                        fileName: "[project]/XinXia/apps/web/src/app/demolar/vitrin/page.tsx",
                                        lineNumber: 225,
                                        columnNumber: 13
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/XinXia/apps/web/src/app/demolar/vitrin/page.tsx",
                                lineNumber: 223,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$XinXia$2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$6_$40$babel$2b$core$40$7$2e$29$2e$0_$40$opentelemetry$2b$api$40$1$2e$9$2e$0_react$2d$dom$40$19$2e$2$2e$3_react$40$19$2e$2$2e$3_$5f$react$40$19$2e$2$2e$3$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                className: "text-muted-foreground max-w-xl mx-auto text-sm md:text-base leading-relaxed mb-10",
                                children: [
                                    __TURBOPACK__imported__module__$5b$project$5d2f$XinXia$2f$apps$2f$web$2f$src$2f$data$2f$demoVitrinData$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["DEMOLAR"].length,
                                    " farklı sektör için profesyonel web sitesi şablonu. Beğendiğinizi seçin, AI dakikalar içinde sitenizi oluştursun."
                                ]
                            }, void 0, true, {
                                fileName: "[project]/XinXia/apps/web/src/app/demolar/vitrin/page.tsx",
                                lineNumber: 229,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$XinXia$2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$6_$40$babel$2b$core$40$7$2e$29$2e$0_$40$opentelemetry$2b$api$40$1$2e$9$2e$0_react$2d$dom$40$19$2e$2$2e$3_react$40$19$2e$2$2e$3_$5f$react$40$19$2e$2$2e$3$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "relative max-w-lg mx-auto mb-8",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$XinXia$2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$6_$40$babel$2b$core$40$7$2e$29$2e$0_$40$opentelemetry$2b$api$40$1$2e$9$2e$0_react$2d$dom$40$19$2e$2$2e$3_react$40$19$2e$2$2e$3_$5f$react$40$19$2e$2$2e$3$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                        className: "absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground/30 text-sm",
                                        children: "🔍"
                                    }, void 0, false, {
                                        fileName: "[project]/XinXia/apps/web/src/app/demolar/vitrin/page.tsx",
                                        lineNumber: 235,
                                        columnNumber: 13
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$XinXia$2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$6_$40$babel$2b$core$40$7$2e$29$2e$0_$40$opentelemetry$2b$api$40$1$2e$9$2e$0_react$2d$dom$40$19$2e$2$2e$3_react$40$19$2e$2$2e$3_$5f$react$40$19$2e$2$2e$3$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                        type: "text",
                                        placeholder: "Sektör ara… (restoran, avukat, kuaför)",
                                        value: q,
                                        onChange: (e)=>setQ(e.target.value),
                                        className: "w-full pl-11 pr-5 py-4 bg-card border border-border/30 rounded-2xl text-foreground text-sm outline-none focus:border-rust/50 focus:ring-2 focus:ring-rust/20 transition-all placeholder:text-muted-foreground/30"
                                    }, void 0, false, {
                                        fileName: "[project]/XinXia/apps/web/src/app/demolar/vitrin/page.tsx",
                                        lineNumber: 236,
                                        columnNumber: 13
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/XinXia/apps/web/src/app/demolar/vitrin/page.tsx",
                                lineNumber: 234,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$XinXia$2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$6_$40$babel$2b$core$40$7$2e$29$2e$0_$40$opentelemetry$2b$api$40$1$2e$9$2e$0_react$2d$dom$40$19$2e$2$2e$3_react$40$19$2e$2$2e$3_$5f$react$40$19$2e$2$2e$3$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "flex justify-center gap-2 flex-wrap max-w-3xl mx-auto",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$XinXia$2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$6_$40$babel$2b$core$40$7$2e$29$2e$0_$40$opentelemetry$2b$api$40$1$2e$9$2e$0_react$2d$dom$40$19$2e$2$2e$3_react$40$19$2e$2$2e$3_$5f$react$40$19$2e$2$2e$3$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                        onClick: ()=>setKat('tumu'),
                                        className: `px-5 py-2 rounded-full text-xs font-bold font-syne transition-all ${kat === 'tumu' ? 'bg-rust text-foreground shadow-md shadow-rust/20' : 'bg-warm/10 text-muted-foreground/50 border border-border/20 hover:text-foreground/70 hover:border-border/40'}`,
                                        children: [
                                            "Tümü (",
                                            counts.tumu,
                                            ")"
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/XinXia/apps/web/src/app/demolar/vitrin/page.tsx",
                                        lineNumber: 247,
                                        columnNumber: 13
                                    }, this),
                                    Object.entries(__TURBOPACK__imported__module__$5b$project$5d2f$XinXia$2f$apps$2f$web$2f$src$2f$data$2f$demoVitrinData$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["KATEGORILER"]).map(([k, v])=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$XinXia$2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$6_$40$babel$2b$core$40$7$2e$29$2e$0_$40$opentelemetry$2b$api$40$1$2e$9$2e$0_react$2d$dom$40$19$2e$2$2e$3_react$40$19$2e$2$2e$3_$5f$react$40$19$2e$2$2e$3$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                            onClick: ()=>setKat(k),
                                            className: `px-5 py-2 rounded-full text-xs font-bold font-syne transition-all ${kat === k ? 'bg-rust text-foreground shadow-md shadow-rust/20' : 'bg-warm/10 text-muted-foreground/50 border border-border/20 hover:text-foreground/70 hover:border-border/40'}`,
                                            children: [
                                                v.ad,
                                                " (",
                                                counts[k],
                                                ")"
                                            ]
                                        }, k, true, {
                                            fileName: "[project]/XinXia/apps/web/src/app/demolar/vitrin/page.tsx",
                                            lineNumber: 258,
                                            columnNumber: 15
                                        }, this))
                                ]
                            }, void 0, true, {
                                fileName: "[project]/XinXia/apps/web/src/app/demolar/vitrin/page.tsx",
                                lineNumber: 246,
                                columnNumber: 11
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/XinXia/apps/web/src/app/demolar/vitrin/page.tsx",
                        lineNumber: 218,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$XinXia$2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$6_$40$babel$2b$core$40$7$2e$29$2e$0_$40$opentelemetry$2b$api$40$1$2e$9$2e$0_react$2d$dom$40$19$2e$2$2e$3_react$40$19$2e$2$2e$3_$5f$react$40$19$2e$2$2e$3$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "flex justify-between items-center max-w-[1380px] mx-auto px-6 mb-5",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$XinXia$2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$6_$40$babel$2b$core$40$7$2e$29$2e$0_$40$opentelemetry$2b$api$40$1$2e$9$2e$0_react$2d$dom$40$19$2e$2$2e$3_react$40$19$2e$2$2e$3_$5f$react$40$19$2e$2$2e$3$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                className: "text-muted-foreground/40 text-xs font-bold uppercase tracking-widest",
                                children: [
                                    list.length,
                                    " sonuç"
                                ]
                            }, void 0, true, {
                                fileName: "[project]/XinXia/apps/web/src/app/demolar/vitrin/page.tsx",
                                lineNumber: 275,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$XinXia$2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$6_$40$babel$2b$core$40$7$2e$29$2e$0_$40$opentelemetry$2b$api$40$1$2e$9$2e$0_react$2d$dom$40$19$2e$2$2e$3_react$40$19$2e$2$2e$3_$5f$react$40$19$2e$2$2e$3$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("select", {
                                className: "bg-card border border-border/20 text-foreground/70 px-3 py-2 rounded-xl text-xs outline-none cursor-pointer focus:border-rust/30",
                                value: sort,
                                onChange: (e)=>setSort(e.target.value),
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$XinXia$2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$6_$40$babel$2b$core$40$7$2e$29$2e$0_$40$opentelemetry$2b$api$40$1$2e$9$2e$0_react$2d$dom$40$19$2e$2$2e$3_react$40$19$2e$2$2e$3_$5f$react$40$19$2e$2$2e$3$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("option", {
                                        value: "default",
                                        children: "Varsayılan"
                                    }, void 0, false, {
                                        fileName: "[project]/XinXia/apps/web/src/app/demolar/vitrin/page.tsx",
                                        lineNumber: 283,
                                        columnNumber: 13
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$XinXia$2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$6_$40$babel$2b$core$40$7$2e$29$2e$0_$40$opentelemetry$2b$api$40$1$2e$9$2e$0_react$2d$dom$40$19$2e$2$2e$3_react$40$19$2e$2$2e$3_$5f$react$40$19$2e$2$2e$3$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("option", {
                                        value: "az",
                                        children: "A-Z"
                                    }, void 0, false, {
                                        fileName: "[project]/XinXia/apps/web/src/app/demolar/vitrin/page.tsx",
                                        lineNumber: 284,
                                        columnNumber: 13
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$XinXia$2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$6_$40$babel$2b$core$40$7$2e$29$2e$0_$40$opentelemetry$2b$api$40$1$2e$9$2e$0_react$2d$dom$40$19$2e$2$2e$3_react$40$19$2e$2$2e$3_$5f$react$40$19$2e$2$2e$3$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("option", {
                                        value: "kat",
                                        children: "Kategoriye Göre"
                                    }, void 0, false, {
                                        fileName: "[project]/XinXia/apps/web/src/app/demolar/vitrin/page.tsx",
                                        lineNumber: 285,
                                        columnNumber: 13
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/XinXia/apps/web/src/app/demolar/vitrin/page.tsx",
                                lineNumber: 278,
                                columnNumber: 11
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/XinXia/apps/web/src/app/demolar/vitrin/page.tsx",
                        lineNumber: 274,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$XinXia$2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$6_$40$babel$2b$core$40$7$2e$29$2e$0_$40$opentelemetry$2b$api$40$1$2e$9$2e$0_react$2d$dom$40$19$2e$2$2e$3_react$40$19$2e$2$2e$3_$5f$react$40$19$2e$2$2e$3$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-5 max-w-[1380px] mx-auto px-6 pb-24",
                        children: list.length === 0 ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$XinXia$2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$6_$40$babel$2b$core$40$7$2e$29$2e$0_$40$opentelemetry$2b$api$40$1$2e$9$2e$0_react$2d$dom$40$19$2e$2$2e$3_react$40$19$2e$2$2e$3_$5f$react$40$19$2e$2$2e$3$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "col-span-full text-center py-20",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$XinXia$2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$6_$40$babel$2b$core$40$7$2e$29$2e$0_$40$opentelemetry$2b$api$40$1$2e$9$2e$0_react$2d$dom$40$19$2e$2$2e$3_react$40$19$2e$2$2e$3_$5f$react$40$19$2e$2$2e$3$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                    className: "text-5xl mb-4",
                                    children: "🔍"
                                }, void 0, false, {
                                    fileName: "[project]/XinXia/apps/web/src/app/demolar/vitrin/page.tsx",
                                    lineNumber: 293,
                                    columnNumber: 15
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$XinXia$2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$6_$40$babel$2b$core$40$7$2e$29$2e$0_$40$opentelemetry$2b$api$40$1$2e$9$2e$0_react$2d$dom$40$19$2e$2$2e$3_react$40$19$2e$2$2e$3_$5f$react$40$19$2e$2$2e$3$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                    className: "text-muted-foreground/30 text-sm font-syne",
                                    children: "Bu sektör yakında ekleniyor"
                                }, void 0, false, {
                                    fileName: "[project]/XinXia/apps/web/src/app/demolar/vitrin/page.tsx",
                                    lineNumber: 294,
                                    columnNumber: 15
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/XinXia/apps/web/src/app/demolar/vitrin/page.tsx",
                            lineNumber: 292,
                            columnNumber: 13
                        }, this) : list.map((d, i)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$XinXia$2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$6_$40$babel$2b$core$40$7$2e$29$2e$0_$40$opentelemetry$2b$api$40$1$2e$9$2e$0_react$2d$dom$40$19$2e$2$2e$3_react$40$19$2e$2$2e$3_$5f$react$40$19$2e$2$2e$3$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(DemoCard, {
                                demo: d,
                                index: i,
                                onPreview: setModal
                            }, d.id, false, {
                                fileName: "[project]/XinXia/apps/web/src/app/demolar/vitrin/page.tsx",
                                lineNumber: 296,
                                columnNumber: 34
                            }, this))
                    }, void 0, false, {
                        fileName: "[project]/XinXia/apps/web/src/app/demolar/vitrin/page.tsx",
                        lineNumber: 290,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$XinXia$2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$6_$40$babel$2b$core$40$7$2e$29$2e$0_$40$opentelemetry$2b$api$40$1$2e$9$2e$0_react$2d$dom$40$19$2e$2$2e$3_react$40$19$2e$2$2e$3_$5f$react$40$19$2e$2$2e$3$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("section", {
                        className: "bg-card border-t border-border/10 py-16 px-6 text-center",
                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$XinXia$2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$6_$40$babel$2b$core$40$7$2e$29$2e$0_$40$opentelemetry$2b$api$40$1$2e$9$2e$0_react$2d$dom$40$19$2e$2$2e$3_react$40$19$2e$2$2e$3_$5f$react$40$19$2e$2$2e$3$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "max-w-2xl mx-auto",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$XinXia$2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$6_$40$babel$2b$core$40$7$2e$29$2e$0_$40$opentelemetry$2b$api$40$1$2e$9$2e$0_react$2d$dom$40$19$2e$2$2e$3_react$40$19$2e$2$2e$3_$5f$react$40$19$2e$2$2e$3$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("h2", {
                                    className: "font-syne font-extrabold text-2xl md:text-3xl text-foreground mb-4",
                                    children: [
                                        "Beğendiğiniz Şablonu Seçin,",
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$XinXia$2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$6_$40$babel$2b$core$40$7$2e$29$2e$0_$40$opentelemetry$2b$api$40$1$2e$9$2e$0_react$2d$dom$40$19$2e$2$2e$3_react$40$19$2e$2$2e$3_$5f$react$40$19$2e$2$2e$3$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("br", {}, void 0, false, {
                                            fileName: "[project]/XinXia/apps/web/src/app/demolar/vitrin/page.tsx",
                                            lineNumber: 303,
                                            columnNumber: 42
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$XinXia$2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$6_$40$babel$2b$core$40$7$2e$29$2e$0_$40$opentelemetry$2b$api$40$1$2e$9$2e$0_react$2d$dom$40$19$2e$2$2e$3_react$40$19$2e$2$2e$3_$5f$react$40$19$2e$2$2e$3$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                            className: "text-rust",
                                            children: "AI Sitenizi Kursun"
                                        }, void 0, false, {
                                            fileName: "[project]/XinXia/apps/web/src/app/demolar/vitrin/page.tsx",
                                            lineNumber: 304,
                                            columnNumber: 15
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/XinXia/apps/web/src/app/demolar/vitrin/page.tsx",
                                    lineNumber: 302,
                                    columnNumber: 13
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$XinXia$2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$6_$40$babel$2b$core$40$7$2e$29$2e$0_$40$opentelemetry$2b$api$40$1$2e$9$2e$0_react$2d$dom$40$19$2e$2$2e$3_react$40$19$2e$2$2e$3_$5f$react$40$19$2e$2$2e$3$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                    className: "text-muted-foreground text-sm mb-8 leading-relaxed",
                                    children: "Onboarding sürecinde sektörünüzü seçin, birkaç soruyu yanıtlayın — yapay zeka dakikalar içinde sitenizi oluştursun."
                                }, void 0, false, {
                                    fileName: "[project]/XinXia/apps/web/src/app/demolar/vitrin/page.tsx",
                                    lineNumber: 306,
                                    columnNumber: 13
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$XinXia$2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$6_$40$babel$2b$core$40$7$2e$29$2e$0_$40$opentelemetry$2b$api$40$1$2e$9$2e$0_react$2d$dom$40$19$2e$2$2e$3_react$40$19$2e$2$2e$3_$5f$react$40$19$2e$2$2e$3$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$XinXia$2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$6_$40$babel$2b$core$40$7$2e$29$2e$0_$40$opentelemetry$2b$api$40$1$2e$9$2e$0_react$2d$dom$40$19$2e$2$2e$3_react$40$19$2e$2$2e$3_$5f$react$40$19$2e$2$2e$3$2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"], {
                                    href: "/onboarding",
                                    className: "inline-block bg-rust hover:bg-rust/90 text-foreground px-8 py-4 rounded-2xl font-syne font-bold text-lg transition-colors shadow-xl shadow-rust/20",
                                    children: "Hemen Başla — Ücretsiz Dene 🚀"
                                }, void 0, false, {
                                    fileName: "[project]/XinXia/apps/web/src/app/demolar/vitrin/page.tsx",
                                    lineNumber: 309,
                                    columnNumber: 13
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/XinXia/apps/web/src/app/demolar/vitrin/page.tsx",
                            lineNumber: 301,
                            columnNumber: 11
                        }, this)
                    }, void 0, false, {
                        fileName: "[project]/XinXia/apps/web/src/app/demolar/vitrin/page.tsx",
                        lineNumber: 300,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$XinXia$2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$6_$40$babel$2b$core$40$7$2e$29$2e$0_$40$opentelemetry$2b$api$40$1$2e$9$2e$0_react$2d$dom$40$19$2e$2$2e$3_react$40$19$2e$2$2e$3_$5f$react$40$19$2e$2$2e$3$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("footer", {
                        className: "text-center py-8 border-t border-border/10",
                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$XinXia$2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$6_$40$babel$2b$core$40$7$2e$29$2e$0_$40$opentelemetry$2b$api$40$1$2e$9$2e$0_react$2d$dom$40$19$2e$2$2e$3_react$40$19$2e$2$2e$3_$5f$react$40$19$2e$2$2e$3$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                            className: "text-muted-foreground/30 text-xs",
                            children: [
                                "© 2025 ",
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$XinXia$2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$6_$40$babel$2b$core$40$7$2e$29$2e$0_$40$opentelemetry$2b$api$40$1$2e$9$2e$0_react$2d$dom$40$19$2e$2$2e$3_react$40$19$2e$2$2e$3_$5f$react$40$19$2e$2$2e$3$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                    className: "text-rust/50 font-bold",
                                    children: "kepenk.ai"
                                }, void 0, false, {
                                    fileName: "[project]/XinXia/apps/web/src/app/demolar/vitrin/page.tsx",
                                    lineNumber: 321,
                                    columnNumber: 20
                                }, this),
                                " · Tüm demolar gerçek siteler gibi çalışır"
                            ]
                        }, void 0, true, {
                            fileName: "[project]/XinXia/apps/web/src/app/demolar/vitrin/page.tsx",
                            lineNumber: 320,
                            columnNumber: 11
                        }, this)
                    }, void 0, false, {
                        fileName: "[project]/XinXia/apps/web/src/app/demolar/vitrin/page.tsx",
                        lineNumber: 319,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/XinXia/apps/web/src/app/demolar/vitrin/page.tsx",
                lineNumber: 194,
                columnNumber: 7
            }, this),
            modal && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$XinXia$2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$6_$40$babel$2b$core$40$7$2e$29$2e$0_$40$opentelemetry$2b$api$40$1$2e$9$2e$0_react$2d$dom$40$19$2e$2$2e$3_react$40$19$2e$2$2e$3_$5f$react$40$19$2e$2$2e$3$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(DemoModal, {
                demo: modal,
                onClose: close
            }, void 0, false, {
                fileName: "[project]/XinXia/apps/web/src/app/demolar/vitrin/page.tsx",
                lineNumber: 326,
                columnNumber: 17
            }, this)
        ]
    }, void 0, true);
}
}),
];

//# sourceMappingURL=XinXia_apps_web_src_338ae310._.js.map