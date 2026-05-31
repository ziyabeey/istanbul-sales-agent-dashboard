// @ts-nocheck
'use client'

import {
  ThemeRenderer,
  OZELDERS_KOLEJ_CONFIG,
  OZELDERS_KOLEJ_BUSINESS
} from '@kepenk/templates'

export default function OzelDersKolejClient() {
  const theme = OZELDERS_KOLEJ_CONFIG; 
  const page = theme.pages[0]!; 
  const business = OZELDERS_KOLEJ_BUSINESS;
  
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
      
      {/* HEADER TIER 4 KOLEJ */}
      <header className="absolute top-0 left-0 w-full z-50 bg-transparent py-6 border-b border-[var(--color-border)]/50">
        <div className="container-custom mx-auto px-4 flex items-center justify-between">
           <div className="flex items-center gap-4">
             <div className="w-14 h-14 border-2 border-[var(--color-text)] flex items-center justify-center text-[var(--color-text)] font-bold text-2xl font-heading bg-transparent relative overflow-hidden group">
               <div className="absolute inset-0 bg-[var(--color-text)] -translate-x-full group-hover:translate-x-0 transition-transform duration-500 ease-out z-0"></div>
               <span className="relative z-10 group-hover:text-[var(--color-bg)] transition-colors duration-500">{business.name.charAt(0)}</span>
             </div>
             <div>
                <h1 className="font-heading text-2xl font-bold tracking-tight text-[var(--color-text)] m-0 leading-none">
                  {business.name}
                </h1>
                <span className="text-xs text-[var(--color-text-secondary)] tracking-[0.2em] font-bold uppercase mt-1 block">
                  Eğitim Kurumları
                </span>
             </div>
           </div>
           
           <nav className="hidden lg:flex items-center gap-10">
             {theme.globalSections?.[0]?.defaultContent?.menuItems?.map((item: any, idx: number) => (
                <a key={idx} href={item.href} className="text-[13px] font-bold tracking-widest uppercase text-[var(--color-text)] hover:text-[var(--color-accent)] transition-colors relative group">
                  {item.label}
                  <div className="absolute -bottom-2 left-0 w-0 h-0.5 bg-[var(--color-accent)] group-hover:w-full transition-all duration-300"></div>
                </a>
             ))}
           </nav>
           
           <div className="flex items-center gap-6">
              <div className="hidden sm:flex flex-col text-right">
                 <span className="text-[10px] font-bold tracking-[0.2em] uppercase text-[var(--color-text-secondary)]">Öğrenci İşleri</span>
                 <a href={`tel:${business.phoneClean}`} className="text-sm font-bold text-[var(--color-text)] font-heading">{business.phone}</a>
              </div>
              <a 
                href="#iletisim" 
                className="bg-[var(--color-text)] text-[var(--color-bg)] px-8 py-3.5 rounded-sm font-bold text-[13px] tracking-widest uppercase hover:bg-[var(--color-accent)] hover:text-[var(--color-on-accent)] transition-colors shadow-xl"
              >
                Kabul Süreci
              </a>
           </div>
        </div>
      </header>

      <div className="flex-grow flex flex-col items-center">
        <ThemeRenderer theme={theme} page={theme.pages[0]} business={business} />
      </div>

      {/* FOOTER TIER 4 KOLEJ */}
      <footer className="bg-surface text-[var(--color-text)] py-20 mt-auto border-t border-[var(--color-border)] relative overflow-hidden">
         <div className="absolute inset-0 opacity-5 pointer-events-none">
            <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/clean-gray-paper.png')]"></div>
         </div>
         <div className="container-custom mx-auto px-4 relative z-10">
            <div className="flex flex-col md:flex-row justify-between items-start gap-16 mb-16 border-b border-[var(--color-border)] pb-16">
               <div className="md:w-1/3">
                  <div className="w-16 h-16 border-2 border-[var(--color-text)] flex items-center justify-center text-[var(--color-text)] font-bold text-3xl font-heading mb-8">
                     {business.name.charAt(0)}
                  </div>
                  <h3 className="font-heading text-3xl font-bold mb-4">{business.name} Özel Öğretim</h3>
                  <p className="text-[var(--color-text-secondary)] max-w-sm leading-relaxed mb-8">Eğitimde vizyon sahibi, yenilikçi ve akademik mükemmellik odaklı butik eğitim modeli.</p>
               </div>
               
               <div className="md:w-2/3 grid grid-cols-2 md:grid-cols-3 gap-8">
                  <div>
                     <h4 className="font-bold text-[11px] tracking-[0.2em] uppercase mb-6 text-[var(--color-text-secondary)]">Akademik</h4>
                     <ul className="space-y-4 font-medium text-sm">
                        <li><a href="#" className="hover:text-[var(--color-accent)] transition-colors">Olimpiyat Hazırlık</a></li>
                        <li><a href="#" className="hover:text-[var(--color-accent)] transition-colors">YKS (TYT/AYT) Akademisi</a></li>
                        <li><a href="#" className="hover:text-[var(--color-accent)] transition-colors">Lise Mentörlüğü</a></li>
                        <li><a href="#" className="hover:text-[var(--color-accent)] transition-colors">Uluslararası Sınavlar</a></li>
                     </ul>
                  </div>
                  <div>
                     <h4 className="font-bold text-[11px] tracking-[0.2em] uppercase mb-6 text-[var(--color-text-secondary)]">Kurumsal</h4>
                     <ul className="space-y-4 font-medium text-sm">
                        <li><a href="#" className="hover:text-[var(--color-accent)] transition-colors">Hakkımızda</a></li>
                        <li><a href="#" className="hover:text-[var(--color-accent)] transition-colors">Eğitim Kadrosu</a></li>
                        <li><a href="#" className="hover:text-[var(--color-accent)] transition-colors">İnsan Kaynakları</a></li>
                        <li><a href="#" className="hover:text-[var(--color-accent)] transition-colors">Sıkça Sorulan Sorular</a></li>
                     </ul>
                  </div>
                  <div className="col-span-2 md:col-span-1">
                     <h4 className="font-bold text-[11px] tracking-[0.2em] uppercase mb-6 text-[var(--color-text-secondary)]">İletişim</h4>
                     <ul className="space-y-4 text-sm text-[var(--color-text-secondary)] font-medium">
                        <li><span className="block font-bold text-[var(--color-text)] mb-1">Adres:</span> {business.address}, {business.district}, {business.city}</li>
                        <li><span className="block font-bold text-[var(--color-text)] mb-1">Telefon:</span> {business.phone}</li>
                        <li><span className="block font-bold text-[var(--color-text)] mb-1">E-Posta:</span> {business.email}</li>
                     </ul>
                  </div>
               </div>
            </div>
            
            <div className="flex flex-col md:flex-row justify-between items-center text-xs font-bold tracking-widest text-[var(--color-text-secondary)] uppercase">
               <p>{theme.globalSections?.[1]?.defaultContent?.copyright || '© 2024 Kolej Akademi.'}</p>
               <div className="flex gap-8 mt-6 md:mt-0">
                  <a href="#" className="hover:text-[var(--color-text)] transition-colors">KVKK Aydınlatma</a>
                  <a href="#" className="hover:text-[var(--color-text)] transition-colors">Çerez Politikası</a>
               </div>
            </div>
         </div>
      </footer>
    </div>
  )
}
