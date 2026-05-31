import type { ThemeConfig, BusinessData } from '../../../../types/section-types'
export const TEMIZLIK_INSAAT_BUSINESS: BusinessData = {
  name: 'Insaat Sonrasi Temizlik',
  ownerName: 'Usta Murat Insaat',
  sectorId: 'temizlik',
  slogan: 'Insaat sonrasi temizlik',
  phone: '0534 400 00 33',
  phoneClean: '905344000033',
  whatsapp: '905344000033',
  email: 'bilgi@insaattemizlik.com',
  address: 'Barbaros Mah. No:15, Atasehir, Istanbul',
  city: 'Istanbul',
  district: 'Atasehir',
  workingHours: [{"day":"monday","dayTr":"Pazartesi","open":"07:00","close":"19:00"},{"day":"tuesday","dayTr":"Sali","open":"07:00","close":"19:00"},{"day":"wednesday","dayTr":"Carsamba","open":"07:00","close":"19:00"},{"day":"thursday","dayTr":"Persembe","open":"07:00","close":"19:00"},{"day":"friday","dayTr":"Cuma","open":"07:00","close":"19:00"},{"day":"saturday","dayTr":"Cumartesi","open":"07:00","close":"19:00"},{"day":"sunday","dayTr":"Pazar","open":null,"close":null}],
  socialMedia: {"instagram":"https://instagram.com/temizlik-insaat"},
  photos: [],
  services: []
}
export const TEMIZLIK_INSAAT_CONFIG: ThemeConfig = {
  id: 'temizlik-insaat',
  name: 'İnşaat Sonrası Temizlik',
  sectorId: 'temizlik',
  plan: 'pro',
  isDark: false,
  description: 'İnşaat sonrası temizlik hizmetleri',
  designPhilosophy: 'Modern ve temiz tasarım',
  performanceBudget: { maxJS: '300kb', maxLCP: '2.0s', animationLevel: 'css-only' },
  seoSchemaType: 'LocalBusiness',
  sectorSections: ['Sıfır Daire', 'Kaba Temizlik', 'İnce Temizlik'],
  cssVariables: {
    '--color-bg': '#FFFFFF',
    '--color-surface': '#F8FAFC',
    '--color-text': '#0F172A',
    '--color-accent': '#F59E0B',
    '--color-accent-light': '#fce8eb',
    '--color-accent-hover': '#8f1427',
    '--color-accent-active': '#7d1222',
    '--color-text-on-accent': '#FFFFFF',
    '--color-border': '#E2E8F0',
    '--font-heading': "'Inter', sans-serif",
    '--font-body': "'Inter', sans-serif"
  },
  fonts: {
    heading: { family: 'Merriweather', weights: [700], subsets: ['latin', 'latin-ext'] },
    body: { family: 'Inter', weights: [400], subsets: ['latin', 'latin-ext'] }
  },
  globalSections: [],
  pages: [{
    id: 'anasayfa',
    slug: '/',
    title: 'İnşaat Sonrası Temizlik Anasayfa',
    titleTr: 'Ana Sayfa',
    isHomePage: true,
    includeInNav: false,
    sections: [
      {
        id: 'hero',
        type: 'hero' as any,
        variant: 'auto',
        order: 1,
        required: true,
        settings: { bgMode: 'default', paddingY: 'xl', containerWidth: 'xl', visible: true, removable: false, order: 1, animation: 'none' },
        editableFields: [],
        defaultContent: { badge: 'İNŞAAT SONRASI TEMIZLIK', title: 'Profesyonel İnşaat Sonrası Temizlik Hizmetleri' }
      }
    ]
  }]
}