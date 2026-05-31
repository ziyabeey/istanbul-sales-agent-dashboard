/* ── Section Inspector Config ──
   Per-section-type property schemas for the visual editor inspector panel.
   All labels in Turkish.
*/

export interface InspectorField {
    key: string
    label: string
    type: 'text' | 'textarea' | 'color' | 'select' | 'number' | 'toggle' | 'range'
    options?: { value: string; label: string }[]
    defaultValue?: unknown
    group: string
    min?: number
    max?: number
    step?: number
}

export interface SectionInspectorDef {
    type: string
    label: string
    icon: string
    fields: InspectorField[]
}

export const SECTION_INSPECTORS: SectionInspectorDef[] = [
    /* ── 1. Hero ── */
    {
        type: 'hero',
        label: 'Hero Bölümü',
        icon: '🎯',
        fields: [
            {
                key: 'layout',
                label: 'Yerleşim',
                type: 'select',
                options: [
                    { value: 'centered', label: 'Ortalanmış' },
                    { value: 'split-left', label: 'Sol Ayrık' },
                    { value: 'split-right', label: 'Sağ Ayrık' },
                    { value: 'fullscreen', label: 'Tam Ekran' },
                ],
                defaultValue: 'centered',
                group: 'Düzen',
            },
            {
                key: 'overlayOpacity',
                label: 'Karartma Opaklığı',
                type: 'range',
                min: 0,
                max: 100,
                step: 1,
                defaultValue: 40,
                group: 'Düzen',
            },
            {
                key: 'heroMinHeight',
                label: 'Yükseklik (vh)',
                type: 'range',
                min: 60,
                max: 100,
                step: 5,
                defaultValue: 80,
                group: 'Düzen',
            },
            {
                key: 'badgeText',
                label: 'Rozet Metni',
                type: 'text',
                defaultValue: '',
                group: 'İçerik',
            },
            {
                key: 'ctaText',
                label: 'Buton Metni',
                type: 'text',
                defaultValue: 'Hemen Başla',
                group: 'Buton',
            },
            {
                key: 'ctaLink',
                label: 'Buton Bağlantısı',
                type: 'text',
                defaultValue: '#iletisim',
                group: 'Buton',
            },
        ],
    },

    /* ── 2. About ── */
    {
        type: 'about',
        label: 'Hakkımızda',
        icon: '📖',
        fields: [
            {
                key: 'layout',
                label: 'Yerleşim',
                type: 'select',
                options: [
                    { value: 'image-left', label: 'Görsel Solda' },
                    { value: 'image-right', label: 'Görsel Sağda' },
                    { value: 'text-only', label: 'Yalnızca Metin' },
                ],
                defaultValue: 'image-left',
                group: 'Düzen',
            },
            {
                key: 'showImage',
                label: 'Görseli Göster',
                type: 'toggle',
                defaultValue: true,
                group: 'Düzen',
            },
            {
                key: 'title',
                label: 'Başlık',
                type: 'text',
                defaultValue: 'Hakkımızda',
                group: 'İçerik',
            },
            {
                key: 'description',
                label: 'Açıklama',
                type: 'textarea',
                defaultValue: '',
                group: 'İçerik',
            },
        ],
    },

    /* ── 3. Services ── */
    {
        type: 'services',
        label: 'Hizmetler',
        icon: '🔧',
        fields: [
            {
                key: 'columns',
                label: 'Sütun Sayısı',
                type: 'select',
                options: [
                    { value: '2', label: '2 Sütun' },
                    { value: '3', label: '3 Sütun' },
                    { value: '4', label: '4 Sütun' },
                ],
                defaultValue: '3',
                group: 'Düzen',
            },
            {
                key: 'cardStyle',
                label: 'Kart Stili',
                type: 'select',
                options: [
                    { value: 'card', label: 'Kart' },
                    { value: 'minimal', label: 'Minimal' },
                    { value: 'icon-only', label: 'Yalnızca İkon' },
                ],
                defaultValue: 'card',
                group: 'Görünüm',
            },
            {
                key: 'showIcon',
                label: 'İkon Göster',
                type: 'toggle',
                defaultValue: true,
                group: 'Görünüm',
            },
            {
                key: 'showPrice',
                label: 'Fiyat Göster',
                type: 'toggle',
                defaultValue: false,
                group: 'Görünüm',
            },
            {
                key: 'showDuration',
                label: 'Süre Göster',
                type: 'toggle',
                defaultValue: false,
                group: 'Görünüm',
            },
            {
                key: 'title',
                label: 'Başlık',
                type: 'text',
                defaultValue: 'Hizmetlerimiz',
                group: 'İçerik',
            },
            {
                key: 'subtitle',
                label: 'Alt Başlık',
                type: 'text',
                defaultValue: '',
                group: 'İçerik',
            },
        ],
    },

    /* ── 4. Testimonials ── */
    {
        type: 'testimonials',
        label: 'Müşteri Görüşleri',
        icon: '⭐',
        fields: [
            {
                key: 'layout',
                label: 'Yerleşim',
                type: 'select',
                options: [
                    { value: 'cards', label: 'Kartlar' },
                    { value: 'carousel', label: 'Karusel' },
                    { value: 'single', label: 'Tekli' },
                ],
                defaultValue: 'cards',
                group: 'Düzen',
            },
            {
                key: 'showStars',
                label: 'Yıldızları Göster',
                type: 'toggle',
                defaultValue: true,
                group: 'Görünüm',
            },
            {
                key: 'showAvatar',
                label: 'Avatarı Göster',
                type: 'toggle',
                defaultValue: true,
                group: 'Görünüm',
            },
            {
                key: 'showDate',
                label: 'Tarihi Göster',
                type: 'toggle',
                defaultValue: false,
                group: 'Görünüm',
            },
            {
                key: 'autoplaySpeed',
                label: 'Otomatik geçiş (sn)',
                type: 'range',
                min: 2,
                max: 10,
                step: 1,
                defaultValue: 5,
                group: 'Görünüm',
            },
        ],
    },

    /* ── 5. Contact ── */
    {
        type: 'contact',
        label: 'İletişim',
        icon: '📞',
        fields: [
            {
                key: 'showMap',
                label: 'Harita Göster',
                type: 'toggle',
                defaultValue: true,
                group: 'Alanlar',
            },
            {
                key: 'showPhone',
                label: 'Telefon Göster',
                type: 'toggle',
                defaultValue: true,
                group: 'Alanlar',
            },
            {
                key: 'showEmail',
                label: 'E-posta Göster',
                type: 'toggle',
                defaultValue: true,
                group: 'Alanlar',
            },
            {
                key: 'showAddress',
                label: 'Adres Göster',
                type: 'toggle',
                defaultValue: true,
                group: 'Alanlar',
            },
            {
                key: 'kvkkConsent',
                label: 'KVKK Onay Kutusu',
                type: 'toggle',
                defaultValue: true,
                group: 'Alanlar',
            },
            {
                key: 'formButtonText',
                label: 'Form Buton Metni',
                type: 'text',
                defaultValue: 'Gönder',
                group: 'İçerik',
            },
            {
                key: 'successMessage',
                label: 'Başarı Mesajı',
                type: 'text',
                defaultValue: 'Mesajınız başarıyla gönderildi.',
                group: 'İçerik',
            },
        ],
    },

    /* ── 6. Gallery ── */
    {
        type: 'gallery',
        label: 'Galeri',
        icon: '🖼️',
        fields: [
            {
                key: 'columns',
                label: 'Sütun Sayısı',
                type: 'select',
                options: [
                    { value: '2', label: '2 Sütun' },
                    { value: '3', label: '3 Sütun' },
                    { value: '4', label: '4 Sütun' },
                ],
                defaultValue: '3',
                group: 'Düzen',
            },
            {
                key: 'layout',
                label: 'Yerleşim',
                type: 'select',
                options: [
                    { value: 'grid', label: 'Izgara' },
                    { value: 'masonry', label: 'Masonry' },
                ],
                defaultValue: 'grid',
                group: 'Düzen',
            },
            {
                key: 'lightbox',
                label: 'Lightbox Aç',
                type: 'toggle',
                defaultValue: true,
                group: 'Düzen',
            },
            {
                key: 'aspectRatio',
                label: 'En-Boy Oranı',
                type: 'select',
                options: [
                    { value: 'auto', label: 'Otomatik' },
                    { value: 'square', label: 'Kare (1:1)' },
                    { value: '4:3', label: '4:3' },
                    { value: '16:9', label: '16:9' },
                ],
                defaultValue: 'auto',
                group: 'Düzen',
            },
            {
                key: 'hoverEffect',
                label: 'Hover Efekti',
                type: 'select',
                options: [
                    { value: 'none', label: 'Yok' },
                    { value: 'zoom', label: 'Yakınlaştır' },
                    { value: 'darken', label: 'Karart' },
                ],
                defaultValue: 'zoom',
                group: 'Efektler',
            },
        ],
    },

    /* ── 7. Pricing ── */
    {
        type: 'pricing',
        label: 'Fiyatlandırma',
        icon: '💰',
        fields: [
            {
                key: 'columns',
                label: 'Sütun Sayısı',
                type: 'select',
                options: [
                    { value: '2', label: '2 Sütun' },
                    { value: '3', label: '3 Sütun' },
                ],
                defaultValue: '3',
                group: 'Düzen',
            },
            {
                key: 'highlightIndex',
                label: 'Vurgulanan Paket (sıra)',
                type: 'number',
                defaultValue: 1,
                group: 'Düzen',
            },
            {
                key: 'showCta',
                label: 'Buton Göster',
                type: 'toggle',
                defaultValue: true,
                group: 'İçerik',
            },
            {
                key: 'ctaText',
                label: 'Buton Metni',
                type: 'text',
                defaultValue: 'Başla',
                group: 'İçerik',
            },
        ],
    },

    /* ── 8. Team ── */
    {
        type: 'team',
        label: 'Ekip',
        icon: '👥',
        fields: [
            {
                key: 'columns',
                label: 'Sütun Sayısı',
                type: 'select',
                options: [
                    { value: '2', label: '2 Sütun' },
                    { value: '3', label: '3 Sütun' },
                    { value: '4', label: '4 Sütun' },
                ],
                defaultValue: '3',
                group: 'Düzen',
            },
            {
                key: 'showRole',
                label: 'Unvanı Göster',
                type: 'toggle',
                defaultValue: true,
                group: 'Görünüm',
            },
            {
                key: 'showSocial',
                label: 'Sosyal Medya Göster',
                type: 'toggle',
                defaultValue: false,
                group: 'Görünüm',
            },
        ],
    },

    /* ── 9. FAQ ── */
    {
        type: 'faq',
        label: 'Sıkça Sorulan Sorular',
        icon: '❓',
        fields: [
            {
                key: 'style',
                label: 'Görünüm Stili',
                type: 'select',
                options: [
                    { value: 'accordion', label: 'Akordiyon' },
                    { value: 'list', label: 'Liste' },
                ],
                defaultValue: 'accordion',
                group: 'Düzen',
            },
            {
                key: 'initialOpen',
                label: 'Başlangıçta Açık (sıra)',
                type: 'number',
                defaultValue: 1,
                group: 'Düzen',
            },
            {
                key: 'title',
                label: 'Başlık',
                type: 'text',
                defaultValue: 'Sıkça Sorulan Sorular',
                group: 'İçerik',
            },
        ],
    },

    /* ── 10. CTA ── */
    {
        type: 'cta',
        label: 'Harekete Geçirici',
        icon: '🚀',
        fields: [
            {
                key: 'style',
                label: 'Stil',
                type: 'select',
                options: [
                    { value: 'banner', label: 'Banner' },
                    { value: 'card', label: 'Kart' },
                    { value: 'floating', label: 'Yüzen' },
                ],
                defaultValue: 'banner',
                group: 'Düzen',
            },
            {
                key: 'bgType',
                label: 'Arka Plan Tipi',
                type: 'select',
                options: [
                    { value: 'accent', label: 'Vurgu Rengi' },
                    { value: 'gradient', label: 'Gradyan' },
                    { value: 'image', label: 'Görsel' },
                ],
                defaultValue: 'accent',
                group: 'Düzen',
            },
            {
                key: 'title',
                label: 'Başlık',
                type: 'text',
                defaultValue: 'Hemen Başlayın',
                group: 'İçerik',
            },
            {
                key: 'subtitle',
                label: 'Alt Başlık',
                type: 'text',
                defaultValue: '',
                group: 'İçerik',
            },
            {
                key: 'buttonText',
                label: 'Buton Metni',
                type: 'text',
                defaultValue: 'İletişime Geç',
                group: 'İçerik',
            },
        ],
    },
    /* ── 11. Menu ── */
    {
        type: 'menu',
        label: 'Menü / Fiyat Listesi',
        icon: '📋',
        fields: [
            { key: 'columns', label: 'Sütun Sayısı', type: 'select', options: [{ value: '1', label: '1 Sütun' }, { value: '2', label: '2 Sütun' }], defaultValue: '2', group: 'Düzen' },
            { key: 'showImages', label: 'Görsel Göster', type: 'toggle', defaultValue: true, group: 'Görünüm' },
        ],
    },
    /* ── 12. Booking ── */
    {
        type: 'booking',
        label: 'Randevu / Rezervasyon',
        icon: '📅',
        fields: [
            { key: 'provider', label: 'Sağlayıcı', type: 'select', options: [{ value: 'custom', label: 'Özel Form' }, { value: 'calendly', label: 'Calendly' }], defaultValue: 'custom', group: 'Düzen' },
            { key: 'formTitle', label: 'Form Başlığı', type: 'text', defaultValue: 'Online Randevu', group: 'İçerik' },
        ],
    },
    /* ── 13. Products ── */
    {
        type: 'products',
        label: 'Ürünler',
        icon: '🛍️',
        fields: [
            { key: 'columns', label: 'Sütun Sayısı', type: 'select', options: [{ value: '2', label: '2 Sütun' }, { value: '3', label: '3 Sütun' }, { value: '4', label: '4 Sütun' }], defaultValue: '4', group: 'Düzen' },
            { key: 'showCartButton', label: 'Sepete Ekle Göster', type: 'toggle', defaultValue: true, group: 'Görünüm' },
        ],
    },
    /* ── 14. Stats ── */
    {
        type: 'stats',
        label: 'İstatistikler',
        icon: '📊',
        fields: [
            { key: 'layout', label: 'Yerleşim', type: 'select', options: [{ value: 'row', label: 'Yatay Sıra' }, { value: 'grid', label: 'Izgara' }], defaultValue: 'row', group: 'Düzen' },
            { key: 'animate', label: 'Sayıları Animasyonlu Arttır', type: 'toggle', defaultValue: true, group: 'Efektler' },
        ],
    },
    /* ── 15. Social Proof ── */
    {
        type: 'social_proof',
        label: 'Sosyal Kanıt / Logolar',
        icon: '🤝',
        fields: [
            { key: 'style', label: 'Görünüm Stili', type: 'select', options: [{ value: 'marquee', label: 'Kayan Yazı (Marquee)' }, { value: 'grid', label: 'Sabit Izgara' }], defaultValue: 'marquee', group: 'Düzen' },
            { key: 'grayscale', label: 'Logoları Siyah-Beyaz Yap', type: 'toggle', defaultValue: true, group: 'Efektler' },
        ],
    },
    /* ── 16. Process ── */
    {
        type: 'process',
        label: 'Nasıl Çalışır? / Süreç',
        icon: '⚙️',
        fields: [
            { key: 'layout', label: 'Yerleşim', type: 'select', options: [{ value: 'horizontal', label: 'Yatay Adımlar' }, { value: 'vertical', label: 'Dikey Zaman Çizelgesi' }], defaultValue: 'horizontal', group: 'Düzen' },
            { key: 'showNumbers', label: 'Adım Numaralarını Göster', type: 'toggle', defaultValue: true, group: 'Görünüm' },
        ],
    },
]
