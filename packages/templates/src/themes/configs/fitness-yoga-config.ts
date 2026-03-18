/**
 * fitness-yoga ThemeConfig (starter)
 * Lavanta + krem, yoga & meditasyon stüdyosu. Playfair Display.
 * Business: Om Yoga Studio, Caddebostan
 */
import type { ThemeConfig, BusinessData } from '../../types/section-types'

export const FITNESS_YOGA_CSS: Record<string, string> = {
  '--color-bg': '#FAF7FF', '--color-surface': '#F0EBF8', '--color-surface-elevated': '#FFFFFF',
  '--color-surface-muted': '#E8E0F0', '--color-text': '#1F0A3C', '--color-text-secondary': '#4A2878',
  '--color-text-muted': '#8B72A8', '--color-text-on-accent': '#FFFFFF', '--color-accent': '#7C3AED',
  '--color-accent-hover': '#6D28D9', '--color-accent-light': '#F5F0FF', '--color-border': '#DDD3F0',
  '--font-heading': "'Playfair Display', serif", '--font-body': "'Lato', sans-serif",
  '--radius-card': '16px', '--radius-btn': '9999px'}

export const FITNESS_YOGA_BUSINESS: BusinessData = {
  name: 'Om Yoga Studio', ownerName: 'Selin Tan', sector: 'fitness',
  slogan: 'Nefes al. Dengele. Keşfet.', phone: '0216 480 90 11', phoneClean: '902164809011',
  whatsapp: '902164809011', email: 'namaste@omyoga.com.tr',
  address: 'Bağdat Cad. No.122 K.3, Caddebostan, İstanbul',
  city: 'İstanbul', district: 'Caddebostan', coordinates: { lat: 40.9624, lng: 29.0637 },
  workingHours: [
    { day: 'monday', dayTr: 'Pazartesi', open: '07:00', close: '21:00' },
    { day: 'tuesday', dayTr: 'Salı', open: '07:00', close: '21:00' },
    { day: 'wednesday', dayTr: 'Çarşamba', open: '07:00', close: '21:00' },
    { day: 'thursday', dayTr: 'Perşembe', open: '07:00', close: '21:00' },
    { day: 'friday', dayTr: 'Cuma', open: '07:00', close: '20:00' },
    { day: 'saturday', dayTr: 'Cumartesi', open: '09:00', close: '18:00' },
    { day: 'sunday', dayTr: 'Pazar', open: '10:00', close: '16:00' }],
  socialMedia: { instagram: 'https://instagram.com/omyogastudio' },
  photos: [], services: [
    { id: 's1', name: 'Hatha Yoga', icon: '🧘‍♀️' }, { id: 's2', name: 'Vinyasa', icon: '🌊' },
    { id: 's3', name: 'Meditasyon', icon: '🕉️' }, { id: 's4', name: 'Nefes Çalışması', icon: '🌬️' }],
  team: [{ id: 't1', name: 'Selin Tan', role: 'Yoga Eğitmeni', experience: '14 yıl' }],
  experience: '14 yıl', rating: 5.0, reviewCount: 287, foundedYear: 2010}

export const FITNESS_YOGA_CONFIG: ThemeConfig = {
  id: 'fitness-yoga', name: 'Yoga', sectorId: 'fitness', plan: 'starter',
  description: 'Lavanta + krem, yoga stüdyosu. Caddebostan.',
  designPhilosophy: 'Zen purple — huzur, denge, ferahlık. Yoga stüdyosu sakinliği.',
  isDark: false, cssVariables: FITNESS_YOGA_CSS,
  fonts: { heading: { family: 'Space Grotesk', weights: [600, 700], subsets: ['latin-ext'] }, body: { family: 'Lato', weights: [400, 500], subsets: ['latin-ext'] } },
  seoSchemaType: 'SportsActivityLocation',
  sectorSections: ['class_schedule_grid', 'trainer_profile', 'fitness_stats_row', 'trial_booking'],
  performanceBudget: { maxJS: '100kb', maxLCP: '2.0s', animationLevel: 'css-only' },
  globalSections: [
    { id: 'global-header', type: 'header', variant: 'minimal_sticky', order: 0, required: true, position: 'top', settings: { bgMode: 'default', paddingY: 'none', containerWidth: 'xl', visible: true, order: 0, removable: false, animation: 'fadeUp' }, defaultContent: { logo: { type: 'text', text: 'Om Yoga 🕉️' }, menuItems: [{ label: 'Dersler', href: '#dersler' }, { label: 'Eğitmenler', href: '#egitmenler' }, { label: 'Kayıt', href: '#kayit' }], cta: { text: 'İlk Ders Ücretsiz', href: '#kayit', variant: 'solid' } }, editableFields: [] },
    { id: 'global-footer', type: 'footer', variant: 'warm_columns', order: 999, required: true, position: 'bottom', settings: { bgMode: 'surface', paddingY: 'sm', containerWidth: 'xl', visible: true, order: 999, removable: false, animation: 'fadeUp' }, defaultContent: { businessName: 'Om Yoga Studio', copyright: '© 2024 Om Yoga Studio', contact: { phone: '0216 480 90 11', address: 'Caddebostan, İstanbul' }, social: [{ platform: 'instagram', url: 'https://instagram.com/omyogastudio', icon: 'instagram' }], legal: [{ label: 'KVKK', href: '/kvkk' }], poweredBy: '⚡ kepenk.ai' }, editableFields: [] },
    { id: 'global-whatsapp', type: 'whatsapp_cta', variant: 'floating', order: 1000, required: true, position: 'floating', settings: { bgMode: 'default', paddingY: 'none', containerWidth: 'xl', visible: true, order: 1000, removable: false, animation: 'fadeUp' }, defaultContent: { phone: '902164809011', message: 'Namaste! Yoga dersleri hakkında bilgi almak istiyorum.' }, editableFields: [] },
    { id: 'global-cookie', type: 'cookie_banner', variant: 'bottom_bar', order: 1001, required: true, position: 'floating', settings: { bgMode: 'surface', paddingY: 'none', containerWidth: 'xl', visible: true, order: 1001, removable: false, animation: 'fadeUp' }, defaultContent: { text: 'Bu site çerezleri kullanır.', acceptText: 'Kabul Et', rejectText: 'Reddet', detailsLink: '/gizlilik' }, editableFields: [] }],
  pages: [{
    id: 'anasayfa', slug: '/', title: "Om Yoga Studio — Caddebostan", titleTr: 'Ana Sayfa', isHomePage: true, includeInNav: false,
    sections: [
{ id: 'hero', type: 'hero', variant: 'fullscreen_overlay', order: 1, required: true, settings: { bgMode: 'default', paddingY: 'none', containerWidth: 'xl', visible: true, order: 1, removable: false, animation: 'fadeUp' }, defaultContent: { badge: 'Caddebostan', title: "Om Yoga Studio", subtitle: "Nefes al. Dengele. Keşfet.", cta1: { text: 'İletişim', href: '#iletisim' } }, editableFields: [] },
{ id: 'hakkimizda', type: 'about', variant: 'split_left', order: 2, required: false, settings: { bgMode: 'default', paddingY: 'lg', containerWidth: 'xl', visible: true, order: 2, removable: true, animation: 'fadeUp' }, defaultContent: { badge: 'HAKKIMIZDA', title: "Biz Kimiz?", description: "Yılların tecrübesiyle hizmetinizdeyiz." }, editableFields: [] },
{ id: 'istatistik', type: 'stats', variant: 'animated_row', order: 3, required: false, settings: { bgMode: 'accent', paddingY: 'md', containerWidth: 'xl', visible: true, order: 3, removable: true, animation: 'fadeUp' }, defaultContent: { stats: [{value: '10+', label: 'Yıl'}, {value: '100+', label: 'Müşteri'}] }, editableFields: [] },
{ id: 'galeri', type: 'gallery', variant: 'masonry', order: 4, required: false, settings: { bgMode: 'default', paddingY: 'lg', containerWidth: 'xl', visible: true, order: 4, removable: true, animation: 'fadeUp' }, defaultContent: { badge: 'GALERİ', title: 'Çalışmalarımız', items: [{ id: 'g1', url: '/placeholder.jpg' }] }, editableFields: [] },
{ id: 'hizmetler', type: 'services', variant: 'fitness_services', order: 5, required: true, settings: { bgMode: 'surface', paddingY: 'lg', containerWidth: 'xl', visible: true, order: 5, removable: false, animation: 'fadeUp' }, defaultContent: { badge: 'HİZMETLER', title: 'Hizmetlerimiz', services: [{ id: 's1', name: 'Premium Hizmet', description: 'Detaylı bilgi için iletişime geçin.', icon: 'star' }] }, editableFields: [] },
{ id: 'iletisim', type: 'contact', variant: 'detailed_form', order: 6, required: true, settings: { bgMode: 'surface', paddingY: 'lg', containerWidth: 'xl', visible: true, order: 6, removable: false, animation: 'fadeUp' }, defaultContent: { badge: 'İLETİŞİM', title: 'Bize Ulaşın', whatsapp: "902164809011" }, editableFields: [] }
    ]
  }]
}
