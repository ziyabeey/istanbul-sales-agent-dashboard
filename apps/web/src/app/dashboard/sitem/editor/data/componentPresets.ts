/**
 * componentPresets.ts — Ready-made design variant presets per section type.
 *
 * Each preset provides a set of prop overrides that can be applied
 * to an EditorSection to instantly change its visual layout / style.
 */

export interface ComponentPreset {
    id: string
    sectionType: string       // matches EditorSection.type
    name: string              // Turkish display name
    description: string       // Turkish description
    thumbnail: 'minimal' | 'cards' | 'grid' | 'split' | 'centered' | 'dark' | 'gradient' | 'list' | 'carousel' | 'masonry' | 'full'
    props: Record<string, unknown>  // overrides for section props when this preset is applied
}

export const COMPONENT_PRESETS: ComponentPreset[] = [

    /* ═══════ HERO (5 presets) ═══════ */

    {
        id: 'hero-minimal-centered',
        sectionType: 'hero',
        name: 'Minimal Ortali',
        description: 'Sade ve ortali metin, rozet yok, temiz gorunum',
        thumbnail: 'minimal',
        props: { layout: 'centered', overlayOpacity: 40, badgeText: '' },
    },
    {
        id: 'hero-split',
        sectionType: 'hero',
        name: 'Ikiye Bolunmus',
        description: 'Solda metin, sagda gorsel — ikili yerlestirme',
        thumbnail: 'split',
        props: { layout: 'split-left', overlayOpacity: 0 },
    },
    {
        id: 'hero-fullscreen',
        sectionType: 'hero',
        name: 'Tam Ekran',
        description: 'Ekranin tamamini kaplayan etkileyici hero',
        thumbnail: 'full',
        props: { layout: 'fullscreen', overlayOpacity: 50, heroMinHeight: 100 },
    },
    {
        id: 'hero-dark-cinematic',
        sectionType: 'hero',
        name: 'Koyu Sinematik',
        description: 'Karanlik, sinematik atmosfer — koyu overlay',
        thumbnail: 'dark',
        props: { layout: 'fullscreen', overlayOpacity: 70, heroMinHeight: 90 },
    },
    {
        id: 'hero-gradient-wave',
        sectionType: 'hero',
        name: 'Gradient Dalga',
        description: 'Renkli gecis arka plan ile modern gorunum',
        thumbnail: 'gradient',
        props: { layout: 'centered', overlayOpacity: 0, bgType: 'gradient' },
    },

    /* ═══════ SERVICES (4 presets) ═══════ */

    {
        id: 'services-card-grid',
        sectionType: 'services',
        name: 'Kart Grid',
        description: '3 sutunlu hizmet karti izgarasi',
        thumbnail: 'cards',
        props: { columns: '3', cardStyle: 'card', showIcon: true, showPrice: true },
    },
    {
        id: 'services-minimal-list',
        sectionType: 'services',
        name: 'Minimal Liste',
        description: 'Tek sutun, sade liste gorunumu',
        thumbnail: 'list',
        props: { columns: '1', cardStyle: 'minimal', showIcon: false, showPrice: true },
    },
    {
        id: 'services-icon-text',
        sectionType: 'services',
        name: 'Ikon + Metin',
        description: 'Ikon odakli izgara, fiyat gizli',
        thumbnail: 'grid',
        props: { columns: '3', cardStyle: 'icon-only', showIcon: true, showPrice: false },
    },
    {
        id: 'services-visual-cards',
        sectionType: 'services',
        name: 'Gorsel Kartlar',
        description: 'Gorsel iceren genis kartlar, sure bilgisi dahil',
        thumbnail: 'cards',
        props: { columns: '2', cardStyle: 'card', showIcon: true, showPrice: true, showDuration: true },
    },

    /* ═══════ TESTIMONIALS (4 presets) ═══════ */

    {
        id: 'testimonials-carousel',
        sectionType: 'testimonials',
        name: 'Kart Carousel',
        description: 'Otomatik kayan yorum kartlari',
        thumbnail: 'carousel',
        props: { layout: 'carousel', showStars: true, showAvatar: true, autoplaySpeed: 5 },
    },
    {
        id: 'testimonials-single',
        sectionType: 'testimonials',
        name: 'Tek Buyuk',
        description: 'Tek buyuk alinti gorunumu, etkili',
        thumbnail: 'centered',
        props: { layout: 'single', showStars: true, showAvatar: true },
    },
    {
        id: 'testimonials-grid',
        sectionType: 'testimonials',
        name: 'Grid Kartlar',
        description: 'Yan yana duzenlenmis yorum kartlari',
        thumbnail: 'cards',
        props: { layout: 'cards', showStars: true, showAvatar: true },
    },
    {
        id: 'testimonials-minimal',
        sectionType: 'testimonials',
        name: 'Minimal',
        description: 'Sade serit gorunumu, avatar ve yildiz yok',
        thumbnail: 'carousel',
        props: { layout: 'carousel', showStars: false, showAvatar: false, autoplaySpeed: 3 },
    },

    /* ═══════ CONTACT (3 presets) ═══════ */

    {
        id: 'contact-form-map',
        sectionType: 'contact',
        name: 'Form + Harita',
        description: 'Tam iletisim formu, harita dahil',
        thumbnail: 'split',
        props: { showMap: true, showPhone: true, showEmail: true, showAddress: true, kvkkConsent: true },
    },
    {
        id: 'contact-minimal-form',
        sectionType: 'contact',
        name: 'Minimal Form',
        description: 'Sadece form alanlari, sade gorunum',
        thumbnail: 'minimal',
        props: { showMap: false, showPhone: true, showEmail: true, showAddress: false },
    },
    {
        id: 'contact-card',
        sectionType: 'contact',
        name: 'Iletisim Karti',
        description: 'Kart stilinde iletisim bilgileri',
        thumbnail: 'cards',
        props: { showMap: false, showPhone: true, showEmail: true, showAddress: true },
    },

    /* ═══════ GALLERY (4 presets) ═══════ */

    {
        id: 'gallery-masonry',
        sectionType: 'gallery',
        name: 'Masonry',
        description: 'Farkli yuksekliklerde dogal izgara',
        thumbnail: 'masonry',
        props: { columns: '3', layout: 'masonry', lightbox: true, hoverEffect: 'zoom' },
    },
    {
        id: 'gallery-equal-grid',
        sectionType: 'gallery',
        name: 'Esit Grid',
        description: 'Kare oran, duzgun izgara gorunumu',
        thumbnail: 'grid',
        props: { columns: '3', layout: 'grid', lightbox: true, aspectRatio: 'square' },
    },
    {
        id: 'gallery-wide-slider',
        sectionType: 'gallery',
        name: 'Genis Slayt',
        description: 'Tam genislik, 16:9 oran slayt gorunumu',
        thumbnail: 'full',
        props: { columns: '1', layout: 'grid', lightbox: false, aspectRatio: '16:9' },
    },
    {
        id: 'gallery-filterable',
        sectionType: 'gallery',
        name: 'Filtreli Grid',
        description: 'Kategori filtreli 4 sutunlu izgara',
        thumbnail: 'grid',
        props: { columns: '4', layout: 'grid', lightbox: true, hoverEffect: 'darken' },
    },
]

/**
 * Return all presets for a given section type.
 */
export function getPresetsForSection(sectionType: string): ComponentPreset[] {
    return COMPONENT_PRESETS.filter(p => p.sectionType === sectionType)
}
