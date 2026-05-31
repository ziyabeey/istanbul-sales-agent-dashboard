'use client'

import React, { ComponentType } from 'react'
import type { SectionProps } from '../../types/section-types'
import { registerSection } from '../../registry/section-registry'
import { motion } from 'framer-motion'
import { Scissors, Star, Palette, Crown, MapPin, Clock, Phone, Sparkles } from 'lucide-react'

/* ═══════════════════════════════════════════
   BERBER BLADE — Variant-Specific Sections
   Sektor: berber | Plan: growth
   Tasarım: Dark mode, neon orange accents, 3-column grids, glassmorphism.
   ═══════════════════════════════════════════ */

// ── 1. Hero ──
export function BerberBladeHero({ business, settings, content }: SectionProps<any>) {
  return (
    <section style={{
      minHeight: '85vh',
      background: 'var(--color-bg)',
      color: 'var(--color-text)',
      display: 'flex',
      alignItems: 'center',
      padding: '100px 24px 80px',
      position: 'relative',
      overflow: 'hidden',
    }}>
      {/* Decorative Glow */}
      <div style={{
        position: 'absolute', top: '-10%', right: '-10%', width: '40%', height: '50%',
        background: 'var(--color-accent)', filter: 'blur(150px)', opacity: 0.15, pointerEvents: 'none'
      }} />

      <div style={{ maxWidth: 1200, margin: '0 auto', width: '100%', position: 'relative', zIndex: 10 }}>
        <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }}>
          {content?.badge && (
            <span style={{
              display: 'inline-block', padding: '6px 14px', background: 'var(--color-surface)',
              border: '1px solid var(--color-border)', borderRadius: '99px',
              color: 'var(--color-accent)', fontSize: '13px', fontWeight: 800, textTransform: 'uppercase',
              letterSpacing: '0.1em', marginBottom: '24px'
            }}>
              {content.badge}
            </span>
          )}
          
          <h1 style={{
            fontSize: 'clamp(3rem, 8vw, 6rem)', fontWeight: 800, fontFamily: 'var(--font-heading)',
            lineHeight: 1.05, marginBottom: '24px', letterSpacing: '-0.02em', textTransform: 'uppercase'
          }}>
            {content?.title || business.name}
          </h1>
          
          <p style={{
            fontSize: 'clamp(1.125rem, 2vw, 1.5rem)', color: 'var(--color-text-secondary)',
            maxWidth: '650px', lineHeight: 1.6, marginBottom: '40px'
          }}>
            {content?.subtitle || business.slogan || 'Sıradanlığı kesip atın.'}
          </p>

          <div style={{ display: 'flex', gap: '16px', flexWrap: 'wrap' }}>
            <a href={(content?.cta1 as any)?.href || '#iletisim'} style={{
              display: 'inline-flex', alignItems: 'center', padding: '16px 36px',
              background: 'var(--color-accent)', color: 'var(--color-bg)',
              borderRadius: '99px', fontWeight: 800, textDecoration: 'none',
              fontSize: '16px', transition: 'all 0.3s ease', textTransform: 'uppercase'
            }}>
              {(content?.cta1 as any)?.text || (settings as any)?.ctaText || 'Randevu Al'}
            </a>
            <a href="#hizmetler" style={{
              display: 'inline-flex', alignItems: 'center', padding: '16px 36px',
              background: 'transparent', color: 'var(--color-text)', border: '1px solid var(--color-border)',
              borderRadius: '99px', fontWeight: 700, textDecoration: 'none',
              fontSize: '16px', transition: 'all 0.3s ease', textTransform: 'uppercase'
            }}>
              Hizmetlerimiz
            </a>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
registerSection('hero', 'berber_blade_hero', BerberBladeHero as unknown as ComponentType<SectionProps<Record<string, unknown>>>)

// ── 2. About ──
export function BerberBladeAbout({ business, settings, content }: SectionProps<any>) {
  return (
    <section style={{
      padding: '100px 24px',
      background: 'var(--color-surface)',
    }}>
      <div style={{ maxWidth: 1200, margin: '0 auto', display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '64px', alignItems: 'center' }}>
        <div>
          <h2 style={{
            fontSize: 'clamp(2rem, 4vw, 3rem)', fontWeight: 800, fontFamily: 'var(--font-heading)',
            color: 'var(--color-text)', marginBottom: '24px', textTransform: 'uppercase'
          }}>
            {content?.title || 'Tarzınızı Yeniden Keşfedin'}
          </h2>
          <p style={{ fontSize: '18px', color: 'var(--color-text-secondary)', lineHeight: 1.7, marginBottom: '24px' }}>
            {content?.description || `${business.experience}lık tecrübemizle, sıradan bir tıraştan fazlasını sunuyoruz. Modern erkek bakımında sınırları zorlayan ekibimiz, sizi en iyi versiyonunuza ulaştırmak için burada.`}
          </p>
          <div style={{ display: 'flex', gap: '32px', marginTop: '40px' }}>
            <div>
              <div style={{ fontSize: '2.5rem', fontWeight: 800, color: 'var(--color-accent)', fontFamily: 'var(--font-heading)' }}>{business.rating}</div>
              <div style={{ fontSize: '14px', color: 'var(--color-text-muted)', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Google Puanı ({business.reviewCount})</div>
            </div>
            <div>
              <div style={{ fontSize: '2.5rem', fontWeight: 800, color: 'var(--color-accent)', fontFamily: 'var(--font-heading)' }}>{business.experience}</div>
              <div style={{ fontSize: '14px', color: 'var(--color-text-muted)', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Sektör Tecrübesi</div>
            </div>
          </div>
        </div>
        <div style={{ position: 'relative' }}>
          <div style={{ width: '100%', aspectRatio: '4/5', background: 'var(--color-border)', borderRadius: '24px', overflow: 'hidden' }}>
            <img src="https://images.unsplash.com/photo-1585747860715-2ba37e788b70?auto=format&fit=crop&q=80" alt="Berber Salonu" style={{ width: '100%', height: '100%', objectFit: 'cover', opacity: 0.8 }} />
          </div>
          <div style={{
            position: 'absolute', bottom: '-20px', left: '-20px', background: 'var(--color-bg)',
            padding: '24px', borderRadius: '16px', border: '1px solid var(--color-border)', display: 'flex', alignItems: 'center', gap: '16px'
          }}>
            <div style={{ width: '48px', height: '48px', borderRadius: '50%', background: 'var(--color-surface)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--color-accent)' }}>
              <Scissors size={24} />
            </div>
            <div>
              <div style={{ fontWeight: 700, color: 'var(--color-text)' }}>Master Berberler</div>
              <div style={{ fontSize: '13px', color: 'var(--color-text-secondary)' }}>Özenle seçilmiş ekip</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
registerSection('about', 'berber_blade_about', BerberBladeAbout as unknown as ComponentType<SectionProps<Record<string, unknown>>>)

// ── 3. Services ──
export function BerberBladeServices({ business, settings, content }: SectionProps<any>) {
  const hizmetler = business.services || []
  return (
    <section style={{
      padding: '120px 24px',
      background: 'var(--color-bg)',
    }}>
      <div style={{ maxWidth: 1200, margin: '0 auto' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: '64px', flexWrap: 'wrap', gap: '24px' }}>
          <div>
            <span style={{ color: 'var(--color-accent)', fontWeight: 800, textTransform: 'uppercase', letterSpacing: '0.1em', fontSize: '13px' }}>{content?.badge || 'HİZMETLER'}</span>
            <h2 style={{ fontSize: 'clamp(2.5rem, 4vw, 3.5rem)', fontWeight: 800, fontFamily: 'var(--font-heading)', color: 'var(--color-text)', textTransform: 'uppercase', marginTop: '8px' }}>
              {content?.title || 'Neler Yapıyoruz?'}
            </h2>
          </div>
          <a href="#iletisim" style={{ color: 'var(--color-text)', textDecoration: 'none', fontWeight: 700, borderBottom: '2px solid var(--color-accent)', paddingBottom: '4px', textTransform: 'uppercase' }}>Tüm Hizmetler →</a>
        </div>
        
        <div style={{
          display: 'grid',
          gridTemplateColumns: `repeat(auto-fit, minmax(320px, 1fr))`,
          gap: '24px',
        }}>
          {hizmetler.map((h, i) => {
            if (typeof h === 'string') return null;
            const Icon = h.icon === 'scissors' ? Scissors : h.icon === 'palette' ? Palette : h.icon === 'crown' ? Crown : h.icon === 'sparkles' ? Sparkles : Star;
            return (
              <motion.div key={i} whileHover={{ y: -8 }} style={{
                padding: '40px 32px',
                background: 'var(--color-surface)',
                border: '1px solid var(--color-border)',
                borderRadius: '16px',
                position: 'relative',
                overflow: 'hidden',
                transition: 'border-color 0.3s ease'
              }}>
                {h.popular && (
                  <div style={{ position: 'absolute', top: '24px', right: '24px', background: 'var(--color-bg)', border: '1px solid var(--color-border)', padding: '6px 12px', borderRadius: '99px', fontSize: '11px', fontWeight: 800, color: 'var(--color-accent)', textTransform: 'uppercase' }}>Popüler</div>
                )}
                <div style={{ width: '56px', height: '56px', borderRadius: '12px', background: 'var(--color-bg)', border: '1px solid var(--color-border)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--color-accent)', marginBottom: '24px' }}>
                  <Icon size={28} strokeWidth={1.5} />
                </div>
                <h3 style={{ fontSize: '24px', fontWeight: 700, color: 'var(--color-text)', marginBottom: '12px', fontFamily: 'var(--font-heading)', textTransform: 'uppercase' }}>
                  {h.name}
                </h3>
                {h.description && (
                  <p style={{ color: 'var(--color-text-secondary)', fontSize: '15px', lineHeight: 1.6, marginBottom: '24px' }}>
                    {h.description}
                  </p>
                )}
                <div style={{ marginTop: 'auto', display: 'flex', alignItems: 'center', justifyContent: 'flex-start', gap: '16px', borderTop: '1px solid var(--color-border)', paddingTop: '24px' }}>
                  <span style={{ fontSize: '14px', color: 'var(--color-text-muted)', display: 'flex', alignItems: 'center', gap: '6px' }}><Clock size={16} /> {h.duration}</span>
                </div>
              </motion.div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
registerSection('services', 'berber_blade_services', BerberBladeServices as unknown as ComponentType<SectionProps<Record<string, unknown>>>)

// ── 4. Gallery ──
export function BerberBladeGallery({ business, settings, content }: SectionProps<any>) {
  return (
    <section style={{ padding: '120px 24px', background: 'var(--color-bg)' }}>
      <div style={{ maxWidth: 1200, margin: '0 auto' }}>
        <h2 style={{ fontSize: 'clamp(2.5rem, 4vw, 3.5rem)', fontWeight: 800, fontFamily: 'var(--font-heading)', color: 'var(--color-text)', textTransform: 'uppercase', textAlign: 'center', marginBottom: '64px' }}>
          {content?.title || 'Stüdyomuz'}
        </h2>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(12, 1fr)', gap: '16px', gridAutoRows: '300px' }}>
          <div style={{ gridColumn: 'span 8', borderRadius: '16px', overflow: 'hidden', background: 'var(--color-surface)' }}>
            <img src="https://images.unsplash.com/photo-1549887552-cb1071d3e5ca?auto=format&fit=crop&q=80" alt="Gallery" style={{ width: '100%', height: '100%', objectFit: 'cover', opacity: 0.8, filter: 'grayscale(50%)' }} />
          </div>
          <div style={{ gridColumn: 'span 4', borderRadius: '16px', overflow: 'hidden', background: 'var(--color-surface)' }}>
            <img src="https://images.unsplash.com/photo-1621648028088-ea17a949e2eb?auto=format&fit=crop&q=80" alt="Gallery" style={{ width: '100%', height: '100%', objectFit: 'cover', opacity: 0.8, filter: 'grayscale(50%)' }} />
          </div>
          <div style={{ gridColumn: 'span 4', borderRadius: '16px', overflow: 'hidden', background: 'var(--color-surface)' }}>
            <img src="https://images.unsplash.com/photo-1599351431202-1e0f0137899a?auto=format&fit=crop&q=80" alt="Gallery" style={{ width: '100%', height: '100%', objectFit: 'cover', opacity: 0.8, filter: 'grayscale(50%)' }} />
          </div>
          <div style={{ gridColumn: 'span 8', borderRadius: '16px', overflow: 'hidden', background: 'var(--color-surface)' }}>
            <img src="https://images.unsplash.com/photo-1503951914875-452162b0f3f1?auto=format&fit=crop&q=80" alt="Gallery" style={{ width: '100%', height: '100%', objectFit: 'cover', opacity: 0.8, filter: 'grayscale(50%)' }} />
          </div>
        </div>
      </div>
    </section>
  )
}
registerSection('gallery', 'berber_blade_gallery', BerberBladeGallery as unknown as ComponentType<SectionProps<Record<string, unknown>>>)

// ── 5. Team ──
export function BerberBladeTeam({ business, settings, content }: SectionProps<any>) {
  const ekip = business.team || [];
  return (
    <section style={{ padding: '120px 24px', background: 'var(--color-surface)' }}>
      <div style={{ maxWidth: 1200, margin: '0 auto' }}>
        <h2 style={{ fontSize: 'clamp(2.5rem, 4vw, 3.5rem)', fontWeight: 800, fontFamily: 'var(--font-heading)', color: 'var(--color-text)', textTransform: 'uppercase', marginBottom: '64px' }}>
          {content?.title || 'Ekibimiz'}
        </h2>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '32px' }}>
          {ekip.map((member: any, i: number) => (
            <div key={i} style={{ padding: '32px', background: 'var(--color-bg)', border: '1px solid var(--color-border)', borderRadius: '16px' }}>
              <h3 style={{ fontSize: '24px', fontWeight: 800, color: 'var(--color-text)', textTransform: 'uppercase', marginBottom: '8px' }}>{member.name}</h3>
              <p style={{ color: 'var(--color-accent)', fontWeight: 700, fontSize: '14px', marginBottom: '16px', textTransform: 'uppercase' }}>{member.role}</p>
              <p style={{ color: 'var(--color-text-muted)', fontSize: '14px' }}>Tecrübe: {member.experience}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
registerSection('team', 'berber_blade_team', BerberBladeTeam as unknown as ComponentType<SectionProps<Record<string, unknown>>>)

// ── 6. Pricing ──
export function BerberBladePricing({ business, settings, content }: SectionProps<any>) {
  const hizmetler = business.services || [];
  return (
    <section style={{ padding: '120px 24px', background: 'var(--color-bg)' }}>
      <div style={{ maxWidth: 800, margin: '0 auto' }}>
        <h2 style={{ fontSize: 'clamp(2.5rem, 4vw, 3.5rem)', fontWeight: 800, fontFamily: 'var(--font-heading)', color: 'var(--color-text)', textTransform: 'uppercase', textAlign: 'center', marginBottom: '64px' }}>
          {content?.title || 'Fiyat Listesi'}
        </h2>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
          {hizmetler.map((h: any, i) => (
            <div key={i} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', paddingBottom: '16px', borderBottom: '1px dashed var(--color-border)' }}>
              <div>
                <h3 style={{ fontSize: '18px', fontWeight: 700, color: 'var(--color-text)', textTransform: 'uppercase' }}>{h.name}</h3>
                {h.description && <p style={{ fontSize: '14px', color: 'var(--color-text-muted)', marginTop: '4px' }}>{h.description}</p>}
              </div>
              <div style={{ fontSize: '20px', fontWeight: 800, color: 'var(--color-accent)', fontFamily: 'var(--font-heading)' }}>{h.price}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
registerSection('pricing', 'berber_blade_pricing', BerberBladePricing as unknown as ComponentType<SectionProps<Record<string, unknown>>>)

// ── 7. Contact ──
export function BerberBladeContact({ business, settings, content }: SectionProps<any>) {
  return (
    <section style={{ padding: '120px 24px', background: 'var(--color-surface)' }}>
      <div style={{ maxWidth: 1200, margin: '0 auto', display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '64px' }}>
        <div>
          <h2 style={{ fontSize: 'clamp(2.5rem, 4vw, 3.5rem)', fontWeight: 800, fontFamily: 'var(--font-heading)', color: 'var(--color-text)', textTransform: 'uppercase', marginBottom: '40px' }}>
            {content?.title || 'Bize Ulaşın'}
          </h2>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '32px' }}>
            <div style={{ display: 'flex', gap: '20px', alignItems: 'flex-start' }}>
              <div style={{ width: '48px', height: '48px', borderRadius: '12px', background: 'var(--color-bg)', border: '1px solid var(--color-border)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--color-accent)', flexShrink: 0 }}>
                <MapPin size={24} />
              </div>
              <div>
                <h4 style={{ fontSize: '16px', fontWeight: 700, color: 'var(--color-text)', textTransform: 'uppercase', marginBottom: '8px' }}>Adres</h4>
                <p style={{ color: 'var(--color-text-secondary)', lineHeight: 1.6 }}>{business.address}</p>
              </div>
            </div>
            <div style={{ display: 'flex', gap: '20px', alignItems: 'flex-start' }}>
              <div style={{ width: '48px', height: '48px', borderRadius: '12px', background: 'var(--color-bg)', border: '1px solid var(--color-border)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--color-accent)', flexShrink: 0 }}>
                <Phone size={24} />
              </div>
              <div>
                <h4 style={{ fontSize: '16px', fontWeight: 700, color: 'var(--color-text)', textTransform: 'uppercase', marginBottom: '8px' }}>Telefon</h4>
                <p style={{ color: 'var(--color-text-secondary)', lineHeight: 1.6 }}>{business.phone}</p>
              </div>
            </div>
            <div style={{ display: 'flex', gap: '20px', alignItems: 'flex-start' }}>
              <div style={{ width: '48px', height: '48px', borderRadius: '12px', background: 'var(--color-bg)', border: '1px solid var(--color-border)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--color-accent)', flexShrink: 0 }}>
                <Clock size={24} />
              </div>
              <div>
                <h4 style={{ fontSize: '16px', fontWeight: 700, color: 'var(--color-text)', textTransform: 'uppercase', marginBottom: '8px' }}>Saatler</h4>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
                  {business.workingHours?.slice(0,3).map((w,i) => (
                    <div key={i} style={{ display: 'flex', justifyContent: 'space-between', width: '200px', color: 'var(--color-text-secondary)', fontSize: '14px' }}>
                      <span>{w.dayTr}</span>
                      <span>{w.open ? `${w.open} - ${w.close}` : 'Kapalı'}</span>
                    </div>
                  ))}
                  <p style={{ fontSize: '13px', color: 'var(--color-accent)', marginTop: '8px' }}>Tüm saatler için randevu sistemi</p>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div style={{ background: 'var(--color-bg)', padding: '40px', borderRadius: '24px', border: '1px solid var(--color-border)' }}>
          <h3 style={{ fontSize: '24px', fontWeight: 800, color: 'var(--color-text)', textTransform: 'uppercase', marginBottom: '32px' }}>Hızlı Randevu</h3>
          <form style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
            <input type="text" placeholder="Adınız Soyadınız" style={{ width: '100%', padding: '16px', background: 'var(--color-surface)', border: '1px solid var(--color-border-subtle)', borderRadius: '12px', color: 'var(--color-text)', outline: 'none' }} />
            <input type="tel" placeholder="Telefon Numaranız" style={{ width: '100%', padding: '16px', background: 'var(--color-surface)', border: '1px solid var(--color-border-subtle)', borderRadius: '12px', color: 'var(--color-text)', outline: 'none' }} />
            <select style={{ width: '100%', padding: '16px', background: 'var(--color-surface)', border: '1px solid var(--color-border-subtle)', borderRadius: '12px', color: 'var(--color-text)', outline: 'none', appearance: 'none' }}>
              {business.services?.map((s:any, i) => (
                <option key={i} value={s.name}>{s.name}</option>
              ))}
            </select>
            <button type="button" style={{ width: '100%', padding: '18px', background: 'var(--color-accent)', color: 'var(--color-bg)', borderRadius: '12px', fontWeight: 800, fontSize: '16px', border: 'none', cursor: 'pointer', textTransform: 'uppercase', marginTop: '16px' }}>
              Randevu Talebi Gönder
            </button>
          </form>
        </div>
      </div>
    </section>
  )
}
registerSection('contact', 'berber_blade_contact', BerberBladeContact as unknown as ComponentType<SectionProps<Record<string, unknown>>>)

export default {
  BerberBladeHero,
  BerberBladeAbout,
  BerberBladeServices,
  BerberBladeGallery,
  BerberBladeTeam,
  BerberBladePricing,
  BerberBladeContact
}
