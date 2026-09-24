'use client'

import type { ComponentType } from 'react'
import { CalendarX2, CircleDollarSign, House, PackageSearch } from 'lucide-react'
import { ACTION_CARD_DEMOS, type ActionCardDomain, type ActionCardModel } from '@kepenk/ui'
import styles from './experience.module.css'

const DOMAIN_ICON: Record<ActionCardDomain, ComponentType<{ size?: number; strokeWidth?: number }>> = {
  booking: CalendarX2,
  finance: CircleDollarSign,
  inventory: PackageSearch,
  property: House,
  crm: House,
  commerce: PackageSearch,
  marketing: House,
  system: House,
}

function ActionCard({ card }: { card: ActionCardModel }) {
  const Icon = DOMAIN_ICON[card.source.domain]

  return (
    <article className={`${styles.card} ${styles[card.attention]}`} data-state={card.state}>
      <div className={styles.iconWrap} aria-hidden="true">
        <Icon size={18} strokeWidth={2} />
      </div>

      <div className={styles.content}>
        <div className={styles.meta}>
          <span>{card.source.domain}</span>
          {card.source.eventId ? <span>· {card.source.eventId}</span> : null}
        </div>

        <h2 className={styles.title}>{card.title}</h2>
        {card.context ? <p className={styles.context}>{card.context}</p> : null}
        {card.reason ? <p className={styles.reason}>{card.reason}</p> : null}

        <div className={styles.actions} aria-label="Örnek aksiyonlar">
          {card.actions.map((action) => (
            <button
              key={action.id}
              type="button"
              className={action.primary ? styles.primaryAction : styles.secondaryAction}
              title="K0 presentation proof — gerçek command bağlı değil"
            >
              {action.label}
            </button>
          ))}
        </div>
      </div>
    </article>
  )
}

export default function KepenkExperienceProofPage() {
  return (
    <main className={styles.page}>
      <section className={styles.hero}>
        <p className={styles.eyebrow}>Kepenk Experience · K0 proof</p>
        <h1>Bırak iş sana gelsin.</h1>
        <p className={styles.lead}>
          Dashboard'a gidip işi aramak yerine, olay doğru anda güvenli aksiyonuyla birlikte gelir.
        </p>
        <p className={styles.note}>
          Bu sayfa yalnız presentation proof'tur. Butonlar domain command çalıştırmaz.
        </p>
      </section>

      <section className={styles.feed} aria-label="Action Card örnekleri">
        {ACTION_CARD_DEMOS.map((card) => (
          <ActionCard key={card.id} card={card} />
        ))}
      </section>
    </main>
  )
}
