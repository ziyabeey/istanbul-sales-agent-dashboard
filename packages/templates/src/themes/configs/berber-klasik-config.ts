/**
 * @kepenk/templates — berber-klasik ThemeConfig
 *
 * Vintage barber feel. Cream paper texture, serif headings, gold accent.
 * Plan: starter (3 pages, 11 sections, framer-basic animation)
 * Fonts: Playfair Display (heading) + DM Sans (body)
 */

import type { ThemeConfig, BusinessData } from '../../types/section-types'

export const BERBER_KLASIK_CSS: Record<string, string> = {
  '--color-bg': '#FAF8F3',
  '--color-surface': '#F0ECE3',
  '--color-surface-elevated': '#FFFFFF',
  '--color-surface-muted': '#E8E4DB',
  '--color-text': '#2C2014',
  '--color-text-secondary': '#6B5F50',
  '--color-text-muted': '#9C9080',
  '--color-text-on-accent': '#FFFFFF',
  '--color-accent': '#8B6914',
  '--color-accent-hover': '#705510',
  '--color-accent-active': '#5C4608',
  '--color-accent-light': '#F5F0E0',
  '--color-accent-subtle': '#FAF6EC',
  '--color-border': '#DDD6C8',
  '--color-border-subtle': '#E8E4DB',
  '--font-heading': "'Playfair Display', serif",
  '--font-body': "'DM Sans', sans-serif",
  '--radius-md': '12px',
  '--radius-lg': '16px'}

export const BERBER_KLASIK_BUSINESS: BusinessData = {
  name: 'Efe Berber Salonu',
  ownerName: 'Efe Karaca',
  sector: 'berber',
  slogan: 'Geleneksel ustalık, modern dokunuş',
  phone: '0535 912 34 56',
  phoneClean: '905359123456',
  whatsapp: '905359123456',
  email: 'info@efeberbersalonu.com',
  address: 'Rumeli Cad. No:72, Nişantaşı, Şişli',
  city: 'İstanbul',
  district: 'Şişli',
  coordinates: { lat: 41.0485, lng: 28.9903 },
  workingHours: [
    { day: 'monday', dayTr: 'Pazartesi', open: '09:00', close: '20:00' },
    { day: 'tuesday', dayTr: 'Salı', open: '09:00', close: '20:00' },
    { day: 'wednesday', dayTr: 'Çarşamba', open: '09:00', close: '20:00' },
    { day: 'thursday', dayTr: 'Perşembe', open: '09:00', close: '20:00' },
    { day: 'friday', dayTr: 'Cuma', open: '09:00', close: '20:00' },
    { day: 'saturday', dayTr: 'Cumartesi', open: '09:00', close: '19:00' },
    { day: 'sunday', dayTr: 'Pazar', open: null, close: null }],
  socialMedia: { instagram: 'https://instagram.com/efeberbersalonu' },
  photos: [],
  services: [
    { id: 's1', name: 'Klasik Saç Kesimi', price: '₺300', duration: '35 dk', icon: 'scissors' },
    { id: 's2', name: 'Ustura Tıraşı', price: '₺200', duration: '25 dk', icon: 'pen-tool' },
    { id: 's3', name: 'Saç + Sakal Kombo', price: '₺400', duration: '55 dk', icon: 'star', popular: true },
    { id: 's4', name: 'Sıcak Havlu Ritüeli', price: '₺150', duration: '20 dk', icon: 'sparkles' },
    { id: 's5', name: 'Saç Boyama', price: '₺250', duration: '45 dk', icon: 'palette' },
    { id: 's6', name: 'Damat Paketi', price: '₺800', duration: '90 dk', icon: 'crown' }],
  team: [
    { id: 't1', name: 'Efe Karaca', role: 'Baş Berber', experience: '20 yıl' },
    { id: 't2', name: 'Ahmet Yıldız', role: 'Kıdemli Berber', experience: '12 yıl' },
    { id: 't3', name: 'Oğuzhan Çelik', role: 'Berber', experience: '5 yıl' }],
  experience: '20 yıl',
  rating: 4.9,
  reviewCount: 214,
  foundedYear: 1996}

export const BERBER_KLASIK_CONFIG: ThemeConfig = {
  id: 'berber-klasik',
  name: 'Klasik',
  sectorId: 'berber',
  plan: 'starter',
  description: 'Vintage berber dükkanı hissi. Krem kağıt dokusu, serif başlıklar, altın accent.',
  designPhilosophy: 'Playfair Display başlıklarda eski dünya hissi, DM Sans gövdede modern okuma.',
  inspiration: ['Murdock London', 'Baxter Finley'],
  isDark: false,
  cssVariables: BERBER_KLASIK_CSS,
  fonts: {
    heading: { family: 'Outfit', weights: [400, 700], subsets: ['latin-ext'] },
    body:    { family: 'DM Sans', weights: [400, 500, 700], subsets: ['latin-ext'] }},
  seoSchemaType: 'BarberShop',
  sectorSections: ['before_after', 'booking'],
  performanceBudget: { maxJS: '120kb', maxLCP: '2.5s', animationLevel: 'framer-basic' },
  globalSections: [
    {
      id: 'global-header', type: 'header', variant: 'minimal_sticky', order: 0, required: true, position: 'top',
      settings: { bgMode: 'default', paddingY: 'none', containerWidth: 'md', visible: true, order: 0, removable: false, animation: 'fadeIn' },
      defaultContent: {
        logo: { type: 'text', text: 'Efe Berber' },
        menuItems: [
          { label: 'Hizmetler', href: '#hizmetler' },
          { label: 'Galeri', href: '#galeri' },
          { label: 'Ekibimiz', href: '#ekip' },
          { label: 'Yorumlar', href: '#yorumlar' },
          { label: 'İletişim', href: '#iletisim' }],
        cta: { text: 'Randevu Al', href: 'https://wa.me/905359123456', variant: 'solid' }},
      editableFields: [{ path: 'logo.text', type: 'text', label: 'Logo', required: true }]},
    {
      id: 'global-footer', type: 'footer', variant: 'warm_columns', order: 999, required: true, position: 'bottom',
      settings: { bgMode: 'surface', paddingY: 'md', containerWidth: 'md', visible: true, order: 999, removable: false, animation: 'fadeIn' },
      defaultContent: {
        businessName: 'Efe Berber Salonu',
        description: '1996\'dan beri Nişantaşı\'nda geleneksel berber ustalığı.',
        copyright: '© 2024 Efe Berber Salonu. Tüm hakları saklıdır.',
        contact: { phone: '0535 912 34 56', email: 'info@efeberbersalonu.com', address: 'Rumeli Cad. No:72, Nişantaşı' },
        social: [{ platform: 'instagram', url: 'https://instagram.com/efeberbersalonu', icon: 'instagram' }],
        legal: [{ label: 'Gizlilik', href: '/gizlilik' }, { label: 'KVKK', href: '/kvkk' }],
        poweredBy: '⚡ kepenk.ai'},
      editableFields: [] },
    {
      id: 'global-whatsapp', type: 'whatsapp_cta', variant: 'floating', order: 1000, required: true, position: 'floating',
      settings: { bgMode: 'default', paddingY: 'none', containerWidth: 'md', visible: true, order: 1000, removable: false, animation: 'fadeIn' },
      defaultContent: { phone: '905359123456', message: 'Merhaba, randevu almak istiyorum.' },
      editableFields: [] },
    {
      id: 'global-cookie', type: 'cookie_banner', variant: 'bottom_bar', order: 1001, required: true, position: 'floating',
      settings: { bgMode: 'surface', paddingY: 'none', containerWidth: 'md', visible: true, order: 1001, removable: false, animation: 'fadeIn' },
      defaultContent: { text: 'Bu site çerezleri kullanır.', acceptText: 'Kabul Et', rejectText: 'Reddet', detailsLink: '/gizlilik' },
      editableFields: []}],
  pages: [{
    id: 'anasayfa', slug: '/', title: "Efe Berber Salonu — Şişli", titleTr: 'Ana Sayfa', isHomePage: true, includeInNav: false,
    sections: [
{ id: 'hero', type: 'hero', variant: 'split_image', order: 1, required: true, settings: { bgMode: 'default', paddingY: 'none', containerWidth: 'md', visible: true, order: 1, removable: false, animation: 'fadeIn' }, defaultContent: { badge: 'Şişli', title: "Efe Berber Salonu", subtitle: "Geleneksel ustalık, modern dokunuş", cta1: { text: 'İletişim', href: '#iletisim' } }, editableFields: [] },
{ id: 'hakkimizda', type: 'about', variant: 'split_left', order: 2, required: false, settings: { bgMode: 'default', paddingY: 'lg', containerWidth: 'md', visible: true, order: 2, removable: true, animation: 'fadeIn' }, defaultContent: { badge: 'HAKKIMIZDA', title: "Biz Kimiz?", description: "Yılların tecrübesiyle hizmetinizdeyiz." }, editableFields: [] },
{ id: 'istatistik', type: 'stats', variant: 'animated_row', order: 3, required: false, settings: { bgMode: 'accent', paddingY: 'md', containerWidth: 'md', visible: true, order: 3, removable: true, animation: 'fadeIn' }, defaultContent: { stats: [{value: '10+', label: 'Yıl'}, {value: '100+', label: 'Müşteri'}] }, editableFields: [] },
{ id: 'hizmetler', type: 'services', variant: 'berber_services', order: 4, required: true, settings: { bgMode: 'surface', paddingY: 'lg', containerWidth: 'md', visible: true, order: 4, removable: false, animation: 'fadeIn' }, defaultContent: { badge: 'HİZMETLER', title: 'Hizmetlerimiz', services: [{ id: 's1', name: 'Premium Hizmet', description: 'Detaylı bilgi için iletişime geçin.', icon: 'star' }] }, editableFields: [] },
{ id: 'galeri', type: 'gallery', variant: 'masonry', order: 5, required: false, settings: { bgMode: 'default', paddingY: 'lg', containerWidth: 'md', visible: true, order: 5, removable: true, animation: 'fadeIn' }, defaultContent: { badge: 'GALERİ', title: 'Çalışmalarımız', items: [{ id: 'g1', url: '/placeholder.jpg' }] }, editableFields: [] },
{ id: 'iletisim', type: 'contact', variant: 'detailed_form', order: 6, required: true, settings: { bgMode: 'surface', paddingY: 'lg', containerWidth: 'md', visible: true, order: 6, removable: false, animation: 'fadeIn' }, defaultContent: { badge: 'İLETİŞİM', title: 'Bize Ulaşın', whatsapp: "905359123456" }, editableFields: [] }
    ]
  }]
}
