/**
 * sectionTemplates.ts — 10 sector-specific section templates
 * as reusable ComponentNode trees.
 * 
 * Each template can be personalized with site config data before insertion.
 */

import { ComponentType } from '@kepenk/site-schema'
import type { ComponentNode, SiteManifest } from '@kepenk/site-schema'

/* ── Helper ── */
function n(
  id: string,
  type: ComponentType,
  opts: {
    data?: Record<string, unknown>
    layout?: Record<string, unknown>
    style?: Record<string, unknown>
    children?: ComponentNode[]
  } = {}
): ComponentNode {
  return {
    id,
    type,
    data: opts.data,
    layout: opts.layout as any,
    style: opts.style as any,
    children: opts.children || [],
    visibility: { desktop: true, tablet: true, mobile: true },
  }
}

function uid() {
  return `sec_${Date.now().toString(36)}_${Math.random().toString(36).slice(2, 6)}`
}

/* ═══════ Template Interface ═══════ */

export interface SectionTemplate {
  id: string
  name: string
  nametr: string
  icon: string
  sectors: string[]      // ['*'] = all sectors
  description: string
  /** Factory that creates a fresh ComponentNode tree (with unique IDs). */
  createNode: (manifest?: SiteManifest | null) => ComponentNode
}

/* ═══════ Templates ═══════ */

export const SECTION_TEMPLATES: SectionTemplate[] = [
  /* ── 1. Hero Centered ── */
  {
    id: 'hero-centered',
    name: 'Hero - Centered',
    nametr: 'Karşılama — Ortalanmış',
    icon: '🎯',
    sectors: ['*'],
    description: 'Tam ekran hero bölümü, başlık, alt metin ve CTA butonu',
    createNode: (m) => {
      const p = uid()
      return n(`${p}-hero`, ComponentType.HERO_BANNER, {
        layout: {
          display: 'flex', flexDirection: 'column',
          justifyContent: 'center', alignItems: 'center',
          minHeight: { value: 80, unit: 'vh' },
          padding: { top: '80px', right: '24px', bottom: '80px', left: '24px' },
        },
        style: { backgroundColor: m?.siteConfig.brandColors.primary || '#1a1a2e' },
        data: {
          title: m?.siteConfig.businessName || 'İşletme Adı',
          subtitle: m?.siteConfig.businessSlogan || 'Kaliteli hizmetin adresi',
          ctaText: 'İletişime Geç',
          ctaLink: m?.siteConfig.contactInfo?.phone ? `tel:${m.siteConfig.contactInfo.phone}` : '#contact',
          overlayColor: 'rgba(0,0,0,0.5)',
        },
      })
    },
  },

  /* ── 2. Hero Split ── */
  {
    id: 'hero-split',
    name: 'Hero - Split',
    nametr: 'Karşılama — İkili',
    icon: '🖼️',
    sectors: ['*'],
    description: 'Sol metin, sağ görsel şeklinde ikili hero',
    createNode: (m) => {
      const p = uid()
      return n(`${p}-hero-split`, ComponentType.SECTION, {
        layout: {
          display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0',
          minHeight: { value: 70, unit: 'vh' },
        },
        children: [
          n(`${p}-left`, ComponentType.FLEX_COLUMN, {
            layout: {
              display: 'flex', flexDirection: 'column',
              justifyContent: 'center',
              padding: { top: '64px', right: '48px', bottom: '64px', left: '48px' },
            },
            style: { backgroundColor: m?.siteConfig.brandColors.background || '#f5f0e8' },
            children: [
              n(`${p}-h1`, ComponentType.HEADING, {
                data: { level: 'h1', text: m?.siteConfig.businessName || 'İşletme Adı' },
                style: { color: m?.siteConfig.brandColors.text || '#1a1a2e' },
              }),
              n(`${p}-sp`, ComponentType.SPACER, { data: { height: '16px' } }),
              n(`${p}-sub`, ComponentType.TEXT, {
                data: { text: m?.siteConfig.businessSlogan || 'Kaliteli hizmetin adresi', size: 'lg' },
                style: { color: m?.siteConfig.brandColors.text || '#6b7280', opacity: 0.8 },
              }),
              n(`${p}-sp2`, ComponentType.SPACER, { data: { height: '24px' } }),
              n(`${p}-btn`, ComponentType.BUTTON, {
                data: { text: 'Hemen Ara', variant: 'primary', href: '#' },
                style: { backgroundColor: m?.siteConfig.brandColors.accent || '#c84b31' },
              }),
            ],
          }),
          n(`${p}-right`, ComponentType.IMAGE, {
            data: { src: '', alt: 'Hero görsel', objectFit: 'cover' },
            layout: { width: { value: 100, unit: '%' }, height: { value: 100, unit: '%' } },
            style: { backgroundColor: '#e2e8f0' },
          }),
        ],
      })
    },
  },

  /* ── 3. Services Grid ── */
  {
    id: 'services-grid',
    name: 'Services Grid',
    nametr: 'Hizmet Izgarası',
    icon: '⊞',
    sectors: ['*'],
    description: '3 sütunlu hizmet kartları ızgarası',
    createNode: (m) => {
      const p = uid()
      return n(`${p}-services`, ComponentType.SECTION, {
        layout: {
          display: 'flex', flexDirection: 'column', alignItems: 'center',
          padding: { top: '80px', right: '24px', bottom: '80px', left: '24px' },
        },
        style: { backgroundColor: m?.siteConfig.brandColors.background || '#f5f0e8' },
        children: [
          n(`${p}-heading`, ComponentType.HEADING, {
            data: { level: 'h2', text: 'Hizmetlerimiz', alignment: 'center' },
            style: { color: m?.siteConfig.brandColors.accent || '#c84b31' },
          }),
          n(`${p}-sp`, ComponentType.SPACER, { data: { height: '32px' } }),
          n(`${p}-grid`, ComponentType.GRID, {
            layout: { display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '24px', maxWidth: { value: 960, unit: 'px' } },
            children: ['Hizmet 1', 'Hizmet 2', 'Hizmet 3'].map((h, i) =>
              n(`${p}-card-${i}`, ComponentType.TEXT, {
                data: { text: h, alignment: 'center', size: 'md' },
                style: {
                  backgroundColor: '#ffffff',
                  borderRadius: '12px',
                  padding: { top: '32px', right: '24px', bottom: '32px', left: '24px' },
                  boxShadow: '0 2px 12px rgba(0,0,0,0.06)',
                  color: m?.siteConfig.brandColors.text || '#1a1a2e',
                },
              })
            ),
          }),
        ],
      })
    },
  },

  /* ── 4. Price Table ── */
  {
    id: 'price-table',
    name: 'Price Table',
    nametr: 'Fiyat Listesi',
    icon: '💰',
    sectors: ['berber', 'kuafor', 'guzellik-salonu', 'oto-yikama', 'terzi', '*'],
    description: 'Kategorili fiyat listesi tablosu',
    createNode: (m) => {
      const p = uid()
      return n(`${p}-prices`, ComponentType.SECTION, {
        layout: {
          display: 'flex', flexDirection: 'column', alignItems: 'center',
          padding: { top: '80px', right: '24px', bottom: '80px', left: '24px' },
        },
        style: { backgroundColor: '#ffffff' },
        children: [
          n(`${p}-heading`, ComponentType.HEADING, {
            data: { level: 'h2', text: 'Fiyat Listemiz', alignment: 'center' },
            style: { color: m?.siteConfig.brandColors.accent || '#c84b31' },
          }),
          n(`${p}-sp`, ComponentType.SPACER, { data: { height: '32px' } }),
          n(`${p}-table`, ComponentType.PRICE_TABLE, {
            data: {
              categories: [{ name: 'Hizmetler', items: [
                { name: 'Hizmet 1', price: '₺100' },
                { name: 'Hizmet 2', price: '₺150' },
                { name: 'Hizmet 3', price: '₺200' },
              ]}],
              showCurrency: true, currency: '₺',
            },
            layout: { maxWidth: { value: 600, unit: 'px' } },
          }),
        ],
      })
    },
  },

  /* ── 5. Gallery Grid ── */
  {
    id: 'gallery-grid',
    name: 'Gallery Grid',
    nametr: 'Fotoğraf Galerisi',
    icon: '🖼️',
    sectors: ['*'],
    description: '2x3 grid fotoğraf galerisi',
    createNode: (m) => {
      const p = uid()
      return n(`${p}-gallery`, ComponentType.SECTION, {
        layout: {
          display: 'flex', flexDirection: 'column', alignItems: 'center',
          padding: { top: '80px', right: '24px', bottom: '80px', left: '24px' },
        },
        style: { backgroundColor: m?.siteConfig.brandColors.background || '#f5f0e8' },
        children: [
          n(`${p}-heading`, ComponentType.HEADING, {
            data: { level: 'h2', text: 'Galeri', alignment: 'center' },
            style: { color: m?.siteConfig.brandColors.accent || '#c84b31' },
          }),
          n(`${p}-sp`, ComponentType.SPACER, { data: { height: '32px' } }),
          n(`${p}-grid`, ComponentType.GRID, {
            layout: { display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '16px', maxWidth: { value: 960, unit: 'px' } },
            children: Array.from({ length: 6 }, (_, i) =>
              n(`${p}-img-${i}`, ComponentType.IMAGE, {
                data: { src: '', alt: `Galeri foto ${i + 1}`, objectFit: 'cover' },
                style: { backgroundColor: '#ddd', borderRadius: '8px' },
                layout: { height: { value: 220, unit: 'px' } },
              })
            ),
          }),
        ],
      })
    },
  },

  /* ── 6. Testimonials ── */
  {
    id: 'testimonials',
    name: 'Testimonials',
    nametr: 'Müşteri Yorumları',
    icon: '⭐',
    sectors: ['*'],
    description: '3 müşteri yorum kartı',
    createNode: (m) => {
      const p = uid()
      const reviews = [
        { name: 'Ahmet Y.', text: 'Çok memnun kaldım, kesinlikle tavsiye ederim!', stars: 5 },
        { name: 'Fatma K.', text: 'Harika bir hizmet, tekrar geleceğim.', stars: 5 },
        { name: 'Mehmet A.', text: 'Profesyonel ve güler yüzlü ekip.', stars: 4 },
      ]
      return n(`${p}-testimonials`, ComponentType.SECTION, {
        layout: {
          display: 'flex', flexDirection: 'column', alignItems: 'center',
          padding: { top: '80px', right: '24px', bottom: '80px', left: '24px' },
        },
        style: { backgroundColor: '#ffffff' },
        children: [
          n(`${p}-heading`, ComponentType.HEADING, {
            data: { level: 'h2', text: 'Müşterilerimiz Ne Diyor?', alignment: 'center' },
            style: { color: m?.siteConfig.brandColors.accent || '#c84b31' },
          }),
          n(`${p}-sp`, ComponentType.SPACER, { data: { height: '32px' } }),
          n(`${p}-grid`, ComponentType.GRID, {
            layout: { display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '24px', maxWidth: { value: 960, unit: 'px' } },
            children: reviews.map((r, i) =>
              n(`${p}-review-${i}`, ComponentType.TEXT, {
                data: { text: `"${r.text}"\n— ${r.name} ${'⭐'.repeat(r.stars)}`, alignment: 'center', size: 'md' },
                style: {
                  backgroundColor: m?.siteConfig.brandColors.background || '#f5f0e8',
                  borderRadius: '12px',
                  padding: { top: '32px', right: '24px', bottom: '32px', left: '24px' },
                  color: m?.siteConfig.brandColors.text || '#1a1a2e',
                },
              })
            ),
          }),
        ],
      })
    },
  },

  /* ── 7. Contact Form ── */
  {
    id: 'contact-form',
    name: 'Contact Form',
    nametr: 'İletişim Formu',
    icon: '📞',
    sectors: ['*'],
    description: 'İsim, telefon, mesaj alanları ile iletişim formu',
    createNode: (m) => {
      const p = uid()
      return n(`${p}-contact`, ComponentType.SECTION, {
        layout: {
          display: 'flex', flexDirection: 'column', alignItems: 'center',
          padding: { top: '80px', right: '24px', bottom: '80px', left: '24px' },
        },
        style: { backgroundColor: m?.siteConfig.brandColors.background || '#f5f0e8' },
        children: [
          n(`${p}-heading`, ComponentType.HEADING, {
            data: { level: 'h2', text: 'İletişim', alignment: 'center' },
            style: { color: m?.siteConfig.brandColors.accent || '#c84b31' },
          }),
          n(`${p}-sp`, ComponentType.SPACER, { data: { height: '24px' } }),
          n(`${p}-form`, ComponentType.CONTACT_FORM, {
            data: { buttonText: 'Mesaj Gönder', showEmail: true, showPhone: true },
            layout: { maxWidth: { value: 500, unit: 'px' } },
          }),
        ],
      })
    },
  },

  /* ── 8. Map + Working Hours ── */
  {
    id: 'map-hours',
    name: 'Map + Hours',
    nametr: 'Harita + Çalışma Saatleri',
    icon: '📍',
    sectors: ['*'],
    description: 'Google harita ve çalışma saatleri yan yana',
    createNode: (m) => {
      const p = uid()
      return n(`${p}-map-hours`, ComponentType.SECTION, {
        layout: {
          display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '32px',
          padding: { top: '80px', right: '24px', bottom: '80px', left: '24px' },
          maxWidth: { value: 960, unit: 'px' },
        },
        style: { backgroundColor: '#ffffff' },
        children: [
          n(`${p}-map`, ComponentType.GOOGLE_MAP, {
            data: { address: m?.siteConfig.contactInfo?.address || 'İstanbul' },
            layout: { height: { value: 400, unit: 'px' } },
            style: { borderRadius: '12px' },
          }),
          n(`${p}-hours-col`, ComponentType.FLEX_COLUMN, {
            layout: { display: 'flex', flexDirection: 'column', justifyContent: 'center' },
            children: [
              n(`${p}-hours-heading`, ComponentType.HEADING, {
                data: { level: 'h3', text: 'Çalışma Saatleri' },
                style: { color: m?.siteConfig.brandColors.accent || '#c84b31' },
              }),
              n(`${p}-sp`, ComponentType.SPACER, { data: { height: '16px' } }),
              n(`${p}-hours`, ComponentType.WORKING_HOURS, {
                data: {
                  hours: [
                    { day: 'Monday', opens: '09:00', closes: '18:00' },
                    { day: 'Tuesday', opens: '09:00', closes: '18:00' },
                    { day: 'Wednesday', opens: '09:00', closes: '18:00' },
                    { day: 'Thursday', opens: '09:00', closes: '18:00' },
                    { day: 'Friday', opens: '09:00', closes: '18:00' },
                    { day: 'Saturday', opens: '10:00', closes: '16:00' },
                    { day: 'Sunday', opens: '00:00', closes: '00:00', isClosed: true },
                  ],
                },
              }),
            ],
          }),
        ],
      })
    },
  },

  /* ── 9. About Story ── */
  {
    id: 'about-story',
    name: 'About Story',
    nametr: 'Hakkımızda',
    icon: '📖',
    sectors: ['*'],
    description: 'İşletme hikayesi, görsel + metin',
    createNode: (m) => {
      const p = uid()
      return n(`${p}-about`, ComponentType.SECTION, {
        layout: {
          display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '48px',
          padding: { top: '80px', right: '24px', bottom: '80px', left: '24px' },
          maxWidth: { value: 960, unit: 'px' },
        },
        style: { backgroundColor: m?.siteConfig.brandColors.background || '#f5f0e8' },
        children: [
          n(`${p}-img`, ComponentType.IMAGE, {
            data: { src: '', alt: 'Hakkımızda görseli', objectFit: 'cover' },
            style: { borderRadius: '12px', backgroundColor: '#ddd' },
            layout: { height: { value: 400, unit: 'px' } },
          }),
          n(`${p}-content`, ComponentType.FLEX_COLUMN, {
            layout: { display: 'flex', flexDirection: 'column', justifyContent: 'center' },
            children: [
              n(`${p}-h2`, ComponentType.HEADING, {
                data: { level: 'h2', text: 'Hikayemiz' },
                style: { color: m?.siteConfig.brandColors.accent || '#c84b31' },
              }),
              n(`${p}-sp`, ComponentType.SPACER, { data: { height: '16px' } }),
              n(`${p}-text`, ComponentType.TEXT, {
                data: {
                  text: `${m?.siteConfig.businessName || 'İşletmemiz'} yıllardır sektörde güvenilir ve kaliteli hizmet sunmaktadır. Müşteri memnuniyetini her şeyin üstünde tutan ekibimizle, size en iyi deneyimi yaşatmak için çalışıyoruz.`,
                  size: 'md',
                },
                style: { color: m?.siteConfig.brandColors.text || '#6b7280', lineHeight: '1.8' },
              }),
            ],
          }),
        ],
      })
    },
  },

  /* ── 10. WhatsApp CTA Banner ── */
  {
    id: 'cta-whatsapp',
    name: 'WhatsApp CTA',
    nametr: 'WhatsApp CTA',
    icon: '💬',
    sectors: ['*'],
    description: 'Dikkat çekici WhatsApp iletişim bandı',
    createNode: (m) => {
      const p = uid()
      const phone = m?.siteConfig.contactInfo?.phone?.replace(/\D/g, '') || ''
      return n(`${p}-cta`, ComponentType.SECTION, {
        layout: {
          display: 'flex', flexDirection: 'column', alignItems: 'center',
          padding: { top: '64px', right: '24px', bottom: '64px', left: '24px' },
        },
        style: {
          backgroundColor: m?.siteConfig.brandColors.accent || '#c84b31',
        },
        children: [
          n(`${p}-heading`, ComponentType.HEADING, {
            data: { level: 'h2', text: 'Hemen İletişime Geçin', alignment: 'center' },
            style: { color: '#ffffff' },
          }),
          n(`${p}-sp`, ComponentType.SPACER, { data: { height: '16px' } }),
          n(`${p}-sub`, ComponentType.TEXT, {
            data: { text: 'WhatsApp üzerinden anında ulaşın', alignment: 'center', size: 'lg' },
            style: { color: '#ffffff', opacity: 0.9 },
          }),
          n(`${p}-sp2`, ComponentType.SPACER, { data: { height: '24px' } }),
          n(`${p}-wa`, ComponentType.WHATSAPP_CTA, {
            data: {
              text: 'WhatsApp ile Yaz',
              variant: 'large',
              phone,
              message: `Merhaba, ${m?.siteConfig.businessName || 'işletmeniz'} hakkında bilgi almak istiyorum.`,
            },
          }),
        ],
      })
    },
  },
]

/**
 * Get templates filtered by sector. '*' templates always show.
 */
export function getTemplatesForSector(sector: string): SectionTemplate[] {
  return SECTION_TEMPLATES.filter(t =>
    t.sectors.includes('*') || t.sectors.includes(sector)
  )
}
