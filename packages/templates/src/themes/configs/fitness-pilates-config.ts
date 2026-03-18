/**
 * fitness-pilates ThemeConfig (pro)
 * Pembe + beyaz, Pilates & reformer stüdyosu. DM Sans.
 * Business: Core Pilates Studio, Nişantaşı
 */
import type { ThemeConfig, BusinessData } from '../../types/section-types'

export const FITNESS_PILATES_CSS: Record<string, string> = {
  '--color-bg': '#FFF5F7', '--color-surface': '#FFE4EC', '--color-surface-elevated': '#FFFFFF',
  '--color-surface-muted': '#FFD6E3', '--color-text': '#2E0316', '--color-text-secondary': '#6E1443',
  '--color-text-muted': '#B06585', '--color-text-on-accent': '#FFFFFF', '--color-accent': '#E11D6D',
  '--color-accent-hover': '#C4185A', '--color-accent-light': '#FFF0F4', '--color-border': '#F9D1DE',
  '--font-heading': "'DM Sans', sans-serif", '--font-body': "'DM Sans', sans-serif",
  '--radius-card': '16px', '--radius-btn': '9999px'}

export const FITNESS_PILATES_BUSINESS: BusinessData = {
  name: 'Core Pilates Studio', ownerName: 'Elif Akın', sector: 'fitness',
  slogan: 'Vücudunu keşfet, dönüştür', phone: '0212 291 55 66', phoneClean: '902122915566',
  whatsapp: '902122915566', email: 'info@corepilates.com.tr',
  address: 'Valikonağı Cad. No.18 K.2, Nişantaşı, İstanbul',
  city: 'İstanbul', district: 'Nişantaşı', coordinates: { lat: 41.0477, lng: 28.9966 },
  workingHours: [
    { day: 'monday', dayTr: 'Pazartesi', open: '08:00', close: '21:00' },
    { day: 'tuesday', dayTr: 'Salı', open: '08:00', close: '21:00' },
    { day: 'wednesday', dayTr: 'Çarşamba', open: '08:00', close: '21:00' },
    { day: 'thursday', dayTr: 'Perşembe', open: '08:00', close: '21:00' },
    { day: 'friday', dayTr: 'Cuma', open: '08:00', close: '20:00' },
    { day: 'saturday', dayTr: 'Cumartesi', open: '09:00', close: '17:00' },
    { day: 'sunday', dayTr: 'Pazar', open: null, close: null }],
  socialMedia: { instagram: 'https://instagram.com/corepilates_ist' },
  photos: [], services: [
    { id: 's1', name: 'Reformer Pilates', icon: '🏋️‍♀️' }, { id: 's2', name: 'Mat Pilates', icon: '🧘' },
    { id: 's3', name: 'Cadillac', icon: '💫' }, { id: 's4', name: 'Barre', icon: '🩰' }],
  team: [{ id: 't1', name: 'Elif Akın', role: 'Stüdyo Kurucusu & Pilates Eğitmeni', experience: '15 yıl' }],
  experience: '15 yıl', rating: 5.0, reviewCount: 445, foundedYear: 2009}

export const FITNESS_PILATES_CONFIG: ThemeConfig = {
  id: 'fitness-pilates', name: 'Pilates', sectorId: 'fitness', plan: 'pro',
  description: 'Pembe + beyaz, Pilates & reformer stüdyosu. Nişantaşı.',
  designPhilosophy: 'Blush pink — feminen, premium, zarif. Boutique Pilates estetiği.',
  isDark: false, cssVariables: FITNESS_PILATES_CSS,
  fonts: { heading: { family: 'Cinzel', weights: [600, 700, 800], subsets: ['latin-ext'] }, body: { family: 'DM Sans', weights: [400, 500], subsets: ['latin-ext'] } },
  seoSchemaType: 'SportsActivityLocation',
  sectorSections: ['class_schedule_grid', 'trainer_profile', 'membership_packages', 'trial_booking'],
  performanceBudget: { maxJS: '150kb', maxLCP: '2.2s', animationLevel: 'css-only' },
  globalSections: [
    { id: 'global-header', type: 'header', variant: 'minimal_sticky', order: 0, required: true, position: 'top', settings: { bgMode: 'default', paddingY: 'none', containerWidth: 'xl', visible: true, order: 0, removable: false, animation: 'fadeUp' }, defaultContent: { logo: { type: 'text', text: 'Core Pilates' }, menuItems: [{ label: 'Dersler', href: '#dersler' }, { label: 'Eğitmenler', href: '#egitmenler' }, { label: 'Üyelik', href: '#uyelik' }, { label: 'Deneme', href: '#deneme' }], cta: { text: 'Deneme Dersi', href: '#deneme', variant: 'solid' } }, editableFields: [] },
    { id: 'global-footer', type: 'footer', variant: 'warm_columns', order: 999, required: true, position: 'bottom', settings: { bgMode: 'surface', paddingY: 'sm', containerWidth: 'xl', visible: true, order: 999, removable: false, animation: 'fadeUp' }, defaultContent: { businessName: 'Core Pilates Studio', copyright: '© 2024 Core Pilates', contact: { phone: '0212 291 55 66', address: 'Nişantaşı, İstanbul' }, social: [{ platform: 'instagram', url: 'https://instagram.com/corepilates_ist', icon: 'instagram' }], legal: [{ label: 'KVKK', href: '/kvkk' }], poweredBy: '⚡ kepenk.ai' }, editableFields: [] },
    { id: 'global-whatsapp', type: 'whatsapp_cta', variant: 'floating', order: 1000, required: true, position: 'floating', settings: { bgMode: 'default', paddingY: 'none', containerWidth: 'xl', visible: true, order: 1000, removable: false, animation: 'fadeUp' }, defaultContent: { phone: '902122915566', message: 'Merhaba, Pilates dersleri hakkında bilgi almak istiyorum.' }, editableFields: [] },
    { id: 'global-cookie', type: 'cookie_banner', variant: 'bottom_bar', order: 1001, required: true, position: 'floating', settings: { bgMode: 'surface', paddingY: 'none', containerWidth: 'xl', visible: true, order: 1001, removable: false, animation: 'fadeUp' }, defaultContent: { text: 'Bu site çerezleri kullanır.', acceptText: 'Kabul Et', rejectText: 'Reddet', detailsLink: '/gizlilik' }, editableFields: [] }],
  pages: [{
    id: 'anasayfa', slug: '/', title: "Core Pilates Studio — Nişantaşı", titleTr: 'Ana Sayfa', isHomePage: true, includeInNav: false,
    sections: [
{ id: 'hero', type: 'hero', variant: 'split_image', order: 1, required: true, settings: { bgMode: 'default', paddingY: 'none', containerWidth: 'xl', visible: true, order: 1, removable: false, animation: 'fadeUp' }, defaultContent: { badge: 'Nişantaşı', title: "Core Pilates Studio", subtitle: "Vücudunu keşfet, dönüştür", cta1: { text: 'İletişim', href: '#iletisim' } }, editableFields: [] },
{ id: 'hakkimizda', type: 'about', variant: 'split_left', order: 2, required: false, settings: { bgMode: 'default', paddingY: 'lg', containerWidth: 'xl', visible: true, order: 2, removable: true, animation: 'fadeUp' }, defaultContent: { badge: 'HAKKIMIZDA', title: "Biz Kimiz?", description: "Yılların tecrübesiyle hizmetinizdeyiz." }, editableFields: [] },
{ id: 'istatistik', type: 'stats', variant: 'animated_row', order: 3, required: false, settings: { bgMode: 'accent', paddingY: 'md', containerWidth: 'xl', visible: true, order: 3, removable: true, animation: 'fadeUp' }, defaultContent: { stats: [{value: '10+', label: 'Yıl'}, {value: '100+', label: 'Müşteri'}] }, editableFields: [] },
{ id: 'hizmetler', type: 'services', variant: 'fitness_services', order: 4, required: true, settings: { bgMode: 'surface', paddingY: 'lg', containerWidth: 'xl', visible: true, order: 4, removable: false, animation: 'fadeUp' }, defaultContent: { badge: 'HİZMETLER', title: 'Hizmetlerimiz', services: [{ id: 's1', name: 'Premium Hizmet', description: 'Detaylı bilgi için iletişime geçin.', icon: 'star' }] }, editableFields: [] },
{ id: 'galeri', type: 'gallery', variant: 'masonry', order: 5, required: false, settings: { bgMode: 'default', paddingY: 'lg', containerWidth: 'xl', visible: true, order: 5, removable: true, animation: 'fadeUp' }, defaultContent: { badge: 'GALERİ', title: 'Çalışmalarımız', items: [{ id: 'g1', url: '/placeholder.jpg' }] }, editableFields: [] },
{ id: 'iletisim', type: 'contact', variant: 'detailed_form', order: 6, required: true, settings: { bgMode: 'surface', paddingY: 'lg', containerWidth: 'xl', visible: true, order: 6, removable: false, animation: 'fadeUp' }, defaultContent: { badge: 'İLETİŞİM', title: 'Bize Ulaşın', whatsapp: "902122915566" }, editableFields: [] }
    ]
  }]
}
