import React from 'react'
import { motion } from 'framer-motion'
import { Clock, Disc, Circle, Sun, Wind, CheckCircle2, ChevronRight, Phone, MapPin, Mail } from 'lucide-react'
import type { ComponentType, ReactNode } from 'react';
import { SectionProps } from '../../types/section-types'
import { registerSection } from '../../registry/section-registry'

// --- OTO HIZLI SECTIONS ---

export const OtoHizliHero = ({ business, content }: SectionProps<any>) => {
  return (
    <section className="relative flex items-center min-h-[85vh] bg-[var(--color-bg)] py-20 overflow-hidden">
      <div className="absolute top-0 right-0 w-1/2 h-full bg-[var(--color-surface)] transform skew-x-[-15deg] translate-x-20 origin-bottom z-0" />
      <div className="container px-4 relative z-10">
        <div className="max-w-3xl">
          <motion.div initial={{ opacity:0, y:40 }} animate={{ opacity:1, y:0 }} transition={{ duration: 0.6 }} className="inline-block px-4 py-1.5 bg-[var(--color-accent-subtle)] text-[var(--color-accent)] font-bold rounded-full text-sm tracking-wider uppercase mb-6">
            {content?.badge || 'HIZLI SERVIS'}
          </motion.div>
          <motion.h1 initial={{ opacity:0, y:40 }} animate={{ opacity:1, y:0 }} transition={{ duration: 0.6, delay: 0.1 }} className="text-5xl md:text-7xl font-extrabold text-[var(--color-text)] mb-6 leading-[1.1] tracking-tight" style={{ fontFamily: 'var(--font-heading)' }}>
            {content?.title || business?.name}
          </motion.h1>
          <motion.p initial={{ opacity:0, y:40 }} animate={{ opacity:1, y:0 }} transition={{ duration: 0.6, delay: 0.2 }} className="text-xl md:text-2xl text-[var(--color-text-secondary)] font-medium mb-10 max-w-2xl">
            {content?.subtitle || business?.slogan}
          </motion.p>
          <motion.div initial={{ opacity:0, y:40 }} animate={{ opacity:1, y:0 }} transition={{ duration: 0.6, delay: 0.3 }} className="flex flex-col sm:flex-row gap-4">
            <a href={content?.cta1?.href || '#iletisim'} className="flex items-center justify-center gap-2 px-8 py-4 bg-[var(--color-accent)] text-[var(--color-text-on-accent)] font-bold rounded-xl text-lg hover:bg-[var(--color-accent-hover)] transition-all shadow-lg hover:-translate-y-1">
              {content?.cta1?.text || 'Randevu Al'} <ChevronRight className="w-5 h-5"/>
            </a>
            <a href="#hizmetler" className="flex items-center justify-center px-8 py-4 bg-transparent border-2 border-[var(--color-border)] text-[var(--color-text)] font-bold rounded-xl text-lg hover:border-[var(--color-accent)] hover:text-[var(--color-accent)] transition-all">
              Hizmetleri İncele
            </a>
          </motion.div>
        </div>
      </div>
    </section>
  )
}

export const OtoHizliAbout = ({ business, content }: SectionProps<any>) => {
  return (
    <section className="py-24 bg-[var(--color-surface)]">
      <div className="container px-4">
        <div className="flex flex-col md:flex-row gap-16 items-center">
          <motion.div initial={{ opacity:0, x:-40 }} whileInView={{ opacity:1, x:0 }} transition={{ duration: 0.6 }} viewport={{ once:true }} className="w-full md:w-1/2">
            <div className="rounded-[2rem] overflow-hidden relative shadow-2xl border-4 border-white transform -rotate-3 hover:rotate-0 transition-transform duration-500">
              <img src="/placeholder.jpg" alt={(business as any)?.name as string} className="w-full h-auto" />
              <div className="absolute inset-0 bg-gradient-to-tr from-[var(--color-accent)]/80 to-transparent mix-blend-overlay" />
            </div>
          </motion.div>
          <motion.div initial={{ opacity:0, x:40 }} whileInView={{ opacity:1, x:0 }} transition={{ duration: 0.6, delay: 0.2 }} viewport={{ once:true }} className="w-full md:w-1/2">
            <span className="text-[var(--color-accent)] font-bold uppercase tracking-widest text-sm mb-4 block">{content?.badge || 'HAKKIMIZDA'}</span>
            <h2 className="text-4xl md:text-5xl font-extrabold text-[var(--color-text)] mb-6" style={{ fontFamily: 'var(--font-heading)' }}>{content?.title || 'Biz Kimiz?'}</h2>
            <p className="text-lg text-[var(--color-text-secondary)] font-medium leading-relaxed mb-8">{(content as any)?.description as string}</p>
            <div className="space-y-4">
              <div className="flex items-start gap-4 p-4 bg-[var(--color-bg)] rounded-xl border border-[var(--color-border-subtle)] shadow-sm">
                <CheckCircle2 className="w-6 h-6 text-[var(--color-accent)] flex-shrink-0" />
                <div><h4 className="font-bold text-[var(--color-text)]">Hızlı Müdahale</h4><p className="text-sm text-[var(--color-text-secondary)] mt-1">Sıra beklemeden, zamanında teslim.</p></div>
              </div>
              <div className="flex items-start gap-4 p-4 bg-[var(--color-bg)] rounded-xl border border-[var(--color-border-subtle)] shadow-sm">
                <CheckCircle2 className="w-6 h-6 text-[var(--color-accent)] flex-shrink-0" />
                <div><h4 className="font-bold text-[var(--color-text)]">Uzman Ekip</h4><p className="text-sm text-[var(--color-text-secondary)] mt-1">{(business as any)?.experience as string} tecrübe ile garantili hizmet.</p></div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}

export const OtoHizliStats = ({ content }: SectionProps<any>) => {
  const stats = content?.stats || [{ value:'7+', label:'Yıl' }, { value:'780+', label:'Araç' }, { value:'4.7', label:'Puan' }]
  return (
    <section className="py-20 bg-[var(--color-bg)]">
      <div className="container px-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {stats.map((s: any, i: number) => (
            <motion.div key={i} initial={{ opacity:0, scale:0.9 }} whileInView={{ opacity:1, scale:1 }} transition={{ delay: i*0.1 }} viewport={{ once:true }} className="bg-[var(--color-surface)] p-10 rounded-2xl text-center border-b-4 border-[var(--color-accent)] shadow-sm">
              <div className="text-5xl md:text-6xl font-black text-[var(--color-text)] mb-2" style={{ fontFamily: 'var(--font-heading)' }}>{s.value}</div>
              <div className="text-sm font-bold text-[var(--color-text-secondary)] uppercase tracking-wider">{s.label}</div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}

export const OtoHizliGallery = ({ content }: SectionProps<any>) => {
  return (
    <section className="py-24 bg-[var(--color-surface)]">
      <div className="container px-4">
        <div className="flex flex-col md:flex-row justify-between items-end mb-12 gap-6">
          <div className="max-w-2xl">
            <span className="text-[var(--color-accent)] font-bold uppercase tracking-widest text-sm mb-4 block">{content?.badge || 'GALERİ'}</span>
            <h2 className="text-4xl md:text-5xl font-extrabold text-[var(--color-text)]" style={{ fontFamily: 'var(--font-heading)' }}>{content?.title || 'Atölyemiz'}</h2>
          </div>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {[1,2,3,4].map((item: any, index: number) => (
            <motion.div key={index} initial={{ opacity:0, scale:0.95 }} whileInView={{ opacity:1, scale:1 }} transition={{ delay: index*0.1 }} viewport={{ once:true }} className={`rounded-xl overflow-hidden shadow-sm relative group ${index === 0 ? 'col-span-2 row-span-2' : ''}`}>
              <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity z-10"/>
              <img src="/placeholder.jpg" alt={`Galeri ${item}`} className="w-full h-full min-h-[200px] object-cover" />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}

export const OtoHizliServices = ({ business, content }: SectionProps<any>) => {
  const getIcon = (name: string) => {
    switch (name) {
      case 'clock': return <Clock className="w-6 h-6"/>
      case 'circle': return <Circle className="w-6 h-6"/>
      case 'disc': return <Disc className="w-6 h-6"/>
      case 'sun': return <Sun className="w-6 h-6"/>
      case 'wind': return <Wind className="w-6 h-6"/>
      default: return <Clock className="w-6 h-6"/>
    }
  }

  return (
    <section className="py-24 bg-[var(--color-bg)]">
      <div className="container px-4">
        <div className="text-center mb-16">
          <span className="text-[var(--color-accent)] font-bold uppercase tracking-widest text-sm mb-4 block">{content?.badge || 'HİZMETLER'}</span>
          <h2 className="text-4xl md:text-5xl font-extrabold text-[var(--color-text)]" style={{ fontFamily: 'var(--font-heading)' }}>{content?.title || 'Çözümlerimiz'}</h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {business?.services?.map((svc: any, i: number) => (
            <motion.div key={i} initial={{ opacity:0, y:20 }} whileInView={{ opacity:1, y:0 }} transition={{ delay: i*0.1 }} viewport={{ once:true }} className="bg-[var(--color-surface)] p-8 rounded-2xl relative overflow-hidden group hover:shadow-xl transition-all border border-transparent hover:border-[var(--color-accent)]">
              {svc.popular && (
                <div className="absolute top-0 right-0 bg-[var(--color-accent)] text-white text-xs font-bold px-3 py-1 rounded-bl-lg uppercase">
                  Popüler
                </div>
              )}
              <div className="w-14 h-14 bg-[var(--color-bg)] rounded-xl flex items-center justify-center text-[var(--color-accent)] mb-6 shadow-sm group-hover:bg-[var(--color-accent)] group-hover:text-white transition-colors">
                {getIcon(svc.icon || '')}
              </div>
              <h3 className="text-2xl font-bold mb-3 text-[var(--color-text)]" style={{ fontFamily:'var(--font-heading)' }}>{svc.name}</h3>
              <p className="text-[var(--color-text-secondary)] mb-6 font-medium text-sm">{svc.description}</p>
              <div className="flex items-center justify-between border-t border-[var(--color-border)] pt-5">
                <span className="text-2xl font-black text-[var(--color-text)]">{svc.price}</span>
                <span className="px-3 py-1 bg-[var(--color-accent-subtle)] text-[var(--color-accent)] text-xs font-bold rounded-full uppercase">{svc.duration}</span>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}

export const OtoHizliContact = ({ business, content }: SectionProps<any>) => {
  return (
    <section className="py-24 bg-[var(--color-surface)] relative overflow-hidden">
      <div className="absolute inset-0 bg-[var(--color-accent)] w-full lg:w-1/3 opacity-10 lg:opacity-5 skew-x-[-15deg] origin-top-left z-0"/>
      <div className="container px-4 relative z-10 max-w-6xl">
        <div className="grid lg:grid-cols-2 gap-16">
          <div>
            <span className="text-[var(--color-accent)] font-bold uppercase tracking-widest text-sm mb-4 block">{content?.badge || 'İLETİŞİM'}</span>
            <h2 className="text-4xl md:text-5xl font-extrabold text-[var(--color-text)] mb-8" style={{ fontFamily: 'var(--font-heading)' }}>{content?.title || 'Bize Ulaşın'}</h2>
            
            <div className="space-y-8 mt-12">
              <div className="flex items-center gap-6">
                <div className="w-16 h-16 bg-[var(--color-bg)] shadow-md rounded-2xl flex items-center justify-center text-[var(--color-accent)] flex-shrink-0">
                  <MapPin className="w-7 h-7" />
                </div>
                <div>
                  <h4 className="text-sm font-bold text-[var(--color-text-secondary)] uppercase tracking-wider mb-1">Adres</h4>
                  <p className="text-lg font-bold text-[var(--color-text)]">{(business as any)?.address as string}</p>
                </div>
              </div>
              <div className="flex items-center gap-6">
                <div className="w-16 h-16 bg-[var(--color-bg)] shadow-md rounded-2xl flex items-center justify-center text-[var(--color-accent)] flex-shrink-0">
                  <Phone className="w-7 h-7" />
                </div>
                <div>
                  <h4 className="text-sm font-bold text-[var(--color-text-secondary)] uppercase tracking-wider mb-1">Telefon</h4>
                  <p className="text-lg font-bold text-[var(--color-text)]">{(business as any)?.phone as string}</p>
                </div>
              </div>
              <div className="flex items-center gap-6">
                <div className="w-16 h-16 bg-[var(--color-bg)] shadow-md rounded-2xl flex items-center justify-center text-[var(--color-accent)] flex-shrink-0">
                  <Mail className="w-7 h-7" />
                </div>
                <div>
                  <h4 className="text-sm font-bold text-[var(--color-text-secondary)] uppercase tracking-wider mb-1">E-Posta</h4>
                  <p className="text-lg font-bold text-[var(--color-text)]">{(business as any)?.email as string}</p>
                </div>
              </div>
            </div>
          </div>
          
          <div className="bg-[var(--color-bg)] p-10 rounded-3xl shadow-xl border border-[var(--color-border-subtle)]">
            <form className="space-y-6">
              <div className="grid sm:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="text-sm font-bold text-[var(--color-text)]">Ad Soyad</label>
                  <input type="text" className="w-full border-2 border-[var(--color-border-subtle)] bg-[var(--color-surface)] rounded-xl px-4 py-3 outline-none focus:border-[var(--color-accent)] focus:bg-[var(--color-bg)] transition-all font-medium" placeholder="Adınız Soyadınız" />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-bold text-[var(--color-text)]">Telefon</label>
                  <input type="tel" className="w-full border-2 border-[var(--color-border-subtle)] bg-[var(--color-surface)] rounded-xl px-4 py-3 outline-none focus:border-[var(--color-accent)] focus:bg-[var(--color-bg)] transition-all font-medium" placeholder="05XX XXX XX XX" />
                </div>
              </div>
              <div className="space-y-2">
                <label className="text-sm font-bold text-[var(--color-text)]">Mesajınız</label>
                <textarea rows={4} className="w-full border-2 border-[var(--color-border-subtle)] bg-[var(--color-surface)] rounded-xl px-4 py-3 outline-none focus:border-[var(--color-accent)] focus:bg-[var(--color-bg)] transition-all font-medium" placeholder="Nasıl yardımcı olabiliriz?"></textarea>
              </div>
              <button className="w-full py-4 bg-[var(--color-accent)] text-white font-bold text-lg rounded-xl shadow-lg hover:shadow-xl hover:bg-[var(--color-accent-hover)] transition-all">
                Randevu Talebi Gönder
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  )
}

// Registry
registerSection('hero', 'split_image', OtoHizliHero as unknown as ComponentType<SectionProps<Record<string, unknown>>>)
registerSection('about', 'split_left', OtoHizliAbout as unknown as ComponentType<SectionProps<Record<string, unknown>>>)
registerSection('stats', 'animated_row', OtoHizliStats as unknown as ComponentType<SectionProps<Record<string, unknown>>>)
registerSection('gallery', 'masonry', OtoHizliGallery as unknown as ComponentType<SectionProps<Record<string, unknown>>>)
registerSection('services', 'oto_services', OtoHizliServices as unknown as ComponentType<SectionProps<Record<string, unknown>>>)
registerSection('contact', 'detailed_form', OtoHizliContact as unknown as ComponentType<SectionProps<Record<string, unknown>>>)
