/**
 * @kepenk/templates — eczane-aile | Aile Eczanesi
 * Plan: free | Roboto + Roboto
 */
import type { ThemeConfig, BusinessData } from '../../../../types/section-types'
export const ECZANE_AILE_CSS: Record<string,string> = {
  '--color-bg':'#FFFFFF','--color-surface':'#F8FAFC','--color-surface-elevated':'#FFFFFF',
  '--color-surface-muted':'#F1F5F9','--color-text':'#0F172A','--color-text-secondary':'#475569',
  '--color-text-muted':'#94A3B8','--color-text-on-accent':'#FFFFFF','--color-accent':'#16A34A',
  '--color-accent-hover':'#15803D','--color-accent-active':'#166534','--color-accent-light':'#F0FDF4',
  '--color-accent-subtle':'#FAFFFC','--color-border':'#E2E8F0','--color-border-subtle':'#F1F5F9',
  '--font-heading':"'Roboto',sans-serif",'--font-body':"'Roboto',sans-serif",'--radius-md':'6px','--radius-lg':'12px'
}
export const ECZANE_AILE_BUSINESS: BusinessData = {
  name:'Aile Eczanesi',ownerName:'Ecz. Fatma Aile',sector:'eczane',slogan:'Mahallenizin güvenilir eczanesi',
  phone:'0212 111 22 33',phoneClean:'902121112233',whatsapp:'902121112233',email:'info@aileeczanesi.com',
  address:'Bahçelievler Mah. Cad. No:10, Bahçelievler',city:'İstanbul',district:'Bahçelievler',coordinates:{lat:41.0022,lng:28.8561},
  workingHours:[{day:'monday',dayTr:'Pazartesi',open:'09:00',close:'18:00'},{day:'tuesday',dayTr:'Salı',open:'09:00',close:'18:00'},{day:'wednesday',dayTr:'Çarşamba',open:'09:00',close:'18:00'},{day:'thursday',dayTr:'Perşembe',open:'09:00',close:'18:00'},{day:'friday',dayTr:'Cuma',open:'09:00',close:'18:00'},{day:'saturday',dayTr:'Cumartesi',open:'10:00',close:'14:00'},{day:'sunday',dayTr:'Pazar',open:null,close:null}],
  socialMedia:{instagram:'https://instagram.com/eczane-aile'},photos:[],
  services:[
    {id:'s1',name:'Reçeteli İlaç',price:'SGK',duration:'5 dk',icon:'pill',popular:true,description:'SGK anlaşmalı tüm reçeteler'},
    {id:'s2',name:'OTC İlaçlar',price:'Değişken',duration:'Hemen',icon:'package',description:'Reçetesiz ilaç ve takviyeler'},
    {id:'s3',name:'Tansiyon Ölçüm',price:'Ücretsiz',duration:'5 dk',icon:'heart',description:'Ücretsiz tansiyon takibi'},
    {id:'s4',name:'Şeker Ölçüm',price:'₺30',duration:'5 dk',icon:'droplet',description:'Kan şekeri testi'},
    {id:'s5',name:'Dermokozmetik',price:'Değişken',duration:'Danışmanlık',icon:'sparkles',description:'La Roche-Posay, Avene, Vichy'}
  ],team:[
    {id:'t1',name:'Ecz. Fatma Aile',role:'Eczacı & Kurucu',experience:'20 yıl'}
  ],
  experience:'20 yıl',rating:4.6,reviewCount:890,foundedYear:2005
}
export const ECZANE_AILE_CONFIG: ThemeConfig = {
  id:'eczane-aile',name:'Aile Eczanesi',sectorId:'eczane',plan:'free',description:'Mahallenizin güvenilir eczanesi',
  designPhilosophy:'Güvenilir semt eczanesi. Yeşil, Roboto sade.',inspiration:['Modern TR eczane'],sectorSections:['product_catalog','prescription_service'],
  performanceBudget:{maxJS:'250kb',maxLCP:'3.0s',animationLevel:'gsap-allowed'},
  isDark:false,cssVariables:ECZANE_AILE_CSS,
  fonts:{heading:{family:'Roboto',weights:[500,700],subsets:['latin-ext']},body:{family:'Roboto',weights:[400,500],subsets:['latin-ext']}},
  seoSchemaType:'Pharmacy',
  globalSections:[
    {id:'global-header',type:'header',variant:'auto',order:0,required:true,position:'top',settings:{bgMode:'default',paddingY:'none',containerWidth:'xl',visible:true,order:0,removable:false,animation:'fadeUp'},defaultContent:{logo:{type:'text',text:'Aile Eczanesi'},menuItems:[{label:'Hizmetler',href:'#hizmetler'},{label:'Hakkımızda',href:'#hakkimizda'},{label:'İletişim',href:'#iletisim'}],cta:{text:'7/24 Ara',href:'https://wa.me/902121112233',variant:'solid'}},editableFields:[]},
    {id:'global-footer',type:'footer',variant:'auto',order:999,required:true,position:'bottom',settings:{bgMode:'surface',paddingY:'lg',containerWidth:'xl',visible:true,order:999,removable:false,animation:'fadeUp'},defaultContent:{businessName:'Aile Eczanesi',description:'2005 den beri Bahçelievler de güvenilir eczane hizmeti.',copyright:'© 2025 Aile Eczanesi',columns:[{title:'Hizmetler',links:[{label:'Reçeteli İlaç',href:'#'},{label:'OTC İlaçlar',href:'#'},{label:'Tansiyon Ölçüm',href:'#'}]},{title:'Sayfalar',links:[{label:'Hakkımızda',href:'#hakkimizda'},{label:'İletişim',href:'#iletisim'}]}],contact:{phone:'0212 111 22 33',email:'info@aileeczanesi.com',address:'Bahçelievler Mah. Cad. No:10'},social:[{platform:'instagram',url:'https://instagram.com/eczane-aile',icon:'instagram'}],legal:[{label:'Gizlilik',href:'/gizlilik'},{label:'KVKK',href:'/kvkk'}],poweredBy:'⚡ kepenk.ai'},editableFields:[]},
    {id:'global-whatsapp',type:'whatsapp_cta',variant:'floating',order:1000,required:true,position:'floating',settings:{bgMode:'default',paddingY:'none',containerWidth:'xl',visible:true,order:1000,removable:false,animation:'fadeUp'},defaultContent:{phone:'902121112233',message:'Merhaba, Aile Eczanesi hakkında bilgi almak istiyorum.'},editableFields:[]},
    {id:'global-cookie',type:'cookie_banner',variant:'bottom_bar',order:1001,required:true,position:'floating',settings:{bgMode:'surface',paddingY:'none',containerWidth:'xl',visible:true,order:1001,removable:false,animation:'fadeUp'},defaultContent:{text:'Bu site çerezleri kullanır.',acceptText:'Kabul Et',rejectText:'Reddet',detailsLink:'/gizlilik'},editableFields:[]}
  ],
  pages:[{id:'anasayfa',slug:'/',title:'Aile Eczanesi — Bahçelievler',titleTr:'Ana Sayfa',isHomePage:true,includeInNav:false,
    sections:[
      {id:'hero',type:'hero',variant:'auto',order:1,required:true,settings:{bgMode:'default',paddingY:'none',containerWidth:'xl',visible:true,order:1,removable:false,animation:'fadeUp'},defaultContent:{badge:'BAHÇELIEVLER',title:'Aile Eczanesi',subtitle:'Mahallenizin güvenilir eczanesi',cta1:{text:'7/24 Ara',href:'#iletisim'}},editableFields:[]},
      {id:'hakkimizda',type:'about',variant:'auto',order:2,required:false,settings:{bgMode:'default',paddingY:'lg',containerWidth:'xl',visible:true,order:2,removable:true,animation:'fadeUp'},defaultContent:{badge:'HAKKIMIZDA',title:'Biz Kimiz?',description:'2005 den beri Bahçelievler de güvenilir eczane hizmeti.'},editableFields:[]},
      {id:'istatistik',type:'stats',variant:'auto',order:3,required:false,settings:{bgMode:'accent',paddingY:'md',containerWidth:'xl',visible:true,order:3,removable:true,animation:'fadeUp'},defaultContent:{stats:[{value:'20+',label:'Yıl'},{value:'890+',label:'Müşteri'},{value:'4.6',label:'Puan'}]},editableFields:[]},
      {id:'galeri',type:'gallery',variant:'auto',order:4,required:false,settings:{bgMode:'default',paddingY:'lg',containerWidth:'xl',visible:true,order:4,removable:true,animation:'fadeUp'},defaultContent:{badge:'GALERİ',title:'Çalışmalarımız',items:[{id:'g1',url:'/placeholder.jpg'}]},editableFields:[]},
      {id:'hizmetler',type:'services',variant:'auto',order:5,required:true,settings:{bgMode:'surface',paddingY:'lg',containerWidth:'xl',visible:true,order:5,removable:false,animation:'fadeUp'},defaultContent:{badge:'HİZMETLER',title:'Hizmetlerimiz',services:[{id:'s1',name:'Hizmet',description:'Detay için arayın.',icon:'star'}]},editableFields:[]},
      {id:'iletisim',type:'contact',variant:'auto',order:6,required:true,settings:{bgMode:'surface',paddingY:'lg',containerWidth:'xl',visible:true,order:6,removable:false,animation:'fadeUp'},defaultContent:{badge:'İLETİŞİM',title:'Bize Ulaşın',whatsapp:'902121112233'},editableFields:[]}
    ]}]
}
