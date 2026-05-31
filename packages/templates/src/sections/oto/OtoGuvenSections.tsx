import React from 'react'
import { motion } from 'framer-motion'
import { Disc, Target, Droplet, Settings, Wrench, Phone, MapPin, Mail, Navigation } from 'lucide-react'
import type { ComponentType, ReactNode } from 'react';
import { SectionProps } from '../../types/section-types'
import { registerSection } from '../../registry/section-registry'

// --- OTO GUVEN SECTIONS ---

export const OtoGuvenHero = ({ business, content }: SectionProps<any>) => {
  return (
    <section className="relative flex items-center py-20 min-h-[80vh] bg-[var(--color-bg)] text-[var(--color-text)]">
      <div className="container px-4 flex flex-col md:flex-row items-center gap-12">
        <motion.div initial={{ opacity:0, x:-30 }} whileInView={{ opacity:1, x:0 }} transition={{ duration: 0.6 }} viewport={{ once:true }} className="w-full md:w-1/2">
          <span className="inline-block px-3 py-1 bg-[var(--color-accent-subtle)] text-[var(--color-accent)] rounded-full text-sm font-bold tracking-wide uppercase mb-4 border border-[var(--color-accent)]/20">
            {content?.badge || 'AVCILAR'}
          </span>
          <h1 className="text-4xl md:text-6xl font-black mb-6 leading-tight tracking-tight" style={{ fontFamily: 'var(--font-heading)' }}>
            {content?.title || business?.name}
          </h1>
          <p className="text-xl md:text-2xl mb-8 text-[var(--color-text-secondary)] font-medium">
            {content?.subtitle || business?.slogan}
          </p>
          <div className="flex gap-4">
            <a href={content?.cta1?.href || '#iletisim'} className="inline-flex items-center justify-center px-8 py-4 bg-[var(--color-accent)] text-[var(--color-text-on-accent)] font-bold rounded-[var(--radius-md)] hover:bg-[var(--color-accent-hover)] transition-all shadow-md hover:shadow-lg">
              {content?.cta1?.text || 'Randevu Al'}
            </a>
          </div>
        </motion.div>
        <motion.div initial={{ opacity:0, x:30 }} whileInView={{ opacity:1, x:0 }} transition={{ duration: 0.6, delay: 0.2 }} viewport={{ once:true }} className="w-full md:w-1/2">
          <div className="aspect-square relative rounded-[var(--radius-lg)] overflow-hidden shadow-xl border-4 border-[var(--color-surface)]">
            <img src="/placeholder.jpg" alt={(business as any)?.name as string} className="w-full h-full object-cover" />
            <div className="absolute inset-0 bg-[var(--color-accent)]/10 mix-blend-multiply" />
          </div>
        </motion.div>
      </div>
    </section>
  )
}

export const OtoGuvenAbout = ({ business, content }: SectionProps<any>) => {
  return (
    <section className="py-20 bg-[var(--color-surface)] text-[var(--color-text)]">
      <div className="container px-4">
        <div className="flex flex-col md:flex-row-reverse gap-12 items-center">
          <motion.div initial={{ opacity:0, y:-20 }} whileInView={{ opacity:1, y:0 }} transition={{ duration: 0.6 }} viewport={{ once:true }} className="w-full md:w-1/2">
            <img src="/placeholder.jpg" alt="About" className="w-full h-auto rounded-[var(--radius-md)] shadow-lg" />
          </motion.div>
          <motion.div initial={{ opacity:0, y:20 }} whileInView={{ opacity:1, y:0 }} transition={{ duration: 0.6, delay:0.2 }} viewport={{ once:true }} className="w-full md:w-1/2">
            <span className="text-[var(--color-accent)] font-bold tracking-wider text-sm uppercase mb-2 block">{content?.badge || 'HAKKIMIZDA'}</span>
            <h2 className="text-3xl md:text-5xl font-bold mb-6" style={{ fontFamily: 'var(--font-heading)' }}>{content?.title || 'Biz Kimiz?'}</h2>
            <p className="text-lg text-[var(--color-text-secondary)] leading-relaxed mb-6">{(content as any)?.description as string}</p>
            <div className="bg-[var(--color-surface-elevated)] p-6 rounded-[var(--radius-md)] shadow-sm border border-[var(--color-border-subtle)] inline-flex items-center gap-4">
              <div className="w-12 h-12 bg-[var(--color-accent-subtle)] text-[var(--color-accent)] rounded-full flex items-center justify-center">
                <Wrench className="w-6 h-6" />
              </div>
              <div className="text-left cursor-default">
                <div className="text-2xl font-black text-[var(--color-text)]">{business?.experience || '27 yıl'}</div>
                <div className="text-sm font-semibold text-[var(--color-text-muted)] uppercase">Sektör Tecrübesi</div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}

export const OtoGuvenStats = ({ content }: SectionProps<any>) => {
  const stats = content?.stats || [{ value:'27+', label:'Yıl' }, { value:'1400+', label:'Araç' }, { value:'4.5', label:'Puan' }]
  return (
    <section className="py-16 bg-[var(--color-accent)] text-[var(--color-text-on-accent)]">
      <div className="container px-4">
        <div className="flex flex-wrap justify-between items-center bg-[var(--color-accent-active)] rounded-[var(--radius-lg)] p-8 shadow-inner shadow-black/20">
          {stats.map((item: any, i: number) => (
            <motion.div key={i} initial={{ opacity:0, scale:0.8 }} whileInView={{ opacity:1, scale:1 }} transition={{ delay: i*0.1 }} viewport={{ once:true }} className="w-full sm:w-1/3 text-center py-4 sm:py-0">
              <div className="text-4xl md:text-5xl font-black mb-1" style={{ fontFamily: 'var(--font-heading)' }}>{item.value}</div>
              <div className="text-sm uppercase tracking-widest opacity-80 font-medium">{item.label}</div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}

export const OtoGuvenGallery = ({ content }: SectionProps<any>) => {
  return (
    <section className="py-20 bg-[var(--color-surface-muted)] text-[var(--color-text)]">
      <div className="container px-4">
        <div className="text-center mb-12">
          <span className="text-[var(--color-accent)] font-bold tracking-wider text-sm uppercase mb-2 block">{content?.badge || 'GALERİ'}</span>
          <h2 className="text-3xl md:text-4xl font-black" style={{ fontFamily: 'var(--font-heading)' }}>{content?.title || 'Atölyemiz'}</h2>
        </div>
        <div className="columns-1 sm:columns-2 lg:columns-3 gap-6 space-y-6">
          {[1,2,3,4,5].map((item: any, index: number) => (
            <motion.div key={index} initial={{ opacity:0, y:20 }} whileInView={{ opacity:1, y:0 }} transition={{ delay: index * 0.1 }} viewport={{ once:true }} className="break-inside-avoid rounded-[var(--radius-md)] overflow-hidden shadow-sm hover:shadow-lg transition-shadow border border-[var(--color-border-subtle)]">
              <img src={`/placeholder.jpg`} alt={`Galeri ${item}`} className="w-full auto object-cover block hover:scale-105 transition-transform duration-500" />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}

export const OtoGuvenServices = ({ business, content }: SectionProps<any>) => {
  const getIcon = (name: string) => {
    switch (name) {
      case 'wrench': return <Wrench className="w-7 h-7" />
      case 'disc': return <Disc className="w-7 h-7" />
      case 'target': return <Target className="w-7 h-7" />
      case 'droplet': return <Droplet className="w-7 h-7" />
      case 'settings': return <Settings className="w-7 h-7" />
      default: return <Settings className="w-7 h-7" />
    }
  }

  return (
    <section className="py-24 bg-[var(--color-bg)]">
      <div className="container px-4">
        <div className="text-center mb-16">
          <span className="text-[var(--color-accent)] font-bold tracking-wider text-sm uppercase mb-2 block">{content?.badge || 'HİZMETLER'}</span>
          <h2 className="text-3xl md:text-5xl font-black text-[var(--color-text)]" style={{ fontFamily: 'var(--font-heading)' }}>Hizmetlerimiz</h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {business?.services?.map((svc: any, i: number) => (
            <motion.div key={i} initial={{ opacity:0, y:30 }} whileInView={{ opacity:1, y:0 }} transition={{ delay: i*0.1 }} viewport={{ once:true }} className="bg-[var(--color-surface)] border border-[var(--color-border)] hover:border-[var(--color-accent)] p-8 rounded-[var(--radius-lg)] shadow-sm hover:shadow-md transition-all group">
              <div className="w-14 h-14 bg-[var(--color-accent)] text-[var(--color-text-on-accent)] rounded-lg flex items-center justify-center mb-6 shadow-md group-hover:-translate-y-2 transition-transform">
                {getIcon(svc.icon || '')}
              </div>
              <h3 className="text-xl font-bold text-[var(--color-text)] mb-3">{svc.name}</h3>
              <p className="text-[var(--color-text-secondary)] mb-6 text-sm flex-grow">{svc.description}</p>
              <div className="flex items-center justify-between border-t border-[var(--color-border)] pt-4 mt-auto">
                <span className="text-[var(--color-text)] font-black text-lg">{svc.price}</span>
                <span className="text-[var(--color-text-muted)] text-xs font-semibold uppercase">{svc.duration}</span>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}

export const OtoGuvenContact = ({ business, content }: SectionProps<any>) => {
  return (
    <section className="py-20 bg-[var(--color-surface-elevated)] text-[var(--color-text)] border-t border-[var(--color-border-subtle)]">
      <div className="container px-4 max-w-6xl">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          <motion.div initial={{ opacity:0, x:-20 }} whileInView={{ opacity:1, x:0 }} viewport={{ once:true }}>
            <span className="text-[var(--color-accent)] font-bold tracking-wider text-sm uppercase mb-2 block">{content?.badge || 'İLETİŞİM'}</span>
            <h2 className="text-3xl md:text-5xl font-black mb-6" style={{ fontFamily: 'var(--font-heading)' }}>{content?.title || 'Bize Ulaşın'}</h2>
            <p className="text-[var(--color-text-secondary)] mb-8">Hızlı bir randevu alın veya atölyemizi ziyaret edin.</p>
            
            <div className="space-y-6">
              <div className="flex items-start gap-4 p-4 rounded-[var(--radius-md)] bg-[var(--color-surface)] border border-[var(--color-border-subtle)]">
                <div className="text-[var(--color-accent)] p-2 bg-[var(--color-accent-subtle)] rounded-md"><MapPin className="w-6 h-6" /></div>
                <div><h4 className="font-bold mb-1">Adres</h4><p className="text-sm text-[var(--color-text-secondary)]">{(business as any)?.address as string}</p></div>
              </div>
              <div className="flex items-start gap-4 p-4 rounded-[var(--radius-md)] bg-[var(--color-surface)] border border-[var(--color-border-subtle)]">
                <div className="text-[var(--color-accent)] p-2 bg-[var(--color-accent-subtle)] rounded-md"><Phone className="w-6 h-6" /></div>
                <div><h4 className="font-bold mb-1">Telefon</h4><p className="text-sm text-[var(--color-text-secondary)]">{(business as any)?.phone as string}</p></div>
              </div>
              <div className="flex items-start gap-4 p-4 rounded-[var(--radius-md)] bg-[var(--color-surface)] border border-[var(--color-border-subtle)]">
                <div className="text-[var(--color-accent)] p-2 bg-[var(--color-accent-subtle)] rounded-md"><Mail className="w-6 h-6" /></div>
                <div><h4 className="font-bold mb-1">E-Posta</h4><p className="text-sm text-[var(--color-text-secondary)]">{(business as any)?.email as string}</p></div>
              </div>
            </div>
          </motion.div>
          <motion.div initial={{ opacity:0, x:20 }} whileInView={{ opacity:1, x:0 }} viewport={{ once:true }} className="bg-[var(--color-surface)] p-8 rounded-[var(--radius-lg)] border border-[var(--color-border)] shadow-sm">
            <form className="space-y-5">
              <div>
                <label className="block text-sm font-bold text-[var(--color-text)] mb-1">Adınız</label>
                <input type="text" className="w-full border border-[var(--color-border)] bg-[var(--color-bg)] rounded-[var(--radius-md)] p-3 focus:outline-none focus:border-[var(--color-accent)]" placeholder="Adınız Soyadınız"/>
              </div>
              <div>
                <label className="block text-sm font-bold text-[var(--color-text)] mb-1">Telefon</label>
                <input type="tel" className="w-full border border-[var(--color-border)] bg-[var(--color-bg)] rounded-[var(--radius-md)] p-3 focus:outline-none focus:border-[var(--color-accent)]" placeholder="05XX XXX XX XX"/>
              </div>
              <div>
                <label className="block text-sm font-bold text-[var(--color-text)] mb-1">Hizmet</label>
                <select className="w-full border border-[var(--color-border)] bg-[var(--color-bg)] rounded-[var(--radius-md)] p-3 focus:outline-none focus:border-[var(--color-accent)]">
                  <option>Genel Bakım</option>
                  <option>Fren Bakım</option>
                  <option>Rot Balans</option>
                  <option>Diğer</option>
                </select>
              </div>
              <button type="button" className="w-full bg-[var(--color-accent)] text-[var(--color-text-on-accent)] font-bold py-4 rounded-[var(--radius-md)] shadow-md hover:bg-[var(--color-accent-hover)] hover:-translate-y-0.5 transition-all flex justify-center items-center gap-2">
                <Navigation className="w-5 h-5"/> Gönder
              </button>
            </form>
          </motion.div>
        </div>
      </div>
    </section>
  )
}

// Registry
registerSection('hero', 'split_image', OtoGuvenHero as unknown as ComponentType<SectionProps<Record<string, unknown>>>)
registerSection('about', 'split_left', OtoGuvenAbout as unknown as ComponentType<SectionProps<Record<string, unknown>>>)
registerSection('stats', 'animated_row', OtoGuvenStats as unknown as ComponentType<SectionProps<Record<string, unknown>>>)
registerSection('gallery', 'masonry', OtoGuvenGallery as unknown as ComponentType<SectionProps<Record<string, unknown>>>)
registerSection('services', 'oto_services', OtoGuvenServices as unknown as ComponentType<SectionProps<Record<string, unknown>>>)
registerSection('contact', 'detailed_form', OtoGuvenContact as unknown as ComponentType<SectionProps<Record<string, unknown>>>)
