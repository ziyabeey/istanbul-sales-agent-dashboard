'use client'

import React, { ComponentType } from 'react'
import { motion } from 'framer-motion'
import { Droplets, Sparkles, Truck, CheckCircle2, ShieldCheck, ArrowRight } from 'lucide-react'
import { registerSection, type SectionProps } from '../../registry/section-registry'

// ── 1. Haliyikama Fresh Hero ──
export function HaliyikamaBespokeHero({ business, content }: SectionProps<any>) {
  return (
    <section className="relative min-h-[90vh] bg-[#F0F9FF] text-[#0F172A] flex items-center pt-24 overflow-hidden">
      {/* Dynamic water/bubble background effects */}
      <div className="absolute top-20 right-10 w-64 h-64 bg-[#BAE6FD] rounded-full mix-blend-multiply filter blur-3xl opacity-60 animate-blob" />
      <div className="absolute bottom-10 left-10 w-72 h-72 bg-[#E0F2FE] rounded-full mix-blend-multiply filter blur-3xl opacity-70 animate-blob animation-delay-2000" />
      <div className="absolute -top-10 left-1/2 w-48 h-48 bg-[#7DD3FC] rounded-full mix-blend-multiply filter blur-3xl opacity-40 animate-blob animation-delay-4000" />

      <div className="relative z-10 w-full max-w-[var(--container-default)] mx-auto px-6 md:px-12">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <div className="max-w-xl">
            <motion.div 
              initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }}
              className="inline-flex items-center gap-2 bg-white px-4 py-2 rounded-full mb-8 shadow-sm border border-[#E0F2FE]"
            >
              <Droplets className="w-5 h-5 text-[#0EA5E9]" />
              <span className="text-[#0284C7] font-bold uppercase tracking-widest text-xs">
                {content?.badge || 'DERİNLEMESİNE HİJYEN'}
              </span>
            </motion.div>

            <motion.h1 
              initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 0.2 }}
              className="text-5xl md:text-7xl font-black leading-[1.1] mb-6 text-[#0369A1]"
              style={{ fontFamily: 'var(--font-heading)' }}
            >
              {content?.title || business?.name || 'Tertemiz\nHalılara\nKavuşun.'}
            </motion.h1>

            <motion.p 
              initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 1, delay: 0.4 }}
              className="text-xl text-[#334155] font-medium leading-relaxed mb-10"
            >
              {content?.description || (business?.description as string) || 'Antibakteriyel şampuanlar ve tam otomatik makineler ile halılarınızı ilk günkü temizliğine kavuşturuyoruz. Üstelik kapıdan kapıya ücretsiz servis!'}
            </motion.p>
            
            <motion.div 
              initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 0.6 }}
              className="flex flex-wrap gap-4"
            >
              <button className="bg-[#0EA5E9] text-white px-8 py-4 rounded-2xl font-bold tracking-wide hover:bg-[#0284C7] transition-all shadow-xl shadow-[#0EA5E9]/20 flex items-center gap-2">
                <Truck className="w-5 h-5" /> Servis Çağır
              </button>
              <button className="bg-white text-[#0369A1] px-8 py-4 rounded-2xl font-bold tracking-wide border-2 border-[#BAE6FD] hover:bg-[#F0F9FF] transition-colors">
                Fiyat Listesi
              </button>
            </motion.div>
          </div>
          
          <div className="relative">
             <motion.div 
               initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 1.2, type: "spring" }}
               className="relative z-10"
             >
               <img 
                 src={(business?.images as any[])?.[0] || 'https://images.unsplash.com/photo-1558368718-40b8a4f00db1?q=80&w=2940&auto=format&fit=crop'} 
                 alt="Profesyonel Halı Yıkama" 
                 className="rounded-[3rem] shadow-2xl border-8 border-white w-full h-[500px] object-cover"
               />
               
               {/* Floating Info Card */}
               <div className="absolute -bottom-6 -left-6 bg-white p-6 rounded-3xl shadow-xl border border-[#F0F9FF] hidden md:block">
                 <div className="flex items-center gap-4">
                   <div className="w-12 h-12 bg-[#ECFCCB] rounded-full flex items-center justify-center text-[#65A30D]">
                     <Sparkles className="w-6 h-6" />
                   </div>
                   <div>
                     <div className="font-black text-[#0F172A] text-xl">%100</div>
                     <div className="text-sm font-bold text-[#64748B] uppercase">Leke Çıkarma Garantisi</div>
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
registerSection('hero', 'haliyikama_bespoke_hero', HaliyikamaBespokeHero as unknown as ComponentType<SectionProps<Record<string, unknown>>>)

// ── 2. Haliyikama Process & Services ──
export function HaliyikamaBespokeServices({ business, content }: SectionProps<any>) {
  const services = business?.services?.length ? business.services : [
    { title: 'Toz Alma & Çırpma', desc: 'Yıkama öncesi halıdaki tüm toz, kum ve maytlar son teknoloji çırpma makineleri ile arındırılır.', icon: <WindIcon /> },
    { title: 'Otomatik Yıkama', desc: 'Tam otomatik, 12 fırçalı makineler ve antibakteriyel bitkisel şampuanlar ile derinlemesine temizlik.', icon: <Droplets /> },
    { title: 'Sıkma & Kapalı Kurutma', desc: 'Boru tipi sıkma makineleriyle kırılma olmadan suyu alınır, kapalı fırın odalarında güneş görmeden kurutulur.', icon: <SunIcon /> },
  ];

  return (
    <section className="py-24 md:py-32 bg-white text-[#0F172A]">
      <div className="max-w-[var(--container-default)] mx-auto px-6 md:px-12">
        <div className="text-center max-w-2xl mx-auto mb-20">
          <h2 className="text-4xl md:text-5xl font-black mb-6 text-[#0369A1]" style={{ fontFamily: 'var(--font-heading)' }}>
            {content?.title || 'Adım Adım Hijyen'}
          </h2>
          <p className="text-[#64748B] text-lg font-medium">Halılarınızı sıradan yöntemlerle değil, baştan sona profesyonel tesislerimizde aşama aşama temizliyoruz.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 relative">
          {/* Connector Line hidden on mobile */}
          <div className="absolute top-24 left-1/6 right-1/6 h-0.5 bg-gradient-to-r from-transparent via-[#BAE6FD] to-transparent hidden md:block z-0" />

          {services.map((service: any, i: number) => (
            <motion.div 
              key={i}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: i * 0.15 }}
              className="bg-white rounded-[2rem] p-8 border-2 border-[#F0F9FF] hover:border-[#7DD3FC] hover:shadow-2xl hover:shadow-[#0EA5E9]/5 transition-all group relative z-10 text-center"
            >
              <div className="w-20 h-20 bg-[#F0F9FF] border-4 border-white shadow-lg rounded-full flex items-center justify-center text-[#0EA5E9] mb-8 mx-auto group-hover:scale-110 group-hover:bg-[#0EA5E9] group-hover:text-white transition-all duration-300">
                {service.icon || <Droplets />}
              </div>
              <h3 className="text-2xl font-bold mb-4 text-[#0F172A]">{i+1}. {service.title}</h3>
              <p className="text-[#64748B] font-medium leading-relaxed">{service.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
registerSection('services', 'haliyikama_bespoke_services', HaliyikamaBespokeServices as unknown as ComponentType<SectionProps<Record<string, unknown>>>)

// Helper Icons
function WindIcon(props: any) { return <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}><path d="M17.7 7.7a2.5 2.5 0 1 1 1.8 4.3H2"/><path d="M9.6 4.6A2 2 0 1 1 11 8H2"/><path d="M12.6 19.4A2 2 0 1 0 14 16H2"/></svg> }
function SunIcon(props: any) { return <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}><circle cx="12" cy="12" r="4"/><path d="M12 2v2"/><path d="M12 20v2"/><path d="m4.93 4.93 1.41 1.41"/><path d="m17.66 17.66 1.41 1.41"/><path d="M2 12h2"/><path d="M20 12h2"/><path d="m6.34 17.66-1.41 1.41"/><path d="m19.07 4.93-1.41 1.41"/></svg> }

// ── 3. Haliyikama Trust & Info ──
export function HaliyikamaBespokeAbout({ business, content }: SectionProps<any>) {
  return (
    <section className="bg-[#082F49] py-24 md:py-32 text-white overflow-hidden relative">
      <div className="absolute top-0 right-0 w-full h-full opacity-10 bg-[radial-gradient(circle_at_top_right,_var(--tw-gradient-stops))] from-white via-transparent to-transparent pointer-events-none" />
      
      <div className="max-w-[var(--container-default)] mx-auto px-6 md:px-12 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <div>
            <h2 className="text-4xl md:text-5xl font-black mb-8 leading-tight" style={{ fontFamily: 'var(--font-heading)' }}>
              {content?.title || 'Sağlığınız İçin Yüzeysel Değil, Derin Temizlik.'}
            </h2>
            <div className="space-y-6 text-[#BAE6FD] font-medium leading-relaxed text-lg mb-10">
              <p>
                {(business?.description as string) || 'Evde yapılan silme işlemleri kirleri halının dibine iter. Biz ise halılarınızı özel havuzlarda ıslatıyor, fırçalıyor, vakumluyor ve anti-alerjik özel formüllü şampuanlarla yıkıyoruz.'}
              </p>
            </div>
            
            <ul className="space-y-5">
              {['Ücretsiz Evden Alım ve Eve Teslim', 'Tüm Leke ve Kokulara Kesin Çözüm', 'Halı Türüne Göre (Yün, İpek, Makine) Özel İşlem'].map((item, i) => (
                <li key={i} className="flex items-center gap-4 bg-[#0C4A6E] p-4 rounded-2xl font-bold border border-[#0369A1]">
                  <ShieldCheck className="w-6 h-6 text-[#38BDF8]" /> {item}
                </li>
              ))}
            </ul>
          </div>
          
          <div className="relative">
             <img src="https://images.unsplash.com/photo-1527515637462-cff94eecc1ac?q=80&w=2874&auto=format&fit=crop" className="w-full aspect-[4/3] object-cover rounded-[3rem] border-4 border-[#0C4A6E] shadow-2xl" alt="Tesis Temizliği" />
          </div>
        </div>
      </div>
    </section>
  )
}
registerSection('about', 'haliyikama_bespoke_about', HaliyikamaBespokeAbout as unknown as ComponentType<SectionProps<Record<string, unknown>>>)

// ── 4. Haliyikama Contact & Booking ──
export function HaliyikamaBespokeContact({ business, content }: SectionProps<any>) {
  return (
    <section className="bg-white text-[#0F172A] py-24 md:py-32">
      <div className="max-w-[var(--container-default)] mx-auto px-6 md:px-12">
        <div className="bg-[#F0F9FF] rounded-[3rem] p-10 md:p-16 border-2 border-[#E0F2FE] shadow-xl">
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
            <div>
              <h2 className="text-4xl md:text-5xl font-black mb-6 text-[#0369A1]" style={{ fontFamily: 'var(--font-heading)' }}>Hemen Servis İsteyin</h2>
              <p className="text-[#64748B] font-medium mb-12 text-lg">Halı, koltuk, yatak veya stor perde yıkama taleplerinizi form üzerinden bize iletin, aynı gün kapınızdan alalım.</p>
              
              <div className="space-y-8 bg-white p-8 rounded-3xl shadow-sm border border-[#F0F9FF]">
                <div>
                  <h4 className="font-bold text-[#0EA5E9] uppercase tracking-wider text-sm mb-2">Hızlı Sipariş Hattı</h4>
                  <p className="text-3xl font-black text-[#0F172A]">{business?.phone || '+90 533 111 22 33'}</p>
                </div>
                <div>
                  <h4 className="font-bold text-[#0EA5E9] uppercase tracking-wider text-sm mb-2">Tesis Adresimiz</h4>
                  <p className="text-[#64748B] font-medium">{business?.address || 'Temizler Sanayi Sitesi, 5. Blok\nÜmraniye, İstanbul'}</p>
                </div>
              </div>
            </div>
            
            <form className="bg-white p-8 md:p-10 rounded-[2rem] shadow-lg border border-[#F0F9FF]">
              <div className="space-y-5">
                <div>
                  <input type="text" placeholder="Adınız Soyadınız" className="w-full bg-[#FAFAFA] border border-[#E2E8F0] rounded-xl px-4 py-4 focus:outline-none focus:border-[#0EA5E9] font-medium transition-colors" />
                </div>
                <div>
                  <input type="tel" placeholder="Telefon Numaranız" className="w-full bg-[#FAFAFA] border border-[#E2E8F0] rounded-xl px-4 py-4 focus:outline-none focus:border-[#0EA5E9] font-medium transition-colors" />
                </div>
                <div>
                  <select className="w-full bg-[#FAFAFA] border border-[#E2E8F0] rounded-xl px-4 py-4 focus:outline-none focus:border-[#0EA5E9] font-medium text-[#64748B] transition-colors appearance-none">
                    <option value="">Yıkanacak Ürün / Tür</option>
                    <option value="makine">Makine Halısı</option>
                    <option value="yun">Yün / El Dokuma Halı</option>
                    <option value="koltuk">Koltuk Takımı</option>
                    <option value="stor">Stor Perde</option>
                  </select>
                </div>
                <div>
                  <textarea rows={3} placeholder="Açık Adresiniz" className="w-full bg-[#FAFAFA] border border-[#E2E8F0] rounded-xl px-4 py-4 focus:outline-none focus:border-[#0EA5E9] font-medium transition-colors resize-none" />
                </div>
                <button className="w-full bg-[#0369A1] text-white font-bold tracking-widest uppercase py-4 rounded-xl hover:bg-[#075985] transition-colors mt-2 shadow-lg shadow-[#0369A1]/30">
                  Servis Çağır
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </section>
  )
}
registerSection('contact', 'haliyikama_bespoke_contact', HaliyikamaBespokeContact as unknown as ComponentType<SectionProps<Record<string, unknown>>>)
