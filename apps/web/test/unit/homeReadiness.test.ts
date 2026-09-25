import { describe, expect, it } from 'vitest'
import { getHomeReadiness, type HomeSourceStatus } from '@/lib/experience/homeReadiness'

describe('Kepenk Alpha home source readiness', () => {
  const blocked: HomeSourceStatus[] = ['not_connected', 'loading', 'unavailable', 'forbidden', 'stale']

  it.each(blocked)('never describes %s as a quiet successful read', status => {
    const view = getHomeReadiness(status, { visible: 0, deferred: 0 })
    expect(view.kind).toBe(status)
    expect(view.canShowCards).toBe(false)
    expect(view.canShowCounts).toBe(false)
    expect(view.title).not.toContain('bir iş yok')
    expect(view.description.length).toBeGreaterThan(0)
  })

  it.each(blocked)('hides old cards and counts when the source becomes %s', status => {
    const view = getHomeReadiness(status, { visible: 2, deferred: 3 })
    expect(view.canShowCards).toBe(false)
    expect(view.canShowCounts).toBe(false)
  })

  it('shows a feed only after a successful read', () => {
    expect(getHomeReadiness('ready', { visible: 2, deferred: 1 })).toMatchObject({
      kind: 'feed', canShowCards: true, canShowCounts: true,
    })
  })

  it('limits the quiet claim to the successfully read source', () => {
    const view = getHomeReadiness('ready', { visible: 0, deferred: 0 })
    expect(view.kind).toBe('quiet')
    expect(view.description).toContain('kontrol edilen kayıtları')
    expect(view.description).toContain('Diğer uygulamalardaki işleri kapsamaz')
  })

  it('keeps deferred work discoverable when nothing is urgent', () => {
    const view = getHomeReadiness('ready', { visible: 0, deferred: 2 })
    expect(view.kind).toBe('quiet')
    expect(view.canShowCards).toBe(true)
    expect(view.description).toContain('aşağıda')
  })
})
