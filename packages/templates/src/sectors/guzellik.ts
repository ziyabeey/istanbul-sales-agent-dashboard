/**
 * Güzellik Salonu Sektör Şablonu
 */

import type { SectorTemplate, SiteTheme } from '../types/template'

const guzellikTheme: SiteTheme = {
  primary: '#BE185D',
  secondary: '#831843',
  accent: '#FDF2F8',
  background: '#FFFBFE',
  surface: '#FFF1F9',
  text: '#1A1A2E',
  textSecondary: '#6B7280',
  border: '#F3D5E5',
  radius: '16px',
  fontHeading: 'Cormorant Garamond',
  fontBody: 'Lato',
}

export const guzellikTemplates: SectorTemplate[] = [
  {
    id: 'guzellik_elegant',
    sectorId: 'guzellik',
    name: 'Elegant Studio',
    description: 'Feminen ve soft tonlarda güzellik salonu tasarımı',
    thumbnail: '/templates/guzellik-elegant.jpg',
    theme: guzellikTheme,
    seoSchema: 'BeautySalon',
    blocks: [
      { id: 'h1', type: 'header', variant: 'sticky_transparent', order: 0, required: true,
        defaultContent: { logo: '', menuItems: ['Hizmetler', 'Galeri', 'Fiyatlar', 'Randevu'] } },
      { id: 'hero1', type: 'hero', variant: 'split_image', order: 1, required: true,
        defaultContent: {
          title: '{{business_name}}', subtitle: 'Güzelliğinize değer katıyoruz',
          cta1: { text: 'Randevu Al', link: '#booking' },
          cta2: { text: 'WhatsApp', link: 'https://wa.me/{{phone}}' },
          backgroundImage: '/defaults/guzellik-hero.jpg',
        } },
      { id: 'svc1', type: 'services', variant: 'elegant_list', order: 2, required: true,
        defaultContent: {
          title: 'Hizmetlerimiz',
          services: [
            { name: 'Cilt Bakımı', price: '₺500', duration: '60 dk', icon: 'sparkles' },
            { name: 'Makyaj', price: '₺400', duration: '45 dk', icon: 'palette' },
            { name: 'Lazer Epilasyon', price: '₺800', duration: '30 dk', icon: 'zap' },
            { name: 'Kalıcı Makyaj', price: '₺2.500', duration: '90 dk', icon: 'pen' },
            { name: 'Tırnak Bakımı', price: '₺250', duration: '40 dk', icon: 'hand' },
            { name: 'Masaj', price: '₺600', duration: '50 dk', icon: 'leaf' },
          ],
        } },
      { id: 'ba1', type: 'before_after', variant: 'side_by_side', order: 3, required: false,
        defaultContent: { title: 'Öncesi & Sonrası', items: [] } },
      { id: 'gal1', type: 'gallery', variant: 'pinterest', order: 4, required: true,
        defaultContent: { title: 'Çalışmalarımız', images: [] } },
      { id: 'price1', type: 'pricing', variant: 'package_cards', order: 5, required: false,
        defaultContent: {
          title: 'Paketlerimiz',
          packages: [
            { name: 'Bakım Paketi', price: '₺1.200', features: ['Cilt Analizi', 'Derin Temizlik', 'Nemlendirme', 'Maske'], popular: false },
            { name: 'VIP Paket', price: '₺2.800', features: ['Cilt Bakımı', 'Makyaj', 'Tırnak', 'İçecek İkramı', 'Masaj'], popular: true },
            { name: 'Gelin Paketi', price: '₺5.500', features: ['Prova Makyajı', 'Düğün Makyajı', 'Saç Tasarımı', 'Tırnak', 'Kirpik'], popular: false },
          ],
        } },
      { id: 'team1', type: 'team', variant: 'card_minimal', order: 6, required: false,
        defaultContent: {
          title: 'Uzman Ekibimiz',
          members: [
            { name: '{{owner_name}}', role: 'Güzellik Uzmanı', photo: '', experience: '12+ yıl' },
          ],
        } },
      { id: 'tst1', type: 'testimonials', variant: 'carousel', order: 7, required: false,
        defaultContent: { title: 'Müşteri Deneyimleri', reviews: [] } },
      { id: 'book1', type: 'booking', variant: 'inline_calendar', order: 8, required: true,
        defaultContent: { title: 'Online Randevu', subtitle: 'Kendinize zaman ayırın' } },
      { id: 'wh1', type: 'working_hours', variant: 'elegant', order: 9, required: true,
        defaultContent: {
          title: 'Çalışma Saatleri',
          hours: {
            monday: { open: '10:00', close: '20:00' }, tuesday: { open: '10:00', close: '20:00' },
            wednesday: { open: '10:00', close: '20:00' }, thursday: { open: '10:00', close: '20:00' },
            friday: { open: '10:00', close: '20:00' }, saturday: { open: '10:00', close: '18:00' },
            sunday: null,
          },
        } },
      { id: 'wa1', type: 'whatsapp_cta', variant: 'floating', order: 10, required: true,
        defaultContent: { phone: '{{phone}}', message: 'Merhaba, randevu almak istiyorum.' } },
      { id: 'ft1', type: 'footer', variant: 'elegant', order: 99, required: true,
        defaultContent: {
          businessName: '{{business_name}}', address: '{{address}}', phone: '{{phone}}', email: '{{email}}',
          social: { instagram: '', facebook: '' },
          legal: ['Gizlilik Politikası', 'KVKK'],
        } },
    ],
    requiredBlocks: ['header', 'hero', 'services', 'gallery', 'booking', 'working_hours', 'whatsapp_cta', 'footer'],
    optionalBlocks: ['before_after', 'team', 'testimonials', 'pricing', 'faq', 'social_proof', 'blog_preview'],
  },
]
