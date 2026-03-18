/**
 * @kepenk/templates — berber-studio ThemeConfig
 *
 * Multi-location barber chain / academy. Corporate, modern.
 * Plan: enterprise | Font: Syne (heading) + Inter (body)
 */

import type { ThemeConfig, BusinessData } from '../../types/section-types'

export const BERBER_STUDIO_CSS: Record<string, string> = {
  '--color-bg': '#FFFFFF',
  '--color-surface': '#F8F8FA',
  '--color-surface-elevated': '#FFFFFF',
  '--color-surface-muted': '#F0F0F5',
  '--color-text': '#1A1A2E',
  '--color-text-secondary': '#5A5A72',
  '--color-text-muted': '#8E8E9E',
  '--color-text-on-accent': '#FFFFFF',
  '--color-accent': '#1A1A2E',
  '--color-accent-hover': '#2D2B55',
  '--color-accent-active': '#0E0E1A',
  '--color-accent-light': '#EDEDF5',
  '--color-accent-subtle': '#F5F5FA',
  '--color-border': '#E0E0E8',
  '--color-border-subtle': '#EDEDF5',
  '--font-heading': "'Syne', sans-serif",
  '--font-body': "'Inter', system-ui, sans-serif",
  '--container-default': '1280px'}

export const BERBER_STUDIO_BUSINESS: BusinessData = {
  name: 'StudioCut Academy',
  ownerName: 'Deniz Arslan',
  sector: 'berber',
  slogan: 'Saç sanatının merkezi',
  phone: '0444 28 58',
  phoneClean: '904442858',
  whatsapp: '905001234567',
  email: 'info@studiocut.com.tr',
  address: 'Bağdat Cad. No:200, Kadıköy, İstanbul',
  city: 'İstanbul',
  district: 'Kadıköy',
  coordinates: { lat: 40.9697, lng: 29.0578 },
  workingHours: [
    { day: 'monday', dayTr: 'Pazartesi', open: '09:00', close: '21:00' },
    { day: 'tuesday', dayTr: 'Salı', open: '09:00', close: '21:00' },
    { day: 'wednesday', dayTr: 'Çarşamba', open: '09:00', close: '21:00' },
    { day: 'thursday', dayTr: 'Perşembe', open: '09:00', close: '21:00' },
    { day: 'friday', dayTr: 'Cuma', open: '09:00', close: '22:00' },
    { day: 'saturday', dayTr: 'Cumartesi', open: '09:00', close: '22:00' },
    { day: 'sunday', dayTr: 'Pazar', open: '10:00', close: '20:00' }],
  socialMedia: { instagram: 'https://instagram.com/studiocut', youtube: 'https://youtube.com/@studiocut' },
  photos: [],
  services: [
    { id: 's1', name: 'StudioCut Signature', price: '₺400', duration: '45 dk', icon: 'scissors', popular: true },
    { id: 's2', name: 'Beard Design', price: '₺250', duration: '30 dk', icon: 'pen-tool' },
    { id: 's3', name: 'Color & Style', price: '₺500', duration: '60 dk', icon: 'palette' },
    { id: 's4', name: 'VIP Suite', price: '₺1200', duration: '120 dk', icon: 'crown' },
    { id: 's5', name: 'Academy Discount Cut', price: '₺150', duration: '35 dk', icon: 'scissors', description: 'Akademi öğrencileri tarafından' }],
  team: [
    { id: 't1', name: 'Deniz Arslan', role: 'CEO & Creative Director', experience: '15 yıl' },
    { id: 't2', name: 'Arda Kılıç', role: 'Head of Education', experience: '12 yıl' }],
  experience: '15 yıl',
  rating: 4.8,
  reviewCount: 1250,
  foundedYear: 2009}

export const BERBER_STUDIO_CONFIG: ThemeConfig = {
  id: 'berber-studio',
  name: 'Studio',
  sectorId: 'berber',
  plan: 'enterprise',
  description: 'Multi-location berber zinciri / akademi. Mega menü, video showreel.',
  designPhilosophy: 'Syne heading — modern, güçlü, kurumsal. Clean white base.',
  inspiration: ['Dyson.com', 'Tesla.com'],
  isDark: false,
  cssVariables: BERBER_STUDIO_CSS,
  fonts: {
    heading: { family: 'Lora', weights: [600, 700, 800], subsets: ['latin-ext'] },
    body:    { family: 'Inter', weights: [400, 500], subsets: ['latin-ext'] }},
  seoSchemaType: 'BarberShop',
  sectorSections: ['before_after', 'booking', 'multi_location', 'career_listings', 'franchise_section'],
  performanceBudget: { maxJS: '350kb', maxLCP: '3.5s', animationLevel: 'gsap-allowed' },
  globalSections: [
    {
      id: 'global-header', type: 'header', variant: 'minimal_sticky', order: 0, required: true, position: 'top',
      settings: { bgMode: 'default', paddingY: 'none', containerWidth: 'xl', visible: true, order: 0, removable: false, animation: 'fadeUp' },
      defaultContent: {
        logo: { type: 'text', text: 'StudioCut' },
        menuItems: [
          { label: 'Hizmetler', href: '#hizmetler' },
          { label: 'Şubeler', href: '#subeler' },
          { label: 'Akademi', href: '#akademi' },
          { label: 'Kariyer', href: '#kariyer' },
          { label: 'İletişim', href: '#iletisim' }],
        cta: { text: 'Randevu Al', href: 'https://wa.me/905001234567', variant: 'solid' }},
      editableFields: [] },
    {
      id: 'global-footer', type: 'footer', variant: 'warm_columns', order: 999, required: true, position: 'bottom',
      settings: { bgMode: 'surface', paddingY: 'lg', containerWidth: 'xl', visible: true, order: 999, removable: false, animation: 'fadeUp' },
      defaultContent: {
        businessName: 'StudioCut Academy',
        description: '2009\'dan beri saç sanatının merkezi. 5 şube, 1 akademi.',
        copyright: '© 2024 StudioCut Academy. Tüm hakları saklıdır.',
        columns: [
          { title: 'Hizmetler', links: [{ label: 'Signature Cut', href: '#' }, { label: 'VIP Suite', href: '#' }, { label: 'Academy Cut', href: '#' }] },
          { title: 'Kurumsal', links: [{ label: 'Hakkımızda', href: '#' }, { label: 'Kariyer', href: '#kariyer' }, { label: 'Franchise', href: '#' }] },
          { title: 'Şubeler', links: [{ label: 'Kadıköy (Merkez)', href: '#' }, { label: 'Beşiktaş', href: '#' }, { label: 'Ataşehir', href: '#' }] }],
        contact: { phone: '0444 28 58', email: 'info@studiocut.com.tr', address: 'Bağdat Cad. No:200, Kadıköy' },
        social: [
          { platform: 'instagram', url: 'https://instagram.com/studiocut', icon: 'instagram' },
          { platform: 'youtube', url: 'https://youtube.com/@studiocut', icon: 'youtube' }],
        legal: [{ label: 'Gizlilik', href: '/gizlilik' }, { label: 'KVKK', href: '/kvkk' }],
        poweredBy: '⚡ kepenk.ai'},
      editableFields: [] },
    {
      id: 'global-whatsapp', type: 'whatsapp_cta', variant: 'floating', order: 1000, required: true, position: 'floating',
      settings: { bgMode: 'default', paddingY: 'none', containerWidth: 'xl', visible: true, order: 1000, removable: false, animation: 'fadeUp' },
      defaultContent: { phone: '905001234567', message: 'Merhaba, StudioCut hakkında bilgi almak istiyorum.' },
      editableFields: [] },
    {
      id: 'global-cookie', type: 'cookie_banner', variant: 'bottom_bar', order: 1001, required: true, position: 'floating',
      settings: { bgMode: 'surface', paddingY: 'none', containerWidth: 'xl', visible: true, order: 1001, removable: false, animation: 'fadeUp' },
      defaultContent: { text: 'Bu site çerezleri kullanır.', acceptText: 'Kabul Et', rejectText: 'Reddet', detailsLink: '/gizlilik' },
      editableFields: []}],
  pages: [{
    id: 'anasayfa', slug: '/', title: "StudioCut Academy — Kadıköy", titleTr: 'Ana Sayfa', isHomePage: true, includeInNav: false,
    sections: [
{ id: 'hero', type: 'hero', variant: 'fullscreen_overlay', order: 1, required: true, settings: { bgMode: 'default', paddingY: 'none', containerWidth: 'xl', visible: true, order: 1, removable: false, animation: 'fadeUp' }, defaultContent: { badge: 'Kadıköy', title: "StudioCut Academy", subtitle: "Saç sanatının merkezi", cta1: { text: 'İletişim', href: '#iletisim' } }, editableFields: [] },
{ id: 'hakkimizda', type: 'about', variant: 'split_left', order: 2, required: false, settings: { bgMode: 'default', paddingY: 'lg', containerWidth: 'xl', visible: true, order: 2, removable: true, animation: 'fadeUp' }, defaultContent: { badge: 'HAKKIMIZDA', title: "Biz Kimiz?", description: "Yılların tecrübesiyle hizmetinizdeyiz." }, editableFields: [] },
{ id: 'istatistik', type: 'stats', variant: 'animated_row', order: 3, required: false, settings: { bgMode: 'accent', paddingY: 'md', containerWidth: 'xl', visible: true, order: 3, removable: true, animation: 'fadeUp' }, defaultContent: { stats: [{value: '10+', label: 'Yıl'}, {value: '100+', label: 'Müşteri'}] }, editableFields: [] },
{ id: 'galeri', type: 'gallery', variant: 'masonry', order: 4, required: false, settings: { bgMode: 'default', paddingY: 'lg', containerWidth: 'xl', visible: true, order: 4, removable: true, animation: 'fadeUp' }, defaultContent: { badge: 'GALERİ', title: 'Çalışmalarımız', items: [{ id: 'g1', url: '/placeholder.jpg' }] }, editableFields: [] },
{ id: 'hizmetler', type: 'services', variant: 'berber_services', order: 5, required: true, settings: { bgMode: 'surface', paddingY: 'lg', containerWidth: 'xl', visible: true, order: 5, removable: false, animation: 'fadeUp' }, defaultContent: { badge: 'HİZMETLER', title: 'Hizmetlerimiz', services: [{ id: 's1', name: 'Premium Hizmet', description: 'Detaylı bilgi için iletişime geçin.', icon: 'star' }] }, editableFields: [] },
{ id: 'cta', type: 'cta', variant: 'simple_banner', order: 6, required: false, settings: { bgMode: 'accent', paddingY: 'md', containerWidth: 'full', visible: true, order: 6, removable: true, animation: 'fadeUp' }, defaultContent: { title: 'Hemen Başlayın', cta: { text: 'Bize Ulaşın' } }, editableFields: [] },
{ id: 'iletisim', type: 'contact', variant: 'detailed_form', order: 7, required: true, settings: { bgMode: 'surface', paddingY: 'lg', containerWidth: 'xl', visible: true, order: 7, removable: false, animation: 'fadeUp' }, defaultContent: { badge: 'İLETİŞİM', title: 'Bize Ulaşın', whatsapp: "905001234567" }, editableFields: [] }
    ]
  }]
}
