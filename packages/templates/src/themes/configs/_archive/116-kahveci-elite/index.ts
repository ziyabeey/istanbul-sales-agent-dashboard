/**
 * @kepenk/templates — kahveci-elite | Ottoman Coffee House
 * Plan: enterprise | Playfair Display + Inter
 */
import type { ThemeConfig, BusinessData } from '../../../../types/section-types'
export const KAHVECI_ELITE_CSS: Record<string,string> = {
  '--color-bg':'#FAFAF9','--color-surface':'#F5F5F4','--color-surface-elevated':'#FFFFFF',
  '--color-surface-muted':'#E7E5E4','--color-text':'#1C1917','--color-text-secondary':'#57534E',
  '--color-text-muted':'#A8A29E','--color-text-on-accent':'#0A0808','--color-accent': '#4e931f',
  '--color-accent-hover':'#DFC06A','--color-accent-active':'#B8952F','--color-accent-light':'#1A1708',
  '--color-accent-subtle':'#12110A','--color-border':'#D6D3D1','--color-border-subtle':'#E7E5E4',
  '--font-heading':"'Playfair Display',serif",'--font-body':"'Inter',sans-serif",'--radius-md':'2px','--radius-lg':'4px'
}
export const KAHVECI_ELITE_BUSINESS: BusinessData = {
  name:'Ottoman Coffee House',ownerName:'Patron Serkan Ottoman',sector:'kahveci',slogan:'Osmanlı geleneğinde premium Türk kahvesi',
  phone:'0212 444 55 66',phoneClean:'902124445566',whatsapp:'902124445566',email:'info@ottomancoffee.com.tr',
  address:'Sultanahmet Mah. Divanyolu No:8, Fatih',city:'İstanbul',district:'Fatih',coordinates:{lat:41.0084,lng:28.976},
  workingHours:[{day:'monday',dayTr:'Pazartesi',open:'08:00',close:'23:00'},{day:'tuesday',dayTr:'Salı',open:'08:00',close:'23:00'},{day:'wednesday',dayTr:'Çarşamba',open:'08:00',close:'23:00'},{day:'thursday',dayTr:'Perşembe',open:'08:00',close:'23:00'},{day:'friday',dayTr:'Cuma',open:'08:00',close:'23:00'},{day:'saturday',dayTr:'Cumartesi',open:'08:00',close:'00:00'},{day:'sunday',dayTr:'Pazar',open:null,close:null}],
  socialMedia:{instagram:'https://instagram.com/kahveci-elite'},photos:[],
  services:[
    {id:'s1',name:'Osmanlı Kahvesi',price:'₺180',duration:'15 dk',icon:'coffee',popular:true,description:'Geleneksel Osmanlı usulü, bakır cezvede'},
    {id:'s2',name:'Dibek Kahvesi',price:'₺150',duration:'10 dk',icon:'cup',description:'Taş havanda dövülmüş, baharat harmanlı'},
    {id:'s3',name:'Menengiç Kahvesi',price:'₺120',duration:'8 dk',icon:'leaf',description:'Antep fıstığı kahvesi, vegan'},
    {id:'s4',name:'Kahve Keyfi Tabağı',price:'₺350',duration:'30 dk',icon:'crown',description:'Lokum, baklava, meyve tabağı ile'},
    {id:'s5',name:'Kahve Falı',price:'₺200',duration:'20 dk',icon:'eye',description:'Geleneksel Türk kahve falı'}
  ],team:[
    {id:'t1',name:'Serkan Ottoman',role:'Kurucu',experience:'10 yıl'},
    {id:'t2',name:'Fal Bakıcı Ayşe',role:'Kahve Falcısı',experience:'15 yıl'}
  ],
  experience:'10 yıl',rating:4.9,reviewCount:560,foundedYear:2015
}
export const KAHVECI_ELITE_CONFIG: ThemeConfig = {
  id:'kahveci-elite',name:'Ottoman Coffee House',sectorId:'kahveci',plan:'enterprise',description:'Osmanlı geleneğinde premium Türk kahvesi',
  designPhilosophy:'Osmanlı kahve evi lüksü. Koyu altın, Playfair. 3D parallax iç mekan.',inspiration:['Modern TR kahveci'],sectorSections:['menu_grid','ceremony'],
  performanceBudget:{maxJS:'250kb',maxLCP:'3.0s',animationLevel:'gsap-parallax'},
  isDark:true,cssVariables:KAHVECI_ELITE_CSS,
  fonts:{heading:{family:'Playfair Display',weights:[400,700],subsets:['latin-ext']},body:{family:'Inter',weights:[300,400],subsets:['latin-ext']}},
  seoSchemaType:'CafeOrCoffeeShop',
  globalSections:[
    {id:'global-header',type:'header',variant:'auto',order:0,required:true,position:'top',settings:{bgMode:'default',paddingY:'none',containerWidth:'xl',visible:true,order:0,removable:false,animation:'fadeUp'},defaultContent:{logo:{type:'text',text:'Ottoman Coffee House'},menuItems:[{label:'Hizmetler',href:'#hizmetler'},{label:'Hakkımızda',href:'#hakkimizda'},{label:'İletişim',href:'#iletisim'}],cta:{text:'Rezervasyon',href:'https://wa.me/902124445566',variant:'solid'}},editableFields:[]},
    {id:'global-footer',type:'footer',variant:'auto',order:999,required:true,position:'bottom',settings:{bgMode:'surface',paddingY:'lg',containerWidth:'xl',visible:true,order:999,removable:false,animation:'fadeUp'},defaultContent:{businessName:'Ottoman Coffee House',description:'Sultanahmet te, Osmanlı geleneğinde premium Türk kahve deneyimi.',copyright:'© 2025 Ottoman Coffee House',columns:[{title:'Hizmetler',links:[{label:'Osmanlı Kahvesi',href:'#'},{label:'Dibek Kahvesi',href:'#'},{label:'Menengiç Kahvesi',href:'#'}]},{title:'Sayfalar',links:[{label:'Hakkımızda',href:'#hakkimizda'},{label:'İletişim',href:'#iletisim'}]}],contact:{phone:'0212 444 55 66',email:'info@ottomancoffee.com.tr',address:'Sultanahmet Mah. Divanyolu No:8'},social:[{platform:'instagram',url:'https://instagram.com/kahveci-elite',icon:'instagram'}],legal:[{label:'Gizlilik',href:'/gizlilik'},{label:'KVKK',href:'/kvkk'}],poweredBy:'⚡ kepenk.ai'},editableFields:[]},
    {id:'global-whatsapp',type:'whatsapp_cta',variant:'floating',order:1000,required:true,position:'floating',settings:{bgMode:'default',paddingY:'none',containerWidth:'xl',visible:true,order:1000,removable:false,animation:'fadeUp'},defaultContent:{phone:'902124445566',message:'Merhaba, Ottoman Coffee House hakkında bilgi almak istiyorum.'},editableFields:[]},
    {id:'global-cookie',type:'cookie_banner',variant:'bottom_bar',order:1001,required:true,position:'floating',settings:{bgMode:'surface',paddingY:'none',containerWidth:'xl',visible:true,order:1001,removable:false,animation:'fadeUp'},defaultContent:{text:'Bu site çerezleri kullanır.',acceptText:'Kabul Et',rejectText:'Reddet',detailsLink:'/gizlilik'},editableFields:[]}
  ],
  pages:[{id:'anasayfa',slug:'/',title:'Ottoman Coffee House — Fatih',titleTr:'Ana Sayfa',isHomePage:true,includeInNav:false,
    sections:[
      {id:'hero',type:'hero',variant:'auto',order:1,required:true,settings:{bgMode:'default',paddingY:'none',containerWidth:'xl',visible:true,order:1,removable:false,animation:'parallax3d'},defaultContent:{badge:'FATIH',title:'Ottoman Coffee House',subtitle:'Osmanlı geleneğinde premium Türk kahvesi',cta1:{text:'Rezervasyon',href:'#iletisim'}},editableFields:[]},
      {id:'hakkimizda',type:'about',variant:'auto',order:2,required:false,settings:{bgMode:'default',paddingY:'lg',containerWidth:'xl',visible:true,order:2,removable:true,animation:'fadeUp'},defaultContent:{badge:'HAKKIMIZDA',title:'Biz Kimiz?',description:'Sultanahmet te, Osmanlı geleneğinde premium Türk kahve deneyimi.'},editableFields:[]},
      {id:'istatistik',type:'stats',variant:'auto',order:3,required:false,settings:{bgMode:'accent',paddingY:'md',containerWidth:'xl',visible:true,order:3,removable:true,animation:'fadeUp'},defaultContent:{stats:[{value:'10+',label:'Yıl'},{value:'560+',label:'Müşteri'},{value:'4.9',label:'Puan'}]},editableFields:[]},
      {id:'galeri',type:'gallery',variant:'auto',order:4,required:false,settings:{bgMode:'default',paddingY:'lg',containerWidth:'xl',visible:true,order:4,removable:true,animation:'fadeUp'},defaultContent:{badge:'GALERİ',title:'Çalışmalarımız',items:[{id:'g1',url:'/placeholder.jpg'}]},editableFields:[]},
      {id:'hizmetler',type:'services',variant:'auto',order:5,required:true,settings:{bgMode:'surface',paddingY:'lg',containerWidth:'xl',visible:true,order:5,removable:false,animation:'fadeUp'},defaultContent:{badge:'HİZMETLER',title:'Hizmetlerimiz',services:[{id:'s1',name:'Hizmet',description:'Detay için arayın.',icon:'star'}]},editableFields:[]},
      {id:'iletisim',type:'contact',variant:'auto',order:6,required:true,settings:{bgMode:'surface',paddingY:'lg',containerWidth:'xl',visible:true,order:6,removable:false,animation:'fadeUp'},defaultContent:{badge:'İLETİŞİM',title:'Bize Ulaşın',whatsapp:'902124445566'},editableFields:[]}
    ]}]
}
