/**
 * kepenk.ai — Performans Optimizasyonu Konfigürasyonu
 * ════════════════════════════════════════════════════
 * Core Web Vitals, Cloud Run, Firestore sorgu, bundle,
 * görsel pipeline, CDN cache, font, izleme, kontrol listesi.
 */

// ══════════════════════════════════════════
// 1. PERFORMANS HEDEFLERİ (İKİ KONTEKST)
// ══════════════════════════════════════════

export interface PerformansKontekst {
  id: string; hedefKitle: string; rendering: string; hosting: string
  oncelik: string; referansCihaz: string; referansAg: string
  hedefler: Record<string, string>
}

export const KONTEKSTLER: PerformansKontekst[] = [
  {
    id: 'esnaf_siteleri', hedefKitle: 'Esnafın müşterisi — mobil ağırlıklı, 4G/3G',
    rendering: 'SSG + ISR', hosting: 'Cloudflare Pages CDN (global edge)',
    oncelik: 'İLK YÜKLENİM HIZI', referansCihaz: 'Orta segment Android (~$200)',
    referansAg: '4G (15 Mbps, 50ms RTT)',
    hedefler: { LCP: '<2.5s (P75)', INP: '<200ms (P75)', CLS: '<0.1 (P75)', FCP: '<1.8s (P75)', TTFB: '<800ms (P75)', totalPageWeight: '<500KB (first load)', totalRequests: '<30', jsBundle: '<150KB (gzip)', lighthouse: '≥90' },
  },
  {
    id: 'editor_dashboard', hedefKitle: 'Esnaf — laptop/masaüstü, Wi-Fi/fiber',
    rendering: 'SPA — Next.js App Router', hosting: 'Cloud Run (SSR) + Firebase CDN',
    oncelik: 'ETKİLEŞİM HIZI', referansCihaz: 'Orta segment laptop (i5/Ryzen5, 8GB)',
    referansAg: 'Wi-Fi (25 Mbps, 20ms RTT)',
    hedefler: { LCP: '<3.0s (P75)', INP: '<300ms (P75)', CLS: '<0.1 (P75)', routeNavigate: '<500ms', saveOperation: '<1s', publish: '<30s', apiP95: '<1s', dashboardJs: '<500KB (gzip)', lighthouse: '≥80' },
  },
]

export const PERFORMANS_BUTCESI = {
  esnafSite: { html: '<15KB', css: '<30KB', js: '<150KB', fonts: '<50KB', imagesFirstViewport: '<200KB', totalFirstLoad: '<500KB' },
  dashboard: { initialJs: '<500KB', perRouteJs: '<100KB (lazy)', totalCss: '<80KB' },
  api: { responseP95: '<1s', responseP99: '<3s', payloadMax: '<100KB' },
} as const

// ══════════════════════════════════════════
// 2. CLOUD RUN & BACKEND
// ══════════════════════════════════════════

export const COLD_START = {
  minInstances: { dashboard: 2, api: 2, whatsappWorker: 1, aiProxy: 1 },
  cpuBoost: true,
  startupOptimizasyon: ['Lazy import (Zod, Pinecone — ilk istekte)', 'Global Firestore client (per-request DEĞİL)', 'Warm-up: /api/health → Firestore bağlantı ısıtma', 'Slim Docker: multi-stage, prod-only deps'],
  imageBoyut: { hedef: '<200MB', taktikler: ['node:20-alpine', 'pnpm --prod', 'next build --standalone', '.dockerignore'] },
  geceSaatleri: '23:00-07:00 min-instances: 1. Cloud Scheduler 06:55 warm-up.',
} as const

export const FIRESTORE_OPTIMIZASYON = {
  nPlus1: { sorun: '10 sipariş → 10 ayrı müşteri sorgusu = 11 sorgu', cozumler: ['Denormalizasyon: Order.customerSnapshot gömülü', 'getAll(): birden fazla doküman tek seferde', 'Composite query: ilişkili veri tek sorguda'] },
  sayfalama: { yontem: 'Cursor-based (startAfter)', varsayilan: 20, max: 100, neden: 'Offset N doküman okur+atlar = yavaş. Cursor son değerden devam = hızlı.' },
  denormalizasyon: [
    { alan: 'Order.customerSnapshot', veri: '{name, phone}', kazanim: 'Ayrı contact okuma yok' },
    { alan: 'Booking.serviceName/Price', veri: 'Hizmet adı+fiyat', kazanim: 'Ayrı service okuma yok' },
    { alan: 'Check.tableNumber', veri: 'Masa numarası', kazanim: 'Ayrı table okuma yok' },
  ],
  batchYazma: { max: 500, guvenli: 50 },
  distributedCounter: { neZaman: '>1 yazma/sn', shardSayisi: 10 },
  ttl: { cart: '24 saat', otpCodes: '5 dakika', rateLimitCounters: '1 dakika', aiResponseCache: '1 saat' },
} as const

export const CACHE_KATMANLARI = [
  { katman: 'Cloudflare KV (Edge)', ne: ['Esnaf site HTML (SSG)', 'Sektör şablonları', 'Kategori ağaçları', 'Halka açık listeler'], ttl: '300s + stale-while-revalidate: 3600s', invalidation: 'Yayınla → purge (sadece o esnaf)' },
  { katman: 'Firestore TTL (Application)', ne: ['AI yanıt cache', 'GİB mükellef sorgu', 'İYS izin durumu', 'Marketplace kategori'], ttl: '1-24 saat' },
  { katman: 'Node.js In-Memory', ne: ['KDV oranları, sektör listesi', 'Firebase Auth token doğrulama'], ttl: '5 dk', maxBellek: '50MB' },
] as const

// ══════════════════════════════════════════
// 3. ESNAF SİTESİ FRONTEND
// ══════════════════════════════════════════

export const RENDERING_STRATEJISI = {
  birincil: 'SSG (build time HTML — en hızlı TTFB)',
  fallback: 'ISR (ilk istekte üret, cache)',
  dinamik: 'CSR (sadece interaktif: sepet, form)',
  nedenSsg: 'Esnaf siteleri büyük oranda statik. SSG = CDN\'den direkt HTML + en iyi SEO. Yayınla → rebuild → purge.',
} as const

export const JS_OPTIMIZASYON = {
  codeSplitting: { routeBased: 'Next.js App Router otomatik', componentBased: ['Gallery (ssr: false)', 'BookingWidget', 'GoogleMap (ssr: false)', 'RichTextEditor'], thirdParty: 'async/defer — render-blocking YASAK' },
  treeShaking: ['Named import: import { Button } from \'@kepenk/ui\'', 'Lucide: import { Search } from \'lucide-react\'', 'lodash-es veya import get from \'lodash/get\'', 'date-fns (moment.js KULLANMA — 300KB+)'],
  bundleAnaliz: { arac: '@next/bundle-analyzer', hedef: { firstLoadShared: '<80KB', perPageJs: '<50KB', largestChunk: '<100KB' } },
  antiPatternler: ['moment.js → date-fns/dayjs (7KB)', 'lodash tam import → lodash-es', 'CSS-in-JS runtime → Tailwind (zero-runtime)', 'Büyük ikon toptan import → tree-shake', 'window.onload ağır hesaplama → requestIdleCallback', 'Inline 3rd party → async defer'],
} as const

export const GORSEL_PIPELINE = {
  uploadAdimlar: [
    { adim: 'Validate', detay: 'Max 5MB, jpg/png/webp/gif/svg, min 100×100px' },
    { adim: 'Process', detay: 'WebP (%80) + AVIF (%70). 5 boyut: thumbnail 200, small 400, medium 800, large 1200, hero 1920. EXIF strip.' },
    { adim: 'Blurhash', detay: '20×20px blur → base64 (~50 karakter). CLS önleme placeholder.' },
    { adim: 'Store', detay: 'Cloud Storage {esnafId}/{hash}_{size}.{format} → Cloudflare CDN' },
  ],
  htmlKullanim: { aboveFold: 'loading="eager" fetchpriority="high"', belowFold: 'loading="lazy" decoding="async"', boyutAttribute: 'width+height ZORUNLU (CLS)', aspectRatio: 'CSS aspect-ratio container garanti' },
  nextImage: { config: 'formats: [avif, webp], deviceSizes: [640, 750, 828, 1080, 1200]' },
} as const

export const FONT_OPTIMIZASYON = {
  strateji: ['font-display: swap (metin hemen görünür)', 'Türkçe subset (latin-ext)', 'Preload kritik fontlar', 'Self-host (3rd party DNS yok)', 'Variable font (tek dosya)'],
  boyutHedef: { inter: '<40KB', syne: '<30KB', toplam: '<70KB' },
  esnafSiteTema: 'Tema fontları build time subset — Türkçe+Latin+rakam → %60-70 azalma',
} as const

// ══════════════════════════════════════════
// 4. DASHBOARD SPA
// ══════════════════════════════════════════

export const DASHBOARD_PERF = {
  prefetch: { strateji: 'Link hover prefetch (varsayılan)', agresif: 'Sidebar öğeleri viewport\'ta → prefetch', istisnalar: 'Rapor sayfaları prefetch ETME (ağır)' },
  stateYonetimi: { serverState: 'TanStack Query (cache + revalidation)', clientState: 'Zustand (lightweight)', reactQuery: { staleTime: '30s', cacheTime: '5m', refetchOnFocus: true, retry: 2 } },
  virtualization: { neZaman: '100+ satır', arac: '@tanstack/react-virtual', uygulanacak: ['Sipariş listesi', 'Müşteri listesi', 'Ürün kataloğu', 'WhatsApp konuşmalar'] },
  widgetYukleme: ['1. Skeleton (anında)', '2. KPI sayıları (<200ms)', '3. Grafikler (<1s)', '4. AI önerileri (arka plan)'],
  editorCanvas: { virtualRendering: 'Sadece viewport section render, scroll ile lazy mount, 60fps', debounce: { save: '3000ms', preview: '500ms', search: '300ms' }, undoRedo: { yontem: 'Immutable JSON diff', maxStack: 50, bellek: '<10MB' } },
} as const

// ══════════════════════════════════════════
// 5. AĞ & PROTOKOL
// ══════════════════════════════════════════

export const AG_OPTIMIZASYON = {
  protokol: { cloudflare: 'HTTP/3 (QUIC) — 0-RTT', cloudRun: 'HTTP/2 — multiplexing' },
  compression: { cloudflare: 'Brotli (gzip\'ten %15-20 küçük)', cloudRun: 'gzip' },
  sparseFields: 'GET /v1/products?fields=id,name,price,thumbnail (tüm alan DEĞİL)',
  preconnect: ['storage.googleapis.com (görseller)'],
  minimal3rdParty: 'Google Fonts → self-host, analytics → 1st party proxy',
} as const

// ══════════════════════════════════════════
// 6. CORE WEB VITALS REHBERİ
// ══════════════════════════════════════════

export interface CwvRehber { metrik: string; hedef: string; sorunlar: { sorun: string; cozumler: string[] }[] }

export const CWV_REHBER: CwvRehber[] = [
  { metrik: 'LCP', hedef: '<2.5s (P75)', sorunlar: [
    { sorun: 'Yavaş sunucu', cozumler: ['SSG (TTFB→0)', 'Cloud Run min-instances', 'Cloudflare edge cache'] },
    { sorun: 'Büyük hero görsel', cozumler: ['WebP/AVIF (%30-50 küçük)', 'Responsive srcset', 'fetchpriority="high"', 'Preload hero', 'Blurhash'] },
    { sorun: 'Render-blocking CSS/JS', cozumler: ['Critical CSS inline', 'Non-critical: media print swap', 'async/defer', 'requestIdleCallback'] },
    { sorun: 'Web fonts', cozumler: ['font-display: swap', 'Preload', 'Self-host', 'Variable font'] },
  ]},
  { metrik: 'INP', hedef: '<200ms (P75)', sorunlar: [
    { sorun: 'Ağır event handler', cozumler: ['requestAnimationFrame', 'Web Worker', 'Debounce'] },
    { sorun: 'Büyük DOM', cozumler: ['Virtualization (100+ öğe)', 'DOM <1500 node', 'Wrapper div azalt'] },
    { sorun: 'Uzun task', cozumler: ['50ms+ task böl', 'scheduler.postTask()', 'React.memo()', 'useMemo/useCallback'] },
  ]},
  { metrik: 'CLS', hedef: '<0.1 (P75)', sorunlar: [
    { sorun: 'Boyutsuz görsel', cozumler: ['width+height ZORUNLU', 'CSS aspect-ratio', 'Blurhash (aynı boyut)'] },
    { sorun: 'Geç font', cozumler: ['font-display: optional/swap', 'Preload', 'size-adjust fallback'] },
    { sorun: 'Dinamik içerik', cozumler: ['Skeleton loader', 'Toast absolute/fixed', 'Reklamsız (kepenk.ai)'] },
  ]},
]

// ══════════════════════════════════════════
// 7. İZLEME & REGRESYON
// ══════════════════════════════════════════

export const PERFORMANS_IZLEME = {
  rum: { sdk: 'web-vitals + custom beacon', metrikler: ['LCP', 'INP', 'CLS', 'FCP', 'TTFB'], raporlama: 'sendBeacon → /api/rum → BigQuery', dashboard: 'Grafana — CWV trend (günlük P75)' },
  synthetic: { arac: 'Lighthouse CI (GitHub Actions)', siklik: 'Her PR', assertions: { performance: '≥90 (site) / ≥80 (dashboard)', lcp: '≤2500', cls: '≤0.1', inp: '≤200' }, failKosul: 'Performans ≥5 puan düşerse FAIL' },
  bundleTracking: { arac: 'size-limit / bundlewatch', siklik: 'Her PR', failKosul: '≥10KB uyarı, ≥50KB FAIL' },
  alertler: [
    { metrik: 'LCP P75 >3.0s', seviye: 'P3' },
    { metrik: 'CLS P75 >0.15', seviye: 'P3' },
    { metrik: 'API P95 >2s', seviye: 'P2' },
    { metrik: 'İlk yükleme JS >200KB', seviye: 'Build uyarısı' },
  ],
} as const

// ══════════════════════════════════════════
// 8. KONTROL LİSTELERİ
// ══════════════════════════════════════════

export const KONTROL_LISTELERI = {
  herPr: ['Lighthouse CI geçiyor mu? (≥90)', 'Bundle boyutu artmadı mı?', 'Yeni dependency bundle etkisi kontrol?', 'Görsellerde width/height var mı?', 'Lazy loading uygulandı mı?', 'N+1 Firestore sorgusu yok mu?'],
  herRelease: ['RUM regresyon var mı? (7 gün trend)', 'CWV hedeflerde mi?', 'API P95 <1s mi?', 'Cold start süresi kabul edilebilir?'],
  ceyreklik: ['Bundle analiz (@next/bundle-analyzer)', 'Kullanılmayan dependency temizliği', 'Firestore index kullanım analizi', 'CDN cache hit ratio >%90', 'Görsel pipeline çalışıyor mu?', 'Font boyutları kontrol'],
} as const
