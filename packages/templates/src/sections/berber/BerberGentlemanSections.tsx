'use client'

import React, { ComponentType } from 'react'
import type { SectionProps } from '../../types/section-types'
import { registerSection } from '../../registry/section-registry'
import { motion } from 'framer-motion'
import { Scissors, Crown, MapPin, Clock, Phone, Sparkles, PenTool, CheckCircle } from 'lucide-react'

/* ═══════════════════════════════════════════
   BERBER GENTLEMAN — Variant-Specific Sections
   Sektor: berber | Plan: pro
   Tasarım: Luxury club, gold details, editorial layout. Cormorant Garamond headings.
   ═══════════════════════════════════════════ */

// ── 1. Hero ──
export function BerberGentlemanHero({ business, settings, content }: SectionProps<any>) {
  return (
    <section style={{
      minHeight: '90vh',
      background: 'var(--color-bg)',
      color: 'var(--color-text)',
      display: 'flex',
      alignItems: 'center',
      padding: '120px 24px 80px',
      position: 'relative'
    }}>
      <div style={{ maxWidth: 1200, margin: '0 auto', display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '64px', alignItems: 'center' }}>
        <motion.div initial={{ opacity: 0, x: -30 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.8 }}>
          {content?.badge && (
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '32px' }}>
              <div style={{ width: '40px', height: '1px', background: 'var(--color-accent)' }} />
              <span style={{ color: 'var(--color-accent)', textTransform: 'uppercase', letterSpacing: '0.2em', fontSize: '12px', fontWeight: 600 }}>{content.badge}</span>
            </div>
          )}
          
          <h1 style={{
            fontSize: 'clamp(3rem, 5vw, 4.5rem)', fontWeight: 400, fontFamily: 'var(--font-heading)',
            lineHeight: 1.1, marginBottom: '24px', fontStyle: 'italic'
          }}>
            {content?.title || business.name}
          </h1>
          
          <p style={{
            fontSize: '18px', color: 'var(--color-text-secondary)',
            maxWidth: '500px', lineHeight: 1.8, marginBottom: '48px', fontFamily: 'var(--font-body)'
          }}>
            {content?.subtitle || business.slogan || 'Geleneksel ustalık ve modern lüksün kusursuz uyumu.'}
          </p>

          <div style={{ display: 'flex', gap: '24px', alignItems: 'center' }}>
            <a href={(content?.cta1 as any)?.href || '#iletisim'} style={{
              display: 'inline-block', padding: '16px 40px', background: 'var(--color-accent)', color: '#fff',
              fontSize: '14px', fontWeight: 600, letterSpacing: '0.1em', textTransform: 'uppercase',
              border: '1px solid var(--color-accent)', transition: 'all 0.3s ease', textDecoration: 'none'
            }}>
              {(content?.cta1 as any)?.text || (settings as any)?.ctaText || 'Randevu Al'}
            </a>
            <a href="#hizmetler" style={{
              display: 'inline-flex', alignItems: 'center', gap: '8px', color: 'var(--color-text)',
              fontSize: '14px', fontWeight: 600, letterSpacing: '0.1em', textTransform: 'uppercase',
              textDecoration: 'none', borderBottom: '1px solid var(--color-text)', paddingBottom: '4px'
            }}>
              Hizmetlerimiz
            </a>
          </div>
        </motion.div>
        
        <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 1, delay: 0.2 }} style={{ position: 'relative' }}>
          <div style={{ aspectRatio: '3/4', borderRadius: '4px', overflow: 'hidden', position: 'relative', zIndex: 2 }}>
            <img src="https://images.unsplash.com/photo-1599351431202-1e0f0137899a?auto=format&fit=crop&q=80" alt="Gentleman Barber" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
          </div>
          <div style={{ position: 'absolute', top: '-24px', right: '-24px', bottom: '24px', left: '24px', border: '1px solid var(--color-accent)', zIndex: 1 }} />
        </motion.div>
      </div>
    </section>
  )
}
registerSection('hero', 'berber_gentleman_hero', BerberGentlemanHero as unknown as ComponentType<SectionProps<Record<string, unknown>>>)

// ── 2. About ──
export function BerberGentlemanAbout({ business, settings, content }: SectionProps<any>) {
  return (
    <section style={{ padding: '120px 24px', background: 'var(--color-surface)' }}>
      <div style={{ maxWidth: 1000, margin: '0 auto', textAlign: 'center' }}>
        <Crown size={32} color="var(--color-accent)" style={{ margin: '0 auto 24px' }} />
        <h2 style={{ fontSize: 'clamp(2.5rem, 4vw, 3.5rem)', fontWeight: 400, fontFamily: 'var(--font-heading)', fontStyle: 'italic', marginBottom: '32px', color: 'var(--color-text)' }}>
          {content?.title || 'Bir Ritüel Olarak Erkek Bakımı'}
        </h2>
        <p style={{ fontSize: '18px', color: 'var(--color-text-secondary)', lineHeight: 1.8, maxWidth: '800px', margin: '0 auto 48px' }}>
          {content?.description || `${(business.foundedYear || 2020)} yılından bu yana, centilmenlerin tercihi olmaktan gurur duyuyoruz. Geleneksel berberliğin altın çağını modern bir dokunuşla yeniden canlandırıyor, sadece bir kesim değil, bir deneyim sunuyoruz.`}
        </p>
        <img src="https://upload.wikimedia.org/wikipedia/commons/4/48/Signature_of_Kemal_Atat%C3%BCrk.svg" alt="Signature" style={{ height: '60px', opacity: 0.3, margin: '0 auto' }} />
        <div style={{ marginTop: '16px', fontSize: '14px', letterSpacing: '0.1em', textTransform: 'uppercase', color: 'var(--color-text)', fontWeight: 600 }}>
          {business.ownerName} - Kurucu
        </div>
      </div>
    </section>
  )
}
registerSection('about', 'berber_gentleman_about', BerberGentlemanAbout as unknown as ComponentType<SectionProps<Record<string, unknown>>>)

// ── 3. Stats ──
export function BerberGentlemanStats({ business, settings, content }: SectionProps<any>) {
  return (
    <section style={{ padding: '80px 24px', background: 'var(--color-text)', color: 'var(--color-bg)' }}>
      <div style={{ maxWidth: 1200, margin: '0 auto', display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '48px', textAlign: 'center' }}>
        <div>
          <div style={{ fontSize: '3rem', fontFamily: 'var(--font-heading)', fontWeight: 400, color: 'var(--color-accent)', marginBottom: '8px' }}>{new Date().getFullYear() - (business.foundedYear || 2020)}</div>
          <div style={{ fontSize: '13px', textTransform: 'uppercase', letterSpacing: '0.2em' }}>Yıllık Tecrübe</div>
        </div>
        <div>
          <div style={{ fontSize: '3rem', fontFamily: 'var(--font-heading)', fontWeight: 400, color: 'var(--color-accent)', marginBottom: '8px' }}>%100</div>
          <div style={{ fontSize: '13px', textTransform: 'uppercase', letterSpacing: '0.2em' }}>Müşteri Memnuniyeti</div>
        </div>
        <div>
          <div style={{ fontSize: '3rem', fontFamily: 'var(--font-heading)', fontWeight: 400, color: 'var(--color-accent)', marginBottom: '8px' }}>{business.rating}</div>
          <div style={{ fontSize: '13px', textTransform: 'uppercase', letterSpacing: '0.2em' }}>Ortalama Puan</div>
        </div>
        <div>
          <div style={{ fontSize: '3rem', fontFamily: 'var(--font-heading)', fontWeight: 400, color: 'var(--color-accent)', marginBottom: '8px' }}>15+</div>
          <div style={{ fontSize: '13px', textTransform: 'uppercase', letterSpacing: '0.2em' }}>Premium Marka</div>
        </div>
      </div>
    </section>
  )
}
registerSection('stats', 'berber_gentleman_stats', BerberGentlemanStats as unknown as ComponentType<SectionProps<Record<string, unknown>>>)

// ── 4. Gallery ──
export function BerberGentlemanGallery({ business, settings, content }: SectionProps<any>) {
  return (
    <section style={{ padding: '120px 24px', background: 'var(--color-bg)' }}>
      <div style={{ maxWidth: 1200, margin: '0 auto' }}>
        <h2 style={{ fontSize: 'clamp(2.5rem, 4vw, 3.5rem)', fontWeight: 400, fontFamily: 'var(--font-heading)', fontStyle: 'italic', marginBottom: '64px', color: 'var(--color-text)', textAlign: 'center' }}>
          {content?.title || 'Atmosfer'}
        </h2>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '2px' }}>
          <img src="https://images.unsplash.com/photo-1503951914875-452162b0f3f1?auto=format&fit=crop&q=80" alt="Gallery" style={{ width: '100%', aspectRatio: '1/1', objectFit: 'cover' }} />
          <img src="https://images.unsplash.com/photo-1622286342621-4bd786c2447c?auto=format&fit=crop&q=80" alt="Gallery" style={{ width: '100%', aspectRatio: '1/1', objectFit: 'cover' }} />
          <img src="https://images.unsplash.com/photo-1534778356534-d3d45b6db1da?auto=format&fit=crop&q=80" alt="Gallery" style={{ width: '100%', aspectRatio: '1/1', objectFit: 'cover' }} />
        </div>
      </div>
    </section>
  )
}
registerSection('gallery', 'berber_gentleman_gallery', BerberGentlemanGallery as unknown as ComponentType<SectionProps<Record<string, unknown>>>)

// ── 5. Services ──
export function BerberGentlemanServices({ business, settings, content }: SectionProps<any>) {
  const hizmetler = business.services || []
  return (
    <section style={{ padding: '120px 24px', background: 'var(--color-surface)' }}>
      <div style={{ maxWidth: 1200, margin: '0 auto' }}>
        <div style={{ textAlign: 'center', marginBottom: '80px' }}>
          <span style={{ color: 'var(--color-accent)', textTransform: 'uppercase', letterSpacing: '0.2em', fontSize: '12px', fontWeight: 600 }}>{content?.badge || 'HİZMETLER'}</span>
          <h2 style={{ fontSize: 'clamp(2.5rem, 4vw, 3.5rem)', fontWeight: 400, fontFamily: 'var(--font-heading)', fontStyle: 'italic', color: 'var(--color-text)', marginTop: '16px' }}>
            {content?.title || 'Tasarım & Bakım'}
          </h2>
        </div>
        
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(350px, 1fr))', gap: '32px' }}>
          {hizmetler.map((h, i) => {
            if (typeof h === 'string') return null;
            return (
              <div key={i} style={{ padding: '40px', background: 'var(--color-bg)', border: '1px solid var(--color-border)', position: 'relative' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '16px', borderBottom: '1px solid var(--color-border)', paddingBottom: '16px' }}>
                  <h3 style={{ fontSize: '20px', fontWeight: 400, fontFamily: 'var(--font-heading)', color: 'var(--color-text)', fontStyle: 'italic' }}>
                    {h.name}
                  </h3>
                  <div style={{ fontSize: '18px', color: 'var(--color-accent)', fontWeight: 600 }}>{h.price}</div>
                </div>
                {h.description && (
                  <p style={{ color: 'var(--color-text-secondary)', fontSize: '14px', lineHeight: 1.6, marginBottom: '24px' }}>
                    {h.description}
                  </p>
                )}
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: 'var(--color-text-muted)', fontSize: '13px', textTransform: 'uppercase', letterSpacing: '0.1em' }}>
                  <Clock size={14} /> {h.duration}
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
registerSection('services', 'berber_gentleman_services', BerberGentlemanServices as unknown as ComponentType<SectionProps<Record<string, unknown>>>)

// ── 6. Team ──
export function BerberGentlemanTeam({ business, settings, content }: SectionProps<any>) {
  const ekip = business.team || [];
  return (
    <section style={{ padding: '120px 24px', background: 'var(--color-bg)' }}>
      <div style={{ maxWidth: 1200, margin: '0 auto' }}>
        <h2 style={{ fontSize: 'clamp(2.5rem, 4vw, 3.5rem)', fontWeight: 400, fontFamily: 'var(--font-heading)', color: 'var(--color-text)', fontStyle: 'italic', textAlign: 'center', marginBottom: '64px' }}>
          {content?.title || 'Ustalar'}
        </h2>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '48px' }}>
          {ekip.map((member: any, i: number) => (
            <div key={i} style={{ textAlign: 'center' }}>
              <div style={{ width: '120px', height: '120px', borderRadius: '50%', background: 'var(--color-surface)', margin: '0 auto 24px', border: '1px solid var(--color-accent)' }} />
              <h3 style={{ fontSize: '24px', fontWeight: 400, fontFamily: 'var(--font-heading)', color: 'var(--color-text)', marginBottom: '8px', fontStyle: 'italic' }}>{member.name}</h3>
              <p style={{ color: 'var(--color-text-secondary)', fontSize: '13px', textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: '8px' }}>{member.role}</p>
              <p style={{ color: 'var(--color-accent)', fontSize: '13px' }}>{member.experience} Tecrübe</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
registerSection('team', 'berber_gentleman_team', BerberGentlemanTeam as unknown as ComponentType<SectionProps<Record<string, unknown>>>)

// ── 7. Booking / Contact ──
export function BerberGentlemanBooking({ business, settings, content }: SectionProps<any>) {
  return (
    <section style={{ padding: '120px 24px', background: 'var(--color-text)', color: 'var(--color-bg)' }}>
      <div style={{ maxWidth: 1000, margin: '0 auto', textAlign: 'center' }}>
        <h2 style={{ fontSize: 'clamp(2.5rem, 4vw, 3.5rem)', fontWeight: 400, fontFamily: 'var(--font-heading)', fontStyle: 'italic', marginBottom: '48px' }}>
          {content?.title || 'Ziyaretinizi Planlayın'}
        </h2>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '48px', marginBottom: '64px' }}>
          <div>
            <MapPin size={24} color="var(--color-accent)" style={{ margin: '0 auto 16px' }} />
            <h4 style={{ fontSize: '14px', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: '12px' }}>Konum</h4>
            <p style={{ color: 'var(--color-text-muted)', lineHeight: 1.6 }}>{business.address}</p>
          </div>
          <div>
            <Phone size={24} color="var(--color-accent)" style={{ margin: '0 auto 16px' }} />
            <h4 style={{ fontSize: '14px', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: '12px' }}>İletişim</h4>
            <p style={{ color: 'var(--color-text-muted)', lineHeight: 1.6 }}>{business.phone}<br/>{business.email}</p>
          </div>
          <div>
            <Clock size={24} color="var(--color-accent)" style={{ margin: '0 auto 16px' }} />
            <h4 style={{ fontSize: '14px', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: '12px' }}>Saatler</h4>
            <p style={{ color: 'var(--color-text-muted)', lineHeight: 1.6 }}>Pzt-Cmt: 10:00 - 21:00<br/>Pazar: 10:00 - 18:00</p>
          </div>
        </div>
        <a href={`https://wa.me/${business.whatsapp}`} style={{
          display: 'inline-block', padding: '16px 48px', background: 'var(--color-accent)', color: '#fff',
          fontSize: '14px', fontWeight: 600, letterSpacing: '0.1em', textTransform: 'uppercase', textDecoration: 'none'
        }}>
          WhatsApp İle Randevu
        </a>
      </div>
    </section>
  )
}
registerSection('contact', 'berber_gentleman_booking', BerberGentlemanBooking as unknown as ComponentType<SectionProps<Record<string, unknown>>>)

export default {
  BerberGentlemanHero,
  BerberGentlemanAbout,
  BerberGentlemanStats,
  BerberGentlemanGallery,
  BerberGentlemanServices,
  BerberGentlemanTeam,
  BerberGentlemanBooking
}
