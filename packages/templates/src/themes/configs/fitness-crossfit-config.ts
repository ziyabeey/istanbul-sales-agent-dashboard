/**
 * fitness-crossfit ThemeConfig (growth)
 * Siyah + turuncu, CrossFit & fonksiyonel antrenman. Oswald.
 * Business: Forge CrossFit Box, Ataşehir
 */
import type { ThemeConfig, BusinessData } from '../../types/section-types'

export const FITNESS_CROSSFIT_CSS: Record<string, string> = {
  '--color-bg': '#0A0A0A', '--color-surface': '#141414', '--color-surface-elevated': '#1E1E1E',
  '--color-surface-muted': '#282828', '--color-text': '#F5F5F5', '--color-text-secondary': '#D4D4D4',
  '--color-text-muted': '#737373', '--color-text-on-accent': '#0A0A0A', '--color-accent': '#F97316',
  '--color-accent-hover': '#EA580C', '--color-accent-light': 'rgba(249,115,22,0.12)', '--color-border': 'rgba(249,115,22,0.2)',
  '--font-heading': "'Oswald', sans-serif", '--font-body': "'Inter', sans-serif",
  '--radius-card': '10px', '--radius-btn': '6px'}

export const FITNESS_CROSSFIT_BUSINESS: BusinessData = {
  name: 'Forge CrossFit Box', ownerName: 'Barış Yıldız', sector: 'fitness',
  slogan: 'Dayanıklı ol. Limitlerini aş.', phone: '0216 570 88 99', phoneClean: '902165708899',
  whatsapp: '902165708899', email: 'info@forgecrossfit.com.tr',
  address: 'Atatürk Mah. OSB Yan Yol No.5, Ataşehir, İstanbul',
  city: 'İstanbul', district: 'Ataşehir', coordinates: { lat: 40.9885, lng: 29.1214 },
  workingHours: [
    { day: 'monday', dayTr: 'Pazartesi', open: '06:00', close: '22:00' },
    { day: 'tuesday', dayTr: 'Salı', open: '06:00', close: '22:00' },
    { day: 'wednesday', dayTr: 'Çarşamba', open: '06:00', close: '22:00' },
    { day: 'thursday', dayTr: 'Perşembe', open: '06:00', close: '22:00' },
    { day: 'friday', dayTr: 'Cuma', open: '06:00', close: '21:00' },
    { day: 'saturday', dayTr: 'Cumartesi', open: '08:00', close: '18:00' },
    { day: 'sunday', dayTr: 'Pazar', open: '09:00', close: '14:00' }],
  socialMedia: { instagram: 'https://instagram.com/forgecrossfit', youtube: 'https://youtube.com/@forgecrossfit' },
  photos: [], services: [
    { id: 's1', name: 'CrossFit WOD', icon: '🏋️' }, { id: 's2', name: 'Olympic Lifting', icon: '🥇' },
    { id: 's3', name: 'Gymnastics', icon: '🤸' }, { id: 's4', name: 'Endurance', icon: '🏃' }],
  team: [{ id: 't1', name: 'Barış Yıldız', role: 'Head Coach', experience: '10 yıl' }],
  experience: '10 yıl', rating: 4.9, reviewCount: 347, foundedYear: 2014}

export const FITNESS_CROSSFIT_CONFIG: ThemeConfig = {
  id: 'fitness-crossfit', name: 'CrossFit', sectorId: 'fitness', plan: 'growth',
  description: 'Siyah + turuncu, CrossFit & fonksiyonel. Ataşehir.',
  designPhilosophy: 'Dark forge — ateş turuncusu, çelik siyahı. Hardcore CrossFit.',
  isDark: true, cssVariables: FITNESS_CROSSFIT_CSS,
  fonts: { heading: { family: 'Playfair Display', weights: [600, 700], subsets: ['latin-ext'] }, body: { family: 'Inter', weights: [400, 500], subsets: ['latin-ext'] } },
  seoSchemaType: 'SportsActivityLocation',
  sectorSections: ['class_schedule_grid', 'trainer_profile', 'membership_packages', 'trial_booking'],
  performanceBudget: { maxJS: '150kb', maxLCP: '2.2s', animationLevel: 'css-only' },
  globalSections: [
    { id: 'global-header', type: 'header', variant: 'minimal_sticky', order: 0, required: true, position: 'top', settings: { bgMode: 'surface', paddingY: 'none', containerWidth: 'xl', visible: true, order: 0, removable: false, animation: 'fadeUp' }, defaultContent: { logo: { type: 'text', text: 'FORGE 🔥' }, menuItems: [{ label: 'WOD', href: '#wod' }, { label: 'Ekip', href: '#ekip' }, { label: 'Kayıt', href: '#kayit' }], cta: { text: 'Kayıt Ol', href: '#kayit', variant: 'solid' } }, editableFields: [] },
    { id: 'global-footer', type: 'footer', variant: 'warm_columns', order: 999, required: true, position: 'bottom', settings: { bgMode: 'surface', paddingY: 'sm', containerWidth: 'xl', visible: true, order: 999, removable: false, animation: 'fadeUp' }, defaultContent: { businessName: 'Forge CrossFit Box', copyright: '© 2024 Forge CrossFit', contact: { phone: '0216 570 88 99', address: 'Ataşehir, İstanbul' }, social: [{ platform: 'instagram', url: 'https://instagram.com/forgecrossfit', icon: 'instagram' }], legal: [{ label: 'KVKK', href: '/kvkk' }], poweredBy: '⚡ kepenk.ai' }, editableFields: [] },
    { id: 'global-whatsapp', type: 'whatsapp_cta', variant: 'floating', order: 1000, required: true, position: 'floating', settings: { bgMode: 'default', paddingY: 'none', containerWidth: 'xl', visible: true, order: 1000, removable: false, animation: 'fadeUp' }, defaultContent: { phone: '902165708899', message: 'Merhaba, CrossFit hakkında bilgi almak istiyorum.' }, editableFields: [] },
    { id: 'global-cookie', type: 'cookie_banner', variant: 'bottom_bar', order: 1001, required: true, position: 'floating', settings: { bgMode: 'surface', paddingY: 'none', containerWidth: 'xl', visible: true, order: 1001, removable: false, animation: 'fadeUp' }, defaultContent: { text: 'Bu site çerezleri kullanır.', acceptText: 'Kabul Et', rejectText: 'Reddet', detailsLink: '/gizlilik' }, editableFields: [] }],
  pages: [{
    id: 'anasayfa', slug: '/', title: "Forge CrossFit Box — Ataşehir", titleTr: 'Ana Sayfa', isHomePage: true, includeInNav: false,
    sections: [
{ id: 'hero', type: 'hero', variant: 'split_image', order: 1, required: true, settings: { bgMode: 'default', paddingY: 'none', containerWidth: 'xl', visible: true, order: 1, removable: false, animation: 'fadeUp' }, defaultContent: { badge: 'Ataşehir', title: "Forge CrossFit Box", subtitle: "Dayanıklı ol. Limitlerini aş.", cta1: { text: 'İletişim', href: '#iletisim' } }, editableFields: [] },
{ id: 'hakkimizda', type: 'about', variant: 'split_left', order: 2, required: false, settings: { bgMode: 'default', paddingY: 'lg', containerWidth: 'xl', visible: true, order: 2, removable: true, animation: 'fadeUp' }, defaultContent: { badge: 'HAKKIMIZDA', title: "Biz Kimiz?", description: "Yılların tecrübesiyle hizmetinizdeyiz." }, editableFields: [] },
{ id: 'hizmetler', type: 'services', variant: 'fitness_services', order: 3, required: true, settings: { bgMode: 'surface', paddingY: 'lg', containerWidth: 'xl', visible: true, order: 3, removable: false, animation: 'fadeUp' }, defaultContent: { badge: 'HİZMETLER', title: 'Hizmetlerimiz', services: [{ id: 's1', name: 'Premium Hizmet', description: 'Detaylı bilgi için iletişime geçin.', icon: 'star' }] }, editableFields: [] },
{ id: 'iletisim', type: 'contact', variant: 'simple_form', order: 4, required: true, settings: { bgMode: 'surface', paddingY: 'lg', containerWidth: 'xl', visible: true, order: 4, removable: false, animation: 'fadeUp' }, defaultContent: { badge: 'İLETİŞİM', title: 'Bize Ulaşın', whatsapp: "902165708899" }, editableFields: [] }
    ]
  }]
}
