'use client'

import React, { ComponentType } from 'react'
import { motion } from 'framer-motion'
import { Sparkles, Heart, Music, GlassWater, ArrowRight } from 'lucide-react'
import { registerSection, type SectionProps } from '../../registry/section-registry'

// ── 1. Organizasyon Dreamy Hero ──
export function OrganizasyonBespokeHero({ business, content }: SectionProps<any>) {
  return (
    <section className="relative min-h-screen bg-[#FFFBF9] text-[#4A3B32] flex items-center pt-24 overflow-hidden">
      {/* Soft Champagne / Rose Gold Glows */}
      <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-[#FCE3D7] rounded-full filter blur-[150px] opacity-60 animate-pulse-slow" />
      <div className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-[#F5E6E8] rounded-full filter blur-[120px] opacity-50" />

      <div className="relative z-10 w-full max-w-[var(--container-default)] mx-auto px-6 md:px-12 text-center flex flex-col items-center">
        
        <motion.div 
          initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 1 }}
          className="mb-8"
        >
          <span className="text-[#D4A373] font-medium tracking-[0.3em] text-xs uppercase border-y border-[#D4A373]/30 py-2 px-8">
            {content?.badge || 'HAYALLERİNİZİN ÖTESİNDE'}
          </span>
        </motion.div>

        <motion.h1 
          initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 1.5, ease: "easeOut" as any }}
          className="text-6xl md:text-8xl lg:text-9xl font-normal leading-[1] mb-8 text-[#4A3B32]"
          style={{ fontFamily: 'var(--font-heading)' }}
        >
          {content?.title?.split('\n').map((line: string, i: number) => <div key={i}>{line}</div>) || (
            <>
              Unutulmaz <br/> <span className="italic text-[#D4A373]">Anlar.</span>
            </>
          )}
        </motion.h1>

        <motion.p 
          initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 1, delay: 0.5 }}
          className="text-lg md:text-xl text-[#8E8075] font-light leading-relaxed mb-12 max-w-2xl"
        >
          {content?.description || (business?.description as string) || 'Düğün, nişan, kurumsal etkinlikler ve özel davetleriniz için A\'dan Z\'ye kusursuz planlama ve peri masalı konseptleri.'}
        </motion.p>
        
        <motion.div 
          initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 1, delay: 0.8 }}
          className="flex flex-col sm:flex-row gap-6"
        >
          <button className="bg-[#D4A373] text-white px-12 py-5 rounded-full font-medium tracking-widest text-sm uppercase hover:bg-[#B58A61] transition-all shadow-xl shadow-[#D4A373]/20">
            Hikayenizi Anlatın
          </button>
          <button className="bg-transparent text-[#4A3B32] px-12 py-5 rounded-full font-medium tracking-widest text-sm uppercase border border-[#D4A373] hover:bg-[#FCE3D7]/30 transition-colors">
            Portfolyoyu İncele
          </button>
        </motion.div>

      </div>

      {/* Floating images mimicking scattered polaroids/memories */}
      <motion.img 
        initial={{ opacity: 0, x: -50, rotate: -10 }} animate={{ opacity: 1, x: 0, rotate: -5 }} transition={{ duration: 1.5, delay: 1 }}
        src="https://images.unsplash.com/photo-1519225421980-715cb0215aed?q=80&w=2940&auto=format&fit=crop"
        className="absolute left-[5%] top-[20%] w-48 md:w-64 aspect-[3/4] object-cover rounded-lg shadow-2xl border-4 border-white hidden lg:block"
        alt="Wedding Detail"
      />
      <motion.img 
        initial={{ opacity: 0, x: 50, rotate: 10 }} animate={{ opacity: 1, x: 0, rotate: 5 }} transition={{ duration: 1.5, delay: 1.2 }}
        src="https://images.unsplash.com/photo-1511795409834-ef04bbd61622?q=80&w=2938&auto=format&fit=crop"
        className="absolute right-[5%] bottom-[15%] w-56 md:w-72 aspect-square object-cover rounded-full shadow-2xl border-8 border-white hidden lg:block"
        alt="Event Setup"
      />

    </section>
  )
}
registerSection('hero', 'organizasyon_bespoke_hero', OrganizasyonBespokeHero as unknown as ComponentType<SectionProps<Record<string, unknown>>>)

// ── 2. Organizasyon Services (Elegant Cards) ──
export function OrganizasyonBespokeServices({ business, content }: SectionProps<any>) {
  const services = business?.services?.length ? business.services : [
    { title: 'Düğün & Nişan', desc: 'Mekan seçiminden dekorasyona, en özel gününüzün kusursuz yönetimi.', icon: <Heart strokeWidth={1.5} /> },
    { title: 'Kurumsal Davetler', desc: 'Lansman, gala ve şirket içi etkinlikleriniz için prestijli konseptler.', icon: <GlassWater strokeWidth={1.5} /> },
    { title: 'Sahne & Eğlence', desc: 'DJ, canlı müzik, ışık ve ses sistemleriyle gecenizi aydınlatın.', icon: <Music strokeWidth={1.5} /> },
  ];

  return (
    <section className="py-24 md:py-32 bg-white text-[#4A3B32]">
      <div className="max-w-[var(--container-default)] mx-auto px-6 md:px-12">
        <div className="text-center mb-24">
          <Sparkles className="w-8 h-8 text-[#D4A373] mx-auto mb-6 opacity-50" />
          <h2 className="text-4xl md:text-5xl font-normal mb-6" style={{ fontFamily: 'var(--font-heading)' }}>
            {content?.title || 'Hizmetlerimiz'}
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-12">
          {services.map((service: any, i: number) => (
            <motion.div 
              key={i}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: i * 0.2 }}
              className="group text-center px-6"
            >
              <div className="w-24 h-24 mx-auto bg-[#FFFBF9] rounded-full flex items-center justify-center text-[#D4A373] mb-8 border border-[#FCE3D7] group-hover:scale-110 transition-transform duration-500 shadow-sm">
                {React.cloneElement(service.icon, { className: 'w-10 h-10' })}
              </div>
              <h3 className="text-2xl font-normal mb-4 text-[#4A3B32]" style={{ fontFamily: 'var(--font-heading)' }}>{service.title}</h3>
              <p className="text-[#8E8075] font-light leading-relaxed mb-6">{service.desc}</p>
              <div className="w-12 h-px bg-[#D4A373] mx-auto group-hover:w-full transition-all duration-500 opacity-50" />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
registerSection('services', 'organizasyon_bespoke_services', OrganizasyonBespokeServices as unknown as ComponentType<SectionProps<Record<string, unknown>>>)

// ── 3. Organizasyon Portfolio/About ──
export function OrganizasyonBespokeAbout({ business, content }: SectionProps<any>) {
  return (
    <section className="bg-[#4A3B32] py-32 text-[#FFFBF9] relative overflow-hidden">
      {/* Decorative floral/mandala watermark */}
      <div className="absolute -top-40 -right-40 w-96 h-96 border-[1px] border-[#D4A373]/20 rounded-full" />
      <div className="absolute -top-20 -right-20 w-96 h-96 border-[1px] border-[#D4A373]/20 rounded-full" />
      
      <div className="max-w-[var(--container-default)] mx-auto px-6 md:px-12 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-center">
          
          <div className="lg:col-span-6 relative">
            <div className="grid grid-cols-2 gap-4">
              <img src="https://images.unsplash.com/photo-1464366400600-7168b8af9bc3?q=80&w=2836&auto=format&fit=crop" className="w-full aspect-[4/5] object-cover rounded-t-full" alt="Event Details" />
              <img src="https://images.unsplash.com/photo-1522413452208-9969062f7773?q=80&w=2940&auto=format&fit=crop" className="w-full aspect-[4/5] object-cover rounded-b-full mt-12" alt="Event Venue" />
            </div>
          </div>
          
          <div className="lg:col-span-6 lg:pl-12">
            <h2 className="text-5xl md:text-6xl lg:text-7xl font-normal mb-10 leading-[1.1]" style={{ fontFamily: 'var(--font-heading)' }}>
              {content?.title || 'Her Detay Sizin İçin.'}
            </h2>
            <div className="space-y-6 text-[#DDCBBE] font-light leading-relaxed text-lg mb-12">
              <p>
                {(business?.description as string) || 'Tasarımdan gerçeğe uzanan yolculukta, sizin hayallerinizi bizim tecrübemizle harmanlıyoruz. Gecenin başından sonuna kadar stresi size değil, bize bırakın.'}
              </p>
            </div>
            
            <div className="grid grid-cols-2 gap-8 border-t border-[#D4A373]/30 pt-12">
              <div>
                <div className="text-4xl font-light text-[#D4A373] mb-2" style={{ fontFamily: 'var(--font-heading)' }}>500+</div>
                <div className="text-xs uppercase tracking-widest text-[#DDCBBE]">Mutlu Çift</div>
              </div>
              <div>
                <div className="text-4xl font-light text-[#D4A373] mb-2" style={{ fontFamily: 'var(--font-heading)' }}>12 Yıl</div>
                <div className="text-xs uppercase tracking-widest text-[#DDCBBE]">Deneyim</div>
              </div>
            </div>
          </div>
          
        </div>
      </div>
    </section>
  )
}
registerSection('about', 'organizasyon_bespoke_about', OrganizasyonBespokeAbout as unknown as ComponentType<SectionProps<Record<string, unknown>>>)

// ── 4. Organizasyon RSVP/Contact ──
export function OrganizasyonBespokeContact({ business, content }: SectionProps<any>) {
  return (
    <section className="bg-[#FFFBF9] text-[#4A3B32] py-32 border-t border-[#F5E6E8]">
      <div className="max-w-4xl mx-auto px-6 md:px-12 text-center">
        
        <div className="mb-16">
          <span className="text-[#D4A373] text-sm uppercase tracking-[0.3em] font-medium block mb-4">Lütfen Bize Ulaşın</span>
          <h2 className="text-5xl md:text-7xl font-normal mb-8" style={{ fontFamily: 'var(--font-heading)' }}>
            Kahve İçmeye Bekliyoruz.
          </h2>
          <p className="text-[#8E8075] font-light text-lg">Tarihinizi ayırtmak ve bütçe planlaması yapmak için formu doldurun.</p>
        </div>

        <div className="bg-white p-10 md:p-16 rounded-3xl shadow-2xl shadow-[#FCE3D7]/50 border border-[#F5E6E8]">
          <form className="space-y-8">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
               <input type="text" placeholder="Adınız Soyadınız" className="w-full bg-transparent border-b border-[#D4A373]/30 py-4 focus:outline-none focus:border-[#D4A373] font-light transition-colors placeholder:text-[#DDCBBE]" />
               <input type="tel" placeholder="Telefon Numaranız" className="w-full bg-transparent border-b border-[#D4A373]/30 py-4 focus:outline-none focus:border-[#D4A373] font-light transition-colors placeholder:text-[#DDCBBE]" />
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
               <input type="date" className="w-full bg-transparent border-b border-[#D4A373]/30 py-4 focus:outline-none focus:border-[#D4A373] text-[#8E8075] font-light transition-colors" />
               <select className="w-full bg-transparent border-b border-[#D4A373]/30 py-4 focus:outline-none focus:border-[#D4A373] text-[#8E8075] font-light transition-colors appearance-none">
                 <option value="">Etkinlik Türü</option>
                 <option value="dugun">Düğün / Nişan</option>
                 <option value="kurumsal">Kurumsal Etkinlik</option>
                 <option value="dogum">Doğum Günü / Parti</option>
               </select>
            </div>
            <div>
               <textarea rows={3} placeholder="Mekan veya konsept hayallerinizden kısaca bahsedin..." className="w-full bg-transparent border-b border-[#D4A373]/30 py-4 focus:outline-none focus:border-[#D4A373] font-light transition-colors resize-none placeholder:text-[#DDCBBE]" />
            </div>
            <button className="bg-[#D4A373] text-white font-medium tracking-widest text-sm uppercase px-12 py-5 rounded-full hover:bg-[#B58A61] transition-colors mt-8 shadow-xl shadow-[#D4A373]/20">
               Randevu Talebi Oluştur
            </button>
          </form>
        </div>

        <div className="mt-20 flex flex-col md:flex-row justify-center gap-12 text-[#8E8075] font-light">
          <div>
            <div className="text-[#4A3B32] font-medium uppercase tracking-widest text-xs mb-2">Telefon</div>
            {business?.phone || '+90 212 999 88 77'}
          </div>
          <div>
            <div className="text-[#4A3B32] font-medium uppercase tracking-widest text-xs mb-2">Ofis</div>
            {business?.address || 'Moda Cad. No:12 Kadıköy, İstanbul'}
          </div>
        </div>

      </div>
    </section>
  )
}
registerSection('contact', 'organizasyon_bespoke_contact', OrganizasyonBespokeContact as unknown as ComponentType<SectionProps<Record<string, unknown>>>)
