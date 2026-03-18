/**
 * PWA Manifest Generator — Dynamic per-site manifest
 * ─────────────────────────────────────────────────────
 */

export interface PWAManifest {
  name: string
  short_name: string
  description: string
  start_url: string
  display: 'standalone' | 'fullscreen' | 'minimal-ui'
  orientation: 'portrait' | 'landscape' | 'any'
  theme_color: string
  background_color: string
  icons: { src: string; sizes: string; type: string; purpose?: string }[]
  shortcuts?: { name: string; url: string; icon?: string }[]
}

/** Generate esnaf dashboard manifest */
export function generateDashboardManifest(): PWAManifest {
  return {
    name: 'kepenk.ai Dashboard',
    short_name: 'kepenk.ai',
    description: 'İşletmenizi telefondan yönetin',
    start_url: '/dashboard',
    display: 'standalone',
    orientation: 'portrait',
    theme_color: '#1E1E2E',
    background_color: '#1E1E2E',
    icons: [
      { src: '/icons/icon-192.png', sizes: '192x192', type: 'image/png' },
      { src: '/icons/icon-512.png', sizes: '512x512', type: 'image/png' },
      { src: '/icons/icon-maskable.png', sizes: '512x512', type: 'image/png', purpose: 'maskable' },
    ],
    shortcuts: [
      { name: 'Siparişler', url: '/dashboard/orders', icon: '/icons/shortcut-orders.png' },
      { name: 'Mesajlar', url: '/dashboard/inbox', icon: '/icons/shortcut-inbox.png' },
      { name: 'Ürün Ekle', url: '/dashboard/products/new', icon: '/icons/shortcut-add.png' },
    ],
  }
}

/** Generate customer-facing site manifest */
export function generateSiteManifest(site: {
  name: string; shortName: string; themeColor: string; bgColor: string; logo?: string; domain: string
}): PWAManifest {
  return {
    name: site.name,
    short_name: site.shortName.slice(0, 12),
    description: `${site.name} — Online mağaza`,
    start_url: '/',
    display: 'standalone',
    orientation: 'any',
    theme_color: site.themeColor || '#1E1E2E',
    background_color: site.bgColor || '#FFFFFF',
    icons: [
      { src: site.logo || '/icons/icon-192.png', sizes: '192x192', type: 'image/png' },
      { src: site.logo || '/icons/icon-512.png', sizes: '512x512', type: 'image/png' },
    ],
  }
}

/* ═══════ Service Worker Cache Strategies ═══════ */

export const SW_CACHE_CONFIG = {
  appShell: { name: 'app-shell-v1', maxAge: 30 * 24 * 3600, strategy: 'CacheFirst' as const },
  apiData:  { name: 'api-data-v1',  maxAge: 3600, maxEntries: 500, strategy: 'StaleWhileRevalidate' as const },
  images:   { name: 'images-v1',    maxAge: 7 * 24 * 3600, maxEntries: 200, maxSizeMB: 50, strategy: 'CacheFirst' as const },
}

/* ═══════ Offline Data Stores (IndexedDB via Dexie.js) ═══════ */

export const OFFLINE_STORES = {
  orders:         { keyPath: 'id', maxItems: 100, syncPriority: 'high' as const },
  products:       { keyPath: 'id', maxItems: 500, syncPriority: 'medium' as const },
  contacts:       { keyPath: 'id', maxItems: 200, syncPriority: 'medium' as const },
  conversations:  { keyPath: 'id', maxItems: 50,  syncPriority: 'high' as const },
  bookings:       { keyPath: 'id', maxItems: 200, syncPriority: 'high' as const },
  pendingActions: { keyPath: 'id', syncPriority: 'high' as const },
  dashboardMetrics: { keyPath: 'date', maxItems: 90, syncPriority: 'low' as const },
}

export const SYNCABLE_ACTIONS = [
  'order_status_update', 'message_send', 'product_update',
  'booking_confirm', 'note_add', 'photo_upload',
] as const

/* ═══════ Performance Targets ═══════ */

export const PERF_TARGETS = {
  fcp4G: 1500,        // <1.5s on 4G
  fcp3G: 5000,        // <5s on 3G
  tti4G: 3000,        // <3s TTI
  maxBundleKB: 150,   // <150KB gzipped JS
  maxHeapMB: 100,     // <100MB memory
  maxCacheMB: 50,     // <50MB IndexedDB
  maxImageCacheMB: 30,
}
