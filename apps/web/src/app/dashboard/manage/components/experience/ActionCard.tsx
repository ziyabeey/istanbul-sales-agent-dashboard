'use client'

import type { ActionCardAction, ActionCardModel } from '@kepenk/ui'

const DOMAIN_LABELS: Record<ActionCardModel['source']['domain'], string> = {
    booking: 'Randevu',
    finance: 'Finance',
    inventory: 'Tedarik',
    property: 'Emlak',
    crm: 'CRM',
    commerce: 'Commerce',
    marketing: 'Social',
    system: 'Kepenk',
}

function cssAttention(attention: ActionCardModel['attention']) {
    return attention === 'positive' ? 'success' : attention
}

export interface ActionCardProps {
    card: ActionCardModel
    onAction: (card: ActionCardModel, action: ActionCardAction) => void
}

export default function ActionCard({ card, onAction }: ActionCardProps) {
    const evidenceLabels = card.evidence?.map(item => item.label || item.id).filter(Boolean) ?? []

    return (
        <article
            className="kpnk-action-card"
            data-attention={cssAttention(card.attention)}
            data-state={card.state}
            aria-labelledby={`${card.id}-title`}
        >
            <div className="kpnk-action-meta">
                <span className="kpnk-action-domain">{DOMAIN_LABELS[card.source.domain]}</span>
                {card.source.eventId ? <span>{card.source.eventId}</span> : null}
                {card.deadlineAt ? (
                    <>
                        <span aria-hidden="true">·</span>
                        <span>Son zaman {card.deadlineAt}</span>
                    </>
                ) : null}
            </div>

            <h2 id={`${card.id}-title`} className="kpnk-action-title">{card.title}</h2>
            {card.context ? <p className="kpnk-action-context">{card.context}</p> : null}

            {(card.reason || evidenceLabels.length > 0) ? (
                <details className="kpnk-action-reason">
                    <summary>Neden bunu görüyorum?</summary>
                    {card.reason ? <p>{card.reason}</p> : null}
                    {evidenceLabels.length > 0 ? <p>Kanıt: {evidenceLabels.join(' · ')}</p> : null}
                </details>
            ) : null}

            <div className="kpnk-action-row">
                {card.actions.map(action => (
                    <button
                        key={action.id}
                        type="button"
                        className={`kpnk-action-btn${action.primary ? ' primary' : action.kind === 'dismiss' || action.kind === 'snooze' ? ' ghost' : ''}`}
                        onClick={() => onAction(card, action)}
                    >
                        {action.label}
                    </button>
                ))}
            </div>
        </article>
    )
}
