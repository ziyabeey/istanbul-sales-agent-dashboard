import type { ThemeConfig, BusinessData } from '../../../../types/section-types'
export const INSAAT_MODERN_BUSINESS: BusinessData = {
  name: 'Modern Insaat',
  ownerName: 'Muh. Kerem Modern',
  sectorId: 'insaat',
  slogan: 'Modern mimarlik ve insaat',
  phone: '0212 500 33 44',
  phoneClean: '902125003344',
  whatsapp: '902125003344',
  email: 'bilgi@moderninsaat.com',
  address: 'Atasehir Bulv. No:22, Atasehir, Istanbul',
  city: 'Istanbul',
  district: 'Atasehir',
  workingHours: [{"day":"monday","dayTr":"Pazartesi","open":"08:00","close":"18:00"},{"day":"tuesday","dayTr":"Sali","open":"08:00","close":"18:00"},{"day":"wednesday","dayTr":"Carsamba","open":"08:00","close":"18:00"},{"day":"thursday","dayTr":"Persembe","open":"08:00","close":"18:00"},{"day":"friday","dayTr":"Cuma","open":"08:00","close":"18:00"},{"day":"saturday","dayTr":"Cumartesi","open":"08:00","close":"18:00"},{"day":"sunday","dayTr":"Pazar","open":null,"close":null}],
  socialMedia: {"instagram":"https://instagram.com/insaat-modern"},
  photos: [],
  services: []
}
export const INSAAT_MODERN_CONFIG: ThemeConfig = { 
  id: 'insaat-modern', 
  name: 'Modern Taahhüt', 
  sectorId: 'insaat', 
  plan: 'growth', 
  isDark: false, 
  
  description: 'Yeni nesil mimari, akıllı binalar ve yeşil sertifikalı projeler.',
  designPhilosophy: 'Bol beyaz alan, ferahlık hissi ve yenilikçiliği simgeleyen asimetrik çizgiler.',
  performanceBudget: { maxJS: '400kb', maxLCP: '2.2s', animationLevel: 'framer-full' },
  seoSchemaType: 'LocalBusiness',
  sectorSections: ['Akıllı Binalar', 'Yeşil Konsept', 'Mühendislik', 'Mimari Çözümler'],

  cssVariables: { 
    '--color-bg': '#FCFCFD', 
    '--color-surface': '#F1F3F5', 
    '--color-text': '#212529', 
    '--color-accent': '#F97316',
    '--color-accent-light': '#f6fce8',
    '--color-accent-hover': '#80ad1f',
    '--color-accent-active': '#739c1c', 
    '--color-text-on-accent': '#FFFFFF', 
    '--color-border': '#DEE2E6', 
    '--font-heading': "'Outfit', sans-serif", 
    '--font-body': "'Inter', sans-serif" 
  }, 
  fonts: { 
    heading: { family: 'Outfit', weights: [600], subsets: ['latin', 'latin-ext'] }, 
    body: { family: 'Inter', weights: [400], subsets: ['latin', 'latin-ext'] } 
  }, 
  globalSections: [], 
  pages: [{ 
    id: 'anasayfa', 
    slug: '/', 
    title: 'Yeni Nesil İnşaat', 
    titleTr: 'Ana Sayfa',
    isHomePage: true, 
    includeInNav: true, 
    sections: [ 
      { 
        id: 'hero', 
        type: 'insaat_modern_hero' as any, 
        variant: 'asymmetric_split', 
        order: 1, 
        required: true, 
        settings: { bgMode: 'default', paddingY: 'xl', containerWidth: 'xl', visible: true, removable: false, animation: 'slide-up', order: 1 }, 
        editableFields: [],
        defaultContent: { badge: 'TAAHHÜT', title: 'Modern Yaşam Alanları İnşa Ediyoruz' } 
      },
      { 
        id: 'about', 
        type: 'insaat_modern_about' as any, 
        variant: 'default', 
        order: 2, 
        required: true, 
        settings: { bgMode: 'default', paddingY: 'xl', containerWidth: 'xl', visible: true, removable: true, animation: 'slide-up', order: 2 }, 
        editableFields: [],
        defaultContent: { title: 'Mimari Yaklaşımımız' } 
      },
      { 
        id: 'projects', 
        type: 'insaat_modern_projects' as any, 
        variant: 'default', 
        order: 3, 
        required: true, 
        settings: { bgMode: 'default', paddingY: 'xl', containerWidth: 'xl', visible: true, removable: true, animation: 'slide-up', order: 3 }, 
        editableFields: [],
        defaultContent: { title: 'Öne Çıkan Projeler' } 
      },
      { 
        id: 'process', 
        type: 'insaat_modern_process' as any, 
        variant: 'default', 
        order: 4, 
        required: true, 
        settings: { bgMode: 'default', paddingY: 'xl', containerWidth: 'xl', visible: true, removable: true, animation: 'slide-up', order: 4 }, 
        editableFields: [],
        defaultContent: { title: 'Sıfırdan Teslime' } 
      },
      { 
        id: 'contact', 
        type: 'insaat_modern_contact' as any, 
        variant: 'default', 
        order: 5, 
        required: true, 
        settings: { bgMode: 'default', paddingY: 'xl', containerWidth: 'xl', visible: true, removable: false, animation: 'slide-up', order: 5 }, 
        editableFields: [],
        defaultContent: { title: 'Bir Projeniz Mi Var?' } 
      }
    ] 
  }] 
}