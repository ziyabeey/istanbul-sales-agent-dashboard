'use client'

import { useRef } from 'react'
import type { ActionCardAction, ActionCardModel } from '@kepenk/ui'
import { ACTION_CARD_DOMAIN_LABELS } from '@/lib/experience/turkishPresentation'
import ActionCard from './ActionCard'

interface DeferredActionCardProps {
  card: ActionCardModel
  expanded: boolean
  onToggle: () => void
  onClose: () => void
  onAction: (card: ActionCardModel, action: ActionCardAction) => void
}

export default function DeferredActionCard({ card, expanded, onToggle, onClose, onAction }: DeferredActionCardProps) {
  const trigger = useRef<HTMLButtonElement>(null)
  const triggerId = `${card.id}-preview-trigger`
  const panelId = `${card.id}-preview-detail`

  const close = () => {
    onClose()
    trigger.current?.focus()
  }

  return (
    <div className="kpnk-later-item" onKeyDown={event => {
      if (expanded && event.key === 'Escape') {
        event.preventDefault()
        event.stopPropagation()
        close()
      }
    }}>
      <button
        ref={trigger}
        id={triggerId}
        type="button"
        className="kpnk-later-row"
        aria-expanded={expanded}
        aria-controls={panelId}
        onClick={onToggle}
      >
        <span className="kpnk-later-domain">{ACTION_CARD_DOMAIN_LABELS[card.source.domain]}</span>
        <span className="kpnk-later-title">{card.title}</span>
        <span aria-hidden="true">{expanded ? '⌄' : '›'}</span>
      </button>
      <div id={panelId} className="kpnk-later-detail" hidden={!expanded} role="region" aria-labelledby={triggerId}>
        {expanded ? <>
          <ActionCard card={card} onAction={onAction} showExplanation />
          <button type="button" className="kpnk-action-btn ghost" onClick={close}>Ayrıntıyı kapat</button>
        </> : null}
      </div>
    </div>
  )
}
