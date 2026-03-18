/**
 * kepenk.ai — DevOps Altyapı & Deployment Konfigürasyonu
 * ═══════════════════════════════════════════════════════
 * CI/CD, Cloud Run servisleri, ortamlar, DR, maliyet, release.
 */

// ══════════════════════════════════════════
// 1. ALTYAPI SABİTLERİ
// ══════════════════════════════════════════

export const ALTYAPI_SABITLERI = {
  projectId: 'kepenk-ai',
  gcpRegionPrimary: 'europe-west1',
  gcpRegionDR: 'europe-west3',
  gcpProjectIds: { dev: 'kepenk-ai-dev', staging: 'kepenk-ai-staging', prod: 'kepenk-ai-prod' },
  runtime: 'Node.js 20 LTS',
  framework: 'Next.js 14+ (App Router)',
  packageManager: 'pnpm',
  monorepo: 'Turborepo',
} as const

export const COMPUTE_STACK = {
  apiBackend: 'Cloud Run',
  backgroundJobs: 'Cloud Run Jobs + Cloud Tasks',
  aiInference: 'Cloud Run (Claude API proxy)',
  esnafSites: 'Cloudflare Pages',
  dashboard: 'Firebase Hosting + Cloud CDN',
} as const

export const STORAGE_STACK = {
  primaryDb: 'Firestore (Native mode)',
  analyticsDw: 'BigQuery',
  blobStorage: 'Cloud Storage (GCS)',
  cache: 'Firestore TTL + Cloudflare KV',
  vectorStore: 'Pinecone',
} as const

// ══════════════════════════════════════════
// 2. CLOUD RUN SERVİS KONFİGÜRASYONLARI
// ══════════════════════════════════════════

export interface CloudRunConfig {
  id: string; aciklama: string; cpu: number; memory: string
  minInstances: number; maxInstances: number; concurrency: number
  timeout: string; healthPath: string; scalingMetrik: string
  rateLimiting?: Record<string, string | number>
}

export const CLOUD_RUN_SERVISLERI: CloudRunConfig[] = [
  { id: 'dashboard', aciklama: 'Next.js esnaf dashboard + SSR', cpu: 1, memory: '512Mi', minInstances: 2, maxInstances: 50, concurrency: 80, timeout: '60s', healthPath: '/api/health', scalingMetrik: 'CPU %60' },
  { id: 'api', aciklama: 'Standalone REST API', cpu: 1, memory: '512Mi', minInstances: 2, maxInstances: 100, concurrency: 200, timeout: '30s', healthPath: '/health', scalingMetrik: 'CPU %60' },
  { id: 'whatsapp-worker', aciklama: 'Twilio webhook handler', cpu: 1, memory: '256Mi', minInstances: 1, maxInstances: 20, concurrency: 50, timeout: '15s', healthPath: '/health', scalingMetrik: 'Request count' },
  { id: 'ai-proxy', aciklama: 'Claude API proxy + rate limiting', cpu: 2, memory: '1Gi', minInstances: 1, maxInstances: 30, concurrency: 20, timeout: '120s', healthPath: '/health', scalingMetrik: 'CPU %50', rateLimiting: { perEsnaf: '20/dk', baslangic: '50/saat', buyume: '200/saat', profesyonel: '500/saat', maliyetGunluk: '$2.00' } },
]

// ══════════════════════════════════════════
// 3. ORTAM STRATEJİSİ
// ══════════════════════════════════════════

export interface OrtamConfig {
  id: string; amac: string; gcpProject: string; compute: string; database: string
  domain: string; maliyet: string; deployTetikleyici: string
}

export const ORTAMLAR: OrtamConfig[] = [
  { id: 'dev', amac: 'Geliştirici yerel ortamı', gcpProject: 'kepenk-ai-dev', compute: 'docker-compose (local)', database: 'Firebase Emulator Suite', domain: 'localhost:3000', maliyet: '~$0', deployTetikleyici: 'Manuel (pnpm turbo dev)' },
  { id: 'staging', amac: 'Pre-production doğrulama, E2E, QA', gcpProject: 'kepenk-ai-staging', compute: 'Cloud Run (min: 1)', database: 'Firestore (ayrı proje)', domain: 'staging.kepenk.ai', maliyet: '~$100-300/ay', deployTetikleyici: 'push to main → otomatik' },
  { id: 'prod', amac: 'Canlı müşteri trafiği', gcpProject: 'kepenk-ai-prod', compute: 'Cloud Run (min: 2, auto-scale)', database: 'Firestore (production)', domain: 'kepenk.ai + custom domains', maliyet: 'Bölüm 6\'da detaylı', deployTetikleyici: 'v*.*.* tag → canary rollout' },
]

// ══════════════════════════════════════════
// 4. CI/CD PIPELINE KONFİGÜRASYONU
// ══════════════════════════════════════════

export const CI_PIPELINE = {
  araclar: { ci: 'GitHub Actions', containerRegistry: 'Artifact Registry (GCP)', iac: 'Terraform' },
  ciAdımlari: ['Değişiklik tespiti (paths-filter)', 'Lint + Type-check + Unit test', 'Entegrasyon testleri (Firebase Emulator)', 'Güvenlik tarama (Snyk)', 'Terraform plan (infra değişikliği varsa)'],
  stagingDeploy: { tetikleyici: 'push to main', adimlar: ['Build + Push images', 'Cloud Run deploy', 'Cloudflare Pages deploy', 'Firestore rules/indexes deploy', 'Smoke tests', 'Slack bildirim'] },
  prodDeploy: {
    tetikleyici: 'v*.*.* tag',
    canaryAdimlari: [
      { yuzde: 5, bekleme: '5 dakika', kontrol: 'error rate < %5' },
      { yuzde: 25, bekleme: '2 dakika', kontrol: 'error rate < %5' },
      { yuzde: 50, bekleme: '2 dakika', kontrol: 'error rate < %5' },
      { yuzde: 100, bekleme: '—', kontrol: 'E2E smoke tests' },
    ],
    manuelOnay: true,
  },
} as const

// ══════════════════════════════════════════
// 5. SECRET YÖNETİMİ
// ══════════════════════════════════════════

export interface SecretTanimi { isim: string; kategori: string; rotasyonGun: number; erisim: string[] }

export const SECRET_LISTESI: SecretTanimi[] = [
  { isim: 'claude-api-key', kategori: 'AI', rotasyonGun: 90, erisim: ['ai-proxy'] },
  { isim: 'iyzico-api-key', kategori: 'Ödeme', rotasyonGun: 90, erisim: ['api'] },
  { isim: 'iyzico-secret-key', kategori: 'Ödeme', rotasyonGun: 90, erisim: ['api'] },
  { isim: 'twilio-account-sid', kategori: 'İletişim', rotasyonGun: 180, erisim: ['whatsapp-worker'] },
  { isim: 'twilio-auth-token', kategori: 'İletişim', rotasyonGun: 90, erisim: ['whatsapp-worker'] },
  { isim: 'netgsm-api-key', kategori: 'İletişim', rotasyonGun: 180, erisim: ['api'] },
  { isim: 'firebase-admin-sdk', kategori: 'Altyapı', rotasyonGun: 365, erisim: ['dashboard', 'api'] },
  { isim: 'cloudflare-api-token', kategori: 'Altyapı', rotasyonGun: 180, erisim: ['site-renderer'] },
  { isim: 'pinecone-api-key', kategori: 'AI', rotasyonGun: 90, erisim: ['ai-proxy'] },
]

// ══════════════════════════════════════════
// 6. MALİYET YÖNETİMİ
// ══════════════════════════════════════════

export const MALIYET_TAHMINLERI = [
  { esnafSayisi: 1000, cloudRun: '$150-300', firestore: '$50-100', storage: '$10-20', bigquery: '$20-50', cloudflare: '$20', toplam: '$255-495/ay', perEsnaf: '$0.25-0.50' },
  { esnafSayisi: 10000, cloudRun: '$800-1,500', firestore: '$300-600', storage: '$50-100', bigquery: '$100-200', cloudflare: '$200', toplam: '$1,510-2,660/ay', perEsnaf: '$0.15-0.27' },
  { esnafSayisi: 100000, cloudRun: '$5,000-10,000', firestore: '$2,000-4,000', storage: '$300-500', bigquery: '$500-1,000', cloudflare: '$2,000', aiApi: '$15,000-30,000', toplam: '$25,150-47,850/ay', perEsnaf: '$0.25-0.48' },
] as const

export const MALIYET_OPTIMIZASYON = {
  cloudRun: ['min-instances optimize (gece 0)', 'CPU boost → düşük min-instances', 'Yüksek concurrency = az instance', 'Kısa timeout → stuck request önle'],
  firestore: ['Denormalizasyon (N+1 önle)', 'Cloudflare KV cache', 'TTL geçici dokümanlar', 'Batch okuma (getAll)'],
  ai: ['Model routing (Haiku %70, Sonnet %25, Opus %5)', 'Prompt caching', 'Response caching', 'max_tokens koruması'],
  genel: ['GCP CUD (%20 indirim)', 'Budget alert (%50, %80, %100)', 'Aylık FinOps review'],
} as const

// ══════════════════════════════════════════
// 7. FELAKET KURTARMA (DR)
// ══════════════════════════════════════════

export const DR_PLANI = {
  rto: '4 saat', rpo: '1 saat', uptimeSla: '%99.9',
  senaryolar: [
    { id: 'cloud_run_down', etki: 'API/Dashboard erişilemez', tespit: '2 dk', mudahale: ['Otomatik restart', 'Rollback revision', 'europe-west3 yedek deploy'], esnafSiteEtkisi: 'YOK (Cloudflare statik)' },
    { id: 'firestore_sorun', etki: 'Veri okuma/yazma durur', tespit: '3 dk', mudahale: ['Multi-region failover', 'Günlük backup restore', 'BigQuery partial recovery'] },
    { id: 'cloudflare_down', etki: 'Esnaf siteleri erişilemez', tespit: '1 dk', mudahale: ['DNS failover → Cloud CDN', 'Cloudflare status izle'] },
    { id: 'veri_ihlali', etki: 'Güvenlik ihlali', tespit: 'Değişken', mudahale: ['Incident response', '72 saat KVKK bildirimi', 'Forensik analiz'] },
  ],
  yedekleme: {
    firestore: 'Günlük GCS export + PITR',
    bigquery: '7 günlük snapshot (built-in)',
    cloudStorage: 'Versioning + 30 gün lifecycle',
    secrets: 'Version history (otomatik)',
    kod: 'GitHub (distributed)',
  },
  drTesti: { siklık: 'Çeyreklik', ortam: 'Staging', olcum: 'RTO/RPO vs hedef' },
} as const

// ══════════════════════════════════════════
// 8. RELEASE YÖNETİMİ
// ══════════════════════════════════════════

export const RELEASE_CONFIG = {
  versiyonlama: 'Semantic Versioning (MAJOR.MINOR.PATCH)',
  kadans: { normal: 'Haftada 1-2 minor', hotfix: 'Anında — canary olmadan', major: 'Önceden duyuru + migration guide' },
  featureFlags: { arac: 'Firebase Remote Config', kullanimlar: ['Gradual rollout (%10 → %100)', 'A/B test', 'Kill switch', 'Tier-based flags'] },
  rollback: {
    otomatik: { kosul: 'Canary error rate > %5', sure: '<1 dakika', aksiyon: 'Önceki revision traffic yönlendir' },
    manuel: { sure: '<2 dakika', komut: 'gcloud run services update-traffic' },
  },
  changelog: { format: 'Conventional Commits', tool: 'changesets' },
} as const

// ══════════════════════════════════════════
// 9. ESNAF SİTESİ DAĞITIMI
// ══════════════════════════════════════════

export const ESNAF_SITE_DAGITIMI = {
  mimari: { build: 'SSG (AI-generated)', hosting: 'Cloudflare Pages', ssl: 'Cloudflare Universal SSL', cdn: 'Cloudflare global (280+ PoP)' },
  domainler: { ucretsiz: '{{slug}}.kepenk.site', custom: 'Esnafın kendi domain\'i (Cloudflare DNS)' },
  yayinlamaSuresi: '<30 saniye',
  customDomainSuresi: '<5 dakika (SSL dahil)',
  olcekleme: [
    { esnaf: 100, mimari: 'Tek Cloudflare Pages projesi' },
    { esnaf: 1000, mimari: 'Multi-project veya Workers + KV' },
    { esnaf: 10000, mimari: 'Workers + R2 + KV routing' },
    { esnaf: 100000, mimari: 'Workers + R2 + Durable Objects' },
  ],
  cacheStratejisi: { html: 'max-age=300, stale-while-revalidate=3600', assets: 'max-age=31536000, immutable', images: 'max-age=86400 (Polish optimize)', api: 'no-store' },
} as const
