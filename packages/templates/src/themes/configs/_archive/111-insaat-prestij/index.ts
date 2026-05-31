import type { ThemeConfig, BusinessData } from '../../../../types/section-types'
export const INSAAT_PRESTIJ_BUSINESS: BusinessData = {
  name: 'Prestij Insaat',
  ownerName: 'Muh. Tolga Prestij',
  sectorId: 'insaat',
  slogan: 'Prestijli yasam projeleri',
  phone: '0212 500 44 55',
  phoneClean: '902125004455',
  whatsapp: '902125004455',
  email: 'info@prestijinsaat.com',
  address: 'Incirli Cad. No:18, Bakirkoy, Istanbul',
  city: 'Istanbul',
  district: 'Bakirkoy',
  workingHours: [{"day":"monday","dayTr":"Pazartesi","open":"08:00","close":"18:00"},{"day":"tuesday","dayTr":"Sali","open":"08:00","close":"18:00"},{"day":"wednesday","dayTr":"Carsamba","open":"08:00","close":"18:00"},{"day":"thursday","dayTr":"Persembe","open":"08:00","close":"18:00"},{"day":"friday","dayTr":"Cuma","open":"08:00","close":"18:00"},{"day":"saturday","dayTr":"Cumartesi","open":"08:00","close":"18:00"},{"day":"sunday","dayTr":"Pazar","open":null,"close":null}],
  socialMedia: {"instagram":"https://instagram.com/insaat-prestij"},
  photos: [],
  services: []
}
export const INSAAT_PRESTIJ_CONFIG: ThemeConfig = { 
  id: 'insaat-prestij', 
  name: 'Prestij Konut Projeleri', 
  sectorId: 'insaat', 
  plan: 'pro', 
  isDark: false, 
  
  description: 'Geleceğe değer katan yatırım amaçlı ve lüks donanımlı konut projeleri.',
  designPhilosophy: 'Zarif serif fontlar (Lora), sofistike lacivert tonları ve pürüzsüz animasyonlar.',
  performanceBudget: { maxJS: '400kb', maxLCP: '2.3s', animationLevel: 'framer-full' },
  seoSchemaType: 'LocalBusiness',
  sectorSections: ['Prestijli Konutlar', 'Yatırım', 'Gelecek Projeler', 'Örnek Daire'],

  cssVariables: { 
    '--color-bg': '#FFFFFF', 
    '--color-surface': '#F8FAFC', 
    '--color-text': '#0F172A', 
    '--color-accent': '#2C5282',
    '--color-accent-light': '#effce8',
    '--color-accent-hover': '#3b8f14',
    '--color-accent-active': '#347d12', 
    '--color-text-on-accent': '#FFFFFF', 
    '--color-border': '#E2E8F0', 
    '--font-heading': "'Lora', serif", 
    '--font-body': "'Inter', sans-serif" 
  }, 
  fonts: { 
    heading: { family: 'Lora', weights: [500], subsets: ['latin', 'latin-ext'] }, 
    body: { family: 'Inter', weights: [400], subsets: ['latin', 'latin-ext'] } 
  }, 
  globalSections: [], 
  pages: [{ 
    id: 'anasayfa', 
    slug: '/', 
    title: 'Prestij Yapı', 
    titleTr: 'Ana Sayfa',
    isHomePage: true, 
    includeInNav: true, 
    sections: [ 
      { 
        id: 'hero', 
        type: 'insaat_prestij_hero' as any, 
        variant: 'split_image', 
        order: 1, 
        required: true, 
        settings: { bgMode: 'default', paddingY: 'xl', containerWidth: 'xl', visible: true, removable: false, animation: 'fade', order: 1 }, 
        editableFields: [],
        defaultContent: { badge: 'YATIRIM', title: 'Geleceğe Değer Katan Konutlar' } 
      },
      { 
        id: 'vision', 
        type: 'insaat_prestij_vision' as any, 
        variant: 'default', 
        order: 2, 
        required: true, 
        settings: { bgMode: 'default', paddingY: 'xl', containerWidth: 'xl', visible: true, removable: true, animation: 'slide-up', order: 2 }, 
        editableFields: [],
        defaultContent: { title: 'Hedefimiz ve Vizyonumuz' } 
      },
      { 
        id: 'portfolio', 
        type: 'insaat_prestij_portfolio' as any, 
        variant: 'default', 
        order: 3, 
        required: true, 
        settings: { bgMode: 'default', paddingY: 'xl', containerWidth: 'xl', visible: true, removable: true, animation: 'slide-up', order: 3 }, 
        editableFields: [],
        defaultContent: { title: 'Projelerimiz' } 
      },
      { 
        id: 'features', 
        type: 'insaat_prestij_features' as any, 
        variant: 'default', 
        order: 4, 
        required: true, 
        settings: { bgMode: 'default', paddingY: 'xl', containerWidth: 'xl', visible: true, removable: true, animation: 'slide-up', order: 4 }, 
        editableFields: [],
        defaultContent: { title: 'Sosyal Donatılar' } 
      },
      { 
        id: 'contact', 
        type: 'insaat_prestij_contact' as any, 
        variant: 'default', 
        order: 5, 
        required: true, 
        settings: { bgMode: 'default', paddingY: 'xl', containerWidth: 'xl', visible: true, removable: false, animation: 'slide-up', order: 5 }, 
        editableFields: [],
        defaultContent: { title: 'Satış Ofisimize Bekleriz' } 
      }
    ] 
  }] 
}