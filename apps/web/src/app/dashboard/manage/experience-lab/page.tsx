'use client'

import { useMemo, useState } from 'react'
import Link from 'next/link'
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
    setOutcome(action.kind === 'dismiss'
      ? `“${card.title}” kartı bu önizlemede kapatıldı. Gerçek kayıt değişmedi.`
      : `“${action.label}” seçildi. Bu sayfada yalnız kartların görünümünü deniyorsun; gerçek işlem yapılmaz.`)
  }

  return (
    <main className="kpnk-main kpnk-experience-lab">
      <header className="kpnk-experience-head">
        <div className="kpnk-experience-kicker">Kepenk · Örnek kartlar</div>
        <h1>İşlerini tek bakışta gör.</h1>
        <p>
          Buradaki bilgiler örnektir. Kartları inceleyebilir ve düğmeleri deneyebilirsin.
          Gerçek randevu, ödeme veya stok kaydı değişmez.
        </p>
        <Link href="/dashboard/manage/experience-home" prefetch={false}>Bugün görünümüne dön</Link>
      </header>

      <section className="kpnk-action-feed" aria-label="Örnek iş kartları">
        {visible.map(card => <ActionCard key={card.id} card={card} onAction={handleAction} />)}
        {visible.length === 0 ? (
          <div className="kpnk-card" style={{ padding: 22, fontSize: 13, color: 'var(--kpnk-text-secondary)' }}>
            Tüm örnek kartları kapattın. Yeniden denemek için sayfayı yenileyebilirsin.
          </div>
        ) : null}
      </section>

      <div className="kpnk-experience-outcome" aria-live="polite">{outcome}</div>
    </main>
  )
}
