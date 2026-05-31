import { afterEach, beforeEach, describe, expect, it } from 'vitest'
import { isMvpDashboardPathAllowed, isMvpTestReleaseEnabled } from '@/lib/mvpFeatureFlags'

describe('mvpFeatureFlags', () => {
  let originalMvpTestRelease: string | undefined

  beforeEach(() => {
    originalMvpTestRelease = process.env.NEXT_PUBLIC_KEPENK_MVP_TEST_RELEASE
  })

  afterEach(() => {
    if (originalMvpTestRelease === undefined) {
      delete process.env.NEXT_PUBLIC_KEPENK_MVP_TEST_RELEASE
    } else {
      process.env.NEXT_PUBLIC_KEPENK_MVP_TEST_RELEASE = originalMvpTestRelease
    }
  })

  it('detects MVP test release mode from env', () => {
    process.env.NEXT_PUBLIC_KEPENK_MVP_TEST_RELEASE = 'true'
    expect(isMvpTestReleaseEnabled()).toBe(true)

    process.env.NEXT_PUBLIC_KEPENK_MVP_TEST_RELEASE = 'false'
    expect(isMvpTestReleaseEnabled()).toBe(false)
  })

  it('allows only MVP dashboard paths', () => {
    expect(isMvpDashboardPathAllowed('/dashboard')).toBe(true)
    expect(isMvpDashboardPathAllowed('/dashboard/konusmalar')).toBe(true)
    expect(isMvpDashboardPathAllowed('/dashboard/musteriler')).toBe(true)
    expect(isMvpDashboardPathAllowed('/dashboard/randevular')).toBe(true)
    expect(isMvpDashboardPathAllowed('/dashboard/sitem')).toBe(true)
  })

  it('blocks non-MVP dashboard paths', () => {
    expect(isMvpDashboardPathAllowed('/dashboard/ajanlar')).toBe(false)
    expect(isMvpDashboardPathAllowed('/dashboard/raporlar')).toBe(false)
    expect(isMvpDashboardPathAllowed('/dashboard/icerik')).toBe(false)
    expect(isMvpDashboardPathAllowed('/dashboard/sitem/editor')).toBe(false)
    expect(isMvpDashboardPathAllowed('/dashboard/manage')).toBe(false)
    expect(isMvpDashboardPathAllowed('/dashboard/manage/foo')).toBe(false)
    expect(isMvpDashboardPathAllowed('/dashboard/restoran')).toBe(false)
    expect(isMvpDashboardPathAllowed('/dashboard/restoran/masalar')).toBe(false)
  })
})
