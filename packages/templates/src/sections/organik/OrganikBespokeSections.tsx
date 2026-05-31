'use client'

import React, { ComponentType } from 'react'
import { motion } from 'framer-motion'
import { Leaf, Sun, ShieldCheck, ShoppingBag, ArrowRight } from 'lucide-react'
import { registerSection, type SectionProps } from '../../registry/section-registry'

// ── 1. Organik Nature Hero ──
export function OrganikBespokeHero({ business, content }: SectionProps<any>) {
  return (
    <section className="relative min-h-[90vh] bg-[#F7F9F4] text-[#2C4A22] flex items-center pt-24 overflow-hidden">
      {/* Decorative Blob Shapes */}
      <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-[#EAF2D5] rounded-full mix-blend-multiply filter blur-3xl opacity-70 animate-blob" />
      <div className="absolute bottom-0 left-10 w-[500px] h-[500px] bg-[#D8E6C9] rounded-full mix-blend-multiply filter blur-3xl opacity-50 animate-blob animation-delay-2000" />

      <div className="relative z-10 w-full max-w-[var(--container-default)] mx-auto px-6 md:px-12">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          
          <div className="max-w-xl">
            <motion.div 
              initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }}
              className="inline-flex items-center gap-2 bg-white px-5 py-2.5 rounded-full mb-8 shadow-sm border border-[#EAF2D5]"
            >
              <Leaf className="w-5 h-5 text-[#5B8C46]" />
              <span className="text-[#3D632F] font-bold uppercase tracking-widest text-xs">
                {content?.badge || '%100 DOĞAL & KATKISIZ'}
              </span>
            </motion.div>

            <motion.h1 
              initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 0.2 }}
              className="text-5xl md:text-7xl font-bold leading-[1.1] mb-6 text-[#1A3311] tracking-tight"
              style={{ fontFamily: 'var(--font-heading)' }}
            >
              {content?.title || business?.name || 'Topraktan\nSofranıza\nSağlık.'}
            </motion.h1>

            <motion.p 
              initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 1, delay: 0.4 }}
              className="text-xl text-[#4A663F] font-medium leading-relaxed mb-10"
            >
              {content?.description || (business?.description as string) || 'Hiçbir kimyasal gübre ve tarım ilacı kullanmadan, tamamen mevsiminde ve ata tohumlarıyla yetiştirdiğimiz ürünleri kapınıza getiriyoruz.'}
            </motion.p>
            
            <motion.div 
              initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 0.6 }}
              className="flex flex-wrap gap-4"
            >
              <button className="bg-[#5B8C46] text-white px-8 py-4 rounded-full font-bold tracking-wide hover:bg-[#4A7836] transition-all shadow-xl shadow-[#5B8C46]/20 flex items-center gap-2">
                <ShoppingBag className="w-5 h-5" /> Mağazayı Gez
              </button>
              <button className="bg-transparent text-[#2C4A22] px-8 py-4 rounded-full font-bold tracking-wide border-2 border-[#5B8C46] hover:bg-[#EAF2D5] transition-colors">
                Hikayemizi Oku
              </button>
            </motion.div>
          </div>
          
          <div className="relative">
             <motion.div 
               initial={{ opacity: 0, scale: 0.9, rotate: -3 }} animate={{ opacity: 1, scale: 1, rotate: 0 }} transition={{ duration: 1.2, type: "spring" }}
               className="relative z-10"
             >
               {/* Organic mask shape using border-radius */}
               <div className="relative overflow-hidden rounded-[40%_60%_70%_30%/40%_50%_60%_50%] shadow-2xl border-8 border-white aspect-square w-full max-w-lg mx-auto bg-[#D8E6C9]">
                 <img 
                   src={(business?.images as any[])?.[0] || 'https://images.unsplash.com/photo-1542838132-92c53300491e?q=80&w=2874&auto=format&fit=crop'} 
                   alt="Fresh Organic Produce" 
                   className="w-full h-full object-cover"
                 />
               </div>
               
               {/* Floating Tag */}
               <div className="absolute top-10 -left-6 bg-white p-4 rounded-2xl shadow-xl hidden md:block border border-[#F7F9F4]">
                 <div className="flex items-center gap-3">
                   <div className="w-10 h-10 bg-[#FEF08A] rounded-full flex items-center justify-center text-[#A16207]">
                     <Sun className="w-5 h-5" />
                   </div>
                   <div>
                     <div className="font-bold text-[#1A3311]">Günlük Hasat</div>
                     <div className="text-xs font-semibold text-[#5B8C46] uppercase tracking-wider">Taze Teslimat</div>
                   </div>
                 </div>
               </div>
             </motion.div>
          </div>
          
        </div>
      </div>
    </section>
  )
}
registerSection('hero', 'organik_bespoke_hero', OrganikBespokeHero as unknown as ComponentType<SectionProps<Record<string, unknown>>>)

// ── 2. Organik Products/Categories ──
export function OrganikBespokeServices({ business, content }: SectionProps<any>) {
  const products = business?.services?.length ? business.services : [
    { title: 'Taze Sebze & Meyve', desc: 'Sera değil, tarla ürünü. Mevsiminde güneşte olgunlaşmış domates, biber ve yeşillikler.', icon: '🥬', color: '#D8E6C9' },
    { title: 'Süt & Şarküteri', desc: 'Serbest gezen hayvanlardan elde edilen katkısız süt, ev yapımı yoğurt ve doğal peynirler.', icon: '🥛', color: '#FEF08A' },
    { title: 'Kuru Gıda & Bal', desc: 'Taş değirmen unları, atalık tohum bakliyatlar ve yüksek rakım organik süzme bal.', icon: '🍯', color: '#FED7AA' },
  ];

  return (
    <section className="py-24 md:py-32 bg-white text-[#1A3311]">
      <div className="max-w-[var(--container-default)] mx-auto px-6 md:px-12">
        <div className="text-center max-w-2xl mx-auto mb-20">
          <h2 className="text-4xl md:text-5xl font-bold mb-6 tracking-tight" style={{ fontFamily: 'var(--font-heading)' }}>
            {content?.title || 'Doğadan Sepetinize'}
          </h2>
          <div className="w-16 h-1.5 bg-[#5B8C46] mx-auto rounded-full mb-6" />
          <p className="text-[#4A663F] text-lg font-medium">Market raflarındaki değil, babaannelerimizin bahçesindeki o gerçek kokulu ve lezzetli gıdalar.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {products.map((prod: any, i: number) => (
            <motion.div 
              key={i}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: i * 0.15 }}
              className="bg-white rounded-[2.5rem] p-8 border-2 border-[#F7F9F4] hover:border-[#D8E6C9] hover:shadow-xl transition-all group"
            >
              <div 
                className="w-20 h-20 rounded-[1.5rem] flex items-center justify-center text-4xl mb-8 group-hover:-translate-y-2 transition-transform duration-300"
                style={{ backgroundColor: prod.color }}
              >
                {prod.icon}
              </div>
              <h3 className="text-2xl font-bold mb-4 text-[#1A3311]">{prod.title}</h3>
              <p className="text-[#4A663F] font-medium leading-relaxed mb-8">{prod.desc}</p>
              <div className="text-[#5B8C46] font-bold text-sm uppercase tracking-wider flex items-center gap-2 group-hover:gap-4 transition-all cursor-pointer">
                İncele <ArrowRight className="w-4 h-4" />
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
registerSection('services', 'organik_bespoke_services', OrganikBespokeServices as unknown as ComponentType<SectionProps<Record<string, unknown>>>)

// ── 3. Organik Certification/About ──
export function OrganikBespokeAbout({ business, content }: SectionProps<any>) {
  return (
    <section className="bg-[#5B8C46] py-24 md:py-32 text-white overflow-hidden relative rounded-[3rem] mx-4 md:mx-8 my-10">
      <div className="absolute top-0 right-0 w-96 h-96 bg-[#4A7836] rounded-full blur-3xl opacity-50 -translate-y-1/2" />
      
      <div className="max-w-[var(--container-default)] mx-auto px-6 md:px-12 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          
          <div className="order-2 lg:order-1 relative">
            <img 
              src="https://images.unsplash.com/photo-1595858608465-9831ce8bb863?q=80&w=2938&auto=format&fit=crop" 
              alt="Organic Farm" 
              className="rounded-3xl shadow-2xl border-4 border-[#7AA368] w-full aspect-[4/3] object-cover"
            />
            <div className="absolute -bottom-6 -right-6 bg-white text-[#1A3311] p-6 rounded-full shadow-xl hidden md:flex items-center justify-center w-32 h-32">
              <div className="text-center">
                <ShieldCheck className="w-8 h-8 text-[#5B8C46] mx-auto mb-1" />
                <div className="font-black text-xs uppercase">Sertifikalı</div>
              </div>
            </div>
          </div>
          
          <div className="order-1 lg:order-2">
            <div className="text-[#D8E6C9] font-bold uppercase tracking-widest text-sm mb-4">Sertifikalı Üretim</div>
            <h2 className="text-4xl md:text-5xl font-bold mb-8 leading-tight tracking-tight" style={{ fontFamily: 'var(--font-heading)' }}>
              {content?.title || 'Çocuklarınıza Gönül Rahatlığıyla Yedirin.'}
            </h2>
            <div className="space-y-6 text-[#EAF2D5] font-medium leading-relaxed text-lg mb-10">
              <p>
                {(business?.description as string) || 'Tarlalarımız Tarım Bakanlığı ve bağımsız denetleme kuruluşları tarafından düzenli olarak analiz edilir. Toprağımızda zehir, ürünlerimizde mumlama veya koruyucu gaz bulunmaz.'}
              </p>
            </div>
            
            <ul className="space-y-4">
              {['Zirai İlaç ve Pestisit İçermez', 'Hormon ve GDO Kullanılmaz', 'Doğa Dostu Kağıt/Bez Ambalajlar'].map((item, i) => (
                <li key={i} className="flex items-center gap-4 text-white font-bold">
                  <div className="w-6 h-6 rounded-full bg-[#7AA368] flex items-center justify-center shrink-0">
                    <Leaf className="w-3 h-3 text-white" />
                  </div>
                  {item}
                </li>
              ))}
            </ul>
          </div>
          
        </div>
      </div>
    </section>
  )
}
registerSection('about', 'organik_bespoke_about', OrganikBespokeAbout as unknown as ComponentType<SectionProps<Record<string, unknown>>>)

// ── 4. Organik Contact & Newsletter ──
export function OrganikBespokeContact({ business, content }: SectionProps<any>) {
  return (
    <section className="bg-white text-[#1A3311] py-24 md:py-32">
      <div className="max-w-[var(--container-default)] mx-auto px-6 md:px-12">
        <div className="bg-[#F7F9F4] rounded-[3rem] p-10 md:p-16 border border-[#EAF2D5] text-center max-w-4xl mx-auto shadow-xl">
          
          <Leaf className="w-12 h-12 text-[#5B8C46] mx-auto mb-6" />
          <h2 className="text-4xl md:text-5xl font-bold mb-6 tracking-tight" style={{ fontFamily: 'var(--font-heading)' }}>Tazelik Kapınıza Gelsin</h2>
          <p className="text-[#4A663F] font-medium mb-12 text-lg max-w-xl mx-auto">
            Haftalık hasat listemizden haberdar olmak ve taze ürünleri tükenmeden sipariş vermek için bültenimize katılın veya bize ulaşın.
          </p>
          
          <form className="flex flex-col md:flex-row gap-4 max-w-2xl mx-auto mb-16">
            <input 
              type="email" 
              placeholder="E-posta adresiniz..." 
              className="flex-1 bg-white border border-[#D8E6C9] rounded-full px-6 py-4 focus:outline-none focus:border-[#5B8C46] font-medium text-[#1A3311] transition-colors" 
            />
            <button className="bg-[#1A3311] text-white font-bold px-8 py-4 rounded-full hover:bg-[#2C4A22] transition-colors shadow-lg">
              Kayıt Ol
            </button>
          </form>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 border-t border-[#D8E6C9] pt-12">
            <div>
              <h4 className="font-bold text-[#5B8C46] uppercase tracking-wider text-sm mb-2">WhatsApp Sipariş Hattı</h4>
              <p className="text-2xl font-black text-[#1A3311]">{business?.phone || '+90 533 123 45 67'}</p>
            </div>
            <div>
              <h4 className="font-bold text-[#5B8C46] uppercase tracking-wider text-sm mb-2">Çiftlik Adresimiz</h4>
              <p className="text-[#4A663F] font-medium">{business?.address || 'Organik Tarım Köyü No:1\nUrla, İzmir'}</p>
            </div>
          </div>

        </div>
      </div>
    </section>
  )
}
registerSection('contact', 'organik_bespoke_contact', OrganikBespokeContact as unknown as ComponentType<SectionProps<Record<string, unknown>>>)
