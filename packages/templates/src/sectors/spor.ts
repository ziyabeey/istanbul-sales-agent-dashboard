/**
 * Spor Salonu & Fitness Sektör Şablonu
 */

import type { SectorTemplate, SiteTheme } from '../types/template'

const sporTheme: SiteTheme = {
  primary: '#7C3AED',
  secondary: '#4C1D95',
  accent: '#EDE9FE',
  background: '#0F0F1A',
  surface: '#1E1E2E',
  text: '#F5F5F5',
  textSecondary: '#9CA3AF',
  border: '#2E2E42',
  radius: '12px',
  fontHeading: 'Bebas Neue',
  fontBody: 'Roboto',
}

export const sporTemplates: SectorTemplate[] = [
  {
    id: 'spor_power',
    sectorId: 'spor',
    name: 'Power Gym',
    description: 'Enerjik ve motivasyon dolu fitness salon tasarımı',
    thumbnail: '/templates/spor-power.jpg',
    theme: sporTheme,
    seoSchema: 'HealthClub',
    blocks: [
      { id: 'h1', type: 'header', variant: 'sticky_dark', order: 0, required: true,
        defaultContent: { logo: '', menuItems: ['Programlar', 'Üyelik', 'Eğitmenler', 'İletişim'] } },
      { id: 'hero1', type: 'hero', variant: 'fullscreen_overlay', order: 1, required: true,
        defaultContent: {
          title: '{{business_name}}', subtitle: 'Limitlerini zorla. Kendini aş.',
          cta1: { text: 'Üye Ol', link: '#pricing' },
          cta2: { text: 'Ücretsiz Deneme', link: '#booking' },
          backgroundImage: '/defaults/spor-hero.jpg',
        } },
      { id: 'svc1', type: 'services', variant: 'card_grid', order: 2, required: true,
        defaultContent: {
          title: 'Programlarımız',
          services: [
            { name: 'Fitness', price: '', duration: '60 dk', icon: 'dumbbell' },
            { name: 'Crossfit', price: '', duration: '45 dk', icon: 'flame' },
            { name: 'Yoga', price: '', duration: '60 dk', icon: 'leaf' },
            { name: 'Pilates', price: '', duration: '50 dk', icon: 'move' },
            { name: 'Box', price: '', duration: '60 dk', icon: 'target' },
            { name: 'Fonksiyonel', price: '', duration: '45 dk', icon: 'zap' },
          ],
        } },
      { id: 'price1', type: 'pricing', variant: 'package_cards', order: 3, required: true,
        defaultContent: {
          title: 'Üyelik Paketleri',
          packages: [
            { name: '1 Aylık', price: '₺1.200', features: ['Sınırsız Giriş', 'Grup Dersler', 'Soyunma Odası'], popular: false },
            { name: '6 Aylık', price: '₺5.400', features: ['Sınırsız Giriş', 'Grup Dersler', 'Kişisel Antrenör x4', 'Sauna', 'Beslenme Planı'], popular: true },
            { name: '12 Aylık', price: '₺8.400', features: ['6 Aylık Tümü', 'Kişisel Antrenör x12', 'Vücut Analizi', 'Otopark'], popular: false },
          ],
        } },
      { id: 'team1', type: 'team', variant: 'card_horizontal', order: 4, required: false,
        defaultContent: {
          title: 'Eğitmenlerimiz',
          members: [
            { name: '{{owner_name}}', role: 'Kişisel Antrenör', photo: '', experience: '10+ yıl' },
          ],
        } },
      { id: 'sp1', type: 'social_proof', variant: 'numbers', order: 5, required: false,
        defaultContent: {
          stats: [
            { value: '500+', label: 'Üye' },
            { value: '15+', label: 'Eğitmen' },
            { value: '2000m²', label: 'Alan' },
            { value: '6', label: 'Program' },
          ],
        } },
      { id: 'gal1', type: 'gallery', variant: 'masonry', order: 6, required: false,
        defaultContent: { title: 'Salonumuz', images: [] } },
      { id: 'tst1', type: 'testimonials', variant: 'carousel', order: 7, required: false,
        defaultContent: { title: 'Üye Yorumları', reviews: [] } },
      { id: 'book1', type: 'booking', variant: 'inline_compact', order: 8, required: false,
        defaultContent: { title: 'Ücretsiz Deneme', subtitle: 'İlk antrenmanınız bizden' } },
      { id: 'wh1', type: 'working_hours', variant: 'compact', order: 9, required: true,
        defaultContent: {
          title: 'Çalışma Saatleri',
          hours: {
            monday: { open: '06:00', close: '23:00' }, tuesday: { open: '06:00', close: '23:00' },
            wednesday: { open: '06:00', close: '23:00' }, thursday: { open: '06:00', close: '23:00' },
            friday: { open: '06:00', close: '23:00' }, saturday: { open: '08:00', close: '20:00' },
            sunday: { open: '08:00', close: '18:00' },
          },
        } },
      { id: 'map1', type: 'map', variant: 'full_width', order: 10, required: true,
        defaultContent: { title: 'Konum', address: '{{address}}' } },
      { id: 'wa1', type: 'whatsapp_cta', variant: 'floating', order: 11, required: true,
        defaultContent: { phone: '{{phone}}', message: 'Merhaba, üyelik hakkında bilgi almak istiyorum.' } },
      { id: 'ft1', type: 'footer', variant: 'dark', order: 99, required: true,
        defaultContent: {
          businessName: '{{business_name}}', address: '{{address}}', phone: '{{phone}}', email: '{{email}}',
          social: { instagram: '', youtube: '' }, legal: ['Gizlilik Politikası', 'KVKK'],
        } },
    ],
    requiredBlocks: ['header', 'hero', 'services', 'pricing', 'working_hours', 'map', 'whatsapp_cta', 'footer'],
    optionalBlocks: ['team', 'social_proof', 'gallery', 'testimonials', 'booking', 'faq', 'blog_preview'],
  },
]
