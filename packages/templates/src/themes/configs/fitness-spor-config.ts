/**
 * fitness-spor ThemeConfig (free)
 * Kırmızı + beyaz, genel spor salonu. Roboto.
 * Business: Iron Gym, Bağcılar
 */
import type { ThemeConfig, BusinessData } from '../../types/section-types'

export const FITNESS_SPOR_CSS: Record<string, string> = {
  '--color-bg': '#FAFAFA', '--color-surface': '#F0F0F0', '--color-surface-elevated': '#FFFFFF',
  '--color-surface-muted': '#E5E5E5', '--color-text': '#111111', '--color-text-secondary': '#333333',
  '--color-text-muted': '#888888', '--color-text-on-accent': '#FFFFFF', '--color-accent': '#DC2626',
  '--color-accent-hover': '#B91C1C', '--color-accent-light': '#FEE2E2', '--color-border': '#E5E5E5',
  '--font-heading': "'Roboto', sans-serif", '--font-body': "'Roboto', sans-serif",
  '--radius-card': '12px', '--radius-btn': '8px'}

export const FITNESS_SPOR_BUSINESS: BusinessData = {
  name: 'Iron Gym', ownerName: 'Kaan Demir', sector: 'fitness',
  slogan: 'Güçlü ol, sağlıklı kal', phone: '0212 641 33 44', phoneClean: '902126413344',
  whatsapp: '902126413344', email: 'bilgi@irongym.com.tr',
  address: 'Kirazlı Mah. Atatürk Cad. No.22, Bağcılar, İstanbul',
  city: 'İstanbul', district: 'Bağcılar', coordinates: { lat: 41.0421, lng: 28.8500 },
  workingHours: [
    { day: 'monday', dayTr: 'Pazartesi', open: '06:00', close: '23:00' },
    { day: 'tuesday', dayTr: 'Salı', open: '06:00', close: '23:00' },
    { day: 'wednesday', dayTr: 'Çarşamba', open: '06:00', close: '23:00' },
    { day: 'thursday', dayTr: 'Perşembe', open: '06:00', close: '23:00' },
    { day: 'friday', dayTr: 'Cuma', open: '06:00', close: '22:00' },
    { day: 'saturday', dayTr: 'Cumartesi', open: '08:00', close: '20:00' },
    { day: 'sunday', dayTr: 'Pazar', open: '09:00', close: '18:00' }],
  socialMedia: { instagram: 'https://instagram.com/irongym_ist' },
  photos: [], services: [
    { id: 's1', name: 'Fitness', icon: '🏋️' }, { id: 's2', name: 'Kardio', icon: '🏃' },
    { id: 's3', name: 'Grup Dersi', icon: '🤸' }, { id: 's4', name: 'PT', icon: '💪' }],
  team: [{ id: 't1', name: 'Kaan Demir', role: 'Baş Antrenör', experience: '12 yıl' }],
  experience: '12 yıl', rating: 4.7, reviewCount: 612, foundedYear: 2012}

export const FITNESS_SPOR_CONFIG: ThemeConfig = {
  id: 'fitness-spor', name: 'Spor', sectorId: 'fitness', plan: 'free',
  description: 'Kırmızı + beyaz, genel spor salonu. Bağcılar.',
  designPhilosophy: 'Gym red — enerji, güç, motivasyon.',
  isDark: false, cssVariables: FITNESS_SPOR_CSS,
  fonts: { heading: { family: 'Lora', weights: [700, 900], subsets: ['latin-ext'] }, body: { family: 'Roboto', weights: [400, 500], subsets: ['latin-ext'] } },
  seoSchemaType: 'SportsActivityLocation',
  sectorSections: ['class_schedule_grid', 'membership_packages', 'fitness_stats_row', 'trial_booking'],
  performanceBudget: { maxJS: '80kb', maxLCP: '2.0s', animationLevel: 'css-only' },
  globalSections: [
    { id: 'global-header', type: 'header', variant: 'minimal_sticky', order: 0, required: true, position: 'top', settings: { bgMode: 'default', paddingY: 'none', containerWidth: 'xl', visible: true, order: 0, removable: false, animation: 'fadeUp' }, defaultContent: { logo: { type: 'text', text: 'Iron Gym 🏋️' }, menuItems: [{ label: 'Program', href: '#program' }, { label: 'Üyelik', href: '#uyelik' }, { label: 'Kayıt', href: '#kayit' }], cta: { text: 'Ücretsiz Deneme', href: '#kayit', variant: 'solid' } }, editableFields: [] },
    { id: 'global-footer', type: 'footer', variant: 'warm_columns', order: 999, required: true, position: 'bottom', settings: { bgMode: 'surface', paddingY: 'sm', containerWidth: 'xl', visible: true, order: 999, removable: false, animation: 'fadeUp' }, defaultContent: { businessName: 'Iron Gym', copyright: '© 2024 Iron Gym', contact: { phone: '0212 641 33 44', address: 'Bağcılar, İstanbul' }, social: [{ platform: 'instagram', url: 'https://instagram.com/irongym_ist', icon: 'instagram' }], legal: [{ label: 'KVKK', href: '/kvkk' }], poweredBy: '⚡ kepenk.ai' }, editableFields: [] },
    { id: 'global-whatsapp', type: 'whatsapp_cta', variant: 'floating', order: 1000, required: true, position: 'floating', settings: { bgMode: 'default', paddingY: 'none', containerWidth: 'xl', visible: true, order: 1000, removable: false, animation: 'fadeUp' }, defaultContent: { phone: '902126413344', message: 'Merhaba, spor salonu hakkında bilgi almak istiyorum.' }, editableFields: [] },
    { id: 'global-cookie', type: 'cookie_banner', variant: 'bottom_bar', order: 1001, required: true, position: 'floating', settings: { bgMode: 'surface', paddingY: 'none', containerWidth: 'xl', visible: true, order: 1001, removable: false, animation: 'fadeUp' }, defaultContent: { text: 'Bu site çerezleri kullanır.', acceptText: 'Kabul Et', rejectText: 'Reddet', detailsLink: '/gizlilik' }, editableFields: [] }],
  pages: [{
    id: 'anasayfa', slug: '/', title: "Iron Gym — Bağcılar", titleTr: 'Ana Sayfa', isHomePage: true, includeInNav: false,
    sections: [
{ id: 'hero', type: 'hero', variant: 'split_image', order: 1, required: true, settings: { bgMode: 'default', paddingY: 'none', containerWidth: 'xl', visible: true, order: 1, removable: false, animation: 'fadeUp' }, defaultContent: { badge: 'Bağcılar', title: "Iron Gym", subtitle: "Güçlü ol, sağlıklı kal", cta1: { text: 'İletişim', href: '#iletisim' } }, editableFields: [] },
{ id: 'hizmetler', type: 'services', variant: 'fitness_services', order: 2, required: true, settings: { bgMode: 'surface', paddingY: 'lg', containerWidth: 'xl', visible: true, order: 2, removable: false, animation: 'fadeUp' }, defaultContent: { badge: 'HİZMETLER', title: 'Hizmetlerimiz', services: [{ id: 's1', name: 'Premium Hizmet', description: 'Detaylı bilgi için iletişime geçin.', icon: 'star' }] }, editableFields: [] },
{ id: 'iletisim', type: 'contact', variant: 'simple_form', order: 3, required: true, settings: { bgMode: 'surface', paddingY: 'lg', containerWidth: 'xl', visible: true, order: 3, removable: false, animation: 'fadeUp' }, defaultContent: { badge: 'İLETİŞİM', title: 'Bize Ulaşın', whatsapp: "902126413344" }, editableFields: [] }
    ]
  }]
}
