/**
 * UTM Builder + Attribution System
 * ──────────────────────────────────
 * Auto-tags campaign links, parses incoming UTMs, 
 * and attributes conversions.
 */

/* ═══════ Auto UTM Templates ═══════ */

const AUTO_UTM_TEMPLATES: Record<string, Record<string, string>> = {
  whatsapp: { utm_source: 'whatsapp', utm_medium: 'message' },
  sms: { utm_source: 'sms', utm_medium: 'text' },
  email: { utm_source: 'email', utm_medium: 'newsletter' },
  push: { utm_source: 'push', utm_medium: 'notification' },
  instagram: { utm_source: 'instagram', utm_medium: 'social' },
  facebook: { utm_source: 'facebook', utm_medium: 'social' },
  tiktok: { utm_source: 'tiktok', utm_medium: 'social' },
  gbp: { utm_source: 'google_business', utm_medium: 'maps' },
}

/* ═══════ UTM Builder ═══════ */

export interface UTMParams {
  source: string
  medium: string
  campaign: string
  term?: string
  content?: string
}

export function buildUTMUrl(baseUrl: string, utmParams: UTMParams): string {
  const url = new URL(baseUrl)
  url.searchParams.set('utm_source', utmParams.source)
  url.searchParams.set('utm_medium', utmParams.medium)
  url.searchParams.set('utm_campaign', utmParams.campaign)
  if (utmParams.term) url.searchParams.set('utm_term', utmParams.term)
  if (utmParams.content) url.searchParams.set('utm_content', utmParams.content)
  return url.toString()
}

export function autoTagCampaignUrl(
  baseUrl: string,
  channel: string,
  campaignId: string,
  variant?: string
): string {
  const template = AUTO_UTM_TEMPLATES[channel] || { utm_source: channel, utm_medium: 'other' }
  
  return buildUTMUrl(baseUrl, {
    source: template.utm_source,
    medium: template.utm_medium,
    campaign: campaignId,
    content: variant,
  })
}

/* ═══════ UTM Parser ═══════ */

export interface ParsedUTM {
  source?: string
  medium?: string
  campaign?: string
  term?: string
  content?: string
  gclid?: string    // Google auto-tag
  fbclid?: string   // Meta auto-tag
}

export function parseUTMFromUrl(url: string): ParsedUTM {
  try {
    const parsed = new URL(url)
    return {
      source: parsed.searchParams.get('utm_source') || undefined,
      medium: parsed.searchParams.get('utm_medium') || undefined,
      campaign: parsed.searchParams.get('utm_campaign') || undefined,
      term: parsed.searchParams.get('utm_term') || undefined,
      content: parsed.searchParams.get('utm_content') || undefined,
      gclid: parsed.searchParams.get('gclid') || undefined,
      fbclid: parsed.searchParams.get('fbclid') || undefined,
    }
  } catch {
    return {}
  }
}

/* ═══════ Attribution ═══════ */

export const CONVERSION_TYPES = [
  'purchase', 'booking', 'form_submit', 
  'phone_call', 'whatsapp_click', 'directions_click',
] as const

export type ConversionType = typeof CONVERSION_TYPES[number]

export interface Attribution {
  conversionType: ConversionType
  utm: ParsedUTM
  timestamp: string
  value?: number
  contactId?: string
  orderId?: string
}

export function determineSource(utm: ParsedUTM): string {
  if (utm.gclid) return 'google_ads'
  if (utm.fbclid) return 'meta_ads'
  if (utm.source) return utm.source
  return 'direct'
}

export function attributeConversion(
  conversion: { type: ConversionType; value?: number; contactId?: string; orderId?: string },
  referrerUrl?: string,
  landingUrl?: string
): Attribution {
  const utm = landingUrl ? parseUTMFromUrl(landingUrl) : {}
  
  return {
    conversionType: conversion.type,
    utm,
    timestamp: new Date().toISOString(),
    value: conversion.value,
    contactId: conversion.contactId,
    orderId: conversion.orderId,
  }
}

/* ═══════ Attribution Window ═══════ */

export const ATTRIBUTION_WINDOW_DAYS = 30
