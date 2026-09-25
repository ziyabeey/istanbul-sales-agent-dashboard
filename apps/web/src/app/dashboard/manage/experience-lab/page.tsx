'use client'

import { useMemo, useState } from 'react'
import { ActionCardProtocolSchema } from '@kepenk/action-card-schema'
import {
  actionCardProtocolToModel,
  type ActionCardAction,
  type ActionCardModel,
} from '@kepenk/ui'
import ActionCard from '../components/experience/ActionCard'
import { DEMO_ACTION_CARDS } from '../components/experience/demoProtocolCards'

export default function ExperienceLabPage() {
  const [hidden, setHidden] = useState<string[]>([])
  const [outcome, setOutcome] = useState('')

  const cards = useMemo(
    () => DEMO_ACTION_CARDS.map(card => ActionCardProtocolSchema.parse(card)).map(actionCardProtocolToModel),
    []
  )
  const visible = cards.filter(card => !hidden.includes(card.id))

  const handleAction = (card: ActionCardModel, action: ActionCardAction) => {
    if (action.kind === 'dismiss') {
      setHidden(current => [...current, card.id])
    }
    setOutcome(`${action.label} seçildi · ${card.id} · demo outcome: ${action.kind}`)
  }

  return (
    <main className="kpnk-main kpnk-experience-lab">
      <header className="kpnk-experience-head">
        <div className="kpnk-experience-kicker">Kepenk Experience · K1</div>
        <h1>Bırak iş sana gelsin.</h1>
        <p>
          Bu laboratuvar versioned canonical Action Card envelope üzerinden render edilir.
          Kart capability veya transaction authority değildir.
        </p>
      </header>

      <section className="kpnk-action-feed" aria-label="Kepenk aksiyonları">
        {visible.map(card => <ActionCard key={card.id} card={card} onAction={handleAction} />)}
        {visible.length === 0 ? (
          <div className="kpnk-card" style={{ padding: 22, fontSize: 13, color: 'var(--kpnk-text-secondary)' }}>
            Şimdilik yapılacak bir şey yok. Sessizlik de ürün davranışıdır.
          </div>
        ) : null}
      </section>

      <div className="kpnk-experience-outcome" aria-live="polite">{outcome}</div>
    </main>
  )
}
