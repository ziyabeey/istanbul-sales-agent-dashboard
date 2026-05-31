/**
 * @kepenk/templates — muhasebe-holding ThemeConfig
 * Holding Muhasebe — Kurumsal sirketlerin mali cozum ortagi
 * Plan: pro | Font: Outfit + Inter
 */
import type { ThemeConfig, BusinessData } from '../../../../types/section-types'

export const MUHASEBE_HOLDING_CSS: Record<string, string> = {
  '--color-bg': '#FFFFFF',
  '--color-surface': '#F8FAFC',
  '--color-surface-elevated': '#FFFFFF',
  '--color-surface-muted': '#F1F5F9',
  '--color-text': '#0F172A',
  '--color-text-secondary': '#475569',
  '--color-text-muted': '#94A3B8',
  '--color-text-on-accent': '#FFFFFF',
  '--color-accent': '#0D9488',
  '--color-accent-hover': '#0F766E',
  '--color-accent-active': '#115E59',
  '--color-accent-light': '#F0FDFA',
  '--color-accent-subtle': '#F8FFFE',
  '--color-border': '#E2E8F0',
  '--color-border-subtle': '#F1F5F9',
  '--font-heading': "'Outfit', sans-serif",
  '--font-body': "'Inter', sans-serif",
  '--radius-md': '6px',
  '--radius-lg': '12px'
}

export const MUHASEBE_HOLDING_BUSINESS: BusinessData = {
  name: 'Holding Muhasebe',
  ownerName: 'Prof. Dr. Veli Holding',
  sectorId: 'muhasebe',
  slogan: 'Kurumsal sirketlerin mali cozum ortagi',
  phone: '0212 888 99 00',
  phoneClean: '902128889900',
  whatsapp: '902128889900',
  email: 'info@holdingmuhasebe.com',
  address: 'Levent Mah. Buyukdere Cad. No:185, Sisli',
  city: 'Istanbul',
  district: 'Sisli',
  coordinates: { lat: 41.082, lng: 29.0103 },
  workingHours: [
    { day: 'monday', dayTr: 'Pazartesi', open: '09:00', close: '18:00' },
    { day: 'tuesday', dayTr: 'Sal\u0131', open: '09:00', close: '18:00' },
    { day: 'wednesday', dayTr: '\u00c7ar\u015famba', open: '09:00', close: '18:00' },
    { day: 'thursday', dayTr: 'Per\u015fembe', open: '09:00', close: '18:00' },
    { day: 'friday', dayTr: 'Cuma', open: '09:00', close: '18:00' },
    { day: 'saturday', dayTr: 'Cumartesi', open: '10:00', close: '14:00' },
    { day: 'sunday', dayTr: 'Pazar', open: null, close: null }
  ],
  socialMedia: { instagram: 'https://instagram.com/muhasebe-holding' },
  photos: [],
  services: [
    { id: 's1', name: 'Konsolide Raporlama', price: '50.000 TL', duration: 'Yillik', icon: 'building', popular: true, description: 'Grup sirketi konsolide mali tablo' },
    { id: 's2', name: 'Transfer Fiyatlandirma', price: '30.000 TL', duration: 'Yillik', icon: 'git-branch', description: 'Iliskili taraf islemleri raporu' },
    { id: 's3', name: 'UFRS Donusum', price: '20.000 TL', duration: 'Proje', icon: 'refresh-cw', description: 'UFRS/TFRS uyum danismanligi' }
  ],
  team: [
    { id: 't1', name: 'Prof. Dr. Veli Holding', role: 'Yonetici Ortak', experience: '30 yil' }
  ],
  experience: '30 yil',
  rating: 4.9,
  reviewCount: 85,
  foundedYear: 1995
}

export const MUHASEBE_HOLDING_CONFIG: ThemeConfig = {
  id: 'muhasebe-holding',
  name: 'Holding Muhasebe',
  sectorId: 'muhasebe',
  plan: 'pro',
  description: 'Kurumsal sirketlerin mali cozum ortagi',
  isDark: false,
  cssVariables: MUHASEBE_HOLDING_CSS,
  fonts: {
    heading: { family: 'Outfit', weights: [600,700], subsets: ['latin-ext'] },
    body: { family: 'Inter', weights: [400,500], subsets: ['latin-ext'] }
  },
  seoSchemaType: 'AccountingService',
  designPhilosophy: 'Holding Muhasebe tema tasarimi.',
  inspiration: ['Modern TR muhasebe'],
  sectorSections: ['services', 'gallery'],
  performanceBudget: { maxJS: '250kb', maxLCP: '3.0s', animationLevel: 'gsap-allowed' },
  globalSections: [
    { id: 'global-header', type: 'header', variant: 'auto', order: 0, required: true, position: 'top',
      settings: { bgMode: 'default', paddingY: 'none', containerWidth: 'xl', visible: true, order: 0, removable: false, animation: 'fadeUp' },
      defaultContent: { logo: { type: 'text', text: 'Holding Muhasebe' }, menuItems: [{ label: 'Hizmetler', href: '#hizmetler' }, { label: 'Hakk\u0131m\u0131zda', href: '#hakkimizda' }, { label: '\u0130leti\u015fim', href: '#iletisim' }], cta: { text: 'Hemen Ara', href: 'https://wa.me/902128889900', variant: 'solid' } },
      editableFields: [] },
    { id: 'global-footer', type: 'footer', variant: 'auto', order: 999, required: true, position: 'bottom',
      settings: { bgMode: 'surface', paddingY: 'lg', containerWidth: 'xl', visible: true, order: 999, removable: false, animation: 'fadeUp' },
      defaultContent: { businessName: 'Holding Muhasebe', description: 'Kurumsal sirketlerin mali cozum ortagi', copyright: '\u00a9 2025 Holding Muhasebe. T\u00fcm haklar\u0131 sakl\u0131d\u0131r.',
        columns: [{ title: 'Hizmetler', links: [{ label: 'Konsolide Raporlama', href: '#' }, { label: 'Transfer Fiyatlandirma', href: '#' }, { label: 'UFRS Donusum', href: '#' }] }, { title: 'Sayfalar', links: [{ label: 'Hakk\u0131m\u0131zda', href: '#hakkimizda' }, { label: '\u0130leti\u015fim', href: '#iletisim' }] }],
        contact: { phone: '0212 888 99 00', email: 'info@holdingmuhasebe.com', address: 'Levent Mah. Buyukdere Cad. No:185, Sisli' },
        social: [{ platform: 'instagram', url: 'https://instagram.com/muhasebe-holding', icon: 'instagram' }],
        legal: [{ label: 'Gizlilik', href: '/gizlilik' }, { label: 'KVKK', href: '/kvkk' }], poweredBy: '\u26a1 kepenk.ai' },
      editableFields: [] },
    { id: 'global-whatsapp', type: 'whatsapp_cta', variant: 'floating', order: 1000, required: true, position: 'floating',
      settings: { bgMode: 'default', paddingY: 'none', containerWidth: 'xl', visible: true, order: 1000, removable: false, animation: 'fadeUp' },
      defaultContent: { phone: '902128889900', message: 'Merhaba, Holding Muhasebe hakk\u0131nda bilgi almak istiyorum.' },
      editableFields: [] },
    { id: 'global-cookie', type: 'cookie_banner', variant: 'bottom_bar', order: 1001, required: true, position: 'floating',
      settings: { bgMode: 'surface', paddingY: 'none', containerWidth: 'xl', visible: true, order: 1001, removable: false, animation: 'fadeUp' },
      defaultContent: { text: 'Bu site \u00e7erezleri kullan\u0131r.', acceptText: 'Kabul Et', rejectText: 'Reddet', detailsLink: '/gizlilik' },
      editableFields: [] }
  ],
  pages: [{
    id: 'anasayfa', slug: '/', title: 'Holding Muhasebe \u2014 Sisli', titleTr: 'Ana Sayfa', isHomePage: true, includeInNav: false,
    sections: [
      { id: 'hero', type: 'hero', variant: 'auto', order: 1, required: true,
        settings: { bgMode: 'default', paddingY: 'none', containerWidth: 'xl', visible: true, order: 1, removable: false, animation: 'fadeUp' },
        defaultContent: { badge: 'SISLI', title: 'Holding Muhasebe', subtitle: 'Kurumsal sirketlerin mali cozum ortagi', cta1: { text: 'Hemen Ara', href: '#iletisim' } },
        editableFields: [] },
      { id: 'hakkimizda', type: 'about', variant: 'auto', order: 2, required: false,
        settings: { bgMode: 'default', paddingY: 'lg', containerWidth: 'xl', visible: true, order: 2, removable: true, animation: 'fadeUp' },
        defaultContent: { badge: 'HAKKIMIZDA', title: 'Biz Kimiz?', description: 'Kurumsal sirketlerin mali cozum ortagi' },
        editableFields: [] },
      { id: 'istatistik', type: 'stats', variant: 'auto', order: 3, required: false,
        settings: { bgMode: 'accent', paddingY: 'md', containerWidth: 'xl', visible: true, order: 3, removable: true, animation: 'fadeUp' },
        defaultContent: { stats: [{ value: '30 yil', label: 'Deneyim' }, { value: '85+', label: 'Mutlu M\u00fc\u015fteri' }, { value: '4.9', label: 'Puan' }] },
        editableFields: [] },
      { id: 'hizmetler', type: 'services', variant: 'auto', order: 4, required: true,
        settings: { bgMode: 'surface', paddingY: 'lg', containerWidth: 'xl', visible: true, order: 4, removable: false, animation: 'fadeUp' },
        defaultContent: { badge: 'H\u0130ZMETLER', title: 'Hizmetlerimiz', services: [{ id: 's1', name: '\u00d6zel Hizmet', description: 'Detay i\u00e7in iletisime ge\u00e7in.', icon: 'star' }] },
        editableFields: [] },
      { id: 'iletisim', type: 'contact', variant: 'auto', order: 5, required: true,
        settings: { bgMode: 'surface', paddingY: 'lg', containerWidth: 'xl', visible: true, order: 5, removable: false, animation: 'fadeUp' },
        defaultContent: { badge: '\u0130LET\u0130\u015e\u0130M', title: 'Bize Ula\u015f\u0131n', whatsapp: '902128889900' },
        editableFields: [] }
    ]
  }]
}
