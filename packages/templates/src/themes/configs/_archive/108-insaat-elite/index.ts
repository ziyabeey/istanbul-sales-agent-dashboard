import type { ThemeConfig, BusinessData } from '../../../../types/section-types'
export const INSAAT_ELITE_BUSINESS: BusinessData = {
  name: 'Yapi Insaat',
  ownerName: 'Muh. Hasan Yapi',
  sectorId: 'insaat',
  slogan: 'Temelden catiya insaat',
  phone: '0212 500 11 22',
  phoneClean: '902125001122',
  whatsapp: '902125001122',
  email: 'info@yapiinsaat.com',
  address: 'Maslak Mah. No:50, Sariyer, Istanbul',
  city: 'Istanbul',
  district: 'Maslak',
  workingHours: [{"day":"monday","dayTr":"Pazartesi","open":"08:00","close":"18:00"},{"day":"tuesday","dayTr":"Sali","open":"08:00","close":"18:00"},{"day":"wednesday","dayTr":"Carsamba","open":"08:00","close":"18:00"},{"day":"thursday","dayTr":"Persembe","open":"08:00","close":"18:00"},{"day":"friday","dayTr":"Cuma","open":"08:00","close":"18:00"},{"day":"saturday","dayTr":"Cumartesi","open":"08:00","close":"18:00"},{"day":"sunday","dayTr":"Pazar","open":null,"close":null}],
  socialMedia: {"instagram":"https://instagram.com/insaat-elite"},
  photos: [],
  services: []
}
export const INSAAT_ELITE_CONFIG: ThemeConfig = { 
  id: 'insaat-elite', 
  name: 'Uluslararası İnşaat', 
  sectorId: 'insaat', 
  plan: 'enterprise', 
  isDark: true, 
  
  description: 'Global ölçekli mega projeler ve lüks yaşam alanları.',
  designPhilosophy: 'Sınırları zorlayan mimari deha, fonksiyonellik ve prestijin heykelsi birleşimi.',
  performanceBudget: { maxJS: '600kb', maxLCP: '2.4s', animationLevel: 'framer-full' },
  seoSchemaType: 'LocalBusiness',
  sectorSections: ['Mega Projeler', 'Altyapı', 'Lüks Konut', 'Sürdürülebilirlik', 'Uluslararası Ortaklıklar'],
  
  cssVariables: { 
    '--color-bg': '#FAFAF9', 
    '--color-surface': '#F5F5F4', 
    '--color-text': '#1C1917', 
    '--color-accent': '#D4AF37',
    '--color-accent-light': '#2e281f',
    '--color-accent-hover': '#724c18',
    '--color-accent-active': '#614115', 
    '--color-text-on-accent': '#000000', 
    '--color-border': '#D6D3D1', 
    '--font-heading': "'Syne', sans-serif", 
    '--font-body': "'Inter', sans-serif" 
  }, 
  fonts: { 
    heading: { family: 'Syne', weights: [700], subsets: ['latin', 'latin-ext'] }, 
    body: { family: 'Inter', weights: [300, 400], subsets: ['latin', 'latin-ext'] } 
  }, 
  globalSections: [], 
  pages: [{ 
    id: 'anasayfa', 
    slug: '/', 
    title: 'Global Construction', 
    titleTr: 'Ana Sayfa',
    isHomePage: true, 
    includeInNav: true, 
    sections: [ 
      { 
        id: 'hero', 
        type: 'insaat_elite_hero' as any, 
        variant: 'video_showreel', 
        order: 1, 
        required: true, 
        settings: { bgMode: 'default', paddingY: 'none', containerWidth: 'full', visible: true, removable: false, animation: 'fade', order: 1 }, 
        editableFields: [],
        defaultContent: { badge: 'GLOBAL SCALE', title: 'Sınırları Aşan Mühendislik' } 
      },
      { 
        id: 'overview', 
        type: 'insaat_elite_overview' as any, 
        variant: 'default', 
        order: 2, 
        required: true, 
        settings: { bgMode: 'default', paddingY: 'xl', containerWidth: 'xl', visible: true, removable: true, animation: 'slide-up', order: 2 }, 
        editableFields: [],
        defaultContent: { title: 'DÜNYAYI İNŞA EDİYORUZ' } 
      },
      { 
        id: 'projects', 
        type: 'insaat_elite_projects' as any, 
        variant: 'default', 
        order: 3, 
        required: true, 
        settings: { bgMode: 'default', paddingY: 'xl', containerWidth: 'xl', visible: true, removable: true, animation: 'slide-up', order: 3 }, 
        editableFields: [],
        defaultContent: { title: 'MEGA PROJELER' } 
      },
      { 
        id: 'stats', 
        type: 'insaat_elite_stats' as any, 
        variant: 'default', 
        order: 4, 
        required: true, 
        settings: { bgMode: 'default', paddingY: 'xl', containerWidth: 'xl', visible: true, removable: true, animation: 'slide-up', order: 4 }, 
        editableFields: [],
        defaultContent: { title: 'RAKAMLARLA BİZ' } 
      },
      { 
        id: 'contact', 
        type: 'insaat_elite_contact' as any, 
        variant: 'default', 
        order: 5, 
        required: true, 
        settings: { bgMode: 'default', paddingY: 'xl', containerWidth: 'xl', visible: true, removable: false, animation: 'slide-up', order: 5 }, 
        editableFields: [],
        defaultContent: { title: 'YATIRIMCI İLİŞKİLERİ' } 
      }
    ] 
  }] 
}