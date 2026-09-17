import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest'

/**
 * R1 KC-05 blocker 1: for a canary tenant the legacy `paket` value must not
 * open a single paid capability. The İyzico callback carries no Core user
 * token, so the scenario has no Core evidence and must open nothing; paid
 * capabilities arrive later through the Core-event-gated projection.
 */
const update = vi.fn(async () => undefined)
const get = vi.fn(async () => ({ exists: true, data: () => ({ sektor: 'kuafor', waNumarasi: '+905550000000', isletmeAdiTam: 'Test Kuafor', ad: 'Ali', email: null, googlePlacesId: 'places-1', ilce: 'Kadikoy' }) }))

vi.mock('@/lib/firebaseAdmin', () => ({
  adminDb: { collection: vi.fn(() => ({ doc: vi.fn(() => ({ update, get })) })) },
  Timestamp: { fromDate: (d: Date) => ({ toDate: () => d }), now: () => ({ toDate: () => new Date() }) },
}))
const telegramGonder = vi.fn(async () => undefined)
const waMesajGonder = vi.fn(async () => undefined)
const createHttpTask = vi.fn(async () => undefined)
const haftaIcerikUret = vi.fn(async () => undefined)
const createVoiceAgentForEsnaf = vi.fn(async () => 'agent-1')
const domainHediyeAkisi = vi.fn(async () => undefined)
const hosgeldinEmaili = vi.fn(async () => undefined)

vi.mock('@/lib/telegram', () => ({ telegramGonder }))
vi.mock('@/lib/twilioClient', () => ({ waMesajGonder, esnafHitap: () => 'Ali Usta' }))
vi.mock('@/lib/emailClient', () => ({ hosgeldinEmaili }))
vi.mock('@/lib/cloudTasksClient', () => ({ createHttpTask }))
vi.mock('@/utils/icerikUreticisi', () => ({ haftaIcerikUret }))
vi.mock('@/lib/vapiClient', () => ({ createVoiceAgentForEsnaf }))
vi.mock('@/lib/cloudflareRegistrar', () => ({ domainHediyeAkisi }))

const { paketSenaryosuCalistir } = await import('@/utils/paketSenaryosu')

function updatedKeys(): string[] {
  return update.mock.calls.flatMap((call) => Object.keys((call as unknown as [Record<string, unknown>])[0] ?? {}))
}

/** Welcome-message templates, without the async site-queue notification. */
function welcomeTemplates(): string[] {
  return waMesajGonder.mock.calls
    .map((call) => (call as unknown as [string, string, string, string])[3])
    .filter((template) => template !== 'site_siraya_alindi')
}

beforeEach(() => {
  vi.clearAllMocks()
  get.mockResolvedValue({ exists: true, data: () => ({ sektor: 'kuafor', waNumarasi: '+905550000000', isletmeAdiTam: 'Test Kuafor', ad: 'Ali', email: null, googlePlacesId: 'places-1', ilce: 'Kadikoy' }) } as never)
})

afterEach(() => {
  delete process.env.CORE_CANARY_TENANTS
})

describe('paketSenaryosuCalistir — canary paid capability authority', () => {
  it('opens no paid capability from a forged or stale paket=PREMIUM for a canary tenant', async () => {
    process.env.CORE_CANARY_TENANTS = 'esnaf-canary'
    await paketSenaryosuCalistir('esnaf-canary', 'PREMIUM', 'pay-1')

    // No Core-owned commercial field, and no paid `ayarlar.*` flag.
    const keys = updatedKeys()
    expect(keys).not.toContain('durum')
    expect(keys).not.toContain('paket')
    expect(keys).not.toContain('aktifModuller')
    expect(keys.filter((key) => key.startsWith('ayarlar.'))).toEqual([])
    expect(keys).toContain('odemeId')

    // No paid side effects: no voice agent, no domain gift, no paid content platforms.
    expect(createVoiceAgentForEsnaf).not.toHaveBeenCalled()
    expect(domainHediyeAkisi).not.toHaveBeenCalled()
    expect(haftaIcerikUret).toHaveBeenCalledWith('esnaf-canary', ['instagram'])
    expect(welcomeTemplates()).toEqual(['hosgeldin_core'])
  })

  it('keeps the legacy package behaviour for non-canary tenants', async () => {
    delete process.env.CORE_CANARY_TENANTS
    await paketSenaryosuCalistir('esnaf-legacy', 'PREMIUM', 'pay-2')

    const keys = updatedKeys()
    expect(keys).toContain('durum')
    expect(keys).toContain('paket')
    expect(keys).toContain('aktifModuller')
    expect(keys).toContain('ayarlar.customDomain')
    expect(haftaIcerikUret).toHaveBeenCalledWith('esnaf-legacy', ['instagram', 'facebook', 'gmb'])
    expect(welcomeTemplates()).toEqual(['hosgeldin_premium'])
  })
})
