'use client'

import React, { ComponentType } from 'react'
import { motion } from 'framer-motion'
import { HeartPulse, Stethoscope, Activity, ArrowRight, PhoneCall, Syringe } from 'lucide-react'
import { registerSection, type SectionProps } from '../../registry/section-registry'

// ── 1. Vet Caring Hero ──
export function VetBespokeHero({ business, content }: SectionProps<any>) {
  return (
    <section className="relative min-h-[90vh] bg-[#F0FDF4] text-[#166534] flex items-center pt-24 pb-12 overflow-hidden">
      <div className="absolute top-0 right-0 w-[55%] h-full hidden lg:block rounded-bl-[8rem] overflow-hidden">
        <img 
          src={(business?.images as any[])?.[0] || 'https://images.unsplash.com/photo-1628009368231-7bb7cbcb8127?q=80&w=2940&auto=format&fit=crop'} 
          alt="Veterinary Care" 
          className="w-full h-full object-cover object-center opacity-90" 
        />
        <div className="absolute inset-0 bg-[#22C55E]/10 mix-blend-overlay" />
      </div>

      <div className="relative z-10 w-full max-w-[var(--container-default)] mx-auto px-6 md:px-12 mt-10">
        <div className="max-w-xl bg-white/60 lg:bg-transparent backdrop-blur-md lg:backdrop-blur-none p-8 lg:p-0 rounded-3xl lg:rounded-none">
          <motion.div 
            initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }}
            className="inline-flex items-center gap-2 bg-white border border-[#22C55E]/30 px-4 py-2 rounded-full mb-8 shadow-sm"
          >
            <HeartPulse className="w-5 h-5 text-[#F97316]" />
            <span className="text-[#15803D] font-bold uppercase tracking-wider text-sm">
              {content?.badge || 'DOSTLARINIZ İÇİN BURADAYIZ'}
            </span>
          </motion.div>

          <motion.h1 
            initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 0.2 }}
            className="text-5xl md:text-7xl font-bold leading-[1.1] mb-6 text-[#14532D]"
            style={{ fontFamily: 'var(--font-heading)' }}
          >
            {content?.title || business?.name || 'Onların Sağlığı,\nBizim Mutluluğumuz.'}
          </motion.h1>

          <motion.p 
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 1, delay: 0.4 }}
            className="text-lg text-[#166534] font-medium leading-relaxed mb-10 max-w-lg"
          >
            {content?.description || (business?.description as string) || 'Tam donanımlı kliniğimiz ve alanında uzman hekimlerimizle, can dostlarınızın sağlıklı ve uzun bir ömür sürmesi için şefkatle çalışıyoruz.'}
          </motion.p>
          
          <motion.div 
            initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 0.6 }}
            className="flex flex-wrap gap-4"
          >
            <button className="bg-[#F97316] text-white px-8 py-4 rounded-xl font-bold tracking-wide hover:bg-[#EA580C] transition-colors shadow-lg shadow-[#F97316]/30 flex items-center gap-2">
              <PhoneCall className="w-5 h-5" /> Acil Destek
            </button>
            <button className="bg-white text-[#166534] px-8 py-4 rounded-xl font-bold tracking-wide border-2 border-[#BBF7D0] hover:border-[#4ADE80] transition-colors">
              Hizmetlerimiz
            </button>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
registerSection('hero', 'vet_bespoke_hero', VetBespokeHero as unknown as ComponentType<SectionProps<Record<string, unknown>>>)

// ── 2. Vet Services ──
export function VetBespokeServices({ business, content }: SectionProps<any>) {
  const services = business?.services?.length ? business.services : [
    { title: 'Dahiliye & Check-up', desc: 'Erken teşhis hayat kurtarır. Tam kan sayımı ve ultrasonografi ile detaylı muayene.', icon: <Stethoscope /> },
    { title: 'Aşı & Parazit', desc: 'Minik dostunuzun bağışıklığını güçlü tutmak için düzenli aşı ve koruyucu hekimlik.', icon: <Syringe /> },
    { title: 'Cerrahi Operasyonlar', desc: 'Modern ameliyathanemizde, gaz anestezisi ile güvenli kısırlaştırma ve yumuşak doku cerrahisi.', icon: <Activity /> },
  ];

  return (
    <section className="py-24 md:py-32 bg-white text-[#14532D]">
      <div className="max-w-[var(--container-default)] mx-auto px-6 md:px-12">
        <div className="text-center max-w-2xl mx-auto mb-20">
          <h2 className="text-4xl md:text-5xl font-bold mb-6" style={{ fontFamily: 'var(--font-heading)' }}>
            {content?.title || 'Kliniğimizde Neler Yapıyoruz?'}
          </h2>
          <div className="w-24 h-2 bg-[#F97316] mx-auto rounded-full mb-6" />
          <p className="text-[#166534] text-lg font-medium">İleri tanı yöntemleri ve sevgi dolu yaklaşımımızla 7/24 hizmetinizdeyiz.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {services.map((service: any, i: number) => (
            <motion.div 
              key={i}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: i * 0.1 }}
              className="bg-[#F0FDF4] rounded-3xl p-10 border-2 border-[#DCFCE7] hover:border-[#4ADE80] transition-colors group"
            >
              <div className="w-16 h-16 bg-white rounded-2xl flex items-center justify-center text-[#F97316] mb-8 shadow-sm group-hover:scale-110 transition-transform">
                {service.icon || <HeartPulse />}
              </div>
              <h3 className="text-2xl font-bold mb-4 text-[#14532D]">{service.title}</h3>
              <p className="text-[#166534] font-medium leading-relaxed mb-8">{service.desc}</p>
              <div className="flex items-center gap-2 text-[#F97316] font-bold text-sm uppercase tracking-wider group-hover:gap-4 transition-all cursor-pointer">
                Detaylı Bilgi <ArrowRight className="w-4 h-4" />
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
registerSection('services', 'vet_bespoke_services', VetBespokeServices as unknown as ComponentType<SectionProps<Record<string, unknown>>>)

// ── 3. Vet Environment/Trust ──
export function VetBespokeAbout({ business, content }: SectionProps<any>) {
  return (
    <section className="bg-[#14532D] py-24 md:py-32 text-white overflow-hidden relative rounded-[3rem] mx-4 md:mx-8 my-10">
      {/* Decorative paw prints could go here via SVG pattern */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-[#166534] rounded-full blur-3xl opacity-50 -translate-y-1/2" />
      
      <div className="max-w-[var(--container-default)] mx-auto px-6 md:px-12 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <div className="order-2 lg:order-1 relative">
            <img 
              src="https://images.unsplash.com/photo-1596272875886-f6313ed8c99f?q=80&w=2940&auto=format&fit=crop" 
              alt="Veterinary Care" 
              className="rounded-3xl shadow-2xl border-4 border-[#166534] w-full"
            />
            <div className="absolute -bottom-8 -right-8 bg-[#F97316] text-white p-8 rounded-2xl shadow-xl hidden md:block">
              <div className="text-3xl font-bold mb-1">7/24</div>
              <div className="font-semibold text-orange-100">Acil Nöbetçi</div>
            </div>
          </div>
          
          <div className="order-1 lg:order-2">
            <h2 className="text-4xl md:text-5xl font-bold mb-8 leading-tight" style={{ fontFamily: 'var(--font-heading)' }}>
              {content?.title || 'Ailemizin Bir Parçası.'}
            </h2>
            <div className="space-y-6 text-[#DCFCE7] font-medium leading-relaxed text-lg">
              <p>
                {(business?.description as string) || 'Kliniğimizden içeri giren her pati, bizim için bir hastadan çok, iyileştirmek için can attığımız bir dosttur. Stressiz muayene odalarımızla kedi ve köpekleri ayrı alanlarda ağırlıyoruz.'}
              </p>
            </div>
            
            <div className="mt-10 grid grid-cols-2 gap-6 border-t border-[#166534] pt-8">
              <div>
                 <div className="text-3xl font-black text-[#4ADE80] mb-2">CR</div>
                 <div className="text-sm font-bold text-white uppercase tracking-wider">Dijital Rönesans</div>
              </div>
              <div>
                 <div className="text-3xl font-black text-[#4ADE80] mb-2">Laboratuvar</div>
                 <div className="text-sm font-bold text-white uppercase tracking-wider">Anında Sonuç</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
registerSection('about', 'vet_bespoke_about', VetBespokeAbout as unknown as ComponentType<SectionProps<Record<string, unknown>>>)

// ── 4. Vet Contact ──
export function VetBespokeContact({ business, content }: SectionProps<any>) {
  return (
    <section className="bg-white text-[#14532D] py-24 md:py-32">
      <div className="max-w-[var(--container-default)] mx-auto px-6 md:px-12">
        <div className="bg-[#F0FDF4] rounded-3xl p-10 md:p-16 border border-[#DCFCE7] shadow-xl">
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
            <div>
              <h2 className="text-4xl md:text-5xl font-bold mb-6 text-[#14532D]" style={{ fontFamily: 'var(--font-heading)' }}>Bize Ulaşın</h2>
              <p className="text-[#166534] font-medium mb-12">Aşı takvimi, muayene randevusu veya acil durumlar için bizi her zaman arayabilirsiniz.</p>
              
              <div className="space-y-8">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center text-[#F97316] shadow-sm shrink-0">
                    <PhoneCall className="w-5 h-5" />
                  </div>
                  <div>
                    <div className="font-bold text-[#14532D] mb-1">Telefon / WhatsApp</div>
                    <div className="text-xl font-bold text-[#F97316]">{business?.phone || '+90 212 999 99 99'}</div>
                  </div>
                </div>
                
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center text-[#F97316] shadow-sm shrink-0">
                    <HeartPulse className="w-5 h-5" />
                  </div>
                  <div>
                    <div className="font-bold text-[#14532D] mb-1">Açık Adres</div>
                    <div className="text-[#166534] font-medium">{business?.address || 'Veteriner Sokak No:12\nKadıköy, İstanbul'}</div>
                  </div>
                </div>
              </div>
            </div>
            
            <form className="bg-white p-8 rounded-2xl shadow-sm border border-[#DCFCE7]">
              <h3 className="text-xl font-bold mb-6 text-[#14532D]">Randevu Formu</h3>
              <div className="space-y-5">
                <div>
                  <input type="text" placeholder="Adınız Soyadınız" className="w-full bg-[#F0FDF4] border border-[#DCFCE7] rounded-xl px-4 py-3 focus:outline-none focus:border-[#4ADE80] font-medium text-[#14532D] transition-colors" />
                </div>
                <div>
                  <input type="text" placeholder="Evcil Hayvanınızın Adı & Türü" className="w-full bg-[#F0FDF4] border border-[#DCFCE7] rounded-xl px-4 py-3 focus:outline-none focus:border-[#4ADE80] font-medium text-[#14532D] transition-colors" />
                </div>
                <div>
                  <input type="tel" placeholder="Telefon Numaranız" className="w-full bg-[#F0FDF4] border border-[#DCFCE7] rounded-xl px-4 py-3 focus:outline-none focus:border-[#4ADE80] font-medium text-[#14532D] transition-colors" />
                </div>
                <button className="w-full bg-[#F97316] text-white font-bold py-4 rounded-xl hover:bg-[#EA580C] transition-colors mt-2 shadow-md">
                  Randevu Talep Et
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </section>
  )
}
registerSection('contact', 'vet_bespoke_contact', VetBespokeContact as unknown as ComponentType<SectionProps<Record<string, unknown>>>)
