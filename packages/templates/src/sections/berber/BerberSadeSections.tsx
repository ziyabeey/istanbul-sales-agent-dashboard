'use client'

import React, { ComponentType } from 'react'
import type { SectionProps } from '../../types/section-types'
import { registerSection } from '../../registry/section-registry'
import { motion } from 'framer-motion'
import { Scissors, Star, MapPin, Clock, Phone, ArrowRight, Check } from 'lucide-react'

/* ═══════════════════════════════════════════
   BERBER SADE — Variant-Specific Sections
   Sektor: berber | Plan: starter
   Tasarım: Minimal, aydınlık, beyaz & gri tonlar, ferah, ince çizgiler (Inter/Roboto fontlar).
   ═══════════════════════════════════════════ */

// ── 1. Hero ──
export function BerberSadeHero({ business, settings, content }: SectionProps<any>) {
  return (
    <section style={{
      minHeight: '85vh',
      background: 'var(--color-bg)',
      color: 'var(--color-text)',
      display: 'flex',
      alignItems: 'center',
      padding: '100px 24px 60px',
      position: 'relative',
    }}>
      <div style={{ maxWidth: 1200, margin: '0 auto', display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center', position: 'relative', zIndex: 10 }}>
        <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }}>
          {content?.badge && (
            <span style={{
              display: 'inline-block', padding: '6px 16px', background: 'var(--color-surface)',
              border: '1px solid var(--color-border)', borderRadius: '99px',
              color: 'var(--color-text)', fontSize: '13px', fontWeight: 600, letterSpacing: '0.05em', marginBottom: '32px'
            }}>
              {content.badge}
            </span>
          )}
          
          <h1 style={{
            fontSize: 'clamp(3rem, 7vw, 5.5rem)', fontWeight: 800, fontFamily: 'var(--font-heading)',
            lineHeight: 1.05, marginBottom: '24px', letterSpacing: '-0.02em', color: 'var(--color-text)'
          }}>
            {content?.title || business.name}
          </h1>
          
          <p style={{
            fontSize: '18px', color: 'var(--color-text-secondary)',
            maxWidth: '600px', margin: '0 auto 48px', lineHeight: 1.6
          }}>
            {content?.subtitle || business.slogan || 'Minimalist bakım, maksimum etki.'}
          </p>

          <div style={{ display: 'flex', gap: '16px', justifyContent: 'center', flexWrap: 'wrap' }}>
            <a href={(content?.cta1 as any)?.href || '#iletisim'} style={{
              display: 'inline-flex', alignItems: 'center', gap: '8px', padding: '16px 36px',
              background: 'var(--color-text)', color: 'var(--color-bg)',
              borderRadius: '99px', fontWeight: 600, textDecoration: 'none',
              fontSize: '15px', transition: 'all 0.3s ease'
            }}>
              {(content?.cta1 as any)?.text || (settings as any)?.ctaText || 'Randevu Al'} <ArrowRight size={18} />
            </a>
            <a href="#hizmetler" style={{
              display: 'inline-flex', alignItems: 'center', padding: '16px 36px',
              background: 'transparent', color: 'var(--color-text)', border: '1px solid var(--color-border)',
              borderRadius: '99px', fontWeight: 600, textDecoration: 'none',
              fontSize: '15px', transition: 'all 0.3s ease'
            }}>
              Hizmetlerimiz
            </a>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
registerSection('hero', 'berber_sade_hero', BerberSadeHero as unknown as ComponentType<SectionProps<Record<string, unknown>>>)

// ── 2. Stats ──
export function BerberSadeStats({ business, settings, content }: SectionProps<any>) {
  return (
    <section style={{ padding: '60px 24px', background: 'var(--color-surface)', borderTop: '1px solid var(--color-border)', borderBottom: '1px solid var(--color-border)' }}>
      <div style={{ maxWidth: 1200, margin: '0 auto', display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '32px', textAlign: 'center' }}>
        <div>
          <div style={{ fontSize: '2.5rem', fontWeight: 800, color: 'var(--color-text)', marginBottom: '4px' }}>{new Date().getFullYear() - (business.foundedYear || 2020)}</div>
          <div style={{ fontSize: '14px', color: 'var(--color-text-secondary)' }}>Yıllık Tecrübe</div>
        </div>
        <div style={{ borderLeft: '1px solid var(--color-border)', borderRight: '1px solid var(--color-border)' }}>
          <div style={{ fontSize: '2.5rem', fontWeight: 800, color: 'var(--color-text)', marginBottom: '4px' }}>%100</div>
          <div style={{ fontSize: '14px', color: 'var(--color-text-secondary)' }}>Memnuniyet</div>
        </div>
        <div>
          <div style={{ fontSize: '2.5rem', fontWeight: 800, color: 'var(--color-text)', marginBottom: '4px' }}>{business.rating}</div>
          <div style={{ fontSize: '14px', color: 'var(--color-text-secondary)' }}>Google Puanı ({business.reviewCount})</div>
        </div>
      </div>
    </section>
  )
}
registerSection('stats', 'berber_sade_stats', BerberSadeStats as unknown as ComponentType<SectionProps<Record<string, unknown>>>)

// ── 3. About ──
export function BerberSadeAbout({ business, settings, content }: SectionProps<any>) {
  return (
    <section style={{ padding: '120px 24px', background: 'var(--color-bg)' }}>
      <div style={{ maxWidth: 1200, margin: '0 auto', display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '64px', alignItems: 'center' }}>
        <div style={{ position: 'relative' }}>
          <div style={{ aspectRatio: '4/5', borderRadius: '24px', overflow: 'hidden', background: 'var(--color-surface)' }}>
            <img src="https://images.unsplash.com/photo-1585747860715-2ba37e788b70?auto=format&fit=crop&q=80" alt="Berber Salonu" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
          </div>
        </div>
        <div>
          <span style={{ color: 'var(--color-text-secondary)', fontSize: '13px', fontWeight: 600, letterSpacing: '0.1em', textTransform: 'uppercase', marginBottom: '16px', display: 'block' }}>{content?.badge || 'HAKKIMIZDA'}</span>
          <h2 style={{ fontSize: 'clamp(2rem, 4vw, 3rem)', fontWeight: 800, fontFamily: 'var(--font-heading)', color: 'var(--color-text)', marginBottom: '24px', letterSpacing: '-0.02em' }}>
            {content?.title || 'Sade ve Etkili Bakım'}
          </h2>
          <p style={{ fontSize: '18px', color: 'var(--color-text-secondary)', lineHeight: 1.7, marginBottom: '32px' }}>
            {content?.description || `${(business.foundedYear || 2020)} yılından bu yana, gereksiz detaylardan arındırılmış, sadece kaliteye odaklanan bir hizmet anlayışıyla çalışıyoruz. Ferah salonumuzda, uzman kadromuzla size en iyi halinizi vadediyoruz.`}
          </p>
          <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '16px' }}>
            <li style={{ display: 'flex', alignItems: 'center', gap: '12px', fontSize: '16px', color: 'var(--color-text)' }}><Check size={20} color="var(--color-text)" /> Modern saç kesimi teknikleri</li>
            <li style={{ display: 'flex', alignItems: 'center', gap: '12px', fontSize: '16px', color: 'var(--color-text)' }}><Check size={20} color="var(--color-text)" /> Hassas cilt bakımı</li>
            <li style={{ display: 'flex', alignItems: 'center', gap: '12px', fontSize: '16px', color: 'var(--color-text)' }}><Check size={20} color="var(--color-text)" /> Premium bakım ürünleri</li>
          </ul>
        </div>
      </div>
    </section>
  )
}
registerSection('about', 'berber_sade_about', BerberSadeAbout as unknown as ComponentType<SectionProps<Record<string, unknown>>>)

// ── 4. Services ──
export function BerberSadeServices({ business, settings, content }: SectionProps<any>) {
  const hizmetler = business.services || []
  return (
    <section style={{ padding: '120px 24px', background: 'var(--color-surface)' }}>
      <div style={{ maxWidth: 1000, margin: '0 auto' }}>
        <div style={{ textAlign: 'center', marginBottom: '64px' }}>
          <span style={{ color: 'var(--color-text-secondary)', fontSize: '13px', fontWeight: 600, letterSpacing: '0.1em', textTransform: 'uppercase', marginBottom: '16px', display: 'block' }}>{content?.badge || 'HİZMETLER'}</span>
          <h2 style={{ fontSize: 'clamp(2rem, 4vw, 3rem)', fontWeight: 800, fontFamily: 'var(--font-heading)', color: 'var(--color-text)', letterSpacing: '-0.02em' }}>
            {content?.title || 'Hizmetlerimiz'}
          </h2>
        </div>
        
        <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
          {hizmetler.map((h, i) => {
            if (typeof h === 'string') return null;
            return (
              <div key={i} style={{ padding: '32px', background: 'var(--color-bg)', border: '1px solid var(--color-border)', borderRadius: '16px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', transition: 'all 0.3s ease' }}>
                <div>
                  <h3 style={{ fontSize: '18px', fontWeight: 700, color: 'var(--color-text)', marginBottom: '8px' }}>
                    {h.name}
                  </h3>
                  {h.description && (
                    <p style={{ color: 'var(--color-text-secondary)', fontSize: '15px', maxWidth: '500px' }}>
                      {h.description}
                    </p>
                  )}
                </div>
                <div style={{ textAlign: 'right' }}>
                  <div style={{ fontSize: '20px', fontWeight: 800, color: 'var(--color-text)', marginBottom: '4px' }}>{h.price}</div>
                  <div style={{ fontSize: '13px', color: 'var(--color-text-muted)', display: 'flex', alignItems: 'center', gap: '4px' }}><Clock size={12} /> {h.duration}</div>
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
registerSection('services', 'berber_sade_services', BerberSadeServices as unknown as ComponentType<SectionProps<Record<string, unknown>>>)

// ── 5. Gallery ──
export function BerberSadeGallery({ business, settings, content }: SectionProps<any>) {
  return (
    <section style={{ padding: '120px 24px', background: 'var(--color-bg)' }}>
      <div style={{ maxWidth: 1200, margin: '0 auto' }}>
        <div style={{ textAlign: 'center', marginBottom: '64px' }}>
          <h2 style={{ fontSize: 'clamp(2rem, 4vw, 3rem)', fontWeight: 800, fontFamily: 'var(--font-heading)', color: 'var(--color-text)', letterSpacing: '-0.02em' }}>
            {content?.title || 'Galeri'}
          </h2>
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '24px' }}>
          <img src="https://images.unsplash.com/photo-1503951914875-452162b0f3f1?auto=format&fit=crop&q=80" alt="Gallery" style={{ width: '100%', aspectRatio: '1/1', objectFit: 'cover', borderRadius: '16px' }} />
          <img src="https://images.unsplash.com/photo-1621648028088-ea17a949e2eb?auto=format&fit=crop&q=80" alt="Gallery" style={{ width: '100%', aspectRatio: '1/1', objectFit: 'cover', borderRadius: '16px' }} />
          <img src="https://images.unsplash.com/photo-1599351431202-1e0f0137899a?auto=format&fit=crop&q=80" alt="Gallery" style={{ width: '100%', aspectRatio: '1/1', objectFit: 'cover', borderRadius: '16px' }} />
        </div>
      </div>
    </section>
  )
}
registerSection('gallery', 'berber_sade_gallery', BerberSadeGallery as unknown as ComponentType<SectionProps<Record<string, unknown>>>)

// ── 6. Team ──
export function BerberSadeTeam({ business, settings, content }: SectionProps<any>) {
  const ekip = business.team || [];
  return (
    <section style={{ padding: '120px 24px', background: 'var(--color-surface)' }}>
      <div style={{ maxWidth: 1200, margin: '0 auto' }}>
        <div style={{ textAlign: 'center', marginBottom: '64px' }}>
          <h2 style={{ fontSize: 'clamp(2rem, 4vw, 3rem)', fontWeight: 800, fontFamily: 'var(--font-heading)', color: 'var(--color-text)', letterSpacing: '-0.02em' }}>
            {content?.title || 'Ekibimiz'}
          </h2>
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '32px' }}>
          {ekip.map((member: any, i: number) => (
            <div key={i} style={{ padding: '32px', background: 'var(--color-bg)', borderRadius: '16px', border: '1px solid var(--color-border)', textAlign: 'center' }}>
              <div style={{ width: '80px', height: '80px', borderRadius: '50%', background: 'var(--color-surface)', margin: '0 auto 24px' }} />
              <h3 style={{ fontSize: '20px', fontWeight: 700, color: 'var(--color-text)', marginBottom: '8px' }}>{member.name}</h3>
              <p style={{ color: 'var(--color-text-secondary)', fontSize: '15px' }}>{member.role}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
registerSection('team', 'berber_sade_team', BerberSadeTeam as unknown as ComponentType<SectionProps<Record<string, unknown>>>)

// ── 7. Contact ──
export function BerberSadeContact({ business, settings, content }: SectionProps<any>) {
  return (
    <section style={{ padding: '120px 24px', background: 'var(--color-bg)' }}>
      <div style={{ maxWidth: 1000, margin: '0 auto', display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '64px' }}>
        <div>
          <h2 style={{ fontSize: 'clamp(2rem, 4vw, 3rem)', fontWeight: 800, fontFamily: 'var(--font-heading)', color: 'var(--color-text)', letterSpacing: '-0.02em', marginBottom: '40px' }}>
            {content?.title || 'İletişim'}
          </h2>
          
          <div style={{ display: 'flex', flexDirection: 'column', gap: '32px' }}>
            <div style={{ display: 'flex', gap: '16px', alignItems: 'flex-start' }}>
              <MapPin size={24} color="var(--color-text)" style={{ flexShrink: 0 }} />
              <div>
                <h4 style={{ fontSize: '16px', fontWeight: 600, color: 'var(--color-text)', marginBottom: '8px' }}>Adres</h4>
                <p style={{ color: 'var(--color-text-secondary)', lineHeight: 1.6 }}>{business.address}</p>
              </div>
            </div>
            <div style={{ display: 'flex', gap: '16px', alignItems: 'flex-start' }}>
              <Phone size={24} color="var(--color-text)" style={{ flexShrink: 0 }} />
              <div>
                <h4 style={{ fontSize: '16px', fontWeight: 600, color: 'var(--color-text)', marginBottom: '8px' }}>Telefon</h4>
                <p style={{ color: 'var(--color-text-secondary)', lineHeight: 1.6 }}>{business.phone}</p>
              </div>
            </div>
          </div>
        </div>
        
        <div style={{ background: 'var(--color-surface)', padding: '40px', borderRadius: '24px', border: '1px solid var(--color-border)' }}>
          <h3 style={{ fontSize: '20px', fontWeight: 700, color: 'var(--color-text)', marginBottom: '32px' }}>Çalışma Saatleri</h3>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
            {business.workingHours?.map((w,i) => (
              <div key={i} style={{ display: 'flex', justifyContent: 'space-between', borderBottom: '1px solid var(--color-border)', paddingBottom: '16px', color: 'var(--color-text)' }}>
                <span>{w.dayTr}</span>
                <span style={{ fontWeight: 600 }}>{w.open ? `${w.open} - ${w.close}` : 'Kapalı'}</span>
              </div>
            ))}
          </div>
          <a href={`https://wa.me/${business.whatsapp}`} style={{ display: 'block', width: '100%', padding: '18px', background: 'var(--color-text)', color: 'var(--color-bg)', textAlign: 'center', borderRadius: '99px', fontWeight: 600, fontSize: '16px', textDecoration: 'none', marginTop: '32px' }}>
            Hemen Randevu Al
          </a>
        </div>
      </div>
    </section>
  )
}
registerSection('contact', 'berber_sade_contact', BerberSadeContact as unknown as ComponentType<SectionProps<Record<string, unknown>>>)

export default {
  BerberSadeHero,
  BerberSadeStats,
  BerberSadeAbout,
  BerberSadeServices,
  BerberSadeGallery,
  BerberSadeTeam,
  BerberSadeContact
}
