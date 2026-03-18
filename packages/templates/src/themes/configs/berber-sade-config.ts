/**
 * @kepenk/templates — berber-sade Theme Configuration
 *
 * The FIRST working theme. Ultra minimal barber, black & white.
 * Plan: free (1 page, 6 sections, CSS-only animation)
 * Font: Inter | Accent: #1A1A1A | Background: #FFFFFF
 */

import type { ThemeConfig, BusinessData } from '../../types/section-types'

// ═══ CSS VARIABLES ═══

export const BERBER_SADE_CSS: Record<string, string> = {
  '--color-bg': '#FFFFFF',
  '--color-surface': '#F8F7F5',
  '--color-surface-elevated': '#FFFFFF',
  '--color-surface-muted': '#F3F4F6',
  '--color-text': '#1A1A1A',
  '--color-text-secondary': '#6B7280',
  '--color-text-muted': '#9CA3AF',
  '--color-text-on-accent': '#FFFFFF',
  '--color-text-on-dark': '#F5F5F5',
  '--color-accent': '#1A1A1A',
  '--color-accent-hover': '#333333',
  '--color-accent-active': '#000000',
  '--color-accent-light': '#F0F0F0',
  '--color-accent-subtle': '#F8F8F8',
  '--color-border': '#E5E7EB',
  '--color-border-subtle': '#F3F4F6',
  '--color-border-strong': '#D1D5DB',
  '--font-heading': "'Inter', system-ui, sans-serif",
  '--font-body': "'Inter', system-ui, sans-serif"}

// ═══ DEMO BUSINESS DATA ═══

export const BERBER_SADE_BUSINESS: BusinessData = {
  name: 'Kadir Usta Kuaför',
  ownerName: 'Kadir Aydın',
  sector: 'berber',
  slogan: 'Sade ve temiz, her zaman güvenilir',
  phone: '0532 418 67 90',
  phoneClean: '905324186790',
  whatsapp: '905324186790',
  email: 'info@kadirustakuafor.com',
  address: 'Caferağa Mah. Moda Cad. No:48/A, Kadıköy, İstanbul',
  city: 'İstanbul',
  district: 'Kadıköy',
  coordinates: { lat: 40.9862, lng: 29.0293 },
  workingHours: [
    { day: 'monday', dayTr: 'Pazartesi', open: '09:00', close: '19:00' },
    { day: 'tuesday', dayTr: 'Salı', open: '09:00', close: '19:00' },
    { day: 'wednesday', dayTr: 'Çarşamba', open: '09:00', close: '19:00' },
    { day: 'thursday', dayTr: 'Perşembe', open: '09:00', close: '19:00' },
    { day: 'friday', dayTr: 'Cuma', open: '09:00', close: '19:00' },
    { day: 'saturday', dayTr: 'Cumartesi', open: '09:00', close: '18:00' },
    { day: 'sunday', dayTr: 'Pazar', open: null, close: null }],
  socialMedia: { instagram: 'https://instagram.com/kadirustakuafor' },
  logoUrl: undefined,
  photos: [],
  services: [
    { id: 's1', name: 'Saç Kesimi', price: '₺200', duration: '30 dk', icon: 'scissors', description: 'Yüz şeklinize uygun profesyonel kesim' },
    { id: 's2', name: 'Sakal Tıraşı', price: '₺100', duration: '20 dk', icon: 'pen-tool', description: 'Ustura ile geleneksel tıraş' },
    { id: 's3', name: 'Saç + Sakal', price: '₺250', duration: '45 dk', icon: 'star', popular: true },
    { id: 's4', name: 'Çocuk Kesimi', price: '₺120', duration: '20 dk', icon: 'baby' },
    { id: 's5', name: 'Saç Yıkama + Şekil', price: '₺80', duration: '15 dk', icon: 'droplets' },
    { id: 's6', name: 'Cilt Bakımı', price: '₺300', duration: '40 dk', icon: 'sparkles' }],
  team: [
    { id: 't1', name: 'Kadir Aydın', role: 'Baş Kuaför', experience: '12 yıl' },
    { id: 't2', name: 'Emre Koç', role: 'Kuaför', experience: '6 yıl' }],
  experience: '12 yıl',
  rating: 4.7,
  reviewCount: 89,
  foundedYear: 2012}

// ═══ THEME CONFIG ═══

export const BERBER_SADE_CONFIG: ThemeConfig = {
  id: 'berber-sade',
  name: 'Sade',
  sectorId: 'berber',
  plan: 'free',
  description: 'Ultra minimal berber teması — siyah-beyaz, mahalle berberi hissi',
  designPhilosophy: 'Less is more. Tek font, iki renk, sıfır dekorasyon.',
  inspiration: ['Apple.com', 'Aesop.com'],
  isDark: false,
  cssVariables: BERBER_SADE_CSS,
  fonts: {
    heading: { family: 'Cormorant Garamond', weights: [600, 700], subsets: ['latin-ext'] },
    body:    { family: 'Inter', weights: [400, 500], subsets: ['latin-ext'] }},
  seoSchemaType: 'BarberShop',
  sectorSections: ['before_after', 'booking'],
  performanceBudget: {
    maxJS: '80kb',
    maxLCP: '2.0s',
    animationLevel: 'css-only'},

  // ─── Global sections (every page) ───
  globalSections: [
    {
      id: 'global-header',
      type: 'header',
      variant: 'minimal_sticky',
      order: 0,
      required: true,
      position: 'top',
      settings: {
        bgMode: 'default', paddingY: 'none', containerWidth: 'md',
        visible: true, order: 0, removable: false, animation: 'none'},
      defaultContent: {
        logo: { type: 'text', text: 'Kadir Usta' },
        menuItems: [
          { label: 'Hizmetler', href: '#hizmetler' },
          { label: 'Hakkımızda', href: '#hakkimizda' },
          { label: 'Çalışma Saatleri', href: '#saatler' },
          { label: 'İletişim', href: '#iletisim' }],
        cta: { text: 'Randevu Al', href: 'https://wa.me/905324186790?text=Merhaba, randevu almak istiyorum.', variant: 'solid' }},
      editableFields: [
        { path: 'logo.text', type: 'text', label: 'Logo Metni', required: true }]},
    {
      id: 'global-footer',
      type: 'footer',
      variant: 'minimal',
      order: 999,
      required: true,
      position: 'bottom',
      settings: {
        bgMode: 'surface', paddingY: 'sm', containerWidth: 'md',
        visible: true, order: 999, removable: false, animation: 'none'},
      defaultContent: {
        businessName: 'Kadir Usta Kuaför',
        copyright: '© 2024 Kadir Usta Kuaför. Tüm hakları saklıdır.',
        contact: { phone: '0532 418 67 90', address: 'Caferağa Mah. Moda Cad. No:48/A, Kadıköy' },
        social: [{ platform: 'instagram', url: 'https://instagram.com/kadirustakuafor', icon: 'instagram' }],
        legal: [
          { label: 'Gizlilik Politikası', href: '/gizlilik' },
          { label: 'KVKK', href: '/kvkk' }],
        poweredBy: '⚡ kepenk.ai ile güçlendirildi'},
      editableFields: [] },
    {
      id: 'global-whatsapp',
      type: 'whatsapp_cta',
      variant: 'floating',
      order: 1000,
      required: true,
      position: 'floating',
      settings: {
        bgMode: 'default', paddingY: 'none', containerWidth: 'md',
        visible: true, order: 1000, removable: false, animation: 'none'},
      defaultContent: {
        phone: '905324186790',
        message: 'Merhaba, Kadir Usta Kuaför hakkında bilgi almak istiyorum.',
        label: 'WhatsApp'},
      editableFields: [] },
    {
      id: 'global-cookie',
      type: 'cookie_banner',
      variant: 'bottom_bar',
      order: 1001,
      required: true,
      position: 'floating',
      settings: {
        bgMode: 'surface', paddingY: 'none', containerWidth: 'md',
        visible: true, order: 1001, removable: false, animation: 'none'},
      defaultContent: {
        text: 'Bu site çerezleri kullanır. Devam ederek çerez kullanımını kabul etmiş olursunuz.',
        acceptText: 'Kabul Et',
        rejectText: 'Reddet',
        detailsText: 'Detaylar',
        detailsLink: '/gizlilik'},
      editableFields: []}],

  // ─── Pages ───
  pages: [{
    id: 'anasayfa', slug: '/', title: "Kadir Usta Kuaför — Kadıköy", titleTr: 'Ana Sayfa', isHomePage: true, includeInNav: false,
    sections: [
{ id: 'hero', type: 'hero', variant: 'split_image', order: 1, required: true, settings: { bgMode: 'default', paddingY: 'none', containerWidth: 'md', visible: true, order: 1, removable: false, animation: 'none' }, defaultContent: { badge: 'Kadıköy', title: "Kadir Usta Kuaför", subtitle: "Sade ve temiz, her zaman güvenilir", cta1: { text: 'İletişim', href: '#iletisim' } }, editableFields: [] },
{ id: 'hizmetler', type: 'services', variant: 'berber_services', order: 2, required: true, settings: { bgMode: 'surface', paddingY: 'lg', containerWidth: 'md', visible: true, order: 2, removable: false, animation: 'none' }, defaultContent: { badge: 'HİZMETLER', title: 'Hizmetlerimiz', services: [{ id: 's1', name: 'Premium Hizmet', description: 'Detaylı bilgi için iletişime geçin.', icon: 'star' }] }, editableFields: [] },
{ id: 'iletisim', type: 'contact', variant: 'simple_form', order: 3, required: true, settings: { bgMode: 'surface', paddingY: 'lg', containerWidth: 'md', visible: true, order: 3, removable: false, animation: 'none' }, defaultContent: { badge: 'İLETİŞİM', title: 'Bize Ulaşın', whatsapp: "905324186790" }, editableFields: [] }
    ]
  }]
}
