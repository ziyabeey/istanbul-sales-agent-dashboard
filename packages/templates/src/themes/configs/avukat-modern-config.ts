/**
 * avukat-modern ThemeConfig (growth)
 * Antrasit + turuncu, kurumsal hukuk firması. Plus Jakarta Sans.
 * Business: Modern Hukuk Ortaklığı, Levent-Maslak
 */
import type { ThemeConfig, BusinessData } from '../../types/section-types'

export const AVUKAT_MODERN_CSS: Record<string, string> = {
  '--color-bg': '#F7F7F7',
  '--color-surface': '#EFEFEF',
  '--color-surface-elevated': '#FFFFFF',
  '--color-surface-muted': '#E2E2E2',
  '--color-text': '#1A1A1A',
  '--color-text-secondary': '#4A4A4A',
  '--color-text-muted': '#888888',
  '--color-text-on-accent': '#FFFFFF',
  '--color-accent': '#EA580C',
  '--color-accent-hover': '#C2410C',
  '--color-accent-light': '#FFF0E8',
  '--color-border': '#DCDCDC',
  '--font-heading': "'Plus Jakarta Sans', sans-serif",
  '--font-body': "'Plus Jakarta Sans', sans-serif",
  '--radius-card': '8px',
  '--radius-btn': '6px'}

export const AVUKAT_MODERN_BUSINESS: BusinessData = {
  name: 'Modern Hukuk Ortaklığı',
  ownerName: 'Av. Berk Demirci',
  sector: 'avukat',
  slogan: 'Kurumsal hukukta güvenilir çözüm ortağı',
  phone: '0212 290 45 56',
  phoneClean: '902122904556',
  whatsapp: '902122904556',
  email: 'info@modernhukuk.com.tr',
  address: 'Büyükdere Cad. No.100 K.8, Levent, İstanbul',
  city: 'İstanbul',
  district: 'Levent',
  coordinates: { lat: 41.0768, lng: 29.0078 },
  workingHours: [
    { day: 'monday', dayTr: 'Pazartesi', open: '09:00', close: '18:00' },
    { day: 'tuesday', dayTr: 'Salı', open: '09:00', close: '18:00' },
    { day: 'wednesday', dayTr: 'Çarşamba', open: '09:00', close: '18:00' },
    { day: 'thursday', dayTr: 'Perşembe', open: '09:00', close: '18:00' },
    { day: 'friday', dayTr: 'Cuma', open: '09:00', close: '17:00' },
    { day: 'saturday', dayTr: 'Cumartesi', open: null, close: null },
    { day: 'sunday', dayTr: 'Pazar', open: null, close: null }],
  socialMedia: { linkedin: 'https://linkedin.com/company/modernhukuk', instagram: 'https://instagram.com/modernhukuk' },
  photos: [],
  services: [
    { id: 's1', name: 'Ticaret Hukuku', price: 'Danışma talep edin', icon: '🏢' },
    { id: 's2', name: 'Şirket Kuruluşu', price: '₺3.500+', icon: '📊' },
    { id: 's3', name: 'Sözleşme Hazırlama', price: '₺2.500+', icon: '📝' },
    { id: 's4', name: 'İş Hukuku', price: 'Danışma talep edin', icon: '💼' }],
  team: [
    { id: 't1', name: 'Av. Berk Demirci', role: 'Kurucu Ortak — Ticaret', experience: '15 yıl' },
    { id: 't2', name: 'Av. Zeynep Aydın', role: 'Kurucu Ortak — LLM ABD', experience: '13 yıl' }],
  experience: '15 yıl',
  rating: 4.9,
  reviewCount: 178,
  foundedYear: 2009}

export const AVUKAT_MODERN_CONFIG: ThemeConfig = {
  id: 'avukat-modern',
  name: 'Modern',
  sectorId: 'avukat',
  plan: 'growth',
  description: 'Antrasit + turuncu, kurumsal hukuk. Levent.',
  designPhilosophy: 'Clean corporate — modern tipografi, turuncu aksan, profesyonel görünüm.',
  isDark: false,
  cssVariables: AVUKAT_MODERN_CSS,
  fonts: {
    heading: { family: 'Merriweather', weights: [600, 700, 800], subsets: ['latin-ext'] },
    body: { family: 'Plus Jakarta Sans', weights: [400, 500], subsets: ['latin-ext'] }},
  seoSchemaType: 'LegalService',
  sectorSections: ['legal_practice_areas', 'attorney_profile', 'case_results', 'consultation_widget'],
  performanceBudget: { maxJS: '150kb', maxLCP: '2.2s', animationLevel: 'framer-basic' },
  globalSections: [
    {
      id: 'global-header', type: 'header', variant: 'minimal_sticky', order: 0, required: true, position: 'top',
      settings: { bgMode: 'default', paddingY: 'none', containerWidth: 'xl', visible: true, order: 0, removable: false, animation: 'fadeUp' },
      defaultContent: {
        logo: { type: 'text', text: 'Modern Hukuk' },
        menuItems: [
          { label: 'Hizmetler', href: '#hizmetler' }, { label: 'Ekip', href: '#ekip' },
          { label: 'Başarılar', href: '#basarilar' }, { label: 'İletişim', href: '#danisma' }],
        cta: { text: 'Danışma Al', href: '#danisma', variant: 'solid' }},
      editableFields: [] },
    {
      id: 'global-footer', type: 'footer', variant: 'warm_columns', order: 999, required: true, position: 'bottom',
      settings: { bgMode: 'surface', paddingY: 'sm', containerWidth: 'xl', visible: true, order: 999, removable: false, animation: 'fadeUp' },
      defaultContent: {
        businessName: 'Modern Hukuk Ortaklığı',
        copyright: '© 2024 Modern Hukuk Ortaklığı',
        contact: { phone: '0212 290 45 56', address: 'Levent, İstanbul' },
        social: [{ platform: 'linkedin', url: 'https://linkedin.com/company/modernhukuk', icon: 'linkedin' }],
        legal: [{ label: 'KVKK', href: '/kvkk' }],
        poweredBy: '⚡ kepenk.ai'},
      editableFields: [] },
    {
      id: 'global-whatsapp', type: 'whatsapp_cta', variant: 'floating', order: 1000, required: true, position: 'floating',
      settings: { bgMode: 'default', paddingY: 'none', containerWidth: 'xl', visible: true, order: 1000, removable: false, animation: 'fadeUp' },
      defaultContent: { phone: '902122904556', message: 'Merhaba, kurumsal hukuk danışmanlığı hakkında bilgi almak istiyorum.' },
      editableFields: [] },
    {
      id: 'global-cookie', type: 'cookie_banner', variant: 'bottom_bar', order: 1001, required: true, position: 'floating',
      settings: { bgMode: 'surface', paddingY: 'none', containerWidth: 'xl', visible: true, order: 1001, removable: false, animation: 'fadeUp' },
      defaultContent: { text: 'Bu site çerezleri kullanır.', acceptText: 'Kabul Et', rejectText: 'Reddet', detailsLink: '/gizlilik' },
      editableFields: []}],
  pages: [{
    id: 'anasayfa', slug: '/', title: "Modern Hukuk Ortaklığı — Levent", titleTr: 'Ana Sayfa', isHomePage: true, includeInNav: false,
    sections: [
{ id: 'hero', type: 'hero', variant: 'fullscreen_overlay', order: 1, required: true, settings: { bgMode: 'default', paddingY: 'none', containerWidth: 'xl', visible: true, order: 1, removable: false, animation: 'fadeUp' }, defaultContent: { badge: 'Levent', title: "Modern Hukuk Ortaklığı", subtitle: "Kurumsal hukukta güvenilir çözüm ortağı", cta1: { text: 'İletişim', href: '#iletisim' } }, editableFields: [] },
{ id: 'hakkimizda', type: 'about', variant: 'split_left', order: 2, required: false, settings: { bgMode: 'default', paddingY: 'lg', containerWidth: 'xl', visible: true, order: 2, removable: true, animation: 'fadeUp' }, defaultContent: { badge: 'HAKKIMIZDA', title: "Biz Kimiz?", description: "Yılların tecrübesiyle hizmetinizdeyiz." }, editableFields: [] },
{ id: 'istatistik', type: 'stats', variant: 'animated_row', order: 3, required: false, settings: { bgMode: 'accent', paddingY: 'md', containerWidth: 'xl', visible: true, order: 3, removable: true, animation: 'fadeUp' }, defaultContent: { stats: [{value: '10+', label: 'Yıl'}, {value: '100+', label: 'Müşteri'}] }, editableFields: [] },
{ id: 'galeri', type: 'gallery', variant: 'masonry', order: 4, required: false, settings: { bgMode: 'default', paddingY: 'lg', containerWidth: 'xl', visible: true, order: 4, removable: true, animation: 'fadeUp' }, defaultContent: { badge: 'GALERİ', title: 'Çalışmalarımız', items: [{ id: 'g1', url: '/placeholder.jpg' }] }, editableFields: [] },
{ id: 'hizmetler', type: 'services', variant: 'avukat_services', order: 5, required: true, settings: { bgMode: 'surface', paddingY: 'lg', containerWidth: 'xl', visible: true, order: 5, removable: false, animation: 'fadeUp' }, defaultContent: { badge: 'HİZMETLER', title: 'Hizmetlerimiz', services: [{ id: 's1', name: 'Premium Hizmet', description: 'Detaylı bilgi için iletişime geçin.', icon: 'star' }] }, editableFields: [] },
{ id: 'iletisim', type: 'contact', variant: 'detailed_form', order: 6, required: true, settings: { bgMode: 'surface', paddingY: 'lg', containerWidth: 'xl', visible: true, order: 6, removable: false, animation: 'fadeUp' }, defaultContent: { badge: 'İLETİŞİM', title: 'Bize Ulaşın', whatsapp: "902122904556" }, editableFields: [] }
    ]
  }]
}
