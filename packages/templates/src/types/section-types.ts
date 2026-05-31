/**
 * @kepenk/templates — Section Type System (v2.0)
 *
 * Complete type definitions for the theme engine:
 * SectionType enum, SectionProps, BusinessData, ThemeConfig, PageConfig
 */

import type { ComponentType, ReactNode } from 'react'

// ═══════════════════════════════════════════
// SECTION TYPE ENUM
// ═══════════════════════════════════════════

export type SectionType =
  // Universal — usable in every sector
  | 'header' | 'hero' | 'services' | 'about' | 'team' | 'gallery'
  | 'testimonials' | 'faq' | 'contact' | 'map' | 'cta' | 'stats'
  | 'pricing' | 'blog_preview' | 'instagram_feed' | 'working_hours'
  | 'whatsapp_cta' | 'footer' | 'philosophy' | 'process_steps'
  | 'brands_logos' | 'promotions' | 'emergency_banner' | 'social_proof'
  | 'newsletter' | 'cookie_banner'
  // Sector-specific
  | 'before_after' | 'booking' | 'menu_display' | 'daily_special'
  | 'reservation' | 'delivery_zone' | 'doctor_profile' | 'insurance_logos'
  | 'vaccination_calendar' | 'duty_pharmacy' | 'health_tip' | 'pet_species'
  | 'smile_gallery' | 'fear_reducer' | 'technology_showcase' | 'price_calculator'
  | 'practice_areas' | 'case_results' | 'confidentiality' | 'certifications'
  | 'client_industries' | 'tax_calendar' | 'insurance_types' | 'free_quote'
  | 'class_schedule' | 'membership_pricing' | 'transformation' | 'trainer_profile'
  | 'workout_of_day' | 'portfolio_grid' | 'project_story' | 'video_showreel'
  | 'booking_inquiry' | 'awards_press' | 'client_proofing' | 'wedding_packages'
  | 'planning_timeline' | 'vendor_partners' | 'venue_directory'
  | 'vehicle_brands' | 'warranty_badge' | 'service_area' | 'work_before_after'
  | 'project_type_selector' | 'device_repair_pricing' | 'seasonal_service'
  | 'property_search' | 'property_listing' | 'sold_showcase' | 'free_valuation'
  | 'subject_grid' | 'success_stories' | 'free_trial' | 'online_offline_toggle'
  | 'level_path' | 'gold_price_ticker' | 'jewelry_grid' | 'gold_buyback'
  | 'custom_design' | 'catering_packages' | 'meat_guide' | 'floral_grid'
  | 'same_day_delivery' | 'tailoring_services' | 'field_availability'
  | 'hourly_pricing' | 'swimming_courses' | 'instrument_grid'
  | 'multi_location' | 'career_listings' | 'franchise_section'
  | 'corporate_membership' | 'loyalty_program' | 'quick_access_cards'

// ═══════════════════════════════════════════
// ANIMATION PRESET
// ═══════════════════════════════════════════

export type AnimationPreset = 'none' | 'fadeUp' | 'fadeIn' | 'slideLeft' | 'slideRight' | 'scaleUp' | 'stagger' | 'fade' | 'slide-up' | 'parallax3d' | 'kenBurns' | 'morphBlob' | (string & {})

// ═══════════════════════════════════════════
// SECTION SETTINGS
// ═══════════════════════════════════════════

export interface SectionSettings {
  bgMode: 'default' | 'surface' | 'muted' | 'accent' | 'dark' | 'image' | 'gradient'
  bgImage?: string
  bgGradient?: string
  bgOverlay?: string
  paddingY: 'none' | 'xs' | 'sm' | 'md' | 'lg' | 'xl'
  containerWidth: 'xs' | 'sm' | 'md' | 'default' | 'lg' | 'xl' | 'full'
  visible: boolean
  order?: number
  removable?: boolean
  animation?: AnimationPreset
  extraClasses?: string
  [key: string]: unknown
}

// ═══════════════════════════════════════════
// SECTION PROPS — Every section component receives this
// ═══════════════════════════════════════════

export interface SectionProps<TContent = Record<string, unknown>> {
  content: TContent
  business: BusinessData
  isEditing?: boolean
  onContentChange?: (path: string, value: unknown) => void
  settings: SectionSettings
}

// ═══════════════════════════════════════════
// BUSINESS DATA
// ═══════════════════════════════════════════

export interface DayHours {
  day: 'monday' | 'tuesday' | 'wednesday' | 'thursday' | 'friday' | 'saturday' | 'sunday'
  dayTr: string
  open: string | null
  close: string | null
}

export interface Photo {
  url: string
  alt: string
  width: number
  height: number
  category?: string
}

export interface ServiceItem {
  id: string
  name: string
  description?: string
  price?: string
  priceNote?: string
  duration?: string
  icon?: string
  image?: string
  category?: string
  popular?: boolean
}

export interface TeamMember {
  id: string
  name: string
  role: string
  photo?: string
  bio?: string
  experience?: string
  specialties?: string[]
  social?: Record<string, string>
}

export interface MenuCategory {
  id: string
  name: string
  items: MenuItem[]
}

export interface MenuItem {
  id: string
  name: string
  description?: string
  price: string
  image?: string
  tags?: string[]
  dietary?: string[]
}

export interface ProductItem {
  id: string
  name: string
  description?: string
  price: string
  image?: string
  category?: string
  inStock?: boolean
}

export interface BusinessData {
  name: string
  ownerName?: string
  sector?: string
  sectorId?: string
  slogan?: string

  phone?: string
  phoneClean?: string
  whatsapp?: string
  email?: string
  website?: string

  address?: string
  city?: string
  district?: string
  neighborhood?: string
  coordinates?: { lat: number; lng: number }

  workingHours?: DayHours[]

  socialMedia?: {
    instagram?: string
    facebook?: string
    twitter?: string
    youtube?: string
    tiktok?: string
    linkedin?: string
  }

  logoUrl?: string
  photos?: any[]

  services?: ServiceItem[]
  team?: TeamMember[]
  menu?: MenuCategory[]
  products?: ProductItem[]

  foundedYear?: number
  experience?: string
  customerCount?: string
  rating?: number
  reviewCount?: number

  [key: string]: unknown
}

// ═══════════════════════════════════════════
// THEME CONFIG
// ═══════════════════════════════════════════

export interface DesignTokens {
  spacing?: {
    xs?: string
    sm?: string
    md?: string
    lg?: string
    xl?: string
    '2xl'?: string
  }
  radius?: {
    sm?: string
    md?: string
    lg?: string
    xl?: string
    full?: string
  }
  shadows?: {
    sm?: string
    md?: string
    lg?: string
    xl?: string
    inner?: string
  }
  typography?: {
    h1?: string
    h2?: string
    h3?: string
    p?: string
    small?: string
  }
  [key: string]: unknown
}

export interface ThemeConfig {
  id: string
  name: string
  sectorId: string
  plan: 'free' | 'starter' | 'growth' | 'pro' | 'enterprise' | 'elite'
  description?: string
  designPhilosophy?: string
  inspiration?: string[]
  isDark?: boolean
  cssVariables: Record<string, string>
  designTokens?: DesignTokens
  fonts?: {
    heading: { family: string; weights: number[]; subsets?: string[] }
    body: { family: string; weights: number[]; subsets?: string[] }
  }
  pages?: PageConfig[]
  globalSections?: GlobalSectionConfig[]
  seoSchemaType?: string
  sectorSections?: string[]
  performanceBudget?: {
    maxJS: string
    maxLCP: string
    animationLevel: 'css-only' | 'framer-basic' | 'framer-full' | 'gsap-allowed' | 'gsap-parallax' | (string & {})
  }
  [key: string]: unknown
}

export interface PageConfig {
  id: string
  slug: string
  title: string
  titleTr?: string
  isHomePage?: boolean
  includeInNav?: boolean
  sections: SectionConfig[]
}

import type { BlockNode } from './ast-types'

export interface SectionConfig {
  id: string
  type: SectionType | (string & {})
  variant: string
  order: number
  required?: boolean
  settings: Partial<SectionSettings> & { visible?: boolean }
  defaultContent?: Record<string, any>
  editableFields?: EditableField[]
  // V2 AST Engine Support
  blockTree?: BlockNode
}

export interface EditableField {
  path: string
  type: 'text' | 'richtext' | 'image' | 'link' | 'color' | 'number' | 'select' | 'array'
  label: string
  placeholder?: string
  required?: boolean
  options?: string[]
}

export interface GlobalSectionConfig extends SectionConfig {
  position: 'top' | 'bottom' | 'floating'
}
