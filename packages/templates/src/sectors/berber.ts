/**
 * Berber & Kuaför Sektör Şablonu
 */

import type { SectorTemplate, SiteTheme } from '../types/template'

const berberTheme: SiteTheme = {
  primary: '#1A1A2E',
  secondary: '#C9A84C',
  accent: '#E8D5B5',
  background: '#FFFFFF',
  surface: '#F8F6F3',
  text: '#1A1A2E',
  textSecondary: '#6B7280',
  border: '#E5E2DC',
  radius: '12px',
  fontHeading: 'Playfair Display',
  fontBody: 'DM Sans',
}

export const berberTemplates: SectorTemplate[] = [
  {
    id: 'berber_classic',
    sectorId: 'berber',
    name: 'Klasik Berber',
    description: 'Geleneksel berber dükkanı için şık ve maskülen tasarım',
    thumbnail: '/templates/berber-classic.jpg',
    theme: berberTheme,
    seoSchema: 'LocalBusiness',
    blocks: [
      { id: 'h1', type: 'header', variant: 'sticky_transparent', order: 0, required: true,
        defaultContent: { logo: '', menuItems: ['Hizmetler', 'Galeri', 'Hakkımızda', 'İletişim'] } },
      { id: 'hero1', type: 'hero', variant: 'fullscreen_overlay', order: 1, required: false,
        defaultContent: {
          title: '{{business_name}}', subtitle: 'Profesyonel erkek bakımının adresi',
          cta1: { text: 'Randevu Al', link: '#booking' },
          cta2: { text: 'WhatsApp', link: 'https://wa.me/{{phone}}' },
          backgroundImage: '/defaults/barber-hero.jpg',
        } },
      { id: 'svc1', type: 'services', variant: 'card_grid', order: 2, required: true,
        defaultContent: {
          title: 'Hizmetlerimiz',
          services: [
            { name: 'Saç Kesimi', price: '₺200', duration: '30 dk', icon: 'scissors' },
            { name: 'Sakal Tıraşı', price: '₺100', duration: '20 dk', icon: 'brush' },
            { name: 'Saç + Sakal', price: '₺250', duration: '45 dk', icon: 'star' },
            { name: 'Cilt Bakımı', price: '₺300', duration: '40 dk', icon: 'sparkles' },
          ],
        } },
      { id: 'ba1', type: 'before_after', variant: 'slider', order: 3, required: false,
        defaultContent: { title: 'Öncesi & Sonrası', items: [] } },
      { id: 'gal1', type: 'gallery', variant: 'masonry', order: 4, required: false,
        defaultContent: { title: 'Galeri', images: [] } },
      { id: 'team1', type: 'team', variant: 'card_horizontal', order: 5, required: false,
        defaultContent: {
          title: 'Ekibimiz',
          members: [{ name: '{{owner_name}}', role: 'Kuaför', photo: '', experience: '10+ yıl' }],
        } },
      { id: 'tst1', type: 'testimonials', variant: 'carousel', order: 6, required: false,
        defaultContent: { title: 'Müşteri Yorumları', reviews: [] } },
      { id: 'book1', type: 'booking', variant: 'inline_calendar', order: 7, required: true,
        defaultContent: { title: 'Online Randevu', subtitle: 'Size uygun saati seçin' } },
      { id: 'wh1', type: 'working_hours', variant: 'compact', order: 8, required: true,
        defaultContent: {
          title: 'Çalışma Saatleri',
          hours: {
            monday: { open: '09:00', close: '19:00' }, tuesday: { open: '09:00', close: '19:00' },
            wednesday: { open: '09:00', close: '19:00' }, thursday: { open: '09:00', close: '19:00' },
            friday: { open: '09:00', close: '19:00' }, saturday: { open: '09:00', close: '18:00' },
            sunday: null,
          },
        } },
      { id: 'map1', type: 'map', variant: 'full_width', order: 9, required: true,
        defaultContent: { title: 'Konum', address: '{{address}}' } },
      { id: 'wa1', type: 'whatsapp_cta', variant: 'floating', order: 10, required: true,
        defaultContent: { phone: '{{phone}}', message: 'Merhaba, randevu almak istiyorum.' } },
      { id: 'ft1', type: 'footer', variant: 'simple', order: 99, required: true,
        defaultContent: {
          businessName: '{{business_name}}', address: '{{address}}', phone: '{{phone}}', email: '{{email}}',
          social: { instagram: '', facebook: '' },
          legal: ['Gizlilik Politikası', 'KVKK', 'Kullanım Koşulları'],
        } },
    ],
    requiredBlocks: ['header', 'services', 'booking', 'working_hours', 'map', 'whatsapp_cta', 'footer'],
    optionalBlocks: ['hero', 'before_after', 'gallery', 'team', 'testimonials', 'blog_preview', 'faq', 'social_proof'],
  },
]
