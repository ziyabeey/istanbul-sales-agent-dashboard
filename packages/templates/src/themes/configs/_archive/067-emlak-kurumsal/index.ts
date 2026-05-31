/**
 * @kepenk/templates — emlak-kurumsal | CommercialPoint
 * Plan: enterprise | Space Grotesk + Inter
 */
import type { ThemeConfig, BusinessData } from '../../../../types/section-types'
export const EMLAK_KURUMSAL_CSS: Record<string,string> = {
  '--color-bg':'#FFFFFF','--color-surface':'#F8FAFC','--color-surface-elevated':'#FFFFFF',
  '--color-surface-muted':'#F1F5F9','--color-text':'#0F172A','--color-text-secondary':'#475569',
  '--color-text-muted':'#94A3B8','--color-text-on-accent':'#0C1222','--color-accent':'#10B981',
  '--color-accent-hover':'#34D399','--color-accent-active':'#059669','--color-accent-light':'#0A1A14',
  '--color-accent-subtle':'#081210','--color-border':'#E2E8F0','--color-border-subtle':'#F1F5F9',
  '--font-heading':"'Space Grotesk',sans-serif",'--font-body':"'Inter',sans-serif",'--radius-md':'6px','--radius-lg':'12px'
}
export const EMLAK_KURUMSAL_BUSINESS: BusinessData = {
  name:'CommercialPoint',ownerName:'CEO Baran Ticari',sector:'emlak',slogan:'Ticari gayrimenkulde stratejik çözümler',
  phone:'0212 777 88 99',phoneClean:'902127778899',whatsapp:'902127778899',email:'info@commercialpoint.com.tr',
  address:'Maslak Mah. AOS No:55, Sarıyer',city:'İstanbul',district:'Sarıyer',coordinates:{lat:41.109,lng:29.021},
  workingHours:[{day:'monday',dayTr:'Pazartesi',open:'09:00',close:'18:00'},{day:'tuesday',dayTr:'Salı',open:'09:00',close:'18:00'},{day:'wednesday',dayTr:'Çarşamba',open:'09:00',close:'18:00'},{day:'thursday',dayTr:'Perşembe',open:'09:00',close:'18:00'},{day:'friday',dayTr:'Cuma',open:'09:00',close:'18:00'},{day:'saturday',dayTr:'Cumartesi',open:'10:00',close:'14:00'},{day:'sunday',dayTr:'Pazar',open:null,close:null}],
  socialMedia:{instagram:'https://instagram.com/emlak-kurumsal'},photos:[],
  services:[
    {id:'s1',name:'Fabrika & Depo',price:'Teklif Al',duration:'Yıllık',icon:'warehouse',popular:true,description:'OSB gayrimenkulleri'},
    {id:'s2',name:'Plaza Kat',price:'$20-80/m²',duration:'Yıllık',icon:'building',description:'A+ iş merkezleri'},
    {id:'s3',name:'AVM Mağaza',price:'Teklif Al',duration:'Yıllık',icon:'shopping-bag',description:'AVM mağaza kiralama'},
    {id:'s4',name:'Otel Yatırım',price:'$5M+',duration:'Proje',icon:'bed',description:'Butik otel projeleri'},
    {id:'s5',name:'Portföy Yönetimi',price:'%5',duration:'Yıllık',icon:'briefcase',description:'Gayrimenkul portföy yönetimi'}
  ],team:[
    {id:'t1',name:'Baran Ticari',role:'CEO',experience:'14 yıl'},
    {id:'t2',name:'Elif AVM',role:'Perakende Direktörü',experience:'10 yıl'},
    {id:'t3',name:'Murat OSB',role:'Sanayi Gayrimenkul',experience:'12 yıl'}
  ],
  experience:'14 yıl',rating:4.8,reviewCount:230,foundedYear:2011
}
export const EMLAK_KURUMSAL_CONFIG: ThemeConfig = {
  id:'emlak-kurumsal',name:'CommercialPoint',sectorId:'emlak',plan:'enterprise',description:'Ticari gayrimenkulde stratejik çözümler',
  designPhilosophy:'Kurumsal ticari gayrimenkul. Navy-yeşil, 3D parallax portfolio.',inspiration:['Modern TR emlak'],sectorSections:['property_portfolio','investment_dashboard'],
  performanceBudget:{maxJS:'250kb',maxLCP:'3.0s',animationLevel:'gsap-parallax'},
  isDark:true,cssVariables:EMLAK_KURUMSAL_CSS,
  fonts:{heading:{family:'Space Grotesk',weights:[500,700],subsets:['latin-ext']},body:{family:'Inter',weights:[300,400],subsets:['latin-ext']}},
  seoSchemaType:'RealEstateAgent',
  globalSections:[
    {id:'global-header',type:'header',variant:'auto',order:0,required:true,position:'top',settings:{bgMode:'default',paddingY:'none',containerWidth:'xl',visible:true,order:0,removable:false,animation:'fadeUp'},defaultContent:{logo:{type:'text',text:'CommercialPoint'},menuItems:[{label:'Hizmetler',href:'#hizmetler'},{label:'Hakkımızda',href:'#hakkimizda'},{label:'İletişim',href:'#iletisim'}],cta:{text:'Teklif İste',href:'https://wa.me/902127778899',variant:'solid'}},editableFields:[]},
    {id:'global-footer',type:'footer',variant:'auto',order:999,required:true,position:'bottom',settings:{bgMode:'surface',paddingY:'lg',containerWidth:'xl',visible:true,order:999,removable:false,animation:'fadeUp'},defaultContent:{businessName:'CommercialPoint',description:'Maslak merkezli ticari gayrimenkul danışmanlığı. Fabrika, plaza, AVM.',copyright:'© 2025 CommercialPoint',columns:[{title:'Hizmetler',links:[{label:'Fabrika & Depo',href:'#'},{label:'Plaza Kat',href:'#'},{label:'AVM Mağaza',href:'#'}]},{title:'Sayfalar',links:[{label:'Hakkımızda',href:'#hakkimizda'},{label:'İletişim',href:'#iletisim'}]}],contact:{phone:'0212 777 88 99',email:'info@commercialpoint.com.tr',address:'Maslak Mah. AOS No:55'},social:[{platform:'instagram',url:'https://instagram.com/emlak-kurumsal',icon:'instagram'}],legal:[{label:'Gizlilik',href:'/gizlilik'},{label:'KVKK',href:'/kvkk'}],poweredBy:'⚡ kepenk.ai'},editableFields:[]},
    {id:'global-whatsapp',type:'whatsapp_cta',variant:'floating',order:1000,required:true,position:'floating',settings:{bgMode:'default',paddingY:'none',containerWidth:'xl',visible:true,order:1000,removable:false,animation:'fadeUp'},defaultContent:{phone:'902127778899',message:'Merhaba, CommercialPoint hakkında bilgi almak istiyorum.'},editableFields:[]},
    {id:'global-cookie',type:'cookie_banner',variant:'bottom_bar',order:1001,required:true,position:'floating',settings:{bgMode:'surface',paddingY:'none',containerWidth:'xl',visible:true,order:1001,removable:false,animation:'fadeUp'},defaultContent:{text:'Bu site çerezleri kullanır.',acceptText:'Kabul Et',rejectText:'Reddet',detailsLink:'/gizlilik'},editableFields:[]}
  ],
  pages:[{id:'anasayfa',slug:'/',title:'CommercialPoint — Sarıyer',titleTr:'Ana Sayfa',isHomePage:true,includeInNav:false,
    sections:[
      {id:'hero',type:'hero',variant:'auto',order:1,required:true,settings:{bgMode:'default',paddingY:'none',containerWidth:'xl',visible:true,order:1,removable:false,animation:'parallax3d'},defaultContent:{badge:'SARIYER',title:'CommercialPoint',subtitle:'Ticari gayrimenkulde stratejik çözümler',cta1:{text:'Teklif İste',href:'#iletisim'}},editableFields:[]},
      {id:'hakkimizda',type:'about',variant:'auto',order:2,required:false,settings:{bgMode:'default',paddingY:'lg',containerWidth:'xl',visible:true,order:2,removable:true,animation:'fadeUp'},defaultContent:{badge:'HAKKIMIZDA',title:'Biz Kimiz?',description:'Maslak merkezli ticari gayrimenkul danışmanlığı. Fabrika, plaza, AVM.'},editableFields:[]},
      {id:'istatistik',type:'stats',variant:'auto',order:3,required:false,settings:{bgMode:'accent',paddingY:'md',containerWidth:'xl',visible:true,order:3,removable:true,animation:'fadeUp'},defaultContent:{stats:[{value:'14+',label:'Yıl'},{value:'230+',label:'Müşteri'},{value:'4.8',label:'Puan'}]},editableFields:[]},
      {id:'galeri',type:'gallery',variant:'auto',order:4,required:false,settings:{bgMode:'default',paddingY:'lg',containerWidth:'xl',visible:true,order:4,removable:true,animation:'fadeUp'},defaultContent:{badge:'GALERİ',title:'Çalışmalarımız',items:[{id:'g1',url:'/placeholder.jpg'}]},editableFields:[]},
      {id:'hizmetler',type:'services',variant:'auto',order:5,required:true,settings:{bgMode:'surface',paddingY:'lg',containerWidth:'xl',visible:true,order:5,removable:false,animation:'fadeUp'},defaultContent:{badge:'HİZMETLER',title:'Hizmetlerimiz',services:[{id:'s1',name:'Hizmet',description:'Detay için arayın.',icon:'star'}]},editableFields:[]},
      {id:'iletisim',type:'contact',variant:'auto',order:6,required:true,settings:{bgMode:'surface',paddingY:'lg',containerWidth:'xl',visible:true,order:6,removable:false,animation:'fadeUp'},defaultContent:{badge:'İLETİŞİM',title:'Bize Ulaşın',whatsapp:'902127778899'},editableFields:[]}
    ]}]
}
