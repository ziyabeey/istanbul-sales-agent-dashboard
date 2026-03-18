/**
 * @kepenk/site-schema — Site Manifest Schema
 * Atomic state pointer: the single source of truth for a site's current state.
 */

import { z } from 'zod'
import { MediaRefSchema } from './component'
import { PageRefSchema } from './page'
import type { MediaRef } from './component'
import type { PageRef } from './page'

// ── Working Hours ──

export const WorkingHoursSchema = z.object({
  day: z.enum([
    'Monday', 'Tuesday', 'Wednesday', 'Thursday',
    'Friday', 'Saturday', 'Sunday',
  ]),
  opens: z.string(),  // "09:00"
  closes: z.string(), // "18:00"
  isClosed: z.boolean().default(false),
})
export type WorkingHours = z.infer<typeof WorkingHoursSchema>

// ── Brand Colors ──

export const BrandColorsSchema = z.object({
  primary: z.string(),
  secondary: z.string(),
  accent: z.string(),
  background: z.string(),
  text: z.string(),
})
export type BrandColors = z.infer<typeof BrandColorsSchema>

// ── Contact Info ──

export const ContactInfoSchema = z.object({
  phone: z.string(),
  whatsapp: z.string().optional(),
  email: z.string().optional(),
  address: z.string(),
  coordinates: z.object({
    lat: z.number(),
    lng: z.number(),
  }).optional(),
  workingHours: z.array(WorkingHoursSchema).default([]),
})
export type ContactInfo = z.infer<typeof ContactInfoSchema>

// ── Site Config ──

export const SiteConfigSchema = z.object({
  domain: z.string(),                  // e.g., "ahmet-kasap.kepenk.site"
  customDomain: z.string().optional(), // e.g., "ahmetkasap.com"
  locale: z.literal('tr-TR').default('tr-TR'),
  timezone: z.literal('Europe/Istanbul').default('Europe/Istanbul'),
  sectorId: z.string(),               // kasap, berber, eczane, etc.
  businessName: z.string(),
  businessSlogan: z.string().optional(),
  brandColors: BrandColorsSchema,
  fonts: z.object({
    heading: z.string(),
    body: z.string(),
  }),
  logo: MediaRefSchema.optional(),
  favicon: MediaRefSchema.optional(),
  socialLinks: z.record(z.string(), z.string()).default({}),
  contactInfo: ContactInfoSchema,
})
export type SiteConfig = z.infer<typeof SiteConfigSchema>

// ── SEO Defaults ──

export const SiteSEOSchema = z.object({
  titleTemplate: z.string().default('{pageName} | {businessName}'),
  defaultDescription: z.string().default(''),
  ogImage: MediaRefSchema.optional(),
  robots: z.string().default('index, follow'),
  canonical: z.string().default(''),
  structuredData: z.record(z.string(), z.any()).default({}),
})
export type SiteSEO = z.infer<typeof SiteSEOSchema>

// ── Redirect Rule ──

export const RedirectRuleSchema = z.object({
  from: z.string(),
  to: z.string(),
  type: z.union([z.literal(301), z.literal(302)]),
  createdAt: z.string(),
})
export type RedirectRule = z.infer<typeof RedirectRuleSchema>

// ── Navigation Item (recursive) ──

export const NavItemSchema: z.ZodType<NavItem, z.ZodTypeDef, any> = z.lazy(() =>
  z.object({
    pageId: z.string(),
    label: z.string(),
    children: z.array(NavItemSchema).default([]),
    isVisible: z.boolean().default(true),
    openInNewTab: z.boolean().default(false),
    externalUrl: z.string().optional(),
  })
)

export interface NavItem {
  pageId: string
  label: string
  children: NavItem[]
  isVisible: boolean
  openInNewTab: boolean
  externalUrl?: string
}

// ── Site Manifest ──

export const SiteManifestSchema = z.object({
  manifestId: z.string(),
  siteId: z.string(),
  esnafId: z.string(),
  version: z.number().int().min(0),
  publishedVersion: z.number().int().default(-1),
  createdAt: z.string(),
  updatedAt: z.string(),

  // Page references (content-hash pointers)
  pages: z.array(PageRefSchema),
  masterPage: z.string(), // content-hash of master page JSON

  // Site-level config
  siteConfig: SiteConfigSchema,

  // SEO defaults
  seo: SiteSEOSchema,

  // Redirect rules
  redirects: z.array(RedirectRuleSchema).default([]),

  // Navigation menu structure
  navigation: z.array(NavItemSchema).default([]),
})

export interface SiteManifest {
  manifestId: string
  siteId: string
  esnafId: string
  version: number
  publishedVersion: number
  createdAt: string
  updatedAt: string
  pages: PageRef[]
  masterPage: string
  siteConfig: SiteConfig
  seo: SiteSEO
  redirects: RedirectRule[]
  navigation: NavItem[]
}
