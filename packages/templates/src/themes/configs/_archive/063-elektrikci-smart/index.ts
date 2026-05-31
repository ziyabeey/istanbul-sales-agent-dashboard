/**
 * @kepenk/templates — elektrikci-smart | SmartHome Elektrik
 * Plan: growth | Syne + Inter
 */
import type { ThemeConfig, BusinessData } from '../../../../types/section-types'
export const ELEKTRIKCI_SMART_CSS: Record<string,string> = {
  '--color-bg':'#FCFCFD','--color-surface':'#F1F3F5','--color-surface-elevated':'#FFFFFF',
  '--color-surface-muted':'#E9ECEF','--color-text':'#212529','--color-text-secondary':'#495057',
  '--color-text-muted':'#868E96','--color-text-on-accent':'#FFFFFF','--color-accent':'#6366F1',
  '--color-accent-hover':'#4F46E5','--color-accent-active':'#4338CA','--color-accent-light':'#EEF2FF',
  '--color-accent-subtle':'#F5F7FF','--color-border':'#DEE2E6','--color-border-subtle':'#F1F3F5',
  '--font-heading':"'Syne',sans-serif",'--font-body':"'Inter',sans-serif",'--radius-md':'8px','--radius-lg':'16px'
}
export const ELEKTRIKCI_SMART_BUSINESS: BusinessData = {
  name:'SmartHome Elektrik',ownerName:'Usta Emre Akıllı',sector:'elektrikci',slogan:'Akıllı ev otomasyon ve elektrik çözümleri',
  phone:'0533 888 99 00',phoneClean:'905338889900',whatsapp:'905338889900',email:'info@smarthomeelektrik.com',
  address:'Levent Mah. Büyükdere No:100, Şişli',city:'İstanbul',district:'Şişli',coordinates:{lat:41.0825,lng:29.0107},
  workingHours:[{day:'monday',dayTr:'Pazartesi',open:'09:00',close:'18:00'},{day:'tuesday',dayTr:'Salı',open:'09:00',close:'18:00'},{day:'wednesday',dayTr:'Çarşamba',open:'09:00',close:'18:00'},{day:'thursday',dayTr:'Perşembe',open:'09:00',close:'18:00'},{day:'friday',dayTr:'Cuma',open:'09:00',close:'18:00'},{day:'saturday',dayTr:'Cumartesi',open:'10:00',close:'14:00'},{day:'sunday',dayTr:'Pazar',open:null,close:null}],
  socialMedia:{instagram:'https://instagram.com/elektrikci-smart'},photos:[],
  services:[
    {id:'s1',name:'Akıllı Aydınlatma',price:'₺5K+',duration:'1 gün',icon:'sun',popular:true,description:'Philips Hue, LIFX kurulum'},
    {id:'s2',name:'Akıllı Perde',price:'₺3K+/oda',duration:'1 gün',icon:'layout',description:'Motorlu perde otomasyon'},
    {id:'s3',name:'Güvenlik Sistemi',price:'₺8K+',duration:'2 gün',icon:'shield',description:'Kamera + alarm + kapı kilidi'},
    {id:'s4',name:'Ses Kontrolü',price:'₺4K+',duration:'1 gün',icon:'mic',description:'Alexa, Google Home entegrasyon'},
    {id:'s5',name:'Enerji Monitör',price:'₺2K',duration:'3 saat',icon:'activity',description:'Akıllı enerji izleme sistemi'}
  ],team:[
    {id:'t1',name:'Emre Akıllı',role:'Kurucu & IoT Uzmanı',experience:'6 yıl'},
    {id:'t2',name:'Burak Home',role:'Otomasyon Teknisyeni',experience:'4 yıl'}
  ],
  experience:'6 yıl',rating:4.8,reviewCount:340,foundedYear:2019
}
export const ELEKTRIKCI_SMART_CONFIG: ThemeConfig = {
  id:'elektrikci-smart',name:'SmartHome Elektrik',sectorId:'elektrikci',plan:'growth',description:'Akıllı ev otomasyon ve elektrik çözümleri',
  designPhilosophy:'Akıllı ev teknolojisi. İndigo aksan, Syne modern.',inspiration:['Modern TR elektrikci'],sectorSections:['smart_home_packages','demo_room'],
  performanceBudget:{maxJS:'250kb',maxLCP:'3.0s',animationLevel:'gsap-allowed'},
  isDark:false,cssVariables:ELEKTRIKCI_SMART_CSS,
  fonts:{heading:{family:'Syne',weights:[700,800],subsets:['latin-ext']},body:{family:'Inter',weights:[400,500],subsets:['latin-ext']}},
  seoSchemaType:'Electrician',
  globalSections:[
    {id:'global-header',type:'header',variant:'auto',order:0,required:true,position:'top',settings:{bgMode:'default',paddingY:'none',containerWidth:'xl',visible:true,order:0,removable:false,animation:'fadeUp'},defaultContent:{logo:{type:'text',text:'SmartHome Elektrik'},menuItems:[{label:'Hizmetler',href:'#hizmetler'},{label:'Hakkımızda',href:'#hakkimizda'},{label:'İletişim',href:'#iletisim'}],cta:{text:'Demo İste',href:'https://wa.me/905338889900',variant:'solid'}},editableFields:[]},
    {id:'global-footer',type:'footer',variant:'auto',order:999,required:true,position:'bottom',settings:{bgMode:'surface',paddingY:'lg',containerWidth:'xl',visible:true,order:999,removable:false,animation:'fadeUp'},defaultContent:{businessName:'SmartHome Elektrik',description:'Akıllı ev otomasyon çözümleri. Aydınlatma, güvenlik, perde, ses kontrolü.',copyright:'© 2025 SmartHome Elektrik',columns:[{title:'Hizmetler',links:[{label:'Akıllı Aydınlatma',href:'#'},{label:'Akıllı Perde',href:'#'},{label:'Güvenlik Sistemi',href:'#'}]},{title:'Sayfalar',links:[{label:'Hakkımızda',href:'#hakkimizda'},{label:'İletişim',href:'#iletisim'}]}],contact:{phone:'0533 888 99 00',email:'info@smarthomeelektrik.com',address:'Levent Mah. Büyükdere No:100'},social:[{platform:'instagram',url:'https://instagram.com/elektrikci-smart',icon:'instagram'}],legal:[{label:'Gizlilik',href:'/gizlilik'},{label:'KVKK',href:'/kvkk'}],poweredBy:'⚡ kepenk.ai'},editableFields:[]},
    {id:'global-whatsapp',type:'whatsapp_cta',variant:'floating',order:1000,required:true,position:'floating',settings:{bgMode:'default',paddingY:'none',containerWidth:'xl',visible:true,order:1000,removable:false,animation:'fadeUp'},defaultContent:{phone:'905338889900',message:'Merhaba, SmartHome Elektrik hakkında bilgi almak istiyorum.'},editableFields:[]},
    {id:'global-cookie',type:'cookie_banner',variant:'bottom_bar',order:1001,required:true,position:'floating',settings:{bgMode:'surface',paddingY:'none',containerWidth:'xl',visible:true,order:1001,removable:false,animation:'fadeUp'},defaultContent:{text:'Bu site çerezleri kullanır.',acceptText:'Kabul Et',rejectText:'Reddet',detailsLink:'/gizlilik'},editableFields:[]}
  ],
  pages:[{id:'anasayfa',slug:'/',title:'SmartHome Elektrik — Şişli',titleTr:'Ana Sayfa',isHomePage:true,includeInNav:false,
    sections:[
      {id:'hero',type:'hero',variant:'auto',order:1,required:true,settings:{bgMode:'default',paddingY:'none',containerWidth:'xl',visible:true,order:1,removable:false,animation:'fadeUp'},defaultContent:{badge:'ŞIŞLI',title:'SmartHome Elektrik',subtitle:'Akıllı ev otomasyon ve elektrik çözümleri',cta1:{text:'Demo İste',href:'#iletisim'}},editableFields:[]},
      {id:'hakkimizda',type:'about',variant:'auto',order:2,required:false,settings:{bgMode:'default',paddingY:'lg',containerWidth:'xl',visible:true,order:2,removable:true,animation:'fadeUp'},defaultContent:{badge:'HAKKIMIZDA',title:'Biz Kimiz?',description:'Akıllı ev otomasyon çözümleri. Aydınlatma, güvenlik, perde, ses kontrolü.'},editableFields:[]},
      {id:'istatistik',type:'stats',variant:'auto',order:3,required:false,settings:{bgMode:'accent',paddingY:'md',containerWidth:'xl',visible:true,order:3,removable:true,animation:'fadeUp'},defaultContent:{stats:[{value:'6+',label:'Yıl'},{value:'340+',label:'Müşteri'},{value:'4.8',label:'Puan'}]},editableFields:[]},
      {id:'galeri',type:'gallery',variant:'auto',order:4,required:false,settings:{bgMode:'default',paddingY:'lg',containerWidth:'xl',visible:true,order:4,removable:true,animation:'fadeUp'},defaultContent:{badge:'GALERİ',title:'Çalışmalarımız',items:[{id:'g1',url:'/placeholder.jpg'}]},editableFields:[]},
      {id:'hizmetler',type:'services',variant:'auto',order:5,required:true,settings:{bgMode:'surface',paddingY:'lg',containerWidth:'xl',visible:true,order:5,removable:false,animation:'fadeUp'},defaultContent:{badge:'HİZMETLER',title:'Hizmetlerimiz',services:[{id:'s1',name:'Hizmet',description:'Detay için arayın.',icon:'star'}]},editableFields:[]},
      {id:'iletisim',type:'contact',variant:'auto',order:6,required:true,settings:{bgMode:'surface',paddingY:'lg',containerWidth:'xl',visible:true,order:6,removable:false,animation:'fadeUp'},defaultContent:{badge:'İLETİŞİM',title:'Bize Ulaşın',whatsapp:'905338889900'},editableFields:[]}
    ]}]
}
