import { act, createElement } from 'react'
import { createRoot, type Root } from 'react-dom/client'
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest'
import ExperienceHomePage from '@/app/dashboard/manage/experience-home/page'

const { push } = vi.hoisted(() => ({ push: vi.fn() }))
vi.mock('next/navigation', () => ({ useRouter: () => ({ push }) }))
const START = Date.parse('2026-09-25T10:00:00.000Z')

describe('Kepenk Alpha experience preview', () => {
  let container: HTMLDivElement
  let root: Root

  beforeEach(async () => {
    vi.useFakeTimers({ toFake: ['Date'] })
    vi.setSystemTime(START)
    vi.stubGlobal('IS_REACT_ACT_ENVIRONMENT', true)
    container = document.createElement('div')
    document.body.appendChild(container)
    root = createRoot(container)
    await act(async () => { root.render(createElement(ExperienceHomePage)) })
  })

  afterEach(async () => {
    await act(async () => { root.unmount() })
    container.remove()
    vi.unstubAllGlobals()
    vi.useRealTimers()
  })

  async function selectScenario(id: string) {
    const select = container.querySelector<HTMLSelectElement>('#home-scenario')!
    await act(async () => {
      select.value = id
      select.dispatchEvent(new Event('change', { bubbles: true }))
    })
  }

  function metric(label: string) {
    const caption = Array.from(container.querySelectorAll('details span')).find(span => span.textContent === label)
    return caption?.previousElementSibling?.textContent
  }

  function laterRows() {
    return Array.from(container.querySelectorAll<HTMLButtonElement>('.kpnk-later-row'))
  }

  function expandedPanel() {
    return container.querySelector<HTMLElement>('.kpnk-later-detail:not([hidden])')!
  }

  function buttonNamed(label: string, within: ParentNode = container) {
    return Array.from(within.querySelectorAll<HTMLButtonElement>('button')).find(button => button.textContent === label)!
  }

  function decisionRow(title: string) {
    return Array.from(container.querySelectorAll<HTMLTableRowElement>('.kpnk-preview-decisions tbody tr'))
      .find(row => row.querySelector('th')?.textContent === title)!
  }

  it('labels sample data and keeps the existing card experience', () => {
    expect(container.textContent).toContain('Ürün önizlemesi · örnek işletme')
    expect(container.textContent).toContain('Randevu henüz bağlı değil')
    expect(container.querySelectorAll('article').length).toBeGreaterThan(0)
    expect(container.querySelector('[aria-label="Örnek iş özeti"]')).not.toBeNull()
  })

  it.each([
    ['not_connected', 'Randevu henüz bağlı değil.'],
    ['loading', 'İşlerin kontrol ediliyor.'],
    ['unavailable', 'İşlerini şu an kontrol edemedik.'],
    ['forbidden', 'Bu işletmenin işlerini görme yetkin yok.'],
    ['stale', 'Bilgilerin güncel olduğundan emin değiliz.'],
  ])('shows %s without old cards, zero counts or success claims', async (id, title) => {
    await selectScenario(id)
    expect(container.querySelector('[role="status"]')?.textContent).toContain(title)
    expect(container.querySelectorAll('article')).toHaveLength(0)
    expect(container.querySelector('[aria-label="Örnek iş özeti"]')).toBeNull()
    expect(container.querySelector('details')).toBeNull()
    expect(container.textContent).not.toContain('Şu an ilgilenmen gereken bir iş yok.')
    expect(push).not.toHaveBeenCalled()
  })

  it('shows a scoped quiet state only in the successful-empty scenario', async () => {
    await selectScenario('quiet')
    expect(container.textContent).toContain('Şu an ilgilenmen gereken bir iş yok.')
    expect(container.textContent).toContain('Diğer uygulamalardaki işleri kapsamaz')
    expect(container.querySelector('[aria-label="Örnek iş özeti"]')).not.toBeNull()
    expect(container.querySelectorAll('article')).toHaveLength(0)
  })

  it('resets sample interactions between scenarios without navigating', async () => {
    const dismiss = Array.from(container.querySelectorAll('button')).find(button => button.textContent === 'Kapat')!
    await act(async () => { dismiss.click() })
    expect(container.querySelector('.kpnk-experience-outcome')?.textContent).toContain('kapatıldı')

    await selectScenario('unavailable')
    await selectScenario('sample')
    expect(container.querySelector('.kpnk-experience-outcome')?.textContent).toBe('')
    expect(container.querySelectorAll('article')).toHaveLength(2)
    expect(push).not.toHaveBeenCalled()
  })

  it('uses Turkish labels and readable dates, including collapsed explanations', () => {
    const text = container.textContent ?? ''
    expect(text).toContain('Finans')
    expect(text).toContain('Emlak')
    expect(text).toContain('Stok')
    expect(text).toContain('24 Eylül 2026, 19:30 (TSİ)')
    expect(text).toContain('12.450 TL')
    expect(text).not.toMatch(/Finance|Property|canonical|appointment_events|appointment\.cancelled|stock\.projected_low|Business outcome|\bUI\b|Navigasyon|Son zaman/)
    expect(text).not.toContain('2026-09-24T')
  })

  it('does not promise a real reminder after a preview snooze', async () => {
    const snooze = Array.from(container.querySelectorAll('button')).find(button => button.textContent === 'Daha sonra')!
    await act(async () => { snooze.click() })
    expect(container.querySelector('.kpnk-experience-outcome')?.textContent).toContain('Hatırlatma kurulmadı.')
    expect(push).not.toHaveBeenCalled()
  })

  it('opens the full deferred card with its explanation and accessible control relationship', async () => {
    const later = laterRows()[0]
    expect(later.getAttribute('aria-expanded')).toBe('false')
    await act(async () => { later.click() })
    const panel = expandedPanel()
    expect(later.getAttribute('aria-expanded')).toBe('true')
    expect(later.getAttribute('aria-controls')).toBe(panel.id)
    expect(panel.getAttribute('aria-labelledby')).toBe(later.id)
    expect(panel.querySelector('article')).not.toBeNull()
    expect(panel.querySelector<HTMLDetailsElement>('details')?.open).toBe(true)
    expect(panel.textContent).toContain('Örnek kayıtlarda ödeme bekleyen üç adisyon')
    expect(panel.textContent).toContain('Dayanak: 3 açık adisyon')
    expect(panel.textContent).toContain('Tahsilatları incele')
    expect(container.querySelector('.kpnk-experience-outcome')?.textContent).toBe('')
  })

  it('counts newly presented cards once without counting opening as a decision', async () => {
    const later = laterRows()[0]
    expect(metric('Gösterilen kart')).toBe('2')
    await act(async () => { later.click() })
    expect(metric('Gösterilen kart')).toBe('3')
    expect(metric('Yanıtlanan kart')).toBe('0')
    expect(metric('Seçilen işlem')).toBe('0')
    expect(metric('Ortanca karar süresi')).toBe('—')
    expect(container.textContent).toContain('Ayrıntı açmak, işlem seçmek sayılmaz.')
    await act(async () => { later.click() })
    await act(async () => { later.click() })
    expect(metric('Gösterilen kart')).toBe('3')
    expect(metric('Yanıtlanan kart')).toBe('0')
    expect(push).not.toHaveBeenCalled()
  })

  it('keeps only one deferred card expanded', async () => {
    const rows = laterRows()
    await act(async () => { rows[0].click() })
    await act(async () => { rows[1].click() })
    expect(rows[0].getAttribute('aria-expanded')).toBe('false')
    expect(rows[1].getAttribute('aria-expanded')).toBe('true')
    expect(container.querySelectorAll('.kpnk-later-detail:not([hidden])')).toHaveLength(1)
    expect(expandedPanel().textContent).toContain('Ayşe Hanım')
    expect(metric('Gösterilen kart')).toBe('4')
    expect(metric('Yanıtlanan kart')).toBe('0')
  })

  it.each(['close', 'escape'])('returns focus to the row when using %s', async method => {
    const later = laterRows()[0]
    await act(async () => { later.click() })
    const close = buttonNamed('Ayrıntıyı kapat', expandedPanel())
    close.focus()
    await act(async () => {
      if (method === 'close') close.click()
      else close.dispatchEvent(new KeyboardEvent('keydown', { key: 'Escape', bubbles: true }))
    })
    expect(later.getAttribute('aria-expanded')).toBe('false')
    expect(container.querySelector('.kpnk-later-detail:not([hidden])')).toBeNull()
    expect(document.activeElement).toBe(later)
    expect(metric('Kapatılan kart')).toBe('0')
  })

  it('reports a deferred navigation selection without opening a real product page', async () => {
    await act(async () => { laterRows()[0].click() })
    await act(async () => { buttonNamed('Tahsilatları incele', expandedPanel()).click() })
    expect(push).not.toHaveBeenCalled()
    expect(metric('Seçilen işlem')).toBe('1')
    expect(metric('Yanıtlanan kart')).toBe('1')
    expect(metric('Sayfa açma seçimi')).toBe('1')
    expect(container.querySelector('.kpnk-experience-outcome')?.textContent)
      .toBe('“Tahsilatları incele” seçildi. Bu önizlemede ilgili sayfa açılmaz ve gerçek kayıtlar değişmez.')
  })

  it('also keeps the main-card navigation selection inside the preview', async () => {
    await act(async () => { buttonNamed('Sipariş seçeneklerini gör').click() })
    expect(push).not.toHaveBeenCalled()
    expect(metric('Seçilen işlem')).toBe('1')
    expect(container.querySelector('.kpnk-experience-outcome')?.textContent).toContain('ilgili sayfa açılmaz')
  })

  it.each([
    ['Kapat', 'Kapatılan kart', 'Gerçek kayıt değişmedi.'],
    ['Daha sonra', 'Ertelenen kart', 'Hatırlatma kurulmadı.'],
  ])('hides deferred work with %s and preserves a usable focus target', async (label, metricLabel, message) => {
    await act(async () => { laterRows()[0].click() })
    const action = buttonNamed(label, expandedPanel())
    action.focus()
    await act(async () => { action.click() })
    expect(container.querySelector('.kpnk-later-detail:not([hidden])')).toBeNull()
    expect(laterRows()).toHaveLength(1)
    expect(container.textContent).not.toContain('Üç açık adisyon ödeme bekliyor')
    expect(document.activeElement).toBe(container.querySelector('h1'))
    expect(metric(metricLabel)).toBe('1')
    expect(metric('Yanıtlanan kart')).toBe('1')
    expect(metric('Seçilen işlem')).toBe('0')
    expect(container.querySelector('.kpnk-experience-outcome')?.textContent).toContain(message)
  })

  it('deduplicates exposure when an inspected deferred card moves to the main feed', async () => {
    await act(async () => { laterRows()[0].click() })
    const firstMainCard = container.querySelector('.kpnk-action-feed article')!
    await act(async () => { buttonNamed('Kapat', firstMainCard).click() })
    expect(container.querySelector('.kpnk-action-feed')?.textContent).toContain('12.450 TL tahsilat bekliyor.')
    expect(container.querySelector('.kpnk-later-detail:not([hidden])')).toBeNull()
    expect(metric('Gösterilen kart')).toBe('3')
    const ids = Array.from(container.querySelectorAll('[id]')).map(element => element.id)
    expect(new Set(ids).size).toBe(ids.length)
  })

  it('clears the expanded detail and its local metrics when switching scenarios', async () => {
    await act(async () => { laterRows()[0].click() })
    await selectScenario('unavailable')
    expect(container.querySelector('.kpnk-later-detail')).toBeNull()
    await selectScenario('sample')
    expect(container.querySelector('.kpnk-later-detail:not([hidden])')).toBeNull()
    expect(laterRows().every(row => row.getAttribute('aria-expanded') === 'false')).toBe(true)
    expect(metric('Gösterilen kart')).toBe('2')
    expect(metric('Yanıtlanan kart')).toBe('0')
  })

  it('shows the first per-card choice and duration without timing later choices again', async () => {
    const title = '3 ürün 4 gün içinde bitebilir.'
    expect(decisionRow(title).textContent).toContain('Henüz seçim yapmadın')
    vi.setSystemTime(START + 2500)
    await act(async () => { buttonNamed('Sipariş seçeneklerini gör').click() })
    expect(decisionRow(title).textContent).toContain('Sipariş seçeneklerini gör')
    expect(decisionRow(title).textContent).toContain('2,5 sn')
    expect(metric('Ortanca karar süresi')).toBe('2,5 sn')
    expect(container.textContent).toContain('ilk seçimini yaptığın 1 kart üzerinden hesaplandı')
    vi.setSystemTime(START + 10000)
    await act(async () => { buttonNamed('Sipariş seçeneklerini gör').click() })
    expect(metric('Seçilen işlem')).toBe('2')
    expect(metric('Ortanca karar süresi')).toBe('2,5 sn')
    expect(decisionRow(title).textContent).toContain('2,5 sn')
    expect(container.textContent).toContain('Sekme arka plandayken geçen zaman da dahildir')
  })

  it('starts a deferred card timer when its detail is first presented, not when its title appears', async () => {
    vi.setSystemTime(START + 20000)
    await act(async () => { laterRows()[0].click() })
    vi.setSystemTime(START + 21250)
    await act(async () => { buttonNamed('Tahsilatları incele', expandedPanel()).click() })
    expect(decisionRow('12.450 TL tahsilat bekliyor.').textContent).toContain('1,3 sn')
    expect(metric('Ortanca karar süresi')).toBe('1,3 sn')
  })

  it('restarts all preview state without navigation or losing the reset-button focus', async () => {
    vi.setSystemTime(START + 2500)
    await act(async () => { buttonNamed('Sipariş seçeneklerini gör').click() })
    await act(async () => { buttonNamed('Daha sonra', container.querySelector('.kpnk-action-feed article')!).click() })
    await act(async () => { laterRows()[0].click() })
    const reset = buttonNamed('Denemeyi baştan başlat')
    reset.focus()
    vi.setSystemTime(START + 30000)
    await act(async () => { reset.click() })
    expect(document.activeElement).toBe(reset)
    expect(container.querySelectorAll('article')).toHaveLength(2)
    expect(laterRows()).toHaveLength(2)
    expect(container.querySelector('.kpnk-later-detail:not([hidden])')).toBeNull()
    expect(container.querySelector('.kpnk-experience-outcome')?.textContent).toBe('')
    expect(metric('Gösterilen kart')).toBe('2')
    expect(metric('Yanıtlanan kart')).toBe('0')
    expect(metric('Seçilen işlem')).toBe('0')
    expect(metric('Ertelenen kart')).toBe('0')
    expect(metric('Ortanca karar süresi')).toBe('—')
    expect(container.textContent).toContain('Yeni deneme başladı.')
    vi.setSystemTime(START + 31000)
    await act(async () => { buttonNamed('Sipariş seçeneklerini gör').click() })
    expect(metric('Ortanca karar süresi')).toBe('1,0 sn')
    expect(push).not.toHaveBeenCalled()
  })

  it('returns to the sample scenario when restarting from a source error', async () => {
    await selectScenario('unavailable')
    await act(async () => { buttonNamed('Denemeyi baştan başlat').click() })
    expect(container.querySelector<HTMLSelectElement>('#home-scenario')?.value).toBe('sample')
    expect(container.querySelectorAll('article')).toHaveLength(2)
    expect(metric('Yanıtlanan kart')).toBe('0')
    await selectScenario('not_connected')
    expect(container.textContent).not.toContain('Yeni deneme başladı.')
    expect(container.querySelector('.kpnk-preview-decisions')).toBeNull()
  })

  it('can restore the sample cards after all of them have been dismissed', async () => {
    for (let index = 0; index < 4; index += 1) {
      await act(async () => { buttonNamed('Kapat', container.querySelector('.kpnk-action-feed article')!).click() })
    }
    expect(container.querySelectorAll('article')).toHaveLength(0)
    expect(metric('Kapatılan kart')).toBe('4')
    await act(async () => { buttonNamed('Denemeyi baştan başlat').click() })
    expect(container.querySelectorAll('article')).toHaveLength(2)
    expect(metric('Kapatılan kart')).toBe('0')
    expect(container.querySelectorAll('.kpnk-preview-decisions tbody tr')).toHaveLength(2)
  })
})
