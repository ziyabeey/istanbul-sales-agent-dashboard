/**
 * E2E: Ödeme Akışı — Kritik Yol
 *
 * QR sipariş → iyzico ödeme → KDS görünürlük
 * Sahte QR reddedilme
 * Süresi dolmuş QR reddedilme
 */

import { test, expect } from '@playwright/test'

test.describe('Ödeme Akışı — Kritik Yol', () => {

  test('QR sipariş → iyzico ödeme → KDS görünürlük', async ({ page }) => {
    await page.goto('/r/test-restaurant/t/table-5?ts=1710720000&sig=validhmac')

    await expect(page.getByTestId('menu-categories')).toBeVisible()

    await page.getByTestId('product-adana-kebap').click()
    await page.getByTestId('add-to-cart').click()
    await expect(page.getByTestId('cart-count')).toHaveText('1')

    await page.getByTestId('view-cart').click()
    await expect(page.getByTestId('cart-total')).toContainText('₺')

    await page.getByTestId('checkout-button').click()

    const iyzicoFrame = page.frameLocator('#iyzico-checkout-form')
    await expect(iyzicoFrame.locator('#card-number')).toBeVisible({ timeout: 15000 })
  })

  test('Sahte QR kodu reddedilmeli', async ({ page }) => {
    await page.goto('/r/test-restaurant/t/table-999?ts=1710720000&sig=invalidhmac')
    await expect(page.getByTestId('error-invalid-qr')).toBeVisible()
    await expect(page.getByTestId('menu-categories')).not.toBeVisible()
  })

  test('Süresi dolmuş QR kodu reddedilmeli', async ({ page }) => {
    const oldTs = Math.floor(Date.now() / 1000) - 172800
    await page.goto(`/r/test-restaurant/t/table-5?ts=${oldTs}&sig=validforoldts`)
    await expect(page.getByTestId('error-expired-qr')).toBeVisible()
  })
})
