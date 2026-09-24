'use client'

import { useState } from 'react'
import ActionCard from '../components/experience/ActionCard'

const cards = [
    {
        id: 'appointment-gap',
        domain: 'Randevu',
        sourceEvent: 'appointment.cancelled',
        title: '15:30 randevusu iptal edildi.',
        context: '90 dakikalık boşluk oluştu. Bekleme listesindeki 3 müşteri bu aralık için uygun görünüyor.',
        attention: 'warning' as const,
        deadline: 'Bugün',
        reason: 'İptal edilen rezervasyon 15:30–17:00 aralığını boşalttı. Bu kart yalnız demo verisiyle çalışır; gerçek slot authority burada değildir.',
        primary: 'Boşluğu doldur',
        secondary: 'Uygun müşterileri gör',
    },
    {
        id: 'payment-attention',
        domain: 'Finance',
        sourceEvent: 'payment.attention_required',
        title: '₺12.450 tahsilat bekliyor.',
        context: 'Üç açık adisyon ödeme bekliyor. En eski kayıt iki gün önce oluşturuldu.',
        attention: 'info' as const,
        deadline: '2 gündür açık',
        reason: 'Demo kartı açık bakiye olayını temsil eder. Tutar hesaplama ve ödeme gerçekliği Finance authority tarafından üretilecektir.',
        primary: 'Tahsilatları incele',
        secondary: 'Toplu özet göster',
    },
    {
        id: 'stock-risk',
        domain: 'Tedarik',
        sourceEvent: 'inventory.low_forecast',
        title: '3 ürün 4 gün içinde bitebilir.',
        context: 'Yaklaşan randevu yoğunluğuna göre açıcı ve iki sarf kaleminde stok riski oluşuyor.',
        attention: 'critical' as const,
        deadline: '4 gün',
        reason: 'Bu örnek gelecekte stok + randevu eventlerinin Decision Engine üzerinden Action Card üretmesini temsil eder. K0 yalnız sunum katmanıdır.',
        primary: 'Sipariş seçeneklerini gör',
        secondary: 'Stok detayını aç',
    },
]

export default function ExperienceLabPage() {
    const [hidden, setHidden] = useState<string[]>([])
    const [outcome, setOutcome] = useState('')

    const visible = cards.filter(card => !hidden.includes(card.id))

    const act = (id: string, label: string) => {
        setOutcome(`${label} seçildi · ${id} · demo outcome kaydedildi`)
    }

    return (
        <main className="kpnk-main kpnk-experience-lab">
            <header className="kpnk-experience-head">
                <div className="kpnk-experience-kicker">Kepenk Experience · K0</div>
                <h1>Bırak iş sana gelsin.</h1>
                <p>
                    Bu laboratuvar yeni ana etkileşim modelini izole biçimde doğrular.
                    Kartlar gerçek domain mutation yapmaz; yalnız presentation contract ve interaction lifecycle'ı test eder.
                </p>
            </header>

            <section className="kpnk-action-feed" aria-label="Kepenk aksiyonları">
                {visible.map(card => (
                    <ActionCard
                        key={card.id}
                        id={card.id}
                        domain={card.domain}
                        sourceEvent={card.sourceEvent}
                        title={card.title}
                        context={card.context}
                        attention={card.attention}
                        reason={card.reason}
                        deadline={card.deadline}
                        primaryAction={{ label: card.primary, onClick: () => act(card.id, card.primary) }}
                        secondaryAction={{ label: card.secondary, onClick: () => act(card.id, card.secondary) }}
                        onSnooze={() => act(card.id, 'Daha sonra')}
                        onDismiss={() => {
                            setHidden(current => [...current, card.id])
                            setOutcome(`${card.id} kapatıldı · demo lifecycle: dismissed`)
                        }}
                    />
                ))}

                {visible.length === 0 ? (
                    <div className="kpnk-card" style={{ padding: 22, fontSize: 13, color: 'var(--kpnk-text-secondary)' }}>
                        Şimdilik yapılacak bir şey yok. Sessizlik de ürün davranışıdır.
                    </div>
                ) : null}
            </section>

            <div className="kpnk-experience-outcome" aria-live="polite">
                {outcome}
            </div>
        </main>
    )
}
