/**
 * @kepenk/templates — Map Section Components
 *
 * full_width: Full-width Google Maps embed or static address fallback.
 */

'use client'

import type { SectionProps } from '../../types/section-types'
import type { MapContent } from '../../types/section-content'
import { registerSection } from '../../registry/section-registry'

function MapFullWidth({ content, business }: SectionProps<MapContent>) {
  const address = content.address || business.address
  const embedUrl =
    content.embedUrl ||
    `https://maps.google.com/maps?q=${encodeURIComponent(address)}&output=embed`

  return (
    <section className="relative">
      {/* Title bar (optional) */}
      {content.title && (
        <div
          className="bg-surface px-4 md:px-8 py-6 text-center"
        >
          <h2 className="text-xl font-heading font-bold text-foreground">{content.title}</h2>
        </div>
      )}

      {/* Map embed */}
      <div className="relative w-full" style={{ height: '400px' }}>
        <iframe
          src={embedUrl}
          title={`${business.name} harita`}
          className="absolute inset-0 w-full h-full border-0"
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
          allowFullScreen
        />
      </div>

      {/* Info cards overlay */}
      {content.infoCards && content.infoCards.length > 0 && (
        <div
          className="bg-bg px-4 md:px-8 py-6"
        >
          <div
            className="mx-auto flex flex-col sm:flex-row items-center justify-center gap-6 text-sm text-foreground-secondary"
            style={{ maxWidth: 'var(--container-lg)' }}
          >
            {content.infoCards.map((card, i) => (
              <div key={i} className="flex items-center gap-2">
                <span className="text-lg">
                  {card.icon === 'map-pin' ? '📍' :
                   card.icon === 'clock' ? '⏰' :
                   card.icon === 'phone' ? '📞' :
                   card.icon === 'car' ? '🚗' : '•'}
                </span>
                <span>
                  <span className="font-medium text-foreground">{card.label}:</span> {card.value}
                </span>
              </div>
            ))}
          </div>
        </div>
      )}
    </section>
  )
}

registerSection('map', 'full_width', MapFullWidth as unknown as React.ComponentType<SectionProps<Record<string, unknown>>>)
registerSection('map', 'default', MapFullWidth as unknown as React.ComponentType<SectionProps<Record<string, unknown>>>)

export { MapFullWidth }
