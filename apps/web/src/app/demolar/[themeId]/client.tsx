/**
 * /demolar/[themeId] — Client-side dynamic demo renderer
 *
 * 1. Registers universal + sector-specific sections via registerSectorSections()
 * 2. Loads theme config + business data via loadThemeConfig()
 * 3. Renders with ThemeRenderer
 *
 * This replaces the need for 200+ individual client.tsx files.
 */

'use client'

import { useEffect, useState } from 'react'
import {
  ThemeRenderer,
  registerSectorSections,
  loadThemeConfig,
} from '@kepenk/templates'
import type { ThemeConfig, BusinessData } from '@kepenk/templates'

interface Props {
  themeId: string
  sectorId: string
  seoSchemaType: string
}

export default function DemoClient({ themeId, sectorId, seoSchemaType }: Props) {
  const [state, setState] = useState<{
    config: ThemeConfig
    business: BusinessData
  } | null>(null)
  const [error, setError] = useState(false)

  useEffect(() => {
    let cancelled = false

    async function load() {
      try {
        // Register section components for this sector (side-effect imports)
        await registerSectorSections(sectorId)

        // Load theme config + business data
        const result = await loadThemeConfig(themeId)
        if (cancelled) return

        if (!result) {
          setError(true)
          return
        }

        setState(result)
      } catch (err) {
        if (!cancelled) {
          console.error(`[DemoClient] Failed to load theme "${themeId}":`, err)
          setError(true)
        }
      }
    }

    load()
    return () => { cancelled = true }
  }, [themeId, sectorId])

  if (error) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-50">
        <div className="text-center p-8">
          <h1 className="text-2xl font-bold text-gray-800 mb-2">Tema yüklenemedi</h1>
          <p className="text-gray-500">
            &ldquo;{themeId}&rdquo; teması için yapılandırma bulunamadı.
          </p>
        </div>
      </div>
    )
  }

  if (!state) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-white">
        <div className="text-center">
          <div className="w-8 h-8 border-2 border-gray-300 border-t-gray-800 rounded-full animate-spin mx-auto mb-4" />
          <p className="text-gray-400 text-sm">Tema yükleniyor…</p>
        </div>
      </div>
    )
  }

  const { config, business } = state
  const page = config.pages[0]!

  return (
    <div lang="tr">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': seoSchemaType,
            name: business.name,
            description: business.slogan,
            telephone: business.phone,
            address: {
              '@type': 'PostalAddress',
              streetAddress: business.address,
              addressLocality: business.district,
              addressRegion: business.city,
              addressCountry: 'TR',
            },
            geo: business.coordinates
              ? { '@type': 'GeoCoordinates', latitude: business.coordinates.lat, longitude: business.coordinates.lng }
              : undefined,
            aggregateRating: business.rating
              ? { '@type': 'AggregateRating', ratingValue: business.rating, reviewCount: business.reviewCount }
              : undefined,
          }),
        }}
      />

      <ThemeRenderer theme={config} page={page} business={business} />
    </div>
  )
}
