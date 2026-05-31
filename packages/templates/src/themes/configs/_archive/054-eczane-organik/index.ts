/**
 * @kepenk/templates — eczane-organik | Yeşil Eczane
 * Plan: pro | Cormorant + Lato
 */
import type { ThemeConfig, BusinessData } from '../../../../types/section-types'
export const ECZANE_ORGANIK_CSS: Record<string,string> = {
  '--color-bg':'#FDFBF7','--color-surface':'#F4F1EA','--color-surface-elevated':'#FFFFFF',
  '--color-surface-muted':'#E8E4D9','--color-text':'#3D3831','--color-text-secondary':'#6B6356',
  '--color-text-muted':'#B3AAA0','--color-text-on-accent':'#FFFFFF','--color-accent':'#4D7C0F',
  '--color-accent-hover':'#3F6212','--color-accent-active':'#365314','--color-accent-light':'#ECFCCB',
  '--color-accent-subtle':'#F7FEE7','--color-border':'#DED8CE','--color-border-subtle':'#F4F1EA',
  '--font-heading':"'Cormorant',serif",'--font-body':"'Lato',sans-serif",'--radius-md':'12px','--radius-lg':'24px'
}
export const ECZANE_ORGANIK_BUSINESS: BusinessData = {
  name:'Yeşil Eczane',ownerName:'Ecz. Dr. Elif Bitkisel',sector:'eczane',slogan:'Doğal, bitkisel ve organik sağlık ürünleri',
  phone:'0216 888 99 00',phoneClean:'902168889900',whatsapp:'902168889900',email:'info@yesileczane.com.tr',
  address:'Fenerbahçe Mah. Bağdat Cad. No:310, Kadıköy',city:'İstanbul',district:'Kadıköy',coordinates:{lat:40.968,lng:29.065},
  workingHours:[{day:'monday',dayTr:'Pazartesi',open:'09:00',close:'18:00'},{day:'tuesday',dayTr:'Salı',open:'09:00',close:'18:00'},{day:'wednesday',dayTr:'Çarşamba',open:'09:00',close:'18:00'},{day:'thursday',dayTr:'Perşembe',open:'09:00',close:'18:00'},{day:'friday',dayTr:'Cuma',open:'09:00',close:'18:00'},{day:'saturday',dayTr:'Cumartesi',open:'10:00',close:'14:00'},{day:'sunday',dayTr:'Pazar',open:null,close:null}],
  socialMedia:{instagram:'https://instagram.com/eczane-organik'},photos:[],
  services:[
    {id:'s1',name:'Bitkisel Danışmanlık',price:'Ücretsiz',duration:'15 dk',icon:'leaf',popular:true,description:'Fitoterapist eczacı ile görüşme'},
    {id:'s2',name:'Organik Takviye',price:'₺100+',duration:'Danışmanlık',icon:'pill',description:'Solgar, Nature Made, Now Foods'},
    {id:'s3',name:'Aromaterapi',price:'₺80+',duration:'Danışmanlık',icon:'flower',description:'Uçucu yağlar ve difüzörler'},
    {id:'s4',name:'Probiyotik',price:'₺150+',duration:'Danışmanlık',icon:'flask',description:'Bağırsak sağlığı uzmanı'},
    {id:'s5',name:'Reçeteli İlaç',price:'SGK',duration:'5 dk',icon:'clipboard',description:'Tüm reçeteler karşılanır'}
  ],team:[
    {id:'t1',name:'Ecz. Dr. Elif Bitkisel',role:'Kurucu & Fitoterapist',experience:'7 yıl'}
  ],
  experience:'7 yıl',rating:4.9,reviewCount:420,foundedYear:2018
}
export const ECZANE_ORGANIK_CONFIG: ThemeConfig = {
  id:'eczane-organik',name:'Yeşil Eczane',sectorId:'eczane',plan:'pro',description:'Doğal, bitkisel ve organik sağlık ürünleri',
  designPhilosophy:'Doğal sağlık estetiği. Yeşil-toprak, Cormorant organik.',inspiration:['Modern TR eczane'],sectorSections:['product_catalog','herbal_guide'],
  performanceBudget:{maxJS:'250kb',maxLCP:'3.0s',animationLevel:'gsap-allowed'},
  isDark:false,cssVariables:ECZANE_ORGANIK_CSS,
  fonts:{heading:{family:'Cormorant',weights:[500,600],subsets:['latin-ext']},body:{family:'Lato',weights:[400],subsets:['latin-ext']}},
  seoSchemaType:'Pharmacy',
  globalSections:[
    {id:'global-header',type:'header',variant:'auto',order:0,required:true,position:'top',settings:{bgMode:'default',paddingY:'none',containerWidth:'xl',visible:true,order:0,removable:false,animation:'fadeUp'},defaultContent:{logo:{type:'text',text:'Yeşil Eczane'},menuItems:[{label:'Hizmetler',href:'#hizmetler'},{label:'Hakkımızda',href:'#hakkimizda'},{label:'İletişim',href:'#iletisim'}],cta:{text:'Danışmanlık Al',href:'https://wa.me/902168889900',variant:'solid'}},editableFields:[]},
    {id:'global-footer',type:'footer',variant:'auto',order:999,required:true,position:'bottom',settings:{bgMode:'surface',paddingY:'lg',containerWidth:'xl',visible:true,order:999,removable:false,animation:'fadeUp'},defaultContent:{businessName:'Yeşil Eczane',description:'Doğal, bitkisel ve organik sağlık ürünlerinde uzman eczane.',copyright:'© 2025 Yeşil Eczane',columns:[{title:'Hizmetler',links:[{label:'Bitkisel Danışmanlık',href:'#'},{label:'Organik Takviye',href:'#'},{label:'Aromaterapi',href:'#'}]},{title:'Sayfalar',links:[{label:'Hakkımızda',href:'#hakkimizda'},{label:'İletişim',href:'#iletisim'}]}],contact:{phone:'0216 888 99 00',email:'info@yesileczane.com.tr',address:'Fenerbahçe Mah. Bağdat Cad. No:310'},social:[{platform:'instagram',url:'https://instagram.com/eczane-organik',icon:'instagram'}],legal:[{label:'Gizlilik',href:'/gizlilik'},{label:'KVKK',href:'/kvkk'}],poweredBy:'⚡ kepenk.ai'},editableFields:[]},
    {id:'global-whatsapp',type:'whatsapp_cta',variant:'floating',order:1000,required:true,position:'floating',settings:{bgMode:'default',paddingY:'none',containerWidth:'xl',visible:true,order:1000,removable:false,animation:'fadeUp'},defaultContent:{phone:'902168889900',message:'Merhaba, Yeşil Eczane hakkında bilgi almak istiyorum.'},editableFields:[]},
    {id:'global-cookie',type:'cookie_banner',variant:'bottom_bar',order:1001,required:true,position:'floating',settings:{bgMode:'surface',paddingY:'none',containerWidth:'xl',visible:true,order:1001,removable:false,animation:'fadeUp'},defaultContent:{text:'Bu site çerezleri kullanır.',acceptText:'Kabul Et',rejectText:'Reddet',detailsLink:'/gizlilik'},editableFields:[]}
  ],
  pages:[{id:'anasayfa',slug:'/',title:'Yeşil Eczane — Kadıköy',titleTr:'Ana Sayfa',isHomePage:true,includeInNav:false,
    sections:[
      {id:'hero',type:'hero',variant:'auto',order:1,required:true,settings:{bgMode:'default',paddingY:'none',containerWidth:'xl',visible:true,order:1,removable:false,animation:'fadeUp'},defaultContent:{badge:'KADIKÖY',title:'Yeşil Eczane',subtitle:'Doğal, bitkisel ve organik sağlık ürünleri',cta1:{text:'Danışmanlık Al',href:'#iletisim'}},editableFields:[]},
      {id:'hakkimizda',type:'about',variant:'auto',order:2,required:false,settings:{bgMode:'default',paddingY:'lg',containerWidth:'xl',visible:true,order:2,removable:true,animation:'fadeUp'},defaultContent:{badge:'HAKKIMIZDA',title:'Biz Kimiz?',description:'Doğal, bitkisel ve organik sağlık ürünlerinde uzman eczane.'},editableFields:[]},
      {id:'istatistik',type:'stats',variant:'auto',order:3,required:false,settings:{bgMode:'accent',paddingY:'md',containerWidth:'xl',visible:true,order:3,removable:true,animation:'fadeUp'},defaultContent:{stats:[{value:'7+',label:'Yıl'},{value:'420+',label:'Müşteri'},{value:'4.9',label:'Puan'}]},editableFields:[]},
      {id:'galeri',type:'gallery',variant:'auto',order:4,required:false,settings:{bgMode:'default',paddingY:'lg',containerWidth:'xl',visible:true,order:4,removable:true,animation:'fadeUp'},defaultContent:{badge:'GALERİ',title:'Çalışmalarımız',items:[{id:'g1',url:'/placeholder.jpg'}]},editableFields:[]},
      {id:'hizmetler',type:'services',variant:'auto',order:5,required:true,settings:{bgMode:'surface',paddingY:'lg',containerWidth:'xl',visible:true,order:5,removable:false,animation:'fadeUp'},defaultContent:{badge:'HİZMETLER',title:'Hizmetlerimiz',services:[{id:'s1',name:'Hizmet',description:'Detay için arayın.',icon:'star'}]},editableFields:[]},
      {id:'iletisim',type:'contact',variant:'auto',order:6,required:true,settings:{bgMode:'surface',paddingY:'lg',containerWidth:'xl',visible:true,order:6,removable:false,animation:'fadeUp'},defaultContent:{badge:'İLETİŞİM',title:'Bize Ulaşın',whatsapp:'902168889900'},editableFields:[]}
    ]}]
}
