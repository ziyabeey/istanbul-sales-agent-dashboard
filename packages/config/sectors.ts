export type QuestionType =
    | 'text' | 'textarea' | 'tel' | 'number' | 'select' | 'multi-select'
    | 'toggle' | 'time-range' | 'price' | 'dynamic-list' | 'triple-form' | 'image-upload';

export interface SectorQuestion {
    id: string;
    label: string;
    type: QuestionType;
    options?: string[]; // Sadece select veya multi-select için
}

export interface SectorConfig {
    id: string;
    label: string;
    emoji: string;
    slug: string;
    group: string;
    keywords: string[];
    onboardingQuestions: SectorQuestion[];
    pageContent: {
        hero: {
            headline: string;
            subheadline: string;
        };
        features: { icon: string; title: string; desc: string }[];
        faq: { q: string; a: string }[];
        demoSlug: string;
        cta: string;
    };
    templates: {
        html: string;
        nextjs: string;
    };
    unsplashKeyword: string;
    colorPalette: {
        primary: string;
        bg: string;
        accent: string;
        text: string;
    };
    fonts: {
        heading: string;
        body: string;
    };
    layoutType: 'A' | 'B' | 'C' | 'D' | 'E'; // Demo layout guide
}

// 34 Sektörün yapılandırılması
export const SECTORS: Record<string, SectorConfig> = {
    restoran: {
        id: 'restoran',
        label: 'Restoran',
        emoji: '🍽️',
        slug: 'restoran',
        group: 'yeme-icme',
        keywords: ['restoran web sitesi', 'lokanta dijital', 'online menü'],
        onboardingQuestions: [
            { id: 'menu_categories', label: 'Menü kategorileri', type: 'dynamic-list' },
            { id: 'featured_dishes', label: 'Öne çıkan 3 yemek', type: 'triple-form' },
            { id: 'price_range', label: 'Kişi başı ortalama fiyat', type: 'select', options: ['₺50-100', '₺100-200', '₺200-400', '₺400+'] },
            { id: 'reservation', label: 'Rezervasyon alıyor musunuz?', type: 'toggle' },
            { id: 'delivery', label: 'Paket servis?', type: 'toggle' },
            { id: 'cuisine_type', label: 'Mutfak türü', type: 'multi-select', options: ['Türk', 'İtalyan', 'Deniz Ürünleri', 'Dünya Mutfağı', 'Fast Food', 'Ev Yemekleri'] },
        ],
        pageContent: {
            hero: {
                headline: 'Restoranınız 7/24 Dijitalde',
                subheadline: 'Online menü, rezervasyon, Google yorumları — hepsi tek platformda.',
            },
            features: [
                { icon: '📋', title: 'Dijital Menü', desc: 'QR kod ile masada otomatik menü' },
                { icon: '📅', title: 'Online Rezervasyon', desc: 'WA botu 7/24 masa alır' },
                { icon: '⭐', title: 'Yorum Yönetimi', desc: 'Google yorumlarına anında yanıt' },
                { icon: '📸', title: 'İçerik Üretimi', desc: 'Günlük Instagram postu hazır' },
            ],
            faq: [
                { q: 'QR menü nasıl çalışır?', a: 'Masalara yerleştireceğiniz karekod okutulduğunda müşteriler direkt dijital menünüze yönlendirilir. PDF değildir, interaktiftir.' },
                { q: 'Rezervasyon WhatsApp\'tan alınabilir mi?', a: 'Evet, yapay zeka botumuz müşterilerle konuşarak müsaitlik durumunuza göre masayı rezerve eder.' },
            ],
            demoSlug: 'restoran-demo',
            cta: 'Restoranınızı Dijitalleştirin',
        },
        templates: {
            html: 'restoran-html-v1',
            nextjs: 'restoran-nextjs-v1',
        },
        unsplashKeyword: 'turkish restaurant food',
        colorPalette: { primary: '#0f0804', bg: '#1a0f08', accent: '#c2440e', text: '#f2e8d9' },
        fonts: { heading: 'Cormorant Garamond', body: 'Source Sans 3' },
        layoutType: 'A',
    },
    berber: {
        id: 'berber',
        label: 'Berber & Kuaför',
        emoji: '✂️',
        slug: 'berber',
        group: 'guzellik-bakim',
        keywords: ['berber web sitesi', 'kuaför randevu sistemi', 'dijital salon'],
        onboardingQuestions: [
            { id: 'services_list', label: 'Hizmetler ve Fiyatlar', type: 'dynamic-list' },
            { id: 'staff_members', label: 'Çalışan Ustalar', type: 'dynamic-list' },
            { id: 'appointment_duration', label: 'Ortalama işlem süresi', type: 'select', options: ['15 dk', '30 dk', '45 dk', '1 saat'] },
            { id: 'has_parking', label: 'Otopark var mı?', type: 'toggle' },
        ],
        pageContent: {
            hero: {
                headline: 'Salonunuz Dijitalde, Randevular Otomatikte',
                subheadline: 'Yapay zeka asistanı sizin yerinize randevu alsın, Instagram\'ı yönetsin.',
            },
            features: [
                { icon: '📅', title: 'AI Randevu', desc: 'Siz tıraş yaparken bot WhatsApp\'tan randevuyu ayarlar' },
                { icon: '🔔', title: 'Hatırlatıcı', desc: 'Müşteriye 2 saat kala SMS gider' },
                { icon: '📸', title: 'Sosyal Medya', desc: 'Öncesi/Sonrası postları hazır' },
                { icon: '⭐', title: 'Yorumlar', desc: 'Google haritalardaki puanınız uçar' },
            ],
            faq: [
                { q: 'Randevu saatleri çakışabilir mi?', a: 'Hayır, asistan Google Takviminize tam entegredir ve anlık boşlukları görür.' },
                { q: 'Eski müşterilere SMS atabilir miyim?', a: 'Evet, 3 aydır gelmeyenlere özel indirim SMSi atabilirsiniz.' },
            ],
            demoSlug: 'berber-demo',
            cta: 'Salonunuzu Dijitalleştirin',
        },
        templates: {
            html: 'berber-html-v1',
            nextjs: 'berber-nextjs-v1',
        },
        unsplashKeyword: 'barbershop haircut',
        colorPalette: { primary: '#111827', bg: '#030712', accent: '#fbbf24', text: '#f8fafc' },
        fonts: { heading: 'Oswald', body: 'Inter' },
        layoutType: 'B',
    },
    // Not: Prodüksiyonda tüm 34 sektör burada tanımlanacaktır. Burada yapı gereği 2 örnek verilmiştir.
    klinik: {
        id: 'klinik',
        label: 'Klinik / Diş Hekimi',
        emoji: '🏥',
        slug: 'klinik',
        group: 'saglik',
        keywords: ['diş kliğini websitesi', 'doktor randevu', 'klinik dijital'],
        onboardingQuestions: [
            { id: 'specialties', label: 'Uzmanlık Alanları', type: 'multi-select', options: ['İmplant', 'Ortodonti', 'Gülüş Tasarımı', 'Çocuk Diş', 'Beyazlatma'] },
            { id: 'insurances', label: 'Anlaşmalı Kurumlar', type: 'dynamic-list' },
            { id: 'urgency', label: 'Acil Vaka Alınır mı?', type: 'toggle' },
        ],
        pageContent: {
            hero: {
                headline: 'Profesyonel Kliniğiniz İçin Yapay Zeka',
                subheadline: 'Hasta sorularına anında yanıt, 7/24 randevu yönetimi ve SEO.',
            },
            features: [
                { icon: '💬', title: '7/24 Asistan', desc: 'Fiyat ve tedavi sorularına akıllı yanıtlar' },
                { icon: '📅', title: 'Online Randevu', desc: 'Google entegreli randevu sistemi' },
                { icon: '📚', title: 'Blog Üretimi', desc: 'SEO uyumlu dental blog yazıları' },
                { icon: '⭐', title: 'İtibar Yönetimi', desc: 'Doktortakvimi/Google yorum yanıtları' },
            ],
            faq: [
                { q: 'KVKK uyumlu mu?', a: 'Evet, tüm asistan diyalogları sağlık verileri maskelenerek tutulur.' },
            ],
            demoSlug: 'klinik-demo',
            cta: 'Kliniği Dijitalleştir',
        },
        templates: { html: 'klinik-html-v1', nextjs: 'klinik-nextjs-v1' },
        unsplashKeyword: 'dental clinic modern',
        colorPalette: { primary: '#0f172a', bg: '#f8fafc', accent: '#0ea5e9', text: '#334155' },
        fonts: { heading: 'Playfair Display', body: 'Roboto' },
        layoutType: 'C',
    }
};

export const SECTOR_GROUPS = [
    { id: 'yeme-icme', label: 'Yeme & İçme', icon: '🍽️' },
    { id: 'guzellik-bakim', label: 'Güzellik & Bakım', icon: '💅' },
    { id: 'saglik', label: 'Sağlık', icon: '🏥' },
    { id: 'profesyonel', label: 'Profesyonel', icon: '⚖️' },
    { id: 'spor-yasam', label: 'Spor & Yaşam', icon: '💪' },
    { id: 'perakende', label: 'Perakende', icon: '🛍️' },
    { id: 'hizmet', label: 'Hizmet', icon: '🛠️' },
];
