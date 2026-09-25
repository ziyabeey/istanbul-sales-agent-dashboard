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

  it('does not promise a future scheduler when selecting deferred work', async () => {
    const later = container.querySelector<HTMLButtonElement>('.kpnk-later-row')!
    await act(async () => { later.click() })
    const message = container.querySelector('.kpnk-experience-outcome')?.textContent ?? ''
    expect(message).toContain('örnek işler arasında')
    expect(message).not.toContain('gösterilecek')
  })
})
