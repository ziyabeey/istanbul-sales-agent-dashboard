/**
 * fitness-pt ThemeConfig (enterprise)
 * Siyah + altın, premium kişisel antrenman. Cormorant Garamond.
 * Business: Alpha Performance Lab, Bebek
 */
import type { ThemeConfig, BusinessData } from '../../types/section-types'

export const FITNESS_PT_CSS: Record<string, string> = {
  '--color-bg': '#080808', '--color-surface': '#111111', '--color-surface-elevated': '#1A1A1A',
  '--color-surface-muted': '#222222', '--color-text': '#F5EDD6', '--color-text-secondary': '#C9AD7A',
  '--color-text-muted': '#80663A', '--color-text-on-accent': '#080808', '--color-accent': '#D4AF37',
  '--color-accent-hover': '#B8943A', '--color-accent-light': 'rgba(212,175,55,0.12)',
  '--color-border': 'rgba(212,175,55,0.18)',
  '--font-heading': "'Cormorant Garamond', serif", '--font-body': "'Inter', sans-serif",
  '--radius-card': '14px', '--radius-btn': '9999px'}

export const FITNESS_PT_BUSINESS: BusinessData = {
  name: 'Alpha Performance Lab', ownerName: 'Cenk Güler', sector: 'fitness',
  slogan: 'Sonuç odaklı, bilim tabanlı antrenman', phone: '0212 358 99 77', phoneClean: '902123589977',
  whatsapp: '902123589977', email: 'cenk@alphaperformance.com.tr',
  address: 'Cevdetpaşa Cad. No.28, Bebek, İstanbul',
  city: 'İstanbul', district: 'Bebek', coordinates: { lat: 41.0765, lng: 29.0420 },
  workingHours: [
    { day: 'monday', dayTr: 'Pazartesi', open: '06:00', close: '22:00' },
    { day: 'tuesday', dayTr: 'Salı', open: '06:00', close: '22:00' },
    { day: 'wednesday', dayTr: 'Çarşamba', open: '06:00', close: '22:00' },
    { day: 'thursday', dayTr: 'Perşembe', open: '06:00', close: '22:00' },
    { day: 'friday', dayTr: 'Cuma', open: '06:00', close: '21:00' },
    { day: 'saturday', dayTr: 'Cumartesi', open: '08:00', close: '18:00' },
    { day: 'sunday', dayTr: 'Pazar', open: '09:00', close: '15:00' }],
  socialMedia: { instagram: 'https://instagram.com/alphaperformancelab' },
  photos: [], services: [
    { id: 's1', name: 'PT 1:1', icon: '💪' }, { id: 's2', name: 'Beslenme Planı', icon: '🥗' },
    { id: 's3', name: 'Vücut Analizi', icon: '📊' }, { id: 's4', name: 'Recovery', icon: '🧊' }],
  team: [{ id: 't1', name: 'Cenk Güler', role: 'Head Performance Coach', experience: '16 yıl' }],
  experience: '16 yıl', rating: 5.0, reviewCount: 124, foundedYear: 2018}

export const FITNESS_PT_CONFIG: ThemeConfig = {
  id: 'fitness-pt', name: 'Kişisel Antrenman', sectorId: 'fitness', plan: 'enterprise',
  description: 'Siyah + altın, premium personal training. Bebek.',
  designPhilosophy: 'Dark gold — prestige, bilim, sonuç. VIP kişisel antrenman.',
  isDark: true, cssVariables: FITNESS_PT_CSS,
  fonts: { heading: { family: 'Bodoni Moda', weights: [600, 700], subsets: ['latin-ext'] }, body: { family: 'Inter', weights: [400, 500], subsets: ['latin-ext'] } },
  seoSchemaType: 'SportsActivityLocation',
  sectorSections: ['trainer_profile', 'membership_packages', 'fitness_stats_row', 'trial_booking'],
  performanceBudget: { maxJS: '200kb', maxLCP: '2.5s', animationLevel: 'framer-basic' },
  globalSections: [
    { id: 'global-header', type: 'header', variant: 'minimal_sticky', order: 0, required: true, position: 'top', settings: { bgMode: 'surface', paddingY: 'none', containerWidth: 'xl', visible: true, order: 0, removable: false, animation: 'fadeUp' }, defaultContent: { logo: { type: 'text', text: 'ALPHA' }, menuItems: [{ label: 'Koçlar', href: '#koclar' }, { label: 'Programlar', href: '#programlar' }, { label: 'Randevu', href: '#randevu' }], cta: { text: 'Randevu Al', href: '#randevu', variant: 'solid' } }, editableFields: [] },
    { id: 'global-footer', type: 'footer', variant: 'warm_columns', order: 999, required: true, position: 'bottom', settings: { bgMode: 'surface', paddingY: 'sm', containerWidth: 'xl', visible: true, order: 999, removable: false, animation: 'fadeUp' }, defaultContent: { businessName: 'Alpha Performance Lab', copyright: '© 2024 Alpha Performance Lab', contact: { phone: '0212 358 99 77', address: 'Bebek, İstanbul' }, social: [{ platform: 'instagram', url: 'https://instagram.com/alphaperformancelab', icon: 'instagram' }], legal: [{ label: 'KVKK', href: '/kvkk' }], poweredBy: '⚡ kepenk.ai' }, editableFields: [] },
    { id: 'global-whatsapp', type: 'whatsapp_cta', variant: 'floating', order: 1000, required: true, position: 'floating', settings: { bgMode: 'default', paddingY: 'none', containerWidth: 'xl', visible: true, order: 1000, removable: false, animation: 'fadeUp' }, defaultContent: { phone: '902123589977', message: 'Merhaba, kişisel antrenman hakkında bilgi almak istiyorum.' }, editableFields: [] },
    { id: 'global-cookie', type: 'cookie_banner', variant: 'bottom_bar', order: 1001, required: true, position: 'floating', settings: { bgMode: 'surface', paddingY: 'none', containerWidth: 'xl', visible: true, order: 1001, removable: false, animation: 'fadeUp' }, defaultContent: { text: 'Bu site çerezleri kullanır.', acceptText: 'Kabul Et', rejectText: 'Reddet', detailsLink: '/gizlilik' }, editableFields: [] }],
  pages: [{
    id: 'anasayfa', slug: '/', title: "Alpha Performance Lab — Bebek", titleTr: 'Ana Sayfa', isHomePage: true, includeInNav: false,
    sections: [
{ id: 'hero', type: 'hero', variant: 'fullscreen_overlay', order: 1, required: true, settings: { bgMode: 'default', paddingY: 'none', containerWidth: 'xl', visible: true, order: 1, removable: false, animation: 'fadeUp' }, defaultContent: { badge: 'Bebek', title: "Alpha Performance Lab", subtitle: "Sonuç odaklı, bilim tabanlı antrenman", cta1: { text: 'İletişim', href: '#iletisim' } }, editableFields: [] },
{ id: 'hakkimizda', type: 'about', variant: 'split_left', order: 2, required: false, settings: { bgMode: 'default', paddingY: 'lg', containerWidth: 'xl', visible: true, order: 2, removable: true, animation: 'fadeUp' }, defaultContent: { badge: 'HAKKIMIZDA', title: "Biz Kimiz?", description: "Yılların tecrübesiyle hizmetinizdeyiz." }, editableFields: [] },
{ id: 'istatistik', type: 'stats', variant: 'animated_row', order: 3, required: false, settings: { bgMode: 'accent', paddingY: 'md', containerWidth: 'xl', visible: true, order: 3, removable: true, animation: 'fadeUp' }, defaultContent: { stats: [{value: '10+', label: 'Yıl'}, {value: '100+', label: 'Müşteri'}] }, editableFields: [] },
{ id: 'galeri', type: 'gallery', variant: 'masonry', order: 4, required: false, settings: { bgMode: 'default', paddingY: 'lg', containerWidth: 'xl', visible: true, order: 4, removable: true, animation: 'fadeUp' }, defaultContent: { badge: 'GALERİ', title: 'Çalışmalarımız', items: [{ id: 'g1', url: '/placeholder.jpg' }] }, editableFields: [] },
{ id: 'hizmetler', type: 'services', variant: 'fitness_services', order: 5, required: true, settings: { bgMode: 'surface', paddingY: 'lg', containerWidth: 'xl', visible: true, order: 5, removable: false, animation: 'fadeUp' }, defaultContent: { badge: 'HİZMETLER', title: 'Hizmetlerimiz', services: [{ id: 's1', name: 'Premium Hizmet', description: 'Detaylı bilgi için iletişime geçin.', icon: 'star' }] }, editableFields: [] },
{ id: 'cta', type: 'cta', variant: 'simple_banner', order: 6, required: false, settings: { bgMode: 'accent', paddingY: 'md', containerWidth: 'full', visible: true, order: 6, removable: true, animation: 'fadeUp' }, defaultContent: { title: 'Hemen Başlayın', cta: { text: 'Bize Ulaşın' } }, editableFields: [] },
{ id: 'iletisim', type: 'contact', variant: 'detailed_form', order: 7, required: true, settings: { bgMode: 'surface', paddingY: 'lg', containerWidth: 'xl', visible: true, order: 7, removable: false, animation: 'fadeUp' }, defaultContent: { badge: 'İLETİŞİM', title: 'Bize Ulaşın', whatsapp: "902123589977" }, editableFields: [] }
    ]
  }]
}
