import { describe, expect, it } from 'vitest'
import {
  CoreCanaryWriteBlockedError,
  assertLegacyCommercialWriteAllowed,
  coreCanaryTenants,
  isCoreCanaryTenant,
  legacyDurumForSubscriptionStatus,
  stripLegacyCommercialFields,
} from '@/lib/core/canary'

const ENV = { CORE_CANARY_TENANTS: 'esnaf-a, esnaf-b;esnaf-c\nesnaf-d' }

describe('canary cutover gate', () => {
  it('parses the tenant list and identifies canary tenants', () => {
    expect([...coreCanaryTenants(ENV)]).toEqual(['esnaf-a', 'esnaf-b', 'esnaf-c', 'esnaf-d'])
    expect(isCoreCanaryTenant('esnaf-a', ENV)).toBe(true)
    expect(isCoreCanaryTenant('esnaf-z', ENV)).toBe(false)
    expect(isCoreCanaryTenant('', ENV)).toBe(false)
    expect(isCoreCanaryTenant('esnaf-a', {})).toBe(false)
  })

  it('blocks Core-owned fields for canary tenants only, and rollback is removing the tenant from the list', () => {
    expect(() => assertLegacyCommercialWriteAllowed('esnaf-a', { paket: 'PREMIUM', notlar: 'x' }, ENV)).toThrow(CoreCanaryWriteBlockedError)
    expect(() => assertLegacyCommercialWriteAllowed('esnaf-a', ['durum'], ENV)).toThrow(/durum/)
    expect(() => assertLegacyCommercialWriteAllowed('esnaf-a', { notlar: 'x' }, ENV)).not.toThrow()
    expect(() => assertLegacyCommercialWriteAllowed('esnaf-z', { paket: 'PREMIUM' }, ENV)).not.toThrow()
    expect(() => assertLegacyCommercialWriteAllowed('esnaf-a', { paket: 'PREMIUM' }, { CORE_CANARY_TENANTS: 'esnaf-b' })).not.toThrow()
  })

  it('strips Core-owned fields from legacy scenario writes for canary tenants and passes others through', () => {
    const patch = { durum: 'aktif', paket: 'BUYUME', odemeId: 'pay-1', aktifModuller: ['x'] }
    expect(stripLegacyCommercialFields('esnaf-a', patch, ENV)).toEqual({ patch: { odemeId: 'pay-1' }, blocked: ['durum', 'paket', 'aktifModuller'] })
    expect(stripLegacyCommercialFields('esnaf-z', patch, ENV)).toEqual({ patch, blocked: [] })
  })

  it('maps Core subscription status to the legacy durum projection', () => {
    expect(legacyDurumForSubscriptionStatus('trial')).toBe('aktif')
    expect(legacyDurumForSubscriptionStatus('active')).toBe('aktif')
    expect(legacyDurumForSubscriptionStatus('past_due')).toBe('riskli')
    expect(legacyDurumForSubscriptionStatus('cancelled')).toBe('pasif')
  })
})
