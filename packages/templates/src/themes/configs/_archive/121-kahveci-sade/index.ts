/**
 * @kepenk/templates — kahveci-sade | Sade Kahve
 * Plan: starter | Cormorant + Lato
 */
import type { ThemeConfig, BusinessData } from '../../../../types/section-types'
export const KAHVECI_SADE_CSS: Record<string,string> = {
  '--color-bg':'#FFFFFF','--color-surface':'#F8FAFC','--color-surface-elevated':'#FFFFFF',
  '--color-surface-muted':'#F1F5F9','--color-text':'#0F172A','--color-text-secondary':'#475569',
  '--color-text-muted':'#94A3B8','--color-text-on-accent':'#FFFFFF','--color-accent':'#2D2D2D',
  '--color-accent-hover':'#3D3D3D','--color-accent-active':'#1D1D1D','--color-accent-light':'#F0F0F0',
  '--color-accent-subtle':'#FAFAFA','--color-border':'#E2E8F0','--color-border-subtle':'#F1F5F9',
  '--font-heading':"'Cormorant',serif",'--font-body':"'Lato',sans-serif",'--radius-md':'6px','--radius-lg':'12px'
}
export const KAHVECI_SADE_BUSINESS: BusinessData = {
  name:'Sade Kahve',ownerName:'Ecza. Zeynep Sade',sector:'kahveci',slogan:'Doğal ve sade kahve deneyimi',
  phone:'0532 444 55 66',phoneClean:'905324445566',whatsapp:'905324445566',email:'info@sadekahve.com',
  address:'Cihangir Mah. Akarsu Cad. No:5, Beyoğlu',city:'İstanbul',district:'Beyoğlu',coordinates:{lat:41.0321,lng:28.9826},
  workingHours:[{day:'monday',dayTr:'Pazartesi',open:'08:30',close:'20:00'},{day:'tuesday',dayTr:'Salı',open:'08:30',close:'20:00'},{day:'wednesday',dayTr:'Çarşamba',open:'08:30',close:'20:00'},{day:'thursday',dayTr:'Perşembe',open:'08:30',close:'20:00'},{day:'friday',dayTr:'Cuma',open:'08:30',close:'20:00'},{day:'saturday',dayTr:'Cumartesi',open:'09:00',close:'21:00'},{day:'sunday',dayTr:'Pazar',open:null,close:null}],
  socialMedia:{instagram:'https://instagram.com/kahveci-sade'},photos:[],
  services:[
    {id:'s1',name:'Sade Espresso',price:'₺70',duration:'2 dk',icon:'coffee',popular:true,description:'Double shot, clean taste'},
    {id:'s2',name:'Matcha Latte',price:'₺110',duration:'4 dk',icon:'leaf',description:'Ceremonial grade Japon matcha'},
    {id:'s3',name:'Avokado Toast',price:'₺140',duration:'8 dk',icon:'utensils',description:'Ekşi maya ekmek, poşe yumurta'},
    {id:'s4',name:'Açai Bowl',price:'₺160',duration:'5 dk',icon:'bowl',description:'Granola, meyve, bal'},
    {id:'s5',name:'Golden Milk',price:'₺90',duration:'4 dk',icon:'sun',description:'Zerdeçal, zencefil, badem sütü'}
  ],team:[
    {id:'t1',name:'Zeynep Sade',role:'Kurucu',experience:'5 yıl'}
  ],
  experience:'5 yıl',rating:4.7,reviewCount:380,foundedYear:2020
}
export const KAHVECI_SADE_CONFIG: ThemeConfig = {
  id:'kahveci-sade',name:'Sade Kahve',sectorId:'kahveci',plan:'starter',description:'Doğal ve sade kahve deneyimi',
  designPhilosophy:'Minimal butik kahve. Siyah-beyaz, Cormorant zarif serif.',inspiration:['Modern TR kahveci'],sectorSections:['menu_grid','about_story'],
  performanceBudget:{maxJS:'250kb',maxLCP:'3.0s',animationLevel:'gsap-allowed'},
  isDark:false,cssVariables:KAHVECI_SADE_CSS,
  fonts:{heading:{family:'Cormorant',weights:[500,600],subsets:['latin-ext']},body:{family:'Lato',weights:[400],subsets:['latin-ext']}},
  seoSchemaType:'CafeOrCoffeeShop',
  globalSections:[
    {id:'global-header',type:'header',variant:'auto',order:0,required:true,position:'top',settings:{bgMode:'default',paddingY:'none',containerWidth:'xl',visible:true,order:0,removable:false,animation:'fadeUp'},defaultContent:{logo:{type:'text',text:'Sade Kahve'},menuItems:[{label:'Hizmetler',href:'#hizmetler'},{label:'Hakkımızda',href:'#hakkimizda'},{label:'İletişim',href:'#iletisim'}],cta:{text:'Sipariş Ver',href:'https://wa.me/905324445566',variant:'solid'}},editableFields:[]},
    {id:'global-footer',type:'footer',variant:'auto',order:999,required:true,position:'bottom',settings:{bgMode:'surface',paddingY:'lg',containerWidth:'xl',visible:true,order:999,removable:false,animation:'fadeUp'},defaultContent:{businessName:'Sade Kahve',description:'Cihangir de minimal ve doğal konseptli butik kahve.',copyright:'© 2025 Sade Kahve',columns:[{title:'Hizmetler',links:[{label:'Sade Espresso',href:'#'},{label:'Matcha Latte',href:'#'},{label:'Avokado Toast',href:'#'}]},{title:'Sayfalar',links:[{label:'Hakkımızda',href:'#hakkimizda'},{label:'İletişim',href:'#iletisim'}]}],contact:{phone:'0532 444 55 66',email:'info@sadekahve.com',address:'Cihangir Mah. Akarsu Cad. No:5'},social:[{platform:'instagram',url:'https://instagram.com/kahveci-sade',icon:'instagram'}],legal:[{label:'Gizlilik',href:'/gizlilik'},{label:'KVKK',href:'/kvkk'}],poweredBy:'⚡ kepenk.ai'},editableFields:[]},
    {id:'global-whatsapp',type:'whatsapp_cta',variant:'floating',order:1000,required:true,position:'floating',settings:{bgMode:'default',paddingY:'none',containerWidth:'xl',visible:true,order:1000,removable:false,animation:'fadeUp'},defaultContent:{phone:'905324445566',message:'Merhaba, Sade Kahve hakkında bilgi almak istiyorum.'},editableFields:[]},
    {id:'global-cookie',type:'cookie_banner',variant:'bottom_bar',order:1001,required:true,position:'floating',settings:{bgMode:'surface',paddingY:'none',containerWidth:'xl',visible:true,order:1001,removable:false,animation:'fadeUp'},defaultContent:{text:'Bu site çerezleri kullanır.',acceptText:'Kabul Et',rejectText:'Reddet',detailsLink:'/gizlilik'},editableFields:[]}
  ],
  pages:[{id:'anasayfa',slug:'/',title:'Sade Kahve — Beyoğlu',titleTr:'Ana Sayfa',isHomePage:true,includeInNav:false,
    sections:[
      {id:'hero',type:'hero',variant:'auto',order:1,required:true,settings:{bgMode:'default',paddingY:'none',containerWidth:'xl',visible:true,order:1,removable:false,animation:'fadeUp'},defaultContent:{badge:'BEYOĞLU',title:'Sade Kahve',subtitle:'Doğal ve sade kahve deneyimi',cta1:{text:'Sipariş Ver',href:'#iletisim'}},editableFields:[]},
      {id:'hakkimizda',type:'about',variant:'auto',order:2,required:false,settings:{bgMode:'default',paddingY:'lg',containerWidth:'xl',visible:true,order:2,removable:true,animation:'fadeUp'},defaultContent:{badge:'HAKKIMIZDA',title:'Biz Kimiz?',description:'Cihangir de minimal ve doğal konseptli butik kahve.'},editableFields:[]},
      {id:'istatistik',type:'stats',variant:'auto',order:3,required:false,settings:{bgMode:'accent',paddingY:'md',containerWidth:'xl',visible:true,order:3,removable:true,animation:'fadeUp'},defaultContent:{stats:[{value:'5+',label:'Yıl'},{value:'380+',label:'Müşteri'},{value:'4.7',label:'Puan'}]},editableFields:[]},
      {id:'galeri',type:'gallery',variant:'auto',order:4,required:false,settings:{bgMode:'default',paddingY:'lg',containerWidth:'xl',visible:true,order:4,removable:true,animation:'fadeUp'},defaultContent:{badge:'GALERİ',title:'Çalışmalarımız',items:[{id:'g1',url:'/placeholder.jpg'}]},editableFields:[]},
      {id:'hizmetler',type:'services',variant:'auto',order:5,required:true,settings:{bgMode:'surface',paddingY:'lg',containerWidth:'xl',visible:true,order:5,removable:false,animation:'fadeUp'},defaultContent:{badge:'HİZMETLER',title:'Hizmetlerimiz',services:[{id:'s1',name:'Hizmet',description:'Detay için arayın.',icon:'star'}]},editableFields:[]},
      {id:'iletisim',type:'contact',variant:'auto',order:6,required:true,settings:{bgMode:'surface',paddingY:'lg',containerWidth:'xl',visible:true,order:6,removable:false,animation:'fadeUp'},defaultContent:{badge:'İLETİŞİM',title:'Bize Ulaşın',whatsapp:'905324445566'},editableFields:[]}
    ]}]
}
