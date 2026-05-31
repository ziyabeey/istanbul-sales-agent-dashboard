// @ts-nocheck
'use client'

import {
  ThemeRenderer,
  OZELDERS_AKADEMI_CONFIG,
  OZELDERS_AKADEMI_BUSINESS
} from '@kepenk/templates'

export default function OzelDersAkademiClient() {
  const theme = OZELDERS_AKADEMI_CONFIG; 
  const page = theme.pages[0]!; 
  const business = OZELDERS_AKADEMI_BUSINESS;
  
  return (
    <div lang="tr" className="font-body text-[var(--color-text)] min-h-screen relative flex flex-col" style={{...theme.cssVariables as any, backgroundColor: 'var(--color-bg)'}}>
      <script 
        type="application/ld+json" 
        dangerouslySetInnerHTML={{ 
          __html: JSON.stringify({ 
            '@context': 'https://schema.org', 
            '@type': 'EducationalOrganization', 
            name: business.name, 
            telephone: business.phone, 
            address: { 
              '@type': 'PostalAddress', 
              addressLocality: business.district, 
              addressRegion: business.city, 
              addressCountry: 'TR' 
            }, 
            aggregateRating: { 
              '@type': 'AggregateRating', 
              ratingValue: business.rating, 
              reviewCount: business.reviewCount 
            } 
          }) 
        }} 
      />
      
      {/* HEADER TIER 3 AKADEMI */}
      <header className="fixed top-0 left-0 w-full z-50 bg-black/50 backdrop-blur-lg border-b border-white/10 text-white transition-all duration-300">
        <div className="container-custom mx-auto px-4 py-5 flex items-center justify-between">
           <div className="flex items-center gap-3">
             <div className="w-12 h-12 rounded-[var(--radius-btn)] bg-accent flex items-center justify-center text-white font-bold text-xl font-heading shadow-lg shadow-accent/20">
               {business.name.substring(0,2).toUpperCase()}
             </div>
             <div>
                <h1 className="font-heading text-xl font-bold tracking-tight text-white m-0 leading-none">{business.name}</h1>
                <span className="text-xs text-white/60 tracking-widest uppercase">Online Eğitim Merkezi</span>
             </div>
           </div>
           
           <nav className="hidden lg:flex items-center gap-10">
             {(theme.globalSections?.[0]?.defaultContent as any)?.menuItems?.map((item: any, idx: number) => (
                <a key={idx} href={item.href} className="text-sm font-semibold text-white/80 hover:text-white transition-colors tracking-wide">
                  {item.label}
                </a>
             ))}
           </nav>
           
           <div className="flex items-center gap-4">
              <a href="#" className="hidden sm:block text-sm font-bold text-white hover:text-accent transition-colors tracking-wide">
                 Giriş Yap
              </a>
              <a 
                href={`tel:${business.phoneClean}`} 
                className="bg-white text-black px-6 py-3 rounded-[var(--radius-btn)] font-bold text-sm hover:bg-white/90 transition-colors shadow-lg hidden sm:block"
              >
                Kayıt Ol
              </a>
           </div>
        </div>
      </header>

      <div className="flex-grow flex flex-col items-center">
        <ThemeRenderer theme={theme} page={theme.pages[0]} business={business} />
      </div>

      {/* FOOTER TIER 3 AKADEMI */}
      <footer className="bg-black text-white py-16 mt-auto">
         <div className="container-custom mx-auto px-4">
            <div className="grid md:grid-cols-3 gap-12 mb-12">
               <div>
                  <h3 className="font-heading text-2xl font-bold mb-4">{business.name}</h3>
                  <p className="text-white/60 max-w-sm font-light leading-relaxed mb-6">Türkiye'nin her yerinden en iyi eğitmenlere canlı bağlanarak kariyerinizi inşa edin.</p>
                  <p className="font-bold text-lg mb-1">{business.phone}</p>
                  <p className="text-white/60 text-sm mb-1">{business.email}</p>
                  <p className="text-white/60 text-sm max-w-xs">{business.address}, {business.district}, {business.city}</p>
               </div>
               <div>
                  <h4 className="font-heading text-lg font-bold mb-4 text-white">Programlar</h4>
                  <ul className="space-y-3">
                     <li><a href="#" className="text-white/60 hover:text-white transition-colors">YDS Hazırlık</a></li>
                     <li><a href="#" className="text-white/60 hover:text-white transition-colors">TOEFL Programı</a></li>
                     <li><a href="#" className="text-white/60 hover:text-white transition-colors">İş İngilizcesi</a></li>
                     <li><a href="#" className="text-white/60 hover:text-white transition-colors">YKS Matematik</a></li>
                     <li><a href="#" className="text-white/60 hover:text-white transition-colors">LGS Kampı</a></li>
                  </ul>
               </div>
               <div>
                  <h4 className="font-heading text-lg font-bold mb-4 text-white">Bülten</h4>
                  <p className="text-white/60 text-sm mb-4">Yeni açılan canlı derslerden haberdar olun.</p>
                  <div className="flex border border-white/20 rounded-[var(--radius-btn)] overflow-hidden">
                     <input type="email" placeholder="E-posta Adresi" className="bg-transparent text-white px-4 py-3 w-full outline-none text-sm placeholder:text-white/40" />
                     <button className="bg-white text-black px-4 font-bold text-sm hover:bg-white/90 transition-colors">Kayıt</button>
                  </div>
               </div>
            </div>
            <div className="pt-8 border-t border-white/10 flex flex-col md:flex-row justify-between items-center text-sm text-white/40">
               <p>{theme.globalSections?.[1]?.defaultContent?.copyright || '© 2024 Akademi.'}</p>
               <div className="flex gap-4 mt-4 md:mt-0">
                  <a href="#" className="hover:text-white transition-colors">Gizlilik</a>
                  <a href="#" className="hover:text-white transition-colors">Kullanım Şartları</a>
               </div>
            </div>
         </div>
      </footer>
    </div>
  )
}
