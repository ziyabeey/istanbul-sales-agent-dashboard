'use client'

import { useEffect, useMemo, useRef, useState } from 'react'
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
import DeferredActionCard from '../components/experience/DeferredActionCard'
import { DEMO_ACTION_CARDS } from '../components/experience/demoProtocolCards'
import { getHomeReadiness, type HomeSourceStatus } from '@/lib/experience/homeReadiness'
import { formatDecisionDuration } from '@/lib/experience/turkishPresentation'

const DEMO_NOW = new Date('2026-09-24T18:00:00+03:00')
const SCENARIOS = [
  { id: 'sample', label: 'Örnek işler', status: 'ready' },
  { id: 'not_connected', label: 'İlk gün · bağlantı kurulmadı', status: 'not_connected' },
  { id: 'loading', label: 'İşler yükleniyor', status: 'loading' },
  { id: 'quiet', label: 'Kontrol tamamlandı · iş yok', status: 'ready' },
  { id: 'unavailable', label: 'Bilgilere ulaşılamıyor', status: 'unavailable' },
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
          <p>Randevu henüz bağlı değil. Buradaki kartlar ve durumlar örnektir; gerçek kayıtlar değişmez.</p>
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
  const [hidden, setHidden] = useState<string[]>([])
  const [expandedCardId, setExpandedCardId] = useState<string | null>(null)
  const [outcome, setOutcome] = useState('')
  const [outcomes, setOutcomes] = useState<ActionCardOutcomeEvent[]>([])
  const surfaced = useRef(new Set<string>())
  const heading = useRef<HTMLHeadingElement>(null)

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
    const presented = [...plan.visible, ...plan.deferred.filter(card => card.cardId === expandedCardId)]
    const fresh = presented.filter(card => !surfaced.current.has(card.cardId))
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
  }, [plan.visible, plan.deferred, expandedCardId])

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
      setExpandedCardId(null)
      setHidden(current => current.includes(card.id) ? current : [...current, card.id])
      heading.current?.focus()
      setOutcome(action.kind === 'snooze'
        ? `“${card.title}” kartı bu önizlemede ertelendi. Hatırlatma kurulmadı.`
        : `“${card.title}” kartı bu önizlemede kapatıldı. Gerçek kayıt değişmedi.`)
      return
    }

    if (action.kind === 'navigate') {
      appendOutcome(card, 'action_selected', action.id)
      setOutcome(`“${action.label}” seçildi. Bu önizlemede ilgili sayfa açılmaz ve gerçek kayıtlar değişmez.`)
      return
    }

    appendOutcome(card, 'action_selected', action.id)
    setOutcome(`“${action.label}” seçildi. Bu önizlemede gerçek işlem yapılmaz.`)
  }

  return (
    <>
      <header className="kpnk-home-head">
        <div>
          <div className="kpnk-experience-kicker">Kepenk · Bugün</div>
          <h1 ref={heading} tabIndex={-1}>Bırak iş sana gelsin.</h1>
          <p>İlgilenmen gereken işleri burada gör. Her kartta ne olduğunu ve neler yapabileceğini bul.</p>
        </div>

        {readiness.canShowCounts ? <div className="kpnk-attention-summary" aria-label="Örnek iş özeti">
          <div><strong>{visible.length}</strong><span>Şimdi</span></div>
          <div><strong>{deferred.length}</strong><span>Sonra</span></div>
          <div><strong>{plan.suppressed.length}</strong><span>Gösterilmeyen</span></div>
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
            <div><h2 id="later-title">Daha sonra ilgilen</h2></div>
            <span>Acil olmayan işler</span>
          </div>
          <div className="kpnk-later-list">
            {deferred.map(card => (
              <DeferredActionCard
                key={card.id}
                card={card}
                expanded={expandedCardId === card.id}
                onToggle={() => {
                  if (expandedCardId === card.id) {
                    setExpandedCardId(null)
                  } else {
                    setExpandedCardId(card.id)
                    appendOutcome(card, 'opened')
                  }
                }}
                onClose={() => setExpandedCardId(null)}
                onAction={handleAction}
              />
            ))}
          </div>
        </section>
      ) : null}

      <footer className="kpnk-home-foot">
        <span>{readiness.canShowCounts
          ? plan.suppressed.length > 0
            ? `${plan.suppressed.length} örnek kart, tekrarları ve gereksiz bildirimleri azaltmak için gösterilmiyor.`
            : 'Bu görünümdeki işler ve sayılar örnektir.'
          : 'Bilgiler kontrol edilemediği için kartlar ve iş sayısı gösterilmiyor.'}</span>
        <Link href="/dashboard/manage/experience-lab" prefetch={false}>Tüm örnek kartları gör</Link>
      </footer>

      {readiness.canShowCards ? <details
        className="kpnk-card"
        style={{ width: 'min(900px, 100%)', marginTop: 18, padding: '14px 16px' }}
      >
        <summary style={{ cursor: 'pointer', fontSize: 12, fontWeight: 700 }}>
          Bu denemedeki seçimlerin
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
            ['Gösterilen kart', metrics.cardsSurfaced],
            ['Yanıtlanan kart', metrics.cardsWithDecision],
            ['Seçilen işlem', metrics.actionSelections],
            ['Kapatılan kart', metrics.dismissals],
            ['Ertelenen kart', metrics.snoozes],
            ['Sayfa açma seçimi', metrics.navigationSelections],
            [
              'Ortanca karar süresi',
              formatDecisionDuration(metrics.medianTimeToDecisionMs),
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
          Bu bölüm, bu denemede gördüğün kartları ve yaptığın seçimleri gösterir. Şimdi ilgilen bölümündeki kartlar ve ayrıntısını açtığın işler birer kez sayılır.
          Ayrıntı açmak, işlem seçmek sayılmaz. Bir işin tamamlandığını veya gelir elde edildiğini göstermez.
          Bilgiler kalıcı olarak kaydedilmez; başka bir yere gönderilmez. Görünümü değiştirince veya sayfayı yenileyince sıfırlanır.
        </p>
      </details> : null}

      <div className="kpnk-experience-outcome" aria-live="polite">{outcome}</div>
    </>
  )
}
