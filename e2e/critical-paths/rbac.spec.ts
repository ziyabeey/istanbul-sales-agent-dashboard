/**
 * E2E: RBAC — Yetki Kontrolü
 *
 * Viewer cannot edit products
 * Editor cannot access payment settings
 */

import { test, expect, type Page } from '@playwright/test'

async function loginAs(page: Page, email: string) {
  await page.goto('/auth/login')
  await page.fill('[data-testid="email-input"]', email)
  await page.fill('[data-testid="password-input"]', 'test-password')
  await page.click('[data-testid="login-button"]')
  await page.waitForURL(/\/dashboard/)
}

test.describe('RBAC — Yetki Kontrolü', () => {

  test('Viewer kullanıcı ürün düzenleyemez', async ({ page }) => {
    await loginAs(page, 'viewer@test.com')

    await page.goto('/products')
    await expect(page.getByTestId('edit-product-btn')).not.toBeVisible()

    // Direct URL access should redirect
    await page.goto('/products/prod-123/edit')
    await expect(page).toHaveURL(/\/products/)
    await expect(page.getByTestId('unauthorized-message')).toBeVisible()
  })

  test('Editor kullanıcı ödeme ayarlarına erişemez', async ({ page }) => {
    await loginAs(page, 'editor@test.com')
    await page.goto('/settings/payment')
    await expect(page.getByTestId('unauthorized-message')).toBeVisible()
  })

  test('Viewer kullanıcı üye silemez', async ({ page }) => {
    await loginAs(page, 'viewer@test.com')
    await page.goto('/settings/team')
    await expect(page.getByTestId('delete-member-btn')).not.toBeVisible()
  })

  test('Owner tüm alanlara erişebilir', async ({ page }) => {
    await loginAs(page, 'owner@test.com')
    await page.goto('/settings/payment')
    await expect(page.getByTestId('payment-settings-form')).toBeVisible()
  })
})
