import { act, createElement } from 'react'
import { createRoot, type Root } from 'react-dom/client'
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest'
import ExperienceHomePage from '@/app/dashboard/manage/experience-home/page'

const { push } = vi.hoisted(() => ({ push: vi.fn() }))
vi.mock('next/navigation', () => ({ useRouter: () => ({ push }) }))

describe('Kepenk Alpha experience preview', () => {
  let container: HTMLDivElement
  let root: Root

  beforeEach(async () => {
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
})
