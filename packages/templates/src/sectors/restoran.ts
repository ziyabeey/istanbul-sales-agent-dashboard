/**
 * Restoran & Kafe Sektör Şablonu
 */

import type { SectorTemplate, SiteTheme } from '../types/template'

const restoranTheme: SiteTheme = {
  primary: '#C84B31',
  secondary: '#2D2B2B',
  accent: '#F5E6CC',
  background: '#FFFBF5',
  surface: '#FFF8F0',
  text: '#2D2B2B',
  textSecondary: '#6B7280',
  border: '#E8DDD0',
  radius: '14px',
  fontHeading: 'Syne',
  fontBody: 'Inter',
}

export const restoranTemplates: SectorTemplate[] = [
  {
    id: 'restoran_warm',
    sectorId: 'restoran',
    name: 'Sıcak Restoran',
    description: 'Sıcak renkli, iştah açan restoran tasarımı',
    thumbnail: '/templates/restoran-warm.jpg',
    theme: restoranTheme,
    seoSchema: 'Restaurant',
    blocks: [
      { id: 'h1', type: 'header', variant: 'sticky_dark', order: 0, required: true,
        defaultContent: { logo: '', menuItems: ['Menü', 'Hakkımızda', 'Rezervasyon', 'İletişim'] } },
      { id: 'hero1', type: 'hero', variant: 'fullscreen_overlay', order: 1, required: true,
        defaultContent: {
          title: '{{business_name}}', subtitle: 'Lezzetin en taze hali',
          cta1: { text: 'Menüyü İncele', link: '#menu' },
          cta2: { text: 'Rezervasyon', link: '#booking' },
          backgroundImage: '/defaults/restoran-hero.jpg',
        } },
      { id: 'menu1', type: 'menu', variant: 'category_tabs', order: 2, required: true,
        defaultContent: {
          title: 'Menümüz',
          categories: [
            { name: 'Başlangıçlar', items: [
              { name: 'Mercimek Çorbası', price: '₺65', desc: 'Ev yapımı', image: '' },
              { name: 'Humus Tabağı', price: '₺85', desc: 'Tahin, zeytinyağı', image: '' },
            ]},
            { name: 'Ana Yemek', items: [
              { name: 'Kuzu Tandır', price: '₺220', desc: '8 saat pişirilmiş', image: '' },
              { name: 'Karışık Izgara', price: '₺280', desc: 'Özel baharat', image: '' },
            ]},
            { name: 'Tatlılar', items: [
              { name: 'Künefe', price: '₺120', desc: 'Antep fıstıklı', image: '' },
              { name: 'Baklava', price: '₺95', desc: '40 kat yufka', image: '' },
            ]},
          ],
        } },
      { id: 'sp1', type: 'social_proof', variant: 'numbers', order: 3, required: false,
        defaultContent: {
          stats: [
            { value: '15+', label: 'Yıllık Deneyim' },
            { value: '50K+', label: 'Mutlu Müşteri' },
            { value: '4.8', label: 'Google Puanı' },
            { value: '120+', label: 'Çeşit Menü' },
          ],
        } },
      { id: 'gal1', type: 'gallery', variant: 'grid_3col', order: 4, required: false,
        defaultContent: { title: 'Fotoğraf Galerisi', images: [] } },
      { id: 'team1', type: 'team', variant: 'chef_spotlight', order: 5, required: false,
        defaultContent: {
          title: 'Şefimiz',
          members: [{ name: '{{owner_name}}', role: 'Baş Şef', photo: '', experience: '15+ yıl', bio: '' }],
        } },
      { id: 'tst1', type: 'testimonials', variant: 'masonry', order: 6, required: false,
        defaultContent: { title: 'Müşteri Yorumları', reviews: [] } },
      { id: 'book1', type: 'booking', variant: 'inline_compact', order: 7, required: false,
        defaultContent: { title: 'Masa Rezervasyonu', subtitle: 'Yerinizi şimdiden ayırtın' } },
      { id: 'wh1', type: 'working_hours', variant: 'elegant', order: 8, required: true,
        defaultContent: {
          title: 'Çalışma Saatleri',
          hours: {
            monday: { open: '11:00', close: '23:00' }, tuesday: { open: '11:00', close: '23:00' },
            wednesday: { open: '11:00', close: '23:00' }, thursday: { open: '11:00', close: '23:00' },
            friday: { open: '11:00', close: '00:00' }, saturday: { open: '11:00', close: '00:00' },
            sunday: { open: '12:00', close: '22:00' },
          },
        } },
      { id: 'map1', type: 'map', variant: 'embedded', order: 9, required: true,
        defaultContent: { title: 'Bizi Ziyaret Edin', address: '{{address}}' } },
      { id: 'wa1', type: 'whatsapp_cta', variant: 'floating', order: 10, required: true,
        defaultContent: { phone: '{{phone}}', message: 'Merhaba, rezervasyon yapmak istiyorum.' } },
      { id: 'ft1', type: 'footer', variant: 'restaurant', order: 99, required: true,
        defaultContent: {
          businessName: '{{business_name}}', address: '{{address}}', phone: '{{phone}}', email: '{{email}}',
          social: { instagram: '', facebook: '' },
          legal: ['Gizlilik Politikası', 'KVKK'],
        } },
    ],
    requiredBlocks: ['header', 'hero', 'menu', 'working_hours', 'map', 'whatsapp_cta', 'footer'],
    optionalBlocks: ['gallery', 'testimonials', 'booking', 'team', 'faq', 'social_proof', 'blog_preview'],
  },
]
