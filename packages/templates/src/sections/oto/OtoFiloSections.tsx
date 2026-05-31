import React from 'react'
import { motion } from 'framer-motion'
import { FileText, MapPin, AlertTriangle, Circle, Phone, Star, Mail, CheckCircle2 } from 'lucide-react'
import type { ComponentType, ReactNode } from 'react';
import { SectionProps } from '../../types/section-types'
import { registerSection } from '../../registry/section-registry'

// --- OTO FILO SECTIONS ---

export const OtoFiloHero = ({ business, settings, content }: SectionProps<any>) => {
  return (
    <section className="relative flex items-center justify-center py-24 min-h-[85vh] overflow-hidden bg-[var(--color-bg)]">
      <div className="absolute inset-0 bg-gradient-to-br from-[var(--color-surface-elevated)] to-[var(--color-bg)] z-0" />
      <div className="absolute top-0 w-full h-full bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-5 z-0" />
      <div className="container relative z-10 text-center text-[var(--color-text)]">
        <motion.div initial={{ opacity:0, y:30 }} whileInView={{ opacity:1, y:0 }} transition={{ duration: 0.8 }} viewport={{ once:true }} className="max-w-4xl mx-auto">
          <span className="inline-block px-4 py-1.5 rounded-full bg-[var(--color-accent-subtle)] text-[var(--color-accent)] font-semibold tracking-widest text-sm mb-6 uppercase">
            {content?.badge || 'KURUMSAL'}
          </span>
          <h1 className="text-5xl md:text-7xl font-bold mb-6 tracking-tight" style={{ fontFamily: 'var(--font-heading)' }}>
            {content?.title || business?.name}
          </h1>
          <p className="text-xl md:text-2xl mb-10 text-[var(--color-text-secondary)] font-light leading-relaxed">
            {content?.subtitle || business?.slogan}
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a href={content?.cta1?.href || '#iletisim'} className="px-8 py-4 bg-[var(--color-accent)] text-[var(--color-text-on-accent)] rounded-[var(--radius-md)] font-medium hover:bg-[var(--color-accent-hover)] transition-colors shadow-lg shadow-[var(--color-accent)]/20">
              {content?.cta1?.text || 'Randevu Al'}
            </a>
          </div>
        </motion.div>
      </div>
    </section>
  )
}

export const OtoFiloAbout = ({ business, content }: SectionProps<any>) => {
  return (
    <section className="py-24 bg-[var(--color-surface)]">
      <div className="container px-4">
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row gap-16 items-center">
          <motion.div initial={{ opacity:0, x:-40 }} whileInView={{ opacity:1, x:0 }} transition={{ duration: 0.7 }} viewport={{ once:true }} className="w-full md:w-1/2">
            <div className="aspect-square rounded-[var(--radius-lg)] overflow-hidden relative shadow-2xl">
              <img src="/placeholder.jpg" alt={(business as any)?.name as string} className="object-cover w-full h-full" />
              <div className="absolute inset-0 bg-[var(--color-accent)] mix-blend-overlay opacity-20" />
            </div>
          </motion.div>
          <motion.div initial={{ opacity:0, x:40 }} whileInView={{ opacity:1, x:0 }} transition={{ duration: 0.7, delay: 0.2 }} viewport={{ once:true }} className="w-full md:w-1/2">
            <h2 className="text-sm font-bold tracking-widest text-[var(--color-accent)] mb-3">{content?.badge || 'HAKKIMIZDA'}</h2>
            <h3 className="text-4xl md:text-5xl font-bold text-[var(--color-text)] mb-6" style={{ fontFamily: 'var(--font-heading)' }}>{content?.title || 'Biz Kimiz?'}</h3>
            <p className="text-lg text-[var(--color-text-secondary)] leading-relaxed mb-8">{content?.description || 'Filo araçlarınıza özel çözümler.'}</p>
            <div className="grid grid-cols-2 gap-6">
              <div className="flex items-center gap-3"><CheckCircle2 className="text-[var(--color-accent)] w-6 h-6"/><span className="text-[var(--color-text)] font-medium">Kesintisiz Destek</span></div>
              <div className="flex items-center gap-3"><CheckCircle2 className="text-[var(--color-accent)] w-6 h-6"/><span className="text-[var(--color-text)] font-medium">Kurumsal Fiyatlandırma</span></div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}

export const OtoFiloStats = ({ content }: SectionProps<any>) => {
  const stats = content?.stats || [{ value:'11+', label:'Yıl' }, { value:'180+', label:'Araç' }, { value:'4.8', label:'Puan' }]
  return (
    <section className="py-20 bg-[var(--color-accent)] text-[var(--color-text-on-accent)] relative overflow-hidden">
      <div className="container relative z-10 px-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 text-center divide-y md:divide-y-0 md:divide-x divide-[var(--color-text-on-accent)]/20">
          {stats.map((s: any, i: number) => (
            <motion.div key={i} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.1, duration: 0.5 }} viewport={{ once:true }} className="pt-8 md:pt-0">
              <div className="text-5xl md:text-6xl font-bold mb-2" style={{ fontFamily: 'var(--font-heading)' }}>{s.value}</div>
              <div className="text-lg font-medium opacity-90">{s.label}</div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}

export const OtoFiloGallery = ({ content }: SectionProps<any>) => {
  return (
    <section className="py-24 bg-[var(--color-bg)] text-[var(--color-text)]">
      <div className="container px-4">
        <div className="text-center max-w-2xl mx-auto mb-16">
          <span className="text-[var(--color-accent)] font-semibold tracking-wider text-sm uppercase mb-3 block">{content?.badge || 'GALERİ'}</span>
          <h2 className="text-4xl font-bold" style={{ fontFamily: 'var(--font-heading)' }}>{content?.title || 'Atölyemiz'}</h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {[1,2,3].map((item: any, index: number) => (
            <motion.div key={index} initial={{ opacity: 0, scale: 0.95 }} whileInView={{ opacity: 1, scale: 1 }} transition={{ delay: index*0.1 }} viewport={{ once:true }} className="aspect-square rounded-[var(--radius-md)] overflow-hidden bg-[var(--color-surface-muted)] relative group">
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-10"/>
              <img src={`/placeholder.jpg`} alt={`Gallery image ${item}`} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}

export const OtoFiloServices = ({ business, content }: SectionProps<any>) => {
  const getIcon = (name: string) => {
    switch(name) {
      case 'file-text': return <FileText className="w-8 h-8"/>
      case 'map-pin': return <MapPin className="w-8 h-8"/>
      case 'alert-triangle': return <AlertTriangle className="w-8 h-8"/>
      case 'circle': return <Circle className="w-8 h-8"/>
      case 'phone': return <Phone className="w-8 h-8"/>
      default: return <Star className="w-8 h-8"/>
    }
  }

  return (
    <section className="py-24 bg-[var(--color-surface)]">
      <div className="container px-4">
        <div className="text-center max-w-2xl mx-auto mb-20">
          <span className="text-[var(--color-accent)] font-semibold tracking-wider text-sm uppercase mb-3 block">{content?.badge || 'HİZMETLER'}</span>
          <h2 className="text-4xl md:text-5xl font-bold text-[var(--color-text)] mb-6" style={{ fontFamily: 'var(--font-heading)' }}>
            {content?.title || 'Çözümlerimiz'}
          </h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
          {business?.services?.map((service: any, idx: number) => (
            <motion.div key={service.id} initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} transition={{ delay: idx * 0.1, duration: 0.5 }} viewport={{ once:true }} className="bg-[var(--color-bg)] rounded-[var(--radius-lg)] p-8 shadow-sm border border-[var(--color-border-subtle)] hover:border-[var(--color-accent)] transition-all duration-300 group">
              <div className="w-16 h-16 rounded-full bg-[var(--color-surface-muted)] text-[var(--color-accent)] flex items-center justify-center mb-6 group-hover:scale-110 group-hover:bg-[var(--color-accent)] group-hover:text-[var(--color-text-on-accent)] transition-all duration-300">
                {getIcon(service.icon || '')}
              </div>
              <h3 className="text-xl font-bold text-[var(--color-text)] mb-3" style={{ fontFamily: 'var(--font-heading)' }}>{service.name}</h3>
              <p className="text-[var(--color-text-secondary)] mb-6 min-h-[48px]">{service.description}</p>
              <div className="pt-6 border-t border-[var(--color-border-subtle)] flex justify-between items-center">
                <span className="font-semibold text-lg text-[var(--color-text)]">{service.price}</span>
                <span className="text-sm text-[var(--color-text-muted)] bg-[var(--color-surface)] px-3 py-1 rounded-full">{service.duration}</span>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}

export const OtoFiloContact = ({ business, content }: SectionProps<any>) => {
  return (
    <section className="py-24 bg-[var(--color-bg)] text-[var(--color-text)]">
      <div className="container px-4">
        <div className="max-w-5xl mx-auto bg-[var(--color-surface-elevated)] rounded-[var(--radius-lg)] shadow-2xl overflow-hidden flex flex-col md:flex-row border border-[var(--color-border-subtle)]">
          <div className="w-full md:w-5/12 bg-[var(--color-accent)] text-[var(--color-text-on-accent)] p-12 flex flex-col justify-between">
            <div>
              <h3 className="text-3xl font-bold mb-4" style={{ fontFamily: 'var(--font-heading)' }}>{content?.title || 'İletişim'}</h3>
              <p className="opacity-90 leading-relaxed mb-10">Bize ulaşmak için yandaki formu doldurabilir veya doğrudan arayabilirsiniz.</p>
              <div className="space-y-6">
                <div className="flex items-start gap-4">
                  <MapPin className="w-6 h-6 mt-1 flex-shrink-0" />
                  <p className="font-medium leading-relaxed">{(business as any)?.address as string}</p>
                </div>
                <div className="flex items-center gap-4">
                  <Phone className="w-6 h-6 flex-shrink-0" />
                  <p className="font-medium">{(business as any)?.phone as string}</p>
                </div>
                <div className="flex items-center gap-4">
                  <Mail className="w-6 h-6 flex-shrink-0" />
                  <p className="font-medium">{(business as any)?.email as string}</p>
                </div>
              </div>
            </div>
          </div>
          <div className="w-full md:w-7/12 p-12">
            <form className="space-y-6">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium mb-2 text-[var(--color-text-secondary)]">Ad Soyad</label>
                  <input type="text" className="w-full bg-[var(--color-surface)] border border-[var(--color-border)] rounded-[var(--radius-md)] px-4 py-3 focus:outline-none focus:border-[var(--color-accent)] transition-colors" placeholder="Adınız Soyadınız" />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2 text-[var(--color-text-secondary)]">Filo Büyüklüğü</label>
                  <input type="number" className="w-full bg-[var(--color-surface)] border border-[var(--color-border)] rounded-[var(--radius-md)] px-4 py-3 focus:outline-none focus:border-[var(--color-accent)] transition-colors" placeholder="Araç Sayısı" />
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium mb-2 text-[var(--color-text-secondary)]">Mesajınız</label>
                <textarea rows={4} className="w-full bg-[var(--color-surface)] border border-[var(--color-border)] rounded-[var(--radius-md)] px-4 py-3 focus:outline-none focus:border-[var(--color-accent)] transition-colors" placeholder="Detaylı bilgi..."></textarea>
              </div>
              <button type="submit" className="w-full py-4 bg-[var(--color-accent)] text-[var(--color-text-on-accent)] font-medium rounded-[var(--radius-md)] hover:bg-[var(--color-accent-hover)] transition-colors">Mesaj Gönder</button>
            </form>
          </div>
        </div>
      </div>
    </section>
  )
}

// Registry 
registerSection('hero', 'fullscreen_overlay', OtoFiloHero as unknown as ComponentType<SectionProps<Record<string, unknown>>>)
registerSection('about', 'split_left', OtoFiloAbout as unknown as ComponentType<SectionProps<Record<string, unknown>>>)
registerSection('stats', 'service_stats_row', OtoFiloStats as unknown as ComponentType<SectionProps<Record<string, unknown>>>)
registerSection('gallery', 'workshop_photos', OtoFiloGallery as unknown as ComponentType<SectionProps<Record<string, unknown>>>)
registerSection('services', 'service_price_grid', OtoFiloServices as unknown as ComponentType<SectionProps<Record<string, unknown>>>)
registerSection('contact', 'detailed_form', OtoFiloContact as unknown as ComponentType<SectionProps<Record<string, unknown>>>)
