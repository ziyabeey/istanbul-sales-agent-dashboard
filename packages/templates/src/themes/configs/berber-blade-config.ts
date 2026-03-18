/**
 * @kepenk/templates — berber-blade ThemeConfig
 *
 * Aggressive, dark, neon orange highlights. Video hero, hover-reveal.
 * Plan: growth | Font: Syne (heading) + Inter (body) | Dark mode
 */

import type { ThemeConfig, BusinessData } from '../../types/section-types'

export const BERBER_BLADE_CSS: Record<string, string> = {
  '--color-bg': '#0A0A0A',
  '--color-surface': '#141414',
  '--color-surface-elevated': '#1A1A1A',
  '--color-surface-muted': '#111111',
  '--color-text': '#F5F5F5',
  '--color-text-secondary': '#A0A0A0',
  '--color-text-muted': '#666666',
  '--color-text-on-accent': '#000000',
  '--color-text-on-dark': '#F5F5F5',
  '--color-accent': '#F97316',
  '--color-accent-hover': '#FB923C',
  '--color-accent-active': '#EA580C',
  '--color-accent-light': '#1A1008',
  '--color-accent-subtle': '#140E06',
  '--color-border': '#2A2A2A',
  '--color-border-subtle': '#1E1E1E',
  '--font-heading': "'Syne', sans-serif",
  '--font-body': "'Inter', system-ui, sans-serif"}

export const BERBER_BLADE_BUSINESS: BusinessData = {
  name: 'BLADE Grooming',
  ownerName: 'Kaan Demir',
  sector: 'berber',
  slogan: 'Cut different.',
  phone: '0541 777 88 99',
  phoneClean: '905417778899',
  whatsapp: '905417778899',
  email: 'info@bladegrooming.com',
  address: 'Bağdat Cad. No:315, Kadıköy, İstanbul',
  city: 'İstanbul',
  district: 'Kadıköy',
  coordinates: { lat: 40.9631, lng: 29.0662 },
  workingHours: [
    { day: 'monday', dayTr: 'Pazartesi', open: '10:00', close: '21:00' },
    { day: 'tuesday', dayTr: 'Salı', open: '10:00', close: '21:00' },
    { day: 'wednesday', dayTr: 'Çarşamba', open: '10:00', close: '21:00' },
    { day: 'thursday', dayTr: 'Perşembe', open: '10:00', close: '21:00' },
    { day: 'friday', dayTr: 'Cuma', open: '10:00', close: '22:00' },
    { day: 'saturday', dayTr: 'Cumartesi', open: '10:00', close: '22:00' },
    { day: 'sunday', dayTr: 'Pazar', open: '11:00', close: '19:00' }],
  socialMedia: { instagram: 'https://instagram.com/bladegrooming', tiktok: 'https://tiktok.com/@bladegrooming' },
  photos: [],
  services: [
    { id: 's1', name: 'Skin Fade', price: '₺350', duration: '40 dk', icon: 'scissors', description: 'Sharp transitions, clean lines' },
    { id: 's2', name: 'Hot Towel Shave', price: '₺200', duration: '25 dk', icon: 'sparkles' },
    { id: 's3', name: 'Fade + Beard', price: '₺450', duration: '55 dk', icon: 'star', popular: true },
    { id: 's4', name: 'Design Cut', price: '₺500', duration: '60 dk', icon: 'palette', description: 'Freestyle saç sanatı' },
    { id: 's5', name: 'Hair Color', price: '₺400', duration: '50 dk', icon: 'palette' },
    { id: 's6', name: 'VIP Package', price: '₺900', duration: '90 dk', icon: 'crown' }],
  team: [
    { id: 't1', name: 'Kaan Demir', role: 'Founder & Head Barber', experience: '8 yıl' },
    { id: 't2', name: 'Cem Aktaş', role: 'Senior Barber', experience: '6 yıl' },
    { id: 't3', name: 'Deniz Yücel', role: 'Barber', experience: '4 yıl' },
    { id: 't4', name: 'Baran Koç', role: 'Junior Barber', experience: '2 yıl' }],
  experience: '8 yıl',
  rating: 4.8,
  reviewCount: 342,
  foundedYear: 2016}

export const BERBER_BLADE_CONFIG: ThemeConfig = {
  id: 'berber-blade',
  name: 'Blade',
  sectorId: 'berber',
  plan: 'growth',
  description: 'Agresif, koyu, neon turuncu vurgulu. Modern berber stüdyosu.',
  designPhilosophy: 'Dark base + orange accent for maximum contrast. Syne headings — bold, architectural.',
  inspiration: ['Nike SNKRS', 'Figma dark mode'],
  isDark: true,
  cssVariables: BERBER_BLADE_CSS,
  fonts: {
    heading: { family: 'DM Sans', weights: [700, 800], subsets: ['latin-ext'] },
    body:    { family: 'Inter', weights: [400, 500], subsets: ['latin-ext'] }},
  seoSchemaType: 'BarberShop',
  sectorSections: ['before_after', 'booking'],
  performanceBudget: { maxJS: '180kb', maxLCP: '3.0s', animationLevel: 'framer-full' },
  globalSections: [
    {
      id: 'global-header', type: 'header', variant: 'minimal_sticky', order: 0, required: true, position: 'top',
      settings: { bgMode: 'dark', paddingY: 'none', containerWidth: 'full', visible: true, order: 0, removable: false, animation: 'fadeIn' },
      defaultContent: {
        logo: { type: 'text', text: 'BLADE' },
        menuItems: [
          { label: 'Services', href: '#services' },
          { label: 'Gallery', href: '#gallery' },
          { label: 'Team', href: '#team' },
          { label: 'Contact', href: '#contact' }],
        cta: { text: 'Book Now', href: 'https://wa.me/905417778899', variant: 'solid' }},
      editableFields: [] },
    {
      id: 'global-footer', type: 'footer', variant: 'minimal', order: 999, required: true, position: 'bottom',
      settings: { bgMode: 'dark', paddingY: 'sm', containerWidth: 'full', visible: true, order: 999, removable: false, animation: 'fadeIn' },
      defaultContent: {
        businessName: 'BLADE Grooming',
        copyright: '© 2024 BLADE Grooming. Cut different.',
        contact: { phone: '0541 777 88 99', address: 'Bağdat Cad. No:315, Kadıköy' },
        social: [
          { platform: 'instagram', url: 'https://instagram.com/bladegrooming', icon: 'instagram' },
          { platform: 'tiktok', url: 'https://tiktok.com/@bladegrooming', icon: 'tiktok' }],
        legal: [{ label: 'Privacy', href: '/gizlilik' }, { label: 'KVKK', href: '/kvkk' }],
        poweredBy: '⚡ kepenk.ai'},
      editableFields: [] },
    {
      id: 'global-whatsapp', type: 'whatsapp_cta', variant: 'floating', order: 1000, required: true, position: 'floating',
      settings: { bgMode: 'default', paddingY: 'none', containerWidth: 'full', visible: true, order: 1000, removable: false, animation: 'fadeIn' },
      defaultContent: { phone: '905417778899', message: 'Hey, I want to book an appointment.' },
      editableFields: [] },
    {
      id: 'global-cookie', type: 'cookie_banner', variant: 'bottom_bar', order: 1001, required: true, position: 'floating',
      settings: { bgMode: 'surface', paddingY: 'none', containerWidth: 'full', visible: true, order: 1001, removable: false, animation: 'fadeIn' },
      defaultContent: { text: 'We use cookies for the best experience.', acceptText: 'Accept', rejectText: 'Decline', detailsLink: '/gizlilik' },
      editableFields: []}],
  pages: [{
    id: 'anasayfa', slug: '/', title: "BLADE Grooming — Kadıköy", titleTr: 'Ana Sayfa', isHomePage: true, includeInNav: false,
    sections: [
{ id: 'hero', type: 'hero', variant: 'split_image', order: 1, required: true, settings: { bgMode: 'default', paddingY: 'none', containerWidth: 'full', visible: true, order: 1, removable: false, animation: 'fadeIn' }, defaultContent: { badge: 'Kadıköy', title: "BLADE Grooming", subtitle: "Cut different.", cta1: { text: 'İletişim', href: '#iletisim' } }, editableFields: [] },
{ id: 'hakkimizda', type: 'about', variant: 'split_left', order: 2, required: false, settings: { bgMode: 'default', paddingY: 'lg', containerWidth: 'full', visible: true, order: 2, removable: true, animation: 'fadeIn' }, defaultContent: { badge: 'HAKKIMIZDA', title: "Biz Kimiz?", description: "Yılların tecrübesiyle hizmetinizdeyiz." }, editableFields: [] },
{ id: 'hizmetler', type: 'services', variant: 'berber_services', order: 3, required: true, settings: { bgMode: 'surface', paddingY: 'lg', containerWidth: 'full', visible: true, order: 3, removable: false, animation: 'fadeIn' }, defaultContent: { badge: 'HİZMETLER', title: 'Hizmetlerimiz', services: [{ id: 's1', name: 'Premium Hizmet', description: 'Detaylı bilgi için iletişime geçin.', icon: 'star' }] }, editableFields: [] },
{ id: 'iletisim', type: 'contact', variant: 'simple_form', order: 4, required: true, settings: { bgMode: 'surface', paddingY: 'lg', containerWidth: 'full', visible: true, order: 4, removable: false, animation: 'fadeIn' }, defaultContent: { badge: 'İLETİŞİM', title: 'Bize Ulaşın', whatsapp: "905417778899" }, editableFields: [] }
    ]
  }]
}
