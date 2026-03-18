/**
 * Oto Tamir & Servis Sektör Şablonu
 */

import type { SectorTemplate, SiteTheme } from '../types/template'

const otoTheme: SiteTheme = {
  primary: '#DC2626',
  secondary: '#1F2937',
  accent: '#FEF2F2',
  background: '#FFFFFF',
  surface: '#F9FAFB',
  text: '#111827',
  textSecondary: '#6B7280',
  border: '#E5E7EB',
  radius: '10px',
  fontHeading: 'Montserrat',
  fontBody: 'Open Sans',
}

export const otoTemplates: SectorTemplate[] = [
  {
    id: 'oto_mekanik',
    sectorId: 'oto',
    name: 'Güçlü Mekanik',
    description: 'Profesyonel oto tamir ve servis tasarımı',
    thumbnail: '/templates/oto-mekanik.jpg',
    theme: otoTheme,
    seoSchema: 'AutoRepair',
    blocks: [
      { id: 'h1', type: 'header', variant: 'sticky_dark', order: 0, required: true,
        defaultContent: { logo: '', menuItems: ['Hizmetler', 'Fiyatlar', 'Hakkımızda', 'İletişim'] } },
      { id: 'hero1', type: 'hero', variant: 'fullscreen_overlay', order: 1, required: true,
        defaultContent: {
          title: '{{business_name}}', subtitle: 'Aracınız en güvenilir ellerde',
          cta1: { text: 'Randevu Al', link: '#booking' },
          cta2: { text: 'Bizi Arayın', link: 'tel:{{phone}}' },
          backgroundImage: '/defaults/oto-hero.jpg',
        } },
      { id: 'svc1', type: 'services', variant: 'card_grid', order: 2, required: true,
        defaultContent: {
          title: 'Hizmetlerimiz',
          services: [
            { name: 'Motor Bakım', price: '₺1.500', duration: '2-3 saat', icon: 'engine' },
            { name: 'Fren Sistemi', price: '₺800', duration: '1-2 saat', icon: 'brake' },
            { name: 'Yağ Değişimi', price: '₺500', duration: '30 dk', icon: 'droplet' },
            { name: 'Akü Değişimi', price: '₺1.200', duration: '20 dk', icon: 'battery' },
            { name: 'Lastik Değişimi', price: '₺200', duration: '30 dk', icon: 'circle' },
            { name: 'Ekspertiz', price: '₺750', duration: '1 saat', icon: 'search' },
          ],
        } },
      { id: 'price1', type: 'pricing', variant: 'package_cards', order: 3, required: false,
        defaultContent: {
          title: 'Bakım Paketleri',
          packages: [
            { name: 'Temel Bakım', price: '₺1.500', features: ['Yağ Değişimi', 'Filtre Değişimi', '40 Nokta Kontrol'], popular: false },
            { name: 'Full Bakım', price: '₺3.500', features: ['Temel Bakım', 'Fren Kontrolü', 'Süspansiyon', 'Klima Bakım', 'Antifriz'], popular: true },
            { name: 'Premium', price: '₺6.000', features: ['Full Bakım', 'Motor Yıkama', 'İç Dış Temizlik', 'Boya Koruma', 'Garanti'], popular: false },
          ],
        } },
      { id: 'sp1', type: 'social_proof', variant: 'numbers', order: 4, required: false,
        defaultContent: {
          stats: [
            { value: '20+', label: 'Yıl' },
            { value: '25K+', label: 'Araç' },
            { value: '4.7', label: 'Puan' },
            { value: '8', label: 'Usta' },
          ],
        } },
      { id: 'gal1', type: 'gallery', variant: 'grid_3col', order: 5, required: false,
        defaultContent: { title: 'Atölyemiz', images: [] } },
      { id: 'tst1', type: 'testimonials', variant: 'carousel', order: 6, required: false,
        defaultContent: { title: 'Müşteri Yorumları', reviews: [] } },
      { id: 'book1', type: 'booking', variant: 'inline_calendar', order: 7, required: true,
        defaultContent: { title: 'Online Randevu', subtitle: 'Aracınız için randevu alın' } },
      { id: 'wh1', type: 'working_hours', variant: 'compact', order: 8, required: true,
        defaultContent: {
          title: 'Çalışma Saatleri',
          hours: {
            monday: { open: '08:00', close: '19:00' }, tuesday: { open: '08:00', close: '19:00' },
            wednesday: { open: '08:00', close: '19:00' }, thursday: { open: '08:00', close: '19:00' },
            friday: { open: '08:00', close: '19:00' }, saturday: { open: '08:00', close: '17:00' },
            sunday: null,
          },
        } },
      { id: 'map1', type: 'map', variant: 'full_width', order: 9, required: true,
        defaultContent: { title: 'Konum', address: '{{address}}' } },
      { id: 'wa1', type: 'whatsapp_cta', variant: 'floating', order: 10, required: true,
        defaultContent: { phone: '{{phone}}', message: 'Merhaba, servis randevusu almak istiyorum.' } },
      { id: 'ft1', type: 'footer', variant: 'simple', order: 99, required: true,
        defaultContent: {
          businessName: '{{business_name}}', address: '{{address}}', phone: '{{phone}}', email: '{{email}}',
          social: { instagram: '', facebook: '' }, legal: ['Gizlilik Politikası', 'KVKK'],
        } },
    ],
    requiredBlocks: ['header', 'hero', 'services', 'booking', 'working_hours', 'map', 'whatsapp_cta', 'footer'],
    optionalBlocks: ['pricing', 'social_proof', 'gallery', 'testimonials', 'faq', 'blog_preview', 'team'],
  },
]
