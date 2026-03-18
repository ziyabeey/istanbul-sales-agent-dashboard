/**
 * vet-klinik ThemeConfig (free) — Mavi + beyaz, genel vet kliniği. Nunito.
 * Business: Pati Veteriner, Kartal
 */
import type { ThemeConfig, BusinessData } from '../../types/section-types'
export const VET_KLINIK_CSS: Record<string, string> = {
  '--color-bg': '#F5FAFF', '--color-surface': '#E3F0FF', '--color-surface-elevated': '#FFFFFF',
  '--color-surface-muted': '#D0E3FF', '--color-text': '#0A1929', '--color-text-secondary': '#1E3A5F',
  '--color-text-muted': '#6B7280', '--color-text-on-accent': '#FFFFFF', '--color-accent': '#2563EB',
  '--color-accent-hover': '#1D4ED8', '--color-accent-light': '#EFF6FF', '--color-border': '#BFDBFE',
  '--font-heading': "'Nunito', sans-serif", '--font-body': "'Nunito', sans-serif",
  '--radius-card': '14px', '--radius-btn': '9999px'}
export const VET_KLINIK_BUSINESS: BusinessData = {
  name: 'Pati Veteriner Kliniği', ownerName: 'Dr. Emre Koç', sector: 'veteriner',
  slogan: 'Dostlarınız güvende', phone: '0216 452 33 44', phoneClean: '902164523344',
  whatsapp: '902164523344', email: 'bilgi@pativet.com.tr',
  address: 'Kordonboyu Cad. No.18, Kartal, İstanbul', city: 'İstanbul', district: 'Kartal',
  coordinates: { lat: 40.8889, lng: 29.1887 },
  workingHours: [
    { day: 'monday', dayTr: 'Pazartesi', open: '09:00', close: '20:00' },
    { day: 'tuesday', dayTr: 'Salı', open: '09:00', close: '20:00' },
    { day: 'wednesday', dayTr: 'Çarşamba', open: '09:00', close: '20:00' },
    { day: 'thursday', dayTr: 'Perşembe', open: '09:00', close: '20:00' },
    { day: 'friday', dayTr: 'Cuma', open: '09:00', close: '19:00' },
    { day: 'saturday', dayTr: 'Cumartesi', open: '10:00', close: '17:00' },
    { day: 'sunday', dayTr: 'Pazar', open: '10:00', close: '14:00' }],
  socialMedia: { instagram: 'https://instagram.com/pativet' },
  photos: [], services: [
    { id: 's1', name: 'Genel Muayene', icon: '🩺' }, { id: 's2', name: 'Aşılama', icon: '💉' },
    { id: 's3', name: 'Cerrahi', icon: '🏥' }, { id: 's4', name: 'Tırnak & Bakım', icon: '✂️' }],
  team: [{ id: 't1', name: 'Dr. Emre Koç', role: 'Veteriner Hekim', experience: '11 yıl' }],
  experience: '11 yıl', rating: 4.8, reviewCount: 734, foundedYear: 2013}
export const VET_KLINIK_CONFIG: ThemeConfig = {
  id: 'vet-klinik', name: 'Klinik', sectorId: 'veteriner', plan: 'free',
  description: 'Mavi + beyaz, genel vet kliniği. Kartal.', designPhilosophy: 'Trust blue — güven, temizlik, sağlık.',
  isDark: false, cssVariables: VET_KLINIK_CSS,
  fonts: { heading: { family: 'Bebas Neue', weights: [700, 800], subsets: ['latin-ext'] }, body: { family: 'Nunito', weights: [400, 500, 600], subsets: ['latin-ext'] } },
  seoSchemaType: 'VeterinaryCare', sectorSections: ['pet_services_grid', 'vet_team', 'vet_stats_row', 'pet_appointment'],
  performanceBudget: { maxJS: '80kb', maxLCP: '2.0s', animationLevel: 'css-only' },
  globalSections: [
    { id: 'global-header', type: 'header', variant: 'minimal_sticky', order: 0, required: true, position: 'top', settings: { bgMode: 'default', paddingY: 'none', containerWidth: 'xl', visible: true, order: 0, removable: false, animation: 'fadeUp' }, defaultContent: { logo: { type: 'text', text: 'Pati Vet 🐾' }, menuItems: [{ label: 'Hizmetler', href: '#hizmetler' }, { label: 'Ekibimiz', href: '#ekip' }, { label: 'Randevu', href: '#randevu' }], cta: { text: 'Randevu Al', href: '#randevu', variant: 'solid' } }, editableFields: [] },
    { id: 'global-footer', type: 'footer', variant: 'warm_columns', order: 999, required: true, position: 'bottom', settings: { bgMode: 'surface', paddingY: 'sm', containerWidth: 'xl', visible: true, order: 999, removable: false, animation: 'fadeUp' }, defaultContent: { businessName: 'Pati Veteriner', copyright: '© 2024 Pati Veteriner', contact: { phone: '0216 452 33 44', address: 'Kartal, İstanbul' }, social: [{ platform: 'instagram', url: 'https://instagram.com/pativet', icon: 'instagram' }], legal: [{ label: 'KVKK', href: '/kvkk' }], poweredBy: '⚡ kepenk.ai' }, editableFields: [] },
    { id: 'global-whatsapp', type: 'whatsapp_cta', variant: 'floating', order: 1000, required: true, position: 'floating', settings: { bgMode: 'default', paddingY: 'none', containerWidth: 'xl', visible: true, order: 1000, removable: false, animation: 'fadeUp' }, defaultContent: { phone: '902164523344', message: 'Merhaba, evcil hayvanım için randevu almak istiyorum.' }, editableFields: [] },
    { id: 'global-cookie', type: 'cookie_banner', variant: 'bottom_bar', order: 1001, required: true, position: 'floating', settings: { bgMode: 'surface', paddingY: 'none', containerWidth: 'xl', visible: true, order: 1001, removable: false, animation: 'fadeUp' }, defaultContent: { text: 'Bu site çerezleri kullanır.', acceptText: 'Kabul Et', rejectText: 'Reddet', detailsLink: '/gizlilik' }, editableFields: [] }],
  pages: [{
    id: 'anasayfa', slug: '/', title: "Pati Veteriner Kliniği — Kartal", titleTr: 'Ana Sayfa', isHomePage: true, includeInNav: false,
    sections: [
{ id: 'hero', type: 'hero', variant: 'split_image', order: 1, required: true, settings: { bgMode: 'default', paddingY: 'none', containerWidth: 'xl', visible: true, order: 1, removable: false, animation: 'fadeUp' }, defaultContent: { badge: 'Kartal', title: "Pati Veteriner Kliniği", subtitle: "Dostlarınız güvende", cta1: { text: 'İletişim', href: '#iletisim' } }, editableFields: [] },
{ id: 'hakkimizda', type: 'about', variant: 'split_left', order: 2, required: false, settings: { bgMode: 'default', paddingY: 'lg', containerWidth: 'xl', visible: true, order: 2, removable: true, animation: 'fadeUp' }, defaultContent: { badge: 'HAKKIMIZDA', title: "Biz Kimiz?", description: "Yılların tecrübesiyle hizmetinizdeyiz." }, editableFields: [] },
{ id: 'hizmetler', type: 'services', variant: 'veteriner_services', order: 3, required: true, settings: { bgMode: 'surface', paddingY: 'lg', containerWidth: 'xl', visible: true, order: 3, removable: false, animation: 'fadeUp' }, defaultContent: { badge: 'HİZMETLER', title: 'Hizmetlerimiz', services: [{ id: 's1', name: 'Premium Hizmet', description: 'Detaylı bilgi için iletişime geçin.', icon: 'star' }] }, editableFields: [] },
{ id: 'iletisim', type: 'contact', variant: 'simple_form', order: 4, required: true, settings: { bgMode: 'surface', paddingY: 'lg', containerWidth: 'xl', visible: true, order: 4, removable: false, animation: 'fadeUp' }, defaultContent: { badge: 'İLETİŞİM', title: 'Bize Ulaşın', whatsapp: "902164523344" }, editableFields: [] }
    ]
  }]
}
