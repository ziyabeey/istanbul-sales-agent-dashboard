'use client'

import React, { ComponentType } from 'react'
import { motion } from 'framer-motion'
import { Coffee, Cake, Croissant, MapPin, PhoneCall, Star } from 'lucide-react'
import { registerSection, type SectionProps } from '../../registry/section-registry'

// ── 1. Pastane Cozy Hero ──
export function PastaneBespokeHero({ business, content }: SectionProps<any>) {
  return (
    <section className="relative min-h-[90vh] bg-[#FAF6F0] text-[#3E2723] flex items-center pt-24 overflow-hidden">
      {/* Decorative background blobs */}
      <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-[#F3E5F5]/40 rounded-full blur-[100px] -translate-y-1/2 translate-x-1/4" />
      <div className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-[#FFF3E0]/60 rounded-full blur-[80px] translate-y-1/3 -translate-x-1/4" />

      <div className="relative z-20 w-full max-w-[var(--container-default)] mx-auto px-6 md:px-12">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <div className="max-w-xl">
            <motion.div 
              initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }}
              className="inline-flex items-center gap-2 mb-8"
            >
              <Star className="w-4 h-4 text-[#D4A373]" fill="currentColor" />
              <Star className="w-4 h-4 text-[#D4A373]" fill="currentColor" />
              <Star className="w-4 h-4 text-[#D4A373]" fill="currentColor" />
              <span className="text-[#8D6E63] font-medium uppercase tracking-[0.2em] text-xs ml-2">
                {content?.badge || 'GÜNLÜK VE TAZE'}
              </span>
            </motion.div>

            <motion.h1 
              initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 0.2 }}
              className="text-5xl md:text-7xl font-normal leading-[1.1] mb-6 text-[#4E342E]"
              style={{ fontFamily: 'var(--font-heading)' }}
            >
              {content?.title || business?.name || 'Fırından Yeni Çıkan\nMutluluk.'}
            </motion.h1>

            <motion.p 
              initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 1, delay: 0.4 }}
              className="text-lg text-[#6D4C41] font-light leading-relaxed mb-10"
            >
              {content?.description || (business?.description as string) || 'En kaliteli malzemelerle, anne eli değmiş gibi özenle hazırlanan el yapımı tatlılarımız ve nitelikli kahvelerimizle gününüze lezzet katıyoruz.'}
            </motion.p>
            
            <motion.div 
              initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 0.6 }}
              className="flex flex-wrap gap-4"
            >
              <button className="bg-[#5D4037] text-[#FAF6F0] px-10 py-4 rounded-full font-medium tracking-wide hover:bg-[#3E2723] transition-colors shadow-xl shadow-[#5D4037]/20">
                Menüyü İncele
              </button>
              <button className="bg-white text-[#5D4037] px-8 py-4 rounded-full font-medium tracking-wide border border-[#EFEBE9] hover:bg-[#F5F5F5] transition-colors">
                Sipariş Ver
              </button>
            </motion.div>
          </div>
          
          <div className="relative">
             <motion.div 
               initial={{ opacity: 0, scale: 0.9, rotate: -5 }} animate={{ opacity: 1, scale: 1, rotate: 0 }} transition={{ duration: 1.2, type: "spring" }}
               className="relative z-10"
             >
               <img 
                 src={(business?.images as any[])?.[0] || 'https://images.unsplash.com/photo-1558961363-fa8fdf82db35?q=80&w=2865&auto=format&fit=crop'} 
                 alt="Taze Pastane Ürünleri" 
                 className="rounded-tl-[8rem] rounded-br-[8rem] rounded-tr-[2rem] rounded-bl-[2rem] w-full h-[600px] object-cover shadow-2xl"
               />
               
               {/* Floating Badge */}
               <div className="absolute -left-8 top-1/4 bg-white p-6 rounded-3xl shadow-xl hidden md:flex items-center gap-4">
                 <div className="w-12 h-12 bg-[#FFF3E0] rounded-full flex items-center justify-center text-[#E65100]">
                   <Coffee className="w-6 h-6" />
                 </div>
                 <div>
                   <div className="font-bold text-[#3E2723]">100% Arabica</div>
                   <div className="text-sm text-[#8D6E63]">Nitelikli Çekirdekler</div>
                 </div>
               </div>
             </motion.div>
          </div>
        </div>
      </div>
    </section>
  )
}
registerSection('hero', 'pastane_bespoke_hero', PastaneBespokeHero as unknown as ComponentType<SectionProps<Record<string, unknown>>>)

// ── 2. Pastane Delights (Menu/Services) ──
export function PastaneBespokeServices({ business, content }: SectionProps<any>) {
  const products = business?.services?.length ? business.services : [
    { title: 'Artisan Pastalar', desc: 'Özel günleriniz için sipariş üzerine hazırlanan tasarım pastalar.', img: 'https://images.unsplash.com/photo-1578985545062-69928b1d9587?q=80&w=2889&auto=format&fit=crop', icon: <Cake /> },
    { title: 'Fransız Kruvasan', desc: 'Kat kat tereyağlı, çıtır çıtır otantik Fransız kruvasanları.', img: 'https://images.unsplash.com/photo-1555507036-ab1f40ce88ca?q=80&w=2846&auto=format&fit=crop', icon: <Croissant /> },
    { title: 'Nitelikli Kahve', desc: 'Dünyanın en iyi tarlalarından özenle kavrulmuş filtre ve espresso.', img: 'https://images.unsplash.com/photo-1497935586351-b67a49e012bf?q=80&w=2942&auto=format&fit=crop', icon: <Coffee /> },
  ];

  return (
    <section className="py-24 md:py-32 bg-white text-[#4E342E]">
      <div className="max-w-[var(--container-default)] mx-auto px-6 md:px-12">
        <div className="text-center max-w-2xl mx-auto mb-20">
          <h2 className="text-4xl md:text-5xl font-normal mb-6" style={{ fontFamily: 'var(--font-heading)' }}>
            {content?.title || 'Vitrinimizden Seçmeler'}
          </h2>
          <div className="flex justify-center items-center gap-2 mb-6">
            <div className="w-12 h-[1px] bg-[#D4A373]" />
            <Star className="w-3 h-3 text-[#D4A373]" fill="currentColor" />
            <div className="w-12 h-[1px] bg-[#D4A373]" />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
          {products.map((product: any, i: number) => (
            <motion.div 
              key={i}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: i * 0.15 }}
              className="group"
            >
              <div className="relative aspect-square rounded-[3rem] overflow-hidden mb-8 shadow-lg">
                <img src={product.img} alt={product.title} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700 ease-in-out" />
                <div className="absolute top-6 right-6 w-12 h-12 bg-white/90 backdrop-blur-sm rounded-full flex items-center justify-center text-[#5D4037] shadow-sm group-hover:-translate-y-1 transition-transform">
                  {product.icon}
                </div>
              </div>
              <h3 className="text-3xl font-normal mb-3 text-center" style={{ fontFamily: 'var(--font-heading)' }}>{product.title}</h3>
              <p className="text-[#8D6E63] font-light leading-relaxed text-center">{product.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
registerSection('services', 'pastane_bespoke_services', PastaneBespokeServices as unknown as ComponentType<SectionProps<Record<string, unknown>>>)

// ── 3. Pastane Story (About) ──
export function PastaneBespokeAbout({ business, content }: SectionProps<any>) {
  return (
    <section className="py-24 md:py-32 bg-[#F5EFE6] text-[#3E2723] border-y border-[#EFEBE9]">
      <div className="max-w-[var(--container-default)] mx-auto px-6 md:px-12">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-center">
          <div className="lg:col-span-5 order-2 lg:order-1">
             <div className="grid grid-cols-2 gap-4">
               <img src="https://images.unsplash.com/photo-1517433670267-08bbd4be890f?q=80&w=2880&auto=format&fit=crop" className="w-full h-64 object-cover rounded-t-full rounded-bl-full" alt="Kitchen" />
               <img src="https://images.unsplash.com/photo-1486427944299-d1955d23e34d?q=80&w=2940&auto=format&fit=crop" className="w-full h-64 object-cover rounded-b-full rounded-tr-full mt-12" alt="Baking" />
             </div>
          </div>
          
          <div className="lg:col-span-1" />
          
          <div className="lg:col-span-6 order-1 lg:order-2 text-center lg:text-left">
            <h2 className="text-4xl md:text-5xl font-normal mb-8 leading-tight" style={{ fontFamily: 'var(--font-heading)' }}>
              {content?.title || 'Bizim Hikayemiz, Sizin Lezzetiniz.'}
            </h2>
            <div className="space-y-6 text-[#6D4C41] font-light leading-relaxed text-lg">
              <p>
                {(business?.description as string) || 'Her sabah gün ağarmadan fırınımızı ısıtıyor, en taze unlar ve doğal tereyağı ile güne başlıyoruz. Endüstriyel katkı maddelerinden uzak, tamamen artisan yöntemlerle üretim yapıyoruz.'}
              </p>
              <p>
                Hedefimiz sadece karnınızı doyurmak değil; bir dilim pasta veya taze demlenmiş bir kahve ile gününüzde küçük ama unutulmaz bir mutluluk anı yaratmaktır.
              </p>
            </div>
            <div className="mt-10 font-medium text-[#8D6E63] italic font-serif text-xl">
              "Sevgiyle pişen her şey lezzetlidir."
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
registerSection('about', 'pastane_bespoke_about', PastaneBespokeAbout as unknown as ComponentType<SectionProps<Record<string, unknown>>>)

// ── 4. Pastane Contact ──
export function PastaneBespokeContact({ business, content }: SectionProps<any>) {
  return (
    <section className="bg-white text-[#4E342E] py-24 md:py-32">
      <div className="max-w-[var(--container-default)] mx-auto px-6 md:px-12">
        <div className="bg-[#FAF6F0] rounded-[4rem] p-10 md:p-20 relative border border-[#EFEBE9]">
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 relative z-10 items-center">
            <div className="text-center lg:text-left">
              <h2 className="text-4xl md:text-6xl font-normal mb-6" style={{ fontFamily: 'var(--font-heading)' }}>Bize Uğrayın</h2>
              <p className="text-[#8D6E63] font-light mb-12 max-w-md mx-auto lg:mx-0">Taze çekilmiş kahve kokusunu takip edin. Özel siparişleriniz ve kutlamalarınız için bizi arayabilirsiniz.</p>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 text-left">
                <div>
                  <div className="flex items-center gap-3 text-[#5D4037] font-semibold mb-3">
                    <MapPin className="w-5 h-5 text-[#D4A373]" /> Adres
                  </div>
                  <p className="text-[#6D4C41] font-light leading-relaxed">{business?.address || 'Caddebostan Mah. Plaj Yolu Sok. No:12\nKadıköy, İstanbul'}</p>
                </div>
                <div>
                  <div className="flex items-center gap-3 text-[#5D4037] font-semibold mb-3">
                    <PhoneCall className="w-5 h-5 text-[#D4A373]" /> İletişim & Sipariş
                  </div>
                  <p className="text-[#6D4C41] font-light leading-relaxed">{business?.phone || '+90 216 123 45 67'}<br/>merhaba@pastanebespoke.com</p>
                </div>
              </div>
            </div>
            
            <form className="bg-white p-8 md:p-12 rounded-[2.5rem] shadow-xl shadow-[#5D4037]/5">
              <h3 className="text-2xl font-normal mb-8 text-center" style={{ fontFamily: 'var(--font-heading)' }}>Özel Sipariş Formu</h3>
              <div className="space-y-5">
                <div>
                  <input type="text" placeholder="Adınız Soyadınız" className="w-full bg-[#FAFAFA] border border-[#EFEBE9] rounded-2xl px-6 py-4 focus:outline-none focus:border-[#D4A373] transition-colors font-light" />
                </div>
                <div>
                  <input type="tel" placeholder="Telefon Numaranız" className="w-full bg-[#FAFAFA] border border-[#EFEBE9] rounded-2xl px-6 py-4 focus:outline-none focus:border-[#D4A373] transition-colors font-light" />
                </div>
                <div>
                  <textarea rows={3} placeholder="Sipariş Detayı (Pasta türü, kişi sayısı vb.)" className="w-full bg-[#FAFAFA] border border-[#EFEBE9] rounded-2xl px-6 py-4 focus:outline-none focus:border-[#D4A373] transition-colors font-light resize-none" />
                </div>
                <button className="w-full bg-[#5D4037] text-white font-medium py-4 rounded-2xl hover:bg-[#3E2723] transition-colors shadow-lg">
                  Siparişi Gönder
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </section>
  )
}
registerSection('contact', 'pastane_bespoke_contact', PastaneBespokeContact as unknown as ComponentType<SectionProps<Record<string, unknown>>>)
