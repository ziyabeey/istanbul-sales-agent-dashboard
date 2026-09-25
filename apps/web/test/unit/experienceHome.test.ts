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
    expect(container.textContent).toContain('Canlı Randevu bağlantısı yok')
    expect(container.querySelectorAll('article').length).toBeGreaterThan(0)
    expect(container.querySelector('[aria-label="Örnek dikkat özeti"]')).not.toBeNull()
  })

  it.each([
    ['not_connected', 'Önce Randevu bağlantısı gerekiyor.'],
    ['loading', 'İşlerin kontrol ediliyor.'],
    ['unavailable', 'İşlerini şu an kontrol edemedik.'],
    ['forbidden', 'Bu işletmenin işlerini görüntüleme yetkin yok.'],
    ['stale', 'İşlerinin güncelliğini doğrulayamadık.'],
  ])('shows %s without old cards, zero counts or success claims', async (id, title) => {
    await selectScenario(id)
    expect(container.querySelector('[role="status"]')?.textContent).toContain(title)
    expect(container.querySelectorAll('article')).toHaveLength(0)
    expect(container.querySelector('[aria-label="Örnek dikkat özeti"]')).toBeNull()
    expect(container.querySelector('details')).toBeNull()
    expect(container.textContent).not.toContain('Şu an ilgilenmen gereken bir iş yok.')
    expect(push).not.toHaveBeenCalled()
  })

  it('shows a scoped quiet state only in the successful-empty scenario', async () => {
    await selectScenario('quiet')
    expect(container.textContent).toContain('Şu an ilgilenmen gereken bir iş yok.')
    expect(container.textContent).toContain('diğer ürünler hakkında bilgi vermez')
    expect(container.querySelector('[aria-label="Örnek dikkat özeti"]')).not.toBeNull()
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
})
