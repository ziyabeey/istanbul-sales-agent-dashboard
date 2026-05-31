import type { ThemeConfig, BusinessData } from '../../../../types/section-types'

export const HUKUK_SADE_CSS: Record<string, string> = {
  '--color-bg': '#FFFFFF',
  '--color-surface': '#F8FAFC',
  '--color-surface-elevated': '#FFFFFF',
  '--color-surface-muted': '#F1F5F9',
  '--color-text': '#0F172A',
  '--color-text-secondary': '#475569',
  '--color-text-muted': '#94A3B8',
  '--color-text-on-accent': '#FFFFFF',
  '--color-accent': '#3B82F6',
  '--color-accent-hover': '#2563EB',
    '--color-accent-active': '#7e2a6c',
  '--color-accent-light': '#DBEAFE',
  '--color-border': '#E2E8F0',
  '--font-heading': "'Inter', sans-serif",
  '--font-body': "'Inter', sans-serif",
  '--radius-md': '6px',
  '--radius-lg': '12px'
}

export const HUKUK_SADE_BUSINESS: BusinessData = {
  name: 'Av. Ali Can',
  ownerName: 'Ali Can',
  sectorId: 'hukuk',
  slogan: 'Hızlı ve Şeffaf Hukuki Çözümler',
  phone: '0555 123 45 67',
  phoneClean: '905551234567',
  whatsapp: '905551234567',
  email: 'iletisim@alicanhukuk.com',
  address: 'Kadıköy, İstanbul',
  city: 'İstanbul',
  district: 'Kadıköy',
  coordinates: { lat: 40.9902, lng: 29.0203 },
  workingHours: [
    { day: 'monday', dayTr: 'Pzt', open: '09:00', close: '18:00' },
    { day: 'tuesday', dayTr: 'Sal', open: '09:00', close: '18:00' },
    { day: 'wednesday', dayTr: 'Çar', open: '09:00', close: '18:00' },
    { day: 'thursday', dayTr: 'Per', open: '09:00', close: '18:00' },
    { day: 'friday', dayTr: 'Cum', open: '09:00', close: '18:00' }
  ],
  services: [
    { id: '1', name: 'Aile Hukuku', description: 'Boşanma ve nafaka süreçleri.', icon: 'users' },
    { id: '2', name: 'İş Hukuku', description: 'İşe iade ve tazminat.', icon: 'briefcase' },
    { id: '3', name: 'Ceza Hukuku', description: 'Soruşturma temsil.', icon: 'shield' }
  ],
  experience: '5 Yıl',
  foundedYear: 2019
}

export const HUKUK_SADE_CONFIG: ThemeConfig = {
  id: 'hukuk-sade',
  name: 'Sade Hukuk',
  sectorId: 'hukuk',
  plan: 'free',
  description: 'Minimalist ve temiz.',
  isDark: false,
  cssVariables: HUKUK_SADE_CSS,
  fonts: { heading: { family: 'Inter', weights: [500, 700] }, body: { family: 'Inter', weights: [400] } },
  seoSchemaType: 'LegalService',
  sectorSections: [],
  globalSections: [
    { id: 'global-header', type: 'header', variant: 'auto', order: 0, required: true, position: 'top', settings: { bgMode: 'default', paddingY: 'sm', containerWidth: 'xl', visible: true, order: 0, removable: false, animation: 'none' }, defaultContent: { logo: { type: 'text', text: 'Av. Ali Can' }, menuItems: [ { label: 'Hizmetler', href: '#hizmetler' }, { label: 'İletişim', href: '#iletisim' } ], cta: { text: 'Danışmanlık Al', href: '#iletisim', variant: 'solid' } }, editableFields: [] },
    { id: 'global-footer', type: 'footer', variant: 'auto', order: 999, required: true, position: 'bottom', settings: { bgMode: 'surface', paddingY: 'lg', containerWidth: 'xl', visible: true, order: 999, removable: false, animation: 'none' }, defaultContent: { businessName: 'Av. Ali Can', copyright: '© 2024 Tüm hakları saklıdır.' }, editableFields: [] }
  ],
  pages: [{
    id: 'anasayfa', slug: '/', title: 'Av. Ali Can', titleTr: 'Ana Sayfa', isHomePage: true, includeInNav: false,
    sections: [
      { id: 'hero', type: 'hero', variant: 'auto', order: 1, required: true, settings: { bgMode: 'default', paddingY: 'lg', containerWidth: 'xl', visible: true, order: 1, animation: 'fadeUp' }, defaultContent: { badge: 'HUKUK', title: 'Hızlı ve Şeffaf Çözümler', subtitle: 'Hukuki süreçlerinizi yönetiyoruz.', cta1: { text: 'İletişime Geç', href: '#iletisim' } }, editableFields: [] },
      { id: 'hakkimizda', type: 'about', variant: 'auto', order: 2, required: false, settings: { bgMode: 'surface', paddingY: 'lg', containerWidth: 'xl', visible: true, order: 2, animation: 'fadeUp' }, defaultContent: { badge: 'HAKKIMIZDA', title: 'Yanınızdayız', description: 'Müvekkil odaklı yaklaşım.' }, editableFields: [] },
      { id: 'hizmetler', type: 'services', variant: 'auto', order: 3, required: true, settings: { bgMode: 'default', paddingY: 'lg', containerWidth: 'xl', visible: true, order: 3, animation: 'fadeUp' }, defaultContent: { badge: 'ALANLAR', title: 'Hizmetlerimiz' }, editableFields: [] },
      { id: 'iletisim', type: 'contact', variant: 'auto', order: 4, required: true, settings: { bgMode: 'surface', paddingY: 'lg', containerWidth: 'xl', visible: true, order: 4, animation: 'fadeUp' }, defaultContent: { badge: 'İLETİŞİM', title: 'Bize Ulaşın' }, editableFields: [] }
    ]
  }]
}