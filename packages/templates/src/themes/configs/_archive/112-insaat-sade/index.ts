import type { ThemeConfig, BusinessData } from '../../../../types/section-types'
export const INSAAT_SADE_BUSINESS: BusinessData = {
  name: 'Elite Insaat',
  ownerName: 'Muh. Baris Elite',
  sectorId: 'insaat',
  slogan: 'Elite konut projeleri',
  phone: '0212 500 55 66',
  phoneClean: '902125005566',
  whatsapp: '902125005566',
  email: 'destek@eliteinsaat.com',
  address: 'Istinye Mah. No:40, Sariyer, Istanbul',
  city: 'Istanbul',
  district: 'Sariyer',
  workingHours: [{"day":"monday","dayTr":"Pazartesi","open":"08:00","close":"18:00"},{"day":"tuesday","dayTr":"Sali","open":"08:00","close":"18:00"},{"day":"wednesday","dayTr":"Carsamba","open":"08:00","close":"18:00"},{"day":"thursday","dayTr":"Persembe","open":"08:00","close":"18:00"},{"day":"friday","dayTr":"Cuma","open":"08:00","close":"18:00"},{"day":"saturday","dayTr":"Cumartesi","open":"08:00","close":"18:00"},{"day":"sunday","dayTr":"Pazar","open":null,"close":null}],
  socialMedia: {"instagram":"https://instagram.com/insaat-sade"},
  photos: [],
  services: []
}
export const INSAAT_SADE_CONFIG: ThemeConfig = { 
  id: 'insaat-sade', 
  name: 'Müteahhit Firması', 
  sectorId: 'insaat', 
  plan: 'free', 
  isDark: false, 
  
  description: 'Temelden çatıya güvenli yapı hizmetleri sunan ulaşılabilir inşaat çözümü.',
  designPhilosophy: 'Hızlı, net bilgiye dayalı ve standartlaşmayı ön plana alan okunaklı minimalist yapı.',
  performanceBudget: { maxJS: '300kb', maxLCP: '2.0s', animationLevel: 'css-only' },
  seoSchemaType: 'LocalBusiness',
  sectorSections: ['Kentsel Dönüşüm', 'İnşaat Taahhüt', 'Kat Karşılığı'],

  cssVariables: { 
    '--color-bg': '#FFFFFF', 
    '--color-surface': '#F8FAFC', 
    '--color-text': '#0F172A', 
    '--color-accent': '#39ac3f',
    '--color-accent-light': '#e8fce9',
    '--color-accent-hover': '#2f8e34',
    '--color-accent-active': '#2a7e2e', 
    '--color-text-on-accent': '#FFFFFF', 
    '--color-border': '#E2E8F0', 
    '--font-heading': "'Inter', sans-serif", 
    '--font-body': "'Inter', sans-serif" 
  }, 
  fonts: { 
    heading: { family: 'Inter', weights: [700], subsets: ['latin', 'latin-ext'] }, 
    body: { family: 'Inter', weights: [400], subsets: ['latin', 'latin-ext'] } 
  }, 
  globalSections: [], 
  pages: [{ 
    id: 'anasayfa', 
    slug: '/', 
    title: 'Yapı İnşaat', 
    titleTr: 'Ana Sayfa',
    isHomePage: true, 
    includeInNav: true, 
    sections: [ 
      { 
        id: 'hero', 
        type: 'insaat_sade_hero' as any, 
        variant: 'split_image', 
        order: 1, 
        required: true, 
        settings: { bgMode: 'default', paddingY: 'xl', containerWidth: 'xl', visible: true, removable: false, animation: 'none', order: 1 }, 
        editableFields: [],
        defaultContent: { badge: 'GÜVENLİ YAPILAR', title: 'Temelden Çatıya İnşaat' } 
      },
      { 
        id: 'services', 
        type: 'insaat_sade_services' as any, 
        variant: 'default', 
        order: 2, 
        required: true, 
        settings: { bgMode: 'default', paddingY: 'xl', containerWidth: 'xl', visible: true, removable: true, animation: 'none', order: 2 }, 
        editableFields: [],
        defaultContent: { title: 'Hizmetlerimiz' } 
      },
      { 
        id: 'trust', 
        type: 'insaat_sade_trust' as any, 
        variant: 'default', 
        order: 3, 
        required: true, 
        settings: { bgMode: 'default', paddingY: 'xl', containerWidth: 'xl', visible: true, removable: true, animation: 'none', order: 3 }, 
        editableFields: [],
        defaultContent: { title: 'Neden Biz?' } 
      },
      { 
        id: 'faq', 
        type: 'insaat_sade_faq' as any, 
        variant: 'default', 
        order: 4, 
        required: true, 
        settings: { bgMode: 'default', paddingY: 'xl', containerWidth: 'xl', visible: true, removable: true, animation: 'none', order: 4 }, 
        editableFields: [],
        defaultContent: { title: 'Sıkça Sorulan Sorular' } 
      },
      { 
        id: 'contact', 
        type: 'insaat_sade_contact' as any, 
        variant: 'default', 
        order: 5, 
        required: true, 
        settings: { bgMode: 'default', paddingY: 'xl', containerWidth: 'xl', visible: true, removable: false, animation: 'none', order: 5 }, 
        editableFields: [],
        defaultContent: { title: 'İletişim' } 
      }
    ] 
  }] 
}