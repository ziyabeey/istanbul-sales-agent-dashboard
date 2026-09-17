import { describe, expect, it } from 'vitest'
import {
  CoreCanaryWriteBlockedError,
  assertLegacyCommercialWriteAllowed,
  ayarlarPatchForEntitlementChanges,
  capabilitiesFromCoreEntitlements,
  coreCanaryTenants,
  isCoreCanaryTenant,
  legacyDurumForSubscriptionStatus,
  legacyPaketCapabilities,
  resolvePaidCapabilities,
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

  it('derives canary paid capabilities from Core entitlements only: a forged or stale paket opens nothing', () => {
    const NOW = new Date('2026-09-16T12:00:00Z')

    // Legacy tenants keep the package mapping.
    const legacy = resolvePaidCapabilities({ esnafId: 'esnaf-z', paket: 'PREMIUM', coreEntitlements: null, now: NOW, env: ENV })
    expect(legacy.source).toBe('legacy')
    expect([...legacy.capabilities].sort()).toEqual([...legacyPaketCapabilities('PREMIUM')].sort())
    expect(legacy.capabilities.has('custom_domain')).toBe(true)
    expect(legacy.capabilities.has('voice_assistant')).toBe(true)

    // Canary tenant, no Core evidence (the payment callback has none): nothing opens.
    const forged = resolvePaidCapabilities({ esnafId: 'esnaf-a', paket: 'PREMIUM', coreEntitlements: null, now: NOW, env: ENV })
    expect(forged).toMatchObject({ source: 'core', evidence: 'none' })
    expect([...forged.capabilities]).toEqual([])

    // Canary tenant with Core entitlements: only granted, unexpired keys map.
    const granted = resolvePaidCapabilities({
      esnafId: 'esnaf-a',
      paket: 'PREMIUM',
      coreEntitlements: [
        { entitlement_key: 'booking', granted: true, valid_until: '2027-01-01T00:00:00Z' },
        { entitlement_key: 'custom_domain', granted: false, valid_until: null },
        { entitlement_key: 'voice_assistant', granted: true, valid_until: '2026-01-01T00:00:00Z' },
        { entitlement_key: 'messaging_credits', granted: true, valid_until: null },
      ],
      now: NOW,
      env: ENV,
    })
    expect(granted).toMatchObject({ source: 'core', evidence: 'entitlements' })
    expect([...granted.capabilities]).toEqual(['booking'])
    expect(granted.capabilities.has('custom_domain')).toBe(false)
    expect(granted.capabilities.has('voice_assistant')).toBe(false)

    expect([...capabilitiesFromCoreEntitlements([{ entitlement_key: 'UNKNOWN_KEY', granted: true }], NOW)]).toEqual([])
  })

  it('maps entitlement changes to the legacy ayarlar flags in both directions', () => {
    expect(ayarlarPatchForEntitlementChanges([
      { entitlement_key: 'ads_management', granted: true },
      { entitlement_key: 'custom_domain', granted: false },
      { entitlement_key: 'messaging_credits', granted: true },
    ])).toEqual({ reklamYonetimi: true, customDomain: false })
  })
})
