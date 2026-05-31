/**
 * @kepenk/templates — eczane-smart | SmartPharma
 * Plan: enterprise | Space Grotesk + Inter
 */
import type { ThemeConfig, BusinessData } from '../../../../types/section-types'
export const ECZANE_SMART_CSS: Record<string,string> = {
  '--color-bg':'#FCFCFD','--color-surface':'#F1F3F5','--color-surface-elevated':'#FFFFFF',
  '--color-surface-muted':'#E9ECEF','--color-text':'#212529','--color-text-secondary':'#495057',
  '--color-text-muted':'#868E96','--color-text-on-accent':'#0A0A14','--color-accent':'#6366F1',
  '--color-accent-hover':'#818CF8','--color-accent-active':'#4F46E5','--color-accent-light':'#0F0F25',
  '--color-accent-subtle':'#0C0C1C','--color-border':'#DEE2E6','--color-border-subtle':'#F1F3F5',
  '--font-heading':"'Space Grotesk',sans-serif",'--font-body':"'Inter',sans-serif",'--radius-md':'8px','--radius-lg':'16px'
}
export const ECZANE_SMART_BUSINESS: BusinessData = {
  name:'SmartPharma',ownerName:'Ecz. Dr. Can Dijital',sector:'eczane',slogan:'Dijital sağlık ve akıllı eczane deneyimi',
  phone:'0850 999 00 11',phoneClean:'908509990011',whatsapp:'908509990011',email:'info@smartpharma.com.tr',
  address:'Maslak Mah. Ahi Evran No:6, Sarıyer',city:'İstanbul',district:'Sarıyer',coordinates:{lat:41.109,lng:29.021},
  workingHours:[{day:'monday',dayTr:'Pazartesi',open:'09:00',close:'18:00'},{day:'tuesday',dayTr:'Salı',open:'09:00',close:'18:00'},{day:'wednesday',dayTr:'Çarşamba',open:'09:00',close:'18:00'},{day:'thursday',dayTr:'Perşembe',open:'09:00',close:'18:00'},{day:'friday',dayTr:'Cuma',open:'09:00',close:'18:00'},{day:'saturday',dayTr:'Cumartesi',open:'10:00',close:'14:00'},{day:'sunday',dayTr:'Pazar',open:null,close:null}],
  socialMedia:{instagram:'https://instagram.com/eczane-smart'},photos:[],
  services:[
    {id:'s1',name:'Online Reçete',price:'SGK',duration:'15 dk',icon:'monitor',popular:true,description:'E-reçete ile online sipariş'},
    {id:'s2',name:'Sağlık Takip',price:'Ücretsiz',duration:'Sürekli',icon:'activity',description:'Akıllı bileklik entegrasyonu'},
    {id:'s3',name:'Drone Teslimat',price:'₺30',duration:'15 dk',icon:'send',description:'15 dk içinde kapınızda'},
    {id:'s4',name:'Genetik Test',price:'₺2.000',duration:'2 hafta',icon:'dna',description:'Kişiye özel vitamin profili'},
    {id:'s5',name:'Tele-Eczacı',price:'Ücretsiz',duration:'7/24',icon:'video',description:'Video görüşmeyle eczacı desteği'}
  ],team:[
    {id:'t1',name:'Ecz. Dr. Can Dijital',role:'Kurucu & CTO',experience:'4 yıl'},
    {id:'t2',name:'Ecz. Merve AI',role:'Pharma Teknolojist',experience:'3 yıl'}
  ],
  experience:'4 yıl',rating:4.8,reviewCount:320,foundedYear:2021
}
export const ECZANE_SMART_CONFIG: ThemeConfig = {
  id:'eczane-smart',name:'SmartPharma',sectorId:'eczane',plan:'enterprise',description:'Dijital sağlık ve akıllı eczane deneyimi',
  designPhilosophy:'Futuristik akıllı eczane. Koyu mor-mavi, Space Grotesk. 3D parallax.',inspiration:['Modern TR eczane'],sectorSections:['digital_health','product_catalog'],
  performanceBudget:{maxJS:'250kb',maxLCP:'3.0s',animationLevel:'gsap-parallax'},
  isDark:true,cssVariables:ECZANE_SMART_CSS,
  fonts:{heading:{family:'Space Grotesk',weights:[500,700],subsets:['latin-ext']},body:{family:'Inter',weights:[300,400],subsets:['latin-ext']}},
  seoSchemaType:'Pharmacy',
  globalSections:[
    {id:'global-header',type:'header',variant:'auto',order:0,required:true,position:'top',settings:{bgMode:'default',paddingY:'none',containerWidth:'xl',visible:true,order:0,removable:false,animation:'fadeUp'},defaultContent:{logo:{type:'text',text:'SmartPharma'},menuItems:[{label:'Hizmetler',href:'#hizmetler'},{label:'Hakkımızda',href:'#hakkimizda'},{label:'İletişim',href:'#iletisim'}],cta:{text:'Uygulama İndir',href:'https://wa.me/908509990011',variant:'solid'}},editableFields:[]},
    {id:'global-footer',type:'footer',variant:'auto',order:999,required:true,position:'bottom',settings:{bgMode:'surface',paddingY:'lg',containerWidth:'xl',visible:true,order:999,removable:false,animation:'fadeUp'},defaultContent:{businessName:'SmartPharma',description:'Maslak merkezli, yapay zeka destekli akıllı eczane platformu.',copyright:'© 2025 SmartPharma',columns:[{title:'Hizmetler',links:[{label:'Online Reçete',href:'#'},{label:'Sağlık Takip',href:'#'},{label:'Drone Teslimat',href:'#'}]},{title:'Sayfalar',links:[{label:'Hakkımızda',href:'#hakkimizda'},{label:'İletişim',href:'#iletisim'}]}],contact:{phone:'0850 999 00 11',email:'info@smartpharma.com.tr',address:'Maslak Mah. Ahi Evran No:6'},social:[{platform:'instagram',url:'https://instagram.com/eczane-smart',icon:'instagram'}],legal:[{label:'Gizlilik',href:'/gizlilik'},{label:'KVKK',href:'/kvkk'}],poweredBy:'⚡ kepenk.ai'},editableFields:[]},
    {id:'global-whatsapp',type:'whatsapp_cta',variant:'floating',order:1000,required:true,position:'floating',settings:{bgMode:'default',paddingY:'none',containerWidth:'xl',visible:true,order:1000,removable:false,animation:'fadeUp'},defaultContent:{phone:'908509990011',message:'Merhaba, SmartPharma hakkında bilgi almak istiyorum.'},editableFields:[]},
    {id:'global-cookie',type:'cookie_banner',variant:'bottom_bar',order:1001,required:true,position:'floating',settings:{bgMode:'surface',paddingY:'none',containerWidth:'xl',visible:true,order:1001,removable:false,animation:'fadeUp'},defaultContent:{text:'Bu site çerezleri kullanır.',acceptText:'Kabul Et',rejectText:'Reddet',detailsLink:'/gizlilik'},editableFields:[]}
  ],
  pages:[{id:'anasayfa',slug:'/',title:'SmartPharma — Sarıyer',titleTr:'Ana Sayfa',isHomePage:true,includeInNav:false,
    sections:[
      {id:'hero',type:'hero',variant:'auto',order:1,required:true,settings:{bgMode:'default',paddingY:'none',containerWidth:'xl',visible:true,order:1,removable:false,animation:'parallax3d'},defaultContent:{badge:'SARIYER',title:'SmartPharma',subtitle:'Dijital sağlık ve akıllı eczane deneyimi',cta1:{text:'Uygulama İndir',href:'#iletisim'}},editableFields:[]},
      {id:'hakkimizda',type:'about',variant:'auto',order:2,required:false,settings:{bgMode:'default',paddingY:'lg',containerWidth:'xl',visible:true,order:2,removable:true,animation:'fadeUp'},defaultContent:{badge:'HAKKIMIZDA',title:'Biz Kimiz?',description:'Maslak merkezli, yapay zeka destekli akıllı eczane platformu.'},editableFields:[]},
      {id:'istatistik',type:'stats',variant:'auto',order:3,required:false,settings:{bgMode:'accent',paddingY:'md',containerWidth:'xl',visible:true,order:3,removable:true,animation:'fadeUp'},defaultContent:{stats:[{value:'4+',label:'Yıl'},{value:'320+',label:'Müşteri'},{value:'4.8',label:'Puan'}]},editableFields:[]},
      {id:'galeri',type:'gallery',variant:'auto',order:4,required:false,settings:{bgMode:'default',paddingY:'lg',containerWidth:'xl',visible:true,order:4,removable:true,animation:'fadeUp'},defaultContent:{badge:'GALERİ',title:'Çalışmalarımız',items:[{id:'g1',url:'/placeholder.jpg'}]},editableFields:[]},
      {id:'hizmetler',type:'services',variant:'auto',order:5,required:true,settings:{bgMode:'surface',paddingY:'lg',containerWidth:'xl',visible:true,order:5,removable:false,animation:'fadeUp'},defaultContent:{badge:'HİZMETLER',title:'Hizmetlerimiz',services:[{id:'s1',name:'Hizmet',description:'Detay için arayın.',icon:'star'}]},editableFields:[]},
      {id:'iletisim',type:'contact',variant:'auto',order:6,required:true,settings:{bgMode:'surface',paddingY:'lg',containerWidth:'xl',visible:true,order:6,removable:false,animation:'fadeUp'},defaultContent:{badge:'İLETİŞİM',title:'Bize Ulaşın',whatsapp:'908509990011'},editableFields:[]}
    ]}]
}
