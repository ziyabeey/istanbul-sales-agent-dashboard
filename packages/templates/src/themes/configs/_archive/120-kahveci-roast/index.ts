/**
 * @kepenk/templates — kahveci-roast | RoastHouse 34
 * Plan: growth | Syne + DM Sans
 */
import type { ThemeConfig, BusinessData } from '../../../../types/section-types'
export const KAHVECI_ROAST_CSS: Record<string,string> = {
  '--color-bg':'#FFFFFF','--color-surface':'#F8FAFC','--color-surface-elevated':'#FFFFFF',
  '--color-surface-muted':'#F1F5F9','--color-text':'#0F172A','--color-text-secondary':'#475569',
  '--color-text-muted':'#94A3B8','--color-text-on-accent':'#FFFFFF','--color-accent':'#EA580C',
  '--color-accent-hover':'#C2410C','--color-accent-active':'#9A3412','--color-accent-light':'#FFF7ED',
  '--color-accent-subtle':'#FFFAF5','--color-border':'#E2E8F0','--color-border-subtle':'#F1F5F9',
  '--font-heading':"'Syne',sans-serif",'--font-body':"'DM Sans',sans-serif",'--radius-md':'6px','--radius-lg':'12px'
}
export const KAHVECI_ROAST_BUSINESS: BusinessData = {
  name:'RoastHouse 34',ownerName:'Barista Can Kavurma',sector:'kahveci',slogan:'Mikro kavurma ve specialty coffee',
  phone:'0216 666 77 88',phoneClean:'902166667788',whatsapp:'902166667788',email:'hello@roasthouse34.com',
  address:'Bağdat Cad. No:280, Kadıköy',city:'İstanbul',district:'Kadıköy',coordinates:{lat:40.97,lng:29.068},
  workingHours:[{day:'monday',dayTr:'Pazartesi',open:'08:00',close:'22:00'},{day:'tuesday',dayTr:'Salı',open:'08:00',close:'22:00'},{day:'wednesday',dayTr:'Çarşamba',open:'08:00',close:'22:00'},{day:'thursday',dayTr:'Perşembe',open:'08:00',close:'22:00'},{day:'friday',dayTr:'Cuma',open:'08:00',close:'22:00'},{day:'saturday',dayTr:'Cumartesi',open:'09:00',close:'23:00'},{day:'sunday',dayTr:'Pazar',open:null,close:null}],
  socialMedia:{instagram:'https://instagram.com/kahveci-roast'},photos:[],
  services:[
    {id:'s1',name:'Specialty Espresso',price:'₺90',duration:'3 dk',icon:'coffee',popular:true,description:'85+ SCA puanlı çekirdekler'},
    {id:'s2',name:'Chemex Demleme',price:'₺130',duration:'6 dk',icon:'flask',description:'Chemex 6-cup, manual brew'},
    {id:'s3',name:'Kavurma Atölyesi',price:'₺500',duration:'2 saat',icon:'flame',description:'Kendi çekirdeğini kavur workshop'},
    {id:'s4',name:'Abonelik Paketi',price:'₺400/ay',duration:'Aylık',icon:'repeat',description:'2x250g taze kavrum, kapıya teslim'},
    {id:'s5',name:'Ekipman Satış',price:'₺200+',duration:'Hemen',icon:'shopping-bag',description:'Hario, Comandante, Fellow'}
  ],team:[
    {id:'t1',name:'Can Kavurma',role:'Kurucu & Roaster',experience:'8 yıl'},
    {id:'t2',name:'Elif SCA',role:'SCA Certified Barista',experience:'5 yıl'}
  ],
  experience:'8 yıl',rating:4.8,reviewCount:620,foundedYear:2017
}
export const KAHVECI_ROAST_CONFIG: ThemeConfig = {
  id:'kahveci-roast',name:'RoastHouse 34',sectorId:'kahveci',plan:'growth',description:'Mikro kavurma ve specialty coffee',
  designPhilosophy:'Modern kavurma evi. Turuncu-siyah, Syne bold.',inspiration:['Modern TR kahveci'],sectorSections:['menu_grid','origin_map'],
  performanceBudget:{maxJS:'250kb',maxLCP:'3.0s',animationLevel:'gsap-allowed'},
  isDark:false,cssVariables:KAHVECI_ROAST_CSS,
  fonts:{heading:{family:'Syne',weights:[700,800],subsets:['latin-ext']},body:{family:'DM Sans',weights:[400,500],subsets:['latin-ext']}},
  seoSchemaType:'CafeOrCoffeeShop',
  globalSections:[
    {id:'global-header',type:'header',variant:'auto',order:0,required:true,position:'top',settings:{bgMode:'default',paddingY:'none',containerWidth:'xl',visible:true,order:0,removable:false,animation:'fadeUp'},defaultContent:{logo:{type:'text',text:'RoastHouse 34'},menuItems:[{label:'Hizmetler',href:'#hizmetler'},{label:'Hakkımızda',href:'#hakkimizda'},{label:'İletişim',href:'#iletisim'}],cta:{text:'Sipariş Ver',href:'https://wa.me/902166667788',variant:'solid'}},editableFields:[]},
    {id:'global-footer',type:'footer',variant:'auto',order:999,required:true,position:'bottom',settings:{bgMode:'surface',paddingY:'lg',containerWidth:'xl',visible:true,order:999,removable:false,animation:'fadeUp'},defaultContent:{businessName:'RoastHouse 34',description:'Kadıköy Bağdat Caddesi. Mikro kavurma, specialty coffee, barista eğitimleri.',copyright:'© 2025 RoastHouse 34',columns:[{title:'Hizmetler',links:[{label:'Specialty Espresso',href:'#'},{label:'Chemex Demleme',href:'#'},{label:'Kavurma Atölyesi',href:'#'}]},{title:'Sayfalar',links:[{label:'Hakkımızda',href:'#hakkimizda'},{label:'İletişim',href:'#iletisim'}]}],contact:{phone:'0216 666 77 88',email:'hello@roasthouse34.com',address:'Bağdat Cad. No:280'},social:[{platform:'instagram',url:'https://instagram.com/kahveci-roast',icon:'instagram'}],legal:[{label:'Gizlilik',href:'/gizlilik'},{label:'KVKK',href:'/kvkk'}],poweredBy:'⚡ kepenk.ai'},editableFields:[]},
    {id:'global-whatsapp',type:'whatsapp_cta',variant:'floating',order:1000,required:true,position:'floating',settings:{bgMode:'default',paddingY:'none',containerWidth:'xl',visible:true,order:1000,removable:false,animation:'fadeUp'},defaultContent:{phone:'902166667788',message:'Merhaba, RoastHouse 34 hakkında bilgi almak istiyorum.'},editableFields:[]},
    {id:'global-cookie',type:'cookie_banner',variant:'bottom_bar',order:1001,required:true,position:'floating',settings:{bgMode:'surface',paddingY:'none',containerWidth:'xl',visible:true,order:1001,removable:false,animation:'fadeUp'},defaultContent:{text:'Bu site çerezleri kullanır.',acceptText:'Kabul Et',rejectText:'Reddet',detailsLink:'/gizlilik'},editableFields:[]}
  ],
  pages:[{id:'anasayfa',slug:'/',title:'RoastHouse 34 — Kadıköy',titleTr:'Ana Sayfa',isHomePage:true,includeInNav:false,
    sections:[
      {id:'hero',type:'hero',variant:'auto',order:1,required:true,settings:{bgMode:'default',paddingY:'none',containerWidth:'xl',visible:true,order:1,removable:false,animation:'fadeUp'},defaultContent:{badge:'KADIKÖY',title:'RoastHouse 34',subtitle:'Mikro kavurma ve specialty coffee',cta1:{text:'Sipariş Ver',href:'#iletisim'}},editableFields:[]},
      {id:'hakkimizda',type:'about',variant:'auto',order:2,required:false,settings:{bgMode:'default',paddingY:'lg',containerWidth:'xl',visible:true,order:2,removable:true,animation:'fadeUp'},defaultContent:{badge:'HAKKIMIZDA',title:'Biz Kimiz?',description:'Kadıköy Bağdat Caddesi. Mikro kavurma, specialty coffee, barista eğitimleri.'},editableFields:[]},
      {id:'istatistik',type:'stats',variant:'auto',order:3,required:false,settings:{bgMode:'accent',paddingY:'md',containerWidth:'xl',visible:true,order:3,removable:true,animation:'fadeUp'},defaultContent:{stats:[{value:'8+',label:'Yıl'},{value:'620+',label:'Müşteri'},{value:'4.8',label:'Puan'}]},editableFields:[]},
      {id:'galeri',type:'gallery',variant:'auto',order:4,required:false,settings:{bgMode:'default',paddingY:'lg',containerWidth:'xl',visible:true,order:4,removable:true,animation:'fadeUp'},defaultContent:{badge:'GALERİ',title:'Çalışmalarımız',items:[{id:'g1',url:'/placeholder.jpg'}]},editableFields:[]},
      {id:'hizmetler',type:'services',variant:'auto',order:5,required:true,settings:{bgMode:'surface',paddingY:'lg',containerWidth:'xl',visible:true,order:5,removable:false,animation:'fadeUp'},defaultContent:{badge:'HİZMETLER',title:'Hizmetlerimiz',services:[{id:'s1',name:'Hizmet',description:'Detay için arayın.',icon:'star'}]},editableFields:[]},
      {id:'iletisim',type:'contact',variant:'auto',order:6,required:true,settings:{bgMode:'surface',paddingY:'lg',containerWidth:'xl',visible:true,order:6,removable:false,animation:'fadeUp'},defaultContent:{badge:'İLETİŞİM',title:'Bize Ulaşın',whatsapp:'902166667788'},editableFields:[]}
    ]}]
}
