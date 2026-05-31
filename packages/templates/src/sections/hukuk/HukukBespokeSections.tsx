'use client'

import React, { ComponentType } from 'react'
import { motion } from 'framer-motion'
import { Scale, BookOpen, Shield, ChevronRight, PhoneCall } from 'lucide-react'
import { registerSection, type SectionProps } from '../../registry/section-registry'

// ── 1. Hukuk Prestige Hero ──
export function HukukBespokeHero({ business, content }: SectionProps<any>) {
  return (
    <section className="relative min-h-screen bg-[#0F172A] text-white flex items-center pt-24 pb-12 overflow-hidden border-b-8 border-[#94A3B8]">
      <div className="absolute inset-0 z-0 opacity-20">
        <img 
          src={(business?.images as any[])?.[0] || 'https://images.unsplash.com/photo-1589829085413-56de8ae18c73?q=80&w=2940&auto=format&fit=crop'} 
          alt="Hukuk Bürosu" 
          className="w-full h-full object-cover mix-blend-overlay" 
        />
        <div className="absolute inset-0 bg-gradient-to-r from-[#0F172A] via-[#0F172A]/80 to-transparent" />
      </div>

      <div className="relative z-10 w-full max-w-[var(--container-default)] mx-auto px-6 md:px-12">
        <div className="max-w-3xl">
          <motion.div 
            initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 1 }}
            className="flex items-center gap-3 mb-8"
          >
            <Scale className="w-6 h-6 text-[#CBD5E1]" />
            <div className="h-[1px] w-12 bg-[#CBD5E1]" />
            <span className="text-[#CBD5E1] uppercase tracking-[0.2em] text-sm font-semibold">
              {content?.badge || 'GÜVENİLİR HUKUKİ DANIŞMANLIK'}
            </span>
          </motion.div>

          <motion.h1 
            initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 1, delay: 0.2 }}
            className="text-5xl md:text-7xl font-normal leading-[1.1] mb-8 text-[#F8FAFC]"
            style={{ fontFamily: 'var(--font-heading)' }}
          >
            {content?.title || business?.name || 'Haklarınızı\nKoruma Altına Alıyoruz.'}
          </motion.h1>

          <motion.p 
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 1, delay: 0.4 }}
            className="text-xl text-[#94A3B8] font-light leading-relaxed mb-12 max-w-2xl"
          >
            {content?.description || (business?.description as string) || 'Uzman avukat kadromuzla kurumsal ve bireysel davalarınızda şeffaf, sonuç odaklı ve etik değerlere bağlı profesyonel hukuki çözüm ortaklığı sunuyoruz.'}
          </motion.p>
          
          <motion.div 
            initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 1, delay: 0.6 }}
            className="flex flex-wrap gap-6"
          >
            <button className="bg-[#1E293B] text-white border border-[#334155] px-10 py-4 font-semibold uppercase tracking-wider hover:bg-[#F8FAFC] hover:text-[#0F172A] transition-all duration-300 shadow-xl">
              Hukuki Danışmanlık Alın
            </button>
            <button className="flex items-center gap-2 text-[#CBD5E1] hover:text-white transition-colors px-6 py-4 font-semibold uppercase tracking-wider">
              Çalışma Alanlarımız <ChevronRight className="w-5 h-5" />
            </button>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
registerSection('hero', 'hukuk_bespoke_hero', HukukBespokeHero as unknown as ComponentType<SectionProps<Record<string, unknown>>>)

// ── 2. Hukuk Practice Areas ──
export function HukukBespokeServices({ business, content }: SectionProps<any>) {
  const practices = business?.services?.length ? business.services : [
    { title: 'Ticaret ve Şirketler Hukuku', desc: 'Şirket kuruluşları, birleşme ve devralmalar, ticari uyuşmazlıklar ve sözleşme yönetimi.', icon: <BookOpen /> },
    { title: 'Ceza Hukuku', desc: 'Soruşturma ve kovuşturma aşamalarında şüpheli, sanık veya müşteki vekilliği.', icon: <Shield /> },
    { title: 'İş Hukuku', desc: 'İşe iade davaları, kıdem ve ihbar tazminatları, işçi-işveren uyuşmazlıkları.', icon: <Scale /> },
  ];

  return (
    <section className="py-24 md:py-32 bg-[#F8FAFC] text-[#0F172A]">
      <div className="max-w-[var(--container-default)] mx-auto px-6 md:px-12">
        <div className="text-center max-w-3xl mx-auto mb-20">
          <h2 className="text-4xl md:text-5xl font-normal mb-6" style={{ fontFamily: 'var(--font-heading)' }}>
            {content?.title || 'Çalışma Alanlarımız'}
          </h2>
          <div className="w-16 h-1 bg-[#94A3B8] mx-auto mb-6" />
          <p className="text-[#64748B] text-lg font-light leading-relaxed">Geniş hukuki bilgi birikimimiz ve sektör deneyimimizle, müvekkillerimizin ihtiyaç duyduğu her alanda yanlarındayız.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {practices.map((practice: any, i: number) => (
            <motion.div 
              key={i}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: i * 0.1 }}
              className="bg-white p-12 border-t-4 border-[#1E293B] shadow-sm hover:shadow-xl transition-shadow group cursor-pointer"
            >
              <div className="w-14 h-14 bg-[#F1F5F9] rounded flex items-center justify-center text-[#334155] mb-8 group-hover:bg-[#1E293B] group-hover:text-white transition-colors">
                {practice.icon || <Scale />}
              </div>
              <h3 className="text-2xl font-normal mb-4" style={{ fontFamily: 'var(--font-heading)' }}>{practice.title}</h3>
              <p className="text-[#64748B] font-light leading-relaxed mb-8">{practice.desc}</p>
              <div className="text-[#0F172A] font-semibold text-sm uppercase tracking-widest flex items-center gap-2 group-hover:gap-4 transition-all">
                Detaylar <ChevronRight className="w-4 h-4" />
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
registerSection('services', 'hukuk_bespoke_services', HukukBespokeServices as unknown as ComponentType<SectionProps<Record<string, unknown>>>)

// ── 3. Hukuk Trust & About ──
export function HukukBespokeAbout({ business, content }: SectionProps<any>) {
  return (
    <section className="py-24 md:py-32 bg-white text-[#0F172A] border-y border-[#E2E8F0]">
      <div className="max-w-[var(--container-default)] mx-auto px-6 md:px-12">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
          <div className="relative">
            <div className="aspect-[3/4] bg-[#F1F5F9] p-4">
              <img 
                src="https://images.unsplash.com/photo-1505664177922-9818ab9380f5?q=80&w=2874&auto=format&fit=crop" 
                alt="Adalet Sarayı" 
                className="w-full h-full object-cover grayscale opacity-90"
              />
            </div>
            <div className="absolute -bottom-8 -right-8 bg-[#0F172A] text-white p-10 max-w-xs shadow-2xl">
              <div className="text-4xl font-normal mb-2" style={{ fontFamily: 'var(--font-heading)' }}>1995'ten Beri</div>
              <div className="w-10 h-[1px] bg-[#94A3B8] mb-4" />
              <p className="text-[#94A3B8] font-light text-sm">Köklü geçmişimizle adaletin tecellisi için çalışıyoruz.</p>
            </div>
          </div>
          
          <div>
            <h2 className="text-4xl md:text-5xl font-normal mb-8" style={{ fontFamily: 'var(--font-heading)' }}>
              {content?.title || 'Adaletin Peşinde, Müvekkilimizin Yanında.'}
            </h2>
            <div className="space-y-6 text-[#64748B] font-light leading-relaxed text-lg">
              <p>
                {(business?.description as string) || 'Hukuk büromuz, karmaşık hukuki meseleleri sadeleştirerek müvekkillerine net ve ulaşılabilir çözümler sunmayı ilke edinmiştir. Gizlilik ve mesleki etik kurallarına tavizsiz bağlılığımız en büyük gurur kaynağımızdır.'}
              </p>
              <p>
                Sadece dava aşamasında değil, olası uyuşmazlıkları önleyici hukuki danışmanlık hizmetlerimizle de kurumsal firmaların ve bireylerin yanındayız.
              </p>
            </div>
            
            <div className="mt-12 flex flex-col gap-4">
              <div className="flex items-center gap-4 p-6 bg-[#F8FAFC] border border-[#E2E8F0]">
                 <Shield className="w-8 h-8 text-[#334155]" />
                 <div>
                   <h4 className="font-semibold text-[#0F172A]">Mutlak Gizlilik İlkemiz</h4>
                   <p className="text-[#64748B] text-sm">Müvekkil bilgileriniz katı protokollerle korunmaktadır.</p>
                 </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
registerSection('about', 'hukuk_bespoke_about', HukukBespokeAbout as unknown as ComponentType<SectionProps<Record<string, unknown>>>)

// ── 4. Hukuk Contact ──
export function HukukBespokeContact({ business, content }: SectionProps<any>) {
  return (
    <section className="bg-[#0F172A] text-white py-32 relative">
      {/* Subtle texture */}
      <div className="absolute inset-0 opacity-5" style={{ backgroundImage: 'url("data:image/svg+xml,%3Csvg width=\'60\' height=\'60\' viewBox=\'0 0 60 60\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cg fill=\'none\' fill-rule=\'evenodd\'%3E%3Cg fill=\'#ffffff\' fill-opacity=\'1\'%3E%3Cpath d=\'M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z\'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")' }} />
      
      <div className="max-w-[var(--container-default)] mx-auto px-6 md:px-12 relative z-10">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-normal mb-6" style={{ fontFamily: 'var(--font-heading)' }}>Hukuki Destek Talep Edin</h2>
          <div className="w-16 h-1 bg-[#94A3B8] mx-auto mb-6" />
          <p className="text-[#94A3B8] font-light max-w-2xl mx-auto">Sorunlarınızı çözmek için ilk adımı atın. Ön görüşme talep formunu doldurarak uzman avukatlarımızın sizinle iletişime geçmesini sağlayın.</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
          <div className="lg:col-span-4 space-y-8">
            <div className="bg-[#1E293B] p-8 border-l-2 border-[#CBD5E1]">
              <div className="text-[#94A3B8] text-sm uppercase tracking-widest font-semibold mb-2">Merkez Ofis</div>
              <div className="font-light leading-relaxed">{business?.address || 'Levent Mah. Adliye Sok. No:1\nBeşiktaş, İstanbul'}</div>
            </div>
            
            <div className="bg-[#1E293B] p-8 border-l-2 border-[#CBD5E1]">
              <div className="text-[#94A3B8] text-sm uppercase tracking-widest font-semibold mb-2">İletişim</div>
              <div className="text-2xl font-light mb-1">{business?.phone || '+90 212 123 45 67'}</div>
              <div className="font-light text-[#94A3B8]">info@hukukbespoke.com</div>
            </div>
            
            <div className="bg-[#1E293B] p-8 border-l-2 border-[#CBD5E1]">
              <div className="text-[#94A3B8] text-sm uppercase tracking-widest font-semibold mb-2">Çalışma Saatleri</div>
              <div className="font-light">Hafta İçi: 09:00 - 18:00<br/>Hafta Sonu: Kapalı</div>
            </div>
          </div>
          
          <div className="lg:col-span-8">
            <form className="bg-white p-10 md:p-14 text-[#0F172A] shadow-2xl">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
                <div>
                  <label className="block text-sm font-semibold uppercase tracking-wider text-[#64748B] mb-3">Adınız Soyadınız</label>
                  <input type="text" className="w-full bg-[#F8FAFC] border border-[#E2E8F0] px-4 py-4 focus:outline-none focus:border-[#0F172A] transition-colors" />
                </div>
                <div>
                  <label className="block text-sm font-semibold uppercase tracking-wider text-[#64748B] mb-3">Telefon Numaranız</label>
                  <input type="tel" className="w-full bg-[#F8FAFC] border border-[#E2E8F0] px-4 py-4 focus:outline-none focus:border-[#0F172A] transition-colors" />
                </div>
              </div>
              <div className="mb-8">
                <label className="block text-sm font-semibold uppercase tracking-wider text-[#64748B] mb-3">Konu Başlığı</label>
                <input type="text" className="w-full bg-[#F8FAFC] border border-[#E2E8F0] px-4 py-4 focus:outline-none focus:border-[#0F172A] transition-colors" />
              </div>
              <div className="mb-10">
                <label className="block text-sm font-semibold uppercase tracking-wider text-[#64748B] mb-3">Mesajınız / Özeti</label>
                <textarea rows={5} className="w-full bg-[#F8FAFC] border border-[#E2E8F0] px-4 py-4 focus:outline-none focus:border-[#0F172A] transition-colors resize-none" placeholder="Lütfen detayları gizli tutarak genel bir özet yazınız." />
              </div>
              <button className="w-full bg-[#0F172A] text-white font-semibold uppercase tracking-widest py-5 hover:bg-[#1E293B] transition-colors flex items-center justify-center gap-3">
                <PhoneCall className="w-5 h-5" /> Randevu Talep Et
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  )
}
registerSection('contact', 'hukuk_bespoke_contact', HukukBespokeContact as unknown as ComponentType<SectionProps<Record<string, unknown>>>)
