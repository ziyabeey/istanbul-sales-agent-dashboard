'use client'

import React, { ComponentType } from 'react'
import { motion } from 'framer-motion'
import { Calculator, BarChart3, FileText, ArrowRight, Check, Briefcase } from 'lucide-react'
import { registerSection, type SectionProps } from '../../registry/section-registry'

// ── 1. Muhasebe Corporate Hero ──
export function MuhasebeBespokeHero({ business, content }: SectionProps<any>) {
  return (
    <section className="relative min-h-[90vh] bg-[#F8FAFC] text-[#0F172A] flex items-center pt-24 overflow-hidden border-b border-[#E2E8F0]">
      {/* Structural background lines */}
      <div className="absolute inset-0 z-0 opacity-[0.03] pointer-events-none" style={{ backgroundImage: 'linear-gradient(#0F172A 1px, transparent 1px), linear-gradient(90deg, #0F172A 1px, transparent 1px)', backgroundSize: '40px 40px' }} />

      <div className="relative z-10 w-full max-w-[var(--container-default)] mx-auto px-6 md:px-12">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <div>
            <motion.div 
              initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }}
              className="inline-flex items-center gap-3 mb-8"
            >
              <div className="w-1.5 h-6 bg-[#0284C7] rounded-sm" />
              <span className="text-[#0284C7] font-bold uppercase tracking-[0.2em] text-sm">
                {content?.badge || 'GÜVENİLİR MALİ MÜŞAVİRLİK'}
              </span>
            </motion.div>

            <motion.h1 
              initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 0.2 }}
              className="text-5xl md:text-7xl font-bold leading-[1.1] mb-8 text-[#0F172A] tracking-tight"
              style={{ fontFamily: 'var(--font-heading)' }}
            >
              {content?.title || business?.name || 'Finansal\nGeleceğinizi\nŞekillendirin.'}
            </motion.h1>

            <motion.p 
              initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 1, delay: 0.4 }}
              className="text-xl text-[#475569] font-normal leading-relaxed mb-10 max-w-lg"
            >
              {content?.description || (business?.description as string) || 'Şirket kuruluşundan vergi planlamasına, şeffaf ve mevzuata %100 uyumlu profesyonel mali danışmanlık hizmetleri.'}
            </motion.p>
            
            <motion.div 
              initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 0.6 }}
              className="flex flex-wrap gap-4"
            >
              <button className="bg-[#0F172A] text-white px-8 py-4 rounded font-semibold tracking-wide hover:bg-[#1E293B] transition-all shadow-xl shadow-[#0F172A]/10">
                Danışmanlık Talep Et
              </button>
              <button className="bg-transparent text-[#0F172A] px-8 py-4 rounded font-semibold tracking-wide border-2 border-[#CBD5E1] hover:border-[#0F172A] hover:bg-[#F1F5F9] transition-colors flex items-center gap-2">
                Hizmet Kapsamı <ArrowRight className="w-4 h-4" />
              </button>
            </motion.div>
          </div>

          <div className="relative">
             <motion.div 
               initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 1, delay: 0.3 }}
               className="relative z-10"
             >
               <img 
                 src={(business?.images as any[])?.[0] || 'https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?q=80&w=2940&auto=format&fit=crop'} 
                 alt="Corporate Accounting" 
                 className="rounded-lg shadow-2xl w-full h-[500px] object-cover grayscale-[20%]"
               />
               
               {/* Data card overlay */}
               <div className="absolute -bottom-10 -left-10 bg-white p-6 rounded shadow-2xl border border-[#E2E8F0] hidden md:block">
                 <div className="flex items-center gap-4 mb-4">
                   <div className="w-10 h-10 bg-[#E0F2FE] rounded flex items-center justify-center text-[#0284C7]">
                     <BarChart3 className="w-5 h-5" />
                   </div>
                   <div>
                     <div className="text-xs text-[#64748B] font-bold uppercase tracking-wider">Vergi Avantajı</div>
                     <div className="font-bold text-[#0F172A] text-xl">Maksimum Verim</div>
                   </div>
                 </div>
                 <div className="w-full h-2 bg-[#F1F5F9] rounded-full overflow-hidden">
                   <div className="w-3/4 h-full bg-[#0284C7]" />
                 </div>
               </div>
             </motion.div>
          </div>
        </div>
      </div>
    </section>
  )
}
registerSection('hero', 'muhasebe_bespoke_hero', MuhasebeBespokeHero as unknown as ComponentType<SectionProps<Record<string, unknown>>>)

// ── 2. Muhasebe Services (Structured Data) ──
export function MuhasebeBespokeServices({ business, content }: SectionProps<any>) {
  const services = business?.services?.length ? business.services : [
    { title: 'Şirket Kuruluşu', desc: 'Anonim ve Limited şirket kurulumları, ana sözleşme hazırlığı ve tescil işlemleri.', icon: <Briefcase /> },
    { title: 'Vergi Danışmanlığı', desc: 'Yasal mevzuata uygun vergi planlaması, beyanname hazırlığı ve istisna yönetimleri.', icon: <Calculator /> },
    { title: 'Bordro & SGK', desc: 'Personel özlük dosyaları, aylık prim bildirgeleri ve iş hukuku danışmanlığı.', icon: <FileText /> },
  ];

  return (
    <section className="py-24 md:py-32 bg-white text-[#0F172A]">
      <div className="max-w-[var(--container-default)] mx-auto px-6 md:px-12">
        <div className="flex flex-col md:flex-row justify-between items-end mb-20">
          <div className="max-w-2xl">
            <h2 className="text-3xl md:text-5xl font-bold mb-6" style={{ fontFamily: 'var(--font-heading)' }}>
              {content?.title || 'Finansal Çözüm Ortaklığımız'}
            </h2>
            <p className="text-[#475569] text-lg font-normal leading-relaxed">Şirketinizin büyüklüğü ne olursa olsun, yasal yükümlülüklerinizi eksiksiz yerine getiriyor ve büyüme hedeflerinize stratejik destek sağlıyoruz.</p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {services.map((service: any, i: number) => (
            <motion.div 
              key={i}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: i * 0.1 }}
              className="group border border-[#E2E8F0] p-10 hover:border-[#0284C7] hover:shadow-2xl transition-all duration-300 bg-white"
            >
              <div className="w-14 h-14 bg-[#F8FAFC] border border-[#E2E8F0] flex items-center justify-center text-[#0F172A] mb-8 group-hover:bg-[#0284C7] group-hover:text-white group-hover:border-[#0284C7] transition-colors duration-300">
                {service.icon || <Calculator />}
              </div>
              <h3 className="text-xl font-bold mb-4 text-[#0F172A]">{service.title}</h3>
              <p className="text-[#64748B] font-normal leading-relaxed mb-8">{service.desc}</p>
              <div className="w-full h-[1px] bg-[#E2E8F0] mb-6" />
              <div className="text-[#0284C7] font-semibold text-sm uppercase tracking-wider flex items-center gap-2 cursor-pointer group-hover:gap-4 transition-all">
                Detayları Gör <ArrowRight className="w-4 h-4" />
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
registerSection('services', 'muhasebe_bespoke_services', MuhasebeBespokeServices as unknown as ComponentType<SectionProps<Record<string, unknown>>>)

// ── 3. Muhasebe Trust & Precision (About) ──
export function MuhasebeBespokeAbout({ business, content }: SectionProps<any>) {
  return (
    <section className="bg-[#0F172A] py-24 md:py-32 text-white">
      <div className="max-w-[var(--container-default)] mx-auto px-6 md:px-12">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
          <div>
            <h2 className="text-3xl md:text-5xl font-bold mb-8 leading-tight" style={{ fontFamily: 'var(--font-heading)' }}>
              {content?.title || 'Sıfır Hata, Mutlak Güven.'}
            </h2>
            <div className="space-y-6 text-[#94A3B8] font-normal leading-relaxed text-lg mb-10">
              <p>
                {(business?.description as string) || 'Mevzuat değişikliklerini anlık takip eden uzman ekibimizle, firmanızı cezai risklerden tamamen koruyoruz. Dijital arşivleme ve e-dönüşüm süreçlerinizde tam entegrasyon sağlıyoruz.'}
              </p>
            </div>
            
            <ul className="space-y-5">
              {['Mevzuata %100 Uyum Garantisi', 'Dijital Dönüşüm & E-Fatura Desteği', 'Veri Gizliliği ve Şifreleme Kuralları', 'Periyodik Finansal Raporlama'].map((item, i) => (
                <li key={i} className="flex items-center gap-4 bg-[#1E293B] p-4 rounded font-medium border border-[#334155]">
                  <div className="w-6 h-6 rounded-full bg-[#0284C7] flex items-center justify-center shrink-0">
                    <Check className="w-4 h-4 text-white" />
                  </div>
                  {item}
                </li>
              ))}
            </ul>
          </div>
          
          <div className="grid grid-cols-2 gap-6 h-fit">
            <div className="bg-white text-[#0F172A] p-8 border-t-4 border-[#0284C7] shadow-xl">
              <div className="text-4xl font-black mb-2">25+</div>
              <div className="text-sm font-bold text-[#64748B] uppercase tracking-wider">Yıllık Tecrübe</div>
            </div>
            <div className="bg-[#1E293B] p-8 border border-[#334155] translate-y-12">
              <div className="text-4xl font-black text-white mb-2">500+</div>
              <div className="text-sm font-bold text-[#94A3B8] uppercase tracking-wider">Kurumsal Müşteri</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
registerSection('about', 'muhasebe_bespoke_about', MuhasebeBespokeAbout as unknown as ComponentType<SectionProps<Record<string, unknown>>>)

// ── 4. Muhasebe Contact ──
export function MuhasebeBespokeContact({ business, content }: SectionProps<any>) {
  return (
    <section className="bg-[#F8FAFC] text-[#0F172A] py-24 md:py-32 border-t border-[#E2E8F0]">
      <div className="max-w-[var(--container-default)] mx-auto px-6 md:px-12">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4" style={{ fontFamily: 'var(--font-heading)' }}>Müşavirlik Teklifi Alın</h2>
          <p className="text-[#64748B] text-lg max-w-2xl mx-auto">Firmanızın ihtiyaçlarına özel mali müşavirlik çözümleri için aşağıdaki formu doldurun, uzmanlarımız sizinle iletişime geçsin.</p>
        </div>

        <div className="bg-white shadow-xl border border-[#E2E8F0] p-8 md:p-16 max-w-5xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
            
            <div className="lg:col-span-1 space-y-10">
              <div>
                <h4 className="font-bold text-[#0F172A] mb-2 uppercase tracking-wider text-sm">Merkez Ofis</h4>
                <p className="text-[#475569] font-normal leading-relaxed">{business?.address || 'Büyükdere Cad. Plaza 33\nŞişli, İstanbul'}</p>
              </div>
              <div>
                <h4 className="font-bold text-[#0F172A] mb-2 uppercase tracking-wider text-sm">İletişim</h4>
                <p className="text-[#0284C7] font-bold text-xl mb-1">{business?.phone || '+90 212 345 67 89'}</p>
                <p className="text-[#475569]">bilgi@muhasebebespoke.com</p>
              </div>
              <div>
                <h4 className="font-bold text-[#0F172A] mb-2 uppercase tracking-wider text-sm">Çalışma Saatleri</h4>
                <p className="text-[#475569] font-normal">Pazartesi - Cuma<br/>09:00 - 18:00</p>
              </div>
            </div>
            
            <div className="lg:col-span-2">
              <form className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-bold text-[#0F172A] mb-2">Firma Ünvanı</label>
                    <input type="text" className="w-full bg-[#F8FAFC] border border-[#CBD5E1] rounded px-4 py-3 focus:outline-none focus:border-[#0284C7] transition-colors" />
                  </div>
                  <div>
                    <label className="block text-sm font-bold text-[#0F172A] mb-2">Yetkili Kişi</label>
                    <input type="text" className="w-full bg-[#F8FAFC] border border-[#CBD5E1] rounded px-4 py-3 focus:outline-none focus:border-[#0284C7] transition-colors" />
                  </div>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-bold text-[#0F172A] mb-2">Telefon</label>
                    <input type="tel" className="w-full bg-[#F8FAFC] border border-[#CBD5E1] rounded px-4 py-3 focus:outline-none focus:border-[#0284C7] transition-colors" />
                  </div>
                  <div>
                    <label className="block text-sm font-bold text-[#0F172A] mb-2">Hizmet Türü</label>
                    <select className="w-full bg-[#F8FAFC] border border-[#CBD5E1] rounded px-4 py-3 focus:outline-none focus:border-[#0284C7] transition-colors appearance-none">
                      <option value="">Seçiniz</option>
                      <option value="kurulus">Şirket Kuruluşu</option>
                      <option value="musavirlik">Aylık Mali Müşavirlik</option>
                      <option value="danismanlik">Vergi Danışmanlığı</option>
                    </select>
                  </div>
                </div>
                <button className="w-full bg-[#0F172A] text-white font-bold tracking-widest py-4 rounded hover:bg-[#0284C7] transition-colors mt-4">
                  Talep Gönder
                </button>
              </form>
            </div>
            
          </div>
        </div>
      </div>
    </section>
  )
}
registerSection('contact', 'muhasebe_bespoke_contact', MuhasebeBespokeContact as unknown as ComponentType<SectionProps<Record<string, unknown>>>)
