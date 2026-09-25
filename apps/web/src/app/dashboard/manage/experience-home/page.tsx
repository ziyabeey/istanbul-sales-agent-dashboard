'use client'

import { useEffect, useMemo, useRef, useState } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import {
  ActionCardProtocolSchema,
  deriveActionCardExperienceMetrics,
  planActionCardAttention,
  type ActionCardOutcomeEvent,
} from '@kepenk/action-card-schema'
import {
  actionCardProtocolToModel,
  type ActionCardAction,
  type ActionCardModel,
} from '@kepenk/ui'
import ActionCard from '../components/experience/ActionCard'
import { DEMO_ACTION_CARDS } from '../components/experience/demoProtocolCards'
import { getHomeReadiness, type HomeSourceStatus } from '@/lib/experience/homeReadiness'

const DEMO_NOW = new Date('2026-09-24T18:00:00+03:00')
const SCENARIOS = [
  { id: 'sample', label: 'Örnek işler', status: 'ready' },
  { id: 'not_connected', label: 'İlk gün · bağlantı kurulmadı', status: 'not_connected' },
  { id: 'loading', label: 'İşler yükleniyor', status: 'loading' },
  { id: 'quiet', label: 'Okuma başarılı · iş yok', status: 'ready' },
  { id: 'unavailable', label: 'Kaynağa ulaşılamıyor', status: 'unavailable' },
  { id: 'forbidden', label: 'İşletmeye erişim yok', status: 'forbidden' },
  { id: 'stale', label: 'Bilgiler güncel değil', status: 'stale' },
] as const satisfies readonly { id: string; label: string; status: HomeSourceStatus }[]
type Scenario = typeof SCENARIOS[number]

export default function ExperienceHomePage() {
  const [scenario, setScenario] = useState<Scenario>(SCENARIOS[0])

  return (
    <main className="kpnk-main kpnk-home-shell">
      <aside className="kpnk-home-preview" aria-labelledby="preview-title">
        <div>
          <strong id="preview-title">Ürün önizlemesi · örnek işletme</strong>
          <p>Canlı Randevu bağlantısı yok. Kartlar ve aşağıdaki durumlar örnektir; gerçek işlem yapılmaz.</p>
        </div>
        <label htmlFor="home-scenario">
          Görünümü dene
          <select id="home-scenario" value={scenario.id} onChange={event => {
            const next = SCENARIOS.find(candidate => candidate.id === event.target.value)
            if (next) setScenario(next)
          }}>
            {SCENARIOS.map(option => <option key={option.id} value={option.id}>{option.label}</option>)}
          </select>
        </label>
      </aside>
      <ExperienceHomeSession key={scenario.id} scenario={scenario} />
    </main>
  )
}

function ExperienceHomeSession({ scenario }: { scenario: Scenario }) {
  const router = useRouter()
  const [hidden, setHidden] = useState<string[]>([])
  const [outcome, setOutcome] = useState('')
  const [outcomes, setOutcomes] = useState<ActionCardOutcomeEvent[]>([])
  const surfaced = useRef(new Set<string>())

  const parsedCards = useMemo(
    () => scenario.id === 'sample'
      ? DEMO_ACTION_CARDS.map(card => ActionCardProtocolSchema.parse(card))
      : [],
    [scenario.id]
  )

  const activeCards = parsedCards.filter(card => !hidden.includes(card.cardId))
  const plan = planActionCardAttention(activeCards, {
    now: DEMO_NOW,
    maxVisible: 2,
    maxPerSuppressionGroup: 1,
  })

  const visible = plan.visible.map(actionCardProtocolToModel)
  const deferred = plan.deferred.map(actionCardProtocolToModel)
  const readiness = getHomeReadiness(scenario.status, { visible: visible.length, deferred: deferred.length })
  const metrics = deriveActionCardExperienceMetrics({ cards: parsedCards, outcomes })

  useEffect(() => {
    const fresh = plan.visible.filter(card => !surfaced.current.has(card.cardId))
    if (fresh.length === 0) return

    const occurredAt = new Date().toISOString()
    fresh.forEach(card => surfaced.current.add(card.cardId))
    setOutcomes(current => [
      ...current,
      ...fresh.map(card => ({
        protocolVersion: '1' as const,
        outcomeId: crypto.randomUUID(),
        cardId: card.cardId,
        cardRevision: card.revision,
        businessId: card.businessId,
        type: 'surfaced' as const,
        occurredAt,
      })),
    ])
  }, [plan.visible])

  const appendOutcome = (
    card: ActionCardModel,
    type: ActionCardOutcomeEvent['type'],
    actionId?: string,
  ) => {
    const protocolCard = parsedCards.find(candidate => candidate.cardId === card.id)
    if (!protocolCard) return

    setOutcomes(current => [...current, {
      protocolVersion: '1',
      outcomeId: crypto.randomUUID(),
      cardId: protocolCard.cardId,
      cardRevision: protocolCard.revision,
      businessId: protocolCard.businessId,
      type,
      occurredAt: new Date().toISOString(),
      ...(actionId ? { actionId } : {}),
    } as ActionCardOutcomeEvent])
  }

  const handleAction = (card: ActionCardModel, action: ActionCardAction) => {
    if (!readiness.canShowCards) return
    if (action.kind === 'dismiss' || action.kind === 'snooze') {
      appendOutcome(card, action.kind === 'dismiss' ? 'dismissed' : 'snoozed')
      setHidden(current => current.includes(card.id) ? current : [...current, card.id])
      setOutcome(action.kind === 'snooze'
        ? `${card.title} daha sonraya alındı.`
        : `${card.title} kapatıldı.`)
      return
    }

    if (action.kind === 'navigate') {
      appendOutcome(card, 'action_selected', action.id)
      const protocolCard = parsedCards.find(candidate => candidate.cardId === card.id)
      const protocolAction = protocolCard?.actions.find(candidate => candidate.actionId === action.id)
      if (protocolAction?.mode === 'navigate') router.push(protocolAction.href)
      return
    }

    appendOutcome(card, 'action_selected', action.id)
    setOutcome(`${action.label} seçildi. Demo shell command çalıştırmaz; domain confirmation/execution katmanına devreder.`)
  }

  return (
    <>
      <header className="kpnk-home-head">
        <div>
          <div className="kpnk-experience-kicker">Kepenk · Bugün</div>
          <h1>Bırak iş sana gelsin.</h1>
          <p>Önünde yalnız şu an karar vermen gereken işler var. Geri kalanı Kepenk sessizce sıraya koyar.</p>
        </div>

        {readiness.canShowCounts ? <div className="kpnk-attention-summary" aria-label="Örnek dikkat özeti">
          <div><strong>{visible.length}</strong><span>Şimdi</span></div>
          <div><strong>{deferred.length}</strong><span>Sonra</span></div>
          <div><strong>{plan.suppressed.length}</strong><span>Susturuldu</span></div>
        </div> : null}
      </header>

      {readiness.kind === 'feed' ? (
        <section className="kpnk-home-section" aria-labelledby="now-title">
          <div className="kpnk-home-section-head">
            <div>
              <span className="kpnk-home-dot" aria-hidden="true" />
              <h2 id="now-title">Şimdi ilgilen</h2>
            </div>
            <span>{visible.length} iş</span>
          </div>
          <div className="kpnk-action-feed">
            {visible.map(card => <ActionCard key={card.id} card={card} onAction={handleAction} />)}
          </div>
        </section>
      ) : (
        <section className="kpnk-quiet-state" role="status" aria-live="polite">
          <div className={`kpnk-quiet-mark${readiness.kind === 'quiet' ? '' : ' kpnk-source-mark'}`} aria-hidden="true">
            {readiness.kind === 'quiet' ? '✓' : 'i'}
          </div>
          <h2>{readiness.title}</h2>
          <p>{readiness.description}</p>
        </section>
      )}

      {readiness.canShowCards && deferred.length > 0 ? (
        <section className="kpnk-home-section kpnk-home-later" aria-labelledby="later-title">
          <div className="kpnk-home-section-head">
            <div><h2 id="later-title">Sonra bakılabilir</h2></div>
            <span>Toplu gösterim için uygun</span>
          </div>
          <div className="kpnk-later-list">
            {deferred.map(card => (
              <button
                key={card.id}
                type="button"
                className="kpnk-later-row"
                onClick={() => setOutcome(`${card.title} sonraki dikkat penceresinde gösterilecek.`)}
              >
                <span className="kpnk-later-domain">{card.source.domain}</span>
                <span className="kpnk-later-title">{card.title}</span>
                <span aria-hidden="true">›</span>
              </button>
            ))}
          </div>
        </section>
      ) : null}

      <footer className="kpnk-home-foot">
        <span>{readiness.canShowCounts
          ? `Gösterilmeyen ${plan.suppressed.length} örnek kart tekrar veya öncelik kuralları nedeniyle sessiz.`
          : 'Kaynak doğrulanmadığı için iş sayısı ve kartlar gösterilmiyor.'}</span>
        <Link href="/dashboard/manage/experience-lab" prefetch={false}>Protokol laboratuvarını aç</Link>
      </footer>

      {readiness.canShowCards ? <details
        className="kpnk-card"
        style={{ width: 'min(900px, 100%)', marginTop: 18, padding: '14px 16px' }}
      >
        <summary style={{ cursor: 'pointer', fontSize: 12, fontWeight: 700 }}>
          Örnek etkileşim ölçümü · yalnız bu görünüm
        </summary>
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(120px, 1fr))',
            gap: 8,
            marginTop: 12,
          }}
        >
          {[
            ['Gösterildi', metrics.cardsSurfaced],
            ['Karar verildi', metrics.cardsWithDecision],
            ['Aksiyon seçildi', metrics.actionSelections],
            ['Kapatıldı', metrics.dismissals],
            ['Ertelendi', metrics.snoozes],
            ['Navigasyon', metrics.navigationSelections],
            [
              'Karara süre',
              metrics.medianTimeToDecisionMs === null
                ? '—'
                : `${(metrics.medianTimeToDecisionMs / 1000).toFixed(1)} sn`,
            ],
          ].map(([label, value]) => (
            <div
              key={String(label)}
              style={{
                background: 'var(--kpnk-bg-secondary)',
                borderRadius: 10,
                padding: '10px 12px',
              }}
            >
              <strong style={{ display: 'block', fontSize: 16 }}>{value}</strong>
              <span style={{ fontSize: 10, color: 'var(--kpnk-text-secondary)' }}>{label}</span>
            </div>
          ))}
        </div>
        <p style={{ marginTop: 10, fontSize: 10, lineHeight: 1.5, color: 'var(--kpnk-text-secondary)' }}>
          Bu panel yalnız UI etkileşimini ölçer. Business outcome, gelir veya başarı etkisi çıkarmaz ve veriyi dışarı göndermez.
        </p>
      </details> : null}

      <div className="kpnk-experience-outcome" aria-live="polite">{outcome}</div>
    </>
  )
}
