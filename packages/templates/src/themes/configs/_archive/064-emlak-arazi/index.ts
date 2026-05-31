/**
 * @kepenk/templates — emlak-arazi | Arazi Yatırım
 * Plan: pro | Outfit + Inter
 */
import type { ThemeConfig, BusinessData } from '../../../../types/section-types'
export const EMLAK_ARAZI_CSS: Record<string,string> = {
  '--color-bg':'#FFFFFF','--color-surface':'#F8FAFC','--color-surface-elevated':'#FFFFFF',
  '--color-surface-muted':'#F1F5F9','--color-text':'#0F172A','--color-text-secondary':'#475569',
  '--color-text-muted':'#94A3B8','--color-text-on-accent':'#FFFFFF','--color-accent':'#16A34A',
  '--color-accent-hover':'#15803D','--color-accent-active':'#166534','--color-accent-light':'#F0FDF4',
  '--color-accent-subtle':'#FAFFFC','--color-border':'#E2E8F0','--color-border-subtle':'#F1F5F9',
  '--font-heading':"'Outfit',sans-serif",'--font-body':"'Inter',sans-serif",'--radius-md':'6px','--radius-lg':'12px'
}
export const EMLAK_ARAZI_BUSINESS: BusinessData = {
  name:'Arazi Yatırım',ownerName:'Selim Toprak',sector:'emlak',slogan:'Arsa ve arazi yatırımında güvenilir danışman',
  phone:'0532 111 22 33',phoneClean:'905321112233',whatsapp:'905321112233',email:'info@araziyatirim.com.tr',
  address:'Silivri Mah. Atatürk Cad. No:45, Silivri',city:'İstanbul',district:'Silivri',coordinates:{lat:41.0733,lng:28.2469},
  workingHours:[{day:'monday',dayTr:'Pazartesi',open:'09:00',close:'18:00'},{day:'tuesday',dayTr:'Salı',open:'09:00',close:'18:00'},{day:'wednesday',dayTr:'Çarşamba',open:'09:00',close:'18:00'},{day:'thursday',dayTr:'Perşembe',open:'09:00',close:'18:00'},{day:'friday',dayTr:'Cuma',open:'09:00',close:'18:00'},{day:'saturday',dayTr:'Cumartesi',open:'10:00',close:'14:00'},{day:'sunday',dayTr:'Pazar',open:null,close:null}],
  socialMedia:{instagram:'https://instagram.com/emlak-arazi'},photos:[],
  services:[
    {id:'s1',name:'Arsa Değerleme',price:'Ücretsiz',duration:'1 gün',icon:'map',popular:true,description:'Profesyonel arsa değer tespiti'},
    {id:'s2',name:'İmar Danışmanlık',price:'₺5.000',duration:'3 gün',icon:'file-text',description:'İmar durumu ve yapı izni'},
    {id:'s3',name:'Yatırım Analizi',price:'₺3.000',duration:'2 gün',icon:'trending-up',description:'ROI hesaplama raporu'},
    {id:'s4',name:'Arazi Satış',price:'%2 komisyon',duration:'Süresiz',icon:'tag',description:'Profesyonel pazarlama'},
    {id:'s5',name:'Tapu İşlemleri',price:'₺2.000',duration:'1 hafta',icon:'shield',description:'Tapu devir takibi'}
  ],team:[
    {id:'t1',name:'Selim Toprak',role:'Kurucu & Arazi Uzmanı',experience:'15 yıl'},
    {id:'t2',name:'Ayşe İmar',role:'İmar Danışmanı',experience:'10 yıl'}
  ],
  experience:'15 yıl',rating:4.6,reviewCount:320,foundedYear:2010
}
export const EMLAK_ARAZI_CONFIG: ThemeConfig = {
  id:'emlak-arazi',name:'Arazi Yatırım',sectorId:'emlak',plan:'pro',description:'Arsa ve arazi yatırımında güvenilir danışman',
  designPhilosophy:'Doğal arazi estetiği. Yeşil tonlar.',inspiration:['Modern TR emlak'],sectorSections:['property_listing','investment_calculator'],
  performanceBudget:{maxJS:'250kb',maxLCP:'3.0s',animationLevel:'gsap-allowed'},
  isDark:false,cssVariables:EMLAK_ARAZI_CSS,
  fonts:{heading:{family:'Outfit',weights:[600,700],subsets:['latin-ext']},body:{family:'Inter',weights:[400,500],subsets:['latin-ext']}},
  seoSchemaType:'RealEstateAgent',
  globalSections:[
    {id:'global-header',type:'header',variant:'auto',order:0,required:true,position:'top',settings:{bgMode:'default',paddingY:'none',containerWidth:'xl',visible:true,order:0,removable:false,animation:'fadeUp'},defaultContent:{logo:{type:'text',text:'Arazi Yatırım'},menuItems:[{label:'Hizmetler',href:'#hizmetler'},{label:'Hakkımızda',href:'#hakkimizda'},{label:'İletişim',href:'#iletisim'}],cta:{text:'Bilgi Al',href:'https://wa.me/905321112233',variant:'solid'}},editableFields:[]},
    {id:'global-footer',type:'footer',variant:'auto',order:999,required:true,position:'bottom',settings:{bgMode:'surface',paddingY:'lg',containerWidth:'xl',visible:true,order:999,removable:false,animation:'fadeUp'},defaultContent:{businessName:'Arazi Yatırım',description:'Silivri ve çevresinde arsa, arazi yatırım danışmanlığı. 15 yıllık tecrübe.',copyright:'© 2025 Arazi Yatırım',columns:[{title:'Hizmetler',links:[{label:'Arsa Değerleme',href:'#'},{label:'İmar Danışmanlık',href:'#'},{label:'Yatırım Analizi',href:'#'}]},{title:'Sayfalar',links:[{label:'Hakkımızda',href:'#hakkimizda'},{label:'İletişim',href:'#iletisim'}]}],contact:{phone:'0532 111 22 33',email:'info@araziyatirim.com.tr',address:'Silivri Mah. Atatürk Cad. No:45'},social:[{platform:'instagram',url:'https://instagram.com/emlak-arazi',icon:'instagram'}],legal:[{label:'Gizlilik',href:'/gizlilik'},{label:'KVKK',href:'/kvkk'}],poweredBy:'⚡ kepenk.ai'},editableFields:[]},
    {id:'global-whatsapp',type:'whatsapp_cta',variant:'floating',order:1000,required:true,position:'floating',settings:{bgMode:'default',paddingY:'none',containerWidth:'xl',visible:true,order:1000,removable:false,animation:'fadeUp'},defaultContent:{phone:'905321112233',message:'Merhaba, Arazi Yatırım hakkında bilgi almak istiyorum.'},editableFields:[]},
    {id:'global-cookie',type:'cookie_banner',variant:'bottom_bar',order:1001,required:true,position:'floating',settings:{bgMode:'surface',paddingY:'none',containerWidth:'xl',visible:true,order:1001,removable:false,animation:'fadeUp'},defaultContent:{text:'Bu site çerezleri kullanır.',acceptText:'Kabul Et',rejectText:'Reddet',detailsLink:'/gizlilik'},editableFields:[]}
  ],
  pages:[{id:'anasayfa',slug:'/',title:'Arazi Yatırım — Silivri',titleTr:'Ana Sayfa',isHomePage:true,includeInNav:false,
    sections:[
      {id:'hero',type:'hero',variant:'auto',order:1,required:true,settings:{bgMode:'default',paddingY:'none',containerWidth:'xl',visible:true,order:1,removable:false,animation:'fadeUp'},defaultContent:{badge:'SILIVRI',title:'Arazi Yatırım',subtitle:'Arsa ve arazi yatırımında güvenilir danışman',cta1:{text:'Bilgi Al',href:'#iletisim'}},editableFields:[]},
      {id:'hakkimizda',type:'about',variant:'auto',order:2,required:false,settings:{bgMode:'default',paddingY:'lg',containerWidth:'xl',visible:true,order:2,removable:true,animation:'fadeUp'},defaultContent:{badge:'HAKKIMIZDA',title:'Biz Kimiz?',description:'Silivri ve çevresinde arsa, arazi yatırım danışmanlığı. 15 yıllık tecrübe.'},editableFields:[]},
      {id:'istatistik',type:'stats',variant:'auto',order:3,required:false,settings:{bgMode:'accent',paddingY:'md',containerWidth:'xl',visible:true,order:3,removable:true,animation:'fadeUp'},defaultContent:{stats:[{value:'15+',label:'Yıl'},{value:'320+',label:'Müşteri'},{value:'4.6',label:'Puan'}]},editableFields:[]},
      {id:'galeri',type:'gallery',variant:'auto',order:4,required:false,settings:{bgMode:'default',paddingY:'lg',containerWidth:'xl',visible:true,order:4,removable:true,animation:'fadeUp'},defaultContent:{badge:'GALERİ',title:'Çalışmalarımız',items:[{id:'g1',url:'/placeholder.jpg'}]},editableFields:[]},
      {id:'hizmetler',type:'services',variant:'auto',order:5,required:true,settings:{bgMode:'surface',paddingY:'lg',containerWidth:'xl',visible:true,order:5,removable:false,animation:'fadeUp'},defaultContent:{badge:'HİZMETLER',title:'Hizmetlerimiz',services:[{id:'s1',name:'Hizmet',description:'Detay için arayın.',icon:'star'}]},editableFields:[]},
      {id:'iletisim',type:'contact',variant:'auto',order:6,required:true,settings:{bgMode:'surface',paddingY:'lg',containerWidth:'xl',visible:true,order:6,removable:false,animation:'fadeUp'},defaultContent:{badge:'İLETİŞİM',title:'Bize Ulaşın',whatsapp:'905321112233'},editableFields:[]}
    ]}]
}
