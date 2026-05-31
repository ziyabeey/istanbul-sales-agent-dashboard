/**
 * @kepenk/templates — emlak-prestij | ProjeMax
 * Plan: pro | DM Serif Display + DM Sans
 */
import type { ThemeConfig, BusinessData } from '../../../../types/section-types'
export const EMLAK_PRESTIJ_CSS: Record<string,string> = {
  '--color-bg':'#FFFFFF','--color-surface':'#F8FAFC','--color-surface-elevated':'#FFFFFF',
  '--color-surface-muted':'#F1F5F9','--color-text':'#0F172A','--color-text-secondary':'#475569',
  '--color-text-muted':'#94A3B8','--color-text-on-accent':'#FFFFFF','--color-accent':'#7C3AED',
  '--color-accent-hover':'#6D28D9','--color-accent-active':'#5B21B6','--color-accent-light':'#EDE9FE',
  '--color-accent-subtle':'#F5F3FF','--color-border':'#E2E8F0','--color-border-subtle':'#F1F5F9',
  '--font-heading':"'DM Serif Display',serif",'--font-body':"'DM Sans',sans-serif",'--radius-md':'6px','--radius-lg':'12px'
}
export const EMLAK_PRESTIJ_BUSINESS: BusinessData = {
  name:'ProjeMax',ownerName:'Taner Proje',sector:'emlak',slogan:'Markalı konut projelerinde uzman',
  phone:'0212 888 99 00',phoneClean:'902128889900',whatsapp:'902128889900',email:'info@projemax.com.tr',
  address:'Ataşehir Blv. No:22, Ataşehir',city:'İstanbul',district:'Ataşehir',coordinates:{lat:40.9923,lng:29.1244},
  workingHours:[{day:'monday',dayTr:'Pazartesi',open:'09:00',close:'18:00'},{day:'tuesday',dayTr:'Salı',open:'09:00',close:'18:00'},{day:'wednesday',dayTr:'Çarşamba',open:'09:00',close:'18:00'},{day:'thursday',dayTr:'Perşembe',open:'09:00',close:'18:00'},{day:'friday',dayTr:'Cuma',open:'09:00',close:'18:00'},{day:'saturday',dayTr:'Cumartesi',open:'10:00',close:'14:00'},{day:'sunday',dayTr:'Pazar',open:null,close:null}],
  socialMedia:{instagram:'https://instagram.com/emlak-prestij'},photos:[],
  services:[
    {id:'s1',name:'Proje Satış',price:'Projeden',duration:'Lansman',icon:'building',popular:true,description:'40+ markalı projede özel fiyat'},
    {id:'s2',name:'Karşılaştırma',price:'Ücretsiz',duration:'1 saat',icon:'columns',description:'Bölge bazlı proje compare'},
    {id:'s3',name:'Taksit Planı',price:'%0 faiz',duration:'Proje bazlı',icon:'calendar',description:'Müteahhit taksit fırsatları'},
    {id:'s4',name:'Maket Tur',price:'Ücretsiz',duration:'30 dk',icon:'eye',description:'Satış ofisi gezisi'},
    {id:'s5',name:'Değer Artış Raporu',price:'₺1.000',duration:'3 gün',icon:'file-text',description:'Bölge değer analizi'}
  ],team:[
    {id:'t1',name:'Taner Proje',role:'Kurucu',experience:'12 yıl'},
    {id:'t2',name:'Elif Satış',role:'Koordinatör',experience:'7 yıl'}
  ],
  experience:'12 yıl',rating:4.8,reviewCount:670,foundedYear:2013
}
export const EMLAK_PRESTIJ_CONFIG: ThemeConfig = {
  id:'emlak-prestij',name:'ProjeMax',sectorId:'emlak',plan:'pro',description:'Markalı konut projelerinde uzman',
  designPhilosophy:'Prestijli proje satışı. Mor aksanlar.',inspiration:['Modern TR emlak'],sectorSections:['project_showcase','virtual_tour'],
  performanceBudget:{maxJS:'250kb',maxLCP:'3.0s',animationLevel:'gsap-allowed'},
  isDark:false,cssVariables:EMLAK_PRESTIJ_CSS,
  fonts:{heading:{family:'DM Serif Display',weights:[400],subsets:['latin-ext']},body:{family:'DM Sans',weights:[400,500],subsets:['latin-ext']}},
  seoSchemaType:'RealEstateAgent',
  globalSections:[
    {id:'global-header',type:'header',variant:'auto',order:0,required:true,position:'top',settings:{bgMode:'default',paddingY:'none',containerWidth:'xl',visible:true,order:0,removable:false,animation:'fadeUp'},defaultContent:{logo:{type:'text',text:'ProjeMax'},menuItems:[{label:'Hizmetler',href:'#hizmetler'},{label:'Hakkımızda',href:'#hakkimizda'},{label:'İletişim',href:'#iletisim'}],cta:{text:'Proje Tur',href:'https://wa.me/902128889900',variant:'solid'}},editableFields:[]},
    {id:'global-footer',type:'footer',variant:'auto',order:999,required:true,position:'bottom',settings:{bgMode:'surface',paddingY:'lg',containerWidth:'xl',visible:true,order:999,removable:false,animation:'fadeUp'},defaultContent:{businessName:'ProjeMax',description:'40+ markalı konut projesinde lansman fiyatlarıyla satış.',copyright:'© 2025 ProjeMax',columns:[{title:'Hizmetler',links:[{label:'Proje Satış',href:'#'},{label:'Karşılaştırma',href:'#'},{label:'Taksit Planı',href:'#'}]},{title:'Sayfalar',links:[{label:'Hakkımızda',href:'#hakkimizda'},{label:'İletişim',href:'#iletisim'}]}],contact:{phone:'0212 888 99 00',email:'info@projemax.com.tr',address:'Ataşehir Blv. No:22'},social:[{platform:'instagram',url:'https://instagram.com/emlak-prestij',icon:'instagram'}],legal:[{label:'Gizlilik',href:'/gizlilik'},{label:'KVKK',href:'/kvkk'}],poweredBy:'⚡ kepenk.ai'},editableFields:[]},
    {id:'global-whatsapp',type:'whatsapp_cta',variant:'floating',order:1000,required:true,position:'floating',settings:{bgMode:'default',paddingY:'none',containerWidth:'xl',visible:true,order:1000,removable:false,animation:'fadeUp'},defaultContent:{phone:'902128889900',message:'Merhaba, ProjeMax hakkında bilgi almak istiyorum.'},editableFields:[]},
    {id:'global-cookie',type:'cookie_banner',variant:'bottom_bar',order:1001,required:true,position:'floating',settings:{bgMode:'surface',paddingY:'none',containerWidth:'xl',visible:true,order:1001,removable:false,animation:'fadeUp'},defaultContent:{text:'Bu site çerezleri kullanır.',acceptText:'Kabul Et',rejectText:'Reddet',detailsLink:'/gizlilik'},editableFields:[]}
  ],
  pages:[{id:'anasayfa',slug:'/',title:'ProjeMax — Ataşehir',titleTr:'Ana Sayfa',isHomePage:true,includeInNav:false,
    sections:[
      {id:'hero',type:'hero',variant:'auto',order:1,required:true,settings:{bgMode:'default',paddingY:'none',containerWidth:'xl',visible:true,order:1,removable:false,animation:'fadeUp'},defaultContent:{badge:'ATAŞEHIR',title:'ProjeMax',subtitle:'Markalı konut projelerinde uzman',cta1:{text:'Proje Tur',href:'#iletisim'}},editableFields:[]},
      {id:'hakkimizda',type:'about',variant:'auto',order:2,required:false,settings:{bgMode:'default',paddingY:'lg',containerWidth:'xl',visible:true,order:2,removable:true,animation:'fadeUp'},defaultContent:{badge:'HAKKIMIZDA',title:'Biz Kimiz?',description:'40+ markalı konut projesinde lansman fiyatlarıyla satış.'},editableFields:[]},
      {id:'istatistik',type:'stats',variant:'auto',order:3,required:false,settings:{bgMode:'accent',paddingY:'md',containerWidth:'xl',visible:true,order:3,removable:true,animation:'fadeUp'},defaultContent:{stats:[{value:'12+',label:'Yıl'},{value:'670+',label:'Müşteri'},{value:'4.8',label:'Puan'}]},editableFields:[]},
      {id:'galeri',type:'gallery',variant:'auto',order:4,required:false,settings:{bgMode:'default',paddingY:'lg',containerWidth:'xl',visible:true,order:4,removable:true,animation:'fadeUp'},defaultContent:{badge:'GALERİ',title:'Çalışmalarımız',items:[{id:'g1',url:'/placeholder.jpg'}]},editableFields:[]},
      {id:'hizmetler',type:'services',variant:'auto',order:5,required:true,settings:{bgMode:'surface',paddingY:'lg',containerWidth:'xl',visible:true,order:5,removable:false,animation:'fadeUp'},defaultContent:{badge:'HİZMETLER',title:'Hizmetlerimiz',services:[{id:'s1',name:'Hizmet',description:'Detay için arayın.',icon:'star'}]},editableFields:[]},
      {id:'iletisim',type:'contact',variant:'auto',order:6,required:true,settings:{bgMode:'surface',paddingY:'lg',containerWidth:'xl',visible:true,order:6,removable:false,animation:'fadeUp'},defaultContent:{badge:'İLETİŞİM',title:'Bize Ulaşın',whatsapp:'902128889900'},editableFields:[]}
    ]}]
}
