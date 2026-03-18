/**
 * @kepenk/templates — spor-elite ThemeConfig (enterprise)
 * Mavi + beyaz, kurumsal fitness zinciri. Plus Jakarta Sans.
 * Business: Elite Fitness Club (3 şube), Ankara Çankaya
 */
import type { ThemeConfig, BusinessData } from '../../types/section-types'

export const SPOR_ELITE_CSS: Record<string, string> = {
  '--color-bg': '#F0F7FF',
  '--color-surface': '#DBEAFE',
  '--color-surface-elevated': '#FFFFFF',
  '--color-surface-muted': '#BFDBFE',
  '--color-text': '#0A1628',
  '--color-text-secondary': '#1E3A5F',
  '--color-text-muted': '#2563EB',
  '--color-text-on-accent': '#FFFFFF',
  '--color-accent': '#0EA5E9',
  '--color-accent-hover': '#0284C7',
  '--color-accent-light': '#E0F2FE',
  '--color-border': '#BAE6FD',
  '--font-heading': "'Plus Jakarta Sans', sans-serif",
  '--font-body': "'Plus Jakarta Sans', sans-serif",
  '--radius-card': '12px',
  '--radius-btn': '8px'}

export const SPOR_ELITE_BUSINESS: BusinessData = {
  name: 'Elite Fitness Club',
  ownerName: 'Ahmet Serdar Uysal',
  sector: 'spor',
  slogan: 'Elit performans, konforlu deneyim',
  phone: '0312 425 66 00',
  phoneClean: '903124256600',
  whatsapp: '903124256600',
  email: 'uyelik@elitefitnessclub.com.tr',
  address: 'Çankaya Mah. Yıldızevler Cad. No.28, Çankaya, Ankara',
  city: 'Ankara',
  district: 'Çankaya',
  coordinates: { lat: 39.9179, lng: 32.8592 },
  workingHours: [
    { day: 'monday', dayTr: 'Pazartesi', open: '06:00', close: '23:00' },
    { day: 'tuesday', dayTr: 'Salı', open: '06:00', close: '23:00' },
    { day: 'wednesday', dayTr: 'Çarşamba', open: '06:00', close: '23:00' },
    { day: 'thursday', dayTr: 'Perşembe', open: '06:00', close: '23:00' },
    { day: 'friday', dayTr: 'Cuma', open: '06:00', close: '23:00' },
    { day: 'saturday', dayTr: 'Cumartesi', open: '07:00', close: '22:00' },
    { day: 'sunday', dayTr: 'Pazar', open: '08:00', close: '20:00' }],
  socialMedia: {
    instagram: 'https://instagram.com/elitefitnessclub.tr',
    youtube: 'https://youtube.com/@elitefitnessclub',
    tiktok: 'https://tiktok.com/@elitefit'},
  photos: [],
  services: [
    { id: 's1', name: 'Fitness Salonu', price: '', icon: '🏋️' },
    { id: 's2', name: 'Olimpik Havuz', price: '', icon: '🏊' },
    { id: 's3', name: 'Grup Dersleri (30+)', price: '', icon: '🎯' },
    { id: 's4', name: 'Kişisel Antrenör', price: '', icon: '💪' },
    { id: 's5', name: 'Spa & Sauna', price: '', icon: '♨️' },
    { id: 's6', name: 'Beslenme Koçluğu', price: '', icon: '🥗' }],
  team: [
    { id: 't1', name: 'Ahmet Serdar Uysal', role: 'Genel Müdür & Baş Antrenör', experience: '20 yıl' },
    { id: 't2', name: 'Elif Tanrıverdi', role: 'Fitness Direktörü', experience: '12 yıl' },
    { id: 't3', name: 'Tolga Yıldırım', role: 'Aqua Fitness Koçu', experience: '9 yıl' }],
  experience: '18 yıl',
  rating: 4.8,
  reviewCount: 1234,
  foundedYear: 2006}

export const SPOR_ELITE_CONFIG: ThemeConfig = {
  id: 'spor-elite',
  name: 'Elite',
  sectorId: 'spor',
  plan: 'enterprise',
  description: 'Mavi + beyaz, kurumsal fitness zinciri. Ankara Çankaya.',
  designPhilosophy: 'Kurumsal güven — mavi enerji, temiz grid, profesyonel hissiyat.',
  isDark: false,
  cssVariables: SPOR_ELITE_CSS,
  fonts: {
    heading: { family: 'Outfit', weights: [600, 700, 800], subsets: ['latin-ext'] },
    body: { family: 'Plus Jakarta Sans', weights: [400, 500], subsets: ['latin-ext'] }},
  seoSchemaType: 'HealthClub',
  sectorSections: ['class_schedule', 'membership_pricing', 'transformation', 'team'],
  performanceBudget: { maxJS: '200kb', maxLCP: '2.5s', animationLevel: 'framer-basic' },
  globalSections: [
    {
      id: 'global-header', type: 'header', variant: 'minimal_sticky', order: 0, required: true, position: 'top',
      settings: { bgMode: 'default', paddingY: 'none', containerWidth: 'xl', visible: true, order: 0, removable: false, animation: 'fadeUp' },
      defaultContent: {
        logo: { type: 'text', text: 'Elite Fitness' },
        menuItems: [
          { label: 'Programlar', href: '#programlar' }, { label: 'Üyelik', href: '#uyelik' },
          { label: 'Tesisler', href: '#tesisler' }, { label: 'Şubeler', href: '#subeler' }],
        cta: { text: 'Üye Ol', href: '#uyelik', variant: 'solid' }},
      editableFields: [] },
    {
      id: 'global-footer', type: 'footer', variant: 'warm_columns', order: 999, required: true, position: 'bottom',
      settings: { bgMode: 'surface', paddingY: 'sm', containerWidth: 'xl', visible: true, order: 999, removable: false, animation: 'fadeUp' },
      defaultContent: {
        businessName: 'Elite Fitness Club',
        copyright: '© 2024 Elite Fitness Club',
        contact: { phone: '0312 425 66 00', address: 'Çankaya, Ankara' },
        social: [
          { platform: 'instagram', url: 'https://instagram.com/elitefitnessclub.tr', icon: 'instagram' },
          { platform: 'youtube', url: 'https://youtube.com/@elitefitnessclub', icon: 'youtube' }],
        legal: [{ label: 'KVKK', href: '/kvkk' }, { label: 'Gizlilik', href: '/gizlilik' }],
        poweredBy: '⚡ kepenk.ai'},
      editableFields: [] },
    {
      id: 'global-whatsapp', type: 'whatsapp_cta', variant: 'floating', order: 1000, required: true, position: 'floating',
      settings: { bgMode: 'default', paddingY: 'none', containerWidth: 'xl', visible: true, order: 1000, removable: false, animation: 'fadeUp' },
      defaultContent: { phone: '903124256600', message: 'Merhaba, Elite Fitness üyelik hakkında bilgi almak istiyorum.' },
      editableFields: [] },
    {
      id: 'global-cookie', type: 'cookie_banner', variant: 'bottom_bar', order: 1001, required: true, position: 'floating',
      settings: { bgMode: 'surface', paddingY: 'none', containerWidth: 'xl', visible: true, order: 1001, removable: false, animation: 'fadeUp' },
      defaultContent: { text: 'Bu site çerezleri kullanır.', acceptText: 'Kabul Et', rejectText: 'Reddet', detailsLink: '/gizlilik' },
      editableFields: []}],
  pages: [{
    id: 'anasayfa', slug: '/', title: "Elite Fitness Club — Çankaya", titleTr: 'Ana Sayfa', isHomePage: true, includeInNav: false,
    sections: [
{ id: 'hero', type: 'hero', variant: 'split_image', order: 1, required: true, settings: { bgMode: 'default', paddingY: 'none', containerWidth: 'xl', visible: true, order: 1, removable: false, animation: 'fadeUp' }, defaultContent: { badge: 'Çankaya', title: "Elite Fitness Club", subtitle: "Elit performans, konforlu deneyim", cta1: { text: 'İletişim', href: '#iletisim' } }, editableFields: [] },
{ id: 'hizmetler', type: 'services', variant: 'spor_services', order: 2, required: true, settings: { bgMode: 'surface', paddingY: 'lg', containerWidth: 'xl', visible: true, order: 2, removable: false, animation: 'fadeUp' }, defaultContent: { badge: 'HİZMETLER', title: 'Hizmetlerimiz', services: [{ id: 's1', name: 'Premium Hizmet', description: 'Detaylı bilgi için iletişime geçin.', icon: 'star' }] }, editableFields: [] },
{ id: 'iletisim', type: 'contact', variant: 'simple_form', order: 3, required: true, settings: { bgMode: 'surface', paddingY: 'lg', containerWidth: 'xl', visible: true, order: 3, removable: false, animation: 'fadeUp' }, defaultContent: { badge: 'İLETİŞİM', title: 'Bize Ulaşın', whatsapp: "903124256600" }, editableFields: [] }
    ]
  }]
}
