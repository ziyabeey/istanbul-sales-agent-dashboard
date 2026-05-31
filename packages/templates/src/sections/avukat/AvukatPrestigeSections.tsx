'use client'

import React, { ComponentType, useState, useRef } from 'react'
import type { SectionProps } from '../../types/section-types'
import { registerSection } from '../../registry/section-registry'
import { motion, useScroll, useTransform, useInView } from 'framer-motion'
import { ArrowRight, BookOpen, Bookmark, Check, Landmark, Phone, Play, Scale, User, MapPin, ArrowUpRight } from 'lucide-react'

/* ═══════════════════════════════════════════
   PRESTIGE LAW — MASTERPIECE (THEME 003) -> UPGRADED TO AWWWARDS ELITE
   Sektor: avukat | Konsept: The New York Times, Cream White, Old Gold, Serif Parallax, Bento Grid, Noise
   ═══════════════════════════════════════════ */

// ── UTILITIES ──

const RevealLine = ({ text, delay = 0, className = "" }: { text: string, delay?: number, className?: string }) => {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: "-10%" })
  
  return (
    <div ref={ref} className="overflow-hidden inline-block align-bottom">
      <motion.div
        initial={{ y: "100%", rotate: 2 }}
        animate={isInView ? { y: 0, rotate: 0 } : { y: "100%", rotate: 2 }}
        transition={{ duration: 1.2, delay, ease: [0.16, 1, 0.3, 1] as [number,number,number,number] }}
        className={className}
      >
        {text}
      </motion.div>
    </div>
  )
}

// ── 1. Editorial Hero ──
export function AvukatPrestigeHero({ business, content }: SectionProps<any>) {
  const containerRef = useRef(null)
  const { scrollYProgress } = useScroll({ target: containerRef, offset: ["start start", "end start"] })
  const imageY = useTransform(scrollYProgress, [0, 1], [0, 150])

  return (
    <section ref={containerRef} className="relative min-h-[90vh] noise-overlay text-text font-sans overflow-hidden flex flex-col" style={{ background: 'var(--color-bg)' }}>
      
      {/* EDITORIAL TOP BAR */}
      <div className="border-b border-border-subtle py-3 px-6 md:px-12 flex flex-col md:flex-row justify-between items-center text-[9px] uppercase tracking-[0.2em] font-bold text-text-muted">
        <span className="hidden md:block">Prestij ve Otorite • Türkiye</span>
        <div className="flex items-center gap-6">
          <a href={`tel:${business.phoneClean || business.phone}`} className="hover:text-accent transition-colors">{business.phone}</a>
          <span>|</span>
          <span>{business.district || 'Merkez'}</span>
        </div>
      </div>

      <div className="w-full flex-grow flex flex-col lg:flex-row max-w-[var(--container-default)] mx-auto border-l border-r border-border-subtle">
        {/* Typographic Left Area */}
        <div className="w-full lg:w-[45%] flex flex-col justify-center px-6 md:px-16 py-12 lg:py-0 relative z-10" style={{ background: 'var(--color-bg)' }}>
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 1 }} className="flex items-center gap-4 mb-10">
            <span className="w-8 h-px bg-accent" />
            <span className="text-accent text-[10px] font-bold uppercase tracking-[0.3em]">
              {content?.badge || `EST. ${business.foundedYear || '1995'}`}
            </span>
          </motion.div>
          
          <h1 className="text-fluid-1 font-light leading-[1.05] tracking-tight mb-8" style={{ fontFamily: 'var(--font-heading)' }}>
            <div><RevealLine text="Adaletin" /></div>
            <div>
              <RevealLine text="Zarif" className="italic text-text-muted" delay={0.1} /> 
              <RevealLine text=" ve" delay={0.2} />
            </div>
            <div><RevealLine text="Kesin Yüzü." delay={0.3} /></div>
          </h1>
          
          <motion.p 
            initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 1, delay: 0.6 }}
            className="text-lg md:text-xl text-text-secondary font-medium leading-relaxed mb-12 max-w-md border-l border-accent pl-6"
          >
            {content?.subtitle || business.slogan || 'Kapsamlı hukuki birikimimiz ve stratejik çözüm odaklı yaklaşımımız ile üst düzey danışmanlık sağlıyoruz.'}
          </motion.p>
          
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.8, duration: 1 }}>
            <a href={(content?.cta1 as any)?.href || '#iletisim'} className="inline-flex items-center justify-center gap-4 bg-text text-bg hover:bg-accent hover:text-white px-10 py-5 text-xs font-bold tracking-[0.2em] uppercase transition-colors duration-500 group w-full sm:w-auto">
              {(content?.cta1 as any)?.text || 'Randevu Talep Et'}
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </a>
          </motion.div>
        </div>

        {/* Parallax Majestic Image Right Area */}
        <div className="w-full lg:w-[55%] min-h-[50vh] lg:min-h-full relative overflow-hidden border-t lg:border-t-0 lg:border-l border-border-subtle">
          <motion.div 
            style={{ y: imageY }}
            className="absolute -inset-[10%] w-[120%] h-[120%]"
          >
             <img 
               src={business?.photos?.[0] || "https://images.unsplash.com/photo-1589994965851-a8f479c573a9?auto=format&fit=crop&q=90"} 
               alt="Law Firm Prestige" 
               className="w-full h-full object-cover grayscale-[0.3] contrast-100" 
             />
          </motion.div>
          <div className="absolute inset-0 bg-black/10" />
          
          {/* Prestige floating badge */}
          <motion.div 
            initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 1, delay: 1 }}
            className="absolute bottom-0 left-0 lg:-left-20 bg-bg p-8 border border-border-subtle max-w-[280px] shadow-2xl z-20 hidden sm:block"
          >
             <div className="text-accent mb-4"><Landmark size={32} strokeWidth={1.5} /></div>
             <h3 className="text-2xl mb-2 font-light text-text" style={{ fontFamily: 'var(--font-heading)' }}>
               {new Date().getFullYear() - (business.foundedYear || 1995)} Yıllık Kökler
             </h3>
             <p className="text-xs font-bold tracking-widest uppercase text-text-secondary leading-relaxed">
               Güncel içtihatlara hakim kurumsal derinlik.
             </p>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
registerSection('hero', 'avukat_prestige_hero', AvukatPrestigeHero as unknown as ComponentType<SectionProps<Record<string, unknown>>>)


// ── 2. Expertise (Bento Grid) ──
export function AvukatPrestigeExpertise({ business, content }: SectionProps<any>) {
  const defaultServices = [
    { name: "Ticaret Hukuku", description: "Şirket birleşme, devralma ve uluslararası kurumsal uyum süreçlerinde stratejik rehberlik.", price: "Danışmanlık", icon: <Scale className="w-6 h-6" /> },
    { name: "Ceza Hukuku", description: "Ağır ceza davaları ve ekonomik suçlarda yüksek profil savunma ve müdahale hizmetleri.", price: "Dava Özel", icon: <Landmark className="w-6 h-6" /> },
    { name: "Gayrimenkul Hukuku", description: "Devasa imar projelerinde önleyici sözleşme kurgusu ve kriz yönetimi.", price: "Proje Bazlı", icon: <Bookmark className="w-6 h-6" /> },
    { name: "Fikri Mülkiyet", description: "Marka, patent ve telif haklarının global ölçekte korunması ve tescili.", price: "Kurumsal", icon: <BookOpen className="w-6 h-6" /> }
  ];
  
  const services = business.services?.length 
    ? business.services.map((s: any, i: number) => {
        if (typeof s === 'string') {
          return { name: s, description: defaultServices[i%4].description, price: defaultServices[i%4].price, icon: defaultServices[i%4].icon };
        }
        return { ...s, icon: defaultServices[i%4].icon };
      })
    : defaultServices;

  return (
    <section className="bg-bg py-[var(--section-py)] border-t border-border-subtle text-text noise-overlay">
      <div className="max-w-[var(--container-default)] mx-auto px-6 md:px-12">
        <div className="flex flex-col lg:flex-row justify-between lg:items-end mb-24 gap-8">
          <div>
            <motion.h2 initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: "-100px" }} className="text-fluid-2 mb-6 font-light" style={{ fontFamily: 'var(--font-heading)' }}>
              {content?.title || 'Pratik Çerçevesi.'}
            </motion.h2>
            <motion.p initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true, margin: "-100px" }} className="text-text-secondary text-lg max-w-2xl font-medium leading-relaxed">
              {content?.description || 'En karmaşık hukuki ihtilaflarda, alanında spesifikleşmiş ve otorite kabul edilen departmanlarımız ile sonuç odaklı stratejiler kurguluyoruz.'}
            </motion.p>
          </div>
        </div>

        {/* Bento Grid */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-4 md:gap-6">
          {services.map((service: any, i: number) => {
            const colSpan = i === 0 ? 'md:col-span-8' : i === 1 ? 'md:col-span-4' : i === 2 ? 'md:col-span-4' : 'md:col-span-8';
            const bgClass = i === 0 ? 'bg-surface-1' : 'bg-bg';
            
            return (
              <motion.div 
                key={i}
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.8, delay: i * 0.1, ease: [0.16, 1, 0.3, 1] }}
                className={`relative overflow-hidden group rounded-[var(--radius-lg)] border border-border-subtle hover:border-accent transition-colors duration-500 p-8 md:p-12 min-h-[300px] flex flex-col justify-between ${colSpan} ${bgClass}`}
              >
                <div className="flex justify-between items-start mb-8">
                  <div className="w-12 h-12 rounded-full border border-border-subtle flex items-center justify-center text-accent group-hover:scale-110 transition-transform duration-500 bg-white">
                    {service.icon || <Scale className="w-5 h-5" />}
                  </div>
                  <div className="text-[10px] uppercase tracking-widest font-bold text-text-muted border border-border-subtle px-3 py-1 rounded-full">
                    {service.price}
                  </div>
                </div>
                
                <div>
                  <h3 className="text-3xl mb-4 font-light text-text group-hover:text-accent transition-colors duration-300" style={{ fontFamily: 'var(--font-heading)' }}>
                    {service.name}
                  </h3>
                  <p className="text-text-secondary text-sm md:text-base leading-relaxed max-w-md">
                    {service.description}
                  </p>
                </div>
                
                <div className="absolute bottom-12 right-12 opacity-0 translate-y-4 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-500 ease-out">
                  <div className="w-10 h-10 rounded-full bg-accent text-white flex items-center justify-center shadow-lg">
                    <ArrowUpRight className="w-5 h-5" />
                  </div>
                </div>
              </motion.div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
registerSection('services', 'avukat_prestige_expertise', AvukatPrestigeExpertise as unknown as ComponentType<SectionProps<Record<string, unknown>>>)


// ── 3. Attorneys (Ekip Kadrosu) ──
export function AvukatPrestigeAttorneys({ business, content }: SectionProps<any>) {
  const team = business.team || [
    { name: "Av. Murat C.", role: "Kurucu Ortak", experience: "25" },
    { name: "Av. Aylin Y.", role: "Yönetici Partner", experience: "18" },
    { name: "Av. Sinan K.", role: "Kıdemli Avukat", experience: "12" }
  ];

  return (
    <section className="bg-surface-1 py-[var(--section-py)] border-t border-border-subtle text-text noise-overlay">
      <div className="max-w-[var(--container-default)] mx-auto px-6 md:px-12">
        <div className="flex items-center gap-4 mb-12">
          <span className="w-8 h-px bg-text" />
          <span className="text-text text-[10px] font-bold uppercase tracking-[0.3em]">HUKUKİ KADRO</span>
        </div>
        
        <motion.h2 initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-fluid-2 mb-20 font-light" style={{ fontFamily: 'var(--font-heading)' }}>
          Lider <span className="italic text-accent">Partnerler.</span>
        </motion.h2>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-16">
          {team.map((member: any, idx: number) => (
            <motion.div 
              initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: idx * 0.15, duration: 1 }}
              key={idx} className="group border-b border-border-subtle pb-8 hover:border-accent transition-colors"
            >
              <div className="flex items-center gap-6 mb-8">
                <div className="w-20 h-20 rounded-full border border-border-subtle flex items-center justify-center bg-bg group-hover:scale-105 transition-transform duration-500 shadow-sm">
                  <User size={24} className="text-text-muted group-hover:text-accent transition-colors" strokeWidth={1} />
                </div>
              </div>
              <h3 className="text-3xl mb-3 font-light text-text group-hover:italic transition-all duration-300" style={{ fontFamily: 'var(--font-heading)' }}>
                 {member.name}
              </h3>
              <p className="font-bold text-text-secondary uppercase tracking-widest text-[10px] mb-8">
                 {member.role} — {member.experience} Yıllık Deneyim
              </p>
              <a href="#" className="inline-flex items-center gap-2 text-[10px] font-bold tracking-[0.2em] uppercase text-text hover:text-accent transition-colors">
                Profili İncele <ArrowRight size={12} />
              </a>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
registerSection('team', 'avukat_prestige_attorneys', AvukatPrestigeAttorneys as unknown as ComponentType<SectionProps<Record<string, unknown>>>)


// ── 4. Publications (Yayınlar - Editorial Detail) ──
export function AvukatPrestigePublications({ content }: SectionProps<any>) {
  const publications = [
    { title: 'Ceza Muhakemesinde Yeni Delil Standartları', date: 'Ekim 2023', author: 'Mevzuat Departmanı' },
    { title: 'Anonim Şirketlerde Azınlık Hakları İhlalleri', date: 'Eylül 2023', author: 'Ticaret Hukuku Komitesi' },
    { title: 'Yapay Zeka ve Fikri Mülkiyetin Geleceği', date: 'Ağustos 2023', author: 'İlişkiler Ofisi' }
  ];

  return (
    <section className="bg-bg py-[var(--section-py)] border-t border-border-subtle text-text noise-overlay">
      <div className="max-w-[var(--container-default)] mx-auto px-6 md:px-12 grid grid-cols-1 lg:grid-cols-12 gap-16">
        
        <div className="lg:col-span-5">
          <div className="flex items-center gap-4 mb-8">
            <span className="text-accent"><BookOpen size={20} strokeWidth={1.5} /></span>
            <span className="text-accent text-[10px] font-bold uppercase tracking-[0.3em]">Entelektüel Birikim</span>
          </div>
          <h2 className="text-fluid-2 mb-10 font-light leading-none" style={{ fontFamily: 'var(--font-heading)' }}>
            Hukuki<br/><i className="text-text-muted">Makaleler.</i>
          </h2>
          <p className="text-text-secondary font-medium leading-relaxed max-w-sm">
            Büromuzun içtihat yaratan tecrübesi ve süzülmüş güncel hukuki değerlendirmeleri. Akademik derinlik ve pratik uygulanabilirlik.
          </p>
          <button className="mt-12 bg-transparent border border-text text-text px-10 py-4 text-xs font-bold uppercase tracking-[0.2em] hover:bg-text hover:text-bg transition-colors duration-500">
            Tüm Arşiv
          </button>
        </div>

        <div className="lg:col-span-7 flex flex-col justify-center">
          {publications.map((pub, idx) => (
            <motion.div 
               initial={{ opacity: 0, x: 20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ delay: 0.2 + (idx * 0.1), duration: 0.8 }}
               key={idx} className="group cursor-pointer border-b border-border-subtle py-10 last:border-b-0 hover:border-text transition-colors"
            >
              <h4 className="text-2xl md:text-3xl text-text leading-snug mb-4 group-hover:text-accent transition-colors" style={{ fontFamily: 'var(--font-heading)' }}>
                {pub.title}
              </h4>
              <div className="flex items-center gap-4 font-bold text-[10px] uppercase tracking-widest text-text-muted">
                <span>{pub.date}</span>
                <span className="w-4 h-px bg-border-subtle"></span>
                <span>{pub.author}</span>
              </div>
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  )
}
registerSection('blog_preview' as any, 'avukat_prestige_publications', AvukatPrestigePublications as unknown as ComponentType<SectionProps<Record<string, unknown>>>)


// ── 5. Contact (Rezervasyon Plaque) ──
export function AvukatPrestigeContact({ business, content }: SectionProps<any>) {
  return (
    <section id="iletisim" className="bg-[#111] py-[var(--section-py)] text-white noise-overlay">
      <div className="max-w-[var(--container-default)] mx-auto px-6 md:px-12">
        <div className="border border-white/10 bg-white/5 p-10 md:p-24 flex flex-col items-center text-center backdrop-blur-sm relative overflow-hidden rounded-[var(--radius-lg)]">
          
          <div className="absolute inset-0 opacity-5 pointer-events-none bg-[url('https://images.unsplash.com/photo-1589994965851-a8f479c573a9?q=80')] bg-cover bg-center grayscale mix-blend-overlay" />
          
          <motion.div initial={{ scale: 0.8, opacity: 0 }} whileInView={{ scale: 1, opacity: 1 }} viewport={{ once: true }} transition={{ duration: 1 }} className="text-accent mb-12 relative z-10">
            <Landmark size={56} strokeWidth={1} />
          </motion.div>
          
          <motion.h2 initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-4xl md:text-6xl text-white mb-10 font-light relative z-10" style={{ fontFamily: 'var(--font-heading)' }}>
            Özel Danışmanlık &<br/><i className="text-accent">Dosya Analizi.</i>
          </motion.h2>
          
          <motion.p initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} transition={{ delay: 0.3 }} className="text-lg text-white/60 font-medium max-w-2xl mx-auto mb-20 relative z-10">
            İhtilafınızın ön değerlendirmesi ve size özel kurgulanacak profesyonel hukuki yol haritası için kurumsal asistanımız ile iletişime geçin. Tam gizlilik esastır.
          </motion.p>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12 w-full max-w-5xl border-t border-white/10 pt-16 relative z-10 text-left">
            <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.4 }}>
              <div className="font-bold text-[10px] text-white/40 uppercase tracking-[0.3em] mb-4 flex items-center gap-2"><MapPin size={12}/> KURUMSAL ADRES</div>
              <div className="text-sm md:text-base text-white/90 font-light leading-relaxed">{business.address || 'Besiktas, Istanbul, TR'}</div>
            </motion.div>
            <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.5 }}>
              <div className="font-bold text-[10px] text-white/40 uppercase tracking-[0.3em] mb-4 flex items-center gap-2"><Phone size={12}/> SANTRAL & DIREKT HAT</div>
              <div className="text-xl md:text-2xl font-light text-white mb-2" style={{ fontFamily: 'var(--font-heading)' }}>{business.phone || '+90 555 123 45 67'}</div>
              <div className="text-accent font-bold text-[10px] tracking-widest uppercase">{business.email || 'info@hukuk.com'}</div>
            </motion.div>
            <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.6 }}>
              <div className="font-bold text-[10px] text-white/40 uppercase tracking-[0.3em] mb-4">MESAİ (GMT+3)</div>
              <div className="text-sm md:text-base text-white/90 font-light leading-relaxed">Hafta İçi: 09:00 - 18:00<br/>Cmt-Pzt: Önceden Randevulu</div>
            </motion.div>
          </div>

        </div>
      </div>
    </section>
  )
}
registerSection('contact', 'avukat_prestige_contact', AvukatPrestigeContact as unknown as ComponentType<SectionProps<Record<string, unknown>>>)
