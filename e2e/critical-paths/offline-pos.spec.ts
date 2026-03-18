/**
 * E2E: Offline POS — İnternet Kesilmesi
 *
 * Dexie.js offline sipariş → reconnect → Firestore sync
 */

import { test, expect } from '@playwright/test'

test.describe('Offline POS — İnternet Kesilmesi', () => {

  test('Offline sipariş oluştur → online gel → sync', async ({ page, context }) => {
    await page.goto('/restaurant/pos')
    await expect(page.getByTestId('pos-ready')).toBeVisible()

    await context.setOffline(true)
    await expect(page.getByTestId('offline-badge')).toBeVisible()

    await page.getByTestId('product-lahmacun').click()
    await page.getByTestId('product-ayran').click()
    await page.getByTestId('create-order').click()

    await expect(page.getByTestId('order-created-offline')).toBeVisible()
    await expect(page.getByTestId('pending-sync-count')).toHaveText('1')

    await context.setOffline(false)

    await expect(page.getByTestId('pending-sync-count')).toHaveText('0', { timeout: 15000 })
    await expect(page.getByTestId('sync-status')).toHaveText('Senkronize')
  })

  test('Çoklu offline sipariş → reconnect → hepsi sync olmalı', async ({ page, context }) => {
    await page.goto('/restaurant/pos')
    await context.setOffline(true)

    for (let i = 0; i < 5; i++) {
      await page.getByTestId('product-lahmacun').click()
      await page.getByTestId('create-order').click()
      await page.getByTestId('new-order-button').click()
    }

    await expect(page.getByTestId('pending-sync-count')).toHaveText('5')

    await context.setOffline(false)

    await expect(page.getByTestId('pending-sync-count')).toHaveText('0', { timeout: 30000 })
  })
})
