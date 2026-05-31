/**
 * @kepenk/templates — eczane-gece | Gece Nöbet Eczanesi
 * Plan: starter | Space Grotesk + Inter
 */
import type { ThemeConfig, BusinessData } from '../../../../types/section-types'
export const ECZANE_GECE_CSS: Record<string,string> = {
  '--color-bg':'#0F172A','--color-surface':'#1E293B','--color-surface-elevated':'#334155',
  '--color-surface-muted':'#0B1120','--color-text':'#F8FAFC','--color-text-secondary':'#94A3B8',
  '--color-text-muted':'#475569','--color-text-on-accent':'#0F172A','--color-accent':'#38BDF8',
  '--color-accent-hover':'#7DD3FC','--color-accent-active':'#0EA5E9','--color-accent-light':'#0C1D2E',
  '--color-accent-subtle':'#0A1520','--color-border':'#334155','--color-border-subtle':'#1E293B',
  '--font-heading':"'Space Grotesk',sans-serif",'--font-body':"'Inter',sans-serif",'--radius-md':'0px','--radius-lg':'0px'
}
export const ECZANE_GECE_BUSINESS: BusinessData = {
  name:'Gece Nöbet Eczanesi',ownerName:'Ecz. Ahmet Gece',sector:'eczane',slogan:'7/24 sağlık güvencesi',
  phone:'0212 777 00 00',phoneClean:'902127770000',whatsapp:'902127770000',email:'info@gecenobet.com',
  address:'Şişli Mah. Halaskargazi No:200, Şişli',city:'İstanbul',district:'Şişli',coordinates:{lat:41.0584,lng:28.987},
  workingHours:[{day:'monday',dayTr:'Pazartesi',open:'00:00',close:'23:59'},{day:'tuesday',dayTr:'Salı',open:'00:00',close:'23:59'},{day:'wednesday',dayTr:'Çarşamba',open:'00:00',close:'23:59'},{day:'thursday',dayTr:'Perşembe',open:'00:00',close:'23:59'},{day:'friday',dayTr:'Cuma',open:'00:00',close:'23:59'},{day:'saturday',dayTr:'Cumartesi',open:'00:00',close:'23:59'},{day:'sunday',dayTr:'Pazar',open:null,close:null}],
  socialMedia:{instagram:'https://instagram.com/eczane-gece'},photos:[],
  services:[
    {id:'s1',name:'7/24 İlaç',price:'SGK + Serbest',duration:'Hemen',icon:'clock',popular:true,description:'Gece-gündüz kesintisiz hizmet'},
    {id:'s2',name:'Acil Reçete',price:'SGK',duration:'5 dk',icon:'alert-triangle',description:'Acil reçete karşılama'},
    {id:'s3',name:'Evde İlaç',price:'₺50 teslimat',duration:'30 dk',icon:'truck',description:'İstanbul Avrupa yakası teslimat'},
    {id:'s4',name:'Tansiyon Ölçüm',price:'Ücretsiz',duration:'5 dk',icon:'heart',description:'Gece de ücretsiz ölçüm'},
    {id:'s5',name:'İlk Yardım',price:'Değişken',duration:'Hemen',icon:'plus',description:'Acil ilk yardım malzemeleri'}
  ],team:[
    {id:'t1',name:'Ecz. Ahmet Gece',role:'Kurucu',experience:'25 yıl'},
    {id:'t2',name:'Ecz. Merve Nöbet',role:'Gece Eczacısı',experience:'8 yıl'}
  ],
  experience:'25 yıl',rating:4.5,reviewCount:1200,foundedYear:2000
}
export const ECZANE_GECE_CONFIG: ThemeConfig = {
  id:'eczane-gece',name:'Gece Nöbet Eczanesi',sectorId:'eczane',plan:'starter',description:'7/24 sağlık güvencesi',
  designPhilosophy:'Gece nöbet eczanesi. Koyu lacivert, parlak mavi. 7/24 vurgusu.',inspiration:['Modern TR eczane'],sectorSections:['emergency_service','location_map'],
  performanceBudget:{maxJS:'250kb',maxLCP:'3.0s',animationLevel:'gsap-allowed'},
  isDark:true,cssVariables:ECZANE_GECE_CSS,
  fonts:{heading:{family:'Space Grotesk',weights:[500,700],subsets:['latin-ext']},body:{family:'Inter',weights:[400,500],subsets:['latin-ext']}},
  seoSchemaType:'Pharmacy',
  globalSections:[
    {id:'global-header',type:'header',variant:'auto',order:0,required:true,position:'top',settings:{bgMode:'default',paddingY:'none',containerWidth:'xl',visible:true,order:0,removable:false,animation:'fadeUp'},defaultContent:{logo:{type:'text',text:'Gece Nöbet Eczanesi'},menuItems:[{label:'Hizmetler',href:'#hizmetler'},{label:'Hakkımızda',href:'#hakkimizda'},{label:'İletişim',href:'#iletisim'}],cta:{text:'Hemen Ara',href:'https://wa.me/902127770000',variant:'solid'}},editableFields:[]},
    {id:'global-footer',type:'footer',variant:'auto',order:999,required:true,position:'bottom',settings:{bgMode:'surface',paddingY:'lg',containerWidth:'xl',visible:true,order:999,removable:false,animation:'fadeUp'},defaultContent:{businessName:'Gece Nöbet Eczanesi',description:'Şişli merkezde 7/24 nöbet eczanesi. Kesintisiz sağlık hizmeti.',copyright:'© 2025 Gece Nöbet Eczanesi',columns:[{title:'Hizmetler',links:[{label:'7/24 İlaç',href:'#'},{label:'Acil Reçete',href:'#'},{label:'Evde İlaç',href:'#'}]},{title:'Sayfalar',links:[{label:'Hakkımızda',href:'#hakkimizda'},{label:'İletişim',href:'#iletisim'}]}],contact:{phone:'0212 777 00 00',email:'info@gecenobet.com',address:'Şişli Mah. Halaskargazi No:200'},social:[{platform:'instagram',url:'https://instagram.com/eczane-gece',icon:'instagram'}],legal:[{label:'Gizlilik',href:'/gizlilik'},{label:'KVKK',href:'/kvkk'}],poweredBy:'⚡ kepenk.ai'},editableFields:[]},
    {id:'global-whatsapp',type:'whatsapp_cta',variant:'floating',order:1000,required:true,position:'floating',settings:{bgMode:'default',paddingY:'none',containerWidth:'xl',visible:true,order:1000,removable:false,animation:'fadeUp'},defaultContent:{phone:'902127770000',message:'Merhaba, Gece Nöbet Eczanesi hakkında bilgi almak istiyorum.'},editableFields:[]},
    {id:'global-cookie',type:'cookie_banner',variant:'bottom_bar',order:1001,required:true,position:'floating',settings:{bgMode:'surface',paddingY:'none',containerWidth:'xl',visible:true,order:1001,removable:false,animation:'fadeUp'},defaultContent:{text:'Bu site çerezleri kullanır.',acceptText:'Kabul Et',rejectText:'Reddet',detailsLink:'/gizlilik'},editableFields:[]}
  ],
  pages:[{id:'anasayfa',slug:'/',title:'Gece Nöbet Eczanesi — Şişli',titleTr:'Ana Sayfa',isHomePage:true,includeInNav:false,
    sections:[
      {id:'hero',type:'hero',variant:'auto',order:1,required:true,settings:{bgMode:'default',paddingY:'none',containerWidth:'xl',visible:true,order:1,removable:false,animation:'fadeUp'},defaultContent:{badge:'ŞIŞLI',title:'Gece Nöbet Eczanesi',subtitle:'7/24 sağlık güvencesi',cta1:{text:'Hemen Ara',href:'#iletisim'}},editableFields:[]},
      {id:'hakkimizda',type:'about',variant:'auto',order:2,required:false,settings:{bgMode:'default',paddingY:'lg',containerWidth:'xl',visible:true,order:2,removable:true,animation:'fadeUp'},defaultContent:{badge:'HAKKIMIZDA',title:'Biz Kimiz?',description:'Şişli merkezde 7/24 nöbet eczanesi. Kesintisiz sağlık hizmeti.'},editableFields:[]},
      {id:'istatistik',type:'stats',variant:'auto',order:3,required:false,settings:{bgMode:'accent',paddingY:'md',containerWidth:'xl',visible:true,order:3,removable:true,animation:'fadeUp'},defaultContent:{stats:[{value:'25+',label:'Yıl'},{value:'1200+',label:'Müşteri'},{value:'4.5',label:'Puan'}]},editableFields:[]},
      {id:'galeri',type:'gallery',variant:'auto',order:4,required:false,settings:{bgMode:'default',paddingY:'lg',containerWidth:'xl',visible:true,order:4,removable:true,animation:'fadeUp'},defaultContent:{badge:'GALERİ',title:'Çalışmalarımız',items:[{id:'g1',url:'/placeholder.jpg'}]},editableFields:[]},
      {id:'hizmetler',type:'services',variant:'auto',order:5,required:true,settings:{bgMode:'surface',paddingY:'lg',containerWidth:'xl',visible:true,order:5,removable:false,animation:'fadeUp'},defaultContent:{badge:'HİZMETLER',title:'Hizmetlerimiz',services:[{id:'s1',name:'Hizmet',description:'Detay için arayın.',icon:'star'}]},editableFields:[]},
      {id:'iletisim',type:'contact',variant:'auto',order:6,required:true,settings:{bgMode:'surface',paddingY:'lg',containerWidth:'xl',visible:true,order:6,removable:false,animation:'fadeUp'},defaultContent:{badge:'İLETİŞİM',title:'Bize Ulaşın',whatsapp:'902127770000'},editableFields:[]}
    ]}]
}
