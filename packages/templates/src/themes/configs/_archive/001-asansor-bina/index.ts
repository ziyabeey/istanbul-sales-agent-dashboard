/**
 * @kepenk/templates — 001-asansor-bina Theme Configuration
 *
 * THE APEX LIFT ENGINE
 * A custom tier-0 Masterpiece for the Elevator/Lift Sector.
 */

import type { ThemeConfig, BusinessData } from '../../../../types/section-types'

// ═══ MASTERPIECE CSS VARIABLES ═══
export const ASANSOR_BINA_CSS: Record<string, string> = {
  '--container-default': '1440px',
  '--section-py': '96px',
  '--radius-md': '0px',
  '--radius-lg': '0px',
  '--color-bg': '#09090b', // zinc-950
  '--color-surface': '#18181b', // zinc-900
  '--color-surface-elevated': '#27272a',
  '--color-surface-muted': '#000000',
  '--color-text': '#fafafa',
  '--color-text-secondary': '#a1a1aa',
  '--color-text-muted': '#52525b',
  '--color-text-on-accent': '#000000',
  '--color-text-on-dark': '#ffffff',
  '--color-accent': '#facc15', // warning yellow
  '--color-accent-hover': '#eab308',
  '--color-accent-active': '#ca8a04',
  '--color-accent-light': '#fef08a',
  '--color-border': 'rgba(255, 255, 255, 0.1)',
  '--color-border-subtle': 'rgba(255, 255, 255, 0.05)',
  '--font-heading': "'Bebas Neue', sans-serif",
  '--font-body': "'Inter', sans-serif",
}

// ═══ DEMO BUSINESS DATA ═══
export const ASANSOR_BINA_BUSINESS = {
  name: 'YILDIZ ELEVATOR MFG.',
  ownerName: 'Kemal Yildiz',
  sectorId: 'Asansör',
  slogan: 'Dikey Ulaşımda 20 Yıllık Kusursuz Mühendislik',
  phone: '0532 671 23 40',
  phoneClean: '905326712340',
  whatsapp: '905326712340',
  email: 'operasyon@yildizasansor.com.tr',
  address: 'Ataşehir Endüstri Bölgesi Cad. No:18, İstanbul',
  city: 'Istanbul',
  district: 'Ataşehir',
  neighborhood: 'Endüstri',
  coordinates: { lat: 40.9865, lng: 29.026 },
  socialMedia: { instagram: 'https://instagram.com/yildizasansor' },
  photos: [
    "https://images.unsplash.com/photo-1544256718-3bcf237f3974?auto=format&fit=crop&q=90", // Shaft
    "https://images.unsplash.com/photo-1533725619175-6bd7982cb979?auto=format&fit=crop&q=90", // Elevator doors
    "https://images.unsplash.com/photo-1532454648784-ea677eb93eb4?auto=format&fit=crop&q=90", // Industrial detail
  ],
  foundedYear: 2005,
  experience: '20 Yıl',
  customerCount: '1.500+',
  rating: 4.9,
  reviewCount: 340,
  workingHours: [
    { day: 'Pazartesi - Cuma', open: '08:00', close: '18:00', isOpen: true },
    { day: 'Cumartesi', open: '09:00', close: '14:00', isOpen: true },
    { day: 'Acil', open: '7/24', close: 'Açık', isOpen: true },
  ],
  services: [
    {
      id: 's1',
      name: 'Aylık Asansör Bakımı',
      price: 'Talep Ediniz',
      duration: '2-3 saat',
      description: 'Periyodik bakım, yağ değişimi, fren kontrolü ve genel sistem testi dahil kapsamlı aylık bakım hizmeti.',
    },
    {
      id: 's2',
      name: 'Asansör Arıza Onarımı',
      price: 'Acil Hat',
      duration: '1-4 saat',
      description: 'Motor, kapı sistemi, kumanda panosu ve mekanik aksam arızalarında hızlı müdahale aracı.',
    },
    {
      id: 's3',
      name: 'Asansör Revizyonu',
      price: 'Proje Bazlı',
      duration: '5-7 gün',
      description: 'Eski asansörlerin Avrupa standartlarında (EN 81-20) mekanik rekonstrüksiyonu.',
    },
    {
      id: 's4',
      name: 'Belediye Muayenesi',
      price: 'Paket Ücret',
      duration: '1 gün',
      description: 'Mühendis odası muayenesi öncesi 146 noktanın lazer destekli taranması ve yeşil etiket garantisi.',
    },
  ],
} as unknown as BusinessData

// ═══ THEME CONFIG ═══
export const ASANSOR_BINA_CONFIG = {
  id: '001-asansor-bina',
  name: 'Bina',
  sectorId: 'asansor',
  plan: 'elite',
  description: 'Apex Lift Engine - Masterpiece Configuration',
  designPhilosophy: 'Endüstriyel, Dikey, Acımasız, Kusursuz',
  isDark: true,
  cssVariables: ASANSOR_BINA_CSS,
  fonts: {
    heading: {
      family: 'Bebas Neue',
      weights: [700, 800],
      subsets: ['latin-ext'],
    },
    body: {
      family: 'Inter',
      weights: [300, 400, 600, 700],
      subsets: ['latin-ext'],
    },
  },
  seoSchemaType: 'HomeAndConstructionBusiness',
  sectorSections: [],
  performanceBudget: {
    maxJS: '120kb',
    maxLCP: '2.0s',
    animationLevel: 'heavy',
  },
  globalSections: [
    {
      id: 'global-header',
      type: 'header',
      variant: 'auto',
      order: 0,
      required: true,
      position: 'top',
      settings: {
        bgMode: 'dark',
        paddingY: 'none',
        containerWidth: 'full',
        visible: true,
        order: 0,
        removable: false,
        animation: 'none',
      },
      defaultContent: {
        logo: { type: 'text', text: 'YILDIZ LIFT' },
        menuItems: [
          { label: 'İSTASYONLAR', href: '#about' },
          { label: 'PROTOKOL', href: '#hizmetler' },
          { label: 'SİNYAL', href: '#iletisim' },
        ],
        cta: {
          text: '7/24 HAT',
          href: 'https://wa.me/905326712340',
          variant: 'solid',
        },
      },
      editableFields: [],
    },
    {
      id: 'global-footer',
      type: 'footer',
      variant: 'auto',
      order: 999,
      required: true,
      position: 'bottom',
      settings: {
        bgMode: 'dark',
        paddingY: 'sm',
        containerWidth: 'full',
        visible: true,
        order: 999,
        removable: false,
        animation: 'none',
      },
      defaultContent: {
        businessName: 'YILDIZ ELEVATOR MFG.',
        copyright: '© 2026 Yildiz Elevator / Apex Engine',
        contact: {
          phone: ASANSOR_BINA_BUSINESS.phone,
          email: ASANSOR_BINA_BUSINESS.email,
          address: ASANSOR_BINA_BUSINESS.address,
        },
        social: [
          {
            platform: 'instagram',
            url: 'https://instagram.com/yildizasansor',
            icon: 'instagram',
          },
        ],
        legal: [
          { label: 'Gizlilik', href: '/gizlilik' },
          { label: 'Sertifikalar', href: '/kvkk' },
        ],
        poweredBy: 'kepenk.ai',
      },
      editableFields: [],
    },
    {
      id: 'global-whatsapp',
      type: 'whatsapp_cta',
      variant: 'floating',
      order: 1000,
      required: true,
      position: 'floating',
      settings: {
        bgMode: 'dark',
        paddingY: 'none',
        containerWidth: 'full',
        visible: true,
        order: 1000,
        removable: false,
        animation: 'none',
      },
      defaultContent: { phone: '905326712340', message: 'Merhaba, arıza bildiriminde bulunmak istiyorum.' },
      editableFields: [],
    },
  ],
  pages: [
    {
      id: 'anasayfa',
      slug: '/',
      title: 'YILDIZ LIFT ENGINE | Asansör Bakım Sistemleri',
      titleTr: 'Ana Sayfa',
      isHomePage: true,
      includeInNav: false,
      sections: [
        {
          id: 'hero',
          type: 'hero',
          variant: 'apex_asansor_hero',
          order: 1,
          required: true,
          settings: { bgMode: 'default', paddingY: 'none', containerWidth: 'full', visible: true, order: 1, removable: false, animation: 'heavy' },
          defaultContent: { title: ASANSOR_BINA_BUSINESS.name, subtitle: ASANSOR_BINA_BUSINESS.slogan },
          editableFields: [
            { path: 'title', label: 'Ana Başlık', type: 'text' },
            { path: 'subtitle', label: 'Açıklama / Slogan', type: 'richtext' }
          ]
        },
        {
          id: 'about',
          type: 'about',
          variant: 'apex_asansor_about',
          order: 2,
          required: true,
          settings: { bgMode: 'surface', paddingY: 'none', containerWidth: 'full', visible: true, order: 2, removable: true, animation: 'heavy' },
          defaultContent: { badge: 'SİSTEM ANALİZİ', title: 'SIFIR TOLERANS' },
          editableFields: [
            { path: 'badge', label: 'Rozet', type: 'text' },
            { path: 'title', label: 'Bölüm Başlığı', type: 'text' },
            { path: 'description', label: 'Açıklama Metni', type: 'richtext' }
          ]
        },
        {
          id: 'hizmetler',
          type: 'services',
          variant: 'apex_asansor_services',
          order: 3,
          required: true,
          settings: { bgMode: 'default', paddingY: 'none', containerWidth: 'full', visible: true, order: 3, removable: false, animation: 'none' },
          defaultContent: { title: 'OPERASYON AĞI' },
          editableFields: [
            { path: 'title', label: 'Servis Başlığı', type: 'text' }
          ]
        },
        {
          id: 'iletisim',
          type: 'contact',
          variant: 'apex_asansor_contact',
          order: 4,
          required: true,
          settings: { bgMode: 'surface', paddingY: 'none', containerWidth: 'full', visible: true, order: 4, removable: false, animation: 'none' },
          defaultContent: { title: 'SİNYAL GÖNDER' },
          editableFields: [
            { path: 'badge', label: 'İletişim Rozeti', type: 'text' },
            { path: 'title', label: 'İletişim Başlığı', type: 'text' }
          ]
        }
      ],
    },
  ],
} as unknown as ThemeConfig
