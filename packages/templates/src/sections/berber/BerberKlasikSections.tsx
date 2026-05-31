'use client'

import React, { ComponentType } from 'react'
import type { SectionProps } from '../../types/section-types'
import { registerSection } from '../../registry/section-registry'
import { motion } from 'framer-motion'
import { Scissors, Star, PenTool, Sparkles, Phone, MapPin, Clock } from 'lucide-react'

/* ═══════════════════════════════════════════
   BERBER KLASİK — Variant-Specific Sections
   Sektor: berber | Plan: starter
   Tasarım: Geleneksel berber hissi, vintage krem/kahve tonları, serif başlıklar.
   ═══════════════════════════════════════════ */

// ── 1. Hero ──
export function BerberKlasikHero({ business, settings, content }: SectionProps<any>) {
  return (
    <section style={{
      minHeight: '80vh',
      background: 'var(--color-bg)',
      color: 'var(--color-text)',
      display: 'flex',
      alignItems: 'center',
      padding: '100px 24px 60px',
      position: 'relative',
      backgroundImage: 'url("data:image/svg+xml,%3Csvg width=\'60\' height=\'60\' viewBox=\'0 0 60 60\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cg fill=\'none\' fill-rule=\'evenodd\'%3E%3Cg fill=\'%238b6914\' fill-opacity=\'0.05\'%3E%3Cpath d=\'M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z\'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")',
    }}>
      <div style={{ maxWidth: 1000, margin: '0 auto', textAlign: 'center', position: 'relative', zIndex: 10 }}>
        <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }}>
          <div style={{ width: '80px', height: '80px', margin: '0 auto 32px', border: '2px solid var(--color-accent)', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <Scissors size={32} color="var(--color-accent)" />
          </div>
          <h1 style={{
            fontSize: 'clamp(2.5rem, 6vw, 4.5rem)', fontWeight: 700, fontFamily: 'var(--font-heading)',
            lineHeight: 1.1, marginBottom: '24px', color: 'var(--color-text)'
          }}>
            {content?.title || business.name}
          </h1>
          <p style={{
            fontSize: '20px', color: 'var(--color-text-secondary)',
            maxWidth: '600px', margin: '0 auto 40px', lineHeight: 1.6, fontStyle: 'italic'
          }}>
            {content?.subtitle || business.slogan || 'Bir tıraştan fazlası, bir asırlık gelenek.'}
          </p>
          <a href={(content?.cta1 as any)?.href || '#iletisim'} style={{
            display: 'inline-block', padding: '16px 48px', background: 'var(--color-accent)',
            color: 'var(--color-text-on-accent)', borderRadius: '4px', fontWeight: 700,
            textDecoration: 'none', fontSize: '16px', letterSpacing: '0.05em', textTransform: 'uppercase',
            boxShadow: '0 4px 14px rgba(139, 105, 20, 0.4)'
          }}>
            {(content?.cta1 as any)?.text || (settings as any)?.ctaText || 'Randevu Al'}
          </a>
        </motion.div>
      </div>
    </section>
  )
}
registerSection('hero', 'berber_klasik_hero', BerberKlasikHero as unknown as ComponentType<SectionProps<Record<string, unknown>>>)

// ── 2. About ──
export function BerberKlasikAbout({ business, settings, content }: SectionProps<any>) {
  return (
    <section style={{ padding: '100px 24px', background: 'var(--color-surface)' }}>
      <div style={{ maxWidth: 1000, margin: '0 auto', display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center' }}>
        <span style={{ color: 'var(--color-accent)', fontSize: '13px', fontWeight: 700, letterSpacing: '0.2em', textTransform: 'uppercase', marginBottom: '16px' }}>{content?.badge || 'HAKKIMIZDA'}</span>
        <h2 style={{ fontSize: 'clamp(2rem, 3vw, 3rem)', fontWeight: 700, fontFamily: 'var(--font-heading)', color: 'var(--color-text)', marginBottom: '32px' }}>
          {content?.title || `Berberliğin Altın Çağı`}
        </h2>
        <div style={{ width: '60px', height: '2px', background: 'var(--color-accent)', marginBottom: '32px' }} />
        <p style={{ fontSize: '18px', color: 'var(--color-text-secondary)', lineHeight: 1.8, maxWidth: '750px' }}>
          {content?.description || `${(business.foundedYear || 2020)} yılından bu yana, klasik tekniklerden ödün vermeden en iyi erkek bakımını sunuyoruz. Ustalık, sabır ve sıcağın birleştiği o anı yaşamak için sizi salonumuza bekliyoruz.`}
        </p>
      </div>
    </section>
  )
}
registerSection('about', 'berber_klasik_about', BerberKlasikAbout as unknown as ComponentType<SectionProps<Record<string, unknown>>>)

// ── 3. Stats ──
export function BerberKlasikStats({ business, settings, content }: SectionProps<any>) {
  return (
    <section style={{ padding: '80px 24px', background: 'var(--color-accent)', color: 'var(--color-text-on-accent)' }}>
      <div style={{ maxWidth: 1000, margin: '0 auto', display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '48px', textAlign: 'center' }}>
        <div>
          <div style={{ fontSize: '3rem', fontFamily: 'var(--font-heading)', fontWeight: 700, marginBottom: '8px' }}>{new Date().getFullYear() - (business.foundedYear || 2020)}</div>
          <div style={{ fontSize: '14px', textTransform: 'uppercase', letterSpacing: '0.1em' }}>Yıllık Tecrübe</div>
        </div>
        <div>
          <div style={{ fontSize: '3rem', fontFamily: 'var(--font-heading)', fontWeight: 700, marginBottom: '8px' }}>10k+</div>
          <div style={{ fontSize: '14px', textTransform: 'uppercase', letterSpacing: '0.1em' }}>Mutlu Müşteri</div>
        </div>
        <div>
          <div style={{ fontSize: '3rem', fontFamily: 'var(--font-heading)', fontWeight: 700, marginBottom: '8px' }}>3</div>
          <div style={{ fontSize: '14px', textTransform: 'uppercase', letterSpacing: '0.1em' }}>Usta Berber</div>
        </div>
      </div>
    </section>
  )
}
registerSection('stats', 'berber_klasik_stats', BerberKlasikStats as unknown as ComponentType<SectionProps<Record<string, unknown>>>)

// ── 4. Services ──
export function BerberKlasikServices({ business, settings, content }: SectionProps<any>) {
  const hizmetler = business.services || []
  return (
    <section style={{ padding: '100px 24px', background: 'var(--color-bg)' }}>
      <div style={{ maxWidth: 1000, margin: '0 auto' }}>
        <div style={{ textAlign: 'center', marginBottom: '64px' }}>
          <h2 style={{ fontSize: 'clamp(2rem, 3vw, 3rem)', fontWeight: 700, fontFamily: 'var(--font-heading)', color: 'var(--color-text)' }}>
            {content?.title || 'Klasik Hizmetlerimiz'}
          </h2>
          <div style={{ width: '60px', height: '2px', background: 'var(--color-accent)', margin: '24px auto 0' }} />
        </div>
        
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '32px' }}>
          {hizmetler.map((h, i) => {
            if (typeof h === 'string') return null;
            const Icon = h.icon === 'scissors' ? Scissors : h.icon === 'pen-tool' ? PenTool : h.icon === 'sparkles' ? Sparkles : Star;
            return (
              <div key={i} style={{ padding: '40px', background: 'var(--color-surface)', border: '1px solid var(--color-border)', borderRadius: '8px', textAlign: 'center' }}>
                <div style={{ width: '64px', height: '64px', margin: '0 auto 24px', border: '1px solid var(--color-accent)', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--color-accent)', background: 'var(--color-bg)' }}>
                  <Icon size={24} />
                </div>
                <h3 style={{ fontSize: '20px', fontWeight: 700, fontFamily: 'var(--font-heading)', color: 'var(--color-text)', marginBottom: '16px' }}>
                  {h.name}
                </h3>
                {h.description && (
                  <p style={{ color: 'var(--color-text-secondary)', fontSize: '15px', lineHeight: 1.6, marginBottom: '24px' }}>
                    {h.description}
                  </p>
                )}
                <div style={{ fontSize: '20px', fontWeight: 700, color: 'var(--color-accent)', marginBottom: '8px' }}>{h.price}</div>
                <div style={{ fontSize: '13px', color: 'var(--color-text-muted)' }}>{h.duration}</div>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
registerSection('services', 'berber_klasik_services', BerberKlasikServices as unknown as ComponentType<SectionProps<Record<string, unknown>>>)

// ── 5. Gallery ──
export function BerberKlasikGallery({ business, settings, content }: SectionProps<any>) {
  return (
    <section style={{ padding: '100px 24px', background: 'var(--color-surface)' }}>
      <div style={{ maxWidth: 1000, margin: '0 auto' }}>
        <div style={{ textAlign: 'center', marginBottom: '64px' }}>
          <h2 style={{ fontSize: 'clamp(2rem, 3vw, 3rem)', fontWeight: 700, fontFamily: 'var(--font-heading)', color: 'var(--color-text)' }}>
            {content?.title || 'Galeri'}
          </h2>
          <div style={{ width: '60px', height: '2px', background: 'var(--color-accent)', margin: '24px auto 0' }} />
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '24px' }}>
          <img src="https://images.unsplash.com/photo-1599351431202-1e0f0137899a?auto=format&fit=crop&q=80" alt="Gallery" style={{ width: '100%', aspectRatio: '1/1', objectFit: 'cover', borderRadius: '8px', border: '4px solid var(--color-bg)' }} />
          <img src="https://images.unsplash.com/photo-1549887552-cb1071d3e5ca?auto=format&fit=crop&q=80" alt="Gallery" style={{ width: '100%', aspectRatio: '1/1', objectFit: 'cover', borderRadius: '8px', border: '4px solid var(--color-bg)' }} />
          <img src="https://images.unsplash.com/photo-1521490686411-dc4a42b15802?auto=format&fit=crop&q=80" alt="Gallery" style={{ width: '100%', aspectRatio: '1/1', objectFit: 'cover', borderRadius: '8px', border: '4px solid var(--color-bg)' }} />
        </div>
      </div>
    </section>
  )
}
registerSection('gallery', 'berber_klasik_gallery', BerberKlasikGallery as unknown as ComponentType<SectionProps<Record<string, unknown>>>)

// ── 6. Team ──
export function BerberKlasikTeam({ business, settings, content }: SectionProps<any>) {
  const ekip = business.team || [];
  return (
    <section style={{ padding: '100px 24px', background: 'var(--color-bg)' }}>
      <div style={{ maxWidth: 1000, margin: '0 auto' }}>
        <div style={{ textAlign: 'center', marginBottom: '64px' }}>
          <h2 style={{ fontSize: 'clamp(2rem, 3vw, 3rem)', fontWeight: 700, fontFamily: 'var(--font-heading)', color: 'var(--color-text)' }}>
            {content?.title || 'Usta Berberlerimiz'}
          </h2>
          <div style={{ width: '60px', height: '2px', background: 'var(--color-accent)', margin: '24px auto 0' }} />
        </div>
        <div style={{ display: 'flex', justifyContent: 'center', gap: '48px', flexWrap: 'wrap' }}>
          {ekip.map((member: any, i: number) => (
            <div key={i} style={{ textAlign: 'center', width: '250px' }}>
              <div style={{ width: '160px', height: '160px', borderRadius: '50%', background: 'var(--color-surface)', margin: '0 auto 24px', border: '4px solid var(--color-accent)' }} />
              <h3 style={{ fontSize: '20px', fontWeight: 700, fontFamily: 'var(--font-heading)', color: 'var(--color-text)', marginBottom: '8px' }}>{member.name}</h3>
              <p style={{ color: 'var(--color-text-secondary)', fontSize: '15px', fontStyle: 'italic', marginBottom: '8px' }}>{member.role}</p>
              <p style={{ color: 'var(--color-accent)', fontSize: '14px', fontWeight: 700 }}>{member.experience} Tecrübe</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
registerSection('team', 'berber_klasik_team', BerberKlasikTeam as unknown as ComponentType<SectionProps<Record<string, unknown>>>)

// ── 7. Contact ──
export function BerberKlasikContact({ business, settings, content }: SectionProps<any>) {
  return (
    <section style={{ padding: '100px 24px', background: 'var(--color-surface)' }}>
      <div style={{ maxWidth: 1000, margin: '0 auto', display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '48px' }}>
        <div>
          <h2 style={{ fontSize: 'clamp(2rem, 3vw, 3rem)', fontWeight: 700, fontFamily: 'var(--font-heading)', color: 'var(--color-text)', marginBottom: '32px' }}>
            {content?.title || 'Ziyaretinizi Planlayın'}
          </h2>
          <div style={{ width: '60px', height: '2px', background: 'var(--color-accent)', marginBottom: '40px' }} />
          
          <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
            <div>
              <h4 style={{ fontSize: '18px', fontWeight: 700, fontFamily: 'var(--font-heading)', color: 'var(--color-text)', marginBottom: '8px' }}>Adres</h4>
              <p style={{ color: 'var(--color-text-secondary)', lineHeight: 1.6 }}>{business.address}</p>
            </div>
            <div>
              <h4 style={{ fontSize: '18px', fontWeight: 700, fontFamily: 'var(--font-heading)', color: 'var(--color-text)', marginBottom: '8px' }}>Telefon</h4>
              <p style={{ color: 'var(--color-text-secondary)', lineHeight: 1.6 }}>{business.phone}</p>
            </div>
          </div>
        </div>
        
        <div style={{ background: 'var(--color-bg)', padding: '40px', borderRadius: '8px', border: '1px solid var(--color-border)', boxShadow: '0 10px 30px rgba(0,0,0,0.05)' }}>
          <h3 style={{ fontSize: '22px', fontWeight: 700, fontFamily: 'var(--font-heading)', color: 'var(--color-text)', marginBottom: '32px', textAlign: 'center' }}>Çalışma Saatleri</h3>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
            {business.workingHours?.map((w,i) => (
              <div key={i} style={{ display: 'flex', justifyContent: 'space-between', borderBottom: '1px dashed var(--color-border)', paddingBottom: '8px', color: 'var(--color-text-secondary)' }}>
                <span>{w.dayTr}</span>
                <span style={{ fontWeight: 700 }}>{w.open ? `${w.open} - ${w.close}` : 'Kapalı'}</span>
              </div>
            ))}
          </div>
          <a href={`https://wa.me/${business.whatsapp}`} style={{ display: 'block', width: '100%', padding: '16px', background: 'var(--color-accent)', color: 'var(--color-text-on-accent)', textAlign: 'center', borderRadius: '4px', fontWeight: 700, fontSize: '16px', textDecoration: 'none', marginTop: '32px', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
            WhatsApp İle Randevu
          </a>
        </div>
      </div>
    </section>
  )
}
registerSection('contact', 'berber_klasik_contact', BerberKlasikContact as unknown as ComponentType<SectionProps<Record<string, unknown>>>)

export default {
  BerberKlasikHero,
  BerberKlasikAbout,
  BerberKlasikStats,
  BerberKlasikServices,
  BerberKlasikGallery,
  BerberKlasikTeam,
  BerberKlasikContact
}
