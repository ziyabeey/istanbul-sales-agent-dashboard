'use client'

import { useEffect, useMemo, useRef, useState } from 'react'
import { useRouter } from 'next/navigation'
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

const DEMO_NOW = new Date('2026-09-24T18:00:00+03:00')

export default function ExperienceHomePage() {
  const router = useRouter()
  const [hidden, setHidden] = useState<string[]>([])
  const [outcome, setOutcome] = useState('')
  const [outcomes, setOutcomes] = useState<ActionCardOutcomeEvent[]>([])
  const surfaced = useRef(new Set<string>())

  const parsedCards = useMemo(
    () => DEMO_ACTION_CARDS.map(card => ActionCardProtocolSchema.parse(card)),
    []
  )

  const activeCards = parsedCards.filter(card => !hidden.includes(card.cardId))
  const plan = planActionCardAttention(activeCards, {
    now: DEMO_NOW,
    maxVisible: 2,
    maxPerSuppressionGroup: 1,
  })

  const visible = plan.visible.map(actionCardProtocolToModel)
  const deferred = plan.deferred.map(actionCardProtocolToModel)
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
    <main className="kpnk-main kpnk-home-shell">
      <header className="kpnk-home-head">
        <div>
          <div className="kpnk-experience-kicker">Kepenk · Bugün</div>
          <h1>Bırak iş sana gelsin.</h1>
          <p>Önünde yalnız şu an karar vermen gereken işler var. Geri kalanı Kepenk sessizce sıraya koyar.</p>
        </div>

        <div className="kpnk-attention-summary" aria-label="Dikkat özeti">
          <div><strong>{visible.length}</strong><span>Şimdi</span></div>
          <div><strong>{deferred.length}</strong><span>Sonra</span></div>
          <div><strong>{plan.suppressed.length}</strong><span>Susturuldu</span></div>
        </div>
      </header>

      {visible.length > 0 ? (
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
        <section className="kpnk-quiet-state" aria-live="polite">
          <div className="kpnk-quiet-mark" aria-hidden="true">✓</div>
          <h2>Şu an senden bir şey istemiyoruz.</h2>
          <p>Kritik bir gelişme olduğunda Kepenk işi buraya getirir.</p>
        </section>
      )}

      {deferred.length > 0 ? (
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
        <span>Gösterilmeyen {plan.suppressed.length} kart duplicate, inactive veya suppression policy nedeniyle sessiz.</span>
        <a href="/dashboard/manage/experience-lab">Protokol laboratuvarını aç</a>
      </footer>

      <details
        className="kpnk-card"
        style={{ width: 'min(900px, 100%)', marginTop: 18, padding: '14px 16px' }}
      >
        <summary style={{ cursor: 'pointer', fontSize: 12, fontWeight: 700 }}>
          K5 pilot ölçümü · yalnız bu oturum
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
      </details>

      <div className="kpnk-experience-outcome" aria-live="polite">{outcome}</div>
    </main>
  )
}
