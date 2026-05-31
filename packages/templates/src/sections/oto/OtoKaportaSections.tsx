import React from 'react'
import { motion } from 'framer-motion'
import { Hammer, Palette, Target, Sparkles, Brush, Check, MapPin, Phone, Mail, Clock } from 'lucide-react'
import type { ComponentType, ReactNode } from 'react';
import { SectionProps } from '../../types/section-types'
import { registerSection } from '../../registry/section-registry'

// --- OTO KAPORTA SECTIONS ---

export const OtoKaportaHero = ({ business, content }: SectionProps<any>) => {
  return (
    <section className="relative flex items-center min-h-[90vh] bg-[var(--color-bg)] py-20 text-[var(--color-text)] overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-[var(--color-surface)] to-[var(--color-bg)] z-0" />
      <div className="absolute inset-y-0 right-0 w-1/3 bg-[var(--color-accent-subtle)] rounded-l-full transform translate-x-1/2 opacity-50 z-0" />
      
      <div className="container px-4 relative z-10">
        <div className="flex flex-col lg:flex-row items-center gap-16">
          <motion.div initial={{ opacity:0, y:20 }} animate={{ opacity:1, y:0 }} transition={{ duration: 0.8 }} className="w-full lg:w-1/2">
            <span className="text-[var(--color-accent)] font-semibold tracking-[0.2em] text-sm uppercase mb-6 block border-l-2 border-[var(--color-accent)] pl-3">
              {content?.badge || 'BAĞCILAR'}
            </span>
            <h1 className="text-5xl md:text-7xl font-light mb-8 leading-[1.1]" style={{ fontFamily: 'var(--font-heading)' }}>
              {content?.title || business?.name}
            </h1>
            <p className="text-xl text-[var(--color-text-secondary)] font-light leading-relaxed mb-10 max-w-lg">
              {content?.subtitle || business?.slogan}
            </p>
            <div className="flex items-center gap-6">
              <a href={content?.cta1?.href || '#iletisim'} className="px-10 py-4 bg-[var(--color-accent)] text-[var(--color-text-on-accent)] font-medium tracking-wide hover:bg-[var(--color-accent-hover)] transition-all shadow-xl shadow-[var(--color-accent)]/20 rounded-[var(--radius-md)]">
                {content?.cta1?.text || 'Randevu Al'}
              </a>
              <div className="flex items-center gap-3 text-[var(--color-text-secondary)]">
                <div className="w-12 h-12 bg-[var(--color-surface-elevated)] rounded-full flex items-center justify-center shadow-sm">
                  <Clock className="w-5 h-5 text-[var(--color-accent)]"/>
                </div>
                <div className="text-sm">
                  <span className="block font-medium">Hızlı Hizmet</span>
                  <span className="opacity-70">Zamanında Teslim</span>
                </div>
              </div>
            </div>
          </motion.div>
          <motion.div initial={{ opacity:0, scale:0.95 }} animate={{ opacity:1, scale:1 }} transition={{ duration: 1 }} className="w-full lg:w-1/2">
            <div className="relative aspect-[4/5] md:aspect-square w-full max-w-md mx-auto">
              <div className="absolute inset-0 bg-[var(--color-accent)] rounded-t-[1000px] rounded-b-[var(--radius-lg)] transform translate-x-4 translate-y-4 opacity-20" />
              <img src="/placeholder.jpg" alt={(business as any)?.name as string} className="absolute inset-0 w-full h-full object-cover rounded-t-[1000px] rounded-b-[var(--radius-lg)] shadow-2xl" />
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}

export const OtoKaportaAbout = ({ business, content }: SectionProps<any>) => {
  return (
    <section className="py-24 bg-[var(--color-surface)]">
      <div className="container px-4">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          <motion.div initial={{ opacity:0, x:-20 }} whileInView={{ opacity:1, x:0 }} viewport={{ once:true }} transition={{ duration: 0.8 }} className="space-y-6">
            <div className="grid grid-cols-2 gap-4">
              <img src="/placeholder.jpg" alt="Atölye 1" className="w-full h-64 object-cover rounded-[var(--radius-md)] rounded-tl-[100px] shadow-lg" />
              <img src="/placeholder.jpg" alt="Atölye 2" className="w-full h-64 object-cover rounded-[var(--radius-md)] rounded-br-[100px] shadow-lg mt-8" />
            </div>
          </motion.div>
          <motion.div initial={{ opacity:0, x:20 }} whileInView={{ opacity:1, x:0 }} viewport={{ once:true }} transition={{ duration: 0.8 }} className="max-w-xl">
            <span className="text-[var(--color-accent)] font-semibold tracking-[0.2em] text-sm uppercase mb-4 block">{content?.badge || 'HAKKIMIZDA'}</span>
            <h2 className="text-4xl md:text-5xl font-light mb-8 text-[var(--color-text)]" style={{ fontFamily: 'var(--font-heading)' }}>{content?.title || 'Biz Kimiz?'}</h2>
            <p className="text-lg text-[var(--color-text-secondary)] font-light leading-relaxed mb-8 border-l-2 border-[var(--color-accent)] pl-6 cursor-default">
              {(content as any)?.description as string}
            </p>
            <ul className="space-y-4">
              {['Kusursuz işçilik ve garanti', 'Orijinal veya A kalite yedek parça tespiti', 'Sigorta şirketleriyle anlaşmalı süreç'].map((item: any, idx: number) => (
                <li key={idx} className="flex items-center gap-4 text-[var(--color-text)]">
                  <div className="w-8 h-8 rounded-full bg-[var(--color-accent-subtle)] flex items-center justify-center flex-shrink-0">
                    <Check className="w-4 h-4 text-[var(--color-accent)]" />
                  </div>
                  <span className="font-medium">{item}</span>
                </li>
              ))}
            </ul>
          </motion.div>
        </div>
      </div>
    </section>
  )
}

export const OtoKaportaStats = ({ content }: SectionProps<any>) => {
  const stats = content?.stats || [{ value:'21+', label:'Yıl' }, { value:'920+', label:'Araç' }, { value:'4.8', label:'Puan' }]
  return (
    <section className="py-24 bg-[var(--color-bg)]">
      <div className="container px-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 divide-y md:divide-y-0 md:divide-x divide-[var(--color-border)]">
          {stats.map((s: any, idx: number) => (
            <motion.div key={idx} initial={{ opacity:0, y:20 }} whileInView={{ opacity:1, y:0 }} transition={{ delay: idx*0.2, duration: 0.6 }} viewport={{ once:true }} className="text-center pt-8 md:pt-0">
              <div className="text-6xl text-[var(--color-accent)] mb-4 font-light" style={{ fontFamily: 'var(--font-heading)' }}>{s.value}</div>
              <div className="text-sm font-medium tracking-[0.2em] uppercase text-[var(--color-text-secondary)]">{s.label}</div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}

export const OtoKaportaGallery = ({ content }: SectionProps<any>) => {
  return (
    <section className="py-24 bg-[var(--color-surface)]">
      <div className="container px-4">
        <div className="text-center max-w-2xl mx-auto mb-16">
          <span className="text-[var(--color-accent)] font-semibold tracking-[0.2em] text-sm uppercase mb-4 block">{content?.badge || 'GALERİ'}</span>
          <h2 className="text-4xl md:text-5xl font-light text-[var(--color-text)]" style={{ fontFamily: 'var(--font-heading)' }}>{content?.title || 'Atölyemiz'}</h2>
        </div>
        <div className="columns-1 md:columns-2 lg:columns-3 gap-6 space-y-6">
          {[1,2,3,4,5,6].map((item: any, index: number) => (
            <motion.div key={index} initial={{ opacity:0 }} whileInView={{ opacity:1 }} transition={{ delay: index * 0.1, duration: 0.6 }} viewport={{ once:true }} className="break-inside-avoid relative group overflow-hidden rounded-[var(--radius-md)] shadow-sm">
              <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-500 z-10" />
              <img src={`/placeholder.jpg`} alt={`Galeri ${item}`} className="w-full auto object-cover block transform group-hover:scale-105 transition-transform duration-700" />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}

export const OtoKaportaServices = ({ business, content }: SectionProps<any>) => {
  const getIcon = (name: string) => {
    switch(name) {
      case 'hammer': return <Hammer className="w-8 h-8" strokeWidth={1.5} />
      case 'palette': return <Palette className="w-8 h-8" strokeWidth={1.5} />
      case 'target': return <Target className="w-8 h-8" strokeWidth={1.5} />
      case 'sparkles': return <Sparkles className="w-8 h-8" strokeWidth={1.5} />
      case 'brush': return <Brush className="w-8 h-8" strokeWidth={1.5} />
      default: return <Hammer className="w-8 h-8" strokeWidth={1.5} />
    }
  }

  return (
    <section className="py-24 bg-[var(--color-bg)]">
      <div className="container px-4">
        <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-6">
          <div className="max-w-2xl">
            <span className="text-[var(--color-accent)] font-semibold tracking-[0.2em] text-sm uppercase mb-4 block">{content?.badge || 'HİZMETLER'}</span>
            <h2 className="text-4xl md:text-5xl font-light text-[var(--color-text)]" style={{ fontFamily: 'var(--font-heading)' }}>{content?.title || 'Hizmetlerimiz'}</h2>
          </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {business?.services?.map((svc: any, i: number) => (
            <motion.div key={i} initial={{ opacity:0, y:20 }} whileInView={{ opacity:1, y:0 }} transition={{ delay: i*0.1, duration: 0.6 }} viewport={{ once:true }} className="bg-[var(--color-surface)] p-10 rounded-tr-[50px] rounded-bl-[50px] border hover:border-[var(--color-accent)] border-[var(--color-border-subtle)] shadow-sm hover:shadow-xl transition-all group relative overflow-hidden">
              <div className="absolute top-0 right-0 w-32 h-32 bg-[var(--color-accent-subtle)] rounded-full translate-x-1/2 -translate-y-1/2 group-hover:scale-150 transition-transform duration-700 ease-in-out z-0" />
              <div className="relative z-10">
                <div className="text-[var(--color-accent)] mb-8">
                  {getIcon(svc.icon || '')}
                </div>
                <h3 className="text-2xl font-light text-[var(--color-text)] mb-4" style={{ fontFamily: 'var(--font-heading)' }}>{svc.name}</h3>
                <p className="text-[var(--color-text-secondary)] font-light mb-8 h-12 leading-relaxed">{svc.description}</p>
                <div className="flex items-center justify-between border-t border-[var(--color-border)] pt-6">
                  <span className="text-xl font-medium text-[var(--color-text)]">{svc.price}</span>
                  <span className="text-xs uppercase tracking-widest text-[var(--color-text-secondary)]">{svc.duration}</span>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}

export const OtoKaportaContact = ({ business, content }: SectionProps<any>) => {
  return (
    <section className="py-24 bg-[var(--color-surface)]">
      <div className="container px-4">
        <div className="max-w-5xl mx-auto bg-[var(--color-bg)] shadow-2xl overflow-hidden flex flex-col md:flex-row border border-[var(--color-border)]">
          <div className="w-full md:w-5/12 p-12 lg:p-16 border-b md:border-b-0 md:border-r border-[var(--color-border)] flex flex-col justify-center">
            <span className="text-[var(--color-accent)] font-semibold tracking-[0.2em] text-sm uppercase mb-4 block">{content?.badge || 'İLETİŞİM'}</span>
            <h2 className="text-4xl font-light text-[var(--color-text)] mb-10" style={{ fontFamily: 'var(--font-heading)' }}>{content?.title || 'Bize Ulaşın'}</h2>
            
            <div className="space-y-8">
              <div className="flex items-start gap-5 group">
                <div className="mt-1 text-[var(--color-accent)] group-hover:-translate-y-1 transition-transform"><MapPin className="w-6 h-6" strokeWidth={1.5} /></div>
                <div><h4 className="text-xs uppercase tracking-widest text-[var(--color-text-secondary)] mb-2">Adres</h4><p className="text-[var(--color-text)] font-medium">{(business as any)?.address as string}</p></div>
              </div>
              <div className="flex items-start gap-5 group">
                <div className="mt-1 text-[var(--color-accent)] group-hover:-translate-y-1 transition-transform"><Phone className="w-6 h-6" strokeWidth={1.5} /></div>
                <div><h4 className="text-xs uppercase tracking-widest text-[var(--color-text-secondary)] mb-2">Telefon</h4><p className="text-[var(--color-text)] font-medium">{(business as any)?.phone as string}</p></div>
              </div>
              <div className="flex items-start gap-5 group">
                <div className="mt-1 text-[var(--color-accent)] group-hover:-translate-y-1 transition-transform"><Mail className="w-6 h-6" strokeWidth={1.5} /></div>
                <div><h4 className="text-xs uppercase tracking-widest text-[var(--color-text-secondary)] mb-2">E-Posta</h4><p className="text-[var(--color-text)] font-medium">{(business as any)?.email as string}</p></div>
              </div>
            </div>
          </div>
          <div className="w-full md:w-7/12 p-12 lg:p-16 bg-[var(--color-surface-elevated)]">
            <h3 className="text-2xl font-light mb-8 text-[var(--color-text)]" style={{ fontFamily:'var(--font-heading)' }}>Mesaj Gönderin</h3>
            <form className="space-y-6">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div>
                  <input type="text" className="w-full bg-transparent border-b border-[var(--color-border)] px-1 py-3 focus:outline-none focus:border-[var(--color-accent)] transition-colors placeholder:text-[var(--color-text-muted)] text-[var(--color-text)]" placeholder="Adınız Soyadınız" />
                </div>
                <div>
                  <input type="tel" className="w-full bg-transparent border-b border-[var(--color-border)] px-1 py-3 focus:outline-none focus:border-[var(--color-accent)] transition-colors placeholder:text-[var(--color-text-muted)] text-[var(--color-text)]" placeholder="Telefon Numaranız" />
                </div>
              </div>
              <div>
                <input type="text" className="w-full bg-transparent border-b border-[var(--color-border)] px-1 py-3 focus:outline-none focus:border-[var(--color-accent)] transition-colors placeholder:text-[var(--color-text-muted)] text-[var(--color-text)]" placeholder="Konu (Örn. Hasar Onarım)" />
              </div>
              <div>
                <textarea rows={4} className="w-full bg-transparent border-b border-[var(--color-border)] px-1 py-3 focus:outline-none focus:border-[var(--color-accent)] transition-colors placeholder:text-[var(--color-text-muted)] text-[var(--color-text)] resize-none" placeholder="Mesajınız..."></textarea>
              </div>
              <button type="submit" className="px-8 py-4 bg-[var(--color-accent)] text-[var(--color-text-on-accent)] font-medium tracking-wide hover:bg-[var(--color-accent-hover)] transition-colors rounded-[var(--radius-md)]">
                Gönder
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  )
}

// Registry
registerSection('hero', 'split_image', OtoKaportaHero as unknown as ComponentType<SectionProps<Record<string, unknown>>>)
registerSection('about', 'split_left', OtoKaportaAbout as unknown as ComponentType<SectionProps<Record<string, unknown>>>)
registerSection('stats', 'animated_row', OtoKaportaStats as unknown as ComponentType<SectionProps<Record<string, unknown>>>)
registerSection('gallery', 'masonry', OtoKaportaGallery as unknown as ComponentType<SectionProps<Record<string, unknown>>>)
registerSection('services', 'service_price_grid', OtoKaportaServices as unknown as ComponentType<SectionProps<Record<string, unknown>>>)
registerSection('contact', 'detailed_form', OtoKaportaContact as unknown as ComponentType<SectionProps<Record<string, unknown>>>)
