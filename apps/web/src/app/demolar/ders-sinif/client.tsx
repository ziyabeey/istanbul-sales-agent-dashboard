// @ts-nocheck
'use client'

import {
  ThemeRenderer,
  OZELDERS_SINIF_CONFIG,
  OZELDERS_SINIF_BUSINESS
} from '@kepenk/templates'

export default function OzelDersSinifClient() {
  const theme = OZELDERS_SINIF_CONFIG; 
  const page = theme.pages[0]!; 
  const business = OZELDERS_SINIF_BUSINESS;
  
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
      
      {/* HEADER TIER 2 SINIF */}
      <header className="sticky top-0 z-50 bg-[var(--color-surface)]/95 border-b border-[var(--color-border)] py-4 backdrop-blur-sm">
        <div className="w-full max-w-[768px] mx-auto px-4 flex items-center justify-between">
           <div className="flex items-center gap-2">
             <div className="w-8 h-8 rounded-full bg-[var(--color-accent)] flex items-center justify-center text-[var(--color-on-accent)] font-bold text-sm font-heading shadow-md text-white">
               {business.name.charAt(0)}
             </div>
             <h1 className="font-heading text-lg font-bold tracking-tight text-[var(--color-text)]">{business.name}</h1>
           </div>
           
           <nav className="hidden sm:flex items-center gap-6">
             {theme.globalSections?.[0]?.defaultContent?.menuItems?.map((item: any, idx: number) => (
                <a key={idx} href={item.href} className="text-sm font-medium text-[var(--color-text-secondary)] hover:text-[var(--color-accent)] transition-colors">
                  {item.label}
                </a>
             ))}
           </nav>
           
           <a 
             href={`tel:${business.phoneClean}`} 
             className="bg-[var(--color-surface-elevated)] border border-[var(--color-border)] text-[var(--color-text)] px-4 py-2 rounded-[var(--radius-btn)] font-semibold text-xs hover:bg-[var(--color-bg)] transition-colors shadow-sm hidden sm:block"
           >
             0544 333 22 11
           </a>
        </div>
      </header>

      <div className="flex-grow flex flex-col items-center">
        <ThemeRenderer theme={theme} page={theme.pages[0]} business={business} />
      </div>

      {/* FOOTER TIER 2 SINIF */}
      <footer className="bg-[var(--color-surface)] py-10 mt-auto border-t border-[var(--color-border)] text-center text-sm">
         <div className="w-full max-w-[768px] mx-auto px-4 flex flex-col items-center gap-4">
            <h3 className="font-heading text-xl font-bold text-[var(--color-text)]">{business.name}</h3>
            <p className="text-[var(--color-text-muted)] max-w-sm">{business.address}, {business.district}</p>
            <div className="flex justify-center gap-4 mt-2">
               {business.socialMedia?.instagram && <a href={business.socialMedia.instagram} target="_blank" rel="noopener noreferrer" className="text-[var(--color-text-secondary)] hover:text-[var(--color-accent)] font-bold">Insta</a>}
               {business.socialMedia?.facebook && <a href={business.socialMedia.facebook} target="_blank" rel="noopener noreferrer" className="text-[var(--color-text-secondary)] hover:text-[var(--color-accent)] font-bold">Face</a>}
            </div>
            <p className="text-[var(--color-text-muted)] mt-4">{theme.globalSections?.[1]?.defaultContent?.copyright || '© 2024 Sınıf Özel Ders.'}</p>
         </div>
      </footer>
    </div>
  )
}
