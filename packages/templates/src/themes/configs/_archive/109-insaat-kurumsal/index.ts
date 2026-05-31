import type { ThemeConfig, BusinessData } from '../../../../types/section-types'
export const INSAAT_KURUMSAL_BUSINESS: BusinessData = {
  name: 'Kurumsal Insaat',
  ownerName: 'Muh. Selim Kurumsal',
  sectorId: 'insaat',
  slogan: 'Kurumsal insaat cozumleri',
  phone: '0212 500 22 33',
  phoneClean: '902125002233',
  whatsapp: '902125002233',
  email: 'iletisim@kurumsalinsaat.com',
  address: 'Levent Mah. No:35, Besiktas, Istanbul',
  city: 'Istanbul',
  district: 'Levent',
  workingHours: [{"day":"monday","dayTr":"Pazartesi","open":"08:00","close":"18:00"},{"day":"tuesday","dayTr":"Sali","open":"08:00","close":"18:00"},{"day":"wednesday","dayTr":"Carsamba","open":"08:00","close":"18:00"},{"day":"thursday","dayTr":"Persembe","open":"08:00","close":"18:00"},{"day":"friday","dayTr":"Cuma","open":"08:00","close":"18:00"},{"day":"saturday","dayTr":"Cumartesi","open":"08:00","close":"18:00"},{"day":"sunday","dayTr":"Pazar","open":null,"close":null}],
  socialMedia: {"instagram":"https://instagram.com/insaat-kurumsal"},
  photos: [],
  services: []
}
export const INSAAT_KURUMSAL_CONFIG: ThemeConfig = { 
  id: 'insaat-kurumsal', 
  name: 'Kurumsal İnşaat A.Ş.', 
  sectorId: 'insaat', 
  plan: 'pro', 
  isDark: false, 
  
  description: 'Türkiye\'nin altyapı ve üstyapı mega projelerinde imzası olan köklü inşaat firması.',
  designPhilosophy: 'Güven veren, oturaklı ve net hatlara sahip mimari duruş. Resmi renk paleti (lacivert-beyaz).',
  performanceBudget: { maxJS: '500kb', maxLCP: '2.5s', animationLevel: 'framer-basic' },
  seoSchemaType: 'LocalBusiness',
  sectorSections: ['Taahhüt İşleri', 'Altyapı Projeleri', 'Kamu İhaleleri', 'Plan & Projelendirme'],

  cssVariables: { 
    '--color-bg': '#FFFFFF', 
    '--color-surface': '#F8FAFC', 
    '--color-text': '#0F172A', 
    '--color-accent': '#1E293B',
    '--color-accent-light': '#fcfbe8',
    '--color-accent-hover': '#8f8914',
    '--color-accent-active': '#7d7812', 
    '--color-text-on-accent': '#FFFFFF', 
    '--color-border': '#E2E8F0', 
    '--font-heading': "'Inter', sans-serif", 
    '--font-body': "'Roboto', sans-serif" 
  }, 
  fonts: { 
    heading: { family: 'Inter', weights: [700], subsets: ['latin', 'latin-ext'] }, 
    body: { family: 'Roboto', weights: [400], subsets: ['latin', 'latin-ext'] } 
  }, 
  globalSections: [], 
  pages: [{ 
    id: 'anasayfa', 
    slug: '/', 
    title: 'İnşaat A.Ş.', 
    titleTr: 'Ana Sayfa',
    isHomePage: true, 
    includeInNav: true, 
    sections: [ 
      { 
        id: 'hero', 
        type: 'insaat_kurumsal_hero' as any, 
        variant: 'fullscreen_overlay', 
        order: 1, 
        required: true, 
        settings: { bgMode: 'default', paddingY: 'none', containerWidth: 'full', visible: true, removable: false, animation: 'fade', order: 1 }, 
        editableFields: [],
        defaultContent: { badge: 'ALTYAPI & ÜSTYAPI', title: 'Türkiye\'nin Mega Projelerinde İmzamız Var' } 
      },
      { 
        id: 'about', 
        type: 'insaat_kurumsal_about' as any, 
        variant: 'default', 
        order: 2, 
        required: true, 
        settings: { bgMode: 'default', paddingY: 'xl', containerWidth: 'xl', visible: true, removable: true, animation: 'slide-up', order: 2 }, 
        editableFields: [],
        defaultContent: { title: '40 Yıllık Tecrübe' } 
      },
      { 
        id: 'services', 
        type: 'insaat_kurumsal_services' as any, 
        variant: 'default', 
        order: 3, 
        required: true, 
        settings: { bgMode: 'default', paddingY: 'xl', containerWidth: 'xl', visible: true, removable: true, animation: 'slide-up', order: 3 }, 
        editableFields: [],
        defaultContent: { title: 'Faaliyet Alanlarımız' } 
      },
      { 
        id: 'projects', 
        type: 'insaat_kurumsal_projects' as any, 
        variant: 'default', 
        order: 4, 
        required: true, 
        settings: { bgMode: 'default', paddingY: 'xl', containerWidth: 'xl', visible: true, removable: true, animation: 'slide-up', order: 4 }, 
        editableFields: [],
        defaultContent: { title: 'Tamamlanan Projeler' } 
      },
      { 
        id: 'contact', 
        type: 'insaat_kurumsal_contact' as any, 
        variant: 'default', 
        order: 5, 
        required: true, 
        settings: { bgMode: 'default', paddingY: 'xl', containerWidth: 'xl', visible: true, removable: false, animation: 'slide-up', order: 5 }, 
        editableFields: [],
        defaultContent: { title: 'Bize Ulaşın' } 
      }
    ] 
  }] 
}