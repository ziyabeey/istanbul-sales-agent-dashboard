/**
 * SSG Smoke Test — Generates a sample esnaf site HTML file.
 * 
 * Run with: npx tsx packages/publish-engine/src/__tests__/smoke.ts
 * Output:   /tmp/kepenk-ssg-test.html
 */

import { writeFileSync } from 'fs'
import { ComponentType } from '@kepenk/site-schema'
import type { SiteManifest, PageDocument, MasterPageDocument, PageRef, ComponentNode } from '@kepenk/site-schema'
import { generatePageHtml } from '../generate'

// ── Sample Data: Ahmet Kasap (Butcher Shop) ──

const sampleMasterPage: MasterPageDocument = {
  contentHash: 'master-test-001',
  siteId: 'site-ahmet-kasap',
  header: {
    id: 'global-header',
    type: ComponentType.HEADER,
    layout: {
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      padding: { top: '16px', right: '24px', bottom: '16px', left: '24px' },
    },
    style: {
      backgroundColor: '#ffffff',
      boxShadow: '0 2px 8px rgba(0,0,0,0.08)',
    },
    children: [
      {
        id: 'header-logo-text',
        type: ComponentType.HEADING,
        data: { level: 'h3', text: '🥩 Ahmet Kasap' },
        style: { color: '#c84b31' },
        children: [],
        visibility: { desktop: true, tablet: true, mobile: true },
      },
      {
        id: 'header-cta',
        type: ComponentType.WHATSAPP_CTA,
        data: { text: 'WhatsApp ile Ara', variant: 'compact', phone: '905551234567' },
        children: [],
        visibility: { desktop: true, tablet: true, mobile: true },
      },
    ],
    visibility: { desktop: true, tablet: true, mobile: true },
  },
  footer: {
    id: 'global-footer',
    type: ComponentType.FOOTER,
    layout: {
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      padding: { top: '40px', right: '24px', bottom: '40px', left: '24px' },
    },
    style: {
      backgroundColor: '#1a1a2e',
      color: '#ffffff',
    },
    children: [
      {
        id: 'footer-text',
        type: ComponentType.TEXT,
        data: { text: '© 2026 Ahmet Kasap — Tüm hakları saklıdır.', alignment: 'center' },
        style: { color: '#ffffff', opacity: 0.7 },
        children: [],
        visibility: { desktop: true, tablet: true, mobile: true },
      },
    ],
    visibility: { desktop: true, tablet: true, mobile: true },
  },
  globalComponents: [],
  globalStyles: {
    cssVariables: {},
  },
}

const samplePageRoot: ComponentNode = {
  id: 'page-root',
  type: ComponentType.SECTION,
  layout: { display: 'flex', flexDirection: 'column' },
  children: [
    // Hero Section
    {
      id: 'sec-hero',
      type: ComponentType.HERO_BANNER,
      style: {
        backgroundImage: {
          url: 'https://images.unsplash.com/photo-1607623814075-e51df1bdc82f?w=1920',
          alt: 'Taze et ürünleri',
          width: 1920,
          height: 1080,
          format: 'webp',
        },
        backgroundSize: 'cover',
        backgroundPosition: 'center',
      },
      data: {
        title: 'Ahmet Kasap',
        subtitle: 'Halal, taze ve kaliteli et ürünleri — 1985\'ten beri güvenle',
        ctaText: 'Sipariş Ver',
        ctaLink: 'https://wa.me/905551234567',
        overlayColor: 'rgba(26, 26, 46, 0.55)',
      },
      children: [],
      visibility: { desktop: true, tablet: true, mobile: true },
    },

    // About Section
    {
      id: 'sec-about',
      type: ComponentType.SECTION,
      layout: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        padding: { top: '64px', right: '24px', bottom: '64px', left: '24px' },
      },
      style: { backgroundColor: '#f5f0e8' },
      children: [
        {
          id: 'about-heading',
          type: ComponentType.HEADING,
          data: { level: 'h2', text: 'Hakkımızda', alignment: 'center' },
          style: { color: '#1a1a2e' },
          children: [],
          visibility: { desktop: true, tablet: true, mobile: true },
        },
        {
          id: 'about-text',
          type: ComponentType.TEXT,
          data: {
            text: '1985 yılından bu yana İstanbul\'un en kaliteli kasaplarından biri olan Ahmet Kasap, günlük kesim taze et ve özel marineler ile hizmet vermektedir. Tüm ürünlerimiz helal sertifikalıdır.',
            alignment: 'center',
            size: 'lg',
          },
          layout: { maxWidth: { value: 700, unit: 'px' } },
          style: { color: '#6b7280' },
          children: [],
          visibility: { desktop: true, tablet: true, mobile: true },
        },
      ],
      visibility: { desktop: true, tablet: true, mobile: true },
    },

    // Price Table Section
    {
      id: 'sec-prices',
      type: ComponentType.SECTION,
      layout: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        padding: { top: '64px', right: '24px', bottom: '64px', left: '24px' },
      },
      style: { backgroundColor: '#ffffff' },
      children: [
        {
          id: 'prices-heading',
          type: ComponentType.HEADING,
          data: { level: 'h2', text: 'Fiyat Listemiz', alignment: 'center' },
          children: [],
          visibility: { desktop: true, tablet: true, mobile: true },
        },
        {
          id: 'prices-spacer',
          type: ComponentType.SPACER,
          data: { height: '24px' },
          children: [],
          visibility: { desktop: true, tablet: true, mobile: true },
        },
        {
          id: 'prices-table',
          type: ComponentType.PRICE_TABLE,
          layout: { maxWidth: { value: 600, unit: 'px' } },
          data: {
            categories: [
              {
                name: 'Dana Et',
                items: [
                  { name: 'Dana Kıyma', price: '₺320/kg' },
                  { name: 'Dana Kuşbaşı', price: '₺380/kg' },
                  { name: 'Dana Biftek', price: '₺450/kg' },
                  { name: 'Dana Pirzola', price: '₺420/kg' },
                ],
              },
              {
                name: 'Kuzu Et',
                items: [
                  { name: 'Kuzu Kuşbaşı', price: '₺400/kg' },
                  { name: 'Kuzu Pirzola', price: '₺500/kg' },
                  { name: 'Kuzu Kaburga', price: '₺350/kg' },
                ],
              },
              {
                name: 'Tavuk',
                items: [
                  { name: 'Tavuk Göğsü', price: '₺150/kg' },
                  { name: 'Tavuk But', price: '₺120/kg' },
                  { name: 'Bütün Tavuk', price: '₺140/kg' },
                ],
              },
            ],
          },
          children: [],
          visibility: { desktop: true, tablet: true, mobile: true },
        },
      ],
      visibility: { desktop: true, tablet: true, mobile: true },
    },

    // Contact Section  
    {
      id: 'sec-contact',
      type: ComponentType.SECTION,
      layout: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        padding: { top: '64px', right: '24px', bottom: '64px', left: '24px' },
      },
      style: { backgroundColor: '#f5f0e8' },
      children: [
        {
          id: 'contact-heading',
          type: ComponentType.HEADING,
          data: { level: 'h2', text: 'İletişim', alignment: 'center' },
          children: [],
          visibility: { desktop: true, tablet: true, mobile: true },
        },
        {
          id: 'contact-spacer',
          type: ComponentType.SPACER,
          data: { height: '24px' },
          children: [],
          visibility: { desktop: true, tablet: true, mobile: true },
        },
        {
          id: 'contact-form',
          type: ComponentType.CONTACT_FORM,
          data: { buttonText: 'Mesaj Gönder', showEmail: true },
          children: [],
          visibility: { desktop: true, tablet: true, mobile: true },
        },
        {
          id: 'contact-spacer-2',
          type: ComponentType.SPACER,
          data: { height: '32px' },
          children: [],
          visibility: { desktop: true, tablet: true, mobile: true },
        },
        {
          id: 'contact-hours',
          type: ComponentType.WORKING_HOURS,
          data: {
            hours: [
              { day: 'Monday', opens: '08:00', closes: '20:00' },
              { day: 'Tuesday', opens: '08:00', closes: '20:00' },
              { day: 'Wednesday', opens: '08:00', closes: '20:00' },
              { day: 'Thursday', opens: '08:00', closes: '20:00' },
              { day: 'Friday', opens: '08:00', closes: '20:00' },
              { day: 'Saturday', opens: '08:00', closes: '18:00' },
              { day: 'Sunday', opens: '00:00', closes: '00:00', isClosed: true },
            ],
          },
          layout: { maxWidth: { value: 400, unit: 'px' } },
          children: [],
          visibility: { desktop: true, tablet: true, mobile: true },
        },
        {
          id: 'contact-spacer-3',
          type: ComponentType.SPACER,
          data: { height: '32px' },
          children: [],
          visibility: { desktop: true, tablet: true, mobile: true },
        },
        {
          id: 'contact-map',
          type: ComponentType.GOOGLE_MAP,
          data: { address: 'Kadıköy, İstanbul' },
          layout: { maxWidth: { value: 800, unit: 'px' } },
          children: [],
          visibility: { desktop: true, tablet: true, mobile: true },
        },
        {
          id: 'contact-wa',
          type: ComponentType.WHATSAPP_CTA,
          data: {
            text: 'WhatsApp ile Sipariş Ver',
            variant: 'full',
            phone: '905551234567',
            message: 'Merhaba, sipariş vermek istiyorum.',
          },
          children: [],
          visibility: { desktop: true, tablet: true, mobile: true },
        },
      ],
      visibility: { desktop: true, tablet: true, mobile: true },
    },
  ],
  visibility: { desktop: true, tablet: true, mobile: true },
}

const samplePage: PageDocument = {
  contentHash: 'page-test-001',
  pageId: 'home',
  siteId: 'site-ahmet-kasap',
  root: samplePageRoot,
  meta: {
    title: 'Ana Sayfa',
    slug: '',
    description: 'Ahmet Kasap — İstanbul\'un en kaliteli kasabı. Günlük kesim taze et ve özel marineler.',
  },
}

const samplePageRef: PageRef = {
  pageId: 'home',
  contentHash: 'page-test-001',
  slug: '',
  title: 'Ana Sayfa',
  isHomePage: true,
  isDynamic: false,
}

const sampleManifest: SiteManifest = {
  manifestId: 'manifest-test-001',
  siteId: 'site-ahmet-kasap',
  esnafId: 'esnaf-ahmet',
  version: 1,
  publishedVersion: -1,
  createdAt: '2026-03-15T08:00:00Z',
  updatedAt: '2026-03-15T08:00:00Z',
  pages: [samplePageRef],
  masterPage: 'master-test-001',
  siteConfig: {
    domain: 'ahmet-kasap.kepenk.site',
    locale: 'tr-TR',
    timezone: 'Europe/Istanbul',
    sectorId: 'kasap',
    businessName: 'Ahmet Kasap',
    businessSlogan: 'Günlük kesim, güvenilir kalite',
    brandColors: {
      primary: '#1a1a2e',
      secondary: '#6b7280',
      accent: '#c84b31',
      background: '#f5f0e8',
      text: '#1a1a2e',
    },
    fonts: {
      heading: 'Syne',
      body: 'Lora',
    },
    socialLinks: {
      instagram: 'https://instagram.com/ahmetkasap',
    },
    contactInfo: {
      phone: '+90 555 123 4567',
      whatsapp: '905551234567',
      email: 'info@ahmetkasap.com',
      address: 'Kadıköy, İstanbul',
      coordinates: { lat: 40.9903, lng: 29.0295 },
      workingHours: [
        { day: 'Monday', opens: '08:00', closes: '20:00', isClosed: false },
        { day: 'Tuesday', opens: '08:00', closes: '20:00', isClosed: false },
        { day: 'Wednesday', opens: '08:00', closes: '20:00', isClosed: false },
        { day: 'Thursday', opens: '08:00', closes: '20:00', isClosed: false },
        { day: 'Friday', opens: '08:00', closes: '20:00', isClosed: false },
        { day: 'Saturday', opens: '08:00', closes: '18:00', isClosed: false },
        { day: 'Sunday', opens: '00:00', closes: '00:00', isClosed: true },
      ],
    },
  },
  seo: {
    titleTemplate: '{pageName} | {businessName}',
    defaultDescription: 'Ahmet Kasap — İstanbul\'un en kaliteli kasabı. Günlük kesim taze et.',
    robots: 'index, follow',
    canonical: 'https://ahmet-kasap.kepenk.site',
    structuredData: {},
  },
  redirects: [],
  navigation: [
    { pageId: 'home', label: 'Ana Sayfa', children: [], isVisible: true, openInNewTab: false },
  ],
}

// ── Generate ──

console.log('🔨 Generating HTML for Ahmet Kasap sample site...')

const html = generatePageHtml({
  manifest: sampleManifest,
  page: samplePage,
  pageRef: samplePageRef,
  masterPage: sampleMasterPage,
})

const outputPath = '/tmp/kepenk-ssg-test.html'
writeFileSync(outputPath, html, 'utf-8')

console.log(`✅ HTML generated successfully!`)
console.log(`📄 Output: ${outputPath}`)
console.log(`📏 Size: ${(html.length / 1024).toFixed(1)} KB`)

// ── Basic Assertions ──

const checks = [
  { label: 'Has <!DOCTYPE html>', pass: html.includes('<!DOCTYPE html>') },
  { label: 'Has <title> tag', pass: html.includes('<title>') },
  { label: 'Has JSON-LD', pass: html.includes('application/ld+json') },
  { label: 'Has LocalBusiness schema', pass: html.includes('LocalBusiness') },
  { label: 'Has business name', pass: html.includes('Ahmet Kasap') },
  { label: 'Has WhatsApp link', pass: html.includes('wa.me') },
  { label: 'Has Google Fonts', pass: html.includes('fonts.googleapis.com') },
  { label: 'Has CSS variables', pass: html.includes('--color-accent') },
  { label: 'Has price table', pass: html.includes('Dana Kıyma') },
  { label: 'Has contact form', pass: html.includes('Mesaj Gönder') },
  { label: 'Has working hours', pass: html.includes('Pazartesi') },
  { label: 'Has Google Map', pass: html.includes('maps.google.com') },
  { label: 'Has footer', pass: html.includes('Tüm hakları saklıdır') },
  { label: 'Has canonical', pass: html.includes('rel="canonical"') },
  { label: 'Has OG tags', pass: html.includes('og:title') },
  { label: 'Has robots meta', pass: html.includes('name="robots"') },
  { label: 'Has viewport meta', pass: html.includes('viewport') },
]

console.log('\n📋 Validation checks:')
let allPassed = true
for (const check of checks) {
  const icon = check.pass ? '✅' : '❌'
  console.log(`  ${icon} ${check.label}`)
  if (!check.pass) allPassed = false
}

console.log(allPassed ? '\n🎉 All checks passed!' : '\n⚠️  Some checks failed!')
process.exit(allPassed ? 0 : 1)
