import { act, createElement } from 'react'
import { createRoot, type Root } from 'react-dom/client'
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest'
import CoreEntry from '@/components/core/CoreEntry'
import BusinessSessionBoundary from '@/context/BusinessSessionBoundary'
import GirisPage from '@/app/giris/page'
import BaslangicPage from '@/app/baslangic/page'
import LegacyGirisPage from '@/app/giris/LegacyGirisPage'

const mocks = vi.hoisted(() => ({ router: { replace: vi.fn() }, path: '/baslangic', legacy: vi.fn(), notFound: vi.fn(() => { throw new Error('NOT_FOUND') }) }))
vi.mock('next/navigation', () => ({ useRouter: () => mocks.router, usePathname: () => mocks.path, notFound: mocks.notFound }))
vi.mock('@/context/EsnafContext', () => ({ EsnafProvider: ({ children }: { children: React.ReactNode }) => { mocks.legacy(); return children } }))
const A = { businessId: '5b000000-0000-4000-8000-000000000001', name: 'İstanbul Atölye', slug: 'istanbul-atolye', role: 'owner' }
const B = { businessId: '5b000000-0000-4000-8000-000000000002', name: 'Kadıköy Atölye', slug: 'kadikoy-atolye', role: 'manager' }
const snapshot = (memberships = [A], businessId: string | null = A.businessId) => ({ recovery: false, businessId, memberships })
const json = (data: unknown, status = 200) => new Response(JSON.stringify(data), { status })
const loginOk = () => json({ userId: '11000000-0000-4000-8000-000000000001', recovery: false })

describe('Core entry UI', () => {
  let container: HTMLDivElement
  let root: Root
  let fetcher: ReturnType<typeof vi.fn>
  beforeEach(() => {
    vi.stubGlobal('IS_REACT_ACT_ENVIRONMENT', true)
    fetcher = vi.fn(); vi.stubGlobal('fetch', fetcher)
    document.cookie = 'kepenk_core_csrf=local-test-csrf; path=/'
    container = document.createElement('div'); document.body.appendChild(container)
    root = createRoot(container)
    mocks.path = '/baslangic'
  })
  afterEach(async () => {
    await act(async () => root.unmount())
    container.remove()
    document.cookie = 'kepenk_core_csrf=; Max-Age=0; path=/'
    vi.unstubAllGlobals(); vi.unstubAllEnvs()
  })
  const mount = async () => { await act(async () => root.render(createElement(CoreEntry))) }
  function button(label: string) {
    return Array.from(container.querySelectorAll<HTMLButtonElement>('button')).find(item => item.textContent === label)!
  }
  async function click(label: string) { await act(async () => button(label).click()) }
  async function input(id: string, value: string) {
    const field = container.querySelector<HTMLInputElement>(`#${id}`)!
    await act(async () => {
      Object.getOwnPropertyDescriptor(HTMLInputElement.prototype, 'value')!.set!.call(field, value)
      field.dispatchEvent(new Event('input', { bubbles: true }))
    })
  }
  async function submit() {
    await act(async () => container.querySelector('form')!.dispatchEvent(new Event('submit', { bubbles: true, cancelable: true })))
  }

  it('opens only with both rollout gates; the old login remains the default', () => {
    vi.stubEnv('CORE_BFF_ENABLED', ''); vi.stubEnv('CORE_ENTRY_ENABLED', '')
    expect(GirisPage().type).toBe(LegacyGirisPage)
    expect(() => BaslangicPage()).toThrow('NOT_FOUND')
    vi.stubEnv('CORE_BFF_ENABLED', 'true'); vi.stubEnv('CORE_ENTRY_ENABLED', 'true')
    expect(GirisPage().type).toBe(CoreEntry)
    expect(BaslangicPage().type).toBe(CoreEntry)
  })
  it('does not mount the legacy session reader on Core pages, and keeps it on legacy pages', async () => {
    await act(async () => root.render(createElement(BusinessSessionBoundary, { coreEntryEnabled: true, children: 'Giriş' })))
    expect(mocks.legacy).not.toHaveBeenCalled()
    mocks.path = '/dashboard/manage'
    await act(async () => root.render(createElement(BusinessSessionBoundary, { coreEntryEnabled: true, children: 'Panel' })))
    expect(mocks.legacy).toHaveBeenCalledTimes(1)
  })
  it('shows a labelled password form only after an unauthenticated response', async () => {
    fetcher.mockResolvedValue(json({}, 401)); await mount()
    expect(container.querySelector('h1')?.textContent).toBe('Kepenk’e giriş yap')
    expect(container.querySelector('label[for="core-email"]')?.textContent).toBe('E-posta adresi')
    expect(container.querySelector('input[type="password"]')?.getAttribute('autocomplete')).toBe('current-password')
    expect(document.activeElement).toBe(container.querySelector('h1'))
    expect(fetcher.mock.calls[0][0]).toBe('/api/core/auth/baslangic')
  })
  it('uses the existing password endpoint then re-reads the server context, not the login payload', async () => {
    fetcher.mockResolvedValueOnce(json({}, 401)).mockResolvedValueOnce(loginOk()).mockResolvedValueOnce(json(snapshot()))
    await mount(); await input('core-email', 'owner@example.test'); await input('core-password', 'local-test-password'); await submit()
    expect(fetcher.mock.calls[1][0]).toBe('/api/core/auth/parola-giris')
    expect(JSON.parse(fetcher.mock.calls[1][1].body)).toEqual({ email: 'owner@example.test', parola: 'local-test-password' })
    expect(fetcher.mock.calls[2][0]).toBe('/api/core/auth/baslangic')
    expect(container.textContent).toContain('İstanbul Atölye')
    expect(mocks.router.replace).toHaveBeenCalledWith('/baslangic')
    expect(container.querySelector('input[type="password"]')).toBeNull()
  })
  it('does not ask for selection when the server has already selected the only business', async () => {
    fetcher.mockResolvedValue(json(snapshot())); await mount()
    expect(container.textContent).toContain('Giriş ve işletme seçimin doğrulandı')
    expect(container.textContent).toContain('Randevu bağlantısı henüz bu ekrana eklenmedi')
    expect(container.querySelector('.core-entry-businesses')).toBeNull()
    expect(container.textContent).not.toContain(A.businessId)
    expect(container.textContent).not.toContain('Şu an ilgilenmen gereken bir iş yok')
  })

  it('offers a context retry instead of another password submission when login succeeded but the business read failed', async () => {
    fetcher.mockResolvedValueOnce(json({}, 401)).mockResolvedValueOnce(loginOk()).mockResolvedValueOnce(json({}, 503)).mockResolvedValueOnce(json(snapshot()))
    await mount(); await input('core-email', 'owner@example.test'); await input('core-password', 'local-test-password'); await submit()
    expect(container.textContent).toContain('Girişinden sonra işletmelerini doğrulayamadık')
    expect(container.querySelector('form')).toBeNull()
    expect(button('Çıkış yap')).toBeDefined()
    await click('Yeniden kontrol et')
    expect(container.textContent).toContain(A.name)
    expect(fetcher.mock.calls.filter(call => call[0] === '/api/core/auth/parola-giris')).toHaveLength(1)
  })
  it('shows verified names and roles for multiple memberships without guessing a selection', async () => {
    fetcher.mockResolvedValue(json(snapshot([A, B], null))); await mount()
    expect(container.querySelector('h1')?.textContent).toBe('Hangi işletmeyle devam etmek istersin?')
    expect(container.querySelectorAll('.core-entry-businesses button')).toHaveLength(2)
    expect(container.textContent).toContain('Yönetici · kadikoy-atolye')
    expect(container.querySelector('.core-entry-selected')).toBeNull()
  })
  it('clears the previous business while switching and uses a fresh server confirmation', async () => {
    let finish!: (response: Response) => void
    fetcher.mockResolvedValueOnce(json(snapshot([A, B]))).mockImplementationOnce(() => new Promise<Response>(resolve => { finish = resolve })).mockResolvedValueOnce(json(snapshot([A, B], B.businessId)))
    await mount(); await click('İşletmeyi değiştir')
    const second = container.querySelectorAll<HTMLButtonElement>('.core-entry-businesses button')[1]
    await act(async () => second.click())
    expect(container.textContent).not.toContain(A.name)
    expect(container.textContent).not.toContain(B.name)
    expect(container.textContent).toContain('İşletmelerin kontrol ediliyor')
    expect(fetcher.mock.calls[1][1].headers['x-kepenk-csrf']).toBe('local-test-csrf')
    await act(async () => finish(json({ ok: true })))
    expect(container.querySelector('.core-entry-selected')?.textContent).toContain(B.name)
    expect(container.querySelector('.core-entry-selected')?.textContent).not.toContain(A.name)
  })
  it('does not confirm a selection if the follow-up read still names another business', async () => {
    fetcher.mockResolvedValueOnce(json(snapshot([A, B], null))).mockResolvedValueOnce(json({ ok: true })).mockResolvedValueOnce(json(snapshot([A, B])))
    await mount()
    await act(async () => container.querySelectorAll<HTMLButtonElement>('.core-entry-businesses button')[1].click())
    expect(container.textContent).toContain('İşletme seçimini doğrulayamadık')
    expect(container.querySelector('.core-entry-selected')).toBeNull()
  })
  it('explains a successful empty membership result without inventing a business', async () => {
    fetcher.mockResolvedValue(json(snapshot([], null))); await mount()
    expect(container.textContent).toContain('Erişebileceğin bir işletme bulunamadı')
    expect(button('Çıkış yap')).toBeDefined()
    expect(container.querySelector('.core-entry-selected')).toBeNull()
  })
  it.each([503, 403])('separates unavailability (%s) from an empty membership list and allows retry', async status => {
    fetcher.mockResolvedValueOnce(json({ error: 'INTERNAL_DETAIL' }, status)).mockResolvedValueOnce(json(snapshot()))
    await mount()
    expect(container.textContent).toContain('İşletmelerini şu an kontrol edemedik')
    expect(container.textContent).not.toContain('INTERNAL_DETAIL')
    expect(container.textContent).not.toContain('Erişebileceğin bir işletme bulunamadı')
    await click('Yeniden kontrol et')
    expect(container.textContent).toContain(A.name)
  })
  it('does not present a working login form while the server gate is closed', async () => {
    fetcher.mockResolvedValue(json({}, 404)); await mount()
    expect(container.textContent).toContain('Bu giriş henüz kullanıma açılmadı')
    expect(container.querySelector('form')).toBeNull()
  })
  it('routes recovery sessions to the existing password update surface, never the dashboard', async () => {
    fetcher.mockResolvedValue(json({ recovery: true, businessId: null, memberships: [] })); await mount()
    expect(mocks.router.replace).toHaveBeenCalledWith('/parola-yenile')
    expect(container.querySelector('.core-entry-selected')).toBeNull()
  })
  it('rechecks when the window becomes active and discards expired-session content', async () => {
    fetcher.mockResolvedValueOnce(json(snapshot())).mockResolvedValueOnce(json({}, 401))
    await mount()
    await act(async () => window.dispatchEvent(new Event('focus')))
    expect(container.textContent).not.toContain(A.name)
    expect(container.querySelector('h1')?.textContent).toBe('Kepenk’e giriş yap')
  })
  it('ignores an older read completing after a newer refresh', async () => {
    let finish!: (response: Response) => void
    fetcher.mockImplementationOnce(() => new Promise<Response>(resolve => { finish = resolve })).mockResolvedValueOnce(json({}, 401))
    await mount()
    await act(async () => window.dispatchEvent(new Event('focus')))
    await act(async () => finish(json(snapshot())))
    expect(container.textContent).not.toContain(A.name)
    expect(container.querySelector('h1')?.textContent).toBe('Kepenk’e giriş yap')
  })
  it('finishes logout only after the existing endpoint acknowledges it', async () => {
    fetcher.mockResolvedValueOnce(json(snapshot())).mockResolvedValueOnce(json({ ok: true }))
    await mount(); await click('Çıkış yap')
    expect(fetcher.mock.calls[1][0]).toBe('/api/core/auth/cikis')
    expect(container.textContent).not.toContain(A.name)
    expect(mocks.router.replace).toHaveBeenCalledWith('/giris')
  })
  it('does not pretend logout succeeded after a network failure', async () => {
    fetcher.mockResolvedValueOnce(json(snapshot())).mockRejectedValueOnce(new Error('offline'))
    await mount(); await click('Çıkış yap')
    expect(container.textContent).toContain('Çıkış işlemini doğrulayamadık')
    expect(container.textContent).not.toContain(A.name)
    expect(mocks.router.replace).not.toHaveBeenCalled()
    expect(button('Çıkış yap').disabled).toBe(false)
  })
  it('does not submit a session mutation without the CSRF cookie', async () => {
    fetcher.mockResolvedValueOnce(json(snapshot())); await mount()
    document.cookie = 'kepenk_core_csrf=; Max-Age=0; path=/'
    await click('Çıkış yap')
    expect(fetcher).toHaveBeenCalledTimes(1)
    expect(container.textContent).toContain('İşlem doğrulanamadı')
  })
  it('uses an account-neutral recovery confirmation and the existing recovery endpoint', async () => {
    fetcher.mockResolvedValueOnce(json({}, 401)).mockResolvedValueOnce(json({ ok: true }))
    await mount(); await click('Parolamı unuttum'); await input('core-email', 'owner@example.test'); await submit()
    expect(fetcher.mock.calls[1][0]).toBe('/api/core/auth/parola-kurtar')
    expect(container.textContent).toContain('bir hesap varsa kurtarma bağlantısı gönderilecek')
    expect(container.textContent).toContain('Bağlantıyı bu tarayıcıda aç')
  })
  it('clears the password after a rejected login and uses Turkish text, not server details', async () => {
    fetcher.mockResolvedValueOnce(json({}, 401)).mockResolvedValueOnce(json({ code: 'CREDENTIALS_INVALID', error: 'RAW_INTERNAL' }, 401))
    await mount(); await input('core-email', 'owner@example.test'); await input('core-password', 'local-test-password'); await submit()
    expect(container.querySelector<HTMLInputElement>('#core-password')?.value).toBe('')
    expect(container.textContent).toContain('E-posta adresini ve parolanı kontrol')
    expect(container.textContent).not.toMatch(/RAW_INTERNAL|CREDENTIALS_INVALID/)
  })
  it('does not treat malformed successful responses as completed logout', async () => {
    fetcher.mockResolvedValueOnce(json(snapshot())).mockResolvedValueOnce(json({ page: 'not an acknowledgment' }))
    await mount(); await click('Çıkış yap')
    expect(container.textContent).toContain('Çıkış işlemini doğrulayamadık')
    expect(mocks.router.replace).not.toHaveBeenCalled()
  })
})
