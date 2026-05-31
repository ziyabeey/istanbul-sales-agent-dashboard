'use client'

import React, { ComponentType } from 'react'
import { motion } from 'framer-motion'
import { Sparkles, CheckCircle2, Home, Building2, Wind, ArrowRight } from 'lucide-react'
import { registerSection, type SectionProps } from '../../registry/section-registry'

// ── 1. Temizlik Pristine Hero ──
export function TemizlikBespokeHero({ business, content }: SectionProps<any>) {
  return (
    <section className="relative min-h-[90vh] bg-white text-[#0F172A] flex items-center pt-24 overflow-hidden">
      
      {/* Light subtle gradients mimicking a freshly cleaned, shining surface */}
      <div className="absolute top-0 right-0 w-full h-[500px] bg-gradient-to-b from-[#E0F2FE]/50 to-transparent pointer-events-none" />
      <div className="absolute -left-40 top-1/2 w-[600px] h-[600px] bg-[#CCFBF1] rounded-full filter blur-[150px] opacity-40 pointer-events-none" />

      <div className="relative z-10 w-full max-w-[var(--container-default)] mx-auto px-6 md:px-12">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          
          <div className="max-w-xl">
             <motion.div 
               initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }}
               className="inline-flex items-center gap-2 bg-[#F0FDF4] border border-[#DCFCE7] px-4 py-2 rounded-full mb-8 shadow-sm"
             >
               <Sparkles className="w-4 h-4 text-[#16A34A]" />
               <span className="text-[#15803D] font-bold uppercase tracking-widest text-xs">
                 {content?.badge || 'PROFESYONEL TEMİZLİK'}
               </span>
             </motion.div>

             <motion.h1 
               initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 0.2 }}
               className="text-5xl md:text-7xl font-bold leading-[1.1] mb-6 text-[#0F172A] tracking-tight"
               style={{ fontFamily: 'var(--font-heading)' }}
             >
               {content?.title?.split('\n').map((line: string, i: number) => <div key={i}>{line}</div>) || (
                 <>
                   Sıfır Leke, <br/><span className="text-[#0284C7]">Maksimum</span> <br/>Hijyen.
                 </>
               )}
             </motion.h1>

             <motion.p 
               initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 1, delay: 0.4 }}
               className="text-xl text-[#64748B] font-medium leading-relaxed mb-10"
             >
               {content?.description || (business?.description as string) || 'Ev, ofis ve endüstriyel alanlarınız için güvenilir, eğitimli personel ve doğa dostu temizlik malzemeleriyle hizmet veriyoruz.'}
             </motion.p>
             
             <motion.div 
               initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 0.6 }}
               className="flex flex-wrap gap-4"
             >
               <button className="bg-[#0284C7] text-white px-8 py-4 rounded-xl font-bold tracking-wide hover:bg-[#0369A1] transition-all shadow-xl shadow-[#0284C7]/20 flex items-center gap-2">
                 Fiyat Alın
               </button>
               <button className="bg-white text-[#0F172A] px-8 py-4 rounded-xl font-bold tracking-wide border-2 border-[#E2E8F0] hover:border-[#CBD5E1] transition-colors">
                 Hizmetlerimiz
               </button>
             </motion.div>
          </div>
          
          <div className="relative">
             <motion.div 
               initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 1.2, delay: 0.2 }}
               className="relative z-10"
             >
               <img 
                 src={(business?.images as any[])?.[0] || 'https://images.unsplash.com/photo-1581578731548-c64695cc6952?q=80&w=2940&auto=format&fit=crop'} 
                 alt="Cleaning Service" 
                 className="w-full h-[550px] object-cover rounded-3xl shadow-2xl border-4 border-white"
               />
               
               {/* Clean Star Sparkle Decorations */}
               <Sparkles className="absolute -top-6 -right-6 w-16 h-16 text-[#38BDF8] animate-pulse" />
               <Sparkles className="absolute bottom-10 -left-8 w-12 h-12 text-[#10B981] animate-pulse" style={{ animationDelay: '1s' }} />

             </motion.div>
          </div>
          
        </div>
      </div>
    </section>
  )
}
registerSection('hero', 'temizlik_bespoke_hero', TemizlikBespokeHero as unknown as ComponentType<SectionProps<Record<string, unknown>>>)

// ── 2. Temizlik Services ──
export function TemizlikBespokeServices({ business, content }: SectionProps<any>) {
  const services = business?.services?.length ? business.services : [
    { title: 'Ev / Daire Temizliği', desc: 'Günlük, haftalık veya boş ev temizliği. Detaylı mutfak ve banyo hijyeni.', icon: <Home /> },
    { title: 'Ofis / İş Yeri Temizliği', desc: 'Çalışma alanlarınızı mesai saatleri dışında dezenfekte ediyoruz.', icon: <Building2 /> },
    { title: 'İnşaat Sonrası', desc: 'İnatçı boya, harç ve toz kalıntılarını endüstriyel makinelerle temizliyoruz.', icon: <Wind /> },
  ];

  return (
    <section className="py-24 md:py-32 bg-[#F8FAFC] text-[#0F172A]">
      <div className="max-w-[var(--container-default)] mx-auto px-6 md:px-12">
        <div className="text-center mb-20 max-w-2xl mx-auto">
          <h2 className="text-4xl md:text-5xl font-bold mb-6 tracking-tight" style={{ fontFamily: 'var(--font-heading)' }}>
            {content?.title || 'Her Alan İçin Mükemmel Çözüm.'}
          </h2>
          <p className="text-[#64748B] text-lg font-medium">Bırakın zor işleri biz halledelim, siz temizliğin keyfini çıkarın.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {services.map((service: any, i: number) => (
            <motion.div 
              key={i}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.15 }}
              className="bg-white p-10 rounded-2xl shadow-sm border border-[#E2E8F0] hover:shadow-xl hover:border-[#BAE6FD] transition-all duration-300 group"
            >
              <div className="w-16 h-16 bg-[#F0F9FF] rounded-xl flex items-center justify-center text-[#0284C7] mb-8 group-hover:scale-110 transition-transform">
                {React.cloneElement(service.icon, { className: 'w-8 h-8' })}
              </div>
              <h3 className="text-xl font-bold mb-4">{service.title}</h3>
              <p className="text-[#64748B] font-medium leading-relaxed mb-6">{service.desc}</p>
              <div className="flex items-center gap-2 text-[#0284C7] font-bold text-sm uppercase tracking-wider cursor-pointer">
                İncele <ArrowRight className="w-4 h-4 group-hover:translate-x-2 transition-transform" />
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
registerSection('services', 'temizlik_bespoke_services', TemizlikBespokeServices as unknown as ComponentType<SectionProps<Record<string, unknown>>>)

// ── 3. Temizlik Reliability (About) ──
export function TemizlikBespokeAbout({ business, content }: SectionProps<any>) {
  return (
    <section className="bg-white py-24 md:py-32 text-[#0F172A]">
      <div className="max-w-[var(--container-default)] mx-auto px-6 md:px-12">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          
          <div className="relative">
            <div className="w-full aspect-square md:aspect-[4/3] rounded-3xl overflow-hidden shadow-2xl">
              <img 
                src="https://images.unsplash.com/photo-1527515637462-cff94eecc1ac?q=80&w=2874&auto=format&fit=crop" 
                alt="Reliable Cleaning" 
                className="w-full h-full object-cover" 
              />
            </div>
            
            <div className="absolute -bottom-8 -right-8 bg-[#0284C7] text-white p-8 rounded-2xl shadow-xl hidden md:block">
              <div className="text-4xl font-black mb-1">100%</div>
              <div className="text-sm font-bold uppercase tracking-widest text-[#BAE6FD]">Memnuniyet Garantisi</div>
            </div>
          </div>
          
          <div className="lg:pl-8">
            <h2 className="text-4xl md:text-5xl font-bold mb-8 leading-tight tracking-tight" style={{ fontFamily: 'var(--font-heading)' }}>
              {content?.title || 'Evinizi Kime Emanet Ettiğinizi Biliyoruz.'}
            </h2>
            <div className="space-y-6 text-[#64748B] font-medium leading-relaxed text-lg mb-10">
              <p>
                {(business?.description as string) || 'Tüm personelimiz adli sicil kaydı kontrol edilmiş, düzenli sağlık taramasından geçen ve temizlik kimyasalları üzerine profesyonel eğitim almış kişilerden oluşur.'}
              </p>
            </div>
            
            <div className="space-y-4">
              {['Güvenilir & Eğitimli Personel', 'Doğa Dostu, Alerjen İçermeyen Kimyasallar', 'Esnek Saatler & Düzenli Abonelik'].map((item, i) => (
                <div key={i} className="flex items-center gap-4">
                  <div className="w-8 h-8 rounded-full bg-[#DCFCE7] flex items-center justify-center shrink-0">
                    <CheckCircle2 className="w-5 h-5 text-[#16A34A]" />
                  </div>
                  <span className="font-bold text-[#0F172A]">{item}</span>
                </div>
              ))}
            </div>
          </div>
          
        </div>
      </div>
    </section>
  )
}
registerSection('about', 'temizlik_bespoke_about', TemizlikBespokeAbout as unknown as ComponentType<SectionProps<Record<string, unknown>>>)

// ── 4. Temizlik Booking/Contact ──
export function TemizlikBespokeContact({ business, content }: SectionProps<any>) {
  return (
    <section className="bg-[#0F172A] text-white py-24 md:py-32">
      <div className="max-w-[var(--container-default)] mx-auto px-6 md:px-12">
        
        <div className="bg-[#1E293B] rounded-3xl p-10 md:p-16 shadow-2xl border border-white/10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
            
            <div>
              <h2 className="text-4xl md:text-5xl font-bold mb-6 tracking-tight" style={{ fontFamily: 'var(--font-heading)' }}>Hemen Fiyat Alın</h2>
              <p className="text-[#94A3B8] font-medium mb-12 text-lg">Hizmet almak istediğiniz alanın metrekaresini ve temizlik türünü seçin, size en uygun ekibi yönlendirelim.</p>
              
              <div className="space-y-8 bg-[#0F172A] p-8 rounded-2xl border border-white/5">
                <div>
                  <h4 className="font-bold text-[#38BDF8] uppercase tracking-widest text-sm mb-2">Hızlı Çağrı Merkezi</h4>
                  <p className="text-3xl font-black text-white">{business?.phone || '0850 111 22 33'}</p>
                </div>
                <div>
                  <h4 className="font-bold text-[#38BDF8] uppercase tracking-widest text-sm mb-2">E-Posta</h4>
                  <p className="text-[#94A3B8] font-medium">iletisim@temizlikbespoke.com</p>
                </div>
              </div>
            </div>
            
            <form className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                 <div>
                   <label className="block text-xs font-bold uppercase tracking-widest text-[#94A3B8] mb-2">Ad Soyad</label>
                   <input type="text" className="w-full bg-[#0F172A] border border-white/10 rounded-xl p-4 text-white focus:outline-none focus:border-[#38BDF8]" />
                 </div>
                 <div>
                   <label className="block text-xs font-bold uppercase tracking-widest text-[#94A3B8] mb-2">Telefon</label>
                   <input type="tel" className="w-full bg-[#0F172A] border border-white/10 rounded-xl p-4 text-white focus:outline-none focus:border-[#38BDF8]" />
                 </div>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                 <div>
                   <label className="block text-xs font-bold uppercase tracking-widest text-[#94A3B8] mb-2">Alan (m²)</label>
                   <input type="number" className="w-full bg-[#0F172A] border border-white/10 rounded-xl p-4 text-white focus:outline-none focus:border-[#38BDF8]" />
                 </div>
                 <div>
                   <label className="block text-xs font-bold uppercase tracking-widest text-[#94A3B8] mb-2">Hizmet Türü</label>
                   <select className="w-full bg-[#0F172A] border border-white/10 rounded-xl p-4 text-white focus:outline-none focus:border-[#38BDF8] appearance-none">
                     <option value="">Seçiniz...</option>
                     <option value="ev">Ev Temizliği</option>
                     <option value="ofis">Ofis Temizliği</option>
                     <option value="insaat">İnşaat Sonrası</option>
                   </select>
                 </div>
              </div>
              <div>
                <label className="block text-xs font-bold uppercase tracking-widest text-[#94A3B8] mb-2">Adresiniz</label>
                <textarea rows={3} className="w-full bg-[#0F172A] border border-white/10 rounded-xl p-4 text-white focus:outline-none focus:border-[#38BDF8] resize-none" />
              </div>
              <button className="w-full bg-[#0284C7] text-white font-bold tracking-widest uppercase py-4 rounded-xl hover:bg-[#0369A1] transition-colors mt-4">
                Talep Oluştur
              </button>
            </form>

          </div>
        </div>
        
      </div>
    </section>
  )
}
registerSection('contact', 'temizlik_bespoke_contact', TemizlikBespokeContact as unknown as ComponentType<SectionProps<Record<string, unknown>>>)
