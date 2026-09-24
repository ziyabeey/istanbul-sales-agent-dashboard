'use client'

import { useMemo, useState } from 'react'
import { ActionCardProtocolSchema, type ActionCardProtocol } from '@kepenk/action-card-schema'
import {
    actionCardProtocolToModel,
    type ActionCardAction,
    type ActionCardModel,
} from '@kepenk/ui'
import ActionCard from '../components/experience/ActionCard'

const canonicalCards: ActionCardProtocol[] = [
    {
        protocolVersion: '1',
        cardId: 'demo-booking-cancelled',
        businessId: 'demo-business',
        dedupeKey: 'booking:appointment-1530:cancelled',
        revision: 1,
        source: {
            domain: 'booking',
            eventRef: { id: 'evt-booking-1', type: 'appointment.cancelled' },
            occurredAt: '2026-09-24T15:00:00+03:00',
            subjectRefs: [{ type: 'appointment', id: 'appointment-1530' }],
            evidenceRefs: [{ id: 'booking-row-1530', kind: 'booking', label: '15:30 rezervasyon kaydı' }],
        },
        attention: { urgency: 'high', importance: 82, riskClass: 'low' },
        presentation: {
            title: '15:30 randevusu iptal edildi.',
            context: '90 dakikalık boşluk oluştu. Bekleme listesindeki 3 müşteri bu aralık için uygun görünüyor.',
            reason: 'İptal edilen rezervasyon 15:30–17:00 aralığını boşalttı.',
            tone: 'warning',
        },
        actions: [
            {
                actionId: 'fill-gap',
                label: 'Boşluğu doldur',
                mode: 'command',
                capability: { name: 'booking.waitlist.offer', permission: 'booking.write' },
                idempotencyKey: 'demo-booking-cancelled:fill-gap',
                primary: true,
                requiresHumanConfirmation: true,
            },
            { actionId: 'snooze', label: 'Daha sonra', mode: 'snooze', primary: false, requiresHumanConfirmation: false },
            { actionId: 'dismiss', label: 'Kapat', mode: 'dismiss', primary: false, requiresHumanConfirmation: false },
        ],
        state: 'new',
    },
    {
        protocolVersion: '1',
        cardId: 'demo-payment-attention',
        businessId: 'demo-business',
        dedupeKey: 'finance:receivables:attention',
        revision: 1,
        source: {
            domain: 'finance',
            eventRef: { id: 'evt-finance-1', type: 'receivable.attention_required' },
            occurredAt: '2026-09-24T12:00:00+03:00',
            subjectRefs: [{ type: 'receivable_group', id: 'open-receivables' }],
            evidenceRefs: [{ id: 'open-tickets-3', kind: 'finance_projection', label: '3 açık adisyon' }],
        },
        attention: { urgency: 'normal', importance: 68, riskClass: 'medium' },
        presentation: {
            title: '₺12.450 tahsilat bekliyor.',
            context: 'Üç açık adisyon ödeme bekliyor. En eski kayıt iki gün önce oluşturuldu.',
            reason: 'Bu kart finansal gerçeği hesaplamaz; canonical Finance projection sonucunu yalnız sunar.',
            tone: 'info',
        },
        actions: [
            {
                actionId: 'review-receivables',
                label: 'Tahsilatları incele',
                mode: 'navigate',
                href: '/dashboard/manage/odemeler',
                primary: true,
                requiresHumanConfirmation: false,
            },
            { actionId: 'snooze', label: 'Daha sonra', mode: 'snooze', primary: false, requiresHumanConfirmation: false },
            { actionId: 'dismiss', label: 'Kapat', mode: 'dismiss', primary: false, requiresHumanConfirmation: false },
        ],
        state: 'new',
    },
    {
        protocolVersion: '1',
        cardId: 'demo-stock-risk',
        businessId: 'demo-business',
        dedupeKey: 'inventory:forecast:low:3',
        revision: 1,
        source: {
            domain: 'inventory',
            eventRef: { id: 'evt-inventory-1', type: 'stock.projected_low' },
            occurredAt: '2026-09-24T10:00:00+03:00',
            subjectRefs: [{ type: 'inventory_group', id: 'salon-consumables' }],
            evidenceRefs: [
                { id: 'stock-snapshot-1', kind: 'inventory', label: 'Mevcut stok' },
                { id: 'booking-demand-1', kind: 'booking_projection', label: 'Yaklaşan randevu talebi' },
            ],
        },
        attention: { urgency: 'high', importance: 76, riskClass: 'medium' },
        presentation: {
            title: '3 ürün 4 gün içinde bitebilir.',
            context: 'Yaklaşan randevu yoğunluğuna göre açıcı ve iki sarf kaleminde stok riski oluşuyor.',
            reason: 'Stok ve planlı talep aynı kartta yalnız kanıt referansları üzerinden buluşur.',
            tone: 'critical',
        },
        actions: [
            {
                actionId: 'view-supply',
                label: 'Sipariş seçeneklerini gör',
                mode: 'navigate',
                href: '/dashboard/manage/tedarik',
                primary: true,
                requiresHumanConfirmation: false,
            },
            { actionId: 'snooze', label: 'Daha sonra', mode: 'snooze', primary: false, requiresHumanConfirmation: false },
            { actionId: 'dismiss', label: 'Kapat', mode: 'dismiss', primary: false, requiresHumanConfirmation: false },
        ],
        state: 'new',
    },
]

export default function ExperienceLabPage() {
    const [hidden, setHidden] = useState<string[]>([])
    const [outcome, setOutcome] = useState('')

    const cards = useMemo(
        () => canonicalCards.map(card => ActionCardProtocolSchema.parse(card)).map(actionCardProtocolToModel),
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
                    Bu laboratuvar artık UI fixture değil, versioned canonical Action Card envelope üzerinden render edilir.
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
