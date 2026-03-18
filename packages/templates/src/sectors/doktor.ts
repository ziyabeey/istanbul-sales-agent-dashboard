/**
 * Doktor & Klinik Sektör Şablonu
 */

import type { SectorTemplate, SiteTheme } from '../types/template'

const doktorTheme: SiteTheme = {
  primary: '#0077B6',
  secondary: '#023E8A',
  accent: '#E8F4FD',
  background: '#FFFFFF',
  surface: '#F0F7FC',
  text: '#1A1A2E',
  textSecondary: '#6B7280',
  border: '#D1E5F0',
  radius: '12px',
  fontHeading: 'Inter',
  fontBody: 'Inter',
}

export const doktorTemplates: SectorTemplate[] = [
  {
    id: 'doktor_trust',
    sectorId: 'doktor',
    name: 'Güvenilir Doktor',
    description: 'Profesyonel ve güven veren klinik tasarımı',
    thumbnail: '/templates/doktor-trust.jpg',
    theme: doktorTheme,
    seoSchema: 'MedicalBusiness',
    blocks: [
      { id: 'h1', type: 'header', variant: 'sticky_white', order: 0, required: true,
        defaultContent: { logo: '', menuItems: ['Uzmanlıklar', 'Doktorumuz', 'Randevu', 'İletişim'] } },
      { id: 'hero1', type: 'hero', variant: 'split_image', order: 1, required: true,
        defaultContent: {
          title: '{{business_name}}', subtitle: 'Sağlığınız, önceliğimiz',
          cta1: { text: 'Randevu Al', link: '#booking' },
          cta2: { text: 'Bizi Arayın', link: 'tel:{{phone}}' },
          backgroundImage: '/defaults/doktor-hero.jpg',
        } },
      { id: 'svc1', type: 'services', variant: 'icon_list', order: 2, required: true,
        defaultContent: {
          title: 'Uzmanlık Alanlarımız',
          services: [
            { name: 'Genel Muayene', price: '₺800', duration: '30 dk', icon: 'stethoscope' },
            { name: 'Check-Up', price: '₺2.500', duration: '60 dk', icon: 'clipboard' },
            { name: 'Ultrason', price: '₺600', duration: '20 dk', icon: 'scan' },
            { name: 'Laboratuvar', price: '₺400', duration: '15 dk', icon: 'flask' },
          ],
        } },
      { id: 'team1', type: 'team', variant: 'doctor_profile', order: 3, required: true,
        defaultContent: {
          title: 'Doktorumuz',
          members: [{
            name: '{{owner_name}}', role: 'Uzman Doktor', photo: '', experience: '20+ yıl',
            education: ['Tıp Fakültesi', 'Uzmanlık Eğitimi'], certificates: ['Yeterlilik Belgesi'],
          }],
        } },
      { id: 'sp1', type: 'social_proof', variant: 'numbers', order: 4, required: false,
        defaultContent: {
          stats: [
            { value: '20+', label: 'Yıl Deneyim' },
            { value: '15K+', label: 'Hasta' },
            { value: '4.9', label: 'Puan' },
            { value: '7/24', label: 'Destek' },
          ],
        } },
      { id: 'tst1', type: 'testimonials', variant: 'simple_list', order: 5, required: false,
        defaultContent: { title: 'Hasta Yorumları', reviews: [] } },
      { id: 'faq1', type: 'faq', variant: 'accordion', order: 6, required: false,
        defaultContent: {
          title: 'Sık Sorulan Sorular',
          items: [
            { q: 'Randevu nasıl alırım?', a: 'Online randevu sistemimizden veya telefon ile randevu alabilirsiniz.' },
            { q: 'SGK kabul ediyor musunuz?', a: 'Evet, anlaşmalı tüm SGK ve özel sigortalar geçerlidir.' },
            { q: 'Check-up paketi neler içeriyor?', a: 'Tam kan sayımı, biyokimya, tiroit, ultrason ve doktor muayenesi.' },
          ],
        } },
      { id: 'book1', type: 'booking', variant: 'inline_calendar', order: 7, required: true,
        defaultContent: { title: 'Online Randevu', subtitle: 'Hızlı ve kolay randevu alın' } },
      { id: 'gal1', type: 'gallery', variant: 'grid_2col', order: 8, required: false,
        defaultContent: { title: 'Klinik Fotoğrafları', images: [] } },
      { id: 'wh1', type: 'working_hours', variant: 'compact', order: 9, required: true,
        defaultContent: {
          title: 'Muayene Saatleri',
          hours: {
            monday: { open: '09:00', close: '18:00' }, tuesday: { open: '09:00', close: '18:00' },
            wednesday: { open: '09:00', close: '18:00' }, thursday: { open: '09:00', close: '18:00' },
            friday: { open: '09:00', close: '17:00' }, saturday: { open: '09:00', close: '14:00' },
            sunday: null,
          },
        } },
      { id: 'ct1', type: 'contact', variant: 'form_map', order: 10, required: true,
        defaultContent: { title: 'İletişim', address: '{{address}}', phone: '{{phone}}', email: '{{email}}' } },
      { id: 'ft1', type: 'footer', variant: 'medical', order: 99, required: true,
        defaultContent: {
          businessName: '{{business_name}}', address: '{{address}}', phone: '{{phone}}', email: '{{email}}',
          social: { instagram: '' }, legal: ['Gizlilik Politikası', 'KVKK', 'Aydınlatma Metni'],
        } },
    ],
    requiredBlocks: ['header', 'hero', 'services', 'team', 'booking', 'contact', 'working_hours', 'footer'],
    optionalBlocks: ['testimonials', 'faq', 'gallery', 'blog_preview', 'social_proof'],
  },
]
