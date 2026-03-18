/**
 * Esnaf-Specific Components: HeroBanner, WhatsAppCTA, PriceTable,
 * ContactForm, WorkingHours, GoogleMap
 * Specialized components for Turkish small business sites.
 */

import React from 'react'
import type { RendererProps } from '../types'
import { nodeToCSS } from '../layout-to-css'

// ── HeroBanner ──
// Full-screen hero with background image, overlay, CTA

export const HeroBannerRenderer: React.FC<RendererProps> = ({ node, isEditor, children, onSelect }) => {
  const css = nodeToCSS(node.layout, node.style)
  const data = node.data || {}

  const handleClick = (e: React.MouseEvent) => {
    if (isEditor && onSelect) {
      e.stopPropagation()
      onSelect(node.id)
    }
  }

  return (
    <section
      id={node.id}
      data-component-type={node.type}
      data-component-id={node.id}
      style={{
        width: '100%',
        minHeight: '80vh',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        textAlign: 'center',
        position: 'relative',
        overflow: 'hidden',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        ...css,
      }}
      onClick={handleClick}
    >
      {/* Dark overlay */}
      <div
        style={{
          position: 'absolute',
          inset: 0,
          backgroundColor: (data.overlayColor as string) || 'rgba(0,0,0,0.45)',
          zIndex: 0,
        }}
      />
      {/* Content */}
      <div style={{ position: 'relative', zIndex: 1, padding: '40px 24px', maxWidth: '800px' }}>
        {children || (
          <>
            <h1 style={{
              fontSize: 'clamp(2rem, 5vw, 3.5rem)',
              fontWeight: 800,
              color: '#ffffff',
              marginBottom: '16px',
              lineHeight: 1.15,
              fontFamily: 'var(--font-heading, inherit)',
            }}>
              {data.title as string || 'İşletmenize Hoş Geldiniz'}
            </h1>
            <p style={{
              fontSize: 'clamp(1rem, 2vw, 1.25rem)',
              color: 'rgba(255,255,255,0.9)',
              marginBottom: '32px',
              lineHeight: 1.6,
            }}>
              {data.subtitle as string || 'Profesyonel hizmet, güvenilir kalite'}
            </p>
            {data.ctaText && (
              <a
                href={isEditor ? '#' : (data.ctaLink as string || '#')}
                onClick={(e) => isEditor && e.preventDefault()}
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '8px',
                  padding: '14px 32px',
                  backgroundColor: 'var(--color-accent, #c84b31)',
                  color: '#ffffff',
                  borderRadius: '8px',
                  fontWeight: 700,
                  fontSize: '1.05rem',
                  textDecoration: 'none',
                  transition: 'transform 0.2s, box-shadow 0.2s',
                }}
              >
                {data.ctaText as string}
              </a>
            )}
          </>
        )}
      </div>
    </section>
  )
}

// ── WhatsAppCTA ──
// WhatsApp call-to-action button (compact/full/icon-only variants)

export const WhatsAppCTARenderer: React.FC<RendererProps> = ({ node, isEditor, onSelect }) => {
  const css = nodeToCSS(node.layout, node.style)
  const data = node.data || {}
  const variant = (data.variant as string) || 'full'
  const phone = (data.phone as string) || ''
  const message = (data.message as string) || 'Merhaba, bilgi almak istiyorum.'
  const text = (data.text as string) || 'WhatsApp ile Yazın'

  const whatsappUrl = `https://wa.me/${phone.replace(/\D/g, '')}?text=${encodeURIComponent(message)}`

  const handleClick = (e: React.MouseEvent) => {
    if (isEditor) {
      e.preventDefault()
      e.stopPropagation()
      onSelect?.(node.id)
    }
  }

  // Icon-only variant (floating button)
  if (variant === 'icon-only') {
    return (
      <a
        id={node.id}
        data-component-type={node.type}
      data-component-id={node.id}
        href={isEditor ? '#' : whatsappUrl}
        target="_blank"
        rel="noopener noreferrer"
        onClick={handleClick}
        style={{
          display: 'inline-flex',
          alignItems: 'center',
          justifyContent: 'center',
          width: '56px',
          height: '56px',
          borderRadius: '50%',
          backgroundColor: '#25D366',
          color: '#ffffff',
          fontSize: '28px',
          textDecoration: 'none',
          boxShadow: '0 4px 12px rgba(37, 211, 102, 0.4)',
          ...css,
        }}
        aria-label="WhatsApp ile İletişim"
      >
        💬
      </a>
    )
  }

  // Compact variant
  if (variant === 'compact') {
    return (
      <a
        id={node.id}
        data-component-type={node.type}
      data-component-id={node.id}
        href={isEditor ? '#' : whatsappUrl}
        target="_blank"
        rel="noopener noreferrer"
        onClick={handleClick}
        style={{
          display: 'inline-flex',
          alignItems: 'center',
          gap: '6px',
          padding: '8px 16px',
          backgroundColor: '#25D366',
          color: '#ffffff',
          borderRadius: '6px',
          fontSize: '0.875rem',
          fontWeight: 600,
          textDecoration: 'none',
          ...css,
        }}
      >
        💬 {text}
      </a>
    )
  }

  // Full variant (default)
  return (
    <a
      id={node.id}
      data-component-type={node.type}
      data-component-id={node.id}
      href={isEditor ? '#' : whatsappUrl}
      target="_blank"
      rel="noopener noreferrer"
      onClick={handleClick}
      style={{
        display: 'inline-flex',
        alignItems: 'center',
        gap: '10px',
        padding: '14px 28px',
        backgroundColor: '#25D366',
        color: '#ffffff',
        borderRadius: '8px',
        fontSize: '1rem',
        fontWeight: 700,
        textDecoration: 'none',
        boxShadow: '0 4px 12px rgba(37, 211, 102, 0.3)',
        transition: 'transform 0.2s, box-shadow 0.2s',
        ...css,
      }}
    >
      <span style={{ fontSize: '1.3em' }}>💬</span>
      {text}
    </a>
  )
}

// ── PriceTable ──
// Categorized price list for service businesses

export const PriceTableRenderer: React.FC<RendererProps> = ({ node, isEditor, onSelect }) => {
  const css = nodeToCSS(node.layout, node.style)
  const data = node.data || {}
  const categories = (data.categories as Array<{
    name: string
    items: Array<{ name: string; price: string; description?: string }>
  }>) || []

  const handleClick = (e: React.MouseEvent) => {
    if (isEditor && onSelect) {
      e.stopPropagation()
      onSelect(node.id)
    }
  }

  return (
    <div
      id={node.id}
      data-component-type={node.type}
      data-component-id={node.id}
      style={{
        width: '100%',
        ...css,
      }}
      onClick={handleClick}
    >
      {categories.map((cat, ci) => (
        <div key={ci} style={{ marginBottom: '32px' }}>
          <h3 style={{
            fontSize: '1.25rem',
            fontWeight: 700,
            color: 'var(--color-accent, #c84b31)',
            marginBottom: '16px',
            paddingBottom: '8px',
            borderBottom: '2px solid var(--color-accent, #c84b31)',
          }}>
            {cat.name}
          </h3>
          {cat.items.map((item, ii) => (
            <div
              key={ii}
              style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                padding: '12px 0',
                borderBottom: '1px solid #f0f0f0',
              }}
            >
              <div>
                <span style={{ fontWeight: 600 }}>{item.name}</span>
                {item.description && (
                  <span style={{ display: 'block', fontSize: '0.85rem', color: '#888', marginTop: '2px' }}>
                    {item.description}
                  </span>
                )}
              </div>
              <span style={{
                fontWeight: 700,
                color: 'var(--color-accent, #c84b31)',
                whiteSpace: 'nowrap',
                marginLeft: '16px',
              }}>
                {item.price}
              </span>
            </div>
          ))}
        </div>
      ))}
      {categories.length === 0 && (
        <p style={{ textAlign: 'center', color: '#999', padding: '24px' }}>
          Fiyat listesi henüz eklenmemiş
        </p>
      )}
    </div>
  )
}

// ── ContactForm ──
// Name, email, message form

export const ContactFormRenderer: React.FC<RendererProps> = ({ node, isEditor, onSelect }) => {
  const css = nodeToCSS(node.layout, node.style)
  const data = node.data || {}

  const handleClick = (e: React.MouseEvent) => {
    if (isEditor && onSelect) {
      e.stopPropagation()
      onSelect(node.id)
    }
  }

  const inputStyle: React.CSSProperties = {
    width: '100%',
    padding: '12px 16px',
    border: '1px solid #ddd',
    borderRadius: '8px',
    fontSize: '1rem',
    fontFamily: 'inherit',
    outline: 'none',
    transition: 'border-color 0.2s',
  }

  return (
    <form
      id={node.id}
      data-component-type={node.type}
      data-component-id={node.id}
      onSubmit={(e) => e.preventDefault()}
      style={{
        width: '100%',
        maxWidth: '600px',
        display: 'flex',
        flexDirection: 'column',
        gap: '16px',
        ...css,
      }}
      onClick={handleClick}
    >
      <div>
        <label style={{ display: 'block', fontWeight: 600, marginBottom: '6px', fontSize: '0.9rem' }}>
          Adınız Soyadınız
        </label>
        <input type="text" placeholder="Ali Yılmaz" style={inputStyle} readOnly={isEditor} />
      </div>
      <div>
        <label style={{ display: 'block', fontWeight: 600, marginBottom: '6px', fontSize: '0.9rem' }}>
          Telefon
        </label>
        <input type="tel" placeholder="0(5xx) xxx xx xx" style={inputStyle} readOnly={isEditor} />
      </div>
      {(data.showEmail !== false) && (
        <div>
          <label style={{ display: 'block', fontWeight: 600, marginBottom: '6px', fontSize: '0.9rem' }}>
            E-posta
          </label>
          <input type="email" placeholder="ali@ornek.com" style={inputStyle} readOnly={isEditor} />
        </div>
      )}
      <div>
        <label style={{ display: 'block', fontWeight: 600, marginBottom: '6px', fontSize: '0.9rem' }}>
          Mesajınız
        </label>
        <textarea
          placeholder="Mesajınızı buraya yazın..."
          rows={4}
          style={{ ...inputStyle, resize: 'vertical' }}
          readOnly={isEditor}
        />
      </div>
      <button
        type="submit"
        style={{
          padding: '14px 28px',
          backgroundColor: 'var(--color-accent, #c84b31)',
          color: '#ffffff',
          border: 'none',
          borderRadius: '8px',
          fontSize: '1rem',
          fontWeight: 700,
          cursor: 'pointer',
          fontFamily: 'inherit',
        }}
      >
        {(data.buttonText as string) || 'Gönder'}
      </button>
    </form>
  )
}

// ── WorkingHours ──
// Weekly hours table

export const WorkingHoursRenderer: React.FC<RendererProps> = ({ node, isEditor, onSelect }) => {
  const css = nodeToCSS(node.layout, node.style)
  const data = node.data || {}

  const dayLabels: Record<string, string> = {
    Monday: 'Pazartesi',
    Tuesday: 'Salı',
    Wednesday: 'Çarşamba',
    Thursday: 'Perşembe',
    Friday: 'Cuma',
    Saturday: 'Cumartesi',
    Sunday: 'Pazar',
  }

  const hours = (data.hours as Array<{ day: string; opens: string; closes: string; isClosed?: boolean }>) || []

  const handleClick = (e: React.MouseEvent) => {
    if (isEditor && onSelect) {
      e.stopPropagation()
      onSelect(node.id)
    }
  }

  return (
    <div
      id={node.id}
      data-component-type={node.type}
      data-component-id={node.id}
      style={{ width: '100%', ...css }}
      onClick={handleClick}
    >
      <table style={{ width: '100%', borderCollapse: 'collapse' }}>
        <tbody>
          {hours.map((h, i) => (
            <tr key={i} style={{ borderBottom: '1px solid #f0f0f0' }}>
              <td style={{ padding: '10px 0', fontWeight: 600 }}>
                {dayLabels[h.day] || h.day}
              </td>
              <td style={{ padding: '10px 0', textAlign: 'right' }}>
                {h.isClosed ? (
                  <span style={{ color: '#c84b31' }}>Kapalı</span>
                ) : (
                  <span>{h.opens} - {h.closes}</span>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      {hours.length === 0 && (
        <p style={{ textAlign: 'center', color: '#999', padding: '16px' }}>
          Çalışma saatleri henüz eklenmemiş
        </p>
      )}
    </div>
  )
}

// ── GoogleMap ──
// Embedded Google Maps (sandbox iframe)

export const GoogleMapRenderer: React.FC<RendererProps> = ({ node, isEditor, onSelect }) => {
  const css = nodeToCSS(node.layout, node.style)
  const data = node.data || {}
  const address = (data.address as string) || 'İstanbul, Türkiye'

  const handleClick = (e: React.MouseEvent) => {
    if (isEditor && onSelect) {
      e.stopPropagation()
      onSelect(node.id)
    }
  }

  const mapUrl = `https://maps.google.com/maps?q=${encodeURIComponent(address)}&output=embed`

  return (
    <div
      id={node.id}
      data-component-type={node.type}
      data-component-id={node.id}
      style={{
        width: '100%',
        height: '400px',
        borderRadius: '12px',
        overflow: 'hidden',
        ...css,
      }}
      onClick={handleClick}
    >
      <iframe
        src={mapUrl}
        width="100%"
        height="100%"
        style={{ border: 0 }}
        allowFullScreen
        loading="lazy"
        referrerPolicy="no-referrer-when-downgrade"
        title="Konum Haritası"
      />
    </div>
  )
}
