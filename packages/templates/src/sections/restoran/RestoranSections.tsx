/**
 * @kepenk/templates — Restoran Section Components
 *
 * 5 sector-specific sections for restaurant themes:
 * 1. MenuTabCategories — tabbed menu with categories
 * 2. MenuVisualGrid — visual menu grid with photos
 * 3. ReservationForm — table reservation form
 * 4. DailySpecialBanner — daily/weekly special highlight
 * 5. DeliveryZoneMap — delivery area with zones
 */

'use client'

import { useState } from 'react'
import type { SectionProps } from '../../types/section-types'
import { registerSection } from '../../registry/section-registry'

// ═══════════════════════════════════════════
// 1. MENU — TAB CATEGORIES
// ═══════════════════════════════════════════

interface MenuCategory {
  id: string
  name: string
  icon?: string
  items: MenuItem[]
}

interface MenuItem {
  id: string
  name: string
  description?: string
  price: string
  image?: string
  badges?: string[]  // 'yeni', 'popüler', 'vegan', 'acılı'
  allergens?: string[]
}

interface MenuTabContent {
  badge?: string
  title: string
  subtitle?: string
  categories: MenuCategory[]
  currency?: string
  note?: string // e.g. "Fiyatlara KDV dahildir"
}

function MenuTabCategories({ content, business }: SectionProps<MenuTabContent>) {
  const [activeTab, setActiveTab] = useState(0)
  const cats = content.categories || []
  const active = cats[activeTab]

  return (
    <section className="py-16 md:py-24 px-4" style={{ background: 'var(--color-bg)' }}>
      <div className="mx-auto" style={{ maxWidth: 'var(--container-lg, 1024px)' }}>
        {content.badge && (
          <span className="inline-block text-xs font-semibold tracking-widest uppercase mb-3" style={{ color: 'var(--color-accent)' }}>
            {content.badge}
          </span>
        )}
        <h2 className="text-3xl md:text-4xl font-heading font-bold mb-2" style={{ color: 'var(--color-text)' }}>
          {content.title}
        </h2>
        {content.subtitle && (
          <p className="text-base mb-8" style={{ color: 'var(--color-text-secondary)' }}>{content.subtitle}</p>
        )}

        {/* Tabs */}
        <div className="flex gap-2 overflow-x-auto pb-2 mb-8 border-b" style={{ borderColor: 'var(--color-border)' }}>
          {cats.map((cat, i) => (
            <button
              key={cat.id}
              onClick={() => setActiveTab(i)}
              className="px-4 py-2 text-sm font-medium whitespace-nowrap rounded-t-lg transition-colors"
              style={{
                background: i === activeTab ? 'var(--color-accent)' : 'transparent',
                color: i === activeTab ? 'var(--color-text-on-accent)' : 'var(--color-text-secondary)',
              }}
            >
              {cat.icon && <span className="mr-1">{cat.icon}</span>}
              {cat.name}
            </button>
          ))}
        </div>

        {/* Items */}
        {active && (
          <div className="space-y-4">
            {active.items.map((item) => (
              <div
                key={item.id}
                className="flex items-start justify-between gap-4 p-4 rounded-lg transition-colors"
                style={{ background: 'var(--color-surface)' }}
              >
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-1">
                    <h3 className="font-semibold" style={{ color: 'var(--color-text)' }}>{item.name}</h3>
                    {item.badges?.map((b) => (
                      <span key={b} className="text-[10px] px-1.5 py-0.5 rounded-full font-medium"
                        style={{ background: 'var(--color-accent-light)', color: 'var(--color-accent)' }}>
                        {b}
                      </span>
                    ))}
                  </div>
                  {item.description && (
                    <p className="text-sm" style={{ color: 'var(--color-text-muted)' }}>{item.description}</p>
                  )}
                </div>
                <span className="font-bold text-lg shrink-0" style={{ color: 'var(--color-accent)' }}>
                  {item.price}
                </span>
              </div>
            ))}
          </div>
        )}

        {content.note && (
          <p className="text-xs mt-6 text-center" style={{ color: 'var(--color-text-muted)' }}>{content.note}</p>
        )}
      </div>
    </section>
  )
}

registerSection('menu_display', 'tab_categories', MenuTabCategories as unknown as React.ComponentType<SectionProps<Record<string, unknown>>>)
registerSection('menu_display', 'default', MenuTabCategories as unknown as React.ComponentType<SectionProps<Record<string, unknown>>>)

// ═══════════════════════════════════════════
// 2. MENU — VISUAL GRID
// ═══════════════════════════════════════════

interface MenuVisualItem {
  id: string
  name: string
  description?: string
  price: string
  image?: string
  badges?: string[]
}

interface MenuVisualContent {
  badge?: string
  title: string
  subtitle?: string
  items: MenuVisualItem[]
  columns?: 2 | 3 | 4
  note?: string
}

function MenuVisualGrid({ content }: SectionProps<MenuVisualContent>) {
  const cols = content.columns || 3

  return (
    <section className="py-16 md:py-24 px-4" style={{ background: 'var(--color-bg)' }}>
      <div className="mx-auto" style={{ maxWidth: 'var(--container-lg, 1024px)' }}>
        {content.badge && (
          <span className="inline-block text-xs font-semibold tracking-widest uppercase mb-3" style={{ color: 'var(--color-accent)' }}>
            {content.badge}
          </span>
        )}
        <h2 className="text-3xl md:text-4xl font-heading font-bold mb-2" style={{ color: 'var(--color-text)' }}>
          {content.title}
        </h2>
        {content.subtitle && (
          <p className="text-base mb-10" style={{ color: 'var(--color-text-secondary)' }}>{content.subtitle}</p>
        )}

        <div className={`grid gap-6 ${cols === 2 ? 'grid-cols-1 sm:grid-cols-2' : cols === 4 ? 'grid-cols-2 md:grid-cols-4' : 'grid-cols-1 sm:grid-cols-2 md:grid-cols-3'}`}>
          {(content.items || []).map((item) => (
            <div key={item.id} className="rounded-xl overflow-hidden group" style={{ background: 'var(--color-surface)' }}>
              {item.image ? (
                <div className="aspect-[4/3] overflow-hidden">
                  <div
                    className="w-full h-full bg-cover bg-center group-hover:scale-105 transition-transform duration-500"
                    style={{ backgroundImage: `url(${item.image})` }}
                  />
                </div>
              ) : (
                <div className="aspect-[4/3] flex items-center justify-center text-4xl" style={{ background: 'var(--color-surface-muted)' }}>
                  🍽️
                </div>
              )}
              <div className="p-4">
                <div className="flex items-start justify-between gap-2 mb-1">
                  <h3 className="font-semibold" style={{ color: 'var(--color-text)' }}>{item.name}</h3>
                  <span className="font-bold shrink-0" style={{ color: 'var(--color-accent)' }}>{item.price}</span>
                </div>
                {item.description && (
                  <p className="text-sm" style={{ color: 'var(--color-text-muted)' }}>{item.description}</p>
                )}
                {item.badges && item.badges.length > 0 && (
                  <div className="flex gap-1 mt-2">
                    {item.badges.map((b) => (
                      <span key={b} className="text-[10px] px-1.5 py-0.5 rounded-full"
                        style={{ background: 'var(--color-accent-light)', color: 'var(--color-accent)' }}>
                        {b}
                      </span>
                    ))}
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>

        {content.note && (
          <p className="text-xs mt-6 text-center" style={{ color: 'var(--color-text-muted)' }}>{content.note}</p>
        )}
      </div>
    </section>
  )
}

registerSection('menu_display', 'visual_grid', MenuVisualGrid as unknown as React.ComponentType<SectionProps<Record<string, unknown>>>)

// ═══════════════════════════════════════════
// 3. RESERVATION FORM
// ═══════════════════════════════════════════

interface ReservationContent {
  badge?: string
  title: string
  subtitle?: string
  minGuests?: number
  maxGuests?: number
  phone?: string
  submitText?: string
  successMessage?: string
  note?: string
}

function ReservationForm({ content, business }: SectionProps<ReservationContent>) {
  const [submitted, setSubmitted] = useState(false)

  return (
    <section className="py-16 md:py-24 px-4" style={{ background: 'var(--color-surface)' }}>
      <div className="mx-auto" style={{ maxWidth: '480px' }}>
        {content.badge && (
          <span className="inline-block text-xs font-semibold tracking-widest uppercase mb-3 text-center w-full" style={{ color: 'var(--color-accent)' }}>
            {content.badge}
          </span>
        )}
        <h2 className="text-2xl md:text-3xl font-heading font-bold mb-2 text-center" style={{ color: 'var(--color-text)' }}>
          {content.title}
        </h2>
        {content.subtitle && (
          <p className="text-sm mb-8 text-center" style={{ color: 'var(--color-text-secondary)' }}>{content.subtitle}</p>
        )}

        {submitted ? (
          <div className="text-center py-8">
            <span className="text-4xl mb-4 block">✅</span>
            <p className="font-medium" style={{ color: 'var(--color-text)' }}>
              {content.successMessage || 'Rezervasyonunuz alındı! Onay için arayacağız.'}
            </p>
          </div>
        ) : (
          <form
            className="space-y-4"
            onSubmit={(e) => { e.preventDefault(); setSubmitted(true) }}
          >
            <div>
              <label className="block text-sm font-medium mb-1" style={{ color: 'var(--color-text)' }}>Ad Soyad *</label>
              <input type="text" required placeholder="Adınız Soyadınız"
                className="w-full px-3 py-2.5 rounded-lg border text-sm outline-none focus:ring-2"
                style={{ borderColor: 'var(--color-border)', background: 'var(--color-bg)', color: 'var(--color-text)' }}
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1" style={{ color: 'var(--color-text)' }}>Telefon *</label>
              <input type="tel" required placeholder="05XX XXX XX XX"
                className="w-full px-3 py-2.5 rounded-lg border text-sm outline-none focus:ring-2"
                style={{ borderColor: 'var(--color-border)', background: 'var(--color-bg)', color: 'var(--color-text)' }}
              />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium mb-1" style={{ color: 'var(--color-text)' }}>Tarih *</label>
                <input type="date" required
                  className="w-full px-3 py-2.5 rounded-lg border text-sm outline-none focus:ring-2"
                  style={{ borderColor: 'var(--color-border)', background: 'var(--color-bg)', color: 'var(--color-text)' }}
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1" style={{ color: 'var(--color-text)' }}>Saat *</label>
                <input type="time" required
                  className="w-full px-3 py-2.5 rounded-lg border text-sm outline-none focus:ring-2"
                  style={{ borderColor: 'var(--color-border)', background: 'var(--color-bg)', color: 'var(--color-text)' }}
                />
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium mb-1" style={{ color: 'var(--color-text)' }}>Kişi Sayısı *</label>
              <select required
                className="w-full px-3 py-2.5 rounded-lg border text-sm outline-none focus:ring-2"
                style={{ borderColor: 'var(--color-border)', background: 'var(--color-bg)', color: 'var(--color-text)' }}
              >
                {Array.from({ length: (content.maxGuests || 10) - (content.minGuests || 1) + 1 }, (_, i) => i + (content.minGuests || 1)).map(n => (
                  <option key={n} value={n}>{n} kişi</option>
                ))}
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium mb-1" style={{ color: 'var(--color-text)' }}>Not (opsiyonel)</label>
              <textarea rows={2} placeholder="Özel talep, alerji bilgisi vb."
                className="w-full px-3 py-2.5 rounded-lg border text-sm outline-none focus:ring-2 resize-none"
                style={{ borderColor: 'var(--color-border)', background: 'var(--color-bg)', color: 'var(--color-text)' }}
              />
            </div>
            <button
              type="submit"
              className="w-full py-3 rounded-lg font-semibold text-sm transition-colors"
              style={{ background: 'var(--color-accent)', color: 'var(--color-text-on-accent)' }}
            >
              {content.submitText || 'Rezervasyon Yap'}
            </button>
            {content.note && (
              <p className="text-xs text-center" style={{ color: 'var(--color-text-muted)' }}>{content.note}</p>
            )}
          </form>
        )}
      </div>
    </section>
  )
}

registerSection('reservation', 'default', ReservationForm as unknown as React.ComponentType<SectionProps<Record<string, unknown>>>)

// ═══════════════════════════════════════════
// 4. DAILY SPECIAL BANNER
// ═══════════════════════════════════════════

interface DailySpecialContent {
  badge?: string
  title: string
  description?: string
  price?: string
  originalPrice?: string
  image?: string
  validUntil?: string
  cta?: { text: string; href: string }
}

function DailySpecialBanner({ content }: SectionProps<DailySpecialContent>) {
  return (
    <section className="py-12 px-4" style={{ background: 'var(--color-accent)', color: 'var(--color-text-on-accent)' }}>
      <div className="mx-auto flex flex-col md:flex-row items-center gap-8" style={{ maxWidth: 'var(--container-lg, 1024px)' }}>
        {content.image && (
          <div className="w-32 h-32 md:w-40 md:h-40 rounded-full overflow-hidden shrink-0">
            <div className="w-full h-full bg-cover bg-center" style={{ backgroundImage: `url(${content.image})` }} />
          </div>
        )}
        <div className="text-center md:text-left flex-1">
          {content.badge && (
            <span className="inline-block text-xs font-semibold tracking-widest uppercase mb-2 opacity-80">
              {content.badge}
            </span>
          )}
          <h2 className="text-2xl md:text-3xl font-heading font-bold mb-2">
            {content.title}
          </h2>
          {content.description && (
            <p className="text-sm opacity-90 mb-3">{content.description}</p>
          )}
          <div className="flex items-center gap-3 justify-center md:justify-start">
            {content.price && (
              <span className="text-3xl font-bold">{content.price}</span>
            )}
            {content.originalPrice && (
              <span className="text-lg line-through opacity-60">{content.originalPrice}</span>
            )}
          </div>
          {content.validUntil && (
            <p className="text-xs mt-2 opacity-70">Geçerlilik: {content.validUntil}</p>
          )}
        </div>
        {content.cta && (
          <a
            href={content.cta.href}
            className="px-8 py-3 rounded-lg font-semibold text-sm transition-transform hover:scale-105 shrink-0"
            style={{ background: 'var(--color-bg)', color: 'var(--color-accent)' }}
          >
            {content.cta.text}
          </a>
        )}
      </div>
    </section>
  )
}

registerSection('daily_special', 'default', DailySpecialBanner as unknown as React.ComponentType<SectionProps<Record<string, unknown>>>)
registerSection('daily_special', 'banner', DailySpecialBanner as unknown as React.ComponentType<SectionProps<Record<string, unknown>>>)

// ═══════════════════════════════════════════
// 5. DELIVERY ZONE
// ═══════════════════════════════════════════

interface DeliveryZone {
  name: string
  minOrder?: string
  deliveryFee?: string
  estimatedTime?: string
}

interface DeliveryZoneContent {
  badge?: string
  title: string
  subtitle?: string
  zones: DeliveryZone[]
  phone?: string
  platforms?: { name: string; url: string; icon?: string }[]
  note?: string
}

function DeliveryZoneMap({ content, business }: SectionProps<DeliveryZoneContent>) {
  return (
    <section className="py-16 md:py-24 px-4" style={{ background: 'var(--color-surface)' }}>
      <div className="mx-auto" style={{ maxWidth: 'var(--container-md, 768px)' }}>
        {content.badge && (
          <span className="inline-block text-xs font-semibold tracking-widest uppercase mb-3" style={{ color: 'var(--color-accent)' }}>
            {content.badge}
          </span>
        )}
        <h2 className="text-2xl md:text-3xl font-heading font-bold mb-2" style={{ color: 'var(--color-text)' }}>
          {content.title}
        </h2>
        {content.subtitle && (
          <p className="text-sm mb-8" style={{ color: 'var(--color-text-secondary)' }}>{content.subtitle}</p>
        )}

        {/* Zones table */}
        <div className="rounded-xl overflow-hidden" style={{ background: 'var(--color-bg)' }}>
          <table className="w-full text-sm">
            <thead>
              <tr style={{ background: 'var(--color-surface-muted)' }}>
                <th className="text-left px-4 py-3 font-semibold" style={{ color: 'var(--color-text)' }}>Bölge</th>
                <th className="text-center px-4 py-3 font-semibold" style={{ color: 'var(--color-text)' }}>Min. Sipariş</th>
                <th className="text-center px-4 py-3 font-semibold" style={{ color: 'var(--color-text)' }}>Teslimat</th>
                <th className="text-center px-4 py-3 font-semibold" style={{ color: 'var(--color-text)' }}>Süre</th>
              </tr>
            </thead>
            <tbody>
              {(content.zones || []).map((z, i) => (
                <tr key={i} style={{ borderTop: '1px solid var(--color-border-subtle)' }}>
                  <td className="px-4 py-3 font-medium" style={{ color: 'var(--color-text)' }}>{z.name}</td>
                  <td className="px-4 py-3 text-center" style={{ color: 'var(--color-text-secondary)' }}>{z.minOrder || '—'}</td>
                  <td className="px-4 py-3 text-center" style={{ color: 'var(--color-text-secondary)' }}>{z.deliveryFee || 'Ücretsiz'}</td>
                  <td className="px-4 py-3 text-center" style={{ color: 'var(--color-text-secondary)' }}>{z.estimatedTime || '—'}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Delivery platforms */}
        {content.platforms && content.platforms.length > 0 && (
          <div className="mt-6">
            <p className="text-sm font-medium mb-3" style={{ color: 'var(--color-text)' }}>Sipariş Platformları:</p>
            <div className="flex flex-wrap gap-3">
              {content.platforms.map((p, i) => (
                <a
                  key={i}
                  href={p.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-4 py-2 rounded-lg text-sm font-medium transition-colors"
                  style={{ background: 'var(--color-accent)', color: 'var(--color-text-on-accent)' }}
                >
                  {p.icon && <span className="mr-1">{p.icon}</span>}
                  {p.name}
                </a>
              ))}
            </div>
          </div>
        )}

        {content.note && (
          <p className="text-xs mt-4" style={{ color: 'var(--color-text-muted)' }}>{content.note}</p>
        )}
      </div>
    </section>
  )
}

registerSection('delivery_zone', 'default', DeliveryZoneMap as unknown as React.ComponentType<SectionProps<Record<string, unknown>>>)

// ═══ Exports ═══
export { MenuTabCategories, MenuVisualGrid, ReservationForm, DailySpecialBanner, DeliveryZoneMap }
