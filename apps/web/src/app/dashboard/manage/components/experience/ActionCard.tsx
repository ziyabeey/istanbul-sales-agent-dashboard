'use client'

export type ActionCardAttention = 'neutral' | 'info' | 'warning' | 'critical' | 'success'
export type ActionCardState = 'new' | 'seen' | 'snoozed' | 'acted' | 'dismissed'

export interface ActionCardAction {
    label: string
    onClick: () => void
}

export interface ActionCardProps {
    id: string
    domain: string
    sourceEvent: string
    title: string
    context: string
    attention?: ActionCardAttention
    state?: ActionCardState
    reason?: string
    deadline?: string
    primaryAction: ActionCardAction
    secondaryAction?: ActionCardAction
    onDismiss?: () => void
    onSnooze?: () => void
}

export default function ActionCard({
    id,
    domain,
    sourceEvent,
    title,
    context,
    attention = 'neutral',
    state = 'new',
    reason,
    deadline,
    primaryAction,
    secondaryAction,
    onDismiss,
    onSnooze,
}: ActionCardProps) {
    return (
        <article
            className="kpnk-action-card"
            data-attention={attention}
            data-state={state}
            aria-labelledby={`${id}-title`}
        >
            <div className="kpnk-action-meta">
                <span className="kpnk-action-domain">{domain}</span>
                <span>{sourceEvent}</span>
                {deadline ? <><span aria-hidden="true">·</span><span>{deadline}</span></> : null}
            </div>

            <h2 id={`${id}-title`} className="kpnk-action-title">{title}</h2>
            <p className="kpnk-action-context">{context}</p>

            {reason ? (
                <details className="kpnk-action-reason">
                    <summary>Neden bunu görüyorum?</summary>
                    <p>{reason}</p>
                </details>
            ) : null}

            <div className="kpnk-action-row">
                <button type="button" className="kpnk-action-btn primary" onClick={primaryAction.onClick}>
                    {primaryAction.label}
                </button>

                {secondaryAction ? (
                    <button type="button" className="kpnk-action-btn" onClick={secondaryAction.onClick}>
                        {secondaryAction.label}
                    </button>
                ) : null}

                <span className="kpnk-action-spacer" />

                {onSnooze ? (
                    <button type="button" className="kpnk-action-btn ghost" onClick={onSnooze}>
                        Daha sonra
                    </button>
                ) : null}

                {onDismiss ? (
                    <button type="button" className="kpnk-action-btn ghost" onClick={onDismiss} aria-label={`${title} kartını kapat`}>
                        Kapat
                    </button>
                ) : null}
            </div>
        </article>
    )
}
