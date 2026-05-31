import React from 'react'
import { motion } from 'framer-motion'
import { Circle, Target, Home, Wind, Disc, ArrowRight, ShieldCheck, MapPin, Phone, Mail } from 'lucide-react'
import type { ComponentType, ReactNode } from 'react';
import { SectionProps } from '../../types/section-types'
import { registerSection } from '../../registry/section-registry'

// --- OTO LASTIK SECTIONS ---

export const OtoLastikHero = ({ business, content }: SectionProps<any>) => {
  return (
    <section className="relative flex items-center min-h-[80vh] bg-[var(--color-bg)] py-24 overflow-hidden border-b border-[var(--color-border-subtle)]">
      <div className="absolute right-0 bottom-0 w-[600px] h-[600px] bg-[var(--color-accent-subtle)] rounded-full translate-x-1/3 translate-y-1/3 opacity-70 z-0 blur-3xl"/>
      <div className="container px-4 relative z-10 flex flex-col md:flex-row gap-12 items-center">
        <motion.div initial={{ opacity:0, x:-20 }} animate={{ opacity:1, x:0 }} transition={{ duration: 0.6 }} className="w-full md:w-1/2">
          <div className="flex items-center gap-3 mb-6">
            <span className="w-12 h-0.5 bg-[var(--color-accent)]"></span>
            <span className="font-bold text-[var(--color-accent)] uppercase tracking-wider text-sm">{content?.badge || 'PENDIK'}</span>
          </div>
          <h1 className="text-5xl md:text-6xl font-bold text-[var(--color-text)] mb-6 leading-[1.15] tracking-tight" style={{ fontFamily: 'var(--font-heading)' }}>
            {content?.title || business?.name}
          </h1>
          <p className="text-xl text-[var(--color-text-secondary)] mb-10 font-normal leading-relaxed max-w-lg">
            {content?.subtitle || business?.slogan}
          </p>
          <div className="flex flex-col sm:flex-row gap-4">
            <a href={content?.cta1?.href || '#iletisim'} className="px-8 py-4 bg-[var(--color-accent)] text-[var(--color-text-on-accent)] font-semibold rounded-[var(--radius-md)] flex justify-center items-center gap-2 hover:bg-[var(--color-accent-hover)] transition-colors shadow-lg shadow-[var(--color-accent)]/10">
              {content?.cta1?.text || 'Randevu Al'} <ArrowRight className="w-5 h-5"/>
            </a>
          </div>
        </motion.div>
        <motion.div initial={{ opacity:0, scale:0.95 }} animate={{ opacity:1, scale:1 }} transition={{ duration: 0.6, delay: 0.2 }} className="w-full md:w-1/2">
          <div className="relative aspect-square md:aspect-[4/3] w-full rounded-[var(--radius-lg)] overflow-hidden border border-[var(--color-border)] shadow-xl bg-[var(--color-surface)]">
            <img src="/placeholder.jpg" alt={(business as any)?.name as string} className="w-full h-full object-cover" />
            <div className="absolute inset-0 bg-gradient-to-t from-[var(--color-accent)]/60 to-transparent" />
          </div>
        </motion.div>
      </div>
    </section>
  )
}

export const OtoLastikAbout = ({ business, content }: SectionProps<any>) => {
  return (
    <section className="py-24 bg-[var(--color-surface)]">
      <div className="container px-4">
        <div className="flex flex-col md:flex-row gap-16">
          <motion.div initial={{ opacity:0, y:20 }} whileInView={{ opacity:1, y:0 }} transition={{ duration: 0.6 }} viewport={{ once:true }} className="w-full md:w-1/2">
            <h2 className="text-sm font-bold tracking-wider text-[var(--color-accent)] uppercase mb-3">{content?.badge || 'HAKKIMIZDA'}</h2>
            <h3 className="text-4xl font-bold text-[var(--color-text)] mb-6 leading-tight" style={{ fontFamily: 'var(--font-heading)' }}>{content?.title || 'Biz Kimiz?'}</h3>
            <p className="text-lg text-[var(--color-text-secondary)] leading-relaxed mb-8 font-normal">{(content as any)?.description as string}</p>
            <div className="flex items-center gap-4 bg-[var(--color-bg)] p-6 rounded-[var(--radius-md)] border border-[var(--color-border-subtle)] shadow-sm">
              <ShieldCheck className="w-10 h-10 text-[var(--color-accent)]" />
              <div>
                <div className="font-bold text-xl text-[var(--color-text)]">Yetkili Montaj & Satış</div>
                <div className="text-[var(--color-text-secondary)] text-sm">Dünya markaları orijinal ürün garantisi.</div>
              </div>
            </div>
          </motion.div>
          <motion.div initial={{ opacity:0, y:20 }} whileInView={{ opacity:1, y:0 }} transition={{ duration: 0.6, delay:0.2 }} viewport={{ once:true }} className="w-full md:w-1/2 grid grid-cols-2 gap-4">
            <div className="aspect-[4/5] bg-[var(--color-surface-muted)] rounded-[var(--radius-md)] overflow-hidden shadow-sm pt-8">
              <img src="/placeholder.jpg" alt="About" className="w-full h-full object-cover" />
            </div>
            <div className="aspect-[4/5] bg-[var(--color-surface-muted)] rounded-[var(--radius-md)] overflow-hidden shadow-sm">
              <img src="/placeholder.jpg" alt="About" className="w-full h-full object-cover" />
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}

export const OtoLastikStats = ({ content }: SectionProps<any>) => {
  const stats = content?.stats || [{ value:'15+', label:'Yıl' }, { value:'750+', label:'Araç' }, { value:'4.6', label:'Puan' }]
  return (
    <section className="py-20 bg-[var(--color-accent)] text-[var(--color-text-on-accent)]">
      <div className="container px-4">
        <div className="flex flex-col md:flex-row justify-between items-center bg-[var(--color-accent-active)] p-10 rounded-[var(--radius-lg)] shadow-inner">
          {stats.map((s: any, idx: number) => (
            <motion.div key={idx} initial={{ opacity:0, scale:0.9 }} whileInView={{ opacity:1, scale:1 }} transition={{ delay: idx*0.1 }} viewport={{ once:true }} className="w-full md:w-1/3 text-center py-6 md:py-0 border-b md:border-b-0 md:border-r border-[var(--color-text-on-accent)]/10 last:border-0">
              <div className="text-5xl font-bold mb-2" style={{ fontFamily: 'var(--font-heading)' }}>{s.value}</div>
              <div className="text-sm font-semibold tracking-wider text-[var(--color-text-on-accent)]/80 uppercase">{s.label}</div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}

export const OtoLastikGallery = ({ content }: SectionProps<any>) => {
  return (
    <section className="py-24 bg-[var(--color-bg)]">
      <div className="container px-4">
        <div className="text-center max-w-2xl mx-auto mb-16">
          <span className="text-[var(--color-accent)] font-bold tracking-wider text-sm uppercase mb-3 block">{content?.badge || 'GALERİ'}</span>
          <h2 className="text-4xl font-bold text-[var(--color-text)]" style={{ fontFamily:'var(--font-heading)' }}>{content?.title || 'Atölyemiz'}</h2>
        </div>
        <div className="columns-1 sm:columns-2 lg:columns-3 gap-6 space-y-6">
          {[1,2,3,4,5,6].map((item: any, index: number) => (
            <motion.div key={index} initial={{ opacity:0, y:20 }} whileInView={{ opacity:1, y:0 }} transition={{ delay: index * 0.1 }} viewport={{ once:true }} className="break-inside-avoid overflow-hidden rounded-[var(--radius-md)] bg-[var(--color-surface)] shadow-sm hover:shadow-md transition-shadow">
              <img src={`/placeholder.jpg`} alt={`Galeri ${item}`} className="w-full auto object-cover" />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}

export const OtoLastikServices = ({ business, content }: SectionProps<any>) => {
  const getIcon = (name: string) => {
    switch(name) {
      case 'circle': return <Circle className="w-6 h-6" />
      case 'target': return <Target className="w-6 h-6" />
      case 'home': return <Home className="w-6 h-6" />
      case 'wind': return <Wind className="w-6 h-6" />
      case 'disc': return <Disc className="w-6 h-6" />
      default: return <Circle className="w-6 h-6" />
    }
  }

  return (
    <section className="py-24 bg-[var(--color-surface)]">
      <div className="container px-4">
        <div className="max-w-3xl mx-auto text-center mb-16">
          <span className="text-[var(--color-accent)] font-bold tracking-wider text-sm uppercase mb-3 block">{content?.badge || 'HİZMETLER'}</span>
          <h2 className="text-4xl font-bold text-[var(--color-text)]" style={{ fontFamily:'var(--font-heading)' }}>{content?.title || 'Hizmetlerimiz'}</h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {business?.services?.map((svc: any, idx: number) => (
            <motion.div key={idx} initial={{ opacity:0, y:20 }} whileInView={{ opacity:1, y:0 }} transition={{ delay: idx*0.1 }} viewport={{ once:true }} className={`bg-[var(--color-bg)] rounded-[var(--radius-lg)] p-8 border hover:border-[var(--color-accent)] transition-all shadow-sm ${svc.popular ? 'border-[var(--color-accent)]/50 ring-1 ring-[var(--color-accent)]/10' : 'border-[var(--color-border-subtle)]'}`}>
              <div className="w-14 h-14 bg-[var(--color-surface)] text-[var(--color-accent)] rounded-full flex items-center justify-center mb-6">
                {getIcon(svc.icon || '')}
              </div>
              <h3 className="text-xl font-bold text-[var(--color-text)] mb-3" style={{ fontFamily:'var(--font-heading)' }}>{svc.name}</h3>
              <p className="text-[var(--color-text-secondary)] text-sm mb-6 h-10">{svc.description}</p>
              <div className="flex justify-between items-center pt-6 border-t border-[var(--color-border-subtle)]">
                <span className="font-bold text-lg text-[var(--color-text)]">{svc.price}</span>
                <span className="text-xs font-semibold text-[var(--color-text-muted)] bg-[var(--color-surface)] px-3 py-1 rounded-sm uppercase tracking-wide">{svc.duration}</span>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}

export const OtoLastikContact = ({ business, content }: SectionProps<any>) => {
  return (
    <section className="py-24 bg-[var(--color-bg)]">
      <div className="container px-4">
        <div className="grid md:grid-cols-2 gap-12 bg-[var(--color-surface)] rounded-[var(--radius-lg)] overflow-hidden border border-[var(--color-border-subtle)] shadow-sm">
          <div className="p-12">
            <span className="text-[var(--color-accent)] font-bold tracking-wider text-sm uppercase mb-3 block">{content?.badge || 'İLETİŞİM'}</span>
            <h2 className="text-3xl font-bold text-[var(--color-text)] mb-8" style={{ fontFamily:'var(--font-heading)' }}>{content?.title || 'Bize Ulaşın'}</h2>
            <form className="space-y-6">
              <div>
                <label className="block text-sm font-semibold text-[var(--color-text)] mb-2">İsim Soyisim</label>
                <input type="text" className="w-full border border-[var(--color-border)] rounded-[var(--radius-md)] px-4 py-3 bg-[var(--color-bg)] focus:outline-none focus:border-[var(--color-accent)]" />
              </div>
              <div>
                <label className="block text-sm font-semibold text-[var(--color-text)] mb-2">Telefon</label>
                <input type="tel" className="w-full border border-[var(--color-border)] rounded-[var(--radius-md)] px-4 py-3 bg-[var(--color-bg)] focus:outline-none focus:border-[var(--color-accent)]" />
              </div>
              <div>
                <label className="block text-sm font-semibold text-[var(--color-text)] mb-2">Mesaj / Hizmet</label>
                <textarea rows={3} className="w-full border border-[var(--color-border)] rounded-[var(--radius-md)] px-4 py-3 bg-[var(--color-bg)] focus:outline-none focus:border-[var(--color-accent)]"></textarea>
              </div>
              <button type="button" className="w-full bg-[var(--color-accent)] text-[var(--color-text-on-accent)] font-semibold py-4 rounded-[var(--radius-md)] hover:bg-[var(--color-accent-hover)] transition-colors">Mesaj Gönder</button>
            </form>
          </div>
          <div className="bg-[var(--color-accent)] text-[var(--color-text-on-accent)] p-12 flex flex-col justify-center">
            <h3 className="text-2xl font-bold mb-8">İletişim Bilgileri</h3>
            <div className="space-y-8">
              <div className="flex items-start gap-4">
                <MapPin className="w-6 h-6 opacity-80 mt-1 flex-shrink-0" />
                <div>
                  <h4 className="font-semibold text-sm opacity-80 uppercase tracking-widest mb-1">Adres</h4>
                  <p className="text-lg">{(business as any)?.address as string}</p>
                </div>
              </div>
              <div className="flex items-center gap-4">
                <Phone className="w-6 h-6 opacity-80 flex-shrink-0" />
                <div>
                  <h4 className="font-semibold text-sm opacity-80 uppercase tracking-widest mb-1">Telefon</h4>
                  <p className="text-lg">{(business as any)?.phone as string}</p>
                </div>
              </div>
              <div className="flex items-center gap-4">
                <Mail className="w-6 h-6 opacity-80 flex-shrink-0" />
                <div>
                  <h4 className="font-semibold text-sm opacity-80 uppercase tracking-widest mb-1">E-Posta</h4>
                  <p className="text-lg">{(business as any)?.email as string}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

// Registry
registerSection('hero', 'split_image', OtoLastikHero as unknown as ComponentType<SectionProps<Record<string, unknown>>>)
registerSection('about', 'split_left', OtoLastikAbout as unknown as ComponentType<SectionProps<Record<string, unknown>>>)
registerSection('stats', 'service_stats_row', OtoLastikStats as unknown as ComponentType<SectionProps<Record<string, unknown>>>)
registerSection('gallery', 'workshop_photos', OtoLastikGallery as unknown as ComponentType<SectionProps<Record<string, unknown>>>)
registerSection('services', 'service_price_grid', OtoLastikServices as unknown as ComponentType<SectionProps<Record<string, unknown>>>)
registerSection('contact', 'detailed_form', OtoLastikContact as unknown as ComponentType<SectionProps<Record<string, unknown>>>)
