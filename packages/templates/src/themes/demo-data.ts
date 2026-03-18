/**
 * @kepenk/templates — Full Demo Data Barrel Export
 *
 * Complete business data for all 40 sectors' free-tier demo sites.
 * Includes services (priced), menus, working hours, teams, reviews + sector-specific data.
 */

// Common
export type { FullDemoData, DemoService, DemoMenuItem, DemoMenuCategory, DemoTeamMember, DemoWorkingDay, DemoReview } from './demo-data-common'
export { WH_STANDART_DUKKAN, WH_RESTORAN, WH_SAGLIK, WH_724, WH_BAR, WH_OFIS, WH_SPOR, DEFAULT_REVIEWS, REVIEWS_5_STAR, REVIEWS_4_STAR } from './demo-data-common'

// P0 (8 sectors)
export { DEMO_BERBER, DEMO_RESTORAN, DEMO_DOKTOR, DEMO_GUZELLIK, DEMO_AVUKAT, DEMO_DISCI, DEMO_OTO, DEMO_SPOR, DEMO_P0 } from './demo-data-p0'

// P1 (12 sectors)
export { DEMO_KAFE, DEMO_FIRIN, DEMO_ECZANE, DEMO_VETERINER, DEMO_FOTOGRAFCI, DEMO_DUGUN, DEMO_ELEKTRIKCI, DEMO_TESISATCI, DEMO_MUHASEBECI, DEMO_EMLAKCI, DEMO_OZELDERS, DEMO_KUYUMCU, DEMO_P1 } from './demo-data-p1'

// P2 (10 sectors)
export { DEMO_PSIKOLOG, DEMO_FASTFOOD, DEMO_BAR, DEMO_TELEFON, DEMO_KLIMA, DEMO_MIMARLIK, DEMO_SIGORTA, DEMO_SURUCU, DEMO_DIL, DEMO_YOGA, DEMO_P2 } from './demo-data-p2'

// P3 (10 sectors)
export { DEMO_OPTIK, DEMO_PETSHOP, DEMO_CICEKCI, DEMO_TERZI, DEMO_HALISAHA, DEMO_YUZME, DEMO_CATERING, DEMO_KASAP, DEMO_CILINGIR, DEMO_MUZIK, DEMO_P3 } from './demo-data-p3'
