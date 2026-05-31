/**
 * @kepenk/templates — emlak-sade | Güven Emlak
 * Plan: free | Roboto + Roboto
 */
import type { ThemeConfig, BusinessData } from '../../../../types/section-types'
export const EMLAK_SADE_CSS: Record<string,string> = {
  '--color-bg':'#FFFFFF','--color-surface':'#F8FAFC','--color-surface-elevated':'#FFFFFF',
  '--color-surface-muted':'#F1F5F9','--color-text':'#0F172A','--color-text-secondary':'#475569',
  '--color-text-muted':'#94A3B8','--color-text-on-accent':'#FFFFFF','--color-accent':'#198754',
  '--color-accent-hover':'#157347','--color-accent-active':'#146C43','--color-accent-light':'#D1E7DD',
  '--color-accent-subtle':'#F0FAF4','--color-border':'#E2E8F0','--color-border-subtle':'#F1F5F9',
  '--font-heading':"'Roboto',sans-serif",'--font-body':"'Roboto',sans-serif",'--radius-md':'6px','--radius-lg':'12px'
}
export const EMLAK_SADE_BUSINESS: BusinessData = {
  name:'Güven Emlak',ownerName:'Ahmet Güven',sector:'emlak',slogan:'Dürüst ve şeffaf emlak danışmanlığı',
  phone:'0212 222 33 44',phoneClean:'902122223344',whatsapp:'902122223344',email:'info@guvennemlak.com',
  address:'Bahçelievler Mah. Cad. No:50, Bahçelievler',city:'İstanbul',district:'Bahçelievler',coordinates:{lat:41.0022,lng:28.8561},
  workingHours:[{day:'monday',dayTr:'Pazartesi',open:'09:00',close:'18:00'},{day:'tuesday',dayTr:'Salı',open:'09:00',close:'18:00'},{day:'wednesday',dayTr:'Çarşamba',open:'09:00',close:'18:00'},{day:'thursday',dayTr:'Perşembe',open:'09:00',close:'18:00'},{day:'friday',dayTr:'Cuma',open:'09:00',close:'18:00'},{day:'saturday',dayTr:'Cumartesi',open:'10:00',close:'14:00'},{day:'sunday',dayTr:'Pazar',open:null,close:null}],
  socialMedia:{instagram:'https://instagram.com/emlak-sade'},photos:[],
  services:[
    {id:'s1',name:'Satılık Daire',price:'%2 komisyon',duration:'İlan süresi',icon:'home',popular:true,description:'Bahçelievler ve çevresi'},
    {id:'s2',name:'Kiralık Daire',price:'1 kira',duration:'15 gün',icon:'key',description:'Uygun fiyatlı kiralık'},
    {id:'s3',name:'Tapu İşlemleri',price:'₺1.000',duration:'1 hafta',icon:'shield',description:'Tapu devir takibi'},
    {id:'s4',name:'Değerleme',price:'₺1.000',duration:'2 gün',icon:'calculator',description:'Bağımsız değerleme'},
    {id:'s5',name:'İşyeri Kiralama',price:'1 kira',duration:'İlan süresi',icon:'building',description:'Dükkan ve ofis kiralama'}
  ],team:[
    {id:'t1',name:'Ahmet Güven',role:'Kurucu',experience:'22 yıl'}
  ],
  experience:'22 yıl',rating:4.5,reviewCount:1400,foundedYear:2003
}
export const EMLAK_SADE_CONFIG: ThemeConfig = {
  id:'emlak-sade',name:'Güven Emlak',sectorId:'emlak',plan:'free',description:'Dürüst ve şeffaf emlak danışmanlığı',
  designPhilosophy:'Güvenilir semt emlakçısı. Yeşil-beyaz, Roboto sade.',inspiration:['Modern TR emlak'],sectorSections:['property_listing','pricing'],
  performanceBudget:{maxJS:'250kb',maxLCP:'3.0s',animationLevel:'gsap-allowed'},
  isDark:false,cssVariables:EMLAK_SADE_CSS,
  fonts:{heading:{family:'Roboto',weights:[500,700],subsets:['latin-ext']},body:{family:'Roboto',weights:[400,500],subsets:['latin-ext']}},
  seoSchemaType:'RealEstateAgent',
  globalSections:[
    {id:'global-header',type:'header',variant:'auto',order:0,required:true,position:'top',settings:{bgMode:'default',paddingY:'none',containerWidth:'xl',visible:true,order:0,removable:false,animation:'fadeUp'},defaultContent:{logo:{type:'text',text:'Güven Emlak'},menuItems:[{label:'Hizmetler',href:'#hizmetler'},{label:'Hakkımızda',href:'#hakkimizda'},{label:'İletişim',href:'#iletisim'}],cta:{text:'Ara',href:'https://wa.me/902122223344',variant:'solid'}},editableFields:[]},
    {id:'global-footer',type:'footer',variant:'auto',order:999,required:true,position:'bottom',settings:{bgMode:'surface',paddingY:'lg',containerWidth:'xl',visible:true,order:999,removable:false,animation:'fadeUp'},defaultContent:{businessName:'Güven Emlak',description:'2003 den beri Bahçelievler halkına dürüst emlak hizmeti.',copyright:'© 2025 Güven Emlak',columns:[{title:'Hizmetler',links:[{label:'Satılık Daire',href:'#'},{label:'Kiralık Daire',href:'#'},{label:'Tapu İşlemleri',href:'#'}]},{title:'Sayfalar',links:[{label:'Hakkımızda',href:'#hakkimizda'},{label:'İletişim',href:'#iletisim'}]}],contact:{phone:'0212 222 33 44',email:'info@guvennemlak.com',address:'Bahçelievler Mah. Cad. No:50'},social:[{platform:'instagram',url:'https://instagram.com/emlak-sade',icon:'instagram'}],legal:[{label:'Gizlilik',href:'/gizlilik'},{label:'KVKK',href:'/kvkk'}],poweredBy:'⚡ kepenk.ai'},editableFields:[]},
    {id:'global-whatsapp',type:'whatsapp_cta',variant:'floating',order:1000,required:true,position:'floating',settings:{bgMode:'default',paddingY:'none',containerWidth:'xl',visible:true,order:1000,removable:false,animation:'fadeUp'},defaultContent:{phone:'902122223344',message:'Merhaba, Güven Emlak hakkında bilgi almak istiyorum.'},editableFields:[]},
    {id:'global-cookie',type:'cookie_banner',variant:'bottom_bar',order:1001,required:true,position:'floating',settings:{bgMode:'surface',paddingY:'none',containerWidth:'xl',visible:true,order:1001,removable:false,animation:'fadeUp'},defaultContent:{text:'Bu site çerezleri kullanır.',acceptText:'Kabul Et',rejectText:'Reddet',detailsLink:'/gizlilik'},editableFields:[]}
  ],
  pages:[{id:'anasayfa',slug:'/',title:'Güven Emlak — Bahçelievler',titleTr:'Ana Sayfa',isHomePage:true,includeInNav:false,
    sections:[
      {id:'hero',type:'hero',variant:'auto',order:1,required:true,settings:{bgMode:'default',paddingY:'none',containerWidth:'xl',visible:true,order:1,removable:false,animation:'fadeUp'},defaultContent:{badge:'BAHÇELIEVLER',title:'Güven Emlak',subtitle:'Dürüst ve şeffaf emlak danışmanlığı',cta1:{text:'Ara',href:'#iletisim'}},editableFields:[]},
      {id:'hakkimizda',type:'about',variant:'auto',order:2,required:false,settings:{bgMode:'default',paddingY:'lg',containerWidth:'xl',visible:true,order:2,removable:true,animation:'fadeUp'},defaultContent:{badge:'HAKKIMIZDA',title:'Biz Kimiz?',description:'2003 den beri Bahçelievler halkına dürüst emlak hizmeti.'},editableFields:[]},
      {id:'istatistik',type:'stats',variant:'auto',order:3,required:false,settings:{bgMode:'accent',paddingY:'md',containerWidth:'xl',visible:true,order:3,removable:true,animation:'fadeUp'},defaultContent:{stats:[{value:'22+',label:'Yıl'},{value:'1400+',label:'Müşteri'},{value:'4.5',label:'Puan'}]},editableFields:[]},
      {id:'galeri',type:'gallery',variant:'auto',order:4,required:false,settings:{bgMode:'default',paddingY:'lg',containerWidth:'xl',visible:true,order:4,removable:true,animation:'fadeUp'},defaultContent:{badge:'GALERİ',title:'Çalışmalarımız',items:[{id:'g1',url:'/placeholder.jpg'}]},editableFields:[]},
      {id:'hizmetler',type:'services',variant:'auto',order:5,required:true,settings:{bgMode:'surface',paddingY:'lg',containerWidth:'xl',visible:true,order:5,removable:false,animation:'fadeUp'},defaultContent:{badge:'HİZMETLER',title:'Hizmetlerimiz',services:[{id:'s1',name:'Hizmet',description:'Detay için arayın.',icon:'star'}]},editableFields:[]},
      {id:'iletisim',type:'contact',variant:'auto',order:6,required:true,settings:{bgMode:'surface',paddingY:'lg',containerWidth:'xl',visible:true,order:6,removable:false,animation:'fadeUp'},defaultContent:{badge:'İLETİŞİM',title:'Bize Ulaşın',whatsapp:'902122223344'},editableFields:[]}
    ]}]
}
