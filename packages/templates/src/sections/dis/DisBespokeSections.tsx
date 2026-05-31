'use client'

import React, { ComponentType } from 'react'
import { motion } from 'framer-motion'
import { Smile, ShieldCheck, Activity, ChevronRight, CalendarCheck, Clock, MapPin } from 'lucide-react'
import { registerSection, type SectionProps } from '../../registry/section-registry'

// ── 1. Dis (Dental) Clinical Hero ──
export function DisBespokeHero({ business, content }: SectionProps<any>) {
  return (
    <section className="relative min-h-[90vh] bg-[#F4F9F9] text-[#1A365D] flex flex-col justify-center overflow-hidden">
      <div className="absolute top-0 right-0 w-[60%] h-full hidden lg:block">
        <div className="absolute inset-0 bg-gradient-to-r from-[#F4F9F9] via-[#F4F9F9]/90 to-transparent z-10" />
        <img 
          src={(business?.images as any[])?.[0] || 'https://images.unsplash.com/photo-1606811841689-23dfddce3e95?q=80&w=2940&auto=format&fit=crop'} 
          alt="Modern Diş Kliniği" 
          className="w-full h-full object-cover object-left" 
        />
        <div className="absolute inset-0 bg-[#06B6D4]/10 mix-blend-multiply" />
      </div>

      <div className="relative z-20 w-full max-w-[var(--container-default)] mx-auto px-6 md:px-12 mt-20">
        <div className="max-w-2xl bg-white/80 lg:bg-transparent backdrop-blur-md lg:backdrop-blur-none p-8 lg:p-0 rounded-3xl lg:rounded-none">
          <motion.div 
            initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.8 }}
            className="inline-flex items-center gap-2 bg-[#06B6D4]/10 px-4 py-2 rounded-full mb-8 border border-[#06B6D4]/20"
          >
            <ShieldCheck className="w-5 h-5 text-[#06B6D4]" />
            <span className="text-[#0891B2] font-bold uppercase tracking-wider text-sm">
              {content?.badge || 'YENİ NESİL DİŞ HEKİMLİĞİ'}
            </span>
          </motion.div>

          <motion.h1 
            initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 0.2 }}
            className="text-5xl md:text-7xl font-semibold leading-[1.1] mb-6 text-[#164E63]"
            style={{ fontFamily: 'var(--font-heading)' }}
          >
            {content?.title || business?.name || 'Sağlıklı Gülüşler,\nGüvenli Yarınlar.'}
          </motion.h1>

          <motion.p 
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 1, delay: 0.4 }}
            className="text-xl text-[#334155] font-light leading-relaxed mb-10 max-w-xl"
          >
            {content?.description || (business?.description as string) || 'Uzman hekim kadromuz, son teknoloji görüntüleme cihazlarımız ve ağrısız tedavi yöntemlerimizle hayalinizdeki gülüşe kavuşun.'}
          </motion.p>
          
          <motion.div 
            initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 0.6 }}
            className="flex flex-col sm:flex-row gap-4"
          >
            <button className="bg-[#0891B2] text-white px-8 py-4 rounded-2xl font-bold tracking-wide hover:bg-[#164E63] transition-colors shadow-lg shadow-[#0891B2]/30 flex items-center justify-center gap-2">
              <CalendarCheck className="w-5 h-5" /> Randevu Alın
            </button>
            <button className="bg-white text-[#0891B2] px-8 py-4 rounded-2xl font-bold tracking-wide border-2 border-[#E2E8F0] hover:border-[#0891B2] transition-colors flex items-center justify-center gap-2">
              Hizmetlerimiz <ChevronRight className="w-5 h-5" />
            </button>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
registerSection('hero', 'dis_bespoke_hero', DisBespokeHero as unknown as ComponentType<SectionProps<Record<string, unknown>>>)

// ── 2. Dis Dental Treatments ──
export function DisBespokeServices({ business, content }: SectionProps<any>) {
  const treatments = business?.services?.length ? business.services : [
    { title: 'Estetik Gülüş Tasarımı', desc: 'Zirkonyum ve e-max kaplamalarla yüz hatlarınıza en uygun estetik gülüş profilinin oluşturulması.', icon: <Smile /> },
    { title: 'İmplant Tedavisi', desc: 'Eksik dişlerin, titanyum vidalar ve yüksek doku uyumlu üst yapılarla ömür boyu kalıcı şekilde telafi edilmesi.', icon: <Activity /> },
    { title: 'Ortodonti (Tel Tedavisi)', desc: 'Şeffaf plaklar (Invisalign) veya klasik tel yöntemleriyle çapraşık dişlerin ideal dizilime kavuşturulması.', icon: <ShieldCheck /> },
  ];

  return (
    <section className="py-24 md:py-32 bg-white text-[#164E63]">
      <div className="max-w-[var(--container-default)] mx-auto px-6 md:px-12">
        <div className="text-center max-w-3xl mx-auto mb-20">
          <h2 className="text-4xl md:text-5xl font-semibold mb-6" style={{ fontFamily: 'var(--font-heading)' }}>
            {content?.title || 'Uzmanlık Alanlarımız'}
          </h2>
          <div className="w-20 h-1.5 bg-[#06B6D4] mx-auto rounded-full mb-8" />
          <p className="text-[#475569] text-lg font-light leading-relaxed">Multidisipliner yaklaşımımızla ağız ve diş sağlığınızın tüm ihtiyaçlarına tek merkezde, dünya standartlarında çözümler üretiyoruz.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {treatments.map((treatment: any, i: number) => (
            <motion.div 
              key={i}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: i * 0.1 }}
              className="bg-[#F8FAFC] rounded-[2rem] p-10 border border-[#E2E8F0] hover:shadow-xl hover:shadow-[#06B6D4]/5 hover:border-[#06B6D4]/30 transition-all duration-300 group"
            >
              <div className="w-16 h-16 bg-white rounded-2xl flex items-center justify-center text-[#0891B2] mb-8 shadow-sm group-hover:scale-110 transition-transform duration-300">
                {treatment.icon || <Smile />}
              </div>
              <h3 className="text-2xl font-semibold mb-4 text-[#0F172A]">{treatment.title}</h3>
              <p className="text-[#475569] font-light leading-relaxed mb-8">{treatment.desc}</p>
              <div className="flex items-center gap-2 text-[#0891B2] font-bold text-sm uppercase tracking-wider group-hover:gap-4 transition-all cursor-pointer">
                Detaylı İncele <ChevronRight className="w-4 h-4" />
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
registerSection('services', 'dis_bespoke_services', DisBespokeServices as unknown as ComponentType<SectionProps<Record<string, unknown>>>)

// ── 3. Dis Clinic Environment (About) ──
export function DisBespokeAbout({ business, content }: SectionProps<any>) {
  return (
    <section className="py-24 md:py-32 bg-[#0891B2] text-white overflow-hidden relative">
      <div className="absolute inset-0 opacity-10">
        <div className="absolute w-[800px] h-[800px] bg-white rounded-full blur-[100px] -top-1/2 -right-1/4" />
      </div>
      
      <div className="max-w-[var(--container-default)] mx-auto px-6 md:px-12 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <div>
            <div className="inline-block bg-white/20 backdrop-blur-md px-4 py-2 rounded-xl mb-6 font-bold tracking-widest uppercase text-sm">
              Steril & Güvenli
            </div>
            <h2 className="text-4xl md:text-5xl font-semibold mb-8 leading-tight" style={{ fontFamily: 'var(--font-heading)' }}>
              {content?.title || 'Fobilerinizi Unutturan Konforlu Klinik Deneyimi.'}
            </h2>
            <div className="space-y-6 text-[#ECFEFF] font-light leading-relaxed text-lg mb-10">
              <p>
                {(business?.description as string) || 'Diş hekimi korkusunu yenmeniz için özel tasarlanmış ferah bekleme alanlarımız, yatıştırıcı atmosferimiz ve tamamen ağrısız anestezi protokollerimizle yanınızdayız.'}
              </p>
              <p>
                Uluslararası sterilizasyon standartlarına (TSE & ISO) uygun, çapraz enfeksiyon riskini sıfıra indiren 3 aşamalı otoklav sistemleri kullanıyoruz.
              </p>
            </div>
            
            <div className="grid grid-cols-2 gap-8 border-t border-white/20 pt-8">
              <div>
                <div className="text-4xl font-bold mb-2 text-white">3D</div>
                <div className="text-sm font-medium text-[#CFFAFE]">Panoramik Tomografi</div>
              </div>
              <div>
                <div className="text-4xl font-bold mb-2 text-white">0</div>
                <div className="text-sm font-medium text-[#CFFAFE]">Ağrı Puanı Hedefi</div>
              </div>
            </div>
          </div>
          
          <div className="relative h-[600px] rounded-[3rem] overflow-hidden shadow-2xl border-4 border-white/10">
            <img 
              src="https://images.unsplash.com/photo-1588776814546-1ffcf47267a5?q=80&w=2940&auto=format&fit=crop" 
              alt="Klinik Ortamı" 
              className="absolute inset-0 w-full h-full object-cover"
            />
          </div>
        </div>
      </div>
    </section>
  )
}
registerSection('about', 'dis_bespoke_about', DisBespokeAbout as unknown as ComponentType<SectionProps<Record<string, unknown>>>)

// ── 4. Dis Clinic Contact ──
export function DisBespokeContact({ business, content }: SectionProps<any>) {
  return (
    <section className="bg-white text-[#0F172A] py-24 md:py-32">
      <div className="max-w-[var(--container-default)] mx-auto px-6 md:px-12">
        <div className="bg-[#F8FAFC] rounded-[3rem] overflow-hidden border border-[#E2E8F0] shadow-xl flex flex-col lg:flex-row">
          
          <div className="lg:w-5/12 p-12 bg-[#164E63] text-white">
            <h3 className="text-3xl font-semibold mb-8">İletişime Geçin</h3>
            <p className="text-[#CFFAFE] font-light mb-12">İlk muayene ve radyolojik tetkiklerimiz (röntgen) ücretsizdir. Tedavi planlamanız için hemen arayın.</p>
            
            <div className="space-y-8">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 bg-white/10 rounded-full flex items-center justify-center shrink-0">
                  <MapPin className="w-5 h-5 text-[#22D3EE]" />
                </div>
                <div>
                  <div className="font-bold mb-1 text-[#22D3EE]">Adres</div>
                  <div className="text-[#ECFEFF] font-light leading-relaxed">{business?.address || 'Bağdat Caddesi No: 345, Kat: 2\nKadıköy, İstanbul'}</div>
                </div>
              </div>
              
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 bg-white/10 rounded-full flex items-center justify-center shrink-0">
                  <Clock className="w-5 h-5 text-[#22D3EE]" />
                </div>
                <div>
                  <div className="font-bold mb-1 text-[#22D3EE]">Çalışma Saatleri</div>
                  <div className="text-[#ECFEFF] font-light leading-relaxed">Pzt - Cmt: 09:00 - 20:00<br/>Pazar: Kapalı</div>
                </div>
              </div>
            </div>
          </div>
          
          <div className="lg:w-7/12 p-12 md:p-16">
            <h3 className="text-2xl font-bold mb-2 text-[#0F172A]">Hızlı Randevu</h3>
            <p className="text-[#64748B] mb-8">Sizi en kısa sürede arayarak uygun bir saate randevunuzu oluşturalım.</p>
            
            <form className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-bold text-[#475569] mb-2">Ad Soyad</label>
                  <input type="text" className="w-full bg-white border border-[#CBD5E1] rounded-xl px-4 py-3 focus:outline-none focus:border-[#0891B2] focus:ring-1 focus:ring-[#0891B2] transition-all" />
                </div>
                <div>
                  <label className="block text-sm font-bold text-[#475569] mb-2">Telefon</label>
                  <input type="tel" className="w-full bg-white border border-[#CBD5E1] rounded-xl px-4 py-3 focus:outline-none focus:border-[#0891B2] focus:ring-1 focus:ring-[#0891B2] transition-all" />
                </div>
              </div>
              <div>
                <label className="block text-sm font-bold text-[#475569] mb-2">Şikayetiniz / İlgilendiğiniz Tedavi</label>
                <select className="w-full bg-white border border-[#CBD5E1] rounded-xl px-4 py-3 focus:outline-none focus:border-[#0891B2] focus:ring-1 focus:ring-[#0891B2] transition-all appearance-none text-[#0F172A]">
                  <option value="">Lütfen seçiniz</option>
                  <option value="agri">Diş Ağrısı / Acil</option>
                  <option value="implant">İmplant</option>
                  <option value="estetik">Gülüş Tasarımı / Kaplama</option>
                  <option value="ortodonti">Tel Tedavisi</option>
                </select>
              </div>
              <button className="w-full bg-[#0891B2] text-white font-bold py-4 rounded-xl hover:bg-[#06B6D4] transition-colors mt-4">
                Randevu Talebi Gönder
              </button>
            </form>
          </div>
          
        </div>
      </div>
    </section>
  )
}
registerSection('contact', 'dis_bespoke_contact', DisBespokeContact as unknown as ComponentType<SectionProps<Record<string, unknown>>>)
