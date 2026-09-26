/**
 * Unified Template Catalog — Adapter from THEME_CATALOG (200 themes) to Sablon[]
 *
 * Bridges the template engine (packages/templates) with SablonMarket UI.
 * Each ThemeCatalogEntry becomes a Sablon with an iframe demo URL.
 */

import { THEME_CATALOG_ARRAY, CATALOG_SECTORS } from '@kepenk/templates/catalog'
import type { ThemeCatalogEntry } from '@kepenk/templates/catalog'
import type { Sablon } from './index'
import { isRetiredDemo } from './curation'

// ─────────────────────────────────────────────
// Plan → minPaket mapping
// ─────────────────────────────────────────────

const PLAN_TO_PAKET: Record<string, Sablon['minPaket']> = {
  free: 'TEMEL',
  starter: 'STANDART',
  growth: 'BUYUME',
  pro: 'PREMIUM',
  enterprise: 'PREMIUMPLUS',
}

const PLAN_LABELS: Record<string, string> = {
  free: 'Ücretsiz',
  starter: 'Başlangıç',
  growth: 'Büyüme',
  pro: 'Profesyonel',
  enterprise: 'Kurumsal',
}

// ─────────────────────────────────────────────
// Sector icons (lucide-compatible emoji fallback)
// ─────────────────────────────────────────────

const SECTOR_ICONS: Record<string, string> = {
  berber: '💈',
  restoran: '🍽️',
  doktor: '🩺',
  guzellik: '💅',
  avukat: '⚖️',
  disci: '🦷',
  oto: '🔧',
  spor: '💪',
  kafe: '☕',
  firin: '🥖',
  eczane: '💊',
  veteriner: '🐾',
  fotografci: '📸',
  dugun: '💒',
  elektrikci: '⚡',
  tesisatci: '🔧',
  muhasebeci: '📊',
  emlakci: '🏠',
  ozelders: '📚',
  kuyumcu: '💎',
  psikolog: '🧠',
  fastfood: '🍔',
  bar: '🍷',
  telefon: '📱',
  klima: '❄️',
  mimarlik: '🏛️',
  sigorta: '🛡️',
  surucu: '🚗',
  dil: '🌐',
  yoga: '🧘',
  optik: '👓',
  petshop: '🐶',
  cicekci: '🌸',
  terzi: '🧵',
  halisaha: '⚽',
  yuzme: '🏊',
  catering: '🍱',
  kasap: '🥩',
  cilingir: '🔑',
  muzik: '🎵',
}

// ─────────────────────────────────────────────
// Adapter
// ─────────────────────────────────────────────

function themeToSablon(entry: ThemeCatalogEntry): Sablon {
  return {
    id: entry.id,
    ad: `${entry.name} — ${entry.sectorLabel}`,
    aciklama: entry.description,
    minPaket: PLAN_TO_PAKET[entry.plan] ?? 'TEMEL',
    htmlKodu: '',  // Not used — iframe preview points to /demolar/{id}
    icon: SECTOR_ICONS[entry.sectorId],
    etiketler: [
      entry.sectorLabel,
      PLAN_LABELS[entry.plan] ?? entry.plan,
      entry.isDark ? 'Koyu' : 'Açık',
      `${entry.sectionCount} bölüm`,
      `${entry.pageCount} sayfa`,
    ],
    kategori: 'sektor',
  }
}

/** Public choices exclude explicitly retired, source-less demos. */
export const UNIFIED_SABLONLAR: Sablon[] = THEME_CATALOG_ARRAY
  .filter(entry => !isRetiredDemo(entry.id))
  .map(themeToSablon)

/** Sector filter options for SablonMarket */
export const SEKTOR_FILTRELERI = CATALOG_SECTORS

/** Plan label helper */
export function paketEtiketi(plan: string): string {
  return PLAN_LABELS[plan] ?? plan
}
