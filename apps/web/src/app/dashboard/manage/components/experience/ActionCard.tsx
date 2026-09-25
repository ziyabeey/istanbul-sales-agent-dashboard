'use client'

import type { ActionCardAction, ActionCardModel } from '@kepenk/ui'
import { ACTION_CARD_DOMAIN_LABELS, formatExperienceDateTime, getActionCardEventLabel } from '@/lib/experience/turkishPresentation'

function cssAttention(attention: ActionCardModel['attention']) {
    return attention === 'positive' ? 'success' : attention
}

export interface ActionCardProps {
    card: ActionCardModel
    onAction: (card: ActionCardModel, action: ActionCardAction) => void
    showExplanation?: boolean
}

export default function ActionCard({ card, onAction, showExplanation = false }: ActionCardProps) {
    const evidenceLabels = [...new Set(card.evidence?.map(item => item.label?.trim() || 'İlgili işlem kaydı') ?? [])]
    const eventLabel = getActionCardEventLabel(card.source.eventId)
    const deadline = formatExperienceDateTime(card.deadlineAt)

    return (
        <article
            className="kpnk-action-card"
            data-attention={cssAttention(card.attention)}
            data-state={card.state}
            aria-labelledby={`${card.id}-title`}
        >
            <div className="kpnk-action-meta">
                <span className="kpnk-action-domain">{ACTION_CARD_DOMAIN_LABELS[card.source.domain]}</span>
                {eventLabel ? <span>{eventLabel}</span> : null}
                {deadline ? (
                    <>
                        <span aria-hidden="true">·</span>
                        <span>{card.source.domain === 'booking' ? 'Randevu zamanı' : 'Son tarih'}: <time dateTime={card.deadlineAt}>{deadline}</time></span>
                    </>
                ) : null}
            </div>

            <h2 id={`${card.id}-title`} className="kpnk-action-title">{card.title}</h2>
            {card.context ? <p className="kpnk-action-context">{card.context}</p> : null}

            {(card.reason || evidenceLabels.length > 0) ? (
                <details className="kpnk-action-reason" open={showExplanation || undefined}>
                    <summary>Neden bu kartı görüyorum?</summary>
                    {card.reason ? <p>{card.reason}</p> : null}
                    {evidenceLabels.length > 0 ? <p>Dayanak: {evidenceLabels.join(' · ')}</p> : null}
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
