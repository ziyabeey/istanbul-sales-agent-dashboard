/**
 * @kepenk/templates — elektrikci-acil | Acil Elektrik 7/24
 * Plan: free | Roboto + Roboto
 */
import type { ThemeConfig, BusinessData } from '../../../../types/section-types'
export const ELEKTRIKCI_ACIL_CSS: Record<string,string> = {
  '--color-bg':'#0F172A','--color-surface':'#1E293B','--color-surface-elevated':'#334155',
  '--color-surface-muted':'#0B1120','--color-text':'#F8FAFC','--color-text-secondary':'#94A3B8',
  '--color-text-muted':'#475569','--color-text-on-accent':'#1C1917','--color-accent':'#F59E0B',
  '--color-accent-hover':'#D97706','--color-accent-active':'#B45309','--color-accent-light':'#FEF3C7',
  '--color-accent-subtle':'#FFFBEB','--color-border':'#334155','--color-border-subtle':'#1E293B',
  '--font-heading':"'Roboto',sans-serif",'--font-body':"'Roboto',sans-serif",'--radius-md':'0px','--radius-lg':'0px'
}
export const ELEKTRIKCI_ACIL_BUSINESS: BusinessData = {
  name:'Acil Elektrik 7/24',ownerName:'Usta Murat Kablo',sector:'elektrikci',slogan:'İstanbul genelinde 7/24 acil elektrik',
  phone:'0532 777 88 99',phoneClean:'905327778899',whatsapp:'905327778899',email:'info@acilelektrik.com',
  address:'Mecidiyeköy Mah. No:33, Şişli',city:'İstanbul',district:'Şişli',coordinates:{lat:41.066,lng:28.9937},
  workingHours:[{day:'monday',dayTr:'Pazartesi',open:'09:00',close:'18:00'},{day:'tuesday',dayTr:'Salı',open:'09:00',close:'18:00'},{day:'wednesday',dayTr:'Çarşamba',open:'09:00',close:'18:00'},{day:'thursday',dayTr:'Perşembe',open:'09:00',close:'18:00'},{day:'friday',dayTr:'Cuma',open:'09:00',close:'18:00'},{day:'saturday',dayTr:'Cumartesi',open:'10:00',close:'14:00'},{day:'sunday',dayTr:'Pazar',open:null,close:null}],
  socialMedia:{instagram:'https://instagram.com/elektrikci-acil'},photos:[],
  services:[
    {id:'s1',name:'Acil Arıza',price:'₺300+',duration:'30 dk',icon:'zap',popular:true,description:'Elektrik kesintisi, kısa devre'},
    {id:'s2',name:'Sigorta Tamiri',price:'₺200+',duration:'30 dk',icon:'shield',description:'Atma ve ark sorunu giderme'},
    {id:'s3',name:'Priz-Anahtar',price:'₺150+',duration:'30 dk',icon:'power',description:'Priz, anahtar montaj ve değişim'},
    {id:'s4',name:'Aydınlatma',price:'₺200+',duration:'1 saat',icon:'sun',description:'Avize, spot, led montaj'},
    {id:'s5',name:'Kablo Çekme',price:'₺500+',duration:'3 saat',icon:'cable',description:'Yeni hat, kablo değişimi'}
  ],team:[
    {id:'t1',name:'Usta Murat Kablo',role:'Kurucu',experience:'17 yıl'}
  ],
  experience:'17 yıl',rating:4.5,reviewCount:1500,foundedYear:2008
}
export const ELEKTRIKCI_ACIL_CONFIG: ThemeConfig = {
  id:'elektrikci-acil',name:'Acil Elektrik 7/24',sectorId:'elektrikci',plan:'free',description:'İstanbul genelinde 7/24 acil elektrik',
  designPhilosophy:'Acil elektrik servisi. Sarı uyarı rengi, Roboto sade.',inspiration:['Modern TR elektrikci'],sectorSections:['emergency_service','pricing'],
  performanceBudget:{maxJS:'250kb',maxLCP:'3.0s',animationLevel:'gsap-allowed'},
  isDark:false,cssVariables:ELEKTRIKCI_ACIL_CSS,
  fonts:{heading:{family:'Roboto',weights:[500,700],subsets:['latin-ext']},body:{family:'Roboto',weights:[400,500],subsets:['latin-ext']}},
  seoSchemaType:'Electrician',
  globalSections:[
    {id:'global-header',type:'header',variant:'auto',order:0,required:true,position:'top',settings:{bgMode:'default',paddingY:'none',containerWidth:'xl',visible:true,order:0,removable:false,animation:'fadeUp'},defaultContent:{logo:{type:'text',text:'Acil Elektrik 7/24'},menuItems:[{label:'Hizmetler',href:'#hizmetler'},{label:'Hakkımızda',href:'#hakkimizda'},{label:'İletişim',href:'#iletisim'}],cta:{text:'Hemen Ara',href:'https://wa.me/905327778899',variant:'solid'}},editableFields:[]},
    {id:'global-footer',type:'footer',variant:'auto',order:999,required:true,position:'bottom',settings:{bgMode:'surface',paddingY:'lg',containerWidth:'xl',visible:true,order:999,removable:false,animation:'fadeUp'},defaultContent:{businessName:'Acil Elektrik 7/24',description:'İstanbul genelinde 7/24 acil elektrik arıza servisi.',copyright:'© 2025 Acil Elektrik 7/24',columns:[{title:'Hizmetler',links:[{label:'Acil Arıza',href:'#'},{label:'Sigorta Tamiri',href:'#'},{label:'Priz-Anahtar',href:'#'}]},{title:'Sayfalar',links:[{label:'Hakkımızda',href:'#hakkimizda'},{label:'İletişim',href:'#iletisim'}]}],contact:{phone:'0532 777 88 99',email:'info@acilelektrik.com',address:'Mecidiyeköy Mah. No:33'},social:[{platform:'instagram',url:'https://instagram.com/elektrikci-acil',icon:'instagram'}],legal:[{label:'Gizlilik',href:'/gizlilik'},{label:'KVKK',href:'/kvkk'}],poweredBy:'⚡ kepenk.ai'},editableFields:[]},
    {id:'global-whatsapp',type:'whatsapp_cta',variant:'floating',order:1000,required:true,position:'floating',settings:{bgMode:'default',paddingY:'none',containerWidth:'xl',visible:true,order:1000,removable:false,animation:'fadeUp'},defaultContent:{phone:'905327778899',message:'Merhaba, Acil Elektrik 7/24 hakkında bilgi almak istiyorum.'},editableFields:[]},
    {id:'global-cookie',type:'cookie_banner',variant:'bottom_bar',order:1001,required:true,position:'floating',settings:{bgMode:'surface',paddingY:'none',containerWidth:'xl',visible:true,order:1001,removable:false,animation:'fadeUp'},defaultContent:{text:'Bu site çerezleri kullanır.',acceptText:'Kabul Et',rejectText:'Reddet',detailsLink:'/gizlilik'},editableFields:[]}
  ],
  pages:[{id:'anasayfa',slug:'/',title:'Acil Elektrik 7/24 — Şişli',titleTr:'Ana Sayfa',isHomePage:true,includeInNav:false,
    sections:[
      {id:'hero',type:'hero',variant:'auto',order:1,required:true,settings:{bgMode:'default',paddingY:'none',containerWidth:'xl',visible:true,order:1,removable:false,animation:'fadeUp'},defaultContent:{badge:'ŞIŞLI',title:'Acil Elektrik 7/24',subtitle:'İstanbul genelinde 7/24 acil elektrik',cta1:{text:'Hemen Ara',href:'#iletisim'}},editableFields:[]},
      {id:'hakkimizda',type:'about',variant:'auto',order:2,required:false,settings:{bgMode:'default',paddingY:'lg',containerWidth:'xl',visible:true,order:2,removable:true,animation:'fadeUp'},defaultContent:{badge:'HAKKIMIZDA',title:'Biz Kimiz?',description:'İstanbul genelinde 7/24 acil elektrik arıza servisi.'},editableFields:[]},
      {id:'istatistik',type:'stats',variant:'auto',order:3,required:false,settings:{bgMode:'accent',paddingY:'md',containerWidth:'xl',visible:true,order:3,removable:true,animation:'fadeUp'},defaultContent:{stats:[{value:'17+',label:'Yıl'},{value:'1500+',label:'Müşteri'},{value:'4.5',label:'Puan'}]},editableFields:[]},
      {id:'galeri',type:'gallery',variant:'auto',order:4,required:false,settings:{bgMode:'default',paddingY:'lg',containerWidth:'xl',visible:true,order:4,removable:true,animation:'fadeUp'},defaultContent:{badge:'GALERİ',title:'Çalışmalarımız',items:[{id:'g1',url:'/placeholder.jpg'}]},editableFields:[]},
      {id:'hizmetler',type:'services',variant:'auto',order:5,required:true,settings:{bgMode:'surface',paddingY:'lg',containerWidth:'xl',visible:true,order:5,removable:false,animation:'fadeUp'},defaultContent:{badge:'HİZMETLER',title:'Hizmetlerimiz',services:[{id:'s1',name:'Hizmet',description:'Detay için arayın.',icon:'star'}]},editableFields:[]},
      {id:'iletisim',type:'contact',variant:'auto',order:6,required:true,settings:{bgMode:'surface',paddingY:'lg',containerWidth:'xl',visible:true,order:6,removable:false,animation:'fadeUp'},defaultContent:{badge:'İLETİŞİM',title:'Bize Ulaşın',whatsapp:'905327778899'},editableFields:[]}
    ]}]
}
