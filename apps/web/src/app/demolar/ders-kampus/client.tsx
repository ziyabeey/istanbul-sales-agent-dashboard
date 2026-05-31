// @ts-nocheck
'use client'

import {
  ThemeRenderer,
  OZELDERS_KAMPUS_CONFIG,
  OZELDERS_KAMPUS_BUSINESS
} from '@kepenk/templates'

export default function OzelDersKampusClient() {
  const theme = OZELDERS_KAMPUS_CONFIG; 
  const page = theme.pages[0]!; 
  const business = OZELDERS_KAMPUS_BUSINESS;
  
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
      
      {/* HEADER TIER 5 KAMPÜS */}
      <header className="sticky top-0 z-50 bg-[var(--color-bg)] border-b-2 border-[var(--color-text)] text-[var(--color-text)] transition-all">
        <div className="flex flex-col md:flex-row divide-y md:divide-y-0 md:divide-x-2 divide-[var(--color-text)]">
           <div className="flex items-center justify-between px-6 py-4 md:w-1/4 xl:w-1/5 bg-[var(--color-accent)] text-[var(--color-on-accent)]">
             <div className="w-10 h-10 border-2 border-[var(--color-on-accent)] flex items-center justify-center font-bold text-xl font-heading shadow-solid">
               {business.name.charAt(0)}
             </div>
             <div>
                <h1 className="font-heading text-lg font-extrabold tracking-tighter m-0 uppercase leading-none">{business.name}</h1>
                <span className="text-[10px] tracking-[0.3em] font-bold uppercase block text-[var(--color-on-accent)]/80">Eğitim Grubu</span>
             </div>
           </div>
           
           <nav className="hidden lg:flex items-center flex-grow">
             {theme.globalSections?.[0]?.defaultContent?.menuItems?.map((item: any, idx: number) => (
                <a key={idx} href={item.href} className="px-8 py-5 text-[11px] font-bold tracking-[0.2em] uppercase hover:bg-[var(--color-text)] hover:text-[var(--color-bg)] transition-colors border-r-2 border-[var(--color-text)] last:border-0 grow text-center">
                  {item.label}
                </a>
             ))}
           </nav>
           
           <div className="flex items-center md:w-auto">
              <a href={`tel:${business.phoneClean}`} className="px-6 py-5 hidden md:block text-[11px] font-bold tracking-[0.2em] uppercase border-r-2 border-[var(--color-text)] hover:bg-[var(--color-surface)] transition-colors text-center">
                 Kurumsal Değ.
              </a>
              <a 
                href="#kurumsal" 
                className="bg-[var(--color-text)] text-[var(--color-bg)] px-8 py-5 font-bold text-[11px] tracking-[0.3em] uppercase hover:bg-[var(--color-accent)] hover:text-[var(--color-on-accent)] transition-colors w-full md:w-auto text-center grow"
              >
                Giriş Yap
              </a>
           </div>
        </div>
      </header>

      <div className="flex-grow flex flex-col items-center">
        <ThemeRenderer theme={theme} page={theme.pages[0]} business={business} />
      </div>

      {/* FOOTER TIER 5 KAMPÜS */}
      <footer className="bg-[var(--color-bg)] text-[var(--color-text)] py-24 mt-auto border-t-[4px] border-[var(--color-text)]">
         <div className="container-custom mx-auto px-4">
            <div className="grid md:grid-cols-4 gap-12 mb-20">
               <div className="md:col-span-2">
                  <h3 className="font-heading text-4xl md:text-5xl font-extrabold mb-6 uppercase tracking-tight">{business.name}</h3>
                  <p className="text-[var(--color-text-secondary)] max-w-md leading-relaxed font-bold text-lg mb-8">Türkiye'nin en kapsamlı eğitim organizasyonu.</p>
                  
                  <div className="flex gap-4">
                     <a href="#" className="w-12 h-12 border-2 border-[var(--color-text)] flex items-center justify-center hover:bg-[var(--color-text)] hover:text-[var(--color-bg)] transition-colors font-bold text-xs tracking-widest uppercase">IN</a>
                     <a href="#" className="w-12 h-12 border-2 border-[var(--color-text)] flex items-center justify-center hover:bg-[var(--color-text)] hover:text-[var(--color-bg)] transition-colors font-bold text-xs tracking-widest uppercase">YT</a>
                     <a href="#" className="w-12 h-12 border-2 border-[var(--color-text)] flex items-center justify-center hover:bg-[var(--color-text)] hover:text-[var(--color-bg)] transition-colors font-bold text-xs tracking-widest uppercase">LI</a>
                  </div>
               </div>
               
               <div>
                  <h4 className="font-bold text-[10px] tracking-[0.3em] uppercase mb-8 text-[var(--color-accent)]">Kampüsler</h4>
                  <ul className="space-y-4 font-bold text-sm tracking-widest uppercase">
                     <li><a href="#" className="hover:text-[var(--color-accent)] transition-colors">İstanbul</a></li>
                     <li><a href="#" className="hover:text-[var(--color-accent)] transition-colors">Ankara</a></li>
                     <li><a href="#" className="hover:text-[var(--color-accent)] transition-colors">İzmir</a></li>
                     <li><a href="#" className="hover:text-[var(--color-accent)] transition-colors">Bursa</a></li>
                  </ul>
               </div>
               
               <div>
                  <h4 className="font-bold text-[10px] tracking-[0.3em] uppercase mb-8 text-[var(--color-accent)]">Koordinasyon</h4>
                  <p className="font-bold text-lg mb-2">{business.phone}</p>
                  <p className="font-bold text-sm tracking-widest uppercase text-[var(--color-text-secondary)] mb-6">{business.email}</p>
                  <p className="font-bold text-xs tracking-widest uppercase text-[var(--color-text-secondary)] leading-loose">{business.address}<br/>{business.district}, {business.city}</p>
               </div>
            </div>
            
            <div className="pt-8 border-t-2 border-[var(--color-text)] flex flex-col md:flex-row justify-between items-center text-[10px] font-bold tracking-[0.3em] uppercase">
               <p>{theme.globalSections?.[1]?.defaultContent?.copyright || '© 2024 Kampüs Network.'}</p>
               <div className="flex gap-8 mt-6 md:mt-0">
                  <a href="#" className="hover:text-[var(--color-accent)] transition-colors">Yasal Uyarılar</a>
                  <a href="#" className="hover:text-[var(--color-accent)] transition-colors">Veri Politikası</a>
               </div>
            </div>
         </div>
      </footer>
    </div>
  )
}
