'use client'

import React, { ComponentType } from 'react'
import { motion } from 'framer-motion'
import { Globe2, PackageSearch, Truck, ShieldCheck, ArrowRight, Clock } from 'lucide-react'
import { registerSection, type SectionProps } from '../../registry/section-registry'

// ── 1. Kargo Logistics Hero ──
export function KargoBespokeHero({ business, content }: SectionProps<any>) {
  return (
    <section className="relative min-h-[90vh] bg-[#0B132B] text-white flex items-center pt-24 overflow-hidden">
      {/* Global Node Map Background Effect */}
      <div className="absolute inset-0 z-0 opacity-20 pointer-events-none" 
           style={{ backgroundImage: 'radial-gradient(circle at 2px 2px, #FFD700 1px, transparent 0)', backgroundSize: '40px 40px' }} />
      
      <div className="absolute right-0 top-1/4 w-[800px] h-[800px] bg-[#1C2541] rounded-full blur-[120px] opacity-50" />

      <div className="relative z-10 w-full max-w-[var(--container-default)] mx-auto px-6 md:px-12">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          
          <div className="max-w-2xl">
            <motion.div 
              initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.8 }}
              className="inline-flex items-center gap-2 bg-[#FFD700]/10 border border-[#FFD700]/30 px-4 py-2 rounded-sm mb-8"
            >
              <div className="w-2 h-2 rounded-full bg-[#FFD700] animate-pulse" />
              <span className="text-[#FFD700] font-bold uppercase tracking-widest text-xs">
                {content?.badge || 'GÜVENLİ & HIZLI LOJİSTİK'}
              </span>
            </motion.div>

            <motion.h1 
              initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 0.2 }}
              className="text-5xl md:text-7xl font-black leading-[1.1] mb-6 text-white uppercase tracking-tighter"
              style={{ fontFamily: 'var(--font-heading)' }}
            >
              {content?.title || business?.name || 'Dünyayı\nKapınıza\nGetiriyoruz.'}
            </motion.h1>

            <motion.p 
              initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 1, delay: 0.4 }}
              className="text-lg md:text-xl text-[#8E9BBA] font-medium leading-relaxed mb-10"
            >
              {content?.description || (business?.description as string) || 'Şehir içi kuryeden uluslararası lojistiğe kadar tüm gönderilerinizi anlık takip imkanı ve sigorta güvencesiyle taşıyoruz.'}
            </motion.p>
            
            {/* Tracking Widget */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 0.6 }}
              className="bg-white/5 backdrop-blur-md border border-white/10 p-2 rounded-lg flex flex-col md:flex-row gap-2 max-w-lg mb-8"
            >
              <div className="relative flex-1">
                <PackageSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-[#8E9BBA] w-5 h-5" />
                <input 
                  type="text" 
                  placeholder="Takip Numarası (Örn: TR849...)" 
                  className="w-full bg-transparent border-none text-white font-mono placeholder:text-[#8E9BBA] focus:outline-none focus:ring-0 pl-12 py-4"
                />
              </div>
              <button className="bg-[#FFD700] text-[#0B132B] px-8 py-4 rounded-md font-black tracking-widest uppercase hover:bg-white transition-colors">
                Sorgula
              </button>
            </motion.div>
          </div>
          
          <div className="relative hidden lg:block">
             <motion.div 
               initial={{ opacity: 0, x: 50 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 1.2, delay: 0.4 }}
               className="relative z-10"
             >
               <img 
                 src={(business?.images as any[])?.[0] || 'https://images.unsplash.com/photo-1580674285054-bed31e145f59?q=80&w=2940&auto=format&fit=crop'} 
                 alt="Logistics Network" 
                 className="rounded-2xl shadow-2xl border border-white/10 w-full h-[600px] object-cover filter contrast-125"
               />
               
               {/* Floating Stats */}
               <div className="absolute -bottom-8 -left-8 bg-[#FFD700] p-8 rounded-xl shadow-2xl text-[#0B132B] transform -rotate-3">
                 <div className="text-5xl font-black mb-1">24<span className="text-2xl">sa</span></div>
                 <div className="font-bold uppercase tracking-widest text-xs">Maksimum Teslimat Süresi</div>
               </div>
             </motion.div>
          </div>
          
        </div>
      </div>
    </section>
  )
}
registerSection('hero', 'kargo_bespoke_hero', KargoBespokeHero as unknown as ComponentType<SectionProps<Record<string, unknown>>>)

// ── 2. Kargo Services (Industrial Cards) ──
export function KargoBespokeServices({ business, content }: SectionProps<any>) {
  const services = business?.services?.length ? business.services : [
    { title: 'Şehir İçi VIP Kurye', desc: 'Evrağınız veya paketiniz İstanbul içi 2 saat içerisinde alıcısına teslim edilir.', icon: <Clock /> },
    { title: 'Şehirler Arası Kargo', desc: 'Geniş araç filomuzla Türkiye\'nin 81 iline ertesi gün teslimat garantisi.', icon: <Truck /> },
    { title: 'Uluslararası Lojistik', desc: 'Hava ve deniz yolu entegrasyonuyla 200\'den fazla ülkeye gümrük çözümleri.', icon: <Globe2 /> },
  ];

  return (
    <section className="py-24 md:py-32 bg-[#F8F9FA] text-[#0B132B]">
      <div className="max-w-[var(--container-default)] mx-auto px-6 md:px-12">
        <div className="mb-20">
          <h2 className="text-4xl md:text-5xl font-black mb-4 uppercase tracking-tight" style={{ fontFamily: 'var(--font-heading)' }}>
            {content?.title || 'Operasyonel Çözümler'}
          </h2>
          <div className="w-20 h-2 bg-[#FFD700] mb-6" />
          <p className="text-[#6C757D] font-medium text-lg max-w-2xl">İster tek bir zarf, ister tonlarca yük... İhtiyacınıza uygun lojistik modelini seçin.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {services.map((service: any, i: number) => (
            <motion.div 
              key={i}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: i * 0.15 }}
              className="bg-white p-10 border-t-4 border-[#0B132B] hover:border-[#FFD700] hover:shadow-2xl hover:-translate-y-2 transition-all duration-300 group"
            >
              <div className="w-16 h-16 bg-[#F8F9FA] flex items-center justify-center text-[#0B132B] mb-8 group-hover:bg-[#FFD700] transition-colors rounded-sm">
                {React.cloneElement(service.icon, { className: 'w-8 h-8' })}
              </div>
              <h3 className="text-2xl font-black uppercase mb-4 tracking-wide">{service.title}</h3>
              <p className="text-[#6C757D] font-medium leading-relaxed mb-8">{service.desc}</p>
              <div className="font-bold text-sm uppercase tracking-widest flex items-center gap-2 group-hover:text-[#0B132B] transition-colors cursor-pointer text-[#8E9BBA]">
                Detaylar <ArrowRight className="w-4 h-4" />
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
registerSection('services', 'kargo_bespoke_services', KargoBespokeServices as unknown as ComponentType<SectionProps<Record<string, unknown>>>)

// ── 3. Kargo Global Reach (About) ──
export function KargoBespokeAbout({ business, content }: SectionProps<any>) {
  return (
    <section className="bg-white py-24 md:py-32 text-[#0B132B] overflow-hidden">
      <div className="max-w-[var(--container-default)] mx-auto px-6 md:px-12">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          
          <div className="relative">
            <div className="absolute inset-0 bg-[#FFD700] translate-x-4 translate-y-4 rounded-xl -z-10" />
            <img 
              src="https://images.unsplash.com/photo-1578575437130-527eed3abbec?q=80&w=2940&auto=format&fit=crop" 
              className="w-full aspect-[4/3] object-cover rounded-xl shadow-xl grayscale" 
              alt="Cargo Fleet" 
            />
            {/* Overlay Barcode Effect */}
            <div className="absolute top-6 left-6 bg-white p-4 hidden md:block shadow-lg">
               <div className="flex gap-1 h-12 items-end">
                 {[...Array(20)].map((_, i) => (
                   <div key={i} className="bg-black w-1" style={{ height: `${Math.max(20, Math.random() * 100)}%` }} />
                 ))}
               </div>
               <div className="text-[10px] font-mono font-bold mt-2 tracking-widest">TR-849201-GLOBAL</div>
            </div>
          </div>
          
          <div>
            <h2 className="text-4xl md:text-5xl font-black mb-8 uppercase tracking-tighter" style={{ fontFamily: 'var(--font-heading)' }}>
              {content?.title || 'Sınırları Kaldıran Lojistik Ağı.'}
            </h2>
            <div className="space-y-6 text-[#6C757D] font-medium leading-relaxed text-lg mb-10">
              <p>
                {(business?.description as string) || '10 yılı aşkın tecrübemiz ve yüzlerce araçlık filomuzla, gönderilerinizin güvenliği bizim sorumluluğumuzda. Tüm süreçlerimiz uçtan uca dijitalleşmiş olup, barkod sistemiyle anlık izlenebilmektedir.'}
              </p>
            </div>
            
            <ul className="space-y-5">
              {['%100 Gönderi Sigortası', '7/24 Operasyon Merkezi ve Destek', 'Soğuk Zincir ve Özel Yük Taşıma'].map((item, i) => (
                <li key={i} className="flex items-center gap-4 bg-[#F8F9FA] p-4 font-bold border-l-4 border-[#0B132B]">
                  <ShieldCheck className="w-6 h-6 text-[#FFD700]" /> {item}
                </li>
              ))}
            </ul>
          </div>
          
        </div>
      </div>
    </section>
  )
}
registerSection('about', 'kargo_bespoke_about', KargoBespokeAbout as unknown as ComponentType<SectionProps<Record<string, unknown>>>)

// ── 4. Kargo Contact & Quotation ──
export function KargoBespokeContact({ business, content }: SectionProps<any>) {
  return (
    <section className="bg-[#0B132B] text-white py-24 md:py-32 relative">
      <div className="absolute top-0 w-full h-2 bg-[#FFD700]" />
      <div className="max-w-[var(--container-default)] mx-auto px-6 md:px-12">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
          
          <div>
            <h2 className="text-4xl md:text-6xl font-black mb-6 uppercase tracking-tighter" style={{ fontFamily: 'var(--font-heading)' }}>Kurye Çağır</h2>
            <p className="text-[#8E9BBA] font-medium mb-12 text-lg">Gönderi bilgilerinizi girin, en yakın kuryemiz paketinizi kapınızdan alsın.</p>
            
            <div className="space-y-10">
              <div className="flex gap-6 items-start">
                <div className="w-12 h-12 rounded-full bg-white/10 flex items-center justify-center shrink-0">
                  <span className="text-[#FFD700] font-black">1</span>
                </div>
                <div>
                  <h4 className="font-bold uppercase tracking-widest text-sm mb-2 text-white">Müşteri Hizmetleri</h4>
                  <p className="text-2xl font-black text-[#FFD700]">{business?.phone || '444 1 222'}</p>
                </div>
              </div>
              <div className="flex gap-6 items-start">
                <div className="w-12 h-12 rounded-full bg-white/10 flex items-center justify-center shrink-0">
                  <span className="text-[#FFD700] font-black">2</span>
                </div>
                <div>
                  <h4 className="font-bold uppercase tracking-widest text-sm mb-2 text-white">Merkez Operasyon</h4>
                  <p className="text-[#8E9BBA] font-medium">{business?.address || 'Lojistik Vadisi, Depo 4\nTuzla, İstanbul'}</p>
                </div>
              </div>
            </div>
          </div>
          
          <form className="bg-white p-8 md:p-12 rounded-lg shadow-2xl">
            <h3 className="text-2xl font-black text-[#0B132B] uppercase mb-8">Gönderi Detayları</h3>
            <div className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-xs font-bold uppercase tracking-widest text-[#6C757D] mb-2">Gönderen İl/İlçe</label>
                  <input type="text" className="w-full bg-[#F8F9FA] border border-[#E9ECEF] p-4 text-[#0B132B] font-medium focus:outline-none focus:border-[#0B132B]" />
                </div>
                <div>
                  <label className="block text-xs font-bold uppercase tracking-widest text-[#6C757D] mb-2">Alıcı İl/İlçe</label>
                  <input type="text" className="w-full bg-[#F8F9FA] border border-[#E9ECEF] p-4 text-[#0B132B] font-medium focus:outline-none focus:border-[#0B132B]" />
                </div>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-xs font-bold uppercase tracking-widest text-[#6C757D] mb-2">Ağırlık (KG)</label>
                  <input type="number" className="w-full bg-[#F8F9FA] border border-[#E9ECEF] p-4 text-[#0B132B] font-medium focus:outline-none focus:border-[#0B132B]" />
                </div>
                <div>
                  <label className="block text-xs font-bold uppercase tracking-widest text-[#6C757D] mb-2">Desi</label>
                  <input type="number" className="w-full bg-[#F8F9FA] border border-[#E9ECEF] p-4 text-[#0B132B] font-medium focus:outline-none focus:border-[#0B132B]" />
                </div>
              </div>
              <div>
                <label className="block text-xs font-bold uppercase tracking-widest text-[#6C757D] mb-2">İletişim Numaranız</label>
                <input type="tel" className="w-full bg-[#F8F9FA] border border-[#E9ECEF] p-4 text-[#0B132B] font-medium focus:outline-none focus:border-[#0B132B]" />
              </div>
              <button className="w-full bg-[#FFD700] text-[#0B132B] font-black tracking-widest uppercase py-5 hover:bg-[#E6C200] transition-colors mt-4">
                Fiyat Hesapla & Kurye Çağır
              </button>
            </div>
          </form>
          
        </div>
      </div>
    </section>
  )
}
registerSection('contact', 'kargo_bespoke_contact', KargoBespokeContact as unknown as ComponentType<SectionProps<Record<string, unknown>>>)
