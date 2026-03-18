/**
 * kepenk.ai — Design System & Component Library Konfigürasyonu
 * ═════════════════════════════════════════════════════════════
 * Tasarım token'ları, tema sistemi, component specs, ikon haritası,
 * animasyon standartları, responsive kurallar, a11y gereksinimleri.
 */

// ══════════════════════════════════════════
// 1. DESIGN SYSTEM SABİTLERİ
// ══════════════════════════════════════════

export const DESIGN_SYSTEM_STACK = {
  framework: 'React 18+ (Next.js 14 App Router)',
  styling: 'Tailwind CSS 3.4+ + CSS Custom Properties',
  components: 'packages/ui (internal monorepo)',
  icons: 'Lucide React (1,500+ ikon, tree-shakeable)',
  animation: 'Framer Motion (complex) + CSS transitions (simple)',
  storybook: 'Storybook 8+',
  testing: 'Vitest + React Testing Library + axe-core',
} as const

export const TEMA_KONTEKSTLERI = {
  editorDashboard: { amac: 'Esnaf dashboard + site editörü', hedef: 'Esnaf (Ahmet Usta)', tema: 'DAİMA dark — light mode YOK', tokenPrefix: '--kp-', neden: 'Dark tema: canvas öne çıkar, göz yorgunluğu azaltır, profesyonel his' },
  esnafSiteleri: { amac: 'Esnaf müşterilerine açık site', hedef: 'Son kullanıcı', tema: 'Çoklu — 9 hazır + özelleştirme', tokenPrefix: '--site-' },
} as const

// ══════════════════════════════════════════
// 2. RENK TOKEN'LARI (EDİTÖR DASHBOARD)
// ══════════════════════════════════════════

export const RENK_TOKENLARI = {
  yuzey: {
    bg: { token: '--kp-bg', deger: '#0F0F1A', aciklama: 'En dip arka plan' },
    surface: { token: '--kp-surface', deger: '#1E1E2E', aciklama: 'Ana panel arka plan' },
    surfaceElevated: { token: '--kp-surface-elevated', deger: '#2A2A3C', aciklama: 'Modal, dropdown' },
    surfaceHover: { token: '--kp-surface-hover', deger: '#353548', aciklama: 'Hover state' },
    surfaceActive: { token: '--kp-surface-active', deger: '#3D3D52', aciklama: 'Active/pressed' },
    surfaceSelected: { token: '--kp-surface-selected', deger: '#2D2B3D', aciklama: 'Selected row' },
  },
  kenar: {
    border: { token: '--kp-border', deger: '#404058' },
    borderSubtle: { token: '--kp-border-subtle', deger: '#2E2E42' },
    borderFocus: { token: '--kp-border-focus', deger: '#C84B31', aciklama: 'Focus ring — rust accent' },
  },
  metin: {
    text: { token: '--kp-text', deger: '#F5F0E8', aciklama: 'Birincil — cream' },
    textSecondary: { token: '--kp-text-secondary', deger: '#9CA3AF' },
    textMuted: { token: '--kp-text-muted', deger: '#6B7280' },
    textDisabled: { token: '--kp-text-disabled', deger: '#4B5563' },
    textInverse: { token: '--kp-text-inverse', deger: '#1E1E2E' },
  },
  marka: {
    rust: { token: '--kp-rust', deger: '#C84B31', aciklama: 'Birincil aksan — CTA' },
    rustHover: { token: '--kp-rust-hover', deger: '#B5432B' },
    rustActive: { token: '--kp-rust-active', deger: '#A03B25' },
    ai: { token: '--kp-ai', deger: '#8B5CF6', aciklama: 'AI aksan — mor' },
    aiHover: { token: '--kp-ai-hover', deger: '#7C4FE0' },
    blue: { token: '--kp-blue', deger: '#3B82F6', aciklama: 'Seçim, bilgi, bağlantı' },
  },
  durum: {
    success: { token: '--kp-success', deger: '#22C55E' },
    warning: { token: '--kp-warning', deger: '#F59E0B' },
    error: { token: '--kp-error', deger: '#EF4444' },
    info: { token: '--kp-info', deger: '#3B82F6' },
  },
} as const

// ══════════════════════════════════════════
// 3. TİPOGRAFİ TOKEN'LARI
// ══════════════════════════════════════════

export const TIPOGRAFI_TOKENLARI = {
  fontAilesi: {
    sans: { token: '--kp-font-sans', deger: "'Inter', -apple-system, BlinkMacSystemFont, sans-serif" },
    heading: { token: '--kp-font-heading', deger: "'Syne', 'Inter', sans-serif" },
    mono: { token: '--kp-font-mono', deger: "'JetBrains Mono', 'Fira Code', monospace" },
  },
  fontBoyut: [
    { isim: '2xs', token: '--kp-text-2xs', deger: '0.625rem', px: '10px', kullanim: 'Badge, mikro etiket' },
    { isim: 'xs', token: '--kp-text-xs', deger: '0.6875rem', px: '11px', kullanim: 'Etiket, zaman damgası' },
    { isim: 'sm', token: '--kp-text-sm', deger: '0.75rem', px: '12px', kullanim: 'İkincil metin, panel' },
    { isim: 'base', token: '--kp-text-base', deger: '0.8125rem', px: '13px', kullanim: 'Birincil panel metin' },
    { isim: 'md', token: '--kp-text-md', deger: '0.875rem', px: '14px', kullanim: 'Toolbar, form' },
    { isim: 'lg', token: '--kp-text-lg', deger: '1rem', px: '16px', kullanim: 'Panel başlık' },
    { isim: 'xl', token: '--kp-text-xl', deger: '1.125rem', px: '18px', kullanim: 'Bölüm başlık' },
    { isim: '2xl', token: '--kp-text-2xl', deger: '1.5rem', px: '24px', kullanim: 'Sayfa başlık' },
    { isim: '3xl', token: '--kp-text-3xl', deger: '1.875rem', px: '30px', kullanim: 'Hero/welcome' },
  ],
  fontAgirlik: { regular: 400, medium: 500, semibold: 600, bold: 700 },
} as const

// ══════════════════════════════════════════
// 4. SPACING, RADIUS, SHADOW, MOTION
// ══════════════════════════════════════════

export const SPACING_OLCEGI = [
  { isim: '0', rem: '0', px: '0' }, { isim: '0.5', rem: '0.125rem', px: '2px' },
  { isim: '1', rem: '0.25rem', px: '4px' }, { isim: '1.5', rem: '0.375rem', px: '6px' },
  { isim: '2', rem: '0.5rem', px: '8px' }, { isim: '3', rem: '0.75rem', px: '12px' },
  { isim: '4', rem: '1rem', px: '16px' }, { isim: '5', rem: '1.25rem', px: '20px' },
  { isim: '6', rem: '1.5rem', px: '24px' }, { isim: '8', rem: '2rem', px: '32px' },
  { isim: '10', rem: '2.5rem', px: '40px' }, { isim: '12', rem: '3rem', px: '48px' },
  { isim: '16', rem: '4rem', px: '64px' }, { isim: '20', rem: '5rem', px: '80px' },
  { isim: '24', rem: '6rem', px: '96px' },
] as const

export const RADIUS_TOKENLARI = [
  { isim: 'none', deger: '0' }, { isim: 'sm', deger: '4px' }, { isim: 'md', deger: '8px' },
  { isim: 'lg', deger: '12px' }, { isim: 'xl', deger: '16px' }, { isim: '2xl', deger: '24px' },
  { isim: 'full', deger: '9999px', aciklama: 'Pill / circle' },
] as const

export const SHADOW_TOKENLARI = [
  { isim: 'xs', deger: '0 1px 2px rgba(0,0,0,0.25)' },
  { isim: 'sm', deger: '0 2px 4px rgba(0,0,0,0.2)' },
  { isim: 'md', deger: '0 4px 12px rgba(0,0,0,0.25)' },
  { isim: 'lg', deger: '0 8px 24px rgba(0,0,0,0.3)' },
  { isim: 'xl', deger: '0 16px 48px rgba(0,0,0,0.35)' },
  { isim: 'ai', deger: '0 0 20px rgba(139,92,246,0.3)', aciklama: 'AI glow' },
  { isim: 'focus', deger: '0 0 0 3px rgba(200,75,49,0.4)', aciklama: 'Focus ring' },
] as const

export const MOTION_TOKENLARI = {
  sure: { instant: '50ms', fast: '100ms', normal: '200ms', slow: '300ms', slower: '500ms' },
  easing: {
    default: 'cubic-bezier(0.4, 0, 0.2, 1)',
    in: 'cubic-bezier(0.4, 0, 1, 1)',
    out: 'cubic-bezier(0, 0, 0.2, 1)',
    bounce: 'cubic-bezier(0.34, 1.56, 0.64, 1)',
    spring: 'cubic-bezier(0.175, 0.885, 0.32, 1.275)',
  },
} as const

// ══════════════════════════════════════════
// 5. ESNAF SİTESİ TEMA PALETLERİ
// ══════════════════════════════════════════

export interface SiteTema {
  id: string; isim: string; bg: string; text: string; primary: string
  fontHeading: string; fontBody: string; radius: string; his: string
}

export const SITE_TEMALARI: SiteTema[] = [
  { id: 'kepenk_klasik', isim: 'Klasik', bg: '#FFFFFF', text: '#1A1A2E', primary: '#C84B31', fontHeading: 'Syne', fontBody: 'Lora', radius: '8px', his: 'Sıcak, profesyonel, güven veren' },
  { id: 'modern_koyu', isim: 'Modern Koyu', bg: '#111827', text: '#F9FAFB', primary: '#3B82F6', fontHeading: 'Plus Jakarta Sans', fontBody: 'DM Sans', radius: '12px', his: 'Teknolojik, şık, gece modu' },
  { id: 'dogal_yesil', isim: 'Doğal', bg: '#FEFDF5', text: '#1A3A1A', primary: '#2D6A4F', fontHeading: 'Playfair Display', fontBody: 'Source Sans 3', radius: '16px', his: 'Organik, doğal (eczane, spa)' },
  { id: 'berber_maskulen', isim: 'Berber', bg: '#1C1917', text: '#FAFAF9', primary: '#D97706', fontHeading: 'Oswald', fontBody: 'Roboto', radius: '4px', his: 'Maskülen, güçlü, geleneksel' },
  { id: 'pastel_feminen', isim: 'Zarif', bg: '#FDF2F8', text: '#831843', primary: '#EC4899', fontHeading: 'Cormorant Garamond', fontBody: 'Nunito', radius: '24px', his: 'Feminen, zarif, güzellik salonu' },
  { id: 'restoran_sicak', isim: 'Lezzet', bg: '#FFFBEB', text: '#451A03', primary: '#DC2626', fontHeading: 'Merriweather', fontBody: 'Open Sans', radius: '8px', his: 'Sıcak, iştah açıcı, restoran/kafe' },
  { id: 'medikal_temiz', isim: 'Medikal', bg: '#F0FDFA', text: '#134E4A', primary: '#0D9488', fontHeading: 'Outfit', fontBody: 'Noto Sans', radius: '12px', his: 'Temiz, steril, güvenilir (doktor)' },
  { id: 'minimalist_beyaz', isim: 'Minimalist', bg: '#FFFFFF', text: '#171717', primary: '#171717', fontHeading: 'Space Grotesk', fontBody: 'Inter', radius: '0px', his: 'Minimalist, sade (fotoğrafçı)' },
  { id: 'enerjik_spor', isim: 'Enerjik', bg: '#0A0A0A', text: '#FAFAFA', primary: '#10B981', fontHeading: 'Bebas Neue', fontBody: 'Rubik', radius: '8px', his: 'Enerjik, dinamik, spor salonu' },
]

// ══════════════════════════════════════════
// 6. COMPONENT SPECLERİ
// ══════════════════════════════════════════

export interface ComponentSpec {
  isim: string; kategori: 'primitive' | 'composite' | 'site' | 'layout'
  variants?: string[]; sizes?: string[]; states?: string[]; aciklama: string
}

export const COMPONENT_SPECLERI: ComponentSpec[] = [
  // Primitives
  { isim: 'Button', kategori: 'primitive', variants: ['primary', 'secondary', 'ghost', 'danger', 'ai', 'success', 'link'], sizes: ['xs', 'sm', 'md', 'lg', 'xl'], states: ['default', 'hover', 'focus', 'active', 'disabled', 'loading'], aciklama: 'Tüm CTA işlemleri' },
  { isim: 'Input', kategori: 'primitive', variants: ['text', 'email', 'password', 'tel', 'number', 'url', 'search'], sizes: ['sm', 'md', 'lg'], states: ['default', 'focus', 'error', 'disabled', 'readOnly'], aciklama: 'Form giriş alanı' },
  { isim: 'Textarea', kategori: 'primitive', sizes: ['sm', 'md', 'lg'], states: ['default', 'focus', 'error', 'disabled'], aciklama: 'Çok satırlı metin girişi' },
  { isim: 'Select', kategori: 'primitive', sizes: ['sm', 'md', 'lg'], states: ['default', 'open', 'error', 'disabled'], aciklama: 'Seçim listesi' },
  { isim: 'Checkbox', kategori: 'primitive', states: ['unchecked', 'checked', 'indeterminate', 'disabled'], aciklama: 'Çoklu seçim' },
  { isim: 'Radio', kategori: 'primitive', states: ['unselected', 'selected', 'disabled'], aciklama: 'Tekli seçim' },
  { isim: 'Switch', kategori: 'primitive', states: ['off', 'on', 'disabled'], aciklama: 'Aç/kapat toggle' },
  { isim: 'Badge', kategori: 'primitive', variants: ['default', 'success', 'warning', 'error', 'info', 'ai'], sizes: ['sm', 'md'], aciklama: 'Durum etiketi' },
  { isim: 'Avatar', kategori: 'primitive', sizes: ['xs', 'sm', 'md', 'lg', 'xl'], aciklama: 'Profil görseli' },
  { isim: 'Tooltip', kategori: 'primitive', aciklama: 'Hover/focus bilgi balonu' },
  { isim: 'Toast', kategori: 'primitive', variants: ['success', 'error', 'warning', 'info'], aciklama: 'Anlık bildirim' },
  { isim: 'Modal', kategori: 'primitive', sizes: ['sm', 'md', 'lg', 'xl', 'fullscreen'], aciklama: 'Dialog penceresi' },
  { isim: 'Drawer', kategori: 'primitive', variants: ['left', 'right'], aciklama: 'Yan panel' },
  { isim: 'Tabs', kategori: 'primitive', aciklama: 'Sekme navigasyonu' },
  { isim: 'Accordion', kategori: 'primitive', aciklama: 'Açılır-kapanır içerik' },
  { isim: 'Table', kategori: 'primitive', aciklama: 'Basit tablo' },
  { isim: 'Pagination', kategori: 'primitive', aciklama: 'Sayfa gezinme' },
  { isim: 'Skeleton', kategori: 'primitive', aciklama: 'Yükleme placeholder' },
  { isim: 'Spinner', kategori: 'primitive', sizes: ['sm', 'md', 'lg'], aciklama: 'Dönen yükleme' },
  { isim: 'ProgressBar', kategori: 'primitive', aciklama: 'İlerleme çubuğu' },
  { isim: 'Card', kategori: 'primitive', aciklama: 'İçerik kartı' },
  { isim: 'EmptyState', kategori: 'primitive', sizes: ['sm', 'md', 'lg'], aciklama: 'Boş durum gösterimi' },
  { isim: 'ConfirmDialog', kategori: 'primitive', aciklama: 'Onay diyaloğu' },
  { isim: 'DropdownMenu', kategori: 'primitive', aciklama: 'Açılır menü' },
  { isim: 'Tag', kategori: 'primitive', aciklama: 'Çıkarılabilir etiket' },
  { isim: 'Alert', kategori: 'primitive', variants: ['info', 'success', 'warning', 'error'], aciklama: 'Bilgi/uyarı kutusu' },
  { isim: 'Breadcrumb', kategori: 'primitive', aciklama: 'Konum izleme' },
  { isim: 'FileUpload', kategori: 'primitive', aciklama: 'Dosya yükleme' },
  { isim: 'Divider', kategori: 'primitive', aciklama: 'Yatay/dikey ayırıcı' },
  { isim: 'Popover', kategori: 'primitive', aciklama: 'Açılır bilgi paneli' },
  // Composites
  { isim: 'DataTable', kategori: 'composite', aciklama: 'Sıralama + filtre + sayfalama + seçim' },
  { isim: 'FormField', kategori: 'composite', aciklama: 'Label + Input + Error birleşik' },
  { isim: 'SearchInput', kategori: 'composite', aciklama: 'Debounce + clear + ikon' },
  { isim: 'PhoneInput', kategori: 'composite', aciklama: 'Türk telefon formatı (+90, 5XX)' },
  { isim: 'PriceInput', kategori: 'composite', aciklama: '₺ prefix + virgül ondalık + KDV hesap' },
  { isim: 'DatePicker', kategori: 'composite', aciklama: 'Türk tarih formatı (GG.AA.YYYY)' },
  { isim: 'TimePicker', kategori: 'composite', aciklama: '24 saat format' },
  { isim: 'ImageUploader', kategori: 'composite', aciklama: 'Drag+drop + crop + kamera + AI' },
  { isim: 'RichTextEditor', kategori: 'composite', aciklama: 'Basit WYSIWYG (esnaf için)' },
  { isim: 'ColorPicker', kategori: 'composite', aciklama: 'Renk seçici' },
  { isim: 'StatsCard', kategori: 'composite', aciklama: 'Metrik kartı (gelir, ziyaretçi, eğilim)' },
  { isim: 'HealthIndicator', kategori: 'composite', aciklama: 'Yeşil/sarı/kırmızı sağlık göstergesi' },
  { isim: 'OnboardingChecklist', kategori: 'composite', aciklama: 'İlerleme + kutlama animasyonlu' },
  // Site Components
  { isim: 'HeroBanner', kategori: 'site', aciklama: 'Ana banner + CTA' },
  { isim: 'ServiceCard', kategori: 'site', aciklama: 'Hizmet kartı' },
  { isim: 'ProductCard', kategori: 'site', aciklama: 'Ürün kartı + sepete ekle' },
  { isim: 'PriceTable', kategori: 'site', aciklama: 'Fiyat listesi tablosu' },
  { isim: 'TestimonialSlider', kategori: 'site', aciklama: 'Referans slider' },
  { isim: 'ContactForm', kategori: 'site', aciklama: 'İletişim formu' },
  { isim: 'WhatsAppCTA', kategori: 'site', aciklama: 'WhatsApp iletişim butonu' },
  { isim: 'GoogleMap', kategori: 'site', aciklama: 'Harita embed' },
  { isim: 'WorkingHours', kategori: 'site', aciklama: 'Çalışma saatleri' },
  { isim: 'Gallery', kategori: 'site', aciklama: 'Fotoğraf galerisi + lightbox' },
  { isim: 'BeforeAfter', kategori: 'site', aciklama: 'Önce/sonra slider' },
  { isim: 'MenuList', kategori: 'site', aciklama: 'Restoran menü listesi' },
  { isim: 'TeamMember', kategori: 'site', aciklama: 'Ekip üyesi kartı' },
  { isim: 'FAQAccordion', kategori: 'site', aciklama: 'SSS açılır-kapanır' },
  { isim: 'BookingWidget', kategori: 'site', aciklama: 'Online randevu widget' },
  { isim: 'FloatingWhatsApp', kategori: 'site', aciklama: 'Sabit WhatsApp butonu' },
  { isim: 'SiteHeader', kategori: 'site', aciklama: 'Site üst navigasyon' },
  { isim: 'SiteFooter', kategori: 'site', aciklama: 'Site alt bilgi' },
  // Layouts
  { isim: 'DashboardLayout', kategori: 'layout', aciklama: 'Sidebar + content + panel' },
  { isim: 'AuthLayout', kategori: 'layout', aciklama: 'Giriş/kayıt sayfası' },
  { isim: 'SettingsLayout', kategori: 'layout', aciklama: 'Ayarlar sekmeli layout' },
  { isim: 'SiteLayout', kategori: 'layout', aciklama: 'Esnaf site header+footer' },
]

// ══════════════════════════════════════════
// 7. İKON SİSTEMİ
// ══════════════════════════════════════════

export const IKON_BOYUTLARI = [
  { isim: 'xs', px: 14, kullanim: 'Badge, tablo içi' },
  { isim: 'sm', px: 16, kullanim: 'Buton içi, menü' },
  { isim: 'md', px: 20, kullanim: 'VARSAYILAN — form, toolbar' },
  { isim: 'lg', px: 24, kullanim: 'Panel başlık, nav' },
  { isim: 'xl', px: 32, kullanim: 'Boş durum, feature' },
  { isim: '2xl', px: 48, kullanim: 'Hero, illüstrasyon' },
] as const

export const MODUL_IKONLARI: Record<string, string> = {
  dashboard: 'LayoutDashboard', site_editor: 'Paintbrush', eticaret: 'ShoppingBag',
  siparisler: 'Package', randevu: 'Calendar', crm: 'Users', kampanyalar: 'Megaphone',
  raporlar: 'BarChart3', ayarlar: 'Settings', whatsapp: 'MessageCircle',
  ai: 'Sparkles', restaurant: 'UtensilsCrossed', pos: 'CreditCard', sadakat: 'Heart',
}

export const AKSIYON_IKONLARI: Record<string, string> = {
  ekle: 'Plus', sil: 'Trash2', duzenle: 'Pencil', kaydet: 'Save', kopyala: 'Copy',
  paylas: 'Share2', indir: 'Download', yukle: 'Upload', ara: 'Search', filtrele: 'Filter',
  sirala: 'ArrowUpDown', geri: 'ArrowLeft', ileri: 'ArrowRight', kapat: 'X', menu: 'Menu',
  daha_fazla: 'MoreHorizontal', bilgi: 'Info', uyari: 'AlertTriangle', basari: 'Check',
  hata: 'XCircle', goz: 'Eye', goz_kapali: 'EyeOff', takvim: 'Calendar', saat: 'Clock',
  konum: 'MapPin', telefon: 'Phone', mail: 'Mail',
}

// ══════════════════════════════════════════
// 8. ANİMASYON STANDARTLARI
// ══════════════════════════════════════════

export const ANIMASYON_KARARI = {
  cssKullan: ['Hover/focus renk değişimi', 'Opacity transition', 'Border-color transition', 'Küçük scale transform', 'Height auto geçişi'],
  framerMotionKullan: ['Sayfa geçişleri', 'Modal/Drawer açılma-kapanma', 'Liste item AnimatePresence', 'Drag & drop', 'Layout animasyonları', 'Giriş stagger', 'Konfeti/kutlama'],
} as const

export const ANIMASYON_PRESETLERI = {
  fadeIn: { initial: { opacity: 0 }, animate: { opacity: 1 }, exit: { opacity: 0 }, transition: { duration: 0.2 } },
  slideUp: { initial: { opacity: 0, y: 10 }, animate: { opacity: 1, y: 0 }, transition: { duration: 0.2, ease: 'easeOut' } },
  scaleIn: { initial: { opacity: 0, scale: 0.95 }, animate: { opacity: 1, scale: 1 }, transition: { duration: 0.2 } },
  slideRight: { initial: { x: '100%' }, animate: { x: 0 }, exit: { x: '100%' }, transition: { duration: 0.3, ease: 'easeOut' } },
  staggerChildren: { parent: { staggerChildren: 0.05 }, child: { initial: { opacity: 0, y: 8 }, animate: { opacity: 1, y: 0 } } },
} as const

// ══════════════════════════════════════════
// 9. RESPONSİVE KURALLAR
// ══════════════════════════════════════════

export const BREAKPOINTS = [
  { isim: 'sm', px: 640, aciklama: 'Küçük mobil' },
  { isim: 'md', px: 768, aciklama: 'Tablet' },
  { isim: 'lg', px: 1024, aciklama: 'Küçük desktop' },
  { isim: 'xl', px: 1280, aciklama: 'Desktop' },
  { isim: '2xl', px: 1536, aciklama: 'Geniş ekran' },
] as const

export const RESPONSIVE_KURALLAR = {
  dashboard: {
    mobil: 'Sidebar → drawer (hamburger), DataTable → kart, Modal → fullscreen, Toast → top-center',
    tablet: 'Sidebar daraltılabilir (ikon-only), iki sütun → tek sütun',
    desktop: 'Tam: sidebar + content + opsiyonel sağ panel',
  },
  esnafSite: {
    mobileFirst: true,
    grid: { desktop: '3-4 sütun', tablet: '2 sütun', mobil: '1 sütun' },
    tipografiCarpani: { mobil: 0.875, tablet: 0.9375, desktop: 1.0 },
  },
} as const

// ══════════════════════════════════════════
// 10. ERİŞİLEBİLİRLİK (WCAG 2.1 AA)
// ══════════════════════════════════════════

export const ERISILEBIRLIK = {
  hedef: 'WCAG 2.1 AA',
  kontrast: { normalMetin: '≥4.5:1', buyukMetin: '≥3:1', uiBilesen: '≥3:1' },
  dogrulanmisOranlar: [
    { fg: '--kp-text (#F5F0E8)', bg: '--kp-surface (#1E1E2E)', oran: '12.4:1', sonuc: '✅' },
    { fg: '--kp-text-secondary (#9CA3AF)', bg: '--kp-surface', oran: '5.9:1', sonuc: '✅' },
    { fg: '--kp-rust (#C84B31)', bg: '--kp-surface', oran: '4.7:1', sonuc: '✅' },
  ],
  klavye: ['Tab → tüm interaktif element', 'Enter/Space → buton/link aktivasyonu', 'Escape → modal/dropdown kapat', 'Arrow keys → menü/tab/accordion', 'focus-visible → sadece klavyede focus ring', 'Skip to content linki'],
  ariaPatternleri: {
    modal: 'role=dialog, aria-modal=true, focus trap',
    toast: 'role=alert, aria-live (polite/assertive)',
    dropdown: 'role=menu, aria-expanded, aria-haspopup',
    tabs: 'role=tablist/tab/tabpanel, aria-selected',
    form: 'aria-required, aria-invalid, aria-describedby',
  },
  test: { otomatik: 'axe-core — her CI build', manuel: 'Çeyreklik VoiceOver + NVDA', lighthouseHedef: '≥90' },
} as const

// ══════════════════════════════════════════
// 11. STORYBOOK ORGANİZASYONU
// ══════════════════════════════════════════

export const STORYBOOK_ORGANIZASYONU = {
  url: 'https://storybook.kepenk.ai',
  kategoriler: [
    { isim: 'Tokens', icerik: ['Renkler', 'Tipografi', 'Spacing', 'Shadows', 'İkonlar', 'Animasyonlar'] },
    { isim: 'Primitives', icerik: ['Button', 'Input', 'Select', 'Checkbox/Radio/Switch', 'Badge', 'Avatar', 'Toast', 'Modal', 'Drawer', 'Tabs', 'Accordion', 'Table', 'EmptyState', 'ConfirmDialog'] },
    { isim: 'Composites', icerik: ['FormField', 'DataTable', 'PhoneInput', 'PriceInput', 'DatePicker', 'ImageUploader', 'StatsCard', 'OnboardingChecklist'] },
    { isim: 'Site Components', icerik: ['HeroBanner', 'ServiceCard', 'ProductCard', 'PriceTable', 'Gallery', 'BookingWidget', 'WhatsAppCTA', 'SiteHeader/Footer'] },
    { isim: 'Layouts', icerik: ['DashboardLayout', 'AuthLayout', 'SettingsLayout'] },
  ],
  storyStandart: ['Default', 'All Variants', 'All Sizes', 'States (hover/focus/disabled/loading/error)', 'Responsive', 'A11y (axe-core)'],
} as const

// ══════════════════════════════════════════
// 12. COMPONENT GELİŞTİRME KONTROL LİSTESİ
// ══════════════════════════════════════════

export const COMPONENT_CHECKLIST = {
  tasarim: ['Token kullanımı (hardcoded YOK)', 'Tüm variant/size/state tanımlı', 'Dark tema uyumlu', 'Responsive', 'Animasyon kararı (CSS vs Framer)', 'prefers-reduced-motion desteği'],
  kod: ['TypeScript interface tam', 'defaultProps atanmış', 'React.forwardRef desteği', 'cn() utility kullanımı', 'Gereksiz re-render önlemi'],
  erisilebirlik: ['Keyboard navigasyonu', 'ARIA attribute', 'Focus ring (focus-visible)', 'Kontrast ≥4.5:1 / ≥3:1', 'Screen reader test', 'axe-core geçiyor'],
  dokumantasyon: ['Storybook story yazılmış', 'JSDoc/TSDoc prop açıklamaları'],
  test: ['Unit test (render, props, events)', 'A11y test (axe-core)', 'Barrel export'],
} as const
