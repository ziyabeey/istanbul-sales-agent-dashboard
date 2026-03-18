/**
 * Avukat & Hukuk Bürosu Sektör Şablonu
 */

import type { SectorTemplate, SiteTheme } from '../types/template'

const avukatTheme: SiteTheme = {
  primary: '#1E293B',
  secondary: '#334155',
  accent: '#D4AF37',
  background: '#FFFFFF',
  surface: '#F8FAFC',
  text: '#0F172A',
  textSecondary: '#64748B',
  border: '#E2E8F0',
  radius: '8px',
  fontHeading: 'Libre Baskerville',
  fontBody: 'Source Sans 3',
}

export const avukatTemplates: SectorTemplate[] = [
  {
    id: 'avukat_prestige',
    sectorId: 'avukat',
    name: 'Prestij Hukuk',
    description: 'Ciddi ve güvenilir hukuk bürosu tasarımı',
    thumbnail: '/templates/avukat-prestige.jpg',
    theme: avukatTheme,
    seoSchema: 'LegalService',
    blocks: [
      { id: 'h1', type: 'header', variant: 'sticky_dark', order: 0, required: true,
        defaultContent: { logo: '', menuItems: ['Uzmanlık Alanları', 'Hakkımızda', 'Ekip', 'İletişim'] } },
      { id: 'hero1', type: 'hero', variant: 'split_image', order: 1, required: true,
        defaultContent: {
          title: '{{business_name}}', subtitle: 'Hukukun gücü, yanınızda',
          cta1: { text: 'Randevu Al', link: '#booking' },
          cta2: { text: 'Bizi Arayın', link: 'tel:{{phone}}' },
          backgroundImage: '/defaults/avukat-hero.jpg',
        } },
      { id: 'svc1', type: 'services', variant: 'icon_list', order: 2, required: true,
        defaultContent: {
          title: 'Uzmanlık Alanlarımız',
          services: [
            { name: 'Ceza Hukuku', price: 'Danışma: ₺2.000', duration: '45 dk', icon: 'gavel' },
            { name: 'Ticaret Hukuku', price: 'Danışma: ₺2.500', duration: '60 dk', icon: 'briefcase' },
            { name: 'Aile Hukuku', price: 'Danışma: ₺1.500', duration: '45 dk', icon: 'users' },
            { name: 'İş Hukuku', price: 'Danışma: ₺2.000', duration: '45 dk', icon: 'shield' },
            { name: 'Gayrimenkul', price: 'Danışma: ₺2.000', duration: '45 dk', icon: 'home' },
          ],
        } },
      { id: 'sp1', type: 'social_proof', variant: 'numbers', order: 3, required: false,
        defaultContent: {
          stats: [
            { value: '25+', label: 'Yıl Deneyim' },
            { value: '3000+', label: 'Dava' },
            { value: '%94', label: 'Kazanma Oranı' },
            { value: '5', label: 'Avukat' },
          ],
        } },
      { id: 'team1', type: 'team', variant: 'card_horizontal', order: 4, required: false,
        defaultContent: {
          title: 'Avukatlarımız',
          members: [{ name: '{{owner_name}}', role: 'Kurucu Avukat', photo: '', experience: '25+ yıl' }],
        } },
      { id: 'tst1', type: 'testimonials', variant: 'simple_list', order: 5, required: false,
        defaultContent: { title: 'Müvekkil Yorumları', reviews: [] } },
      { id: 'faq1', type: 'faq', variant: 'accordion', order: 6, required: false,
        defaultContent: {
          title: 'Sık Sorulan Sorular',
          items: [
            { q: 'İlk görüşme ücretli mi?', a: 'İlk 15 dakikalık ön değerlendirme görüşmesi ücretsizdir.' },
            { q: 'Online danışmanlık var mı?', a: 'Evet, video konferans üzerinden online danışmanlık hizmeti sunuyoruz.' },
          ],
        } },
      { id: 'book1', type: 'booking', variant: 'inline_calendar', order: 7, required: true,
        defaultContent: { title: 'Randevu Al', subtitle: 'Size uygun danışma saatini seçin' } },
      { id: 'ct1', type: 'contact', variant: 'form_map', order: 8, required: true,
        defaultContent: { title: 'İletişim', address: '{{address}}', phone: '{{phone}}', email: '{{email}}' } },
      { id: 'wh1', type: 'working_hours', variant: 'compact', order: 9, required: true,
        defaultContent: {
          title: 'Çalışma Saatleri',
          hours: {
            monday: { open: '09:00', close: '18:00' }, tuesday: { open: '09:00', close: '18:00' },
            wednesday: { open: '09:00', close: '18:00' }, thursday: { open: '09:00', close: '18:00' },
            friday: { open: '09:00', close: '17:00' }, saturday: null, sunday: null,
          },
        } },
      { id: 'wa1', type: 'whatsapp_cta', variant: 'floating', order: 10, required: true,
        defaultContent: { phone: '{{phone}}', message: 'Merhaba, hukuki danışmanlık hakkında bilgi almak istiyorum.' } },
      { id: 'ft1', type: 'footer', variant: 'professional', order: 99, required: true,
        defaultContent: {
          businessName: '{{business_name}}', address: '{{address}}', phone: '{{phone}}', email: '{{email}}',
          social: { linkedin: '' }, legal: ['Gizlilik Politikası', 'KVKK', 'Avukatlık Kanunu'],
        } },
    ],
    requiredBlocks: ['header', 'hero', 'services', 'booking', 'contact', 'working_hours', 'whatsapp_cta', 'footer'],
    optionalBlocks: ['social_proof', 'team', 'testimonials', 'faq', 'blog_preview', 'gallery'],
  },
]
