/**
 * @kepenk/templates — elektrikci-endustriyel | PowerGrid Endüstriyel
 * Plan: enterprise | Space Grotesk + Inter
 */
import type { ThemeConfig, BusinessData } from '../../../../types/section-types'
export const ELEKTRIKCI_ENDUSTRIYEL_CSS: Record<string,string> = {
  '--color-bg':'#0F172A','--color-surface':'#1E293B','--color-surface-elevated':'#334155',
  '--color-surface-muted':'#0B1120','--color-text':'#F8FAFC','--color-text-secondary':'#94A3B8',
  '--color-text-muted':'#475569','--color-text-on-accent':'#0C1222','--color-accent':'#FBBF24',
  '--color-accent-hover':'#F59E0B','--color-accent-active':'#D97706','--color-accent-light':'#1A1808',
  '--color-accent-subtle':'#141205','--color-border':'#334155','--color-border-subtle':'#1E293B',
  '--font-heading':"'Space Grotesk',sans-serif",'--font-body':"'Inter',sans-serif",'--radius-md':'0px','--radius-lg':'0px'
}
export const ELEKTRIKCI_ENDUSTRIYEL_BUSINESS: BusinessData = {
  name:'PowerGrid Endüstriyel',ownerName:'Müh. Kaan Power',sector:'elektrikci',slogan:'Endüstriyel elektrik ve otomasyon çözümleri',
  phone:'0850 777 88 99',phoneClean:'908507778899',whatsapp:'908507778899',email:'info@powergrid.com.tr',
  address:'İkitelli OSB No:40, Başakşehir',city:'İstanbul',district:'Başakşehir',coordinates:{lat:41.093,lng:28.782},
  workingHours:[{day:'monday',dayTr:'Pazartesi',open:'09:00',close:'18:00'},{day:'tuesday',dayTr:'Salı',open:'09:00',close:'18:00'},{day:'wednesday',dayTr:'Çarşamba',open:'09:00',close:'18:00'},{day:'thursday',dayTr:'Perşembe',open:'09:00',close:'18:00'},{day:'friday',dayTr:'Cuma',open:'09:00',close:'18:00'},{day:'saturday',dayTr:'Cumartesi',open:'10:00',close:'14:00'},{day:'sunday',dayTr:'Pazar',open:null,close:null}],
  socialMedia:{instagram:'https://instagram.com/elektrikci-endustriyel'},photos:[],
  services:[
    {id:'s1',name:'Fabrika Tesisat',price:'Proje bazlı',duration:'30-90 gün',icon:'factory',popular:true,description:'Komple endüstriyel elektrik tesisatı'},
    {id:'s2',name:'Otomasyon (PLC)',price:'₺50K+',duration:'Proje',icon:'cpu',description:'PLC otomasyon ve SCADA'},
    {id:'s3',name:'Enerji Yönetimi',price:'₺10K/ay',duration:'Sürekli',icon:'bar-chart',description:'IOT bazlı enerji izleme'},
    {id:'s4',name:'Güç Kalitesi',price:'₺5.000',duration:'3 gün',icon:'activity',description:'Harmonik analiz ve kompanzasyon'},
    {id:'s5',name:'Trafo Bakım',price:'₺15K+',duration:'2 gün',icon:'settings',description:'Trafo test ve bakım'}
  ],team:[
    {id:'t1',name:'Müh. Kaan Power',role:'Kurucu & Elektrik Müh.',experience:'12 yıl'},
    {id:'t2',name:'Otomasyon Burak',role:'PLC Programcı',experience:'8 yıl'},
    {id:'t3',name:'Serkan Trafo',role:'Yüksek Gerilim Uzmanı',experience:'15 yıl'}
  ],
  experience:'12 yıl',rating:4.9,reviewCount:180,foundedYear:2013
}
export const ELEKTRIKCI_ENDUSTRIYEL_CONFIG: ThemeConfig = {
  id:'elektrikci-endustriyel',name:'PowerGrid Endüstriyel',sectorId:'elektrikci',plan:'enterprise',description:'Endüstriyel elektrik ve otomasyon çözümleri',
  designPhilosophy:'Endüstriyel güç estetiği. Navy-altın, Space Grotesk. 3D parallax.',inspiration:['Modern TR elektrikci'],sectorSections:['industrial_solutions','project_portfolio'],
  performanceBudget:{maxJS:'250kb',maxLCP:'3.0s',animationLevel:'gsap-parallax'},
  isDark:true,cssVariables:ELEKTRIKCI_ENDUSTRIYEL_CSS,
  fonts:{heading:{family:'Space Grotesk',weights:[500,700],subsets:['latin-ext']},body:{family:'Inter',weights:[300,400],subsets:['latin-ext']}},
  seoSchemaType:'Electrician',
  globalSections:[
    {id:'global-header',type:'header',variant:'auto',order:0,required:true,position:'top',settings:{bgMode:'default',paddingY:'none',containerWidth:'xl',visible:true,order:0,removable:false,animation:'fadeUp'},defaultContent:{logo:{type:'text',text:'PowerGrid Endüstriyel'},menuItems:[{label:'Hizmetler',href:'#hizmetler'},{label:'Hakkımızda',href:'#hakkimizda'},{label:'İletişim',href:'#iletisim'}],cta:{text:'Teklif İste',href:'https://wa.me/908507778899',variant:'solid'}},editableFields:[]},
    {id:'global-footer',type:'footer',variant:'auto',order:999,required:true,position:'bottom',settings:{bgMode:'surface',paddingY:'lg',containerWidth:'xl',visible:true,order:999,removable:false,animation:'fadeUp'},defaultContent:{businessName:'PowerGrid Endüstriyel',description:'OSB lerde endüstriyel elektrik tesisatı ve otomasyon çözümleri.',copyright:'© 2025 PowerGrid Endüstriyel',columns:[{title:'Hizmetler',links:[{label:'Fabrika Tesisat',href:'#'},{label:'Otomasyon (PLC)',href:'#'},{label:'Enerji Yönetimi',href:'#'}]},{title:'Sayfalar',links:[{label:'Hakkımızda',href:'#hakkimizda'},{label:'İletişim',href:'#iletisim'}]}],contact:{phone:'0850 777 88 99',email:'info@powergrid.com.tr',address:'İkitelli OSB No:40'},social:[{platform:'instagram',url:'https://instagram.com/elektrikci-endustriyel',icon:'instagram'}],legal:[{label:'Gizlilik',href:'/gizlilik'},{label:'KVKK',href:'/kvkk'}],poweredBy:'⚡ kepenk.ai'},editableFields:[]},
    {id:'global-whatsapp',type:'whatsapp_cta',variant:'floating',order:1000,required:true,position:'floating',settings:{bgMode:'default',paddingY:'none',containerWidth:'xl',visible:true,order:1000,removable:false,animation:'fadeUp'},defaultContent:{phone:'908507778899',message:'Merhaba, PowerGrid Endüstriyel hakkında bilgi almak istiyorum.'},editableFields:[]},
    {id:'global-cookie',type:'cookie_banner',variant:'bottom_bar',order:1001,required:true,position:'floating',settings:{bgMode:'surface',paddingY:'none',containerWidth:'xl',visible:true,order:1001,removable:false,animation:'fadeUp'},defaultContent:{text:'Bu site çerezleri kullanır.',acceptText:'Kabul Et',rejectText:'Reddet',detailsLink:'/gizlilik'},editableFields:[]}
  ],
  pages:[{id:'anasayfa',slug:'/',title:'PowerGrid Endüstriyel — Başakşehir',titleTr:'Ana Sayfa',isHomePage:true,includeInNav:false,
    sections:[
      {id:'hero',type:'hero',variant:'auto',order:1,required:true,settings:{bgMode:'default',paddingY:'none',containerWidth:'xl',visible:true,order:1,removable:false,animation:'parallax3d'},defaultContent:{badge:'BAŞAKŞEHIR',title:'PowerGrid Endüstriyel',subtitle:'Endüstriyel elektrik ve otomasyon çözümleri',cta1:{text:'Teklif İste',href:'#iletisim'}},editableFields:[]},
      {id:'hakkimizda',type:'about',variant:'auto',order:2,required:false,settings:{bgMode:'default',paddingY:'lg',containerWidth:'xl',visible:true,order:2,removable:true,animation:'fadeUp'},defaultContent:{badge:'HAKKIMIZDA',title:'Biz Kimiz?',description:'OSB lerde endüstriyel elektrik tesisatı ve otomasyon çözümleri.'},editableFields:[]},
      {id:'istatistik',type:'stats',variant:'auto',order:3,required:false,settings:{bgMode:'accent',paddingY:'md',containerWidth:'xl',visible:true,order:3,removable:true,animation:'fadeUp'},defaultContent:{stats:[{value:'12+',label:'Yıl'},{value:'180+',label:'Müşteri'},{value:'4.9',label:'Puan'}]},editableFields:[]},
      {id:'galeri',type:'gallery',variant:'auto',order:4,required:false,settings:{bgMode:'default',paddingY:'lg',containerWidth:'xl',visible:true,order:4,removable:true,animation:'fadeUp'},defaultContent:{badge:'GALERİ',title:'Çalışmalarımız',items:[{id:'g1',url:'/placeholder.jpg'}]},editableFields:[]},
      {id:'hizmetler',type:'services',variant:'auto',order:5,required:true,settings:{bgMode:'surface',paddingY:'lg',containerWidth:'xl',visible:true,order:5,removable:false,animation:'fadeUp'},defaultContent:{badge:'HİZMETLER',title:'Hizmetlerimiz',services:[{id:'s1',name:'Hizmet',description:'Detay için arayın.',icon:'star'}]},editableFields:[]},
      {id:'iletisim',type:'contact',variant:'auto',order:6,required:true,settings:{bgMode:'surface',paddingY:'lg',containerWidth:'xl',visible:true,order:6,removable:false,animation:'fadeUp'},defaultContent:{badge:'İLETİŞİM',title:'Bize Ulaşın',whatsapp:'908507778899'},editableFields:[]}
    ]}]
}
