/**
 * emlak-lux ThemeConfig (enterprise)
 * Siyah + altın, ultra lüks gayrimenkul. Poppins.
 * Business: Prestige Estates İstanbul, Bebek
 */
import type { ThemeConfig, BusinessData } from '../../types/section-types'

export const EMLAK_LUX_CSS: Record<string, string> = {
  '--color-bg': '#070707',
  '--color-surface': '#111111',
  '--color-surface-elevated': '#1C1C1C',
  '--color-surface-muted': '#252525',
  '--color-text': '#F0EDE8',
  '--color-text-secondary': '#C8BA96',
  '--color-text-muted': '#5E5648',
  '--color-text-on-accent': '#070707',
  '--color-accent': '#C8A96C',
  '--color-accent-hover': '#B8935A',
  '--color-accent-light': 'rgba(200,169,108,0.12)',
  '--color-border': 'rgba(200,169,108,0.18)',
  '--font-heading': "'Poppins', sans-serif",
  '--font-body': "'Inter', sans-serif",
  '--radius-card': '14px',
  '--radius-btn': '9999px'}

export const EMLAK_LUX_BUSINESS: BusinessData = {
  name: 'Prestige Estates İstanbul',
  ownerName: 'Gülçin Uluslararası',
  sector: 'emlak',
  slogan: 'Ultra lüks gayrimenkulde dünya standardı',
  phone: '0212 358 99 00',
  phoneClean: '902123589900',
  whatsapp: '902123589900',
  email: 'vip@prestigeestates.com.tr',
  address: 'Bebek Mah. Cevdet Paşa Cad. No.2 K.4, Beşiktaş, İstanbul',
  city: 'İstanbul',
  district: 'Bebek',
  coordinates: { lat: 41.0781, lng: 29.0455 },
  workingHours: [
    { day: 'monday', dayTr: 'Pazartesi', open: '10:00', close: '19:00' },
    { day: 'tuesday', dayTr: 'Salı', open: '10:00', close: '19:00' },
    { day: 'wednesday', dayTr: 'Çarşamba', open: '10:00', close: '19:00' },
    { day: 'thursday', dayTr: 'Perşembe', open: '10:00', close: '19:00' },
    { day: 'friday', dayTr: 'Cuma', open: '10:00', close: '18:00' },
    { day: 'saturday', dayTr: 'Cumartesi', open: '11:00', close: '16:00' },
    { day: 'sunday', dayTr: 'Pazar', open: null, close: null }],
  socialMedia: { instagram: 'https://instagram.com/prestigeestatesist', linkedin: 'https://linkedin.com/company/prestigeestates' },
  photos: [],
  services: [
    { id: 's1', name: 'Boğaz Yalısı', icon: '🏯' },
    { id: 's2', name: 'Ultra Lüks Daire', icon: '🌆' },
    { id: 's3', name: 'Penthouse', icon: '🌃' },
    { id: 's4', name: 'Tatil Villası', icon: '🌊' }],
  team: [{ id: 't1', name: 'Gülçin Uluslararası', role: 'Lüks Gayrimenkul Direktörü', experience: '22 yıl' }],
  experience: '22 yıl',
  rating: 5.0,
  reviewCount: 64,
  foundedYear: 2002}

export const EMLAK_LUX_CONFIG: ThemeConfig = {
  id: 'emlak-lux',
  name: 'Lüks',
  sectorId: 'emlak',
  plan: 'enterprise',
  description: 'Siyah + altın, ultra lüks gayrimenkul. Bebek.',
  designPhilosophy: 'Black gold — en yüksek segment. Yalı, penthouse, ultra lüks. Siyah zemin altın detay.',
  isDark: true,
  cssVariables: EMLAK_LUX_CSS,
  fonts: {
    heading: { family: 'Bebas Neue', weights: [600, 700, 800], subsets: ['latin-ext'] },
    body: { family: 'Inter', weights: [400, 500], subsets: ['latin-ext'] }},
  seoSchemaType: 'RealEstateAgent',
  sectorSections: ['property_listing_grid', 'neighborhood_map', 'agent_profile', 'real_estate_stats', 'valuation_request'],
  performanceBudget: { maxJS: '200kb', maxLCP: '2.5s', animationLevel: 'framer-basic' },
  globalSections: [
    {
      id: 'global-header', type: 'header', variant: 'minimal_sticky', order: 0, required: true, position: 'top',
      settings: { bgMode: 'surface', paddingY: 'none', containerWidth: 'xl', visible: true, order: 0, removable: false, animation: 'fadeUp' },
      defaultContent: {
        logo: { type: 'text', text: 'Prestige Estates' },
        menuItems: [
          { label: 'Portföy', href: '#portfolio' }, { label: 'Semtler', href: '#semtler' },
          { label: 'Direktör', href: '#danisman' }, { label: 'İletişim', href: '#iletisim' }],
        cta: { text: 'VIP Görüşme', href: '#iletisim', variant: 'solid' }},
      editableFields: [] },
    {
      id: 'global-footer', type: 'footer', variant: 'warm_columns', order: 999, required: true, position: 'bottom',
      settings: { bgMode: 'surface', paddingY: 'sm', containerWidth: 'xl', visible: true, order: 999, removable: false, animation: 'fadeUp' },
      defaultContent: {
        businessName: 'Prestige Estates İstanbul',
        copyright: '© 2024 Prestige Estates',
        contact: { phone: '0212 358 99 00', address: 'Bebek, Beşiktaş, İstanbul' },
        social: [{ platform: 'instagram', url: 'https://instagram.com/prestigeestatesist', icon: 'instagram' }],
        legal: [{ label: 'KVKK', href: '/kvkk' }],
        poweredBy: '⚡ kepenk.ai'},
      editableFields: [] },
    {
      id: 'global-whatsapp', type: 'whatsapp_cta', variant: 'floating', order: 1000, required: true, position: 'floating',
      settings: { bgMode: 'default', paddingY: 'none', containerWidth: 'xl', visible: true, order: 1000, removable: false, animation: 'fadeUp' },
      defaultContent: { phone: '902123589900', message: 'Merhaba, ultra lüks gayrimenkul portföyünüz hakkında bilgi almak istiyorum.' },
      editableFields: [] },
    {
      id: 'global-cookie', type: 'cookie_banner', variant: 'bottom_bar', order: 1001, required: true, position: 'floating',
      settings: { bgMode: 'surface', paddingY: 'none', containerWidth: 'xl', visible: true, order: 1001, removable: false, animation: 'fadeUp' },
      defaultContent: { text: 'Bu site çerezleri kullanır.', acceptText: 'Kabul Et', rejectText: 'Reddet', detailsLink: '/gizlilik' },
      editableFields: []}],
  pages: [{
    id: 'anasayfa', slug: '/', title: "Prestige Estates İstanbul — Bebek", titleTr: 'Ana Sayfa', isHomePage: true, includeInNav: false,
    sections: [
{ id: 'hero', type: 'hero', variant: 'split_image', order: 1, required: true, settings: { bgMode: 'default', paddingY: 'none', containerWidth: 'xl', visible: true, order: 1, removable: false, animation: 'fadeUp' }, defaultContent: { badge: 'Bebek', title: "Prestige Estates İstanbul", subtitle: "Ultra lüks gayrimenkulde dünya standardı", cta1: { text: 'İletişim', href: '#iletisim' } }, editableFields: [] },
{ id: 'hizmetler', type: 'services', variant: 'emlak_services', order: 2, required: true, settings: { bgMode: 'surface', paddingY: 'lg', containerWidth: 'xl', visible: true, order: 2, removable: false, animation: 'fadeUp' }, defaultContent: { badge: 'HİZMETLER', title: 'Hizmetlerimiz', services: [{ id: 's1', name: 'Premium Hizmet', description: 'Detaylı bilgi için iletişime geçin.', icon: 'star' }] }, editableFields: [] },
{ id: 'iletisim', type: 'contact', variant: 'simple_form', order: 3, required: true, settings: { bgMode: 'surface', paddingY: 'lg', containerWidth: 'xl', visible: true, order: 3, removable: false, animation: 'fadeUp' }, defaultContent: { badge: 'İLETİŞİM', title: 'Bize Ulaşın', whatsapp: "902123589900" }, editableFields: [] }
    ]
  }]
}
