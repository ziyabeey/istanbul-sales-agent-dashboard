/**
 * emlak-konut ThemeConfig (free)
 * Beyaz + lacivert, genel konut danışmanlığı. Inter.
 * Business: İstanbul Konut Danışmanlık, Kadıköy
 */
import type { ThemeConfig, BusinessData } from '../../types/section-types'

export const EMLAK_KONUT_CSS: Record<string, string> = {
  '--color-bg': '#F8FAFF',
  '--color-surface': '#EEF2FF',
  '--color-surface-elevated': '#FFFFFF',
  '--color-surface-muted': '#E0E7FF',
  '--color-text': '#0F172A',
  '--color-text-secondary': '#334155',
  '--color-text-muted': '#64748B',
  '--color-text-on-accent': '#FFFFFF',
  '--color-accent': '#2563EB',
  '--color-accent-hover': '#1D4ED8',
  '--color-accent-light': '#EFF6FF',
  '--color-border': '#BFDBFE',
  '--font-heading': "'Montserrat', sans-serif",
  '--font-body': "'Inter', sans-serif",
  '--radius-card': '12px',
  '--radius-btn': '8px'}

export const EMLAK_KONUT_BUSINESS: BusinessData = {
  name: 'İstanbul Konut Danışmanlık',
  ownerName: 'Can Yıldız',
  sector: 'emlak',
  slogan: 'Evinizi birlikte bulalım',
  phone: '0216 380 22 44',
  phoneClean: '902163802244',
  whatsapp: '902163802244',
  email: 'info@istanbulkonut.com.tr',
  address: 'Bağdat Cad. No.118 D.5, Kadıköy, İstanbul',
  city: 'İstanbul',
  district: 'Kadıköy',
  coordinates: { lat: 40.9812, lng: 29.0574 },
  workingHours: [
    { day: 'monday', dayTr: 'Pazartesi', open: '09:00', close: '19:00' },
    { day: 'tuesday', dayTr: 'Salı', open: '09:00', close: '19:00' },
    { day: 'wednesday', dayTr: 'Çarşamba', open: '09:00', close: '19:00' },
    { day: 'thursday', dayTr: 'Perşembe', open: '09:00', close: '19:00' },
    { day: 'friday', dayTr: 'Cuma', open: '09:00', close: '19:00' },
    { day: 'saturday', dayTr: 'Cumartesi', open: '10:00', close: '17:00' },
    { day: 'sunday', dayTr: 'Pazar', open: null, close: null }],
  socialMedia: { instagram: 'https://instagram.com/istanbulkonut', facebook: 'https://facebook.com/istanbulkonut' },
  photos: [],
  services: [
    { id: 's1', name: 'Satılık Daire', icon: '🏠' },
    { id: 's2', name: 'Kiralık Daire', icon: '🔑' },
    { id: 's3', name: 'Ekspertiz', icon: '🔍' },
    { id: 's4', name: 'Tapu İşlemleri', icon: '📋' }],
  team: [{ id: 't1', name: 'Can Yıldız', role: 'Emlak Danışmanı', experience: '14 yıl' }],
  experience: '14 yıl',
  rating: 4.8,
  reviewCount: 312,
  foundedYear: 2010}

export const EMLAK_KONUT_CONFIG: ThemeConfig = {
  id: 'emlak-konut',
  name: 'Konut',
  sectorId: 'emlak',
  plan: 'free',
  description: 'Beyaz + lacivert, genel konut danışmanlığı. Kadıköy.',
  designPhilosophy: 'Güven mavisi — konut sektörünün klasik paleti, sade ve professional.',
  isDark: false,
  cssVariables: EMLAK_KONUT_CSS,
  fonts: {
    heading: { family: 'Lora', weights: [600, 700, 800], subsets: ['latin-ext'] },
    body: { family: 'Inter', weights: [400, 500], subsets: ['latin-ext'] }},
  seoSchemaType: 'RealEstateAgent',
  sectorSections: ['property_listing_grid', 'agent_profile', 'real_estate_stats', 'valuation_request'],
  performanceBudget: { maxJS: '80kb', maxLCP: '2.0s', animationLevel: 'css-only' },
  globalSections: [
    {
      id: 'global-header', type: 'header', variant: 'minimal_sticky', order: 0, required: true, position: 'top',
      settings: { bgMode: 'default', paddingY: 'none', containerWidth: 'xl', visible: true, order: 0, removable: false, animation: 'fadeUp' },
      defaultContent: {
        logo: { type: 'text', text: 'İstanbul Konut' },
        menuItems: [
          { label: 'Portföy', href: '#portfolio' }, { label: 'Semtler', href: '#semtler' },
          { label: 'Danışman', href: '#danisman' }, { label: 'Değerleme', href: '#degerleme' }],
        cta: { text: 'Değerleme Al', href: '#degerleme', variant: 'solid' }},
      editableFields: [] },
    {
      id: 'global-footer', type: 'footer', variant: 'warm_columns', order: 999, required: true, position: 'bottom',
      settings: { bgMode: 'surface', paddingY: 'sm', containerWidth: 'xl', visible: true, order: 999, removable: false, animation: 'fadeUp' },
      defaultContent: {
        businessName: 'İstanbul Konut Danışmanlık',
        copyright: '© 2024 İstanbul Konut Danışmanlık',
        contact: { phone: '0216 380 22 44', address: 'Kadıköy, İstanbul' },
        social: [{ platform: 'instagram', url: 'https://instagram.com/istanbulkonut', icon: 'instagram' }],
        legal: [{ label: 'KVKK', href: '/kvkk' }],
        poweredBy: '⚡ kepenk.ai'},
      editableFields: [] },
    {
      id: 'global-whatsapp', type: 'whatsapp_cta', variant: 'floating', order: 1000, required: true, position: 'floating',
      settings: { bgMode: 'default', paddingY: 'none', containerWidth: 'xl', visible: true, order: 1000, removable: false, animation: 'fadeUp' },
      defaultContent: { phone: '902163802244', message: 'Merhaba, emlak hakkında bilgi almak istiyorum.' },
      editableFields: [] },
    {
      id: 'global-cookie', type: 'cookie_banner', variant: 'bottom_bar', order: 1001, required: true, position: 'floating',
      settings: { bgMode: 'surface', paddingY: 'none', containerWidth: 'xl', visible: true, order: 1001, removable: false, animation: 'fadeUp' },
      defaultContent: { text: 'Bu site çerezleri kullanır.', acceptText: 'Kabul Et', rejectText: 'Reddet', detailsLink: '/gizlilik' },
      editableFields: []}],
  pages: [{
    id: 'anasayfa', slug: '/', title: "İstanbul Konut Danışmanlık — Kadıköy", titleTr: 'Ana Sayfa', isHomePage: true, includeInNav: false,
    sections: [
{ id: 'hero', type: 'hero', variant: 'fullscreen_overlay', order: 1, required: true, settings: { bgMode: 'default', paddingY: 'none', containerWidth: 'xl', visible: true, order: 1, removable: false, animation: 'fadeUp' }, defaultContent: { badge: 'Kadıköy', title: "İstanbul Konut Danışmanlık", subtitle: "Evinizi birlikte bulalım", cta1: { text: 'İletişim', href: '#iletisim' } }, editableFields: [] },
{ id: 'hakkimizda', type: 'about', variant: 'split_left', order: 2, required: false, settings: { bgMode: 'default', paddingY: 'lg', containerWidth: 'xl', visible: true, order: 2, removable: true, animation: 'fadeUp' }, defaultContent: { badge: 'HAKKIMIZDA', title: "Biz Kimiz?", description: "Yılların tecrübesiyle hizmetinizdeyiz." }, editableFields: [] },
{ id: 'istatistik', type: 'stats', variant: 'animated_row', order: 3, required: false, settings: { bgMode: 'accent', paddingY: 'md', containerWidth: 'xl', visible: true, order: 3, removable: true, animation: 'fadeUp' }, defaultContent: { stats: [{value: '10+', label: 'Yıl'}, {value: '100+', label: 'Müşteri'}] }, editableFields: [] },
{ id: 'galeri', type: 'gallery', variant: 'masonry', order: 4, required: false, settings: { bgMode: 'default', paddingY: 'lg', containerWidth: 'xl', visible: true, order: 4, removable: true, animation: 'fadeUp' }, defaultContent: { badge: 'GALERİ', title: 'Çalışmalarımız', items: [{ id: 'g1', url: '/placeholder.jpg' }] }, editableFields: [] },
{ id: 'hizmetler', type: 'services', variant: 'emlak_services', order: 5, required: true, settings: { bgMode: 'surface', paddingY: 'lg', containerWidth: 'xl', visible: true, order: 5, removable: false, animation: 'fadeUp' }, defaultContent: { badge: 'HİZMETLER', title: 'Hizmetlerimiz', services: [{ id: 's1', name: 'Premium Hizmet', description: 'Detaylı bilgi için iletişime geçin.', icon: 'star' }] }, editableFields: [] },
{ id: 'cta', type: 'cta', variant: 'simple_banner', order: 6, required: false, settings: { bgMode: 'accent', paddingY: 'md', containerWidth: 'full', visible: true, order: 6, removable: true, animation: 'fadeUp' }, defaultContent: { title: 'Hemen Başlayın', cta: { text: 'Bize Ulaşın' } }, editableFields: [] },
{ id: 'iletisim', type: 'contact', variant: 'detailed_form', order: 7, required: true, settings: { bgMode: 'surface', paddingY: 'lg', containerWidth: 'xl', visible: true, order: 7, removable: false, animation: 'fadeUp' }, defaultContent: { badge: 'İLETİŞİM', title: 'Bize Ulaşın', whatsapp: "902163802244" }, editableFields: [] }
    ]
  }]
}
