/**
 * @kepenk/templates — kahveci-local | Mahalle Kahvesi
 * Plan: free | Nunito + Inter
 */
import type { ThemeConfig, BusinessData } from '../../../../types/section-types'
export const KAHVECI_LOCAL_CSS: Record<string,string> = {
  '--color-bg':'#FFFFFF','--color-surface':'#F8FAFC','--color-surface-elevated':'#FFFFFF',
  '--color-surface-muted':'#F1F5F9','--color-text':'#0F172A','--color-text-secondary':'#475569',
  '--color-text-muted':'#94A3B8','--color-text-on-accent':'#FFFFFF','--color-accent':'#795548',
  '--color-accent-hover':'#6D4C41','--color-accent-active':'#5D4037','--color-accent-light':'#EFEBE9',
  '--color-accent-subtle':'#FAF5F2','--color-border':'#E2E8F0','--color-border-subtle':'#F1F5F9',
  '--font-heading':"'Nunito',sans-serif",'--font-body':"'Inter',sans-serif",'--radius-md':'6px','--radius-lg':'12px'
}
export const KAHVECI_LOCAL_BUSINESS: BusinessData = {
  name:'Mahalle Kahvesi',ownerName:'Kahveci Hasan',sector:'kahveci',slogan:'Sıcak sohbet, güzel kahve',
  phone:'0532 333 44 55',phoneClean:'905323334455',whatsapp:'905323334455',email:'info@mahallekahvesi.com',
  address:'Beşiktaş Mah. Çarşı Cad. No:15, Beşiktaş',city:'İstanbul',district:'Beşiktaş',coordinates:{lat:41.043,lng:29.002},
  workingHours:[{day:'monday',dayTr:'Pazartesi',open:'07:30',close:'21:00'},{day:'tuesday',dayTr:'Salı',open:'07:30',close:'21:00'},{day:'wednesday',dayTr:'Çarşamba',open:'07:30',close:'21:00'},{day:'thursday',dayTr:'Perşembe',open:'07:30',close:'21:00'},{day:'friday',dayTr:'Cuma',open:'07:30',close:'21:00'},{day:'saturday',dayTr:'Cumartesi',open:'08:00',close:'22:00'},{day:'sunday',dayTr:'Pazar',open:null,close:null}],
  socialMedia:{instagram:'https://instagram.com/kahveci-local'},photos:[],
  services:[
    {id:'s1',name:'Türk Kahvesi',price:'₺50',duration:'10 dk',icon:'coffee',popular:true,description:'Geleneksel köpüklü Türk kahvesi'},
    {id:'s2',name:'Filtre Kahve',price:'₺60',duration:'5 dk',icon:'cup',description:'Günün filtresi, sınırsız refill'},
    {id:'s3',name:'Çay',price:'₺20',duration:'3 dk',icon:'cup',description:'Demli çay, ince belli bardak'},
    {id:'s4',name:'Tost & Sandviç',price:'₺80-120',duration:'10 dk',icon:'sandwich',description:'Kaşarlı, karışık, tavuklu'},
    {id:'s5',name:'Ev Tatlıları',price:'₺60-90',duration:'Hemen',icon:'cake',description:'Günlük pasta ve kurabiye'}
  ],team:[
    {id:'t1',name:'Kahveci Hasan',role:'Kurucu',experience:'6 yıl'}
  ],
  experience:'6 yıl',rating:4.6,reviewCount:450,foundedYear:2019
}
export const KAHVECI_LOCAL_CONFIG: ThemeConfig = {
  id:'kahveci-local',name:'Mahalle Kahvesi',sectorId:'kahveci',plan:'free',description:'Sıcak sohbet, güzel kahve',
  designPhilosophy:'Samimi mahalle kahvesi. Kahverengi-beyaz, Nunito yuvarlak.',inspiration:['Modern TR kahveci'],sectorSections:['menu_grid','loyalty_program'],
  performanceBudget:{maxJS:'250kb',maxLCP:'3.0s',animationLevel:'gsap-allowed'},
  isDark:false,cssVariables:KAHVECI_LOCAL_CSS,
  fonts:{heading:{family:'Nunito',weights:[700],subsets:['latin-ext']},body:{family:'Inter',weights:[400,500],subsets:['latin-ext']}},
  seoSchemaType:'CafeOrCoffeeShop',
  globalSections:[
    {id:'global-header',type:'header',variant:'auto',order:0,required:true,position:'top',settings:{bgMode:'default',paddingY:'none',containerWidth:'xl',visible:true,order:0,removable:false,animation:'fadeUp'},defaultContent:{logo:{type:'text',text:'Mahalle Kahvesi'},menuItems:[{label:'Hizmetler',href:'#hizmetler'},{label:'Hakkımızda',href:'#hakkimizda'},{label:'İletişim',href:'#iletisim'}],cta:{text:'Sipariş Ver',href:'https://wa.me/905323334455',variant:'solid'}},editableFields:[]},
    {id:'global-footer',type:'footer',variant:'auto',order:999,required:true,position:'bottom',settings:{bgMode:'surface',paddingY:'lg',containerWidth:'xl',visible:true,order:999,removable:false,animation:'fadeUp'},defaultContent:{businessName:'Mahalle Kahvesi',description:'Beşiktaş çarşı içinde, samimi mahalle kahvesi atmosferi.',copyright:'© 2025 Mahalle Kahvesi',columns:[{title:'Hizmetler',links:[{label:'Türk Kahvesi',href:'#'},{label:'Filtre Kahve',href:'#'},{label:'Çay',href:'#'}]},{title:'Sayfalar',links:[{label:'Hakkımızda',href:'#hakkimizda'},{label:'İletişim',href:'#iletisim'}]}],contact:{phone:'0532 333 44 55',email:'info@mahallekahvesi.com',address:'Beşiktaş Mah. Çarşı Cad. No:15'},social:[{platform:'instagram',url:'https://instagram.com/kahveci-local',icon:'instagram'}],legal:[{label:'Gizlilik',href:'/gizlilik'},{label:'KVKK',href:'/kvkk'}],poweredBy:'⚡ kepenk.ai'},editableFields:[]},
    {id:'global-whatsapp',type:'whatsapp_cta',variant:'floating',order:1000,required:true,position:'floating',settings:{bgMode:'default',paddingY:'none',containerWidth:'xl',visible:true,order:1000,removable:false,animation:'fadeUp'},defaultContent:{phone:'905323334455',message:'Merhaba, Mahalle Kahvesi hakkında bilgi almak istiyorum.'},editableFields:[]},
    {id:'global-cookie',type:'cookie_banner',variant:'bottom_bar',order:1001,required:true,position:'floating',settings:{bgMode:'surface',paddingY:'none',containerWidth:'xl',visible:true,order:1001,removable:false,animation:'fadeUp'},defaultContent:{text:'Bu site çerezleri kullanır.',acceptText:'Kabul Et',rejectText:'Reddet',detailsLink:'/gizlilik'},editableFields:[]}
  ],
  pages:[{id:'anasayfa',slug:'/',title:'Mahalle Kahvesi — Beşiktaş',titleTr:'Ana Sayfa',isHomePage:true,includeInNav:false,
    sections:[
      {id:'hero',type:'hero',variant:'auto',order:1,required:true,settings:{bgMode:'default',paddingY:'none',containerWidth:'xl',visible:true,order:1,removable:false,animation:'fadeUp'},defaultContent:{badge:'BEŞIKTAŞ',title:'Mahalle Kahvesi',subtitle:'Sıcak sohbet, güzel kahve',cta1:{text:'Sipariş Ver',href:'#iletisim'}},editableFields:[]},
      {id:'hakkimizda',type:'about',variant:'auto',order:2,required:false,settings:{bgMode:'default',paddingY:'lg',containerWidth:'xl',visible:true,order:2,removable:true,animation:'fadeUp'},defaultContent:{badge:'HAKKIMIZDA',title:'Biz Kimiz?',description:'Beşiktaş çarşı içinde, samimi mahalle kahvesi atmosferi.'},editableFields:[]},
      {id:'istatistik',type:'stats',variant:'auto',order:3,required:false,settings:{bgMode:'accent',paddingY:'md',containerWidth:'xl',visible:true,order:3,removable:true,animation:'fadeUp'},defaultContent:{stats:[{value:'6+',label:'Yıl'},{value:'450+',label:'Müşteri'},{value:'4.6',label:'Puan'}]},editableFields:[]},
      {id:'galeri',type:'gallery',variant:'auto',order:4,required:false,settings:{bgMode:'default',paddingY:'lg',containerWidth:'xl',visible:true,order:4,removable:true,animation:'fadeUp'},defaultContent:{badge:'GALERİ',title:'Çalışmalarımız',items:[{id:'g1',url:'/placeholder.jpg'}]},editableFields:[]},
      {id:'hizmetler',type:'services',variant:'auto',order:5,required:true,settings:{bgMode:'surface',paddingY:'lg',containerWidth:'xl',visible:true,order:5,removable:false,animation:'fadeUp'},defaultContent:{badge:'HİZMETLER',title:'Hizmetlerimiz',services:[{id:'s1',name:'Hizmet',description:'Detay için arayın.',icon:'star'}]},editableFields:[]},
      {id:'iletisim',type:'contact',variant:'auto',order:6,required:true,settings:{bgMode:'surface',paddingY:'lg',containerWidth:'xl',visible:true,order:6,removable:false,animation:'fadeUp'},defaultContent:{badge:'İLETİŞİM',title:'Bize Ulaşın',whatsapp:'905323334455'},editableFields:[]}
    ]}]
}
