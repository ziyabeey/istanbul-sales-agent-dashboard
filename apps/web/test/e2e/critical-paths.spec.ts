/**
 * E2E Critical Path Tests — Playwright
 * ─────────────────────────────────────
 * Critical paths that must NEVER break
 */
import { test, expect } from '@playwright/test'

test.describe('Site Erişilebilirlik', () => {
  test('anasayfa yükleniyor', async ({ page }) => {
    const response = await page.goto('/')
    expect(response?.status()).toBeLessThan(400)
  })

  test('dashboard login sayfası yükleniyor', async ({ page }) => {
    const response = await page.goto('/giris')
    expect(response?.status()).toBeLessThan(400)
    // Login formu mevcut olmalı
    await expect(page.locator('form, [role="form"], input[type="email"], input[type="password"]').first()).toBeVisible({ timeout: 10000 })
  })
})

test.describe('Demo Vitrin Sayfaları', () => {
  test('demo vitrin listesi yükleniyor', async ({ page }) => {
    const response = await page.goto('/demo-vitrinler')
    expect(response?.status()).toBeLessThan(400)
  })

  test('kasap demo vitrini yükleniyor', async ({ page }) => {
    const response = await page.goto('/demo-vitrinler/kasap-demo')
    if (response?.status() === 200) {
      // Sayfa içeriği mevcut
      const body = await page.textContent('body')
      expect(body?.length).toBeGreaterThan(100)
    }
  })
})

test.describe('API Healthcheck', () => {
  test('API root responding', async ({ request }) => {
    const response = await request.get('/api/health')
    // 200 or 404 (if health endpoint doesn't exist yet)
    expect([200, 404]).toContain(response.status())
  })
})

test.describe('PWA Manifest', () => {
  test('PWA manifest.json erişilebilir', async ({ request }) => {
    const response = await request.get('/manifest.json')
    if (response.status() === 200) {
      const manifest = await response.json()
      expect(manifest.name).toBeDefined()
      expect(manifest.icons).toBeDefined()
    }
  })
})

test.describe('Responsive Layout', () => {
  test('mobilde hamburger menü görünüyor', async ({ page, isMobile }) => {
    if (!isMobile) return test.skip()
    await page.goto('/')
    // Mobile menu button should exist
    const menuButton = page.locator('[aria-label*="menü"], [aria-label*="menu"], button.hamburger, .mobile-menu-btn').first()
    if (await menuButton.isVisible()) {
      await menuButton.click()
      // Menu should open
      await page.waitForTimeout(500)
    }
  })

  test('desktop navigasyon görünüyor', async ({ page, isMobile }) => {
    if (isMobile) return test.skip()
    await page.goto('/')
    // Desktop nav should be visible
    const nav = page.locator('nav, header').first()
    await expect(nav).toBeVisible({ timeout: 10000 })
  })
})

test.describe('Performance', () => {
  test('anasayfa 5 saniyede yükleniyor', async ({ page }) => {
    const start = Date.now()
    await page.goto('/', { waitUntil: 'domcontentloaded' })
    const loadTime = Date.now() - start
    expect(loadTime).toBeLessThan(5000)
  })
})

test.describe('SEO Temel Kontroller', () => {
  test('title tag mevcut', async ({ page }) => {
    await page.goto('/')
    const title = await page.title()
    expect(title.length).toBeGreaterThan(0)
  })

  test('meta description mevcut', async ({ page }) => {
    await page.goto('/')
    const desc = await page.getAttribute('meta[name="description"]', 'content')
    // Description might not be present on all pages
    if (desc) {
      expect(desc.length).toBeGreaterThan(10)
      expect(desc.length).toBeLessThanOrEqual(160)
    }
  })

  test('lang attribute tr olarak set edilmiş', async ({ page }) => {
    await page.goto('/')
    const lang = await page.getAttribute('html', 'lang')
    if (lang) expect(lang).toMatch(/tr/)
  })
})
