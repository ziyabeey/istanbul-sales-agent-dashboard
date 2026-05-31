/**
 * @kepenk/templates — eczane-dermis | Dermis Eczane
 * Plan: growth | Poppins + Inter
 */
import type { ThemeConfig, BusinessData } from '../../../../types/section-types'
export const ECZANE_DERMIS_CSS: Record<string,string> = {
  '--color-bg':'#FFFFFF','--color-surface':'#F8FAFC','--color-surface-elevated':'#FFFFFF',
  '--color-surface-muted':'#F1F5F9','--color-text':'#0F172A','--color-text-secondary':'#475569',
  '--color-text-muted':'#94A3B8','--color-text-on-accent':'#FFFFFF','--color-accent':'#7C3AED',
  '--color-accent-hover':'#6D28D9','--color-accent-active':'#5B21B6','--color-accent-light':'#EDE9FE',
  '--color-accent-subtle':'#F5F3FF','--color-border':'#E2E8F0','--color-border-subtle':'#F1F5F9',
  '--font-heading':"'Poppins',sans-serif",'--font-body':"'Inter',sans-serif",'--radius-md':'6px','--radius-lg':'12px'
}
export const ECZANE_DERMIS_BUSINESS: BusinessData = {
  name:'Dermis Eczane',ownerName:'Ecz. Selin Dermis',sector:'eczane',slogan:'Dermokozmetik uzmanı eczaneniz',
  phone:'0216 555 66 77',phoneClean:'902165556677',whatsapp:'902165556677',email:'info@dermiseczane.com',
  address:'Bağdat Cad. No:180, Kadıköy',city:'İstanbul',district:'Kadıköy',coordinates:{lat:40.975,lng:29.06},
  workingHours:[{day:'monday',dayTr:'Pazartesi',open:'09:00',close:'18:00'},{day:'tuesday',dayTr:'Salı',open:'09:00',close:'18:00'},{day:'wednesday',dayTr:'Çarşamba',open:'09:00',close:'18:00'},{day:'thursday',dayTr:'Perşembe',open:'09:00',close:'18:00'},{day:'friday',dayTr:'Cuma',open:'09:00',close:'18:00'},{day:'saturday',dayTr:'Cumartesi',open:'10:00',close:'14:00'},{day:'sunday',dayTr:'Pazar',open:null,close:null}],
  socialMedia:{instagram:'https://instagram.com/eczane-dermis'},photos:[],
  services:[
    {id:'s1',name:'Cilt Analizi',price:'Ücretsiz',duration:'15 dk',icon:'scan',popular:true,description:'Dijital cilt analiz cihazı ile'},
    {id:'s2',name:'Dermokozmetik',price:'Değişken',duration:'Danışmanlık',icon:'sparkles',description:'Avene, La Roche-Posay, Bioderma'},
    {id:'s3',name:'Vitamin Danışmanlık',price:'Ücretsiz',duration:'10 dk',icon:'pill',description:'Kişiye özel takviye önerisi'},
    {id:'s4',name:'Reçeteli İlaç',price:'SGK',duration:'5 dk',icon:'clipboard',description:'SGK anlaşmalı'},
    {id:'s5',name:'Anne-Bebek',price:'Değişken',duration:'Danışmanlık',icon:'baby',description:'Bebek bakım ürünleri uzmanı'}
  ],team:[
    {id:'t1',name:'Ecz. Selin Dermis',role:'Kurucu Eczacı',experience:'10 yıl'},
    {id:'t2',name:'Dyt. Elif Takviye',role:'Diyetisyen',experience:'6 yıl'}
  ],
  experience:'10 yıl',rating:4.8,reviewCount:670,foundedYear:2015
}
export const ECZANE_DERMIS_CONFIG: ThemeConfig = {
  id:'eczane-dermis',name:'Dermis Eczane',sectorId:'eczane',plan:'growth',description:'Dermokozmetik uzmanı eczaneniz',
  designPhilosophy:'Dermokozmetik odaklı modern eczane. Mor, Poppins.',inspiration:['Modern TR eczane'],sectorSections:['product_catalog','skin_analysis'],
  performanceBudget:{maxJS:'250kb',maxLCP:'3.0s',animationLevel:'gsap-allowed'},
  isDark:false,cssVariables:ECZANE_DERMIS_CSS,
  fonts:{heading:{family:'Poppins',weights:[600,700],subsets:['latin-ext']},body:{family:'Inter',weights:[400,500],subsets:['latin-ext']}},
  seoSchemaType:'Pharmacy',
  globalSections:[
    {id:'global-header',type:'header',variant:'auto',order:0,required:true,position:'top',settings:{bgMode:'default',paddingY:'none',containerWidth:'xl',visible:true,order:0,removable:false,animation:'fadeUp'},defaultContent:{logo:{type:'text',text:'Dermis Eczane'},menuItems:[{label:'Hizmetler',href:'#hizmetler'},{label:'Hakkımızda',href:'#hakkimizda'},{label:'İletişim',href:'#iletisim'}],cta:{text:'Randevu Al',href:'https://wa.me/902165556677',variant:'solid'}},editableFields:[]},
    {id:'global-footer',type:'footer',variant:'auto',order:999,required:true,position:'bottom',settings:{bgMode:'surface',paddingY:'lg',containerWidth:'xl',visible:true,order:999,removable:false,animation:'fadeUp'},defaultContent:{businessName:'Dermis Eczane',description:'Kadıköy Bağdat Caddesi. Dermokozmetik uzmanı modern eczane.',copyright:'© 2025 Dermis Eczane',columns:[{title:'Hizmetler',links:[{label:'Cilt Analizi',href:'#'},{label:'Dermokozmetik',href:'#'},{label:'Vitamin Danışmanlık',href:'#'}]},{title:'Sayfalar',links:[{label:'Hakkımızda',href:'#hakkimizda'},{label:'İletişim',href:'#iletisim'}]}],contact:{phone:'0216 555 66 77',email:'info@dermiseczane.com',address:'Bağdat Cad. No:180'},social:[{platform:'instagram',url:'https://instagram.com/eczane-dermis',icon:'instagram'}],legal:[{label:'Gizlilik',href:'/gizlilik'},{label:'KVKK',href:'/kvkk'}],poweredBy:'⚡ kepenk.ai'},editableFields:[]},
    {id:'global-whatsapp',type:'whatsapp_cta',variant:'floating',order:1000,required:true,position:'floating',settings:{bgMode:'default',paddingY:'none',containerWidth:'xl',visible:true,order:1000,removable:false,animation:'fadeUp'},defaultContent:{phone:'902165556677',message:'Merhaba, Dermis Eczane hakkında bilgi almak istiyorum.'},editableFields:[]},
    {id:'global-cookie',type:'cookie_banner',variant:'bottom_bar',order:1001,required:true,position:'floating',settings:{bgMode:'surface',paddingY:'none',containerWidth:'xl',visible:true,order:1001,removable:false,animation:'fadeUp'},defaultContent:{text:'Bu site çerezleri kullanır.',acceptText:'Kabul Et',rejectText:'Reddet',detailsLink:'/gizlilik'},editableFields:[]}
  ],
  pages:[{id:'anasayfa',slug:'/',title:'Dermis Eczane — Kadıköy',titleTr:'Ana Sayfa',isHomePage:true,includeInNav:false,
    sections:[
      {id:'hero',type:'hero',variant:'auto',order:1,required:true,settings:{bgMode:'default',paddingY:'none',containerWidth:'xl',visible:true,order:1,removable:false,animation:'fadeUp'},defaultContent:{badge:'KADIKÖY',title:'Dermis Eczane',subtitle:'Dermokozmetik uzmanı eczaneniz',cta1:{text:'Randevu Al',href:'#iletisim'}},editableFields:[]},
      {id:'hakkimizda',type:'about',variant:'auto',order:2,required:false,settings:{bgMode:'default',paddingY:'lg',containerWidth:'xl',visible:true,order:2,removable:true,animation:'fadeUp'},defaultContent:{badge:'HAKKIMIZDA',title:'Biz Kimiz?',description:'Kadıköy Bağdat Caddesi. Dermokozmetik uzmanı modern eczane.'},editableFields:[]},
      {id:'istatistik',type:'stats',variant:'auto',order:3,required:false,settings:{bgMode:'accent',paddingY:'md',containerWidth:'xl',visible:true,order:3,removable:true,animation:'fadeUp'},defaultContent:{stats:[{value:'10+',label:'Yıl'},{value:'670+',label:'Müşteri'},{value:'4.8',label:'Puan'}]},editableFields:[]},
      {id:'galeri',type:'gallery',variant:'auto',order:4,required:false,settings:{bgMode:'default',paddingY:'lg',containerWidth:'xl',visible:true,order:4,removable:true,animation:'fadeUp'},defaultContent:{badge:'GALERİ',title:'Çalışmalarımız',items:[{id:'g1',url:'/placeholder.jpg'}]},editableFields:[]},
      {id:'hizmetler',type:'services',variant:'auto',order:5,required:true,settings:{bgMode:'surface',paddingY:'lg',containerWidth:'xl',visible:true,order:5,removable:false,animation:'fadeUp'},defaultContent:{badge:'HİZMETLER',title:'Hizmetlerimiz',services:[{id:'s1',name:'Hizmet',description:'Detay için arayın.',icon:'star'}]},editableFields:[]},
      {id:'iletisim',type:'contact',variant:'auto',order:6,required:true,settings:{bgMode:'surface',paddingY:'lg',containerWidth:'xl',visible:true,order:6,removable:false,animation:'fadeUp'},defaultContent:{badge:'İLETİŞİM',title:'Bize Ulaşın',whatsapp:'902165556677'},editableFields:[]}
    ]}]
}
