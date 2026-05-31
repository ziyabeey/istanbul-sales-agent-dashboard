// @ts-nocheck
/**
 * Sites App — Client-side site renderer
 *
 * Handles theme loading, section registration, and rendering via ThemeRenderer.
 * Supports two modes:
 * - demo: Loads from template configs (for previewing themes)
 * - live: Uses pre-fetched site data from Firestore (TODO)
 */

'use client'

import { useEffect, useState } from 'react'
import {
  ThemeRenderer,
  registerSectorSections,
  loadThemeConfig,
} from '@kepenk/templates'
import type { ThemeConfig, BusinessData } from '@kepenk/templates'

interface DemoModeProps {
  mode: 'demo'
  themeId: string
  sectorId: string
  seoSchemaType: string
  domain: string
}

interface LiveModeProps {
  mode: 'live'
  siteData: {
    theme?: ThemeConfig
    themeId?: string
    sectorId?: string
    business: BusinessData
    themeOverrides?: Partial<ThemeConfig>
  }
  domain: string
}

type Props = DemoModeProps | LiveModeProps

interface LoadedState {
  config: ThemeConfig
  business: BusinessData
  seoSchemaType: string
}

export default function SiteClient(props: Props) {
  const [state, setState] = useState<LoadedState | null>(null)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    let cancelled = false

    async function loadDemo(themeId: string, sectorId: string, seoSchemaType: string) {
      try {
        // Register section components for this sector
        await registerSectorSections(sectorId)

        // Load theme config + business data from template configs
        const result = await loadThemeConfig(themeId)
        if (cancelled) return

        if (!result) {
          setError(`Tema "${themeId}" için yapılandırma bulunamadı.`)
          return
        }

        setState({
          config: result.config,
          business: result.business,
          seoSchemaType,
        })
      } catch (err) {
        if (!cancelled) {
          console.error(`[SiteClient] Failed to load theme "${themeId}":`, err)
          setError(`Tema yüklenirken bir hata oluştu.`)
        }
      }
    }

    async function loadLive(siteData: LiveModeProps['siteData']) {
      try {
        if (siteData.sectorId) {
            await registerSectorSections(siteData.sectorId)
        }

        // V2 AST Engine (Full Theme Config provided)
        if (siteData.theme) {
            setState({
                config: siteData.theme,
                business: siteData.business,
                seoSchemaType: 'LocalBusiness'
            })
            return
        }

        // V1 Legacy Engine (Needs theme loading by ID)
        if (siteData.themeId) {
            const result = await loadThemeConfig(siteData.themeId)
            if (cancelled) return

            if (!result) {
              setError('Site yapılandırması yüklenemedi.')
              return
            }

            // Merge Firestore business data over demo defaults
            const mergedBusiness = { ...result.business, ...siteData.business }
            const mergedConfig = siteData.themeOverrides 
              ? { ...result.config, ...siteData.themeOverrides }
              : result.config

            setState({
              config: mergedConfig,
              business: mergedBusiness,
              seoSchemaType: 'LocalBusiness',
            })
        }
      } catch (err) {
        if (!cancelled) {
          console.error('[SiteClient] Failed to load live site:', err)
          setError('Site yüklenirken bir hata oluştu.')
        }
      }
    }

    if (props.mode === 'demo') {
      loadDemo(props.themeId, props.sectorId, props.seoSchemaType)
    } else {
      loadLive(props.siteData)
    }

    return () => { cancelled = true }
  }, [props.mode === 'demo' ? props.themeId : props.domain])

  // ── Error State ──
  if (error) {
    return (
      <div style={{
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        minHeight: '100vh', fontFamily: "'Inter', system-ui, sans-serif",
        background: '#fafafa',
      }}>
        <div style={{ textAlign: 'center', padding: '48px', maxWidth: '400px' }}>
          <div style={{
            width: '64px', height: '64px', borderRadius: '50%',
            background: '#fee2e2', display: 'flex', alignItems: 'center',
            justifyContent: 'center', margin: '0 auto 24px', fontSize: '24px',
          }}>
            ⚠️
          </div>
          <h1 style={{ fontSize: '20px', fontWeight: 700, color: '#1a1a1a', marginBottom: '8px' }}>
            Tema Yüklenemedi
          </h1>
          <p style={{ color: '#6b7280', fontSize: '15px', lineHeight: 1.6 }}>
            {error}
          </p>
        </div>
      </div>
    )
  }

  // ── Loading State ──
  if (!state) {
    return (
      <div style={{
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        minHeight: '100vh', fontFamily: "'Inter', system-ui, sans-serif",
        background: '#fff',
      }}>
        <div style={{ textAlign: 'center' }}>
          <div style={{
            width: '32px', height: '32px', border: '3px solid #e5e7eb',
            borderTopColor: '#1a1a1a', borderRadius: '50%',
            animation: 'spin 0.8s linear infinite',
            margin: '0 auto 16px',
          }} />
          <p style={{ color: '#9ca3af', fontSize: '14px' }}>Tema yükleniyor…</p>
          <style>{`@keyframes spin { to { transform: rotate(360deg) } }`}</style>
        </div>
      </div>
    )
  }

  // ── Render ──
  const { config, business, seoSchemaType } = state
  const page = config.pages[0]!

  return (
    <div lang="tr">
      {/* SEO Structured Data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': seoSchemaType,
            name: business.name,
            description: business.slogan,
            telephone: business.phone,
            email: business.email,
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

      {/* Google Fonts for theme */}
      {config.fonts && (
        <link 
          rel="stylesheet"
          href={`https://fonts.googleapis.com/css2?family=${encodeURIComponent(config.fonts.heading.family)}:wght@${(config.fonts.heading.weights || [600, 700]).join(';')}&family=${encodeURIComponent(config.fonts.body.family)}:wght@${(config.fonts.body.weights || [400, 500]).join(';')}&display=swap`}
        />
      )}

      {/* Theme Renderer Pipeline */}
      <ThemeRenderer theme={config} page={page} business={business} />
    </div>
  )
}
