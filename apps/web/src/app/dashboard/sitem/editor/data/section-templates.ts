import type { EditorSection } from '../store/editor-store'

/* ── Section Template Definition ── */
export interface SectionTemplate {
    id: string
    type: string
    category: string
    name: string
    icon: string
    description: string
    defaultProps: Record<string, unknown>
}

/* ── Section Categories ── */
export const SECTION_CATEGORIES = [
    'Hoş Geldiniz',
    'Hakkında',
    'Ekip',
    'İletişim',
    'Hizmetler',
    'Tanıtım',
    'Müşteri Görüşleri',
    'Galeri',
    'SSS',
    'Alt Bilgi',
] as const

/* ── All Templates ── */
export const SECTION_TEMPLATES: SectionTemplate[] = [
    // Hoş Geldiniz
    { id: 'hero-welcome', type: 'hero', category: 'Hoş Geldiniz', name: 'Hero Karşılama', icon: '🎯', description: 'Tam ekran giriş bölümü', defaultProps: { title: 'İşletmenizin Dijital Vitrini', subtitle: 'Profesyonel web sitenizi saniyeler içinde oluşturun', buttonText: 'Hemen Başlayın' } },
    { id: 'hero-video', type: 'hero-video', category: 'Hoş Geldiniz', name: 'Video Hero', icon: '🎬', description: 'Arkaplanda video', defaultProps: { title: 'Vizyonumuzu Keşfedin', videoUrl: '' } },
    { id: 'hero-slider', type: 'hero-slider', category: 'Hoş Geldiniz', name: 'Slayt Hero', icon: '🖼️', description: 'Otomatik slayt gösterisi', defaultProps: { slides: 3 } },

    // Hakkında
    { id: 'about-basic', type: 'about', category: 'Hakkında', name: 'Hakkımızda', icon: '📖', description: 'İşletme tanıtım bölümü', defaultProps: { title: 'Hakkımızda', text: 'Yıllardır sektörde edindiğimiz deneyim...' } },
    { id: 'story-timeline', type: 'story', category: 'Hakkında', name: 'Hikayemiz', icon: '📜', description: 'Zaman çizelgesi ile hikaye', defaultProps: { title: 'Hikayemiz', milestones: 4 } },

    // Ekip
    { id: 'team-cards', type: 'team', category: 'Ekip', name: 'Ekibimiz', icon: '👥', description: 'Ekip üyeleri kartları', defaultProps: { title: 'Ekibimiz', members: 3 } },

    // İletişim
    { id: 'contact-form', type: 'contact', category: 'İletişim', name: 'İletişim Formu', icon: '📞', description: 'İsim, e-posta, mesaj formu', defaultProps: { title: 'İletişim', showMap: false } },
    { id: 'contact-map', type: 'map', category: 'İletişim', name: 'Harita', icon: '🗺️', description: 'Google Maps entegrasyonu', defaultProps: { address: 'İstanbul, Türkiye' } },

    // Hizmetler
    { id: 'services-grid', type: 'services', category: 'Hizmetler', name: 'Hizmet Kartları', icon: '🔧', description: '3 sütunlu hizmet grid', defaultProps: { title: 'Hizmetlerimiz', count: 3 } },
    { id: 'features-icons', type: 'features', category: 'Hizmetler', name: 'Özellik Grid', icon: '✨', description: 'İkon + açıklama özellikler', defaultProps: { title: 'Özelliklerimiz', count: 6 } },
    { id: 'pricing-table', type: 'pricing', category: 'Hizmetler', name: 'Fiyat Tablosu', icon: '💰', description: 'Karşılaştırmalı fiyat planları', defaultProps: { title: 'Fiyatlandırma', plans: 3 } },

    // Tanıtım
    { id: 'cta-banner', type: 'cta', category: 'Tanıtım', name: 'Aksiyon Çağrısı', icon: '🔥', description: 'Büyük başlık + buton', defaultProps: { title: 'Bugün Başlayın!', buttonText: 'Ücretsiz Deneyin' } },
    { id: 'stats-counter', type: 'stats', category: 'Tanıtım', name: 'İstatistikler', icon: '📊', description: 'Sayaçlı veri bölümü', defaultProps: { items: 4 } },

    // Müşteri Görüşleri
    { id: 'testimonials-cards', type: 'testimonials', category: 'Müşteri Görüşleri', name: 'Müşteri Yorumları', icon: '⭐', description: 'Yıldızlı yorum kartları', defaultProps: { title: 'Müşteri Görüşleri', count: 3 } },

    // Galeri
    { id: 'gallery-masonry', type: 'gallery', category: 'Galeri', name: 'Fotoğraf Galerisi', icon: '📷', description: 'Masonry fotoğraf grid', defaultProps: { title: 'Galeri', columns: 4 } },

    // SSS
    { id: 'faq-accordion', type: 'faq', category: 'SSS', name: 'Sıkça Sorulanlar', icon: '❓', description: 'Açılır-kapanır sorular', defaultProps: { title: 'Sık Sorulan Sorular', count: 5 } },

    // Alt Bilgi
    { id: 'footer-basic', type: 'footer', category: 'Alt Bilgi', name: 'Footer', icon: '📋', description: 'Site alt bilgi bölümü', defaultProps: { copyright: '© 2024 İşletme Adı' } },
]

/* ── Helper: Build an EditorSection from a template ── */
export function createSectionFromTemplate(templateId: string): EditorSection | null {
    const tmpl = SECTION_TEMPLATES.find(t => t.id === templateId)
    if (!tmpl) return null
    return {
        instanceId: `${tmpl.type}-${Date.now()}`,
        templateId: tmpl.id,
        type: tmpl.type,
        name: tmpl.name,
        icon: tmpl.icon,
        visible: true,
        props: { ...tmpl.defaultProps },
    }
}

/* ── Helper: Get templates by category ── */
export function getTemplatesByCategory(category: string): SectionTemplate[] {
    return SECTION_TEMPLATES.filter(t => t.category === category)
}
