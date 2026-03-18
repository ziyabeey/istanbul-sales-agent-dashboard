/**
 * peyzaj-organik ThemeConfig (pro)
 * Toprak + turuncu, organik / doğal bahçe. Nunito.
 * Business: Doğal Bahçe Organik Peyzaj, Maltepe
 */
import type { ThemeConfig, BusinessData } from '../../types/section-types'

export const PEYZAJ_ORGANIK_CSS: Record<string, string> = {
  '--color-bg': '#FEFDF5',
  '--color-surface': '#F5F0E0',
  '--color-surface-elevated': '#FFFFFF',
  '--color-surface-muted': '#EAE0C8',
  '--color-text': '#2C1A0A',
  '--color-text-secondary': '#6B3A1F',
  '--color-text-muted': '#8B7355',
  '--color-text-on-accent': '#FFFFFF',
  '--color-accent': '#B45309',
  '--color-accent-hover': '#92400E',
  '--color-accent-light': '#FEF3C7',
  '--color-border': '#DEB887',
  '--font-heading': "'Nunito', sans-serif",
  '--font-body': "'Nunito', sans-serif",
  '--radius-card': '16px',
  '--radius-btn': '9999px'}

export const PEYZAJ_ORGANIK_BUSINESS: BusinessData = {
  name: 'Doğal Bahçe',
  ownerName: 'Ayşe Toprak',
  sector: 'peyzaj',
  slogan: 'Kimyasalsız, doğal, sürdürülebilir bahçe',
  phone: '0216 625 14 44',
  phoneClean: '902166251444',
  whatsapp: '902166251444',
  email: 'ayse@dogalbahce.com.tr',
  address: 'Bağlarbaşı Mah. Bağdat Cad. No.38, Maltepe, İstanbul',
  city: 'İstanbul',
  district: 'Maltepe',
  coordinates: { lat: 40.9345, lng: 29.1504 },
  workingHours: [
    { day: 'monday', dayTr: 'Pazartesi', open: '08:30', close: '17:30' },
    { day: 'tuesday', dayTr: 'Salı', open: '08:30', close: '17:30' },
    { day: 'wednesday', dayTr: 'Çarşamba', open: '08:30', close: '17:30' },
    { day: 'thursday', dayTr: 'Perşembe', open: '08:30', close: '17:30' },
    { day: 'friday', dayTr: 'Cuma', open: '08:30', close: '17:00' },
    { day: 'saturday', dayTr: 'Cumartesi', open: '09:00', close: '15:00' },
    { day: 'sunday', dayTr: 'Pazar', open: null, close: null }],
  socialMedia: { instagram: 'https://instagram.com/dogalbahce_peyzaj', facebook: 'https://facebook.com/dogalbahce' },
  photos: [],
  services: [
    { id: 's1', name: 'Organik Bahçe', icon: '🌱' },
    { id: 's2', name: 'Sebze Bahçesi', icon: '🥦' },
    { id: 's3', name: 'Kompost Sistemi', icon: '♻️' },
    { id: 's4', name: 'Arı Dostu Bitki', icon: '🐝' }],
  team: [{ id: 't1', name: 'Ayşe Toprak', role: 'Organik Bahçıvan', experience: '13 yıl' }],
  experience: '13 yıl',
  rating: 5.0,
  reviewCount: 142,
  foundedYear: 2011}

export const PEYZAJ_ORGANIK_CONFIG: ThemeConfig = {
  id: 'peyzaj-organik',
  name: 'Organik',
  sectorId: 'peyzaj',
  plan: 'pro',
  description: 'Toprak + turuncu, organik / sürdürülebilir bahçe. Maltepe.',
  designPhilosophy: 'Earth tones — toprak, kil, ahşap. Sürdürülebilirlik ve doğallık.',
  isDark: false,
  cssVariables: PEYZAJ_ORGANIK_CSS,
  fonts: {
    heading: { family: 'Cinzel', weights: [700, 800], subsets: ['latin-ext'] },
    body: { family: 'Nunito', weights: [400, 500, 600], subsets: ['latin-ext'] }},
  seoSchemaType: 'LandscapingService',
  sectorSections: ['plant_catalog', 'project_portfolio_grid', 'garden_stats_row', 'garden_consult'],
  performanceBudget: { maxJS: '150kb', maxLCP: '2.0s', animationLevel: 'css-only' },
  globalSections: [
    {
      id: 'global-header', type: 'header', variant: 'minimal_sticky', order: 0, required: true, position: 'top',
      settings: { bgMode: 'default', paddingY: 'none', containerWidth: 'xl', visible: true, order: 0, removable: false, animation: 'fadeUp' },
      defaultContent: {
        logo: { type: 'text', text: 'Doğal Bahçe 🌱' },
        menuItems: [
          { label: 'Bitkiler', href: '#bitkiler' }, { label: 'Projeler', href: '#projeler' }, { label: 'İletişim', href: '#iletisim' }],
        cta: { text: 'Danışmanlık Al', href: '#iletisim', variant: 'solid' }},
      editableFields: [] },
    {
      id: 'global-footer', type: 'footer', variant: 'warm_columns', order: 999, required: true, position: 'bottom',
      settings: { bgMode: 'surface', paddingY: 'sm', containerWidth: 'xl', visible: true, order: 999, removable: false, animation: 'fadeUp' },
      defaultContent: {
        businessName: 'Doğal Bahçe',
        copyright: '© 2024 Doğal Bahçe',
        contact: { phone: '0216 625 14 44', address: 'Maltepe, İstanbul' },
        social: [{ platform: 'instagram', url: 'https://instagram.com/dogalbahce_peyzaj', icon: 'instagram' }],
        legal: [{ label: 'KVKK', href: '/kvkk' }],
        poweredBy: '⚡ kepenk.ai'},
      editableFields: [] },
    {
      id: 'global-whatsapp', type: 'whatsapp_cta', variant: 'floating', order: 1000, required: true, position: 'floating',
      settings: { bgMode: 'default', paddingY: 'none', containerWidth: 'xl', visible: true, order: 1000, removable: false, animation: 'fadeUp' },
      defaultContent: { phone: '902166251444', message: 'Merhaba, organik bahçe danışmanlığı için bilgi almak istiyorum.' },
      editableFields: [] },
    {
      id: 'global-cookie', type: 'cookie_banner', variant: 'bottom_bar', order: 1001, required: true, position: 'floating',
      settings: { bgMode: 'surface', paddingY: 'none', containerWidth: 'xl', visible: true, order: 1001, removable: false, animation: 'fadeUp' },
      defaultContent: { text: 'Bu site çerezleri kullanır.', acceptText: 'Kabul Et', rejectText: 'Reddet', detailsLink: '/gizlilik' },
      editableFields: []}],
  pages: [{
    id: 'anasayfa', slug: '/', title: "Doğal Bahçe — Maltepe", titleTr: 'Ana Sayfa', isHomePage: true, includeInNav: false,
    sections: [
{ id: 'hero', type: 'hero', variant: 'split_image', order: 1, required: true, settings: { bgMode: 'default', paddingY: 'none', containerWidth: 'xl', visible: true, order: 1, removable: false, animation: 'fadeUp' }, defaultContent: { badge: 'Maltepe', title: "Doğal Bahçe", subtitle: "Kimyasalsız, doğal, sürdürülebilir bahçe", cta1: { text: 'İletişim', href: '#iletisim' } }, editableFields: [] },
{ id: 'hizmetler', type: 'services', variant: 'peyzaj_services', order: 2, required: true, settings: { bgMode: 'surface', paddingY: 'lg', containerWidth: 'xl', visible: true, order: 2, removable: false, animation: 'fadeUp' }, defaultContent: { badge: 'HİZMETLER', title: 'Hizmetlerimiz', services: [{ id: 's1', name: 'Premium Hizmet', description: 'Detaylı bilgi için iletişime geçin.', icon: 'star' }] }, editableFields: [] },
{ id: 'iletisim', type: 'contact', variant: 'simple_form', order: 3, required: true, settings: { bgMode: 'surface', paddingY: 'lg', containerWidth: 'xl', visible: true, order: 3, removable: false, animation: 'fadeUp' }, defaultContent: { badge: 'İLETİŞİM', title: 'Bize Ulaşın', whatsapp: "902166251444" }, editableFields: [] }
    ]
  }]
}
