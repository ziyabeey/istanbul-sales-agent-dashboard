/**
 * @kepenk/templates — emlak-elite | Elite Estates
 * Plan: enterprise | Playfair Display + Inter
 */
import type { ThemeConfig, BusinessData } from '../../../../types/section-types'
export const EMLAK_ELITE_CSS: Record<string,string> = {
  '--color-bg':'#FAFAF9','--color-surface':'#F5F5F4','--color-surface-elevated':'#FFFFFF',
  '--color-surface-muted':'#E7E5E4','--color-text':'#1C1917','--color-text-secondary':'#57534E',
  '--color-text-muted':'#A8A29E','--color-text-on-accent':'#0A0A0A','--color-accent': '#231f93',
  '--color-accent-hover':'#DFC06A','--color-accent-active':'#B8952F','--color-accent-light':'#1A1708',
  '--color-accent-subtle':'#12110A','--color-border':'#D6D3D1','--color-border-subtle':'#E7E5E4',
  '--font-heading':"'Playfair Display',serif",'--font-body':"'Inter',sans-serif",'--radius-md':'2px','--radius-lg':'4px'
}
export const EMLAK_ELITE_BUSINESS: BusinessData = {
  name:'Elite Estates',ownerName:'CEO Kaan Lüks',sector:'emlak',slogan:'İstanbul un en prestijli gayrimenkulleri',
  phone:'0212 999 00 11',phoneClean:'902129990011',whatsapp:'902129990011',email:'vip@eliteestates.com.tr',
  address:'Etiler Mah. Nispetiye No:5, Beşiktaş',city:'İstanbul',district:'Beşiktaş',coordinates:{lat:41.0791,lng:29.0317},
  workingHours:[{day:'monday',dayTr:'Pazartesi',open:'09:00',close:'18:00'},{day:'tuesday',dayTr:'Salı',open:'09:00',close:'18:00'},{day:'wednesday',dayTr:'Çarşamba',open:'09:00',close:'18:00'},{day:'thursday',dayTr:'Perşembe',open:'09:00',close:'18:00'},{day:'friday',dayTr:'Cuma',open:'09:00',close:'18:00'},{day:'saturday',dayTr:'Cumartesi',open:'10:00',close:'14:00'},{day:'sunday',dayTr:'Pazar',open:null,close:null}],
  socialMedia:{instagram:'https://instagram.com/emlak-elite'},photos:[],
  services:[
    {id:'s1',name:'Boğaz Villaları',price:'$2M+',duration:'Özel randevu',icon:'crown',popular:true,description:'Ultra lüks Boğaz villaları'},
    {id:'s2',name:'Penthouse',price:'$1M+',duration:'Özel',icon:'building',description:'Şişli, Levent penthouse'},
    {id:'s3',name:'Yalı Satışı',price:'$5M+',duration:'Gizli ilan',icon:'star',description:'Off-market Boğaz yalıları'},
    {id:'s4',name:'Portföy Yönetimi',price:'%1 komisyon',duration:'Yıllık',icon:'briefcase',description:'Gayrimenkul portföy yönetimi'},
    {id:'s5',name:'Concierge',price:'₺50.000/yıl',duration:'7/24',icon:'phone',description:'VIP gayrimenkul concierge'}
  ],team:[
    {id:'t1',name:'Kaan Lüks',role:'CEO & Kurucu',experience:'9 yıl'},
    {id:'t2',name:'Derya Boğaz',role:'Boğaz Bölge Müdürü',experience:'15 yıl'},
    {id:'t3',name:'Murat Yatırım',role:'Yatırım Direktörü',experience:'12 yıl'}
  ],
  experience:'9 yıl',rating:4.9,reviewCount:180,foundedYear:2016
}
export const EMLAK_ELITE_CONFIG: ThemeConfig = {
  id:'emlak-elite',name:'Elite Estates',sectorId:'emlak',plan:'enterprise',description:'İstanbul un en prestijli gayrimenkulleri',
  designPhilosophy:'Ultra lüks gayrimenkul. Siyah-altın, 3D parallax villa showcase.',inspiration:['Modern TR emlak'],sectorSections:['property_showcase_3d','virtual_tour'],
  performanceBudget:{maxJS:'250kb',maxLCP:'3.0s',animationLevel:'gsap-parallax'},
  isDark:true,cssVariables:EMLAK_ELITE_CSS,
  fonts:{heading:{family:'Playfair Display',weights:[400,700],subsets:['latin-ext']},body:{family:'Inter',weights:[300,400],subsets:['latin-ext']}},
  seoSchemaType:'RealEstateAgent',
  globalSections:[
    {id:'global-header',type:'header',variant:'auto',order:0,required:true,position:'top',settings:{bgMode:'default',paddingY:'none',containerWidth:'xl',visible:true,order:0,removable:false,animation:'fadeUp'},defaultContent:{logo:{type:'text',text:'Elite Estates'},menuItems:[{label:'Hizmetler',href:'#hizmetler'},{label:'Hakkımızda',href:'#hakkimizda'},{label:'İletişim',href:'#iletisim'}],cta:{text:'Özel Randevu',href:'https://wa.me/902129990011',variant:'solid'}},editableFields:[]},
    {id:'global-footer',type:'footer',variant:'auto',order:999,required:true,position:'bottom',settings:{bgMode:'surface',paddingY:'lg',containerWidth:'xl',visible:true,order:999,removable:false,animation:'fadeUp'},defaultContent:{businessName:'Elite Estates',description:'İstanbul Boğaz hattında ultra lüks villa, yalı ve penthouse portföyü.',copyright:'© 2025 Elite Estates',columns:[{title:'Hizmetler',links:[{label:'Boğaz Villaları',href:'#'},{label:'Penthouse',href:'#'},{label:'Yalı Satışı',href:'#'}]},{title:'Sayfalar',links:[{label:'Hakkımızda',href:'#hakkimizda'},{label:'İletişim',href:'#iletisim'}]}],contact:{phone:'0212 999 00 11',email:'vip@eliteestates.com.tr',address:'Etiler Mah. Nispetiye No:5'},social:[{platform:'instagram',url:'https://instagram.com/emlak-elite',icon:'instagram'}],legal:[{label:'Gizlilik',href:'/gizlilik'},{label:'KVKK',href:'/kvkk'}],poweredBy:'⚡ kepenk.ai'},editableFields:[]},
    {id:'global-whatsapp',type:'whatsapp_cta',variant:'floating',order:1000,required:true,position:'floating',settings:{bgMode:'default',paddingY:'none',containerWidth:'xl',visible:true,order:1000,removable:false,animation:'fadeUp'},defaultContent:{phone:'902129990011',message:'Merhaba, Elite Estates hakkında bilgi almak istiyorum.'},editableFields:[]},
    {id:'global-cookie',type:'cookie_banner',variant:'bottom_bar',order:1001,required:true,position:'floating',settings:{bgMode:'surface',paddingY:'none',containerWidth:'xl',visible:true,order:1001,removable:false,animation:'fadeUp'},defaultContent:{text:'Bu site çerezleri kullanır.',acceptText:'Kabul Et',rejectText:'Reddet',detailsLink:'/gizlilik'},editableFields:[]}
  ],
  pages:[{id:'anasayfa',slug:'/',title:'Elite Estates — Beşiktaş',titleTr:'Ana Sayfa',isHomePage:true,includeInNav:false,
    sections:[
      {id:'hero',type:'hero',variant:'auto',order:1,required:true,settings:{bgMode:'default',paddingY:'none',containerWidth:'xl',visible:true,order:1,removable:false,animation:'parallax3d'},defaultContent:{badge:'BEŞIKTAŞ',title:'Elite Estates',subtitle:'İstanbul un en prestijli gayrimenkulleri',cta1:{text:'Özel Randevu',href:'#iletisim'}},editableFields:[]},
      {id:'hakkimizda',type:'about',variant:'auto',order:2,required:false,settings:{bgMode:'default',paddingY:'lg',containerWidth:'xl',visible:true,order:2,removable:true,animation:'fadeUp'},defaultContent:{badge:'HAKKIMIZDA',title:'Biz Kimiz?',description:'İstanbul Boğaz hattında ultra lüks villa, yalı ve penthouse portföyü.'},editableFields:[]},
      {id:'istatistik',type:'stats',variant:'auto',order:3,required:false,settings:{bgMode:'accent',paddingY:'md',containerWidth:'xl',visible:true,order:3,removable:true,animation:'fadeUp'},defaultContent:{stats:[{value:'9+',label:'Yıl'},{value:'180+',label:'Müşteri'},{value:'4.9',label:'Puan'}]},editableFields:[]},
      {id:'galeri',type:'gallery',variant:'auto',order:4,required:false,settings:{bgMode:'default',paddingY:'lg',containerWidth:'xl',visible:true,order:4,removable:true,animation:'fadeUp'},defaultContent:{badge:'GALERİ',title:'Çalışmalarımız',items:[{id:'g1',url:'/placeholder.jpg'}]},editableFields:[]},
      {id:'hizmetler',type:'services',variant:'auto',order:5,required:true,settings:{bgMode:'surface',paddingY:'lg',containerWidth:'xl',visible:true,order:5,removable:false,animation:'fadeUp'},defaultContent:{badge:'HİZMETLER',title:'Hizmetlerimiz',services:[{id:'s1',name:'Hizmet',description:'Detay için arayın.',icon:'star'}]},editableFields:[]},
      {id:'iletisim',type:'contact',variant:'auto',order:6,required:true,settings:{bgMode:'surface',paddingY:'lg',containerWidth:'xl',visible:true,order:6,removable:false,animation:'fadeUp'},defaultContent:{badge:'İLETİŞİM',title:'Bize Ulaşın',whatsapp:'902129990011'},editableFields:[]}
    ]}]
}
