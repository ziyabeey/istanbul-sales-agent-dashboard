/**
 * @kepenk/templates — restoran-sofra ThemeConfig (free)
 * Sıcak ev yemekleri teması. Turuncu-krem, samimi. Lora serif.
 */
import type { ThemeConfig, BusinessData } from '../../types/section-types'

export const RESTORAN_SOFRA_CSS: Record<string, string> = {
  '--color-bg': '#FFFBF5', '--color-surface': '#FFF5EB', '--color-surface-elevated': '#FFFFFF',
  '--color-surface-muted': '#F5EAD8', '--color-text': '#2C1810', '--color-text-secondary': '#6B4F40',
  '--color-text-muted': '#9C8070', '--color-text-on-accent': '#FFFFFF',
  '--color-accent': '#C84B31', '--color-accent-hover': '#A83B25', '--color-accent-light': '#FFF0EA',
  '--color-border': '#E8D5C0', '--font-heading': "'Lora', serif", '--font-body': "'Inter', sans-serif"}

export const RESTORAN_SOFRA_BUSINESS: BusinessData = {
  name: 'Anadolu Sofrası', ownerName: 'Mustafa Demir', sector: 'restoran',
  slogan: 'Annenizin mutfağından sofralarınıza',
  phone: '0212 327 45 67', phoneClean: '902123274567', whatsapp: '902123274567',
  email: 'info@anadolusofrasi.com', address: 'Sinanpaşa Mah. Çelebioğlu Sok. No:12, Beşiktaş, İstanbul',
  city: 'İstanbul', district: 'Beşiktaş', coordinates: { lat: 41.0428, lng: 29.0070 },
  workingHours: [
    { day: 'monday', dayTr: 'Pazartesi', open: '11:00', close: '22:00' },
    { day: 'tuesday', dayTr: 'Salı', open: '11:00', close: '22:00' },
    { day: 'wednesday', dayTr: 'Çarşamba', open: '11:00', close: '22:00' },
    { day: 'thursday', dayTr: 'Perşembe', open: '11:00', close: '22:00' },
    { day: 'friday', dayTr: 'Cuma', open: '11:00', close: '23:00' },
    { day: 'saturday', dayTr: 'Cumartesi', open: '11:00', close: '23:00' },
    { day: 'sunday', dayTr: 'Pazar', open: '11:00', close: '22:00' }],
  socialMedia: { instagram: 'https://instagram.com/anadolusofrasi' },
  photos: [],
  services: [
    { id: 's1', name: 'Kahvaltı Tabağı', price: '₺220', icon: '🥚' },
    { id: 's2', name: 'Ev Yemekleri Tabldot', price: '₺180', icon: '🍲' },
    { id: 's3', name: 'Izgara Tabağı', price: '₺280', icon: '🥩' },
    { id: 's4', name: 'Lahmacun', price: '₺80', icon: '🫓' },
    { id: 's5', name: 'Künefe', price: '₺120', icon: '🧁' }],
  team: [{ id: 't1', name: 'Mustafa Demir', role: 'Aşçıbaşı', experience: '20 yıl' }],
  experience: '9 yıl', rating: 4.6, reviewCount: 156, foundedYear: 2015}

export const RESTORAN_SOFRA_CONFIG: ThemeConfig = {
  id: 'restoran-sofra', name: 'Sofra', sectorId: 'restoran', plan: 'free',
  description: 'Sıcak ev yemekleri teması. Turuncu-krem, samimi.',
  designPhilosophy: 'Annenizin mutfağı hissi. Lora serif başlıklarda sıcak his.',
  inspiration: ['Ev yemekleri lokantaları'], isDark: false,
  cssVariables: RESTORAN_SOFRA_CSS,
  fonts: { heading: { family: 'Playfair Display', weights: [400, 700], subsets: ['latin-ext'] }, body: { family: 'Inter', weights: [400, 500], subsets: ['latin-ext'] } },
  seoSchemaType: 'Restaurant', sectorSections: ['menu_display', 'daily_special'],
  performanceBudget: { maxJS: '80kb', maxLCP: '2.0s', animationLevel: 'css-only' },
  globalSections: [
    { id: 'global-header', type: 'header', variant: 'minimal_sticky', order: 0, required: true, position: 'top',
      settings: { bgMode: 'default', paddingY: 'none', containerWidth: 'xl', visible: true, order: 0, removable: false, animation: 'fadeUp' },
      defaultContent: { logo: { type: 'text', text: 'Anadolu Sofrası' }, menuItems: [{ label: 'Menü', href: '#menu' }, { label: 'Hakkımızda', href: '#hakkimizda' }, { label: 'İletişim', href: '#iletisim' }], cta: { text: 'Sipariş', href: 'tel:902123274567', variant: 'solid' } }, editableFields: [] },
    { id: 'global-footer', type: 'footer', variant: 'minimal', order: 999, required: true, position: 'bottom',
      settings: { bgMode: 'surface', paddingY: 'sm', containerWidth: 'xl', visible: true, order: 999, removable: false, animation: 'fadeUp' },
      defaultContent: { businessName: 'Anadolu Sofrası', copyright: '© 2024 Anadolu Sofrası', contact: { phone: '0212 327 45 67', address: 'Beşiktaş, İstanbul' }, social: [{ platform: 'instagram', url: 'https://instagram.com/anadolusofrasi', icon: 'instagram' }], legal: [{ label: 'KVKK', href: '/kvkk' }], poweredBy: '⚡ kepenk.ai' }, editableFields: [] },
    { id: 'global-whatsapp', type: 'whatsapp_cta', variant: 'floating', order: 1000, required: true, position: 'floating',
      settings: { bgMode: 'default', paddingY: 'none', containerWidth: 'xl', visible: true, order: 1000, removable: false, animation: 'fadeUp' },
      defaultContent: { phone: '902123274567', message: 'Merhaba, sipariş vermek istiyorum.' }, editableFields: [] },
    { id: 'global-cookie', type: 'cookie_banner', variant: 'bottom_bar', order: 1001, required: true, position: 'floating',
      settings: { bgMode: 'surface', paddingY: 'none', containerWidth: 'xl', visible: true, order: 1001, removable: false, animation: 'fadeUp' },
      defaultContent: { text: 'Bu site çerezleri kullanır.', acceptText: 'Kabul Et', rejectText: 'Reddet', detailsLink: '/gizlilik' }, editableFields: [] }],
  pages: [{
    id: 'anasayfa', slug: '/', title: "Anadolu Sofrası — Beşiktaş", titleTr: 'Ana Sayfa', isHomePage: true, includeInNav: false,
    sections: [
{ id: 'hero', type: 'hero', variant: 'split_image', order: 1, required: true, settings: { bgMode: 'default', paddingY: 'none', containerWidth: 'xl', visible: true, order: 1, removable: false, animation: 'fadeUp' }, defaultContent: { badge: 'Beşiktaş', title: "Anadolu Sofrası", subtitle: "Annenizin mutfağından sofralarınıza", cta1: { text: 'İletişim', href: '#iletisim' } }, editableFields: [] },
{ id: 'hizmetler', type: 'services', variant: 'restoran_services', order: 2, required: true, settings: { bgMode: 'surface', paddingY: 'lg', containerWidth: 'xl', visible: true, order: 2, removable: false, animation: 'fadeUp' }, defaultContent: { badge: 'HİZMETLER', title: 'Hizmetlerimiz', services: [{ id: 's1', name: 'Premium Hizmet', description: 'Detaylı bilgi için iletişime geçin.', icon: 'star' }] }, editableFields: [] },
{ id: 'iletisim', type: 'contact', variant: 'simple_form', order: 3, required: true, settings: { bgMode: 'surface', paddingY: 'lg', containerWidth: 'xl', visible: true, order: 3, removable: false, animation: 'fadeUp' }, defaultContent: { badge: 'İLETİŞİM', title: 'Bize Ulaşın', whatsapp: "902123274567" }, editableFields: [] }
    ]
  }]
}
