/**
 * Skeleton Config Enrichment — Sprint 0.3
 * 
 * Enriches skeleton configs (<2.5KB) by adding:
 * - globalSections (header, footer, whatsapp)  
 * - At least 5 page sections
 * - Business data export
 *
 * Usage: npx tsx scripts/enrich-skeleton-configs.ts
 */

import * as fs from 'fs'
import * as path from 'path'

const CONFIGS_DIR = path.resolve(__dirname, '../packages/templates/src/themes/configs')

const SECTOR_DISPLAY: Record<string, string> = {
  mimarlik:'Mimarlık',nakliyat:'Nakliyat',organik:'Organik',organizasyon:'Organizasyon',
  ozelders:'Özel Ders',peyzaj:'Peyzaj',muzik:'Müzik',
}

const SECTOR_SERVICES: Record<string, Array<{id:string;name:string;price:string;duration:string;description:string}>> = {
  mimarlik: [
    {id:'s1',name:'Mimari Proje',price:'25.000 TL',duration:'4 hafta',description:'Anahtar teslim mimari proje çizimi.'},
    {id:'s2',name:'İç Mekan Tasarımı',price:'15.000 TL',duration:'2 hafta',description:'Yaşam alanları için fonksiyonel iç tasarım.'},
    {id:'s3',name:'3D Modelleme',price:'8.000 TL',duration:'1 hafta',description:'Detaylı 3 boyutlu modelleme ve render.'},
    {id:'s4',name:'Ruhsat Danışmanlığı',price:'5.000 TL',duration:'3 gün',description:'Belediye ve imar izinleri süreç yönetimi.'},
  ],
  nakliyat: [
    {id:'s1',name:'Evden Eve Nakliyat',price:'3.500 TL',duration:'1 gün',description:'Profesyonel ekip ile güvenli ev taşıma.'},
    {id:'s2',name:'Ofis Taşıma',price:'5.000 TL',duration:'1 gün',description:'İş yeriniz için özenli taşıma hizmeti.'},
    {id:'s3',name:'Şehirler Arası',price:'8.000 TL',duration:'2 gün',description:'Türkiye genelinde güvenli nakliyat.'},
    {id:'s4',name:'Parça Eşya',price:'500 TL',duration:'2 saat',description:'Tek parça eşya taşıma ve kurulum.'},
  ],
  organik: [
    {id:'s1',name:'Organik Sebze Paketi',price:'250 TL',duration:'Haftalık',description:'Mevsiminde organik sebze sepeti.'},
    {id:'s2',name:'Sertifikalı Yumurta',price:'60 TL',duration:'30 adet',description:'Serbest gezen tavuk yumurtası.'},
    {id:'s3',name:'Ev Yapımı Reçel',price:'120 TL',duration:'3 kavanoz',description:'Katkısız ev reçeli seti.'},
    {id:'s4',name:'Süt Ürünleri',price:'180 TL',duration:'Haftalık',description:'Taze köy sütü, yoğurt, peynir.'},
  ],
  organizasyon: [
    {id:'s1',name:'Doğum Günü',price:'5.000 TL',duration:'4 saat',description:'Kişiye özel konsept doğum günü organizasyonu.'},
    {id:'s2',name:'Kurumsal Etkinlik',price:'25.000 TL',duration:'1 gün',description:'Firma kokteylleri, lansman ve gala.'},
    {id:'s3',name:'Nişan & Düğün',price:'50.000 TL',duration:'2 gün',description:'A\'dan Z\'ye düğün planlama.'},
    {id:'s4',name:'Konser',price:'100.000 TL',duration:'1 gece',description:'Sahne, ses ve ışık kurulumu dahil.'},
  ],
  ozelders: [
    {id:'s1',name:'Matematik',price:'500 TL',duration:'4 ders',description:'Bireysel matematik eğitimi.'},
    {id:'s2',name:'İngilizce',price:'600 TL',duration:'4 ders',description:'Konuşma ağırlıklı İngilizce eğitimi.'},
    {id:'s3',name:'Fen Bilimleri',price:'500 TL',duration:'4 ders',description:'Fizik, kimya, biyoloji dersleri.'},
    {id:'s4',name:'YKS Hazırlık',price:'800 TL',duration:'Aylık',description:'Sınav odaklı konu anlatımı ve soru çözümü.'},
  ],
  peyzaj: [
    {id:'s1',name:'Bahçe Tasarımı',price:'15.000 TL',duration:'1 hafta',description:'Proje dahil bahçe tasarımı.'},
    {id:'s2',name:'Çim Serme',price:'80 TL/m²',duration:'2 gün',description:'Rulo çim veya tohumla yeşil alan.'},
    {id:'s3',name:'Otomatik Sulama',price:'5.000 TL',duration:'3 gün',description:'Akıllı sulama sistemi kurulumu.'},
    {id:'s4',name:'Ağaç Budama',price:'500 TL',duration:'Yarım gün',description:'Profesyonel ağaç bakım ve budama.'},
  ],
  muzik: [
    {id:'s1',name:'Gitar Dersi',price:'400 TL',duration:'4 ders',description:'Klasik ve akustik gitar eğitimi.'},
    {id:'s2',name:'Piyano Dersi',price:'500 TL',duration:'4 ders',description:'Her seviye piyano eğitimi.'},
    {id:'s3',name:'Ses Eğitimi',price:'600 TL',duration:'4 ders',description:'Profesyonel vokal koçluğu.'},
    {id:'s4',name:'Enstrüman Tamiri',price:'200 TL',duration:'1-3 gün',description:'Her türlü enstrüman bakım ve onarım.'},
  ],
}

function generateGlobalSections(businessName: string, phone: string, whatsapp: string): string {
  return `  globalSections: [
    {
      id: 'global-header',
      type: 'header',
      variant: 'auto',
      order: 0,
      required: true,
      position: 'top' as const,
      settings: { bgMode: 'default' as const, paddingY: 'none' as const, containerWidth: 'full' as const, visible: true, order: 0, removable: false, animation: 'none' as const },
      defaultContent: {
        logo: { type: 'text', text: '${businessName}' },
        menuItems: [{ label: 'Hizmetler', href: '#hizmetler' }, { label: 'İletişim', href: '#iletisim' }],
        cta: { text: 'Ara', href: 'tel:${phone}', variant: 'solid' },
      },
      editableFields: [],
    },
    {
      id: 'global-footer',
      type: 'footer',
      variant: 'auto',
      order: 999,
      required: true,
      position: 'bottom' as const,
      settings: { bgMode: 'dark' as const, paddingY: 'sm' as const, containerWidth: 'full' as const, visible: true, order: 999, removable: false, animation: 'none' as const },
      defaultContent: {
        businessName: '${businessName}',
        copyright: '© 2026 ${businessName}',
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
      position: 'floating' as const,
      settings: { bgMode: 'default' as const, paddingY: 'none' as const, containerWidth: 'full' as const, visible: true, order: 1000, removable: false, animation: 'none' as const },
      defaultContent: { phone: '${whatsapp}', message: 'Merhaba, bilgi almak istiyorum.' },
      editableFields: [],
    },
  ],`
}

function generatePageSections(themeId: string, sector: string, services: typeof SECTOR_SERVICES['mimarlik']): string {
  const serviceDefs = services.map(s => 
    `              { id: '${s.id}', name: '${s.name}', price: '${s.price}', duration: '${s.duration}', description: '${s.description}' }`
  ).join(',\n')

  return `      sections: [
        {
          id: 'hero',
          type: 'hero',
          variant: 'auto',
          order: 1,
          required: true,
          settings: { bgMode: 'surface' as const, paddingY: 'lg' as const, containerWidth: 'full' as const, visible: true, order: 1, removable: false, animation: 'none' as const },
          defaultContent: { badge: '${SECTOR_DISPLAY[sector] || sector}', title: '${themeId}', subtitle: 'Profesyonel hizmet, güvenilir kalite.' },
          editableFields: [],
        },
        {
          id: 'hizmetler',
          type: 'services',
          variant: 'auto',
          order: 2,
          required: true,
          settings: { bgMode: 'default' as const, paddingY: 'lg' as const, containerWidth: 'full' as const, visible: true, order: 2, removable: false, animation: 'none' as const },
          defaultContent: {
            badge: 'Hizmetler',
            title: 'Neler Yapıyoruz?',
            services: [
${serviceDefs}
            ],
          },
          editableFields: [],
        },
        {
          id: 'hakkimizda',
          type: 'about',
          variant: 'auto',
          order: 3,
          required: false,
          settings: { bgMode: 'surface' as const, paddingY: 'lg' as const, containerWidth: 'full' as const, visible: true, order: 3, removable: true, animation: 'none' as const },
          defaultContent: { badge: 'Hakkımızda', title: 'Biz Kimiz?', text: 'Yılların deneyimi ile sektörün öncüsüyüz.' },
          editableFields: [],
        },
        {
          id: 'referanslar',
          type: 'testimonials',
          variant: 'auto',
          order: 4,
          required: false,
          settings: { bgMode: 'default' as const, paddingY: 'lg' as const, containerWidth: 'full' as const, visible: true, order: 4, removable: true, animation: 'none' as const },
          defaultContent: { badge: 'Müşteri Yorumları', title: 'Ne Dediler?', testimonials: [{ name: 'Ahmet Y.', text: 'Harika hizmet, teşekkürler!', rating: 5 }, { name: 'Elif K.', text: 'Çok profesyonel bir ekip.', rating: 5 }] },
          editableFields: [],
        },
        {
          id: 'iletisim',
          type: 'contact',
          variant: 'auto',
          order: 5,
          required: true,
          settings: { bgMode: 'surface' as const, paddingY: 'lg' as const, containerWidth: 'full' as const, visible: true, order: 5, removable: false, animation: 'none' as const },
          defaultContent: { badge: 'İletişim', title: 'Bize Ulaşın', submitText: 'Gönder' },
          editableFields: [],
        },
      ]`
}

// ─── MAIN ───
const configFiles = fs.readdirSync(CONFIGS_DIR)
  .filter(f => f.endsWith('-config.ts'))
  .filter(f => {
    const sz = fs.statSync(path.join(CONFIGS_DIR, f)).size
    return sz < 2500
  })
  .sort()

console.log(`Found ${configFiles.length} skeleton configs to enrich`)

let enrichedCount = 0

for (const file of configFiles) {
  const filePath = path.join(CONFIGS_DIR, file)
  let content = fs.readFileSync(filePath, 'utf-8')
  
  const themeId = file.replace('-config.ts', '')
  const sector = themeId.split('-')[0]
  
  // Extract name from config
  const nameMatch = content.match(/name:\s*'([^']+)'/)
  const businessName = nameMatch?.[1] || themeId.split('-').map(w => w[0].toUpperCase() + w.slice(1)).join(' ')
  
  const services = SECTOR_SERVICES[sector] || SECTOR_SERVICES.mimarlik
  
  // 1. Replace empty globalSections
  if (content.includes('globalSections: []')) {
    const gsText = generateGlobalSections(businessName, '0532 000 00 00', '905320000000')
    content = content.replace('globalSections: [],', gsText)
  }
  
  // 2. Replace minimal page sections (single hero-only section)
  // Check if page has only 1 section
  const sectionMatches = content.match(/type:\s*'[^']+'/g)
  if (sectionMatches && sectionMatches.length <= 3) { // header/footer/hero = 3 max
    const pagesSectionPattern = /sections:\s*\[[\s\S]*?\]\s*\n\s*\}/
    const pagesMatch = content.match(pagesSectionPattern)
    if (pagesMatch) {
      const newSections = generatePageSections(themeId, sector, services)
      content = content.replace(pagesSectionPattern, newSections + '\n    }')
    }
  }
  
  // 3. Add business data export if missing
  const hasBusinessExport = content.includes('_BUSINESS')
  if (!hasBusinessExport) {
    const constName = themeId.toUpperCase().replace(/-/g, '_')
    const businessExport = `
export const ${constName}_BUSINESS = {
  name: '${businessName.replace(/'/g, "\\'")}',
  ownerName: '${businessName.replace(/'/g, "\\'")} Sahibi',
  sector: '${sector}',
  slogan: 'Profesyonel hizmet, güvenilir kalite',
  phone: '0532 000 00 00',
  phoneClean: '905320000000',
  whatsapp: '905320000000',
  email: 'info@${themeId}.com',
  address: 'İstanbul',
  city: 'İstanbul',
  district: 'Kadıköy',
  socialMedia: { instagram: 'https://instagram.com/${themeId}' },
  photos: [],
  services: ${JSON.stringify(services)},
  workingHours: [
    { day: 'Pazartesi', open: '09:00', close: '18:00', isOpen: true },
    { day: 'Salı', open: '09:00', close: '18:00', isOpen: true },
    { day: 'Çarşamba', open: '09:00', close: '18:00', isOpen: true },
    { day: 'Perşembe', open: '09:00', close: '18:00', isOpen: true },
    { day: 'Cuma', open: '09:00', close: '18:00', isOpen: true },
    { day: 'Cumartesi', open: '10:00', close: '16:00', isOpen: true },
    { day: 'Pazar', open: null, close: null, isOpen: false },
  ],
} as unknown as BusinessData
`
    // Add BusinessData import if missing
    if (!content.includes('BusinessData')) {
      content = content.replace(
        "import type { ThemeConfig }",
        "import type { ThemeConfig, BusinessData }"
      )
    }
    
    // Insert business export before the config export
    const configExportIdx = content.indexOf(`export const ${constName}_CONFIG`)
    if (configExportIdx > 0) {
      content = content.slice(0, configExportIdx) + businessExport + '\n' + content.slice(configExportIdx)
    }
  }
  
  fs.writeFileSync(filePath, content, 'utf-8')
  enrichedCount++
  console.log(`  ✅ ${themeId} (${sector})`)
}

console.log(`\nEnriched ${enrichedCount} skeleton configs`)
