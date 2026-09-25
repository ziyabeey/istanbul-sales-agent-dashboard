import { describe, expect, it, vi } from 'vitest'
import { CorePlatformClient, type CoreMembershipLabel } from '@/lib/core/coreClient'
import { readCoreEntrySnapshot } from '@/lib/core/entrySnapshot'
import type { CoreRequestContext } from '@/lib/core/requestContext'
import { isCoreEntryEnabled, isCoreEntryPage, isCoreEntryRoute } from '@/lib/core/entryGate'
import { CoreEntrySnapshotSchema } from '@/lib/core/entryTypes'

const USER = '11000000-0000-4000-8000-000000000001'
const BIZ = '5b000000-0000-4000-8000-000000000001'
const MEMBER = '6b000000-0000-4000-8000-000000000001'
const row: CoreMembershipLabel = { id: MEMBER, business_id: BIZ, active: true, role: 'owner', businesses: { id: BIZ, name: 'İstanbul Atölye', slug: 'istanbul-atolye' } }
const context = {
  userId: USER, accessToken: 'server-only-fixture', recovery: false, businessId: BIZ,
  memberships: [{ id: MEMBER, business_id: BIZ, active: true, role: 'owner' }],
} as CoreRequestContext

describe('Core entry rollout and display contract', () => {
  it('requires both server flags explicitly enabled', () => {
    for (const env of [{}, { CORE_ENTRY_ENABLED: 'true' }, { CORE_BFF_ENABLED: 'true' }, { CORE_ENTRY_ENABLED: '1', CORE_BFF_ENABLED: 'true' }]) {
      expect(isCoreEntryEnabled(env)).toBe(false)
    }
    expect(isCoreEntryEnabled({ CORE_ENTRY_ENABLED: 'true', CORE_BFF_ENABLED: 'true' })).toBe(true)
  })
  it('reserves only the entry pages and existing Core auth namespace, not the legacy dashboard', () => {
    expect(isCoreEntryPage('/baslangic/')).toBe(true)
    expect(isCoreEntryPage('/giris')).toBe(true)
    expect(isCoreEntryPage('/parola-yenile')).toBe(true)
    expect(isCoreEntryRoute('/api/core/auth/me')).toBe(true)
    expect(isCoreEntryRoute('/dashboard/manage')).toBe(false)
    expect(isCoreEntryRoute('/giris-eski')).toBe(false)
    expect(isCoreEntryRoute('/api/core/authz/test')).toBe(false)
  })
  it('serializes only the verified display fields', async () => {
    const client = { listMembershipLabels: vi.fn(async () => [row]) }
    const snapshot = await readCoreEntrySnapshot(context, client)
    expect(client.listMembershipLabels).toHaveBeenCalledWith(context.accessToken, USER)
    expect(snapshot).toEqual({ recovery: false, businessId: BIZ, memberships: [{ businessId: BIZ, role: 'owner', name: 'İstanbul Atölye', slug: 'istanbul-atolye' }] })
    expect(JSON.stringify(snapshot)).not.toMatch(/server-only-fixture|accessToken|userId|entitlements/)
  })
  it.each([true, false])('does not read labels for recovery or no-membership sessions (recovery=%s)', async recovery => {
    const client = { listMembershipLabels: vi.fn() }
    expect(await readCoreEntrySnapshot({ ...context, recovery, businessId: null, memberships: [] }, client))
      .toEqual({ recovery, businessId: null, memberships: [] })
    expect(client.listMembershipLabels).not.toHaveBeenCalled()
  })
  it.each([
    [], [row, row], [{ ...row, role: 'manager' }], [{ ...row, active: false }], [{ ...row, id: USER }],
  ].map(labels => ({ labels })))('requires the display read to match the authoritative membership snapshot', async ({ labels }) => {
    await expect(readCoreEntrySnapshot(context, { listMembershipLabels: vi.fn(async () => labels as CoreMembershipLabel[]) }))
      .rejects.toMatchObject({ code: 'CORE_UNAVAILABLE' })
  })
  it('rejects inconsistent display responses in the browser parser', () => {
    expect(CoreEntrySnapshotSchema.safeParse({ recovery: false, businessId: BIZ, memberships: [] }).success).toBe(false)
    expect(CoreEntrySnapshotSchema.safeParse({ recovery: true, businessId: BIZ, memberships: [{ businessId: BIZ, role: 'owner', name: 'A', slug: 'a' }] }).success).toBe(false)
  })
})

describe('Core business display source', () => {
  function clientFor(body: unknown, status = 200) {
    const fetcher = vi.fn(async () => new Response(JSON.stringify(body), { status }))
    const secret = vi.fn()
    const client = new CorePlatformClient({ supabaseUrl: 'https://core.example.test', anonKey: 'public-test-key', principalName: 'kepenk-web', principalSecret: secret, fetch: fetcher })
    return { client, fetcher, secret }
  }
  it('uses the verified user and existing direct membership relation with a bounded read', async () => {
    const { client, fetcher, secret } = clientFor([row])
    expect(await client.listMembershipLabels('user-test-token', USER)).toEqual([row])
    const call = fetcher.mock.calls[0] as unknown as [string, RequestInit]
    const url = new URL(call[0])
    expect(url.searchParams.get('user_id')).toBe(`eq.${USER}`)
    expect(url.searchParams.get('select')).toContain('businesses!memberships_business_id_fkey(id,name,slug)')
    expect(url.searchParams.get('limit')).toBe('51')
    expect(call[1].cache).toBe('no-store')
    expect(call[1].headers).toMatchObject({ authorization: 'Bearer user-test-token' })
    expect(secret).not.toHaveBeenCalled()
  })
  it.each([[{ ...row, businesses: null }], [{ ...row, businesses: { ...row.businesses, name: '' } }], Array.from({ length: 51 }, () => row)].map(rows => ({ rows })))('does not turn missing labels or overflow into a successful picker', async ({ rows }) => {
    const { client } = clientFor(rows)
    await expect(client.listMembershipLabels('test', USER)).rejects.toMatchObject({ code: 'CORE_UNAVAILABLE' })
  })
})
