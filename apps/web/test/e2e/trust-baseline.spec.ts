import { test, expect } from '@playwright/test'

const LOGIN_VIEWPORTS = [
  { name: 'desktop-1440', width: 1440, height: 900 },
  { name: 'mobile-390', width: 390, height: 844 },
  { name: 'mobile-360', width: 360, height: 800 },
] as const

for (const viewport of LOGIN_VIEWPORTS) {
  test(`P0-00 /giris preserved UX baseline @ ${viewport.name}`, async ({ page }) => {
    await page.setViewportSize({ width: viewport.width, height: viewport.height })

    const response = await page.goto('/giris', { waitUntil: 'domcontentloaded' })
    expect(response?.status()).toBeLessThan(400)

    await expect(page.getByText('KPNK', { exact: true })).toBeVisible()
    await expect(page.getByText('Paneline giriş yap', { exact: true })).toBeVisible()
    await expect(page.locator('input[type="tel"]')).toBeVisible()
    await expect(page.getByRole('button', { name: /SMS Kodu Gönder/ })).toBeVisible()
    await expect(page.getByRole('link', { name: /Hemen başla/ })).toBeVisible()

    const overflow = await page.evaluate(() => ({
      scrollWidth: document.documentElement.scrollWidth,
      clientWidth: document.documentElement.clientWidth,
    }))
    expect(overflow.scrollWidth).toBeLessThanOrEqual(overflow.clientWidth + 1)
  })
}

test('P0-00 unauthenticated dashboard redirects to preserved login surface', async ({ page }) => {
  await page.context().clearCookies()
  await page.goto('/dashboard/manage', { waitUntil: 'domcontentloaded' })

  await expect(page).toHaveURL(/\/giris\?callbackUrl=%2Fdashboard%2Fmanage|\/giris\?callbackUrl=\/dashboard\/manage/)
  await expect(page.getByText('Paneline giriş yap', { exact: true })).toBeVisible()
})

test('P0-00 unauthenticated admin surface redirects to admin login', async ({ page }) => {
  await page.context().clearCookies()
  await page.goto('/admin', { waitUntil: 'domcontentloaded' })
  await expect(page).toHaveURL(/\/admin\/login/)
})
