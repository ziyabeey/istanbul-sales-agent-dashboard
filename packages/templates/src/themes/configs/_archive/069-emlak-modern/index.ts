/**
 * @kepenk/templates — emlak-modern | ModernEstate
 * Plan: growth | Poppins + Inter
 */
import type { ThemeConfig, BusinessData } from '../../../../types/section-types'
export const EMLAK_MODERN_CSS: Record<string,string> = {
  '--color-bg':'#FCFCFD','--color-surface':'#F1F3F5','--color-surface-elevated':'#FFFFFF',
  '--color-surface-muted':'#E9ECEF','--color-text':'#212529','--color-text-secondary':'#495057',
  '--color-text-muted':'#868E96','--color-text-on-accent':'#FFFFFF','--color-accent': '#d0257a',
  '--color-accent-hover':'#1D4ED8','--color-accent-active':'#1E40AF','--color-accent-light':'#DBEAFE',
  '--color-accent-subtle':'#EFF6FF','--color-border':'#DEE2E6','--color-border-subtle':'#F1F3F5',
  '--font-heading':"'Poppins',sans-serif",'--font-body':"'Inter',sans-serif",'--radius-md':'8px','--radius-lg':'16px'
}
export const EMLAK_MODERN_BUSINESS: BusinessData = {
  name:'ModernEstate',ownerName:'Murat Ev',sector:'emlak',slogan:'Kadıköy de kiralık-satılık daire',
  phone:'0216 444 55 66',phoneClean:'902164445566',whatsapp:'902164445566',email:'info@modernestate.com',
  address:'Caferağa Mah. Moda Cad. No:78, Kadıköy',city:'İstanbul',district:'Kadıköy',coordinates:{lat:40.9869,lng:29.0258},
  workingHours:[{day:'monday',dayTr:'Pazartesi',open:'09:00',close:'18:00'},{day:'tuesday',dayTr:'Salı',open:'09:00',close:'18:00'},{day:'wednesday',dayTr:'Çarşamba',open:'09:00',close:'18:00'},{day:'thursday',dayTr:'Perşembe',open:'09:00',close:'18:00'},{day:'friday',dayTr:'Cuma',open:'09:00',close:'18:00'},{day:'saturday',dayTr:'Cumartesi',open:'10:00',close:'14:00'},{day:'sunday',dayTr:'Pazar',open:null,close:null}],
  socialMedia:{instagram:'https://instagram.com/emlak-modern'},photos:[],
  services:[
    {id:'s1',name:'Daire Satış',price:'%2 komisyon',duration:'30 gün+',icon:'home',popular:true,description:'Profesyonel fotoğraf ve ilan'},
    {id:'s2',name:'Kiralık Daire',price:'1 kira',duration:'15 gün',icon:'key',description:'Kiracı bulma ve kontrat'},
    {id:'s3',name:'Değerleme',price:'₺2.000',duration:'3 gün',icon:'calculator',description:'SPK lisanslı değerleme'},
    {id:'s4',name:'Yatırım Danışmanlık',price:'Ücretsiz',duration:'1 saat',icon:'trending-up',description:'Bölge analizi ve getiri'},
    {id:'s5',name:'Hukuki Destek',price:'₺3.000',duration:'Sürece bağlı',icon:'scale',description:'Tapu ve iskan işlemleri'}
  ],team:[
    {id:'t1',name:'Murat Ev',role:'Kurucu',experience:'17 yıl'},
    {id:'t2',name:'Selin Kiralık',role:'Kiralama Uzmanı',experience:'8 yıl'},
    {id:'t3',name:'Burak Yatırım',role:'Yatırım Danışmanı',experience:'10 yıl'}
  ],
  experience:'17 yıl',rating:4.7,reviewCount:890,foundedYear:2008
}
export const EMLAK_MODERN_CONFIG: ThemeConfig = {
  id:'emlak-modern',name:'ModernEstate',sectorId:'emlak',plan:'growth',description:'Kadıköy de kiralık-satılık daire',
  designPhilosophy:'Modern emlak. Mavi, Poppins profesyonel.',inspiration:['Modern TR emlak'],sectorSections:['property_listing','neighborhood_map'],
  performanceBudget:{maxJS:'250kb',maxLCP:'3.0s',animationLevel:'gsap-allowed'},
  isDark:false,cssVariables:EMLAK_MODERN_CSS,
  fonts:{heading:{family:'Poppins',weights:[600,700],subsets:['latin-ext']},body:{family:'Inter',weights:[400,500],subsets:['latin-ext']}},
  seoSchemaType:'RealEstateAgent',
  globalSections:[
    {id:'global-header',type:'header',variant:'auto',order:0,required:true,position:'top',settings:{bgMode:'default',paddingY:'none',containerWidth:'xl',visible:true,order:0,removable:false,animation:'fadeUp'},defaultContent:{logo:{type:'text',text:'ModernEstate'},menuItems:[{label:'Hizmetler',href:'#hizmetler'},{label:'Hakkımızda',href:'#hakkimizda'},{label:'İletişim',href:'#iletisim'}],cta:{text:'Bilgi Al',href:'https://wa.me/902164445566',variant:'solid'}},editableFields:[]},
    {id:'global-footer',type:'footer',variant:'auto',order:999,required:true,position:'bottom',settings:{bgMode:'surface',paddingY:'lg',containerWidth:'xl',visible:true,order:999,removable:false,animation:'fadeUp'},defaultContent:{businessName:'ModernEstate',description:'2008 den beri Kadıköy Moda bölgesinde güvenilir emlak hizmeti.',copyright:'© 2025 ModernEstate',columns:[{title:'Hizmetler',links:[{label:'Daire Satış',href:'#'},{label:'Kiralık Daire',href:'#'},{label:'Değerleme',href:'#'}]},{title:'Sayfalar',links:[{label:'Hakkımızda',href:'#hakkimizda'},{label:'İletişim',href:'#iletisim'}]}],contact:{phone:'0216 444 55 66',email:'info@modernestate.com',address:'Caferağa Mah. Moda Cad. No:78'},social:[{platform:'instagram',url:'https://instagram.com/emlak-modern',icon:'instagram'}],legal:[{label:'Gizlilik',href:'/gizlilik'},{label:'KVKK',href:'/kvkk'}],poweredBy:'⚡ kepenk.ai'},editableFields:[]},
    {id:'global-whatsapp',type:'whatsapp_cta',variant:'floating',order:1000,required:true,position:'floating',settings:{bgMode:'default',paddingY:'none',containerWidth:'xl',visible:true,order:1000,removable:false,animation:'fadeUp'},defaultContent:{phone:'902164445566',message:'Merhaba, ModernEstate hakkında bilgi almak istiyorum.'},editableFields:[]},
    {id:'global-cookie',type:'cookie_banner',variant:'bottom_bar',order:1001,required:true,position:'floating',settings:{bgMode:'surface',paddingY:'none',containerWidth:'xl',visible:true,order:1001,removable:false,animation:'fadeUp'},defaultContent:{text:'Bu site çerezleri kullanır.',acceptText:'Kabul Et',rejectText:'Reddet',detailsLink:'/gizlilik'},editableFields:[]}
  ],
  pages:[{id:'anasayfa',slug:'/',title:'ModernEstate — Kadıköy',titleTr:'Ana Sayfa',isHomePage:true,includeInNav:false,
    sections:[
      {id:'hero',type:'hero',variant:'auto',order:1,required:true,settings:{bgMode:'default',paddingY:'none',containerWidth:'xl',visible:true,order:1,removable:false,animation:'fadeUp'},defaultContent:{badge:'KADIKÖY',title:'ModernEstate',subtitle:'Kadıköy de kiralık-satılık daire',cta1:{text:'Bilgi Al',href:'#iletisim'}},editableFields:[]},
      {id:'hakkimizda',type:'about',variant:'auto',order:2,required:false,settings:{bgMode:'default',paddingY:'lg',containerWidth:'xl',visible:true,order:2,removable:true,animation:'fadeUp'},defaultContent:{badge:'HAKKIMIZDA',title:'Biz Kimiz?',description:'2008 den beri Kadıköy Moda bölgesinde güvenilir emlak hizmeti.'},editableFields:[]},
      {id:'istatistik',type:'stats',variant:'auto',order:3,required:false,settings:{bgMode:'accent',paddingY:'md',containerWidth:'xl',visible:true,order:3,removable:true,animation:'fadeUp'},defaultContent:{stats:[{value:'17+',label:'Yıl'},{value:'890+',label:'Müşteri'},{value:'4.7',label:'Puan'}]},editableFields:[]},
      {id:'galeri',type:'gallery',variant:'auto',order:4,required:false,settings:{bgMode:'default',paddingY:'lg',containerWidth:'xl',visible:true,order:4,removable:true,animation:'fadeUp'},defaultContent:{badge:'GALERİ',title:'Çalışmalarımız',items:[{id:'g1',url:'/placeholder.jpg'}]},editableFields:[]},
      {id:'hizmetler',type:'services',variant:'auto',order:5,required:true,settings:{bgMode:'surface',paddingY:'lg',containerWidth:'xl',visible:true,order:5,removable:false,animation:'fadeUp'},defaultContent:{badge:'HİZMETLER',title:'Hizmetlerimiz',services:[{id:'s1',name:'Hizmet',description:'Detay için arayın.',icon:'star'}]},editableFields:[]},
      {id:'iletisim',type:'contact',variant:'auto',order:6,required:true,settings:{bgMode:'surface',paddingY:'lg',containerWidth:'xl',visible:true,order:6,removable:false,animation:'fadeUp'},defaultContent:{badge:'İLETİŞİM',title:'Bize Ulaşın',whatsapp:'902164445566'},editableFields:[]}
    ]}]
}
