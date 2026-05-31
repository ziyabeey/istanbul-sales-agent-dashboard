// @ts-nocheck
'use client'

import {
  ThemeRenderer,
  OZELDERS_KALEM_CONFIG,
  OZELDERS_KALEM_BUSINESS
} from '@kepenk/templates'

export default function OzelDersKalemClient() {
  const theme = OZELDERS_KALEM_CONFIG; 
  const page = theme.pages[0]!; 
  const business = OZELDERS_KALEM_BUSINESS;
  
  return (
    <div lang="tr" className="font-body text-[var(--color-text)] min-h-screen relative" style={{...theme.cssVariables as any, backgroundColor: 'var(--color-bg)'}}>
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
      
      {/* HEADER TIER 1 KALEM */}
      <header className="sticky top-0 z-50 bg-[var(--color-surface)] border-b border-[var(--color-border)] py-4 backdrop-blur-md bg-opacity-90">
        <div className="w-full max-w-[1280px] mx-auto px-4 sm:px-6 flex items-center justify-between">
           <div className="flex items-center gap-3">
             <div className="w-10 h-10 rounded-[var(--radius-btn)] bg-[var(--color-accent-light)] flex items-center justify-center text-[var(--color-accent)] font-bold text-xl font-heading shadow-inner">
               {business.name.charAt(0)}
             </div>
             <h1 className="font-heading text-xl font-bold tracking-tight text-[var(--color-text)] hidden sm:block">{business.name}</h1>
           </div>
           
           <nav className="hidden md:flex items-center gap-8">
             {theme.globalSections?.[0]?.defaultContent?.menuItems?.map((item: any, idx: number) => (
                <a key={idx} href={item.href} className="text-sm font-semibold text-[var(--color-text-secondary)] hover:text-[var(--color-accent)] transition-colors">
                  {item.label}
                </a>
             ))}
           </nav>
           
           <a 
             href={`tel:${business.phoneClean}`} 
             className="bg-[var(--color-accent)] text-[var(--color-text-on-accent)] px-6 py-2.5 rounded-[var(--radius-btn)] font-semibold text-sm hover:bg-[var(--color-accent-hover)] transition-colors shadow-md hidden sm:flex items-center"
           >
             Hızlı İletişim
           </a>
        </div>
      </header>

      <ThemeRenderer theme={theme} page={theme.pages[0]} business={business} />

      {/* FOOTER TIER 1 KALEM */}
      <footer className="bg-[var(--color-surface)] py-12 border-t border-[var(--color-border)] mt-auto">
         <div className="w-full max-w-[1280px] mx-auto px-4 sm:px-6 flex flex-col md:flex-row justify-between items-center gap-6">
            <div className="text-center md:text-left">
               <h3 className="font-heading text-2xl font-bold text-[var(--color-text)] mb-2">{business.name}</h3>
               <p className="text-[var(--color-text-muted)] text-sm">{theme.globalSections?.[1]?.defaultContent?.copyright}</p>
            </div>
            <div className="flex gap-4">
               {business.socialMedia?.instagram && (
                 <a href={business.socialMedia.instagram} target="_blank" rel="noopener noreferrer" className="w-10 h-10 bg-[var(--color-surface-elevated)] rounded-full flex items-center justify-center text-[var(--color-text-secondary)] hover:text-[var(--color-accent)] hover:bg-[var(--color-accent-light)] transition-all">IN</a>
               )}
               {business.socialMedia?.facebook && (
                 <a href={business.socialMedia.facebook} target="_blank" rel="noopener noreferrer" className="w-10 h-10 bg-[var(--color-surface-elevated)] rounded-full flex items-center justify-center text-[var(--color-text-secondary)] hover:text-[var(--color-accent)] hover:bg-[var(--color-accent-light)] transition-all">FB</a>
               )}
            </div>
         </div>
      </footer>
    </div>
  )
}
