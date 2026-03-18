/**
 * @kepenk/templates — Universal Section Content Interfaces
 *
 * 25 universal sections usable across all 40 sectors.
 * Each interface defines the content shape that ThemeRenderer passes to the component.
 * Template variables ({{business_name}}) are resolved before reaching the component.
 */

// ═══════════════════════════════════════════
// SECTION 01: HEADER
// ═══════════════════════════════════════════

export interface HeaderContent {
  logo: {
    type: 'text' | 'image'
    text?: string
    imageUrl?: string
    imageAlt?: string
  }
  menuItems: {
    label: string
    href: string
    isExternal?: boolean
    children?: {
      label: string
      href: string
      description?: string
      icon?: string
    }[]
  }[]
  cta?: {
    text: string
    href: string
    variant: 'solid' | 'outline'
  }
  topBar?: {
    phone?: string
    email?: string
    address?: string
    workingHours?: string
    socialLinks?: { platform: string; url: string }[]
  }
}

// ═══════════════════════════════════════════
// SECTION 02: HERO
// ═══════════════════════════════════════════

export interface HeroContent {
  title: string
  subtitle?: string
  badge?: string
  cta1?: { text: string; href: string; icon?: string }
  cta2?: { text: string; href: string; icon?: string }
  backgroundImage?: string
  backgroundVideo?: { url: string; poster: string }
  badges?: { icon: string; text: string }[]
  slides?: {
    title: string
    subtitle?: string
    image: string
    cta?: { text: string; href: string }
  }[]
  searchFields?: {
    placeholder: string
    categories?: string[]
  }
  quickCards?: { icon: string; label: string; href: string }[]
  overlayOpacity?: number
}

// ═══════════════════════════════════════════
// SECTION 03: SERVICES
// ═══════════════════════════════════════════

export interface ServicesContent {
  title: string
  subtitle?: string
  badge?: string
  services: {
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
    link?: string
  }[]
  categories?: string[]
  ctaText?: string
  ctaHref?: string
}

// ═══════════════════════════════════════════
// SECTION 04: ABOUT
// ═══════════════════════════════════════════

export interface AboutContent {
  badge?: string
  title: string
  description: string
  image?: string
  stats?: { value: string; label: string; icon?: string }[]
  signature?: { name: string; role: string; photo?: string }
  values?: { icon: string; title: string; description: string }[]
}

// ═══════════════════════════════════════════
// SECTION 05: TEAM
// ═══════════════════════════════════════════

export interface TeamContent {
  badge?: string
  title: string
  subtitle?: string
  members: {
    id: string
    name: string
    role: string
    photo?: string
    bio?: string
    experience?: string
    specialties?: string[]
    social?: { instagram?: string; linkedin?: string }
  }[]
}

// ═══════════════════════════════════════════
// SECTION 06: GALLERY
// ═══════════════════════════════════════════

export interface GalleryContent {
  badge?: string
  title: string
  subtitle?: string
  images: {
    id: string
    url: string
    alt: string
    width: number
    height: number
    category?: string
    caption?: string
  }[]
  categories?: string[]
}

// ═══════════════════════════════════════════
// SECTION 07: TESTIMONIALS
// ═══════════════════════════════════════════

export interface TestimonialsContent {
  badge?: string
  title: string
  reviews: {
    id: string
    name: string
    text: string
    rating: number
    date?: string
    photo?: string
    service?: string
    source?: 'google' | 'instagram' | 'manual'
  }[]
  overallRating?: {
    value: number
    count: number
    source: string
  }
}

// ═══════════════════════════════════════════
// SECTION 08: FAQ
// ═══════════════════════════════════════════

export interface FAQContent {
  badge?: string
  title: string
  subtitle?: string
  questions: {
    id: string
    question: string
    answer: string
  }[]
  ctaText?: string
  ctaDescription?: string
  ctaHref?: string
}

// ═══════════════════════════════════════════
// SECTION 09: CONTACT
// ═══════════════════════════════════════════

export interface ContactContent {
  badge?: string
  title: string
  subtitle?: string
  fields: {
    id: string
    type: 'text' | 'email' | 'phone' | 'textarea' | 'select'
    label: string
    placeholder?: string
    required: boolean
    options?: string[]
  }[]
  submitText: string
  consentText: string
  consentLink: string
  successMessage: string
  contactInfo?: {
    phone?: string
    email?: string
    address?: string
    workingHours?: string
    mapEmbedUrl?: string
  }
}

// ═══════════════════════════════════════════
// SECTION 10: MAP
// ═══════════════════════════════════════════

export interface MapContent {
  title?: string
  address: string
  coordinates?: { lat: number; lng: number }
  embedUrl?: string
  infoCards?: { icon: string; label: string; value: string }[]
}

// ═══════════════════════════════════════════
// SECTION 11: STATS
// ═══════════════════════════════════════════

export interface StatsContent {
  stats: {
    value: string
    label: string
    icon?: string
    suffix?: string
  }[]
}

// ═══════════════════════════════════════════
// SECTION 12: FOOTER
// ═══════════════════════════════════════════

export interface FooterContent {
  businessName: string
  description?: string
  columns?: {
    title: string
    links: { label: string; href: string }[]
  }[]
  contact: { phone?: string; email?: string; address?: string }
  social: { platform: string; url: string; icon: string }[]
  legal: { label: string; href: string }[]
  copyright: string
  poweredBy?: string
}

// ═══════════════════════════════════════════
// SECTION 13: WORKING HOURS
// ═══════════════════════════════════════════

export interface WorkingHoursContent {
  title: string
  hours: { day: string; open: string | null; close: string | null }[]
  note?: string
  todayHighlight?: boolean
}

// ═══════════════════════════════════════════
// SECTION 14: WHATSAPP CTA
// ═══════════════════════════════════════════

export interface WhatsAppCTAContent {
  phone: string
  message: string
  label?: string
}

// ═══════════════════════════════════════════
// SECTION 15: COOKIE BANNER
// ═══════════════════════════════════════════

export interface CookieBannerContent {
  text: string
  acceptText: string
  rejectText?: string
  detailsText?: string
  detailsLink: string
}

// ═══════════════════════════════════════════
// SECTION 16: CTA (CALL TO ACTION)
// ═══════════════════════════════════════════

export interface CTAContent {
  badge?: string
  title: string
  subtitle?: string
  cta: { text: string; href: string; icon?: string }
  secondaryCta?: { text: string; href: string }
  backgroundImage?: string
}

// ═══════════════════════════════════════════
// SECTION 17: PRICING
// ═══════════════════════════════════════════

export interface PricingContent {
  badge?: string
  title: string
  subtitle?: string
  packages: {
    id: string
    name: string
    price: string
    period?: string
    description?: string
    features: string[]
    popular?: boolean
    cta: { text: string; href: string }
  }[]
}

// ═══════════════════════════════════════════
// SECTION 18: PROCESS STEPS
// ═══════════════════════════════════════════

export interface ProcessStepsContent {
  badge?: string
  title: string
  subtitle?: string
  steps: {
    number: number
    title: string
    description: string
    icon?: string
    image?: string
  }[]
}

// ═══════════════════════════════════════════
// SECTION 19: PHILOSOPHY
// ═══════════════════════════════════════════

export interface PhilosophyContent {
  quote: string
  author?: string
  backgroundImage?: string
}

// ═══════════════════════════════════════════
// SECTION 20: BRANDS / LOGOS
// ═══════════════════════════════════════════

export interface BrandsLogosContent {
  title?: string
  logos: { name: string; imageUrl: string }[]
}

// ═══════════════════════════════════════════
// SECTION 21: PROMOTIONS
// ═══════════════════════════════════════════

export interface PromotionsContent {
  title?: string
  promotions: {
    title: string
    description: string
    image?: string
    badge?: string
    validUntil?: string
    cta?: { text: string; href: string }
  }[]
}

// ═══════════════════════════════════════════
// SECTION 22: EMERGENCY BANNER
// ═══════════════════════════════════════════

export interface EmergencyBannerContent {
  title: string
  subtitle?: string
  phone: string
  icon?: string
}

// ═══════════════════════════════════════════
// SECTION 23: SOCIAL PROOF
// ═══════════════════════════════════════════

export interface SocialProofContent {
  title?: string
  items: {
    type: 'press' | 'award' | 'certification' | 'partner'
    title: string
    logo?: string
    year?: string
  }[]
}

// ═══════════════════════════════════════════
// SECTION 24: BLOG PREVIEW
// ═══════════════════════════════════════════

export interface BlogPreviewContent {
  badge?: string
  title: string
  subtitle?: string
  posts: {
    title: string
    excerpt: string
    image?: string
    date: string
    slug: string
    category?: string
  }[]
  ctaText?: string
  ctaHref?: string
}

// ═══════════════════════════════════════════
// SECTION 25: NEWSLETTER + INSTAGRAM FEED
// ═══════════════════════════════════════════

export interface NewsletterContent {
  title: string
  subtitle?: string
  placeholder: string
  submitText: string
  consentText: string
}

export interface InstagramFeedContent {
  title?: string
  username: string
  images: { url: string; alt: string; link: string }[]
  followText?: string
}
