/**
 * @kepenk/templates — kahveci-blend | Blend Coffee Lab
 * Plan: pro | Cormorant Garamond + DM Sans
 */
import type { ThemeConfig, BusinessData } from '../../../../types/section-types'
export const KAHVECI_BLEND_CSS: Record<string,string> = {
  '--color-bg':'#FFFFFF','--color-surface':'#F8FAFC','--color-surface-elevated':'#FFFFFF',
  '--color-surface-muted':'#F1F5F9','--color-text':'#0F172A','--color-text-secondary':'#475569',
  '--color-text-muted':'#94A3B8','--color-text-on-accent':'#FFFFFF','--color-accent':'#92400E',
  '--color-accent-hover':'#78350F','--color-accent-active':'#6C2F0D','--color-accent-light':'#FEF3C7',
  '--color-accent-subtle':'#FFFBEB','--color-border':'#E2E8F0','--color-border-subtle':'#F1F5F9',
  '--font-heading':"'Cormorant Garamond',serif",'--font-body':"'DM Sans',sans-serif",'--radius-md':'6px','--radius-lg':'12px'
}
export const KAHVECI_BLEND_BUSINESS: BusinessData = {
  name:'Blend Coffee Lab',ownerName:'Barista Emre Demleme',sector:'kahveci',slogan:'Üçüncü dalga kahve laboratuvarı',
  phone:'0533 222 33 44',phoneClean:'905332223344',whatsapp:'905332223344',email:'hello@blendcoffeelab.com',
  address:'Karaköy Mah. Kemeraltı No:12, Beyoğlu',city:'İstanbul',district:'Beyoğlu',coordinates:{lat:41.0217,lng:28.9746},
  workingHours:[{day:'monday',dayTr:'Pazartesi',open:'08:00',close:'22:00'},{day:'tuesday',dayTr:'Salı',open:'08:00',close:'22:00'},{day:'wednesday',dayTr:'Çarşamba',open:'08:00',close:'22:00'},{day:'thursday',dayTr:'Perşembe',open:'08:00',close:'22:00'},{day:'friday',dayTr:'Cuma',open:'08:00',close:'22:00'},{day:'saturday',dayTr:'Cumartesi',open:'09:00',close:'23:00'},{day:'sunday',dayTr:'Pazar',open:null,close:null}],
  socialMedia:{instagram:'https://instagram.com/kahveci-blend'},photos:[],
  services:[
    {id:'s1',name:'Pour Over (V60)',price:'₺120',duration:'5 dk',icon:'coffee',popular:true,description:'Single origin, el demleme'},
    {id:'s2',name:'Espresso Based',price:'₺80-120',duration:'3 dk',icon:'cup',description:'Latte, cappuccino, flat white'},
    {id:'s3',name:'Cold Brew',price:'₺100',duration:'Hazır',icon:'snowflake',description:'24 saat demleme, nitro tap'},
    {id:'s4',name:'Kahve Tadım',price:'₺250',duration:'45 dk',icon:'star',description:'3 farklı origin cupping deneyimi'},
    {id:'s5',name:'Öğütülmüş Kahve',price:'₺200/250g',duration:'Hemen',icon:'package',description:'Taze kavrum, çeşitli origin'}
  ],team:[
    {id:'t1',name:'Barista Emre',role:'Kurucu & Head Barista',experience:'7 yıl'},
    {id:'t2',name:'Selin Kavurma',role:'Roaster',experience:'5 yıl'}
  ],
  experience:'7 yıl',rating:4.8,reviewCount:780,foundedYear:2018
}
export const KAHVECI_BLEND_CONFIG: ThemeConfig = {
  id:'kahveci-blend',name:'Blend Coffee Lab',sectorId:'kahveci',plan:'pro',description:'Üçüncü dalga kahve laboratuvarı',
  designPhilosophy:'Üçüncü dalga kahve estetiği. Kahverengi tonlar, Cormorant serif.',inspiration:['Modern TR kahveci'],sectorSections:['menu_grid','brewing_methods'],
  performanceBudget:{maxJS:'250kb',maxLCP:'3.0s',animationLevel:'gsap-allowed'},
  isDark:false,cssVariables:KAHVECI_BLEND_CSS,
  fonts:{heading:{family:'Cormorant Garamond',weights:[600,700],subsets:['latin-ext']},body:{family:'DM Sans',weights:[400,500],subsets:['latin-ext']}},
  seoSchemaType:'CafeOrCoffeeShop',
  globalSections:[
    {id:'global-header',type:'header',variant:'auto',order:0,required:true,position:'top',settings:{bgMode:'default',paddingY:'none',containerWidth:'xl',visible:true,order:0,removable:false,animation:'fadeUp'},defaultContent:{logo:{type:'text',text:'Blend Coffee Lab'},menuItems:[{label:'Hizmetler',href:'#hizmetler'},{label:'Hakkımızda',href:'#hakkimizda'},{label:'İletişim',href:'#iletisim'}],cta:{text:'Sipariş Ver',href:'https://wa.me/905332223344',variant:'solid'}},editableFields:[]},
    {id:'global-footer',type:'footer',variant:'auto',order:999,required:true,position:'bottom',settings:{bgMode:'surface',paddingY:'lg',containerWidth:'xl',visible:true,order:999,removable:false,animation:'fadeUp'},defaultContent:{businessName:'Blend Coffee Lab',description:'Karaköy de üçüncü dalga kahve deneyimi. Kendi kavrum, single origin çekirdekler.',copyright:'© 2025 Blend Coffee Lab',columns:[{title:'Hizmetler',links:[{label:'Pour Over (V60)',href:'#'},{label:'Espresso Based',href:'#'},{label:'Cold Brew',href:'#'}]},{title:'Sayfalar',links:[{label:'Hakkımızda',href:'#hakkimizda'},{label:'İletişim',href:'#iletisim'}]}],contact:{phone:'0533 222 33 44',email:'hello@blendcoffeelab.com',address:'Karaköy Mah. Kemeraltı No:12'},social:[{platform:'instagram',url:'https://instagram.com/kahveci-blend',icon:'instagram'}],legal:[{label:'Gizlilik',href:'/gizlilik'},{label:'KVKK',href:'/kvkk'}],poweredBy:'⚡ kepenk.ai'},editableFields:[]},
    {id:'global-whatsapp',type:'whatsapp_cta',variant:'floating',order:1000,required:true,position:'floating',settings:{bgMode:'default',paddingY:'none',containerWidth:'xl',visible:true,order:1000,removable:false,animation:'fadeUp'},defaultContent:{phone:'905332223344',message:'Merhaba, Blend Coffee Lab hakkında bilgi almak istiyorum.'},editableFields:[]},
    {id:'global-cookie',type:'cookie_banner',variant:'bottom_bar',order:1001,required:true,position:'floating',settings:{bgMode:'surface',paddingY:'none',containerWidth:'xl',visible:true,order:1001,removable:false,animation:'fadeUp'},defaultContent:{text:'Bu site çerezleri kullanır.',acceptText:'Kabul Et',rejectText:'Reddet',detailsLink:'/gizlilik'},editableFields:[]}
  ],
  pages:[{id:'anasayfa',slug:'/',title:'Blend Coffee Lab — Beyoğlu',titleTr:'Ana Sayfa',isHomePage:true,includeInNav:false,
    sections:[
      {id:'hero',type:'hero',variant:'auto',order:1,required:true,settings:{bgMode:'default',paddingY:'none',containerWidth:'xl',visible:true,order:1,removable:false,animation:'fadeUp'},defaultContent:{badge:'BEYOĞLU',title:'Blend Coffee Lab',subtitle:'Üçüncü dalga kahve laboratuvarı',cta1:{text:'Sipariş Ver',href:'#iletisim'}},editableFields:[]},
      {id:'hakkimizda',type:'about',variant:'auto',order:2,required:false,settings:{bgMode:'default',paddingY:'lg',containerWidth:'xl',visible:true,order:2,removable:true,animation:'fadeUp'},defaultContent:{badge:'HAKKIMIZDA',title:'Biz Kimiz?',description:'Karaköy de üçüncü dalga kahve deneyimi. Kendi kavrum, single origin çekirdekler.'},editableFields:[]},
      {id:'istatistik',type:'stats',variant:'auto',order:3,required:false,settings:{bgMode:'accent',paddingY:'md',containerWidth:'xl',visible:true,order:3,removable:true,animation:'fadeUp'},defaultContent:{stats:[{value:'7+',label:'Yıl'},{value:'780+',label:'Müşteri'},{value:'4.8',label:'Puan'}]},editableFields:[]},
      {id:'galeri',type:'gallery',variant:'auto',order:4,required:false,settings:{bgMode:'default',paddingY:'lg',containerWidth:'xl',visible:true,order:4,removable:true,animation:'fadeUp'},defaultContent:{badge:'GALERİ',title:'Çalışmalarımız',items:[{id:'g1',url:'/placeholder.jpg'}]},editableFields:[]},
      {id:'hizmetler',type:'services',variant:'auto',order:5,required:true,settings:{bgMode:'surface',paddingY:'lg',containerWidth:'xl',visible:true,order:5,removable:false,animation:'fadeUp'},defaultContent:{badge:'HİZMETLER',title:'Hizmetlerimiz',services:[{id:'s1',name:'Hizmet',description:'Detay için arayın.',icon:'star'}]},editableFields:[]},
      {id:'iletisim',type:'contact',variant:'auto',order:6,required:true,settings:{bgMode:'surface',paddingY:'lg',containerWidth:'xl',visible:true,order:6,removable:false,animation:'fadeUp'},defaultContent:{badge:'İLETİŞİM',title:'Bize Ulaşın',whatsapp:'905332223344'},editableFields:[]}
    ]}]
}
