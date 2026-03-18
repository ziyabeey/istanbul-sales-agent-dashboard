/**
 * Diş Kliniği Sektör Şablonu
 */

import type { SectorTemplate, SiteTheme } from '../types/template'

const disTheme: SiteTheme = {
  primary: '#06B6D4',
  secondary: '#0891B2',
  accent: '#ECFEFF',
  background: '#FFFFFF',
  surface: '#F0FDFA',
  text: '#134E4A',
  textSecondary: '#6B7280',
  border: '#CCFBF1',
  radius: '14px',
  fontHeading: 'Poppins',
  fontBody: 'Inter',
}

export const disTemplates: SectorTemplate[] = [
  {
    id: 'dis_modern',
    sectorId: 'dis',
    name: 'Modern Diş',
    description: 'Güven veren, temiz ve modern diş kliniği tasarımı',
    thumbnail: '/templates/dis-modern.jpg',
    theme: disTheme,
    seoSchema: 'Dentist',
    blocks: [
      { id: 'h1', type: 'header', variant: 'sticky_white', order: 0, required: true,
        defaultContent: { logo: '', menuItems: ['Tedaviler', 'Ekibimiz', 'Galeri', 'Randevu'] } },
      { id: 'hero1', type: 'hero', variant: 'split_image', order: 1, required: true,
        defaultContent: {
          title: '{{business_name}}', subtitle: 'Sağlıklı gülüşler için uzman bakım',
          cta1: { text: 'Randevu Al', link: '#booking' },
          cta2: { text: 'WhatsApp', link: 'https://wa.me/{{phone}}' },
          backgroundImage: '/defaults/dis-hero.jpg',
        } },
      { id: 'svc1', type: 'services', variant: 'card_grid', order: 2, required: true,
        defaultContent: {
          title: 'Tedavilerimiz',
          services: [
            { name: 'Diş Beyazlatma', price: '₺3.000', duration: '60 dk', icon: 'sparkles' },
            { name: 'İmplant', price: '₺12.000', duration: 'Planlı', icon: 'pin' },
            { name: 'Zirkonyum Kaplama', price: '₺4.500', duration: 'Planlı', icon: 'crown' },
            { name: 'Ortodonti', price: '₺25.000', duration: '12-18 ay', icon: 'align' },
            { name: 'Kanal Tedavisi', price: '₺2.000', duration: '45 dk', icon: 'tool' },
            { name: 'Dolgu', price: '₺800', duration: '30 dk', icon: 'shield' },
          ],
        } },
      { id: 'ba1', type: 'before_after', variant: 'slider', order: 3, required: false,
        defaultContent: { title: 'Öncesi & Sonrası', items: [] } },
      { id: 'team1', type: 'team', variant: 'doctor_profile', order: 4, required: true,
        defaultContent: {
          title: 'Diş Hekimlerimiz',
          members: [{
            name: '{{owner_name}}', role: 'Diş Hekimi', photo: '', experience: '15+ yıl',
            education: ['Diş Hekimliği Fakültesi'], certificates: ['İmplant Uzmanlığı'],
          }],
        } },
      { id: 'sp1', type: 'social_proof', variant: 'numbers', order: 5, required: false,
        defaultContent: {
          stats: [
            { value: '15+', label: 'Yıl' },
            { value: '10K+', label: 'Hasta' },
            { value: '4.9', label: 'Puan' },
            { value: '3', label: 'Hekim' },
          ],
        } },
      { id: 'gal1', type: 'gallery', variant: 'grid_3col', order: 6, required: false,
        defaultContent: { title: 'Klinik Fotoğrafları', images: [] } },
      { id: 'tst1', type: 'testimonials', variant: 'carousel', order: 7, required: false,
        defaultContent: { title: 'Hasta Yorumları', reviews: [] } },
      { id: 'faq1', type: 'faq', variant: 'accordion', order: 8, required: false,
        defaultContent: {
          title: 'Sık Sorulan Sorular',
          items: [
            { q: 'İmplant acıtır mı?', a: 'Lokal anestezi altında ağrısız bir şekilde uygulanır.' },
            { q: 'Diş beyazlatma kalıcı mı?', a: 'Doğru bakımla 1-3 yıl sürebilir.' },
          ],
        } },
      { id: 'book1', type: 'booking', variant: 'inline_calendar', order: 9, required: true,
        defaultContent: { title: 'Online Randevu', subtitle: 'Hızlıca randevu alın' } },
      { id: 'wh1', type: 'working_hours', variant: 'compact', order: 10, required: true,
        defaultContent: {
          title: 'Çalışma Saatleri',
          hours: {
            monday: { open: '09:00', close: '19:00' }, tuesday: { open: '09:00', close: '19:00' },
            wednesday: { open: '09:00', close: '19:00' }, thursday: { open: '09:00', close: '19:00' },
            friday: { open: '09:00', close: '18:00' }, saturday: { open: '10:00', close: '15:00' },
            sunday: null,
          },
        } },
      { id: 'wa1', type: 'whatsapp_cta', variant: 'floating', order: 11, required: true,
        defaultContent: { phone: '{{phone}}', message: 'Merhaba, randevu almak istiyorum.' } },
      { id: 'ft1', type: 'footer', variant: 'medical', order: 99, required: true,
        defaultContent: {
          businessName: '{{business_name}}', address: '{{address}}', phone: '{{phone}}', email: '{{email}}',
          social: { instagram: '' }, legal: ['Gizlilik Politikası', 'KVKK', 'Sağlık Bakanlığı Onaylı'],
        } },
    ],
    requiredBlocks: ['header', 'hero', 'services', 'team', 'booking', 'working_hours', 'whatsapp_cta', 'footer'],
    optionalBlocks: ['before_after', 'social_proof', 'gallery', 'testimonials', 'faq', 'blog_preview'],
  },
]
