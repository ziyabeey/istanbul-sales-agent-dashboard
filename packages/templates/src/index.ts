/**
 * @kepenk/templates — Barrel Export (v2.0)
 */

// ═══ Legacy Types (backward compat) ═══
export type {
  BlockType,
  BlockConfig,
  SiteTheme,
  SectorTemplate,
  SectorConfig,
} from './types/template'

// ═══ Theme Engine v2.0 Types ═══
export type {
  SectionType,
  AnimationPreset,
  SectionSettings,
  SectionProps,
  BusinessData,
  DayHours,
  Photo,
  ServiceItem,
  TeamMember,
  MenuCategory,
  MenuItem,
  ProductItem,
  ThemeConfig,
  PageConfig,
  SectionConfig,
  EditableField,
  GlobalSectionConfig,
} from './types/section-types'

// ═══ Section Content Interfaces (File 2/8) ═══
export type {
  HeaderContent,
  HeroContent,
  ServicesContent,
  AboutContent,
  TeamContent,
  GalleryContent,
  TestimonialsContent,
  FAQContent,
  ContactContent,
  MapContent,
  StatsContent,
  FooterContent,
  WorkingHoursContent,
  WhatsAppCTAContent,
  CookieBannerContent,
  CTAContent,
  PricingContent,
  ProcessStepsContent,
  PhilosophyContent,
  BrandsLogosContent,
  PromotionsContent,
  EmergencyBannerContent,
  SocialProofContent,
  BlogPreviewContent,
  NewsletterContent,
  InstagramFeedContent,
} from './types/section-content'

// ═══ Section Variant Definitions ═══
export {
  UNIVERSAL_SECTIONS,
  SECTION_DEF_MAP,
  getVariantIds,
  isVariantAvailable,
} from './types/section-variants'
export type { VariantDef, SectionDef, EditableFieldDef } from './types/section-variants'

// ═══ Sector-Specific Content Interfaces (File 3/8) ═══
export type {
  // Cluster A: Randevu + Portfolyo
  BeforeAfterContent, BookingContent, PortfolioGridContent,
  ProjectStoryContent, BookingInquiryContent, VideoShowreelContent,
  AwardsPressContent, WeddingPackagesContent, PlanningTimelineContent,
  VendorPartnersContent, VenueDirectoryContent,
  // Cluster B: Restoran + Yemek
  MenuDisplayContent, DailySpecialContent, ReservationContent, DeliveryZoneContent,
  // Cluster C: Sağlık
  DoctorProfileContent, InsuranceLogosContent, SmileGalleryContent,
  FearReducerContent, PriceCalculatorContent, TechnologyShowcaseContent,
  VaccinationCalendarContent, DutyPharmacyContent, PetSpeciesContent, HealthTipContent,
  // Cluster D: Hizmet + Teknik
  VehicleBrandsContent, WarrantyBadgeContent, ServiceAreaContent,
  WorkBeforeAfterContent, DeviceRepairPricingContent, CertificationsContent,
  ProjectTypeSelectorContent, SeasonalServiceContent,
  // Cluster E: Hukuk + Finans
  PracticeAreasContent, CaseResultsContent, ConfidentialityContent,
  ClientIndustriesContent, TaxCalendarContent, InsuranceTypesContent, FreeQuoteContent,
  // Cluster F: Eğitim + Spor
  ClassScheduleContent, MembershipPricingContent, TransformationContent,
  TrainerProfileContent, WorkoutOfDayContent, SubjectGridContent,
  SuccessStoriesContent, FreeTrialContent, OnlineOfflineToggleContent, LevelPathContent,
  // Cluster G: Emlak
  PropertySearchContent, PropertyListingContent, SoldShowcaseContent, FreeValuationContent,
  // Cluster H: Kuyumcu
  GoldPriceTickerContent, JewelryGridContent, GoldBuybackContent, CustomDesignContent,
  // Cluster I: Kurumsal
  MultiLocationContent, CareerListingsContent, FranchiseSectionContent,
  CorporateMembershipContent, LoyaltyProgramContent, QuickAccessCardsContent,
} from './types/sector-content'

// ═══ Sector Variant Definitions ═══
export { SECTOR_SECTIONS, CROSS_SECTOR_MAP, getSectorSections } from './types/sector-variants'

// ═══ Design Tokens ═══
export { DEFAULT_CSS_VARIABLES, PADDING_Y_MAP, CONTAINER_WIDTH_MAP } from './lib/design-tokens'

// ═══ Animation ═══
export {
  EASE_OUT, SPRING,
  fadeUp, slideLeft, slideRight, fadeIn, scaleUp,
  staggerContainer, staggerChild,
  ANIMATION_MAP,
} from './lib/animation-presets'

// ═══ Template Resolver ═══
export { resolveTemplateVars } from './lib/template-resolver'

// ═══ Structured Data ═══
export { generateStructuredData, SECTOR_SCHEMA_MAP } from './lib/structured-data'

// ═══ Section Registry ═══
export { registerSection, resolveSection, getVariants, getRegisteredTypes } from './registry/section-registry'

// ═══ Unified Theme Catalog (200 themes) ═══
export { THEME_CATALOG, THEME_CATALOG_ARRAY, CATALOG_SECTORS, ALL_THEME_DEFS, getTheme, getThemesBySector, getThemesByPlan } from './registry/theme-catalog'
export type { ThemeCatalogEntry } from './registry/theme-catalog'

// ═══ Plan-Based Section Variants ═══
export {
  HeroFree, HeroStarter, HeroGrowth, HeroPro, HeroEnterprise,
  ServicesFree, ServicesStarter, ServicesGrowth, ServicesPro, ServicesEnterprise,
  HeaderFree, HeaderStarter, HeaderGrowth, HeaderPro, HeaderEnterprise,
  FooterFree, FooterStarter, FooterGrowth, FooterPro, FooterEnterprise,
} from './sections/plan-variants'

// ═══ Section Loader (dynamic import per sector) ═══
export { registerSectorSections, registerAllSections, isSectorLoaded } from './registry/section-loader'

// ═══ Config Loader (dynamic import per theme) ═══
export { loadThemeConfig } from './registry/config-loader'
export type { ThemeLoadResult } from './registry/config-loader'

// ═══ Sector Configs ═══
export { SECTORS } from './sectors/index'
export { berberTemplates } from './sectors/berber'
export { restoranTemplates } from './sectors/restoran'
export { doktorTemplates } from './sectors/doktor'
export { guzellikTemplates } from './sectors/guzellik'
export { avukatTemplates } from './sectors/avukat'
export { disTemplates } from './sectors/dis'
export { otoTemplates } from './sectors/oto'
export { sporTemplates } from './sectors/spor'

// ═══ P0 Themes (File 4/8) ═══
export type { P0ThemeDef } from './themes/p0-themes'
export { buildCssVariables } from './themes/p0-themes'
export { BERBER_THEMES } from './themes/p0-berber'
export { RESTORAN_THEMES } from './themes/p0-restoran'
export { DOKTOR_THEMES } from './themes/p0-doktor'
export { GUZELLIK_THEMES } from './themes/p0-guzellik'
export { AVUKAT_THEMES } from './themes/p0-avukat'
export { DISCI_THEMES } from './themes/p0-disci'
export { OTO_THEMES } from './themes/p0-oto'
export { SPOR_THEMES } from './themes/p0-spor'
export { P0_DEMO_BUSINESSES } from './themes/p0-demo-businesses'

// ═══ P1 Themes (File 5/8) ═══
export {
  KAFE_THEMES, FIRIN_THEMES, ECZANE_THEMES, VETERINER_THEMES,
  FOTOGRAFCI_THEMES, DUGUN_THEMES,
  ELEKTRIKCI_THEMES, TESISATCI_THEMES,
  MUHASEBECI_THEMES, EMLAKCI_THEMES, OZELDERS_THEMES, KUYUMCU_THEMES,
  P1_DEMO_BUSINESSES,
} from './themes/p1-themes'

// ═══ P2+P3 Themes (File 6/8) ═══
export {
  PSIKOLOG_THEMES, FASTFOOD_THEMES, BAR_THEMES, TELEFON_THEMES, KLIMA_THEMES,
  MIMARLIK_THEMES, SIGORTA_THEMES, SURUCU_THEMES, DIL_THEMES, YOGA_THEMES,
  OPTIK_THEMES, PETSHOP_THEMES, CICEKCI_THEMES, TERZI_THEMES, HALISAHA_THEMES,
  YUZME_THEMES, CATERING_THEMES, KASAP_THEMES, CILINGIR_THEMES, MUZIK_THEMES,
  P2P3_DEMO_BUSINESSES,
} from './themes/p2p3-themes'

// ═══ Extended Sector Themes (26 sectors, 175 themes) ═══
export {
  ASANSOR_EXT_THEMES, BOYACI_EXT_THEMES, CAMBALKON_EXT_THEMES,
  DIS_EXT_THEMES, EMLAK_EXT_THEMES, FITNESS_EXT_THEMES,
  FOTO_EXT_THEMES, HALIYIKAMA_EXT_THEMES, HUKUK_EXT_THEMES,
  INSAAT_EXT_THEMES, KAHVECI_EXT_THEMES, KARGO_EXT_THEMES,
  KLINIK_EXT_THEMES, KRES_EXT_THEMES, LASTIKCI_EXT_THEMES,
  MATBAA_EXT_THEMES, MOBILYACI_EXT_THEMES, MUHASEBE_EXT_THEMES,
  NAKLIYAT_EXT_THEMES, ORGANIK_EXT_THEMES, ORGANIZASYON_EXT_THEMES,
  OTOYIKAMA_EXT_THEMES, PASTANE_EXT_THEMES, PEYZAJ_EXT_THEMES,
  TEMIZLIK_EXT_THEMES, VET_EXT_THEMES,
} from './themes/extended-sector-themes'

// ═══ Full Demo Data (File 7/8) ═══
export type { FullDemoData, DemoService, DemoMenuItem, DemoMenuCategory, DemoTeamMember, DemoWorkingDay, DemoReview } from './themes/demo-data'
export {
  WH_STANDART_DUKKAN, WH_RESTORAN, WH_SAGLIK, WH_724, WH_BAR, WH_OFIS, WH_SPOR, DEFAULT_REVIEWS,
  DEMO_P0, DEMO_P1, DEMO_P2, DEMO_P3,
  DEMO_BERBER, DEMO_RESTORAN, DEMO_DOKTOR, DEMO_GUZELLIK, DEMO_AVUKAT, DEMO_DISCI, DEMO_OTO, DEMO_SPOR,
  DEMO_KAFE, DEMO_FIRIN, DEMO_ECZANE, DEMO_VETERINER, DEMO_FOTOGRAFCI, DEMO_DUGUN, DEMO_ELEKTRIKCI,
  DEMO_TESISATCI, DEMO_MUHASEBECI, DEMO_EMLAKCI, DEMO_OZELDERS, DEMO_KUYUMCU,
  DEMO_PSIKOLOG, DEMO_FASTFOOD, DEMO_BAR, DEMO_TELEFON, DEMO_KLIMA, DEMO_MIMARLIK,
  DEMO_SIGORTA, DEMO_SURUCU, DEMO_DIL, DEMO_YOGA,
  DEMO_OPTIK, DEMO_PETSHOP, DEMO_CICEKCI, DEMO_TERZI, DEMO_HALISAHA, DEMO_YUZME,
  DEMO_CATERING, DEMO_KASAP, DEMO_CILINGIR, DEMO_MUZIK,
} from './themes/demo-data'

// ═══ Sprint Execution (File 8/8) ═══
export { QUALITY_GATES, LIGHTHOUSE_GATES, RESPONSIVE_DEVICES, GATE_RESPONSIVE, GATE_FUNCTIONAL, GATE_SEO, GATE_KVKK } from './themes/quality-gates'
export type { LighthouseThresholds } from './themes/quality-gates'
export { SPRINT_PLAN, SPRINT_STATS, DEPLOYMENT_CONFIG, WORKFLOW_STEPS, buildInitialPrompt, buildDeltaPrompt } from './themes/sprint-execution'
export type { SprintDef, PromptContext, FirestoreThemeDoc } from './themes/sprint-execution'

// ═══ Renderer ═══
export { ThemeRenderer } from './renderer/ThemeRenderer'

// ═══ Section Components (side-effect registration) ═══
export { HeaderMinimalSticky } from './sections/header/HeaderMinimalSticky'
export { HeroFullscreenOverlay } from './sections/hero/HeroFullscreenOverlay'
export { ServicesCardGrid } from './sections/services/ServicesCardGrid'
export { FAQAccordion, TestimonialsCarousel, AboutSplitLeft, StatsAnimatedRow, CTAFullWidthBanner, ContactSimpleForm, WorkingHoursCompact, ProcessStepsHorizontal } from './sections/common/CommonSections'
export { MapFullWidth } from './sections/common/MapFullWidth'
export { FooterMinimal, FooterWarmColumns } from './sections/footer/FooterSections'
export { WhatsAppFloating, CookieBannerBottomBar } from './sections/global/GlobalSections'

// ═══ Per-Theme Configs & Section Components ═══
// All individual config/business/css exports and section component exports
// are re-exported from a separate sub-barrel for maintainability.
// These are primarily used by static demo pages; the dynamic route uses
// loadThemeConfig() + registerSectorSections() instead.
export * from './exports-configs-sections'

