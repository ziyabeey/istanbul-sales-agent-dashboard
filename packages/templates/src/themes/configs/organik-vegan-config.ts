/**
 * organik-vegan ThemeConfig (pro)
 * Lila + beyaz, vegan & bitki bazlı gıda. DM Sans.
 * Business: Yeşil Tabak Vegan Atölye, Şişli
 */
import type { ThemeConfig, BusinessData } from '../../types/section-types'

export const ORGANIK_VEGAN_CSS: Record<string, string> = {
  '--color-bg': '#FAF7FF',
  '--color-surface': '#F0EAFF',
  '--color-surface-elevated': '#FFFFFF',
  '--color-surface-muted': '#E4D7FF',
  '--color-text': '#1E0A42',
  '--color-text-secondary': '#4A2980',
  '--color-text-muted': '#8B6DAF',
  '--color-text-on-accent': '#FFFFFF',
  '--color-accent': '#7C3AED',
  '--color-accent-hover': '#6D28D9',
  '--color-accent-light': '#F5F0FF',
  '--color-border': '#DDD5F5',
  '--font-heading': "'DM Sans', sans-serif",
  '--font-body': "'DM Sans', sans-serif",
  '--radius-card': '16px',
  '--radius-btn': '9999px'}

export const ORGANIK_VEGAN_BUSINESS: BusinessData = {
  name: 'Yeşil Tabak',
  ownerName: 'Zeynep Özsu',
  sector: 'organik',
  slogan: 'Bitkisel beslenme, harika lezzet',
  phone: '0212 292 53 64',
  phoneClean: '902122925364',
  whatsapp: '902122925364',
  email: 'merhabaa@yesilTabak.com.tr',
  address: 'Abide-i Hürriyet Cad. No.7, Şişli, İstanbul',
  city: 'İstanbul',
  district: 'Şişli',
  coordinates: { lat: 41.0615, lng: 28.9894 },
  workingHours: [
    { day: 'monday', dayTr: 'Pazartesi', open: '10:00', close: '19:00' },
    { day: 'tuesday', dayTr: 'Salı', open: '10:00', close: '19:00' },
    { day: 'wednesday', dayTr: 'Çarşamba', open: '10:00', close: '19:00' },
    { day: 'thursday', dayTr: 'Perşembe', open: '10:00', close: '19:00' },
    { day: 'friday', dayTr: 'Cuma', open: '10:00', close: '18:00' },
    { day: 'saturday', dayTr: 'Cumartesi', open: '11:00', close: '18:00' },
    { day: 'sunday', dayTr: 'Pazar', open: null, close: null }],
  socialMedia: { instagram: 'https://instagram.com/yesilTabak', tiktok: 'https://tiktok.com/@yesilTabak' },
  photos: [],
  services: [
    { id: 's1', name: 'Vegan Yemek Kutusu', icon: '🌿' },
    { id: 's2', name: 'Bitki Bazi Protein', icon: '💪' },
    { id: 's3', name: 'Şekersiz Atıştırmalık', icon: '🌰' },
    { id: 's4', name: 'Detoks Paketi', icon: '🍵' }],
  team: [{ id: 't1', name: 'Zeynep Özsu', role: 'Beslenme Uzmanı & Kurucu', experience: '10 yıl' }],
  experience: '10 yıl',
  rating: 4.9,
  reviewCount: 342,
  foundedYear: 2014}

export const ORGANIK_VEGAN_CONFIG: ThemeConfig = {
  id: 'organik-vegan',
  name: 'Vegan',
  sectorId: 'organik',
  plan: 'pro',
  description: 'Lila + beyaz, vegan & bitki bazlı gıda. Şişli.',
  designPhilosophy: 'Botanical purple — lila, nar çiçeği, ferahlık. Bitkisel beslenme estetiği.',
  isDark: false,
  cssVariables: ORGANIK_VEGAN_CSS,
  fonts: {
    heading: { family: 'Montserrat', weights: [600, 700, 800], subsets: ['latin-ext'] },
    body: { family: 'DM Sans', weights: [400, 500], subsets: ['latin-ext'] }},
  seoSchemaType: 'FoodEstablishment',
  sectorSections: ['product_shop_grid', 'nutrition_facts', 'food_stats_row', 'order_consult'],
  performanceBudget: { maxJS: '150kb', maxLCP: '2.2s', animationLevel: 'css-only' },
  globalSections: [
    {
      id: 'global-header', type: 'header', variant: 'minimal_sticky', order: 0, required: true, position: 'top',
      settings: { bgMode: 'default', paddingY: 'none', containerWidth: 'xl', visible: true, order: 0, removable: false, animation: 'fadeUp' },
      defaultContent: {
        logo: { type: 'text', text: 'Yeşil Tabak 🌿' },
        menuItems: [
          { label: 'Ürünler', href: '#urunler' }, { label: 'Besin', href: '#besin' }, { label: 'Sipariş', href: '#siparis' }],
        cta: { text: 'Kutu Sipariş Et', href: '#siparis', variant: 'solid' }},
      editableFields: [] },
    {
      id: 'global-footer', type: 'footer', variant: 'warm_columns', order: 999, required: true, position: 'bottom',
      settings: { bgMode: 'surface', paddingY: 'sm', containerWidth: 'xl', visible: true, order: 999, removable: false, animation: 'fadeUp' },
      defaultContent: {
        businessName: 'Yeşil Tabak',
        copyright: '© 2024 Yeşil Tabak',
        contact: { phone: '0212 292 53 64', address: 'Şişli, İstanbul' },
        social: [{ platform: 'instagram', url: 'https://instagram.com/yesilTabak', icon: 'instagram' }],
        legal: [{ label: 'KVKK', href: '/kvkk' }],
        poweredBy: '⚡ kepenk.ai'},
      editableFields: [] },
    {
      id: 'global-whatsapp', type: 'whatsapp_cta', variant: 'floating', order: 1000, required: true, position: 'floating',
      settings: { bgMode: 'default', paddingY: 'none', containerWidth: 'xl', visible: true, order: 1000, removable: false, animation: 'fadeUp' },
      defaultContent: { phone: '902122925364', message: 'Merhaba, vegan yemek kutusu hakkında bilgi almak istiyorum.' },
      editableFields: [] },
    {
      id: 'global-cookie', type: 'cookie_banner', variant: 'bottom_bar', order: 1001, required: true, position: 'floating',
      settings: { bgMode: 'surface', paddingY: 'none', containerWidth: 'xl', visible: true, order: 1001, removable: false, animation: 'fadeUp' },
      defaultContent: { text: 'Bu site çerezleri kullanır.', acceptText: 'Kabul Et', rejectText: 'Reddet', detailsLink: '/gizlilik' },
      editableFields: []}],
  pages: [{
    id: 'anasayfa', slug: '/', title: "Yeşil Tabak — Şişli", titleTr: 'Ana Sayfa', isHomePage: true, includeInNav: false,
    sections: [
{ id: 'hero', type: 'hero', variant: 'fullscreen_overlay', order: 1, required: true, settings: { bgMode: 'default', paddingY: 'none', containerWidth: 'xl', visible: true, order: 1, removable: false, animation: 'fadeUp' }, defaultContent: { badge: 'Şişli', title: "Yeşil Tabak", subtitle: "Bitkisel beslenme, harika lezzet", cta1: { text: 'İletişim', href: '#iletisim' } }, editableFields: [] },
{ id: 'hakkimizda', type: 'about', variant: 'split_left', order: 2, required: false, settings: { bgMode: 'default', paddingY: 'lg', containerWidth: 'xl', visible: true, order: 2, removable: true, animation: 'fadeUp' }, defaultContent: { badge: 'HAKKIMIZDA', title: "Biz Kimiz?", description: "Yılların tecrübesiyle hizmetinizdeyiz." }, editableFields: [] },
{ id: 'istatistik', type: 'stats', variant: 'animated_row', order: 3, required: false, settings: { bgMode: 'accent', paddingY: 'md', containerWidth: 'xl', visible: true, order: 3, removable: true, animation: 'fadeUp' }, defaultContent: { stats: [{value: '10+', label: 'Yıl'}, {value: '100+', label: 'Müşteri'}] }, editableFields: [] },
{ id: 'galeri', type: 'gallery', variant: 'masonry', order: 4, required: false, settings: { bgMode: 'default', paddingY: 'lg', containerWidth: 'xl', visible: true, order: 4, removable: true, animation: 'fadeUp' }, defaultContent: { badge: 'GALERİ', title: 'Çalışmalarımız', items: [{ id: 'g1', url: '/placeholder.jpg' }] }, editableFields: [] },
{ id: 'hizmetler', type: 'services', variant: 'organik_services', order: 5, required: true, settings: { bgMode: 'surface', paddingY: 'lg', containerWidth: 'xl', visible: true, order: 5, removable: false, animation: 'fadeUp' }, defaultContent: { badge: 'HİZMETLER', title: 'Hizmetlerimiz', services: [{ id: 's1', name: 'Premium Hizmet', description: 'Detaylı bilgi için iletişime geçin.', icon: 'star' }] }, editableFields: [] },
{ id: 'cta', type: 'cta', variant: 'simple_banner', order: 6, required: false, settings: { bgMode: 'accent', paddingY: 'md', containerWidth: 'full', visible: true, order: 6, removable: true, animation: 'fadeUp' }, defaultContent: { title: 'Hemen Başlayın', cta: { text: 'Bize Ulaşın' } }, editableFields: [] },
{ id: 'iletisim', type: 'contact', variant: 'detailed_form', order: 7, required: true, settings: { bgMode: 'surface', paddingY: 'lg', containerWidth: 'xl', visible: true, order: 7, removable: false, animation: 'fadeUp' }, defaultContent: { badge: 'İLETİŞİM', title: 'Bize Ulaşın', whatsapp: "902122925364" }, editableFields: [] }
    ]
  }]
}
