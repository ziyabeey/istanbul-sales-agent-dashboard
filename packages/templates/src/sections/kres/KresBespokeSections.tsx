'use client'

import React, { ComponentType } from 'react'
import { motion } from 'framer-motion'
import { Palette, Music, Puzzle, ArrowRight, Heart, Star, Sun } from 'lucide-react'
import { registerSection, type SectionProps } from '../../registry/section-registry'

// ── 1. Kres Playful Hero ──
export function KresBespokeHero({ business, content }: SectionProps<any>) {
  return (
    <section className="relative min-h-[90vh] bg-[#FFFBF0] text-[#4A5568] flex items-center pt-24 pb-12 overflow-hidden">
      {/* Decorative colorful blobs */}
      <div className="absolute top-10 left-10 w-32 h-32 bg-[#FFB7B2] rounded-full mix-blend-multiply filter blur-2xl opacity-70 animate-blob" />
      <div className="absolute top-40 right-20 w-48 h-48 bg-[#E2F0CB] rounded-full mix-blend-multiply filter blur-2xl opacity-70 animate-blob animation-delay-2000" />
      <div className="absolute -bottom-10 left-1/2 w-56 h-56 bg-[#FFDAC1] rounded-full mix-blend-multiply filter blur-2xl opacity-70 animate-blob animation-delay-4000" />

      <div className="relative z-10 w-full max-w-[var(--container-default)] mx-auto px-6 md:px-12">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div className="max-w-xl">
            <motion.div 
              initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, type: "spring", bounce: 0.5 }}
              className="inline-flex items-center gap-2 bg-white px-5 py-3 rounded-full mb-8 shadow-sm border border-[#FFDAC1]"
            >
              <Sun className="w-5 h-5 text-[#FFB7B2]" />
              <span className="text-[#F28B82] font-bold uppercase tracking-widest text-sm">
                {content?.badge || 'MUTLU ÇOCUKLAR'}
              </span>
            </motion.div>

            <motion.h1 
              initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.8, delay: 0.2, type: "spring", bounce: 0.5 }}
              className="text-5xl md:text-7xl font-bold leading-[1.1] mb-6 text-[#2D3748]"
              style={{ fontFamily: 'var(--font-heading)' }}
            >
              {content?.title || business?.name || 'Oynayarak\nÖğreniyoruz,\nBüyüyoruz.'}
            </motion.h1>

            <motion.p 
              initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 1, delay: 0.4 }}
              className="text-xl text-[#718096] font-medium leading-relaxed mb-10"
            >
              {content?.description || (business?.description as string) || 'Sevgi dolu, güvenli ve yaratıcılığı destekleyen ortamımızda çocuğunuzun potansiyelini keşfetmesine rehberlik ediyoruz.'}
            </motion.p>
            
            <motion.div 
              initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 0.6 }}
              className="flex flex-wrap gap-4"
            >
              <button className="bg-[#FFB7B2] text-[#2D3748] px-8 py-4 rounded-[2rem] font-bold text-lg hover:bg-[#F28B82] transition-colors shadow-lg shadow-[#FFB7B2]/40 hover:-translate-y-1 transform duration-300">
                Kayıt Bilgisi
              </button>
              <button className="bg-white text-[#4A5568] px-8 py-4 rounded-[2rem] font-bold text-lg border-2 border-[#E2F0CB] hover:bg-[#E2F0CB] transition-colors hover:-translate-y-1 transform duration-300 flex items-center gap-2">
                Okulumuzu Gezin <ArrowRight className="w-5 h-5" />
              </button>
            </motion.div>
          </div>
          
          <div className="relative">
             <motion.div 
               initial={{ opacity: 0, scale: 0.8, rotate: 5 }} animate={{ opacity: 1, scale: 1, rotate: 0 }} transition={{ duration: 1.2, type: "spring", bounce: 0.4 }}
               className="relative z-10 p-4"
             >
               {/* Squircle shaped image */}
               <div style={{ clipPath: 'polygon(10% 0, 90% 0, 100% 10%, 100% 90%, 90% 100%, 10% 100%, 0 90%, 0 10%)' }} className="rounded-[4rem] overflow-hidden shadow-2xl border-8 border-white">
                 <img 
                   src={(business?.images as any[])?.[0] || 'https://images.unsplash.com/photo-1587691592099-24045742c181?q=80&w=2946&auto=format&fit=crop'} 
                   alt="Mutlu Çocuklar" 
                   className="w-full h-[500px] object-cover"
                 />
               </div>
               
               <div className="absolute top-10 -left-6 bg-white p-4 rounded-3xl shadow-xl flex items-center gap-3 animate-bounce">
                 <Heart className="w-8 h-8 text-[#FFB7B2] fill-current" />
                 <span className="font-bold text-[#2D3748]">%100 Sevgi</span>
               </div>
             </motion.div>
          </div>
        </div>
      </div>
    </section>
  )
}
registerSection('hero', 'kres_bespoke_hero', KresBespokeHero as unknown as ComponentType<SectionProps<Record<string, unknown>>>)

// ── 2. Kres Activities ──
export function KresBespokeServices({ business, content }: SectionProps<any>) {
  const activities = business?.services?.length ? business.services : [
    { title: 'Sanat & Beceri', desc: 'Parmak boyasından seramiğe, ince motor becerilerini geliştiren yaratıcı atölyeler.', icon: <Palette />, color: '#FFB7B2' },
    { title: 'Müzik & Ritim', desc: 'Enstrüman tanıma ve ritim duygusunu pekiştiren eğlenceli müzik saatleri.', icon: <Music />, color: '#B5EAD7' },
    { title: 'Oyun & Zeka', desc: 'Problem çözme yeteneğini artıran akıl oyunları ve takım çalışmaları.', icon: <Puzzle />, color: '#C7CEEA' },
  ];

  return (
    <section className="py-24 md:py-32 bg-white text-[#2D3748]">
      <div className="max-w-[var(--container-default)] mx-auto px-6 md:px-12">
        <div className="text-center max-w-2xl mx-auto mb-20">
          <Star className="w-12 h-12 text-[#FFDAC1] fill-current mx-auto mb-4" />
          <h2 className="text-4xl md:text-5xl font-bold mb-6 text-[#2D3748]" style={{ fontFamily: 'var(--font-heading)' }}>
            {content?.title || 'Eğlenceli Etkinliklerimiz'}
          </h2>
          <p className="text-[#718096] text-lg font-medium">Çoklu zeka kuramına dayalı, çocuk merkezli modern eğitim anlayışımızla her gün yeni bir macera!</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
          {activities.map((activity: any, i: number) => (
            <motion.div 
              key={i}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: i * 0.15, type: "spring", bounce: 0.4 }}
              className="bg-white rounded-[3rem] p-10 shadow-xl shadow-zinc-100 border-2 border-transparent hover:border-zinc-100 transition-all group text-center hover:-translate-y-2"
            >
              <div 
                className="w-24 h-24 mx-auto rounded-full flex items-center justify-center text-white mb-8 shadow-inner"
                style={{ backgroundColor: activity.color }}
              >
                {React.cloneElement(activity.icon as any, { className: "w-10 h-10" })}
              </div>
              <h3 className="text-2xl font-bold mb-4 text-[#2D3748]">{activity.title}</h3>
              <p className="text-[#718096] font-medium leading-relaxed">{activity.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
registerSection('services', 'kres_bespoke_services', KresBespokeServices as unknown as ComponentType<SectionProps<Record<string, unknown>>>)

// ── 3. Kres About / Safety ──
export function KresBespokeAbout({ business, content }: SectionProps<any>) {
  return (
    <section className="py-24 md:py-32 bg-[#E2F0CB] text-[#2D3748] rounded-[4rem] md:rounded-[8rem] mx-4 md:mx-8 my-8 relative overflow-hidden">
      <div className="max-w-[var(--container-default)] mx-auto px-6 md:px-12 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <div className="relative">
            <img 
              src="https://images.unsplash.com/photo-1503454537195-1dcabb73ffb9?q=80&w=2936&auto=format&fit=crop" 
              alt="Safe Environment" 
              className="w-full aspect-square object-cover rounded-[4rem] border-8 border-white shadow-2xl rotate-3 hover:rotate-0 transition-transform duration-500"
            />
          </div>
          
          <div>
            <h2 className="text-4xl md:text-5xl font-bold mb-8 leading-tight text-[#2D3748]" style={{ fontFamily: 'var(--font-heading)' }}>
              {content?.title || 'Eviniz Kadar Güvenli, Park Kadar Eğlenceli.'}
            </h2>
            <div className="space-y-6 text-[#4A5568] font-medium leading-relaxed text-lg">
              <p>
                {(business?.description as string) || 'Çocuklarımızın fiziksel ve duygusal güvenliği bizim için her şeyden önce gelir. Keskin köşeleri olmayan mobilyalar, yumuşak zeminler ve pedagog onaylı oyuncaklar...'}
              </p>
              <p>
                Beslenmemizde sadece organik sertifikalı gıdalar kullanıyor, tüm yemeklerimizi diyetisyen kontrolünde kendi mutfağımızda hazırlıyoruz.
              </p>
            </div>
            
            <div className="mt-10 grid grid-cols-2 gap-6">
              <div className="bg-white/60 backdrop-blur rounded-[2rem] p-6 text-center">
                 <div className="text-3xl font-black text-[#F28B82] mb-1">0-6</div>
                 <div className="text-sm font-bold text-[#4A5568]">Yaş Grubu</div>
              </div>
              <div className="bg-white/60 backdrop-blur rounded-[2rem] p-6 text-center">
                 <div className="text-3xl font-black text-[#F28B82] mb-1">%100</div>
                 <div className="text-sm font-bold text-[#4A5568]">Organik Beslenme</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
registerSection('about', 'kres_bespoke_about', KresBespokeAbout as unknown as ComponentType<SectionProps<Record<string, unknown>>>)

// ── 4. Kres Contact ──
export function KresBespokeContact({ business, content }: SectionProps<any>) {
  return (
    <section className="bg-white text-[#2D3748] py-24 md:py-32">
      <div className="max-w-[var(--container-default)] mx-auto px-6 md:px-12">
        <div className="bg-[#FFFBF0] rounded-[4rem] p-10 md:p-16 shadow-lg border-2 border-[#FFDAC1] relative">
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 relative z-10">
            <div>
              <h2 className="text-4xl md:text-5xl font-bold mb-6 text-[#2D3748]" style={{ fontFamily: 'var(--font-heading)' }}>Tanışmaya Gelin!</h2>
              <p className="text-[#718096] font-medium mb-12 text-lg">Bir çayımızı içmek ve sıcak ortamımızı kendi gözlerinizle görmek için sizi okulumuza bekliyoruz.</p>
              
              <div className="space-y-8 bg-white p-8 rounded-[2rem] shadow-sm">
                <div>
                  <h4 className="font-bold text-[#2D3748] text-lg mb-2">Adresimiz</h4>
                  <p className="text-[#718096] font-medium">{business?.address || 'Ihlamur Sokak, Neşe Mah. No:5\nBeşiktaş, İstanbul'}</p>
                </div>
                <div>
                  <h4 className="font-bold text-[#2D3748] text-lg mb-2">Bize Ulaşın</h4>
                  <p className="text-[#718096] font-medium">{business?.phone || '+90 212 555 55 55'}<br/>merhaba@kresbespoke.com</p>
                </div>
              </div>
            </div>
            
            <form className="bg-white p-8 md:p-10 rounded-[3rem] shadow-xl shadow-[#FFB7B2]/10 border border-zinc-100">
              <h3 className="text-2xl font-bold mb-8 text-center text-[#2D3748]">Ön Kayıt / Bilgi Formu</h3>
              <div className="space-y-5">
                <div>
                  <input type="text" placeholder="Velinin Adı Soyadı" className="w-full bg-[#FAFAFA] border-2 border-[#E2E8F0] rounded-[1.5rem] px-6 py-4 focus:outline-none focus:border-[#FFB7B2] font-medium transition-colors" />
                </div>
                <div>
                  <input type="tel" placeholder="Telefon Numarası" className="w-full bg-[#FAFAFA] border-2 border-[#E2E8F0] rounded-[1.5rem] px-6 py-4 focus:outline-none focus:border-[#FFB7B2] font-medium transition-colors" />
                </div>
                <div>
                  <input type="text" placeholder="Çocuğun Yaşı" className="w-full bg-[#FAFAFA] border-2 border-[#E2E8F0] rounded-[1.5rem] px-6 py-4 focus:outline-none focus:border-[#FFB7B2] font-medium transition-colors" />
                </div>
                <button className="w-full bg-[#FFB7B2] text-[#2D3748] font-bold py-4 rounded-[1.5rem] hover:bg-[#F28B82] transition-colors text-lg mt-4 shadow-md">
                  Gönder
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </section>
  )
}
registerSection('contact', 'kres_bespoke_contact', KresBespokeContact as unknown as ComponentType<SectionProps<Record<string, unknown>>>)
